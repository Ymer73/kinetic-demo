// ─── KINETIC SHARED DISCIPLINES (source de vérité unique) ──
// Généré 2026-05-03 par Fix 7 audit.
// Pour chaque discipline (clé = slug kebab-case identique au champ 'disc' des JSON clubs) :
//   - label : libellé FR affiché à l'utilisateur
//   - emoji : emoji d'icône
//   - icon  : nom d'icône SVG (lib icons.js)
//   - cat   : catégorie pour groupement UI (DISC_CATS)
//   - sport_ids : (optionnel) IDs SPORTS[] de data.js qui retournent ce slug

const DISCIPLINES = {
  "aerien": {
    "label": "Sports aériens",
    "emoji": "✈️",
    "icon": "spark",
    "cat": "glisse",
    "sport_ids": [
      277,
      329
    ]
  },
  "aeromodelisme": {
    "label": "Aéromodélisme",
    "emoji": "🛩️",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      269
    ]
  },
  "aikido": {
    "label": "Aïkido",
    "emoji": "🏅",
    "icon": "target",
    "cat": "combat"
  },
  "airsoft": {
    "label": "Airsoft",
    "emoji": "🎯",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      433
    ]
  },
  "alpinisme": {
    "label": "Alpinisme",
    "emoji": "🏔️",
    "icon": "climb",
    "cat": "plein-air",
    "sport_ids": [
      27
    ]
  },
  "aquatique": {
    "label": "Sports aquatiques",
    "emoji": "🏅",
    "icon": "swim",
    "cat": "aqua"
  },
  "arts-martiaux": {
    "label": "Arts martiaux",
    "emoji": "🥋",
    "icon": "target",
    "cat": "combat",
    "sport_ids": [
      77,
      113,
      116,
      170,
      179,
      181,
      336,
      337,
      341,
      342,
      344,
      345,
      346
    ]
  },
  "athletics": {
    "label": "Athlétisme",
    "emoji": "🏃",
    "icon": "running",
    "cat": "plein-air"
  },
  "athletisme": {
    "label": "Athlétisme",
    "emoji": "🏃",
    "icon": "running",
    "cat": "plein-air",
    "sport_ids": [
      10,
      74,
      129
    ]
  },
  "aviron": {
    "label": "Aviron",
    "emoji": "🚣",
    "icon": "swim",
    "cat": "aqua",
    "sport_ids": [
      29
    ]
  },
  "backgammon": {
    "label": "Backgammon",
    "emoji": "🎲",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      352
    ]
  },
  "badminton": {
    "label": "Badminton",
    "emoji": "🏸",
    "icon": "tennis",
    "cat": "raquette",
    "sport_ids": [
      7
    ]
  },
  "ball-trap": {
    "label": "Ball trap",
    "emoji": "🏅",
    "icon": "spark",
    "cat": "autre"
  },
  "baseball-softball": {
    "label": "Baseball / Softball",
    "emoji": "⚾",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      39,
      237,
      238
    ]
  },
  "basketball": {
    "label": "Basket",
    "emoji": "🏀",
    "icon": "ball",
    "cat": "collectif",
    "sport_ids": [
      3,
      130
    ]
  },
  "biathlon": {
    "label": "Biathlon",
    "emoji": "🏅",
    "icon": "running",
    "cat": "plein-air"
  },
  "billard": {
    "label": "Billard",
    "emoji": "🎱",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      66
    ]
  },
  "bjj": {
    "label": "JJ Brésilien",
    "emoji": "🥋",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      248
    ]
  },
  "boules": {
    "label": "Pétanque",
    "emoji": "🎳",
    "icon": "target",
    "cat": "cible",
    "sport_ids": [
      35,
      187,
      188,
      217,
      244,
      374
    ]
  },
  "boulingrin": {
    "label": "Boulingrin",
    "emoji": "🎳",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      163
    ]
  },
  "bowling": {
    "label": "Bowling",
    "emoji": "🎳",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      65,
      106
    ]
  },
  "boxe": {
    "label": "Boxe",
    "emoji": "🥊",
    "icon": "target",
    "cat": "combat",
    "sport_ids": [
      15
    ]
  },
  "bridge": {
    "label": "Bridge",
    "emoji": "🃏",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      147
    ]
  },
  "canin": {
    "label": "Sport canin",
    "emoji": "🐕",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      296
    ]
  },
  "canoë-kayak": {
    "label": "Canoë-Kayak",
    "emoji": "🛶",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      30,
      88,
      89,
      90
    ]
  },
  "capoeira": {
    "label": "Capoeira",
    "emoji": "🕺",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      114
    ]
  },
  "char-a-voile": {
    "label": "Char à voile",
    "emoji": "⛵",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      309
    ]
  },
  "chess-boxing": {
    "label": "Chess-boxing",
    "emoji": "♟️",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      298
    ]
  },
  "cornhole": {
    "label": "Cornhole",
    "emoji": "🌽",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      174
    ]
  },
  "course-orientation": {
    "label": "Course d",
    "emoji": "🧭",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      49
    ]
  },
  "cricket": {
    "label": "Cricket",
    "emoji": "🏏",
    "icon": "ball",
    "cat": "collectif",
    "sport_ids": [
      168
    ]
  },
  "curling": {
    "label": "Curling",
    "emoji": "🏅",
    "icon": "spark",
    "cat": "autre"
  },
  "cyclisme": {
    "label": "Cyclisme",
    "emoji": "🚴",
    "icon": "spark",
    "cat": "plein-air",
    "sport_ids": [
      11,
      85
    ]
  },
  "cyclotourisme": {
    "label": "Cyclotourisme",
    "emoji": "🚴",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      262
    ]
  },
  "dames": {
    "label": "Jeu de dames",
    "emoji": "⛀",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      149
    ]
  },
  "danse": {
    "label": "Danse",
    "emoji": "💃",
    "icon": "spark",
    "cat": "danse",
    "sport_ids": [
      46,
      68,
      100,
      101,
      99,
      270
    ]
  },
  "default": {
    "label": "Default",
    "emoji": "🏅",
    "icon": "spark",
    "cat": "autre"
  },
  "disc": {
    "label": "Disc Golf",
    "emoji": "🥏",
    "icon": "spark",
    "cat": "plein-air",
    "sport_ids": [
      108
    ]
  },
  "disc-golf": {
    "label": "Disc Golf",
    "emoji": "🏅",
    "icon": "ball",
    "cat": "collectif"
  },
  "echecs": {
    "label": "Échecs",
    "emoji": "♟️",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      67,
      148
    ]
  },
  "equitation": {
    "label": "Équitation",
    "emoji": "🐎",
    "icon": "spark",
    "cat": "equestre",
    "sport_ids": [
      19,
      118,
      119,
      120,
      121
    ]
  },
  "escalade": {
    "label": "Escalade",
    "emoji": "🏅",
    "icon": "climb",
    "cat": "plein-air",
    "sport_ids": [
      26,
      279,
      280,
      399,
      400,
      145,
      224,
      397,
      401,
      398
    ]
  },
  "escrime": {
    "label": "Escrime",
    "emoji": "🤺",
    "icon": "target",
    "cat": "combat",
    "sport_ids": [
      17,
      442,
      443
    ]
  },
  "fistball": {
    "label": "Fistball",
    "emoji": "🤾",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      175
    ]
  },
  "fitness": {
    "label": "Fitness",
    "emoji": "💪",
    "icon": "flame",
    "cat": "forme",
    "sport_ids": [
      44,
      45,
      73,
      128,
      135,
      162,
      271,
      272,
      286,
      382,
      72
    ]
  },
  "flechettes": {
    "label": "Fléchettes",
    "emoji": "🏅",
    "icon": "target",
    "cat": "cible"
  },
  "flechettes-electroniques": {
    "label": "Fléchettes électroniques",
    "emoji": "🎯",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      191
    ]
  },
  "floorball": {
    "label": "Floorball",
    "emoji": "🏅",
    "icon": "ball",
    "cat": "collectif",
    "sport_ids": [
      79
    ]
  },
  "fléchettes": {
    "label": "Fléchettes",
    "emoji": "🎯",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      167,
      306
    ]
  },
  "football": {
    "label": "Football",
    "emoji": "⚽",
    "icon": "ball",
    "cat": "collectif",
    "sport_ids": [
      1,
      71,
      83,
      143,
      195,
      196,
      197,
      198,
      199,
      292
    ]
  },
  "football-americain": {
    "label": "Football US",
    "emoji": "🏈",
    "icon": "ball",
    "cat": "collectif",
    "sport_ids": [
      38
    ]
  },
  "football-australien": {
    "label": "Football australien",
    "emoji": "🏈",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      387
    ]
  },
  "force-athletique": {
    "label": "Force athlétique",
    "emoji": "🏋️",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      180
    ]
  },
  "frisbee-canin": {
    "label": "Frisbee canin",
    "emoji": "🥏",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      356
    ]
  },
  "gaelic-football": {
    "label": "Football gaélique",
    "emoji": "🏐",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      172
    ]
  },
  "go": {
    "label": "Jeu de Go",
    "emoji": "⚫",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      150
    ]
  },
  "golf": {
    "label": "Golf",
    "emoji": "⛳",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      20,
      190
    ]
  },
  "gym": {
    "label": "Gym",
    "emoji": "🤸",
    "icon": "spark",
    "cat": "forme",
    "sport_ids": [
      231,
      69,
      96,
      97,
      98,
      232,
      70
    ]
  },
  "halterophilie": {
    "label": "Haltérophilie",
    "emoji": "🏋️",
    "icon": "flame",
    "cat": "forme",
    "sport_ids": [
      160,
      161,
      240,
      381
    ]
  },
  "handball": {
    "label": "Handball",
    "emoji": "🤾",
    "icon": "ball",
    "cat": "collectif",
    "sport_ids": [
      4,
      293
    ]
  },
  "handisport": {
    "label": "Handisport",
    "emoji": "♿",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      132
    ]
  },
  "hema": {
    "label": "Arts martiaux historiques",
    "emoji": "⚔️",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      373
    ]
  },
  "hockey": {
    "label": "Hockey",
    "emoji": "🏒",
    "icon": "ball",
    "cat": "collectif"
  },
  "hockey-gazon": {
    "label": "Hockey gazon",
    "emoji": "🏑",
    "icon": "ball",
    "cat": "collectif",
    "sport_ids": [
      40
    ]
  },
  "horse-ball": {
    "label": "Horse-ball",
    "emoji": "🏅",
    "icon": "ball",
    "cat": "collectif"
  },
  "judo": {
    "label": "Judo",
    "emoji": "🥋",
    "icon": "target",
    "cat": "combat",
    "sport_ids": [
      12,
      117
    ]
  },
  "karate": {
    "label": "Karaté",
    "emoji": "🥋",
    "icon": "target",
    "cat": "combat",
    "sport_ids": [
      13,
      423
    ]
  },
  "karting": {
    "label": "Karting",
    "emoji": "🏅",
    "icon": "spark",
    "cat": "urbain"
  },
  "kendo": {
    "label": "Kendo",
    "emoji": "⚔️",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      112
    ]
  },
  "kickboxing": {
    "label": "Kickboxing",
    "emoji": "🥊",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      246
    ]
  },
  "korfball": {
    "label": "Korfball",
    "emoji": "🏀",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      111
    ]
  },
  "lacrosse": {
    "label": "Lacrosse",
    "emoji": "🥍",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      80,
      391
    ]
  },
  "longue-paume": {
    "label": "Longue Paume",
    "emoji": "🎾",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      105
    ]
  },
  "lutte": {
    "label": "Lutte",
    "emoji": "🤼",
    "icon": "target",
    "cat": "combat",
    "sport_ids": [
      18,
      115,
      176,
      177,
      178,
      299
    ]
  },
  "lutte-bretonne": {
    "label": "Lutte bretonne",
    "emoji": "🤼",
    "icon": "spark",
    "cat": "autre"
  },
  "marche-nordique": {
    "label": "Marche nordique",
    "emoji": "🏅",
    "icon": "running",
    "cat": "plein-air"
  },
  "martial_arts": {
    "label": "Arts martiaux",
    "emoji": "🏅",
    "icon": "target",
    "cat": "combat"
  },
  "mma": {
    "label": "MMA",
    "emoji": "🥊",
    "icon": "target",
    "cat": "combat",
    "sport_ids": [
      348
    ]
  },
  "montagne": {
    "label": "Montagne",
    "emoji": "🏅",
    "icon": "climb",
    "cat": "plein-air"
  },
  "moto": {
    "label": "Moto",
    "emoji": "🏍️",
    "icon": "spark",
    "cat": "urbain",
    "sport_ids": [
      53,
      151,
      152,
      235,
      289,
      326
    ]
  },
  "motonautisme": {
    "label": "Motonautisme",
    "emoji": "🚤",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      205,
      439
    ]
  },
  "muay-thai": {
    "label": "Muay-thaï",
    "emoji": "🥊",
    "icon": "target",
    "cat": "combat",
    "sport_ids": [
      76,
      245,
      347
    ]
  },
  "multi": {
    "label": "Multisports",
    "emoji": "🏅",
    "icon": "spark",
    "cat": "autre"
  },
  "musculation": {
    "label": "Musculation",
    "emoji": "💪",
    "icon": "flame",
    "cat": "forme",
    "sport_ids": [
      82
    ]
  },
  "mushing": {
    "label": "Mushing",
    "emoji": "🐕",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      316
    ]
  },
  "nanbudo": {
    "label": "Nanbudo",
    "emoji": "🥋",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      343
    ]
  },
  "natation": {
    "label": "Natation",
    "emoji": "🏊",
    "icon": "swim",
    "cat": "aqua",
    "sport_ids": [
      9,
      63,
      64,
      81,
      87,
      260,
      421
    ]
  },
  "natation-synchro": {
    "label": "Natation synchro",
    "emoji": "🏅",
    "icon": "swim",
    "cat": "aqua"
  },
  "netball": {
    "label": "Netball",
    "emoji": "🏀",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      110
    ]
  },
  "padel": {
    "label": "Padel",
    "emoji": "🎾",
    "icon": "tennis",
    "cat": "raquette",
    "sport_ids": [
      42,
      102,
      141,
      288
    ]
  },
  "paintball": {
    "label": "Paintball",
    "emoji": "🏅",
    "icon": "target",
    "cat": "cible"
  },
  "parachute": {
    "label": "Parachutisme",
    "emoji": "🪂",
    "icon": "spark",
    "cat": "glisse",
    "sport_ids": [
      47,
      193,
      194,
      332,
      333,
      334,
      413
    ]
  },
  "parachutisme": {
    "label": "Parachutisme",
    "emoji": "🏅",
    "icon": "spark",
    "cat": "glisse"
  },
  "patinage": {
    "label": "Patinage",
    "emoji": "⛸️",
    "icon": "spark",
    "cat": "glisse"
  },
  "peche": {
    "label": "Pêche",
    "emoji": "🎣",
    "icon": "target",
    "cat": "cible",
    "sport_ids": [
      319,
      320
    ]
  },
  "pelote-basque": {
    "label": "Pelote basque",
    "emoji": "🥎",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      104,
      107,
      249,
      250,
      251,
      252,
      362
    ]
  },
  "pentathlon-moderne": {
    "label": "Pentathlon moderne",
    "emoji": "🏅",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      57
    ]
  },
  "petanque": {
    "label": "Pétanque",
    "emoji": "🏅",
    "icon": "target",
    "cat": "cible"
  },
  "planche-a-voile": {
    "label": "Planche à voile",
    "emoji": "🏄",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      225
    ]
  },
  "plongee": {
    "label": "Plongée",
    "emoji": "🤿",
    "icon": "swim",
    "cat": "aqua",
    "sport_ids": [
      50,
      157,
      158,
      210,
      264,
      266,
      267,
      321,
      402,
      403
    ]
  },
  "polo": {
    "label": "Polo",
    "emoji": "🐎",
    "icon": "spark",
    "cat": "equestre",
    "sport_ids": [
      314
    ]
  },
  "quadball": {
    "label": "Quadball",
    "emoji": "🧙",
    "icon": "spark",
    "cat": "autre"
  },
  "randonnee": {
    "label": "Randonnée",
    "emoji": "🥾",
    "icon": "running",
    "cat": "plein-air",
    "sport_ids": [
      91,
      94,
      182,
      184,
      186,
      261,
      294,
      317,
      357,
      376,
      383,
      384,
      313
    ]
  },
  "raquettes": {
    "label": "Raquettes",
    "emoji": "🏅",
    "icon": "spark",
    "cat": "glisse"
  },
  "roller": {
    "label": "Roller",
    "emoji": "🛼",
    "icon": "spark",
    "cat": "glisse",
    "sport_ids": [
      55,
      154,
      155,
      223,
      256,
      257
    ]
  },
  "roller-hockey": {
    "label": "Roller hockey",
    "emoji": "🏒",
    "icon": "ball",
    "cat": "collectif",
    "sport_ids": [
      255
    ]
  },
  "rugby": {
    "label": "Rugby",
    "emoji": "🏉",
    "icon": "ball",
    "cat": "collectif",
    "sport_ids": [
      2,
      36,
      259,
      361
    ]
  },
  "rugby-xiii": {
    "label": "Rugby à XIII",
    "emoji": "🏉",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      136
    ]
  },
  "sauvetage": {
    "label": "Sauvetage sportif",
    "emoji": "🛟",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      265
    ]
  },
  "savate": {
    "label": "Savate",
    "emoji": "🥊",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      16
    ]
  },
  "scrabble": {
    "label": "Scrabble",
    "emoji": "🔤",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      349
    ]
  },
  "sepak-takraw": {
    "label": "Sepak Takraw",
    "emoji": "🥎",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      171
    ]
  },
  "skate": {
    "label": "Skateboard",
    "emoji": "🛹",
    "icon": "spark",
    "cat": "glisse",
    "sport_ids": [
      414
    ]
  },
  "ski": {
    "label": "Ski",
    "emoji": "⛷️",
    "icon": "spark",
    "cat": "glisse",
    "sport_ids": [
      21,
      22,
      92,
      93,
      206,
      207,
      281,
      282,
      318,
      330,
      409,
      23,
      58,
      331
    ]
  },
  "ski-alpinisme": {
    "label": "Ski-alpinisme",
    "emoji": "🏅",
    "icon": "spark",
    "cat": "glisse"
  },
  "ski-nautique": {
    "label": "Ski nautique",
    "emoji": "🏅",
    "icon": "swim",
    "cat": "aqua"
  },
  "ski-nautique-wakeboard": {
    "label": "Ski nautique / Wakeboard",
    "emoji": "🏄",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      62,
      84
    ]
  },
  "snowboard": {
    "label": "Snowboard",
    "emoji": "🏂",
    "icon": "spark",
    "cat": "autre"
  },
  "soccer": {
    "label": "Football",
    "emoji": "⚽",
    "icon": "ball",
    "cat": "collectif",
    "sport_ids": [
      137
    ]
  },
  "speleo": {
    "label": "Spéléologie",
    "emoji": "🏅",
    "icon": "spark",
    "cat": "plein-air"
  },
  "speleologie": {
    "label": "Spéléologie",
    "emoji": "🕳️",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      125
    ]
  },
  "sport": {
    "label": "Multisports",
    "emoji": "🏅",
    "icon": "spark",
    "cat": "autre"
  },
  "sport-auto": {
    "label": "Sport auto",
    "emoji": "🏎️",
    "icon": "spark",
    "cat": "urbain",
    "sport_ids": [
      54,
      153,
      236
    ]
  },
  "sport-boules": {
    "label": "Sport-boules",
    "emoji": "🎳",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      243
    ]
  },
  "sport-rural": {
    "label": "Sports ruraux",
    "emoji": "🌾",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      379
    ]
  },
  "sports-de-glace": {
    "label": "Sports de glace",
    "emoji": "⛸️",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      24,
      41,
      156,
      228,
      229,
      230
    ]
  },
  "sports_centre": {
    "label": "Multisports",
    "emoji": "🏅",
    "icon": "spark",
    "cat": "autre"
  },
  "squash": {
    "label": "Squash",
    "emoji": "🏅",
    "icon": "tennis",
    "cat": "raquette",
    "sport_ids": [
      43,
      103
    ]
  },
  "surf": {
    "label": "Surf",
    "emoji": "🏄",
    "icon": "swim",
    "cat": "aqua",
    "sport_ids": [
      32,
      126,
      310,
      311,
      312,
      60
    ]
  },
  "taekwondo": {
    "label": "Taekwondo",
    "emoji": "🥋",
    "icon": "target",
    "cat": "combat",
    "sport_ids": [
      14,
      422
    ]
  },
  "tchoukball": {
    "label": "Tchoukball",
    "emoji": "🏐",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      109
    ]
  },
  "tennis": {
    "label": "Tennis",
    "emoji": "🎾",
    "icon": "tennis",
    "cat": "raquette",
    "sport_ids": [
      6,
      216,
      273
    ]
  },
  "tennis-table": {
    "label": "Tennis de table",
    "emoji": "🏓",
    "icon": "tennis",
    "cat": "raquette",
    "sport_ids": [
      8
    ]
  },
  "tir": {
    "label": "Tir sportif",
    "emoji": "🎯",
    "icon": "target",
    "cat": "cible",
    "sport_ids": [
      34,
      233,
      234,
      308,
      322,
      420,
      432
    ]
  },
  "tir-arc": {
    "label": "Tir à l'arc",
    "emoji": "🏹",
    "icon": "target",
    "cat": "cible",
    "sport_ids": [
      33,
      372,
      146,
      215
    ]
  },
  "touch-rugby": {
    "label": "Touch Rugby",
    "emoji": "🏉",
    "icon": "ball",
    "cat": "collectif",
    "sport_ids": [
      138,
      478
    ]
  },
  "trail": {
    "label": "Trail",
    "emoji": "🏔️",
    "icon": "running",
    "cat": "plein-air"
  },
  "triathlon": {
    "label": "Triathlon",
    "emoji": "🏊",
    "icon": "running",
    "cat": "plein-air",
    "sport_ids": [
      28,
      359
    ]
  },
  "ulm": {
    "label": "ULM",
    "emoji": "🛩️",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      122
    ]
  },
  "ultimate": {
    "label": "Ultimate",
    "emoji": "🏅",
    "icon": "ball",
    "cat": "collectif",
    "sport_ids": [
      56
    ]
  },
  "voile": {
    "label": "Voile",
    "emoji": "⛵",
    "icon": "swim",
    "cat": "aqua",
    "sport_ids": [
      31,
      61,
      274,
      276,
      327,
      328,
      408,
      411,
      412
    ]
  },
  "vol-a-voile": {
    "label": "Vol à voile",
    "emoji": "🛩️",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      123
    ]
  },
  "vol-libre": {
    "label": "Vol libre",
    "emoji": "🪂",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      124
    ]
  },
  "volleyball": {
    "label": "Volley",
    "emoji": "🏐",
    "icon": "ball",
    "cat": "collectif",
    "sport_ids": [
      5
    ]
  },
  "voltige": {
    "label": "Voltige",
    "emoji": "🤸",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      192
    ]
  },
  "vovinam": {
    "label": "Vovinam",
    "emoji": "🥋",
    "icon": "spark",
    "cat": "autre",
    "sport_ids": [
      340
    ]
  },
  "wakeboard": {
    "label": "Wakeboard",
    "emoji": "🏅",
    "icon": "spark",
    "cat": "autre"
  },
  "water-polo": {
    "label": "Water-polo",
    "emoji": "🏅",
    "icon": "swim",
    "cat": "aqua"
  },
  "windsurf": {
    "label": "Windsurf",
    "emoji": "🏅",
    "icon": "spark",
    "cat": "autre"
  },
  "wushu": {
    "label": "Wushu",
    "emoji": "🥋",
    "icon": "target",
    "cat": "combat",
    "sport_ids": [
      75,
      200,
      339
    ]
  },
  "yoga": {
    "label": "Yoga / Pilates",
    "emoji": "🧘",
    "icon": "yoga",
    "cat": "forme",
    "sport_ids": [
      144
    ]
  },
  "hockey-sur-glace": {
    "label": "Hockey glace",
    "emoji": "🏒",
    "icon": "ball",
    "cat": "collectif",
    "sport_ids": [
      25
    ]
  },
  "stand-up-paddle": {
    "label": "SUP",
    "emoji": "🏄",
    "icon": "swim",
    "cat": "aqua",
    "sport_ids": [
      209
    ]
  }
};

// ─── Catégories pour groupement UI ───
const DISC_CATS = [
  { id: "aqua",      label: "Aquatique & nautique", glyph: "🌊" },
  { id: "combat",    label: "Combat & arts martiaux", glyph: "🥋" },
  { id: "glisse",    label: "Glisse",               glyph: "🏄" },
  { id: "forme",     label: "Forme & bien-être",    glyph: "🧘" },
  { id: "collectif", label: "Sports collectifs",    glyph: "⚽" },
  { id: "raquette",  label: "Raquettes",            glyph: "🎾" },
  { id: "plein-air", label: "Plein air & outdoor",  glyph: "🧗" },
  { id: "cible",     label: "Précision & cible",    glyph: "🎯" },
  { id: "urbain",    label: "Urbain",               glyph: "🛹" },
  { id: "equestre",  label: "Équestre",             glyph: "🐎" },
  { id: "danse",     label: "Danse & expression",   glyph: "💃" },
  { id: "autre",     label: "Autres",               glyph: "✦" }
];
const DISC_CATS_BY_ID = Object.fromEntries(DISC_CATS.map(c => [c.id, c]));

// ─── Helpers globaux ───
function discLabel(slug) { return (DISCIPLINES[slug] && DISCIPLINES[slug].label) || slug; }
function discEmoji(slug) { return (DISCIPLINES[slug] && DISCIPLINES[slug].emoji) || '🏅'; }
function discIcon(slug)  { return (DISCIPLINES[slug] && DISCIPLINES[slug].icon)  || 'spark'; }
function discCat(slug)   { return (DISCIPLINES[slug] && DISCIPLINES[slug].cat)   || 'autre'; }

// ─── Map inverse sport_id -> slug ───
const SPORT_TO_DISC = (function(){
  const out = {};
  for (const [slug, entry] of Object.entries(DISCIPLINES)) {
    if (entry.sport_ids) entry.sport_ids.forEach(sid => { out[sid] = slug; });
  }
  return out;
})();
function sportIdToDisc(sid) { return SPORT_TO_DISC[sid] || null; }

// ─── Rétrocompatibilité (anciens objets reconstruits depuis DISCIPLINES) ───
const DISC_META  = Object.fromEntries(Object.entries(DISCIPLINES).map(([k,v]) => [k, v.label]));
const DISC_EMOJI = Object.fromEntries(Object.entries(DISCIPLINES).map(([k,v]) => [k, v.emoji]));
