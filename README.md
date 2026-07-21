# E'lonlar sayti — Pro versiya

Odamlar o'zlari e'lon/reklama joylaydigan sayt (rasm/video bilan). Har bir e'lon **balansdan $1** yechilib chop etiladi.

Bu versiyada oldingi kodda **ishlamay yotgan** Click/Payme/kripto-invoice/karta-invoice tizimi olib tashlandi (chunki hech qanday endpoint e'lonni "to'lov kutmoqda" holatiga o'tkazmagani uchun admin panelidagi tasdiqlash tugmasi hech qachon ishlamas edi). O'rniga **bitta, boshidan oxirigacha ulangan** oqim qo'yildi:

## Qanday ishlaydi

1. **Balansni to'ldirish** — ikki usul bilan:
   - **Stripe** (Visa/Mastercard) — avtomatik, sayt ichida karta formasi.
   - **Karta/Kripto — qo'lda** — foydalanuvchi ko'rsatilgan Uzcard/Humo/Visa/Mastercard raqamiga yoki kripto-hamyoningizga o'zi pul o'tkazadi, chek skrinshotini yuklaydi.
2. Qo'lda to'ldirish so'rovi `data/deposits.json` ga `"pending"` holatida yoziladi.
3. Siz `/admin.html` ga kirib (parol — `.env` dagi `ADMIN_PASSWORD`), chekni ko'rasiz va **Tasdiqlash** yoki **Rad etish** bosasiz.
4. Tasdiqlasangiz — summani **avtomatik ravishda foydalanuvchi balansiga qo'shadi**.
5. Foydalanuvchi balansidan $1 yechilib, e'lon darhol chop etiladi.

## Ishga tushirish

```bash
npm install
npm start
```

Brauzerda: http://localhost:3000
Admin panel: http://localhost:3000/admin.html

`.env` fayl allaqachon sizning rekvizitlaringiz (Uzcard, Humo, Visa, Mastercard, USDT TRC20/BEP20/TON, BTC, ETH) bilan to'ldirilgan holda qo'shilgan. **Admin parolingiz** (`.env` dagi `ADMIN_PASSWORD`) tasodifiy generatsiya qilingan — uni faylni ochib ko'rib, xohlasangiz o'zgartiring, lekin **hech kimga bermang**.

Stripe orqali ham to'ldirishni yoqmoqchi bo'lsangiz, `.env` dagi `STRIPE_SECRET_KEY` va `STRIPE_PUBLISHABLE_KEY` ni https://dashboard.stripe.com/apikeys dan olib to'ldiring. Bo'sh qoldirsangiz, "Karta/Kripto" (qo'lda) yo'nalishi baribir to'liq ishlaydi.

## Muhim — production'ga chiqarishdan oldin

- **Baza:** hozir hammasi JSON fayllarda (`data/ads.json`, `data/balances.json`, `data/deposits.json`). Kichik trafik uchun yetarli, lekin foydalanuvchi ko'payib, bir vaqtda ko'p yozuv bo'lsa (concurrent write) ma'lumot yo'qolishi mumkin — SQLite yoki PostgreSQL'ga o'tishni tavsiya qilamiz.
- **HTTPS majburiy:** admin parol va Stripe kalitlari faqat HTTPS ustida xavfsiz. Domenga SSL sertifikat (masalan Let's Encrypt) o'rnating.
- **`.env` faylni hech qachon GitHub'ga yubormang** — `.gitignore` ga qo'shilgan, lekin serverga qo'lda yuklashda ham ehtiyot bo'ling.
- Yuklangan fayllar (`public/uploads`, `public/receipts`) uzoq muddatda katta hajmga yetsa, AWS S3 yoki shunga o'xshash saqlash xizmatiga o'tkazish tavsiya etiladi.

## Loyiha tuzilishi

```
elonlar-sayti/
├── server.js                # Backend API (e'lonlar, balans, qo'lda to'ldirish, admin)
├── package.json
├── .env                      # Sizning haqiqiy rekvizitlaringiz (GitHub'ga yubormang!)
├── .env.example              # Bo'sh namuna
├── data/
│   ├── ads.json               # E'lonlar bazasi
│   ├── balances.json           # Foydalanuvchilar balansi
│   └── deposits.json            # Balans to'ldirish so'rovlari (pending/approved/rejected)
└── public/
    ├── index.html              # Bosh sahifa + to'lov modallari
    ├── style.css
    ├── app.js
    ├── admin.html               # To'ldirish so'rovlarini tasdiqlash paneli
    ├── success.html
    ├── uploads/                 # E'lon rasm/videolari
    └── receipts/                # Yuklangan to'lov cheklari
```

## API endpointlar qisqacha

| Endpoint | Vazifasi |
|---|---|
| `GET /api/balance` | Joriy balansni ko'rish |
| `GET /api/payment-methods` | Karta/kripto rekvizitlarini olish |
| `POST /api/balance/deposit/manual` | Chek yuklab, to'ldirish so'rovi yuborish |
| `GET /api/balance/deposit/mine` | O'z so'rovlarim holati |
| `POST /api/balance/deposit/create-intent` / `confirm-intent` | Stripe orqali to'ldirish |
| `POST /api/ads` | E'lon joylash ($1 balansdan yechiladi) |
| `POST /api/ads/:id/refund` | 1 soat ichida bekor qilish |
| `GET /api/ads` | E'lonlar ro'yxati |
| `GET /api/admin/deposits/pending` | (admin) Kutayotgan so'rovlar |
| `POST /api/admin/deposits/:id/approve` / `reject` | (admin) Tasdiqlash/rad etish |
