# Portfolio — Prompt Claude Code + contenu

Mode d'emploi : crée le repo `portfolio-genie-electrique`, mets ce fichier à la racine sous le nom `CONTENU.md`, ouvre Claude Code dans le dossier et colle le prompt de la partie 1.
Les [CROCHETS] sont à remplir par toi. Rien ne doit être publié tant qu'ils restent.

---

## PARTIE 1 — Prompt pour Claude Code

```
Tu construis le site portfolio d'un technicien IT en transition vers le génie
électrique (automatisation industrielle, mines autonomes). Tout le contenu
textuel est dans CONTENU.md (partie 2). Utilise-le tel quel. N'INVENTE AUCUN
contenu : tout champ [CROCHETS] reste un placeholder visible.

STACK
- Astro (dernière version stable), contenu en Markdown via Content Collections
- Tailwind CSS, Fontsource (Inter + JetBrains Mono), astro-icon avec Lucide
- Aucun framework JS côté client sauf nécessité. Site 100 % statique.
- i18n FR (défaut) / EN avec le routage i18n natif d'Astro. Écris le FR
  complet, crée la structure EN avec des pages « Traduction à venir ».

PAGES
- / (accueil) : accroche, 3 blocs de preuves, projets en vedette, CTA
- /projets : grille de cartes filtrable par statut
- /projets/[slug] : gabarit d'un projet (voir ci-dessous)
- /parcours : timeline verticale
- /competences : 3 groupes (Pratiqué au travail / En apprentissage / Objectifs)
- /contact : LinkedIn, GitHub, courriel, CV (PDF, lien désactivé si absent)

COLLECTION « projets » (frontmatter validé par zod)
title, summary, status (planifie | en-cours | termine), startDate,
technologies[], repoUrl?, demoUrl?, videoUrl?, featured (bool)
- Badge de statut visible sur chaque carte et page projet
  (Planifié = gris, En cours = ambre, Terminé = vert)
- Gabarit de page : Contexte industriel, Objectif, Matériel, Schéma,
  Implémentation, Résultats, Leçons apprises, Liens
- Un projet « termine » doit avoir repoUrl : fais échouer le build sinon.

DESIGN
- Thème sombre sobre, fond quasi noir bleuté, accent cuivre (#D4956A),
  texte #E2E8EF, texte secondaire #7A8FA0
- Inter pour le texte, JetBrains Mono pour valeurs techniques et badges
- Mobile d'abord (les recruteurs ouvrent les liens sur téléphone)
- Contrastes WCAG AA, focus visible, navigation clavier, balises sémantiques
- Respecte prefers-reduced-motion. Animations minimales.
- Test des 60 secondes : l'écran d'accueil dit qui je suis, ce que je construis
  et où voir la preuve, sans scroller.

TECHNIQUE
- SEO : titres, meta description, Open Graph, sitemap, robots.txt
- Lighthouse > 90 partout (performance, accessibilité, bonnes pratiques, SEO)
- Images : composant <Image> d'Astro, lazy loading, dimensions explicites
- Déploiement GitHub Pages via GitHub Actions (.github/workflows/deploy.yml),
  configure `site` et `base` dans astro.config.mjs pour le nom du repo
- Commits atomiques, messages conventionnels (feat:, fix:, docs:, chore:)

MÉTHODE
1. Propose d'abord ton plan et l'arborescence, attends ma validation.
2. Génère le squelette, lance le site en local, vérifie le build.
3. Intègre le contenu de CONTENU.md.
4. Configure le déploiement et donne-moi les étapes pour activer Pages.
5. Liste à la fin tout ce qui reste à remplir ([CROCHETS]).
```

---

## PARTIE 2 — Contenu

### Accueil

**Titre :** Dimitri Fondjo
**Sous-titre :** Technicien IT en transition vers l'automatisation industrielle

**Accroche :**
J'automatise des processus au travail (Power Automate, Jira Workflow, tests unitaires, pipelines CI/CD). Je construis maintenant des systèmes de monitoring, des PLC simulés et des tableaux SCADA, avec l'objectif de devenir ingénieur en automatisation industrielle, puis de travailler sur les mines autonomes.

**3 blocs de preuves**
1. **Automatisation au quotidien** — Workflows, tests unitaires et CI/CD en contexte professionnel. [AJOUTE UN CHIFFRE RÉEL : nombre de workflows, temps économisé, etc.]
2. **Projets publics sur GitHub** — Chaque projet a son repo, son schéma, sa démo et son README.
3. **Formation en cours** — Automates programmables Allen-Bradley (Cégep de Lévis) et préparation au baccalauréat en génie électrique.

**Boutons :** Voir les projets · Mon parcours · Me contacter

### Parcours (timeline)

| Période | Titre | Description |
|---|---|---|
| 2022 – 2025 | DEC en techniques de l'informatique, Cégep Garneau | Base en programmation, réseaux et systèmes. |
| 2026 – aujourd'hui | Technicien informatique N1/N2, AGA Assurances | Support TI, administration Jira. Automatisation avec Power Automate et Jira Workflow, tests unitaires, CI/CD. |
| En cours | Automates programmables, Cégep de Lévis | Formation continue Allen-Bradley, niveau 1 puis suivants. [METS LA DATE DE DÉBUT RÉELLE] |
| Objectif | Baccalauréat en génie électrique | Option automatisme et commande industrielle. À temps partiel, en parallèle de l'emploi. [Mets « Planifié » sans date précise.] |
| Objectif | Maîtrise en génie minier | Après quelques années d'expérience terrain. |

À ne pas écrire sur le site : ton statut d'immigration, ni aucun détail personnel non pertinent.

### Compétences

**Pratiqué au travail**
Power Automate · Jira Workflow · Tests unitaires · CI/CD · [LANGAGE(S) UTILISÉ(S) POUR TES TESTS] · Git

**Appris à l'école (pratiqué sur des projets perso)**
Python (Flask et Django) · C# · JavaScript · TypeScript · MongoDB · MySQL · Oracle · Tailwind CSS · Bootstrap · Next.js

**En apprentissage (projets personnels)**
Arduino · Python (acquisition de données) · n8n · Ladder Logic (CODESYS) · Allen-Bradley (cours)

**Objectifs affichés comme tels**
Node-RED / Ignition SCADA · InfluxDB + Grafana · CompTIA SecOT+ · Certification Rockwell · PMP

Règle : une compétence passe dans « Pratiqué » seulement quand un projet public le prouve.

### Projet 01 — fichier `src/content/projets/01-station-monitoring-arduino.md`

```markdown
---
title: "Station de monitoring Arduino avec alertes"
summary: "Mesure de température et d'humidité, alertes à seuil et rapport quotidien avec valeurs critiques surlignées."
status: "en-cours"
startDate: [AAAA-MM-JJ]
technologies: ["Arduino", "DHT22", "Python", "n8n", "Telegram", "Tinkercad", "KiCad"]
repoUrl: "https://github.com/[TON-COMPTE]/arduino-monitoring-station"
featured: true
---

## Contexte industriel
En industrie, un capteur qui dépasse un seuil doit déclencher une alerte et laisser une trace. Ce projet reproduit cette logique à petite échelle : acquisition, seuil, notification, rapport.

## Objectif
Construire une chaîne complète capteur → alerte → rapport, documentée comme un petit projet d'ingénierie.

## Matériel
Arduino Uno, capteur DHT22, 2 LED, buzzer piézo, résistances 220 Ω, breadboard.

## Schéma
[Capture Tinkercad + schéma KiCad exporté en PDF]

## Implémentation
1. Simulation de la logique de seuil dans Tinkercad.
2. Montage réel avec le DHT22 et envoi des mesures sur le port série.
3. Script Python qui lit le port série et transmet à un webhook n8n.
4. Workflow n8n : seuil, notification Telegram, rapport HTML quotidien.

## Résultats
[À REMPLIR APRÈS TES TESTS : nombre de mesures, temps de réponse de l'alerte, etc. Ne rien écrire avant d'avoir mesuré.]

## Leçons apprises
[À REMPLIR]

## Liens
Repo GitHub · Vidéo de démonstration [À AJOUTER]
```

Projets 02 et suivants : crée-les seulement quand ils démarrent. Pour afficher la feuille de route, utilise `status: "planifie"` avec un résumé d'une ligne, sans fausse preuve.

### Contact
Courriel : [TON COURRIEL]
LinkedIn : [URL]
GitHub : [URL]
CV : [PDF À AJOUTER]

### Profil README GitHub (repo `[TON-COMPTE]/[TON-COMPTE]`)

```markdown
# Dimitri Fondjo
Technicien IT en transition vers l'automatisation industrielle.

- J'automatise des processus au travail (Power Automate, Jira Workflow, CI/CD)
- Je construis des projets de monitoring et de contrôle : Arduino, Python, n8n
- Formation en cours : automates programmables Allen-Bradley
- Objectif : génie électrique, puis mines autonomes

**En cours :** [station de monitoring Arduino](lien-du-repo)
**Site :** [lien du portfolio]
```

---

## PARTIE 3 — Avant de publier

- [ ] Tous les [CROCHETS] remplis ou retirés
- [ ] Les dates du parcours sont exactes
- [ ] Aucun projet « Terminé » sans repo, README et démo
- [ ] Aucune certification affichée comme obtenue si elle ne l'est pas
- [ ] Rien de confidentiel sur AGA (pas de noms de clients, de systèmes internes ni de données)
- [ ] Tu as ton accord de l'employeur si tu détailles des automatisations faites au travail
