# Mission Maison

Appli familiale qui récompense l'aide à la maison, les bonnes notes et la révision du code de la route.
Les règles sont celles du « Contrat familial Mission Maison ».

## Comment ça marche

- **Appli** : site web statique (HTML, CSS, JavaScript), installable sur Android et iPhone depuis le navigateur.
- **Données** : base Supabase (points, missions, photos, comptes). Les règles du contrat sont appliquées par la base elle-même (`supabase/schema.sql`).
- **Comptes** : `lili@example.com`, `romy@example.com`, `papa@example.com`, `maman@example.com`.

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | Page de l'appli |
| `css/style.css` | Couleurs et mise en page |
| `js/config.js` | Adresse de la base Supabase |
| `js/app.js` | Connexion, chargement des données, navigation |
| `js/enfant.js` | Écrans de Lili et Romy (missions, notes, récompenses, épargne, idées) |
| `js/parent.js` | Espace parents (validation, retraits, à remettre, missions, famille) |
| `js/code.js` | Sessions de code de la route |
| `js/questions.js` | Banque de questions du code (questions originales, pas celles de l'examen) |
| `js/panneaux.js` | Panneaux dessinés |
| `supabase/schema.sql` | Création de la base et des règles |
| `supabase/avenir-argent.sql` | Ajout des onglets « Mon avenir » et « Mon argent » (à lancer une fois) |
| `js/metiers*.js` | Les 200 fiches métiers (20 univers) |
| `js/argent.js` | Les leçons d'argent, leurs quiz, les défis du mois et le quiz « Mon profil » |
| `js/argent-temps.js` | Le niveau « Le temps, mon super-pouvoir » : 5 leçons avec les simulations personnalisées de Lili et Romy |
| `js/apprendre.js`, `js/avenir.js`, `js/monargent.js` | Les écrans « Mon avenir » et « Mon argent » |
| `js/parent-contenus.js` | Relecture et validation des fiches par les parents |

## Installer l'appli sur un téléphone

- **Android (Chrome)** : ouvrir l'adresse de l'appli, menu ⋮, puis « Ajouter à l'écran d'accueil » ou « Installer l'application ».
- **iPhone (Safari)** : ouvrir l'adresse de l'appli, bouton Partager, puis « Sur l'écran d'accueil ».
