// ─── Kinetic Service Worker — DÉSACTIVÉ ───
// Le SW a été désactivé car il cachait les pages HTML et bloquait les mises à jour.
// Ce fichier reste pour unregister les anciens SW installés chez les utilisateurs.

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    // Vider tous les caches existants
    const keys = await caches.keys();
    await Promise.all(keys.map(k => caches.delete(k)));
    // Prendre le contrôle des clients
    await self.clients.claim();
    // Demander à se désinscrire (effet au prochain reload)
    await self.registration.unregister();
    // Forcer un reload des clients actuels pour bypass tout cache
    const clients = await self.clients.matchAll({ type: 'window' });
    clients.forEach(c => c.navigate(c.url));
  })());
});

// Pas de fetch handler : tout passe en réseau direct, plus de cache navigateur via SW.
