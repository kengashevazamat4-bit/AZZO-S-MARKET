// server.js — E'lonlar sayti backend (tozalangan, pro versiya)
require('dotenv').config();

const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'), {
  // .well-known/assetlinks.json TWA (Android ilova) tasdiqlashi uchun kerak —
  // Express standart holatda "." bilan boshlanuvchi papkalarni yashiradi, shuni ochamiz
  dotfiles: 'allow'
}));

const DB_FILE = path.join(__dirname, 'data', 'ads.json');
const BALANCES_FILE = path.join(__dirname, 'data', 'balances.json');
const DEPOSITS_FILE = path.join(__dirname, 'data', 'deposits.json');
const COMMENTS_FILE = path.join(__dirname, 'data', 'comments.json');
const UPLOAD_DIR = path.join(__dirname, 'public', 'uploads');
const RECEIPTS_DIR = path.join(__dirname, 'public', 'receipts');

const PRICE_PER_PHOTO_USD = 1.0; // har bir rasm uchun $1
const UZS_RATE = 12650; // 1 USD taxminiy so'm kursi
const MIN_DEPOSIT = 1;
const MAX_DEPOSIT = 100000;
const MAX_PHOTOS = 10;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '12345Qwert.com';

if (!process.env.ADMIN_PASSWORD) {
  console.warn('⚠️  DIQQAT: ADMIN_PASSWORD .env/hosting orqali o\'rnatilmagan, standart parol (.env dagi qiymat) ishlatilmoqda.');
  console.warn('   .env fayl yarating (.env.example dan nusxa oling) va kuchli parol qo\'ying.');
}

if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
if (!fs.existsSync(RECEIPTS_DIR)) fs.mkdirSync(RECEIPTS_DIR, { recursive: true });

// ---------- Balans bazasi (JSON) ----------
function readBalances() {
  if (!fs.existsSync(BALANCES_FILE)) fs.writeFileSync(BALANCES_FILE, '{}');
  return JSON.parse(fs.readFileSync(BALANCES_FILE, 'utf-8'));
}
function writeBalances(data) {
  fs.writeFileSync(BALANCES_FILE, JSON.stringify(data, null, 2));
}
function getUserId(req) {
  const id = req.headers['x-user-id'];
  if (!id || typeof id !== 'string' || id.length > 100) return null;
  return id;
}
function ensureUser(balances, userId) {
  if (!balances[userId]) balances[userId] = { balance_usd: 0, history: [] };
  return balances[userId];
}

// ---------- Deposits (kripto/karta orqali qo'lda tasdiqlanadigan to'ldirishlar) ----------
function readDeposits() {
  if (!fs.existsSync(DEPOSITS_FILE)) fs.writeFileSync(DEPOSITS_FILE, '[]');
  return JSON.parse(fs.readFileSync(DEPOSITS_FILE, 'utf-8'));
}
function writeDeposits(data) {
  fs.writeFileSync(DEPOSITS_FILE, JSON.stringify(data, null, 2));
}

// ---------- Balansni ko'rish ----------
app.get('/api/balance', (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(400).json({ error: 'user_id yo\'q' });
  const balances = readBalances();
  const user = ensureUser(balances, userId);
  writeBalances(balances);
  res.json({ balance_usd: user.balance_usd, uzs_rate: UZS_RATE });
});

// ============================================================
// KARTA / KRIPTO — balansni QO'LDA to'ldirish (Payze/Click/Payme kerak emas)
// Foydalanuvchi ko'rsatilgan karta/wallet'ga o'zi o'tkazadi, chek yuklaydi,
// admin admin.html orqali tasdiqlaydi -> balansga avtomatik qo'shiladi.
// ============================================================

// Rekvizitlarni frontendga chiqarish
app.get('/api/payment-methods', (req, res) => {
  const cards = [
    { key: 'uzcard', label: 'Uzcard', number: process.env.CARD_UZCARD },
    { key: 'humo', label: 'Humo', number: process.env.CARD_HUMO },
    { key: 'visa', label: 'Visa', number: process.env.CARD_VISA },
    { key: 'mastercard', label: 'Mastercard', number: process.env.CARD_MASTERCARD },
  ].filter((c) => c.number);

  const crypto_wallets = [
    { key: 'usdt_trc20', label: 'USDT (TRC20 / TRON)', address: process.env.CRYPTO_USDT_TRC20_ADDRESS },
    { key: 'usdt_bep20', label: 'USDT (BEP20 / BNB)', address: process.env.CRYPTO_USDT_BEP20_ADDRESS },
    { key: 'eth', label: 'Ethereum (ETH)', address: process.env.CRYPTO_ETH_ADDRESS },
    { key: 'usdt_ton', label: 'USDT (TON)', address: process.env.CRYPTO_USDT_TON_ADDRESS },
    { key: 'btc', label: 'Bitcoin (BTC)', address: process.env.CRYPTO_BTC_ADDRESS },
  ].filter((c) => c.address);

  res.json({ cards, crypto_wallets, uzs_rate: UZS_RATE, min: MIN_DEPOSIT, max: MAX_DEPOSIT });
});

// Chek yuklash sozlamalari
const receiptStorage = multer.diskStorage({
  destination: RECEIPTS_DIR,
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, `${crypto.randomUUID()}${ext}`);
  },
});
const uploadReceipt = multer({
  storage: receiptStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const ok = /image\/(jpeg|png|webp|gif)/.test(file.mimetype) || file.mimetype === 'application/pdf';
    cb(ok ? null : new Error('Faqat rasm (jpg/png/webp) yoki PDF qabul qilinadi'), ok);
  },
});

// Foydalanuvchi chekni yuboradi -> "pending" so'rov yaratiladi
app.post('/api/balance/deposit/manual', uploadReceipt.single('receipt'), (req, res) => {
  const userId = getUserId(req);
  if (!userId) {
    if (req.file) fs.unlinkSync(req.file.path);
    return res.status(400).json({ error: 'user_id yo\'q' });
  }

  const amount = Number(req.body.amount);
  const method = req.body.method;
  if (!Number.isFinite(amount) || amount < MIN_DEPOSIT || amount > MAX_DEPOSIT) {
    if (req.file) fs.unlinkSync(req.file.path);
    return res.status(400).json({ error: `Summani $${MIN_DEPOSIT} dan $${MAX_DEPOSIT} gacha kiriting` });
  }
  if (!method) {
    if (req.file) fs.unlinkSync(req.file.path);
    return res.status(400).json({ error: 'To\'lov usulini tanlang' });
  }
  if (!req.file) {
    return res.status(400).json({ error: 'Chek skrinshotini yuklang' });
  }

  const deposits = readDeposits();
  const deposit = {
    id: crypto.randomUUID(),
    user_id: userId,
    amount_usd: amount,
    method,
    receipt_url: `/receipts/${req.file.filename}`,
    status: 'pending', // pending | approved | rejected
    created_at: new Date().toISOString(),
  };
  deposits.unshift(deposit);
  writeDeposits(deposits);

  res.json({ success: true, message: 'Chek qabul qilindi. Admin tasdiqlagach balansingiz to\'ldiriladi.', deposit_id: deposit.id });
});

// Foydalanuvchi o'zining kutilayotgan so'rovlarini ko'rishi uchun
app.get('/api/balance/deposit/mine', (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(400).json({ error: 'user_id yo\'q' });
  const deposits = readDeposits().filter((d) => d.user_id === userId);
  res.json(deposits);
});

// ---------- Oddiy fayl-baza (JSON) — e'lonlar ----------
function readDB() {
  if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, '[]');
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
}
function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// ---------- Izohlar bazasi (JSON) ----------
function readComments() {
  if (!fs.existsSync(COMMENTS_FILE)) fs.writeFileSync(COMMENTS_FILE, '[]');
  return JSON.parse(fs.readFileSync(COMMENTS_FILE, 'utf-8'));
}
function writeComments(data) {
  fs.writeFileSync(COMMENTS_FILE, JSON.stringify(data, null, 2));
}
function commentScore(c) {
  return (c.likes ? c.likes.length : 0) - (c.dislikes ? c.dislikes.length : 0);
}
function adRating(adId, comments) {
  const list = comments.filter((c) => c.ad_id === adId);
  const withStars = list.filter((c) => Number.isFinite(c.stars) && c.stars > 0);
  const avg = withStars.length
    ? Math.round((withStars.reduce((s, c) => s + c.stars, 0) / withStars.length) * 10) / 10
    : 0;
  return { rating_avg: avg, rating_count: withStars.length, comments_count: list.length };
}

// ---------- Izohlar: bitta e'lon uchun ro'yxat + reyting ----------
app.get('/api/ads/:id/comments', (req, res) => {
  const ad = readDB().find((a) => a.id === req.params.id);
  if (!ad) return res.status(404).json({ error: 'Elon topilmadi' });
  const userId = getUserId(req);
  const all = readComments();
  const comments = all
    .filter((c) => c.ad_id === req.params.id)
    .sort((a, b) => commentScore(b) - commentScore(a) || new Date(b.created_at) - new Date(a.created_at))
    .map((c) => ({
      id: c.id,
      text: c.text,
      stars: c.stars,
      likes: c.likes ? c.likes.length : 0,
      dislikes: c.dislikes ? c.dislikes.length : 0,
      my_vote: userId ? (c.likes && c.likes.includes(userId) ? 'like' : (c.dislikes && c.dislikes.includes(userId) ? 'dislike' : null)) : null,
      is_mine: userId ? c.user_id === userId : false,
      created_at: c.created_at,
    }));
  res.json({ comments, ...adRating(req.params.id, all) });
});

// ---------- Izoh qoldirish ----------
app.post('/api/ads/:id/comments', (req, res) => {
  const ad = readDB().find((a) => a.id === req.params.id);
  if (!ad) return res.status(404).json({ error: 'Elon topilmadi' });
  const userId = getUserId(req);
  if (!userId) return res.status(400).json({ error: 'user_id yoq' });

  const text = (req.body.text || '').toString().trim().slice(0, 500);
  const stars = Number(req.body.stars);
  if (!text) return res.status(400).json({ error: 'Izoh matnini kiriting' });
  if (!Number.isFinite(stars) || stars < 1 || stars > 5) return res.status(400).json({ error: 'Yulduzcha 1 dan 5 gacha' });

  const comments = readComments();
  const comment = {
    id: crypto.randomUUID(),
    ad_id: req.params.id,
    user_id: userId,
    text,
    stars: Math.round(stars),
    likes: [],
    dislikes: [],
    created_at: new Date().toISOString(),
  };
  comments.push(comment);
  writeComments(comments);

  res.json({ success: true, comment_id: comment.id, ...adRating(req.params.id, comments) });
});

// ---------- Izohga layk/dizlayk ----------
app.post('/api/comments/:id/vote', (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(400).json({ error: 'user_id yoq' });
  const type = req.body.type;
  if (type !== 'like' && type !== 'dislike') return res.status(400).json({ error: 'Notogri ovoz turi' });

  const comments = readComments();
  const comment = comments.find((c) => c.id === req.params.id);
  if (!comment) return res.status(404).json({ error: 'Izoh topilmadi' });
  if (!comment.likes) comment.likes = [];
  if (!comment.dislikes) comment.dislikes = [];

  const target = type === 'like' ? comment.likes : comment.dislikes;
  const other = type === 'like' ? comment.dislikes : comment.likes;
  const idx = target.indexOf(userId);
  if (idx !== -1) {
    target.splice(idx, 1);
  } else {
    target.push(userId);
    const otherIdx = other.indexOf(userId);
    if (otherIdx !== -1) other.splice(otherIdx, 1);
  }
  writeComments(comments);

  res.json({ likes: comment.likes.length, dislikes: comment.dislikes.length, my_vote: target.includes(userId) ? type : null });
});

// ---------- Media yuklash (e'lon uchun rasm/video) ----------
const mediaStorage = multer.diskStorage({
  destination: UPLOAD_DIR,
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${crypto.randomUUID()}${ext}`);
  },
});
const uploadMedia = multer({
  storage: mediaStorage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB / fayl
  fileFilter: (req, file, cb) => {
    const ok = /image\/(jpeg|png|webp|gif)|video\/(mp4|webm|quicktime)/.test(file.mimetype);
    cb(ok ? null : new Error('Faqat rasm (jpg/png/webp) yoki video (mp4/webm) qabul qilinadi'), ok);
  },
});

// ---------- E'lon yaratish (balansdan rasm soniga qarab $ yechiladi, darhol chop etiladi) ----------
app.post('/api/ads', uploadMedia.array('media', MAX_PHOTOS), (req, res) => {
  const { title, description, price, category, phone, city, whatsapp, telegram } = req.body;
  const userId = getUserId(req);
  const files = req.files || [];

  function cleanupFiles() {
    files.forEach((f) => { try { fs.unlinkSync(f.path); } catch (e) { /* jim */ } });
  }

  if (!title || !description || !phone || !category) {
    cleanupFiles();
    return res.status(400).json({ error: 'Majburiy maydonlar to‘ldirilmagan' });
  }
  if (!userId) {
    cleanupFiles();
    return res.status(400).json({ error: 'user_id yo\'q' });
  }
  if (files.length > MAX_PHOTOS) {
    cleanupFiles();
    return res.status(400).json({ error: `Maksimal ${MAX_PHOTOS} ta rasm yuklash mumkin` });
  }

  // Narx: har bir rasm $1, rasm bo'lmasa ham minimal $1 (e'lon joylash to'lovi)
  const photoCount = files.filter((f) => f.mimetype.startsWith('image')).length;
  const cost = Math.max(1, photoCount);

  const balances = readBalances();
  const user = ensureUser(balances, userId);
  if (user.balance_usd < cost) {
    cleanupFiles();
    return res.status(402).json({ error: 'Balansingizda mablag\' yetarli emas', balance_usd: user.balance_usd, required_usd: cost });
  }
  user.balance_usd = Math.round((user.balance_usd - cost) * 100) / 100;
  user.history.push({ type: 'ad_post', amount_usd: -cost, at: new Date().toISOString() });
  writeBalances(balances);

  const media = files.map((f) => ({
    url: `/uploads/${f.filename}`,
    type: f.mimetype.startsWith('video') ? 'video' : 'image',
  }));

  const ads = readDB();
  const now = new Date().toISOString();
  const ad = {
    id: crypto.randomUUID(),
    title,
    description,
    price: price || null,
    category,
    city: city || '',
    phone,
    whatsapp: whatsapp || '',
    telegram: telegram || '',
    media, // [{url, type}, ...] — media[0] = asosiy cover
    media_url: media[0] ? media[0].url : null, // orqaga moslik (eski kartalar uchun)
    media_type: media[0] ? media[0].type : null,
    cost_usd: cost,
    status: 'published',
    payment_method: 'balance',
    created_by: userId,
    created_at: now,
    published_at: now,
  };
  ads.unshift(ad);
  writeDB(ads);

  res.json({ ad_id: ad.id, balance_usd: user.balance_usd, cost_usd: cost });
});

// ---------- E'lonlar ro'yxati (faqat to'langanlar) ----------
app.get('/api/ads', (req, res) => {
  const { category, city, q } = req.query;
  let ads = readDB().filter((a) => a.status === 'published');
  if (category) ads = ads.filter((a) => a.category === category);
  if (city) ads = ads.filter((a) => a.city.toLowerCase().includes(city.toLowerCase()));
  if (q) {
    const query = q.toLowerCase();
    ads = ads.filter((a) => a.title.toLowerCase().includes(query) || a.description.toLowerCase().includes(query));
  }
  const comments = readComments();
  ads = ads.map((a) => ({ ...a, ...adRating(a.id, comments) }));
  res.json(ads);
});

app.get('/api/ads/:id', (req, res) => {
  const ad = readDB().find((a) => a.id === req.params.id);
  if (!ad) return res.status(404).json({ error: 'Topilmadi' });
  res.json({ ...ad, ...adRating(ad.id, readComments()) });
});

// ============================================================
// ADMIN — qo'lda to'ldirish so'rovlarini tasdiqlash/rad etish
// ============================================================
function checkAdmin(req, res, next) {
  if (!ADMIN_PASSWORD || req.headers['x-admin-password'] !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Parol noto‘g‘ri' });
  }
  next();
}

app.get('/api/admin/deposits/pending', checkAdmin, (req, res) => {
  const deposits = readDeposits().filter((d) => d.status === 'pending');
  res.json(deposits);
});

app.post('/api/admin/deposits/:id/approve', checkAdmin, (req, res) => {
  const deposits = readDeposits();
  const dep = deposits.find((d) => d.id === req.params.id);
  if (!dep) return res.status(404).json({ error: 'So\'rov topilmadi' });
  if (dep.status !== 'pending') return res.status(400).json({ error: 'Bu so\'rov allaqachon ko\'rib chiqilgan' });

  dep.status = 'approved';
  dep.approved_at = new Date().toISOString();
  writeDeposits(deposits);

  const balances = readBalances();
  const user = ensureUser(balances, dep.user_id);
  user.balance_usd = Math.round((user.balance_usd + dep.amount_usd) * 100) / 100;
  user.history.push({ type: `deposit_${dep.method}`, amount_usd: dep.amount_usd, deposit_id: dep.id, at: new Date().toISOString() });
  writeBalances(balances);

  res.json({ ok: true });
});

app.post('/api/admin/deposits/:id/reject', checkAdmin, (req, res) => {
  const deposits = readDeposits();
  const dep = deposits.find((d) => d.id === req.params.id);
  if (!dep) return res.status(404).json({ error: 'So\'rov topilmadi' });
  if (dep.status !== 'pending') return res.status(400).json({ error: 'Bu so\'rov allaqachon ko\'rib chiqilgan' });

  dep.status = 'rejected';
  dep.rejected_at = new Date().toISOString();
  writeDeposits(deposits);

  res.json({ ok: true });
});

// ---------- ADMIN: e'lonlarni boshqarish (firibgarlik/nomaqbul kontentni ochirish) ----------
app.get('/api/admin/ads', checkAdmin, (req, res) => {
  const ads = readDB();
  const comments = readComments();
  res.json(ads.map((a) => ({ ...a, ...adRating(a.id, comments) })));
});

app.delete('/api/admin/ads/:id', checkAdmin, (req, res) => {
  const ads = readDB();
  const idx = ads.findIndex((a) => a.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Elon topilmadi' });
  const [ad] = ads.splice(idx, 1);
  writeDB(ads);

  // shu elonga tegishli media fayllarni ochirish
  (ad.media || []).forEach((m) => {
    const p = path.join(__dirname, 'public', m.url.replace(/^\//, ''));
    fs.unlink(p, () => {});
  });

  // shu elonga tegishli izohlarni ham ochirish
  const comments = readComments().filter((c) => c.ad_id !== req.params.id);
  writeComments(comments);

  res.json({ ok: true });
});

// ---------- ADMIN: izohlarni boshqarish (sokinish/nojoya yozuvlarni ochirish) ----------
app.get('/api/admin/comments', checkAdmin, (req, res) => {
  const ads = readDB();
  const comments = readComments()
    .slice()
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .map((c) => {
      const ad = ads.find((a) => a.id === c.ad_id);
      return {
        id: c.id,
        ad_id: c.ad_id,
        ad_title: ad ? ad.title : '(elon ochirilgan)',
        text: c.text,
        stars: c.stars,
        likes: c.likes ? c.likes.length : 0,
        dislikes: c.dislikes ? c.dislikes.length : 0,
        created_at: c.created_at,
      };
    });
  res.json(comments);
});

app.delete('/api/admin/comments/:id', checkAdmin, (req, res) => {
  const comments = readComments();
  const idx = comments.findIndex((c) => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Izoh topilmadi' });
  comments.splice(idx, 1);
  writeComments(comments);
  res.json({ ok: true });
});

// ---------- Umumiy xatoliklar (masalan multer fayl filtri/limitlari) ----------
app.use((err, req, res, next) => {
  if (err) {
    console.error(err.message);
    return res.status(400).json({ error: err.message || 'Xatolik yuz berdi' });
  }
  next();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server ishga tushdi: http://localhost:${PORT}`));
