// ─── KINETIC MAGAZINE — Données éditoriales ───
// Modifie ce fichier pour mettre à jour le contenu chaque mois.

const issueData = {
  number: "04",
  monthLabel: "AVRIL 2026",
  updatedDate: "21 AVR. 2026",
  updatedShort: "MAJ 21/04",
  badge: "NOUVEAU · Section handisport",
  slogan: "Le sport, mais fun.",
};

const heroData = {
  eyebrow: "",
  titleParts: [
    { type: "text", value: "TROUVE", delay: 1 },
    { type: "br" },
    { type: "ital", value: "ton", delay: 2 },
    { type: "space" },
    { type: "box", value: "SPORT", delay: 3 },
    { type: "br" },
    { type: "text", value: "EN", delay: 4 },
    { type: "space" },
    { type: "ctr", value: "10", delay: 4 },
    { type: "space" },
    { type: "text", value: "QUESTIONS.", delay: 5 },
  ],
  sub: "Tu sais pas par où commencer ? T'as testé 3 trucs et rien collait ? Réponds à 10 questions, on te trouve LE sport qui matche vraiment ta vie, et un club à côté de chez toi.",
  ctas: [
    { label: "Trouver mon sport", href: "trouver-club.html", variant: "primary", arrow: true },
    { label: "J'ai déjà une idée, explorer", href: "explorer.html", variant: "ghost" },
  ],
  stats: [
    { num: "290", acc: "", label: "Sports référencés", accAt: "start" },
    { num: "126", acc: "k+", label: "Clubs en France", accAt: "end" },
    { num: "10", acc: "", label: "Questions au quiz", accAt: "start" },
    { num: "2", acc: "min", label: "Pour te matcher", accAt: "end" },
  ],
};

const marqueeItems = [
  { text: "290 SPORTS", ital: true },
  { text: "126K+ CLUBS" },
  { text: "10 QUESTIONS", ital: true },
  { text: "SPORT SUR ORDONNANCE" },
  { text: "PASS'SPORT 100€", ital: true },
  { text: "HANDISPORT" },
  { text: "126 FÉDÉRATIONS", ital: true },
  { text: "2 MIN POUR TE MATCHER" },
];

const sportOfMonth = {
  eyebrowNum: "01",
  eyebrowLabel: "SPORT DU MOIS",
  category: "CATÉGORIE · COLLECTIF MIXTE · OUTDOOR",
  nameMain: "ULTI",
  nameItal: "mate",
  tagline: "Frisbee de précision en équipe mixte. Pas d'arbitre, pas de contact, juste de la vitesse, des passes folles et un disque qui flotte 60m. La discipline qui pousse le plus vite chez les 18-25 ans en France.",
  quote: '"Le seul sport sans arbitre, où l\'esprit du jeu décide."',
  videoLabel: "Regarder la vidéo",
  videoSub: "Règles de l'Ultimate · Kinetic",
  videoSrc: "regles-ultimate-v1.mp4",
  videoPoster: "regles-ultimate-thumb.jpg",
  stats: [
    { num: "12", acc: "k", label: "Licenciés FFDF" },
    { num: "230", acc: "+", label: "Clubs en France" },
    { num: "+", acc: "38%", label: "Croissance vs 2024" },
  ],
  ctas: [
    { label: "Voir la fiche", href: "sport.html?id=56", variant: "accent", arrow: true },
    { label: "▶ Bande-annonce (à venir)", href: "#", variant: "ghost" },
  ],
};

const newItems = [
  {
    tag: "SECTION",
    tagColor: "orange",
    titleMain: "PARCOURS",
    titleItal: "handisport",
    text: "Quiz adapté, des disciplines compatibles, géoloc des clubs accessibles PMR. On a refait toute l'expérience avec la FFH.",
    href: "handisport.html",
  },
  {
    tag: "CONTENU",
    tagColor: "violet",
    titleMain: "12 sports",
    titleItal: "post-école",
    text: "Pour ceux qui ont fini la fac et qui se sentent vieux. Spoiler : t'es pas vieux, t'es juste pas dans le bon sport.",
    href: "article-sports-post-ecole.html",
  },
  {
    tag: "FEATURE",
    tagColor: "lime",
    titleMain: "Géoloc",
    titleItal: "précise",
    text: "On a importé 125 982 clubs avec adresse exacte, horaires, prix, contacts. Toute la France, à jour à 7 jours près.",
    href: "map.html",
  },
];

const aidesData = {
  eyebrowNum: "03",
  intro: "Ce mois-ci : 3 dispositifs publics et privés qu'on aimerait que ton médecin t'ait mentionnés.",
  items: [
    {
      source: "SOURCE · MINISTÈRE DES SPORTS",
      title: "Pass'Sport 100€",
      text: "Si t'as entre 14 et 17 ans, ou que t'es boursier(ère), ou bénéficiaire de l'AAH — 100€ direct sur ta licence. Demande en 5 min sur monpasssport.fr.",
      cta: "Comment l'obtenir",
      href: "aide-passsport.html",
    },
    {
      source: "SOURCE · ASSURANCE MALADIE",
      title: "Sport sur ordonnance",
      text: "Si t'as une ALD (cancer, diabète, dépression…), ton médecin peut te prescrire 90 séances de sport adapté par an. Pris en charge à 100% sous conditions.",
      cta: "Voir les conditions",
      href: "aide-sport-ordonnance.html",
    },
    {
      source: "SOURCE · COMPLÉMENTAIRES SANTÉ",
      title: "Mutuelles bien-être",
      text: "67% des mutuelles remboursent une partie de ta licence (de 50€ à 250€/an). Et 41% remboursent les cours de yoga, pilates ou natation.",
      cta: "Comparer",
      href: "aide-mutuelles.html",
    },
  ],
};

const chiffresData = [
  {
    variant: "orange",
    topLabel: "SANTÉ PUBLIQUE",
    num: "47%",
    label: "des Français adultes considérés inactifs (moins de 30 min de sport/semaine).",
    source: "SOURCE · OMS 2024",
  },
  {
    variant: "glass",
    topLabel: "TENDANCE",
    num: "+",
    acc: "147%",
    label: "de croissance du sport-tech en France sur 5 ans (apps, wearables, capteurs).",
    source: "SOURCE · USF 2025",
  },
  {
    variant: "ink",
    topLabel: "KINETIC INSIGHT",
    num: "2",
    acc: "/3",
    label: "des matchs proposés par notre algo sont des sports que l'utilisateur ne connaissait pas.",
    source: "SOURCE · KINETIC DATA · 2026",
  },
  {
    variant: "glass",
    topLabel: "DIVERSITÉ",
    num: "",
    acc: "290",
    label: "sports référencés sur Kinetic — et on en ajoute régulièrement.",
    source: "SOURCE · KINETIC INDEX · AVR 2026",
  },
];

const footerData = {
  baseline: '"Le sport, mais fun." — Édité par Kinetic Studio, 4,5M de vues/mois sur TikTok.',
  cols: [
    { title: "EXPLORER", links: [
      { label: "Sports", href: "index.html" },
      { label: "Trouver un sport", href: "trouver-club.html" },
      { label: "Feed découverte", href: "explorer.html" },
      { label: "Carte", href: "map.html" },
      { label: "Para / Handisport", href: "handisport.html" },
    ]},
    { title: "OUTILS", links: [
      { label: "Fédérations", href: "federations.html" },
      { label: "Pass'Sport 100€", href: "aide-passsport.html" },
      { label: "Sport sur ordonnance", href: "aide-sport-ordonnance.html" },
      { label: "Mutuelles bien-être", href: "aide-mutuelles.html" },
    ]},
    { title: "LÉGAL", links: [
      { label: "Mentions légales", href: "mentions-legales.html" },
      { label: "Confidentialité", href: "confidentialite.html" },
      { label: "Cookies", href: "cookies.html" },
      { label: "Contact presse", href: "contact-presse.html" },
    ]},
  ],
};

// Nb sports et fédérations — source : data.js (290 sports) + federations-data.json (109 fédés) + clubs/index.json (125 982 clubs)

Object.assign(window, {
  issueData, heroData, marqueeItems, sportOfMonth,
  newItems, aidesData, chiffresData, footerData,
});
