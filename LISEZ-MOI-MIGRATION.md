# Sauvegarde de la config Claude / Claude Code — mode d'emploi

Ce dossier contient **tout ce qu'il faut pour que Claude Code fonctionne à l'identique**
sur un nouvel ordinateur, **même avec un nouveau compte Claude** (nouvelle adresse mail).

> Rien de la config Claude n'est stocké côté serveur : tout est dans des fichiers locaux.
> Changer de compte n'affecte **que** la connexion (login) et la facturation — pas la config.

---

## Contenu du dossier

```
Claude-Config-Backup/
├── LISEZ-MOI-MIGRATION.md      ← ce fichier
├── user-claude/               → à recopier dans  C:\Users\<user>\.claude\
│   ├── CLAUDE.md               (instructions/contexte global)
│   ├── settings.json           (plugins activés + marketplaces → réinstall auto)
│   ├── settings.local.json     (permissions autorisées)
│   ├── mcp_servers.json         (serveurs MCP — n8n)
│   ├── skills/                 (skills perso : graphify, llm-council, animations…)
│   └── projects/               (MÉMOIRE = base de connaissance, par projet)
└── project-claude/            → à recopier dans  <dossier projet "Claude Code">\.claude\
    ├── launch.json
    └── settings.local.json
```

---

## Ce qui N'EST PAS dans ce dossier (volontaire — à laisser se régénérer)

| Élément | Pourquoi il n'est pas là |
|---|---|
| `.credentials.json` | Jeton de l'ANCIEN compte. Inutile : on se reconnecte avec le nouveau mail. |
| `.claude.json` | `machineID`/`userID` de l'ancien PC. Recréé automatiquement. |
| `plugins/`, `cache/`, `sessions/`, `shell-snapshots/`, `telemetry/` | Caches régénérables. Les plugins se réinstallent seuls (voir étape 4). |
| Transcripts de sessions (`*.jsonl`, ~295 Mo) | Historique brut des anciennes conversations. Non nécessaire au fonctionnement. Optionnel — voir plus bas. |

---

## Restauration sur le NOUVEAU PC — étape par étape

1. **Installer Claude Code**, puis se **connecter avec le NOUVEAU compte** (nouvel email).
   → un `.credentials.json` neuf est créé automatiquement. Ne pas y toucher.

2. **Copier `user-claude/`** : verser son contenu dans `C:\Users\<user>\.claude\`
   (fusionner/écraser les fichiers par défaut par ceux d'ici).

3. **Copier `project-claude/`** : verser son contenu dans le sous-dossier `.claude\`
   du dossier de travail du projet (celui nommé « Claude Code »).

4. **Relancer Claude Code.** Il lit `settings.json` et **réinstalle tout seul** les 3 plugins
   depuis GitHub : `claude-obsidian`, `claude-seo`, `n8n-mcp-skills`. Rien à faire à la main.

5. **(si tu utilises n8n)** Rouvrir `~/.claude\mcp_servers.json` et remplacer
   `YOUR_API_KEY_HERE` par ta vraie clé.

6. **Vérifier** (voir checklist plus bas).

### ⚠️ Piège unique : le nom des dossiers de mémoire

La mémoire est rangée dans `projects/` sous un nom = chemin absolu du projet, ex :
`C--Users-PaulMARTINCHAN-Documents-Absis-Conseil-Claude-Code`.

- Si sur le nouveau PC ton **utilisateur Windows reste `PaulMARTINCHAN`** et que tu remets
  le projet au **même chemin** → la mémoire se recharge automatiquement. Rien à faire.
- Si l'utilisateur ou le chemin **change** → lance d'abord une session Claude vide dans le
  nouveau dossier projet (Claude créera le bon nom de dossier dans `projects/`), puis
  dépose les fichiers `memory/*.md` de ce backup dans ce nouveau dossier.

---

## Le wiki Obsidian est séparé (déjà sauvegardé)

La base de connaissance **Obsidian** (vault « Second Brain ») n'est PAS dans ce backup :
elle est sauvegardée à part sur GitHub (dépôt privé `MC-Joker59/wiki-second-brain`).
Sur le nouveau PC : `git clone` du dépôt + « Ouvrir un dossier comme coffre » dans Obsidian.
(Copie physique du dossier conseillée en complément.)

La « mémoire » Claude (dans `projects/`) et le « wiki » Obsidian sont **deux choses distinctes** :
la mémoire = ce que Claude retient sur toi ; le wiki = ta base documentaire.

---

## (Optionnel) Récupérer aussi l'historique des conversations

Non nécessaire pour que Claude fonctionne comme maintenant. Si tu y tiens quand même,
copie en plus les fichiers `*.jsonl` depuis l'ancien
`C:\Users\PaulMARTINCHAN\.claude\projects\...\` vers le même dossier du nouveau PC (~295 Mo).

---

## Checklist de vérification (nouveau PC)

- [ ] Claude Code démarre, connecté au nouveau compte
- [ ] Les 3 plugins apparaissent (obsidian, seo, n8n)
- [ ] `/graphify` répond (skill perso présente)
- [ ] Une session dans le dossier projet recharge la mémoire (profil Paul, préférences…)
- [ ] Claude retrouve le contexte de tes projets (AGRICA, test apps, wiki…)
- [ ] (si n8n) clé API re-remplie
