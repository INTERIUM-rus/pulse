// Pulse: оболочка приложения работает без сети. Свои файлы — сначала из сети (чтобы обновления приходили сразу),
// при отсутствии сети — из кэша. Чужие запросы (YouTube, Supabase, тексты песен) не трогаем.
const CACHE = 'pulse-v32';
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png',
  'fonts/unbounded-cyrillic.woff2', 'fonts/unbounded-latin.woff2', 'fonts/manrope-cyrillic.woff2', 'fonts/manrope-latin.woff2',
  'fonts/montserrat-cyrillic.woff2', 'fonts/montserrat-latin.woff2'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(r => {
    if (r.ok) { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
    return r;
  }).catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match('./'))));
});
