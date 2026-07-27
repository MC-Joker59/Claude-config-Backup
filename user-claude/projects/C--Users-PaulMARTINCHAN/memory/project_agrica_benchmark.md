---
name: project-agrica-benchmark
description: "Benchmark d'outils de gestion capacitaire (PPM) réalisé par ABSIS Conseil pour le client AGRICA — livrable client multi-pages"
metadata: 
  node_type: memory
  type: project
  originSessionId: d69fb518-7bee-420f-8def-06aa3b9bde66
---

Projet benchmark capacitaire AGRICA démarré le 2026-06-04.
Dossier local : `C:\Users\PaulMARTINCHAN\Documents\Absis Conseil\Benchmark outils AGRICA\agrica-benchmark\`

**Why:** Livrable client à usage de présentation — rendu éditorial type "Canva moderne", qualité graphique prioritaire.

**Structure créée :**
- `index.html` — accueil, contexte AGRICA, 3 niveaux de maturité
- `outils.html` — catalogue des 10 outils (cartes cliquables)
- `outil.html` — fiche détail (`?id=planisware` dans l'URL)
- `comparatif.html` — matrice comparative (vue tableau + vue radar)
- `recommandation.html` — top 3 recommandés + feuille de route
- `data/outils.js` — `window.OUTILS=[]` et `window.CRITERES=[]`
- `css/style.css` — styles custom (polices, halos, animations)
- `js/app.js` — utilitaires partagés (navbar active, étoiles, helpers)
- `assets/` — logo-absis.png à ajouter manuellement

**How to apply:** Stack identique aux autres projets Absis ([[user_stack_preference]]) : Tailwind CDN, vanilla JS, pas de build. Chaque HTML charge dans l'ordre : Tailwind CDN → css/style.css → data/outils.js → js/app.js.
