self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('/').then((cache) => cache.addAll([
      'verse.html',
      'header.html',
      'passages.html',
      'read.html',
      'index.html',
      'images/icon.png',
      'style.css',
      'script.js',
      'functions.js',
      'data/biblePassagesSearch.json',
    ])),
  );
});

self.addEventListener('fetch', (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});
