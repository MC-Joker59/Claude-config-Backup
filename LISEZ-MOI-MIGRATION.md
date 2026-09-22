# Sauvegarde de la config Claude Code — mode d'emploi

Ce dossier contient **tout ce qu'il faut pour que Claude Code fonctionne à l'identique** sur une
nouvelle machine, **même avec un nouveau compte Claude** (nouvelle adresse mail).

> **Rien de la config Claude n'est stocké côté serveur : tout est dans des fichiers locaux.**
> Changer de compte n'affecte **que** la connexion (login) et la facturation — pas la config.
> Le risque n'est donc pas le changement de compte, c'est le changement de **machine** ou un disque qui lâche.

**État : macOS** (migration Windows → MacBook Air effectuée le 2026-09-10).
Dernière mise à jour de cette sauvegarde : **2026-09-22**.

---

## Contenu du dossier

```
Claude-config-Backup/
├── LISEZ-MOI-MIGRATION.md      ← ce fichier
├── user-claude/               → à recopier dans  ~/.claude/
│   ├── CLAUDE.md               (posture par défaut + pointeur vers le wiki Obsidian)
│   ├── settings.json           (plugins activés + marketplaces → réinstall auto)
│   ├── settings.local.json     (permissions autorisées)
│   ├── mcp_servers.json        (serveur MCP n8n — clé API à remplir)
│   ├── skills/                 (10 skills perso : benchmark, graphify, llm-council, animations, design…)
│   └── projects/               (MÉMOIRE = ce que Claude retient sur toi, par projet)
├── project-claude/            → à recopier dans  "~/Documents/Absis Conseil/Claude Code/.claude/"
│   ├── launch.json             (serveurs de preview des apps de benchmark)
│   └── settings.local.json
└── benchmark-assets/          → contrat de données du skill /benchmark
    └── TEMPLATE_BENCHMARK_ABSIS.md
```

---

## Ce qui N'EST PAS ici (volontaire — à laisser se régénérer)

| Élément | Pourquoi |
|---|---|
| `.credentials.json` | Jeton de connexion. On se reconnecte avec le compte, un nouveau est créé. |
| `.claude.json` | `machineID` / `userID` de l'ancienne machine. Recréé automatiquement. |
| `plugins/`, `cache/`, `sessions/`, `shell-snapshots/`, `telemetry/`, `session-env/` | Caches régénérables. Les plugins se réinstallent seuls (étape 4). |
| Transcripts de sessions (`*.jsonl`) | Historique brut des conversations. Inutile au fonctionnement — le savoir est dans le wiki et la mémoire. |
| Mémoires des `scratch-workspaces` | Sessions « sans dossier », éphémères. |

---

## Restauration sur une NOUVELLE machine (macOS)

### 1. Outils de base

Homebrew (le mot de passe demandé est celui de la **session Mac** ; **rien ne s'affiche pendant la saisie**, c'est normal — taper à l'aveugle puis Entrée) :

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

À la fin, exécuter les deux lignes affichées sous « **Next steps** » (elles ajoutent `brew` au PATH).

```bash
brew install gh && brew install --cask obsidian
```

### 2. Claude Code

Installer, puis se connecter (nouveau compte accepté).

### 3. Copier la config

```bash
cp -R user-claude/. ~/.claude/
mkdir -p ~/Documents/"Absis Conseil"/"Claude Code"/.claude
cp -R project-claude/. ~/Documents/"Absis Conseil"/"Claude Code"/.claude/
cp benchmark-assets/TEMPLATE_BENCHMARK_ABSIS.md ~/Documents/"Absis Conseil"/"Claude Code"/
```

### 4. Redémarrer Claude Code — vraiment

**`Cmd+Q` complet**, pas juste fermer la fenêtre. Au démarrage, l'app lit `settings.json` et
**réinstalle seule** les 3 plugins depuis GitHub : `claude-obsidian`, `claude-seo`, `n8n-mcp-skills`.

> ⚠️ Piège vécu le 2026-09-10 : modifier `settings.json` pendant que l'app tourne ne déclenche rien.
> Le dossier `~/.claude/plugins/` reste vide (`{"plugins": {}}`) jusqu'au vrai redémarrage.

### 5. Le wiki Obsidian (dépôt séparé)

```bash
gh auth login    # GitHub.com → HTTPS → Yes → Login with a web browser
gh repo clone MC-Joker59/wiki-second-brain ~/Documents/"Absis Conseil"/"Second Brain"
```

Puis dans Obsidian : **Open folder as vault** → sélectionner `Second Brain`
(**le dossier lui-même, pas le `wiki/` à l'intérieur** — sinon on perd le `.obsidian/` avec le thème et le snippet `vault-colors`).

> ⚠️ Piège vécu : cliquer sur « Create new vault » au lieu de « Open folder as vault » crée un vault
> vide et donne l'impression que le wiki est perdu. Il ne l'est pas.

### 6. (si n8n) Remplir la clé API

Dans `~/.claude/mcp_servers.json`, remplacer `YOUR_API_KEY_HERE`.

---

## ⚠️ Le piège du nom de dossier de mémoire

La mémoire est rangée dans `projects/` sous un nom dérivé du **chemin absolu du projet**, les `/`
remplacés par des `-` :

```
~/Documents/Absis Conseil/Claude Code
        ↓
-Users-paulmartinchan-Documents-Absis-Conseil-Claude-Code
```

- **Même utilisateur macOS (`paulmartinchan`) + même chemin** → la mémoire se recharge seule. Rien à faire.
- **Utilisateur ou chemin différents** → lancer d'abord une session Claude vide dans le nouveau dossier
  projet (Claude crée le bon nom dans `projects/`), **puis** y déposer les fichiers `memory/*.md` de cette sauvegarde.

---

## Les deux dépôts, et ce qu'ils contiennent

| Dépôt | Contenu | Rythme de mise à jour |
|---|---|---|
| **`MC-Joker59/wiki-second-brain`** | Le **wiki** : base documentaire (~154 pages), `.raw/` des sources, `.obsidian/` | Poussé **à chaque ingestion** |
| **`MC-Joker59/Claude-config-Backup`** | Cette **config** : instructions, skills, mémoire, réglages | À repousser **quand la config change** |

> **Mémoire ≠ wiki.** La mémoire (`projects/*/memory/`) = ce que Claude retient **sur toi** (profil,
> préférences, réflexes de travail). Le wiki = ta **base documentaire** (projets, méthodes, sources).
> Les deux sont sauvegardés séparément et ne bougent pas au même rythme.

### Rien n'est automatique

Aucun des deux dépôts ne se synchronise tout seul. Pour pousser :

```bash
cd ~/Documents/"Absis Conseil"/"Second Brain" && git add -A && git commit -m "maj wiki" && git push
```

---

## Checklist de vérification

- [ ] Claude Code démarre, connecté
- [ ] `~/.claude/plugins/installed_plugins.json` n'est plus vide → les 3 plugins sont là
- [ ] `/graphify` et `/benchmark` répondent (skills perso présentes)
- [ ] Une session ouverte dans `~/Documents/Absis Conseil/Claude Code` recharge la mémoire (profil Paul, préférences, réflexe wiki)
- [ ] Obsidian ouvre le vault `Second Brain` et affiche `wiki/`, `_templates/`, `CLAUDE.md`
- [ ] Claude retrouve le contexte des projets (ABSIS, IÉSEG Conseil, benchmarks)
- [ ] (si n8n) clé API re-remplie

---

## ⚠️ GAP CONNU, TOUJOURS OUVERT

Les **implémentations de référence des benchmarks** — `benchmark-demo-test`, `absis-benchmark`,
`carnet-ordre-benchmark`, `actif-uc-benchmark`, `signature-electronique-benchmark` — vivaient dans
`Documents\Absis Conseil\Test Apps Creation\` sur l'**ancien PC Windows**, dans un dépôt git **local
sans remote** (0 remote, ~7 Mo, fichiers non commités).

**Elles ne sont dans aucune sauvegarde et n'ont pas été transférées sur le Mac.**
Le `launch.json` de `project-claude/` pointe vers leurs chemins macOS, mais les dossiers n'existent pas.

→ **Si l'ancien PC est encore accessible, les récupérer et créer un 3ᵉ dépôt privé.**
Signalé pour la première fois le 2026-09-05, toujours non traité au 2026-09-22.
