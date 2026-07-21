// sw.js — AZZO Market uchun oddiy Service Worker
// Bu fayl saytni PWA sifatida to'liq ishlashi (offline qo'llab-quvvatlash,
// "Add to Home Screen" tugmasi chiqishi) uchun kerak.

const CACHE_NAME = 'azzo-market-cache-v1';

// Har doim keshlanadigan asosiy fayllar (ochilish tezligini oshirish uchun)
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/manifest.json'
];

// O'rnatilganda asosiy fayllarni keshga oldindan yuklab qo'yamiz
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

// Eski keshlarni tozalash
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Network-first strategiya: internet bo'lsa serverdan, bo'lmasa keshdan
self.addEventListener('fetch', (event) => {
  // Faqat GET so'rovlarni keshlaymiz (API POST/PUT so'rovlarga tegmaymiz)
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          // Faqat muvaffaqiyatli javoblarni keshlaymiz
          if (response.ok) cache.put(event.request, clone);
        });
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
