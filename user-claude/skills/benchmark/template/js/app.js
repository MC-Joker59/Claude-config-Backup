/* ===========================================================================
   app.js — MOTEUR GÉNÉRIQUE du template benchmark ABSIS
   Tout est lu dans window.BENCHMARK (data/config.js) : nombre d'outils,
   de critères, échelle, genre. Composants alignés sur agrica-benchmark.
   =========================================================================== */

var B   = window.BENCHMARK || {};
var ECH = B.echelle || { max: 5, ponderee: false, affichage: 'etoiles' };

/* ---------------- Helpers ---------------- */
function outils()     { return B.outils || []; }
function criteres()   { return B.criteres || []; }
function getOutil(id) { return outils().filter(function (o) { return o.id === id; })[0] || null; }
function getParam(n)  { return new URLSearchParams(location.search).get(n); }
function groupe(id)   { return (B.meta.groupes || []).filter(function (g) { return g.id === id; })[0]
                               || { id: id, label: id, couleur: '#0E2A47', bg: '#F3ECDD' }; }
function typeDe(o)    { return (B.types || []).filter(function (t) { return t.id === o.type; })[0] || { note: true }; }
function estNote(o)   { return typeDe(o).note !== false && o.notes &&
                               criteres().some(function (c) { return o.notes[c.id] != null; }); }
/* Échappement HTML + typographie française.
   Espace fine insécable avant ; : ! ? » et après « — ne se déclenche que s'il y a
   DÉJÀ une espace, donc les URL (https://) ne sont jamais touchées. */
function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/ ([;:!?»])/g, ' $1')
    .replace(/« /g, '« ');
}
function finalistes() { return ((B.finalistes || {}).items) || []; }
function estFinaliste(id){ return finalistes().some(function (f) { return f.outil === id; }); }
function radarColor(id){ return (B.radarColors || {})[id] || '#6B7280'; }

function moyenne(o) {
  if (!o.notes) return null;
  var som = 0, poids = 0;
  criteres().forEach(function (c) {
    var v = o.notes[c.id]; if (v == null) return;
    var p = ECH.ponderee ? (c.poids || 1) : 1;
    som += v * p; poids += p;
  });
  return poids ? som / poids : null;
}
function fmt(n, d) { return n == null ? '—' : n.toFixed(d == null ? 1 : d).replace('.', ','); }

/* ---------------- Badges & étoiles ---------------- */
function renderBadge(id) {
  if (!(B.fiabilite || {}).actif) return '';
  var b = ((B.fiabilite.badges) || []).filter(function (x) { return x.id === id; })[0];
  return b ? '<span class="badge badge-' + b.couleur + '" title="' + esc(b.desc) + '">' + esc(b.label) + '</span>' : '';
}
function renderStars(note, max) {
  if (note == null) return '<span class="empty" style="font-size:.78rem">non évalué</span>';
  max = max || ECH.max;
  var h = '<span class="stars">';
  for (var i = 1; i <= max; i++) {
    var cls = i <= Math.floor(note) ? 'star-full'
            : (note % 1 !== 0 && i === Math.ceil(note) ? 'star-half' : 'star-empty');
    h += '<span class="' + cls + '">★</span>';
  }
  return h + '</span>';
}

/* ---------------- RADAR — géométrie fidèle à agrica ----------------
   viewBox 480×480, centre (240,240), R=155 (données), Rl=202 (étiquettes).
   Anneaux gradués, valeurs d'échelle sur le premier axe, une couleur par outil. */
function radarSVG(sel) {
  var crit = criteres(), N = crit.length;
  if (N < 3) return '<p class="empty">Radar indisponible : au moins 3 critères sont nécessaires.</p>';
  var CX = 240, CY = 240, R = 155, Rl = 202, MAX = ECH.max;
  var step = MAX <= 5 ? 1 : 2;
  function ang(i) { return -Math.PI / 2 + (2 * Math.PI * i) / N; }
  function pt(i, v) { var a = ang(i); return { x: CX + (v / MAX) * R * Math.cos(a), y: CY + (v / MAX) * R * Math.sin(a) }; }
  function f(n) { return Math.round(n * 100) / 100; }
  function path(ps) { return ps.map(function (p, i) { return (i ? 'L' : 'M') + f(p.x) + ',' + f(p.y); }).join(' ') + ' Z'; }

  var out = '';
  /* anneaux */
  for (var lvl = step; lvl <= MAX; lvl += step) {
    var outer = lvl === MAX;
    out += '<path d="' + path(crit.map(function (_, i) { return pt(i, lvl); })) + '" fill="none" stroke="rgba(14,42,71,' +
           (outer ? '0.18' : '0.065') + ')" stroke-width="' + (outer ? 1.5 : 1) + '"/>';
  }
  /* rayons */
  crit.forEach(function (_, i) {
    var p = pt(i, MAX);
    out += '<line x1="' + CX + '" y1="' + CY + '" x2="' + f(p.x) + '" y2="' + f(p.y) +
           '" stroke="rgba(14,42,71,0.09)" stroke-width="1"/>';
  });
  /* étiquettes d'axes */
  crit.forEach(function (c, i) {
    var a = ang(i), px = CX + Rl * Math.cos(a), py = CY + Rl * Math.sin(a);
    var anc = Math.cos(a) > 0.1 ? 'start' : (Math.cos(a) < -0.1 ? 'end' : 'middle');
    var dy  = Math.sin(a) < -0.6 ? '-0.5em' : (Math.sin(a) > 0.6 ? '1.1em' : '0.35em');
    out += '<text x="' + f(px) + '" y="' + f(py) + '" dy="' + dy + '" text-anchor="' + anc +
           '" font-family="Inter,system-ui,sans-serif" font-size="11.5" font-weight="600"' +
           ' letter-spacing="0.01em" fill="rgba(14,42,71,0.6)">' + esc(c.court || c.label) + '</text>';
  });
  /* valeurs d'échelle sur le 1er axe */
  for (var s = step; s <= MAX; s += step) {
    var sp = pt(0, s);
    out += '<text x="' + f(sp.x + 6) + '" y="' + f(sp.y) + '" dy="0.35em" text-anchor="start"' +
           ' font-family="Inter,system-ui,sans-serif" font-size="9" fill="rgba(14,42,71,0.26)">' + s + '</text>';
  }
  /* séries (dessinées en ordre inverse pour que la 1re reste lisible) */
  sel.slice().reverse().forEach(function (o) {
    if (!estNote(o)) return;
    var col = radarColor(o.id);
    var ps = crit.map(function (c, i) { return pt(i, o.notes[c.id] || 0); });
    out += '<path d="' + path(ps) + '" fill="' + col + '" fill-opacity="0.15" stroke="' + col +
           '" stroke-width="2" stroke-linejoin="round"/>';
    ps.forEach(function (p) {
      out += '<circle cx="' + f(p.x) + '" cy="' + f(p.y) + '" r="3.5" fill="' + col + '"/>';
    });
  });
  return '<svg id="radar-svg" viewBox="0 0 480 480" role="img" aria-label="Radar comparatif">' + out + '</svg>';
}
function radarLegend(sel) {
  return '<div class="radar-legend">' + sel.map(function (o) {
    return '<span class="legend-item"><i class="legend-dot" style="background:' + radarColor(o.id) + '"></i>' +
           esc(o.nom) + '</span>';
  }).join('') + '</div>';
}
function criteresLegende() {
  /* Le poids est affiché dès que l'échelle est pondérée : sans lui, le lecteur ne peut
     pas vérifier comment la moyenne a été obtenue. */
  return '<div class="criteres-legende">' + criteres().map(function (c) {
    return '<div class="critere-leg-item"><span class="critere-leg-court">' + esc(c.court || c.label) +
      '</span>' + (ECH.ponderee && c.poids ? ' <span class="pill">' + c.poids + ' %</span>' : '') +
      '<span class="critere-leg-sep"> — </span><span class="critere-leg-desc">' + esc(c.desc) + '</span></div>';
  }).join('') + '</div>';
}


/* Affichage d'un score selon echelle.affichage.
   ⚠️ Les étoiles ne conviennent qu'aux petites échelles : au-delà de /5 on affiche
   la note chiffrée, sinon on dessinerait dix étoiles par outil. */
function scoreInline(moy) {
  if (moy == null) return '<span class="empty" style="font-size:.78rem">non évalué</span>';
  if (ECH.affichage === 'etoiles' && ECH.max <= 5) {
    return renderStars(Math.round(moy * 2) / 2) + '<span class="score-val">' + fmt(moy) + '</span>';
  }
  return '<span class="score-val" style="font-size:.95rem">' + fmt(moy) +
         '<span style="opacity:.5;font-weight:400">/' + ECH.max + '</span></span>';
}

/* ---------------- CARTE OUTIL (structure agrica) ---------------- */
function carteOutil(o) {
  var g = groupe(o.groupe), moy = moyenne(o), rec = estFinaliste(o.id);
  return '<a class="outil-card reveal' + (rec ? ' is-recommande' : '') + '" href="outil.html?id=' + o.id + '">' +
    (rec ? '<span class="recommande-badge">Retenu</span>' : '') +
    '<div class="outil-badges"><span class="pill-famille" style="background:' + g.couleur + '">' +
      esc(g.label) + '</span>' + renderBadge(o.fiabilite) + '</div>' +
    '<h3 class="outil-nom">' + esc(o.nom) + '</h3>' +
    '<p class="outil-editeur">' + esc(o.editeur) + '</p>' +
    '<p class="outil-baseline">' + esc(o.positionnement) + '</p>' +
    '<div class="outil-footer">' +
      '<span class="outil-score">' + (estNote(o) ? scoreInline(moy)
        : '<span class="empty" style="font-size:.78rem">qualitatif</span>') + '</span>' +
      '<span class="outil-link">Voir la fiche →</span>' +
    '</div></a>';
}

/* ---------------- Blocs de fiche ---------------- */
function critereList(o) {
  return '<div class="critere-list">' + criteres().map(function (c) {
    var v = o.notes ? o.notes[c.id] : null, cmt = (o.commentaires || {})[c.id];
    return '<div class="critere-row" title="' + esc(c.desc) + '">' +
      '<span class="critere-label">' + esc(c.label) +
        (ECH.ponderee && c.poids ? ' <span class="pill">' + c.poids + ' %</span>' : '') + '</span>' +
      '<span class="critere-stars">' + (ECH.max <= 5 ? renderStars(v) : '') +
        (v != null ? '<span class="score-val">' + fmt(v, v % 1 ? 1 : 0) + '/' + ECH.max + '</span>' : '') + '</span>' +
      (cmt ? '<span class="critere-cmt">' + esc(cmt) + '</span>' : '') + '</div>';
  }).join('') + '</div>';
}

function fvBloc(arr, kind) {
  if (!arr || !arr.length) return '';
  var isF = kind === 'force';
  return '<div>' +
    '<h3 class="fv-title"><span class="fv-title-icon ' + (isF ? 'fv-icon-force-bg' : 'fv-icon-vigil-bg') + '">' +
      (isF ? '✓' : '!') + '</span>' + (isF ? 'Forces' : 'Vigilances') + '</h3>' +
    '<div class="fv-list">' + arr.map(function (x) {
      var t = typeof x === 'string' ? x : (x.titre || x.texte || ''), d = (x && x.description) || '';
      return '<div class="fv-item">' +
        '<span class="fv-dot ' + (isF ? 'fv-icon-force-bg' : 'fv-icon-vigil-bg') + '">' + (isF ? '✓' : '!') + '</span>' +
        '<span><strong>' + esc(t) + '</strong>' + (d ? '<span>' + esc(d) + '</span>' : '') + '</span></div>';
    }).join('') + '</div></div>';
}

function contexteBloc(c) {
  if (!c) return '';
  var rows = [['Situation', c.situation], ['Enjeu', c.probleme], ['Réponse', c.solution]];
  return '<div class="contexte-encart">' + rows.filter(function (r) { return r[1]; }).map(function (r) {
    return '<div class="ctx-row"><span class="ctx-lbl">' + r[0] + '</span><p>' + esc(r[1]) + '</p></div>';
  }).join('') + '</div>';
}

function roadmapList(rm) {
  if (!rm || !rm.length) return '';
  return '<ul class="road">' + rm.map(function (r) {
    return '<li>' + (r.phase ? '<span class="ph">' + esc(r.phase) + '</span>' : '') +
      '<strong>' + esc(r.titre) + '</strong>' +
      (r.description ? '<span class="d">' + esc(r.description) + '</span>' : '') + '</li>';
  }).join('') + '</ul>';
}

function coutsBloc(c) {
  if (!c) return '';
  var h = '';
  if (c.postes && c.postes.length) {
    h += '<div class="critere-list">' + c.postes.map(function (p) {
      return '<div class="critere-row"><span class="critere-label">' + esc(p.poste) + '</span>' +
             '<span style="font-size:.85rem;opacity:.7">' + esc(p.montant) + '</span></div>';
    }).join('') + '</div>';
  }
  if (c.note) h += '<p style="margin:.9rem 0 0;font-size:.85rem;opacity:.7"><em>' + esc(c.note) + '</em></p>';
  return h;
}

/* ---------------- Méthodologie / hors-périmètre / contraintes ----------------
   Les trois se dégradent proprement : si la donnée est absente, on ne rend RIEN
   (pas de section vide, pas de titre orphelin). */

function moisFr(iso) {
  if (!iso) return '';
  var M = ['janvier','février','mars','avril','mai','juin',
           'juillet','août','septembre','octobre','novembre','décembre'];
  var p = String(iso).split('-');
  return p[1] ? M[parseInt(p[1], 10) - 1] + ' ' + p[0] : p[0];
}

var REGIMES = {
  primaire: { label:'Source primaire',        badge:'ao'        },
  editeur:  { label:'Déclaratif éditeur',     badge:'editeur'   },
  analyse:  { label:'Évaluation analytique',  badge:'analyse'   },
  terrain:  { label:'Retour terrain ABSIS',   badge:'terrain'   },
  mixte:    { label:'Régimes mixtes',         badge:'confirmer' }
};

function methodoBloc() {
  var m = (B.meta || {}).methodologie;
  if (!m) return '';
  var reg = REGIMES[m.regime] || null;
  var lignes = [
    ['Qui a évalué', m.evaluateur],
    ['Régime de preuve', reg ? reg.label : m.regime],
    ['Date d\'évaluation', moisFr(m.date)],
    ['Grille de notation', m.grille]
  ].filter(function (l) { return l[1]; });

  return '<div class="contexte-encart" style="max-width:none">' +
    lignes.map(function (l) {
      return '<div class="ctx-row"><span class="ctx-lbl">' + l[0] + '</span><p>' + esc(l[1]) +
             (l[0] === 'Régime de preuve' && reg ? ' &nbsp;' + renderBadge(reg.badge) : '') + '</p></div>';
    }).join('') +
    (m.limites ? '<div class="ctx-row"><span class="ctx-lbl">Ce que ce benchmark ne dit pas</span>' +
      '<p>' + esc(m.limites) + '</p></div>' : '') +
    '</div>';
}

function horsPerimetreBloc() {
  var hp = (B.meta || {}).horsPerimetre;
  if (!hp || !hp.length) return '';
  return '<div class="table-scroll"><table><thead><tr><th>Écarté</th>' +
    '<th>Pourquoi</th></tr></thead><tbody>' +
    hp.map(function (x) {
      return '<tr><td><strong>' + esc(x.nom) + '</strong></td>' +
             '<td style="opacity:.7">' + esc(x.raison) + '</td></tr>';
    }).join('') + '</tbody></table></div>';
}

/* --- CADRE IMPOSÉ : contraintes DU PROJET (page Arbitrage) -------------------
   Ce sont les non-négociables du client. Elles s'appliquent AVANT toute comparaison.
   Affichées pour rendre la recommandation auditable : sans elles, l'encart rouge
   « Incompatible avec vos contraintes » sur les fiches n'aurait aucun référent.
   Chaque contrainte peut nommer les outils qu'elle écarte (champ `elimine`). */
function cadreImposeBloc() {
  var c = (B.meta || {}).contraintes;
  if (!c || !c.length) return '';
  return '<div class="tool-grid">' + c.map(function (x) {
    var elim = (x.elimine || []).map(function (id) {
      var o = getOutil(id); return o ? o.nom : id;
    });
    return '<div class="card reveal" style="border-top:3px solid var(--gold)">' +
      '<h4 style="font-family:var(--serif);font-size:1.06rem;color:var(--navy);margin-bottom:.4rem">' +
      esc(x.titre) + '</h4>' +
      (x.detail ? '<p style="margin:0 0 .8rem;font-size:.88rem;opacity:.7">' + esc(x.detail) + '</p>' : '') +
      (elim.length
        ? '<p style="margin:0;font-size:.8rem"><span class="ctx-lbl" style="display:inline">Écarte</span> ' +
          elim.map(function (n) { return '<span class="pill" style="background:rgba(194,24,91,.1);' +
            'color:#8E1044">' + esc(n) + '</span>'; }).join(' ') + '</p>'
        : '<p style="margin:0;font-size:.8rem;opacity:.55"><em>N\'écarte aucun outil du panel.</em></p>') +
      '</div>';
  }).join('') + '</div>';
}

/* --- PRÉREQUIS & CONTRAINTES DE L'OUTIL (bloc de fiche) ---------------------
   ⚠️ Ne pas confondre avec meta.contraintes, qui décrit les contraintes DU PROJET
   (budget, on-premise, souveraineté…). Celles-ci ne s'affichent pas : elles servent
   à filtrer les recommandations et à détecter les incompatibilités ci-dessous.
   Ici : ce que l'OUTIL impose (prérequis techniques, profils, hébergement, licence). */
function prerequisBloc(o) {
  var p = (o.fiche || {}).prerequis;
  if (!p || !p.length) return '';
  return '<div>' +
    '<h3 class="fv-title"><span class="fv-title-icon" style="background:rgba(14,42,71,.09);' +
      'color:var(--navy)">⚙</span>Prérequis &amp; contraintes</h3>' +
    '<div class="fv-list">' + p.map(function (x) {
      var t = typeof x === 'string' ? x : (x.titre || ''), d = (x && x.detail) || '';
      return '<div class="fv-item">' +
        '<span class="fv-dot" style="background:rgba(14,42,71,.09);color:var(--navy)">·</span>' +
        '<span><strong>' + esc(t) + '</strong>' + (d ? '<span>' + esc(d) + '</span>' : '') +
        '</span></div>';
    }).join('') + '</div></div>';
}

/* Confronte les contraintes du PROJET aux prérequis de l'OUTIL et signale les blocages.
   Un outil incompatible doit être visible comme tel, quelle que soit sa note. */
function incompatibilitesBloc(o) {
  var inc = o.incompatibilites;
  if (!inc || !inc.length) return '';
  return '<div class="pitch-encart" style="border-left-color:#C2185B;background:rgba(194,24,91,.05)">' +
    '<p style="font-family:var(--serif);font-weight:700;color:#8E1044;font-size:1.02rem;margin:0 0 .5rem">' +
    'Incompatible avec vos contraintes</p>' +
    '<ul class="clean" style="margin:0">' + inc.map(function (x) {
      return '<li>' + esc(typeof x === 'string' ? x : x.texte) + '</li>';
    }).join('') + '</ul></div>';
}

/* Rend une section complète, ou rien du tout si le bloc est vide. */
function sectionSi(html, eyebrow, titre, chapeau, avecDivider) {
  if (!html) return '';
  return (avecDivider ? '<hr class="divider-teal">' : '') +
    '<span class="section-eyebrow">' + eyebrow + '</span>' +
    '<h2 class="section-title" style="font-size:1.6rem">' + titre + '</h2>' +
    (chapeau ? '<p class="section-lead">' + chapeau + '</p>' : '<div style="height:1.2rem"></div>') +
    html;
}

/* --- COUCHE 2 : matrice de couverture (domaines × outils) -------------------
   Second niveau de comparaison, plus fin que le radar : pour chaque domaine
   fonctionnel, ce que chaque outil couvre et comment.
   Ne rend rien si couche2 est inactive ou vide (dégradation propre). */
function couche2Bloc() {
  var c = B.couche2 || {};
  if (!c.actif || !(c.items || []).length) return '';

  var ech = c.echelleCouverture || [];
  function niveau(id) {
    return ech.filter(function (e) { return e.id === id; })[0] || { label: id, couleur: '#9AA3AF' };
  }
  /* Seuls les outils réellement évalués figurent dans la matrice. */
  var cols = outils().filter(function (o) { return typeDe(o).note !== false && o.couverture; });
  if (!cols.length) return '';

  var h = '<div class="table-scroll"><table><thead><tr>' +
          '<th>Domaine</th><th class="num">Exigences</th>' +
          cols.map(function (o) { return '<th class="num">' + esc(o.nom) + '</th>'; }).join('') +
          '</tr></thead><tbody>';

  c.items.forEach(function (it) {
    h += '<tr><td><strong>' + esc(it.label) + '</strong></td>' +
         '<td class="num" style="opacity:.6">' + (it.nbExigences != null ? it.nbExigences : '—') + '</td>';
    cols.forEach(function (o) {
      var v = (o.couverture || {})[it.id];
      if (v == null) { h += '<td class="num"><span class="empty" style="font-size:.78rem">—</span></td>'; return; }
      var val = typeof v === 'string' ? v : v.valeur;
      var cmt = typeof v === 'string' ? '' : (v.commentaire || '');
      var n = niveau(val);
      h += '<td class="num"><span class="pill-famille" style="background:' + n.couleur + '"' +
           (cmt ? ' title="' + esc(cmt) + '"' : '') + '>' + esc(n.label) + '</span>' +
           (cmt ? '<div class="critere-cmt" style="text-align:left;margin-top:.3rem">' + esc(cmt) + '</div>' : '') +
           '</td>';
    });
    h += '</tr>';
  });

  h += '</tbody></table></div>';

  /* Légende de l'échelle de couverture */
  if (ech.length) {
    h += '<div class="radar-legend" style="justify-content:flex-start;margin-top:1rem">' +
         ech.map(function (e) {
           return '<span class="legend-item"><i class="legend-dot" style="background:' + e.couleur +
                  '"></i>' + esc(e.label) + '</span>';
         }).join('') + '</div>';
  }
  return h;
}

/* Carte "palier / finaliste" */
function tierCard(f, i) {
  var o = getOutil(f.outil); if (!o) return '';
  var g = groupe(o.groupe);
  return '<div class="tier-card is-gold reveal' + (i ? ' tier-step-' + (i + 1) : '') + '">' +
    '<div class="tier-num">' + (i + 1) + '</div>' +
    '<p class="tier-label">' + esc(f.role) + '</p>' +
    '<h3 class="tier-title">' + esc(o.nom) + '</h3>' +
    '<div style="margin:-.4rem 0 .9rem"><span class="pill-famille" style="background:' + g.couleur + '">' +
      esc(g.label) + '</span></div>' +
    '<p class="tier-desc">' + esc(f.pourquoi) + '</p>' +
    (f.reserve ? '<p style="font-size:.82rem;opacity:.72;border-left:2px solid var(--gold);' +
      'padding-left:.9rem;margin:0 0 1.2rem"><strong>Réserve — </strong>' + esc(f.reserve) + '</p>' : '') +
    '<a class="outil-link" href="outil.html?id=' + o.id + '">Voir la fiche →</a>' +
    '</div>';
}

/* ---------------- Logo (paramétrable, avec repli texte) ----------------
   meta.logo = chemin d'image (ex. "assets/logo.png") — optionnel.
   Si absent OU si le fichier ne charge pas, on affiche le nom en toutes lettres :
   le gabarit reste fonctionnel sans aucun fichier image, donc partageable. */
function logoHTML() {
  var m = B.meta || {}, nom = m.marque || 'ABSIS Conseil';
  var texte = '<span class="nav-dot"></span><span class="nav-name">' + esc(nom) + '</span>';
  if (!m.logo) return '<span class="logo-pill">' + texte + '</span>';
  return '<span class="logo-pill">' +
    '<img src="' + m.logo + '" alt="' + esc(nom) + '" style="height:26px;width:auto;display:block"' +
    ' onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'inline-flex\'">' +
    '<span style="display:none;align-items:center;gap:.5rem">' + texte + '</span></span>';
}

/* ---------------- Contrôles de cohérence de la config ----------------
   Détecte les erreurs qui produiraient un livrable FAUX. Les avertissements vont
   toujours dans la console ; la bannière visible n'apparaît qu'en local (localhost
   ou file://) pour ne jamais polluer un livrable remis au client. */
function verifierConfig() {
  var pb = [], ids = outils().map(function (o) { return o.id; });

  var dbl = ids.filter(function (v, i) { return ids.indexOf(v) !== i; });
  if (dbl.length) pb.push('Identifiants d\'outils en double : ' + dbl.join(', '));

  if (ECH.ponderee) {
    var som = criteres().reduce(function (a, c) { return a + (c.poids || 0); }, 0);
    if (som !== 100) pb.push('Pondération : la somme des poids vaut ' + som + ' au lieu de 100.');
  }

  outils().forEach(function (o) {
    if (o.notes) criteres().forEach(function (c) {
      var v = o.notes[c.id];
      if (v != null && (v < 0 || v > ECH.max))
        pb.push(o.nom + ' : note "' + c.id + '" = ' + v + ', hors échelle 0-' + ECH.max + '.');
    });
    if (!(B.meta.groupes || []).some(function (g) { return g.id === o.groupe; }))
      pb.push(o.nom + ' : groupe "' + o.groupe + '" non déclaré dans meta.groupes.');
  });

  finalistes().forEach(function (f) {
    if (ids.indexOf(f.outil) < 0) pb.push('Finaliste "' + f.outil + '" : aucun outil de ce nom.');
  });
  ((B.arbitrage || {}).scenarios || []).forEach(function (s) {
    if (ids.indexOf(s.outil) < 0)
      pb.push('Arbitrage "' + s.besoin + '" renvoie à "' + s.outil + '", inexistant.');
  });
  (B.meta.contraintes || []).forEach(function (c) {
    (c.elimine || []).forEach(function (id) {
      if (ids.indexOf(id) < 0) pb.push('Contrainte "' + c.titre + '" écarte "' + id + '", inexistant.');
    });
  });
  (B.meta.ambitions || []).forEach(function (a) {
    (a.outils || []).forEach(function (id) {
      if (ids.indexOf(id) < 0) pb.push('Palier "' + a.titre + '" cite "' + id + '", inexistant.');
    });
  });

  if (!pb.length) return;
  console.warn('[benchmark] ' + pb.length + ' incohérence(s) de configuration :');
  pb.forEach(function (p) { console.warn('  • ' + p); });

  if (!/^(localhost|127\.0\.0\.1|)$/.test(location.hostname)) return;  // jamais sur un site déployé
  var d = document.createElement('div');
  d.style.cssText = 'background:#8E1044;color:#fff;font:600 12.5px Inter,sans-serif;' +
                    'padding:.5rem 1rem;text-align:center';
  d.textContent = '⚠️ ' + pb.length + ' incohérence(s) dans data/config.js — détail dans la console ' +
                  '(bannière visible en local uniquement).';
  document.body.insertBefore(d, document.body.firstChild);
}

/* ---------------- Layout injecté ---------------- */
var PAGES = [
  { f: 'index.html',      l: 'Accueil' },
  { f: 'outils.html',     l: 'Outils' },
  { f: 'comparatif.html', l: 'Analyse & Reco' },
  { f: 'arbitrage.html',  l: 'Arbitrage' }
];

function injectLayout() {
  var cur = location.pathname.split('/').pop() || 'index.html';
  var li = PAGES.map(function (p) {
    return '<li><a href="' + p.f + '"' + (p.f === cur ? ' class="active"' : '') + '>' + p.l + '</a></li>';
  }).join('');

  var h = '';
  if ((B.fiabilite || {}).actif && B.fiabilite.bandeau) {
    h += '<div class="avertissement-banner"><div class="content-wrap">' + esc(B.fiabilite.bandeau) + '</div></div>';
  }
  h += '<header class="sticky-header"><nav id="navbar">' +
         '<a class="nav-logo" href="index.html">' + logoHTML() + '</a>' +
         '<ul id="nav-links">' + li + '</ul>' +
         '<button id="burger" aria-label="Ouvrir le menu"><span></span><span></span><span></span></button>' +
       '</nav><ul id="mobile-menu">' + li + '</ul></header>';

  var slot = document.getElementById('layout-head');
  if (slot) slot.outerHTML = h;

  var ft = document.getElementById('layout-foot');
  if (ft) {
    var br = (B.meta || {}).brief || {};
    var etat = br.date
      ? '<p style="margin:.6rem 0 0;font-size:.8rem;color:#B9C9DC">' +
        '<strong style="color:var(--gold)">État des données : ' + moisFr(br.date) + '.</strong> ' +
        'Un benchmark se périme — reconfirmer avant toute décision.</p>' : '';
    ft.outerHTML = '<footer><div class="content-wrap">' +
      '<div class="footer-brand">ABSIS Conseil</div>' +
      '<span class="accent-line"></span>' +
      '<p style="margin:0 0 .3rem;color:#B9C9DC">' + esc(B.meta.titre) + '</p>' +
      (br.public ? '<p style="margin:0;font-size:.8rem;color:#8FA6BF">Destinataires : ' +
        esc(br.public) + '</p>' : '') +
      etat +
      '<p style="margin:.9rem 0 0;font-size:.74rem;color:#7089A8">Généré depuis le template ' +
      'benchmark ABSIS (contrat <code>window.BENCHMARK</code>, genre : ' + esc(B.meta.genre) + ').</p>' +
      '</div></footer>';
  }
}

function initBurger() {
  var b = document.getElementById('burger'), m = document.getElementById('mobile-menu');
  if (!b || !m) return;
  b.addEventListener('click', function () {
    var open = m.classList.toggle('open'), s = b.querySelectorAll('span');
    s[0].style.transform = open ? 'translateY(7px) rotate(45deg)' : '';
    s[1].style.opacity   = open ? '0' : '';
    s[2].style.transform = open ? 'translateY(-7px) rotate(-45deg)' : '';
  });
}
function initReveal() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(function (e) { e.classList.add('is-visible'); }); return;
  }
  var obs = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); } });
  }, { threshold: .08 });
  var seen = new Map();
  document.querySelectorAll('.reveal:not(.is-visible)').forEach(function (el) {
    var p = el.parentElement;
    if (p) { var i = seen.get(p) || 0; seen.set(p, i + 1); if (i) el.style.transitionDelay = (i * .07) + 's'; }
    obs.observe(el);
  });
}
/* ---------------- Champs méta ----------------
   TOUT le texte variable des pages vient d'ici. Aucune page HTML ne doit contenir
   de libellé propre à un benchmark donné, sinon le gabarit n'est plus réutilisable. */

/* Nombres en toutes lettres (0–12) pour garder le ton éditorial : « Trois paliers ». */
function motNombre(n) {
  var M = ['zéro','un','deux','trois','quatre','cinq','six','sept','huit','neuf','dix','onze','douze'];
  return M[n] !== undefined ? M[n] : String(n);
}
function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

function setMeta() {
  var m = B.meta || {};

  ['titre', 'sousTitre', 'contexte'].forEach(function (k) {
    document.querySelectorAll('[data-bm="' + k + '"]').forEach(function (e) { e.textContent = m[k] || ''; });
  });

  /* Titre de l'onglet : « <page> — <titre du benchmark> » */
  var page = document.body.getAttribute('data-page');
  document.title = (page ? page + ' — ' : '') + (m.titre || 'Benchmark');

  /* Accroche du hero : « <accroche1> / <accrocheMot> ? », le mot-clé en accent or.
     Sans accroche déclarée, on retombe proprement sur le titre. */
  document.querySelectorAll('[data-bm="accroche"]').forEach(function (e) {
    e.innerHTML = (m.accroche1 && m.accrocheMot)
      ? esc(m.accroche1) + '<br><em>' + esc(m.accrocheMot) + '</em>&nbsp;?'
      : esc(m.titre || '');
  });

  /* Compteurs, calculés — jamais écrits en dur dans le HTML.
     data-n = chiffre · data-n + data-mot = en lettres · data-nc = en lettres capitalisé
     data-pluriel = "s" si > 1 */
  var n = { outils:    outils().length,
            familles:  (m.groupes || []).length,
            criteres:  criteres().length,
            paliers:   (m.ambitions || []).length,
            retenus:   finalistes().length,
            scenarios: ((B.arbitrage || {}).scenarios || []).length };

  document.querySelectorAll('[data-n]').forEach(function (e) {
    var v = n[e.getAttribute('data-n')] || 0;
    e.textContent = e.hasAttribute('data-mot') ? motNombre(v) : v;
  });
  document.querySelectorAll('[data-nc]').forEach(function (e) {
    e.textContent = cap(motNombre(n[e.getAttribute('data-nc')] || 0));
  });
  document.querySelectorAll('[data-pluriel]').forEach(function (e) {
    e.textContent = (n[e.getAttribute('data-pluriel')] || 0) > 1 ? 's' : '';
  });
}

document.addEventListener('DOMContentLoaded', function () {
  injectLayout(); initBurger(); setMeta();
  if (typeof pageInit === 'function') pageInit();
  initReveal();
  verifierConfig();
});
