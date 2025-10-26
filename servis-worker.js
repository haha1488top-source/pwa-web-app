const CACHE_NAME = 'clicker-v2';
const urlsToCache = [
  './',
  './index.html',
  './script.js',
  './manifest.json',
  './Img/pin_dead_box.png'
];

// Встановлення - кешуємо всі файли
self.addEventListener('install', event => {
  console.log('SW: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('SW: Caching files');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Активізація - видаляємо старі кеші
self.addEventListener('activate', event => {
  console.log('SW: Activated');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('SW: Deleting old cache', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch - віддаємо з кешу
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Повертаємо кеш або робимо запит
        return response || fetch(event.request);
      })
  );
});
