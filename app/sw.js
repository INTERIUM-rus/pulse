// Pulse: Р С•Р В±Р С•Р В»Р С•РЎвЂЎР С”Р В° Р С—РЎР‚Р С‘Р В»Р С•Р В¶Р ВµР Р…Р С‘РЎРЏ РЎР‚Р В°Р В±Р С•РЎвЂљР В°Р ВµРЎвЂљ Р В±Р ВµР В· РЎРѓР ВµРЎвЂљР С‘. Р РЋР Р†Р С•Р С‘ РЎвЂћР В°Р в„–Р В»РЎвЂ№ РІР‚вЂќ РЎРѓР Р…Р В°РЎвЂЎР В°Р В»Р В° Р С‘Р В· РЎРѓР ВµРЎвЂљР С‘ (РЎвЂЎРЎвЂљР С•Р В±РЎвЂ№ Р С•Р В±Р Р…Р С•Р Р†Р В»Р ВµР Р…Р С‘РЎРЏ Р С—РЎР‚Р С‘РЎвЂ¦Р С•Р Т‘Р С‘Р В»Р С‘ РЎРѓРЎР‚Р В°Р В·РЎС“),
// Р С—РЎР‚Р С‘ Р С•РЎвЂљРЎРѓРЎС“РЎвЂљРЎРѓРЎвЂљР Р†Р С‘Р С‘ РЎРѓР ВµРЎвЂљР С‘ РІР‚вЂќ Р С‘Р В· Р С”РЎРЊРЎв‚¬Р В°. Р В§РЎС“Р В¶Р С‘Р Вµ Р В·Р В°Р С—РЎР‚Р С•РЎРѓРЎвЂ№ (YouTube, Supabase, РЎвЂљР ВµР С”РЎРѓРЎвЂљРЎвЂ№ Р С—Р ВµРЎРѓР ВµР Р…) Р Р…Р Вµ РЎвЂљРЎР‚Р С•Р С–Р В°Р ВµР С.
const CACHE = 'pulse-v45';
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
