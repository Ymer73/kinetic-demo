// ─── KINETIC v2 — Sport icons library (inline SVG) ───
// Usage: <span data-icon="running"></span> → replaced on load
// Or: icon('running', size) returns SVG string
const KINETIC_ICONS = {
  running: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="20" cy="6" r="2.5"/><path d="M8 14l5-3 4 3 2 5-3 3"/><path d="M16 19l3 2v6"/><path d="M6 26l4-5 3-2"/></svg>',
  tennis: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="7"/><path d="M6 6c3 3 3 9 0 12"/><path d="M18 18l8 8"/></svg>',
  swim: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="2"/><path d="M6 15l5-3 4 3 4-2 3 2"/><path d="M4 20c2-1 3 1 5 0s3-1 5 0 3 1 5 0 3-1 5 0"/><path d="M4 25c2-1 3 1 5 0s3-1 5 0 3 1 5 0 3-1 5 0"/></svg>',
  cycle: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7" cy="22" r="5"/><circle cx="25" cy="22" r="5"/><path d="M7 22l6-10h6l4 10"/><path d="M13 12l3-5h3"/></svg>',
  climb: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="20" cy="6" r="2.5"/><path d="M8 14l5 2 4-3 3 4-2 5"/><path d="M14 19l1 6"/><path d="M19 22l4 4"/><circle cx="6" cy="16" r="1.5"/><circle cx="24" cy="18" r="1.5"/></svg>',
  boxing: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 20c0-3 2-6 6-6s6 1 6 5v4c0 2-2 3-4 3h-4c-2 0-4-1-4-3v-3z"/><path d="M14 14v-3c0-2 1-3 3-3h3c2 0 3 1 3 3"/></svg>',
  football: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="16" cy="16" r="10"/><path d="M16 6l4 4-2 6-6 0-2-6z"/><path d="M16 16l4 6M12 22l4-6M22 16l4 2M6 14l4 2"/></svg>',
  basketball: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="16" cy="16" r="10"/><path d="M6 16h20M16 6v20M9 9c3 2 3 12 0 14M23 9c-3 2-3 12 0 14"/></svg>',
  ski: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="6" r="2"/><path d="M14 12l6-2 4 6-4 3"/><path d="M4 26l22-6"/><path d="M6 28l20-6"/></svg>',
  archery: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="16" cy="16" r="9"/><circle cx="16" cy="16" r="5"/><circle cx="16" cy="16" r="1.5" fill="currentColor"/><path d="M26 6l-8 8"/></svg>',
  weights: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 16h24"/><path d="M6 12v8M10 10v12"/><path d="M26 12v8M22 10v12"/></svg>',
  yoga: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="16" cy="7" r="2.5"/><path d="M16 10v6"/><path d="M16 16l-7 2 3 6"/><path d="M16 16l7 2-3 6"/><path d="M12 16h8"/></svg>',
  surf: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22c2-1 3 1 5 0s3-1 5 0 3 1 5 0 3-1 5 0 3 1 4 0"/><path d="M8 16c4-8 12-10 20-8-4 6-8 10-14 12z"/></svg>',
  target: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="16" cy="16" r="11"/><circle cx="16" cy="16" r="7"/><circle cx="16" cy="16" r="3"/><circle cx="16" cy="16" r="1" fill="currentColor"/></svg>',
  trophy: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 6h12v8a6 6 0 0 1-12 0z"/><path d="M10 9H6v2c0 2 2 4 4 4M22 9h4v2c0 2-2 4-4 4"/><path d="M14 20v4h4v-4M12 26h8"/></svg>',
  map: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8l8-3 8 3 8-3v22l-8 3-8-3-8 3z"/><path d="M12 5v22M20 8v22"/></svg>',
  spark: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3l3 10 10 3-10 3-3 10-3-10-10-3 10-3z"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  external: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6"/><path d="M20 4l-9 9"/><path d="M19 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6"/></svg>',
  play: '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M16 16l5 5"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 2c-4 0-7 3-7 7 0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>',
  flame: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4c2 4 8 8 8 14a8 8 0 0 1-16 0c0-3 2-5 2-5s1 2 3 2c0-3-1-5 3-11z"/></svg>',
  heart: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 28s-10-6-10-14a6 6 0 0 1 10-4 6 6 0 0 1 10 4c0 8-10 14-10 14z"/></svg>',
  wave: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12c3-3 6-3 8 0s5 3 8 0 6-3 8 0"/><path d="M4 20c3-3 6-3 8 0s5 3 8 0 6-3 8 0"/></svg>',
  users: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="11" r="4"/><path d="M4 26c0-5 4-8 8-8s8 3 8 8"/><circle cx="22" cy="9" r="3"/><path d="M22 15c4 0 6 3 6 7"/></svg>',
  brain: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6a4 4 0 0 0-4 4 3 3 0 0 0-3 3 3 3 0 0 0 2 3 3 3 0 0 0 1 5 4 4 0 0 0 4 3V6z"/><path d="M20 6a4 4 0 0 1 4 4 3 3 0 0 1 3 3 3 3 0 0 1-2 3 3 3 0 0 1-1 5 4 4 0 0 1-4 3V6z"/></svg>',
  horse: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 24l3-6 4-2 2-6 4-2 6 2 3 4-4 2-2 8"/><circle cx="22" cy="11" r="1" fill="currentColor"/></svg>'
};

// Map sport category → icon
const CAT_ICON = {
  "Collectif": "users",
  "Individuel": "running",
  "Combat": "boxing",
  "Aquatique": "swim",
  "Glisse": "ski",
  "Montagne & Nature": "climb",
  "Aérien": "spark",
  "Équestre": "horse",
  "Moteur": "spark",
  "Danse & Arts": "spark",
  "Mental": "brain"
};

// Map specific sport → icon (overrides)
const SPORT_ICON = {
  "Tennis": "tennis",
  "Badminton": "tennis",
  "Tennis de table": "tennis",
  "Padel": "tennis",
  "Squash": "tennis",
  "Pickleball": "tennis",
  "Natation": "swim",
  "Aviron": "swim",
  "Canoë-Kayak": "swim",
  "Voile": "surf",
  "Surf": "surf",
  "Kitesurf": "surf",
  "Windsurf": "surf",
  "Plongée sous-marine": "wave",
  "Football": "football",
  "Rugby à XV": "football",
  "Rugby à 7": "football",
  "Football américain": "football",
  "Beach Soccer": "football",
  "Basketball": "basketball",
  "Handball": "basketball",
  "Volleyball": "basketball",
  "Beach Volley": "basketball",
  "Ultimate Frisbee": "spark",
  "Cyclisme route": "cycle",
  "VTT": "cycle",
  "BMX": "cycle",
  "Escalade": "climb",
  "Randonnée / Alpinisme": "climb",
  "Trail running": "running",
  "Running": "running",
  "Athlétisme": "running",
  "Parkour / Freerun": "running",
  "Triathlon": "running",
  "OCR / Obstacle Racing": "running",
  "Hyrox": "running",
  "Ski alpin": "ski",
  "Snowboard": "ski",
  "Ski de fond": "ski",
  "Ski alpinisme": "ski",
  "Ski freestyle": "ski",
  "Patinage artistique": "spark",
  "Hockey sur glace": "ski",
  "Hockey sur gazon": "basketball",
  "Judo": "boxing",
  "Karaté": "boxing",
  "Taekwondo": "boxing",
  "Boxe anglaise": "boxing",
  "Savate / Boxe française": "boxing",
  "Escrime": "boxing",
  "Lutte": "boxing",
  "MMA": "boxing",
  "Tir à l'arc": "archery",
  "Tir sportif": "target",
  "Musculation": "weights",
  "CrossFit": "weights",
  "Yoga / Pilates": "yoga",
  "Danse sportive": "spark",
  "Danse hip-hop": "spark",
  "Cheerleading": "spark",
  "Breakdance": "spark",
  "Équitation": "horse",
  "Golf": "target",
  "Pétanque": "target",
  "Échecs": "brain",
  "E-sport": "brain",
  "Parachutisme": "spark",
  "Parapente": "spark",
  "Roller derby": "users",
  "Roller / Skateboard": "ski",
  "Baseball / Softball": "basketball",
  "Canyoning": "wave"
};

// A11Y (audit 2026-05-28) : aria-hidden="true" + focusable="false" sur tous les SVG
// rendus par icon(). Si une icone est INFORMATIVE (pas accompagnee de texte),
// passer {label: 'description'} via icon(name, size, {label: '...'}) pour la rendre lue.
function icon(name, size = 24, opts) {
  const svg = KINETIC_ICONS[name] || KINETIC_ICONS.spark;
  const label = opts && opts.label;
  const a11y = label
    ? `role="img" aria-label="${String(label).replace(/"/g, '&quot;')}"`
    : `aria-hidden="true" focusable="false"`;
  return svg.replace('<svg ', `<svg ${a11y} width="${size}" height="${size}" `);
}

function sportIcon(sport, size = 32) {
  const name = SPORT_ICON[sport.nom] || CAT_ICON[sport.cat] || 'spark';
  return icon(name, size);
}

// Hydrate [data-icon] placeholders
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-icon]').forEach(el => {
    const name = el.getAttribute('data-icon');
    const size = parseInt(el.getAttribute('data-size')) || 24;
    el.innerHTML = icon(name, size);
  });
});
