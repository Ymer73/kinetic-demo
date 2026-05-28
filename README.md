# Kinetic Demo (maquette école)

Maquette HTML/CSS/JS vanilla pour partage avec des étudiants en communication.
**Toutes les données sont fictives.** Aucun lien avec la vraie base de clubs Kinetic.

## Structure

```
kinetic-demo/
├── index.html        Accueil + grille des 12 sports
├── quiz.html         Quiz 5 questions
├── results.html      Top 3 sports recommandés
├── sport.html        Fiche d'un sport avec clubs fictifs
├── style.css         Design system Kinetic (violet/orange/dark)
├── app.js            Logique quiz + scoring + rendu
└── data.js           Sports + clubs fictifs + questions
```

## Tester en local

Option 1 : ouvre `index.html` direct dans ton navigateur (le quiz peut bugger à cause du sessionStorage en file://).

Option 2 (recommandé) : serveur local.
```bash
cd kinetic-demo
python3 -m http.server 3001
```
Puis ouvre http://localhost:3001

## Déployer sur Vercel (URL démo dédiée)

### Étape 1 : créer un nouveau repo GitHub

1. Va sur https://github.com/new
2. Connecte-toi avec le compte **Ymer73** (important pour Vercel)
3. Nom du repo : `kinetic-demo` (privé recommandé)
4. Ne coche RIEN (pas de README, pas de .gitignore)
5. Clique "Create repository"

### Étape 2 : push le dossier

Ouvre le Terminal et tape (remplace `Ymer73` si besoin) :

```bash
cd "/Users/remy/Documents/Claude/Projects/Web App Kinetic/kinetic-demo"
git init
git add .
git commit -m "Initial demo for school partnership"
git branch -M main
git remote add origin https://github.com/Ymer73/kinetic-demo.git
git push -u origin main
```

Saisis ton PAT Ymer73 quand il te le demande.

### Étape 3 : connecter à Vercel

1. Va sur https://vercel.com/new (connecté avec Ymer73)
2. Importe le repo `kinetic-demo`
3. Framework Preset : **Other** (pas de build)
4. Clique "Deploy"

Vercel te donne une URL type `kinetic-demo-xxx.vercel.app`.

### Étape 4 (optionnel) : protéger par mot de passe

Dans Vercel : Settings > Deployment Protection > Password Protection (Pro requis).

Sinon, pour un setup gratuit, tu peux ajouter une page de login simple ou simplement ne pas indexer (déjà fait : `noindex, nofollow` dans toutes les pages).

## Ce que les étudiants voient

- **Bandeau orange permanent** en haut : "MAQUETTE DÉMO · Toutes les données et clubs présents sont fictifs"
- **Tous les clubs ont des noms inventés** : Vertical Pulse, Iron Republic, FC Solaris, etc.
- **Footer** : mention "Reproduction interdite"
- **Meta tags noindex** : pas référencé sur Google

## Ce qu'ils peuvent faire

- Naviguer librement
- Tester le quiz
- Voir les fiches sport
- Comprendre l'UX et le ton Kinetic

## Ce qu'ils ne peuvent PAS faire

- Récupérer ta vraie base de données (elle n'est pas là)
- Cloner ton vrai site (c'est un projet séparé)
- Voir ton vrai code (différent repo, différente structure)

## Notes

- Pas de framework, pas de build, pas de npm
- Tout est vanilla, ultra léger
- Compatible mobile (responsive)
- Le scoring du quiz est volontairement simplifié (5 questions, pondération basique)
