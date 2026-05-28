// ============================================
// KINETIC DEMO MODE
// Injecte le bandeau "MAQUETTE DEMO" + meta noindex
// Chargé sur TOUTES les pages
// ============================================
(function () {
  if (document.getElementById('kinetic-demo-banner')) return;

  // Bandeau visuel
  function inject() {
    const banner = document.createElement('div');
    banner.id = 'kinetic-demo-banner';
    banner.innerHTML = 'MAQUETTE DÉMO · <span style="opacity:.85">Toutes les données et clubs présents sont fictifs. Reproduction interdite.</span>';
    banner.style.cssText = [
      'position:fixed', 'top:0', 'left:0', 'right:0',
      'z-index:99999',
      'background:linear-gradient(90deg,#FF6B2C,#FF3D6E)',
      'color:#fff', 'text-align:center', 'padding:8px 16px',
      'font:600 13px/1.4 -apple-system,Segoe UI,sans-serif',
      'letter-spacing:.3px',
      'box-shadow:0 2px 12px rgba(0,0,0,.25)'
    ].join(';');
    document.documentElement.appendChild(banner);

    // Décale le contenu pour ne pas être caché par le bandeau
    // On utilise margin-top sur body au lieu de padding-top sur html
    // (le padding-top sur html cassait le centrage des modals position:fixed inset:0)
    const style = document.createElement('style');
    style.textContent = [
      'body{margin-top:36px!important}',
      '#kinetic-demo-banner{height:36px;display:flex;align-items:center;justify-content:center}',
      // Compensation pour les éléments en position:fixed top:0 (nav fixed, modals)
      '.nav-fixed,.nav.is-fixed{top:36px!important}',
      // S\'assure que les modals plein écran couvrent bien le viewport
      '.vid-modal.is-open{display:flex!important;align-items:center!important;justify-content:center!important;top:36px!important;height:calc(100vh - 36px)!important}'
    ].join('');
    document.head.appendChild(style);

    // Meta noindex si pas déjà présent
    if (!document.querySelector('meta[name="robots"]')) {
      const meta = document.createElement('meta');
      meta.name = 'robots';
      meta.content = 'noindex, nofollow';
      document.head.appendChild(meta);
    }

    // Force Leaflet (et autres maps) à recalculer leur taille après le décalage
    // du bandeau démo. Sans ça, les tiles restent partielles.
    const triggerResize = () => {
      window.dispatchEvent(new Event('resize'));
      // Leaflet : si une map existe, on appelle invalidateSize directement
      if (window.L && window._kineticMap && window._kineticMap.invalidateSize) {
        window._kineticMap.invalidateSize();
      }
    };
    setTimeout(triggerResize, 100);
    setTimeout(triggerResize, 500);
    setTimeout(triggerResize, 1500);
  }

  if (document.body) {
    inject();
  } else {
    document.addEventListener('DOMContentLoaded', inject);
  }
})();
