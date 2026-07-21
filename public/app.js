// app.js — frontend logika

// ============ I18N ============
const I18N = {
  uz: {
    search_placeholder: "Nima qidiryapsiz?",
    balance_tooltip: "USD/UZS almashtirish",
    balance_label: "Balans:",
    deposit_btn: "To'ldirish",
    post_btn: "E'lon joylash",
    hero_eyebrow: "Har bir e'lon — bitta chek. Bitta dollar.",
    hero_title: "Sotasizmi? Sotib olasizmi?<br>E'loningizni <em>bugun</em> chop eting.",
    hero_sub: "Ro'yxatdan o'tish shart emas. Formani to'ldiring, $1 to'lang — e'loningiz shu zahoti ko'rinadi.",
    cat_all: "Barchasi",
    cat_sport: "⚽ Sport, Xobbi va Boshqalar",
    cat_ishxizmat: "💼 Ish va Xizmatlar",
    cat_bolalar: "👶 Bolalar dunyosi",
    cat_uybog: "🏠 Uy va Bog' uchun",
    cat_moda: "👗 Moda va Uslub",
    cat_elektronika: "📱 Elektronika va Maishiy texnika",
    cat_kochmasmulk: "🏢 Ko'chmas mulk (Uy-joy)",
    cat_transport: "🚘 Transport va Texnika",
    cat_sport_plain: "Sport, Xobbi va Boshqalar",
    cat_ishxizmat_plain: "Ish va Xizmatlar",
    cat_bolalar_plain: "Bolalar dunyosi",
    cat_uybog_plain: "Uy va Bog'",
    cat_moda_plain: "Moda va Uslub",
    cat_elektronika_plain: "Elektronika va Maishiy texnika",
    cat_kochmasmulk_plain: "Ko'chmas mulk (Uy-joy)",
    cat_transport_plain: "Transport va Texnika",
    empty_state: "Hozircha e'lonlar yo'q. Birinchi bo'lib siz joylang!",
    footer_copy: "© 2026 AZZO's MARKET. Har bir e'lon — bir dollarlik ishonch.",
    post_eyebrow: "E'lon joylash — $1 (balansdan yechiladi)",
    post_h2: "E'lon ma'lumotlari",
    form_balance_label: "Balansingiz:",
    label_media: "Rasm yoki video",
    label_title: "Sarlavha",
    ph_title: "Masalan: Chevrolet Nexia, 2019",
    label_description: "Tavsif",
    ph_description: "Holati, tafsilotlar...",
    label_price: "Narx (ixtiyoriy)",
    ph_price: "Masalan: $8,500",
    label_category: "Kategoriya",
    label_city: "Shahar",
    label_phone: "Telefon",
    submit_ad_btn: "Joylash — $1",
    submitting: "Yuborilmoqda...",
    post_error_generic: "Xatolik: formani tekshiring",
    network_error: "Tarmoq xatoligi",
    success_eyebrow: "Tayyor",
    success_h2: "E'loningiz chop etildi ✓",
    success_balance_label: "Balansingizdan $1 yechildi. Qolgan balans:",
    success_note: "E'loningiz saytda barchaga ko'rinmoqda. Xaridorlar sizga to'g'ridan-to'g'ri qo'ng'iroq qilishadi.",
    close_btn: "Yopish",
    deposit_eyebrow: "Balansni to'ldirish",
    deposit_h2: "Karta yoki kripto orqali to'ldirish",
    label_amount: "Summa (min $1, max $100,000)",
    label_receipt: "To'lov chekini yuklang (rasm yoki PDF)",
    submit_receipt_btn: "Chekni yuborish",
    deposit_note: "To'lov qilgach, chek skrinshotini yuklang. Admin tasdiqlagach balansingiz avtomatik to'ldiriladi (odatda tez orada).",
    paid_label: "✓ To'langan",
    methods_load_error: "Rekvizitlarni yuklab bo'lmadi",
    amount_range_error: "Summani $1 dan $100,000 gacha kiriting",
    method_required_error: "To'lov usulini tanlang",
    receipt_required_error: "Chek skrinshotini yuklang",
    copy_label: "📋 Nusxalash",
    copied_label: "✓ Nusxalandi",
    menu_aria: "Ko'proq",
    saved_tooltip: "Saqlanganlar",
    save_aria: "Saqlash",
    save_label: "Saqlash",
    saved_label: "Saqlangan ✓",
    saved_empty: "Sizda hali saqlangan e'lonlar yo'q. Yoqtirgan e'lonlaringizni yurakcha tugmasi orqali saqlang!",
    buy_label: "🛒 Sotib olaman",
    close_lightbox_aria: "Rasmni yopish",
    label_cover: "Asosiy rasm (Cover)",
    cover_placeholder: "+ Cover rasm tanlang",
    label_info: "Ma'lumot",
    label_other_photos: "Boshqa rasmlar (ixtiyoriy, maks. 10 tagacha jami)",
    add_photo_btn: "+ Rasm qo'shish",
    label_whatsapp: "WhatsApp (ixtiyoriy)",
    ph_whatsapp: "+998 90 123 45 67",
    label_telegram: "Telegram (ixtiyoriy)",
    ph_telegram: "@username yoki kanal",
    max_photos_error: "Maksimal 10 ta rasm yuklash mumkin",
    choose_receipt_btn: "📎 Chek faylini tanlash",
    prev_aria: "Oldingi rasm",
    next_aria: "Keyingi rasm",
    contact_call: "📞 Qo'ng'iroq qilish",
    contact_whatsapp: "💬 WhatsApp orqali yozish",
    contact_telegram: "✈️ Telegramda yozish",
    details_contact_label: "Bog'lanish",
    photo_count_price: "{count} ta rasm — jami ${cost}",
    post_action_label: "Joylash",
  },
  en: {
    search_placeholder: "What are you looking for?",
    balance_tooltip: "Switch USD/UZS",
    balance_label: "Balance:",
    deposit_btn: "Top up",
    post_btn: "Post an ad",
    hero_eyebrow: "One listing — one receipt. One dollar.",
    hero_title: "Selling? Buying?<br>Publish your listing <em>today</em>.",
    hero_sub: "No sign-up needed. Fill in the form, pay $1 — your listing goes live instantly.",
    cat_all: "All",
    cat_sport: "⚽ Sports, Hobbies & Other",
    cat_ishxizmat: "💼 Jobs & Services",
    cat_bolalar: "👶 Kids' World",
    cat_uybog: "🏠 Home & Garden",
    cat_moda: "👗 Fashion & Style",
    cat_elektronika: "📱 Electronics & Appliances",
    cat_kochmasmulk: "🏢 Real Estate",
    cat_transport: "🚘 Vehicles & Machinery",
    cat_sport_plain: "Sports, Hobbies & Other",
    cat_ishxizmat_plain: "Jobs & Services",
    cat_bolalar_plain: "Kids' World",
    cat_uybog_plain: "Home & Garden",
    cat_moda_plain: "Fashion & Style",
    cat_elektronika_plain: "Electronics & Appliances",
    cat_kochmasmulk_plain: "Real Estate",
    cat_transport_plain: "Vehicles & Machinery",
    empty_state: "No listings yet. Be the first to post one!",
    footer_copy: "© 2026 AZZO's MARKET. Every listing — a dollar of trust.",
    post_eyebrow: "Post a listing — $1 (deducted from balance)",
    post_h2: "Listing details",
    form_balance_label: "Your balance:",
    label_media: "Photo or video",
    label_title: "Title",
    ph_title: "E.g.: Chevrolet Nexia, 2019",
    label_description: "Description",
    ph_description: "Condition, details...",
    label_price: "Price (optional)",
    ph_price: "E.g.: $8,500",
    label_category: "Category",
    label_city: "City",
    label_phone: "Phone",
    submit_ad_btn: "Post — $1",
    submitting: "Submitting...",
    post_error_generic: "Error: please check the form",
    network_error: "Network error",
    success_eyebrow: "Done",
    success_h2: "Your listing is live ✓",
    success_balance_label: "$1 was deducted. Remaining balance:",
    success_note: "Your listing is now visible to everyone. Buyers will call you directly.",
    close_btn: "Close",
    deposit_eyebrow: "Top up balance",
    deposit_h2: "Top up by card or crypto",
    label_amount: "Amount (min $1, max $100,000)",
    label_receipt: "Upload payment receipt (image or PDF)",
    submit_receipt_btn: "Submit receipt",
    deposit_note: "After paying, upload a screenshot of the receipt. Once an admin confirms it, your balance is topped up automatically (usually shortly after).",
    paid_label: "✓ Paid",
    methods_load_error: "Couldn't load payment details",
    amount_range_error: "Enter an amount between $1 and $100,000",
    method_required_error: "Choose a payment method",
    receipt_required_error: "Upload a receipt screenshot",
    copy_label: "📋 Copy",
    copied_label: "✓ Copied",
    menu_aria: "More",
    saved_tooltip: "Saved",
    save_aria: "Save",
    save_label: "Save",
    saved_label: "Saved ✓",
    saved_empty: "You don't have any saved listings yet. Tap the heart icon to save the ones you like!",
    buy_label: "🛒 I want to buy",
    close_lightbox_aria: "Close image",
    label_cover: "Cover photo",
    cover_placeholder: "+ Choose cover photo",
    label_info: "Details",
    label_other_photos: "Other photos (optional, up to 10 total)",
    add_photo_btn: "+ Add photo",
    label_whatsapp: "WhatsApp (optional)",
    ph_whatsapp: "+998 90 123 45 67",
    label_telegram: "Telegram (optional)",
    ph_telegram: "@username or channel",
    max_photos_error: "You can upload up to 10 photos",
    choose_receipt_btn: "📎 Choose receipt file",
    prev_aria: "Previous photo",
    next_aria: "Next photo",
    contact_call: "📞 Call",
    contact_whatsapp: "💬 Message on WhatsApp",
    contact_telegram: "✈️ Message on Telegram",
    details_contact_label: "Contact",
    photo_count_price: "{count} photo(s) — total ${cost}",
    post_action_label: "Post",
  },
  ru: {
    search_placeholder: "Что вы ищете?",
    balance_tooltip: "Переключить USD/UZS",
    balance_label: "Баланс:",
    deposit_btn: "Пополнить",
    post_btn: "Разместить объявление",
    hero_eyebrow: "Одно объявление — один чек. Один доллар.",
    hero_title: "Продаёте? Покупаете?<br>Опубликуйте объявление <em>сегодня</em>.",
    hero_sub: "Регистрация не нужна. Заполните форму, заплатите $1 — объявление появится мгновенно.",
    cat_all: "Все",
    cat_sport: "⚽ Спорт, хобби и другое",
    cat_ishxizmat: "💼 Работа и услуги",
    cat_bolalar: "👶 Детский мир",
    cat_uybog: "🏠 Дом и сад",
    cat_moda: "👗 Мода и стиль",
    cat_elektronika: "📱 Электроника и техника",
    cat_kochmasmulk: "🏢 Недвижимость",
    cat_transport: "🚘 Транспорт и техника",
    cat_sport_plain: "Спорт, хобби и другое",
    cat_ishxizmat_plain: "Работа и услуги",
    cat_bolalar_plain: "Детский мир",
    cat_uybog_plain: "Дом и сад",
    cat_moda_plain: "Мода и стиль",
    cat_elektronika_plain: "Электроника и техника",
    cat_kochmasmulk_plain: "Недвижимость",
    cat_transport_plain: "Транспорт и техника",
    empty_state: "Пока нет объявлений. Будьте первым!",
    footer_copy: "© 2026 AZZO's MARKET. Каждое объявление — доллар доверия.",
    post_eyebrow: "Размещение объявления — $1 (списывается с баланса)",
    post_h2: "Данные объявления",
    form_balance_label: "Ваш баланс:",
    label_media: "Фото или видео",
    label_title: "Заголовок",
    ph_title: "Например: Chevrolet Nexia, 2019",
    label_description: "Описание",
    ph_description: "Состояние, подробности...",
    label_price: "Цена (необязательно)",
    ph_price: "Например: $8,500",
    label_category: "Категория",
    label_city: "Город",
    label_phone: "Телефон",
    submit_ad_btn: "Разместить — $1",
    submitting: "Отправка...",
    post_error_generic: "Ошибка: проверьте форму",
    network_error: "Ошибка сети",
    success_eyebrow: "Готово",
    success_h2: "Ваше объявление опубликовано ✓",
    success_balance_label: "Списано $1. Остаток баланса:",
    success_note: "Ваше объявление теперь видно всем. Покупатели будут звонить вам напрямую.",
    close_btn: "Закрыть",
    deposit_eyebrow: "Пополнение баланса",
    deposit_h2: "Пополнение картой или крипто",
    label_amount: "Сумма (мин $1, макс $100,000)",
    label_receipt: "Загрузите чек об оплате (фото или PDF)",
    submit_receipt_btn: "Отправить чек",
    deposit_note: "После оплаты загрузите скриншот чека. После подтверждения администратором баланс пополнится автоматически (обычно вскоре).",
    paid_label: "✓ Оплачено",
    methods_load_error: "Не удалось загрузить реквизиты",
    amount_range_error: "Введите сумму от $1 до $100,000",
    method_required_error: "Выберите способ оплаты",
    receipt_required_error: "Загрузите скриншот чека",
    copy_label: "📋 Копировать",
    copied_label: "✓ Скопировано",
    menu_aria: "Ещё",
    saved_tooltip: "Сохранённые",
    save_aria: "Сохранить",
    save_label: "Сохранить",
    saved_label: "Сохранено ✓",
    saved_empty: "У вас пока нет сохранённых объявлений. Нажмите на сердечко, чтобы сохранить понравившиеся!",
    buy_label: "🛒 Хочу купить",
    close_lightbox_aria: "Закрыть изображение",
    label_cover: "Обложка (главное фото)",
    cover_placeholder: "+ Выбрать обложку",
    label_info: "Данные",
    label_other_photos: "Другие фото (необязательно, макс. 10 всего)",
    add_photo_btn: "+ Добавить фото",
    label_whatsapp: "WhatsApp (необязательно)",
    ph_whatsapp: "+998 90 123 45 67",
    label_telegram: "Telegram (необязательно)",
    ph_telegram: "@username или канал",
    max_photos_error: "Можно загрузить максимум 10 фото",
    choose_receipt_btn: "📎 Выбрать файл чека",
    prev_aria: "Предыдущее фото",
    next_aria: "Следующее фото",
    contact_call: "📞 Позвонить",
    contact_whatsapp: "💬 Написать в WhatsApp",
    contact_telegram: "✈️ Написать в Telegram",
    details_contact_label: "Связаться",
    photo_count_price: "{count} фото — итого ${cost}",
    post_action_label: "Разместить",
  },
  ar: {
    search_placeholder: "عن ماذا تبحث؟",
    balance_tooltip: "التبديل بين USD/UZS",
    balance_label: "الرصيد:",
    deposit_btn: "شحن الرصيد",
    post_btn: "نشر إعلان",
    hero_eyebrow: "كل إعلان — إيصال واحد. دولار واحد.",
    hero_title: "تبيع؟ تشتري؟<br>انشر إعلانك <em>اليوم</em>.",
    hero_sub: "لا حاجة للتسجيل. املأ النموذج وادفع دولارًا واحدًا — يظهر إعلانك فورًا.",
    cat_all: "الكل",
    cat_sport: "⚽ رياضة وهوايات وأخرى",
    cat_ishxizmat: "💼 وظائف وخدمات",
    cat_bolalar: "👶 عالم الأطفال",
    cat_uybog: "🏠 المنزل والحديقة",
    cat_moda: "👗 الموضة والأناقة",
    cat_elektronika: "📱 إلكترونيات وأجهزة منزلية",
    cat_kochmasmulk: "🏢 عقارات",
    cat_transport: "🚘 مركبات ومعدات",
    cat_sport_plain: "رياضة وهوايات وأخرى",
    cat_ishxizmat_plain: "وظائف وخدمات",
    cat_bolalar_plain: "عالم الأطفال",
    cat_uybog_plain: "المنزل والحديقة",
    cat_moda_plain: "الموضة والأناقة",
    cat_elektronika_plain: "إلكترونيات وأجهزة منزلية",
    cat_kochmasmulk_plain: "عقارات",
    cat_transport_plain: "مركبات ومعدات",
    empty_state: "لا توجد إعلانات بعد. كن أول من ينشر!",
    footer_copy: "© 2026 AZZO's MARKET. كل إعلان — دولار من الثقة.",
    post_eyebrow: "نشر إعلان — دولار واحد (يُخصم من الرصيد)",
    post_h2: "تفاصيل الإعلان",
    form_balance_label: "رصيدك:",
    label_media: "صورة أو فيديو",
    label_title: "العنوان",
    ph_title: "مثال: Chevrolet Nexia, 2019",
    label_description: "الوصف",
    ph_description: "الحالة، التفاصيل...",
    label_price: "السعر (اختياري)",
    ph_price: "مثال: $8,500",
    label_category: "الفئة",
    label_city: "المدينة",
    label_phone: "الهاتف",
    submit_ad_btn: "نشر — دولار واحد",
    submitting: "جارٍ الإرسال...",
    post_error_generic: "خطأ: يرجى مراجعة النموذج",
    network_error: "خطأ في الشبكة",
    success_eyebrow: "تم",
    success_h2: "تم نشر إعلانك ✓",
    success_balance_label: "تم خصم دولار واحد. الرصيد المتبقي:",
    success_note: "إعلانك مرئي الآن للجميع. سيتصل بك المشترون مباشرة.",
    close_btn: "إغلاق",
    deposit_eyebrow: "شحن الرصيد",
    deposit_h2: "الشحن عبر البطاقة أو العملة الرقمية",
    label_amount: "المبلغ (الحد الأدنى $1، الحد الأقصى $100,000)",
    label_receipt: "ارفع إيصال الدفع (صورة أو PDF)",
    submit_receipt_btn: "إرسال الإيصال",
    deposit_note: "بعد الدفع، ارفع لقطة شاشة للإيصال. بعد موافقة المشرف سيُشحن رصيدك تلقائيًا (عادة خلال وقت قصير).",
    paid_label: "✓ مدفوع",
    methods_load_error: "تعذر تحميل بيانات الدفع",
    amount_range_error: "أدخل مبلغًا بين $1 و $100,000",
    method_required_error: "اختر طريقة الدفع",
    receipt_required_error: "ارفع صورة الإيصال",
    copy_label: "📋 نسخ",
    copied_label: "✓ تم النسخ",
    menu_aria: "المزيد",
    saved_tooltip: "المحفوظات",
    save_aria: "حفظ",
    save_label: "حفظ",
    saved_label: "محفوظ ✓",
    saved_empty: "لا توجد لديك إعلانات محفوظة بعد. اضغط على أيقونة القلب لحفظ ما يعجبك!",
    buy_label: "🛒 أريد الشراء",
    close_lightbox_aria: "إغلاق الصورة",
    label_cover: "الصورة الرئيسية (الغلاف)",
    cover_placeholder: "+ اختر صورة الغلاف",
    label_info: "التفاصيل",
    label_other_photos: "صور أخرى (اختياري، بحد أقصى 10 صور)",
    add_photo_btn: "+ إضافة صورة",
    label_whatsapp: "واتساب (اختياري)",
    ph_whatsapp: "+998 90 123 45 67",
    label_telegram: "تيليجرام (اختياري)",
    ph_telegram: "@username أو قناة",
    max_photos_error: "يمكن رفع 10 صور كحد أقصى",
    choose_receipt_btn: "📎 اختر ملف الإيصال",
    prev_aria: "الصورة السابقة",
    next_aria: "الصورة التالية",
    contact_call: "📞 اتصال",
    contact_whatsapp: "💬 مراسلة عبر واتساب",
    contact_telegram: "✈️ مراسلة عبر تيليجرام",
    details_contact_label: "التواصل",
    photo_count_price: "{count} صورة — الإجمالي ${cost}",
    post_action_label: "نشر",
  },
};

let currentLang = localStorage.getItem('site_lang') || 'uz';

function t(key) {
  return (I18N[currentLang] && I18N[currentLang][key]) || I18N.uz[key] || key;
}

function categoryLabel(cat) {
  const map = { sport: 'cat_sport', ishxizmat: 'cat_ishxizmat', bolalar: 'cat_bolalar', uybog: 'cat_uybog', moda: 'cat_moda', elektronika: 'cat_elektronika', kochmasmulk: 'cat_kochmasmulk', transport: 'cat_transport' };
  return map[cat] ? t(map[cat]) : cat;
}

function applyLanguage(lang) {
  currentLang = I18N[lang] ? lang : 'uz';
  localStorage.setItem('site_lang', currentLang);

  document.documentElement.lang = currentLang;
  document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    el.innerHTML = t(el.dataset.i18nHtml);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  document.querySelectorAll('[data-i18n-title]').forEach((el) => {
    el.title = t(el.dataset.i18nTitle);
  });

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });

  // Dinamik ravishda render qilinadigan qismlarni yangilash
  loadAds();
  if (typeof updatePhotoPriceNote === 'function') updatePhotoPriceNote();
}

document.getElementById('langSwitcher').addEventListener('click', (e) => {
  const btn = e.target.closest('.lang-btn');
  if (!btn) return;
  applyLanguage(btn.dataset.lang);
});

let UZS_RATE = 12650;
let showUzs = false;
let currentCategory = '';
let currentQuery = '';

const adsGrid = document.getElementById('adsGrid');
const emptyState = document.getElementById('emptyState');

// ---------- Anonim foydalanuvchi ID (login yo'q, brauzerga saqlanadi) ----------
function getUserId() {
  let id = localStorage.getItem('user_id');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('user_id', id);
  }
  return id;
}
const USER_ID = getUserId();
function authHeaders(extra) {
  return Object.assign({ 'x-user-id': USER_ID }, extra || {});
}

// ---------- Saqlangan e'lonlar (Yoqtirilganlar) — brauzerda saqlanadi ----------
const SAVED_KEY = 'azzo_saved_ads';
let showSavedOnly = false;

function getSavedIds() {
  try { return JSON.parse(localStorage.getItem(SAVED_KEY)) || []; } catch (e) { return []; }
}
function setSavedIds(ids) {
  localStorage.setItem(SAVED_KEY, JSON.stringify(ids));
}
function isSaved(id) {
  return getSavedIds().includes(id);
}
function toggleSaved(id) {
  const ids = getSavedIds();
  const idx = ids.indexOf(id);
  if (idx === -1) { ids.push(id); } else { ids.splice(idx, 1); }
  setSavedIds(ids);
  updateSavedBadge();
  return idx === -1; // true = endi saqlangan, false = olib tashlandi
}
function updateSavedBadge() {
  const badge = document.getElementById('savedBadge');
  if (!badge) return;
  const count = getSavedIds().length;
  badge.textContent = count > 99 ? '99+' : String(count);
  badge.hidden = count === 0;
}
function heartSvg(active) {
  return `<svg viewBox="0 0 24 24" fill="${active ? 'currentColor' : 'none'}"><path d="M12 20.5s-7-4.4-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 5.5c-2.5 4.6-9.5 9-9.5 9Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`;
}

function eyeSvg() {
  return `<svg viewBox="0 0 24 24" fill="none"><path d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/></svg>`;
}

function formatViews(n) {
  n = n || 0;
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace('.0', '') + 'mln';
  if (n >= 1000) return (n / 1000).toFixed(1).replace('.0', '') + 'ming';
  return String(n);
}
updateSavedBadge();

document.getElementById('savedToggle').addEventListener('click', () => {
  showSavedOnly = !showSavedOnly;
  document.getElementById('savedToggle').classList.toggle('active', showSavedOnly);
  if (showSavedOnly) {
    document.querySelectorAll('.chip').forEach((c) => c.classList.remove('active'));
  } else {
    document.querySelectorAll('.chip').forEach((c) => c.classList.toggle('active', c.dataset.cat === currentCategory));
  }
  loadAds();
});

// ---------- Balans ----------
async function loadBalance() {
  try {
    const res = await fetch('/api/balance', { headers: authHeaders() });
    const data = await res.json();
    if (data.uzs_rate) UZS_RATE = data.uzs_rate;
    renderBalance(data.balance_usd || 0);
  } catch (e) { /* jim */ }
}
function renderBalance(usd) {
  const el = document.getElementById('balanceAmount');
  el.textContent = showUzs
    ? `${Math.round(usd * UZS_RATE).toLocaleString('ru-RU')} so'm`
    : `$${usd.toFixed(2)}`;
  const formEl = document.getElementById('formBalanceAmount');
  if (formEl) formEl.textContent = `$${usd.toFixed(2)}`;
  document.getElementById('balancePill').dataset.usd = usd;
}
document.getElementById('balancePill').addEventListener('click', () => {
  showUzs = !showUzs;
  renderBalance(Number(document.getElementById('balancePill').dataset.usd || 0));
});

// ---------- E'lonlarni yuklash ----------
async function loadAds() {
  emptyState.textContent = t('empty_state');

  if (showSavedOnly) {
    const res = await fetch('/api/ads');
    let ads = await res.json();
    const savedIds = getSavedIds();
    ads = ads.filter((ad) => savedIds.includes(ad.id));
    if (currentQuery) {
      const q = currentQuery.toLowerCase();
      ads = ads.filter((ad) => (ad.title || '').toLowerCase().includes(q) || (ad.description || '').toLowerCase().includes(q));
    }
    renderAds(ads);
    if (!ads.length) emptyState.textContent = t('saved_empty');
    return;
  }

  const params = new URLSearchParams();
  if (currentCategory) params.set('category', currentCategory);
  if (currentQuery) params.set('q', currentQuery);

  const res = await fetch(`/api/ads?${params.toString()}`);
  const ads = await res.json();
  renderAds(ads);
}

const adsCache = {}; // id -> ad ma'lumotlari (details modal va lightbox uchun)

function renderAds(ads) {
  adsGrid.innerHTML = '';
  emptyState.hidden = ads.length > 0;

  ads.forEach((ad) => {
    adsCache[ad.id] = ad;
    const card = document.createElement('div');
    card.className = 'ad-card';
    card.dataset.adId = ad.id;

    const images = (ad.media && ad.media.length ? ad.media : (ad.media_url ? [{ url: ad.media_url, type: ad.media_type }] : []));
    const cover = images[0];

    let mediaHtml = '';
    if (cover) {
      mediaHtml = cover.type === 'video'
        ? `<video class="ad-media" src="${cover.url}" muted loop playsinline onmouseover="this.play()" onmouseout="this.pause()"></video>`
        : `<img class="ad-media" src="${cover.url}" alt="${escapeHtml(ad.title)}" loading="lazy" data-zoomable="1" />`;
    }

    const favActive = isSaved(ad.id);
    card.innerHTML = `
      <button type="button" class="ad-card-fav${favActive ? ' active' : ''}" aria-label="${t('save_aria')}">${heartSvg(favActive)}</button>
      <div class="ad-card-menu">
        <button type="button" class="ad-card-menu-btn" aria-label="${t('menu_aria')}">⋯</button>
        <div class="ad-card-menu-dropdown" hidden>
          <a class="ad-card-menu-item" href="tel:${escapeHtml(ad.phone)}">${t('buy_label')}</a>
        </div>
      </div>
      ${mediaHtml}
      <div class="ad-card-body">
        <div class="ad-card-id">
          <span>#${ad.id.slice(0, 8).toUpperCase()}</span>
          <span class="paid">${t('paid_label')}</span>
        </div>
        <h3>${escapeHtml(ad.title)}</h3>
        <p>${escapeHtml(ad.description)}</p>
        <div class="ad-card-footer">
          <span class="ad-price">${ad.price ? escapeHtml(ad.price) : ''}</span>
          <span class="ad-meta">${categoryLabel(ad.category)} · ${escapeHtml(ad.city || '')}</span>
        </div>
        <div class="ad-card-views">${eyeSvg()} <span data-views-for="${ad.id}">${formatViews(ad.views)}</span></div>
        ${ad.rating_count ? `<div class="ad-card-rating">${starsHtml(ad.rating_avg)} <span>${ad.rating_avg.toFixed(1)} · ${ad.rating_count} baho</span></div>` : ''}
        <a class="ad-phone" href="tel:${escapeHtml(ad.phone)}">📞 ${escapeHtml(ad.phone)}</a>
      </div>
    `;
    adsGrid.appendChild(card);
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str || '';
  return div.innerHTML;
}

function starsHtml(avg) {
  const rounded = Math.round(avg || 0);
  let out = '';
  for (let i = 1; i <= 5; i++) out += `<span class="star${i <= rounded ? ' filled' : ''}">★</span>`;
  return `<span class="stars-row">${out}</span>`;
}

function adImages(ad) {
  if (ad.media && ad.media.length) return ad.media.filter((m) => m.type !== 'video');
  if (ad.media_url && ad.media_type !== 'video') return [{ url: ad.media_url, type: 'image' }];
  return [];
}

// ---------- Karta bosilganda: 3-nuqta menyu / rasm zoom / "Ma'lumotlar" ----------
adsGrid.addEventListener('click', (e) => {
  const favBtn = e.target.closest('.ad-card-fav');
  if (favBtn) {
    e.stopPropagation();
    const card = favBtn.closest('.ad-card');
    const id = card.dataset.adId;
    const nowSaved = toggleSaved(id);
    favBtn.classList.toggle('active', nowSaved);
    favBtn.innerHTML = heartSvg(nowSaved);
    favBtn.classList.add('pop');
    setTimeout(() => favBtn.classList.remove('pop'), 160);
    if (showSavedOnly && !nowSaved) {
      card.remove();
      if (!adsGrid.children.length) {
        emptyState.hidden = false;
        emptyState.textContent = t('saved_empty');
      }
    }
    return;
  }

  const menuBtn = e.target.closest('.ad-card-menu-btn');
  if (menuBtn) {
    const dropdown = menuBtn.nextElementSibling;
    const wasHidden = dropdown.hidden;
    closeAllCardMenus();
    dropdown.hidden = !wasHidden;
    e.stopPropagation();
    return;
  }
  if (e.target.closest('.ad-card-menu-dropdown')) return; // menyu ichidagi havolaga bosilsa — o'z holicha ishlasin
  if (e.target.closest('.ad-phone')) return; // qo'ng'iroq havolasi o'z holicha ishlasin

  const card = e.target.closest('.ad-card');
  if (!card) return;
  const ad = adsCache[card.dataset.adId];
  if (!ad) return;

  const zoomImg = e.target.closest('img[data-zoomable]');
  if (zoomImg) {
    openLightbox(adImages(ad), 0);
    return;
  }

  openDetails(ad);
});

document.addEventListener('click', closeAllCardMenus);
function closeAllCardMenus() {
  document.querySelectorAll('.ad-card-menu-dropdown').forEach((d) => { d.hidden = true; });
}

// ---------- "Ma'lumotlar" (e'lon tafsilotlari) modal ----------
const detailsOverlay = document.getElementById('detailsOverlay');

let currentDetailsAd = null;
let currentComments = [];
let currentRating = { rating_avg: 0, rating_count: 0, comments_count: 0 };
let commentsExpanded = false;
let selectedStars = 0;

function commentsBlockHtml() {
  const list = currentComments.length
    ? currentComments.map((c) => `
      <div class="comment-item" data-id="${c.id}">
        <div class="comment-item-top">
          ${starsHtml(c.stars)}
          <span class="comment-date">${new Date(c.created_at).toLocaleDateString('uz-UZ')}</span>
        </div>
        <p class="comment-text">${escapeHtml(c.text)}</p>
        <div class="comment-votes">
          <button type="button" class="comment-vote-btn${c.my_vote === 'like' ? ' active' : ''}" data-id="${c.id}" data-type="like">Yoqdi <span>${c.likes}</span></button>
          <button type="button" class="comment-vote-btn${c.my_vote === 'dislike' ? ' active' : ''}" data-id="${c.id}" data-type="dislike">Yoqmadi <span>${c.dislikes}</span></button>
        </div>
      </div>
    `).join('')
    : `<p class="no-comments">Hozircha izohlar yoq. Birinchi bolib fikr bildiring!</p>`;

  return `
    <div class="comments-toggle" id="commentsToggle">
      <span>Izohlar (${currentRating.comments_count})</span>
      <span class="comments-toggle-arrow">${commentsExpanded ? '\u25b4' : '\u25be'}</span>
    </div>
    <div class="comments-panel" id="commentsPanel" ${commentsExpanded ? '' : 'hidden'}>
      <form id="commentForm" class="comment-form">
        <div class="star-picker" id="starPicker">
          ${[1, 2, 3, 4, 5].map((n) => `<span class="star-pick${n <= selectedStars ? ' filled' : ''}" data-val="${n}">\u2605</span>`).join('')}
        </div>
        <textarea id="commentText" maxlength="500" placeholder="Fikringizni yozing..." required></textarea>
        <p id="commentError" class="card-error" hidden></p>
        <button type="submit" class="btn-primary">Izoh qoldirish</button>
      </form>
      <div class="comments-list">${list}</div>
    </div>
  `;
}

async function reloadComments() {
  if (!currentDetailsAd) return;
  try {
    const res = await fetch(`/api/ads/${currentDetailsAd.id}/comments`, { headers: authHeaders() });
    const data = await res.json();
    currentComments = data.comments || [];
    currentRating = { rating_avg: data.rating_avg || 0, rating_count: data.rating_count || 0, comments_count: data.comments_count || 0 };
    renderDetailsBody();
  } catch (e) { /* jim */ }
}

function renderDetailsBody() {
  const ad = currentDetailsAd;
  const contactRows = [];
  contactRows.push(`<a class="contact-btn" href="tel:${escapeHtml(ad.phone)}"><span class="contact-icon">Tel</span> ${escapeHtml(ad.phone)}</a>`);
  if (ad.whatsapp) {
    const waNumber = ad.whatsapp.replace(/[^\d]/g, '');
    contactRows.push(`<a class="contact-btn" href="https://wa.me/${waNumber}" target="_blank" rel="noopener"><span class="contact-icon">WA</span> ${t('contact_whatsapp')}</a>`);
  }
  if (ad.telegram) {
    const tgHandle = ad.telegram.replace('@', '').trim();
    contactRows.push(`<a class="contact-btn" href="https://t.me/${escapeHtml(tgHandle)}" target="_blank" rel="noopener"><span class="contact-icon">TG</span> ${t('contact_telegram')} (@${escapeHtml(tgHandle)})</a>`);
  }

  const detailsFavActive = isSaved(ad.id);
  document.getElementById('detailsBody').innerHTML = `
    <button type="button" class="details-fav-btn${detailsFavActive ? ' active' : ''}" id="detailsFavBtn">${heartSvg(detailsFavActive)} <span>${t(detailsFavActive ? 'saved_label' : 'save_label')}</span></button>
    <h2>${escapeHtml(ad.title)}</h2>
    <div class="details-views">${eyeSvg()} <span id="detailsViewsCount">${formatViews(ad.views)}</span> ko'rishlar</div>
    ${currentRating.rating_count ? `<div class="details-rating">${starsHtml(currentRating.rating_avg)} <span>${currentRating.rating_avg.toFixed(1)} · ${currentRating.rating_count} baho</span></div>` : ''}
    ${ad.price ? `<div class="details-price">${escapeHtml(ad.price)}</div>` : ''}
    <div class="details-meta">${categoryLabel(ad.category)} · ${escapeHtml(ad.city || '')} · #${ad.id.slice(0, 8).toUpperCase()}</div>
    <p class="details-desc">${escapeHtml(ad.description)}</p>
    <div class="details-contact-label">${t('details_contact_label')}</div>
    <div class="details-contact-list">${contactRows.join('')}</div>
    ${commentsBlockHtml()}
  `;
}

detailsOverlay.addEventListener('click', (e) => {
  const favBtn = e.target.closest('#detailsFavBtn');
  if (favBtn) {
    const nowSaved = toggleSaved(currentDetailsAd.id);
    favBtn.classList.toggle('active', nowSaved);
    favBtn.innerHTML = `${heartSvg(nowSaved)} <span>${t(nowSaved ? 'saved_label' : 'save_label')}</span>`;
    const cardBtn = document.querySelector(`.ad-card[data-ad-id="${currentDetailsAd.id}"] .ad-card-fav`);
    if (cardBtn) {
      cardBtn.classList.toggle('active', nowSaved);
      cardBtn.innerHTML = heartSvg(nowSaved);
    }
    return;
  }
  if (e.target.closest('#commentsToggle')) {
    commentsExpanded = !commentsExpanded;
    renderDetailsBody();
    return;
  }
  const starEl = e.target.closest('.star-pick');
  if (starEl) {
    selectedStars = Number(starEl.dataset.val);
    document.querySelectorAll('.star-pick').forEach((s) => s.classList.toggle('filled', Number(s.dataset.val) <= selectedStars));
    return;
  }
  const voteBtn = e.target.closest('.comment-vote-btn');
  if (voteBtn) {
    e.preventDefault();
    const commentId = voteBtn.dataset.id;
    const type = voteBtn.dataset.type;
    fetch(`/api/comments/${commentId}/vote`, {
      method: 'POST',
      headers: authHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ type }),
    })
      .then((res) => res.json())
      .then((data) => {
        const c = currentComments.find((c) => c.id === commentId);
        if (c) { c.likes = data.likes; c.dislikes = data.dislikes; c.my_vote = data.my_vote; }
        currentComments.sort((a, b) => (b.likes - b.dislikes) - (a.likes - a.dislikes) || new Date(b.created_at) - new Date(a.created_at));
        commentsExpanded = true;
        renderDetailsBody();
      })
      .catch(() => {});
  }
});

// yulduzcha ustidan sichqoncha o'tkazilganda oldindan ko'rsatish
detailsOverlay.addEventListener('mouseover', (e) => {
  const starEl = e.target.closest('.star-pick');
  if (!starEl) return;
  const hoverVal = Number(starEl.dataset.val);
  document.querySelectorAll('.star-pick').forEach((s) => s.classList.toggle('hover', Number(s.dataset.val) <= hoverVal));
});
detailsOverlay.addEventListener('mouseout', (e) => {
  if (!e.target.closest('.star-picker')) return;
  document.querySelectorAll('.star-pick').forEach((s) => s.classList.remove('hover'));
});

detailsOverlay.addEventListener('submit', async (e) => {
  if (e.target.id !== 'commentForm') return;
  e.preventDefault();
  const textEl = document.getElementById('commentText');
  const errEl = document.getElementById('commentError');
  errEl.hidden = true;
  const text = textEl.value.trim();
  if (!text) return;
  if (!selectedStars) {
    errEl.textContent = "Iltimos, yulduzcha tanlang";
    errEl.hidden = false;
    return;
  }
  const btn = e.target.querySelector('button[type=submit]');
  btn.disabled = true;
  try {
    const res = await fetch(`/api/ads/${currentDetailsAd.id}/comments`, {
      method: 'POST',
      headers: authHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ text, stars: selectedStars }),
    });
    const data = await res.json();
    if (!res.ok) {
      errEl.textContent = data.error || 'Xatolik';
      errEl.hidden = false;
      btn.disabled = false;
      return;
    }
    selectedStars = 0;
    commentsExpanded = true;
    await reloadComments();
  } catch (err) {
    errEl.textContent = 'Xatolik yuz berdi';
    errEl.hidden = false;
    btn.disabled = false;
  }
});

function openDetails(ad) {
  const images = adImages(ad);
  const gallery = document.getElementById('detailsGallery');

  if (images.length) {
    gallery.hidden = false;
    gallery.innerHTML = `
      <img id="detailsGalleryImg" src="${images[0].url}" alt="${escapeHtml(ad.title)}" data-zoomable="1" />
      ${images.length > 1 ? `
        <button type="button" class="gallery-arrow gallery-prev" aria-label="${t('prev_aria')}">‹</button>
        <button type="button" class="gallery-arrow gallery-next" aria-label="${t('next_aria')}">›</button>
        <div class="gallery-dots">${images.map((_, i) => `<span class="gallery-dot${i === 0 ? ' active' : ''}"></span>`).join('')}</div>
      ` : ''}
    `;
    let idx = 0;
    const imgEl = document.getElementById('detailsGalleryImg');
    const dots = gallery.querySelectorAll('.gallery-dot');
    function showIdx(i) {
      idx = (i + images.length) % images.length;
      imgEl.src = images[idx].url;
      dots.forEach((d, di) => d.classList.toggle('active', di === idx));
    }
    const prevBtn = gallery.querySelector('.gallery-prev');
    const nextBtn = gallery.querySelector('.gallery-next');
    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showIdx(idx - 1); });
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showIdx(idx + 1); });
    imgEl.addEventListener('click', () => openLightbox(images, idx));
  } else {
    gallery.hidden = true;
    gallery.innerHTML = '';
  }

  currentDetailsAd = ad;
  currentComments = [];
  currentRating = { rating_avg: ad.rating_avg || 0, rating_count: ad.rating_count || 0, comments_count: ad.comments_count || 0 };
  commentsExpanded = false;
  selectedStars = 0;
  renderDetailsBody();

  detailsOverlay.hidden = false;
  reloadComments();
  registerAdView(ad);
}

function registerAdView(ad) {
  fetch(`/api/ads/${ad.id}/view`, { method: 'POST', headers: authHeaders() })
    .then((res) => res.json())
    .then((data) => {
      if (typeof data.views !== 'number') return;
      ad.views = data.views;
      const cardCount = document.querySelector(`[data-views-for="${ad.id}"]`);
      if (cardCount) cardCount.textContent = formatViews(data.views);
      const detailsCount = document.getElementById('detailsViewsCount');
      if (detailsCount && currentDetailsAd && currentDetailsAd.id === ad.id) detailsCount.textContent = formatViews(data.views);
    })
    .catch(() => {});
}
document.getElementById('closeDetailsModal').addEventListener('click', () => { detailsOverlay.hidden = true; });
detailsOverlay.addEventListener('click', (e) => { if (e.target === detailsOverlay) detailsOverlay.hidden = true; });

// ---------- Rasm lightbox (kattalashtirish, sayt orqada ko'rinadi, o'ng/chap strelkalar) ----------
const lightboxOverlay = document.getElementById('lightboxOverlay');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const lightboxCounter = document.getElementById('lightboxCounter');
let lightboxImages = [];
let lightboxIndex = 0;

function openLightbox(images, startIndex) {
  lightboxImages = images && images.length ? images : [];
  lightboxIndex = startIndex || 0;
  if (!lightboxImages.length) return;
  showLightboxIndex(lightboxIndex);
  lightboxOverlay.hidden = false;
}
function showLightboxIndex(i) {
  lightboxIndex = (i + lightboxImages.length) % lightboxImages.length;
  lightboxImg.src = lightboxImages[lightboxIndex].url;
  const multi = lightboxImages.length > 1;
  lightboxPrev.hidden = !multi;
  lightboxNext.hidden = !multi;
  lightboxCounter.hidden = !multi;
  if (multi) lightboxCounter.textContent = `${lightboxIndex + 1} / ${lightboxImages.length}`;
}
function closeLightbox() {
  lightboxOverlay.hidden = true;
  lightboxImg.src = '';
  lightboxImages = [];
}
document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => showLightboxIndex(lightboxIndex - 1));
lightboxNext.addEventListener('click', () => showLightboxIndex(lightboxIndex + 1));
lightboxOverlay.addEventListener('click', (e) => {
  if (e.target === lightboxOverlay) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (lightboxOverlay.hidden) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') showLightboxIndex(lightboxIndex + 1);
  if (e.key === 'ArrowLeft') showLightboxIndex(lightboxIndex - 1);
});

// ---------- Kategoriya filtrlari ----------
document.getElementById('categoryChips').addEventListener('click', (e) => {
  const btn = e.target.closest('.chip');
  if (!btn) return;
  if (showSavedOnly) {
    showSavedOnly = false;
    document.getElementById('savedToggle').classList.remove('active');
  }
  document.querySelectorAll('.chip').forEach((c) => c.classList.remove('active'));
  btn.classList.add('active');
  currentCategory = btn.dataset.cat;
  loadAds();
});

// ---------- Qidiruv ----------
document.getElementById('searchBtn').addEventListener('click', doSearch);
document.getElementById('searchInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') doSearch();
});
function doSearch() {
  currentQuery = document.getElementById('searchInput').value.trim();
  loadAds();
}

// ---------- Cover + Boshqa rasmlar (maks. 10 ta, har biri $1) ----------
const MAX_PHOTOS = 10;
let coverFile = null;
let galleryFiles = [];

const coverInput = document.getElementById('coverInput');
const coverDropzone = document.getElementById('coverDropzone');
const coverPreview = document.getElementById('coverPreview');
const coverPreviewImg = document.getElementById('coverPreviewImg');
const galleryInput = document.getElementById('galleryInput');
const galleryPreviewList = document.getElementById('galleryPreviewList');
const photoPriceNote = document.getElementById('photoPriceNote');

coverInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  coverFile = file;
  coverPreviewImg.src = URL.createObjectURL(file);
  coverDropzone.hidden = true;
  coverPreview.hidden = false;
  updatePhotoPriceNote();
});
document.getElementById('coverRemoveBtn').addEventListener('click', () => {
  coverFile = null;
  coverInput.value = '';
  coverPreview.hidden = true;
  coverDropzone.hidden = false;
  updatePhotoPriceNote();
});

galleryInput.addEventListener('change', (e) => {
  const errBox = document.getElementById('postError');
  const newFiles = Array.from(e.target.files || []);
  const capacity = MAX_PHOTOS - (coverFile ? 1 : 0) - galleryFiles.length;
  if (newFiles.length > capacity) {
    errBox.textContent = t('max_photos_error');
    errBox.hidden = false;
  }
  galleryFiles = galleryFiles.concat(newFiles.slice(0, Math.max(0, capacity)));
  galleryInput.value = '';
  renderGalleryPreviews();
  updatePhotoPriceNote();
});

function renderGalleryPreviews() {
  galleryPreviewList.innerHTML = '';
  galleryFiles.forEach((file, i) => {
    const thumb = document.createElement('div');
    thumb.className = 'gallery-thumb';
    thumb.innerHTML = `<img src="${URL.createObjectURL(file)}" alt="rasm ${i + 1}" /><button type="button" class="img-remove-btn" data-index="${i}" aria-label="✕">✕</button>`;
    galleryPreviewList.appendChild(thumb);
  });
}
galleryPreviewList.addEventListener('click', (e) => {
  const btn = e.target.closest('.img-remove-btn');
  if (!btn) return;
  galleryFiles.splice(Number(btn.dataset.index), 1);
  renderGalleryPreviews();
  updatePhotoPriceNote();
});

function totalPhotoCount() { return (coverFile ? 1 : 0) + galleryFiles.length; }
function updatePhotoPriceNote() {
  const count = totalPhotoCount();
  const cost = Math.max(1, count);
  photoPriceNote.innerHTML = t('photo_count_price').replace('{count}', count).replace('{cost}', `<strong>${cost}</strong>`);
  document.getElementById('submitAdBtn').textContent = `${t('post_action_label')} — $${cost}`;
}

function resetPhotoState() {
  coverFile = null;
  galleryFiles = [];
  coverInput.value = '';
  galleryInput.value = '';
  coverPreview.hidden = true;
  coverDropzone.hidden = false;
  galleryPreviewList.innerHTML = '';
  updatePhotoPriceNote();
}

// ---------- POST AD Modal ochish/yopish ----------
const overlay = document.getElementById('modalOverlay');
const stepForm = document.getElementById('stepForm');
const stepSuccess = document.getElementById('stepSuccess');

document.getElementById('openPostModal').addEventListener('click', () => {
  overlay.hidden = false;
  showStep(stepForm);
});
document.getElementById('closeModal').addEventListener('click', closeModal);
overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
function closeModal() {
  overlay.hidden = true;
  document.getElementById('adForm').reset();
  resetPhotoState();
  document.getElementById('postError').hidden = true;
  showStep(stepForm);
}
function showStep(step) {
  [stepForm, stepSuccess].forEach((s) => (s.hidden = true));
  step.hidden = false;
}
document.getElementById('successCloseBtn').addEventListener('click', closeModal);

// ---------- E'lonni joylash (balansdan rasm soniga qarab $ yechiladi) ----------
document.getElementById('adForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const errBox = document.getElementById('postError');
  errBox.hidden = true;
  const submitBtn = document.getElementById('submitAdBtn');
  submitBtn.disabled = true;
  submitBtn.textContent = t('submitting');

  const formData = new FormData();
  const form = e.target;
  ['title', 'description', 'price', 'category', 'city', 'phone', 'whatsapp', 'telegram'].forEach((name) => {
    formData.append(name, form.elements[name].value);
  });
  if (coverFile) formData.append('media', coverFile);
  galleryFiles.forEach((f) => formData.append('media', f));

  try {
    const res = await fetch('/api/ads', { method: 'POST', headers: authHeaders(), body: formData });
    const data = await res.json();
    if (!res.ok) {
      errBox.textContent = data.error || t('post_error_generic');
      errBox.hidden = false;
      if (typeof data.balance_usd === 'number') renderBalance(data.balance_usd);
      return;
    }
    renderBalance(data.balance_usd);
    document.getElementById('successBalance').textContent = `$${data.balance_usd.toFixed(2)}`;
    showStep(stepSuccess);
    loadAds();
  } catch (err) {
    errBox.textContent = t('network_error');
    errBox.hidden = false;
  } finally {
    submitBtn.disabled = false;
    updatePhotoPriceNote();
  }
});

// ---------- Deposit (Karta / Kripto — qo'lda) ----------
const depositOverlay = document.getElementById('depositOverlay');

document.getElementById('openDepositModal').addEventListener('click', () => {
  depositOverlay.hidden = false;
  loadPaymentMethods();
  updateManualUzsNote();
});
document.getElementById('closeDepositModal').addEventListener('click', () => { depositOverlay.hidden = true; });
depositOverlay.addEventListener('click', (e) => { if (e.target === depositOverlay) depositOverlay.hidden = true; });

// ---------- Muvaffaqiyat oynasi (chek qabul qilindi va h.k.) ----------
const successToastOverlay = document.getElementById('successToastOverlay');
function showSuccessToast(title, sub) {
  document.getElementById('successToastTitle').textContent = title || "So'rov yuborildi✅";
  document.getElementById('successToastSub').textContent = sub || 'Natijani 30 daqiqada olasiz!😍';
  successToastOverlay.hidden = false;
}
function goToMainMenu() {
  // barcha ochiq oynalarni yopish
  successToastOverlay.hidden = true;
  detailsOverlay.hidden = true;
  depositOverlay.hidden = true;
  document.getElementById('modalOverlay').hidden = true;
  // filtrlarni tozalab, bosh sahifaga qaytarish
  currentCategory = '';
  currentQuery = '';
  document.getElementById('searchInput').value = '';
  document.querySelectorAll('.chip').forEach((c) => c.classList.toggle('active', c.dataset.cat === ''));
  loadAds();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
document.getElementById('successToastMenuBtn').addEventListener('click', goToMainMenu);
successToastOverlay.addEventListener('click', (e) => { if (e.target === successToastOverlay) successToastOverlay.hidden = true; });

function updateManualUzsNote() {
  const amt = Number(document.getElementById('manualAmount').value) || 0;
  document.getElementById('manualUzsNote').textContent = `≈ ${Math.round(amt * UZS_RATE).toLocaleString('ru-RU')} so'm`;
}

const PAY_ICONS = {
  uzcard: `<svg viewBox="0 0 32 20"><rect width="32" height="20" rx="4" fill="#00A651"/><text x="16" y="13.5" text-anchor="middle" font-size="7" font-weight="700" fill="#fff" font-family="Arial,sans-serif">UZCARD</text></svg>`,
  humo: `<svg viewBox="0 0 32 20"><rect width="32" height="20" rx="4" fill="#1B75BC"/><text x="16" y="13.5" text-anchor="middle" font-size="8" font-weight="700" fill="#fff" font-family="Arial,sans-serif">HUMO</text></svg>`,
  visa: `<svg viewBox="0 0 32 20"><rect width="32" height="20" rx="4" fill="#1A1F71"/><text x="16" y="14" text-anchor="middle" font-size="8.5" font-weight="800" font-style="italic" fill="#fff" font-family="Arial,sans-serif">VISA</text></svg>`,
  mastercard: `<svg viewBox="0 0 32 20"><rect width="32" height="20" rx="4" fill="#16171A"/><circle cx="13.5" cy="10" r="6" fill="#EB001B"/><circle cx="18.5" cy="10" r="6" fill="#F79E1B" fill-opacity="0.9"/></svg>`,
  usdt_trc20: `<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#26A17B"/><text x="16" y="21" text-anchor="middle" font-size="15" font-weight="700" fill="#fff" font-family="Arial,sans-serif">₮</text></svg>`,
  usdt_bep20: `<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#26A17B"/><text x="16" y="21" text-anchor="middle" font-size="15" font-weight="700" fill="#fff" font-family="Arial,sans-serif">₮</text></svg>`,
  usdt_ton: `<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#0088CC"/><text x="16" y="21" text-anchor="middle" font-size="14" font-weight="700" fill="#fff" font-family="Arial,sans-serif">TON</text></svg>`,
  eth: `<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#627EEA"/><text x="16" y="22" text-anchor="middle" font-size="17" font-weight="600" fill="#fff" font-family="Arial,sans-serif">Ξ</text></svg>`,
  btc: `<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#F7931A"/><text x="16" y="22" text-anchor="middle" font-size="16" font-weight="700" fill="#fff" font-family="Arial,sans-serif">₿</text></svg>`,
  ltc: `<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#345D9D"/><text x="16" y="21" text-anchor="middle" font-size="14" font-weight="700" fill="#fff" font-family="Arial,sans-serif">Ł</text></svg>`,
  sol: `<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#14151A"/><text x="16" y="21" text-anchor="middle" font-size="15" font-weight="700" fill="#00FFA3" font-family="Arial,sans-serif">◎</text></svg>`,
};

function payIconSvg(m) {
  return PAY_ICONS[m.key] || `<svg viewBox="0 0 32 20"><rect width="32" height="20" rx="4" fill="#555"/></svg>`;
}

// ---------- Qo'lda to'ldirish uchun rekvizitlarni yuklash ----------
let paymentMethodsCache = null;
let selectedManualMethod = null;

async function loadPaymentMethods() {
  if (paymentMethodsCache) { renderManualMethods(); return; }
  try {
    const res = await fetch('/api/payment-methods');
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Xatolik');
    paymentMethodsCache = data;
    renderManualMethods();
  } catch (e) {
    document.getElementById('manualMethodList').innerHTML = `<p class="card-error">${t('methods_load_error')}</p>`;
  }
}

function renderManualMethods() {
  const list = document.getElementById('manualMethodList');
  const all = [...paymentMethodsCache.cards, ...paymentMethodsCache.crypto_wallets];
  list.innerHTML = '';
  all.forEach((m) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'pay-method';
    btn.dataset.key = m.key;
    btn.innerHTML = `<span class="pay-icon">${payIconSvg(m)}</span> ${m.label}`;
    btn.addEventListener('click', () => selectManualMethod(m));
    list.appendChild(btn);
  });
  if (all.length && !selectedManualMethod) selectManualMethod(all[0]);
}

function selectManualMethod(m) {
  selectedManualMethod = m;
  document.querySelectorAll('#manualMethodList .pay-method').forEach((b) => {
    b.classList.toggle('selected', b.dataset.key === m.key);
  });
  const value = m.number || m.address;
  document.getElementById('manualWalletDetails').innerHTML = `
    <div class="wallet-box">
      <span class="pay-icon pay-icon-lg">${payIconSvg(m)}</span>
      <div class="wallet-info">
        <strong>${m.label}</strong>
        <code id="walletValueText">${value}</code>
      </div>
      <button type="button" class="copy-btn" id="copyWalletBtn" title="${t('copy_label')}">${t('copy_label')}</button>
    </div>
  `;
  document.getElementById('copyWalletBtn').addEventListener('click', () => copyWalletValue(value));
}

function copyWalletValue(value) {
  const btn = document.getElementById('copyWalletBtn');
  const done = () => {
    btn.textContent = t('copied_label');
    setTimeout(() => { btn.textContent = t('copy_label'); }, 1500);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(value).then(done).catch(() => fallbackCopy(value, done));
  } else {
    fallbackCopy(value, done);
  }
}

function fallbackCopy(value, done) {
  const ta = document.createElement('textarea');
  ta.value = value;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); done(); } catch (e) { /* jim */ }
  document.body.removeChild(ta);
}

document.getElementById('manualAmount').addEventListener('input', () => {
  const amt = Number(document.getElementById('manualAmount').value) || 0;
  document.getElementById('manualUzsNote').textContent = `≈ ${Math.round(amt * UZS_RATE).toLocaleString('ru-RU')} so'm`;
});

// ---------- Chek fayli tanlash / X bilan olib tashlash ----------
const manualReceiptInput = document.getElementById('manualReceipt');
const receiptPreview = document.getElementById('receiptPreview');
const receiptChooseBtn = document.getElementById('receiptChooseBtn');

manualReceiptInput.addEventListener('change', () => {
  const file = manualReceiptInput.files[0];
  if (!file) { receiptPreview.hidden = true; return; }
  document.getElementById('receiptFileName').textContent = `📎 ${file.name}`;
  receiptPreview.hidden = false;
  receiptChooseBtn.hidden = true;
});
document.getElementById('receiptRemoveBtn').addEventListener('click', () => {
  manualReceiptInput.value = '';
  receiptPreview.hidden = true;
  receiptChooseBtn.hidden = false;
});
function resetReceiptState() {
  manualReceiptInput.value = '';
  receiptPreview.hidden = true;
  receiptChooseBtn.hidden = false;
}

document.getElementById('manualSubmitBtn').addEventListener('click', async () => {
  const errorBox = document.getElementById('manualError');
  errorBox.hidden = true;

  const amount = Number(document.getElementById('manualAmount').value);
  const file = manualReceiptInput.files[0];

  if (!amount || amount < 1 || amount > 100000) {
    errorBox.textContent = t('amount_range_error');
    errorBox.hidden = false;
    return;
  }
  if (!selectedManualMethod) {
    errorBox.textContent = t('method_required_error');
    errorBox.hidden = false;
    return;
  }
  if (!file) {
    errorBox.textContent = t('receipt_required_error');
    errorBox.hidden = false;
    return;
  }

  const btn = document.getElementById('manualSubmitBtn');
  btn.disabled = true;
  btn.textContent = t('submitting');

  const formData = new FormData();
  formData.append('amount', amount);
  formData.append('method', selectedManualMethod.key);
  formData.append('receipt', file);

  try {
    const res = await fetch('/api/balance/deposit/manual', { method: 'POST', headers: authHeaders(), body: formData });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || t('post_error_generic'));
    depositOverlay.hidden = true;
    resetReceiptState();
    showSuccessToast();
  } catch (err) {
    errorBox.textContent = err.message;
    errorBox.hidden = false;
  } finally {
    btn.disabled = false;
    btn.textContent = t('submit_receipt_btn');
  }
});

applyLanguage(currentLang);
loadBalance();

// ============ LIGHT / DARK THEME ============
// (Sahifa yuklanishidayoq index.html'dagi inline script data-theme'ni allaqachon o'rnatgan —
// bu yerda faqat tugma bosilganda almashtirish va rangni saqlash logikasi bor.)
const themeToggleBtn = document.getElementById('themeToggle');
const themeColorMeta = document.getElementById('themeColorMeta');

function applyThemeColorMeta(theme) {
  // Status bar / browser address bar rangini mavzuga moslashtiramiz
  if (themeColorMeta) themeColorMeta.setAttribute('content', theme === 'dark' ? '#0C0E12' : '#FAFAF7');
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('azzo-theme', theme);
  applyThemeColorMeta(theme);
}

// Meta theme-color'ni sahifa ochilishidagi holatga moslab qo'yamiz
applyThemeColorMeta(document.documentElement.getAttribute('data-theme') || 'light');

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    setTheme(current === 'dark' ? 'light' : 'dark');
  });
}
