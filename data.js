// ============================================
// KINETIC DEMO - Data fictive pour maquette
// Tous les clubs sont 100% inventés
// ============================================

const SPORTS = [
  {
    slug: "escalade",
    name: "Escalade",
    emoji: "🧗",
    tagline: "Grimper, chuter, recommencer.",
    description: "Un sport mental autant que physique. Tu lis le mur, tu trouves ton chemin, tu engages. L'escalade développe la force, la souplesse et la concentration.",
    intensity: 4,
    social: 3,
    outdoor: 4,
    skill: 5,
    color: "#FF6B2C",
    clubs: [
      { name: "Vertical Pulse", city: "Lyon", level: "Tous niveaux", price: "65€/mois" },
      { name: "Monkey Wall", city: "Chambéry", level: "Débutants à confirmés", price: "55€/mois" },
      { name: "The Rock Lab", city: "Annecy", level: "Intermédiaire", price: "70€/mois" }
    ]
  },
  {
    slug: "boxe",
    name: "Boxe",
    emoji: "🥊",
    tagline: "Frapper le sac, pas tes problèmes.",
    description: "Cardio brutal, technique précise, défoulement total. La boxe forge le mental et te met dans une forme de fou. Idéal pour évacuer la pression.",
    intensity: 5,
    social: 3,
    outdoor: 1,
    skill: 4,
    color: "#FF3D6E",
    clubs: [
      { name: "Iron Republic", city: "Lyon", level: "Tous niveaux", price: "75€/mois" },
      { name: "Knockout Academy", city: "Grenoble", level: "Débutants", price: "60€/mois" },
      { name: "Shadow Boxing Club", city: "Annecy", level: "Compétition", price: "85€/mois" }
    ]
  },
  {
    slug: "football",
    name: "Football",
    emoji: "⚽",
    tagline: "Le classique qui ne lâche jamais.",
    description: "Sport collectif par excellence. Esprit d'équipe, lecture du jeu, et ce frisson quand t'inscris. Accessible partout en France.",
    intensity: 4,
    social: 5,
    outdoor: 5,
    skill: 4,
    color: "#6C47FF",
    clubs: [
      { name: "FC Solaris", city: "Chambéry", level: "Senior", price: "180€/an" },
      { name: "AS Phoenix", city: "Lyon", level: "U18 à Senior", price: "220€/an" },
      { name: "Real Mountains FC", city: "Albertville", level: "Loisir", price: "120€/an" }
    ]
  },
  {
    slug: "basketball",
    name: "Basketball",
    emoji: "🏀",
    tagline: "Vitesse, sauts, panier décisif.",
    description: "Rythme effréné, jeu intelligent, et un esprit d'équipe ultra fort. Le basket te fait progresser physiquement et mentalement en même temps.",
    intensity: 4,
    social: 5,
    outdoor: 2,
    skill: 4,
    color: "#FF8A2C",
    clubs: [
      { name: "Comètes Lyon", city: "Lyon", level: "Tous niveaux", price: "200€/an" },
      { name: "Mountain Hoops", city: "Annecy", level: "Senior", price: "180€/an" },
      { name: "Alpine Slammers", city: "Grenoble", level: "U15 à Senior", price: "210€/an" }
    ]
  },
  {
    slug: "yoga",
    name: "Yoga",
    emoji: "🧘",
    tagline: "Bouge, respire, recentre-toi.",
    description: "Pas que pour les zens. Le yoga renforce, assouplit et calme. Un complément parfait à n'importe quel sport plus intense.",
    intensity: 2,
    social: 2,
    outdoor: 1,
    skill: 3,
    color: "#9D7BFF",
    clubs: [
      { name: "Zenith Flow Studio", city: "Lyon", level: "Tous niveaux", price: "90€/mois" },
      { name: "Breathe & Move", city: "Chambéry", level: "Débutants", price: "75€/mois" },
      { name: "Mountain Yoga", city: "Annecy", level: "Tous niveaux", price: "85€/mois" }
    ]
  },
  {
    slug: "skateboard",
    name: "Skateboard",
    emoji: "🛹",
    tagline: "Asphalte, tricks, liberté totale.",
    description: "Le skate c'est de la créativité sur 4 roues. Tu progresses à ton rythme, tu te confronte à toi-même. Communauté ultra accueillante.",
    intensity: 3,
    social: 4,
    outdoor: 4,
    skill: 5,
    color: "#FF6B2C",
    clubs: [
      { name: "Asphalt Riders", city: "Lyon", level: "Tous niveaux", price: "Libre" },
      { name: "Concrete Crew", city: "Grenoble", level: "Débutants", price: "50€/an" },
      { name: "Alpine Skate Co.", city: "Annecy", level: "Intermédiaire", price: "Libre" }
    ]
  },
  {
    slug: "course-a-pied",
    name: "Course à pied",
    emoji: "🏃",
    tagline: "Un pied devant l'autre. Répéter.",
    description: "Le sport le plus accessible au monde. Tu pars de chez toi, tu reviens en ayant gagné. Mental d'acier et cardio en béton garantis.",
    intensity: 4,
    social: 3,
    outdoor: 5,
    skill: 2,
    color: "#FF3D6E",
    clubs: [
      { name: "Marathon Wolves", city: "Lyon", level: "Tous niveaux", price: "80€/an" },
      { name: "Trail Runners 73", city: "Chambéry", level: "Trail", price: "100€/an" },
      { name: "Run & Smile", city: "Annecy", level: "Débutants", price: "60€/an" }
    ]
  },
  {
    slug: "tennis",
    name: "Tennis",
    emoji: "🎾",
    tagline: "Toi contre lui. Toi contre toi.",
    description: "Sport technique exigeant et mental. Le tennis développe la coordination, la stratégie et la résilience. Saison toute l'année en indoor.",
    intensity: 3,
    social: 3,
    outdoor: 3,
    skill: 5,
    color: "#6C47FF",
    clubs: [
      { name: "Smash Academy", city: "Lyon", level: "Tous niveaux", price: "280€/an" },
      { name: "Mountain Tennis Club", city: "Annecy", level: "Compétition", price: "350€/an" },
      { name: "Alpine Racket", city: "Chambéry", level: "Loisir", price: "240€/an" }
    ]
  },
  {
    slug: "crossfit",
    name: "Crossfit",
    emoji: "💪",
    tagline: "Fais peur à tes excuses.",
    description: "Cross training intense, fonctionnel et communautaire. Tu sors transformé après chaque WOD. Progression rapide garantie.",
    intensity: 5,
    social: 4,
    outdoor: 1,
    skill: 4,
    color: "#FF8A2C",
    clubs: [
      { name: "Steel Forge Box", city: "Lyon", level: "Tous niveaux", price: "120€/mois" },
      { name: "Iron Spirit CrossFit", city: "Grenoble", level: "Débutants à compétition", price: "110€/mois" },
      { name: "Mountain Box", city: "Chambéry", level: "Tous niveaux", price: "105€/mois" }
    ]
  },
  {
    slug: "danse",
    name: "Danse",
    emoji: "💃",
    tagline: "Le corps qui parle plus fort.",
    description: "Hip-hop, modern jazz, contemporain... La danse c'est cardio, coordination, expression. Tu transpires en t'amusant, c'est le combo parfait.",
    intensity: 4,
    social: 4,
    outdoor: 1,
    skill: 5,
    color: "#FF3D6E",
    clubs: [
      { name: "Rhythm Lab", city: "Lyon", level: "Tous niveaux", price: "95€/mois" },
      { name: "Flow Dance Studio", city: "Annecy", level: "Tous styles", price: "85€/mois" },
      { name: "Urban Moves", city: "Chambéry", level: "Hip-hop", price: "75€/mois" }
    ]
  },
  {
    slug: "vtt",
    name: "VTT",
    emoji: "🚵",
    tagline: "Adrénaline et grand air.",
    description: "Le VTT c'est la liberté avec une bonne dose d'adrénaline. Trails, descentes, single tracks. Idéal pour les amoureux de nature et de sensations.",
    intensity: 4,
    social: 3,
    outdoor: 5,
    skill: 4,
    color: "#FF6B2C",
    clubs: [
      { name: "Trail Bandits", city: "Annecy", level: "Enduro/DH", price: "150€/an" },
      { name: "Mountain Crew VTT", city: "Chambéry", level: "Tous niveaux", price: "120€/an" },
      { name: "Forest Riders", city: "Grenoble", level: "Cross-country", price: "100€/an" }
    ]
  },
  {
    slug: "natation",
    name: "Natation",
    emoji: "🏊",
    tagline: "Eau, glisse, performance.",
    description: "Sport complet, doux pour les articulations, redoutable pour le cardio. La natation muscle tout le corps en profondeur. Accessible toute l'année.",
    intensity: 4,
    social: 2,
    outdoor: 1,
    skill: 4,
    color: "#6C47FF",
    clubs: [
      { name: "Aqua Spirit Lyon", city: "Lyon", level: "Tous niveaux", price: "190€/an" },
      { name: "Alpine Swim Club", city: "Chambéry", level: "Compétition", price: "240€/an" },
      { name: "Wave Performance", city: "Annecy", level: "Adultes", price: "160€/an" }
    ]
  }
];

// Quiz: 5 questions simples
const QUESTIONS = [
  {
    id: "intensity",
    title: "Quel niveau d'intensité tu cherches ?",
    subtitle: "Sois honnête, c'est pour toi.",
    options: [
      { label: "Calme et zen", value: 1, emoji: "😌" },
      { label: "Modéré", value: 3, emoji: "🙂" },
      { label: "Intense, je veux suer", value: 5, emoji: "🔥" }
    ],
    key: "intensity"
  },
  {
    id: "social",
    title: "Tu préfères bouger comment ?",
    subtitle: "En solo ou en équipe ?",
    options: [
      { label: "Seul, dans ma bulle", value: 1, emoji: "🧘" },
      { label: "Petit groupe", value: 3, emoji: "👥" },
      { label: "Grosse équipe / collectif", value: 5, emoji: "🙌" }
    ],
    key: "social"
  },
  {
    id: "outdoor",
    title: "Indoor ou outdoor ?",
    subtitle: "Le contexte change tout.",
    options: [
      { label: "Indoor, j'aime le confort", value: 1, emoji: "🏠" },
      { label: "Peu importe", value: 3, emoji: "🌗" },
      { label: "Outdoor, grand air toujours", value: 5, emoji: "🌄" }
    ],
    key: "outdoor"
  },
  {
    id: "skill",
    title: "Technique ou cardio ?",
    subtitle: "Tu cherches quoi en priorité ?",
    options: [
      { label: "Pur cardio, simple et brut", value: 1, emoji: "💨" },
      { label: "Mix des deux", value: 3, emoji: "⚖️" },
      { label: "Technique pointue", value: 5, emoji: "🎯" }
    ],
    key: "skill"
  },
  {
    id: "vibe",
    title: "Ton énergie en une phrase ?",
    subtitle: "L'ambiance que tu veux.",
    options: [
      { label: "Discipline et progression", value: "discipline", emoji: "📈" },
      { label: "Fun et lâcher-prise", value: "fun", emoji: "🎉" },
      { label: "Performance et défi", value: "perf", emoji: "🏆" }
    ],
    key: "vibe"
  }
];
