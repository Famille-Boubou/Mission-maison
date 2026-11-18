/* Service worker minimal : permet d'installer l'appli et garde une copie des fichiers.
   Les données (points, missions…) viennent toujours de la base, jamais du cache. */
const VERSION = 'mm-v4';
const FICHIERS = ['./', 'index.html', 'css/style.css', 'js/config.js', 'js/panneaux.js', 'js/questions.js', 'js/questions2.js',
  'js/metiers-base.js', 'js/metiers1.js', 'js/metiers2.js', 'js/metiers3.js', 'js/metiers4.js', 'js/argent.js',
  'js/app.js', 'js/enfant.js', 'js/code.js', 'js/apprendre.js', 'js/avenir.js', 'js/monargent.js', 'js/parent-contenus.js', 'js/parent.js', 'manifest.webmanifest', 'icons/icon-192.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FICHIERS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== VERSION).map(x => caches.delete(x)))).then(() => self.clients.claim()));
});
// Réseau d'abord (pour toujours avoir la dernière version), copie locale si hors ligne
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== self.location.origin) return;
  e.respondWith(fetch(e.request).then(r => {
    const copie = r.clone();
    caches.open(VERSION).then(c => c.put(e.request, copie));
    return r;
  }).catch(() => caches.match(e.request, { ignoreSearch: true })));
});
