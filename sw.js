/* ============================================================
   TrailVolt — Service Worker
   sw.js
   Strategy: stale-while-revalidate for static assets,
             network-first for HTML, offline fallback
   ============================================================ */

'use strict';

const CACHE_NAME  = 'tv-static-v2';
const OFFLINE_URL = '/offline.html';

const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/assets/css/main.css',
  '/assets/js/main.js',
  '/assets/js/cart.js',
  '/assets/js/i18n.js',
  '/assets/js/translations.js',
  '/manifest.json',
  '/favicon.svg',
];

/* ── Install: precache static shell ── */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_ASSETS))
  );
  self.skipWaiting();
});

/* ── Activate: remove stale caches ── */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

/* ── Fetch: stale-while-revalidate for assets, network-first for HTML ── */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin requests
  if (url.origin !== location.origin) return;

  // HTML navigation: network-first → offline fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() =>
        caches.match(OFFLINE_URL).then((r) => r || new Response('Offline', { status: 503 }))
      )
    );
    return;
  }

  // Static assets (CSS, JS, images, fonts): stale-while-revalidate
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) =>
      cache.match(request).then((cached) => {
        const networkFetch = fetch(request).then((response) => {
          if (response && response.status === 200) {
            cache.put(request, response.clone());
          }
          return response;
        });
        return cached || networkFetch;
      })
    )
  );
});
