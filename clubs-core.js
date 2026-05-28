/**
 * clubs-core.js — Moteur de recherche et scoring de CLUBS pour Kinetic
 *
 * API publique exposée sur window.KineticClubs :
 *
 *   await KineticClubs.findClubs({ answers, location, sportFilter, limit })
 *       -> { clubs: [...], radius_km, fallback_message, total_in_radius }
 *
 *   await KineticClubs.searchClubs({ query, depCode, limit })
 *       -> { clubs: [...], parsed: { sport, depCode } }
 *
 *   await KineticClubs.geolocate()  -> { lat, lon, depCode? }
 *   await KineticClubs.geocodeCP(cpOrCity) -> { lat, lon, depCode, label }
 *
 * Garantie clé : findClubs() retourne TOUJOURS au moins `minResults` (5 par défaut)
 * clubs, en élargissant progressivement le rayon (5 -> 15 -> 30 -> 50 -> 100 -> 200 km)
 * puis en chargeant les départements adjacents, puis enfin en retournant le top
 * national par fit pur. Zéro résultat est impossible par design.
 *
 * Dépendances : dept-geo.js (DEPT_CENTERS, DEPT_ADJACENTS, cpToDept, normalizeDept)
 *               data.js (SPORTS avec scoresV2)
 */

(function() {
  'use strict';

  // ─── Cache des fichiers JSON dept-XX.json ───
  const _deptCache = new Map();      // depCode -> Promise<clubs[]>
  let _deptIndex = null;             // Map slug-disc -> id sport (pour résolution)
  let _sportIndex = null;            // Map sport_id -> sport (rapide)

  // ─── Tiers d'élargissement (km) ───
  const RADIUS_TIERS = [5, 15, 30, 50, 100, 200];
  const MIN_RESULTS = 5;
  const TARGET_RESULTS = 10;

  // ─── Slug normalizer (sans accents, lowercase, alphanum) ───
  function slug(s) {
    return String(s || '').toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]/g, '');
  }

  // ─── Mappings discipline (slug club) -> mots-clés sport ─────────
  // Permet de retrouver le sport (et ses scoresV2) à partir du slug `disc` du club.
  // Exemple : club.disc = 'football' -> on cherche le sport dont le nom contient 'football'.
  const DISC_TO_SPORT_HINTS = {
    'football': ['football'],
    'rugby': ['rugby'],
    'basketball': ['basketball'],
    'handball': ['handball'],
    'volleyball': ['volleyball', 'volley'],
    'tennis': ['tennis'],
    'tennis-table': ['tennis de table', 'ping'],
    'badminton': ['badminton'],
    'natation': ['natation'],
    'athletisme': ['athletisme', 'athlétisme'],
    'cyclisme': ['cyclisme route', 'cyclisme'],
    'cyclotourisme': ['cyclotourisme', 'cyclisme'],
    'judo': ['judo'],
    'karate': ['karate', 'karaté'],
    'taekwondo': ['taekwondo'],
    'boxe': ['boxe anglaise', 'boxe'],
    'escrime': ['escrime'],
    'lutte': ['lutte'],
    'equitation': ['equitation', 'équitation'],
    'golf': ['golf'],
    'ski': ['ski alpin', 'ski'],
    'alpinisme': ['alpinisme'],
    'escalade': ['escalade'],
    'voile': ['voile'],
    'aviron': ['aviron'],
    'plongee': ['plongée', 'plongee'],
    'canoe-kayak': ['canoë', 'canoe', 'kayak'],
    'surf': ['surf'],
    'fitness': ['fitness'],
    'danse': ['danse'],
    'tir-arc': ['tir à l\'arc', 'tir arc'],
    'tir': ['tir sportif', 'tir'],
    'gymnastique': ['gymnastique'],
    'roller': ['roller'],
    'randonnee': ['randonnée', 'randonnee'],
    'triathlon': ['triathlon'],
    'arts-martiaux': ['aikido', 'aïkido', 'krav', 'arts martiaux'],
    'muay-thai': ['muay', 'thai'],
    'speleologie': ['spéléologie', 'speleo'],
    'handisport': ['handisport'],
    'aikido': ['aïkido', 'aikido'],
  };

  // ─── Init des index sports (lazy) ───
  function _initSportIndex() {
    if (_sportIndex) return;
    _sportIndex = new Map();
    _deptIndex = new Map();
    if (typeof SPORTS === 'undefined' || !Array.isArray(SPORTS)) return;
    SPORTS.forEach(s => {
      _sportIndex.set(s.id, s);
      _sportIndex.set(slug(s.nom), s);
    });
  }

  // Retourne le sport "principal" associé à un club (pour ses scoresV2).
  // Stratégie :
  //   1. Si club.sport_ids[0] existe et qu'on trouve le sport, on le prend
  //   2. Sinon on cherche via DISC_TO_SPORT_HINTS[club.disc]
  //   3. Sinon on retourne null (le club sera scoré sur fallback)
  function _resolveClubSport(club) {
    _initSportIndex();
    if (Array.isArray(club.sport_ids) && club.sport_ids.length) {
      for (const sid of club.sport_ids) {
        const s = _sportIndex.get(sid);
        if (s) return s;
      }
    }
    const hints = DISC_TO_SPORT_HINTS[club.disc] || [club.disc];
    for (const h of hints) {
      const s = _sportIndex.get(slug(h));
      if (s) return s;
    }
    // Recherche partielle
    if (typeof SPORTS !== 'undefined') {
      for (const h of hints) {
        const hSlug = slug(h);
        const s = SPORTS.find(sp => slug(sp.nom).includes(hSlug) || hSlug.includes(slug(sp.nom).substring(0, 5)));
        if (s) return s;
      }
    }
    return null;
  }

  // ─── Distance Haversine (km) ───
  function haversine(lat1, lon1, lat2, lon2) {
    if (lat1 == null || lat2 == null) return Infinity;
    const R = 6371;
    const toRad = d => d * Math.PI / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon/2)**2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  }

  // ─── Chargement d'un département (JSON, avec cache) ───
  async function loadDept(depCode) {
    if (!depCode) return [];
    const key = String(depCode).padStart(2, '0').slice(0, 3);
    if (_deptCache.has(key)) return _deptCache.get(key);
    const promise = fetch(`clubs/dept-${parseInt(key) || key}.json`)
      .then(r => r.ok ? r.json() : { clubs: [] })
      .then(data => data.clubs || [])
      .catch(() => []);
    _deptCache.set(key, promise);
    return promise;
  }

  // ─── Géoloc HTML5 ───
  function geolocate() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) return reject(new Error('Géolocalisation non supportée'));
      navigator.geolocation.getCurrentPosition(
        pos => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
        err => reject(err),
        { timeout: 10000, maximumAge: 5*60*1000, enableHighAccuracy: false }
      );
    });
  }

  // ─── Géocodage texte (CP, ville, dept) ───
  // Utilise api-adresse.data.gouv.fr (gratuit, sans clé, CORS ok)
  // Fallback : DEPT_CENTERS si on peut au moins extraire un dept
  async function geocodeCP(input) {
    const raw = String(input || '').trim();
    if (!raw) return null;

    // 1. Si c'est juste un code dept ou un nom de dept reconnu, fallback direct au centre
    const directDept = (typeof normalizeDept === 'function') ? normalizeDept(raw) : null;

    // 2. Tentative API Adresse (résultats précis si CP ou ville)
    try {
      const url = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(raw)}&limit=1`;
      const resp = await fetch(url, { mode: 'cors' });
      if (resp.ok) {
        const j = await resp.json();
        if (j.features && j.features.length) {
          const f = j.features[0];
          const [lon, lat] = f.geometry.coordinates;
          const cp = f.properties.postcode;
          const depCode = (typeof cpToDept === 'function' && cp) ? cpToDept(cp) : directDept;
          return {
            lat, lon, depCode,
            label: f.properties.label || raw,
            cp,
            city: f.properties.city,
          };
        }
      }
    } catch (e) {
      console.warn('[clubs-core] géocodage API en échec :', e.message);
    }

    // 3. Fallback : centre du département si on a pu en déduire un
    if (directDept && typeof DEPT_CENTERS !== 'undefined' && DEPT_CENTERS[directDept]) {
      const c = DEPT_CENTERS[directDept];
      return { lat: c.lat, lon: c.lon, depCode: directDept, label: c.nom, fallback: true };
    }
    return null;
  }

  // ─── Score "fit" d'un club par rapport aux réponses du quiz ───
  // Retourne un score de 0 à 100 basé sur les scoresV2 du sport du club.
  // Refactor 2026-05-27 : ré-équilibre des poids pour que les réponses du quiz
  // pèsent réellement, et que la qualité enrichissement ne domine plus la pertinence.
  function _fitScore(club, answers) {
    if (!answers || Object.keys(answers).length === 0) return 50;
    const sport = _resolveClubSport(club);
    const sv2 = (sport && sport.scoresV2) || {};
    const meta = (sport && sport.meta) || {};
    // Base 40 (au lieu de 50) → laisse plus de place aux signaux quiz
    let score = 40;

    // ── Format : solo / collectif / mixed (poids ×1.6) ──
    if (answers.format === 'team') score += (sv2.collectif || 0) * 6 + (sv2.sociabilite || 0) * 2.5;
    if (answers.format === 'solo') score += (5 - (sv2.collectif || 0)) * 5.5;
    if (answers.format === 'mixed') score += 5;
    // (any => neutre, +0)

    // ── Pratique : indoor / outdoor / water (poids ×1.6) ──
    if (answers.pratique === 'water') score += (sv2.eau || 0) * 8;
    if (answers.pratique === 'outdoor') score += (sv2.outdoor || 0) * 6.5;
    if (answers.pratique === 'indoor') score += (5 - (sv2.outdoor || 0)) * 5.5;

    // ── Vibe : perf / fun / relax / intense ──
    // Polarisation forte : bonus si compatible, MALUS si à l'opposé.
    // Sinon "Doux" et "Intense" finissent par renvoyer les mêmes clubs.
    const zen = sv2.zen || 0;
    const adr = sv2.adrenaline || 0;
    const cardio = sv2.cardio || 0;
    const compet = sv2.competition || 0;
    const social = sv2.sociabilite || 0;
    if (answers.vibe === 'perf') {
      score += compet * 6;
      if (compet <= 1) score -= 8; // sport sans esprit de perf → malus
    }
    if (answers.vibe === 'fun') {
      score += social * 5;
      if (social <= 1) score -= 6;
    }
    if (answers.vibe === 'relax') {
      score += zen * 7.5;
      // Malus si sport très cardio/adré (opposé du chill)
      if ((cardio + adr) >= 8) score -= 18;
      else if ((cardio + adr) >= 6) score -= 10;
    }
    if (answers.vibe === 'intense') {
      score += adr * 5.5 + cardio * 2.5;
      // Malus si sport ultra zen (opposé)
      if (zen >= 4) score -= 18;
      else if (zen >= 3) score -= 10;
    }

    // ── Intensité (1-5, gap-based, amplitude doublée) ──
    // Refactor 2026-05-27 : amplitude étendue à [-30, +25] pour que
    // "Doux" (2) et "Intense" (4) donnent des classements vraiment différents.
    if (answers.intensity && answers.intensity !== 'any') {
      const sportInt = Math.max(1, Math.min(5, Math.round(((sv2.cardio||0) + (sv2.adrenaline||0) + (sv2.energetique||0)) / 3) || 3));
      const diff = Math.abs(parseInt(answers.intensity) - sportInt);
      // diff=0 → +25  ;  diff=1 → +12  ;  diff=2 → -5  ;  diff=3+ → -30
      const intensityScore = diff === 0 ? 25 : diff === 1 ? 12 : diff === 2 ? -5 : -30;
      score += intensityScore;
    }

    // ── Niveau physique actuel ──
    // low -> favoriser zen + sports peu cardio
    // high -> favoriser cardio + force
    // mid -> aucun bonus universel (signal nul), juste un mini bonus si sport ni extrême ni rien
    if (answers.fitness === 'low') {
      score += (sv2.zen || 0) * 3 + (5 - (sv2.cardio || 0)) * 3;
    }
    if (answers.fitness === 'mid') {
      const cardio = sv2.cardio || 0;
      // léger bonus si le sport est moyennement cardio (2-4)
      score += (cardio >= 2 && cardio <= 4) ? 3 : 0;
    }
    if (answers.fitness === 'high') {
      score += (sv2.cardio || 0) * 3 + (sv2.force || 0) * 3;
    }

    // ── Saison ──
    if (answers.season && answers.season !== 'any' && meta.saison) {
      const mapping = { 'ete': 'ete', 'hiver': 'hiver', 'an': 'annee' };
      const wanted = mapping[answers.season] || answers.season;
      if (meta.saison === wanted) score += 8;
      else if (meta.saison === 'annee') score += 3; // polyvalent
      else if (wanted === 'annee') score += 2;
      else score -= 4; // saison incompatible
    }

    // ── Bonus qualité club (divisé par ~2) : pour départager à pertinence égale ──
    // L'enrichissement ne doit pas remplacer la pertinence : tie-breaker, pas dominant
    if (club.tel) score += 1;
    if (club.email) score += 1;
    if (club.web) score += 0.5;
    if (club.instagram || club.facebook || club.tiktok) score += 1;
    if (Array.isArray(club.equipes) && club.equipes.length > 1) score += 1;
    // club_self conserve une priorité (le club a écrit lui-même) mais moindre
    if (club.enrichi_par === 'club_self') score += 3;

    return Math.max(0, Math.min(100, Math.round(score)));
  }

  // ─── Score combiné distance + fit ───
  // Distance pondère, mais ne doit pas écraser la pertinence du sport.
  // Refactor 2026-05-27 : bonus distance plafonné à +18 (au lieu de +30)
  // pour laisser le fit (0-100) dominer le classement.
  function _combinedScore(club, userPos, answers, currentRadius) {
    const fit = _fitScore(club, answers);
    if (!userPos || club.lat == null) {
      return { score: fit, distance: null, fit };
    }
    const d = haversine(userPos.lat, userPos.lon, club.lat, club.lon);
    // Bonus distance : à 0km on a +18, à currentRadius on a 0
    const distBonus = Math.max(0, 18 * (1 - d / Math.max(currentRadius, 5)));
    return { score: fit + distBonus, distance: d, fit };
  }

  // ─── Recherche principale avec garantie zéro résultat impossible ───
  // Options :
  //   answers       : réponses du quiz {format, pratique, vibe, ...}
  //   location      : { lat, lon, depCode?, label? }
  //   sportFilter   : string libre pour filtrer par discipline
  //   limit         : nombre max de clubs renvoyés (défaut 10)
  //   minResults    : nombre minimum garanti avant déclencher fallback (défaut 5)
  //   maxDistance   : si défini, on utilise ce rayon FIXE au lieu de l'élargissement par tier
  //                   (ex : utilisé par le slider distance de l'UI)
  async function findClubs(opts = {}) {
    const answers = opts.answers || {};
    const userPos = opts.location || null;       // { lat, lon, depCode? }
    const sportFilter = (opts.sportFilter || '').toLowerCase().trim();
    const limit = opts.limit || TARGET_RESULTS;
    const minResults = opts.minResults || MIN_RESULTS;
    const fixedRadius = opts.maxDistance != null ? Number(opts.maxDistance) : null;

    // Si pas de position : top fit national (large couverture si un sport est demandé)
    if (!userPos || !userPos.lat) {
      const clubs = sportFilter
        ? await _topBySportNational(sportFilter, answers, limit)
        : await _topByFitNational(answers, sportFilter, limit);
      return {
        clubs,
        radius_km: null,
        fallback_message: sportFilter
          ? `Tous les clubs "${sportFilter}" en France, classés par pertinence. Ajoute une ville pour affiner par distance.`
          : 'Sans localisation, voici les meilleurs clubs par compatibilité (toute la France).',
        total_in_radius: clubs.length,
      };
    }

    // Détermine le dept central
    const centralDept = userPos.depCode
      || (typeof cpToDept === 'function' && userPos.cp ? cpToDept(userPos.cp) : null)
      || _findClosestDept(userPos);

    // Mode "rayon fixe" : on charge ce qu'il faut pour couvrir le rayon, on filtre, on classe.
    // Pas de fallback automatique : si l'utilisateur a explicitement choisi 25 km, on respecte.
    if (fixedRadius != null) {
      const tiersToLoad = fixedRadius;
      const deptsToLoad = _deptsForRadius(centralDept, tiersToLoad);
      let pool = [];
      for (const d of deptsToLoad) {
        pool = pool.concat(await loadDept(d));
      }
      if (sportFilter) pool = pool.filter(c => _clubMatchesSportFilter(c, sportFilter));
      const inRadius = pool.filter(c => {
        if (c.lat == null || c.lon == null) return false;
        return haversine(userPos.lat, userPos.lon, c.lat, c.lon) <= fixedRadius;
      });
      const scored = inRadius.map(c => {
        const sc = _combinedScore(c, userPos, answers, fixedRadius);
        return { ...c, _score: sc.score, _distance: sc.distance, _fit: sc.fit };
      }).sort((a, b) => b._score - a._score);
      return {
        clubs: scored.slice(0, limit),
        radius_km: fixedRadius,
        fallback_message: scored.length < minResults
          ? `Seulement ${scored.length} clubs dans ${fixedRadius} km. Élargis le rayon ou retire un filtre.`
          : null,
        total_in_radius: scored.length,
      };
    }

    // Boucle d'élargissement (mode automatique)
    const loadedDepts = new Set();
    let allClubs = [];

    for (let i = 0; i < RADIUS_TIERS.length; i++) {
      const radius = RADIUS_TIERS[i];

      // Charge les départements pertinents pour ce rayon
      const deptsToLoad = _deptsForRadius(centralDept, radius);
      for (const d of deptsToLoad) {
        if (!loadedDepts.has(d)) {
          loadedDepts.add(d);
          const clubs = await loadDept(d);
          allClubs = allClubs.concat(clubs);
        }
      }

      // Filtre par sport si demandé
      let pool = sportFilter
        ? allClubs.filter(c => _clubMatchesSportFilter(c, sportFilter))
        : allClubs;

      // Filtre par rayon
      const inRadius = pool.filter(c => {
        if (c.lat == null || c.lon == null) return false;
        return haversine(userPos.lat, userPos.lon, c.lat, c.lon) <= radius;
      });

      if (inRadius.length >= minResults) {
        // Score et tri
        const scored = inRadius.map(c => {
          const sc = _combinedScore(c, userPos, answers, radius);
          return { ...c, _score: sc.score, _distance: sc.distance, _fit: sc.fit };
        }).sort((a, b) => b._score - a._score);

        return {
          clubs: scored.slice(0, limit),
          radius_km: radius,
          fallback_message: radius > 15 ? `On a élargi à ${radius} km pour te trouver de bonnes options.` : null,
          total_in_radius: inRadius.length,
        };
      }
    }

    // Rien dans 200km : élargir aux dept adjacents puis fallback national
    // Si on a un sportFilter restrictif, on relâche dans cet ordre :
    //   1. élargir radius à 500km mais en gardant le filtre sport
    //   2. enlever le filtre sport mais garder dept et environs
    //   3. top national par fit (sans contrainte géo)
    if (sportFilter) {
      const filtered = allClubs.filter(c => _clubMatchesSportFilter(c, sportFilter));
      if (filtered.length >= minResults) {
        const scored = filtered.map(c => {
          const sc = _combinedScore(c, userPos, answers, 500);
          return { ...c, _score: sc.score, _distance: sc.distance, _fit: sc.fit };
        }).sort((a, b) => b._score - a._score);
        return {
          clubs: scored.slice(0, limit),
          radius_km: 500,
          fallback_message: `Pas de club "${sportFilter}" dans les 200 km. Voici les plus proches en France.`,
          total_in_radius: filtered.length,
        };
      }
    }

    // Dernier recours : top fit national (sans filtre)
    const national = await _topByFitNational(answers, null, limit, userPos);
    return {
      clubs: national,
      radius_km: null,
      fallback_message: 'Pas de correspondance proche. Voici les meilleurs clubs au national.',
      total_in_radius: national.length,
    };
  }

  // Test si un club correspond au filtre sport (string libre)
  function _clubMatchesSportFilter(club, filter) {
    if (!filter) return true;
    const f = slug(filter);
    if (slug(club.disc).includes(f) || f.includes(slug(club.disc))) return true;
    const sport = _resolveClubSport(club);
    if (sport && slug(sport.nom).includes(f)) return true;
    // Match sur catégorie aussi (ex: "combat", "aquatique")
    if (sport && slug(sport.cat).includes(f)) return true;
    return false;
  }

  // Sélectionne les départements à charger selon le rayon souhaité
  function _deptsForRadius(centralDept, radiusKm) {
    if (!centralDept) return [];
    const list = [centralDept];
    if (radiusKm > 30 && typeof DEPT_ADJACENTS !== 'undefined') {
      const adj = DEPT_ADJACENTS[centralDept] || [];
      list.push(...adj);
    }
    // Au-delà de 100km, élargir aux voisins-de-voisins
    if (radiusKm >= 100 && typeof DEPT_ADJACENTS !== 'undefined') {
      const adj1 = DEPT_ADJACENTS[centralDept] || [];
      for (const a of adj1) {
        const adj2 = DEPT_ADJACENTS[a] || [];
        for (const b of adj2) {
          if (!list.includes(b)) list.push(b);
        }
      }
    }
    return list;
  }

  // Trouve le département le plus proche d'une position lat/lon
  function _findClosestDept(pos) {
    if (typeof DEPT_CENTERS === 'undefined') return null;
    let best = null, bestD = Infinity;
    for (const [code, c] of Object.entries(DEPT_CENTERS)) {
      const d = haversine(pos.lat, pos.lon, c.lat, c.lon);
      if (d < bestD) { bestD = d; best = code; }
    }
    return best;
  }

  // Top N clubs par fit sans contrainte géo (utilisé en dernier recours)
  // Pour éviter de charger TOUT le pays, on prend un échantillon de 10 gros départements.
  async function _topByFitNational(answers, sportFilter, limit, biasPos) {
    const SAMPLE_DEPTS = ['75', '13', '69', '31', '33', '59', '44', '38', '67', '34'];
    let pool = [];
    for (const d of SAMPLE_DEPTS) {
      pool = pool.concat(await loadDept(d));
    }
    if (sportFilter) {
      pool = pool.filter(c => _clubMatchesSportFilter(c, sportFilter));
    }
    const scored = pool.map(c => {
      const fit = _fitScore(c, answers);
      let dist = null;
      if (biasPos && c.lat != null) dist = haversine(biasPos.lat, biasPos.lon, c.lat, c.lon);
      return { ...c, _score: fit + (c.tel ? 2 : 0) + (c.web ? 1 : 0), _fit: fit, _distance: dist };
    }).sort((a, b) => b._score - a._score);
    return scored.slice(0, limit);
  }

  // Variante : top clubs d'UN sport, couverture nationale LARGE (40+ depts).
  // Utilisé quand l'utilisateur tape juste "rugby" sans localisation : on veut un panorama
  // représentatif des clubs de rugby en France, pas juste Paris/Lyon/Marseille.
  async function _topBySportNational(sportFilter, answers, limit) {
    // Liste des 40 plus gros départements en nombre de clubs (couverture représentative)
    const BIG_DEPTS = [
      '59', '13', '33', '44', '38', '69', '31', '34', '77', '76',
      '75', '78', '56', '62', '35', '83', '91', '67', '29', '57',
      '06', '60', '14', '54', '92', '93', '94', '95', '85', '42',
      '37', '49', '63', '27', '64', '17', '02', '21', '74', '01',
      '73', '11', '68', '50', '08',
    ];
    let pool = [];
    for (const d of BIG_DEPTS) {
      const clubs = await loadDept(d);
      pool = pool.concat(clubs.filter(c => _clubMatchesSportFilter(c, sportFilter)));
      // Early exit si on a déjà beaucoup de clubs
      if (pool.length >= limit * 6) break;
    }
    const scored = pool.map(c => {
      const fit = _fitScore(c, answers);
      const quality = (c.tel ? 3 : 0) + (c.email ? 2 : 0) + (c.web ? 2 : 0) + (c.instagram ? 1 : 0);
      return { ...c, _score: fit + quality, _fit: fit, _distance: null };
    }).sort((a, b) => b._score - a._score);
    return scored.slice(0, limit);
  }

  // ─── Recherche directe (mode "barre de recherche") ───
  // Parse intelligent d'un input style :
  //   - "rugby"               -> sport uniquement, retour national large
  //   - "rugby Savoie"        -> sport + dept, retour clubs du dept
  //   - "rugby Aix-les-Bains" -> sport + ville, retour clubs autour ville avec distance
  //   - "Aix-les-Bains"       -> ville uniquement, retour tous clubs autour ville
  //   - "Savoie"              -> dept uniquement, retour tous clubs du dept
  //   - "75001" / "73160"     -> code postal, idem ville
  //
  // Options additionnelles :
  //   maxDistance : rayon en km (utilisé quand on a une ville/CP et qu'on veut limiter)
  async function searchClubs(opts = {}) {
    const query = String(opts.query || '').trim();
    const limit = opts.limit || 30;
    const answers = opts.answers || {};
    const fixedRadius = opts.maxDistance != null ? Number(opts.maxDistance) : null;
    const extraSportFilter = (opts.sportFilter || '').toLowerCase().trim(); // peut s'ajouter à un dept saisi via UI

    if (!query && !extraSportFilter) {
      // requête vide pure : top national générique
      const clubs = await _topByFitNational(answers, null, limit);
      return {
        clubs, radius_km: null, total_in_radius: clubs.length,
        fallback_message: 'Top des clubs en France.',
        parsed: { sport: null, depCode: null, depName: null, cityLabel: null, position: null },
      };
    }

    // Tokenize
    const tokens = query.split(/[\s,;]+/).filter(Boolean);

    // 1) tentative département via tokens et bigrammes
    let detectedDept = null;
    let depTokensIdx = [];
    if (typeof normalizeDept === 'function') {
      // unigram
      for (let i = 0; i < tokens.length; i++) {
        const d = normalizeDept(tokens[i]);
        if (d) { detectedDept = d; depTokensIdx = [i]; break; }
      }
      // bigram (ex: "haute savoie")
      if (!detectedDept && tokens.length >= 2) {
        for (let i = 0; i < tokens.length - 1; i++) {
          const d = normalizeDept(`${tokens[i]} ${tokens[i+1]}`);
          if (d) { detectedDept = d; depTokensIdx = [i, i + 1]; break; }
        }
      }
    }

    // 2) Identifie les tokens qui ressemblent à un sport connu (foot, rugby, boxe, etc.)
    //    On utilise SPORTS pour reconnaître les sports principaux.
    const sportTokenSet = new Set();
    if (typeof SPORTS !== 'undefined' && Array.isArray(SPORTS)) {
      for (let i = 0; i < tokens.length; i++) {
        if (depTokensIdx.includes(i)) continue;
        const tSlug = slug(tokens[i]);
        if (!tSlug || tSlug.length < 3) continue;
        // Match si le slug du token est un préfixe d'un slug de sport (rugby -> rugby a xv, rugby a 7, etc.)
        // OU si un slug de sport est un préfixe du token
        const matched = SPORTS.some(sp => {
          const sSlug = slug(sp.nom);
          return sSlug.startsWith(tSlug) || tSlug.startsWith(sSlug.substring(0, Math.max(4, tSlug.length)));
        });
        // Match aussi via DISC_TO_SPORT_HINTS (foot, ping, etc.)
        const matchedHint = Object.keys(DISC_TO_SPORT_HINTS).some(disc => {
          const dSlug = slug(disc);
          return dSlug.startsWith(tSlug) || tSlug.startsWith(dSlug.substring(0, Math.max(4, tSlug.length)));
        });
        // Bonus mots-clés communs
        const KEYWORDS_SPORT = ['foot','rugby','boxe','tennis','natation','basket','hand','volley',
          'judo','karate','escalade','danse','golf','ski','snowboard','aviron','voile','plongee',
          'cyclisme','velo','course','running','triathlon','gym','yoga','pilates','fitness',
          'crossfit','arts','aikido','escrime','tir','peche'];
        const matchedKw = KEYWORDS_SPORT.some(kw => tSlug.startsWith(kw) || kw.startsWith(tSlug));
        if (matched || matchedHint || matchedKw) sportTokenSet.add(i);
      }
    }

    // 3) Calcule les tokens "non-sport non-dept" -> candidats pour géocodage (ville/adresse)
    const cityTokens = tokens.filter((_, i) => !depTokensIdx.includes(i) && !sportTokenSet.has(i));
    const sportTokens = tokens.filter((_, i) => sportTokenSet.has(i));
    const cityQuery = cityTokens.join(' ').trim();

    // 4) Tentative géocodage de la partie ville
    let cityPosition = null;
    let cityLabel = null;
    let cityDept = null;
    if (!detectedDept && cityQuery && /[a-zA-Z]{3,}/.test(cityQuery)) {
      try {
        const geo = await geocodeCP(cityQuery);
        if (geo && geo.lat && !geo.fallback) {
          cityPosition = { lat: geo.lat, lon: geo.lon };
          cityLabel = geo.label || cityQuery;
          cityDept = geo.depCode;
        }
      } catch (e) { /* silent */ }
    }

    // 5) Sport final
    let sportQuery = sportTokens.join(' ').trim();
    // Si on n'a rien classé comme sport mais qu'on a un dept et que la chaîne entière est "Foot Savoie",
    // on tente de prendre tout ce qui n'est PAS dept comme sport (cas où KEYWORDS_SPORT n'a pas matché)
    if (!sportQuery && detectedDept && !cityPosition) {
      const remaining = tokens.filter((_, i) => !depTokensIdx.includes(i)).join(' ').trim();
      if (remaining) sportQuery = remaining;
    }
    // Si on n'a aucun sport ni ville reconnue, et qu'il reste du texte, c'est probablement un sport inconnu
    if (!sportQuery && !cityPosition && !detectedDept && cityQuery) sportQuery = cityQuery;
    // Stack avec sportFilter additionnel (UI)
    if (extraSportFilter) sportQuery = sportQuery ? `${sportQuery} ${extraSportFilter}` : extraSportFilter;

    // ── Branchement selon ce qu'on a détecté ──

    // A. On a une ville géocodée -> retour clubs autour de la ville (avec maxDistance si fourni)
    if (cityPosition) {
      const userPos = { lat: cityPosition.lat, lon: cityPosition.lon, depCode: cityDept, label: cityLabel };
      const result = await findClubs({
        answers, location: userPos, sportFilter: sportQuery,
        limit, maxDistance: fixedRadius || 25, // défaut 25km autour d'une ville
        minResults: opts.minResults || MIN_RESULTS,
      });
      return {
        ...result,
        parsed: {
          sport: sportQuery || null,
          depCode: cityDept, depName: cityDept && DEPT_CENTERS[cityDept] ? DEPT_CENTERS[cityDept].nom : null,
          cityLabel, position: cityPosition,
        },
      };
    }

    // B. On a un département -> retour clubs du dept (sans rayon strict)
    if (detectedDept && typeof DEPT_CENTERS !== 'undefined') {
      const center = DEPT_CENTERS[detectedDept];
      const userPos = { lat: center.lat, lon: center.lon, depCode: detectedDept, label: center.nom };
      const result = await findClubs({
        answers, location: userPos, sportFilter: sportQuery, limit,
        maxDistance: fixedRadius, // si pas fourni, élargissement par tier automatique
        minResults: opts.minResults || MIN_RESULTS,
      });
      return {
        ...result,
        parsed: { sport: sportQuery || null, depCode: detectedDept, depName: center.nom, cityLabel: null, position: null },
      };
    }

    // C. Sport pur (rugby) sans aucune localisation -> national large
    if (sportQuery) {
      const clubs = await _topBySportNational(sportQuery, answers, limit);
      return {
        clubs, radius_km: null, total_in_radius: clubs.length,
        fallback_message: `${clubs.length} clubs "${sportQuery}" en France. Ajoute une ville pour voir la distance.`,
        parsed: { sport: sportQuery, depCode: null, depName: null, cityLabel: null, position: null },
      };
    }

    // D. Aucun token reconnu -> top national générique
    const fallback = await _topByFitNational(answers, null, limit);
    return {
      clubs: fallback, radius_km: null, total_in_radius: fallback.length,
      fallback_message: `Recherche "${query}" non reconnue. Voici le top national.`,
      parsed: { sport: null, depCode: null, depName: null, cityLabel: null, position: null },
    };
  }

  // ─── Sélection vitrine (page d'accueil sans requête ni localisation) ───
  // Retourne `limit` clubs issus de sports différents (1 club par disc),
  // classés par qualité d'enrichissement, depuis un échantillon de départements
  // incluant la Savoie (mieux enrichie) et les grands centres urbains.
  async function findShowcaseClubs(answers, limit) {
    limit = limit || 30;
    answers = answers || {};

    // Savoie en tête (plus enrichie) + grands depts pour la diversité sportive
    const SHOWCASE_DEPTS = [
      '73', '74', '01',                             // Savoie / Haute-Savoie / Ain
      '75', '13', '69', '31', '33', '59', '44',    // grandes villes
      '38', '67', '34', '06', '78', '92',           // Grenoble, Stras, Montpellier, Nice, Île-de-France
      '63', '76', '54', '49', '57',                 // Clermont, Rouen, Nancy, Angers, Metz
    ];

    let pool = [];
    for (const d of SHOWCASE_DEPTS) {
      pool = pool.concat(await loadDept(d));
    }

    // Score d'enrichissement pur (qualité de la fiche)
    function enrichScore(club) {
      let s = 0;
      if (club.tel)    s += 3;
      if (club.email)  s += 3;
      if (club.web)    s += 2;
      if (club.instagram || club.facebook || club.tiktok) s += 2;
      if (Array.isArray(club.equipes) && club.equipes.length > 0) s += 2;
      if (club.enrichi_par === 'club_self') s += 5;
      return s;
    }

    // Score combiné : enrichissement (fort) + fit quiz (léger)
    const scored = pool.map(c => {
      const enrich = enrichScore(c);
      const fit    = _fitScore(c, answers);
      return { ...c, _enrich: enrich, _fit: fit, _score: enrich * 5 + fit * 0.4, _distance: null };
    }).sort((a, b) => b._score - a._score);

    // Phase 1 : 1 club par disc, enrichissement minimal requis (tel OU email OU web)
    const seenDiscs = new Set();
    const showcase  = [];
    for (const club of scored) {
      if (showcase.length >= limit) break;
      if (!club.tel && !club.email && !club.web) continue;
      const disc = club.disc || 'autre';
      if (!seenDiscs.has(disc)) { seenDiscs.add(disc); showcase.push(club); }
    }

    // Phase 2 : compléter avec des discs manquants si pas assez de clubs enrichis
    if (showcase.length < limit) {
      for (const club of scored) {
        if (showcase.length >= limit) break;
        const disc = club.disc || 'autre';
        if (!seenDiscs.has(disc)) { seenDiscs.add(disc); showcase.push(club); }
      }
    }

    return {
      clubs: showcase,
      radius_km: null,
      fallback_message: `Sélection · ${showcase.length} sports différents · Clubs bien référencés`,
      total_in_radius: showcase.length,
    };
  }

  // ─── Expose API ───
  window.KineticClubs = {
    findClubs,
    searchClubs,
    geolocate,
    geocodeCP,
    loadDept,
    findShowcaseClubs,
    // utils exposés pour debug / UI
    haversine,
    resolveClubSport: _resolveClubSport,
    fitScore: _fitScore,
    RADIUS_TIERS,
    DISC_TO_SPORT_HINTS,
  };
})();
