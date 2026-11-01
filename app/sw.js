// Pulse: Р В РЎвЂўР В Р’В±Р В РЎвЂўР В Р’В»Р В РЎвЂўР РЋРІР‚РЋР В РЎвЂќР В Р’В° Р В РЎвЂ”Р РЋР вЂљР В РЎвЂР В Р’В»Р В РЎвЂўР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ Р РЋР вЂљР В Р’В°Р В Р’В±Р В РЎвЂўР РЋРІР‚С™Р В Р’В°Р В Р’ВµР РЋРІР‚С™ Р В Р’В±Р В Р’ВµР В Р’В· Р РЋР С“Р В Р’ВµР РЋРІР‚С™Р В РЎвЂ. Р В Р Р‹Р В Р вЂ Р В РЎвЂўР В РЎвЂ Р РЋРІР‚С›Р В Р’В°Р В РІвЂћвЂ“Р В Р’В»Р РЋРІР‚в„– Р Р†Р вЂљРІР‚Сњ Р РЋР С“Р В Р вЂ¦Р В Р’В°Р РЋРІР‚РЋР В Р’В°Р В Р’В»Р В Р’В° Р В РЎвЂР В Р’В· Р РЋР С“Р В Р’ВµР РЋРІР‚С™Р В РЎвЂ (Р РЋРІР‚РЋР РЋРІР‚С™Р В РЎвЂўР В Р’В±Р РЋРІР‚в„– Р В РЎвЂўР В Р’В±Р В Р вЂ¦Р В РЎвЂўР В Р вЂ Р В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ Р В РЎвЂ”Р РЋР вЂљР В РЎвЂР РЋРІР‚В¦Р В РЎвЂўР В РўвЂР В РЎвЂР В Р’В»Р В РЎвЂ Р РЋР С“Р РЋР вЂљР В Р’В°Р В Р’В·Р РЋРЎвЂњ),
// Р В РЎвЂ”Р РЋР вЂљР В РЎвЂ Р В РЎвЂўР РЋРІР‚С™Р РЋР С“Р РЋРЎвЂњР РЋРІР‚С™Р РЋР С“Р РЋРІР‚С™Р В Р вЂ Р В РЎвЂР В РЎвЂ Р РЋР С“Р В Р’ВµР РЋРІР‚С™Р В РЎвЂ Р Р†Р вЂљРІР‚Сњ Р В РЎвЂР В Р’В· Р В РЎвЂќР РЋР РЉР РЋРІвЂљВ¬Р В Р’В°. Р В Р’В§Р РЋРЎвЂњР В Р’В¶Р В РЎвЂР В Р’Вµ Р В Р’В·Р В Р’В°Р В РЎвЂ”Р РЋР вЂљР В РЎвЂўР РЋР С“Р РЋРІР‚в„– (YouTube, Supabase, Р РЋРІР‚С™Р В Р’ВµР В РЎвЂќР РЋР С“Р РЋРІР‚С™Р РЋРІР‚в„– Р В РЎвЂ”Р В Р’ВµР РЋР С“Р В Р’ВµР В Р вЂ¦) Р В Р вЂ¦Р В Р’Вµ Р РЋРІР‚С™Р РЋР вЂљР В РЎвЂўР В РЎвЂ“Р В Р’В°Р В Р’ВµР В РЎВ.
const CACHE = 'pulse-v46';
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
