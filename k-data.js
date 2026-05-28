// Kinetic — shared data set: sports, categories, federations (extrait du mockup hi-fi).
// Utilisé par trouver-club.html et explorer-sports.html.

const CATEGORIES = [
  { id:'collectif',   name:'Collectif',     icon:'🤝', accent:'var(--km-violet)', desc:"Tu joues avec, pas contre." },
  { id:'combat',      name:'Combat',        icon:'🥋', accent:'var(--km-ink)',    desc:"Recevoir un coup, éviter d'en donner." },
  { id:'aquatique',   name:'Aquatique',     icon:'🌊', accent:'#37a3d6',          desc:"L'eau qui amortit, qui résiste, qui porte." },
  { id:'nature',      name:'Plein air',     icon:'🌳', accent:'#3aa45e',          desc:"Le vent, le froid, la météo qui décide." },
  { id:'verticale',   name:'Verticale',     icon:'🧗', accent:'var(--km-orange)', desc:"Grimper, résoudre des problèmes." },
  { id:'mind',        name:'Mind & body',   icon:'🧘', accent:'var(--km-lime-deep)', desc:"Souffle, posture, présence." },
  { id:'cycle',       name:'Cycle',         icon:'🚴', accent:'var(--km-violet)', desc:"Vélo, gravel, VTT — le plaisir des roues." },
  { id:'precision',   name:'Précision',     icon:'🎯', accent:'#0e0b1f',          desc:"Geste juste, concentration totale." },
  { id:'raquette',    name:'Raquette',      icon:'🎾', accent:'#37a3d6',          desc:"L'art du timing et de la frappe." },
  { id:'aerien',      name:'Aérien',        icon:'🪂', accent:'#a35cff',          desc:"Quitter le sol, jouer avec le vent." },
  { id:'glisse',      name:'Glisse',        icon:'⛷️', accent:'#7ec8e3',          desc:"Neige, asphalte, vagues — glisser." },
  { id:'forme',       name:'Forme',         icon:'💪', accent:'var(--km-orange)', desc:"Gainage, force, cardio en salle." },
  { id:'para',        name:'Para sport',    icon:'♿', accent:'var(--km-violet)', desc:"Le sport adapté, accessible à tous." },
];

const K_SPORTS = [
  // Mind & body
  { id:'yoga',         name:'Yoga vinyasa',     fed:'FFY',      cat:'mind',      intensity:2, level:'tout', budget:240, clubs:1850, season:'an',     glyph:'🧘', tagline:'Souffle, flow, force. La pratique douce qui tonifie et débobine la tête en 60 min.', match:94, trend:'+12%', tags:['indoor','souplesse','débutant'], img:'lime'   },
  { id:'pilates',      name:'Pilates',          fed:'FFEPGV',   cat:'mind',      intensity:2, level:'tout', budget:360, clubs:920,  season:'an',     glyph:'🤸', tagline:'Gainage profond, posture, respiration. Idéal après une blessure ou pour reprendre.', match:86, trend:'+8%',  tags:['indoor','dos','santé'], img:'violet' },
  { id:'taichi',       name:'Tai-chi-chuan',    fed:'FFKDA',    cat:'mind',      intensity:1, level:'tout', budget:200, clubs:380,  season:'an',     glyph:'☯️', tagline:'Méditation en mouvement. L\'art interne chinois pour ralentir le mental.', match:68, trend:'+2%',  tags:['doux','méditation'], img:'lime'   },
  // Combat
  { id:'judo',         name:'Judo',             fed:'FFJudo',   cat:'combat',    intensity:3, level:'tout', budget:280, clubs:5630, season:'an',     glyph:'🥋', tagline:'L\'art japonais du déséquilibre. Solide pédagogie pour enfants & ados.', match:64, trend:'stable', tags:['enfant','discipline'], img:'dark'   },
  { id:'boxe',         name:'Boxe anglaise',    fed:'FFBoxe',   cat:'combat',    intensity:4, level:'tout', budget:340, clubs:1340, season:'an',     glyph:'🥊', tagline:'Sport-cardio total. Tape un sac, échappe à des frappes. Défoule pur.', match:82, trend:'+18%', tags:['cardio','défoule'], img:'orange' },
  { id:'kravmaga',     name:'Krav-maga',        fed:'FFKDA',    cat:'combat',    intensity:4, level:'tout', budget:420, clubs:240,  season:'an',     glyph:'⚡', tagline:'Self-défense moderne, pragmatique, sans katas. Pour adultes.', match:73, trend:'+22%', tags:['adulte','self-défense','nouveau'], img:'dark'   },
  { id:'aikido',       name:'Aïkido',           fed:'FFAB',     cat:'combat',    intensity:2, level:'tout', budget:260, clubs:520,  season:'an',     glyph:'🥋', tagline:'L\'art martial doux : tu utilises la force de l\'autre, pas la tienne.', match:62, trend:'-3%',  tags:['doux','japonais'], img:'violet' },
  // Verticale
  { id:'escalade',     name:'Escalade en salle',fed:'FFME',     cat:'verticale', intensity:3, level:'débutant', budget:420, clubs:680,  season:'an',  glyph:'🧗', tagline:'Murs colorés, problèmes à résoudre. Aussi de la tête que des bras.', match:88, trend:'+24%', tags:['indoor','mental','jeu'], img:'orange' },
  { id:'bloc',         name:'Bloc outdoor',     fed:'FFME',     cat:'verticale', intensity:4, level:'débutant', budget:240, clubs:486,  season:'été',  glyph:'⛰️', tagline:'Grimpe sans corde sur des blocs de 4-5m, sur tapis. Force + analyse.', match:91, trend:'+34%', tags:['outdoor','intense','été'], img:'dark'   },
  // Endurance & nature
  { id:'trail',        name:'Trail running',    fed:'FFA',      cat:'nature',    intensity:4, level:'tout', budget:120, clubs:1620, season:'an',     glyph:'🏃', tagline:'Courir hors-piste. Forêts, sentiers, montagnes. Sortir respirer.', match:82, trend:'+16%', tags:['outdoor','endurance','liberté'], img:'lime'   },
  { id:'marche',       name:'Marche nordique',  fed:'FFA',      cat:'nature',    intensity:3, level:'tout', budget:90,  clubs:612,  season:'an',     glyph:'🚶', tagline:'90% des muscles bossent, 50% des calories d\'un footing. Sortie potes.', match:78, trend:'+9%',  tags:['outdoor','doux','social'], img:'lime'   },
  { id:'rando',        name:'Randonnée',        fed:'FFRP',     cat:'nature',    intensity:2, level:'tout', budget:80,  clubs:3120, season:'an',     glyph:'🥾', tagline:'L\'activité française par excellence. Tu marches, tu regardes, tu sens.', match:70, trend:'stable', tags:['outdoor','doux','famille'], img:'lime'   },
  { id:'vtt',          name:'VTT',              fed:'FFC',      cat:'cycle',     intensity:4, level:'intermédiaire', budget:200, clubs:1810, season:'an', glyph:'🚵', tagline:'Sentiers, descentes, montées. Le freeride moderne, accessible.', match:76, trend:'+11%', tags:['outdoor','vitesse','sensations'], img:'orange' },
  // Cycle
  { id:'velo',         name:'Cyclisme route',   fed:'FFC',      cat:'cycle',     intensity:3, level:'intermédiaire', budget:240, clubs:2820, season:'an', glyph:'🚴', tagline:'Asphalte, watts, group rides. La passion qui scelle des amitiés.', match:74, trend:'+7%', tags:['outdoor','endurance'], img:'orange' },
  // Aquatique
  { id:'natation',     name:'Natation',         fed:'FFNatation',cat:'aquatique', intensity:3, level:'tout', budget:180, clubs:1480, season:'an',    glyph:'🏊', tagline:'Sport complet, doux pour les articulations. Le sport-santé classique.', match:74, trend:'stable', tags:['indoor','santé','famille'], img:'violet' },
  { id:'aviron',       name:'Aviron',           fed:'FFSA',     cat:'aquatique', intensity:4, level:'débutant', budget:280, clubs:148,  season:'avr-oct', glyph:'🚣', tagline:'Sport complet, mental d\'acier. Lac & rivière. Saison printemps-été.', match:71, trend:'+6%',  tags:['outdoor','mental','rare'], img:'lime'   },
  { id:'voile',        name:'Voile',            fed:'FFV',      cat:'aquatique', intensity:3, level:'débutant', budget:680, clubs:580,  season:'avr-oct', glyph:'⛵', tagline:'Mer, vent, équipage. Plus tactique que physique. La vie de marin.', match:65, trend:'+4%',  tags:['outdoor','tactique'], img:'violet' },
  { id:'paddleyoga',   name:'Yoga sur paddle',  fed:'FFCK',     cat:'aquatique', intensity:2, level:'tout', budget:280, clubs:84,   season:'mai-sep', glyph:'🏄', tagline:'Yoga sur un paddle, sur un lac. Hyper instagrammable, hyper relaxant.', match:80, trend:'+47%', tags:['outdoor','été','nouveau'], img:'lime'   },
  // Raquette
  { id:'tennis',       name:'Tennis',           fed:'FFTennis', cat:'raquette',  intensity:3, level:'tout', budget:380, clubs:8220, season:'an',     glyph:'🎾', tagline:'Le classique. 8k clubs en France. Tu trouves un partenaire partout.', match:72, trend:'+5%',  tags:['indoor','outdoor','classique'], img:'violet' },
  { id:'padel',        name:'Padel',            fed:'FFTennis', cat:'raquette',  intensity:3, level:'tout', budget:280, clubs:1842, season:'an',     glyph:'🎾', tagline:'Le sport qui explose. Mix tennis + squash. Très social.', match:84, trend:'+220%', tags:['social','tendance','nouveau'], img:'violet' },
  { id:'pickleball',   name:'Pickleball',       fed:'FFTennis', cat:'raquette',  intensity:2, level:'tout', budget:180, clubs:120,  season:'an',     glyph:'🏓', tagline:'Tennis-ping pong-badminton, sur petit court. Très facile à débuter.', match:79, trend:'+220%', tags:['nouveau','accessible','tendance'], img:'lime'   },
  { id:'pingpong',     name:'Tennis de table',  fed:'FFTT',     cat:'raquette',  intensity:2, level:'tout', budget:140, clubs:2120, season:'an',     glyph:'🏓', tagline:'Réflexes, précision, accessible. Joue à 6 ans, joue à 80 ans.', match:68, trend:'stable', tags:['indoor','famille'], img:'orange' },
  // Collectif
  { id:'foot',         name:'Football',         fed:'FFF',      cat:'collectif', intensity:3, level:'tout', budget:200, clubs:14820,season:'sep-juin',glyph:'⚽', tagline:'Le sport-roi. 14k clubs, des terrains partout. Le rituel du samedi.', match:60, trend:'stable', tags:['outdoor','enfant','famille'], img:'lime'   },
  { id:'volley',       name:'Volley',           fed:'FFVB',     cat:'collectif', intensity:3, level:'tout', budget:220, clubs:1240, season:'sep-juin',glyph:'🏐', tagline:'Sport collectif, mixte, technique. Beach-volley l\'été en bonus.', match:75, trend:'+8%',  tags:['indoor','mixte'], img:'orange' },
  { id:'rugby',        name:'Rugby',            fed:'FFR',      cat:'collectif', intensity:5, level:'tout', budget:240, clubs:1810, season:'sep-juin',glyph:'🏉', tagline:'Contact, stratégie, troisième mi-temps. La famille rugby.', match:54, trend:'-2%',  tags:['outdoor','intense','contact'], img:'dark'   },
  { id:'basket',       name:'Basket-ball',      fed:'FFBB',     cat:'collectif', intensity:4, level:'tout', budget:220, clubs:4120, season:'sep-juin',glyph:'🏀', tagline:'Le sport collectif urbain. Indoor, intense, technique.', match:78, trend:'+6%',  tags:['indoor','urbain','jeune'], img:'orange' },
  { id:'handball',     name:'Handball',         fed:'FFHB',     cat:'collectif', intensity:4, level:'tout', budget:200, clubs:2480, season:'sep-juin',glyph:'🤾', tagline:'Sport collectif rapide, indoor. Très bonne école pour ados.', match:66, trend:'+4%',  tags:['indoor','ado'], img:'violet' },
  { id:'ultimate',     name:'Ultimate',         fed:'FFDF',     cat:'collectif', intensity:3, level:'tout', budget:140, clubs:234,  season:'an',     glyph:'🥏', tagline:'Frisbee de précision en équipe mixte. Pas d\'arbitre. +38% chez les 18-25.', match:88, trend:'+38%', tags:['outdoor','mixte','tendance'], img:'lime'   },
  // Forme
  { id:'crossfit',     name:'Crossfit',         fed:'Indép.',   cat:'forme',     intensity:5, level:'tout', budget:1080,clubs:480,  season:'an',     glyph:'🔥', tagline:'WOD quotidien, communauté forte. Tu pousses à fond, tu progresses vite.', match:70, trend:'+9%',  tags:['indoor','intense'], img:'orange' },
  { id:'gym',          name:'Gym suédoise',     fed:'FFEPGV',   cat:'forme',     intensity:3, level:'tout', budget:240, clubs:1320, season:'an',     glyph:'🤸', tagline:'Cours collectif en musique, type fitness. Bonne ambiance, hyper accessible.', match:64, trend:'+3%',  tags:['indoor','social','débutant'], img:'lime'   },
  // Cible
  { id:'tir',          name:'Tir à l\'arc',     fed:'FFTA',     cat:'precision', intensity:1, level:'tout', budget:280, clubs:680,  season:'an',     glyph:'🏹', tagline:'Concentration totale. Posture, souffle, geste juste. Le zen du tireur.', match:60, trend:'+5%',  tags:['indoor','outdoor','calme'], img:'violet' },
  // Aérien
  { id:'parapente',    name:'Parapente',        fed:'FFVL',     cat:'aerien',    intensity:3, level:'débutant', budget:1200, clubs:240,  season:'mai-oct', glyph:'🪂', tagline:'Voler en s\'élevant sur les thermiques. Liberté totale, peu de clubs.', match:62, trend:'+8%',  tags:['outdoor','rare','sensations'], img:'violet' },
];

const POPULAR_QUERIES = ['yoga','padel','escalade','trail','judo','foot','natation','crossfit'];
const POPULAR_CATS = ['collectif','combat','aquatique','nature','verticale','raquette','mind','forme'];

const REGIONS = [
  'Île-de-France','Auvergne-Rhône-Alpes','PACA','Occitanie','Nouvelle-Aquitaine',
  'Bretagne','Pays de la Loire','Grand Est','Hauts-de-France','Normandie',
  'Centre-Val de Loire','Bourgogne-FC','Corse','Outre-mer',
];

const FEDS = [
  { id:'ffj', name:'FF Judo',          sports:520,  desc:'5 630 clubs · Discipline japonaise mère.' },
  { id:'fft', name:'FF Tennis',        sports:8220, desc:'8 220 clubs · Tennis + padel + pickleball.' },
  { id:'ffme',name:'FF Montagne Escalade', sports:680,  desc:'1 166 clubs · Escalade, alpinisme, canyon.' },
  { id:'ffa', name:'FF Athlétisme',    sports:2210, desc:'2 210 clubs · Course, trail, marche, lancers.' },
  { id:'ffv', name:'FF Voile',         sports:580,  desc:'580 clubs · Dériveurs, croisière, planche.' },
  { id:'ffy', name:'FF Yoga',          sports:1850, desc:'1 850 clubs · Toutes traditions confondues.' },
];

window.K_DATA = Object.assign(window.K_DATA || {}, {
  CATEGORIES, SPORTS: K_SPORTS, POPULAR_QUERIES, POPULAR_CATS, REGIONS, FEDS
});
