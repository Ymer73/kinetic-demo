// fed-photos.js — Mapping fédération → photo Unsplash (libre de droits)
// Généré automatiquement par scraping Unsplash • MAJ: mai 2026
//
// Format URL : https://images.unsplash.com/{photo-id}?auto=format&fit=crop&w=800&h=400&q=80
// Chaque sport d'une même fédération partage la même photo.
// Lookup : sport.meta?.fedSlug  OU  sport.fed?.toLowerCase()

const FED_PHOTOS = {
  // ── SPORTS COLLECTIFS ─────────────────────────────────────────────
  'fff':        'photo-1574629810360-7efbbe195018', // football – joueur en action
  'ffr':        'photo-1512299286776-c18be8ed6a1a', // rugby – équipe en jeu
  'ffrxiii':    'photo-1512299286776-c18be8ed6a1a', // rugby XIII → même photo
  'ffrh':       'photo-1547054731-f9974ff86ece',    // rink hockey → ice hockey
  'ffbb':       'photo-1577471488278-16eec37ffcc2', // basketball – court indoor
  'ffhandball': 'photo-1584196825674-e6f64590b914', // handball – action
  'ffhb':       'photo-1584196825674-e6f64590b914', // handball (alias)
  'ffvb':       'photo-1521138054413-5a47d349b7af', // volleyball – beach
  'ffvolley':   'photo-1521138054413-5a47d349b7af', // (alias)
  'ffhockey':   'photo-1537740544208-8c0246fdfc05', // hockey gazon – femmes
  'ffhg':       'photo-1547054731-f9974ff86ece',    // hockey glace – joueurs
  'ffbs':       'photo-1476525223214-c31ff100e1ae',  // baseball → sport collectif dynamique
  'ftf':        'photo-1584196825674-e6f64590b914', // touch football
  'ffl':        'photo-1584196825674-e6f64590b914', // lacrosse
  'fftb':       'photo-1521138054413-5a47d349b7af', // tchoukball
  'ffnetball':  'photo-1577471488278-16eec37ffcc2', // netball
  'qbf':        'photo-1584196825674-e6f64590b914', // quadball
  'fffg':       'photo-1512299286776-c18be8ed6a1a', // sports gaéliques
  'affa':       'photo-1574629810360-7efbbe195018', // football australien
  'ffdf':       'photo-1725724642839-8a9694a4892c', // ultimate frisbee – action disque en plein air

  // ── RAQUETTE ──────────────────────────────────────────────────────
  'fft':        'photo-1554068865-24cecd4e34b8',    // tennis – joueur en action
  'fftennis':   'photo-1554068865-24cecd4e34b8',    // tennis (alias k-data)
  'ffbad':      'photo-1722087642932-9b070e9a066e', // badminton – saut smash
  'fftt':       'photo-1461748659110-16121c049d52',  // tennis de table – match
  'ffsquash':   'photo-1554068865-24cecd4e34b8',    // squash → tennis comme fallback

  // ── AQUATIQUE ─────────────────────────────────────────────────────
  'ffn':        'photo-1530549387789-4c1017266635', // natation – papillon
  'ffnatation': 'photo-1530549387789-4c1017266635', // (alias k-data)
  'ffck':       'photo-1709657179878-5c3e732a7832', // canoë-kayak
  'ffaviron':   'photo-1777024486772-d1a9b311c076', // aviron – compétition
  'ffv':        'photo-1605387202149-47169c4ea58a', // voile – voilier mer
  'ffvoile':    'photo-1605387202149-47169c4ea58a', // (alias)
  'ffvb_water': 'photo-1530549387789-4c1017266635', // natation synchronisée
  'ffss':       'photo-1530549387789-4c1017266635', // sauvetage → natation
  'ffsn':       'photo-1526342122811-2a9c8512023d', // ski nautique → surf
  'ffmnautique':'photo-1605387202149-47169c4ea58a', // motonautique → voile

  // ── GLISSE ────────────────────────────────────────────────────────
  'ffski':      'photo-1565992441121-4367c2967103', // ski – saut/poudreuse
  'ffs':        'photo-1565992441121-4367c2967103', // (alias)
  'ffsg':       'photo-1557398622-b1a9f9a89f8c',    // patinage artistique
  'ffhg_glace': 'photo-1547054731-f9974ff86ece',    // hockey glace
  'ffrsg':      'photo-1551632811-561732d1e306',    // roller/glisse → montagne
  'ffroller':   'photo-1551632811-561732d1e306',    // roller
  'ffsurf':     'photo-1526342122811-2a9c8512023d', // surf – vague

  // ── INDIVIDUAL / ENDURANCE ────────────────────────────────────────
  'ffa':        'photo-1502904550040-7534597429ae', // athlétisme – stade
  'ffcyclisme': 'photo-1516147697747-02adcafd3fda', // cyclisme – peloton
  'ffc':        'photo-1516147697747-02adcafd3fda', // (alias)
  'ffct':       'photo-1516147697747-02adcafd3fda', // cyclotourisme
  'fftri':      'photo-1576858574144-9ae1ebcf5ae5', // triathlon – vélo
  'ffrp':       'photo-1551632811-561732d1e306',    // randonnée – montagne
  'ffrando':    'photo-1551632811-561732d1e306',    // (alias)
  'ffme':       'photo-1536639070539-43ec572aca6d', // escalade – mur
  'ffcam':      'photo-1536639070539-43ec572aca6d', // montagne/alpinisme
  'ffco':       'photo-1551632811-561732d1e306',    // course orientation

  // ── COMBAT & ARTS MARTIAUX ────────────────────────────────────────
  'ffjudo':     'photo-1564415315949-7a0c4c73aab4', // judo – combat tatami
  'ffjda':      'photo-1564415315949-7a0c4c73aab4', // FFJDA (alias)
  'ffkda':      'photo-1514050566906-8d077bae7046', // karaté – kata
  'ffkama':     'photo-1514050566906-8d077bae7046', // (alias)
  'fftk':       'photo-1476525223214-c31ff100e1ae', // taekwondo – silhouette kick
  'fftda':      'photo-1476525223214-c31ff100e1ae', // (alias)
  'ffboxe':     'photo-1506799699865-4c8d6491b32b', // boxe – ring avec gants
  'ffsbf':      'photo-1506799699865-4c8d6491b32b', // savate boxe française
  'ffkbmda':    'photo-1476525223214-c31ff100e1ae', // kick boxing
  'ffmtda':     'photo-1476525223214-c31ff100e1ae', // muay thaï
  'fmmaf':      'photo-1506799699865-4c8d6491b32b', // MMA
  'ffescrime':  'photo-1505619656705-59ebc350b547', // escrime – salle
  'fflutte':    'photo-1541337082051-5959dbb57d5d', // lutte – combat sol
  'ffaaa':      'photo-1564415315949-7a0c4c73aab4', // aïkido → judo
  'ffab':       'photo-1564415315949-7a0c4c73aab4', // aïkibudo
  'faemc':      'photo-1514050566906-8d077bae7046', // arts énergétiques
  'ffwushu':    'photo-1514050566906-8d077bae7046', // wushu/kung-fu
  'ffcapoeira': 'photo-1508700929628-666bc8bd84ea', // capoeira → danse
  'cfjjb':      'photo-1564415315949-7a0c4c73aab4', // jiu-jitsu brésilien
  'ffamhe':     'photo-1505619656705-59ebc350b547', // arts martiaux historiques
  'ffgouren':   'photo-1541337082051-5959dbb57d5d', // gouren (lutte bretonne)
  'ffvvvd':     'photo-1514050566906-8d077bae7046', // vovinam viet vo dao
  'ffnanbudo':  'photo-1514050566906-8d077bae7046', // nanbudo

  // ── FORME / GYM ───────────────────────────────────────────────────
  'ffy':        'photo-1518611012118-696072aa579a', // yoga (k-data.js alias FFY)
  'ffepgv':     'photo-1505619730259-b1288d154955', // gym suédoise – gymnastics
  'ffgym':      'photo-1505619730259-b1288d154955', // gymnaste
  'ffhm':       'photo-1541337082051-5959dbb57d5d', // haltérophilie → corps
  'ffhmfac':    'photo-1541337082051-5959dbb57d5d', // (alias)
  'ffds':       'photo-1508700929628-666bc8bd84ea', // danse sportive
  'ffdanse':    'photo-1508700929628-666bc8bd84ea', // (alias)
  'ffstb':      'photo-1505619730259-b1288d154955', // twirling bâton → gymnastics
  'fney':       'photo-1518611012118-696072aa579a', // yoga – group cours

  // ── ÉQUESTRE ──────────────────────────────────────────────────────
  'ffe':        'photo-1589400867230-3491ceee2934', // équitation – cheval plage
  'ffpolo':     'photo-1589400867230-3491ceee2934', // polo
  'ffst':       'photo-1589400867230-3491ceee2934', // sports de traîneau

  // ── PRÉCISION / TIR ───────────────────────────────────────────────
  'ffta':       'photo-1643538146589-350d289182e8', // tir à l'arc – femme arc
  'fftir':      'photo-1476260681402-d50fe4c9a9b3', // tir sportif
  'ffbt':       'photo-1476260681402-d50fe4c9a9b3', // ball-trap → tir
  'ffcc':       'photo-1574629810360-7efbbe195018', // cricket → sport collectif

  // ── GOLF ──────────────────────────────────────────────────────────
  'ffgolf':     'photo-1591491680738-eae9159fced6', // golf – swing

  // ── AÉRIEN ────────────────────────────────────────────────────────
  'ffvl':       'photo-1526342122811-2a9c8512023d', // vol libre → surf (ciel/air)
  'ffplum':     'photo-1526342122811-2a9c8512023d', // ULM
  'ffvp':       'photo-1605387202149-47169c4ea58a', // vol à voile → voile
  'ffvv':       'photo-1605387202149-47169c4ea58a', // (alias)
  'ffaaro':     'photo-1526342122811-2a9c8512023d', // aéronautique
  'ffam':       'photo-1526342122811-2a9c8512023d', // aéromodélisme
  'ffcv':       'photo-1526342122811-2a9c8512023d', // char à voile

  // ── MOTEUR ────────────────────────────────────────────────────────
  'ffsa':       'photo-1516147697747-02adcafd3fda', // sport auto → vitesse
  'ffm':        'photo-1516147697747-02adcafd3fda', // moto
  'ffmoto':     'photo-1516147697747-02adcafd3fda', // (alias)
  'ffmnautique':'photo-1605387202149-47169c4ea58a', // motonautique

  // ── BOULES / PELOTE ───────────────────────────────────────────────
  'ffsb':       'photo-1476260681402-d50fe4c9a9b3', // sport boules → précision
  'ffboules':   'photo-1476260681402-d50fe4c9a9b3', // boules
  'ffpb':       'photo-1476260681402-d50fe4c9a9b3', // pelote basque
  'fflp':       'photo-1476260681402-d50fe4c9a9b3', // longue paume

  // ── SPORTS NAUTIQUES ──────────────────────────────────────────────
  'ffessm':     'photo-1530549387789-4c1017266635', // plongée → natation

  // ── DIVERS ────────────────────────────────────────────────────────
  'ffbsq':      'photo-1461748659110-16121c049d52',  // bowling/quilles → table tennis
  'ffbillard':  'photo-1461748659110-16121c049d52',  // billard
  'ffpm':       'photo-1576858574144-9ae1ebcf5ae5', // pentathlon → triathlon
  'ffechecs':   'photo-1580541832626-2a7131ee809f', // échecs → échiquier
  'ffbridge':   'photo-1476260681402-d50fe4c9a9b3', // bridge
  'ffjd':       'photo-1476260681402-d50fe4c9a9b3', // dames
  'ffgo':       'photo-1476260681402-d50fe4c9a9b3', // go
  'ffsc':       'photo-1476260681402-d50fe4c9a9b3', // scrabble
  'ffbg':       'photo-1476260681402-d50fe4c9a9b3', // backgammon
  'ffcb':       'photo-1506799699865-4c8d6491b32b', // chess boxing
  'fffe':       'photo-1476260681402-d50fe4c9a9b3', // fléchettes
  'afst':       'photo-1584196825674-e6f64590b914', // sepak takraw
  'fca':        'photo-1584196825674-e6f64590b914', // cornhole
  'fffforce':   'photo-1541337082051-5959dbb57d5d', // force athlétique
  'ffh':        'photo-1577471488278-16eec37ffcc2', // handisport → basketball en fauteuil
  'scc':        'photo-1589400867230-3491ceee2934', // cynophile → cheval (animaux)
  'cneac':      'photo-1589400867230-3491ceee2934', // agility canine
  'fnsmr':      'photo-1551632811-561732d1e306',    // sport rural → nature
  'ffappma':    'photo-1530549387789-4c1017266635', // pêche → eau
  'lfrxiii':    'photo-1512299286776-c18be8ed6a1a', // ligue rugby XIII
};

// Base URL Unsplash CDN (libre de droits, aucune attribution requise)
const FED_UNSPLASH_BASE = 'https://images.unsplash.com/';
const FED_UNSPLASH_PARAMS = '?auto=format&fit=crop&w=800&h=400&q=80';

/**
 * Retourne l'URL de la photo Unsplash pour un sport.
 * @param {Object} sport - objet sport de data.js (meta.fedSlug) ou k-data.js (fed)
 * @returns {string|null} URL photo ou null si aucune photo trouvée
 */
function getFedPhoto(sport) {
  if (!sport) return null;
  // Priorité 1 : fedSlug de data.js
  const slug1 = sport.meta?.fedSlug;
  if (slug1 && FED_PHOTOS[slug1]) {
    return FED_UNSPLASH_BASE + FED_PHOTOS[slug1] + FED_UNSPLASH_PARAMS;
  }
  // Priorité 2 : fed de k-data.js (en minuscules)
  const slug2 = sport.fed?.toLowerCase().replace(/\s+/g, '');
  if (slug2 && FED_PHOTOS[slug2]) {
    return FED_UNSPLASH_BASE + FED_PHOTOS[slug2] + FED_UNSPLASH_PARAMS;
  }
  // Priorité 3 : acronyme dans meta
  const slug3 = sport.meta?.acronyme?.toLowerCase().replace(/\s+/g, '');
  if (slug3 && FED_PHOTOS[slug3]) {
    return FED_UNSPLASH_BASE + FED_PHOTOS[slug3] + FED_UNSPLASH_PARAMS;
  }
  return null;
}
