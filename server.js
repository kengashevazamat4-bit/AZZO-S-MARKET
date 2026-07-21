// server.js — AZZO S-MARKET Backend (MongoDB Atlas Integratsiyasi bilan)
require('dotenv').config();

const express = require('express');
require('express-async-errors'); // async route ichidagi xatolarni ham error-handlerga yuboradi
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public'), {
  dotfiles: 'allow'
}));

const UPLOAD_DIR = path.join(__dirname, 'public', 'uploads');
const RECEIPTS_DIR = path.join(__dirname, 'public', 'receipts');

const PRICE_PER_PHOTO_USD = 1.0; 
const UZS_RATE = 12650; 
const MIN_DEPOSIT = 1;
const MAX_DEPOSIT = 100000;
const MAX_PHOTOS = 10;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '12345Qwert.com';

if (!process.env.ADMIN_PASSWORD) {
  console.warn('⚠️  DIQQAT: ADMIN_PASSWORD o\'rnatilmagan, standart parol ishlatilmoqda.');
}

if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
if (!fs.existsSync(RECEIPTS_DIR)) fs.mkdirSync(RECEIPTS_DIR, { recursive: true });

// -------------------------------------------------------------
// MongoDB Atlas Bazasiga Ulanish
// -------------------------------------------------------------
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ Xatolik: MONGODB_URI muhit o'zgaruvchisi topilmadi!");
}

mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 8000 })
  .then(() => console.log("🚀 MongoDB Atlas bazasiga muvaffaqiyatli ulandi!"))
  .catch((err) => console.error("❌ MongoDB bazasiga ulanishda xatolik:", err.message));

// Baza hali ulanmagan bo'lsa, so'rov osilib qolmasin — darhol tushunarli xato qaytaramiz
app.use('/api', (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ error: 'Baza bilan ulanish hozircha ishlamayapti. Bir necha soniyadan so\'ng qayta urinib ko\'ring.' });
  }
  next();
});

// -------------------------------------------------------------
// Mongoose Model va Sxemalari (Schemas)
// -------------------------------------------------------------

// 1. Balanslar Sxemasi
const balanceSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  balance_usd: { type: Number, default: 0 },
  history: { type: Array, default: [] }
});
const Balance = mongoose.model('Balance', balanceSchema);

// 2. Depozitlar Sxemasi
const depositSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  user_id: String,
  amount_usd: Number,
  method: String,
  receipt_url: String,
  status: { type: String, default: 'pending' }, // pending | approved | rejected
  created_at: { type: String, default: () => new Date().toISOString() },
  approved_at: String,
  rejected_at: String
});
const Deposit = mongoose.model('Deposit', depositSchema);

// 3. E'lonlar Sxemasi
const adSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: String,
  description: String,
  price: String,
  category: String,
  city: String,
  phone: String,
  whatsapp: String,
  telegram: String,
  media: Array,
  media_url: String,
  media_type: String,
  cost_usd: Number,
  views: { type: Number, default: 0 },
  status: { type: String, default: 'published' },
  payment_method: { type: String, default: 'balance' },
  created_by: String,
  created_at: { type: String, default: () => new Date().toISOString() },
  published_at: { type: String, default: () => new Date().toISOString() }
});
const Ad = mongoose.model('Ad', adSchema);

// 4. Izohlar Sxemasi
const commentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  ad_id: String,
  user_id: String,
  text: String,
  stars: Number,
  likes: { type: Array, default: [] },
  dislikes: { type: Array, default: [] },
  created_at: { type: String, default: () => new Date().toISOString() }
});
const Comment = mongoose.model('Comment', commentSchema);

// -------------------------------------------------------------
// Yordamchi Funksiyalar
// -------------------------------------------------------------
function getUserId(req) {
  const id = req.headers['x-user-id'];
  if (!id || typeof id !== 'string' || id.length > 100) return null;
  return id;
}

async function ensureUser(userId) {
  let user = await Balance.findOne({ userId });
  if (!user) {
    user = new Balance({ userId, balance_usd: 0, history: [] });
    await user.save();
  }
  return user;
}

function commentScore(c) {
  return (c.likes ? c.likes.length : 0) - (c.dislikes ? c.dislikes.length : 0);
}

async function adRating(adId) {
  const list = await Comment.find({ ad_id: adId });
  const withStars = list.filter((c) => Number.isFinite(c.stars) && c.stars > 0);
  const avg = withStars.length
    ? Math.round((withStars.reduce((s, c) => s + c.stars, 0) / withStars.length) * 10) / 10
    : 0;
  return { rating_avg: avg, rating_count: withStars.length, comments_count: list.length };
}

// -------------------------------------------------------------
// Balans va Rekvizitlar API
// -------------------------------------------------------------
app.get('/api/balance', async (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(400).json({ error: 'user_id yo\'q' });
  const user = await ensureUser(userId);
  res.json({ balance_usd: user.balance_usd, uzs_rate: UZS_RATE });
});

app.get('/api/payment-methods', (req, res) => {
  const cards = [
    { key: 'uzcard', label: 'Uzcard', number: process.env.CARD_UZCARD || '8600060798598877' },
    { key: 'humo', label: 'Humo', number: process.env.CARD_HUMO || '9860176616888226' },
    { key: 'visa', label: 'Visa debit', number: process.env.CARD_VISA || '4023060149068644' },
    { key: 'mastercard', label: 'Mastercard debit', number: process.env.CARD_MASTERCARD || '5476381751725506' },
  ].filter((c) => c.number);

  const crypto_wallets = [
    { key: 'usdt_trc20', label: 'USDT (TRC20 / TRON)', address: process.env.CRYPTO_USDT_TRC20_ADDRESS || 'TECnUjbJ9oGpKh7Qy2sHH5W3NRebMSqmoT' },
    { key: 'usdt_bep20', label: 'USDT (BEP20 / BNB)', address: process.env.CRYPTO_USDT_BEP20_ADDRESS },
    { key: 'eth', label: 'Ethereum (ETH)', address: process.env.CRYPTO_ETH_ADDRESS },
    { key: 'usdt_ton', label: 'USDT (TON)', address: process.env.CRYPTO_USDT_TON_ADDRESS },
    { key: 'btc', label: 'Bitcoin (BTC)', address: process.env.CRYPTO_BTC_ADDRESS || 'bc1qc98662z4dz9cg85e20jpn8xrpflx048mu667d8' },
    { key: 'ltc', label: 'Litecoin (LTC)', address: process.env.CRYPTO_LTC_ADDRESS },
    { key: 'sol', label: 'Solana (SOL)', address: process.env.CRYPTO_SOL_ADDRESS },
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
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ok = /image\/(jpeg|png|webp|gif)/.test(file.mimetype) || file.mimetype === 'application/pdf';
    cb(ok ? null : new Error('Faqat rasm (jpg/png/webp) yoki PDF qabul qilinadi'), ok);
  },
});

app.post('/api/balance/deposit/manual', uploadReceipt.single('receipt'), async (req, res) => {
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

  const deposit = new Deposit({
    id: crypto.randomUUID(),
    user_id: userId,
    amount_usd: amount,
    method,
    receipt_url: `/receipts/${req.file.filename}`,
    status: 'pending'
  });
  await deposit.save();

  res.json({ success: true, message: 'Chek qabul qilindi. Admin tasdiqlagach balansingiz to\'ldiriladi.', deposit_id: deposit.id });
});

app.get('/api/balance/deposit/mine', async (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(400).json({ error: 'user_id yo\'q' });
  const deposits = await Deposit.find({ user_id: userId }).sort({ created_at: -1 });
  res.json(deposits);
});

// -------------------------------------------------------------
// Izohlar API
// -------------------------------------------------------------
app.get('/api/ads/:id/comments', async (req, res) => {
  const ad = await Ad.findOne({ id: req.params.id });
  if (!ad) return res.status(404).json({ error: 'Elon topilmadi' });
  const userId = getUserId(req);
  
  const all = await Comment.find({ ad_id: req.params.id });
  const comments = all
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
  const rating = await adRating(req.params.id);
  res.json({ comments, ...rating });
});

app.post('/api/ads/:id/comments', async (req, res) => {
  const ad = await Ad.findOne({ id: req.params.id });
  if (!ad) return res.status(404).json({ error: 'Elon topilmadi' });
  const userId = getUserId(req);
  if (!userId) return res.status(400).json({ error: 'user_id yoq' });

  const text = (req.body.text || '').toString().trim().slice(0, 500);
  const stars = Number(req.body.stars);
  if (!text) return res.status(400).json({ error: 'Izoh matnini kiriting' });
  if (!Number.isFinite(stars) || stars < 1 || stars > 5) return res.status(400).json({ error: 'Yulduzcha 1 dan 5 gacha' });

  const comment = new Comment({
    id: crypto.randomUUID(),
    ad_id: req.params.id,
    user_id: userId,
    text,
    stars: Math.round(stars),
    likes: [],
    dislikes: []
  });
  await comment.save();

  const rating = await adRating(req.params.id);
  res.json({ success: true, comment_id: comment.id, ...rating });
});

app.post('/api/comments/:id/vote', async (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(400).json({ error: 'user_id yoq' });
  const type = req.body.type;
  if (type !== 'like' && type !== 'dislike') return res.status(400).json({ error: 'Notogri ovoz turi' });

  const comment = await Comment.findOne({ id: req.params.id });
  if (!comment) return res.status(404).json({ error: 'Izoh topilmadi' });

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

  comment.markModified('likes');
  comment.markModified('dislikes');
  await comment.save();

  res.json({ likes: comment.likes.length, dislikes: comment.dislikes.length, my_vote: target.includes(userId) ? type : null });
});

// -------------------------------------------------------------
// Media & E'lonlar API
// -------------------------------------------------------------
const mediaStorage = multer.diskStorage({
  destination: UPLOAD_DIR,
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${crypto.randomUUID()}${ext}`);
  },
});
const uploadMedia = multer({
  storage: mediaStorage,
  limits: { fileSize: 25 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ok = /image\/(jpeg|png|webp|gif)|video\/(mp4|webm|quicktime)/.test(file.mimetype);
    cb(ok ? null : new Error('Faqat rasm (jpg/png/webp) yoki video (mp4/webm) qabul qilinadi'), ok);
  },
});

app.post('/api/ads', uploadMedia.array('media', MAX_PHOTOS), async (req, res) => {
  const { title, description, price, category, phone, city, whatsapp, telegram } = req.body;
  const userId = getUserId(req);
  const files = req.files || [];

  function cleanupFiles() {
    files.forEach((f) => { try { fs.unlinkSync(f.path); } catch (e) {} });
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

  const photoCount = files.filter((f) => f.mimetype.startsWith('image')).length;
  const cost = Math.max(1, photoCount);

  const user = await ensureUser(userId);
  if (user.balance_usd < cost) {
    cleanupFiles();
    return res.status(402).json({ error: 'Balansingizda mablag\' yetarli emas', balance_usd: user.balance_usd, required_usd: cost });
  }

  user.balance_usd = Math.round((user.balance_usd - cost) * 100) / 100;
  user.history.push({ type: 'ad_post', amount_usd: -cost, at: new Date().toISOString() });
  await user.save();

  const media = files.map((f) => ({
    url: `/uploads/${f.filename}`,
    type: f.mimetype.startsWith('video') ? 'video' : 'image',
  }));

  const ad = new Ad({
    id: crypto.randomUUID(),
    title,
    description,
    price: price || null,
    category,
    city: city || '',
    phone,
    whatsapp: whatsapp || '',
    telegram: telegram || '',
    media,
    media_url: media[0] ? media[0].url : null,
    media_type: media[0] ? media[0].type : null,
    cost_usd: cost,
    status: 'published',
    payment_method: 'balance',
    created_by: userId
  });
  await ad.save();

  res.json({ ad_id: ad.id, balance_usd: user.balance_usd, cost_usd: cost });
});

app.get('/api/ads', async (req, res) => {
  const { category, city, q } = req.query;
  let filter = { status: 'published' };

  if (category) filter.category = category;
  if (city) filter.city = new RegExp(city, 'i');
  if (q) {
    filter.$or = [
      { title: new RegExp(q, 'i') },
      { description: new RegExp(q, 'i') }
    ];
  }

  const ads = await Ad.find(filter).sort({ created_at: -1 }).lean();
  
  const result = await Promise.all(ads.map(async (a) => {
    const rating = await adRating(a.id);
    return { ...a, ...rating };
  }));

  res.json(result);
});

app.get('/api/ads/:id', async (req, res) => {
  const ad = await Ad.findOne({ id: req.params.id }).lean();
  if (!ad) return res.status(404).json({ error: 'Topilmadi' });
  const rating = await adRating(ad.id);
  res.json({ ...ad, ...rating });
});

// E'lon ochilganda ko'rishlar sonini +1 oshiradi (bir marta, e'lon ochilganda chaqiriladi)
app.post('/api/ads/:id/view', async (req, res) => {
  const ad = await Ad.findOneAndUpdate(
    { id: req.params.id },
    { $inc: { views: 1 } },
    { new: true }
  ).lean();
  if (!ad) return res.status(404).json({ error: 'Topilmadi' });
  res.json({ views: ad.views });
});

// -------------------------------------------------------------
// ADMIN Bo'limi
// -------------------------------------------------------------
function checkAdmin(req, res, next) {
  if (!ADMIN_PASSWORD || req.headers['x-admin-password'] !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Parol noto‘g‘ri' });
  }
  next();
}

app.get('/api/admin/deposits/pending', checkAdmin, async (req, res) => {
  const deposits = await Deposit.find({ status: 'pending' }).sort({ created_at: -1 });
  res.json(deposits);
});

app.post('/api/admin/deposits/:id/approve', checkAdmin, async (req, res) => {
  const dep = await Deposit.findOne({ id: req.params.id });
  if (!dep) return res.status(404).json({ error: 'So\'rov topilmadi' });
  if (dep.status !== 'pending') return res.status(400).json({ error: 'Bu so\'rov allaqachon ko\'rib chiqilgan' });

  dep.status = 'approved';
  dep.approved_at = new Date().toISOString();
  await dep.save();

  const user = await ensureUser(dep.user_id);
  user.balance_usd = Math.round((user.balance_usd + dep.amount_usd) * 100) / 100;
  user.history.push({ type: `deposit_${dep.method}`, amount_usd: dep.amount_usd, deposit_id: dep.id, at: new Date().toISOString() });
  await user.save();

  res.json({ ok: true });
});

app.post('/api/admin/deposits/:id/reject', checkAdmin, async (req, res) => {
  const dep = await Deposit.findOne({ id: req.params.id });
  if (!dep) return res.status(404).json({ error: 'So\'rov topilmadi' });
  if (dep.status !== 'pending') return res.status(400).json({ error: 'Bu so\'rov allaqachon ko\'rib chiqilgan' });

  dep.status = 'rejected';
  dep.rejected_at = new Date().toISOString();
  await dep.save();

  res.json({ ok: true });
});

app.get('/api/admin/ads', checkAdmin, async (req, res) => {
  const ads = await Ad.find().sort({ created_at: -1 }).lean();
  const result = await Promise.all(ads.map(async (a) => {
    const rating = await adRating(a.id);
    return { ...a, ...rating };
  }));
  res.json(result);
});

app.delete('/api/admin/ads/:id', checkAdmin, async (req, res) => {
  const ad = await Ad.findOneAndDelete({ id: req.params.id });
  if (!ad) return res.status(404).json({ error: 'Elon topilmadi' });

  (ad.media || []).forEach((m) => {
    const p = path.join(__dirname, 'public', m.url.replace(/^\//, ''));
    fs.unlink(p, () => {});
  });

  await Comment.deleteMany({ ad_id: req.params.id });
  res.json({ ok: true });
});

app.get('/api/admin/comments', checkAdmin, async (req, res) => {
  const comments = await Comment.find().sort({ created_at: -1 }).lean();
  const ads = await Ad.find().lean();

  const result = comments.map((c) => {
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
  res.json(result);
});

app.delete('/api/admin/comments/:id', checkAdmin, async (req, res) => {
  const result = await Comment.findOneAndDelete({ id: req.params.id });
  if (!result) return res.status(404).json({ error: 'Izoh topilmadi' });
  res.json({ ok: true });
});

app.use((err, req, res, next) => {
  if (err) {
    console.error(err.message);
    return res.status(400).json({ error: err.message || 'Xatolik yuz berdi' });
  }
  next();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ AZZO S-MARKET serveri ${PORT}-portda muvaffaqiyatli ishga tushdi`));
