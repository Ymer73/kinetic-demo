// ─── KINETIC MAGAZINE — Composants Vanilla JS ───
// Converti depuis magazine-components.jsx (chaque composant React → fonction retournant du HTML)

function ArrowRight(size = 16) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;
}

// ─── ISSUE BAR ───
function renderIssueBar(data) {
  return `<div class="issue-bar">
    <div class="issue-num"><b>ISSUE</b> ${data.number} / ${data.monthLabel}</div>
    <div class="slogan">${data.slogan}</div>
    <div class="badge"><span class="dot"></span> ${data.badge}</div>
  </div>`;
}

// ─── HERO TITLE ───
function renderHeroTitle(parts) {
  const html = parts.map(p => {
    if (p.type === 'br') return '<br>';
    if (p.type === 'space') return ' ';
    const cls = `w d${p.delay}`;
    if (p.type === 'text') return `<span class="${cls}">${p.value}</span>`;
    if (p.type === 'ital') return `<span class="${cls} ital">${p.value}</span>`;
    if (p.type === 'ctr')  return `<span class="${cls} ctr">${p.value}</span>`;
    if (p.type === 'box')  return `<span class="${cls} box" data-cursor="drag" data-cursor-label="DRAG">${p.value}</span>`;
    return '';
  }).join('');
  return `<h1 class="hero-title">${html}</h1>`;
}

// ─── HERO ───
function renderHero(data, issue) {
  const ctaHtml = data.ctas.map(cta =>
    `<a href="${cta.href}" class="btn btn-${cta.variant} btn-lg" data-cursor="view">${cta.label}${cta.arrow ? ArrowRight() : ''}</a>`
  ).join('');

  const statsHtml = data.stats.map(s => {
    const numHtml = s.accAt === 'start'
      ? `<span class="acc">${s.num}</span>${s.acc || ''}`
      : `${s.num}${s.acc ? `<span class="acc">${s.acc}</span>` : ''}`;
    return `<div class="hs-cell">
      <div class="hs-num">${numHtml}</div>
      <div class="hs-lbl">${s.label}</div>
    </div>`;
  }).join('');

  return `<section class="hero">
    ${data.eyebrow ? `<div class="hero-eyebrow"><span class="line"></span> ${data.eyebrow} · ${issue.updatedDate}</div>` : ''}
    ${renderHeroTitle(data.titleParts)}
    <p class="hero-sub">${data.sub}</p>
    <div class="hero-cta-row">${ctaHtml}</div>
    <div class="hero-stats">${statsHtml}</div>
  </section>`;
}

// ─── MARQUEE ───
function renderMarquee(items) {
  const doubled = [...items, ...items];
  const itemsHtml = doubled.map(it =>
    `<span class="item">${it.ital ? `<span class="ital">${it.text}</span>` : it.text}<span class="star">✦</span></span>`
  ).join('');
  return `<section class="marquee"><div class="marquee-track">${itemsHtml}</div></section>`;
}

// ─── SECTION HEAD ───
function renderSectionHead({ num, label, titleMain, titleItal, ctaLabel, ctaHref, sideHtml }) {
  const ctaPart = sideHtml || (ctaLabel ? `<a href="${ctaHref || '#'}" class="sect-cta">${ctaLabel} ${ArrowRight()}</a>` : '');
  const titlePart = titleItal ? `${titleMain} <span class="ital">${titleItal}</span>` : titleMain;
  return `<div class="sect-head" data-reveal>
    <div>
      <div class="sect-eyebrow"><span class="num">${num}</span> ${label}</div>
      <h2 class="sect-title">${titlePart}</h2>
    </div>
    ${ctaPart}
  </div>`;
}

// ─── SPORT DU MOIS ───
function renderSportOfMonth(data, issue) {
  // Thumbnail state — vidéo chargée uniquement au clic (lazy)
  const posterStyle = data.videoPoster
    ? `style="background-image:url('${data.videoPoster}');background-size:cover;background-position:center;"`
    : '';
  const videoHtml = data.videoSrc
    ? `<div class="spotm-thumb" data-video="${data.videoSrc}" ${posterStyle} role="button" tabindex="0" aria-label="Lancer la vidéo : ${data.videoLabel}">
        <div class="spotm-thumb-scrim"></div>
        <div class="spotm-thumb-body">
          <div class="spotm-thumb-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
          </div>
          <div class="spotm-thumb-label">${data.videoLabel}</div>
          <div class="spotm-thumb-sub">${data.videoSub}</div>
        </div>
       </div>`
    : `<div class="play">▶</div><div class="lbl">${data.videoLabel}</div><div class="sub">${data.videoSub}</div>`;

  const statsHtml = data.stats.map(s =>
    `<div class="spotm-stat">
      <div class="n">${s.num}<span class="acc">${s.acc}</span></div>
      <div class="l">${s.label}</div>
    </div>`
  ).join('');

  const ctaHtml = data.ctas.map(cta =>
    `<a href="${cta.href}" class="btn btn-${cta.variant} btn-lg" data-cursor="view">${cta.label}${cta.arrow ? ArrowRight() : ''}</a>`
  ).join('');

  const head = renderSectionHead({
    num: data.eyebrowNum,
    label: `${data.eyebrowLabel} · ${issue.monthLabel} · ${issue.updatedShort}`,
    titleMain: "Cap sur l'",
    titleItal: "ultimate",
    ctaLabel: "Tous les sports du mois",
    ctaHref: "sports-du-mois.html"
  });

  return `${head}
  <section class="spotm">
    <div class="spotm-card" data-reveal>
      <div class="spotm-left">
        <div class="spotm-video" data-cursor="play" data-cursor-label="PLAY" aria-label="Section vidéo">${videoHtml}</div>
        <div class="spotm-overlay">
          <div class="spotm-month-tag"><span class="line"></span> ${issue.monthLabel} · NUMÉRO ${issue.number}</div>
          <div class="spotm-foot">${data.quote}</div>
        </div>
      </div>
      <div class="spotm-right">
        <div>
          <div class="spotm-cat">${data.category}</div>
          <h3 class="spotm-name">${data.nameMain}<span class="ital">${data.nameItal}</span></h3>
          <p class="spotm-tagline">${data.tagline}</p>
          <div class="spotm-stats">${statsHtml}</div>
        </div>
        <div class="spotm-cta-row">${ctaHtml}</div>
      </div>
    </div>
  </section>`;
}

// ─── NOUVEAU SUR KINETIC ───
function renderNewSection(items, issue) {
  const cardsHtml = items.map((it, i) =>
    `<a href="${it.href}" class="new-card" data-reveal data-delay="${i + 1}">
      <div>
        <span class="new-tag ${it.tagColor}">${it.tag}</span>
        <h3 style="margin-top:18px">${it.titleMain}<br><span class="ital">${it.titleItal}</span></h3>
        <p>${it.text}</p>
      </div>
      <div class="new-arrow">${ArrowRight()}</div>
    </a>`
  ).join('');

  const head = renderSectionHead({
    num: "02",
    label: `RUBRIQUE · ${issue.updatedShort}/2026`,
    titleMain: "Nouveau sur",
    titleItal: "Kinetic",
    ctaLabel: "Voir tout",
    ctaHref: "explorer.html"
  });

  return `${head}<section class="new-grid">${cardsHtml}</section>`;
}

// ─── AIDES DU MOMENT ───
function renderAides(data, issue) {
  const itemsHtml = data.items.map((it, i) =>
    `<a href="${it.href}" class="aide" data-reveal data-delay="${i + 1}">
      <div>
        <div class="aide-source">${it.source}</div>
        <h3 style="margin-top:14px">${it.title}</h3>
        <p>${it.text}</p>
      </div>
      <span class="aide-link">${it.cta} →</span>
    </a>`
  ).join('');

  return `<section class="aides">
    <div class="aides-inner">
      <div style="display:flex;align-items:end;justify-content:space-between;flex-wrap:wrap;gap:32px">
        <div data-reveal>
          <div class="sect-eyebrow"><span class="num">${data.eyebrowNum}</span> AIDES DU MOMENT · ${issue.monthLabel}</div>
          <h2 class="sect-title">Faire du sport,<br><span class="ital">moins cher.</span></h2>
        </div>
        <p style="max-width:340px;color:rgba(255,255,255,.65);font-size:15px;line-height:1.5" data-reveal data-delay="1">${data.intro}</p>
      </div>
      <div class="aides-grid">${itemsHtml}</div>
    </div>
  </section>`;
}

// ─── CHIFFRES ───
function renderChiffres(items) {
  const head = `<div class="sect-head" data-reveal>
    <div>
      <div class="sect-eyebrow"><span class="num">04</span> DATA · STUDIO RESEARCH · AVR 2026</div>
      <h2 class="sect-title">Le sport<br>en <span class="ital">chiffres.</span></h2>
    </div>
    <p style="max-width:340px;color:var(--ink-soft);font-size:15px;line-height:1.5">Ce qu'on observe sur Kinetic, sur les terrains, et dans nos data partenaires.</p>
  </div>`;

  const gridHtml = items.map((s, i) =>
    `<div class="stat ${s.variant}" data-reveal data-delay="${i + 1}">
      <div class="stat-label-top">${s.topLabel}</div>
      <div class="stat-num">${s.num}${s.acc ? `<span class="acc">${s.acc}</span>` : ''}</div>
      <div>
        <div class="stat-label">${s.label}</div>
        <div class="stat-source">${s.source}</div>
      </div>
    </div>`
  ).join('');

  return `${head}<section class="chiffres-grid">${gridHtml}</section>`;
}

// ─── FOOTER ───
function renderFooter(data, issue) {
  const colsHtml = data.cols.map(col => {
    const linksHtml = col.links.map(l =>
      `<a href="${l.href}"${l.target ? ` target="${l.target}" rel="noopener noreferrer"` : ''}>${l.label}</a>`
    ).join('');
    return `<div class="foot-col"><h4>${col.title}</h4>${linksHtml}</div>`;
  }).join('');

  const marqueeHtml = ['KINETIC','KINETIC','KINETIC','KINETIC','KINETIC','KINETIC','KINETIC','KINETIC','KINETIC','KINETIC','KINETIC','KINETIC']
    .map(t => `<span class="foot-kinetic-text">${t}&nbsp;</span>`)
    .join('');

  return `<footer>
    <div class="foot-kinetic" aria-hidden="true">
      <div class="foot-kinetic-track">${marqueeHtml}</div>
    </div>
    <div class="foot-top">
      <div class="foot-brand">
        <div class="nav-logo">KINETIC</div>
        <div class="baseline">"Le sport, mais fun." — Édité par <span style="color:var(--violet);font-weight:700">Kinetic Studio</span>, 4,5M de vues/mois sur TikTok.</div>
      </div>
      ${colsHtml}
    </div>
    <div class="foot-bot">
      <span>© 2026 Kinetic Studio · Tous droits réservés</span>
      <span>Issue ${issue.number}/2026 · 290 sports · Made with 🧡 en France</span>
    </div>
  </footer>`;
}

// ─── GEO BLOCK (express : trouve un club près de chez toi) ───
function renderGeoBlock() {
  const pinSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;
  return `<section class="geo-block" aria-labelledby="geo-title" data-reveal>
    <div class="geo-inner">
      <div class="geo-head">
        <div class="geo-eyebrow"><span class="num">01b</span> EXPRESS · CLUBS PRÈS DE CHEZ TOI</div>
        <h2 class="geo-title" id="geo-title">Saute le quiz,<br><span class="ital">trouve un club direct.</span></h2>
        <p class="geo-sub">125 982 clubs référencés. Code postal ou géoloc, on t'envoie sur la carte avec ta zone pré-chargée.</p>
      </div>
      <form class="geo-form" id="geo-form" novalidate>
        <div class="geo-input-wrap">
          <label for="geo-cp" class="visually-hidden">Code postal</label>
          <input type="text" id="geo-cp" name="cp" placeholder="Code postal (ex: 73000)" inputmode="numeric" pattern="[0-9]{5}" autocomplete="postal-code" maxlength="5" />
        </div>
        <button type="button" class="geo-btn geo-btn-locate" id="geo-locate" aria-label="Détecter automatiquement ma position">
          ${pinSvg}<span class="geo-btn-label">Me localiser</span>
        </button>
        <button type="submit" class="geo-btn geo-btn-primary">
          Voir les clubs ${ArrowRight()}
        </button>
        <p class="geo-error" id="geo-error" aria-live="polite" role="status"></p>
      </form>
    </div>
  </section>`;
}

Object.assign(window, {
  ArrowRight, renderIssueBar, renderHeroTitle,
  renderHero, renderMarquee, renderSectionHead, renderSportOfMonth,
  renderNewSection, renderAides, renderChiffres, renderFooter,
  renderGeoBlock,
});
