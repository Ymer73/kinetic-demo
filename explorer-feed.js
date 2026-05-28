// ─── Explorer Feed — Infinite Shuffle ────────────────────────────────────────
// Gère le feed infini et aléatoire de explorer.html
// Dépend de data.js (SPORTS global) chargé avant ce fichier.

(function () {
  'use strict';

  // ── Constantes ────────────────────────────────────────────────────────────
  const LIKE_KEY    = 'kinetic_liked_sports';
  const SAVE_KEY    = 'kinetic_saved_sports';
  const BATCH_SIZE  = 10;
  const INIT_BATCH  = 12;

  // ── Dimensions (indices dans scores[]) ───────────────────────────────────
  // 0:Contact  1:Outdoor  2:Intensité  3:Budget   4:Collectif  5:Compétition
  // 6:Cardio   7:Force    8:Agilité    9:Souplesse 10:Endurance 11:Explosivité
  // 12:Coord.  13:Équil.  14:Eau       15:Hauteur  16:Nature   17:Domicile
  // 18:Saison. 19:Social  20:Rencontr. 21:Perf.    22:Bienetre 23:Adrénaline
  // 24:Zen     25:Technique 26:Matériel 27:AgeAcc.

  // ── Palette de 12 gradients (stable par hash du nom) ─────────────────────
  const GRADIENTS = [
    { c1: 'rgba(255,90,31,.22)',  c2: 'rgba(108,71,255,.18)', b1: '#FBF8FF', b2: '#FFF4EC' },
    { c1: 'rgba(46,143,214,.2)',  c2: 'rgba(22,160,133,.18)', b1: '#F0F8FF', b2: '#EEF9F8' },
    { c1: 'rgba(230,126,34,.22)', c2: 'rgba(214,51,132,.16)', b1: '#FFF8F0', b2: '#FFF0F8' },
    { c1: 'rgba(255,107,157,.2)', c2: 'rgba(0,180,216,.18)',  b1: '#FFF5FA', b2: '#F0FBFF' },
    { c1: 'rgba(255,28,174,.2)',  c2: 'rgba(123,47,190,.18)', b1: '#FFF5FC', b2: '#F8F0FF' },
    { c1: 'rgba(132,232,46,.22)', c2: 'rgba(15,76,117,.15)',  b1: '#F5FFF0', b2: '#F0F8FF' },
    { c1: 'rgba(39,174,96,.22)',  c2: 'rgba(41,128,185,.18)', b1: '#F0FFF5', b2: '#F0F8FF' },
    { c1: 'rgba(229,62,62,.22)',  c2: 'rgba(246,173,85,.2)',  b1: '#FFF5F0', b2: '#FFFBF0' },
    { c1: 'rgba(113,128,150,.2)', c2: 'rgba(255,90,31,.22)',  b1: '#F8F8F8', b2: '#FFF4EC' },
    { c1: 'rgba(255,184,0,.25)',  c2: 'rgba(229,62,62,.18)',  b1: '#FFFCF0', b2: '#FFF5F0' },
    { c1: 'rgba(49,130,206,.2)',  c2: 'rgba(144,205,244,.3)', b1: '#F0F8FF', b2: '#EEF6FF' },
    { c1: 'rgba(56,161,105,.22)', c2: 'rgba(66,153,225,.18)', b1: '#F0FFF8', b2: '#EEF6FF' },
  ];

  // ── Emoji par catégorie ───────────────────────────────────────────────────
  const CAT_EMOJI = {
    'Collectif':         '👯',
    'Individuel':        '🏃',
    'Combat':            '🥊',
    'Aquatique':         '🏊',
    'Glisse':            '⛷️',
    'Montagne & Nature': '🏔️',
    'Moteur':            '🏎️',
    'Équestre':          '🐎',
    'Mental':            '♟️',
    'Danse & Arts':      '🎭',
    'Aérien':            '🪂',
  };

  // ── Helpers localStorage ──────────────────────────────────────────────────
  function getLiked() {
    try { return new Set(JSON.parse(localStorage.getItem(LIKE_KEY) || '[]')); }
    catch { return new Set(); }
  }
  function getSaved() {
    try { return new Set(JSON.parse(localStorage.getItem(SAVE_KEY) || '[]')); }
    catch { return new Set(); }
  }
  function toggleLiked(id) {
    const s = getLiked();
    s.has(id) ? s.delete(id) : s.add(id);
    try { localStorage.setItem(LIKE_KEY, JSON.stringify([...s])); } catch {}
    return s.has(id);
  }
  function toggleSaved(id) {
    const s = getSaved();
    s.has(id) ? s.delete(id) : s.add(id);
    try { localStorage.setItem(SAVE_KEY, JSON.stringify([...s])); } catch {}
    return s.has(id);
  }

  // ── Hash déterministe (gradient stable par nom) ───────────────────────────
  function hashStr(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
    return Math.abs(h);
  }

  function getGradient(nom) {
    return GRADIENTS[hashStr(nom) % GRADIENTS.length];
  }

  // ── Chips depuis les scores ───────────────────────────────────────────────
  function getDimChips(scores) {
    const s = scores || new Array(28).fill(0);
    const candidates = [];
    // Ambiance / intensité
    if (s[2] >= 4)  candidates.push({ em: '⚡', label: 'Intense' });
    else if (s[22] >= 4) candidates.push({ em: '🌿', label: 'Chill' });
    // Environnement
    if (s[14] >= 3) candidates.push({ em: '🏊', label: 'Aquatique' });
    else if (s[1] >= 4) candidates.push({ em: '🌲', label: 'Outdoor' });
    else if (s[1] <= 1) candidates.push({ em: '🏠', label: 'Indoor' });
    // Équipe
    if (s[4] >= 4)  candidates.push({ em: '👯', label: 'Équipe' });
    // Physique dominant
    if (s[7] >= 4)       candidates.push({ em: '💪', label: 'Force' });
    else if (s[9] >= 4)  candidates.push({ em: '🧘', label: 'Souplesse' });
    else if (s[8] >= 4)  candidates.push({ em: '🎯', label: 'Agilité' });
    else if (s[10] >= 4) candidates.push({ em: '🏃', label: 'Endurance' });
    // Sensation
    if (s[23] >= 4) candidates.push({ em: '🔥', label: 'Adrénaline' });
    if (s[24] >= 4) candidates.push({ em: '☯️', label: 'Zen' });
    if (s[0] >= 4)  candidates.push({ em: '🤜', label: 'Contact' });
    // Déduplique et garde 3 max
    const seen = new Set();
    return candidates.filter(c => {
      if (seen.has(c.label)) return false;
      seen.add(c.label);
      return true;
    }).slice(0, 3);
  }

  // ── Tag depuis la meta ────────────────────────────────────────────────────
  function getTag(sport) {
    const m = sport.meta || {};
    const s = sport.scores || [];
    const cost = m.cost || m.cout_entree_reel || 9999;
    const lic  = m.licencies2024 || m.nb_licencies_fr || 0;
    if (m.jo2024 === 'Oui')           return { cls: 't-jo',       em: '🏅', label: 'MÉDAILLÉ JO' };
    if (m.tendance === 'boom')         return { cls: 't-tendance', em: '📈', label: 'SPORT TENDANCE' };
    if (cost < 100)                    return { cls: 't-cheap',    em: '💰', label: 'MOINS DE 100€/AN' };
    if (lic > 500000)                  return { cls: 't-social',   em: '🤝', label: 'SPORT POPULAIRE' };
    const sum = s.reduce((a, b) => a + b, 0);
    if (sum < 50)                      return { cls: 't-niche',    em: '🔥', label: 'SPORT DE NICHE' };
    return { cls: 't-niche', em: '✨', label: 'DÉCOUVERTE' };
  }

  // ── Pitch enrichi — 2-3 phrases qui expliquent vraiment le sport ────────
  function generatePitch(sport) {
    const m = sport.meta || {};
    const s = sport.scores || new Array(28).fill(0);

    // Description manuelle longue → priorité absolue
    if (m.description && m.description.length > 60) return m.description;

    const nom = sport.nom;

    // ── Contexte environnement & social ──────────────────────────────────
    const isTeam      = s[4] >= 4;
    const isOutdoor   = s[1] >= 4;
    const isIndoor    = s[1] <= 1;
    const isWater     = s[14] >= 3;
    const isHigh      = s[15] >= 3;
    const isNature    = s[16] >= 3;
    const isCombat    = s[0] >= 4 && s[5] >= 3;
    const isZen       = s[24] >= 4;
    const isAdrenalin = s[23] >= 4;
    const isCardio    = s[6] >= 4;
    const isForce     = s[7] >= 4;
    const isAgilite   = s[8] >= 4;
    const isSouplesse = s[9] >= 4;
    const isEndurance = s[10] >= 4;
    const isExplosif  = s[11] >= 4;
    const isCoord     = s[12] >= 4;
    const isEquilibre = s[13] >= 4;
    const isTech      = s[25] >= 4;
    const isSocial    = s[19] >= 4;
    const isCompet    = s[5] >= 4;

    // ── PHRASE 1 : Qu'est-ce que c'est ? ─────────────────────────────────
    let p1 = '';
    const social = isTeam ? 'en équipe' : 'en solo';
    if (isCombat) {
      p1 = `${nom} est un sport de combat ${isOutdoor ? 'pratiqué en extérieur' : 'pratiqué en salle'}, ${social}, où l'affrontement direct est au cœur de chaque échange.`;
    } else if (isWater && isTeam) {
      p1 = `${nom} est un sport aquatique collectif qui se joue dans l'eau — vitesse, synchronisation et esprit d'équipe sont indispensables.`;
    } else if (isWater) {
      p1 = `${nom} est un sport aquatique pratiqué ${social}, qui demande une bonne maîtrise du milieu et de son propre corps.`;
    } else if (isHigh) {
      p1 = `${nom} est un sport de hauteur et de verticalité, pratiqué ${isOutdoor ? 'en plein air' : 'en salle'} — chaque mètre gagné est une victoire sur soi-même.`;
    } else if (isNature && isOutdoor) {
      p1 = `${nom} se pratique en pleine nature, ${social} — une discipline qui allie effort physique et immersion dans l'environnement.`;
    } else if (isTeam && isOutdoor) {
      p1 = `${nom} est un sport collectif de plein air où la cohésion du groupe, la lecture du jeu et l'endurance font la différence.`;
    } else if (isTeam) {
      p1 = `${nom} est un sport d'équipe pratiqué en salle, où la communication, les placements et la stratégie collective sont essentiels.`;
    } else if (isOutdoor) {
      p1 = `${nom} se pratique en extérieur, ${social}, avec pour terrain de jeu l'espace ouvert et ses contraintes naturelles.`;
    } else {
      p1 = `${nom} se pratique ${isIndoor ? 'en salle' : 'sur le terrain'}, ${social} — une discipline qui demande autant de tête que de corps.`;
    }

    // ── PHRASE 2 : Ce que ça développe + la vibe ──────────────────────────
    const qualites = [];
    if (isCardio)    qualites.push('le cardio');
    if (isForce)     qualites.push('la force');
    if (isAgilite)   qualites.push("l'agilité");
    if (isSouplesse) qualites.push('la souplesse');
    if (isEndurance) qualites.push("l'endurance");
    if (isExplosif)  qualites.push("l'explosivité");
    if (isCoord)     qualites.push('la coordination');
    if (isEquilibre) qualites.push("l'équilibre");
    if (isTech)      qualites.push('la technique');

    let p2 = '';
    if (qualites.length >= 2) {
      const q = qualites.slice(0, 3);
      const last = q.pop();
      p2 = `Il travaille ${q.join(', ')} et ${last}.`;
      if (isAdrenalin)   p2 += ' Les sensations fortes font partie du deal.';
      else if (isZen)    p2 += ' La maîtrise mentale et la respiration sont aussi centrales que le physique.';
      else if (isSocial) p2 += " L'ambiance conviviale et les rencontres font autant partie de l'expérience que l'effort.";
      else if (isCompet) p2 += ' La compétition y est intense et les progressions rapides.';
    } else if (isAdrenalin) {
      p2 = "Un sport qui repousse les limites — adrénaline, vitesse et prise de risque contrôlée sont au programme à chaque session.";
    } else if (isZen) {
      p2 = "Une pratique centrée sur la maîtrise de soi, la respiration et l'équilibre intérieur autant que physique.";
    } else if (isSocial) {
      p2 = "La dimension sociale est forte : rencontres, partage et bonne humeur font partie intégrante de la pratique.";
    } else if (qualites.length === 1) {
      p2 = `Il sollicite particulièrement ${qualites[0]} et demande une vraie régularité pour progresser.`;
    }

    // ── PHRASE 3 : Accroche finale / accessibilité ─────────────────────────
    const cost   = m.cost || m.cout_entree_reel || 0;
    const ageMin = m.age_minimum || m.ageMin || 0;
    const kw     = m.motsCles ? m.motsCles.split(',')[0].trim() : '';
    let p3 = '';
    if (cost > 0 && cost < 150) {
      p3 = `Accessible dès ${ageMin > 3 ? ageMin + ' ans' : 'tout âge'} et peu coûteux${kw ? ' — parfait si tu es attiré par ' + kw : ''}.`;
    } else if (s[27] >= 4) {
      p3 = `Ouvert à tous les âges${kw ? ', à essayer si tu aimes ' + kw : ' — facile à débuter, difficile à maîtriser'}.`;
    } else if (cost >= 500) {
      p3 = `Un investissement conséquent${kw ? ' pour les passionnés de ' + kw : ''}, mais une expérience hors du commun à la clé.`;
    } else if (kw) {
      p3 = `À explorer si tu es attiré par ${kw}.`;
    } else {
      p3 = "Une discipline qui mérite d'être testée au moins une fois dans sa vie.";
    }

    return [p1, p2, p3].filter(Boolean).join(' ');
  }

  // ── Format nombre compact ────────────────────────────────────────────────
  function fmtNum(n) {
    if (!n || n <= 0) return null;
    if (n >= 1000000) return (n / 1000000).toFixed(1).replace('.0', '') + ' M';
    if (n >= 1000)    return Math.round(n / 1000) + ' k';
    return String(Math.round(n));
  }

  // ── Construction d'une carte générée ─────────────────────────────────────
  function buildGeneratedCard(sport, position) {
    const g       = getGradient(sport.nom);
    const chips   = getDimChips(sport.scores);
    const tag     = getTag(sport);
    const m       = sport.meta || {};
    const lic     = fmtNum(m.licencies2024 || m.nb_licencies_fr);
    const clubs   = fmtNum(m.clubs || m.clubsCount);
    const emoji   = CAT_EMOJI[sport.cat] || '🏅';
    const longName = sport.nom.length > 12;
    const pitch   = generatePitch(sport);
    const id      = sport.id;
    const liked   = getLiked().has(id);
    const saved   = getSaved().has(id);

    const section = document.createElement('section');
    section.className  = 'card card-generated';
    section.dataset.sportId      = id;
    section.dataset.screenLabel  = `${String(position).padStart(2,'0')} ${sport.nom}`;
    section.style.cssText =
      `background:` +
      `radial-gradient(1200px 900px at 30% 30%,${g.c1} 0%,transparent 55%),` +
      `radial-gradient(1000px 800px at 80% 90%,${g.c2} 0%,transparent 55%),` +
      `linear-gradient(180deg,${g.b1} 0%,${g.b2} 100%);`;

    const dataLine = (lic && clubs)
      ? `<div class="data">${lic} LICENCIÉS · <b>${clubs} CLUBS</b> EN FRANCE</div>`
      : '';

    const chipsHtml = chips.map(c => `<span class="chip"><em>${c.em}</em> ${c.label}</span>`).join('');

    section.innerHTML = `
      <div class="card-inner">
        <div class="col-text">
          <div class="tag ${tag.cls}"><span class="em">${tag.em}</span> ${tag.label}</div>
          <h2 class="title${longName ? ' long' : ''}">${sport.nom.toUpperCase()}</h2>
          <div class="chips">${chipsHtml}</div>
          ${dataLine}
          <p class="pitch">${pitch}</p>
          <div class="actions">
            <button class="icon-btn like${liked ? ' liked' : ''}" aria-label="Like" aria-pressed="${liked}" data-sport-id="${id}">
              <svg viewBox="0 0 24 24"><path d="M12 21s-8-5-8-11a5 5 0 0 1 8-3 5 5 0 0 1 8 3c0 6-8 11-8 11z"/></svg>
            </button>
            <button class="icon-btn save${saved ? ' on' : ''}" aria-label="Sauvegarder" aria-pressed="${saved}" data-sport-id="${id}">
              <svg viewBox="0 0 24 24"><path d="M6 3h12v18l-6-4-6 4z"/></svg>
            </button>
            <a href="sport.html?id=${id}" class="cta">Voir ce sport
              <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </a>
          </div>
        </div>
        <div class="col-visual">
          <div class="watermark" aria-hidden="true">${String(position).padStart(2,'0')}</div>
          <div class="aura a3"></div>
          <div class="aura"></div>
          <div class="aura a2"></div>
          <div class="glyph-emoji" aria-hidden="true">${emoji}</div>
        </div>
      </div>`;

    return section;
  }

  // ── Mise à jour d'une carte premium (like/save depuis localStorage) ───────
  function syncPremiumCard(el, position) {
    const id = Number(el.dataset.sportId);
    // Watermark
    const wm = el.querySelector('.watermark');
    if (wm) wm.textContent = String(position).padStart(2, '0');
    // Boutons like / save
    if (id > 0) {
      const likeBtn = el.querySelector('.icon-btn.like');
      const saveBtn = el.querySelector('.icon-btn.save');
      if (likeBtn) {
        const liked = getLiked().has(id);
        likeBtn.classList.toggle('liked', liked);
        likeBtn.setAttribute('aria-pressed', String(liked));
        likeBtn.dataset.sportId = id;
      }
      if (saveBtn) {
        const saved = getSaved().has(id);
        saveBtn.classList.toggle('on', saved);
        saveBtn.setAttribute('aria-pressed', String(saved));
        saveBtn.dataset.sportId = id;
      }
    }
    return el;
  }

  // ── Fisher-Yates shuffle ──────────────────────────────────────────────────
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  // ── État du feed ──────────────────────────────────────────────────────────
  let playlist    = [];
  let loadedCount = 0;
  let cardPosition = 0;

  function buildPlaylist() {
    // Cartes premium (stockées dans le pool caché)
    const premiumEls = Array.from(document.querySelectorAll('#premium-pool .card'));
    const premiumIds = new Set(premiumEls.map(el => Number(el.dataset.sportId)).filter(Boolean));

    const premiumEntries   = premiumEls.map(el => ({ type: 'premium', el }));
    const generatedEntries = SPORTS
      .filter(s => !premiumIds.has(s.id))
      .map(s => ({ type: 'generated', sport: s }));

    playlist = shuffle([...premiumEntries, ...generatedEntries]);
  }

  // Étend la playlist quand elle est épuisée (loop infini côté généré)
  function extendPlaylist() {
    const extra = shuffle(SPORTS).map(s => ({ type: 'generated', sport: s }));
    playlist.push(...extra);
  }

  function getCardElement(entry) {
    cardPosition++;
    if (entry.type === 'premium') {
      return syncPremiumCard(entry.el, cardPosition);
    }
    return buildGeneratedCard(entry.sport, cardPosition);
  }

  // ── Chargement par batch ──────────────────────────────────────────────────
  function loadBatch(n) {
    const feed = document.getElementById('feed');
    if (!feed) return;

    const end = Math.min(loadedCount + n, playlist.length);
    const frag = document.createDocumentFragment();

    for (let i = loadedCount; i < end; i++) {
      frag.appendChild(getCardElement(playlist[i]));
    }

    feed.appendChild(frag);
    loadedCount = end;

    // Signale aux lecteurs d'écran que de nouvelles cartes sont disponibles
    const liveRegion = document.getElementById('feedLive');
    if (liveRegion) liveRegion.textContent = `${loadedCount} sports chargés`;

    if (loadedCount >= playlist.length) extendPlaylist();
  }

  // ── Mise à jour du compteur ───────────────────────────────────────────────
  function updateCounter(idx) {
    const el = document.getElementById('feedCounter');
    if (el) el.textContent = `SPORT #${idx + 1}`;
  }

  // ── Navigation ────────────────────────────────────────────────────────────
  function curIdx() {
    const feed = document.getElementById('feed');
    return feed ? Math.round(feed.scrollTop / feed.clientHeight) : 0;
  }

  function scrollTo(i) {
    const feed = document.getElementById('feed');
    if (!feed) return;
    const max = feed.querySelectorAll('.card').length - 1;
    feed.scrollTo({ top: Math.max(0, Math.min(max, i)) * feed.clientHeight, behavior: 'smooth' });
  }

  window.nextCard = () => scrollTo(curIdx() + 1);
  window.prevCard = () => scrollTo(curIdx() - 1);

  // ── Gestion déléguée like / save ──────────────────────────────────────────
  function wireActions(feed) {
    feed.addEventListener('click', (e) => {
      const likeBtn = e.target.closest('.icon-btn.like');
      const saveBtn = e.target.closest('.icon-btn.save');

      if (likeBtn) {
        e.preventDefault();
        const id = Number(likeBtn.dataset.sportId);
        const now = id > 0 ? toggleLiked(id) : !likeBtn.classList.contains('liked');
        likeBtn.classList.toggle('liked', now);
        likeBtn.setAttribute('aria-pressed', String(now));
      }
      if (saveBtn) {
        e.preventDefault();
        const id = Number(saveBtn.dataset.sportId);
        const now = id > 0 ? toggleSaved(id) : !saveBtn.classList.contains('on');
        saveBtn.classList.toggle('on', now);
        saveBtn.setAttribute('aria-pressed', String(now));
      }
    });
  }

  // ── Init ──────────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    const feed = document.getElementById('feed');
    if (!feed || typeof SPORTS === 'undefined') return;

    // Construit la playlist shufflée
    buildPlaylist();

    // Charge le premier batch
    loadBatch(INIT_BATCH);

    // Attache les interactions
    wireActions(feed);

    // Swipe hint + compteur + lazy load au scroll
    const hint = document.getElementById('swipeHint');

    feed.addEventListener('scroll', () => {
      const idx   = curIdx();
      const total = feed.querySelectorAll('.card').length;

      updateCounter(idx);
      if (idx > 0 && hint) hint.classList.add('hidden');
      // Charge plus dès qu'on approche la fin (3 cartes avant le bord)
      if (idx >= total - 4) loadBatch(BATCH_SIZE);
    }, { passive: true });

    // Clavier
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault(); nextCard();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault(); prevCard();
      }
    });

    // Resize : maintient le snap
    window.addEventListener('resize', () => {
      const i = curIdx();
      feed.scrollTo({ top: i * feed.clientHeight, behavior: 'auto' });
    });
  });

})();
