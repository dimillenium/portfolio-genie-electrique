# portfolio-genie-electrique

Présentation de mes differents projets automatisations de mines

Site statique : Astro 7, Tailwind CSS 4, contenu en Markdown/YAML, FR par défaut et EN à venir. Aucun JavaScript côté client.

- Production (une fois Pages activé) : <https://dimillenium.github.io/portfolio-genie-electrique/>
- Contenu source : [`CONTENU.md`](CONTENU.md)

## Démarrer

Node ≥ 22.23.4 requis (testé avec Node 26). Avec nvm-windows : `nvm use 26.13.0`.

```bash
npm install
npm run dev          # http://localhost:4321/portfolio-genie-electrique/
npm run build        # astro check + build dans dist/
npm run preview      # sert dist/ en local
npm run placeholders # liste les [CROCHETS] restants
```

## Modifier le contenu

Tout le texte est dans `src/content/`. Le code n'a pas à être modifié.

| Fichier | Page |
|---|---|
| `src/content/site/accueil.yaml` | Accueil : nom, sous-titre, accroche, 3 blocs de preuves, boutons |
| `src/content/site/parcours.yaml` | Parcours (timeline) |
| `src/content/site/competences.yaml` | Compétences (3 groupes) |
| `src/content/site/contact.yaml` | Contact : courriel, LinkedIn, GitHub |
| `src/content/projets/*.md` | Un fichier par projet |

Le schéma est validé au build (`src/content.config.ts`). Une erreur indique le fichier et le champ à corriger.

### Placeholders

Un texte entre crochets, par exemple `[URL]`, est un placeholder. Il s'affiche en pointillés cuivre sur le site pour qu'on ne l'oublie pas. `npm run placeholders` les liste tous ; `npm run placeholders -- --strict` échoue s'il en reste.

### Ajouter un projet

1. Copie `src/content/projets/_modele.md` vers `src/content/projets/02-mon-projet.md`. Le nom du fichier devient l'URL.
2. Remplis le frontmatter :
   - `status` : `planifie`, `en-cours` ou `termine`.
   - Un projet `planifie` n'a besoin que d'un résumé d'une ligne.
   - Un projet `termine` doit avoir un `repoUrl` réel, sinon le build échoue.
   - `startDate` : une vraie date s'écrit sans guillemets (`2026-03-01`). Un placeholder s'écrit entre guillemets (`"[AAAA-MM-JJ]"`).
   - `featured: true` affiche le projet sur l'accueil.
3. Garde les 8 sections du gabarit : Contexte industriel, Objectif, Matériel, Schéma, Implémentation, Résultats, Leçons apprises, Liens. Le build avertit s'il en manque une.

### Images

Place les images à côté du projet, par exemple `src/content/projets/images/montage.jpg`. Deux façons de les utiliser :

- Dans le texte : `![Montage sur breadboard](./images/montage.jpg)`.
- En couverture, dans le frontmatter : `cover: "./images/montage.jpg"` et `coverAlt: "…"`.

Astro les optimise au build : formats modernes, dimensions explicites, `loading="lazy"`.

### CV

Dépose le PDF dans `public/cv/cv.pdf`. Le lien de la page Contact s'active au build suivant. Sans ce fichier, le lien reste désactivé.

### Version anglaise

Les pages EN (`/en/…`) affichent « Translation coming soon ». Une fois traduites, passe `EN_READY` à `true` dans `src/i18n/config.mjs` : elles deviennent alors indexables et entrent dans le sitemap avec les balises `hreflang`. Les libellés d'interface EN sont dans `src/i18n/ui.ts`.

## Déploiement (GitHub Pages)

Le workflow `.github/workflows/deploy.yml` se lance à chaque push sur `main` :

1. Il liste les placeholders restants, en annotations et dans le résumé du job.
2. Il installe, vérifie (`astro check`) et construit le site.
3. Il déploie sur GitHub Pages **seulement s'il ne reste aucun placeholder**. Pour publier quand même : Actions → « Déploiement GitHub Pages » → Run workflow → cocher « Publier même s'il reste des [PLACEHOLDERS] ».

Activation, à faire une seule fois : Settings → Pages → Build and deployment → Source : **GitHub Actions**.

`site` et `base` sont définis dans `astro.config.mjs`. Si le repo change de nom ou passe sur un domaine personnalisé, mets-les à jour.

## Structure

```
src/
├── content/            contenu (YAML + Markdown)
├── content.config.ts   schémas zod des collections
├── i18n/               config FR/EN, libellés, routes localisées
├── layouts/            BaseLayout (SEO, header, footer)
├── components/         cartes, badges, boutons…
├── lib/                helpers (contenu, placeholders, plugin Markdown)
├── pages/              routes FR, en/ pour l'anglais, og.png et robots.txt générés
└── styles/global.css   thème (couleurs, polices, composants)
scripts/check-placeholders.mjs
```
