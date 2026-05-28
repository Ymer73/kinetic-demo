// ─── Kinetic Breadcrumb ──────────────────────────────────────────────────────
// Fil d'Ariane Fédération → Sport → Club + JSON-LD SEO.
//
// Usage 1 (auto, sport.html) :
//   <script src="components/breadcrumb.js" data-page="sport"></script>
//   → Lit ?id= ou ?s=, attend SPORTS, fetch federations-data.json, injecte.
//
// Usage 2 (auto, federation.html) :
//   <script src="components/breadcrumb.js" data-page="federation"></script>
//   → Lit ?fed=, fetch federations-data.json, injecte.
//
// Usage 3 (manuel, club.html) :
//   <script src="components/breadcrumb.js"></script>
//   ... puis quand le club est chargé :
//   window.KineticBreadcrumb.renderClub({ club, mountSelector: '#crumb-nav' });
//
// Le composant s'injecte juste avant le <script> qui le charge (mode auto)
// ou remplace l'élément ciblé par mountSelector (mode manuel).
// ─────────────────────────────────────────────────────────────────────────────

(function () {
  const script = document.currentScript;
  const page = script && script.dataset.page;

  const FED_URL = 'federations-data.json';
  let fedCache = null;

  // ── Utils ──────────────────────────────────────────────────────────────────
  function slugify(s) {
    return (s || '').toString().toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }

  function esc(s) {
    return (s || '').toString()
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  async function loadFeds() {
    if (fedCache) return fedCache;
    try {
      const r = await fetch(FED_URL);
      if (!r.ok) throw new Error('fed fetch failed');
      fedCache = await r.json();
      return fedCache;
    } catch (e) {
      console.warn('[breadcrumb] fed load failed', e);
      return [];
    }
  }

  function findFed(feds, slug) {
    if (!slug) return null;
    return feds.find(f => f.slug === slug || f.source === slug) || null;
  }

  function findSportByDisc(disc) {
    if (!disc || typeof SPORTS === 'undefined') return null;
    const target = slugify(disc);
    return SPORTS.find(s => slugify(s.nom) === target) || null;
  }

  // ── Rendu HTML ─────────────────────────────────────────────────────────────
  function renderHTML(items) {
    // items: [{ label, href? }, ...] (dernier = courant, sans href)
    const parts = items.map((it, i) => {
      const last = i === items.length - 1;
      if (last || !it.href) {
        return `<span aria-current="page" class="kbc-current">${esc(it.label)}</span>`;
      }
      return `<a href="${esc(it.href)}" class="kbc-link">${esc(it.label)}</a>`;
    });
    return `
<nav class="kinetic-breadcrumb" aria-label="Fil d'Ariane">
  ${parts.join('<span class="kbc-sep" aria-hidden="true">/</span>')}
</nav>`;
  }

  function renderJSONLD(items) {
    const origin = 'https://kinetic.app';
    const ld = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': items.map((it, i) => {
        const entry = { '@type': 'ListItem', 'position': i + 1, 'name': it.label };
        if (it.href) {
          entry.item = it.href.startsWith('http')
            ? it.href
            : origin + '/' + it.href.replace(/^\//, '');
        }
        return entry;
      }),
    };
    // évite les doublons si la page rerend
    const old = document.querySelector('script[data-source="kinetic-breadcrumb"]');
    if (old) old.remove();
    const tag = document.createElement('script');
    tag.type = 'application/ld+json';
    tag.dataset.source = 'kinetic-breadcrumb';
    tag.textContent = JSON.stringify(ld);
    document.head.appendChild(tag);
  }

  function inject(items, mountEl) {
    const html = renderHTML(items);
    // Mode explicite : mountEl fourni par l'appelant (API manuelle)
    if (mountEl) {
      mountEl.outerHTML = html;
    }
    // Mode auto : data-mount sur le script du composant prime sur l'insertion
    else if (script && script.dataset.mount) {
      const target = document.querySelector(script.dataset.mount);
      if (target) target.outerHTML = html;
    }
    // Fallback : injection juste avant le <script>
    else if (script) {
      script.insertAdjacentHTML('beforebegin', html);
    }
    renderJSONLD(items);
  }

  // ── Public API ─────────────────────────────────────────────────────────────
  window.KineticBreadcrumb = {
    // Pour club.html : appelé une fois le club chargé
    async renderClub({ club, mountSelector }) {
      if (!club) return;
      const mount = mountSelector ? document.querySelector(mountSelector) : null;
      const feds = await loadFeds();
      const fed = findFed(feds, club.source);
      const sport = findSportByDisc(club.disc);

      const items = [];
      if (fed) {
        items.push({
          label: fed.acronyme || fed.nom,
          href: `federation.html?fed=${encodeURIComponent(fed.slug)}`,
        });
      }
      if (sport) {
        items.push({
          label: sport.nom,
          href: `sport.html?id=${sport.id}`,
        });
      }
      items.push({ label: club.nom || 'Club' });
      inject(items, mount);
    },
  };

  // Compat API pour l'ancien helper (gardé pour ne rien casser)
  window.renderBreadcrumb = function (container, items) {
    if (!container || !items || !items.length) return;
    const parts = items.map((item, i) => {
      const isLast = i === items.length - 1;
      if (isLast || !item.href) {
        return `<span class="kbc-current" aria-current="page">${esc(item.label)}</span>`;
      }
      return `<a href="${esc(item.href)}" class="kbc-link">${esc(item.label)}</a>`;
    });
    container.innerHTML = parts.join('<span class="kbc-sep" aria-hidden="true">/</span>');
    container.setAttribute('aria-label', "Fil d'Ariane");
  };

  // ── Mode auto selon data-page ──────────────────────────────────────────────
  async function autoRender() {
    const params = new URLSearchParams(window.location.search);

    if (page === 'sport') {
      const id = parseInt(params.get('id') || params.get('s'), 10);
      if (!id || typeof SPORTS === 'undefined') return;
      const sport = SPORTS.find(s => s.id === id);
      if (!sport) return;
      const fedSlug = sport.meta && sport.meta.fedSlug;
      const items = [];
      if (fedSlug) {
        const feds = await loadFeds();
        const fed = findFed(feds, fedSlug);
        if (fed) {
          items.push({
            label: fed.acronyme || fed.nom,
            href: `federation.html?fed=${encodeURIComponent(fed.slug)}`,
          });
        }
      }
      items.push({ label: sport.nom });
      inject(items);
      return;
    }

    if (page === 'federation') {
      const fedSlug = params.get('fed');
      if (!fedSlug) return;
      const feds = await loadFeds();
      const fed = findFed(feds, fedSlug);
      if (!fed) return;
      const items = [
        { label: 'Fédérations', href: 'federations.html' },
        { label: fed.acronyme || fed.nom },
      ];
      inject(items);
      return;
    }
  }

  if (page) autoRender();
})();
