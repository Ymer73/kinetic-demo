// ─── KINETIC SHARED DATA (auto-généré depuis xlsx) ──
// Dimensions (0-27):
// 0:Contact 1:Outdoor 2:Intensité 3:Budget 4:Collectif 5:Compétition
// 6:Cardio 7:Force 8:Agilité 9:Souplesse 10:Endurance 11:Explosivité
// 12:Coordination 13:Équilibre 14:Eau 15:Hauteur 16:Nature 17:Domicile
// 18:Saisonnier 19:Social 20:Rencontres 21:Performance 22:Bienetre
// 23:Adrénaline 24:Zen 25:Technique 26:Matériel 27:AgeAccessible

const SPORTS = [
{"id":1,"nom":"Football","cat":"Collectif","scores":[4,5,4,1,5,5,5,3,4,2,4,4,3,2,0,0,2,0,0,5,5,4,3,3,1,3,2,4],"meta":{"nb_licencies_fr":2400000,"tendance":"stable","age_minimum":5,"age_dominant":"10-45","cout_entree_reel":200,"url_federation":"https://www.fff.fr","media_presence":5,"saison":"hiver","federation":"Fédération Française de Football","acronyme":"FFF","site":"https://www.fff.fr","siteOfficiel":"www.fff.fr","cost":300,"licencies2023":2215848,"licencies2024":1850000,"clubs":13498,"licenceMoyenne":300,"pariteH":89.8,"pariteF":10.2,"ageMoyen":21.8,"trancheAge":"10-14 ans","trancheAgePct":24.6,"pctUnder18":58.5,"pct2035":22.2,"pct3655":15.5,"pctOver60":2.5,"shnTotal":134,"espoirs":751,"joAthletes":41,"medaillesArgent":21,"medaillesTotal":21,"description":"Le sport roi","motsCles":"énergie, terrain, ballon, équipe","ageMin":6,"pratique":"Extérieur","format":"Équipe","sousCategorie":"Ballon","jo2024":"Oui","clubsCount":11767,"fedSlug":"fff","tagline":"Sport collectif à 11 contre 11 sur gazon, l'objectif est de marquer dans le but adverse avec les pieds."},"handisport":true,"scoresV2":{"contact":4,"competition":5,"collectif":5,"outdoor":5,"adrenaline":3,"zen":1,"technique":3,"sociabilite":5,"cardio":5,"force":3,"souplesse":2,"coordination":3,"energetique":4,"eau":0,"hauteur":0},"emoji":"⚽"},
{"id":2,"nom":"Rugby à XV","cat":"Collectif","scores":[5,5,5,2,5,5,4,5,4,2,3,5,3,2,0,0,2,0,0,5,5,4,2,5,1,2,2,4],"meta":{"nb_licencies_fr":530000,"tendance":"stable","age_minimum":8,"age_dominant":"14-35","cout_entree_reel":200,"url_federation":"https://www.ffr.fr","media_presence":4,"saison":"hiver","federation":"Fédération Française de Rugby","acronyme":"FFR","site":"https://www.ffr.fr","siteOfficiel":"www.ffr.fr","cost":350,"licencies2023":374738,"licencies2024":392000,"clubs":1972,"licenceMoyenne":350,"pariteH":87,"pariteF":13,"ageMoyen":24.5,"trancheAge":"10-14 ans","trancheAgePct":17,"pctUnder18":49.1,"pct2035":26.2,"pct3655":19.1,"pctOver60":3.9,"shnTotal":368,"espoirs":544,"joAthletes":25,"medaillesOr":13,"medaillesTotal":13,"description":"Contact et puissance","motsCles":"contact, terrain, équipe, puissance","ageMin":6,"pratique":"Extérieur","format":"Équipe","sousCategorie":"Ballon","jo2024":"Oui","clubsCount":6121,"fedSlug":"ffr","tagline":"Sport collectif à 15 sur gazon, on porte le ballon ovale à la main pour aller l'aplatir dans l'en-but."},"handisport":true,"scoresV2":{"contact":5,"competition":5,"collectif":5,"outdoor":5,"adrenaline":5,"zen":1,"technique":2,"sociabilite":5,"cardio":4,"force":5,"souplesse":2,"coordination":3,"energetique":5,"eau":0,"hauteur":0},"emoji":"🏉"},
{"id":3,"nom":"Basketball","cat":"Collectif","scores":[2,2,4,2,5,5,5,3,4,2,4,5,4,2,0,0,2,0,0,5,5,4,3,3,1,3,2,4],"meta":{"nb_licencies_fr":null,"tendance":"stable","age_minimum":6,"age_dominant":"10-40","cout_entree_reel":150,"url_federation":"https://www.ffbb.com","media_presence":4,"saison":"hiver","federation":"Fédération Française de Basketball","acronyme":"FFBB","site":"https://www.ffbb.com","siteOfficiel":"www.ffbb.com","cost":250,"licencies2023":594408,"licencies2024":490000,"clubs":3743,"licenceMoyenne":250,"pariteH":65.9,"pariteF":34.1,"ageMoyen":18.8,"trancheAge":"10-14 ans","trancheAgePct":33,"pctUnder18":71.6,"pct2035":13.4,"pct3655":12.8,"pctOver60":1.5,"shnTotal":268,"espoirs":604,"joAthletes":24,"medaillesArgent":24,"medaillesTotal":24,"description":"Rebonds et vitesse","motsCles":"saut, vitesse, équipe, basket","ageMin":7,"pratique":"Les deux","format":"Équipe","sousCategorie":"Ballon","jo2024":"Oui","clubsCount":6222,"fedSlug":"ffbb","tagline":"Sport collectif à 5 contre 5 en salle, on dribble et on tire dans un panier suspendu à 3,05 mètres."},"handisport":true,"scoresV2":{"contact":2,"competition":5,"collectif":5,"outdoor":2,"adrenaline":3,"zen":1,"technique":3,"sociabilite":5,"cardio":5,"force":3,"souplesse":2,"coordination":4,"energetique":4,"eau":0,"hauteur":0},"emoji":"🏀"},
{"id":6,"nom":"Tennis","cat":"Individuel","scores":[0,3,4,3,1,5,4,3,4,3,4,4,4,3,0,0,1,0,0,4,4,4,3,3,1,5,3,4],"meta":{"nb_licencies_fr":1152000,"tendance":"boom","age_minimum":5,"age_dominant":"10-60","cout_entree_reel":250,"url_federation":"https://www.fft.fr","media_presence":4,"saison":"annee","federation":"Fédération Française de Tennis","acronyme":"FFT","site":"https://www.fft.fr","siteOfficiel":"www.fft.fr","cost":500,"licencies2023":1106989,"licencies2024":960000,"clubs":7139,"licenceMoyenne":500,"pariteH":70.2,"pariteF":29.8,"ageMoyen":27.3,"trancheAge":"5-9 ans","trancheAgePct":20.4,"pctUnder18":50.5,"pct2035":14.1,"pct3655":25,"pctOver60":7.4,"shnTotal":134,"espoirs":65,"joAthletes":9,"description":"Précision et stratégie","motsCles":"raquette, précision, solo, duel","ageMin":5,"pratique":"Les deux","format":"Les deux","sousCategorie":"Raquette","jo2024":"Oui","clubsCount":7796,"fedSlug":"fft","tagline":"Sport de raquette à 1 contre 1 ou en double, on échange une balle par-dessus un filet sur un court."},"handisport":true,"scoresV2":{"contact":0,"competition":5,"collectif":1,"outdoor":3,"adrenaline":3,"zen":1,"technique":5,"sociabilite":4,"cardio":4,"force":3,"souplesse":3,"coordination":4,"energetique":4,"eau":0,"hauteur":0},"emoji":"🎾"},
{"id":26,"nom":"Escalade","cat":"Montagne & Nature","scores":[0,3,3,3,1,3,3,4,4,3,3,3,4,4,0,4,4,1,1,3,3,4,4,4,4,5,3,4],"meta":{"federation":"Fédération Française de la Montagne et de l'Escalade","acronyme":"FFME","site":"https://www.ffme.fr","siteOfficiel":"www.ffme.fr","cost":200,"licencies2023":115226,"licencies2024":93000,"clubs":980,"licenceMoyenne":200,"pariteH":53.6,"pariteF":46.4,"ageMoyen":24.1,"trancheAge":"10-14 ans","trancheAgePct":26.9,"pctUnder18":55.6,"pct2035":17.6,"pct3655":21.5,"pctOver60":3.5,"shnTotal":242,"espoirs":96,"joAthletes":7,"description":"Dépasser ses limites","motsCles":"escalade, grimpe, mur, rocher","ageMin":8,"pratique":"Les deux","format":"Les deux","sousCategorie":"Grimpe","jo2024":"Oui","clubsCount":1737,"url_federation":"https://www.ffme.fr","fedSlug":"ffme","tagline":"Ascension de voies en falaise ou mur en salle, on grimpe à mains nues avec baudrier et points d'assurage."},"scoresV2":{"contact":0,"competition":3,"collectif":1,"outdoor":3,"adrenaline":4,"zen":4,"technique":5,"sociabilite":3,"cardio":3,"force":4,"souplesse":3,"coordination":4,"energetique":3,"eau":0,"hauteur":4},"emoji":"🧗"},
{"id":9,"nom":"Natation","cat":"Aquatique","scores":[0,1,4,1,0,4,5,4,3,4,5,3,4,3,5,0,0,0,0,3,3,4,4,2,4,3,1,5],"meta":{"federation":"Fédération Française de Natation","acronyme":"FFN","site":"https://www.ffnatation.fr","siteOfficiel":"www.ffnatation.fr","cost":400,"licencies2023":402350,"licencies2024":251000,"clubs":1303,"licenceMoyenne":400,"pariteH":45.3,"pariteF":54.7,"ageMoyen":22,"trancheAge":"5-9 ans","trancheAgePct":33.1,"pctUnder18":67.5,"pct2035":7.2,"pct3655":15.3,"pctOver60":7.5,"shnTotal":326,"espoirs":353,"joAthletes":29,"medaillesOr":4,"medaillesArgent":1,"medaillesBronze":7,"medaillesTotal":12,"description":"L'eau comme terrain","motsCles":"eau, piscine, nage, endurance","ageMin":4,"pratique":"Les deux","format":"Les deux","sousCategorie":"Nage","jo2024":"Oui","clubsCount":5218,"age_minimum":4,"nb_licencies_fr":412000,"age_dominant":"6-50","saison":"annee","cout_entree_reel":200,"media_presence":4,"tendance":"boom","url_federation":"https://www.ffnatation.fr","fedSlug":"ffn","tagline":"Nage chronométrée en bassin sur quatre styles (crawl, dos, brasse, papillon), en individuel ou en relais."},"handisport":true,"scoresV2":{"contact":0,"competition":4,"collectif":0,"outdoor":1,"adrenaline":2,"zen":4,"technique":3,"sociabilite":3,"cardio":5,"force":4,"souplesse":4,"coordination":4,"energetique":4,"eau":5,"hauteur":0},"emoji":"🏊"},
{"id":15,"nom":"Boxe anglaise","cat":"Combat","scores":[5,0,5,2,0,5,5,4,4,2,4,5,4,2,0,0,0,1,0,3,3,4,2,5,1,4,2,3],"meta":{"nb_licencies_fr":60000,"tendance":"stable","age_minimum":10,"age_dominant":"15-35","cout_entree_reel":150,"url_federation":"https://www.ffboxe.com","media_presence":3,"saison":"annee","federation":"Fédération Française de Boxe","acronyme":"FFBoxe","site":"https://www.ffboxe.com","siteOfficiel":"www.ffboxe.com","cost":350,"licencies2023":65074,"licencies2024":54000,"clubs":1130,"licenceMoyenne":350,"pariteH":72.7,"pariteF":27.3,"ageMoyen":24.5,"trancheAge":"10-14 ans","trancheAgePct":25.7,"pctUnder18":53.8,"pct2035":22.6,"pct3655":18.2,"pctOver60":3.7,"shnTotal":74,"espoirs":9,"joAthletes":8,"medaillesArgent":2,"medaillesBronze":1,"medaillesTotal":3,"description":"Le noble art","motsCles":"boxe, ring, puissance, combat","ageMin":8,"pratique":"Intérieur","format":"Seul","sousCategorie":"Boxe","jo2024":"Non","clubsCount":5109,"fedSlug":"ffboxe","tagline":"Sport de combat sur ring, on s'affronte uniquement aux poings avec des gants sur plusieurs rounds."},"scoresV2":{"contact":5,"competition":5,"collectif":0,"outdoor":0,"adrenaline":5,"zen":1,"technique":4,"sociabilite":3,"cardio":5,"force":4,"souplesse":2,"coordination":4,"energetique":5,"eau":0,"hauteur":0},"emoji":"🥊"},
{"id":73,"nom":"Yoga / Pilates","cat":"Individuel","scores":[0,1,2,1,1,0,2,2,2,5,3,0,3,4,0,0,1,5,0,3,3,1,5,0,5,3,1,5],"meta":{"federation":"Fédération Nationale des Enseignants de Yoga","acronyme":"FNEY","site":"https://www.lemondeduyoga.org","siteOfficiel":"www.lemondeduyoga.org","cost":400,"description":"Corps et esprit","motsCles":"yoga, pilates, bien-être, souplesse","ageMin":6,"pratique":"Intérieur","format":"Seul","sousCategorie":"Bien-être","jo2024":"Non","clubsCount":105,"url_federation":"https://www.fney.fr","clubs":450,"fedSlug":"fney","tagline":"Enchaîne postures, étirements et respirations sur un tapis pour gagner souplesse, gainage et calme mental."},"scoresV2":{"contact":0,"competition":0,"collectif":1,"outdoor":1,"adrenaline":0,"zen":5,"technique":3,"sociabilite":3,"cardio":2,"force":2,"souplesse":5,"coordination":3,"energetique":1,"eau":0,"hauteur":0},"emoji":"🧘"},
{"id":129,"nom":"Course à pied / Running","cat":"Individuel","scores":[0,5,4,0,0,3,5,2,3,2,5,3,2,2,0,0,3,2,0,3,3,4,5,2,4,1,1,5],"meta":{"federation":"Fédération Française d'Athlétisme","acronyme":"FFA","site":"https://www.athle.fr","siteOfficiel":"www.athle.fr","cost":100,"licencies2023":null,"clubs":2535,"licenceMoyenne":null,"pariteH":null,"pariteF":null,"ageMoyen":null,"trancheAge":null,"trancheAgePct":null,"pctUnder18":null,"pct2035":null,"pct3655":null,"pctOver60":null,"shnTotal":null,"espoirs":null,"description":"Courir librement","motsCles":"running, course, endurance, nature","ageMin":6,"pratique":"Extérieur","format":"Les deux","sousCategorie":"Course","jo2024":"Non","clubsCount":null,"url_federation":"https://www.athle.fr","fedSlug":"ffa","tagline":"Cours sur route, piste ou chemin à allure libre, du jogging tranquille au fractionné chronométré."},"scoresV2":{"contact":0,"competition":3,"collectif":0,"outdoor":5,"adrenaline":2,"zen":4,"technique":1,"sociabilite":3,"cardio":5,"force":2,"souplesse":2,"coordination":2,"energetique":4,"eau":0,"hauteur":0},"emoji":"🏃"},
{"id":11,"nom":"Cyclisme route","cat":"Individuel","scores":[0,5,5,4,1,5,5,3,3,2,5,3,3,3,0,0,4,1,1,4,4,5,3,3,3,3,4,4],"meta":{"nb_licencies_fr":113000,"tendance":"stable","age_minimum":12,"age_dominant":"20-60","cout_entree_reel":400,"url_federation":"https://ffc.fr","media_presence":4,"saison":"ete","federation":"Fédération Française de Cyclisme","acronyme":"FFC","site":"https://www.ffc.fr","siteOfficiel":"www.ffc.fr","cost":600,"licencies2023":107679,"licencies2024":114000,"clubs":2335,"licenceMoyenne":600,"pariteH":87.7,"pariteF":12.3,"ageMoyen":29.3,"trancheAge":"10-14 ans","trancheAgePct":20.5,"pctUnder18":49.1,"pct2035":12.7,"pct3655":23.4,"pctOver60":11.1,"shnTotal":524,"espoirs":307,"joAthletes":7,"medaillesArgent":1,"medaillesBronze":1,"medaillesTotal":2,"description":"La route et le vent","motsCles":"vélo, route, vitesse, endurance","ageMin":7,"pratique":"Extérieur","format":"Les deux","sousCategorie":"Vélo","jo2024":"Oui","clubsCount":12468,"fedSlug":"ffcyclisme","tagline":"Course à vélo sur route en peloton ou contre-la-montre, sur des étapes longues avec relances et sprints."},"handisport":true,"scoresV2":{"contact":0,"competition":5,"collectif":1,"outdoor":5,"adrenaline":3,"zen":3,"technique":3,"sociabilite":4,"cardio":5,"force":3,"souplesse":2,"coordination":3,"energetique":4,"eau":0,"hauteur":0},"emoji":"🚴"},
{"id":12,"nom":"Judo","cat":"Combat","scores":[4,0,4,1,0,5,4,4,4,3,3,4,4,3,0,0,0,1,0,4,4,4,2,3,2,5,2,4],"meta":{"nb_licencies_fr":530000,"tendance":"stable","age_minimum":4,"age_dominant":"6-40","cout_entree_reel":150,"url_federation":"https://www.ffjudo.com","media_presence":3,"saison":"annee","federation":"Fédération Française de Judo","acronyme":"FFJDA","site":"https://www.ffjudo.com","siteOfficiel":"www.ffjudo.com","cost":300,"licencies2023":529244,"licencies2024":557000,"clubs":5158,"licenceMoyenne":300,"pariteH":67.2,"pariteF":32.8,"ageMoyen":15.8,"trancheAge":"5-9 ans","trancheAgePct":45.6,"pctUnder18":79.1,"pct2035":6.2,"pct3655":10.6,"pctOver60":2.8,"joAthletes":14,"medaillesOr":15,"medaillesArgent":2,"medaillesBronze":6,"medaillesTotal":23,"description":"L'art de la chute","motsCles":"judo, combat, tatami, discipline","ageMin":5,"pratique":"Intérieur","format":"Seul","sousCategorie":"Arts martiaux","jo2024":"Oui","clubsCount":5570,"fedSlug":"ffjudo","tagline":"Sport de combat japonais, on projette ou immobilise son adversaire au sol grâce à des saisies de kimono."},"scoresV2":{"contact":4,"competition":5,"collectif":0,"outdoor":0,"adrenaline":3,"zen":2,"technique":5,"sociabilite":4,"cardio":4,"force":4,"souplesse":3,"coordination":4,"energetique":4,"eau":0,"hauteur":0},"emoji":"🥋"},
{"id":46,"nom":"Danse sportive","cat":"Danse & Arts","scores":[3,0,4,3,2,5,4,3,5,5,3,4,5,4,0,0,0,2,0,5,5,4,5,3,3,5,3,4],"meta":{"nb_licencies_fr":null,"tendance":"boom","age_minimum":6,"age_dominant":"10-50","cout_entree_reel":200,"url_federation":"https://www.ffdanse.fr","media_presence":2,"saison":"annee","federation":"Fédération Française de Danse","acronyme":"FFDanse","site":"https://www.ffdanse.fr","siteOfficiel":"www.ffdanse.fr","cost":500,"licencies2023":88181,"licencies2024":50000,"clubs":1715,"licenceMoyenne":500,"pariteH":14.8,"pariteF":85.2,"ageMoyen":29.5,"trancheAge":"5-9 ans","trancheAgePct":20.5,"pctUnder18":48.9,"pct2035":13.1,"pct3655":20.1,"pctOver60":13.8,"shnTotal":34,"espoirs":34,"description":"Rythme et élégance","motsCles":"danse, rythme, partenaire, scène","ageMin":5,"pratique":"Intérieur","format":"Les deux","sousCategorie":"Danse","jo2024":"Non","clubsCount":3373,"fedSlug":"ffds","tagline":"Danse en couple sur musique imposée, on enchaîne pas et figures en standards ou latines devant un jury."},"scoresV2":{"contact":3,"competition":5,"collectif":2,"outdoor":0,"adrenaline":3,"zen":3,"technique":5,"sociabilite":5,"cardio":4,"force":3,"souplesse":5,"coordination":5,"energetique":4,"eau":0,"hauteur":0},"emoji":"💃"}

];

const PROFILES = [
  { name: "Warrior", emoji: "🔥",
    desc: "Intensité, compétition, dépassement de soi — tu donnes tout à chaque session.",
    traits: ["Haute intensité","Compétitif","Explosif"],
    dims: [2,5,11,21,23] },
  { name: "Explorateur", emoji: "🌊",
    desc: "Nature, adrénaline, sensations — tu cherches l'aventure hors des sentiers battus.",
    traits: ["Outdoor","Adrénaline","Découverte"],
    dims: [1,14,15,16,23] },
  { name: "Social", emoji: "🤝",
    desc: "Pour toi, le sport c'est avant tout des rencontres, une équipe et une bonne ambiance.",
    traits: ["En équipe","Rencontres","Convivialité"],
    dims: [4,19,20] },
  { name: "Artiste", emoji: "🎯",
    desc: "Tu veux maîtriser chaque geste, progresser dans une technique et atteindre l'excellence.",
    traits: ["Technique","Précision","Progression"],
    dims: [21,25,5] },
  { name: "Zen", emoji: "🧘",
    desc: "Bien-être, relâchement, équilibre — le sport est ton espace de ressourcement.",
    traits: ["Bien-être","Douceur","Équilibre"],
    dims: [24,22,9] },
  { name: "Boosteur", emoji: "⚡",
    desc: "Tu veux te sentir vivant·e : énergie, cardio, corps en mouvement — sans prise de tête.",
    traits: ["Cardio","Dynamisme","Accessible"],
    dims: [6,2,10] }
];

// ─── ALGO ──────────────────────────────────────
function buildProfile(answers, seedSport) {
  const weights = new Array(28).fill(0);
  const targets = new Array(28).fill(2.5);

  QUESTIONS.forEach((q, qi) => {
    const ans = answers[qi];
    if (ans === null || ans === undefined) return;

    if (q.type === 'motivation') {
      // Multi-select motivation cards — each opt has a dims array [{d,val,w}]
      const indices = Array.isArray(ans) ? ans : [ans];
      indices.forEach(i => {
        const opt = q.opts[i];
        if (!opt || !Array.isArray(opt.dims)) return;
        opt.dims.forEach(({d, val, w}) => {
          if (w > weights[d]) { weights[d] = w; targets[d] = val; }
          else if (w === weights[d]) targets[d] = (targets[d] + val) / 2;
        });
      });
    } else if (q.type === 'cards') {
      // Single-select card — ans is a number (option index)
      const opt = q.opts[ans];
      if (opt && Array.isArray(opt.dims)) {
        opt.dims.forEach(({d, val, w}) => {
          if (w > weights[d]) { weights[d] = w; targets[d] = val; }
          else if (w === weights[d]) targets[d] = (targets[d] + val) / 2;
        });
      }
    } else if (q.type === 'scale') {
      // Scale: ans = button index 0-4
      const val = ans + 1; // 1–5
      const target = (val - 1) * 1.25; // 0, 1.25, 2.5, 3.75, 5
      const baseWeight = Math.abs(val - 3) * 1.5; // 0 at center, 3 at extremes
      if (baseWeight === 0) return; // neutral → skip this dimension
      q.dims.forEach(({d, w: dw = 1}) => {
        const ew = baseWeight * Math.abs(dw);
        const t = dw < 0 ? 5 - target : target;
        if (ew > weights[d]) { weights[d] = ew; targets[d] = t; }
      });
    } else {
      // Legacy single/multi/seed (kept for backwards compat)
      const indices = Array.isArray(ans) ? ans : [ans];
      indices.forEach(i => {
        const opt = q.opts && q.opts[i];
        if (!opt) return;
        const vArr = Array.isArray(opt.v) ? opt.v : (Array.isArray(opt.dims) ? opt.dims.map(d => ({d:d.d,val:d.val||2.5,w:d.w||1})) : []);
        vArr.forEach(({d, val, w}) => {
          if ((w||1) > weights[d]) { weights[d] = w||1; targets[d] = val; }
        });
      });
    }
  });

  if (seedSport) {
    const needle = seedSport.toLowerCase();
    const found = SPORTS.find(s => s.scores && (s.nom.toLowerCase().includes(needle) || needle.includes(s.nom.toLowerCase().split(' ')[0])));
    if (found) {
      found.scores.forEach((v, d) => {
        if (weights[d] === 0) { weights[d] = 0.3; targets[d] = v; }
      });
    }
  }
  return { weights, targets };
}


function detectProfile(answers, seedSport) {
  const { weights, targets } = buildProfile(answers, seedSport);
  const score = (dims) => dims.reduce((s, d) => s + (weights[d] > 0 ? targets[d] : 0), 0) / dims.length;
  let best = PROFILES[0], bestScore = -1;
  PROFILES.forEach(p => { const s = score(p.dims); if (s > bestScore) { bestScore = s; best = p; } });
  return best;
}

function getSportById(id) { return SPORTS.find(s => s.id === id); }
function getSportByName(nom) { return SPORTS.find(s => s.nom === nom); }

// ─── ALGO V2 ───────────────────────────────────
function deriveConstraints(answers) {
  const c = { contactMax: null, budgetLevel: null, intensityMin: null, intensityMax: null, riskMax: null };

  // Q1 = âge (cards 0-4: junior / young / adult / mature / senior)
  const ageAns = answers[1];
  if (ageAns === 0) { // < 15 ans
    c.intensityMax = 3;
    c.riskMax = 2; // pas de sports extrêmes (hauteur, adrénaline)
  } else if (ageAns === 4) { // 55+
    if (!c.intensityMax || c.intensityMax > 2) c.intensityMax = 2;
    c.riskMax = 3;
  }

  // Q2 = niveau sportif (scale 0-4)
  const levelAns = answers[2];
  if (levelAns !== null && levelAns !== undefined) {
    const v = levelAns + 1; // 1-5
    if (v <= 1) { // aucun sport
      if (!c.intensityMax || c.intensityMax > 2) c.intensityMax = 2;
    } else if (v <= 2) { // bouge un peu
      if (!c.intensityMax || c.intensityMax > 3) c.intensityMax = 3;
    } else if (v >= 5) { // athlète
      if (!c.intensityMin) c.intensityMin = 2;
    }
  }

  // Q7 = contact (scale 0-4)
  const contactAns = answers[7];
  if (contactAns !== null && contactAns !== undefined) {
    const v = contactAns + 1;
    if (v <= 1) c.contactMax = 0;
    else if (v <= 2) c.contactMax = 2;
  }

  // Q12 = budget (scale 0-4)
  const budgetAns = answers[12];
  if (budgetAns !== null && budgetAns !== undefined) {
    c.budgetLevel = budgetAns + 1;
  }

  // Q4 = intensité souhaitée (scale 0-4) — user override si plus fort que les caps niveau/âge
  const intensityAns = answers[4];
  if (intensityAns !== null && intensityAns !== undefined) {
    const v = intensityAns + 1;
    if (v >= 4 && !c.intensityMax) c.intensityMin = Math.max(c.intensityMin || 0, 3);
  }

  return c;
}

function checkHardFilters(sport, c) {
  let penalty = 1;
  if (c.contactMax !== null && sport.scores[0] > c.contactMax) penalty *= 0.08;
  if (c.budgetLevel !== null && sport.scores[3] > c.budgetLevel + 1) penalty *= 0.25;
  if (c.intensityMax !== null && sport.scores[2] > c.intensityMax + 1) penalty *= 0.5;
  if (c.intensityMin !== null && sport.scores[2] < c.intensityMin) penalty *= 0.4;
  // Risk cap for juniors and seniors: d15=hauteur/airs + d23=adrénaline
  if (c.riskMax !== null) {
    const riskScore = (sport.scores[15] + sport.scores[23]) / 2;
    if (riskScore > c.riskMax + 0.5) penalty *= 0.15;
  }
  return penalty;
}

function softmax(scores, temperature = 1.2) {
  const max = Math.max(...scores);
  const exps = scores.map(s => Math.exp((s - max) / temperature));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map(e => e / sum);
}

// Pré-calcule la rareté de chaque sport = unicité du profil sur 28 dims.
// Un sport avec peu de voisins similaires reçoit un bonus → empêche les
// "profils génériques" de tout monopoliser.
(function precomputeRarity() {
  if (typeof SPORTS === 'undefined') return;
  const scored = SPORTS.filter(s => Array.isArray(s.scores));
  for (const s of scored) {
    let neighbors = 0;
    for (const o of scored) {
      if (o.id === s.id) continue;
      let d = 0;
      for (let i = 0; i < 28; i++) d += Math.abs(s.scores[i] - o.scores[i]);
      if (d < 15) neighbors++;
    }
    s.rarity = 1 / (1 + neighbors / 8);
  }
})();

function scoreV2(answers, seedSport, opts = {}) {
  const { weights, targets } = buildProfile(answers, seedSport);
  const constraints = deriveConstraints(answers);
  const temperature = opts.temperature ?? 1.2;
  const explorationRate = opts.explorationRate ?? 0;
  const BASE_W = 0.15;
  const effWeights = weights.map(w => Math.max(w, BASE_W));
  const totalW = effWeights.reduce((a, b) => a + b, 0) || 1;
  const maxDist = totalW * 5;
  const ranked = SPORTS.filter(s => Array.isArray(s.scores)).map(sport => {
    let dist = 0;
    effWeights.forEach((w, d) => { dist += w * Math.abs(targets[d] - sport.scores[d]); });
    const affinity = 1 - dist / maxDist;
    const penalty = checkHardFilters(sport, constraints);
    return { ...sport, affinity, penalty, rawScore: affinity * penalty };
  });
  const probs = softmax(ranked.map(s => s.rawScore), temperature);
  const result = ranked.map((s, i) => {
    let compat = s.rawScore * 100;
    if (explorationRate > 0) {
      const mainstreamCats = ['Collectif', 'Individuel'];
      const nicheBonus = mainstreamCats.includes(s.cat) ? 0 : 8;
      compat = compat * (1 - explorationRate * 0.3) + nicheBonus * explorationRate;
    }
    return { ...s, compat: Math.max(0, Math.round(compat)), prob: probs[i] };
  });
  return result.sort((a, b) => b.compat - a.compat);
}

// Diversité PAR PROFIL (pas par catégorie) :
// - bucket intensité (scores[2]) : low 0-2, mid 3, high 4-5
// - bucket outdoor  (scores[1]) : in ≤2 / out ≥3
// - bucket collectif (scores[4]) : solo ≤2 / team ≥3
// Position #1 = meilleur match, positions #2-4 = greedy avec bonus diversité,
// position #5 = wild card (catégorie différente).
function selectTopWithWildCard(ranked, n = 5) {
  const _intens = s => s.scores[2] <= 2 ? 'lo' : s.scores[2] === 3 ? 'md' : 'hi';
  const _out    = s => s.scores[1] >= 3 ? 'out' : 'in';
  const _col    = s => s.scores[4] >= 3 ? 'team' : 'solo';

  const picked = [ranked[0]];
  for (let pos = 1; pos < n - 1; pos++) {
    const iBuckets = new Set(picked.map(_intens));
    const oBuckets = new Set(picked.map(_out));
    const cBuckets = new Set(picked.map(_col));
    const pickedIds = new Set(picked.map(s => s.id));
    let best = null, bestScore = -Infinity;
    // On cherche dans top 40 pour garder de la qualité
    for (const s of ranked.slice(0, 40)) {
      if (pickedIds.has(s.id)) continue;
      let score = s.compat;
      if (!iBuckets.has(_intens(s))) score += 8;
      if (!oBuckets.has(_out(s)))    score += 6;
      if (!cBuckets.has(_col(s)))    score += 6;
      if (score > bestScore) { bestScore = score; best = s; }
    }
    if (best) picked.push(best);
  }

  // Wild card : catégorie différente du top 4, dans le top 40
  const pickedIds = new Set(picked.map(s => s.id));
  const pickedCats = new Set(picked.map(s => s.cat));
  const wildCandidates = ranked.slice(0, 40).filter(s => !pickedIds.has(s.id) && !pickedCats.has(s.cat));
  const wild = wildCandidates[0] || ranked.find(s => !pickedIds.has(s.id));
  return { top: picked, wild, combined: [...picked, { ...wild, isWildCard: true }] };
}

function selectSurprises(ranked, topIds, n = 3) {
  const topCats = new Set(ranked.filter(s => topIds.includes(s.id)).map(s => s.cat));
  const pool = ranked.slice(14, 50).filter(s => !topCats.has(s.cat));
  const picks = [];
  const seenCats = new Set();
  for (const s of pool) {
    if (!seenCats.has(s.cat)) { picks.push(s); seenCats.add(s.cat); if (picks.length >= n) break; }
  }
  return picks;
}

function applyGeoRerank(ranked, geoData) {
  if (!geoData || Object.keys(geoData).length === 0) return ranked;
  return ranked.map(s => {
    const nbClubs = geoData[s.id] ?? null;
    if (nbClubs === null) return s;
    const geoFactor = 1 - Math.exp(-nbClubs / 3);
    const adjusted = s.compat * (0.3 + 0.7 * geoFactor);
    return { ...s, compat: Math.round(adjusted), nbClubs, geoFactor };
  }).sort((a, b) => b.compat - a.compat);
}

// ─── QUIZ ADAPTATIF (info-gain) ────────────────
// Retourne l'index de la prochaine question à poser (parmi remainingIdx)
// qui maximise la réduction d'entropie sur la distribution des sports candidats.
function nextBestQuestion(answers, remainingIdx) {
  if (remainingIdx.length === 0) return null;
  if (remainingIdx.length === 1) return remainingIdx[0];

  // Distribution actuelle = softmax des rawScores
  const current = scoreV2(answers, null, { temperature: 1.2 });
  const currentProbs = current.map(s => s.prob);
  const H_current = entropy(currentProbs);

  let bestQ = remainingIdx[0];
  let bestGain = -Infinity;

  for (const qi of remainingIdx) {
    const q = QUESTIONS[qi];
    if (!q || q.type === 'seed') continue;
    // Simuler chaque option : moyenne pondérée de l'entropie post-réponse
    const optsCount = q.opts ? q.opts.length : 5; // scale = 0-4
    let H_post_mean = 0;
    let totalWeight = 0;
    for (let oi = 0; oi < optsCount; oi++) {
      const simAnswers = [...answers];
      simAnswers[qi] = (q.type === 'multi' || q.type === 'motivation') ? [oi] : oi;
      const simRanked = scoreV2(simAnswers, null, { temperature: 1.2 });
      const simProbs = simRanked.map(s => s.prob);
      const H_sim = entropy(simProbs);
      // Poids uniforme (on ne sait pas laquelle l'user choisira)
      H_post_mean += H_sim;
      totalWeight += 1;
    }
    H_post_mean /= totalWeight || 1;
    const gain = H_current - H_post_mean;
    if (gain > bestGain) { bestGain = gain; bestQ = qi; }
  }
  return bestQ;
}

function entropy(probs) {
  let h = 0;
  for (const p of probs) {
    if (p > 0) h -= p * Math.log(p);
  }
  return h;
}

// Condition d'arrêt du quiz adaptatif :
//   - top1 a >15pts d'avance sur top5 (podium clair)
//   - OU 10 questions posées (hors seed)
function shouldStopQuiz(answers, answeredCount) {
  if (answeredCount >= 10) return true;
  if (answeredCount < 5) return false;
  const ranked = scoreV2(answers, null, { temperature: 1.2 });
  const gap = ranked[0].compat - ranked[4].compat;
  return gap > 15;
}
