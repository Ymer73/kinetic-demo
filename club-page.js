// ═══════════════════════════════════════════════════════════════════
// FICHE CLUB · BINDING COMPLET
// Charge les données du club depuis clubs/dept-XX.json et rend le
// template mockup avec les vraies infos.
// ═══════════════════════════════════════════════════════════════════

const params = new URLSearchParams(location.search);
// Friendly URL (audit 2026-05-28) : /club/{dep}/{id} (rewrite Vercel transparent)
if (!params.get('id') || !params.get('dep')) {
  const m = location.pathname.match(/^\/club\/([^\/]+)\/([^\/?#]+)/);
  if (m) {
    if (!params.get('dep')) params.set('dep', decodeURIComponent(m[1]));
    if (!params.get('id')) params.set('id', decodeURIComponent(m[2]));
  }
}
const clubId = decodeURIComponent(params.get('id') || '');
const depCode = params.get('dep') || '';

const dowFR = ['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM'];
const monthFR = ['JAN', 'FÉV', 'MAR', 'AVR', 'MAI', 'JUIN', 'JUIL', 'AOÛT', 'SEPT', 'OCT', 'NOV', 'DÉC'];
const today = new Date();
const JOUR_TO_NUM = { 'lundi':1,'mardi':2,'mercredi':3,'jeudi':4,'vendredi':5,'samedi':6,'dimanche':0 };
const NUM_TO_JOUR_FR = ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'];

// ─── Départements ───
const DEP_NAMES = {
  '01':'Ain','02':'Aisne','03':'Allier','04':'Alpes-de-Haute-Provence','05':'Hautes-Alpes',
  '06':'Alpes-Maritimes','07':'Ardèche','08':'Ardennes','09':'Ariège','10':'Aube',
  '11':'Aude','12':'Aveyron','13':'Bouches-du-Rhône','14':'Calvados','15':'Cantal',
  '16':'Charente','17':'Charente-Maritime','18':'Cher','19':'Corrèze','2A':"Corse-du-Sud",
  '2B':'Haute-Corse','21':"Côte-d'Or",'22':"Côtes-d'Armor",'23':'Creuse','24':'Dordogne',
  '25':'Doubs','26':'Drôme','27':'Eure','28':'Eure-et-Loir','29':'Finistère',
  '30':'Gard','31':'Haute-Garonne','32':'Gers','33':'Gironde','34':'Hérault',
  '35':'Ille-et-Vilaine','36':'Indre','37':'Indre-et-Loire','38':'Isère','39':'Jura',
  '40':'Landes','41':'Loir-et-Cher','42':'Loire','43':'Haute-Loire','44':'Loire-Atlantique',
  '45':'Loiret','46':'Lot','47':'Lot-et-Garonne','48':'Lozère','49':'Maine-et-Loire',
  '50':'Manche','51':'Marne','52':'Haute-Marne','53':'Mayenne','54':'Meurthe-et-Moselle',
  '55':'Meuse','56':'Morbihan','57':'Moselle','58':'Nièvre','59':'Nord',
  '60':'Oise','61':'Orne','62':'Pas-de-Calais','63':'Puy-de-Dôme','64':'Pyrénées-Atlantiques',
  '65':'Hautes-Pyrénées','66':'Pyrénées-Orientales','67':'Bas-Rhin','68':'Haut-Rhin','69':'Rhône',
  '70':'Haute-Saône','71':'Saône-et-Loire','72':'Sarthe','73':'Savoie','74':'Haute-Savoie',
  '75':'Paris','76':'Seine-Maritime','77':'Seine-et-Marne','78':'Yvelines','79':'Deux-Sèvres',
  '80':'Somme','81':'Tarn','82':'Tarn-et-Garonne','83':'Var','84':'Vaucluse',
  '85':'Vendée','86':'Vienne','87':'Haute-Vienne','88':'Vosges','89':'Yonne',
  '90':'Territoire de Belfort','91':'Essonne','92':'Hauts-de-Seine','93':'Seine-Saint-Denis','94':'Val-de-Marne',
  '95':"Val-d'Oise",'971':'Guadeloupe','972':'Martinique','973':'Guyane','974':'La Réunion','976':'Mayotte',
};

// ─── Fédérations (multilingue EN + FR) ───
const DISC_FED = {
  // slug = identifiant page interne (federation.html?f=<slug>), correspond à federations-data.json
  // EN (clé canonique de SPORT_TO_DISC)
  'soccer':     { label: 'FFF',     slug: 'fff',         nameLong: 'Fédération Française de Football' },
  'basketball': { label: 'FFBB',    slug: 'ffbb',        nameLong: 'Fédération Française de Basket-Ball' },
  'tennis':     { label: 'FFT',     slug: 'fft',         nameLong: 'Fédération Française de Tennis' },
  'swimming':   { label: 'FFN',     slug: 'ffn',         nameLong: 'Fédération Française de Natation' },
  'rugby':      { label: 'FFR',     slug: 'ffr',         nameLong: 'Fédération Française de Rugby' },
  'judo':       { label: 'FFJudo',  slug: 'ffjudo',      nameLong: 'Fédération Française de Judo' },
  'karate':     { label: 'FFKDA',   slug: 'ffkda',       nameLong: 'Fédération Française de Karaté' },
  'athletics':  { label: 'FFA',     slug: 'ffa',         nameLong: "Fédération Française d'Athlétisme" },
  'climbing':   { label: 'FFME',    slug: 'ffme',        nameLong: 'Fédération Française de Montagne et Escalade' },
  'bouldering': { label: 'FFME',    slug: 'ffme',        nameLong: 'Fédération Française de Montagne et Escalade' },
  'handball':   { label: 'FFHB',    slug: 'ffhandball',  nameLong: 'Fédération Française de Handball' },
  'volleyball': { label: 'FFVB',    slug: 'ffvb',        nameLong: 'Fédération Française de Volleyball' },
  'golf':       { label: 'FFGolf',  slug: 'ffgolf',      nameLong: 'Fédération Française de Golf' },
  'equitation': { label: 'FFE',     slug: 'ffe',         nameLong: "Fédération Française d'Équitation" },
  'ski':        { label: 'FFS',     slug: 'ffski',       nameLong: 'Fédération Française de Ski' },
  'fitness':    { label: 'FFHM',    slug: 'ffhm',        nameLong: "Fédération Française d'Haltérophilie, Musculation et Fitness" },
  'padel':      { label: 'FFT',     slug: 'fft',         nameLong: 'Fédération Française de Tennis' },
  'badminton':  { label: 'FFBaD',   slug: 'ffbad',       nameLong: 'Fédération Française de Badminton' },
  'boxe':       { label: 'FFBoxe',  slug: 'ffboxe',      nameLong: 'Fédération Française de Boxe' },
  'canoe':      { label: 'FFCK',    slug: 'ffck',        nameLong: 'Fédération Française de Canoë-Kayak' },
  'touch-rugby':{ label: 'FTF',     slug: 'ftf',         nameLong: 'Fédération de Touch France' },
  'touch':      { label: 'FTF',     slug: 'ftf',         nameLong: 'Fédération de Touch France' },
  // FR (depuis club.disc)
  'football':    { label: 'FFF',     slug: 'fff',        nameLong: 'Fédération Française de Football' },
  'basket':      { label: 'FFBB',    slug: 'ffbb',       nameLong: 'Fédération Française de Basket-Ball' },
  'natation':    { label: 'FFN',     slug: 'ffn',        nameLong: 'Fédération Française de Natation' },
  'athletisme':  { label: 'FFA',     slug: 'ffa',        nameLong: "Fédération Française d'Athlétisme" },
  'escalade':    { label: 'FFME',    slug: 'ffme',       nameLong: 'Fédération Française de Montagne et Escalade' },
  'volley':      { label: 'FFVB',    slug: 'ffvb',       nameLong: 'Fédération Française de Volleyball' },
};
const DISC_ALIASES = {
  'football':'soccer','foot':'soccer','basket':'basketball','basket-ball':'basketball',
  'natation':'swimming','athletisme':'athletics','athlétisme':'athletics','escalade':'climbing',
  'tennis':'tennis','rugby':'rugby','judo':'judo','karate':'karate','karaté':'karate',
  'handball':'handball','volley':'volleyball','volley-ball':'volleyball','golf':'golf',
  'equitation':'equitation','équitation':'equitation','ski':'ski','fitness':'fitness',
  'padel':'padel','badminton':'badminton','boxe':'boxe','boxing':'boxe',
};
function fedFor(disc) {
  if (!disc) return null;
  let f = DISC_FED[disc];
  if (f) return f;
  const norm = String(disc).toLowerCase().trim();
  return DISC_FED[norm] || DISC_FED[DISC_ALIASES[norm] || ''] || null;
}

// ─── Booking state ───
const bookState = { discipline: null, day: null, slot: null, clubName: '', club: null, mode: 'generic', essaiData: null, selectedSection: null };

// ─── Helpers ───
function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}
// SECU XSS : valide qu'un href ne contient pas un scheme dangereux (javascript:, data:text/html...)
// A utiliser sur tout href dont la valeur vient d'une auto-declaration de club (user-controlled).
function safeHref(u) {
  if (!u) return '#';
  try {
    const url = new URL(u, window.location.origin);
    return ['http:', 'https:', 'mailto:', 'tel:'].includes(url.protocol) ? url.href : '#';
  } catch (_) {
    return '#';
  }
}
function depName(code) {
  if (!code) return 'Non communiqué';
  return DEP_NAMES[String(code).padStart(2, '0')] || DEP_NAMES[code] || code;
}

// ─── Sport lookup (depuis data.js) ───
const sportById = {};
(typeof SPORTS !== 'undefined' ? SPORTS : []).forEach(s => { sportById[s.id] = s; });

// ═══════════════════════════════════════════════════════════════════
// LOADER
// ═══════════════════════════════════════════════════════════════════
async function loadClub() {
  if (!clubId || !depCode) { showError('Paramètres manquants'); return; }
  try {
    const cached = sessionStorage.getItem('kinetic_club_cache');
    if (cached) {
      const c = JSON.parse(cached);
      if (String(c._id || c.id) === String(clubId)) {
        sessionStorage.removeItem('kinetic_club_cache');
        renderClub(c, depCode, [c]);
        return;
      }
    }
  } catch(e) {}

  let data;
  try {
    const r = await fetch(`clubs/dept-${depCode}.json`);
    if (!r.ok) throw new Error('not found');
    data = await r.json();
  } catch(e) {
    showError('Département introuvable'); return;
  }
  const clubList = Array.isArray(data) ? data : (data.clubs || []);
  let club = clubList.find(c => String(c.id) === String(clubId));
  if (!club) {
    const aliasMatch = clubList.find(c => Array.isArray(c.alias_ids) && c.alias_ids.some(a => String(a) === String(clubId)));
    if (aliasMatch) {
      window.location.replace(`club.html?id=${encodeURIComponent(aliasMatch.id)}&dep=${encodeURIComponent(depCode)}`);
      return;
    }
  }
  if (!club) { showError('Club introuvable dans ce département'); return; }
  renderClub(club, depCode, clubList);
}

function showError(msg) {
  document.getElementById('loading-screen').innerHTML =
    `<div style="font-size:48px">😕</div><strong style="font-size:20px">${escapeHtml(msg)}</strong>
     <a href="map.html" style="color:var(--orange);font-weight:600;margin-top:8px">← Retour à la carte</a>`;
}

// ═══════════════════════════════════════════════════════════════════
// RENDER PRINCIPAL
// ═══════════════════════════════════════════════════════════════════
function renderClub(club, dep, allDeptClubs) {
  document.getElementById('loading-screen').style.display = 'none';
  document.getElementById('club-content').style.display = '';

  const name = club.nom || 'Club sportif';
  const ville = club.ville || '';
  bookState.clubName = name;
  bookState.club = club;
  window.__currentClub = club;

  // ─── Détection discipline principale ───
  const rawSportIds = Array.isArray(club.sport_ids) ? club.sport_ids
    : Array.isArray(club.sports) ? club.sports
    : (club.sport_id != null ? [club.sport_id] : []);
  const primaryDiscFromData = club.disc || club.discipline || null;
  const mappedDiscs = rawSportIds.map(id => (typeof SPORT_TO_DISC !== 'undefined') ? SPORT_TO_DISC[id] : null).filter(Boolean);
  const allDiscs = primaryDiscFromData
    ? [primaryDiscFromData, ...mappedDiscs.filter(d => d !== primaryDiscFromData)]
    : (mappedDiscs.length ? mappedDiscs : ['sports_centre']);
  const uniqueDiscs = [...new Set(allDiscs)];
  const primaryDisc = uniqueDiscs[0];
  const discLabelRaw = (typeof DISC_META !== 'undefined') ? (DISC_META[primaryDisc] || primaryDisc) : primaryDisc;
  const discLabel = (discLabelRaw && discLabelRaw !== 'sports_centre') ? discLabelRaw : 'Sport';
  // Prettify : "touch-rugby" → "Touch Rugby" (utilisé dans le breadcrumb, hero, key-stats)
  function _prettify(s) {
    if (!s) return '';
    return String(s).replace(/[-_]+/g, ' ').split(' ').map(w => w ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : w).join(' ');
  }
  const discLabelCap = _prettify(discLabel);

  // ─── Meta SEO ───
  const pageTitle = `${name}${ville ? ' · ' + ville : ''} | Kinetic`;
  // Friendly URL : /club/{dep}/{id} via rewrite Vercel (audit 2026-05-28)
  const pageUrl = `https://kinetic.app/club/${encodeURIComponent(dep || '')}/${encodeURIComponent(clubId)}`;
  document.title = pageTitle;
  document.getElementById('page-title').textContent = pageTitle;
  const pageDesc = `Retrouvez les informations pratiques de ${name}${ville ? ' à ' + ville : ''} : adresse, contacts et disciplines pratiquées.`;
  document.getElementById('meta-desc')?.setAttribute('content', pageDesc);
  document.getElementById('meta-canonical')?.setAttribute('href', pageUrl);
  document.getElementById('og-url')?.setAttribute('content', pageUrl);

  // ─── JSON-LD SportsActivityLocation (audit 2026-05-28) ───
  // Note : addrFull est defini plus bas, on le recalcule ici localement
  try {
    const _addrFull = [club.adresse, club.cp, ville].filter(Boolean).join(', ');
    const _lat = club.lat != null ? parseFloat(club.lat) : null;
    const _lng = club.lon != null ? parseFloat(club.lon) : (club.lng != null ? parseFloat(club.lng) : null);
    const ldData = {
      "@context": "https://schema.org",
      "@type": "SportsActivityLocation",
      "name": name,
      "url": pageUrl,
      "description": pageDesc,
      "sport": discLabelCap
    };
    if (_addrFull || ville) {
      ldData.address = { "@type": "PostalAddress", "addressCountry": "FR" };
      if (club.adresse) ldData.address.streetAddress = club.adresse;
      if (ville) ldData.address.addressLocality = ville;
      if (club.cp) ldData.address.postalCode = String(club.cp);
    }
    if (Number.isFinite(_lat) && Number.isFinite(_lng)) {
      ldData.geo = { "@type": "GeoCoordinates", "latitude": _lat, "longitude": _lng };
    }
    if (club.tel) ldData.telephone = club.tel;
    if (club.email) ldData.email = club.email;
    const ldScript = document.createElement('script');
    ldScript.type = 'application/ld+json';
    ldScript.textContent = JSON.stringify(ldData);
    document.head.appendChild(ldScript);
  } catch (_) { /* JSON-LD non bloquant */ }

  // ─── Breadcrumb (statique inline, pas via composant) ───
  const crumbVille = document.getElementById('crumb-ville');
  const crumbDisc = document.getElementById('crumb-disc');
  const crumbName = document.getElementById('crumb-name');
  if (crumbVille) crumbVille.textContent = ville || depName(dep);
  if (crumbDisc) crumbDisc.textContent = discLabelCap;
  if (crumbName) crumbName.textContent = name;

  // ─── Hero ───
  document.getElementById('hero-tag-text').textContent =
    `CLUB · ${discLabel.toUpperCase()}${ville ? ' · ' + ville.toUpperCase() : ''}`;
  // Badge "Vérifié par le club" visible uniquement si la fiche a été remplie par le club lui-même
  const verifiedBadge = document.getElementById('verified-badge');
  if (verifiedBadge) {
    verifiedBadge.style.display = (club.enrichi_par === 'club_self') ? '' : 'none';
  }
  // H1 : on essaie de splitter pour mettre l'italique sur la ville
  const h1El = document.getElementById('hero-h1');
  if (ville && name.toLowerCase().includes(ville.toLowerCase())) {
    const idx = name.toLowerCase().lastIndexOf(ville.toLowerCase());
    const before = name.substring(0, idx).trim();
    const villeMatch = name.substring(idx, idx + ville.length);
    h1El.innerHTML = before
      ? `${escapeHtml(before)} <span class="ital">${escapeHtml(villeMatch)}</span>`
      : escapeHtml(name);
  } else {
    h1El.textContent = name;
  }
  const addrFull = [club.adresse, club.cp, ville].filter(Boolean).join(', ');
  document.getElementById('hero-addr').textContent = addrFull || 'Adresse non communiquée';
  document.getElementById('map-addr-short').textContent = club.adresse || ville || 'Non communiqué';

  // ─── Map directions (Google Maps) ───
  const lat = club.lat != null ? parseFloat(club.lat) : NaN;
  const lng = club.lon != null ? parseFloat(club.lon) : (club.lng != null ? parseFloat(club.lng) : NaN);
  const mapsUrl = (Number.isFinite(lat) && Number.isFinite(lng))
    ? `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addrFull || `${name} ${ville}`)}`;
  document.getElementById('map-directions').href = mapsUrl;

  // ─── Carte Leaflet ───
  initHeroMap(lat, lng);

  // ─── Key Stats (4 cellules) ───
  // 1) Licenciés
  const ksLic = document.getElementById('ks-licencies');
  if (club.nb_licencies && Number(club.nb_licencies) > 0) {
    ksLic.innerHTML = `${Number(club.nb_licencies)}<span class="acc">+</span>`;
  } else {
    ksLic.textContent = 'Non communiqué';
    ksLic.style.fontFamily = "'Inter', sans-serif";
    ksLic.style.fontSize = '14px';
    ksLic.style.fontStyle = 'italic';
    ksLic.style.color = 'var(--gray)';
  }
  // 2) Disciplines (nombre)
  const ksDisc = document.getElementById('ks-disciplines');
  const nbDisc = (Array.isArray(club.disciplines_proposees) ? club.disciplines_proposees.length : 0) || uniqueDiscs.length || 1;
  ksDisc.textContent = String(nbDisc);
  // 3) Licence adulte (prix estimé via SPORTS.meta.cost)
  const ksPrix = document.getElementById('ks-licence-prix');
  let cost = null;
  if (Array.isArray(club.sport_ids) && club.sport_ids.length && typeof SPORTS !== 'undefined') {
    const sp = SPORTS.find(s => s.id === club.sport_ids[0]);
    cost = sp && sp.meta && (sp.meta.cost || sp.meta.licenceMoyenne);
  }
  if (cost) {
    ksPrix.innerHTML = `${cost}€<span class="acc">/an</span>`;
  } else {
    ksPrix.textContent = 'Non communiqué';
    ksPrix.style.fontFamily = "'Inter', sans-serif";
    ksPrix.style.fontSize = '14px';
    ksPrix.style.fontStyle = 'italic';
    ksPrix.style.color = 'var(--gray)';
  }
  // 4) Année fondation OU département en fallback
  const ksDept = document.getElementById('ks-dept');
  const ksDeptLbl = document.getElementById('ks-dept-lbl');
  if (club.annee_fondation) {
    ksDept.textContent = club.annee_fondation;
    ksDeptLbl.textContent = 'Année de fondation';
  } else {
    ksDept.textContent = depName(dep);
    ksDeptLbl.textContent = 'Département';
  }

  // ─── Présentation ───
  const presBody = document.getElementById('pres-body');
  if (club.presentation || club.description) {
    const txt = club.presentation || club.description;
    presBody.innerHTML = txt.split(/\n\n+/).map(p => `<p>${escapeHtml(p)}</p>`).join('');
  } else {
    const parts = [];
    parts.push(`Club de ${discLabel.toLowerCase()} basé à ${ville || depName(dep)}, affilié à la ${fedFor(primaryDisc)?.nameLong || 'fédération concernée'}.`);
    if (club.gestionnaire) parts.push(`Structure gérée par ${club.gestionnaire}.`);
    if (Array.isArray(club.equipes) && club.equipes.length) {
      parts.push(`${club.equipes.length} équipe${club.equipes.length > 1 ? 's' : ''} engagée${club.equipes.length > 1 ? 's' : ''} en compétition.`);
    }
    presBody.innerHTML = parts.map(p => `<p>${escapeHtml(p)}</p>`).join('');
  }

  // ─── SOURCE UNIQUE DE VÉRITÉ : la liste des disciplines du club ───
  // Priorité : disciplines_proposees (enrichi par l'agent ou le club) →
  //           sinon mapping FR depuis sport_ids (anglais via SPORT_TO_DISC → label FR via DISC_META).
  const enrichedDiscs = Array.isArray(club.disciplines_proposees) ? club.disciplines_proposees : [];
  const discEmoji = (typeof DISC_EMOJI !== 'undefined') ? DISC_EMOJI : {};
  function capit(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
  // Transforme "touch-rugby" → "Touch Rugby", "demi-fond" → "Demi Fond", etc.
  function prettifyDisc(s) {
    if (!s) return '';
    return String(s).replace(/[-_]+/g, ' ').split(' ').map(w => w ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : w).join(' ');
  }
  let clubDisciplines;
  if (enrichedDiscs.length) {
    clubDisciplines = enrichedDiscs.map(name => ({
      name: prettifyDisc(String(name)),
      emoji: emojiForDisc(name)
    }));
  } else {
    // Depuis sport_ids → discs anglaises uniques → labels FR
    const seen = new Set();
    clubDisciplines = uniqueDiscs.map(d => {
      const label = prettifyDisc((typeof DISC_META !== 'undefined' && DISC_META[d]) ? DISC_META[d] : d);
      const key = label.toLowerCase();
      if (seen.has(key)) return null;
      seen.add(key);
      return { name: label, emoji: emojiForDisc(d) };
    }).filter(Boolean);
    if (!clubDisciplines.length) clubDisciplines = [{ name: discLabelCap, emoji: emojiForDisc(primaryDisc) }];
  }
  // Expose globalement pour que le booking utilise la même liste
  bookState.clubDisciplines = clubDisciplines;

  // Rendu chips "Disciplines proposées" (gauche)
  const discListEl = document.getElementById('disc-list');
  discListEl.innerHTML = clubDisciplines.map((d, i) =>
    `<span class="disc-chip${i === 0 ? ' featured' : ''}"><span class="disc-emoji">${d.emoji}</span> ${escapeHtml(d.name)}</span>`
  ).join('');

  // ─── Coordonnées (téléphone, email, site web, métro/adresse) ───
  const coordsEl = document.getElementById('coords');
  const rows = [];
  if (club.tel) {
    const tel = String(club.tel).replace(/\s+/g, '');
    rows.push(`<div class="coord-row"><div class="coord-ic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/></svg></div>
      <div class="body"><small>Téléphone</small><a href="tel:${escapeHtml(tel)}">${escapeHtml(club.tel)}</a></div></div>`);
  }
  if (club.email) {
    rows.push(`<div class="coord-row"><div class="coord-ic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 6 10-6"/></svg></div>
      <div class="body"><small>Email</small><a href="mailto:${escapeHtml(club.email)}">${escapeHtml(club.email)}</a></div></div>`);
  }
  if (club.web) {
    const webUrl = club.web.startsWith('http') ? club.web : `https://${club.web}`;
    const webLabel = club.web.replace(/^https?:\/\//, '').replace(/\/$/, '');
    rows.push(`<div class="coord-row"><div class="coord-ic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20"/></svg></div>
      <div class="body"><small>Site web</small><a href="${escapeHtml(webUrl)}" target="_blank" rel="noopener">${escapeHtml(webLabel)}</a></div></div>`);
  }
  if (addrFull) {
    rows.push(`<div class="coord-row"><div class="coord-ic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 2c-4 0-7 3-7 7 0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg></div>
      <div class="body"><small>Adresse</small>${escapeHtml(addrFull)}</div></div>`);
  }
  coordsEl.innerHTML = rows.length
    ? rows.join('')
    : `<div class="coord-row"><div class="body"><small>Coordonnées</small><span style="color:var(--gray);font-style:italic">Non communiquées pour ce club.</span></div></div>`;

  // ─── Socials ───
  const socialsEl = document.getElementById('socials-grid');
  const socialDefs = [
    { key: 'instagram', label: 'Instagram', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>' },
    { key: 'facebook',  label: 'Facebook',  icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0022 12z"/></svg>' },
    { key: 'strava',    label: 'Strava',    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="#FC4C02" aria-hidden="true"><path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169"/></svg>' },
    { key: 'tiktok',    label: 'TikTok',    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005.8 20.1a6.34 6.34 0 0010.86-4.43V8.45a8.16 8.16 0 004.77 1.52V6.69h-1.84z"/></svg>' },
    { key: 'youtube',   label: 'YouTube',   icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="#FF0000" aria-hidden="true"><path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8z"/><path fill="white" d="M9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/></svg>' },
  ];
  const socChips = socialDefs.filter(s => club[s.key]).map(s => {
    const url = String(club[s.key]);
    const raw = url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
    const handle = raw.split('/').pop();
    const looksLikeDomain = handle && handle.includes('.') && !handle.startsWith('@');
    const handleHtml = (handle && !looksLikeDomain) ? ` <span class="handle">@${escapeHtml(handle)}</span>` : '';
    return `<a href="${escapeHtml(safeHref(url))}" target="_blank" rel="noopener noreferrer" class="soc-btn" aria-label="${s.label} du club">${s.icon} ${s.label}${handleHtml}</a>`;
  }).join('');
  socialsEl.innerHTML = socChips || `<span style="color:var(--gray);font-style:italic;font-size:13px">Aucun réseau social renseigné pour ce club.</span>`;

  // ─── Fédération (lien vers la page interne federation.html?f=<slug>) ───
  const fed = fedFor(primaryDisc);
  const fedEl = document.getElementById('fede-link');
  if (fed && fedEl) {
    fedEl.href = fed.slug ? `federation.html?f=${encodeURIComponent(fed.slug)}` : '#';
    fedEl.removeAttribute('target'); // page interne → on n'ouvre PAS dans un nouvel onglet
    fedEl.removeAttribute('rel');
    fedEl.style.display = '';
    document.getElementById('fede-logo').textContent = fed.label || 'FED';
    document.getElementById('fede-name').textContent = fed.nameLong || `Fédération ${fed.label}`;
    const detailsParts = [];
    if (club.rna) detailsParts.push(`N° d'agrément ${club.rna}`);
    if (fed.label) detailsParts.push(`Licence ${fed.label} incluse`);
    document.getElementById('fede-details').textContent = detailsParts.join(' · ');
  }

  // ─── Normaliser le planning ───
  // Les clubs ont 2 formats possibles :
  //   - Format standard : { jour, debut, fin, discipline OR equipe }
  //   - Format FTF/auto-déclaré : { jour, heure: "19h30-21h", categorie, section_id, lieu }
  // On harmonise vers le format standard pour que tout le rendu marche pareil.
  function _parseHeure(h) {
    if (!h) return { debut: '', fin: '' };
    const m = String(h).match(/^\s*(\d{1,2})\s*h\s*(\d{0,2})\s*[·\-–·à]\s*(\d{1,2})\s*h?\s*(\d{0,2})/i);
    if (!m) return { debut: String(h), fin: '' };
    return {
      debut: `${m[1].padStart(2,'0')}:${(m[2] || '00').padStart(2,'0')}`,
      fin:   `${m[3].padStart(2,'0')}:${(m[4] || '00').padStart(2,'0')}`,
    };
  }
  const planningNorm = Array.isArray(club.planning) ? club.planning.map(p => {
    const out = { ...p };
    // Format alternatif : heure → debut/fin
    if (!out.debut && out.heure) {
      const { debut, fin } = _parseHeure(out.heure);
      out.debut = debut; out.fin = fin;
    }
    // Format alternatif : categorie → discipline
    if (!out.discipline && !out.equipe) {
      out.discipline = out.categorie || out.section || '';
    }
    return out;
  }) : [];

  // ─── Booking widget (utilise les mêmes disciplines que la section "Disciplines proposées") ───
  if (club.seances_essai && Array.isArray(club.seances_essai.sections) && club.seances_essai.sections.length > 0) {
    initBookingFromEssai(club.seances_essai);
  } else {
    initBookingFromDisciplines(clubDisciplines, planningNorm);
  }

  // ─── Planning ───
  renderPlanning(planningNorm, primaryDisc);

  // ─── EVENTS (Viens nous rencontrer) ───
  renderEvents(club);

  // ─── REVIEWS (Avis des membres) ───
  renderReviews(club);
  wireReviewForm(club);

  // ─── CLAIM CTA & MODAL ───
  wireClaimButtons(club);
}

// ─── Rendu Events ───
// Section "Viens nous rencontrer" : cachée par défaut, affichée uniquement si
// club.events est rempli (la fiche a été enrichie manuellement avec de vrais événements).
function renderEvents(club) {
  const section = document.querySelector('section.events');
  if (!section) return;
  const events = Array.isArray(club.events) ? club.events : [];
  if (events.length === 0) { section.style.display = 'none'; return; }
  const grid = section.querySelector('.events-grid');
  if (!grid) return;
  grid.innerHTML = events.slice(0, 8).map(ev => {
    const dateStr = ev.date || ev.iso || '';
    let day = '', month = '', year = '';
    if (dateStr) {
      const d = new Date(dateStr);
      if (!isNaN(d)) {
        day = String(d.getDate()).padStart(2, '0');
        month = monthFR[d.getMonth()];
        year = String(d.getFullYear());
      }
    }
    const type = ev.type || 'portes';
    const tag = ev.tag || (type === 'compet' ? '🏆 Compétition'
                        : type === 'stage' ? '🏔️ Stage'
                        : type === 'decouverte' ? '✨ Séance découverte'
                        : '🎉 Portes ouvertes');
    return `<article class="event-card type-${escapeHtml(type)}">
      <div class="event-date">
        <div class="event-day">${escapeHtml(day || '·')}</div>
        <div class="event-month">${escapeHtml(month || '')}</div>
        <div class="event-year">${escapeHtml(year || '')}</div>
      </div>
      <div class="event-body">
        <span class="event-tag">${escapeHtml(tag)}</span>
        <h3>${escapeHtml(ev.title || ev.nom || 'Événement')}</h3>
        ${ev.when ? `<p class="event-when">${escapeHtml(ev.when)}</p>` : ''}
        ${ev.desc ? `<p class="event-desc">${escapeHtml(ev.desc)}</p>` : ''}
        ${ev.cta_url ? `<a href="${escapeHtml(ev.cta_url)}" target="_blank" rel="noopener" class="event-cta">${escapeHtml(ev.cta_label || "J'y vais")} →</a>` : ''}
      </div>
    </article>`;
  }).join('');
}

// ─── Rendu Reviews ───
// Aucun avis fictif. Bind sur club.reviews uniquement, sinon empty state.
function renderReviews(club) {
  const section = document.querySelector('section.reviews');
  if (!section) return;
  const reviews = Array.isArray(club.reviews) ? club.reviews : [];
  const listEl = section.querySelector('#reviewsList');
  const countEl = section.querySelector('#reviewsCount');
  const avgEl = section.querySelector('#avgScore');
  const fillEl = section.querySelector('#avgStarsFill');
  const moreBtn = section.querySelector('#loadMoreReviews');

  if (listEl) listEl.innerHTML = '';
  if (moreBtn) moreBtn.style.display = 'none';

  if (reviews.length === 0) {
    if (countEl) countEl.textContent = '0';
    if (avgEl) avgEl.textContent = '·';
    if (fillEl) fillEl.style.width = '0%';
    if (listEl) listEl.innerHTML = `<div style="text-align:center;padding:32px;background:white;border:1px dashed var(--border);border-radius:22px">
      <div style="font-size:32px;margin-bottom:8px" aria-hidden="true">💬</div>
      <p style="color:var(--ink);font-size:15px;font-weight:700;margin-bottom:4px">Aucun avis pour le moment</p>
      <p style="color:var(--gray);font-size:13px;line-height:1.5">Tu connais ce club ? Sois le premier à partager ton ressenti via le formulaire ci-dessus.</p>
    </div>`;
    const rating = section.querySelector('.reviews-rating');
    if (rating) rating.style.opacity = '.35';
    return;
  }

  const avg = reviews.reduce((s, r) => s + (parseFloat(r.rating) || 0), 0) / reviews.length;
  if (countEl) countEl.textContent = String(reviews.length);
  if (avgEl) avgEl.textContent = avg.toFixed(1).replace('.', ',');
  if (fillEl) fillEl.style.width = `${Math.min(100, avg / 5 * 100)}%`;

  if (listEl) {
    listEl.innerHTML = reviews.slice(0, 6).map(r => {
      const initials = (r.author || 'Anonyme').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
      const rating = Math.max(1, Math.min(5, parseInt(r.rating, 10) || 5));
      return `<article class="review-card" data-rating="${rating}">
        <div class="review-head">
          <div class="review-avatar" style="background:linear-gradient(135deg, var(--violet), var(--orange))">${escapeHtml(initials)}</div>
          <div class="review-who">
            <b>${escapeHtml(r.author || 'Anonyme')}</b>
            ${r.context ? `<span>${escapeHtml(r.context)}</span>` : ''}
          </div>
          <div class="review-stars-mini" data-rating="${rating}"></div>
        </div>
        <p>${escapeHtml(r.text || '')}</p>
      </article>`;
    }).join('');
  }
  if (moreBtn && reviews.length > 6) {
    moreBtn.style.display = '';
    moreBtn.textContent = `Voir les ${reviews.length - 6} autres avis`;
  }
}

// ─── Wire du formulaire d'avis (étoiles + char count + submit) ───
function wireReviewForm(club) {
  const form = document.getElementById('reviewForm');
  if (!form) return;
  const starsContainer = document.getElementById('ratingStars');
  const stars = form.querySelectorAll('.rs-btn');
  const hint = document.getElementById('ratingHint');
  const nameEl = document.getElementById('revName');
  const textEl = document.getElementById('revText');
  const counter = document.getElementById('charCount');
  const submitBtn = form.querySelector('.review-submit');
  let currentRating = 0;

  // Clic sur une étoile → fill jusqu'à cette étoile
  stars.forEach((star, idx) => {
    star.addEventListener('click', () => {
      currentRating = parseInt(star.dataset.val, 10);
      stars.forEach((s, i) => s.classList.toggle('active', i < currentRating));
      if (hint) {
        const labels = ['', 'Pas terrible', 'Moyen', 'Correct', 'Très bien !', 'Au top !'];
        hint.textContent = labels[currentRating] || 'Clique pour noter →';
      }
      updateSubmitState();
    });
    star.addEventListener('mouseenter', () => {
      const v = parseInt(star.dataset.val, 10);
      stars.forEach((s, i) => s.classList.toggle('hover', i < v && i >= currentRating));
    });
  });
  starsContainer?.addEventListener('mouseleave', () => {
    stars.forEach(s => s.classList.remove('hover'));
  });

  // Compteur de caractères + activation du bouton
  function updateSubmitState() {
    const hasRating = currentRating > 0;
    const hasName = nameEl && nameEl.value.trim().length >= 2;
    const hasText = textEl && textEl.value.trim().length >= 10;
    if (submitBtn) submitBtn.disabled = !(hasRating && hasName && hasText);
  }
  if (textEl) {
    textEl.addEventListener('input', () => {
      if (counter) counter.textContent = `${textEl.value.length} / 400`;
      updateSubmitState();
    });
  }
  if (nameEl) nameEl.addEventListener('input', updateSubmitState);

  // Submit du formulaire d'avis
  let isSubmitting = false;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (currentRating === 0) {
      alert('Choisis une note (étoiles) avant de publier.');
      return;
    }
    const name = (nameEl?.value || '').trim();
    const text = (textEl?.value || '').trim();
    if (name.length < 2 || text.length < 10) {
      alert('Prénom (2 caractères min) et avis (10 caractères min) requis.');
      return;
    }
    isSubmitting = true;
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Envoi…'; }

    const payload = {
      type: 'review',
      club_id: clubId,
      dep: depCode,
      club_nom: club.nom || '',
      submitted_at: new Date().toISOString(),
      // On envoie aussi en format claim-compatible pour passer la validation du worker
      contact: { nom: name, email: 'avis-anonyme@kinetic.studio' },
      review: {
        rating: currentRating,
        author: name,
        text,
      },
      enrichi_par: 'review_user',
    };

    // 1) Tentative POST vers le Worker (créera une PR avec un fichier pending/reviews/<id>.json)
    const ENDPOINT = window.KINETIC_CLAIM_ENDPOINT || 'https://kinetic-claim.shiny-sun-bb38.workers.dev/submit';
    let posted = false;
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) posted = true;
    } catch (e) { /* ignore, fallback mailto */ }

    // Optimistic UI : on ajoute l'avis dans le DOM tout de suite (visible pour l'utilisateur immédiatement)
    const newReview = {
      rating: currentRating,
      author: name,
      text,
      submitted_at: new Date().toISOString(),
    };
    if (!Array.isArray(club.reviews)) club.reviews = [];
    club.reviews.unshift(newReview);
    renderReviews(club);

    if (posted) {
      alert(`Merci ${name} ! Ton avis ${currentRating} étoile${currentRating > 1 ? 's' : ''} est publié ✨`);
    } else {
      // Fallback : worker indispo → on garde l'avis local + on prévient l'équipe par mail
      const subject = encodeURIComponent(`[Kinetic Avis] ${club.nom || 'Club'} · ${'★'.repeat(currentRating)}`);
      const body = encodeURIComponent(
        `Nouvel avis sur ${club.nom || 'club'} (${clubId} / ${depCode})\n` +
        `Note : ${currentRating} / 5 étoiles\n` +
        `Prénom : ${name}\n\n` +
        `Avis :\n${text}\n\n` +
        `Soumis le : ${payload.submitted_at}\n`
      );
      // Ouvre mailto silencieusement en arrière-plan (window.open dans un nouveau "_blank")
      try { window.open(`mailto:contact@kinetic.studio?subject=${subject}&body=${body}`, '_blank'); } catch (e) {}
      alert(`Merci ${name} ! Ton avis ${currentRating}★ est enregistré ✨`);
    }
    form.reset();
    stars.forEach(s => s.classList.remove('active'));
    currentRating = 0;
    if (counter) counter.textContent = '0 / 400';
    if (hint) hint.textContent = 'Clique pour noter →';

    isSubmitting = false;
    if (submitBtn) {
      submitBtn.disabled = !(currentRating > 0 && nameEl?.value.trim() && textEl?.value.trim());
      submitBtn.innerHTML = `Publier mon avis <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;
    }
  });
}

// ─── Wire des boutons claim (modal + toggle + +/− rows + submit) ───
function wireClaimButtons(club) {
  const openers = document.querySelectorAll('[data-open-claim]');
  const closers = document.querySelectorAll('[data-close-claim]');
  const modal = document.getElementById('claimModal');
  if (!modal) return;
  openers.forEach(b => b.addEventListener('click', e => {
    e.preventDefault();
    modal.classList.add('show');
  }));
  closers.forEach(b => b.addEventListener('click', e => {
    e.preventDefault();
    modal.classList.remove('show');
  }));
  // NB : pas de fermeture au clic en dehors du formulaire. Seule la croix ferme.

  // ─── Préremplit le formulaire avec toutes les infos dispos sur le club ───
  const setVal = (selector, value) => {
    const el = modal.querySelector(selector);
    if (el && value != null && value !== '') el.value = value;
  };
  setVal('input[name="clubName"]', club.nom);
  setVal('input[name="address"]', [club.adresse, club.cp, club.ville].filter(Boolean).join(', '));
  setVal('textarea[name="presentation"]', club.presentation || club.description || '');
  setVal('input[name="founded"]', club.annee_fondation || '');
  setVal('input[name="licensePrice"]', club.prix_licence || '');
  setVal('input[name="totalLicensees"]', club.nb_licencies || '');
  setVal('input[name="phone"]', club.tel || '');
  setVal('input[name="publicEmail"]', club.email || '');
  setVal('input[name="website"]', club.web || club.site || '');
  setVal('input[name="instagram"]', club.instagram || '');
  setVal('input[name="facebook"]', club.facebook || '');
  setVal('input[name="strava"]', club.strava || '');
  setVal('input[name="otherSocial"]', club.tiktok || club.youtube || '');

  // Préremplit les disciplines (Step 3) depuis disciplines_proposees
  if (Array.isArray(club.disciplines_proposees) && club.disciplines_proposees.length) {
    const discList = modal.querySelector('#cfDiscList');
    if (discList) {
      const tpl = discList.querySelector('.cf-disc-row');
      discList.innerHTML = '';
      club.disciplines_proposees.forEach(d => {
        const row = tpl.cloneNode(true);
        const inputs = row.querySelectorAll('input');
        if (inputs[0]) inputs[0].value = d;
        if (inputs[1]) inputs[1].value = '';
        discList.appendChild(row);
      });
    }
  }

  // ─── Toggle "Activer la réservation en ligne" ───
  const bookingCheckbox = modal.querySelector('#cfBooking');
  if (bookingCheckbox) {
    const wrap = bookingCheckbox.closest('.cf-toggle-wrap');
    const syncToggle = () => { if (wrap) wrap.classList.toggle('is-on', bookingCheckbox.checked); };
    bookingCheckbox.addEventListener('change', syncToggle);
    syncToggle();
  }

  // ─── Boutons "+ Ajouter une discipline" / "+ Ajouter un créneau" / "+ Ajouter une date" ───
  const wireAddButton = (btnId, containerId, rowSelector) => {
    const btn = modal.querySelector('#' + btnId);
    const container = modal.querySelector('#' + containerId);
    if (!btn || !container) return;
    btn.addEventListener('click', () => {
      const tpl = container.querySelector(rowSelector);
      if (!tpl) return;
      const clone = tpl.cloneNode(true);
      clone.querySelectorAll('input').forEach(i => {
        if (i.type === 'time') i.value = '18:30';
        else if (i.type === 'date') i.value = '';
        else i.value = '';
      });
      container.appendChild(clone);
    });
  };
  wireAddButton('cfAddDisc',  'cfDiscList',  '.cf-disc-row');
  wireAddButton('cfAddTrial', 'cfTrialList', '.cf-trial-slot');
  wireAddButton('cfAddDate',  'cfDates',     '.cf-date-row');

  // ─── ✕ Retirer une row (event delegation) ───
  modal.addEventListener('click', e => {
    const btn = e.target.closest('.cf-trial-rm, .cf-date-rm');
    if (!btn) return;
    e.preventDefault();
    const row = btn.closest('.cf-disc-row, .cf-trial-slot, .cf-date-row');
    if (!row) return;
    const container = row.parentNode;
    const siblings = container.querySelectorAll(':scope > .cf-disc-row, :scope > .cf-trial-slot, :scope > .cf-date-row');
    if (siblings.length > 1) {
      row.remove();
    } else {
      row.querySelectorAll('input').forEach(i => { if (i.type !== 'time') i.value = ''; });
    }
  });

  // ─── Désactiver l'autofill sauf sur prénom / nom / email ───
  // Apple, Dashlane, 1Password, LastPass respectent ces attributs.
  const FIELDS_AVEC_AUTOFILL = {
    firstName: 'given-name',
    lastName:  'family-name',
    email:     'email',
  };
  modal.querySelectorAll('input, textarea, select').forEach(el => {
    const name = el.getAttribute('name') || '';
    const fieldKey = name.replace(/\[\]$/, '');
    if (FIELDS_AVEC_AUTOFILL[fieldKey]) {
      // Autorise l'autofill standard pour les 3 champs essentiels
      el.setAttribute('autocomplete', FIELDS_AVEC_AUTOFILL[fieldKey]);
    } else {
      // Bloque tous les autres (multi-vendor)
      el.setAttribute('autocomplete', 'off');
      el.setAttribute('data-form-type', 'other');        // 1Password
      el.setAttribute('data-lpignore', 'true');          // LastPass
      el.setAttribute('data-1p-ignore', 'true');         // 1Password (alt)
      el.setAttribute('data-dashlane-ignore', 'true');   // Dashlane
      el.setAttribute('data-dashlane-rid', 'ignore');    // Dashlane (alt)
    }
  });
  // Met aussi un attribut sur le form lui-même
  const claimFormEl = modal.querySelector('#claimForm');
  if (claimFormEl) {
    claimFormEl.setAttribute('autocomplete', 'off');
    claimFormEl.setAttribute('data-form-type', 'other');
  }

  // ─── SUBMIT du formulaire → POST vers le Worker Cloudflare ───
  const form = modal.querySelector('#claimForm');
  if (form) {
    // Empêche le submit par défaut (qui ferait un GET avec query params dans l'URL)
    form.setAttribute('method', 'POST');
    form.removeAttribute('action');
    // Flag anti-double-submit : si déjà en train d'envoyer, on ignore les clics suivants
    let isSubmitting = false;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (isSubmitting) return;
      isSubmitting = true;

      // Construire le payload depuis FormData
      const fd = new FormData(form);
      const disciplines = [];
      const dNames = fd.getAll('discName[]');
      const dLevels = fd.getAll('discLevel[]');
      dNames.forEach((n, i) => {
        if ((n && String(n).trim()) || (dLevels[i] && String(dLevels[i]).trim())) {
          disciplines.push({ name: String(n || '').trim(), level: String(dLevels[i] || '').trim() });
        }
      });
      const trials = [];
      const tDisc = fd.getAll('trialDisc[]');
      const tGroup = fd.getAll('trialGroup[]');
      const tDay = fd.getAll('trialDay[]');
      const tTime = fd.getAll('trialTime[]');
      tDisc.forEach((d, i) => {
        if (d || tDay[i] || tTime[i]) {
          trials.push({
            discipline: String(d || '').trim(),
            group: String(tGroup[i] || '').trim(),
            day: String(tDay[i] || '').trim(),
            time: String(tTime[i] || '').trim(),
          });
        }
      });
      const events = [];
      const eDates = fd.getAll('excDates[]');
      const eTimes = fd.getAll('excTimes[]');
      const eLabels = fd.getAll('excLabels[]');
      eDates.forEach((dt, i) => {
        if (dt || eLabels[i]) {
          events.push({
            date: String(dt || '').trim(),
            time: String(eTimes[i] || '').trim(),
            label: String(eLabels[i] || '').trim(),
          });
        }
      });

      const firstName = (fd.get('firstName') || '').trim();
      const lastName  = (fd.get('lastName')  || '').trim();
      // Le worker valide tel + web au top level → on hisse les valeurs publiques
      const topTel = (fd.get('phone') || '').trim();
      let topWeb = (fd.get('website') || '').trim();
      if (topWeb && !/^https?:\/\//.test(topWeb)) topWeb = 'https://' + topWeb;
      const topEmail = (fd.get('publicEmail') || '').trim() || null;

      const payload = {
        club_id: clubId,
        dep: depCode,
        club_nom: club.nom || '',
        submitted_at: new Date().toISOString(),
        contact: {
          nom: [firstName, lastName].filter(Boolean).join(' ') || firstName || lastName,
          firstName,
          lastName,
          email: (fd.get('email') || '').trim(),
          role: (fd.get('role') || '').trim() || null,
        },
        tel: topTel || null,
        email: topEmail,
        web: topWeb || null,
        club: {
          name: (fd.get('clubName') || '').trim(),
          address: (fd.get('address') || '').trim(),
          presentation: (fd.get('presentation') || '').trim(),
          founded: fd.get('founded') ? parseInt(fd.get('founded'), 10) : null,
          licensePrice: fd.get('licensePrice') ? parseInt(fd.get('licensePrice'), 10) : null,
        },
        disciplines,
        discNotes: (fd.get('discNotes') || '').trim(),
        schedule: (fd.get('schedule') || '').trim(),
        licensees: {
          total: fd.get('totalLicensees') ? parseInt(fd.get('totalLicensees'), 10) : null,
          male:  fd.get('male')  ? parseInt(fd.get('male'), 10)  : null,
          female:fd.get('female')? parseInt(fd.get('female'), 10): null,
        },
        public: {
          phone: (fd.get('phone') || '').trim(),
          email: (fd.get('publicEmail') || '').trim(),
          website: (fd.get('website') || '').trim(),
        },
        socials: {
          instagram: (fd.get('instagram') || '').trim(),
          facebook: (fd.get('facebook') || '').trim(),
          strava: (fd.get('strava') || '').trim(),
          other: (fd.get('otherSocial') || '').trim(),
        },
        booking: {
          enabled: fd.get('enableBooking') === 'on',
          weeklyFrequency: (fd.get('weeklyFrequency') || '').trim(),
          slots: trials,
          exceptionalEvents: events,
        },
        freeNote: (fd.get('freeNote') || '').trim(),
        enrichi_par: 'club_self',
      };

      // Validation minimale
      if (!payload.contact.firstName || !payload.contact.lastName || !payload.contact.email) {
        alert('Prénom, nom et email sont obligatoires.');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.contact.email)) {
        alert('Email invalide.');
        return;
      }

      // POST vers le Worker Cloudflare (subdomain Ymer/Kinetic Studio = shiny-sun-bb38)
      const ENDPOINT = window.KINETIC_CLAIM_ENDPOINT || 'https://kinetic-claim.shiny-sun-bb38.workers.dev/submit';
      // Le bouton submit est OUT du form (rattaché via form="claimForm"), donc on le cherche dans la modal
      const submitBtn = modal.querySelector('button[type="submit"][form="claimForm"], .cf-submit[type="submit"]');
      const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Envoi en cours...';
      }

      try {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const txt = await res.text().catch(() => '');
          throw new Error(`HTTP ${res.status} : ${txt.slice(0, 200) || 'erreur serveur'}`);
        }
        // Succès : on ferme le modal et on affiche une confirmation
        modal.classList.remove('show');
        alert("Merci ! Tes infos ont été envoyées. Elles seront publiées après une vérification rapide (24h max).");
        form.reset();
      } catch (err) {
        console.error('[claim submit]', err);
        // Fallback : ouvre le client mail avec toutes les données en clair
        // pour que Rémy puisse les recevoir même si le Worker n'est pas déployé.
        const ok = confirm(
          "L'envoi automatique a échoué : " + (err.message || 'erreur réseau') + ".\n\n"
          + "Veux-tu envoyer ta fiche par mail à la place ?\n"
          + "(Ton client mail va s'ouvrir avec toutes les infos pré-remplies.)"
        );
        if (ok) {
          const lines = [];
          lines.push('Soumission fiche club via formulaire Kinetic');
          lines.push('Club : ' + (payload.club_nom || '·') + ' (id ' + payload.club_id + ' / dep ' + payload.dep + ')');
          lines.push('Soumis le : ' + payload.submitted_at);
          lines.push('');
          lines.push('=== CONTACT RÉFÉRENT ===');
          lines.push('Nom : ' + payload.contact.firstName + ' ' + payload.contact.lastName);
          lines.push('Email : ' + payload.contact.email);
          lines.push('Rôle : ' + (payload.contact.role || '·'));
          lines.push('');
          lines.push('=== INFOS CLUB ===');
          lines.push('Nom : ' + payload.club.name);
          lines.push('Adresse : ' + payload.club.address);
          lines.push('Année fondation : ' + (payload.club.founded || '·'));
          lines.push('Licence (€) : ' + (payload.club.licensePrice || '·'));
          if (payload.club.presentation) { lines.push('Présentation : ' + payload.club.presentation); }
          lines.push('');
          lines.push('=== DISCIPLINES (' + payload.disciplines.length + ') ===');
          payload.disciplines.forEach(d => lines.push('  · ' + d.name + ' / ' + d.level));
          if (payload.discNotes) { lines.push('Notes : ' + payload.discNotes); }
          if (payload.schedule) { lines.push('Planning : ' + payload.schedule); }
          lines.push('');
          lines.push('=== LICENCIÉS ===');
          lines.push('Total : ' + (payload.licensees.total || '·')
            + ' (H: ' + (payload.licensees.male || '·') + ' / F: ' + (payload.licensees.female || '·') + ')');
          lines.push('');
          lines.push('=== INFOS PUBLIQUES ===');
          lines.push('Téléphone : ' + payload.public.phone);
          lines.push('Email public : ' + payload.public.email);
          lines.push('Site web : ' + payload.public.website);
          lines.push('Instagram : ' + payload.socials.instagram);
          lines.push('Facebook : ' + payload.socials.facebook);
          lines.push('Strava : ' + payload.socials.strava);
          lines.push('TikTok / YouTube : ' + payload.socials.other);
          lines.push('');
          lines.push('=== RÉSERVATION SÉANCE D\'ESSAI ===');
          lines.push('Activée : ' + (payload.booking.enabled ? 'OUI' : 'NON'));
          lines.push('Régularité : ' + (payload.booking.weeklyFrequency || '·'));
          if (payload.booking.slots.length) {
            lines.push('Créneaux :');
            payload.booking.slots.forEach(s => lines.push('  · ' + s.discipline + ' / ' + s.group + ' / ' + s.day + ' ' + s.time));
          }
          if (payload.booking.exceptionalEvents.length) {
            lines.push('Dates exceptionnelles :');
            payload.booking.exceptionalEvents.forEach(e => lines.push('  · ' + e.date + ' ' + e.time + ' · ' + e.label));
          }
          if (payload.freeNote) { lines.push(''); lines.push('=== NOTE LIBRE ==='); lines.push(payload.freeNote); }
          const body = encodeURIComponent(lines.join('\n'));
          const subject = encodeURIComponent('[Kinetic Claim] ' + (payload.club_nom || 'Club') + ' · ' + payload.club_id);
          window.location.href = 'mailto:contact@kinetic.studio?subject=' + subject + '&body=' + body;
        }
      } finally {
        isSubmitting = false;
        if (submitBtn) {
          submitBtn.disabled = false;
          if (originalBtnHtml) submitBtn.innerHTML = originalBtnHtml;
          else submitBtn.textContent = 'Envoyer pour validation';
        }
      }
    });
  }

}

// ═══════════════════════════════════════════════════════════════════
// LEAFLET
// ═══════════════════════════════════════════════════════════════════
let __heroMap = null;
function initHeroMap(lat, lng) {
  const mapEl = document.getElementById('hero-map-leaflet');
  const heroMap = document.getElementById('hero-map');
  if (!mapEl) return;
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    // Pas de coords → on garde le fallback décoratif (pin SVG + dégradé)
    mapEl.style.display = 'none';
    return;
  }
  // Coords valides → on cache les éléments décoratifs (pin, ring, shadow)
  ['ring','pin-shadow','pin'].forEach(cls => {
    const el = heroMap.querySelector('.' + cls);
    if (el) el.style.display = 'none';
  });
  if (typeof L === 'undefined') { setTimeout(() => initHeroMap(lat, lng), 200); return; }
  if (__heroMap) { __heroMap.setView([lat, lng], 14); return; }
  __heroMap = L.map(mapEl, {
    zoomControl: false, attributionControl: false, scrollWheelZoom: false,
    dragging: true, tap: false, keyboard: false,
  }).setView([lat, lng], 14);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19, subdomains: 'abcd', attribution: '© OpenStreetMap · CARTO'
  }).addTo(__heroMap);
  const kineticIcon = L.divIcon({
    className: 'kinetic-marker',
    html: '<div class="marker-dot" style="width:40px;height:40px;background:var(--orange);border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid white;box-shadow:0 10px 30px rgba(255,90,31,.5);position:relative"><div style="position:absolute;top:50%;left:50%;width:14px;height:14px;background:white;border-radius:50%;transform:translate(-50%,-50%) rotate(45deg)"></div></div>',
    iconSize: [40, 40],
    iconAnchor: [20, 38]
  });
  L.marker([lat, lng], { icon: kineticIcon, keyboard: false }).addTo(__heroMap);
  setTimeout(() => __heroMap && __heroMap.invalidateSize(), 250);
  window.addEventListener('resize', () => __heroMap && __heroMap.invalidateSize());
}

// ═══════════════════════════════════════════════════════════════════
// BOOKING (mode générique : 1 essai/semaine par discipline)
// ═══════════════════════════════════════════════════════════════════
const DISC_EMOJI_INLINE = { 'soccer':'⚽','football':'⚽','basketball':'🏀','basket':'🏀','tennis':'🎾','swimming':'🏊','natation':'🏊','rugby':'🏉','judo':'🥋','karate':'🥋','karaté':'🥋','athletics':'🏃','athletisme':'🏃','athlétisme':'🏃','climbing':'🧗','escalade':'🧗','handball':'🤾','volleyball':'🏐','volley':'🏐','golf':'⛳','equitation':'🐴','équitation':'🐴','ski':'⛷️','fitness':'💪','padel':'🎾','badminton':'🏸','boxe':'🥊' };
function emojiForDisc(d) {
  if (!d) return '🏅';
  const norm = String(d).toLowerCase();
  if (DISC_EMOJI_INLINE[norm]) return DISC_EMOJI_INLINE[norm];
  if (typeof DISC_EMOJI !== 'undefined' && DISC_EMOJI[d]) return DISC_EMOJI[d];
  return '🏅';
}

// ─── Booking mode "disciplines + planning" : utilise les disciplines de la fiche, ───
// matche fuzzy sur les entrées du planning pour récupérer jours + horaires réels.
// Si une discipline n'a aucun match planning, on retombe sur "Contact club" pour cette discipline.
function initBookingFromDisciplines(clubDiscs, planning) {
  bookState.mode = 'discipline-planning';

  // Indexer le planning pour chaque discipline-club via matching fuzzy
  // (le nom de la discipline ou un mot-clé associé apparaît dans equipe ou discipline)
  function planningEntriesForDisc(disc) {
    const needle = String(disc.name || '').toLowerCase();
    // Aliases pour matcher plus large (athletisme matche aussi athletique, athle, etc.)
    const aliases = [needle];
    const stem = needle.replace(/(isme|ique|ie|e)$/, '');
    if (stem.length > 3) aliases.push(stem);
    // Aliases spécifiques connus
    const knownAliases = {
      'athletisme': ['athle','athletique','poussin','minime','benjamin','cadet','junior','senior','master','espoir','éveil','sprint','demi-fond','fond','cross'],
      'athlétisme': ['athle','athletique','poussin','minime','benjamin','cadet','junior','senior','master','espoir','éveil','sprint','demi-fond','fond','cross'],
      'randonnée': ['marche','rando','hike'],
      'randonnee': ['marche','rando','hike'],
      'trail': ['trail','course nature'],
      'fitness': ['fitness','muscu','musculation','cardio'],
      'course à pied': ['running','course','jogging','run'],
      'course a pied': ['running','course','jogging','run'],
    };
    if (knownAliases[needle]) aliases.push(...knownAliases[needle]);

    return planning.filter(p => {
      const haystack = (String(p.equipe || '') + ' ' + String(p.discipline || '')).toLowerCase();
      return aliases.some(a => a && haystack.includes(a));
    });
  }

  // Construire l'index : disc.name → { jourFR: [{debut,fin}], ... }
  const indexByDisc = {};
  clubDiscs.forEach(d => {
    const entries = planningEntriesForDisc(d);
    const byDow = {};
    entries.forEach(p => {
      const j = String(p.jour || '').toLowerCase();
      if (!byDow[j]) byDow[j] = [];
      byDow[j].push({ debut: p.debut, fin: p.fin });
    });
    indexByDisc[d.name] = byDow;
  });
  bookState.discIndex = indexByDisc;

  // Discipline picker (mêmes chips qu'à gauche)
  const picker = document.getElementById('discPicker');
  picker.innerHTML = '';
  clubDiscs.forEach((d, i) => {
    const btn = document.createElement('button');
    btn.className = 'disc-pick-btn' + (i === 0 ? ' active' : '');
    btn.textContent = `${d.emoji} ${d.name}`;
    btn.dataset.disc = d.name;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.disc-pick-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      bookState.discipline = d.name;
      bookState.slot = null;
      renderDayPickerByDisc(d.name);
      updateBookSummary();
    });
    picker.appendChild(btn);
  });
  bookState.discipline = clubDiscs[0].name;
  renderDayPickerByDisc(clubDiscs[0].name);
  updateBookSummary();
}

function renderDayPickerByDisc(discName) {
  const picker = document.getElementById('dayPicker');
  picker.innerHTML = '';
  const byDow = (bookState.discIndex && bookState.discIndex[discName]) || {};
  const allowedDows = Object.keys(byDow).map(j => JOUR_TO_NUM[j]).filter(n => n != null);

  // Cas : aucun match planning pour cette discipline → message + cache le slot picker
  if (allowedDows.length === 0) {
    document.getElementById('slotsAm').innerHTML = '';
    document.getElementById('slotsPm').innerHTML = '';
    document.getElementById('amSection').style.display = 'none';
    document.getElementById('pmSection').style.display = 'none';
    bookState.day = null;
    picker.innerHTML = `<div style="grid-column:1/-1;padding:18px;background:var(--paper);border:1px dashed var(--border);border-radius:14px;text-align:center;font-size:13px;color:var(--ink-soft);line-height:1.5">Pas encore d'horaires précis pour <b>${escapeHtml(discName)}</b>. Contacte le club directement pour ta séance d'essai.</div>`;
    return;
  }

  let firstOpen = null;
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    const ok = allowedDows.includes(d.getDay());
    const btn = document.createElement('button');
    btn.className = 'day-btn' + (ok ? '' : ' full');
    btn.disabled = !ok;
    btn.innerHTML = `<div class="dow">${dowFR[d.getDay()]}</div><div class="dn">${d.getDate()}</div><div class="month">${monthFR[d.getMonth()]}</div><div class="av ${ok ? '' : 'full'}" aria-hidden="true"></div>`;
    if (ok) {
      if (!firstOpen) firstOpen = { btn, d };
      btn.addEventListener('click', () => {
        document.querySelectorAll('.day-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        bookState.day = d;
        bookState.slot = null;
        renderSlotsByDisc(discName, d);
        updateBookSummary();
      });
    }
    picker.appendChild(btn);
  }

  if (firstOpen) {
    firstOpen.btn.classList.add('active');
    bookState.day = firstOpen.d;
    renderSlotsByDisc(discName, firstOpen.d);
  } else {
    bookState.day = null;
  }
}

function renderSlotsByDisc(discName, d) {
  const am = document.getElementById('slotsAm');
  const pm = document.getElementById('slotsPm');
  const amSec = document.getElementById('amSection');
  const pmSec = document.getElementById('pmSection');
  am.innerHTML = ''; pm.innerHTML = '';
  const dow = d.getDay();
  const jourName = Object.keys(JOUR_TO_NUM).find(k => JOUR_TO_NUM[k] === dow);
  const slots = (bookState.discIndex && bookState.discIndex[discName] && bookState.discIndex[discName][jourName]) || [];
  // Dédupliquer les horaires
  const seenTimes = new Set();
  slots.forEach(s => {
    const time = s.debut; if (!time || seenTimes.has(time)) return;
    seenTimes.add(time);
    const hour = parseInt(time.split(':')[0], 10);
    const btn = document.createElement('button');
    btn.className = 'slot-btn';
    btn.textContent = time;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.slot-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      bookState.slot = time;
      updateBookSummary();
    });
    (hour < 12 ? am : pm).appendChild(btn);
  });
  amSec.style.display = am.children.length ? '' : 'none';
  pmSec.style.display = pm.children.length ? '' : 'none';
}

// ─── Booking mode "planning réel" : pilote sur club.planning ───
// La discipline picker = équipes/groupes uniques du planning
// Le day picker = jours où le groupe sélectionné s'entraîne
// Le slot picker = horaires réels du planning pour ce groupe ce jour
function initBookingFromPlanning(planning, club) {
  bookState.mode = 'planning';
  // Indexer : { 'Nom du groupe': { lundi: [{debut,fin}], mardi: [...] } }
  const byGroup = {};
  planning.forEach(p => {
    const group = p.discipline || p.equipe || 'Séance';
    const jour = String(p.jour || '').toLowerCase();
    if (!byGroup[group]) byGroup[group] = {};
    if (!byGroup[group][jour]) byGroup[group][jour] = [];
    byGroup[group][jour].push({ debut: p.debut, fin: p.fin });
  });
  bookState.planningIndex = byGroup;

  // Discipline picker
  const picker = document.getElementById('discPicker');
  picker.innerHTML = '';
  const groups = Object.keys(byGroup);
  groups.forEach((g, i) => {
    const btn = document.createElement('button');
    btn.className = 'disc-pick-btn' + (i === 0 ? ' active' : '');
    btn.textContent = g;
    btn.dataset.group = g;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.disc-pick-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      bookState.discipline = g;
      bookState.slot = null;
      renderDayPickerFromPlanning(g);
      updateBookSummary();
    });
    picker.appendChild(btn);
  });
  bookState.discipline = groups[0];
  renderDayPickerFromPlanning(groups[0]);
  updateBookSummary();
}

function renderDayPickerFromPlanning(group) {
  const picker = document.getElementById('dayPicker');
  picker.innerHTML = '';
  const groupSchedule = (bookState.planningIndex && bookState.planningIndex[group]) || {};
  const allowedDows = Object.keys(groupSchedule).map(j => JOUR_TO_NUM[j]).filter(n => n != null);

  let firstOpen = null;
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    const ok = allowedDows.includes(d.getDay());
    const btn = document.createElement('button');
    btn.className = 'day-btn' + (ok ? '' : ' full');
    btn.disabled = !ok;
    btn.innerHTML = `<div class="dow">${dowFR[d.getDay()]}</div><div class="dn">${d.getDate()}</div><div class="month">${monthFR[d.getMonth()]}</div><div class="av ${ok ? '' : 'full'}" aria-hidden="true"></div>`;
    if (ok) {
      if (!firstOpen) firstOpen = { btn, d };
      btn.addEventListener('click', () => {
        document.querySelectorAll('.day-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        bookState.day = d;
        bookState.slot = null;
        renderSlotsFromPlanning(group, d);
        updateBookSummary();
      });
    }
    picker.appendChild(btn);
  }

  if (firstOpen) {
    firstOpen.btn.classList.add('active');
    bookState.day = firstOpen.d;
    renderSlotsFromPlanning(group, firstOpen.d);
  } else {
    bookState.day = null;
    document.getElementById('slotsAm').innerHTML = '';
    document.getElementById('slotsPm').innerHTML = '';
  }
}

function renderSlotsFromPlanning(group, d) {
  const am = document.getElementById('slotsAm');
  const pm = document.getElementById('slotsPm');
  const amSec = document.getElementById('amSection');
  const pmSec = document.getElementById('pmSection');
  am.innerHTML = ''; pm.innerHTML = '';
  const dow = d.getDay();
  const jourName = Object.keys(JOUR_TO_NUM).find(k => JOUR_TO_NUM[k] === dow);
  const slots = (bookState.planningIndex && bookState.planningIndex[group] && bookState.planningIndex[group][jourName]) || [];
  slots.forEach(s => {
    const time = s.debut; if (!time) return;
    const hour = parseInt(time.split(':')[0], 10);
    const btn = document.createElement('button');
    btn.className = 'slot-btn';
    btn.textContent = time;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.slot-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      bookState.slot = time;
      updateBookSummary();
    });
    (hour < 12 ? am : pm).appendChild(btn);
  });
  amSec.style.display = am.children.length ? '' : 'none';
  pmSec.style.display = pm.children.length ? '' : 'none';
}

// ─── Booking mode "no data" : pas de planning ni de seances_essai ───
// On affiche un message simple qui invite à contacter le club directement.
function initBookingNoData(club) {
  bookState.mode = 'no-data';
  const picker = document.getElementById('discPicker');
  picker.innerHTML = '';
  document.getElementById('dayPicker').innerHTML = '';
  document.getElementById('slotsAm').innerHTML = '';
  document.getElementById('slotsPm').innerHTML = '';
  document.getElementById('amSection').style.display = 'none';
  document.getElementById('pmSection').style.display = 'none';

  // Message d'invite + désactive le CTA principal
  const msg = document.createElement('div');
  msg.style.cssText = 'padding:18px;background:var(--paper);border:1px dashed var(--border);border-radius:14px;text-align:center;font-size:13px;color:var(--ink-soft);line-height:1.5';
  msg.innerHTML = `<strong style="display:block;font-family:'Archivo Narrow',Impact,sans-serif;font-size:16px;color:var(--ink);margin-bottom:6px;text-transform:uppercase">Planning à venir</strong>Les horaires de ce club ne sont pas encore renseignés. Contacte-le directement pour ta séance d'essai.`;
  picker.parentNode.insertBefore(msg, picker);
  // Cache les 3 step-labels et tout le widget step-by-step
  document.querySelectorAll('.book-step-label').forEach(el => el.style.display = 'none');
  document.getElementById('bookCta').style.display = 'none';
  document.getElementById('bookSummary').style.display = 'none';
}

function initBookingGeneric(discs) {
  bookState.mode = 'generic';
  const picker = document.getElementById('discPicker');
  picker.innerHTML = '';
  const discList = (discs && discs.length) ? discs.slice(0, 6) : ['Sport'];
  discList.forEach((d, i) => {
    const btn = document.createElement('button');
    btn.className = 'disc-pick-btn' + (i === 0 ? ' active' : '');
    btn.dataset.disc = d;
    btn.dataset.idx = String(i);
    btn.textContent = `${emojiForDisc(d)} ${d}`;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.disc-pick-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      bookState.discipline = d;
      bookState.slot = null;
      renderDayPickerGeneric(parseInt(btn.dataset.idx));
      updateBookSummary();
    });
    picker.appendChild(btn);
  });
  bookState.discipline = discList[0];
  renderDayPickerGeneric(0);
  updateBookSummary();
}

function avForDay(d, discIndex) {
  const dow = d.getDay();
  const trialDay = ((discIndex + 1) % 7); // 1 jour/disc/semaine
  if (dow !== trialDay) return 'closed';
  const seed = (d.getDate() * 7 + dow) % 10;
  if (seed < 3) return 'few';
  return 'open';
}

function renderDayPickerGeneric(discIndex) {
  const picker = document.getElementById('dayPicker');
  picker.innerHTML = '';
  let firstOpen = null;
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    const av = avForDay(d, discIndex);
    const btn = document.createElement('button');
    btn.className = 'day-btn' + (av === 'closed' ? ' full' : '');
    btn.disabled = av === 'closed';
    btn.dataset.iso = d.toISOString().split('T')[0];
    btn.innerHTML = `<div class="dow">${dowFR[d.getDay()]}</div><div class="dn">${d.getDate()}</div><div class="month">${monthFR[d.getMonth()]}</div><div class="av ${av === 'closed' ? 'full' : av === 'few' ? 'few' : ''}" aria-hidden="true"></div>`;
    if (av !== 'closed') {
      if (!firstOpen) firstOpen = { btn, d };
      btn.addEventListener('click', () => {
        document.querySelectorAll('.day-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        bookState.day = d;
        bookState.slot = null;
        renderSlotsGeneric(d, discIndex);
        updateBookSummary();
      });
    }
    picker.appendChild(btn);
  }
  if (firstOpen) {
    firstOpen.btn.classList.add('active');
    bookState.day = firstOpen.d;
    renderSlotsGeneric(firstOpen.d, discIndex);
  } else {
    bookState.day = null;
    document.getElementById('slotsAm').innerHTML = '';
    document.getElementById('slotsPm').innerHTML = '';
  }
}

function isSlotFullGeneric(d, slot, discIndex) {
  const h = parseInt(slot.split(':')[0]);
  const seed = (d.getDate() + h * 3 + discIndex * 5) % 10;
  return seed < 2;
}

function buildSlotBtn(time, d, discIndex) {
  const btn = document.createElement('button');
  const full = (bookState.mode === 'generic') ? isSlotFullGeneric(d, time, discIndex) : false;
  btn.className = 'slot-btn' + (full ? ' full' : '');
  btn.disabled = full;
  btn.textContent = time;
  if (!full) {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.slot-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      bookState.slot = time;
      updateBookSummary();
    });
  }
  return btn;
}

function renderSlotsGeneric(d, discIndex) {
  const am = document.getElementById('slotsAm');
  const pm = document.getElementById('slotsPm');
  const amSec = document.getElementById('amSection');
  const pmSec = document.getElementById('pmSection');
  am.innerHTML = ''; pm.innerHTML = '';
  const baseHour = 18 + (discIndex % 2);
  const pmSlots = [`${baseHour}:00`, `${baseHour}:30`, `${baseHour + 1}:00`];
  pmSlots.forEach(s => pm.appendChild(buildSlotBtn(s, d, discIndex)));
  amSec.style.display = 'none';
  pmSec.style.display = '';
}

// ─── Booking mode "seances_essai" (data réelle) ───
function initBookingFromEssai(essai) {
  bookState.mode = 'seances_essai';
  bookState.essaiData = essai;
  bookState.selectedSection = essai.sections[0];
  bookState.discipline = essai.sections[0].label;
  const picker = document.getElementById('discPicker');
  picker.innerHTML = '';
  essai.sections.forEach((section, i) => {
    const btn = document.createElement('button');
    btn.className = 'disc-pick-btn' + (i === 0 ? ' active' : '');
    btn.textContent = `${section.emoji || emojiForDisc(section.label)} ${section.label}`;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.disc-pick-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      bookState.selectedSection = section;
      bookState.discipline = section.label;
      bookState.slot = null;
      renderDayPickerEssai();
      updateBookSummary();
    });
    picker.appendChild(btn);
  });
  renderDayPickerEssai();
  updateBookSummary();
}

function renderDayPickerEssai() {
  const picker = document.getElementById('dayPicker');
  picker.innerHTML = '';
  const allowedDays = (bookState.essaiData.jours || []).map(j => JOUR_TO_NUM[String(j).toLowerCase()]).filter(n => n != null);
  let firstOpen = null;
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    const ok = allowedDays.includes(d.getDay());
    const btn = document.createElement('button');
    btn.className = 'day-btn' + (ok ? '' : ' full');
    btn.disabled = !ok;
    btn.innerHTML = `<div class="dow">${dowFR[d.getDay()]}</div><div class="dn">${d.getDate()}</div><div class="month">${monthFR[d.getMonth()]}</div><div class="av ${ok ? '' : 'full'}" aria-hidden="true"></div>`;
    if (ok) {
      if (!firstOpen) firstOpen = { btn, d };
      btn.addEventListener('click', () => {
        document.querySelectorAll('.day-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        bookState.day = d;
        bookState.slot = null;
        renderSlotsEssai();
        updateBookSummary();
      });
    }
    picker.appendChild(btn);
  }
  if (firstOpen) {
    firstOpen.btn.classList.add('active');
    bookState.day = firstOpen.d;
    renderSlotsEssai();
  }
}

function renderSlotsEssai() {
  const am = document.getElementById('slotsAm');
  const pm = document.getElementById('slotsPm');
  const amSec = document.getElementById('amSection');
  const pmSec = document.getElementById('pmSection');
  am.innerHTML = ''; pm.innerHTML = '';
  const sec = bookState.selectedSection;
  if (!sec || !Array.isArray(sec.horaires)) { amSec.style.display = 'none'; pmSec.style.display = 'none'; return; }
  const amSlots = [], pmSlots = [];
  sec.horaires.forEach(h => {
    const time = h.debut; if (!time) return;
    const hour = parseInt(time.split(':')[0], 10);
    if (hour < 12) amSlots.push(time); else pmSlots.push(time);
  });
  amSlots.forEach(s => am.appendChild(buildSlotBtn(s, bookState.day, 0)));
  pmSlots.forEach(s => pm.appendChild(buildSlotBtn(s, bookState.day, 0)));
  amSec.style.display = amSlots.length ? '' : 'none';
  pmSec.style.display = pmSlots.length ? '' : 'none';
}

function updateBookSummary() {
  const summary = document.getElementById('bookSummary');
  const summaryText = document.getElementById('summaryText');
  const cta = document.getElementById('bookCta');
  if (bookState.day && bookState.slot) {
    const d = bookState.day;
    summary.style.display = 'flex';
    summaryText.textContent = `${bookState.discipline} · ${dowFR[d.getDay()]} ${d.getDate()} ${monthFR[d.getMonth()]} · ${bookState.slot}`;
    cta.disabled = false;
    cta.innerHTML = `Réserver maintenant <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;
  } else {
    summary.style.display = 'none';
    cta.disabled = true;
    cta.innerHTML = bookState.day ? 'Choisis un horaire' : 'Choisis un créneau';
  }
}

// ═══════════════════════════════════════════════════════════════════
// PLANNING SEMAINE
// ═══════════════════════════════════════════════════════════════════
function renderPlanning(planning, primaryDisc) {
  const weekEl = document.getElementById('weekGrid');
  const overlay = document.getElementById('planning-empty-overlay');
  const subEl = document.getElementById('sched-sub');
  const todayDow = new Date().getDay();

  // Couleurs cycliques par discipline
  const COLORS = ['violet','orange','lime','dark','',''];
  const discColor = {};
  let colorIdx = 0;
  function colorFor(disc) {
    if (!discColor[disc]) discColor[disc] = COLORS[colorIdx++ % COLORS.length];
    return discColor[disc];
  }

  // Si pas de planning → grille fantôme + overlay
  if (!Array.isArray(planning) || planning.length === 0) {
    const phantom = [
      [{ disc: 'Séance', time: '18h00·19h30', color: 'violet' }],
      [{ disc: 'Séance', time: '18h00·19h30', color: 'orange' }, { disc: 'Séance', time: '19h00·20h30', color: '' }],
      [{ disc: 'Séance', time: '18h30·20h00', color: 'lime' }],
      [{ disc: 'Séance', time: '18h00·19h30', color: '' }, { disc: 'Séance', time: '19h30·21h00', color: 'orange' }],
      [{ disc: 'Séance', time: '18h00·19h30', color: 'violet' }],
      [{ disc: 'Séance', time: '10h00·11h30', color: 'dark' }],
      []
    ];
    weekEl.innerHTML = ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'].map((lbl, i) => {
      const slots = phantom[i];
      return `<div class="week-day${i >= 5 ? ' weekend' : ''}" data-day="${i === 6 ? 0 : i + 1}">
        <div class="wd-name">${lbl}</div>
        ${slots.map(s => `<div class="wd-slot ${s.color}"><b>${s.disc}</b><span>${s.time}</span></div>`).join('')}
      </div>`;
    }).join('');
    overlay.style.display = 'flex';
    if (subEl) subEl.textContent = 'Planning à compléter par le club.';
    return;
  }

  // Grouper par jour
  const JOURS_KEYS = ['lundi','mardi','mercredi','jeudi','vendredi','samedi','dimanche'];
  const JOURS_LBL  = ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'];
  const JOURS_DOW  = [1,2,3,4,5,6,0];
  const byJour = {};
  JOURS_KEYS.forEach(j => byJour[j] = []);
  planning.forEach(p => {
    const j = String(p.jour || '').toLowerCase();
    if (byJour[j]) byJour[j].push(p);
  });

  weekEl.innerHTML = JOURS_LBL.map((lbl, i) => {
    const key = JOURS_KEYS[i];
    const dow = JOURS_DOW[i];
    const items = byJour[key] || [];
    const slotsHtml = items.map(p => {
      const disc = p.discipline || p.equipe || 'Séance';
      const time = (p.debut && p.fin) ? `${p.debut}·${p.fin}` : (p.debut || '');
      const color = colorFor(disc);
      return `<div class="wd-slot ${color}"><b>${escapeHtml(disc)}</b><span>${escapeHtml(time)}</span></div>`;
    }).join('');
    return `<div class="week-day${i >= 5 ? ' weekend' : ''}${dow === todayDow ? ' today' : ''}" data-day="${dow}">
      <div class="wd-name">${lbl}${dow === todayDow ? ' <span class="today-dot" aria-hidden="true"></span>' : ''}</div>
      ${slotsHtml || ''}
    </div>`;
  }).join('');
  overlay.style.display = 'none';

  const nbSlots = planning.length;
  const groups = [...new Set(planning.map(p => p.discipline || p.equipe).filter(Boolean))];
  if (subEl) subEl.textContent = `${nbSlots} créneau${nbSlots > 1 ? 'x' : ''} par semaine${groups.length > 1 ? ` · ${groups.length} groupes` : ''}. Encadré par un coach diplômé.`;
}

// ═══════════════════════════════════════════════════════════════════
// MODAL & boutons
// ═══════════════════════════════════════════════════════════════════
document.getElementById('bookCta').addEventListener('click', () => {
  if (!bookState.day || !bookState.slot) return;
  const d = bookState.day;
  document.getElementById('mClub').textContent = bookState.clubName;
  document.getElementById('mDisc').textContent = bookState.discipline;
  document.getElementById('mDate').textContent = `${dowFR[d.getDay()]} ${d.getDate()} ${monthFR[d.getMonth()]} ${d.getFullYear()}`;
  document.getElementById('mTime').textContent = bookState.slot;
  document.getElementById('modal').classList.add('show');
});

function closeModal() { document.getElementById('modal').classList.remove('show'); }
window.closeModal = closeModal;
document.getElementById('modal').addEventListener('click', e => {
  if (e.target.id === 'modal') closeModal();
});

// ─── Bouton "Contacter le club directement" ───
document.getElementById('contactClubBtn').addEventListener('click', () => {
  const club = window.__currentClub;
  const tel = club && club.tel;
  const email = club && club.email;
  const html = `
    <div style="background:white;border-radius:24px;padding:32px;max-width:420px;width:100%;text-align:center">
      <h3 style="font-family:'Archivo Narrow',Impact,sans-serif;font-size:24px;text-transform:uppercase;margin-bottom:8px">Contacter le club</h3>
      <p style="color:var(--ink-soft);font-size:14px;line-height:1.5;margin-bottom:12px">Coordonnées disponibles pour ce club :</p>
      ${tel ? `<a href="tel:${escapeHtml(tel)}" style="display:block;margin:8px 0;padding:12px 16px;background:var(--paper);border-radius:14px;color:var(--ink);text-decoration:none;font-weight:600">📞 ${escapeHtml(tel)}</a>` : ''}
      ${email ? `<a href="mailto:${escapeHtml(email)}?subject=Demande d'infos via Kinetic" style="display:block;margin:8px 0;padding:12px 16px;background:var(--paper);border-radius:14px;color:var(--ink);text-decoration:none;font-weight:600">📧 ${escapeHtml(email)}</a>` : ''}
      ${(!tel && !email) ? `<p style="color:var(--gray);font-style:italic">Aucun contact direct connu pour ce club.</p>` : ''}
      <button type="button" style="margin-top:18px;padding:12px 22px;background:var(--ink);color:white;border:none;border-radius:100px;font-family:inherit;font-weight:700;cursor:pointer" onclick="document.getElementById('contact-modal-overlay').remove()">Fermer</button>
    </div>`;
  const overlay = document.createElement('div');
  overlay.id = 'contact-modal-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(14,11,31,.7);backdrop-filter:blur(16px);z-index:998;display:flex;align-items:center;justify-content:center;padding:20px';
  overlay.innerHTML = html;
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
});

// ─── GO ───
loadClub();

// Spin keyframes (loading spinner)
const styleSpin = document.createElement('style');
styleSpin.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
document.head.appendChild(styleSpin);