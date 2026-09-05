/* ================================================================================
   data/config.js — SOURCE DE VÉRITÉ UNIQUE  (contrat window.BENCHMARK v2)
   Instance : « Outils de test logiciel » — démonstration du template ABSIS.

   ⚠️ FIABILITÉ : notes et contenus REPRIS de l'app absis-benchmark (support mai 2026),
   non revérifiés. Aucune donnée inventée : forces, vigilances, contexte d'usage,
   feuille de route, coûts et alternatives sont extraits tels quels de la source.
   Généré par scratchpad/gen_config.py — ne pas éditer à la main.
================================================================================ */

window.BENCHMARK = {
  "meta": {
    "titre": "Quel outil pour tester ?",
    "sousTitre": "Benchmark de 8 outils de test logiciel — 5 familles, une lecture par contexte.",
    "accroche1": "Quel outil pour",
    "accrocheMot": "tester",
    "contexte": "Il n'y a pas d'outil meilleur qu'un autre : il y a un outil qui correspond à votre contexte. Une organisation mature combine 3 à 4 outils complémentaires.",
    "genre": "scoring",
    "axeRegroupement": "famille d'outil",
    "palette": "absis",
    "pages": [
      "accueil",
      "outils",
      "analyse",
      "arbitrage"
    ],
    "brief": {
      "finalite": "Montrer qu'il n'existe pas d'outil de test universel, et donner une grille de choix par contexte.",
      "public": "DSI et directions qualité (clients et prospects)",
      "demarche": "Étude comparative ABSIS Conseil, support d'avant-vente.",
      "date": "2026-05",
      "diffusion": "interne"
    },
    "contraintes": [],
    "horsPerimetre": [
      {
        "nom": "Cypress",
        "raison": "Très orienté frontend ; annoncé comme candidat pour une v2 du benchmark."
      },
      {
        "nom": "Playwright",
        "raison": "Plus moderne que Selenium sur les SPA, mais hors périmètre de la V5."
      },
      {
        "nom": "Tosca",
        "raison": "Positionnement grand compte, non retenu pour le panel initial."
      },
      {
        "nom": "JMeter",
        "raison": "Spécialisé tests de charge : hors du périmètre fonctionnel comparé."
      }
    ],
    "methodologie": {
      "evaluateur": "ABSIS Conseil",
      "regime": "analyse",
      "date": "2026-05",
      "grille": "1 = absent ou marginal · 3 = couvert avec réserves · 5 = couvert nativement et éprouvé.",
      "limites": "Notes issues du support ABSIS de mai 2026, établies par analyse des sources publiques (documentation éditeurs, communauté, retours de mission). Elles n'ont pas été validées par les éditeurs ni revérifiées depuis — à reconfirmer en démonstration avant toute décision."
    },
    "groupes": [
      {
        "id": "web-ui",
        "label": "Automatisation Web / UI",
        "couleur": "#1B4F8A",
        "bg": "#E8F0F8"
      },
      {
        "id": "processus",
        "label": "Automatisation des processus",
        "couleur": "#2BA8C9",
        "bg": "#E4F4F9"
      },
      {
        "id": "api",
        "label": "Tests d'API",
        "couleur": "#B8860B",
        "bg": "#FBF3DE"
      },
      {
        "id": "unitaires",
        "label": "Tests unitaires & intégration",
        "couleur": "#D9883C",
        "bg": "#FBF0E2"
      },
      {
        "id": "ia",
        "label": "Assistant IA de développement",
        "couleur": "#C2185B",
        "bg": "#FCE7EF"
      }
    ],
    "ambitions": [
      {
        "titre": "Sécuriser le socle",
        "texte": "Commencer par les tests unitaires et d'API : le socle qui protège le quotidien, sans projet lourd ni licence.",
        "outils": [
          "junit",
          "postman"
        ]
      },
      {
        "titre": "Automatiser l'interface",
        "texte": "Industrialiser les parcours utilisateurs, avec ou sans profils de développement selon la maturité de l'équipe.",
        "outils": [
          "selenium",
          "katalon"
        ]
      },
      {
        "titre": "Accélérer avec l'IA",
        "texte": "Faire produire et cadrer les tests par l'IA, et automatiser ce que les API ne permettent pas d'atteindre.",
        "outils": [
          "copilot",
          "cursor",
          "gemini",
          "uipath"
        ]
      }
    ]
  },
  "finalistes": {
    "titre": "Les trois outils retenus",
    "chapeau": "Sur les huit évalués, trois suffisent à couvrir l'essentiel — un par palier. Ce n'est pas le podium des moyennes : c'est la pile que nous recommanderions de construire, dans cet ordre.",
    "items": [
      {
        "outil": "postman",
        "role": "Le socle",
        "pourquoi": "La porte d'entrée : compétence déjà présente chez les développeurs, adoption en un à deux jours, aucun projet lourd à lancer.",
        "reserve": "Ne couvre pas l'interface utilisateur : à compléter dès le palier 2."
      },
      {
        "outil": "katalon",
        "role": "L'interface",
        "pourquoi": "Rend l'automatisation Web accessible sans profils de développement — un testeur fonctionnel devient autonome en cinq jours.",
        "reserve": "Si vous avez une équipe QA-dev structurée, Selenium reste préférable (zéro licence, aucune dépendance éditeur)."
      },
      {
        "outil": "copilot",
        "role": "L'accélérateur",
        "pourquoi": "Transverse aux deux paliers précédents : génère et complète les tests directement dans l'IDE, avec une adoption spontanée par les équipes.",
        "reserve": "Assiste, ne décide pas : sans revue humaine, la couverture reste illusoire."
      }
    ]
  },
  "radarColors": {
    "postman": "#EA580C",
    "junit": "#16A34A",
    "copilot": "#2563EB",
    "katalon": "#7C3AED",
    "selenium": "#0891B2",
    "uipath": "#DB2777",
    "gemini": "#A16207",
    "cursor": "#475569"
  },
  "echelle": {
    "max": 5,
    "ponderee": false,
    "affichage": "etoiles"
  },
  "criteres": [
    {
      "id": "facilite",
      "label": "Facilité de prise en main",
      "court": "Facilité",
      "desc": "Rapidité d'appropriation par l'équipe, avec ou sans compétences de développement."
    },
    {
      "id": "sourcing",
      "label": "Disponibilité des profils",
      "court": "Sourcing",
      "desc": "Facilité à recruter ou former des profils maîtrisant l'outil sur le marché français."
    },
    {
      "id": "reconnaissance",
      "label": "Reconnaissance & pérennité",
      "court": "Pérennité",
      "desc": "Solidité de l'éditeur ou de la communauté, risque de pari technologique."
    }
  ],
  "couche2": {
    "actif": false
  },
  "fiabilite": {
    "actif": true,
    "badges": [
      {
        "id": "ao",
        "label": "Donnée vérifiée",
        "couleur": "vert",
        "desc": "Source primaire datée."
      },
      {
        "id": "editeur",
        "label": "Info éditeur",
        "couleur": "cyan",
        "desc": "Site éditeur navigué."
      },
      {
        "id": "confirmer",
        "label": "À confirmer",
        "couleur": "orange",
        "desc": "Reprise non revérifiée."
      },
      {
        "id": "terrain",
        "label": "Retour terrain",
        "couleur": "gris",
        "desc": "Expérience d'implémentation, anonymisée."
      },
      {
        "id": "analyse",
        "label": "Évaluation analytique",
        "couleur": "violet",
        "desc": "Note établie par analyse des sources publiques — ni source primaire, ni déclaratif éditeur."
      }
    ]
  },
  "types": [
    {
      "id": "standard",
      "label": "Outils évalués",
      "note": true,
      "style": "plein"
    }
  ],
  "outils": [
    {
      "id": "selenium",
      "nom": "Selenium",
      "type": "standard",
      "groupe": "web-ui",
      "editeur": "Open source (Apache 2.0)",
      "site": "https://www.selenium.dev",
      "positionnement": "Le standard universel de l'automatisation Web.",
      "fiabilite": "confirmer",
      "notes": {
        "facilite": 2.0,
        "sourcing": 5,
        "reconnaissance": 5
      },
      "commentaires": {
        "sourcing": "Profils parmi les plus abondants du marché. Tous les développeurs Java/Python en ont fait. TJM moyen : 500-650 € selon expérience.",
        "reconnaissance": "Projet Apache Software Foundation, gouvernance ouverte, soutenu par Sauce Labs, BrowserStack, Mozilla. Pérennité garantie."
      },
      "forces": [
        {
          "titre": "Présent dans tous les contextes",
          "description": "20 ans d'existence, communauté mondiale, ressources infinies. Aucun risque de pari technologique."
        },
        {
          "titre": "Liberté totale d'usage",
          "description": "Multi-langages, multi-navigateurs, intégrable à tout. Aucun éditeur ne peut vous bloquer demain."
        }
      ],
      "vigilances": [
        {
          "titre": "Réservé aux profils techniques",
          "description": "Selenium c'est du code. Sans développeurs dédiés, le projet n'avance pas."
        },
        {
          "titre": "Maintenance lourde",
          "description": "Un site qui évolue beaucoup = des tests qui cassent. Sans discipline on accumule de la dette technique."
        }
      ],
      "fiche": {
        "tagline": "Gratuit, flexible, présent partout. Mais réservé aux équipes techniques.",
        "licence": "Gratuite",
        "annee": "2004",
        "adoptePar": "70% du marché Web",
        "marche": "Standard de facto depuis 2004. Présent dans 70% des projets d'automatisation Web dans le monde. Aucune alternative ne menace sérieusement sa position dans l'enterprise.",
        "ecosysteme": "Selenium WebDriver (cœur), Selenium Grid (exécution parallèle), Selenium IDE (enregistreur basique). Wrappers riches : Selenide, Watir, Nightwatch.",
        "integrations": "Tous outils CI/CD (Jenkins, GitLab CI, Azure DevOps, GitHub Actions). Tous frameworks de test. Cloud testing (Sauce Labs, BrowserStack, LambdaTest).",
        "formations": "Pas de programme officiel. Très nombreuses ressources gratuites (documentation, Udemy, OpenClassrooms). Formation interne 5-10 jours pour atteindre l'autonomie.",
        "contexte": {
          "situation": "Grande DSI avec un pôle QA-dev structuré",
          "probleme": "L'équipe veut éviter la dépendance à un éditeur — pas question d'être bloquée demain par un changement de tarif ou de stratégie commerciale.",
          "solution": "Selenium répond parfaitement : zéro coût de licence, intégration native à Jenkins ou GitLab, choix du langage par l'équipe. On capitalise sur les compétences déjà là."
        },
        "roadmap": [
          {
            "phase": "S1-S2",
            "titre": "Cadrage",
            "description": "Choix du langage, sélection du framework, POC sur 5 cas."
          },
          {
            "phase": "S3-S8",
            "titre": "Industrialisation",
            "description": "Page Object Model, intégration CI/CD, mise en place du reporting."
          },
          {
            "phase": "S9-S20",
            "titre": "Montée en charge",
            "description": "Extension à 100-200 tests, parallélisation, exécution sur grille."
          },
          {
            "phase": "S21+",
            "titre": "Maintenance",
            "description": "Discipline de revue, refactoring continu, gouvernance des cas."
          }
        ],
        "couts": {
          "postes": [
            {
              "poste": "Studio / licence",
              "montant": "0 € — open source"
            },
            {
              "poste": "Orchestration",
              "montant": "0 € — Selenium Grid auto-hébergé"
            },
            {
              "poste": "Usage / unité",
              "montant": "≈ 30-50 € / mois (BrowserStack si cloud)"
            }
          ],
          "note": "Coût licence nul mais coût caché en compétences. Prévoir 80-100 jours de prestation initiale + 30% de la charge dev en maintenance permanente."
        },
        "alternatives": [
          {
            "nom": "Playwright",
            "note": "Plus moderne, meilleur sur les SPA, monte vite"
          },
          {
            "nom": "Cypress",
            "note": "Très orienté frontend, plus simple à prendre en main"
          },
          {
            "nom": "Katalon",
            "note": "Couche graphique sur Selenium pour les non-devs"
          }
        ]
      }
    },
    {
      "id": "katalon",
      "nom": "Katalon",
      "type": "standard",
      "groupe": "web-ui",
      "editeur": "Katalon, Inc.",
      "site": "https://katalon.com",
      "positionnement": "L'automatisation sans ligne de code.",
      "fiabilite": "confirmer",
      "notes": {
        "facilite": 4.0,
        "sourcing": 3,
        "reconnaissance": 4
      },
      "commentaires": {
        "sourcing": "Profils dédiés Katalon moins nombreux que Selenium. Mais formation rapide : un testeur fonctionnel devient autonome en 5 jours. TJM moyen : 450-550 €.",
        "reconnaissance": "Éditeur fondé en 2016, levée de fonds significative, croissance soutenue. Pas encore au niveau Fortune 500."
      },
      "forces": [
        {
          "titre": "Productivité immédiate",
          "description": "Enregistrement visuel, gestion native des cas. Une équipe produit en 2 semaines ce qui prend 2 mois en Selenium."
        },
        {
          "titre": "Couverture multi-périmètre",
          "description": "Web, mobile, API, applications de bureau : un seul outil pour 4 types de tests."
        }
      ],
      "vigilances": [
        {
          "titre": "Dépendance à l'éditeur",
          "description": "Tout l'investissement repose sur Katalon. Si l'éditeur change sa politique tarifaire, la migration sera coûteuse."
        },
        {
          "titre": "Plafond de personnalisation",
          "description": "Pour les cas vraiment complexes, on retombe sur Selenium en sous-jacent — et on perd l'avantage sans-code."
        }
      ],
      "fiche": {
        "tagline": "Quand les tests deviennent accessibles à toute l'équipe — pas juste aux développeurs.",
        "licence": "Freemium (Free / Premium / Ultimate)",
        "annee": "2016",
        "adoptePar": "100 000+ utilisateurs actifs",
        "marche": "Très forte croissance ces 5 dernières années, particulièrement chez les ETI. Plus de 100 000 utilisateurs actifs. Présent dans le Gartner Magic Quadrant.",
        "ecosysteme": "Katalon Studio (conception), Katalon TestOps (cloud reporting), Katalon Runtime Engine (exécution CI/CD), Katalon TrueTest (module IA).",
        "integrations": "Jira, qTest, TestRail, Slack, Microsoft Teams. Tous CI/CD majeurs. Sous-jacent Selenium + Appium pour Web et mobile.",
        "formations": "Katalon Academy (gratuite, certifications Katalon Tester / Engineer). Formation initiale 3-5 jours pour atteindre l'autonomie.",
        "contexte": {
          "situation": "ETI avec une équipe QA fonctionnelle sans profil dev",
          "probleme": "La DSI veut industrialiser ses tests mais ne peut pas recruter une équipe de développeurs dédiés. Les testeurs actuels viennent du métier.",
          "solution": "Katalon permet à ces profils QA de produire des tests automatisés en quelques semaines via l'enregistreur visuel."
        },
        "roadmap": [
          {
            "phase": "S1-S2",
            "titre": "Cadrage",
            "description": "Évaluation des cas, choix de l'édition, formation 3-5 jours."
          },
          {
            "phase": "S3-S6",
            "titre": "POC",
            "description": "Enregistrement des 20-30 premiers tests, validation du modèle."
          },
          {
            "phase": "S7-S16",
            "titre": "Industrialisation",
            "description": "Extension à 100+ tests, intégration CI/CD, reporting TestOps."
          },
          {
            "phase": "S17+",
            "titre": "Run",
            "description": "Pilotage, ajout de tests mobiles et API."
          }
        ],
        "couts": {
          "postes": [
            {
              "poste": "Studio / licence",
              "montant": "Gratuit (Free) ou ≈ 1 900 $/an (Premium)"
            },
            {
              "poste": "Orchestration",
              "montant": "TestOps : ≈ 1 800 $/an / 5 utilisateurs"
            },
            {
              "poste": "Usage / unité",
              "montant": "Runtime Engine : ≈ 600 $/an / parallel run"
            }
          ],
          "note": "Stack complète pour équipe de 10 : ≈ 25-35 k€/an. Bien inférieur à UiPath."
        },
        "alternatives": [
          {
            "nom": "Selenium + frameworks",
            "note": "Gratuit mais demande des développeurs"
          },
          {
            "nom": "TestComplete (SmartBear)",
            "note": "Concurrent direct, plus orienté desktop"
          },
          {
            "nom": "Tricentis Tosca",
            "note": "Très puissant mais beaucoup plus cher"
          }
        ]
      }
    },
    {
      "id": "uipath",
      "nom": "UiPath",
      "type": "standard",
      "groupe": "processus",
      "editeur": "UiPath (cotée NYSE)",
      "site": "https://www.uipath.com",
      "positionnement": "L'employé virtuel des systèmes anciens.",
      "fiabilite": "confirmer",
      "notes": {
        "facilite": 3.0,
        "sourcing": 4,
        "reconnaissance": 5
      },
      "commentaires": {
        "sourcing": "Marché des consultants UiPath très développé en France. Profils certifiés disponibles via ESN spécialisées et freelances. TJM moyen : 600-800 €.",
        "reconnaissance": "Éditeur côté NYSE depuis 2021, valorisation ~6 Mds $. Adopté par BNP Paribas, AXA, Société Générale, EDF. Pérennité assurée."
      },
      "forces": [
        {
          "titre": "ROI immédiat sur le legacy",
          "description": "Aucun autre outil n'arrive à piloter des écrans MVS, COBOL, ou des ERP de 25 ans. Sur ce périmètre, UiPath n'a pas de concurrent sérieux."
        },
        {
          "titre": "Accessible aux profils métier",
          "description": "Interface glisser-déposer pensée pour des non-développeurs. Une assistante de gestion peut construire un robot, après 2 semaines de formation."
        }
      ],
      "vigilances": [
        {
          "titre": "Coût qui s'envole vite",
          "description": "Studio + Orchestrator + chaque robot. Sur 10 robots non assistés : facilement 150 k€/an de licences."
        },
        {
          "titre": "Fragile aux changements d'UI",
          "description": "Une modification d'écran — même mineure — peut casser le robot. UiPath rayonne là où les interfaces ne bougent presque jamais."
        }
      ],
      "fiche": {
        "tagline": "Quand les applications historiques freinent la transformation, UiPath devient l'outil que personne n'aime payer — mais qui sauve les projets.",
        "licence": "Commerciale (Studio + Orchestrator)",
        "annee": "2005",
        "adoptePar": "BNP, AXA, SG, EDF",
        "marche": "Leader mondial du marché RPA (Magic Quadrant Gartner depuis 5 ans). Plus de 10 000 clients dont la majorité des grands groupes français du CAC 40.",
        "ecosysteme": "UiPath Studio (conception), Orchestrator (gouvernance), AI Center (IA intégrée), Test Suite (module dédié au test logiciel).",
        "integrations": "SAP, Salesforce, Oracle, ServiceNow, Workday, Microsoft 365. APIs REST pour interconnexion avec tout SI moderne.",
        "formations": "UiPath Academy (gratuite, certifications RPA Developer / Solution Architect). Cursus complet 80-120h pour atteindre le niveau autonome.",
        "contexte": {
          "situation": "DSI complexe avec applications COBOL/MVS",
          "probleme": "Les vieux systèmes deviennent intestables manuellement. À chaque évolution, on craint des régressions invisibles — et la transformation digitale ralentit.",
          "solution": "UiPath sécurise les tests sur ces écrans qui ne bougent pas. Plus de roulette russe à chaque mise en production."
        },
        "roadmap": [
          {
            "phase": "S1-S4",
            "titre": "Cadrage",
            "description": "Identifier 2-3 processus critiques. Audit des écrans et des chaînes."
          },
          {
            "phase": "S5-S10",
            "titre": "POC",
            "description": "Premiers robots sur un parcours. Mesure du gain vs manuel."
          },
          {
            "phase": "S11-S20",
            "titre": "Industrialisation",
            "description": "10-15 processus, Orchestrator, formation des équipes."
          },
          {
            "phase": "S21+",
            "titre": "Run",
            "description": "Pilotage, supervision, ajout progressif."
          }
        ],
        "couts": {
          "postes": [
            {
              "poste": "Studio / licence",
              "montant": "≈ 5 000 € / an / développeur"
            },
            {
              "poste": "Orchestration",
              "montant": "≈ 30 000 € / an (cloud)"
            },
            {
              "poste": "Usage / unité",
              "montant": "Robot non assisté : ≈ 8 000 € / an"
            }
          ],
          "note": "Hypothèse 5 développeurs + 10 robots non assistés : ≈ 135 k€/an HT licences seules. Prévoir +30-50% en prestations la première année."
        },
        "alternatives": [
          {
            "nom": "Microsoft Power Automate",
            "note": "Inclus M365, moins puissant sur le legacy lourd"
          },
          {
            "nom": "Robot Framework",
            "note": "Open source, gratuit, accessible aux profils techniques"
          },
          {
            "nom": "Blue Prism",
            "note": "Concurrent direct, plus orienté finance/banque"
          }
        ]
      }
    },
    {
      "id": "postman",
      "nom": "Postman",
      "type": "standard",
      "groupe": "api",
      "editeur": "Postman, Inc.",
      "site": "https://www.postman.com",
      "positionnement": "Le standard incontesté des tests d'API.",
      "fiabilite": "confirmer",
      "notes": {
        "facilite": 4.0,
        "sourcing": 5,
        "reconnaissance": 5
      },
      "commentaires": {
        "sourcing": "Compétence Postman quasi-universelle chez les développeurs backend. Aucune difficulté de sourcing. Formation interne 1-2 jours suffit.",
        "reconnaissance": "Valorisation 5,6 Mds $, partenariats avec AWS, Google Cloud, Microsoft. Aucun signe d'essoufflement."
      },
      "forces": [
        {
          "titre": "Adopté universellement",
          "description": "Plus de 30 millions de développeurs dans le monde. Compétences disponibles partout, intégration native avec tout l'écosystème API."
        },
        {
          "titre": "Couvre tout le cycle de vie API",
          "description": "Pas seulement tester : concevoir, documenter, simuler, monitorer. Une API peut vivre intégralement dans Postman."
        }
      ],
      "vigilances": [
        {
          "titre": "Périmètre API uniquement",
          "description": "Pas d'interface utilisateur, pas de tests bout-en-bout. C'est une pièce du puzzle, pas la solution complète."
        },
        {
          "titre": "Risque de prolifération",
          "description": "Sans gouvernance, on se retrouve avec des centaines de collections obsolètes. Discipline indispensable."
        }
      ],
      "fiche": {
        "tagline": "L'outil qu'on retrouve partout — et c'est mérité. 30 millions de développeurs ne se trompent pas.",
        "licence": "Freemium (Free / Pro / Enterprise)",
        "annee": "2012",
        "adoptePar": "98% du Fortune 500",
        "marche": "Standard de facto, sans concurrent sérieux sur le segment des tests d'API graphiques. Reconnu par Forrester comme leader. Utilisé chez 98% des entreprises du Fortune 500.",
        "ecosysteme": "Postman App (client), Postman Cloud (collaboration), Newman (CLI pour CI/CD), Postman Monitors (surveillance), Postman API Network (catalogue public).",
        "integrations": "Tous CI/CD, GitHub, GitLab, Jenkins. Connecteurs natifs OpenAPI/Swagger. Compatibilité gRPC, GraphQL, WebSocket.",
        "formations": "Postman Academy (gratuite). Certifications API Student, API Expert. Communauté très active avec ressources gratuites pléthoriques.",
        "contexte": {
          "situation": "Architecture moderne avec 50+ API à tester",
          "probleme": "L'entreprise a migré en architecture découplée. Chaque équipe expose ses API, mais personne ne teste les contrats entre services. Résultat : des régressions découvertes tardivement.",
          "solution": "Postman structure les tests d'API par équipe, met en place des monitors automatiques, industrialise via la CI."
        },
        "roadmap": [
          {
            "phase": "S1",
            "titre": "Cadrage",
            "description": "Inventaire des API critiques, choix du plan selon collaborateurs."
          },
          {
            "phase": "S2-S4",
            "titre": "Mise en place",
            "description": "Collections par équipe, environnements dev/test/prod, tests de référence."
          },
          {
            "phase": "S5-S12",
            "titre": "Industrialisation",
            "description": "Intégration CI/CD, monitors automatiques, alerting, documentation publiée."
          },
          {
            "phase": "S13+",
            "titre": "Gouvernance",
            "description": "Revue des collections, partage entre équipes."
          }
        ],
        "couts": {
          "postes": [
            {
              "poste": "Studio / licence",
              "montant": "Gratuit (3 collaborateurs) ou 12 $/mois (Basic)"
            },
            {
              "poste": "Orchestration",
              "montant": "Pro : 29 $/mois/utilisateur"
            },
            {
              "poste": "Usage / unité",
              "montant": "Enterprise : 49 $/mois/utilisateur"
            }
          ],
          "note": "Pour 20 utilisateurs en Pro : ≈ 7 000 $/an. Newman CLI gratuit pour exécution CI/CD."
        },
        "alternatives": [
          {
            "nom": "Insomnia",
            "note": "Open source, plus léger, moins fonctionnel"
          },
          {
            "nom": "Bruno",
            "note": "Newcomer git-native, courbe en hausse"
          },
          {
            "nom": "ReadyAPI (SmartBear)",
            "note": "Plus enterprise, plus cher"
          }
        ]
      }
    },
    {
      "id": "junit",
      "nom": "JUnit",
      "type": "standard",
      "groupe": "unitaires",
      "editeur": "Open source (Eclipse EPL 2.0)",
      "site": "https://junit.org/junit5",
      "positionnement": "Le pilier invisible de la qualité Java.",
      "fiabilite": "confirmer",
      "notes": {
        "facilite": 4.0,
        "sourcing": 5,
        "reconnaissance": 5
      },
      "commentaires": {
        "sourcing": "Tout développeur Java connaît JUnit. C'est même un critère minimum d'embauche. TJM Java avec bonne maîtrise des tests : 600-750 €.",
        "reconnaissance": "Projet Eclipse Foundation. Maintenu activement, communauté immense. Pas de risque de pérennité."
      },
      "forces": [
        {
          "titre": "Prérequis qualité",
          "description": "Indissociable de Java. Un projet Java sans JUnit, c'est un projet sans tests unitaires — et donc sans qualité."
        },
        {
          "titre": "Écosystème mature",
          "description": "Mockito, AssertJ, Testcontainers, Spring Test. Un écosystème complet et industrialisé pour tous les cas d'usage."
        }
      ],
      "vigilances": [
        {
          "titre": "Périmètre limité",
          "description": "Que du Java. Que de l'unitaire (et un peu d'intégration). Aucune couverture interface ni bout-en-bout."
        },
        {
          "titre": "Demande de la discipline",
          "description": "Les développeurs doivent écrire ET maintenir les tests. Sans culture qualité forte, JUnit s'utilise mal — voire pas du tout."
        }
      ],
      "fiche": {
        "tagline": "Le test unitaire n'est pas un choix d'outil. C'est une hygiène.",
        "licence": "Gratuite",
        "annee": "2000",
        "adoptePar": "100% écosystème Java",
        "marche": "Standard incontournable de l'écosystème Java depuis 2000. Aucune alternative sérieuse. JUnit 5 (Jupiter) a relancé l'écosystème avec une architecture modulaire moderne.",
        "ecosysteme": "JUnit 5 (cœur), Mockito (mocking), AssertJ (assertions fluentes), Testcontainers (tests avec dépendances Docker), Spring Test, Cucumber JVM (BDD).",
        "integrations": "Maven, Gradle (natif). Tous IDE Java (IntelliJ, Eclipse, VS Code). Toutes solutions de CI/CD. JaCoCo pour la couverture.",
        "formations": "Documentation officielle excellente. Très nombreuses formations (Baeldung, Udemy). Formation 2-3 jours pour un dev Java déjà solide.",
        "contexte": {
          "situation": "Toute application Java en production",
          "probleme": "L'équipe a un patrimoine Java important avec une couverture de tests faible. Les régressions surviennent à chaque refactoring, et les développeurs ont peur de modifier le code existant.",
          "solution": "Mise en place progressive de JUnit 5 avec son écosystème, intégration de la couverture dans la CI, seuils de qualité bloquants. Le refactoring sécurisé devient possible."
        },
        "roadmap": [
          {
            "phase": "S1",
            "titre": "Cadrage",
            "description": "Audit de la couverture actuelle, identification des composants critiques non couverts."
          },
          {
            "phase": "S2-S8",
            "titre": "Rattrapage",
            "description": "Tests sur les composants critiques en priorité. Formation des équipes."
          },
          {
            "phase": "S9-S16",
            "titre": "Industrialisation",
            "description": "Intégration dans la CI/CD, seuils bloquants progressifs, culture du test-first."
          },
          {
            "phase": "S17+",
            "titre": "Maintien",
            "description": "Discipline : pas de PR sans tests, revue de code centrée qualité."
          }
        ],
        "couts": {
          "postes": [
            {
              "poste": "Studio / licence",
              "montant": "0 € — open source"
            },
            {
              "poste": "Orchestration",
              "montant": "0 € — intégré à Maven/Gradle"
            },
            {
              "poste": "Usage / unité",
              "montant": "—"
            }
          ],
          "note": "Aucun coût d'outillage. Le coût réel : 20-30% du temps de développement consacré aux tests (industry standard)."
        },
        "alternatives": [
          {
            "nom": "TestNG",
            "note": "Alternative historique, moins utilisée aujourd'hui"
          },
          {
            "nom": "Spock (Groovy)",
            "note": "Plus expressif, pour équipes ouvertes"
          },
          {
            "nom": "Kotest",
            "note": "Si vous passez à Kotlin"
          }
        ]
      }
    },
    {
      "id": "copilot",
      "nom": "GitHub Copilot",
      "type": "standard",
      "groupe": "ia",
      "editeur": "GitHub / Microsoft (modèles OpenAI)",
      "site": "https://github.com/features/copilot",
      "positionnement": "L'IA qui écrit du code — y compris les tests.",
      "fiabilite": "confirmer",
      "notes": {
        "facilite": 5.0,
        "sourcing": 5,
        "reconnaissance": 5
      },
      "commentaires": {
        "sourcing": "Pas un sujet de sourcing : c'est l'outil que les développeurs adoptent eux-mêmes. Les nouveaux développeurs arrivent souvent en l'ayant déjà utilisé.",
        "reconnaissance": "Adossé à Microsoft. Modèles OpenAI sous-jacents. Adoption massive dans le Fortune 500. Pérennité hors de doute."
      },
      "forces": [
        {
          "titre": "Productivité mesurable",
          "description": "Études GitHub : 55% de tests unitaires écrits plus vite, 87% des développeurs déclarent un gain. Productivité réelle, pas un effet de mode."
        },
        {
          "titre": "Intégration native",
          "description": "VS Code, Visual Studio, JetBrains : dans l'éditeur des développeurs sans effort. Adoption fluide, pas de changement d'habitude."
        }
      ],
      "vigilances": [
        {
          "titre": "Vérification humaine indispensable",
          "description": "L'IA peut générer du code qui semble juste mais qui ne l'est pas. Sans relecture systématique, on introduit des bugs subtils."
        },
        {
          "titre": "Question de confidentialité",
          "description": "Selon le plan, le code est envoyé sur les serveurs OpenAI. Inacceptable pour certains secteurs sans plan Enterprise."
        }
      ],
      "fiche": {
        "tagline": "Le copilote du développeur, pas le pilote. 55% de tests unitaires écrits plus vite — étude GitHub.",
        "licence": "Commerciale (Individual / Business / Enterprise)",
        "annee": "2021",
        "adoptePar": "1,3 M+ abonnés payants",
        "marche": "Leader incontesté des assistants IA dans l'IDE depuis 2021. Plus de 1,3 million d'abonnés payants. Microsoft réinvestit massivement.",
        "ecosysteme": "Copilot Chat (conversation), Copilot for PRs (revue), Copilot Workspace (agent autonome), Copilot Extensions (intégrations tierces).",
        "integrations": "VS Code, Visual Studio, JetBrains IDEs, Vim/Neovim, Xcode. GitHub natif : PR, Issues, code search.",
        "formations": "Documentation GitHub, parcours GitHub Skills. Pas de certification officielle mais nombreuses ressources tierces. Prise en main 1-2h pour les bases.",
        "contexte": {
          "situation": "Équipe dev déjà sur GitHub, fort backlog de tests",
          "probleme": "L'équipe sait qu'elle doit augmenter sa couverture de tests, mais écrire des tests c'est ennuyeux. Le backlog grandit, la couverture stagne, la dette s'accumule.",
          "solution": "Copilot génère les tests en quelques secondes à partir du code source. Le développeur passe de la production à la validation : il relit, ajuste, valide."
        },
        "roadmap": [
          {
            "phase": "S1",
            "titre": "Pilote",
            "description": "Activation pour 5-10 développeurs volontaires, formation 2h sur le prompting."
          },
          {
            "phase": "S2-S6",
            "titre": "Mesure",
            "description": "Collecte de métriques (tests/PR, satisfaction), comparaison avec équipes témoins."
          },
          {
            "phase": "S7-S12",
            "titre": "Généralisation",
            "description": "Déploiement à toute l'équipe, charte d'usage IA, intégration dans les revues."
          },
          {
            "phase": "S13+",
            "titre": "Maturité",
            "description": "Pilotage des usages, formation continue, exploration des modes avancés."
          }
        ],
        "couts": {
          "postes": [
            {
              "poste": "Studio / licence",
              "montant": "Individual : 10 $/mois/dev"
            },
            {
              "poste": "Orchestration",
              "montant": "Business : 19 $/mois/dev"
            },
            {
              "poste": "Usage / unité",
              "montant": "Enterprise : 39 $/mois/dev"
            }
          ],
          "note": "Pour 50 dev en Business : ≈ 11 400 $/an. ROI rapide si on table sur 10-15% de productivité gagnée."
        },
        "alternatives": [
          {
            "nom": "Cursor",
            "note": "IDE complet IA-first, plus radical"
          },
          {
            "nom": "Tabnine",
            "note": "Alternative pro avec modèles auto-hébergeables"
          },
          {
            "nom": "Codeium",
            "note": "Free pour usage individuel, monte vite"
          }
        ]
      }
    },
    {
      "id": "gemini",
      "nom": "Gemini",
      "type": "standard",
      "groupe": "ia",
      "editeur": "Google DeepMind",
      "site": "https://gemini.google.com",
      "positionnement": "L'IA qui conçoit avant d'écrire.",
      "fiabilite": "confirmer",
      "notes": {
        "facilite": 5.0,
        "sourcing": 4,
        "reconnaissance": 4
      },
      "commentaires": {
        "sourcing": "Pas un sujet de sourcing à proprement parler. C'est un outil grand public. Profils prompt engineer encore rares.",
        "reconnaissance": "Adossé à Google, mais en retard sur OpenAI sur certains benchmarks dev. Position consolidée chez les clients Google Cloud."
      },
      "forces": [
        {
          "titre": "Excellence en conception",
          "description": "Très bon pour générer des plans de tests, des cas limites, des jeux de données. Plus utile en amont qu'en exécution."
        },
        {
          "titre": "Écosystème Google",
          "description": "Intégration native avec Workspace. Précieux pour le cadrage avec le métier : transformer une spec en plan de test."
        }
      ],
      "vigilances": [
        {
          "titre": "Pas un outil de test à part entière",
          "description": "Aide à concevoir, pas à exécuter. Il faut le coupler à un Copilot ou un Cursor pour avoir une chaîne complète."
        },
        {
          "titre": "Sorties parfois génériques",
          "description": "Sans formulation précise, on obtient du conseil de surface. La qualité dépend fortement du contexte qu'on lui donne."
        }
      ],
      "fiche": {
        "tagline": "L'assistant qui pense avec vous, en amont du code. Plus utile pour cadrer que pour exécuter.",
        "licence": "Freemium (Free / Workspace / Code Assist)",
        "annee": "2023",
        "adoptePar": "Écosystème Google",
        "marche": "Réponse de Google à OpenAI/Microsoft. Croissance rapide depuis 2023. Adoption plus forte chez les utilisateurs Google Workspace que dans le monde du dev pur.",
        "ecosysteme": "Gemini Chat (grand public), Gemini Code Assist (équivalent Copilot dans l'IDE), Gemini in Workspace (Docs, Sheets, Gmail).",
        "integrations": "VS Code, JetBrains (via Code Assist). Native Google Workspace. APIs disponibles pour intégration custom.",
        "formations": "Google Cloud Skills Boost, formations Workspace. Communauté grandissante mais moins structurée que GitHub Skills.",
        "contexte": {
          "situation": "Démarrage d'un projet : passer des specs aux cas de test",
          "probleme": "Le chef de projet a des specs fonctionnelles en français. Il doit les traduire en cas de test concrets, identifier les cas particuliers. C'est long et l'exhaustivité n'est jamais garantie.",
          "solution": "Gemini transforme une spec en plan de test structuré en quelques minutes. Il propose les cas nominaux, les cas limites, les jeux de données. On gagne 60-70% de temps en phase de conception."
        },
        "roadmap": [
          {
            "phase": "S1",
            "titre": "Sensibilisation",
            "description": "Atelier IA pour la conception de tests avec les chefs de projet et QA."
          },
          {
            "phase": "S2-S4",
            "titre": "Pilote",
            "description": "Utilisation sur 2-3 projets en cours, comparaison avec méthode traditionnelle."
          },
          {
            "phase": "S5-S8",
            "titre": "Templates",
            "description": "Bibliothèque de prompts métier, intégration dans le processus standard."
          },
          {
            "phase": "S9+",
            "titre": "Run",
            "description": "Usage continu, croisement avec Copilot pour cycle complet."
          }
        ],
        "couts": {
          "postes": [
            {
              "poste": "Studio / licence",
              "montant": "Gratuit (limité) ou 20 €/mois (Gemini Advanced)"
            },
            {
              "poste": "Orchestration",
              "montant": "Code Assist : 19 $/mois/dev"
            },
            {
              "poste": "Usage / unité",
              "montant": "Workspace : 22 €/mois/utilisateur"
            }
          ],
          "note": "Stratégie tarifaire similaire à Copilot. Gratuit pour usage individuel léger."
        },
        "alternatives": [
          {
            "nom": "ChatGPT (OpenAI)",
            "note": "Plus polyvalent, écosystème plus mature"
          },
          {
            "nom": "Claude (Anthropic)",
            "note": "Excellent sur le raisonnement long et le code"
          },
          {
            "nom": "Mistral Le Chat",
            "note": "Acteur français, intéressant pour souveraineté"
          }
        ]
      }
    },
    {
      "id": "cursor",
      "nom": "Cursor",
      "type": "standard",
      "groupe": "ia",
      "editeur": "Anysphere (USA)",
      "site": "https://www.cursor.com",
      "positionnement": "L'éditeur pensé pour l'âge de l'IA.",
      "fiabilite": "confirmer",
      "notes": {
        "facilite": 4.0,
        "sourcing": 3,
        "reconnaissance": 3
      },
      "commentaires": {
        "sourcing": "Pas un sujet de sourcing direct. Profil développeur efficace avec IA encore en émergence. Différenciation forte sur les CV en 2026.",
        "reconnaissance": "Très bonne notoriété dans la tech, encore faible dans les grandes DSI traditionnelles. Risque de pari technologique pour les structures conservatrices."
      },
      "forces": [
        {
          "titre": "Productivité radicale",
          "description": "L'agent multi-fichiers peut refactorer une suite de tests entière en une instruction. Niveau supérieur à Copilot sur les tâches complexes."
        },
        {
          "titre": "Adopté par les meilleurs",
          "description": "Largement utilisé chez les top startups tech. Signal fort sur l'avenir du développement assisté par IA."
        }
      ],
      "vigilances": [
        {
          "titre": "Maturité enterprise limitée",
          "description": "Produit jeune (lancé 2023), évolutions rapides, peu de certifications conformité. Encore éviter dans les DSI réglementées."
        },
        {
          "titre": "Confidentialité à arbitrer",
          "description": "Code envoyé aux modèles IA. Mode Privacy disponible mais limite certaines fonctions. Vigilance sur les secteurs sensibles."
        }
      ],
      "fiche": {
        "tagline": "Quand l'IA ne suggère plus du code — elle réécrit votre projet entier en une instruction.",
        "licence": "Freemium (Hobby / Pro / Business)",
        "annee": "2023",
        "adoptePar": "Top startups tech (OpenAI, Shopify, Perplexity)",
        "marche": "Croissance fulgurante depuis 2023. Valorisation à 2,5 Mds $ en 2024. Adoption massive chez les top startups tech.",
        "ecosysteme": "Cursor IDE (fork de VS Code), Composer (édition multi-fichiers), Agent mode, Tab autocomplétion avancée, Cursor Rules (configuration projet).",
        "integrations": "Tous langages (basé VS Code). Modèles IA multiples (Claude, GPT, leur propre modèle). Compatible avec extensions VS Code.",
        "formations": "Documentation officielle, communauté très active sur Discord et YouTube. Pas de programme de certification. Prise en main 1-2h pour qui connaît VS Code.",
        "contexte": {
          "situation": "Scale-up tech qui doit accélérer son time-to-market",
          "probleme": "L'équipe est petite, le backlog gigantesque. Recruter des développeurs prend 6 mois, et chaque ingénieur doit produire plus. Les tests sont souvent sacrifiés faute de temps.",
          "solution": "Cursor permet à 5 développeurs de produire ce que 8 produisaient avant. L'agent génère, refactore et teste en parallèle. La vélocité est mécaniquement augmentée de 30-50%."
        },
        "roadmap": [
          {
            "phase": "S1",
            "titre": "Test petite équipe",
            "description": "5 développeurs volontaires en Pro, formation 2h, premier cas d'usage : refactor d'une suite de tests."
          },
          {
            "phase": "S2-S6",
            "titre": "Mesure",
            "description": "Collecte des métriques de productivité, retours d'expérience."
          },
          {
            "phase": "S7-S12",
            "titre": "Déploiement large",
            "description": "Extension à l'équipe complète si concluant, charte d'usage IA."
          },
          {
            "phase": "S13+",
            "titre": "Run",
            "description": "Pilotage continu, formation sur modes avancés, benchmarking vs Copilot."
          }
        ],
        "couts": {
          "postes": [
            {
              "poste": "Studio / licence",
              "montant": "Hobby : gratuit (limité)"
            },
            {
              "poste": "Orchestration",
              "montant": "Pro : 20 $/mois/dev"
            },
            {
              "poste": "Usage / unité",
              "montant": "Business : 40 $/mois/dev"
            }
          ],
          "note": "Pour 30 développeurs en Pro : ≈ 7 200 $/an. Peut être cumulé avec Copilot."
        },
        "alternatives": [
          {
            "nom": "GitHub Copilot",
            "note": "Plus enterprise, moins radical sur l'IA"
          },
          {
            "nom": "Windsurf (Codeium)",
            "note": "Alternative récente, équivalent fonctionnel"
          },
          {
            "nom": "Zed",
            "note": "Encore plus expérimental, vraiment pour tech-first"
          }
        ]
      }
    }
  ],
  "arbitrage": {
    "synthese": {
      "titre": "Combiner, plutôt que choisir",
      "texte": "Ces lignes ne s'excluent pas. Une organisation mature en fait fonctionner trois ou quatre en parallèle — un outil par niveau de test, plus un assistant IA. La question n'est pas « lequel », mais « dans quel ordre »."
    },
    "scenarios": [
      {
        "besoin": "Tests unitaires sur un socle Java",
        "outil": "junit",
        "pourquoi": "Standard incontournable, gratuit, aucune alternative sérieuse."
      },
      {
        "besoin": "Tests d'API / microservices",
        "outil": "postman",
        "pourquoi": "Standard de facto, compétence déjà présente chez les développeurs backend."
      },
      {
        "besoin": "Automatisation Web avec équipe technique",
        "outil": "selenium",
        "pourquoi": "Zéro licence, liberté totale, aucun risque de dépendance éditeur."
      },
      {
        "besoin": "Automatisation Web sans profils dev",
        "outil": "katalon",
        "pourquoi": "Approche low-code : un testeur fonctionnel devient autonome en 5 jours."
      },
      {
        "besoin": "Applications legacy sans API",
        "outil": "uipath",
        "pourquoi": "Pilotage par l'interface, seul moyen d'automatiser un legacy fermé."
      },
      {
        "besoin": "Accélérer l'écriture de tests",
        "outil": "copilot",
        "pourquoi": "Génération assistée directement dans l'IDE, adoption spontanée."
      },
      {
        "besoin": "Cadrer une stratégie de recette",
        "outil": "gemini",
        "pourquoi": "Plus pertinent en amont (conception, structuration) qu'en exécution."
      },
      {
        "besoin": "Refonte rapide sur un projet récent",
        "outil": "cursor",
        "pourquoi": "Édition multi-fichiers et mode agent, très efficace sur un code maîtrisé."
      }
    ]
  },
  "recommandation": {
    "avis": "Il n'y a pas d'outil meilleur qu'un autre : il y a un outil qui correspond à votre contexte. Une organisation mature combine 3 à 4 outils complémentaires — un pour les API, un pour l'interface, un pour le code, un assistant IA.",
    "nuances": [
      "Les notes de cette instance sont reprises d'un support de mai 2026 : à revérifier avant tout usage client.",
      "Le marché des assistants IA évolue trop vite pour qu'une note de pérennité reste valable plus de quelques mois.",
      "Un outil très simple (Katalon, Copilot) ne compense jamais l'absence de discipline de test."
    ],
    "aVerifier": [
      "Tarifs et conditions de licence à jour auprès des éditeurs",
      "Compatibilité avec la chaîne CI/CD existante",
      "Disponibilité réelle des profils sur le bassin d'emploi concerné"
    ],
    "vigilancesTransverses": [
      {
        "titre": "L'outil ne résout pas l'organisation",
        "texte": "Aucun outil ne compense un périmètre de recette flou ou l'absence de responsable qualité. Le choix d'outil vient après le cadrage, jamais avant."
      },
      {
        "titre": "Prévoir la maintenance dès le départ",
        "texte": "Des tests automatisés non maintenus deviennent une dette : compter environ 30 % de la charge initiale en maintenance permanente."
      },
      {
        "titre": "Données éditeurs à revalider",
        "texte": "Tarifs et roadmaps produits évoluent vite, surtout sur les assistants IA. Toute donnée de ce benchmark doit être reconfirmée en démonstration."
      }
    ]
  }
};
