/**
 * trouver-club-app.js — Logique de trouver-club.html (V2 — 28 mai 2026)
 *
 * Flow :
 *   STEP 1 : quiz embedded (q2-wrap) — 7 questions, Q1 = localisation
 *   STEP 2 : résultats SPORTS (r2-intro + smart-search + filter panel à gauche + r2-stack à droite)
 *
 * Affiche des SPORTS scorés (Randonnée, Trail running, etc.) avec :
 *   - logo coloré par catégorie + emoji
 *   - tagline (description du sport)
 *   - match score % (basé sur scoresV2 + answers du quiz)
 *   - tags : intensité, indoor/outdoor, budget, niveau, nb clubs
 *   - actions : ♥ Enregistrer · ✕ Pas pour moi · 📍 Voir les clubs (→ sport.html?s=slug)
 *
 * Dépendances chargées AVANT ce fichier :
 *   - data.js   -> SPORTS, CAT_EMOJI
 */
(function() {
  'use strict';

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));

  // ──────────────────────────────────────────────────────────────
  // UTILS
  // ──────────────────────────────────────────────────────────────
  function escHtml(s) {
    if (s == null) return '';
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function norm(s) {
    return (s || '').toString().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }
  function slugify(s) {
    return norm(s).replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }
  function getGeoErrorInfo(err) {
    const code = err && typeof err.code === 'number' ? err.code : null;
    if (code === 1) return { short: 'Géoloc refusée. Saisis un CP ou une ville.' };
    if (code === 3) return { short: 'GPS trop lent. Saisis un CP ou une ville.' };
    return { short: 'Géoloc indisponible. Saisis un CP ou une ville.' };
  }

  // ──────────────────────────────────────────────────────────────
  // CAT COLORS — gradient par catégorie
  // ──────────────────────────────────────────────────────────────
  const CAT_COLORS = {
    'Collectif':           { color: '#6C47FF', soft: 'rgba(108,71,255,.12)' },
    'Individuel':          { color: '#FF5A1F', soft: 'rgba(255,90,31,.12)' },
    'Combat':              { color: '#E11D48', soft: 'rgba(225,29,72,.10)' },
    'Aquatique':           { color: '#0EA5E9', soft: 'rgba(14,165,233,.12)' },
    'Glisse':              { color: '#06B6D4', soft: 'rgba(6,182,212,.12)' },
    'Montagne & Nature':   { color: '#10B981', soft: 'rgba(16,185,129,.12)' },
    'Aérien':              { color: '#8B5CF6', soft: 'rgba(139,92,246,.12)' },
    'Équestre':            { color: '#A16207', soft: 'rgba(161,98,7,.10)' },
    'Moteur':              { color: '#DC2626', soft: 'rgba(220,38,38,.10)' },
    'Danse & Arts':        { color: '#EC4899', soft: 'rgba(236,72,153,.12)' },
    'Mental':              { color: '#7C3AED', soft: 'rgba(124,58,237,.12)' },
  };
  function catColors(cat) { return CAT_COLORS[cat] || { color: '#6C47FF', soft: 'rgba(108,71,255,.10)' }; }

  // Glyphes pour sports populaires (fallback sur CAT_EMOJI)
  const SPORT_GLYPHS = {
    'Football':'⚽','Rugby à XV':'🏉','Basketball':'🏀','Handball':'🤾','Volleyball':'🏐',
    'Tennis':'🎾','Badminton':'🏸','Tennis de table':'🏓','Natation':'🏊','Athlétisme':'🏃',
    'Cyclisme route':'🚴','Cyclisme':'🚴','Judo':'🥋','Karaté':'🥋','Boxe anglaise':'🥊','Escrime':'🤺',
    'Golf':'⛳','Ski alpin':'⛷️','Snowboard':'🏂','Équitation':'🐎','Voile':'⛵','Aviron':'🚣',
    'Randonnée / Alpinisme':'🥾','Trail':'🏃','Trail running':'🏃','Course à pied':'🏃',
    'Yoga':'🧘','Pilates':'🧘','Taï-chi-chuan':'☯️','Tai-chi-chuan':'☯️','Méditation':'🧠',
    'Surf':'🏄','Stand up paddle':'🏄','Plongée':'🤿','Escalade':'🧗','Alpinisme':'🏔️',
  };
  function sportGlyph(sport) {
    // 1) emoji "officiel" injecté dans data.js (couvre les 290 sports)
    if (sport.emoji) return sport.emoji;
    // 2) override hardcodé pour quelques sports populaires
    if (SPORT_GLYPHS[sport.nom]) return SPORT_GLYPHS[sport.nom];
    // 3) fallback par catégorie
    if (typeof CAT_EMOJI !== 'undefined' && CAT_EMOJI[sport.cat]) return CAT_EMOJI[sport.cat];
    return '🎽';
  }

  // Retourne le slug discipline (utilisé dans clubs/*.json comme c.disc)
  // pour un sport donné, en s'appuyant sur disciplines.js → sport_ids.
  // Mémoïsé au premier appel.
  let _spToDisc = null;
  function discSlugForSport(sport) {
    if (typeof DISCIPLINES === 'undefined') return null;
    if (!_spToDisc) {
      _spToDisc = {};
      Object.entries(DISCIPLINES).forEach(([slug, info]) => {
        (info.sport_ids || []).forEach(id => {
          if (!_spToDisc[id]) _spToDisc[id] = slug;
        });
      });
    }
    return _spToDisc[sport.id] || null;
  }

  // Departements populaires pour les chips du quiz Q1
  const POPULAR_DEPTS = [
    { code: '73', name: 'Savoie' },
    { code: '74', name: 'Haute-Savoie' },
    { code: '75', name: 'Paris' },
    { code: '69', name: 'Rhône' },
    { code: '38', name: 'Isère' },
    { code: '13', name: 'Bouches-du-Rhône' },
  ];

  // ──────────────────────────────────────────────────────────────
  // ÉTAT GLOBAL
  // ──────────────────────────────────────────────────────────────
  const state = {
    step: 'quiz',
    answers: {},
    location: null,
    searchQuery: '',
    filters: { pratique: null, format: null, intensity: null, season: null },
    activeCats: new Set(),
    sort: 'match',
    tab: 'new',                  // 'new' | 'saved' | 'dismissed'
    saved: new Set(),
    dismissed: new Set(),
    scoredSports: [],
  };

  try {
    const s = localStorage.getItem('kinetic_v2_saved');
    if (s) JSON.parse(s).forEach(id => state.saved.add(id));
    const d = localStorage.getItem('kinetic_v2_dismissed');
    if (d) JSON.parse(d).forEach(id => state.dismissed.add(id));
  } catch (_) {}
  function persistSaved() { try { localStorage.setItem('kinetic_v2_saved', JSON.stringify([...state.saved])); } catch (_) {} }
  function persistDismissed() { try { localStorage.setItem('kinetic_v2_dismissed', JSON.stringify([...state.dismissed])); } catch (_) {} }

  // Quiz state local
  const quizState = { i: 0, answers: {}, location: null };

  // Restore si déjà fait
  try {
    const done = sessionStorage.getItem('kinetic_v2_quiz_done');
    if (done) {
      const data = JSON.parse(done);
      if (data && data.answers) {
        state.answers = data.answers;
        state.location = data.location || null;
        applyQuizAnswersToFilters(data.answers);
        state.step = 'results';
      }
    }
  } catch (_) {}

  // ──────────────────────────────────────────────────────────────
  // QUIZ (7 questions)
  // ──────────────────────────────────────────────────────────────
  const QUIZ = [
    { q: 'D\'abord, c\'est <em>où</em> ?', field: 'location', type: 'location',
      hint: 'Ville, code postal ou département — on cherchera les clubs autour de toi.' },
    { q: 'Tu préfères bouger… <em>seul·e</em> ou <em>en équipe</em> ?', field: 'format', cols: 2, opts: [
      { v:'solo',  ic:'🏃', t:'Plutôt seul·e',  s:'Mon rythme, ma musique' },
      { v:'team',  ic:'👥', t:'En équipe',      s:'Ambiance partagée' },
      { v:'mixed', ic:'🤝', t:'Les deux',       s:'J\'alterne' },
      { v:'any',   ic:'🤷', t:'Peu importe',    s:'Surprends-moi' }, ] },
    { q: 'Tu te vois <em>dehors</em>, ou plutôt en <em>salle</em> ?', field: 'pratique', cols: 2, opts: [
      { v:'outdoor', ic:'🌳', t:'Dehors',       s:'Vent, météo, vraie nature' },
      { v:'indoor',  ic:'🏟', t:'En salle',     s:'Au chaud, planifié' },
      { v:'water',   ic:'🌊', t:'Dans l\'eau',  s:'Lac, mer, piscine' },
      { v:'any',     ic:'✨', t:'Peu importe',  s:'Je suis flexible' }, ] },
    { q: 'À quel <em>rythme</em> tu veux suer ?', field: 'intensity', cols: 2, opts: [
      { v:'2', ic:'🧘', t:'Très doux',  s:'Souffle & posture' },
      { v:'3', ic:'🏃', t:'Modéré',     s:'Bien transpirer' },
      { v:'4', ic:'🔥', t:'Intense',    s:'À fond, vraiment' },
      { v:'5', ic:'🥵', t:'Extrême',    s:'Sensations max' }, ] },
    { q: 'Quel <em>budget</em> par an, à peu près ?', field: 'budget', cols: 1, opts: [
      { v:'150',  ic:'💰', t:'≤ 150€',     s:'Petit budget' },
      { v:'300',  ic:'💸', t:'150 – 300€',  s:'Standard club asso' },
      { v:'500',  ic:'💎', t:'300 – 500€',  s:'Club premium / matériel' },
      { v:'1200', ic:'🏆', t:'500€+',       s:'Pas de limite' }, ] },
    { q: 'Tu cherches pour <em>qui</em> ?', field: 'who', cols: 2, opts: [
      { v:'adult', ic:'🙋', t:'Pour moi',           s:'Adulte' },
      { v:'kid',   ic:'🧒', t:'Un·e enfant',        s:'< 12 ans' },
      { v:'teen',  ic:'🎒', t:'Un·e ado',           s:'12 – 18 ans' },
      { v:'famil', ic:'👨‍👩‍👧', t:'Toute la famille', s:'Activité commune' }, ] },
    { q: 'Et surtout, c\'est <em>pour quoi</em> ?', field: 'why', cols: 2, opts: [
      { v:'health', ic:'❤️', t:'Santé',       s:'Bouger pour me sentir mieux' },
      { v:'fun',    ic:'🎉', t:'Amusement',   s:'Kiffer, rigoler' },
      { v:'social', ic:'🤝', t:'Rencontrer',  s:'Du monde, des potes' },
      { v:'perf',   ic:'🏆', t:'Performance', s:'Progresser, viser haut' }, ] },
  ];

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('cat')) state.activeCats.add(urlParams.get('cat'));

  // ──────────────────────────────────────────────────────────────
  // QUIZ RENDER
  // ──────────────────────────────────────────────────────────────
  function renderQuiz() {
    const total = QUIZ.length;
    const Q = QUIZ[quizState.i];
    const answered = quizState.answers[Q.field] != null || (Q.type === 'location' && quizState.location);
    const pct = ((quizState.i + (answered ? 1 : 0)) / total) * 100;

    $('#q2-progress-bar').style.width = pct + '%';
    $('#q2-step-now').textContent = `Question ${quizState.i + 1}`;
    $('#q2-step-total').textContent = total;
    $('#q2-step-pct').textContent = `${Math.round(pct)}% complété`;
    $('#q2-q-text').innerHTML = Q.q;
    $('#q2-back').disabled = quizState.i === 0;

    const continueBtn = $('#q2-continue');
    if (Q.type === 'location') {
      continueBtn.classList.remove('t2-hidden');
      continueBtn.disabled = !quizState.location;
    } else {
      continueBtn.classList.add('t2-hidden');
    }

    if (Q.type === 'location') renderQuizLocation(Q);
    else renderQuizOptions(Q);
  }

  function renderQuizLocation(Q) {
    const currentLabel = quizState.location?.label || '';
    const popHTML = POPULAR_DEPTS.map(d => {
      const isOn = quizState.location && quizState.location.depCode === d.code;
      return `<button type="button" class="q2-loc-chip ${isOn ? 'on' : ''}" data-dept="${d.code}" data-name="${escHtml(d.name)}">${escHtml(d.name)}</button>`;
    }).join('');

    $('#q2-q-body').innerHTML = `
      <div class="q2-loc">
        <label class="q2-loc-field">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          <input type="text" id="q2-loc-input" placeholder="Tape ta ville ou ton code postal…" value="${escHtml(currentLabel)}" aria-label="Localisation" />
          <button type="button" class="geo" id="q2-loc-geo" aria-label="Utiliser ma position">📍</button>
        </label>
        <div class="q2-loc-status" id="q2-loc-status"></div>
        <p class="q2-loc-help">${Q.hint}</p>
        <div class="q2-loc-pop">
          <span class="lbl">Populaires :</span>
          ${popHTML}
        </div>
      </div>`;

    const input = $('#q2-loc-input');
    const status = $('#q2-loc-status');
    setTimeout(() => input && input.focus(), 50);

    let _deb;
    if (input) {
      input.addEventListener('input', () => {
        clearTimeout(_deb);
        const val = input.value.trim();
        if (!val) {
          quizState.location = null;
          $('#q2-continue').disabled = true;
          $$('.q2-loc-chip').forEach(c => c.classList.remove('on'));
          status.textContent = '';
          return;
        }
        status.textContent = '🔎 Recherche…';
        _deb = setTimeout(async () => {
          if (window.KineticClubs && window.KineticClubs.geocodeCP) {
            const geo = await window.KineticClubs.geocodeCP(val);
            if (geo) {
              quizState.location = { lat: geo.lat, lon: geo.lon, depCode: geo.depCode, label: geo.label || val };
              quizState.answers[Q.field] = geo.label || val;
              status.textContent = `✓ ${geo.label || val}${geo.depCode ? ' (' + geo.depCode + ')' : ''}`;
              $('#q2-continue').disabled = false;
              $$('.q2-loc-chip').forEach(c => c.classList.toggle('on', c.dataset.dept === geo.depCode));
            } else {
              status.textContent = 'Lieu non reconnu. Essaie un code postal.';
              $('#q2-continue').disabled = true;
            }
          } else {
            // Fallback : on accepte juste le texte
            quizState.location = { label: val };
            quizState.answers[Q.field] = val;
            status.textContent = `✓ ${val}`;
            $('#q2-continue').disabled = false;
          }
        }, 350);
      });
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') { e.preventDefault(); if (!$('#q2-continue').disabled) advance(); }
      });
    }

    $('#q2-loc-geo').addEventListener('click', async () => {
      const btn = $('#q2-loc-geo');
      const orig = btn.innerHTML;
      btn.innerHTML = '⏳'; btn.disabled = true;
      status.textContent = '📍 Localisation en cours…';
      try {
        const pos = await window.KineticClubs.geolocate();
        quizState.location = { lat: pos.lat, lon: pos.lon, label: 'Ma position (GPS)' };
        quizState.answers[Q.field] = '(géolocalisation)';
        if (input) input.value = 'Ma position (GPS)';
        status.textContent = '✓ Position détectée.';
        $('#q2-continue').disabled = false;
      } catch (e) {
        status.textContent = getGeoErrorInfo(e).short;
      } finally {
        btn.innerHTML = orig; btn.disabled = false;
      }
    });

    $$('.q2-loc-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const code = chip.dataset.dept;
        const name = chip.dataset.name;
        const center = (typeof DEPT_CENTERS !== 'undefined') ? DEPT_CENTERS[code] : null;
        quizState.location = center
          ? { lat: center.lat, lon: center.lon, depCode: code, label: name }
          : { depCode: code, label: name };
        quizState.answers[Q.field] = name;
        if (input) input.value = name;
        $$('.q2-loc-chip').forEach(c => c.classList.toggle('on', c === chip));
        $('#q2-continue').disabled = false;
        status.textContent = `✓ ${name} (${code})`;
      });
    });
  }

  function renderQuizOptions(Q) {
    const cols = Q.cols || 2;
    const colClass = cols === 1 ? 'col-1' : cols === 3 ? 'col-3' : '';
    const optsHTML = Q.opts.map(o => `
      <button type="button" class="q2-opt ${quizState.answers[Q.field] === o.v ? 'on' : ''}" data-val="${escHtml(o.v)}">
        <div class="o-ic">${o.ic}</div>
        <div class="o-txt">
          <div class="o-t">${escHtml(o.t)}</div>
          <div class="o-s">${escHtml(o.s)}</div>
        </div>
      </button>`).join('');

    $('#q2-q-body').innerHTML = `<div class="q2-opts ${colClass}">${optsHTML}</div>`;

    $$('.q2-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.q2-opt').forEach(b => b.classList.remove('on'));
        btn.classList.add('on');
        quizState.answers[Q.field] = btn.dataset.val;
        setTimeout(advance, 220);
      });
    });
  }

  function advance() {
    if (quizState.i + 1 < QUIZ.length) { quizState.i++; renderQuiz(); }
    else finishQuiz();
  }
  function back() {
    if (quizState.i > 0) { quizState.i--; renderQuiz(); }
  }

  function finishQuiz() {
    state.answers = { ...quizState.answers };
    state.location = quizState.location || null;
    applyQuizAnswersToFilters(state.answers);
    try { sessionStorage.setItem('kinetic_v2_quiz_done', JSON.stringify({ answers: state.answers, location: state.location, ts: Date.now() })); } catch (_) {}
    if (state.location && state.location.label && $('#filter-loc')) $('#filter-loc').value = state.location.label;
    transitionToResults();
  }

  function skipQuiz() {
    state.answers = {};
    state.location = null;
    try { sessionStorage.setItem('kinetic_v2_quiz_done', JSON.stringify({ answers:{}, location:null, ts: Date.now() })); } catch (_) {}
    transitionToResults();
  }

  function applyQuizAnswersToFilters(answers) {
    if (answers.pratique && answers.pratique !== 'any') state.filters.pratique = answers.pratique;
    if (answers.format && answers.format !== 'any' && answers.format !== 'mixed') state.filters.format = answers.format;
    if (answers.intensity) state.filters.intensity = answers.intensity;
    if (answers.season && answers.season !== 'any') state.filters.season = answers.season;
  }

  function transitionToResults() {
    state.step = 'results';
    $('#quiz-step').classList.add('t2-hidden');
    $('#results-intro').classList.remove('t2-hidden');
    $('#results-view').classList.remove('t2-hidden');
    const introLoc = $('#intro-loc');
    if (introLoc && state.location && state.location.label) introLoc.textContent = ' · ' + state.location.label;
    else if (introLoc) introLoc.textContent = '';
    scoreAndRender();
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
  }

  function retakeQuiz() {
    try { sessionStorage.removeItem('kinetic_v2_quiz_done'); } catch (_) {}
    quizState.i = 0; quizState.answers = {}; quizState.location = null;
    state.step = 'quiz';
    $('#quiz-step').classList.remove('t2-hidden');
    $('#results-intro').classList.add('t2-hidden');
    $('#results-view').classList.add('t2-hidden');
    renderQuiz();
    setTimeout(() => $('#quiz-step').scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
  }

  // ──────────────────────────────────────────────────────────────
  // SCORE SPORT — basé sur scoresV2 + answers du quiz
  // ──────────────────────────────────────────────────────────────
  function scoreSport(sport, ans) {
    if (!ans || Object.keys(ans).length === 0) return 50;
    const sv2 = sport.scoresV2 || {};
    const meta = sport.meta || {};
    let s = 50;

    // Format (solo/team/mixed)
    if (ans.format === 'team') {
      s += (sv2.collectif || 0) * 5 + (sv2.sociabilite || 0) * 2;
      if (['Collectif','Combat'].includes(sport.cat)) s += 6;
    } else if (ans.format === 'solo') {
      s += (5 - (sv2.collectif || 0)) * 5;
    } else if (ans.format === 'mixed') {
      s += 3;
    }

    // Pratique (indoor/outdoor/water)
    if (ans.pratique === 'outdoor') {
      s += (sv2.outdoor || 0) * 5;
      if (sv2.outdoor >= 4) s += 6;
    } else if (ans.pratique === 'indoor') {
      s += (5 - (sv2.outdoor || 0)) * 4;
    } else if (ans.pratique === 'water') {
      s += (sv2.eau || 0) * 8;
      if (sport.cat === 'Aquatique') s += 20;
      else if (!sv2.eau) s -= 15;
    }

    // Intensity (1-5)
    if (ans.intensity != null) {
      const target = Number(ans.intensity);
      // Composite intensity = mix de cardio + adrenaline / 2
      const sportIntensity = Math.round(((sv2.cardio || 0) + (sv2.adrenaline || 0)) / 2);
      const diff = Math.abs(sportIntensity - target);
      s += [16, 10, 4, -4, -12][Math.min(diff, 4)];
    }

    // Budget annuel
    if (ans.budget != null) {
      const target = Number(ans.budget);
      const cost = meta.cost || 300;
      if (cost <= target) s += 10;
      else s -= Math.min(20, (cost - target) / 30);
    }

    // Who (adult/kid/teen/famil)
    const ageMin = meta.age_minimum || meta.ageMin || 0;
    if (ans.who === 'kid') {
      if (ageMin <= 8) s += 12;
      else if (ageMin >= 14) s -= 18;
      // Pas d'enfants sur sports intenses
      if ((sv2.cardio || 0) + (sv2.adrenaline || 0) >= 8) s -= 8;
    }
    if (ans.who === 'teen' && ageMin <= 12) s += 8;
    if (ans.who === 'famil') {
      if (ageMin <= 10) s += 10;
      if (['Collectif','Aquatique','Montagne & Nature'].includes(sport.cat)) s += 4;
    }

    // Why (health/fun/social/perf)
    if (ans.why === 'health') {
      s += (sv2.zen || 0) * 4;
      if (sport.cat === 'Mental') s += 14;
    }
    if (ans.why === 'fun') {
      s += (sv2.sociabilite || 0) * 2 + (sv2.adrenaline || 0) * 2;
    }
    if (ans.why === 'social') {
      s += (sv2.sociabilite || 0) * 4 + (sv2.collectif || 0) * 2;
    }
    if (ans.why === 'perf') {
      s += (sv2.competition || 0) * 4 + (sv2.cardio || 0) * 1.5;
    }

    return Math.max(20, Math.min(99, Math.round(s)));
  }

  // ──────────────────────────────────────────────────────────────
  // SPORT METADATA HELPERS
  // ──────────────────────────────────────────────────────────────
  function sportIntensity(sport) {
    const sv2 = sport.scoresV2 || {};
    return Math.max(1, Math.min(5, Math.round(((sv2.cardio || 0) + (sv2.adrenaline || 0)) / 2)));
  }
  function sportPlace(sport) {
    const sv2 = sport.scoresV2 || {};
    const out = (sv2.outdoor || 0);
    if (sport.cat === 'Aquatique') return 'Aquatique';
    if (out >= 4) return 'Outdoor';
    if (out <= 1) return 'Indoor';
    return 'Mixte';
  }
  function sportLevel(sport) {
    const sv2 = sport.scoresV2 || {};
    const tech = sv2.technique || 0;
    if (tech >= 4) return 'Confirmé';
    if (tech >= 3) return 'Intermédiaire';
    return 'Tout niveau';
  }
  function sportClubsFormat(n) {
    if (!n) return '—';
    if (n >= 1000) return (n/1000).toFixed(1).replace('.0','') + 'k';
    return n.toLocaleString('fr-FR');
  }
  function sportFed(sport) { return sport.meta?.acronyme || ''; }
  function sportTagline(sport) {
    // tagline = nouvelle phrase de définition concrète (mai 2026)
    // description = ancien libellé court conservé pour compat
    const t = sport.meta?.tagline || sport.meta?.description || '';
    return t || `Pratique ${sport.cat.toLowerCase()} référencée en France.`;
  }

  // ──────────────────────────────────────────────────────────────
  // SCORE + RENDER
  // ──────────────────────────────────────────────────────────────
  function scoreAndRender() {
    if (typeof SPORTS === 'undefined') return;
    state.scoredSports = SPORTS.map(sp => ({
      sport: sp,
      score: scoreSport(sp, state.answers),
    }));
    syncFiltersUI();
    renderResults();
  }

  function applyFiltersAndSort(list) {
    const q = norm(state.searchQuery.trim());
    let arr = list.filter(item => {
      const sp = item.sport;
      // Cat filter
      if (state.activeCats.size > 0 && !state.activeCats.has(sp.cat)) return false;
      // Pratique filter
      if (state.filters.pratique) {
        const place = sportPlace(sp);
        if (state.filters.pratique === 'indoor' && place !== 'Indoor' && place !== 'Mixte') return false;
        if (state.filters.pratique === 'outdoor' && place !== 'Outdoor' && place !== 'Mixte') return false;
        if (state.filters.pratique === 'water' && place !== 'Aquatique') return false;
      }
      // Intensity filter (single match)
      if (state.filters.intensity && sportIntensity(sp) !== Number(state.filters.intensity)) return false;
      // Season filter
      if (state.filters.season) {
        const sai = sp.meta?.saison || '';
        if (state.filters.season !== sai && !(state.filters.season === 'annee' && (sai === '' || sai === 'annee'))) return false;
      }
      // Search query
      if (q) {
        const hay = norm([sp.nom, sp.cat, sportFed(sp), sportTagline(sp)].join(' '));
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    // Sort
    switch (state.sort) {
      case 'match':  arr.sort((a,b) => b.score - a.score); break;
      case 'clubs':  arr.sort((a,b) => (b.sport.meta?.clubs || 0) - (a.sport.meta?.clubs || 0)); break;
      case 'budget': arr.sort((a,b) => (a.sport.meta?.cost || 9999) - (b.sport.meta?.cost || 9999)); break;
      case 'alpha':  arr.sort((a,b) => (a.sport.nom||'').localeCompare(b.sport.nom||'', 'fr')); break;
    }
    return arr;
  }

  function renderResults() {
    const all = applyFiltersAndSort(state.scoredSports);
    const newList = all.filter(it => !state.dismissed.has(it.sport.id));
    const savedList = all.filter(it => state.saved.has(it.sport.id));
    const dismissedList = all.filter(it => state.dismissed.has(it.sport.id));

    // Counts
    $('#count-new').textContent = newList.length.toLocaleString('fr');
    $('#count-saved').textContent = state.saved.size.toLocaleString('fr');
    $('#count-dismissed').textContent = state.dismissed.size.toLocaleString('fr');
    const introCount = $('#intro-count');
    if (introCount) introCount.textContent = newList.length.toLocaleString('fr');

    let list;
    if (state.tab === 'saved') list = savedList;
    else if (state.tab === 'dismissed') list = dismissedList;
    else list = newList;

    if (list.length === 0) {
      const empty = state.tab === 'saved'
        ? { h: 'Aucun favori encore.', p: 'Clique sur ♥ Enregistrer pour ajouter un sport ici.' }
        : state.tab === 'dismissed'
        ? { h: 'Aucun rejet pour le moment.', p: 'Tu rejettes un résultat → il atterrit ici.' }
        : { h: 'Aucun sport ne matche tes filtres.', p: 'Élargis tes critères ou efface un filtre.' };
      $('#results').innerHTML = `
        <div class="r2-empty">
          <h3>${empty.h}</h3>
          <p>${empty.p}</p>
          ${state.tab === 'new' ? '<button class="btn btn-ink btn-sm" onclick="window.kineticResetAll()">↺ Tout effacer</button>' : ''}
        </div>`;
      return;
    }

    $('#results').innerHTML = list.map((item, idx) => renderSportRow(item, idx)).join('');

    // Wire action buttons
    $$('#results .save-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault(); e.stopPropagation();
        const id = Number(btn.dataset.sportId);
        if (state.saved.has(id)) state.saved.delete(id);
        else { state.saved.add(id); state.dismissed.delete(id); }
        persistSaved(); persistDismissed();
        renderResults();
      });
    });
    $$('#results .dismiss-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault(); e.stopPropagation();
        const id = Number(btn.dataset.sportId);
        if (state.dismissed.has(id)) state.dismissed.delete(id);
        else { state.dismissed.add(id); state.saved.delete(id); }
        persistSaved(); persistDismissed();
        renderResults();
      });
    });
  }

  function renderSportRow(item, idx) {
    const sp = item.sport;
    const cat = sp.cat || '';
    const colors = catColors(cat);
    const fed = sportFed(sp);
    const isSaved = state.saved.has(sp.id);
    const isDismissed = state.dismissed.has(sp.id);
    const isFeatured = state.tab === 'new' && idx === 0 && item.score >= 60;
    const place = sportPlace(sp);
    const placeIcon = place === 'Outdoor' ? '🌳' : place === 'Indoor' ? '🏟' : place === 'Aquatique' ? '🌊' : '✨';
    const intens = sportIntensity(sp);
    const cost = sp.meta?.cost || null;
    const lvl = sportLevel(sp);
    const clubsN = sportClubsFormat(sp.meta?.clubs || sp.meta?.clubsCount);
    const slug = slugify(sp.nom);
    // CTA "Voir les clubs" → map filtrée par sport + rayon 50km autour de la loc du quiz
    // Préfère le slug discipline (ex: "ski" pour Ski alpin, "tennis-table" pour Tennis de table)
    // qui matche le champ c.disc des clubs. Sinon fallback sur slugify(nom).
    const discSlug = discSlugForSport(sp) || slug;
    const loc = state.location || {};
    const mapParams = new URLSearchParams();
    mapParams.set('sport', discSlug);
    if (loc.lat && loc.lon) {
      mapParams.set('lat', String(loc.lat));
      mapParams.set('lon', String(loc.lon));
      mapParams.set('radius', '50');
    } else if (loc.depCode) {
      mapParams.set('dept', loc.depCode);
    }
    if (loc.label) mapParams.set('locLabel', loc.label);
    const sportHref = `map.html?${mapParams.toString()}`;

    // Photos : p1 = sport spécifique, p2 = photo fédé OU fallback photo1 (jamais vide)
    const photoFn = typeof getSportPhoto === 'function' ? getSportPhoto : null;
    const fedFn = typeof getFedPhoto === 'function' ? getFedPhoto : null;
    const photo = photoFn ? photoFn(sp) : null;
    let photo2 = fedFn ? fedFn(sp) : null;
    // Fallback : si pas de photo fédé, on réutilise photo1 (mieux qu'un placeholder vide)
    if (!photo2 && photo) photo2 = photo;
    // Si les deux sont identiques, on varie le crop pour que les deux polaroids n'aient pas l'air d'un copier-coller
    if (photo2 && photo2 === photo) {
      const sep = photo2.includes('?') ? '&' : '?';
      photo2 = photo2 + sep + 'kpos=2';
    }
    const photoStyle = photo ? `background-image:url('${escHtml(photo)}');background-position:center 30%;` : '';
    const photo2Style = photo2 ? `background-image:url('${escHtml(photo2)}');background-position:center 70%;` : '';

    return `
      <article class="r2-row ${isFeatured ? 'featured' : ''}" style="--cat-color:${colors.color};--cat-soft:${colors.soft}" data-sport-id="${sp.id}">
        ${isFeatured ? '<div class="r2-ribbon">✦ Top match · IA</div>' : ''}
        <div class="main">
          <div class="r2-head">
            <div class="r2-logo" aria-hidden="true">${sportGlyph(sp)}</div>
            <div class="r2-titleblock">
              <h3>${escHtml(sp.nom)}</h3>
              <div class="meta">
                ${fed ? `<b>${escHtml(fed)}</b><span style="opacity:.4">·</span>` : ''}
                <span>${escHtml(cat)}</span>
                <span class="match-pill">★ Match ${item.score}%</span>
              </div>
            </div>
          </div>
          <p class="r2-tagline">${escHtml(sportTagline(sp))}</p>
          <div class="r2-tags">
            <span class="tag">🔥 Intensité ${intens}/5</span>
            <span class="tag">${placeIcon} ${escHtml(place)}</span>
            ${cost ? `<span class="tag">€ ${cost}€/an</span>` : ''}
            <span class="tag">★ ${escHtml(lvl)}</span>
            <span class="tag">▦ ${clubsN} clubs</span>
          </div>
          <div class="r2-actions">
            <button type="button" class="act save-btn ${isSaved ? 'saved' : ''}" data-sport-id="${sp.id}" aria-pressed="${isSaved ? 'true' : 'false'}">
              ${isSaved ? '✓ Enregistré' : '♡ Enregistrer'}
            </button>
            <button type="button" class="act dismiss-btn ${isDismissed ? 'dismissed' : ''}" data-sport-id="${sp.id}" aria-pressed="${isDismissed ? 'true' : 'false'}">
              ${isDismissed ? '✕ Rejeté' : '✕ Pas pour moi'}
            </button>
            <a class="act primary" href="${escHtml(sportHref)}">📍 Voir les clubs</a>
          </div>
        </div>
        <div class="r2-imgs" aria-hidden="true">
          <div class="ph p1 ${photo ? 'has-photo' : ''}" style="${photoStyle}">
            ${!photo ? `<span class="lbl">Photo<br>club</span>` : ''}
          </div>
          <div class="ph p2 ${photo2 ? 'has-photo' : ''}" style="${photo2Style}">
            ${!photo2 ? `<span class="lbl">Photo<br>pratique</span>` : ''}
          </div>
        </div>
      </article>`;
  }

  // ──────────────────────────────────────────────────────────────
  // FILTRES UI
  // ──────────────────────────────────────────────────────────────
  const FILTER_LABELS = {
    pratique: { default: 'Lieu', values: { indoor: '🏠 Indoor', outdoor: '🌳 Outdoor', water: '🌊 Aquatique' } },
    format:   { default: 'Pratique', values: { solo: '🏃 Seul·e', team: '👥 Collectif' } },
    intensity:{ default: 'Intensité', values: { '2': '🌿 Doux', '3': '⚖️ Modéré', '4': '🔥 Intense', '5': '💥 Extrême' } },
    season:   { default: 'Saison', values: { annee: '📅 Année', ete: '☀️ Été', hiver: '❄️ Hiver' } },
  };

  function syncFiltersUI() {
    $$('.f2-pill').forEach(btn => {
      const filter = btn.dataset.filter;
      const val = btn.dataset.val;
      let isOn = false;
      if (filter === 'cat') isOn = state.activeCats.has(val);
      else isOn = state.filters[filter] === val;
      btn.classList.toggle('on', isOn);
      btn.setAttribute('aria-pressed', isOn ? 'true' : 'false');
    });

    const distSection = $('#section-dist');
    if (distSection) distSection.style.display = state.location ? '' : 'none';

    const chips = [];
    if (state.location && state.location.label) chips.push({ k:'loc', label:`📍 ${state.location.label}`, val:null });
    Object.entries(state.filters).forEach(([k, v]) => {
      if (!v) return;
      const meta = FILTER_LABELS[k];
      if (meta && meta.values[v]) chips.push({ k, label: meta.values[v], val: v });
    });
    state.activeCats.forEach(c => chips.push({ k:'cat', label:`🏷 ${c}`, val:c }));

    const chipsEl = $('#active-chips');
    const emptyEl = $('#active-empty');
    const countEl = $('#active-count');
    if (countEl) countEl.textContent = chips.length;
    if (chips.length === 0) {
      chipsEl.innerHTML = '';
      if (emptyEl) emptyEl.style.display = '';
    } else {
      if (emptyEl) emptyEl.style.display = 'none';
      chipsEl.innerHTML = chips.map(c =>
        `<span class="chip" data-fk="${escHtml(c.k)}" data-fv="${escHtml(c.val || '')}">${escHtml(c.label)} <span class="x" role="button" aria-label="Retirer">✕</span></span>`
      ).join('');
      chipsEl.querySelectorAll('.chip .x').forEach(x => {
        x.addEventListener('click', (e) => {
          const chip = e.target.closest('.chip');
          removeFilter(chip.dataset.fk, chip.dataset.fv);
        });
      });
    }
  }

  function removeFilter(k, v) {
    if (k === 'loc') { state.location = null; if ($('#filter-loc')) $('#filter-loc').value = ''; }
    else if (k === 'cat') { state.activeCats.delete(v); }
    else if (FILTER_LABELS[k]) { state.filters[k] = null; }
    renderResults();
    syncFiltersUI();
  }

  // ──────────────────────────────────────────────────────────────
  // CATÉGORIES
  // ──────────────────────────────────────────────────────────────
  function buildCatList() {
    if (typeof SPORTS === 'undefined') return [];
    const counts = {};
    SPORTS.forEach(s => { counts[s.cat] = (counts[s.cat] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1])
      .map(([cat, n]) => ({ id: cat, name: cat, icon: (typeof CAT_EMOJI !== 'undefined' && CAT_EMOJI[cat]) || '🎽', count: n }));
  }
  let ALL_CATS = [];

  function renderCatStrip() {
    const strip = $('#cat-strip');
    if (!strip) return;
    strip.innerHTML = ALL_CATS.map(c =>
      `<button type="button" class="f2-pill ${state.activeCats.has(c.id) ? 'on' : ''}" data-filter="cat" data-val="${escHtml(c.id)}" aria-pressed="${state.activeCats.has(c.id) ? 'true' : 'false'}">${c.icon} ${escHtml(c.name)}</button>`
    ).join('');
    strip.querySelectorAll('.f2-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const cat = pill.dataset.val;
        if (state.activeCats.has(cat)) state.activeCats.delete(cat);
        else state.activeCats.add(cat);
        renderResults();
        syncFiltersUI();
      });
    });
  }

  window.kineticResetAll = function() {
    state.activeCats.clear();
    state.filters = { pratique: null, format: null, intensity: null, season: null };
    state.searchQuery = '';
    state.location = null;
    state.answers = {};
    const si = $('#search-input'); if (si) si.value = '';
    const fl = $('#filter-loc'); if (fl) fl.value = '';
    const field = $('#ss-field'); if (field) field.classList.remove('has-value');
    scoreAndRender();
    renderCatStrip();
  };

  // ──────────────────────────────────────────────────────────────
  // EVENT LISTENERS
  // ──────────────────────────────────────────────────────────────

  // Quiz
  $('#q2-back').addEventListener('click', back);
  $('#q2-skip').addEventListener('click', skipQuiz);
  $('#q2-continue').addEventListener('click', () => { if (!$('#q2-continue').disabled) advance(); });
  $('#retake-quiz').addEventListener('click', retakeQuiz);

  // Smart search
  const searchInput = $('#search-input');
  const ssField = $('#ss-field');
  function syncSearchVisual() { if (ssField) ssField.classList.toggle('has-value', !!searchInput.value); }
  if (searchInput) {
    let _sdeb;
    searchInput.addEventListener('input', () => {
      syncSearchVisual();
      clearTimeout(_sdeb);
      _sdeb = setTimeout(() => {
        state.searchQuery = searchInput.value.trim();
        renderResults();
      }, 200);
    });
  }
  const ssForm = document.querySelector('.smart-search');
  if (ssForm) {
    ssForm.addEventListener('submit', (e) => {
      e.preventDefault();
      state.searchQuery = (searchInput && searchInput.value || '').trim();
      renderResults();
    });
  }
  const clearBtn = $('#search-clear');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      state.searchQuery = '';
      syncSearchVisual();
      renderResults();
    });
  }

  // Filter location
  const filterLoc = $('#filter-loc');
  if (filterLoc) {
    let _deb;
    filterLoc.addEventListener('input', (e) => {
      clearTimeout(_deb);
      const val = e.target.value.trim();
      _deb = setTimeout(async () => {
        if (!val) { state.location = null; syncFiltersUI(); return; }
        if (window.KineticClubs && window.KineticClubs.geocodeCP) {
          const geo = await window.KineticClubs.geocodeCP(val);
          if (geo) {
            state.location = { lat: geo.lat, lon: geo.lon, depCode: geo.depCode, label: geo.label };
            syncFiltersUI();
          }
        } else {
          state.location = { label: val };
          syncFiltersUI();
        }
      }, 400);
    });
  }
  const filterLocGeo = $('#filter-loc-geo');
  if (filterLocGeo) {
    filterLocGeo.addEventListener('click', async () => {
      const orig = filterLocGeo.innerHTML;
      filterLocGeo.innerHTML = '⏳'; filterLocGeo.disabled = true;
      try {
        const pos = await window.KineticClubs.geolocate();
        state.location = { lat: pos.lat, lon: pos.lon, label: 'Ma position' };
        if (filterLoc) filterLoc.value = 'Ma position (GPS)';
        syncFiltersUI();
      } catch (e) {
        if (filterLoc) {
          filterLoc.value = '';
          filterLoc.placeholder = 'Géoloc indispo, tape un CP ou ville';
          filterLoc.focus();
        }
      } finally {
        filterLocGeo.innerHTML = orig; filterLocGeo.disabled = false;
      }
    });
  }

  // f2-section toggle
  $$('.f2-section-head').forEach(head => {
    head.addEventListener('click', () => {
      const section = head.closest('.f2-section');
      const open = section.classList.toggle('open');
      head.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  // f2-pill (filters, not cat)
  $$('.f2-pill[data-filter]:not([data-filter="cat"])').forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      const val = btn.dataset.val;
      if (state.filters[filter] === val) state.filters[filter] = null;
      else state.filters[filter] = val;
      renderResults();
      syncFiltersUI();
    });
  });

  $('#active-clear').addEventListener('click', window.kineticResetAll);

  // Save search (just a toast/feedback for now)
  const saveSearchBtn = $('#save-search');
  if (saveSearchBtn) {
    saveSearchBtn.addEventListener('click', () => {
      try {
        const payload = {
          answers: state.answers, location: state.location,
          filters: state.filters, activeCats: [...state.activeCats],
          searchQuery: state.searchQuery, ts: Date.now(),
        };
        localStorage.setItem('kinetic_v2_saved_search', JSON.stringify(payload));
        saveSearchBtn.innerHTML = '✓ Recherche enregistrée';
        setTimeout(() => { saveSearchBtn.innerHTML = '★ Enregistrer cette recherche'; }, 2000);
      } catch (_) {}
    });
  }

  // Tabs
  $$('.r2-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      state.tab = tab.dataset.tab;
      $$('.r2-tab').forEach(t => {
        const on = t === tab;
        t.classList.toggle('on', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      renderResults();
    });
  });

  // Sort
  const sortBtn = $('#sort-btn');
  if (sortBtn) {
    sortBtn.addEventListener('click', (e) => {
      if (e.target.closest('.r2-sort-menu')) return;
      $('#sort-menu').classList.toggle('open');
    });
    $$('#sort-menu .item').forEach(it => {
      it.addEventListener('click', (e) => {
        e.stopPropagation();
        state.sort = it.dataset.sort;
        $$('#sort-menu .item').forEach(i => i.classList.remove('on'));
        it.classList.add('on');
        $('#sort-value').textContent = it.childNodes[0].textContent.trim();
        $('#sort-menu').classList.remove('open');
        renderResults();
      });
    });
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#sort-btn')) $('#sort-menu').classList.remove('open');
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { const m = $('#sort-menu'); if (m) m.classList.remove('open'); }
  });

  // ──────────────────────────────────────────────────────────────
  // INIT
  // ──────────────────────────────────────────────────────────────
  ALL_CATS = buildCatList();
  renderCatStrip();

  // MAQUETTE DÉMO : on affiche toujours les résultats par défaut pour que les étudiants
  // comprennent l'objectif final. Le quiz reste accessible via "Refaire le quiz".
  const demoSkipQuiz = !window.location.search.includes('quiz=1');
  if (state.step === 'results' || demoSkipQuiz) {
    state.step = 'results';
    $('#quiz-step').classList.add('t2-hidden');
    $('#results-intro').classList.remove('t2-hidden');
    $('#results-view').classList.remove('t2-hidden');
    const introLoc = $('#intro-loc');
    if (introLoc && state.location && state.location.label) introLoc.textContent = ' · ' + state.location.label;
    scoreAndRender();
  } else {
    renderQuiz();
  }
})();
