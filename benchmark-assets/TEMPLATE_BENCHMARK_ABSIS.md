# Template benchmark ABSIS — schéma de configuration + prompt de remplissage

**But** : n'avoir qu'UN SEUL fichier à paramétrer (`config.js`) pour produire une app de benchmark
ABSIS, quels que soient le sujet, le nombre d'outils et le nombre de critères.

**État** : amorce (juillet 2026). Le moteur générique sera factorisé après livraison de
`carnet-ordre-benchmark` (2ᵉ instance). Ce document fige dès maintenant **le contrat de données**
pour que les futures apps soient compatibles.

**Instances existantes** (3, dont 2 genres différents — cf. §1bis) :
- `agrica-benchmark` — **scoring** : 11 outils, 8 critères /5 (radar) **+ 23 axes d'arbitrage**
  (échelle Fort/Moyen/Limité, commentaire par cellule), axe maturité
- `carnet-ordre-benchmark` — **scoring** : 5 outils, 7 volets /10 pondérés, +couche 2 +badges de fiabilité
- `absis-benchmark` (outils de test) — **fiches** : 8 outils / 5 familles, pas de radar, fiches
  narratives développées (contexte d'usage, roadmap, coûts, écosystème, alternatives)

---

## 0bis. ⭐ Implémentation de référence (juillet 2026)

Le gabarit visuel est **figé et validé** :
`Documents\Absis Conseil\Test Apps Creation\benchmark-demo-test\`

Tout nouveau benchmark **copie ce dossier** et ne régénère que `data/config.js`.
`css/style.css` (socle éditorial) et `js/app.js` (moteur : radar, cartes, badges, layout injecté)
sont génériques — **ne pas les réécrire**. 4 pages : Accueil · Outils · **Analyse & Reco** ·
Arbitrage, + fiche outil (`outil.html?id=`) + 404. Identité : crème `#FBF6EC` / navy `#0E2A47` /
or `#F2C14E`, Playfair Display + Inter, pas de Tailwind.

La section « Les N outils retenus » (bloc `finalistes`) est **obligatoire** : un rôle par outil,
un *pourquoi*, une *réserve* — et il faut dire si c'est une sélection éditoriale ou un top-N calculé.

---

## 0. Comment ça s'utilise (côté humain)

**Tu n'ouvres jamais ce fichier.** C'est une fiche de référence que Claude lit pour produire des
apps cohérentes entre elles. Ton point d'entrée, c'est la skill :

```
/benchmark outils de GED pour un assureur --sources "Documents/Absis Conseil/GED"
```

Ce qui se passe ensuite, sans que tu aies à remplir quoi que ce soit :
1. Claude consulte le wiki (si le sujet est ABSIS/IÉSEG) et inventorie tes sources.
2. Il te pose ~6 questions (échelle /5 ou /10 · critères et poids · matrice de détail ou non ·
   outils tous notés ou certains qualitatifs · anonymisation · pages).
3. Il extrait les données de tes fichiers, vérifie l'actualité des éditeurs sur le web.
4. Il génère `data/config.js` + l'app, et te dit franchement ce qui reste à confirmer.
5. Il capitalise dans le wiki.

Skill : `~/.claude/skills/benchmark/SKILL.md`. Sans la skill, une phrase suffit :
« nouveau benchmark sur X, sources dans Y, utilise le template benchmark ».

> Les sections 2 et 3 ci-dessous sont **du matériel pour Claude** (contrat de données et prompt).
> Elles ne sont pas destinées à être lues ou éditées à la main.

---

## 1. Principe : moteur / config / contenu

| Brique | Rôle | Change par projet ? |
|---|---|---|
| `js/app.js` + pages HTML | **moteur** : radar, tableaux, filtres, nav, badges | ❌ jamais |
| `data/config.js` | **config + données** : critères, outils, options | ✅ le seul fichier à toucher |
| sources (xlsx/docx/web) | **contenu** à extraire et sourcer | ✅ travail humain, non automatisable |

> ⚠️ Le template accélère la **mise en forme**, pas la **fiabilité**. L'extraction de données justes
> et sourcées reste un travail par projet.

---

## 1bis. Les deux GENRES de benchmark (à trancher en premier)

Constat du 3ᵉ cas réel (`absis-benchmark`, outils de test) : tous les benchmarks ABSIS ne sont pas
des scorings. Il y a **deux genres**, avec des finalités et des lecteurs différents.
Le genre se déclare dans `meta.genre` et détermine ce que le moteur affiche.

| | `genre: "scoring"` | `genre: "fiches"` |
|---|---|---|
| **Finalité** | départager pour décider (achat, AO) | argumenter, conseiller par contexte |
| **Lecteur** | comité de décision / DSI | prospect, client en réflexion |
| **Cœur** | radar multicritère + classement | fiche narrative par outil |
| **Message** | « voici le mieux noté » | « il n'y a pas de meilleur outil, il y a le vôtre » |
| **Blocs actifs** | `criteres` `notes` `couche2` `scoreGlobal` `classement` | `fiche` (`contexte` `roadmap` `couts`…) `notation` |
| **Instances** | agrica-benchmark · carnet-ordre-benchmark | absis-benchmark (outils de test) |

`genre: "mixte"` = quelques appréciations chiffrées **et** des fiches développées, sans classement
global. Utile quand on veut nuancer sans hiérarchiser.

> ⚠️ **Ne jamais convertir un genre en l'autre par commodité.** Transformer des fiches en scoring
> oblige à inventer des notes (viole la règle n°1) ; transformer un scoring en fiches jette
> l'information qui justifiait la décision.

---

## 2. Schéma `data/config.js` (contrat de données)

```js
// data/config.js — SOURCE DE VÉRITÉ UNIQUE d'une instance de benchmark ABSIS.
// Le moteur (js/app.js) ne présuppose NI le nombre d'outils, NI le nombre de critères,
// NI l'échelle : tout est lu ici et l'affichage s'adapte.

window.BENCHMARK = {

  /* ---------- MÉTA : identité et cadrage de l'app ---------- */
  meta: {
    titre:        "Benchmark des solutions de carnet d'ordre — UC",
    sousTitre:    "Comparatif de solutions de tenue de position pour les unités de compte",
    contexte:     "Un assureur-vie français cherchant à remplacer son carnet d'ordre.", // ANONYMISÉ
    genre:        "scoring",     // ⚠️ VOIR §1bis — "scoring" | "fiches" | "mixte"

    // Trace du brief (réponses de la Phase 1 de la skill) : l'app porte sa raison d'être.
    brief: {
      finalite:  "Départager 8 outils pour outiller la recette d'une DSI mid-market.",
      public:    "DSI et direction qualité",    // à qui s'adresse le livrable
      demarche:  "Étude comparative interne ABSIS, support d'avant-vente.",
      date:      "2026-07",                     // état des données — À AFFICHER en footer
      auteur:    "ABSIS Conseil",
      diffusion: "interne",                     // "interne" | "reunion" | "client" | "publique"
    },

    // Q7 — contraintes DU PROJET (client), qui disqualifient d'office un outil.
    // Affichées en tête de la page Arbitrage sous le titre « Le cadre imposé » : sans elles,
    // l'encart « Incompatible avec vos contraintes » des fiches n'aurait aucun référent, et la
    // recommandation ne serait pas auditable. `elimine` nomme les outils écartés (ids).
    // ⚠️ À ne pas confondre avec fiche.prerequis = contraintes de l'OUTIL.
    contraintes: [
      { titre:"Hébergement en France",
        detail:"Données de santé : SecNumCloud ou équivalent exigé.",
        elimine:["outil-saas-only"] },     // [] = n'écarte aucun outil du panel (affiché comme tel)
    ],

    // Q8 — outils volontairement écartés : dire ce qu'on n'a PAS regardé
    horsPerimetre: [
      { nom:"Cypress", raison:"Périmètre front uniquement, hors besoin exprimé." },
    ],

    // Q9 — méthodologie : qui a noté, comment, avec quelles limites
    methodologie: {
      evaluateur: "ABSIS Conseil (analyse)",   // ou "atelier client", "réponse à AO", …
      regime:     "analyse",                   // "primaire" | "editeur" | "analyse" | "mixte"
      date:       "2026-07",
      grille:     "1 = absent ou marginal · 3 = couvert avec réserves · 5 = couvert nativement et éprouvé.",
      limites:    "Notes établies à partir des sources publiques (sites éditeurs, analystes, presse), " +
                  "non validées par les éditeurs ni par un usage terrain — à reconfirmer en démonstration.",
    },
    axeRegroupement: "positionnement fonctionnel",  // ex. "positionnement fonctionnel" | "niveau de maturité" | "famille d'outil"
    palette:      "absis",       // navy #1A3A6C · navyDk #0F2647 · cyan #5BC0DE · yellow #F4D03F · orange #FF8B6A · magenta #C2185B
    pages:        ["accueil","outils","comparatif","arbitrage","recommandation"], // pages à générer

    // Groupes de l'axe de regroupement, déclarés une fois (évite de répéter la couleur par outil)
    groupes: [
      { id:"front-to-back", label:"PMS/OMS front-to-back complet", couleur:"#1A3A6C" },
    ],
  },

  /* ---------- ÉCHELLE DE NOTATION (genre "scoring") ---------- */
  echelle: {
    max:        10,        // 5 (agrica) | 10 (carnet-ordre)
    ponderee:   true,      // true = les critères ont un poids (somme des poids = 100)
    affichage:  "note",    // "note" (7,48/10) | "etoiles" (★★★★☆)
  },

  /* ---------- AXES DE NOTATION LIBRES (indépendants du radar) — OPTIONNEL ----------
     Pour les appréciations ponctuelles qui ne constituent PAS un scoring multicritère :
     ex. facilité de prise en main, disponibilité des profils, reconnaissance de l'éditeur.
     Utilisable seul (genre "fiches") ou en complément d'un radar. */
  notation: {
    actif: false,
    axes: [
      { id:"facilite",       label:"Facilité de prise en main", max:5, commentaire:false },
      { id:"sourcing",       label:"Disponibilité des profils", max:5, commentaire:true  },
      { id:"reconnaissance", label:"Reconnaissance / pérennité", max:5, commentaire:true  },
    ],
  },

  /* ---------- COUCHE 1 : critères de scoring (radar) — N critères, libre ---------- */
  // AJOUTER UN CRITÈRE = ajouter une ligne. Le radar s'adapte automatiquement.
  criteres: [
    { id:"fonctionnel", label:"Fonctionnel", court:"Fonct.", poids:40, desc:"Couverture métier." },
    { id:"technique",   label:"Technique",   court:"Tech.",  poids:20, desc:"Architecture, données, sécurité." },
    // … autant que nécessaire ; poids omis si echelle.ponderee = false
  ],

  /* ---------- COUCHE 2 : matrice de détail (OPTIONNELLE) ---------- */
  // Module désactivable : mettre actif:false si le benchmark n'a pas de matrice détaillée.
  couche2: {
    actif:  true,
    titre:  "Détail fonctionnel",
    unite:  "exigences",                    // ex. "exigences", "cas d'usage"
    echelleCouverture: [                    // valeurs possibles par cellule + couleur
      { id:"natif",        label:"Natif",        couleur:"vert"   },
      { id:"parametrage",  label:"Paramétrage",  couleur:"cyan"   },
      { id:"specifique",   label:"Spécifique",   couleur:"orange" },
      { id:"non",          label:"Non couvert",  couleur:"rouge"  },
    ],
    items: [                                // les domaines/axes de la matrice
      { id:"referentiels", label:"Référentiels", volume:43 },
      // …
    ],
  },

  /* ---------- FIABILITÉ DES DONNÉES (OPTIONNELLE mais recommandée) ---------- */
  fiabilite: {
    actif:   true,
    bandeau: "Données issues d'un appel d'offres ~2021 — capacité éditeurs 2026 à reconfirmer.",
    badges: [
      { id:"ao",        label:"Donnée AO vérifiée", couleur:"vert",   desc:"Source primaire datée." },
      { id:"editeur",   label:"Info éditeur 2026",  couleur:"cyan",   desc:"Site éditeur navigué." },
      { id:"confirmer", label:"À confirmer",        couleur:"orange", desc:"Non établi." },
      { id:"terrain",   label:"Retour terrain ABSIS", couleur:"gris", desc:"Expérience d'implémentation, anonymisée." },
      // 🟣 quand personne n'a évalué et que Claude note lui-même (cf. skill, régime d'évaluation).
      // Chaque note ainsi produite EXIGE une justification dans commentaires[critere].
      { id:"analyse",   label:"Évaluation analytique", couleur:"violet",
        desc:"Note établie par analyse des sources publiques — ni source primaire, ni déclaratif éditeur." },
    ],
  },

  /* ---------- TYPES D'OUTILS : populations hétérogènes (OPTIONNEL) ---------- */
  // Permet de distinguer des outils chiffrés de simples alternatives qualitatives.
  // Si un seul type, mettre types:[{id:"standard", …}] et type:"standard" partout.
  types: [
    { id:"tete-affiche", label:"Têtes d'affiche — évaluées sur dossier", note:true,  style:"plein" },
    { id:"alternative",  label:"Alternatives — en veille (qualitatif)",  note:false, style:"sobre" },
  ],

  /* ---------- LES OUTILS ---------- */
  // AJOUTER UN OUTIL = ajouter un objet. Champs inconnus/non notés = null (jamais inventés).
  outils: [
    {
      id:            "jump",
      nom:           "JUMP",
      editeur:       "Jump Technology (groupe Clearwater Analytics)",
      site:          "https://jump-technology.com",
      type:          "tete-affiche",          // ↔ types[].id
      groupe:        "PMS/OMS front-to-back complet",   // ↔ meta.axeRegroupement
      positionnement:"Front-to-back complet sur toute la chaîne d'investissement.",
      fiabilite:     "ao",                    // ↔ fiabilite.badges[].id
      notes:         { fonctionnel:7.48, technique:7.56 /* … null si non chiffré */ },
      scoreGlobal:   8.12,                    // null si non noté
      classement:    1,                       // null si non classé
      // forces / vigilances : 3 formes acceptées, au choix selon la richesse disponible —
      //   "texte simple"  |  { texte, fiabilite }  |  { titre, description, fiabilite }
      // (la forme titre+description est celle des benchmarks de genre "fiches")
      forces:        [ "…" ],
      vigilances:    [ { texte:"…", fiabilite:"terrain" } ],
      // couverture : clé = couche2.items[].id · valeur = couche2.echelleCouverture[].id
      // 2 formes acceptées : "natif"  OU  { valeur:"natif", commentaire:"…" }
      // (le commentaire par cellule est indispensable : agrica en a un sur ses 23 axes)
      couverture:    { referentiels:{ valeur:"natif", commentaire:"Référentiel central embarqué" },
                       compliance:"parametrage" },
      couvertureGlobale: { oui:199, non:0, natif:189, parametrage:10 },  // optionnel
      infoActuelle:  "Front-to-back : PMS, OMS, Compliance, NAV, Risk, Reporting…",  // état éditeur courant

      // Blocages détectés en confrontant meta.contraintes (projet) à fiche.prerequis (outil).
      // S'affiche en encart rouge sur la fiche : un outil incompatible doit être visible
      // comme tel, quelle que soit sa note.
      incompatibilites: [ "SaaS uniquement : incompatible avec l'exigence d'on-premise." ],
      alerte:        "Appartient à Clearwater Analytics (rachat 30/11/2022).",        // optionnel
      sources:       [ "jump-technology.com", "cwan.com" ],

      /* --- notation libre (si notation.actif) : { axeId: note } ou { axeId:{note,commentaire} } --- */
      appreciations: { facilite:2, sourcing:{ note:5, commentaire:"Profils abondants. TJM 500-650 €." } },

      /* --- BLOC FICHE (genre "fiches" ou "mixte") — tout est optionnel --- */
      fiche: {
        catchphrase: "Le standard universel de l'automatisation Web.",
        tagline:     "Gratuit, flexible, présent partout. Mais réservé aux équipes techniques.",
        licence:     "Gratuite",           // ou "Propriétaire", "Freemium"…
        // Ce que l'OUTIL impose — s'affiche dans la fiche à côté de Forces & vigilances.
        // (À ne pas confondre avec meta.contraintes = contraintes du projet.)
        prerequis:   [ { titre:"Profils de développement requis",
                         detail:"Sans développeurs dédiés, le projet n'avance pas." },
                       { titre:"Hébergement", detail:"SaaS uniquement, pas d'option on-premise." } ],
        annee:       "2004",
        adoptePar:   "70% du marché Web",  // ⚠️ doit être sourcé, sinon null
        // forts / vigilances en version développée (titre + explication)
        forts:      [ { titre:"Présent dans tous les contextes", description:"20 ans d'existence…" } ],
        vigilances: [ { titre:"Réservé aux profils techniques",  description:"Selenium c'est du code…" } ],
        // scénario d'usage type — le cœur de la valeur conseil
        contexte:   { situation:"Grande DSI avec un pôle QA-dev structuré",
                      probleme: "L'équipe veut éviter la dépendance à un éditeur.",
                      solution: "Zéro coût de licence, intégration CI/CD native…" },
        roadmap:    [ { phase:"S1-S2", titre:"Cadrage", description:"Choix du langage, POC sur 5 cas." } ],
        marche:      "Standard de facto depuis 2004…",
        ecosysteme:  "Selenium WebDriver, Grid, IDE. Wrappers : Selenide, Watir…",
        integrations:"Jenkins, GitLab CI, Azure DevOps, GitHub Actions…",
        formations:  "Pas de programme officiel. Formation interne 5-10 j pour l'autonomie.",
        // ⚠️ Le vocabulaire de coût est SPÉCIFIQUE au domaine (ex. RPA : studio / orchestration /
        // unité de robot ; SaaS : par siège / par environnement). Donc liste libre de postes,
        // et NON des clés figées — sinon on déforme la réalité pour tenir dans le gabarit.
        couts:       { postes:[ { poste:"Studio",        montant:"0 € — open source" },
                                { poste:"Orchestration", montant:"0 € — Grid auto-hébergé" },
                                { poste:"Unité",         montant:"≈ 30-50 €/mois (cloud)" } ],
                       note:"Coût licence nul mais coût caché en compétences." },
        alternatives:[ { nom:"Playwright", note:"Plus moderne, meilleur sur les SPA" } ],
      },
    },
    // … autres outils
  ],

  /* ---------- ÉVOLUTIONS / VEILLE (OPTIONNEL) ---------- */
  evolutions: [
    { quoi:"JUMP → Clearwater Analytics", quand:"30/11/2022", impact:"Même groupe : pas des concurrents indépendants." },
  ],

  /* ---------- ARBITRAGE & RECOMMANDATION ---------- */
  arbitrage: {
    scenarios: [   // grille NEUTRE : "si votre besoin est X → tel outil"
      { besoin:"Front-to-back complet", outil:"jump", pourquoi:"Couvre toute la chaîne." },
    ],
  },
  recommandation: {
    avis:      "Classement issu de l'AO ~2021, à reconfirmer en 2026.",
    nuances:   [ "Malgré sa 1ᵉ place, robustesse à éprouver en infra contrainte (retour terrain)." ],
    aVerifier: [ "Capacité 2026 en démo/POC", "Évolutions d'actionnariat" ],
  },
};
```

### Règles de dégradation propre (le moteur doit les respecter)
- `notes` à `null` → afficher « non chiffré / à confirmer », **jamais** `NaN` ni `0`.
- `types[].note = false` → pas de radar ni de score pour ces outils (fiches qualitatives).
- `couche2.actif = false` → la section détail disparaît (pas de section vide).
- `fiabilite.actif = false` → ni bandeau ni badges.
- `echelle.ponderee = false` → poids masqués, moyenne simple.
- `notation.actif = false` → pas d'axes d'appréciation.
- **Aucun outil noté du tout** → mode « fiches qualitatives », radar désactivé globalement.
- `genre: "fiches"` → **pas de radar, pas de classement, pas de score global** ; la page comparatif
  devient une **comparaison par contexte** (tableau outil × situation d'usage), pas un palmarès.
- `fiche` absent sur un outil → n'afficher que les sections réellement renseignées (jamais de
  rubrique vide « Roadmap » ou « Coûts » à titre décoratif).
- **1 seul critère déclaré** → pas de radar (un radar à 1 axe n'a pas de sens) : barre ou note simple.

---

## 2bis. Validation du contrat sur `absis-benchmark` (genre « fiches », 14 outils)

Mapping vérifié champ par champ (juillet 2026). **Aucune perte d'information** après extension v2 :

| Champ existant | → Contrat v2 |
|---|---|
| `id` `nom` `editeur` `siteOfficiel` | `outils[].id` `.nom` `.editeur` `.site` |
| `famille` + `familleColor` | `outils[].groupe` + `meta.groupes[]` (couleur déclarée une fois) |
| `catchphrase` `tagline` `licence` `annee` `adoptePar` | `fiche.*` |
| `forts[{titre,description}]` `vigilances[…]` | `forces` / `vigilances` (forme titre+description) |
| `contexte{situation,probleme,solution}` | `fiche.contexte` |
| `roadmap[{phase,titre,description}]` | `fiche.roadmap` |
| `marche` `ecosysteme` `integrations` `formations` | `fiche.*` |
| `couts{studio,orchestration,unite,note}` | `fiche.couts.postes[{poste,montant}]` + `note` |
| `alternatives[{nom,note}]` | `fiche.alternatives` |
| `facilite` (scalaire) | `appreciations.facilite` (axe `notation`) |
| `sourcing{etoiles,commentaire}` `reconnaissance{…}` | `appreciations.*{note,commentaire}` |

**Trois corrections qu'a imposées cette validation** (le gabarit v1 aurait déformé la donnée) :
1. `couts` → **liste libre de postes**, car le vocabulaire est propre au domaine (RPA : studio /
   orchestration / unité de robot ; SaaS : par siège / par environnement). Des clés figées
   auraient forcé une traduction approximative.
2. `forces`/`vigilances` → **3 formes acceptées** (texte simple, `{texte,fiabilite}`,
   `{titre,description}`), au lieu d'imposer la forme courte des benchmarks de scoring.
3. `couverture` → **cellule avec commentaire** (`{valeur, commentaire}`), découvert en auditant
   `agrica-benchmark` : ses **23 axes d'arbitrage** (échelle *Fort / Moyen / Limité*) portent un
   commentaire par cellule. Une valeur nue aurait jeté la justification de chaque note.

### Ce que l'audit d'`agrica-benchmark` a aussi appris
La couche 2 existe dans **les deux** instances de scoring, avec des **échelles différentes** —
agrica : `Fort / Moyen / Limité` sur 23 axes · carnet-ordre : `natif / paramétrage / spécifique / non`
sur 10 domaines. `couche2.echelleCouverture` étant déclarative, le contrat absorbe les deux. ✅
(Le template disait « agrica : 8 critères » — c'était incomplet : **8 critères de radar + 23 axes d'arbitrage**.)

---

## 3. PROMPT DE REMPLISSAGE GÉNÉRIQUE (le prompt réutilisable)

> À coller quand le moteur existe. Son seul job : produire/compléter `config.js` à partir de sources.
> Remplacer les `<…>`.

```
Tu remplis la configuration d'une app de benchmark ABSIS. Le moteur générique existe déjà :
tu ne dois produire QUE le fichier data/config.js, conforme au schéma window.BENCHMARK
(cf. TEMPLATE_BENCHMARK_ABSIS.md — respecte exactement les noms de champs).

=== SUJET ===
Titre : <titre du benchmark>
Contexte (ANONYMISÉ, jamais de nom de client ni de chiffre confidentiel) : <contexte générique>
GENRE : <scoring | fiches | mixte>   ← à trancher EN PREMIER, cf. §1bis. Ne jamais convertir
        un genre en l'autre par commodité (inventer des notes / jeter de l'information).
Axe de regroupement des outils : <ex. positionnement fonctionnel | famille d'outil>
Pages : <accueil, outils, comparatif, arbitrage, recommandation>

=== SI GENRE = SCORING — ÉCHELLE ===
Notes sur <5|10> · Pondération : <oui/non> · Affichage : <note|etoiles>

=== SI GENRE = FICHES — RUBRIQUES ATTENDUES ===
<parmi : contexte d'usage (situation/problème/solution) · roadmap de déploiement · coûts ·
 formations · intégrations · écosystème · alternatives · axes d'appréciation (étoiles)>

=== CRITÈRES (couche 1) ===
<liste : id · label · poids · description>

=== COUCHE 2 (matrice de détail) — <ACTIVE|DÉSACTIVÉE> ===
<si active : titre, unité, échelle de couverture, liste des items avec volume>

=== TYPES D'OUTILS ===
<ex. "tete-affiche" (chiffrés, notés) et "alternative" (qualitatif, non notés)>

=== OUTILS ===
<pour chacun : nom, éditeur, type, groupe, et où trouver ses données>

=== SOURCES À EXPLOITER ===
<chemins de fichiers (xlsx/docx/pptx) et/ou sites éditeurs à naviguer>

=== RÈGLES ABSOLUES ===
1. NE RIEN INVENTER. Toute note/donnée fonctionnelle vient d'une source primaire citée dans
   `sources`. Si l'info manque : null + fiabilite "confirmer" — jamais une valeur plausible.
2. ANONYMISATION : aucun nom de client, aucune volumétrie/montant confidentiel.
3. FIABILITÉ : renseigner `fiabilite` sur chaque outil (et sur chaque vigilance sensible).
   Dater les données anciennes ; distinguer source primaire / info éditeur actuelle / à confirmer.
4. POPULATIONS HÉTÉROGÈNES : ne jamais chiffrer un outil qui n'a pas été évalué sur dossier.
5. Vérifier l'actualité des éditeurs (rachats, changements de marque) et remplir `evolutions`
   + `alerte` si un changement affecte la comparaison.
6. Signaler explicitement ce qui n'a pas pu être vérifié (ne pas combler les trous).

Sortie attendue : data/config.js commenté, valide, prêt à charger. Termine par un récapitulatif
de ce qui est sourcé (🟢/🔵) vs à confirmer (🟠).
```

---

## 4. Ce qui reste à faire (après livraison de carnet-ordre)
1. Factoriser `js/app.js` en moteur lisant `window.BENCHMARK` (radar N axes, échelle variable,
   **deux genres**, dégradations).
2. Rétro-porter les **3** instances sur ce contrat → validation sur cas réels des deux genres.
3. Extraire un starter (`benchmark-template/`) : moteur + `config.example.js` (un par genre) + ce prompt.
4. ~~Vérifier sur un 3ᵉ cas sans scoring chiffré~~ → **fait (juillet 2026)** : le test de `/benchmark`
   sur `absis-benchmark` a révélé le genre « fiches » et les champs narratifs manquants
   (`contexte` situation/problème/solution, `roadmap`, `couts`, `formations`, `integrations`,
   `ecosysteme`, `alternatives`, axes d'appréciation en étoiles) → contrat étendu en conséquence.

### Journal des révisions du contrat
- **v1 (juillet 2026)** — amorce depuis 2 instances de scoring (agrica, carnet-ordre).
- **v2 (juillet 2026)** — ajout du **genre** (`scoring` / `fiches` / `mixte`), du bloc `fiche`
  narratif, des axes de `notation` libres, et de `meta.groupes`. Déclenché par le test de la skill
  sur `absis-benchmark`, qui ne rentrait pas dans v1 sans perte d'information.
