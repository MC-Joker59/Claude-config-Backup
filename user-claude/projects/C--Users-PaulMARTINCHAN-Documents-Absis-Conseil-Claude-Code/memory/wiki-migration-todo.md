---
name: wiki-migration-todo
description: "Paul devra transférer son vault Second Brain + son setup Claude vers un nouveau PC et un nouveau compte Claude, à une date non encore fixée"
metadata: 
  node_type: memory
  type: project
  originSessionId: fb862560-dcf4-40fe-a28c-6933833fc676
  modified: 2026-09-05T16:39:02.234Z
---

Paul prévoit (anticipé le 2026-06-29, sans date arrêtée) de **changer d'ordinateur ET de compte Claude** et veut conserver/transférer son wiki « second cerveau » + son setup Claude. Pas urgent — à ré-aborder quand il le demandera.

**MàJ 2026-07-27 — sauvegardes en place :**
- **Vault** poussé sur un **remote GitHub privé** : `MC-Joker59/wiki-second-brain` (HTTPS, branche `main`). Pour maj : `git add -A && git commit && git push` depuis le dossier du vault. Le risque « un seul disque » est levé.
- **Config Claude** sauvegardée dans `Documents\Absis Conseil\Claude-Config-Backup\` (+ zip daté) ET poussée sur un **2ᵉ remote GitHub privé** : `MC-Joker59/Claude-config-Backup` (HTTPS, branche `main`). Contenu : CLAUDE.md, settings*.json, mcp_servers.json, skills/, projects/*/memory/, config projet, et un `LISEZ-MOI-MIGRATION.md` (runbook autonome). `.gitignore` exclut credentials, `.claude.json`, caches, `*.jsonl`. **Transcripts de sessions volontairement NON sauvegardés** (295 Mo de logs, aucune valeur pour recréer l'environnement ; le savoir est dans le wiki + la mémoire). Plugins non copiés (réinstall auto via settings.json).
- **Description du wiki recadrée** : n'est plus « projets ABSIS Conseil » mais « second cerveau généraliste de Paul » (CLAUDE.md du vault, wiki/index.md, wiki/overview.md).
- **Décision différée (2026-07-27)** : élargir mes **instructions globales** (`~/.claude/CLAUDE.md`) pour que je consulte spontanément le wiki sur TOUS les projets perso de Paul (pas seulement ABSIS/IÉSEG). Paul a dit « pas pour le moment » — à lui reproposer **quand il installe le nouveau PC**. Instructions globales laissées inchangées pour l'instant.

**MàJ 2026-09-05 — nouveaux éléments ajoutés à la sauvegarde config :**
- **Skill `benchmark`** (`~/.claude/skills/benchmark/`, skill PERSO non réinstallable) + mémoire `template-benchmark-absis.md` + `settings.local.json` mis à jour → poussés sur `Claude-config-Backup`. Le **contrat de données** `TEMPLATE_BENCHMARK_ABSIS.md` (était dans « Claude Code », sauvegardé nulle part) est désormais dans le dépôt sous `benchmark-assets/`.
- ⚠️ **GAP restant** : les implémentations de référence du benchmark (`benchmark-demo-test`, `absis-benchmark`, `carnet-ordre-benchmark`, `actif-uc-benchmark`, `signature-electronique-benchmark`) sont dans `Documents\Absis Conseil\Test Apps Creation\` — dépôt git LOCAL **sans remote** (0 remote, 13 fichiers non commités, ~7 Mo). **Non protégé.** À sauvegarder (3ᵉ remote privé, ou commit+push si un remote est créé). Proposé à Paul le 2026-09-05.
- Réflexe à rappeler à Paul : **repousser les 2 (bientôt 3) dépôts** avant de changer de PC si des fichiers bougent encore.

**Why:** tout son savoir est dans des fichiers locaux ; un mauvais transfert = perte définitive.

**How to apply:** rappeler les 3 paquets à transférer —
1. **Vault** : dossier `C:\Users\PaulMARTINCHAN\Documents\Absis Conseil\Second Brain\` (autonome : `wiki/` + `.git` + `.obsidian`). Le copier en entier (sous-dossiers cachés compris).
2. **Côté Claude** : `~/.claude/CLAUDE.md` + le dossier `memory/` du projet. La mémoire se recharge seule si le **chemin projet est identique** sur le nouveau PC (`...\Documents\Absis Conseil\Claude Code`), sinon déposer les fichiers dans le `memory/` du nouveau hash.
3. **Outils réinstallables** : Claude Code (nouveau compte), Obsidian (puis « ouvrir dossier comme vault »), plugin `claude-obsidian`, skill `graphify`.

Reco backup à faire dès que possible : **remote git privé** (`git remote add` + push, préserve l'historique) et/ou **zip daté**. Option : écrire `wiki/meta/MIGRATION.md` (runbook qui voyage avec le vault).

Paul a créé un **compte Obsidian avec son email perso**. Utile UNIQUEMENT s'il active **Obsidian Sync** (payant) : transfère le vault entre appareils, mais **PAS** le `CLAUDE.md`/la mémoire (hors vault) ni forcément l'historique `.git`. Donc complément possible, pas une solution complète → le git remote reste plus robuste.

⚠️ **Rien n'est stocké dans le compte Claude** : changer de compte ne fait rien perdre tant que les fichiers locaux sont transférés. Lié à [[obsidian-wiki-vault]].
