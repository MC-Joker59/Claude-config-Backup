---
name: template-benchmark-absis
description: "Template réutilisable d'app de benchmark ABSIS : où il est, comment le déclencher, ce qui reste à construire"
metadata: 
  node_type: memory
  type: project
  originSessionId: ab5a9927-0787-4cad-a940-9c7e5b9f71d2
  modified: 2026-07-29T10:43:39.825Z
---

Paul capitalise ses apps de benchmark comparatif (outils/solutions/éditeurs) sur un **template ABSIS commun**, pour ne pas repartir de zéro à chaque mission.

- **⭐ IMPLÉMENTATION DE RÉFÉRENCE (gabarit visuel validé par Paul, juillet 2026)** :
  `Documents\Absis Conseil\Test Apps Creation\benchmark-demo-test\`. Tout nouveau benchmark
  **copie ce dossier** et ne régénère que `data/config.js`. `css/style.css` et `js/app.js` sont
  le socle et le moteur : **ne pas les réécrire**.
- **Identité** : fond crème `#FBF6EC`, navy `#0E2A47`, accent **or `#F2C14E`**, Playfair Display +
  Inter. Pas de Tailwind. 4 pages : Accueil · Outils · **Analyse & Reco** · Arbitrage (+ fiche outil + 404).
  Section « Les N outils retenus » obligatoire (rôle + pourquoi + réserve).
- **Contrat de données** : `Documents\Absis Conseil\Claude Code\TEMPLATE_BENCHMARK_ABSIS.md`
  (schéma `window.BENCHMARK` : N critères, échelle /5 ou /10, modules optionnels `couche2` /
  `fiabilite` / `types`, 2 genres `scoring` | `fiches`).
- **Déclencheur** : skill `/benchmark` (`~/.claude/skills/benchmark/SKILL.md`) — ou en langage naturel « nouveau benchmark sur X, sources dans Y, utilise le template benchmark ».
- **Autres instances** : `agrica-benchmark` (origine du langage visuel ; 11 outils, 8 critères /5 + 23 axes d'arbitrage) · `absis-benchmark` (genre « fiches », 14 outils) · `carnet-ordre-benchmark` (7 volets /10 pondérés + matrice + badges).

**Why:** transformer un livrable ponctuel en actif réutilisable du cabinet ; éviter qu'une 3ᵉ app arrive avec un modèle de données incompatible avec les deux premières.

**How to apply:** à tout nouveau benchmark, lire le template AVANT de coder, réutiliser le socle technique de l'instance la plus proche — **mais pas son arborescence** (elle encode l'objectif du projet précédent). Vanilla HTML/CSS/JS + Tailwind CDN, jamais de build. **État juillet 2026 : le contrat de données existe, le moteur générique et le starter `benchmark-template/` restent à construire** (prévu après livraison de carnet-ordre) — donc aujourd'hui on adapte encore l'instance la plus proche. Voir [[reflexe-wiki-projets-absis]] pour le réflexe wiki avant/après.
