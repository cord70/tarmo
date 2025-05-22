// tarmo

var cacheName = 'pwa_v1'; // менять имя при смене контента сайта ?

var filesToCache = [
// первая страница
    '/index.html',

// ресурсы head первой страницы
    '/images/ansimeta.js',
    '/images/main.css',
    '/images/home.gif',
    '/images/sky.jpg',
    '/manifest.json',
    '/sw.js',
    '/favicon.ico',
    '/favicon.svg',
    '/apple-touch-icon.png',
    '/favicon512.png',

// ссылки первой страницы
    '/about.html',
    '/pagelist.html',
    '/1999-08.htm',
    '/1999-09.htm',
    '/1999-10.htm',
    '/1999-12.htm',
    '/2000-01.htm',
    '/2000-04.htm',
    '/2000-09.htm',
    '/2000-12.htm',
    '/2001-01.htm',
    '/2001-02.htm',
    '/2001-03.htm',
    '/search.html',
];

// Start the service worker and cache all of the app's content 
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(filesToCache);
        })
    );
});

// Serve cached content when offline 
self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (response) {
            return response || fetch(e.request);
        })
    );
});
