// ─── KINETIC SPORT SEARCH ENGINE ──────────────────────────────────
// Recherche intelligente pour la grille de sports :
//   - tolérance aux fautes de frappe (distance Levenshtein)
//   - groupes de sports (foot → tous les footballs, voile → tous les sports voile, etc.)
//   - recherche sur nom, mots-clés, fédération, acronyme, catégorie
//   - scoring de pertinence (les plus proches en haut)
// ──────────────────────────────────────────────────────────────────

(function (global) {
  'use strict';

  // ─── Normalisation : minuscules, sans accents, sans ponctuation ───
  function normalize(str) {
    if (!str) return '';
    return String(str)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // ─── Distance de Levenshtein optimisée (single row) ───
  function levenshtein(a, b) {
    if (a === b) return 0;
    if (!a.length) return b.length;
    if (!b.length) return a.length;
    const al = a.length, bl = b.length;
    let prev = new Array(bl + 1);
    let curr = new Array(bl + 1);
    for (let j = 0; j <= bl; j++) prev[j] = j;
    for (let i = 1; i <= al; i++) {
      curr[0] = i;
      for (let j = 1; j <= bl; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        curr[j] = Math.min(
          curr[j - 1] + 1,
          prev[j] + 1,
          prev[j - 1] + cost
        );
      }
      [prev, curr] = [curr, prev];
    }
    return prev[bl];
  }

  // ─── Groupes de sports (familles) ───
  // Chaque clé est un alias possible, value = tableau de tokens à matcher dans le nom du sport
  // La recherche essaie d'abord les groupes (résultat exhaustif), puis fuzzy si aucun groupe
  const SPORT_GROUPS = {
    foot: ['football', 'foot', 'futsal', 'soccer', 'cecifoot', 'footgolf', 'footvolley', 'foot volley', 'gaelic'],
    football: ['football', 'foot', 'futsal', 'soccer', 'cecifoot', 'footgolf', 'footvolley', 'foot volley', 'gaelic'],
    futsal: ['futsal', 'football'],

    voile: ['voile', 'windsurf', 'kitesurf', 'wingfoil', 'planche', 'char a voile'],
    sailing: ['voile', 'windsurf', 'kitesurf', 'wingfoil'],
    bateau: ['voile', 'aviron', 'canoe', 'kayak', 'paddle'],

    tennis: ['tennis', 'padel', 'pickleball', 'squash', 'badminton', 'paddle tennis'],
    raquette: ['tennis', 'padel', 'pickleball', 'squash', 'badminton', 'racquetball'],
    paddle: ['padel', 'pickleball', 'sup', 'paddleboard', 'paddle'],
    padel: ['padel', 'paddle'],

    ski: ['ski', 'skimo', 'snowboard', 'saut a ski'],
    snowboard: ['snowboard', 'snowkite', 'snowboard cross'],
    glisse: ['ski', 'snowboard', 'surf', 'wakeboard', 'kitesurf', 'skate', 'roller'],
    neige: ['ski', 'snowboard', 'snowkite', 'biathlon', 'luge', 'bobsleigh', 'raquettes', 'snowshoeing', 'curling', 'patinage', 'hockey sur glace'],
    montagne: ['escalade', 'alpinisme', 'randonnee', 'ski', 'parapente', 'skimo', 'via ferrata', 'canyonisme'],

    surf: ['surf', 'bodysurf', 'longboard surf', 'wakesurf', 'sup', 'windsurf', 'kitesurf', 'wingfoil'],
    skate: ['skateboard', 'roller', 'longboard', 'wakeskate', 'inline'],
    roller: ['roller', 'skate', 'inline'],

    boxe: ['boxe', 'savate', 'kickboxing', 'muay thai', 'mma', 'krav maga', 'pancrace'],
    martial: ['judo', 'karate', 'taekwondo', 'aikido', 'bjj', 'jiu-jitsu', 'sambo', 'wushu', 'kung-fu', 'kata', 'mma', 'kickboxing', 'lutte', 'kendo', 'iaido'],
    'arts martiaux': ['judo', 'karate', 'taekwondo', 'aikido', 'bjj', 'jiu-jitsu', 'sambo', 'wushu', 'kung-fu', 'mma'],
    combat: ['boxe', 'judo', 'karate', 'taekwondo', 'mma', 'lutte', 'savate', 'escrime', 'kickboxing'],

    danse: ['danse', 'ballet', 'salsa', 'tango', 'hip-hop', 'breakdance', 'jazz', 'flamenco'],
    yoga: ['yoga', 'pilates', 'gym douce', 'tai chi', 'qi gong', 'mediation'],
    zen: ['yoga', 'pilates', 'tai chi', 'qi gong', 'mediation', 'echec'],

    velo: ['cyclisme', 'velo', 'vtt', 'bmx', 'cyclo'],
    bike: ['cyclisme', 'velo', 'vtt', 'bmx'],
    cyclisme: ['cyclisme', 'velo', 'vtt', 'bmx', 'cyclo'],
    vtt: ['vtt', 'cyclisme', 'mountain bike'],
    bmx: ['bmx', 'cyclisme'],

    moto: ['moto', 'motocross', 'enduro', 'trial', 'speedway', 'side-car', 'quad'],
    course: ['course', 'athletisme', 'trail', 'marathon', 'sprint', 'cross'],
    running: ['course', 'athletisme', 'trail', 'marathon', 'cross'],
    trail: ['trail', 'athletisme', 'cross', 'ultra'],

    escalade: ['escalade', 'alpinisme', 'bloc', 'via ferrata'],
    grimpe: ['escalade', 'alpinisme', 'bloc'],

    eau: ['natation', 'voile', 'aviron', 'canoe', 'kayak', 'plongee', 'surf', 'water polo', 'paddle', 'sup', 'kitesurf', 'windsurf', 'wakeboard'],
    aquatique: ['natation', 'voile', 'aviron', 'canoe', 'kayak', 'plongee', 'surf', 'water polo', 'paddle', 'sup'],
    piscine: ['natation', 'water polo', 'plongeon', 'aquagym', 'apnee', 'nage synchronisee'],
    plongee: ['plongee', 'apnee', 'snorkeling'],
    nage: ['natation', 'aquagym', 'nage synchronisee', 'apnee'],

    ballon: ['football', 'rugby', 'basketball', 'handball', 'volleyball', 'volley', 'foot', 'water polo', 'beach volley'],
    'sport co': ['football', 'rugby', 'basketball', 'handball', 'volleyball', 'hockey', 'baseball', 'cricket', 'lacrosse'],

    tir: ['tir', 'archerie', 'tir a l arc', 'biathlon', 'ball-trap', 'paintball'],
    arc: ['tir a l arc', 'tir', 'arc'],

    cheval: ['equitation', 'polo', 'horse-ball', 'voltige', 'attelage', 'endurance equestre'],
    equitation: ['equitation', 'polo', 'horse-ball', 'voltige', 'attelage'],

    aerien: ['parapente', 'parachute', 'vol a voile', 'planeur', 'ulm', 'kite', 'voltige aerienne'],
    vol: ['parapente', 'parachute', 'vol a voile', 'planeur', 'ulm', 'voltige aerienne'],

    fitness: ['fitness', 'crossfit', 'musculation', 'cardio', 'aerobic', 'zumba', 'hiit'],
    muscu: ['musculation', 'halterophilie', 'fitness', 'crossfit', 'powerlifting'],
    cardio: ['cardio', 'fitness', 'aerobic', 'zumba', 'hiit', 'course', 'velo'],

    petanque: ['petanque', 'boules'],
    boules: ['petanque', 'boules', 'bowling'],

    palet: ['palet'],
    fleche: ['flechettes', 'tir a l arc'],

    'sport mecanique': ['karting', 'moto', 'motocross', 'rallye', 'formule', 'auto'],
    rallye: ['rallye', 'motocross', 'enduro'],

    echecs: ['echecs', 'bridge', 'go', 'dames'],
    cerveau: ['echecs', 'bridge', 'go', 'dames'],

    handisport: ['cecifoot', 'goalball', 'handibasket', 'wheelchair'],
  };

  // ─── Préparation d'une "trace" de recherche pour chaque sport (cache léger) ───
  // On précalcule le texte normalisé concatené pour ne pas refaire à chaque keystroke.
  function prepSport(sport) {
    if (sport.__searchText) return sport.__searchText;
    const parts = [
      sport.nom,
      sport.cat,
      sport.meta?.acronyme,
      sport.meta?.federation,
      sport.meta?.motsCles,
    ].filter(Boolean);
    sport.__searchText = normalize(parts.join(' '));
    sport.__searchName = normalize(sport.nom);
    return sport.__searchText;
  }

  // ─── Cherche si la query matche un groupe ───
  // Retourne un tableau de tokens cibles, ou null si pas de groupe
  function resolveGroup(normalizedQuery) {
    // 1. Exact group key match
    if (SPORT_GROUPS[normalizedQuery]) return SPORT_GROUPS[normalizedQuery];
    // 2. Préfixe : si l'utilisateur tape "tenni" on veut quand même matcher "tennis"
    for (const key of Object.keys(SPORT_GROUPS)) {
      if (key.startsWith(normalizedQuery) && normalizedQuery.length >= 3) {
        return SPORT_GROUPS[key];
      }
    }
    // 3. Fuzzy léger : key proche du query (utile pour "tenis" → "tennis")
    if (normalizedQuery.length >= 4) {
      for (const key of Object.keys(SPORT_GROUPS)) {
        if (Math.abs(key.length - normalizedQuery.length) <= 2 && levenshtein(key, normalizedQuery) <= 1) {
          return SPORT_GROUPS[key];
        }
      }
    }
    return null;
  }

  // ─── Tolérance de typo en fonction de la longueur du mot ───
  function maxTypos(len) {
    if (len <= 3) return 0;
    if (len <= 5) return 1;
    if (len <= 8) return 2;
    return 3;
  }

  // ─── Score d'un sport face à un query ───
  // Plus le score est élevé, meilleur le match. 0 = pas de match.
  function scoreSport(sport, query) {
    prepSport(sport);
    const q = normalize(query);
    if (!q) return 1; // pas de query, tous matchent

    // 1. Match exact (le sport s'appelle exactement la query)
    if (sport.__searchName === q) return 1000;

    // 2. Match du nom commençant par la query
    if (sport.__searchName.startsWith(q)) return 800;

    // 3. Match d'un groupe : on cherche dans le nom les tokens du groupe
    const groupTokens = resolveGroup(q);
    if (groupTokens) {
      for (const tok of groupTokens) {
        const ntok = normalize(tok);
        if (sport.__searchName.includes(ntok)) return 700;
        // sinon on regarde dans l'index texte complet (mots-clés)
        if (sport.__searchText.includes(ntok)) return 500;
      }
    }

    // 4. Substring direct dans le nom
    if (sport.__searchName.includes(q)) return 600;

    // 5. Substring dans tout le texte indexé (mots-clés, fédé, acronyme, catégorie)
    if (sport.__searchText.includes(q)) return 400;

    // 6. Fuzzy par token : pour chaque mot de la query, chercher un mot proche dans le nom
    const qTokens = q.split(' ').filter(t => t.length >= 3);
    const sTokens = sport.__searchName.split(' ').filter(t => t.length >= 2);
    let fuzzyHits = 0;
    let bestFuzzy = 0;
    for (const qt of qTokens) {
      const tol = maxTypos(qt.length);
      for (const st of sTokens) {
        if (Math.abs(st.length - qt.length) > tol) continue;
        const d = levenshtein(qt, st);
        if (d <= tol) {
          fuzzyHits++;
          const sim = 100 - (d * 20);
          if (sim > bestFuzzy) bestFuzzy = sim;
          break;
        }
      }
    }
    if (fuzzyHits > 0) {
      return 200 + bestFuzzy + (fuzzyHits * 30);
    }

    // 7. Fuzzy contre le texte complet (mots-clés)
    const tTokens = sport.__searchText.split(' ').filter(t => t.length >= 4);
    for (const qt of qTokens) {
      const tol = maxTypos(qt.length);
      for (const tt of tTokens) {
        if (Math.abs(tt.length - qt.length) > tol) continue;
        if (levenshtein(qt, tt) <= tol) return 100;
      }
    }

    return 0;
  }

  // ─── Recherche complète : retourne les sports filtrés et triés par score ───
  function searchSports(sports, query, opts) {
    opts = opts || {};
    const q = normalize(query);
    if (!q) return sports.slice();

    const results = [];
    for (const sport of sports) {
      const score = scoreSport(sport, query);
      if (score > 0) results.push({ sport, score });
    }
    results.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.sport.nom.localeCompare(b.sport.nom, 'fr');
    });
    return results.map(r => r.sport);
  }

  // ─── Suggestions auto-complete pour le hero ───
  // Retourne max N suggestions courtes basées sur le query.
  function suggest(sports, query, max) {
    max = max || 6;
    const list = searchSports(sports, query);
    return list.slice(0, max);
  }

  global.KineticSearch = {
    normalize,
    levenshtein,
    scoreSport,
    searchSports,
    suggest,
    SPORT_GROUPS,
  };
})(typeof window !== 'undefined' ? window : globalThis);
