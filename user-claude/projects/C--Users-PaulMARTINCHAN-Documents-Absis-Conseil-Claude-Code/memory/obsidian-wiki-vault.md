---
name: obsidian-wiki-vault
description: "Emplacement et usage du vault Obsidian \"Wiki Absis\" (second cerveau via plugin claude-obsidian)"
metadata: 
  node_type: memory
  type: project
  originSessionId: fb862560-dcf4-40fe-a28c-6933833fc676
---

Paul utilise le plugin Claude Code **claude-obsidian** (installé au scope user) avec un vault Obsidian « second cerveau ». ⚠️ **Chemin réel : `C:\Users\PaulMARTINCHAN\Documents\Absis Conseil\Second Brain\wiki`** (et NON `…\Wiki Absis` comme l'indique par erreur le CLAUDE.md global). Le vault contient `wiki/hot.md`, `wiki/index.md`, `wiki/log.md`, et les dossiers `projects/ domains/ entities/ concepts/ sources/ comparisons/`. Voir aussi `Second Brain/CLAUDE.md` (conventions du vault).

- Mode D (second cerveau général), structure et pages rédigées **en français**.
- Transport : accès direct au système de fichiers (PAS de MCP — v1.7+ du plugin).
- Sources brutes à déposer dans `.raw/` ; pages générées dans `wiki/` (projects, domains, entities, concepts, sources, comparisons, questions, meta).

**Why:** base de connaissances persistante des projets de conseil Absis et de la veille de Paul.

**Pointeur global :** un bloc dans `~/.claude/CLAUDE.md` rend le wiki connu de toutes les sessions Claude Code, AVEC garde-fous explicites : ne le consulter QUE si la question porte sur les projets ABSIS/IÉSEG ; ignorer pour tout sujet sans rapport (Paul change souvent de projet).

**How to apply:** dans son environnement, la commande slash `/wiki` n'est PAS reconnue — déclencher les opérations via les skills `claude-obsidian:*` ou en langage naturel (« ingère X », « qu'est-ce que je sais sur Y », « lint the wiki »). Astuce d'ingestion : les .docx/.pptx/.odt/.xlsx s'extraient en texte via PowerShell + System.IO.Compression (les xlsx ressortent mal). État au 2026-06-17 : **~91 pages, 6 projets ingérés** — 5 ABSIS (AGRICA capacitaire, Abeille/BPCE Vie actif UC, Benchmark outils de test, Lab Claude Code, Apps Claude Code) reliés par le nœud [[ABSIS Conseil]] + 1 IÉSEG (domaine [[IÉSEG Conseil — Junior-Entreprise]] : projet JE ICP, diagnostic Actico, proposition Typology, formation JE). **Projets restants à ingérer** dans `Absis Conseil\` : « Fiche de paie », « Prompt », « Refonte site web ». Modules de formation JE « Les bases à maîtriser » catalogués mais pas tous synthétisés en détail (approfondir à la demande).
