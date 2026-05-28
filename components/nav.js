(function () {
  const script = document.currentScript;
  const fixed = script && script.dataset.fixed === 'true';
  const bottomOnly = script && script.dataset.bottomOnly === 'true';

  // Auto-charge kinetic-mockup.css si pas déjà présent (pour que la nav s'affiche partout)
  const hasMockupCss = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
    .some(l => (l.href || '').includes('kinetic-mockup.css'));
  if (!hasMockupCss) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'kinetic-mockup.css';
    document.head.appendChild(link);
  }

  // Perf audit 2026-05-28 : preconnect aux origins externes utilises (gains 200-400ms par origin)
  ['https://images.unsplash.com', 'https://images.pexels.com'].forEach(origin => {
    if (!document.querySelector(`link[rel="preconnect"][href="${origin}"]`)) {
      const pc = document.createElement('link');
      pc.rel = 'preconnect';
      pc.href = origin;
      pc.crossOrigin = 'anonymous';
      document.head.appendChild(pc);
    }
  });

  // Perf audit 2026-05-28 : preload Bebas Neue self-hosted (LCP critique sur h1 hero)
  if (!document.querySelector('link[rel="preload"][href="/fonts/bebas-neue-latin.woff2"]')) {
    const pl = document.createElement('link');
    pl.rel = 'preload';
    pl.as = 'font';
    pl.type = 'font/woff2';
    pl.href = '/fonts/bebas-neue-latin.woff2';
    pl.crossOrigin = 'anonymous';
    document.head.appendChild(pl);
  }

  const page = window.location.pathname.split('/').pop() || 'index.html';

  // Mapping URL -> clé active. STRICT : un item s'allume uniquement sur sa page exacte.
  // Les autres pages (index, sport, club, nouveautes, sports-du-mois, etc.) n'allument aucun item.
  const activeMap = {
    'trouver-club.html':       'Trouver un club',
    'explorer-sports.html':    'Explorer des sports',
    'map.html':                'Carte',
    'handisport.html':         'Parasport',
  };
  const activePage = activeMap[page] ?? '';
  const FAV_COUNT = 0; // mockée pour le moment (badge masqué)

  // === ITEMS NAV ===
  const items = [
    { label: 'Trouver un club',     href: 'trouver-club.html' },
    { label: 'Explorer des sports', href: 'explorer-sports.html' },
    { label: 'Carte',               href: 'map.html' },
    { label: 'Blog',                href: '#', soon: true },
    { label: 'Parasport',           href: '#', soon: true },
  ];

  function svgIcon(name) {
    if (name === 'heart') return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-4.5-9-9c-1.5-3.4.7-7 4-7 2.1 0 3.5 1 5 3 1.5-2 2.9-3 5-3 3.3 0 5.5 3.6 4 7-2 4.5-9 9-9 9z"/></svg>';
    if (name === 'user') return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>';
    return '';
  }

  // === HTML NAV (matche exactement KHeader du mockup) ===
  const itemsHTML = items.map(i => {
    const isActive = i.label === activePage;
    const classes = [isActive ? 'on' : '', i.soon ? 'soon' : ''].filter(Boolean).join(' ');
    const href = i.soon ? 'javascript:void(0)' : i.href;
    const dataSoon = i.soon ? ` data-soon="${i.label}"` : '';
    const ariaCur = isActive ? ' aria-current="page"' : '';
    const soonBadge = i.soon ? '<span class="soon-badge">Soon</span>' : '';
    return `<a href="${href}" class="${classes}"${dataSoon}${ariaCur}>${i.label}${soonBadge}</a>`;
  }).join('');

  const favBadge = FAV_COUNT > 0 ? `<span class="fav-count">${FAV_COUNT}</span>` : '';
  const soonBadgeFav = '<span class="soon-badge">Soon</span>';
  const soonBadgeEspace = '<span class="soon-badge">Soon</span>';

  const topHTML = `
<div class="k-topbar-wrap${fixed ? ' k-fixed' : ''}">
  <div class="k-topbar">
    <div class="k-topbar-left">
      <a href="index.html" class="k-logo" aria-label="Kinetic — Accueil">
        <span class="dot" aria-hidden="true"></span>KINETIC
      </a>
      <nav class="k-nav" role="navigation" aria-label="Navigation principale">
        ${itemsHTML}
      </nav>
    </div>
    <div class="k-topbar-right">
      <a href="javascript:void(0)" class="soon" title="Mes favoris (bientôt)" data-soon="Mes favoris" aria-label="Mes favoris (bientôt)">
        ${svgIcon('heart')}
        <span class="label-hide">Mes favoris</span>
        ${favBadge}
        ${soonBadgeFav}
      </a>
      <a href="javascript:void(0)" class="soon" title="Mon espace (bientôt)" data-soon="Mon espace" aria-label="Mon espace (bientôt)">
        ${svgIcon('user')}
        <span class="label-hide">Mon espace</span>
        ${soonBadgeEspace}
      </a>
    </div>
  </div>
</div>`;

  // === MOBILE BOTTOM TAB BAR (gardée pour le mobile) ===
  const bottomItems = [
    { href: 'trouver-club.html',    label: 'Trouver un club',     short: 'Clubs',    emoji: '🏟️' },
    { href: 'explorer-sports.html', label: 'Explorer des sports', short: 'Explorer', emoji: '🌐' },
    { href: 'map.html',             label: 'Carte',               short: 'Carte',    emoji: '📍' },
    { href: '#', soon: true,        label: 'Parasport',           short: 'Para',     emoji: '♿' },
    { href: '#', soon: true,        label: 'Mon espace',          short: 'Espace',   emoji: '👤' },
  ];
  const tabsHTML = bottomItems
    .map(l => {
      const isActive = !l.soon && activePage === l.label;
      const classes = ['bottom-tab', isActive ? 'active' : '', l.soon ? 'bottom-tab-soon' : ''].filter(Boolean).join(' ');
      const href = l.soon ? 'javascript:void(0)' : l.href;
      const aria = isActive ? ' aria-current="page"' : (l.soon ? ' aria-disabled="true"' : '');
      return `<a href="${href}" class="${classes}"${aria}${l.soon ? ' data-soon="' + l.label + '"' : ''}>
        <span class="bottom-tab-icon" aria-hidden="true">${l.emoji}</span>
        <span class="bottom-tab-label">${l.short}</span>
      </a>`;
    })
    .join('');
  const bottomHTML = `
<nav class="bottom-nav" role="navigation" aria-label="Navigation rapide">
  <div class="bottom-nav-inner">
    ${tabsHTML}
  </div>
</nav>
<div class="bottom-nav-spacer" aria-hidden="true"></div>`;

  // === TOAST ===
  const toastCSS = `
<style id="kn-toast-css">
/* Soon badges sur les nav items non-fonctionnels */
.k-nav a.soon, .k-topbar-right a.soon { position: relative; opacity: .85; }
.k-nav a.soon::after, .k-topbar-right a.soon::after { content: ''; }
.soon-badge {
  display: inline-flex; align-items: center; justify-content: center;
  background: var(--km-orange, #FF5A1F); color: white;
  font-family: 'Archivo Narrow', sans-serif;
  font-weight: 700; font-size: 9px; letter-spacing: .10em; text-transform: uppercase;
  padding: 2px 7px; border-radius: 100px;
  margin-left: 6px;
  box-shadow: 0 2px 8px rgba(255,90,31,.30);
  vertical-align: middle;
}

.kn-toast {
  position: fixed; bottom: 90px; left: 50%;
  transform: translateX(-50%) translateY(20px);
  background: var(--km-ink, #0E0B1F); color: white;
  padding: 12px 20px; border-radius: 100px;
  font-size: 13px; font-weight: 600;
  box-shadow: 0 12px 28px rgba(14,11,31,.4);
  z-index: 2000; opacity: 0; pointer-events: none;
  transition: opacity .3s, transform .3s;
}
.kn-toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
.kn-toast .kn-toast-emoji { margin-right: 8px; }
@media (min-width: 900px) {
  .kn-toast { bottom: 24px; }
}
/* Override : si page mockup, on cache l'ancienne .nav v1 */
body.km-page > .nav, body.km-page .nav.nav-fixed { display: none !important; }
</style>`;

  document.head.insertAdjacentHTML('beforeend', toastCSS);

  // Injection
  script.insertAdjacentHTML('beforebegin', (bottomOnly ? '' : topHTML) + bottomHTML);

  // === Interactivité ===
  function showSoonToast(label) {
    let toast = document.querySelector('.kn-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'kn-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span class="kn-toast-emoji">⏳</span>${label} · arrive bientôt`;
    requestAnimationFrame(() => toast.classList.add('show'));
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toast.classList.remove('show'), 2200);
  }

  document.querySelectorAll('[data-soon]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      showSoonToast(el.dataset.soon);
      if (navigator.vibrate) navigator.vibrate(8);
    });
  });

  // Haptic feedback bottom tabs
  document.querySelectorAll('.bottom-tab').forEach(tab => {
    tab.addEventListener('touchstart', () => {
      if (navigator.vibrate) navigator.vibrate(8);
    }, { passive: true });
  });

  // Service worker DÉSACTIVÉ : il cachait les pages et bloquait les mises à jour.
  // On unregister ceux déjà installés pour libérer le cache navigateur.
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(regs => {
      regs.forEach(r => r.unregister());
    }).catch(() => {});
    if (window.caches && caches.keys) {
      caches.keys().then(keys => keys.forEach(k => caches.delete(k))).catch(() => {});
    }
  }
})();
