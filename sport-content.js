// ─── KINETIC SPORT CONTENT ───
// Contenu rédactionnel par sport : "Pourquoi X ?" + "Règles du sport"
// Objectif : honnêteté + utilité. Pour les sports obscurs, on s'appuie sur
// la catégorie / sous-catégorie et on renvoie vers la fédération.
//
// API : getSportContent(sportObj) → { why: string, rules: string[] }
// ────────────────────────────────────────────────────────────────────────

// Contenus spécifiques pour les sports les plus consultés.
// Quand on n'est pas certain à 100% des règles, on reste générique et factuel.
const SPORT_CONTENT = {
  "Football": {
    why: "Le sport le plus pratiqué au monde. 11 contre 11, un ballon, deux cages, et l'énergie collective fait le reste. Le foot est universel parce qu'il demande peu de matériel, se joue partout, et offre autant de plaisir en match de quartier qu'en finale de Coupe du Monde.",
    rules: [
      "Deux équipes de 11 joueurs (dont un gardien) s'affrontent sur un terrain rectangulaire pendant deux mi-temps de 45 minutes.",
      "Le but est de marquer plus de buts que l'adversaire en faisant entrer le ballon dans la cage adverse, sans utiliser les mains (sauf le gardien dans sa surface).",
      "Une faute commise dans la surface de réparation est sanctionnée d'un penalty.",
      "Carton jaune pour avertissement, carton rouge pour expulsion. Deux jaunes équivalent à un rouge.",
      "Le hors-jeu : un attaquant ne peut pas être plus proche de la ligne de but adverse que l'avant-dernier défenseur au moment de la passe."
    ]
  },
  "Rugby à XV": {
    why: "Le rugby à XV mélange combat physique, intelligence collective et respect de l'adversaire. C'est un sport de contact où chaque profil a sa place : pilier puissant, ailier rapide, demi de mêlée stratège. L'esprit du rugby est aussi important que le score final.",
    rules: [
      "Deux équipes de 15 joueurs s'affrontent en deux mi-temps de 40 minutes.",
      "On marque un essai (5 points) en aplatissant le ballon dans l'en-but adverse, transformable en passant entre les poteaux (2 points).",
      "Les passes en avant sont interdites : le ballon ne peut être passé que latéralement ou vers l'arrière.",
      "Une mêlée est ordonnée après une faute mineure (en-avant, hors-jeu).",
      "L'arbitre est respecté sans contestation, c'est un principe fondamental du rugby."
    ]
  },
  "Rugby à 7": {
    why: "Plus rapide, plus aéré et plus spectaculaire que son grand frère. Le rugby à 7 se joue en mi-temps de 7 minutes, ce qui le rend explosif. C'est devenu une discipline olympique majeure depuis 2016.",
    rules: [
      "Sept joueurs par équipe sur le même terrain que le rugby à XV.",
      "Deux mi-temps de 7 minutes (10 en finale).",
      "Les transformations doivent être jouées au drop dans les 40 secondes.",
      "Les mêmes règles fondamentales que le rugby à XV : passes en arrière, en-but, plaquage légal.",
      "Le carton jaune entraîne 2 minutes d'exclusion temporaire."
    ]
  },
  "Rugby à XIII": {
    why: "Cousin du rugby à XV, plus rapide et moins technique sur les phases statiques. Le rugby à XIII privilégie la course, l'évitement et la continuité du jeu. Très populaire dans le sud de la France et en Australie.",
    rules: [
      "Treize joueurs par équipe au lieu de quinze.",
      "Après six placages, le ballon est rendu à l'adversaire (règle des six tenus).",
      "Pas de mêlée disputée comme au rugby à XV : la mêlée est simulée.",
      "Un essai vaut 4 points, la transformation 2, le drop 1.",
      "Le jeu est plus continu et moins haché par les arrêts."
    ]
  },
  "Basketball": {
    why: "Le basket combine vitesse, hauteur et précision dans un espace réduit. C'est un sport qui valorise autant le collectif que le talent individuel, et qui se joue toute l'année, en salle comme en extérieur sur un simple panier.",
    rules: [
      "Deux équipes de 5 joueurs sur le terrain, 4 quart-temps de 10 minutes (FIBA) ou 12 minutes (NBA).",
      "Un panier marqué dans la zone vaut 2 points, à l'extérieur de la ligne à 3 points il vaut 3 points, un lancer franc vaut 1 point.",
      "Il faut dribbler en se déplaçant : marcher avec le ballon est sanctionné.",
      "Chaque équipe dispose de 24 secondes pour tenter un tir.",
      "Cinq fautes personnelles entraînent l'exclusion du joueur pour le reste du match."
    ]
  },
  "Handball": {
    why: "Le hand est un sport de puissance et de vitesse, mélange de basket et de foot. La France y excelle depuis 30 ans, hommes et femmes confondus. C'est un sport explosif où tout va vite : duels, contre-attaques, tirs surpuissants.",
    rules: [
      "Sept joueurs par équipe (dont un gardien), deux mi-temps de 30 minutes.",
      "On marque en envoyant le ballon dans le but adverse, depuis l'extérieur de la zone des 6 mètres.",
      "On peut faire trois pas avec le ballon en main, puis dribbler, puis encore trois pas.",
      "Une faute grave entraîne une exclusion temporaire de 2 minutes.",
      "Le gardien est le seul à pouvoir entrer dans la zone des 6 mètres autour de son but."
    ]
  },
  "Volleyball": {
    why: "Le volley est un sport collectif où l'on ne touche jamais le ballon plus de trois fois avant de le renvoyer. C'est un jeu de timing, de saut et de coordination, où une équipe soudée bat n'importe quel collectif moins lié.",
    rules: [
      "Six joueurs par équipe, séparés par un filet (2,43 m hommes, 2,24 m femmes).",
      "Match en 3 sets gagnants de 25 points (5e set en 15 points), avec 2 points d'écart minimum.",
      "Maximum 3 touches de balle par équipe avant de renvoyer dans le camp adverse.",
      "Le ballon ne doit pas toucher le sol dans son camp.",
      "Un seul joueur (le libéro) peut être spécialisé en défense et porte un maillot différent."
    ]
  },
  "Beach Volley": {
    why: "Le volley sur sable, en 2 contre 2, sous le soleil. Plus exigeant physiquement que le volley en salle parce que tu dois courir dans le sable, et plus tactique parce que tu ne peux pas te cacher derrière 5 partenaires.",
    rules: [
      "Deux joueurs par équipe, sans remplaçant.",
      "Match en 2 sets gagnants de 21 points (3e set en 15 points), 2 points d'écart minimum.",
      "Terrain plus petit que le volley en salle (16x8 m).",
      "Pas de positions fixes : les joueurs tournent librement.",
      "Les contacts au filet et passes en feinte sont plus strictement arbitrés."
    ]
  },
  "Tennis": {
    why: "Le tennis te confronte à toi-même autant qu'à ton adversaire. C'est un jeu d'échecs en mouvement où la technique, le mental et l'endurance comptent autant. Aucun chrono : tu joues jusqu'à gagner.",
    rules: [
      "Match en 2 sets gagnants (3 en Grand Chelem messieurs), set en 6 jeux avec 2 jeux d'écart.",
      "Le service doit franchir le filet et tomber dans le carré de service adverse en diagonale.",
      "Score d'un jeu : 15, 30, 40, jeu. À 40-40 (égalité), il faut deux points consécutifs pour gagner.",
      "À 6-6 dans le set, on joue un tie-break en 7 points (2 points d'écart).",
      "La balle ne peut rebondir qu'une seule fois dans le camp avant d'être renvoyée."
    ]
  },
  "Padel": {
    why: "Le sport qui monte le plus vite en France. Plus accessible que le tennis : on joue en 2 contre 2 dans un court vitré, les rebonds sur les vitres font partie du jeu. Fun, social, addictif.",
    rules: [
      "Quatre joueurs en double sur un court fermé de 20x10 mètres.",
      "Le score est identique au tennis (15, 30, 40, jeu, set).",
      "La balle peut rebondir sur les vitres après avoir touché le sol, mais pas directement sur les vitres.",
      "Le service se fait à la cuillère, en faisant rebondir la balle au sol d'abord.",
      "Les murs et grilles font partie intégrante du jeu."
    ]
  },
  "Badminton": {
    why: "L'un des sports les plus rapides au monde : un volant peut filer à plus de 400 km/h en compétition. Mélange de réflexes, de précision et d'endurance explosive. Se joue en salle toute l'année.",
    rules: [
      "Match en 2 sets gagnants de 21 points (3e set si égalité).",
      "Le volant ne doit pas toucher le sol du côté de l'équipe en défense.",
      "Le service doit être effectué en dessous de la ceinture.",
      "En double, l'ordre de service change selon le score (pair/impair).",
      "Si la balle touche le filet et passe, le point est valide (let supprimé en match)."
    ]
  },
  "Tennis de table": {
    why: "Le ping-pong de compétition est l'un des sports les plus exigeants en réflexes. La balle peut tourner à 9 000 tours/minute. Sport accessible à tous les âges et très technique.",
    rules: [
      "Match en 4 sets gagnants de 11 points, avec 2 points d'écart minimum.",
      "Le service alterne tous les 2 points (sauf à 10-10 où il alterne à chaque point).",
      "La balle doit rebondir une fois de chaque côté de la table.",
      "Au service, la balle doit être lancée à 16 cm minimum à la verticale, sans effet.",
      "On gagne le set au premier à 11 points (avec 2 d'écart)."
    ]
  },
  "Squash": {
    why: "Sport explosif joué dans un cube vitré : tu cognes la balle contre le mur en alternance avec ton adversaire. Une partie de squash brûle plus de calories qu'un match de tennis ou de foot.",
    rules: [
      "Match en 3 sets gagnants de 11 points (PAR), 2 points d'écart.",
      "La balle doit toucher le mur frontal avant de retomber au sol.",
      "Un seul rebond au sol autorisé avant de la frapper.",
      "Les joueurs partagent le même espace : ne pas gêner l'adversaire est essentiel.",
      "L'arbitre peut sanctionner par 'let' (rejeu) ou 'stroke' (point gagné par le gêné)."
    ]
  },
  "Pickleball": {
    why: "Mix entre tennis, badminton et ping-pong, joué avec une raquette pleine et une balle perforée. Accessible immédiatement, parfait pour démarrer un sport de raquette à tout âge.",
    rules: [
      "Match en un set de 11 points, gagné avec 2 points d'écart.",
      "Le service se fait par en-dessous, en diagonale dans le rectangle adverse.",
      "Existence d'une zone de non-volée (la kitchen) près du filet.",
      "Seule l'équipe au service peut marquer.",
      "La balle doit rebondir une fois au service et au retour avant tout coup à la volée."
    ]
  },
  "Natation": {
    why: "Sport complet par excellence : tous les muscles travaillent, sans choc articulaire. La natation se pratique dès 4 ans, à n'importe quel âge, et ses bienfaits sur la santé sont reconnus partout dans le monde.",
    rules: [
      "Quatre nages officielles en compétition : crawl, dos, brassse, papillon.",
      "Le départ se fait depuis un plot (sauf en dos, départ dans l'eau).",
      "Chaque virage doit inclure un contact avec le mur.",
      "Au papillon et brasse : touche du mur à deux mains simultanément.",
      "Au crawl : pas de contrainte de battement, on respire librement."
    ]
  },
  "Natation en eau libre": {
    why: "La natation en pleine nature : lac, mer, rivière. Pas de lignes d'eau, pas de carrelage : tu nages au cap, parfois sur plusieurs kilomètres. Le 10 km est olympique depuis 2008.",
    rules: [
      "Course en milieu naturel (lac, mer, fleuve) sur des distances de 1 à 25 km.",
      "Le départ se fait simultanément pour tous les nageurs.",
      "Un parcours est balisé par des bouées que les nageurs doivent contourner.",
      "Aucun contact volontaire entre nageurs autorisé.",
      "Une assistance en barque suit le nageur en cas de besoin (notamment ravitaillement)."
    ]
  },
  "Water-polo": {
    why: "Le sport le plus dur au monde selon beaucoup. Tu nages, tu te bats, tu marques. 4 quart-temps d'une intensité folle dans une piscine de 30 mètres. Joué les pieds dans le vide en permanence.",
    rules: [
      "Sept joueurs par équipe (dont un gardien), 4 quart-temps de 8 minutes.",
      "On marque dans la cage adverse, située au bout du bassin.",
      "Le ballon ne peut être manipulé qu'avec une seule main (sauf le gardien dans sa zone).",
      "Trois fautes graves entraînent une expulsion temporaire de 20 secondes.",
      "Les joueurs ne peuvent jamais toucher le fond du bassin (sauf le gardien)."
    ]
  },
  "Plongeon": {
    why: "Quelques secondes de chute libre, des rotations à 90 km/h, et zéro éclaboussure à l'arrivée. Le plongeon mélange courage, précision et esthétique. Discipline olympique majeure.",
    rules: [
      "Compétitions à 1 m, 3 m (tremplin) et 10 m (haut vol).",
      "Le plongeur effectue une figure imposée jugée par un panel de juges.",
      "La note prend en compte : élan, prise d'envol, exécution, entrée dans l'eau.",
      "Coefficient de difficulté multiplié à la note des juges.",
      "L'éclaboussure minimale (rip entry) est valorisée."
    ]
  },
  "Aviron": {
    why: "Sport collectif et chronométrique : tu rames à l'unisson avec tes coéquipiers sur une eau plate, dos à la ligne d'arrivée. Endurance pure, technique fine et synchronisation parfaite.",
    rules: [
      "Courses sur 2000 m en ligne droite en compétition internationale.",
      "Bateaux de 1, 2, 4 ou 8 rameurs, avec ou sans barreur.",
      "Deux disciplines : couple (deux avirons par rameur) et pointe (un seul aviron).",
      "Les rameurs sont dos à la ligne d'arrivée et regardent leur sillage.",
      "Tout dépassement d'une autre embarcation se fait sans contact."
    ]
  },
  "Canoë-Kayak": {
    why: "Pagaie, eau, et adrénaline ou détente selon ta voie : eau plate pour les longues distances, eau vive pour les sensations fortes en rivière. Sport olympique très diversifié.",
    rules: [
      "Deux disciplines principales : course en ligne (eau plate) et slalom (eau vive).",
      "En slalom, le pagayeur passe entre des portes vertes (sens du courant) et rouges (contre-courant).",
      "Pénalités de 2 ou 50 secondes selon les fautes commises sur les portes.",
      "En kayak : pagaie double, position assise. En canoë : pagaie simple, position à genoux.",
      "Les épreuves se courent au chrono et par confrontations directes."
    ]
  },
  "Voile": {
    why: "Tu utilises le vent comme moteur. La voile est un sport de réflexion, d'observation de la nature et de feeling. Du dériveur en solo au monocoque en équipage, il y a une discipline pour chaque profil.",
    rules: [
      "Plus de 20 séries olympiques différentes (laser, 470, 49er, etc.).",
      "Les régates se courent autour de bouées formant un parcours imposé.",
      "Les bateaux partent ensemble après un signal de départ chronométré.",
      "Règles de priorité strictes : tribord prioritaire sur bâbord, sous le vent prioritaire sur le vent.",
      "Les pénalités se purgent par un ou deux tours sur 360° immédiatement après la faute."
    ]
  },
  "Surf": {
    why: "Tu pars chercher une vague, tu la prends, tu la rides. Le surf est devenu olympique en 2021. C'est un sport de patience, de feeling avec l'océan et de technique pure une fois debout sur la planche.",
    rules: [
      "Chaque heat dure 20 à 35 minutes selon les compétitions.",
      "Les juges notent chaque vague de 0 à 10, en gardant les deux meilleurs scores.",
      "Critères de note : difficulté de la vague, variété des manœuvres, vitesse, puissance, fluidité.",
      "Règle de priorité : le surfeur le plus proche du pic de la vague est prioritaire.",
      "Un drop in (couper la vague d'un surfeur prioritaire) est lourdement sanctionné."
    ]
  },
  "Kitesurf": {
    why: "Une aile, une planche, et l'océan. Le kite combine glisse et vol : tu peux sauter à plusieurs mètres de hauteur, freestyler en l'air, ou parcourir des kilomètres en longeant la côte.",
    rules: [
      "Plusieurs disciplines : freestyle, vague, race, big air.",
      "En compétition de freestyle : 7 à 10 minutes pour enchaîner des figures notées par les juges.",
      "Critères : difficulté, hauteur, exécution, variété.",
      "Les compétitions de race se courent autour de bouées avec un classement temps.",
      "Le port du gilet d'impact et du casque est souvent obligatoire en compétition."
    ]
  },
  "Windsurf": {
    why: "L'ancêtre des sports de glisse à voile. Une planche, une voile reliée par un pied de mât. Tu te tiens debout et tu utilises la voile comme un cerf-volant manuel. Sport olympique depuis 1984.",
    rules: [
      "Course autour de bouées (régate de course) ou notes des juges (freestyle, vague).",
      "Plusieurs séries selon la planche utilisée : RS:X, iQFoil, formula.",
      "Règles de priorité identiques à la voile classique.",
      "Le harnais est utilisé pour soulager le dos en course longue.",
      "L'iQFoil est la discipline olympique actuelle (depuis 2024)."
    ]
  },
  "Stand Up Paddle (SUP)": {
    why: "Le SUP est polyvalent : balade, race sur eau plate, surf de vagues, randonnée en rivière. Très accessible pour démarrer, exigeant à haut niveau. Sport idéal pour le gainage et l'équilibre.",
    rules: [
      "Plusieurs disciplines : race longue distance, sprint, vague, technical.",
      "En race, les départs se font en groupe ou par vagues, classement au temps.",
      "Le pagayeur est debout sur sa planche, avec une seule pagaie.",
      "Pénalités possibles pour drafting ou contact en compétition.",
      "Le port de la leash (lien planche-cheville) est généralement obligatoire."
    ]
  },
  "Athlétisme": {
    why: "L'athlétisme regroupe l'essentiel des gestes humains : courir, sauter, lancer, marcher. C'est la base de tous les sports. Discipline reine des Jeux Olympiques depuis l'Antiquité.",
    rules: [
      "Plus de 40 épreuves : courses (sprint, demi-fond, fond, haies), sauts (longueur, hauteur, perche, triple), lancers (poids, disque, javelot, marteau), épreuves combinées (décathlon, heptathlon).",
      "Les courses se mesurent au chrono officiel, les sauts et lancers au mètre.",
      "Trois faux départs entraînent la disqualification en sprint (un seul en finale internationale).",
      "Aux sauts et lancers : chaque athlète a généralement 3 essais en qualification, 3 supplémentaires pour les 8 meilleurs en finale.",
      "Le dopage et le matériel non homologué entraînent disqualification."
    ]
  },
  "Course à pied / Running": {
    why: "Le sport le plus accessible au monde : tu enfiles des baskets et tu pars. Du 5 km au marathon, du jogging détente à la performance, le running s'adapte à tout objectif. Sport individuel mais communauté énorme.",
    rules: [
      "Du 5 km au 100 km, en route, piste ou trail.",
      "Le marathon officiel mesure 42,195 km.",
      "Le départ est groupé, chronométré individuellement par puce électronique.",
      "Les ravitaillements officiels sont placés tous les 5 km en moyenne sur marathon.",
      "Sur route, suivre le tracé officiel est obligatoire pour valider le chrono."
    ]
  },
  "Trail running": {
    why: "La course à pied en pleine nature, avec dénivelé. Le trail est un sport d'aventure : tu traverses des montagnes, des forêts, des sentiers. Plus exigeant techniquement que le running sur route.",
    rules: [
      "Distances variables : du 10 km à l'ultra trail (100 km et plus).",
      "Le tracé est balisé en pleine nature : sentiers, montagne, forêt.",
      "Matériel obligatoire variable selon la course (veste, lampe, gobelet, vivres).",
      "Les barrières horaires aux ravitaillements éliminent les coureurs trop lents.",
      "Le respect des balises et le no littering (zéro déchet) sont stricts."
    ]
  },
  "Marathon": {
    why: "42,195 km. Le marathon est plus qu'une distance, c'est un défi de toute une vie. Tu cours contre toi-même autant que contre le chrono. Une fois fini, tu fais partie d'un club mondial.",
    rules: [
      "Distance officielle : 42,195 km exactement.",
      "Départ groupé, classement au temps officiel mesuré sur puce.",
      "Plusieurs catégories d'âge : Senior, Master 1, Master 2, etc.",
      "Le record du monde se court sous les 2h 02min (hommes).",
      "Pour un record officiel, le parcours doit être homologué par World Athletics."
    ]
  },
  "Cyclisme route": {
    why: "Le vélo sur route est le sport d'endurance par excellence : tu peux rouler 5 ou 5 heures, à plat ou en montagne. Sport individuel en compétition mais collectif dans l'effort, le cyclisme a une histoire mythique en France.",
    rules: [
      "Courses en peloton (course en ligne) ou contre-la-montre (départ individuel).",
      "Pendant une course en ligne, l'équipe peut adopter des stratégies (échappée, abri, sprint).",
      "Plusieurs maillots dans les grands tours : leader général, meilleur grimpeur, meilleur sprinteur, meilleur jeune.",
      "Casque obligatoire, vélo conforme au règlement UCI.",
      "Le sprint final, la chute, la montagne et le chrono sont les quatre temps forts du cyclisme."
    ]
  },
  "Cyclisme piste": {
    why: "Le vélo en vélodrome, sur une piste en bois inclinée. Discipline ultra-spectaculaire en JO : sprint, keirin, omnium, course aux points. C'est de la vitesse pure et des stratégies courtes.",
    rules: [
      "Vélos sans frein, à pignon fixe (tu ne peux pas arrêter de pédaler).",
      "Plusieurs épreuves : sprint, keirin, poursuite, omnium, scratch, kilomètre lancé.",
      "Le sprint se court à deux ou trois coureurs en confrontation directe.",
      "Le keirin se court derrière un derny qui lâche les coureurs à un tour de la fin.",
      "L'omnium est une épreuve combinée en 4 manches."
    ]
  },
  "VTT": {
    why: "Le vélo qui descend des montagnes, qui saute, qui s'amuse. Plusieurs disciplines : XC pour l'endurance, descente pour les sensations, enduro pour les deux. Le VTT, c'est l'esprit nature et l'esprit libre.",
    rules: [
      "Plusieurs disciplines : Cross-Country (XC), Descente (DH), Enduro, Trial, Dirt.",
      "En XC : course sur un circuit en boucle, chrono ou classement à l'arrivée.",
      "En DH : descente chronométrée individuelle sur un parcours technique.",
      "En enduro : plusieurs spéciales chronométrées avec liaisons libres entre elles.",
      "Casque intégral obligatoire en descente, casque classique en XC."
    ]
  },
  "BMX": {
    why: "Vélo court, robuste, qui saute. Le BMX se décline en race (course sur dirt) et freestyle (figures sur park ou street). Très populaire chez les jeunes, sport olympique depuis 2008.",
    rules: [
      "Race : 8 coureurs partent ensemble, courent un circuit de 350 à 400 m avec bosses et virages relevés.",
      "Freestyle (park) : runs notés par les juges sur figures, hauteur, exécution.",
      "Casque intégral obligatoire en race et freestyle.",
      "Les vélos race sont rigides, sans suspension.",
      "Les chrono sont au 1/1000e de seconde."
    ]
  },
  "Judo": {
    why: "L'art doux né au Japon. Tu utilises la force de l'adversaire pour le projeter au sol. C'est le sport martial olympique le plus pratiqué en France. Le code moral du judo (politesse, courage, sincérité) est aussi important que la technique.",
    rules: [
      "Combat sur tatami carré de 8x8 m minimum.",
      "Objectif : marquer ippon (point parfait), waza-ari (demi-point) en projetant, immobilisant ou par clé/étranglement.",
      "Ippon termine immédiatement le combat. Deux waza-ari valent un ippon.",
      "Combat de 4 minutes (seniors), prolongation en golden score si égalité.",
      "Sortie de tatami, passivité ou faute grave entraînent des shido (avertissements)."
    ]
  },
  "Karaté": {
    why: "Le karaté combine techniques de coups de pieds et de poings, formes (kata) et combats (kumite). C'est un sport complet : explosivité, équilibre, mental, respect. Les ceintures marquent la progression sur de longues années.",
    rules: [
      "Deux disciplines : kata (forme imposée notée par juges) et kumite (combat).",
      "Combat : 3 minutes, on marque ippon (3 pts), waza-ari (2 pts) ou yuko (1 pt).",
      "Coups de pied au visage (mawashi geri jodan) valent plus que les coups de poing.",
      "Le contact doit être contrôlé : un coup excessif est sanctionné.",
      "Le kata est noté par 7 juges sur 10 points."
    ]
  },
  "Taekwondo": {
    why: "Art martial coréen, spécialiste des coups de pied hauts et sautés. Le taekwondo est olympique depuis 2000. Discipline spectaculaire, rapide, exigeant souplesse et explosivité.",
    rules: [
      "Combat de 3 reprises de 2 minutes.",
      "Les protections (plastron électronique, casque) enregistrent automatiquement les points.",
      "Un coup de pied au plastron vaut 2 pts, retourné 4 pts, au casque 3 pts (5 si retourné).",
      "Coup de poing au plastron : 1 point uniquement.",
      "10 pts d'écart entraînent la victoire avant la fin du temps."
    ]
  },
  "Boxe anglaise": {
    why: "Le noble art. Deux poings, deux gardes, douze rounds maximum. La boxe est l'un des sports les plus exigeants au monde : endurance, technique, mental, courage. Une école de vie pour beaucoup de boxeurs.",
    rules: [
      "Combat en 3 rounds (amateur, 3 minutes chacun) ou 12 rounds (pro, 3 min).",
      "Coups autorisés : poings uniquement, au-dessus de la ceinture.",
      "Knock-out (KO), abandon, arrêt de l'arbitre, ou décision aux points en fin de combat.",
      "Trois juges notent chaque round de 10 points (10-9, 10-8 en cas de KD).",
      "Un boxeur compté trois fois est mis hors combat technique."
    ]
  },
  "Savate / Boxe française": {
    why: "Boxe française née au 19e siècle à Paris. Mélange unique de coups de poing et coups de pied avec chaussons. Discipline élégante, technique, exigeante en mobilité et en distance.",
    rules: [
      "Combat en 4 ou 5 rounds de 1 min 30 (assaut) ou 2 min (combat).",
      "Coups autorisés : poings (boxe anglaise) + coups de pied bas, médians, hauts.",
      "Assauts : contact contrôlé, jugé sur la technique.",
      "Combats : KO et arrêt possibles, gants plus durs.",
      "Une faute grave entraîne avertissement, perte de point ou disqualification."
    ]
  },
  "Muay Thai / Kick-boxing": {
    why: "Le boxe thaï est surnommé l'art des 8 membres : poings, pieds, coudes, genoux. C'est un art martial complet et brutal, originaire de Thaïlande. Le kick-boxing est sa version internationalisée.",
    rules: [
      "Combat en 5 rounds de 3 minutes en muay thaï traditionnel.",
      "Toutes les armes du corps autorisées : poings, pieds, coudes, genoux, clinch.",
      "Le clinch (corps à corps) est autorisé et utilisé pour les coups de genou.",
      "KO, abandon, arrêt arbitre, décision aux points.",
      "En kick-boxing classique, les coudes sont parfois interdits."
    ]
  },
  "MMA (Arts Martiaux Mixtes)": {
    why: "Le MMA mixe striking (boxe, muay thaï), lutte (wrestling, judo) et grappling (jiu-jitsu brésilien). Sport complet et discipliné, légalisé en France depuis 2020 sous l'égide de la FMMAF.",
    rules: [
      "Combat dans un octogone ou ring, 3 rounds de 5 min (ou 5 rounds en titre).",
      "Toutes les techniques debout et au sol autorisées sauf les coups interdits (œil, gorge, parties intimes, nuque, doigts).",
      "Victoires possibles : KO, soumission, arrêt arbitre, décision juges, abandon.",
      "Catégories de poids strictes, pesée la veille.",
      "Combats encadrés par une commission, suivi médical obligatoire."
    ]
  },
  "Escrime": {
    why: "L'art du duel à l'arme blanche. Trois armes : fleuret, épée, sabre, chacune avec ses règles. L'escrime est un sport de réflexes, de stratégie, et un fleuron des Jeux Olympiques français.",
    rules: [
      "Trois armes : fleuret (touche du tronc), épée (tout le corps), sabre (haut du corps + tête).",
      "Match en poule en 5 touches, élimination directe en 15 touches.",
      "Fleuret et sabre : règles de priorité (qui attaque touche en premier).",
      "Épée : pas de priorité, le premier qui touche marque (touche double possible).",
      "Le combat se déroule sur une piste de 14 m de long."
    ]
  },
  "Lutte": {
    why: "L'un des sports les plus anciens du monde, présent dès les premiers Jeux antiques. La lutte demande force, technique, et stratégie. Deux styles olympiques : libre (tout le corps) et gréco-romaine (haut du corps).",
    rules: [
      "Deux styles olympiques : lutte libre et lutte gréco-romaine.",
      "En gréco-romaine : interdiction de saisir en dessous de la ceinture.",
      "Objectif : tomber l'adversaire sur les épaules (tomber, fin immédiate).",
      "Sinon, victoire aux points (techniques notées 1, 2, 4 ou 5 pts).",
      "Deux périodes de 3 minutes, pause de 30 secondes."
    ]
  },
  "Lutte gréco-romaine": {
    why: "Style de lutte le plus ancien encore pratiqué, où seules les saisies au-dessus de la ceinture sont autorisées. La gréco demande un haut du corps puissant et une technique de projection précise.",
    rules: [
      "Aucune action en dessous de la ceinture (ni saisie, ni pied).",
      "Deux périodes de 3 minutes, pause de 30 sec.",
      "Tombé sur les épaules met fin immédiatement au combat.",
      "Sinon classement aux points : 1, 2, 4 ou 5 pts selon technique.",
      "Catégories de poids strictes, pesée la veille."
    ]
  },
  "Lutte libre": {
    why: "Style de lutte plus ouvert que la gréco : saisies aux jambes autorisées, prises plus variées. La lutte libre est aussi pratiquée par les femmes en JO.",
    rules: [
      "Saisies autorisées sur tout le corps, jambes comprises.",
      "Tombé sur les deux épaules met fin au combat.",
      "Sinon victoire aux points : 1, 2, 4 ou 5 pts selon technique.",
      "Deux périodes de 3 min, pause de 30 sec.",
      "Catégories de poids strictes, pesée la veille."
    ]
  },
  "BJJ / Jiu-jitsu brésilien": {
    why: "L'art doux au sol. Le BJJ enseigne que la technique bat la force : un petit gabarit peut soumettre un grand grâce aux leviers et étranglements. Devenu mondialement célèbre grâce au MMA.",
    rules: [
      "Combat principalement au sol, debout brièvement.",
      "Victoire par soumission (tapotement de l'adversaire) ou aux points.",
      "Points : passage de garde (3), montée (4), dos pris (4), balayage (2), takedown (2).",
      "Durée variable : 5 à 10 min selon catégorie et ceinture.",
      "Système de ceintures distinct du judo : blanche, bleue, violette, marron, noire."
    ]
  },
  "Aïkido": {
    why: "Art martial japonais centré sur la maîtrise et la non-violence. On ne combat pas pour vaincre mais pour neutraliser. Pas de compétition au sens classique : l'aïkido se pratique en démonstration et perfectionnement.",
    rules: [
      "Pas de compétition sportive officielle : la pratique vise la maîtrise.",
      "Techniques basées sur les déviations, projections et immobilisations.",
      "Pratique avec ou sans armes (jo, bokken, tanto).",
      "Système de grades : kyu (élève) puis dan (ceinture noire).",
      "Le travail se fait en partenariat : uke (attaquant) / tori (défenseur)."
    ]
  },
  "Sumo": {
    why: "Le sport national japonais, ancestral et codifié. Deux colosses dans un cercle de 4,55 m de diamètre. Premier au sol ou hors du cercle a perdu. Un mélange de rite, de puissance et de tradition.",
    rules: [
      "Cercle de 4,55 m de diamètre (dohyo).",
      "Victoire : pousser l'adversaire hors du cercle ou lui faire toucher le sol avec autre chose que la plante des pieds.",
      "Pas de catégorie de poids.",
      "Rites importants avant chaque combat (sel, gestes purificateurs).",
      "Combat très court : souvent quelques secondes."
    ]
  },
  "Capoeira": {
    why: "Art martial brésilien né de l'esclavage, mêlant combat, danse et acrobatie au son du berimbau. Plus qu'un sport, c'est une culture : musique, chant, jeu, expression corporelle.",
    rules: [
      "Pratique principalement dans une roda (cercle) avec musique en live.",
      "Pas de compétition au sens classique : c'est un jeu (jogo).",
      "Techniques basées sur l'esquive et les coups de pied circulaires.",
      "Système de cordes (cordas) pour marquer le niveau.",
      "Le contact direct est rare : le but est de mettre l'autre en difficulté visuelle."
    ]
  },
  "Équitation": {
    why: "Un sport en duo avec un animal vivant. L'équitation demande des qualités rares : empathie, patience, technique, équilibre. Trois disciplines olympiques : saut d'obstacles, dressage, concours complet.",
    rules: [
      "Disciplines olympiques : saut d'obstacles (CSO), dressage, concours complet (CCE).",
      "CSO : franchir un parcours sans faute, le plus vite possible.",
      "Dressage : reprise codée notée par juges (figures imposées et libres).",
      "CCE : combinaison sur 3 jours (dressage + cross + saut).",
      "Bien-être du cheval surveillé : chute, fer perdu ou refus entraînent pénalités."
    ]
  },
  "Polo": {
    why: "Le sport des rois : 4 cavaliers par équipe, une balle, des maillets, et des chevaux changés à chaque chukker. C'est un sport collectif équestre exigeant, élégant et spectaculaire.",
    rules: [
      "Quatre cavaliers par équipe.",
      "Match en 4 à 8 chukkers (périodes) de 7 minutes.",
      "Les cavaliers changent de cheval entre chaque chukker.",
      "On marque en faisant entrer la balle dans le but adverse à l'aide d'un maillet.",
      "Règles strictes de priorité pour éviter les collisions de chevaux."
    ]
  },
  "Horse-ball": {
    why: "Mix de rugby, basket et polo : à cheval, on se passe un ballon à 6 anses et on marque dans un panier vertical. Sport collectif équestre français, spectaculaire et physique.",
    rules: [
      "Quatre cavaliers par équipe sur le terrain (8 dans l'effectif).",
      "Match en 2 mi-temps de 10 minutes.",
      "On marque en lançant un ballon (avec 6 anses) dans un panier vertical adverse.",
      "Trois passes minimum entre 3 cavaliers différents avant tout but.",
      "Le ramassage du ballon au sol depuis le cheval est l'un des gestes signature."
    ]
  },
  "Golf": {
    why: "Le sport de la précision et du calme. 18 trous, un parcours, un chrono inexistant : c'est toi contre le tracé. Le golf est un sport mental autant que technique, accessible à vie.",
    rules: [
      "Parcours de 18 trous, score le plus bas l'emporte.",
      "Chaque trou a un par (3, 4 ou 5 coups attendus pour un joueur scratch).",
      "Birdie (-1), eagle (-2), bogey (+1), double bogey (+2).",
      "Pénalité de 1 ou 2 coups selon la faute (hors limite, eau, etc.).",
      "Le handicap permet à des joueurs de niveaux différents de se mesurer."
    ]
  },
  "Footgolf": {
    why: "Tu joues au golf… avec un ballon de foot. Tu shootes depuis le tee jusqu'à un trou de 50 cm de diamètre. C'est accessible, fun, et beaucoup plus difficile qu'on ne le pense.",
    rules: [
      "Parcours de 9 ou 18 trous sur green de golf.",
      "Score le plus bas l'emporte (comme au golf classique).",
      "On joue avec un ballon de foot taille 5.",
      "Trous de 50 cm de diamètre, parfois à plusieurs mètres en l'air sur un green.",
      "Tenue : maillot, short et chaussettes hautes (style golf chic)."
    ]
  },
  "Tir à l'arc": {
    why: "Concentration absolue. Tu tires à 70 mètres sur une cible de 122 cm. Le tir à l'arc demande une stabilité physique et mentale extrême. Discipline olympique millénaire.",
    rules: [
      "Distance olympique : 70 m sur une cible de 122 cm de diamètre.",
      "Compétition en sets : premier à 6 points (3 sets gagnants en duel).",
      "Notes : 10 pts pour le centre, dégradation jusqu'à 1 pt en bordure.",
      "Plusieurs disciplines selon l'arc utilisé (recurve, compound, classique).",
      "Le tir doit être effectué dans un temps imparti par tir (20 sec en duel)."
    ]
  },
  "Tir sportif": {
    why: "Précision pure : pistolet, carabine ou plateaux. Le tir sportif est olympique depuis Athènes 1896. C'est un sport mental : ton seul adversaire est ta respiration et ton stress.",
    rules: [
      "Plusieurs disciplines : pistolet 10/25/50 m, carabine 10/50 m, plateaux (skeet, trap).",
      "Cibles notées en zones concentriques de 10 pts (centre) à 1 pt.",
      "Position : debout, à genoux ou couché selon la discipline.",
      "Le matériel est strictement réglementé (poids, calibre, déclencheur).",
      "Sport mental : maîtrise du souffle, gestion du stress."
    ]
  },
  "Ski alpin": {
    why: "Descendre une piste à 100 km/h sur deux planches. Le ski alpin combine vitesse, technique et adrénaline. Quatre disciplines olympiques : descente, super-G, géant, slalom.",
    rules: [
      "Quatre disciplines : descente, super-G, slalom géant, slalom.",
      "Chrono individuel : le meilleur temps gagne, parfois sur deux manches (slalom, géant).",
      "Tracé balisé par des portes obligatoires.",
      "Une porte manquée entraîne disqualification.",
      "Casque obligatoire, équipement homologué."
    ]
  },
  "Snowboard": {
    why: "Snowboard, c'est l'esprit freestyle sur la neige : tu rides, tu sautes, tu tournes. Plusieurs disciplines : freestyle (slopestyle, halfpipe), alpin (slalom), cross. Sport olympique depuis 1998.",
    rules: [
      "Disciplines : halfpipe, slopestyle, slalom géant, snowboard cross, big air.",
      "Freestyle (halfpipe, slopestyle) : notes des juges sur figures, hauteur, fluidité.",
      "Alpin : chrono, le meilleur temps gagne.",
      "Snowboard cross : course en groupe de 4 à 6 sur un parcours avec sauts et virages.",
      "Casque et protection dorsale recommandés (obligatoire en JO)."
    ]
  },
  "Ski de fond": {
    why: "L'endurance sur neige. Tu glisses et tu pousses sur des skis fins, parfois sur des heures. C'est l'un des sports les plus complets : tout le corps travaille. Mythique en Scandinavie et dans les Alpes.",
    rules: [
      "Deux techniques : classique (pas alternatif) et skating (pas de patineur).",
      "Distances olympiques : sprint (1,5 km), 10/15/30/50 km, relais.",
      "Le départ peut être individuel (chrono), groupé (mass start) ou par poursuite.",
      "En sprint, les coureurs s'affrontent en série de 6.",
      "Le matériel (skis, fart) est crucial selon la neige du jour."
    ]
  },
  "Ski alpinisme (SKIMO)": {
    why: "Le ski qui monte avant de descendre. Tu équipes tes skis de peaux pour monter, puis tu descends à fond. Olympique depuis 2026, ce sport combine endurance et technique de descente.",
    rules: [
      "Le coureur monte avec peaux de phoque, descend en mode ski alpin.",
      "Plusieurs portes obligatoires sur le parcours (montée et descente).",
      "Le matériel doit être conforme : skis légers, peaux, harnais, sonde.",
      "Course individuelle ou relais.",
      "Sécurité : DVA (détecteur de victimes d'avalanche), pelle, sonde obligatoires."
    ]
  },
  "Biathlon": {
    why: "Ski de fond + tir à la carabine. Le biathlon, c'est le sport d'hiver le plus suivi en Europe. Tu cours, tu te poses, tu vises au 1/10e de battement de cœur, tu repars.",
    rules: [
      "Combinaison ski de fond + tir à la carabine (50 m).",
      "Plusieurs formats : sprint, poursuite, individuel, mass start, relais.",
      "Chaque cible manquée se traduit par un tour de pénalité (150 m) ou 1 min ajoutée selon le format.",
      "Tirs alternés debout et couché.",
      "Cible de 4,5 cm de diamètre debout, 11,5 cm couché."
    ]
  },
  "Patinage artistique": {
    why: "L'élégance sur glace. Sauts, pirouettes, expressions artistiques : le patinage artistique est un mélange unique de sport et de spectacle. Très exigeant techniquement.",
    rules: [
      "Deux programmes : court (2 min 50) et libre (3 min 30 à 4 min 30).",
      "Notes : technique (éléments) + composantes (artistique).",
      "Chaque saut a un coefficient de difficulté (axel, salchow, lutz, boucle piqué, boucle, flip).",
      "Quatre tours (quadruple) sont les sauts les plus complexes.",
      "Pénalités pour chute, sortie ou élément invalide."
    ]
  },
  "Hockey sur glace": {
    why: "Le sport le plus rapide sur deux lames. 5 joueurs + un gardien, des passes courtes, un palet qui file à 150 km/h. Le hockey, c'est de la vitesse, du contact et un esprit d'équipe extrême.",
    rules: [
      "5 joueurs de champ + 1 gardien par équipe sur la glace.",
      "Trois tiers-temps de 20 minutes effectives.",
      "Pénalités majeures et mineures purgées sur un banc séparé (souvent 2 minutes).",
      "Le hors-jeu : entrer en zone offensive avant le palet est interdit.",
      "Contacts physiques (charges) autorisés à hauteur d'épaule."
    ]
  },
  "Escalade": {
    why: "Tu montes, tu lis le mur, tu doutes, tu gagnes. L'escalade est devenue olympique en 2021 avec trois disciplines : bloc, difficulté, vitesse. Sport mental autant que physique, en plein boom en France.",
    rules: [
      "Trois disciplines : bloc, difficulté (lead), vitesse.",
      "Bloc : voies courtes (4-5 m), sans corde, tapis en dessous.",
      "Difficulté : voie haute (15-20 m), assuré avec corde, atteindre le plus haut possible.",
      "Vitesse : duel sur un mur standardisé de 15 m, chrono.",
      "Aux JO : combiné Bloc + Difficulté, et Vitesse comme épreuve séparée."
    ]
  },
  "Triathlon": {
    why: "3 disciplines, 1 défi : nage, vélo, course à pied. Du sprint (750 m + 20 km + 5 km) à l'Ironman (3,8 km + 180 km + 42 km). Sport ultime d'endurance.",
    rules: [
      "Trois disciplines enchaînées : natation, vélo, course à pied.",
      "Distances olympiques : 1,5 km nage + 40 km vélo + 10 km course.",
      "Ironman : 3,8 km + 180 km + 42,2 km.",
      "Les transitions (T1, T2) sont chronométrées.",
      "Drafting interdit en vélo (sauf élite) : 7 m de distance avec le coureur devant."
    ]
  },
  "Boccia": {
    why: "Sport de précision et de stratégie, accessible à tous, y compris en situation de handicap moteur sévère. Tu lances des boules pour les rapprocher d'un jack. Discipline paralympique majeure.",
    rules: [
      "Chaque joueur a 6 boules à lancer vers un jack (boule blanche).",
      "Le but : approcher au plus près du jack.",
      "Joué individuellement, en pair ou en triple.",
      "Chaque manche, on compte les boules les plus proches du jack que celle de l'adversaire.",
      "Sport paralympique avec catégories BC1 à BC4."
    ]
  },
  "Goalball": {
    why: "Sport collectif paralympique pour personnes déficientes visuelles. Tous les joueurs portent des bandeaux opaques pour égaliser. Le ballon a des grelots et on doit le bloquer pour le renvoyer.",
    rules: [
      "Trois joueurs par équipe, bandeaux opaques obligatoires pour tous.",
      "Le ballon (avec grelots) est lancé au sol vers le but adverse.",
      "Le but : empêcher la balle d'entrer dans son but de 9 m.",
      "Match en 2 mi-temps de 12 minutes.",
      "Silence absolu requis pendant les phases de tir et de défense."
    ]
  },
  "Cécifoot": {
    why: "Football pour personnes non-voyantes. 5 joueurs par équipe, ballon avec grelots, et un guide derrière chaque but pour orienter. Discipline paralympique impressionnante.",
    rules: [
      "Cinq joueurs par équipe (4 de champ + 1 gardien voyant).",
      "Bandeau opaque obligatoire pour les joueurs de champ.",
      "Ballon sonore (avec grelots) utilisé.",
      "Match en 2 mi-temps de 15 minutes.",
      "Trois guides : entraîneur, milieu de terrain et derrière le but."
    ]
  },
  "Handbike": {
    why: "Le vélo à propulsion par les bras. Le handbike permet aux athlètes en situation de handicap des membres inférieurs de pratiquer le cyclisme. Discipline paralympique compétitive.",
    rules: [
      "Vélo couché propulsé par les bras au moyen de manivelles.",
      "Plusieurs catégories selon le handicap (H1 à H5).",
      "Courses sur route et contre-la-montre.",
      "Casque obligatoire, équipement spécifique homologué.",
      "Pratique compétitive et loisir."
    ]
  },
  "Curling": {
    why: "Le sport le plus cérébral des Jeux d'hiver. Tu lances une pierre de 20 kg sur la glace, tes coéquipiers brossent pour ajuster la trajectoire. Tactique, précision, stratégie : un jeu d'échecs sur glace.",
    rules: [
      "Quatre joueurs par équipe.",
      "Chaque équipe lance 8 pierres par manche (end).",
      "Le but : placer ses pierres au plus près du centre de la cible (la maison).",
      "Le balayage par les coéquipiers permet d'allonger la trajectoire.",
      "Le match dure 10 manches (8 en mixte double)."
    ]
  },
  "Échecs": {
    why: "Le sport mental absolu. 64 cases, 32 pièces, des millions de combinaisons. Les échecs sont reconnus comme sport olympique par le CIO. Concentration, stratégie, anticipation : tout se joue dans la tête.",
    rules: [
      "Plateau de 64 cases (8x8), 16 pièces par joueur.",
      "Le but : mettre le roi adverse en échec et mat.",
      "Chaque pièce a un déplacement spécifique (cavalier en L, fou en diagonale, etc.).",
      "Le pion peut être promu en arrivant à la dernière rangée.",
      "Cadences variables : blitz (3-5 min), rapide (15-30 min), classique (90+ min)."
    ]
  },
  "Bridge": {
    why: "Le sport de cartes le plus stratégique. 4 joueurs en équipes de 2, des enchères, du déclarant, des contrats. Reconnu comme sport par le CIO. Communauté énorme et compétitions mondiales.",
    rules: [
      "Quatre joueurs en deux équipes (Nord-Sud vs Est-Ouest).",
      "Jeu en deux phases : enchères puis jeu de la carte.",
      "L'enchère gagnante fixe un contrat (couleur et nombre de levées).",
      "Le déclarant joue avec les cartes de son partenaire (le mort) visibles.",
      "Le score dépend du contrat atteint, doublé/redoublé, vulnérabilité."
    ]
  },
  "Yoga / Pilates": {
    why: "Pas tant un sport qu'une discipline de bien-être : tu travailles ton corps, ton souffle, ton mental. Le yoga est millénaire, le pilates a 100 ans. Tous deux développent la souplesse, le gainage, la conscience corporelle.",
    rules: [
      "Pratique non compétitive en règle générale.",
      "Yoga : enchaînement de postures (asanas) et de respiration (pranayama).",
      "Pilates : exercices de gainage et de contrôle, parfois sur machine (reformer).",
      "Plusieurs styles : Hatha, Vinyasa, Ashtanga, Iyengar, Yin pour le yoga.",
      "L'objectif est la progression individuelle, pas la performance."
    ]
  },
  "CrossFit / Functional Fitness": {
    why: "Le CrossFit a popularisé le fitness fonctionnel : tu mélanges haltérophilie, cardio, gymnastique. WOD (Workout of the Day) court mais intense, mesuré au chrono ou en répétitions.",
    rules: [
      "Programme quotidien (WOD) mélangeant force, gym, cardio.",
      "Compétition : Open en ligne, puis Régionaux, puis Games.",
      "Chrono ou répétitions : le meilleur temps ou nombre l'emporte.",
      "Mouvements signature : snatch, clean & jerk, muscle-up, double-under, burpee.",
      "Sécurité : forme prime sur charge, mais l'intensité est centrale."
    ]
  },
  "Musculation / Haltérophilie": {
    why: "L'haltéro olympique : 2 mouvements (arraché, épaulé-jeté), 2 chances par poids. C'est un sport de précision technique autant que de force pure. La barre s'envole en une seconde.",
    rules: [
      "Deux mouvements : arraché (snatch) et épaulé-jeté (clean & jerk).",
      "Trois essais par mouvement, le meilleur compte.",
      "Total olympique = meilleur arraché + meilleur épaulé-jeté.",
      "Catégories de poids strictes, pesée le matin du concours.",
      "Le mouvement doit être validé par 3 juges (lumière blanche = ok)."
    ]
  },
  "Force athlétique (powerlifting)": {
    why: "Trois mouvements : squat, développé couché, soulevé de terre. Le powerlifting mesure la force brute. Trois essais par mouvement, le total compte. Sport en pleine croissance en France.",
    rules: [
      "Trois mouvements dans cet ordre : squat, bench press, soulevé de terre.",
      "Trois essais par mouvement, le meilleur valide compte.",
      "Total = somme des 3 meilleurs essais.",
      "Catégories de poids et d'âge strictes.",
      "Validation par 3 juges, équipement homologué (barre, plateformes)."
    ]
  },
  "Trampoline": {
    why: "Tu sautes à 8 mètres de haut, tu fais des doubles vrilles, tu retombes au centre. Le trampoline est olympique depuis 2000. Discipline aérienne ultra-impressionnante.",
    rules: [
      "Routine de 10 sauts enchaînés (programme libre).",
      "Notation : difficulté + exécution + temps de vol + déplacement.",
      "Le rebond final stoppé est obligatoire.",
      "Trampoline standard : 5,05 x 2,91 m.",
      "Olympique individuel + synchronisée (par paire)."
    ]
  },
  "Gym artistique masculine": {
    why: "Six agrès : sol, cheval, anneaux, saut, barres parallèles, barre fixe. Six expressions de force, d'équilibre, de précision. La gym artistique forge des corps et des mentaux exceptionnels.",
    rules: [
      "Six agrès en masculin : sol, cheval d'arçons, anneaux, saut, barres parallèles, barre fixe.",
      "Notation : note D (difficulté) + note E (exécution).",
      "Pénalités pour chute, sortie, fautes techniques.",
      "Concours par équipe, individuel général, individuel par agrès.",
      "Code de pointage actualisé tous les 4 ans."
    ]
  },
  "Gymnastique rythmique (GR)": {
    why: "La grâce et la précision : tu enchaînes des figures avec un engin (corde, cerceau, ballon, massues, ruban). Discipline féminine olympique, exigeant souplesse et expressivité extrêmes.",
    rules: [
      "Cinq engins : corde, cerceau, ballon, massues, ruban (1 par routine).",
      "Routine de 1 min 15 à 1 min 30, en musique.",
      "Notation : difficulté + exécution + artistique.",
      "L'engin doit rester en mouvement (pas de tenue statique).",
      "Compétitions individuelles + ensemble (5 gymnastes synchronisées)."
    ]
  },
  "Gym acrobatique": {
    why: "Gym à plusieurs : pyramides humaines, projections, équilibres en duo, trio ou quatuor. Confiance entre partenaires, force, technique : la gym acrobatique est spectaculaire.",
    rules: [
      "Discipline en duo, trio ou quatuor.",
      "Routines au sol avec musique (équilibre, dynamique, combiné).",
      "Notation : exécution + artistique + difficulté.",
      "Les figures imposent un porteur (souvent plus grand) et un voltigeur.",
      "Pas d'engin, contrairement à la GR."
    ]
  },
  "Skateboard": {
    why: "Le skate, c'est l'expression brute. Tu rides où tu veux : rue, park, vert ramp. Olympique depuis 2021, le skate est devenu une vraie discipline reconnue tout en gardant son ADN street.",
    rules: [
      "Deux disciplines olympiques : street et park.",
      "Street : éléments urbains (escaliers, rails, marches) à enchaîner sur 45 sec.",
      "Park : bowl où le rider enchaîne tricks et lignes.",
      "Notation : difficulté, exécution, originalité, hauteur, vitesse.",
      "Tu as 2 ou 3 runs + best tricks selon les compétitions."
    ]
  },
  "Roller / Skateboard": {
    why: "La glisse urbaine : roller en ligne ou skate, tu rides partout. Plusieurs disciplines : artistique, course, freestyle, randonnée. Sport accessible et populaire en ville.",
    rules: [
      "Plusieurs disciplines en roller : course, artistique, hockey, freeride.",
      "Course : sur piste ou route, chrono individuel ou groupé.",
      "Artistique : figures et chorégraphies sur glace ou parquet, notation juge.",
      "Skate : street ou park, runs notés.",
      "Casque recommandé, protections obligatoires en compétition."
    ]
  },
  "Parkour / Freerun": {
    why: "Le déplacement en milieu urbain : courir, sauter, escalader, rouler. Le parkour vise l'efficacité, le freerun la créativité. Discipline qui se développe en compétition internationale.",
    rules: [
      "Deux approches : parkour (efficacité, ligne directe) et freerun (créativité, figures).",
      "Compétitions : speed (chrono) et style (notation juges).",
      "Speed : chrono pour traverser un parcours imposé.",
      "Style : enchaînement libre noté sur originalité, fluidité, difficulté.",
      "Sport reconnu officiellement par la FIG depuis 2017."
    ]
  },
  "Parapente": {
    why: "Tu cours, tu décolles, tu voles. Le parapente, c'est la liberté à l'état pur, sans moteur. En thermique, tu peux rester en l'air pendant des heures et parcourir des centaines de kilomètres.",
    rules: [
      "Décollage à pied depuis une pente, vol sous une voile souple.",
      "Disciplines : Cross-country (distance), précision d'atterrissage, acrobatie.",
      "Cross : objectif distance parcourue ou objectif déclaré atteint.",
      "Précision : se poser au plus près d'une cible.",
      "Licence et formation initiale obligatoires."
    ]
  },
  "Deltaplane": {
    why: "L'ancêtre du parapente, plus rigide, plus rapide. Tu voles allongé sous une aile triangulaire en aluminium. Sensations fortes et grandes distances possibles.",
    rules: [
      "Décollage à pied ou treuillé sous une aile rigide.",
      "Disciplines : cross-country, précision d'atterrissage, acrobatie.",
      "Cross : chasser les thermiques pour parcourir des dizaines à centaines de km.",
      "Licence et formation initiale obligatoires.",
      "Casque, parachute de secours, harnais homologué."
    ]
  },
  "ULM": {
    why: "L'ultraléger motorisé : un avion compact, léger, accessible. Plusieurs classes : pendulaire, paramoteur, multiaxes, autogyre. Plus accessible qu'un avion classique, mais demande une formation.",
    rules: [
      "Cinq classes d'ULM : pendulaire, paramoteur, multiaxes, autogyre, hélicoptère ultraléger.",
      "Brevet de pilote ULM obligatoire (théorie + pratique).",
      "Vol à vue (VFR), de jour, sans IFR.",
      "Hauteur de vol et zones réglementées.",
      "Visite médicale et radio-navigation obligatoires."
    ]
  },
  "Saut à ski": {
    why: "Tu prends un tremplin de 90 ou 120 mètres, tu décolles, tu voles 100+ mètres. Le saut à ski demande courage, technique d'envol et stabilité dans l'air.",
    rules: [
      "Deux tremplins olympiques : normal (HS 109 m) et grand (HS 140 m).",
      "Notation : distance + style (5 juges).",
      "Style noté sur vol, posture, atterrissage (télémark préféré).",
      "Distance mesurée à 0,5 m près.",
      "Vent et vitesse compensés par bonus/malus."
    ]
  },
  "Combiné nordique": {
    why: "Saut à ski + ski de fond. Tu sautes le matin, tu skies l'après-midi. Sport hivernal exigeant, intégralement masculin aux JO jusqu'en 2026.",
    rules: [
      "Deux épreuves : saut à ski + course de ski de fond.",
      "Le résultat du saut donne un handicap temps pour la course (Gundersen).",
      "Distance de fond : 10 km individuel, 4x5 km relais.",
      "Le premier à franchir la ligne d'arrivée gagne.",
      "Pas de chrono séparé : la course détermine le vainqueur."
    ]
  },
  "Luge": {
    why: "Sport olympique de glisse : tu descends une piste glacée à plus de 130 km/h, couché sur le dos sur une luge minuscule. Pure adrénaline et précision millimétrée.",
    rules: [
      "Position couchée sur le dos, pieds devant.",
      "Quatre disciplines olympiques : individuelle (H et F), double, relais par équipe.",
      "Quatre manches, somme des temps.",
      "La piste est commune avec bobsleigh et skeleton.",
      "Vitesse de pointe : 130-140 km/h."
    ]
  },
  "Bobsleigh": {
    why: "Engin lourd, blindé, pour 2 ou 4 athlètes. Tu pousses sur 50 m, tu sautes dedans, tu fonces à 150 km/h dans une piste de glace. Sport spectaculaire et exigeant en explosivité.",
    rules: [
      "Équipages de 2 ou 4 athlètes.",
      "Quatre manches, somme des temps.",
      "Vitesse de pointe : 150 km/h.",
      "Le départ (push start) est crucial : explosivité sur 50 m.",
      "Le bobsleigh féminin existe en 2 (monobob et bob à 2)."
    ]
  },
  "Skeleton": {
    why: "Comme la luge, mais tête en avant et à plat ventre. Sensations limites, sport olympique depuis 2002 chez les hommes et les femmes. Pas pour les claustros.",
    rules: [
      "Position à plat ventre, tête en avant.",
      "Quatre manches, somme des temps.",
      "Vitesse de pointe : 130 km/h.",
      "Le pilote dirige avec les épaules, les genoux et les pointes des pieds.",
      "Casque intégral obligatoire."
    ]
  },
  "Course d'orientation": {
    why: "Tu cours en pleine nature avec une carte et une boussole. Sport mental et physique : lire vite, courir vite. Une discipline complète pour les amoureux du plein air.",
    rules: [
      "Le coureur doit trouver des balises dans un ordre précis (ou libre selon discipline).",
      "Chaque balise est pointée par un poinçon électronique (SPORTident).",
      "Le meilleur temps de parcours gagne.",
      "Formats : longue distance, moyenne, sprint, relais.",
      "Lecture de carte topographique + boussole obligatoires."
    ]
  },
  "Plongée sous-marine": {
    why: "Tu explores un monde sous l'eau. Plus qu'un sport, c'est une discipline d'apprentissage du milieu marin. En compétition, plusieurs orientations possibles : technique, photo, apnée.",
    rules: [
      "Différents niveaux de qualification (PE12, PA20, PA40, PE60, etc.).",
      "Plongée toujours en binôme minimum.",
      "Profondeur et durée encadrées par les tables de plongée.",
      "Paliers de décompression obligatoires en profondeur.",
      "Équipement obligatoire : détendeur, gilet stabilisateur, ordinateur de plongée."
    ]
  },
  "Apnée / Freediving": {
    why: "Sport de retenue de souffle. Tu descends en apnée, ou tu tiens en statique le plus longtemps possible. L'apnée demande maîtrise mentale absolue.",
    rules: [
      "Plusieurs disciplines : statique (durée), dynamique (distance en piscine), profondeur (poids constant, poids variable, no limits).",
      "Sécurité absolue : toujours en binôme, jamais seul.",
      "Records mondiaux : plus de 11 minutes en statique, plus de 130 m en poids constant.",
      "Validation officielle par juges AIDA ou CMAS.",
      "Préparation mentale et respiratoire centrale."
    ]
  },
  "Spéléologie": {
    why: "L'exploration sous terre : grottes, gouffres, rivières souterraines. Plus qu'un sport, c'est une discipline d'aventure. La France abrite certains des plus beaux réseaux d'Europe.",
    rules: [
      "Exploration en équipe d'au moins 3 personnes.",
      "Matériel : casque, lampe, baudrier, descendeur, bloqueurs.",
      "Maîtrise des techniques de progression sur corde (TPSC).",
      "Pratique non compétitive en général, mais existe en spéléo sportive.",
      "Toujours informer l'extérieur du projet d'exploration."
    ]
  },
  "Cricket": {
    why: "Le 2e sport le plus pratiqué au monde, surtout en Asie, au Royaume-Uni et en Australie. Mix de baseball et de stratégie longue. Matches de quelques heures à plusieurs jours.",
    rules: [
      "Deux équipes de 11 joueurs.",
      "Une équipe bat (essaie de marquer des runs), l'autre lance et défend.",
      "Le batteur frappe avec une batte, court entre deux wickets pour marquer.",
      "Plusieurs formats : Test (5 jours), ODI (1 jour), T20 (3-4 heures).",
      "Un run = un aller-retour entre wickets. Six = balle hors terrain à la volée."
    ]
  },
  "Baseball / Softball": {
    why: "Sport national américain. Frapper une balle lancée, courir les bases, marquer un point. Le softball est la version féminine olympique. Stratégie, précision, esprit collectif.",
    rules: [
      "Neuf joueurs par équipe, alternance attaque/défense en manches (innings).",
      "Match en 9 manches au baseball, 7 au softball.",
      "Le batteur doit frapper une balle lancée par le pitcher.",
      "Trois strikes = retiré. Quatre balles hors zone = base sur balles.",
      "Tour complet des 4 bases = un point (run)."
    ]
  },
  "Hockey sur gazon": {
    why: "Le hockey sur pelouse synthétique, originaire de l'Asie. 11 contre 11, une crosse et une balle dure. Sport olympique très technique, très rapide.",
    rules: [
      "Onze joueurs par équipe (dont un gardien).",
      "Quatre quart-temps de 15 minutes effectives.",
      "On joue avec une crosse plate d'un seul côté.",
      "Le but : envoyer la balle dans la cage adverse depuis l'intérieur du cercle de tir.",
      "Pas de hors-jeu, contrairement au football."
    ]
  },
  "Futsal": {
    why: "Le football en salle, 5 contre 5, sur parquet. Plus rapide, plus technique que le foot classique, le futsal forme énormément de stars du foot mondial (Messi, Iniesta y ont débuté).",
    rules: [
      "Cinq joueurs par équipe (dont un gardien), match en 2 mi-temps de 20 minutes effectives.",
      "Ballon plus petit et lesté que le ballon de foot classique.",
      "Pas de touche aérienne : remise en jeu au pied.",
      "Fautes accumulées : à partir de la 5e par mi-temps, coup-franc direct du point de penalty long.",
      "Pas de hors-jeu."
    ]
  },
  "Beach Soccer": {
    why: "Foot sur sable, 5 contre 5. Tu joues pieds nus, le terrain est moelleux, les passes lobées sont rois. Spectaculaire, fun, en plein essor en France.",
    rules: [
      "Cinq joueurs par équipe (dont un gardien).",
      "Trois périodes de 12 minutes.",
      "Joué pieds nus sur sable.",
      "Pas de match nul : prolongation puis tirs au but si égalité.",
      "Pas de hors-jeu, remises en jeu à la main."
    ]
  },
  "Pelote basque": {
    why: "Sport traditionnel du Pays Basque, joué contre un mur (fronton). Plusieurs spécialités selon l'instrument : main nue, paleta, chistera. Très technique et spectaculaire.",
    rules: [
      "Joué contre un mur (fronton) ou dans un trinquet (mur + plafond).",
      "Plusieurs spécialités selon l'engin : main nue, pala, paleta, chistera, xare.",
      "On marque quand l'adversaire ne renvoie pas la balle correctement.",
      "Match en 30 ou 40 points selon la spécialité.",
      "La balle (pelote) est en cuir, très dure et rebondit fort."
    ]
  },
  "Boulingrin / Boules gazon": {
    why: "Le bowling sur gazon : tu lances des boules biaisées sur une pelouse plate. Sport de précision, très populaire en Grande-Bretagne et dans les pays du Commonwealth.",
    rules: [
      "Joué sur une pelouse plane.",
      "Le but : placer ses boules au plus près d'une boule cible (jack).",
      "Boules biaisées (déformées d'un côté) pour courber leur trajectoire.",
      "Joué en simple, double, triple ou quadruple.",
      "On marque les boules les plus proches du jack à chaque manche."
    ]
  },
  "Pétanque": {
    why: "Le sport de boules le plus populaire en France. Tu pointes ou tu tires, tu places tes boules près du cochonnet. Accessible à tous, social, stratégique.",
    rules: [
      "Joué en simple (3 boules), doublette (3 boules par joueur) ou triplette (2 boules par joueur).",
      "On lance les boules vers le cochonnet (but).",
      "Tireurs (pour déloger) et pointeurs (pour placer).",
      "Première équipe à 13 points l'emporte.",
      "Pieds joints au sol au moment du lancer (pé tanco en provençal)."
    ]
  },
  "Boules lyonnaises": {
    why: "Cousin de la pétanque, originaire de Lyon. Boules plus lourdes, terrain plus long, possibilité de prendre élan pour tirer. Sport plus codifié et technique.",
    rules: [
      "Joué sur un terrain de 27,5 m de long.",
      "Boules en métal plus lourdes (700 à 1 200 g).",
      "Pour tirer, le joueur peut prendre 3 ou 4 enjambées avant de lancer (par opposition à la pétanque).",
      "Joué en simple, doublette, triplette, quadrette.",
      "13 points par manche."
    ]
  },
  "Bowling": {
    why: "Tu fais tomber 10 quilles avec une boule. Sport mondialement populaire, accessible à tout âge, social et technique à la fois.",
    rules: [
      "Dix quilles à abattre à chaque cadre, avec deux essais maximum.",
      "Strike : 10 quilles au premier coup, bonus = points des 2 prochains coups.",
      "Spare : 10 quilles en 2 coups, bonus = points du prochain coup.",
      "Match en 10 cadres (frames).",
      "Score maximum : 300 (12 strikes consécutifs)."
    ]
  },
  "Billard": {
    why: "Mix de précision, géométrie et stratégie. Plusieurs disciplines : 8-ball, 9-ball, snooker, billard français. Le billard se joue concentré, en silence.",
    rules: [
      "Plusieurs disciplines : pool (8-ball, 9-ball), snooker, billard français (carambole).",
      "Snooker : 15 rouges + 6 couleurs, jouer alternativement rouge/couleur.",
      "8-ball : empocher ses billes (pleines ou rayées) puis la noire.",
      "Pénalité si on touche en premier une bille adverse.",
      "Le snooker à break record est à 147 points."
    ]
  },
  "Fléchettes électroniques": {
    why: "Tu lances des fléchettes sur une cible. Précision, calcul mental (501, cricket), c'est devenu un vrai sport pro, retransmis à la télé, avec des champions reconnus.",
    rules: [
      "Cible standard avec 20 secteurs + double et triple + bullseye.",
      "Format 501 : descendre de 501 à 0 exactement, en finissant sur un double.",
      "Format cricket : fermer les secteurs 15-20 + bull avant l'adversaire.",
      "Chaque tour : 3 fléchettes par joueur.",
      "Pied derrière la ligne (oche), à 2,37 m de la cible."
    ]
  },
  "Danse sportive": {
    why: "La danse en couple, codifiée et notée. Standard (valse, tango, quickstep) ou latine (samba, cha-cha-cha, rumba, paso doble, jive). Allure, technique, expression.",
    rules: [
      "Deux disciplines : standard (5 danses) et latin (5 danses).",
      "Notation par 5 à 9 juges sur technique, musicalité, présentation.",
      "Couple obligatoire (homme + femme, ou même genre en select).",
      "Tenue codifiée pour chaque discipline.",
      "Compétitions en rondes : éliminatoires, demi-finale, finale."
    ]
  },
  "Danse hip-hop": {
    why: "Tu bouges, tu crées, tu battles. Le hip-hop est né dans les ghettos de New York dans les années 70. Devenu une vraie discipline avec compétitions internationales et expression artistique.",
    rules: [
      "Plusieurs styles : breaking, popping, locking, hip-hop new style, krump.",
      "Compétitions : battles (1v1, 2v2, crews) ou choreography.",
      "Notation : technique, musicalité, originalité, performance.",
      "Battles : rounds courts (30 sec à 1 min), juges votent.",
      "Le breaking est devenu olympique en 2024."
    ]
  },
  "Breakdance / Breaking": {
    why: "Le breakdance est devenu olympique aux JO de Paris 2024. Tu enchaînes des power moves au sol, des freezes, des top rocks, tu battles ton adversaire. Énergie, créativité, musicalité.",
    rules: [
      "Battles 1 contre 1, juges votent à chaque round.",
      "Rounds courts (40 secondes typiquement).",
      "Notation : technique, vocabulaire, exécution, musicalité, créativité, personnalité.",
      "Le bboy/bgirl danse sur les morceaux choisis par le DJ en live.",
      "Discipline olympique depuis Paris 2024."
    ]
  },
  "Cheerleading": {
    why: "Sport collectif américain par excellence : pyramides humaines, projections, chorégraphies, cris. Très exigeant physiquement, sport reconnu par le CIO en 2021.",
    rules: [
      "Équipe mixte ou féminine, jusqu'à 24 athlètes.",
      "Routine de 2 min 30 mêlant pyramides, lancers (basket toss), tumblings, danse.",
      "Notation : difficulté + exécution + créativité.",
      "Pénalités pour chute, sortie de scène.",
      "Reconnu par le CIO depuis 2021."
    ]
  },
  "Tai-chi chuan": {
    why: "Art martial chinois lent, méditatif. Mouvements fluides et continus, idéal pour la santé, l'équilibre, la concentration. Pratiqué dans les parcs partout en Chine, populaire en France.",
    rules: [
      "Pratique principalement non compétitive (forme méditative).",
      "Existence d'une version sportive (kata noté ou poussée des mains).",
      "Plusieurs styles : Chen, Yang, Wu, Sun, Hao.",
      "Tournois : kata individuel, kata par paire, poussée des mains (tui shou).",
      "Notation : technique, fluidité, expressivité."
    ]
  },
  "Wushu / Kung-fu": {
    why: "L'art martial chinois codifié : techniques de boxe, armes traditionnelles, formes (taolu) ou combat (sanda). Discipline ancestrale qui forge corps et esprit.",
    rules: [
      "Deux familles : taolu (formes notées) et sanda (combat).",
      "Taolu : routine sans ou avec arme (sabre, lance, bâton, épée).",
      "Sanda : combat libre avec coups de poing, pied et projections.",
      "Notation taolu : difficulté + exécution + composition.",
      "Sanda : KO, sortie de plateforme ou points (1, 2 ou 3 pts)."
    ]
  },
  "Kendo": {
    why: "Le sabre japonais en version sportive. Tu portes l'armure, tu cries kiai en frappant, tu vises 4 zones officielles. Discipline ancestrale qui développe rigueur et respect.",
    rules: [
      "Combat avec shinai (sabre en bambou), armure complète (men, do, kote, tare).",
      "Quatre zones de touche valides : tête (men), poignets (kote), tronc (do), gorge (tsuki).",
      "Pour marquer : geste correct + cri (kiai) + impact + concentration (zanshin).",
      "Match en 2 points gagnants (ippon), 5 min.",
      "Pas de poids ou catégories : tout le monde combat ensemble."
    ]
  },
  "Sambo": {
    why: "L'art martial russe : mix de lutte et de judo, avec clés et étranglements. Sport olympique non au programme JO mais reconnu, très pratiqué en Europe de l'Est.",
    rules: [
      "Deux variantes : sambo sportif (proche du judo) et combat sambo (avec frappes).",
      "Victoire par projection parfaite (ippon), points ou soumission.",
      "Match en 5 minutes, prolongation possible.",
      "Kimono spécifique : veste rouge ou bleue, short, chaussons en cuir.",
      "Catégories de poids strictes."
    ]
  },
  "Aérobic sportif": {
    why: "Mélange de fitness et de gymnastique chorégraphiée. Tu enchaînes des éléments dynamiques sur de la musique. Spectaculaire, exigeant, parfait pour le cardio.",
    rules: [
      "Routine d'1 min 20 sur musique imposée par la discipline.",
      "Éléments obligatoires : sauts, push-ups, équilibres.",
      "Notation : artistique + exécution + difficulté.",
      "Compétitions en solo, duo, trio ou groupe (5 athlètes).",
      "Tenue chorégraphiée et synchronisée pour les groupes."
    ]
  },
  "Acrosport": {
    why: "Gym à plusieurs : duos, trios ou quatuors construisent pyramides et figures synchronisées. Discipline en plein développement, surtout dans le scolaire et l'universitaire.",
    rules: [
      "Discipline en duo, trio ou quatuor.",
      "Routine au sol sur musique.",
      "Notation : difficulté + exécution + artistique.",
      "Au moins un porteur (souvent plus fort) et un voltigeur.",
      "Compétitions notées par jury technique et artistique."
    ]
  }
};

// Fallbacks par sous-catégorie. Honnête : on ne prétend pas connaître les règles
// précises des sports obscurs, on oriente vers les fédérations.
const FALLBACK_BY_SOUSCAT = {
  "Arts martiaux": {
    whyTemplate: (nom) => `${nom} est un art martial. Comme tous les arts martiaux, il développe la discipline, la maîtrise de soi, la technique et le respect. Chaque école a son histoire, sa philosophie et ses techniques propres.`,
    rules: [
      "Pratique encadrée par un maître ou enseignant qualifié.",
      "Système de grades (ceintures ou équivalent) marquant la progression.",
      "Techniques apprises progressivement (formes, combat, défense).",
      "Respect du dojo, du partenaire et de l'arbitre fondamental.",
      "Règles précises de compétition variables : consulte la fédération officielle."
    ]
  },
  "Boxe": {
    whyTemplate: (nom) => `${nom} est une discipline de combat poings-pieds (selon la variante). C'est un sport d'endurance, de technique et de courage qui forge le mental autant que le corps.`,
    rules: [
      "Combat en rounds chronométrés sur un ring ou tatami.",
      "Coups autorisés variables selon la discipline (poings, pieds, coudes, genoux).",
      "Victoire possible par KO, abandon, arrêt arbitre ou décision aux points.",
      "Équipement de protection obligatoire (gants, protège-dents, casque).",
      "Catégories de poids strictes."
    ]
  },
  "Ballon": {
    whyTemplate: (nom) => `${nom} est un sport collectif avec ballon. Le jeu repose sur la coopération entre coéquipiers, la lecture du jeu et l'efficacité technique.`,
    rules: [
      "Deux équipes s'affrontent sur un terrain délimité.",
      "Objectif : marquer plus de points que l'équipe adverse, selon les règles précises de la discipline.",
      "Durée du match et nombre de joueurs spécifiques à chaque sport.",
      "Fautes sanctionnées par l'arbitre (carton, exclusion, faute technique).",
      "Pour les règles exactes, consulte la fédération officielle de la discipline."
    ]
  },
  "Raquette": {
    whyTemplate: (nom) => `${nom} est un sport de raquette. Tu opposes ta technique, ton placement et ton anticipation à celle de ton adversaire, sur un terrain divisé par un filet ou un mur.`,
    rules: [
      "Match en sets ou en jeux selon les règles spécifiques.",
      "On marque quand l'adversaire ne renvoie pas la balle correctement.",
      "Service alterné selon les règles précises de la discipline.",
      "Terrain et matériel codifiés (taille de raquette, balle, filet).",
      "Consulte la fédération officielle pour le règlement exact."
    ]
  },
  "Nage": {
    whyTemplate: (nom) => `${nom} est une discipline aquatique. La nage demande technique, endurance et coordination respiratoire. C'est un sport complet qui sollicite tous les muscles.`,
    rules: [
      "Course chronométrée en bassin ou en eau libre.",
      "Plusieurs styles selon la discipline (crawl, dos, brasse, papillon).",
      "Départ et virage spécifiques selon le style nagé.",
      "Sortie de couloir ou contact volontaire entraîne disqualification.",
      "Distance et règles précises définies par la fédération."
    ]
  },
  "Pagaie": {
    whyTemplate: (nom) => `${nom} se pratique sur l'eau avec une pagaie. C'est un sport qui combine endurance, technique et lecture de l'eau.`,
    rules: [
      "Embarcation propulsée à la pagaie (simple ou double).",
      "Courses chronométrées en ligne ou parcours technique.",
      "Slalom : passage entre portes vertes (sens courant) et rouges (contre).",
      "Équipement de sécurité obligatoire (gilet, casque si eaux vives).",
      "Règles détaillées variables selon la discipline et la fédération."
    ]
  },
  "Vélo": {
    whyTemplate: (nom) => `${nom} se pratique à vélo. C'est un sport de précision, d'endurance et de technique selon le terrain (route, piste, trial, BMX).`,
    rules: [
      "Course chronométrée individuelle ou en peloton.",
      "Casque obligatoire en compétition.",
      "Vélo conforme aux réglementations spécifiques (UCI ou fédération nationale).",
      "Règles de priorité et de dépassement variables selon la discipline.",
      "Consulte la FFC pour les règlements précis en France."
    ]
  },
  "Précision": {
    whyTemplate: (nom) => `${nom} est un sport de précision. Tu vises un objectif (cible, quille, jack), et la maîtrise du geste compte plus que la force.`,
    rules: [
      "Geste répété précis, noté ou chronométré selon la discipline.",
      "Cible ou objectif à atteindre clairement défini.",
      "Distance et matériel codifiés.",
      "Sport mental : gestion du stress, concentration, respiration.",
      "Règles précises variables selon la fédération."
    ]
  },
  "Force": {
    whyTemplate: (nom) => `${nom} est une discipline de force. Tu mesures ta capacité à soulever, pousser ou tirer une charge maximale, dans le respect d'un mouvement technique exigeant.`,
    rules: [
      "Mouvement codifié (squat, soulevé, presse, arraché, etc.).",
      "Catégories de poids et d'âge strictes.",
      "Trois essais par mouvement, le meilleur compte.",
      "Validation par juges (lumière blanche).",
      "Équipement homologué (barre, plateforme, harnais)."
    ]
  },
  "Gym": {
    whyTemplate: (nom) => `${nom} est une discipline gymnique. Tu enchaînes des éléments techniques notés sur la difficulté et l'exécution. C'est un sport exigeant en souplesse, force et coordination.`,
    rules: [
      "Routines codifiées notées par un jury.",
      "Notation : difficulté + exécution + souvent artistique.",
      "Pénalités pour chute, sortie, fautes techniques.",
      "Compétitions individuelles ou par équipe selon la discipline.",
      "Code de pointage actualisé régulièrement par la fédération."
    ]
  },
  "Glace": {
    whyTemplate: (nom) => `${nom} se pratique sur glace. La glisse permet une rapidité unique et un contrôle technique exigeant. Sport olympique sous diverses formes.`,
    rules: [
      "Pratique sur patinoire ou piste glacée.",
      "Discipline chronométrée ou notée selon la spécialité.",
      "Équipement spécifique (patins, casque, protections selon le cas).",
      "Règles d'arbitrage codifiées par la fédération internationale.",
      "Consulte la FFSG ou FFHG pour les règlements précis."
    ]
  },
  "Ski": {
    whyTemplate: (nom) => `${nom} se pratique sur neige avec des skis. Selon la discipline, c'est de la vitesse pure, de l'endurance ou de la technique freestyle.`,
    rules: [
      "Pratique en station ou en hors-piste selon la spécialité.",
      "Discipline chronométrée ou notée par juges.",
      "Casque obligatoire en compétition.",
      "Tracé balisé pour les épreuves alpines (portes).",
      "Règles précises définies par la FFS et la FIS."
    ]
  },
  "Planche": {
    whyTemplate: (nom) => `${nom} se pratique sur une planche. Glisse, sensations, technique freestyle ou course : la planche s'adapte à tous les terrains (neige, eau, route).`,
    rules: [
      "Pratique sur planche spécifique (snowboard, wakeboard, surf, etc.).",
      "Disciplines chronométrées ou notées selon la spécialité.",
      "Notation : difficulté, exécution, créativité.",
      "Casque et protections recommandés ou obligatoires en compétition.",
      "Règles détaillées variables selon la fédération."
    ]
  },
  "Glisse urbaine": {
    whyTemplate: (nom) => `${nom} est un sport de glisse en milieu urbain. Tu enchaînes figures, tricks et lignes sur du mobilier urbain ou du park dédié.`,
    rules: [
      "Pratique en park, street ou bowl selon la discipline.",
      "Compétitions : runs notés par juges sur figures, hauteur, créativité.",
      "Casque et protections recommandés.",
      "Difficulté technique des figures évaluée.",
      "Règles précises définies par les fédérations spécialisées."
    ]
  },
  "Aérien": {
    whyTemplate: (nom) => `${nom} se pratique en l'air, sous une voile, une aile ou un aéronef. Sport de liberté, exigeant en technique et en lecture des conditions météo.`,
    rules: [
      "Brevet ou licence de pilote obligatoire pour la pratique.",
      "Formation initiale en école agréée.",
      "Règles de vol définies par la fédération concernée (FFVL, FFVP, FFAéro).",
      "Équipement de sécurité (parachute, casque, harnais) obligatoire.",
      "Conditions météo respectées scrupuleusement."
    ]
  },
  "Voile": {
    whyTemplate: (nom) => `${nom} se pratique sous voile, en utilisant le vent comme propulsion. Sport stratégique, technique, en plein air.`,
    rules: [
      "Régates autour de bouées formant un parcours imposé.",
      "Règles de priorité strictes (tribord/bâbord, sous le vent, etc.).",
      "Pénalités purgées par un ou deux tours sur 360°.",
      "Multiples séries selon le bateau utilisé.",
      "Consulte la FFVoile pour les règlements précis."
    ]
  },
  "Bateau": {
    whyTemplate: (nom) => `${nom} se pratique sur bateau. C'est un sport d'eau qui demande coordination, endurance et technique propres à l'embarcation choisie.`,
    rules: [
      "Course chronométrée sur eau plate ou en milieu naturel.",
      "Plusieurs catégories selon le type et la taille du bateau.",
      "Règles de priorité et de dépassement codifiées.",
      "Équipement de sécurité (gilet) obligatoire.",
      "Règles précises définies par la fédération correspondante."
    ]
  },
  "Plongée": {
    whyTemplate: (nom) => `${nom} est une discipline subaquatique. Tu explores ou tu performes sous l'eau, avec ou sans matériel respiratoire.`,
    rules: [
      "Plongée toujours en binôme minimum, jamais seul.",
      "Niveaux de qualification progressifs.",
      "Tables de plongée à respecter pour la profondeur et la durée.",
      "Paliers de décompression obligatoires en profondeur.",
      "Règles précises définies par la FFESSM."
    ]
  },
  "Vague": {
    whyTemplate: (nom) => `${nom} se pratique sur les vagues. Tu lis l'océan, tu prends ta vague, tu glisses. C'est un sport de patience et de feeling avec la mer.`,
    rules: [
      "Heat chronométré en compétition (souvent 20-30 minutes).",
      "Notation des vagues prises par un jury (0 à 10 points).",
      "Critères : difficulté de la vague, variété des manœuvres, vitesse, puissance.",
      "Règles de priorité strictes entre surfeurs.",
      "Drop in (couper la vague d'un prioritaire) sévèrement sanctionné."
    ]
  },
  "Vent": {
    whyTemplate: (nom) => `${nom} utilise le vent comme moteur. Sport de glisse spectaculaire, exigeant en technique et en gestion des conditions météo.`,
    rules: [
      "Plusieurs disciplines : freestyle, course, vague.",
      "Compétitions : notes des juges ou chrono selon la spécialité.",
      "Casque et gilet d'impact obligatoires en compétition.",
      "Règles de priorité (priorité au plus rapide en vague, etc.).",
      "Règles détaillées définies par la fédération."
    ]
  },
  "Course": {
    whyTemplate: (nom) => `${nom} est une discipline de course. Tu mesures ta vitesse, ton endurance, ta capacité à enchaîner les efforts.`,
    rules: [
      "Distance et durée variables selon la discipline.",
      "Chrono individuel ou classement à l'arrivée.",
      "Départ groupé ou individuel selon le format.",
      "Tracé balisé en pleine nature ou sur piste.",
      "Règles précises définies par la fédération."
    ]
  },
  "Marche": {
    whyTemplate: (nom) => `${nom} se pratique à pied, en marchant. C'est une discipline d'endurance, de respiration et de plein air.`,
    rules: [
      "Pratique à pied selon le terrain (piste, sentier, montagne).",
      "Marche athlétique : un pied doit toujours toucher le sol.",
      "Distance et profil variables selon la discipline.",
      "Chrono ou classement à l'arrivée.",
      "Règles précises définies par la fédération."
    ]
  },
  "Grimpe": {
    whyTemplate: (nom) => `${nom} consiste à grimper, en salle ou en milieu naturel. Lecture de mur, gestion de l'effort, dépassement de soi : c'est un sport mental autant que physique.`,
    rules: [
      "Pratique sur mur indoor ou rocher naturel.",
      "Plusieurs disciplines : bloc, voie (lead), vitesse.",
      "Bloc : voies courtes sans corde, tapis en dessous.",
      "Voie : assurée avec corde et baudrier.",
      "Règles précises définies par la FFME."
    ]
  },
  "Cheval": {
    whyTemplate: (nom) => `${nom} se pratique avec un cheval. C'est un sport en duo avec un animal vivant qui demande empathie, technique et confiance mutuelle.`,
    rules: [
      "Pratique avec un cheval (ou poney) entraîné.",
      "Disciplines : dressage, saut, complet, voltige, etc.",
      "Notation par juges ou chrono selon la spécialité.",
      "Bien-être de l'animal surveillé strictement.",
      "Règles précises définies par la FFE."
    ]
  },
  "Stratégie": {
    whyTemplate: (nom) => `${nom} est un sport mental de stratégie. Tu calcules, tu anticipes, tu construis ton plan. Le mental fait tout.`,
    rules: [
      "Joué sur plateau ou support codifié.",
      "Mécaniques précises définissant les déplacements ou actions.",
      "Cadences variables : blitz, rapide, classique.",
      "Compétitions individuelles ou par équipe.",
      "Règles précises définies par la fédération correspondante."
    ]
  },
  "Mental": {
    whyTemplate: (nom) => `${nom} est une discipline mentale, reconnue comme sport par le CIO. Tu calcules, tu anticipes, tu gères ton stress.`,
    rules: [
      "Joué sur plateau, cartes ou support codifié.",
      "Règles précises de la discipline à respecter.",
      "Cadences variables : blitz, rapide, classique.",
      "Compétitions par paires, équipes ou individuelles.",
      "Règles précises définies par la fédération correspondante."
    ]
  },
  "Multi": {
    whyTemplate: (nom) => `${nom} combine plusieurs disciplines en une seule épreuve. C'est un sport complet, polyvalent, qui valorise les athlètes aux compétences diversifiées.`,
    rules: [
      "Plusieurs disciplines enchaînées en une seule compétition.",
      "Classement au temps total ou au score combiné.",
      "Chaque discipline a ses propres règles spécifiques.",
      "Transitions chronométrées entre les disciplines.",
      "Règles précises définies par la fédération."
    ]
  },
  "Moto": {
    whyTemplate: (nom) => `${nom} se pratique en moto. Sport mécanique qui mélange pilotage, sensations et technique propre à chaque discipline (vitesse, trial, motocross).`,
    rules: [
      "Course chronométrée sur circuit ou tracé naturel.",
      "Casque intégral et combinaison homologuée obligatoires.",
      "Plusieurs catégories selon la moto et le niveau.",
      "Règles de sécurité strictes (drapeaux, panneaux).",
      "Règles précises définies par la FFM."
    ]
  },
  "Auto": {
    whyTemplate: (nom) => `${nom} se pratique en automobile. Sport mécanique de pilotage, exigeant en technique, en réflexes et en gestion du véhicule.`,
    rules: [
      "Course chronométrée sur circuit, route fermée ou terre.",
      "Casque, combinaison ignifugée et harnais obligatoires.",
      "Plusieurs catégories selon le véhicule.",
      "Règles strictes de sécurité (drapeaux, safety car).",
      "Règles précises définies par la FFSA."
    ]
  },
  "Moteur": {
    whyTemplate: (nom) => `${nom} est un sport mécanique. Tu pilotes un engin motorisé avec précision et stratégie selon les contraintes de la discipline.`,
    rules: [
      "Course chronométrée selon le type d'engin.",
      "Équipement de sécurité obligatoire (casque, combinaison, harnais).",
      "Plusieurs catégories par cylindrée ou puissance.",
      "Règles de pilotage et de sécurité strictes.",
      "Règles précises définies par la fédération concernée."
    ]
  },
  "Glisse": {
    whyTemplate: (nom) => `${nom} est un sport de glisse. Sensations, vitesse, technique : tu te laisses porter par la pente, l'eau ou la neige.`,
    rules: [
      "Pratique selon la surface (neige, glace, eau, route).",
      "Disciplines chronométrées ou notées par juges.",
      "Équipement de sécurité recommandé ou obligatoire selon la discipline.",
      "Règles techniques spécifiques à chaque support.",
      "Règles précises définies par la fédération correspondante."
    ]
  },
  "Nautique": {
    whyTemplate: (nom) => `${nom} se pratique sur l'eau, avec ou sans embarcation. C'est une discipline qui combine technique, équilibre et lecture du milieu aquatique.`,
    rules: [
      "Pratique en mer, lac ou rivière selon la spécialité.",
      "Embarcation ou matériel spécifique conforme.",
      "Équipement de sécurité obligatoire (gilet, casque selon la discipline).",
      "Règles de priorité et de circulation sur l'eau.",
      "Règles précises définies par la fédération."
    ]
  },
  "Eau": {
    whyTemplate: (nom) => `${nom} est une discipline aquatique. L'eau est ton terrain : tu y nages, tu y évolues, tu y performes selon les codes de la discipline.`,
    rules: [
      "Pratique en piscine, lac, rivière ou mer selon la spécialité.",
      "Discipline chronométrée ou notée par juges.",
      "Équipement spécifique (combinaison, palmes, masque selon le cas).",
      "Sécurité prioritaire : toujours surveillé ou en binôme.",
      "Règles précises définies par la fédération correspondante."
    ]
  },
  "Régional": {
    whyTemplate: (nom) => `${nom} est un sport régional, ancré dans une culture locale. Pratique souvent millénaire, transmise de génération en génération.`,
    rules: [
      "Règles traditionnelles propres à la région d'origine.",
      "Matériel spécifique souvent fabriqué localement.",
      "Compétitions locales, régionales et parfois internationales.",
      "Codes culturels importants au-delà du sport lui-même.",
      "Renseigne-toi auprès de la fédération régionale concernée."
    ]
  },
  "Tradition": {
    whyTemplate: (nom) => `${nom} est un sport traditionnel français. Histoire, terroir, codes propres : c'est un patrimoine sportif local à découvrir.`,
    rules: [
      "Règles traditionnelles transmises de génération en génération.",
      "Pratique souvent encadrée par une fédération nationale.",
      "Compétitions locales, régionales et nationales.",
      "Codes vestimentaires et rituels parfois importants.",
      "Renseigne-toi auprès de la fédération concernée."
    ]
  },
  "Animalier": {
    whyTemplate: (nom) => `${nom} se pratique avec un animal (chien, cheval). C'est une discipline en duo qui repose sur la complicité avec ton partenaire animal.`,
    rules: [
      "Pratique avec un animal entraîné spécifiquement.",
      "Notation ou chrono selon la spécialité.",
      "Bien-être de l'animal surveillé strictement.",
      "Règles précises de manipulation et de sécurité.",
      "Règles détaillées définies par la fédération correspondante."
    ]
  },
  "Souterrain": {
    whyTemplate: (nom) => `${nom} se pratique sous terre. C'est une discipline d'aventure exigeante en condition physique, en technique de progression et en gestion de l'environnement.`,
    rules: [
      "Exploration en équipe d'au moins 3 personnes.",
      "Matériel : casque, lampe, baudrier, descendeur, bloqueurs.",
      "Techniques de progression sur corde maîtrisées.",
      "Information laissée à l'extérieur du parcours prévu.",
      "Règles précises définies par la FFS."
    ]
  },
  "Combat": {
    whyTemplate: (nom) => `${nom} est une discipline de combat. Tu opposes ta technique, ta force et ton mental à un adversaire dans un cadre réglementé.`,
    rules: [
      "Combat en rounds chronométrés sur tatami ou ring.",
      "Techniques autorisées variables selon la discipline.",
      "Victoire par KO, soumission, arrêt arbitre ou décision aux points.",
      "Catégories de poids strictes, équipement de protection obligatoire.",
      "Règles précises définies par la fédération concernée."
    ]
  },
  "Mixed": {
    whyTemplate: (nom) => `${nom} mélange plusieurs techniques de combat (frappes, projections, sol). C'est une discipline complète qui demande polyvalence et endurance.`,
    rules: [
      "Combat mêlant frappes debout et combat au sol.",
      "Techniques très diverses autorisées (selon la discipline).",
      "Victoire par KO, soumission, arrêt arbitre ou décision juges.",
      "Catégories de poids strictes, suivi médical obligatoire.",
      "Règles précises définies par la fédération concernée."
    ]
  },
  "Corps à corps": {
    whyTemplate: (nom) => `${nom} est un sport de combat au corps à corps. Saisies, projections, immobilisations : tu utilises ton corps face à l'adversaire.`,
    rules: [
      "Combat sans frappes, basé sur saisies et projections.",
      "Tombé sur les épaules ou soumission donne la victoire.",
      "Sinon, classement aux points sur les techniques exécutées.",
      "Catégories de poids strictes.",
      "Règles précises définies par la fédération concernée."
    ]
  },
  "Armes": {
    whyTemplate: (nom) => `${nom} est un sport d'armes blanches. Précision, vitesse et stratégie sont au cœur de la discipline.`,
    rules: [
      "Combat avec arme(s) spécifique(s) à la discipline.",
      "Équipement de protection obligatoire (masque, plastron).",
      "Touches notées par arbitre ou système électronique.",
      "Règles de priorité ou de touche selon l'arme.",
      "Règles précises définies par la fédération concernée."
    ]
  },
  "Sol": {
    whyTemplate: (nom) => `${nom} est un sport de combat principalement au sol. Tu utilises ta technique de grappling pour soumettre ton adversaire.`,
    rules: [
      "Combat principalement au sol après mise au sol.",
      "Victoire par soumission ou aux points.",
      "Points marqués sur passages de garde, takedowns, contrôles.",
      "Catégories de poids et de ceinture.",
      "Règles précises définies par la fédération concernée."
    ]
  },
  "Danse combat": {
    whyTemplate: (nom) => `${nom} mêle combat et art chorégraphique. C'est une discipline où l'esthétique compte autant que l'efficacité.`,
    rules: [
      "Pratique en duo (jogo) souvent dans un cercle (roda).",
      "Pas de compétition au sens classique : jeu jugé sur expression et technique.",
      "Musique et chant souvent intégrés à la pratique.",
      "Système de grades propre à chaque école.",
      "Renseigne-toi auprès des écoles locales."
    ]
  },
  "Historique": {
    whyTemplate: (nom) => `${nom} est une discipline de reconstitution martiale historique. Tu pratiques selon les techniques des anciens manuels d'escrime ou de combat.`,
    rules: [
      "Pratique basée sur des sources historiques (manuels anciens).",
      "Plusieurs armes selon la discipline (épée longue, sabre, dague, etc.).",
      "Équipement de protection (masque, plastron, gants) obligatoire.",
      "Compétitions notées par juges ou en touches.",
      "Renseigne-toi auprès des clubs HEMA."
    ]
  },
  "Tactique": {
    whyTemplate: (nom) => `${nom} est un sport tactique. Tu joues en équipe ou en solo, et tu utilises stratégie, observation et timing pour gagner.`,
    rules: [
      "Pratique sur terrain dédié avec règles précises.",
      "Équipement de sécurité obligatoire.",
      "Stratégie en équipe ou en solo selon la spécialité.",
      "Pénalités pour fautes ou hors-jeu.",
      "Règles précises définies par la fédération concernée."
    ]
  },
  "Cardio": {
    whyTemplate: (nom) => `${nom} est une discipline cardio/fitness. Travail du cœur, du souffle et de l'endurance dans des séances rythmées.`,
    rules: [
      "Séances guidées par coach ou musique.",
      "Pratique généralement non compétitive (sauf compétitions fitness).",
      "Mouvements répétés ou enchaînés selon la séance.",
      "Adaptation possible à tous les niveaux.",
      "Renseigne-toi auprès des clubs locaux."
    ]
  },
  "Cardio & Force": {
    whyTemplate: (nom) => `${nom} combine cardio et travail de force. Séances intenses et variées, parfaites pour développer une condition physique complète.`,
    rules: [
      "Séances combinant haltérophilie, cardio et gymnastique.",
      "WOD (Workout of the Day) court mais intense.",
      "Chrono ou répétitions selon le format.",
      "Coach présent pour la technique et la sécurité.",
      "Compétitions à plusieurs niveaux (Open, Régionaux, Games)."
    ]
  },
  "Bien-être": {
    whyTemplate: (nom) => `${nom} est une discipline de bien-être. Tu travailles corps, souffle et mental sans compétition. L'objectif est la progression individuelle, pas la performance.`,
    rules: [
      "Pratique non compétitive en règle générale.",
      "Mouvements lents, contrôlés et conscients.",
      "Travail du souffle (respiration) souvent central.",
      "Plusieurs styles ou écoles selon la discipline.",
      "Progresse à ton rythme, sans objectif de performance."
    ]
  },
  "Crosse": {
    whyTemplate: (nom) => `${nom} se joue avec une crosse. Sport collectif rapide et technique, où la manipulation de la crosse fait toute la différence.`,
    rules: [
      "Deux équipes s'affrontent sur un terrain délimité.",
      "On marque en envoyant la balle dans la cage adverse à l'aide de la crosse.",
      "Contact physique autorisé dans certaines limites.",
      "Match en quart-temps ou mi-temps selon la discipline.",
      "Règles précises définies par la fédération."
    ]
  },
  "Batte": {
    whyTemplate: (nom) => `${nom} se joue avec une batte. Tu frappes une balle lancée par l'adversaire et tu cours marquer des points selon les règles spécifiques.`,
    rules: [
      "Deux équipes s'affrontent en alternance attaque/défense.",
      "Le batteur frappe une balle lancée et court entre les bases ou les wickets.",
      "Plusieurs façons d'être retiré (strike, fly out, catch).",
      "Match en manches (innings) ou tour de batte.",
      "Règles précises définies par la fédération."
    ]
  },
  "Balle": {
    whyTemplate: (nom) => `${nom} se joue avec une balle. Sport collectif ou individuel selon la spécialité, où la maîtrise de la balle est centrale.`,
    rules: [
      "Pratique en équipe ou individuellement selon la discipline.",
      "On marque selon les règles spécifiques (cage, panier, cible).",
      "Durée du match variable.",
      "Règles précises définies par la fédération.",
      "Consulte ta fédération régionale pour les variantes locales."
    ]
  },
  "Boules": {
    whyTemplate: (nom) => `${nom} est un sport de boules. Précision, stratégie et finesse : tu places tes boules au plus près d'un but.`,
    rules: [
      "Joué en simple, doublette ou triplette.",
      "Lancer de boules vers un but (cochonnet, jack).",
      "Le plus proche du but marque les points.",
      "Tireurs et pointeurs ont des rôles complémentaires.",
      "Première équipe à 13 points l'emporte généralement."
    ]
  },
  "Glisse": {
    whyTemplate: (nom) => `${nom} est un sport de glisse. Sensations, vitesse, technique : tu te laisses porter par la pente, l'eau ou la neige.`,
    rules: [
      "Pratique selon la surface (neige, glace, eau, route).",
      "Disciplines chronométrées ou notées par juges.",
      "Équipement de sécurité recommandé ou obligatoire selon la discipline.",
      "Règles techniques spécifiques à chaque support.",
      "Règles précises définies par la fédération correspondante."
    ]
  },
  "Cartes": {
    whyTemplate: (nom) => `${nom} est un sport de cartes. Calcul, mémoire, stratégie et lecture de l'adversaire sont au cœur du jeu.`,
    rules: [
      "Joué à 2, 4 ou plus selon la discipline.",
      "Mécanique précise de distribution et de jeu.",
      "Compétitions individuelles ou en paires.",
      "Cadences variables : rapide, classique.",
      "Règles précises définies par la fédération."
    ]
  },
  "Urban": {
    whyTemplate: (nom) => `${nom} est un sport urbain. Liberté d'expression, créativité et énergie : tu pratiques dans les espaces de la ville ou en park dédié.`,
    rules: [
      "Pratique en street, park ou compétition organisée.",
      "Battles, runs ou enchaînements notés par juges.",
      "Critères : technique, créativité, musicalité, exécution.",
      "Équipement minimal souvent suffisant.",
      "Règles précises définies par la fédération."
    ]
  },
  "Urbain": {
    whyTemplate: (nom) => `${nom} est un sport urbain. Liberté d'expression, créativité et énergie : tu pratiques dans les espaces de la ville ou en park dédié.`,
    rules: [
      "Pratique en street, park ou compétition organisée.",
      "Battles, runs ou enchaînements notés par juges.",
      "Critères : technique, créativité, musicalité, exécution.",
      "Équipement minimal souvent suffisant.",
      "Règles précises définies par la fédération."
    ]
  },
  "Nature": {
    whyTemplate: (nom) => `${nom} se pratique en pleine nature. Connexion avec l'environnement, autonomie et endurance sont au programme.`,
    rules: [
      "Pratique en milieu naturel (montagne, forêt, rivière).",
      "Respect de l'environnement et balisage obligatoires.",
      "Équipement adapté selon le terrain.",
      "Sécurité : prévenir de son itinéraire, équipement minimum.",
      "Règles précises définies par la fédération correspondante."
    ]
  },
  "Nature souterraine": {
    whyTemplate: (nom) => `${nom} est une discipline d'exploration souterraine. Aventure, technique et endurance dans des environnements uniques.`,
    rules: [
      "Exploration en équipe d'au moins 3 personnes.",
      "Matériel spécifique : casque, lampe, baudrier, cordes.",
      "Maîtrise des techniques de progression sur corde.",
      "Information laissée à l'extérieur du parcours.",
      "Règles précises définies par la FFS."
    ]
  },
  "Outdoor": {
    whyTemplate: (nom) => `${nom} se pratique en extérieur. Sensations en plein air et défi technique pour les amateurs d'aventure.`,
    rules: [
      "Pratique en pleine nature ou structure dédiée.",
      "Équipement de sécurité spécifique à la discipline.",
      "Vérification du matériel avant chaque pratique.",
      "Conditions météo respectées scrupuleusement.",
      "Règles précises définies par la fédération concernée."
    ]
  },
  "Montagne": {
    whyTemplate: (nom) => `${nom} se pratique en montagne. Dépassement, autonomie, gestion du milieu : la montagne demande respect et préparation.`,
    rules: [
      "Pratique en milieu montagneux, parfois extrême.",
      "Matériel spécifique adapté à la discipline.",
      "Encadrement par guide ou pratiquant expérimenté recommandé.",
      "Conditions météo et nivologiques respectées.",
      "Règles précises définies par la FFCAM ou FFME."
    ]
  },
  "Aérien/Glisse": {
    whyTemplate: (nom) => `${nom} mêle aérien et glisse. Tu utilises le vent ou l'air pour t'élancer et glisser sur la surface adaptée.`,
    rules: [
      "Pratique combinée d'aérien et de glisse.",
      "Équipement de sécurité obligatoire (casque, gilet).",
      "Conditions de vent indispensables à respecter.",
      "Pratique encadrée recommandée pour débuter.",
      "Règles précises définies par la fédération concernée."
    ]
  },
  "Ski & Tir": {
    whyTemplate: (nom) => `${nom} combine ski de fond et tir. Sport hybride exigeant à la fois en cardio et en précision.`,
    rules: [
      "Combinaison ski de fond + tir (carabine ou arc).",
      "Plusieurs formats : sprint, poursuite, individuel, relais.",
      "Chaque cible manquée se traduit par pénalité (tour ou temps).",
      "Tirs alternés debout et couché selon le format.",
      "Règles précises définies par la fédération."
    ]
  },
  "Vélo / Ski": {
    whyTemplate: (nom) => `${nom} se pratique avec un équipement combinant vélo et ski. Sport spécifique d'entraînement ou de compétition.`,
    rules: [
      "Pratique sur route ou piste avec équipement hybride.",
      "Course chronométrée individuelle ou groupée.",
      "Casque obligatoire en compétition.",
      "Équipement spécifique homologué.",
      "Règles précises définies par la fédération."
    ]
  },
  "Glace": {
    whyTemplate: (nom) => `${nom} se pratique sur glace. La glisse permet une rapidité unique et un contrôle technique exigeant.`,
    rules: [
      "Pratique sur patinoire ou piste glacée.",
      "Discipline chronométrée ou notée selon la spécialité.",
      "Équipement spécifique (patins, casque, protections).",
      "Règles d'arbitrage codifiées par la fédération internationale.",
      "Consulte la FFSG ou FFHG pour les règlements précis."
    ]
  },
  "Aérien": {
    whyTemplate: (nom) => `${nom} se pratique en l'air. Sport de liberté, exigeant en technique et en lecture des conditions météo.`,
    rules: [
      "Brevet ou licence de pilote obligatoire.",
      "Formation initiale en école agréée.",
      "Règles de vol définies par la fédération concernée.",
      "Équipement de sécurité (parachute, casque, harnais) obligatoire.",
      "Conditions météo respectées scrupuleusement."
    ]
  },
  "Avion léger": {
    whyTemplate: (nom) => `${nom} se pratique en avion léger. Pilotage, navigation, lecture météo : c'est l'aviation accessible aux passionnés.`,
    rules: [
      "Brevet de pilote (PPL ou ULM selon le cas) obligatoire.",
      "Formation théorique et pratique en école agréée.",
      "Vol à vue (VFR), zones réglementées à respecter.",
      "Visite médicale et radio-navigation obligatoires.",
      "Règles précises définies par la FFA et la DGAC."
    ]
  },
  "Planeur": {
    whyTemplate: (nom) => `${nom} se pratique en planeur. Pas de moteur : tu utilises les courants ascendants pour rester en l'air. Pure ingéniosité.`,
    rules: [
      "Brevet de pilote planeur (BPP) obligatoire.",
      "Formation en club ou école agréée.",
      "Décollage par treuil ou remorquage avion.",
      "Vols sans moteur, utilisation des thermiques.",
      "Règles précises définies par la FFVP."
    ]
  },
  "Avion": {
    whyTemplate: (nom) => `${nom} se pratique en avion. Précision, sang-froid et technique de pilotage poussée.`,
    rules: [
      "Brevet de pilote spécifique selon la discipline.",
      "Compétitions : voltige (figures), précision d'atterrissage, course.",
      "Notation par juges pour la voltige.",
      "Avion conforme à l'homologation requise.",
      "Règles précises définies par la FFA."
    ]
  },
  "Artistique": {
    whyTemplate: (nom) => `${nom} est une discipline artistique. Expression, esthétique et technique sont indissociables.`,
    rules: [
      "Routine chorégraphiée sur musique.",
      "Notation par jury sur technique + artistique.",
      "Engin ou support spécifique selon la discipline.",
      "Compétitions individuelles ou par équipe.",
      "Code de pointage défini par la fédération."
    ]
  },
  "Danse": {
    whyTemplate: (nom) => `${nom} est une discipline de danse. Expression, musicalité et technique se mêlent dans un art codifié.`,
    rules: [
      "Pratique en solo, couple ou groupe selon la discipline.",
      "Notation par juges sur technique, musicalité, présentation.",
      "Plusieurs styles à explorer selon la discipline.",
      "Tenue codifiée souvent obligatoire en compétition.",
      "Compétitions à plusieurs niveaux selon la fédération."
    ]
  },
  "Tradition": {
    whyTemplate: (nom) => `${nom} est un sport traditionnel. Histoire, terroir, codes propres : c'est un patrimoine sportif à découvrir.`,
    rules: [
      "Règles traditionnelles transmises de génération en génération.",
      "Matériel spécifique souvent fabriqué localement.",
      "Compétitions locales, régionales et parfois nationales.",
      "Codes culturels parfois importants au-delà du sport.",
      "Renseigne-toi auprès de la fédération régionale."
    ]
  },
  "Collectif": {
    whyTemplate: (nom) => `${nom} est un sport collectif. Coopération, stratégie d'équipe et complémentarité des rôles font la différence.`,
    rules: [
      "Deux équipes s'affrontent sur un terrain délimité.",
      "Objectif : marquer plus que l'adversaire selon les règles spécifiques.",
      "Durée du match et nombre de joueurs variables.",
      "Fautes sanctionnées par l'arbitre.",
      "Règles précises définies par la fédération."
    ]
  }
};

// Fallbacks par catégorie principale (utilisés si la sous-catégorie n'est pas trouvée).
const FALLBACK_BY_CAT = {
  "Collectif": FALLBACK_BY_SOUSCAT["Ballon"],
  "Individuel": {
    whyTemplate: (nom) => `${nom} est une discipline individuelle. Tu te mesures à toi-même autant qu'à tes adversaires. Concentration, technique et progression personnelle font tout.`,
    rules: [
      "Pratique individuelle, chronométrée ou notée par juges.",
      "Compétitions par catégories d'âge et de niveau.",
      "Règles techniques propres à chaque spécialité.",
      "Équipement homologué obligatoire en compétition.",
      "Consulte la fédération nationale pour les règlements précis."
    ]
  },
  "Combat": FALLBACK_BY_SOUSCAT["Arts martiaux"],
  "Aquatique": FALLBACK_BY_SOUSCAT["Eau"],
  "Glisse": FALLBACK_BY_SOUSCAT["Glisse"],
  "Montagne & Nature": FALLBACK_BY_SOUSCAT["Nature"],
  "Mental": FALLBACK_BY_SOUSCAT["Mental"],
  "Aérien": FALLBACK_BY_SOUSCAT["Aérien"],
  "Danse & Arts": FALLBACK_BY_SOUSCAT["Danse"],
  "Moteur": FALLBACK_BY_SOUSCAT["Moteur"],
  "Équestre": FALLBACK_BY_SOUSCAT["Cheval"]
};

// Default ultime si rien ne matche
const ULTIMATE_FALLBACK = {
  whyTemplate: (nom, cat) => `${nom} est une discipline de la catégorie ${cat}. Elle combine technique, engagement physique et plaisir. C'est un sport qui peut se découvrir à tout âge avec un bon encadrement.`,
  rules: [
    "Les règles précises de ce sport sont définies par sa fédération officielle.",
    "Renseigne-toi auprès d'un club local pour découvrir la pratique.",
    "Les compétitions sont organisées à différents niveaux selon ton expérience.",
    "L'équipement nécessaire dépend de la discipline et du niveau.",
    "Pour les règles exactes, consulte le site officiel de la fédération."
  ]
};

/**
 * Retourne le contenu rédactionnel d'un sport.
 * @param {Object} sport - L'objet sport (avec nom, cat, meta.sousCategorie).
 * @returns {{ why: string, rules: string[] }}
 */
function getSportContent(sport) {
  if (!sport || !sport.nom) {
    return { why: '', rules: [] };
  }

  // 1. Match spécifique sur le nom du sport
  const specific = SPORT_CONTENT[sport.nom];
  if (specific) {
    return { why: specific.why, rules: specific.rules };
  }

  // 2. Fallback par sous-catégorie
  const sousCat = sport.meta?.sousCategorie;
  if (sousCat && FALLBACK_BY_SOUSCAT[sousCat]) {
    const fb = FALLBACK_BY_SOUSCAT[sousCat];
    return {
      why: fb.whyTemplate(sport.nom),
      rules: fb.rules
    };
  }

  // 3. Fallback par catégorie principale
  if (sport.cat && FALLBACK_BY_CAT[sport.cat]) {
    const fb = FALLBACK_BY_CAT[sport.cat];
    return {
      why: fb.whyTemplate(sport.nom),
      rules: fb.rules
    };
  }

  // 4. Ultime fallback
  return {
    why: ULTIMATE_FALLBACK.whyTemplate(sport.nom, sport.cat || 'sport'),
    rules: ULTIMATE_FALLBACK.rules
  };
}

// Export global
if (typeof window !== 'undefined') {
  window.getSportContent = getSportContent;
  window.SPORT_CONTENT = SPORT_CONTENT;
}
