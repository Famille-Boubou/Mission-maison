/* Mission Maison — onglet « Mon argent » (Lili et Romy) */
(function () {
  const MM = window.MM, esc = MM.esc, E = MM.etat;
  const AR = () => (E.ar || (E.ar = { vue: 'lecons', lecon: null, sim: null, jeu: null, editObjectif: false }));

  MM.niveauxDispo = function (profil) {
    return window.MM_NIVEAUX_ARGENT.filter(n => !n.avance || (profil || E.profil).argent_avance);
  };
  function leconsNiveau(nid) { return window.MM_LECONS.filter(l => l.id.indexOf(nid + '-') === 0); }
  MM.leconsNiveau = leconsNiveau;
  function reussies(nid, enfant) { return leconsNiveau(nid).filter(l => { const a = MM.apprentissage('lecon:' + l.id, enfant); return a && a.reussi; }).length; }
  MM.leconsReussies = function (enfant) { return window.MM_LECONS.filter(l => { const a = MM.apprentissage('lecon:' + l.id, enfant); return a && a.reussi; }).length; };

  MM.vues.argent = function () {
    if (E.quiz) return MM.htmlQuiz();
    const a = AR();
    if (a.lecon) return vueLecon(window.MM_LECONS.find(l => l.id === a.lecon));
    const p = E.profil;
    let h = '<div class="entete"><div><div class="sous-titre">Gagner, épargner, investir : les bons réflexes</div><h1>Mon argent</h1></div>' +
      '<button class="avatar" data-action="deconnexion" aria-label="Se déconnecter">' + esc(p.prenom.charAt(0)) + '</button></div>';
    const vues = [['lecons', '🗺️ Leçons'], ['simulateur', '⏳ Simulateur'], ['tempete', '🌪️ Tempête'], ['objectif', '🎯 Objectif'], ['defis', '🏅 Défis']];
    h += '<div class="choix defile" style="margin-bottom:12px">' + vues.map(v =>
      '<button class="puce' + (a.vue === v[0] ? ' active' : '') + '" data-action="ar-vue" data-vue="' + v[0] + '">' + v[1] + '</button>').join('') + '</div>';
    switch (a.vue) {
      case 'simulateur': return h + vueSimulateur();
      case 'tempete': return h + vueTempete();
      case 'objectif': return h + vueObjectif();
      case 'defis': return h + vueDefis();
      default: return h + vueLecons();
    }
  };
  MM.vues.argentApres = function () {
    if (AR().vue === 'simulateur' && !AR().lecon && !E.quiz) brancherSimulateur();
  };

  /* ----- Carte des niveaux ----- */
  function vueLecons() {
    let h = MM.htmlPointsSemaine();
    const niveaux = MM.niveauxDispo();
    let precedentOk = true;
    h += '<div class="pile" style="margin-top:12px">';
    niveaux.forEach((n, idx) => {
      const lecons = leconsNiveau(n.id), visibles = lecons.filter(l => MM.contenuValide('lecon:' + l.id, l.v));
      const ok = reussies(n.id), total = lecons.length, ouvert = precedentOk, bonus = MM.apprentissage('niveau:' + n.id);
      h += '<div class="carte-niveau' + (ouvert ? '' : ' verrou') + '"><div class="ligne entre"><div class="ligne"><span style="font-size:30px">' + (ouvert ? n.emoji : '🔒') + '</span>' +
        '<div><div class="petit">Niveau ' + (idx + 1) + '</div><strong style="font-size:18px">' + esc(n.nom) + '</strong></div></div><span class="pastille ' + (ok >= total ? 'ok' : 'neutre') + '">' + ok + ' / ' + total + '</span></div>' +
        '<span style="font-size:13px;color:var(--gris)">' + esc(n.texte) + '</span>';
      if (!ouvert) {
        h += '<span class="petit">Termine le niveau précédent pour débloquer celui-ci.</span>';
      } else {
        h += '<div class="pile" style="gap:6px">';
        lecons.forEach(l => {
          if (!MM.contenuValide('lecon:' + l.id, l.v)) return;
          const x = MM.apprentissage('lecon:' + l.id);
          const etat = x && x.reussi ? '✅' : x ? '<span class="petit" style="color:var(--orange-texte)">à revoir</span>' : '<span class="pastille points">+2</span>';
          h += '<button class="ligne-lecon" data-action="ar-lecon" data-id="' + l.id + '"><span style="font-size:22px">' + l.emoji + '</span><span style="flex:1;text-align:left;font-weight:600">' + esc(l.titre) + '</span>' + etat + '</button>';
        });
        if (visibles.length < lecons.length) h += '<span class="petit">' + (lecons.length - visibles.length) + ' leçon(s) en attente de validation par Papa ou Maman.</span>';
        h += '</div>';
        if (ok >= total && !bonus) h += '<button class="btn btn-orange" data-action="ar-bonus-niveau" data-id="' + n.id + '">🎉 Niveau terminé : récupérer mon bonus (+5)</button>';
        else if (bonus) h += '<span class="petit" style="color:var(--ok);font-weight:600">🏆 Niveau terminé' + (bonus.points ? ' · bonus de ' + bonus.points + ' points reçu' : '') + '</span>';
      }
      h += '</div>';
      precedentOk = ok >= total;
    });
    h += '</div>';
    if (!E.profil.argent_avance) h += '<p class="petit" style="margin-top:12px">Les niveaux « Investisseuse » et « Experte » seront débloqués par Papa ou Maman un peu plus tard.</p>';
    else h += '<div class="carte pile" style="margin-top:14px;gap:6px"><strong>📚 Pour aller plus loin, avec Papa ou Maman</strong>' +
      '<span style="font-size:13px;line-height:1.45">Les sites de l\'AMF et de la Banque de France (« Mes questions d\'argent ») expliquent tout simplement. Les vidéos de Matthieu Louvet (S\'investir) et de Mounir Laggoune (Finary) défendent une approche simple : investir régulièrement, sur le long terme, de façon diversifiée et avec peu de frais.</span>' +
      '<span class="petit">Ces leçons sont de l\'éducation financière, pas des conseils d\'investissement personnalisés.</span></div>';
    return h;
  }

  /* ----- Une leçon ----- */
  function vueLecon(l) {
    E.pause = true;
    if (!l) { AR().lecon = null; return MM.vues.argent(); }
    const x = MM.apprentissage('lecon:' + l.id);
    let h = '<div class="ligne" style="margin-bottom:12px"><button class="btn btn-contour btn-petit" data-action="ar-retour">← Retour</button></div>';
    h += MM.htmlLecon(l);
    h += '<div class="carte pile" style="margin-top:14px">';
    if (x && x.reussi) h += '<strong>✅ Leçon réussie</strong><span class="petit">' + (x.points ? '+' + x.points + ' points gagnés' : 'Réussie (sans nouveaux points)') + '</span><button class="btn btn-contour" data-action="ar-quiz" data-id="' + l.id + '">Refaire le quiz pour m\'entraîner</button>';
    else if (x) h += '<strong>Quiz pas encore réussi</strong><span class="petit">Ton premier essai n\'a pas rapporté de points, mais réussis-le pour avancer dans le niveau.</span><button class="btn btn-vert" data-action="ar-quiz" data-id="' + l.id + '">Réessayer</button>';
    else h += '<strong>Quiz : +2 points</strong><span class="petit">5 questions, il faut 4 bonnes réponses au premier essai.</span><button class="btn btn-vert" data-action="ar-quiz" data-id="' + l.id + '">Je passe le quiz</button>';
    return h + '</div>';
  }
  // Rendu d'une leçon (utilisé aussi par l'espace parents)
  MM.htmlLecon = function (l, cx) {
    const c = l.perso ? (cx || MM.ctxPlan()) : null, T = (x) => c ? MM.tpl(x, c) : x;
    return '<div class="carte-fiche"><span style="font-size:40px">' + l.emoji + '</span><h2 style="margin:6px 0 10px;font-size:23px;line-height:1.2">' + esc(l.titre) + '</h2>' +
      l.texte.map(p => '<p style="margin:0 0 10px;font-size:15px;line-height:1.55">' + MM.gras(T(p)) + '</p>').join('') + '</div>' +
      (l.illus || []).map(il => htmlIllus(il, c)).join('') +
      '<div class="carte-jaune pile" style="gap:4px;margin-top:10px"><strong>💡 L\'astuce</strong><span style="font-size:14px;line-height:1.45">' + esc(T(l.astuce)) + '</span></div>';
  };

  /* ----- Plan personnalisé (niveau « Le temps, mon super-pouvoir ») ----- */
  function valeurPlan(r, annees, init, mois) {
    const mr = Math.pow(1 + r, 1 / 12) - 1; let x = init;
    for (let i = 0; i < Math.round(annees * 12); i++) x = x * (1 + mr) + mois;
    return x;
  }
  function euros(v) { return nb(v >= 1000 ? Math.round(v / 10) * 10 : Math.round(v), 0) + ' €'; }
  MM.valeurPlan = valeurPlan;
  // Chiffres de la fille connectée (ou de l'exemple pour l'espace parents)
  MM.ctxPlan = function (prenom) {
    const P = window.MM_PLAN;
    if (!prenom && E.profil && E.profil.role === 'enfant') prenom = E.profil.prenom;
    if (!prenom || P.ages[prenom] == null) prenom = P.exemple;
    const age = P.ages[prenom], c = { prenom, age: String(age), agep: String(P.ageParent), ecart: String(P.ageParent - age), ans60: String(60 - age), _age: age };
    P.jalons.forEach(a => {
      [5, 7, 9].forEach(t => { c['v' + a + '_' + t] = euros(valeurPlan(t / 100, a - age, P.initial, P.mensuel)); });
      c['verse' + a] = euros(P.initial + P.mensuel * 12 * (a - age));
    });
    const mr = Math.pow(1.07, 1 / 12) - 1, n = (60 - P.ageParent) * 12, g = Math.pow(1 + mr, n);
    const V = valeurPlan(0.07, 60 - age, P.initial, P.mensuel), m = Math.round((V - P.initial * g) / ((g - 1) / mr));
    Object.assign(c, { parentMois: nb(m, 0) + ' €', parentFois: String(Math.round(m / P.mensuel)), parentV60: euros(valeurPlan(0.07, 60 - P.ageParent, P.initial, P.mensuel)),
      parentVerse: euros(P.initial + m * n), _V60: V, _parentV60: valeurPlan(0.07, 60 - P.ageParent, P.initial, P.mensuel), _verse60: P.initial + P.mensuel * 12 * (60 - age), _parentVerse: P.initial + m * n });
    return c;
  };
  MM.tpl = function (s, c) { return String(s).replace(/\{(\w+)\}/g, (m, k) => (c[k] != null ? c[k] : m)); };

  /* ----- Illustrations des leçons ----- */
  function nb(v, dec) {
    const d = dec == null ? 2 : dec, r = Math.round(v * Math.pow(10, d)) / Math.pow(10, d);
    return (Number.isInteger(r) ? String(r) : r.toFixed(d)).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '\u202f');
  }
  function htmlIllus(il, c) {
    let h = '<div class="carte illus pile" style="margin-top:10px;gap:10px"><strong style="font-size:15px">' + esc(il.titre || il.nom || '') + '</strong>';
    if (il.type.indexOf('plan-') === 0) c = c || MM.ctxPlan();
    if (il.type === 'plan-tableau') {
      const P = window.MM_PLAN, ages = P.jalons.filter(a => a > c._age);
      h += '<div class="tableau-plan"><div class="tp-ligne tp-tete"><span>Âge</span><span>Versé</span><span>5 %</span><span>7 %</span><span>9 %</span></div>' +
        ages.map(a => '<div class="tp-ligne' + (a === 60 ? ' tp-fin' : '') + '"><span>' + a + ' ans</span><span>' + c['verse' + a] + '</span><span>' + c['v' + a + '_5'] + '</span><span><strong>' + c['v' + a + '_7'] + '</strong></span><span>' + c['v' + a + '_9'] + '</span></div>').join('') +
        '</div><span class="petit">Prudent 5 % · <strong style="color:var(--encre)">central 7 %</strong> · favorable 9 % par an. Montants arrondis.</span>';
    } else if (il.type === 'plan-courbe') {
      const P = window.MM_PLAN, a0 = c._age, ans = 60 - a0, W = 320, H = 170, G = 44, D = 8, top = 10;
      const series = [
        { nom: 'Versé', coul: '#9A9CA8', f: (y) => P.initial + P.mensuel * 12 * y, pointille: true },
        { nom: '5 %', coul: '#7BC47F', f: (y) => valeurPlan(0.05, y, P.initial, P.mensuel) },
        { nom: '7 %', coul: '#0B7F3D', f: (y) => valeurPlan(0.07, y, P.initial, P.mensuel), epais: true },
        { nom: '9 %', coul: '#FF8A00', f: (y) => valeurPlan(0.09, y, P.initial, P.mensuel) }
      ];
      const max = series[3].f(ans), X = (y) => G + (W - G - D) * y / ans, Y = (v) => top + (H - top) * (1 - v / max);
      let svg = '<svg viewBox="0 0 ' + W + ' ' + (H + 26) + '" style="width:100%;height:auto" role="img" aria-label="' + esc(il.titre) + '">';
      [0, 0.25, 0.5, 0.75, 1].forEach(k => {
        const v = max * k, y = Y(v);
        svg += '<line x1="' + G + '" x2="' + (W - D) + '" y1="' + y + '" y2="' + y + '" stroke="#E6E6EE" stroke-width="1"/>' +
          '<text x="' + (G - 5) + '" y="' + (y + 4) + '" font-size="10" text-anchor="end" fill="#5F6170">' + (v >= 1000 ? nb(Math.round(v / 1000), 0) + ' k€' : '0') + '</text>';
      });
      [a0].concat(P.jalons.filter(a => a >= a0 + 5 && a !== 18)).forEach(a => {
        svg += '<text x="' + X(a - a0) + '" y="' + (H + 16) + '" font-size="10" text-anchor="middle" fill="#5F6170">' + a + '</text>';
      });
      series.forEach(s => {
        const pts = []; for (let y = 0; y <= ans; y++) pts.push(X(y).toFixed(1) + ',' + Y(s.f(y)).toFixed(1));
        svg += '<polyline fill="none" stroke="' + s.coul + '" stroke-width="' + (s.epais ? 3.5 : 2) + '"' + (s.pointille ? ' stroke-dasharray="5 4"' : '') + ' stroke-linejoin="round" points="' + pts.join(' ') + '"/>';
      });
      svg += '</svg>';
      h += svg + '<span class="petit" style="margin-top:-8px;text-align:center">Âge de ' + esc(c.prenom) + '</span>' +
        '<div class="legende-plan">' + series.map(s => '<span><i style="background:' + s.coul + '"></i>' + s.nom + ' : <strong>' + euros(s.f(ans)) + '</strong></span>').join('') + '</div>' +
        '<span class="petit">Valeurs à 60 ans. La ligne grise, c\'est l\'argent versé : tout l\'écart au-dessus, ce sont les gains.</span>';
    } else if (il.type === 'plan-parent') {
      const P = window.MM_PLAN, max = c._V60;
      const barre = (titre, sous, v, coul) => '<div class="pile" style="gap:4px"><div class="ligne entre"><span style="font-size:13px;font-weight:600">' + titre + '</span><strong style="font-size:14px">' + euros(v) + '</strong></div>' +
        '<div class="barre claire"><div style="width:' + Math.max(2, MM.pct(v, max)) + '%;background:' + coul + '"></div></div><span class="petit">' + sous + '</span></div>';
      h += barre('🧒 ' + esc(c.prenom) + ', ' + c.age + ' ans', '10 € par mois jusqu\'à 60 ans · ' + c.verse60 + ' versés', c._V60, 'var(--vert)') +
        barre('🧑 Papa ou Maman, ' + c.agep + ' ans', '10 € par mois jusqu\'à 60 ans · ' + euros(P.initial + P.mensuel * 12 * (60 - P.ageParent)) + ' versés', c._parentV60, '#9A9CA8') +
        barre('🧑 Papa ou Maman pour te rattraper', c.parentMois + ' par mois jusqu\'à 60 ans · ' + c.parentVerse + ' versés', c._V60, 'var(--orange)') +
        '<div class="carte-jaune" style="text-align:center;font-weight:700;font-size:14px">' + c.ecart + ' ans d\'avance = ' + c.parentFois + ' fois moins d\'effort pour le même résultat</div>' +
        '<span class="petit">Scénario central : 7 % par an, avant frais et impôts.</span>';
    } else if (il.type === 'fourchette') {
      const lo = Math.min.apply(null, il.lignes.map(x => x.min)), hi = Math.max.apply(null, il.lignes.map(x => x.max)), P = (v) => (v - lo) / (hi - lo) * 100;
      h += il.lignes.map(x => '<div class="pile" style="gap:3px"><div class="ligne entre"><strong style="font-size:13px">Sur ' + esc(x.nom) + '</strong>' +
        '<span class="petit">pire <strong style="color:' + (x.min < 0 ? 'var(--rouge)' : 'var(--ok)') + '">' + (x.min > 0 ? '+' : '') + nb(x.min, 1) + ' %</strong> · moy. ' + nb(x.moy, 1) + ' % · meilleur +' + nb(x.max, 1) + ' %</span></div>' +
        '<div class="fourchette"><span class="zero" style="left:' + P(0) + '%"></span>' +
        (x.min < 0 ? '<span class="zone risque" style="left:' + P(x.min) + '%;width:' + (P(0) - P(x.min)) + '%"></span>' : '') +
        '<span class="zone" style="left:' + P(Math.max(0, x.min)) + '%;width:' + (P(x.max) - P(Math.max(0, x.min))) + '%"></span>' +
        '<span class="moy" style="left:' + P(x.moy) + '%"></span></div></div>').join('') +
        '<span class="petit">La barre va du pire au meilleur résultat ; le point, c\'est la moyenne ; le trait, c\'est zéro.</span>';
    } else if (il.type === 'barres') {
      h += il.lignes.map(x => {
        const max = Math.max(x.a, x.b), pc = Math.round((x.b / x.a - 1) * 100);
        return '<div class="pile" style="gap:4px"><div class="ligne entre"><span style="font-size:13px;font-weight:600">' + esc(x.nom) + '</span>' +
          '<span class="pastille ' + (pc === 0 ? 'neutre' : (pc > 0) === !il.hausseBonne ? 'moins' : 'ok') + '">' + (pc > 0 ? '+' : '') + pc + ' %</span></div>' +
          '<div class="barre-illus"><span class="avant" style="width:' + MM.pct(x.a, max) + '%"></span><em>' + esc(x.al) + ' : ' + nb(x.a) + (x.u || ' €') + '</em></div>' +
          '<div class="barre-illus"><span class="apres" style="width:' + MM.pct(x.b, max) + '%"></span><em>' + esc(x.bl) + ' : ' + nb(x.b) + (x.u || ' €') + '</em></div></div>';
      }).join('');
    } else if (il.type === 'escalier') {
      const max = Math.max.apply(null, il.points.map(p => p[1])), base = il.base || 0, W = 300, H = 150, n = il.points.length, bw = W / n;
      h += '<svg viewBox="0 0 ' + W + ' ' + (H + 34) + '" style="width:100%;height:auto" role="img" aria-label="' + esc(il.titre) + '">' +
        il.points.map((p, i) => {
          const hh = Math.max(3, (H - 18) * (p[1] - base) / (max - base)), x = i * bw + 4, y = H - hh;
          return '<rect x="' + x + '" y="' + y + '" width="' + (bw - 8) + '" height="' + hh + '" rx="5" fill="' + (i === n - 1 ? '#FF8A00' : '#0B7F3D') + '"/>' +
            '<text x="' + (x + (bw - 8) / 2) + '" y="' + (y - 4) + '" font-size="11" font-weight="700" text-anchor="middle" fill="#1B1B2F">' + nb(p[1], 1) + '</text>' +
            '<text x="' + (x + (bw - 8) / 2) + '" y="' + (H + 16) + '" font-size="11" text-anchor="middle" fill="#5F6170">' + esc(p[0]) + '</text>';
        }).join('') + '</svg><span class="petit" style="margin-top:-6px">En ' + esc(il.unite === '%' ? '% par an' : 'euros') + (base ? ' (l\'échelle commence à ' + base + ')' : '') + '</span>';
    } else if (il.type === 'paquets') {
      const pk = (o) => nb(o.prix / (o.poids / 1000)) + ' €/kg';
      const box = (o, t, c) => '<div class="paquet" style="height:' + Math.round(o.poids / 2.2) + 'px;background:' + c + '"><strong>' + o.poids + ' g</strong><span>' + nb(o.prix) + ' €</span></div>' +
        '<span class="petit" style="text-align:center">' + t + '<br><strong style="color:var(--encre)">' + pk(o) + '</strong></span>';
      const hausse = Math.round(((il.apres.prix / il.apres.poids) / (il.avant.prix / il.avant.poids) - 1) * 100);
      h += '<div class="grille2" style="align-items:end"><div class="pile" style="gap:6px;align-items:center">' + box(il.avant, 'Avant', 'var(--vert-clair)') + '</div>' +
        '<div class="pile" style="gap:6px;align-items:center">' + box(il.apres, 'Après', 'var(--orange-clair)') + '</div></div>' +
        '<div class="carte-rouge" style="text-align:center;font-weight:700">Même prix, mais +' + hausse + ' % au kilo !</div>';
    } else if (il.type === 'marques') {
      h += '<div class="pile" style="gap:0">' + il.lignes.map(x =>
        '<div class="ligne-marque"><div style="flex:1;min-width:0"><strong style="font-size:14px">' + esc(x.entreprise) + '</strong><div class="petit">' + esc(x.marques) + '</div></div>' +
        '<span class="pastille ' + (/non cot/i.test(x.bourse) ? 'neutre' : 'ok') + '" style="white-space:normal;text-align:right;max-width:46%">' + esc(x.bourse) + '</span></div>').join('') + '</div>';
    } else if (il.type === 'parts') {
      const max = Math.max.apply(null, il.lignes.map(x => x.val));
      h += il.lignes.map(x => '<div class="pile" style="gap:3px"><div class="ligne entre"><span style="font-size:13px;font-weight:600">' + esc(x.nom) + '</span><span class="petit" style="font-weight:700;color:var(--encre)">' + nb(x.val, 1) + esc(il.unite || '') + '</span></div>' +
        '<div class="barre claire"><div style="width:' + MM.pct(x.val, max) + '%"></div></div></div>').join('');
    }
    if (il.note) h += '<span class="petit">' + esc(il.note) + '</span>';
    return h + '</div>';
  }
  MM.htmlIllus = htmlIllus;

  /* ----- Simulateur ----- */
  function sim() {
    const a = AR();
    if (!a.sim) {
      const ep = MM.epargne ? MM.epargne(E.user.id).total : 0;
      a.sim = { depart: Math.round(ep), mensuel: 10, annees: 10, taux: 7 };
    }
    return a.sim;
  }
  function calcul(s) {
    let v = s.depart, verse = s.depart;
    const pts = [{ an: 0, v, verse }];
    const tm = s.taux / 100 / 12;
    for (let an = 1; an <= s.annees; an++) {
      for (let m = 0; m < 12; m++) { v = v * (1 + tm) + s.mensuel; verse += s.mensuel; }
      pts.push({ an, v, verse });
    }
    return pts;
  }
  function vueSimulateur() {
    const s = sim();
    E.pause = true;
    const ep = MM.epargne ? MM.epargne(E.user.id).total : 0;
    let h = '<div class="carte-verte pile" style="gap:4px"><strong style="font-size:18px">⏳ La machine à voir le futur</strong><span style="font-size:14px">Et si tu continuais à épargner ? Bouge les curseurs pour voir l\'effet boule de neige.</span></div>';
    h += '<div class="carte pile" style="margin-top:10px">' +
      curseur('depart', 'Je pars de', 0, Math.max(500, Math.ceil(ep / 100) * 100 + 200), 5, s.depart, ' €', ep ? 'Ton épargne actuelle : ' + MM.euros(ep) : '') +
      curseur('mensuel', 'J\'ajoute chaque mois', 0, 100, 1, s.mensuel, ' €') +
      curseur('annees', 'Pendant', 1, 40, 1, s.annees, ' ans') +
      '<div class="pile" style="gap:6px"><span class="petit" style="font-weight:600">Rendement moyen par an (hypothèse)</span><div class="choix">' +
      [[2, 'Livret ~2 %'], [4, 'Prudent ~4 %'], [7, 'Actions monde ~7 %']].map(x =>
        '<button class="puce' + (s.taux === x[0] ? ' active' : '') + '" data-action="ar-taux" data-t="' + x[0] + '">' + x[1] + '</button>').join('') + '</div></div></div>';
    h += '<div id="sim-resultat">' + resultatSim(s) + '</div>';
    h += '<p class="petit">Simulation simplifiée avec un rendement régulier. En vrai, les placements en actions montent et baissent d\'une année à l\'autre, et rien n\'est garanti. Ce n\'est pas un conseil d\'investissement.</p>';
    return h;
  }
  function curseur(nom, label, min, max, pas, val, unite, aide) {
    return '<label class="champ">' + label + ' : <span id="val-' + nom + '" style="color:var(--encre);font-size:16px">' + val + unite + '</span>' +
      '<input type="range" class="curseur" data-sim="' + nom + '" data-unite="' + unite + '" min="' + min + '" max="' + max + '" step="' + pas + '" value="' + val + '">' +
      (aide ? '<span class="petit" style="font-weight:400">' + esc(aide) + '</span>' : '') + '</label>';
  }
  function resultatSim(s) {
    const pts = calcul(s), fin = pts[pts.length - 1], gains = fin.v - fin.verse;
    return '<div class="grille3" style="margin-top:10px">' +
      bloc(MM.euros(Math.round(fin.verse)), 'versés') + bloc(MM.euros(Math.round(gains)), 'gagnés', 'var(--ok)') + bloc(MM.euros(Math.round(fin.v)), 'au total', 'var(--vert)') + '</div>' +
      '<div class="carte" style="margin-top:10px">' + graphique(pts.map(p => p.v), pts.map(p => p.verse), s.annees, 'Valeur estimée', 'Argent versé') + '</div>';
  }
  function bloc(v, t, coul) { return '<div class="carte" style="text-align:center;padding:10px 4px"><div style="font-family:var(--titre);font-weight:800;font-size:18px;color:' + (coul || 'var(--encre)') + '">' + v + '</div><div class="petit">' + t + '</div></div>'; }
  function brancherSimulateur() {
    document.querySelectorAll('[data-sim]').forEach(inp => {
      inp.oninput = () => {
        const s = sim(); s[inp.dataset.sim] = Number(inp.value);
        document.getElementById('val-' + inp.dataset.sim).textContent = inp.value + inp.dataset.unite;
        document.getElementById('sim-resultat').innerHTML = resultatSim(s);
      };
    });
  }

  // Petit graphique SVG à deux courbes
  function graphique(a, b, annees, nomA, nomB) {
    const W = 320, H = 170, g = 34, d = 10, hHaut = 10, bas = 24;
    const max = Math.max.apply(null, a.concat(b)) || 1, n = a.length - 1 || 1;
    const x = i => g + (W - g - d) * i / n, y = v => hHaut + (H - hHaut - bas) * (1 - v / max);
    const ligne = (t) => t.map((v, i) => (i ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(v).toFixed(1)).join(' ');
    const aire = ligne(a) + ' L' + x(n) + ' ' + y(0) + ' L' + x(0) + ' ' + y(0) + ' Z';
    const fmt = v => v >= 1000 ? Math.round(v / 1000) + 'k' : Math.round(v);
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" style="width:100%;height:auto" role="img" aria-label="' + esc(nomA) + ' et ' + esc(nomB) + ' au fil des années">' +
      [0, 0.5, 1].map(f => '<line x1="' + g + '" x2="' + (W - d) + '" y1="' + y(max * f) + '" y2="' + y(max * f) + '" stroke="#EFE6C8"/><text x="' + (g - 4) + '" y="' + (y(max * f) + 4) + '" font-size="10" text-anchor="end" fill="#5F6170">' + fmt(max * f) + '</text>').join('') +
      '<path d="' + aire + '" fill="#DDF5D0"/><path d="' + ligne(a) + '" fill="none" stroke="#0B7F3D" stroke-width="3" stroke-linejoin="round"/>' +
      '<path d="' + ligne(b) + '" fill="none" stroke="#FF8A00" stroke-width="2.5" stroke-dasharray="6 4"/>' +
      '<text x="' + g + '" y="' + (H - 6) + '" font-size="10" fill="#5F6170">Aujourd\'hui</text><text x="' + (W - d) + '" y="' + (H - 6) + '" font-size="10" text-anchor="end" fill="#5F6170">dans ' + annees + ' ans</text></svg>' +
      '<div class="ligne" style="gap:14px;font-size:12px;margin-top:4px"><span><span style="display:inline-block;width:14px;height:3px;background:#0B7F3D;vertical-align:middle"></span> ' + esc(nomA) + '</span><span><span style="display:inline-block;width:14px;height:3px;background:#FF8A00;vertical-align:middle"></span> ' + esc(nomB) + '</span></div>';
  }

  /* ----- Mini-jeu « Tempête en bourse » ----- */
  function nouveauJeu() {
    const r = [];
    for (let i = 0; i < 20; i++) {
      // tirage autour de +7 %/an avec de fortes variations
      const u = Math.random() + Math.random() + Math.random() - 1.5; // ≈ normale
      r.push(Math.max(-35, Math.min(38, Math.round(7 + u * 28))));
    }
    const k = 3 + Math.floor(Math.random() * 9);       // un krach entre la 4e et la 12e année
    r[k] = -(28 + Math.floor(Math.random() * 12));
    r[k + 1] = 18 + Math.floor(Math.random() * 14);    // suivi d'un fort rebond
    return { an: 0, valeur: 1000, tortue: 1000, investi: true, r, hist: [1000], histT: [1000], ventes: 0, dernier: null };
  }
  function titreAnnee(p) {
    if (p <= -25) return '📉 Krach ! Tout le monde panique, les journaux parlent de catastrophe…';
    if (p <= -8) return '😟 Mauvaise année : la bourse recule.';
    if (p < 0) return '😐 Petite baisse.';
    if (p >= 25) return '🚀 Année record ! Tout le monde veut acheter.';
    if (p >= 10) return '😊 Belle année pour la bourse.';
    return '🙂 La bourse progresse tranquillement.';
  }
  function vueTempete() {
    const a = AR(), j = a.jeu;
    E.pause = true;
    if (!j) {
      return '<div class="carte-sombre pile"><strong style="font-size:20px">🌪️ Tempête en bourse</strong>' +
        '<span style="font-size:14px;line-height:1.5">Tu places 1 000 € (pour de faux !) en actions du monde entier. Chaque année, la bourse monte ou descend. À toi de décider : tu gardes ou tu vends tout ?</span>' +
        '<span style="font-size:14px;line-height:1.5">En face, une tortue 🐢 garde ses placements pendant 20 ans sans jamais rien toucher. Qui finira avec le plus d\'argent ?</span>' +
        '<button class="btn btn-orange" data-action="ar-jeu-start">Lancer la partie</button></div>' +
        '<p class="petit">Jeu de simulation avec des années tirées au hasard, inspirées du comportement réel des marchés. Pas de points à gagner : juste de l\'entraînement !</p>';
    }
    let h = '<div class="ligne entre" style="margin-bottom:8px"><strong>Année ' + j.an + ' / 20</strong><button class="btn btn-contour btn-petit" data-action="ar-jeu-start">Recommencer</button></div>';
    if (j.dernier !== null) {
      h += '<div class="carte-' + (j.dernier < 0 ? 'rouge' : 'jaune') + ' pile" style="gap:4px"><strong style="font-size:22px">' + (j.dernier > 0 ? '+' : '') + j.dernier + ' %</strong><span>' + titreAnnee(j.dernier) + '</span>' +
        (!j.investi ? '<span class="petit" style="color:inherit">Tu étais à l\'abri : ton argent n\'a pas bougé.</span>' : '') + '</div>';
    }
    h += '<div class="grille2" style="margin-top:10px">' + bloc(MM.euros(Math.round(j.valeur)), 'toi ' + (j.investi ? '(investie)' : '(à l\'abri)'), 'var(--vert)') + bloc(MM.euros(Math.round(j.tortue)), '🐢 la tortue', 'var(--orange-texte)') + '</div>';
    h += '<div class="carte" style="margin-top:10px">' + graphique(j.hist, j.histT, j.an || 1, 'Toi', 'La tortue') + '</div>';
    if (j.an >= 20) {
      const gagne = j.valeur >= j.tortue - 0.5;
      h += '<div class="carte-verte pile" style="margin-top:10px"><strong style="font-size:18px">' + (gagne ? '🏆 Bravo, tu as tenu bon !' : '🐢 La tortue a gagné…') + '</strong><span>' +
        (gagne ? 'Tu termines avec ' + MM.euros(Math.round(j.valeur)) + '. Garder son calme pendant les tempêtes, c\'est le secret des investisseurs à long terme.'
          : 'Tu termines avec ' + MM.euros(Math.round(j.valeur)) + ' contre ' + MM.euros(Math.round(j.tortue)) + ' pour la tortue. En vendant pendant les baisses, on rate souvent les remontées.') + '</span>' +
        '<span class="petit">' + j.ventes + ' vente' + (j.ventes > 1 ? 's' : '') + ' en panique pendant la partie.</span>' +
        '<button class="btn btn-orange" data-action="ar-jeu-start">Rejouer</button></div>';
    } else {
      h += '<div class="grille2" style="margin-top:12px">' + (j.investi
        ? '<button class="btn btn-vert" data-action="ar-jeu" data-c="garder">Je garde 💪</button><button class="btn btn-rouge" data-action="ar-jeu" data-c="vendre">Je vends tout 😱</button>'
        : '<button class="btn btn-contour" data-action="ar-jeu" data-c="abri">Je reste à l\'abri</button><button class="btn btn-vert" data-action="ar-jeu" data-c="racheter">Je réinvestis</button>') + '</div>';
    }
    return h;
  }

  /* ----- Objectif d'achat ----- */
  function vueObjectif() {
    const a = AR(), o = (E.objectifs || []).find(x => x.enfant_id === E.user.id);
    if (!o || a.editObjectif) {
      E.pause = true;
      return '<form id="form-objectif" class="carte pile"><strong style="font-size:18px">🎯 ' + (o ? 'Modifier mon objectif' : 'Mon objectif d\'achat') + '</strong>' +
        '<span class="petit">Choisis quelque chose que tu veux t\'offrir avec ton argent de poche, et suis ta progression.</span>' +
        '<label class="champ">Ce que je veux<input type="text" name="libelle" maxlength="60" required value="' + esc(o ? o.libelle : '') + '" placeholder="Ex. : un casque audio"></label>' +
        '<div class="grille2"><label class="champ">Prix (€)<input type="number" name="montant" min="1" step="1" inputmode="numeric" required value="' + (o ? Number(o.montant) : '') + '"></label>' +
        '<label class="champ">Déjà de côté (€)<input type="number" name="epargne" min="0" step="1" inputmode="numeric" value="' + (o ? Number(o.epargne) : 0) + '"></label></div>' +
        '<div class="grille2">' + (o ? '<button type="button" class="btn btn-contour" data-action="ar-objectif-annuler">Annuler</button>' : '<span></span>') + '<button type="submit" class="btn btn-vert">Enregistrer</button></div></form>';
    }
    const pct = MM.pct(Number(o.epargne), Number(o.montant)), reste = Math.max(0, Number(o.montant) - Number(o.epargne));
    let h = '<div class="carte-verte pile"><span class="petit">Mon objectif</span><strong style="font-family:var(--titre);font-size:24px">' + esc(o.libelle) + '</strong>' +
      '<div class="ligne" style="align-items:baseline;gap:8px"><span class="gros-chiffre" style="font-size:40px">' + MM.euros(Number(o.epargne)) + '</span><span>/ ' + MM.euros(Number(o.montant)) + '</span></div>' +
      '<div class="barre"><div style="width:' + pct + '%"></div></div>' +
      '<span>' + (reste <= 0 ? '🎉 Objectif atteint ! Tu peux te l\'offrir… ou garder l\'argent si l\'envie est passée.' : 'Encore ' + MM.euros(reste) + '. ' + rythme(reste)) + '</span></div>';
    h += '<h2>J\'ai mis de côté</h2><div class="grille3">' + [1, 5, 10].map(v => '<button class="btn btn-clair" data-action="ar-objectif-plus" data-v="' + v + '">+' + v + ' €</button>').join('') + '</div>' +
      '<div class="grille2" style="margin-top:10px"><button class="btn btn-contour" data-action="ar-objectif-plus" data-v="-5">−5 €</button><button class="btn btn-contour" data-action="ar-objectif-edit">Modifier</button></div>' +
      '<button class="btn btn-contour btn-plein" style="margin-top:10px;border-color:var(--rouge);color:var(--rouge)" data-action="ar-objectif-suppr">Supprimer cet objectif</button>';
    return h;
  }
  function rythme(reste) {
    return 'À 5 € par semaine, il te faut environ ' + Math.ceil(reste / 5) + ' semaine' + (Math.ceil(reste / 5) > 1 ? 's' : '') + '.';
  }

  /* ----- Défis ----- */
  function vueDefis() {
    const d = window.MM_DEFIS[new Date().getMonth()];
    const mois = new Date().toLocaleDateString('fr-FR', { month: 'long' });
    let h = MM.htmlPointsSemaine();
    h += '<div class="carte-jaune pile" style="margin-top:12px;gap:6px"><span class="petit" style="color:var(--encre);font-weight:700">LE DÉFI DE ' + esc(mois.toUpperCase()) + '</span>' +
      '<strong style="font-size:20px;font-family:var(--titre)">' + esc(d.titre) + '</strong><span style="font-size:14px;line-height:1.45">' + esc(d.texte) + '</span>' +
      '<span class="petit" style="color:var(--encre)">Réserve la mission « Défi argent du mois » ci-dessous, relève le défi, puis raconte-le.</span></div>';
    h += MM.htmlMissionsCategorie('argent');
    return h;
  }

  /* ---------- Actions ---------- */
  MM.actions['ar-vue'] = async (b) => { const a = AR(); a.vue = b.dataset.vue; a.lecon = null; MM.afficher(); window.scrollTo(0, 0); };
  MM.actions['ar-lecon'] = async (b) => { AR().lecon = b.dataset.id; MM.afficher(); window.scrollTo(0, 0); };
  MM.actions['ar-retour'] = async () => { AR().lecon = null; MM.afficher(); window.scrollTo(0, 0); };
  MM.actions['ar-quiz'] = async (b) => {
    const l = window.MM_LECONS.find(x => x.id === b.dataset.id);
    const cx = l.perso ? MM.ctxPlan() : null, T = (x) => cx ? MM.tpl(x, cx) : x;
    const questions = l.quiz.map(q => { const cs = q.c.map(T), c = MM.melanger(cs); return { q: T(q.q), c, r: c.indexOf(cs[q.r]), e: T(q.e) }; });
    MM.lancerQuiz('Quiz · ' + l.titre, questions, async (score, total) => {
      await MM.envoyerQuiz('lecon', 'lecon:' + l.id, score, total, 'Leçon d\'argent : ' + l.titre);
    });
  };
  MM.actions['ar-bonus-niveau'] = async (b) => {
    const n = window.MM_NIVEAUX_ARGENT.find(x => x.id === b.dataset.id);
    await MM.envoyerQuiz('niveau', 'niveau:' + n.id, 1, 1, 'Niveau « ' + n.nom + ' » terminé');
  };
  MM.actions['ar-taux'] = async (b) => { sim().taux = Number(b.dataset.t); MM._gardeScroll = true; MM.afficher(); };
  MM.actions['ar-jeu-start'] = async () => { AR().jeu = nouveauJeu(); MM._gardeScroll = true; MM.afficher(); };
  MM.actions['ar-jeu'] = async (b) => {
    const j = AR().jeu; if (!j || j.an >= 20) return;
    const c = b.dataset.c;
    if (c === 'vendre') { j.investi = false; j.ventes++; }
    if (c === 'racheter') j.investi = true;
    const p = j.r[j.an];
    j.tortue *= 1 + p / 100;
    if (j.investi) j.valeur *= 1 + p / 100;
    j.an++; j.dernier = p;
    j.hist.push(j.valeur); j.histT.push(j.tortue);
    MM._gardeScroll = true; MM.afficher();
  };
  MM.actions['ar-objectif-edit'] = async () => { AR().editObjectif = true; MM.afficher(); };
  MM.actions['ar-objectif-annuler'] = async () => { AR().editObjectif = false; MM.afficher(); };
  MM.actions['ar-objectif-plus'] = async (b) => {
    const o = (E.objectifs || []).find(x => x.enfant_id === E.user.id); if (!o) return;
    const v = Math.max(0, Number(o.epargne) + Number(b.dataset.v));
    await MM.rpc('definir_objectif', { p_libelle: o.libelle, p_montant: Number(o.montant), p_epargne: v }, Number(b.dataset.v) > 0 ? 'Bien joué, la jauge monte !' : 'Mis à jour.');
  };
  MM.actions['ar-objectif-suppr'] = async () => {
    if (!confirm('Supprimer ton objectif ?')) return;
    await MM.rpc('definir_objectif', { p_libelle: '', p_montant: 0, p_epargne: 0 }, 'Objectif supprimé.');
  };
  document.addEventListener('submit', async (e) => {
    if (e.target.id !== 'form-objectif') return;
    e.preventDefault();
    const f = e.target;
    try {
      await MM.rpc('definir_objectif', { p_libelle: f.libelle.value.trim(), p_montant: Number(f.montant.value), p_epargne: Number(f.epargne.value) || 0 }, 'Objectif enregistré !');
      AR().editObjectif = false; MM.afficher();
    } catch (err) { /* déjà signalé */ }
  });
})();
