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

    // Décale le contenu pour ne pas être caché
    const style = document.createElement('style');
    style.textContent = 'html{padding-top:36px!important}body{position:relative}';
    document.head.appendChild(style);

    // Meta noindex si pas déjà présent
    if (!document.querySelector('meta[name="robots"]')) {
      const meta = document.createElement('meta');
      meta.name = 'robots';
      meta.content = 'noindex, nofollow';
      document.head.appendChild(meta);
    }
  }

  if (document.body) {
    inject();
  } else {
    document.addEventListener('DOMContentLoaded', inject);
  }
})();
