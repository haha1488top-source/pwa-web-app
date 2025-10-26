const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
  'pwapp.html',
  'manifest.json',
  'script.js',
  'Img/pin_dead_box.png',
  // Додайте всі інші ресурси, які потрібні офлайн (наприклад, CSS-файли)
];

// 1. Подія Install: кешуємо всі необхідні ресурси
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// 2. Подія Fetch: перехоплюємо запити і віддаємо з кешу, якщо можливо
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Віддаємо з кешу, якщо знайдено
      if (response) {
        return response;
      }
      // Інакше робимо мережевий запит
      return fetch(event.request);
    })
  );
});

// 3. Подія Activate: видаляємо старі кеші
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Видаляємо старий кеш
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
