// Pulse: РѕР±РѕР»РѕС‡РєР° РїСЂРёР»РѕР¶РµРЅРёСЏ СЂР°Р±РѕС‚Р°РµС‚ Р±РµР· СЃРµС‚Рё. РЎРІРѕРё С„Р°Р№Р»С‹ вЂ” СЃРЅР°С‡Р°Р»Р° РёР· СЃРµС‚Рё (С‡С‚РѕР±С‹ РѕР±РЅРѕРІР»РµРЅРёСЏ РїСЂРёС…РѕРґРёР»Рё СЃСЂР°Р·Сѓ),
// РїСЂРё РѕС‚СЃСѓС‚СЃС‚РІРёРё СЃРµС‚Рё вЂ” РёР· РєСЌС€Р°. Р§СѓР¶РёРµ Р·Р°РїСЂРѕСЃС‹ (YouTube, Supabase, С‚РµРєСЃС‚С‹ РїРµСЃРµРЅ) РЅРµ С‚СЂРѕРіР°РµРј.
const CACHE = 'pulse-v44';
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
