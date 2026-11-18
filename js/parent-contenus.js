/* Mission Maison — espace parents : relecture et validation des fiches métiers et des leçons d'argent */
(function () {
  const MM = window.MM, esc = MM.esc, E = MM.etat;
  const CT = () => (E.ct || (E.ct = { type: 'metier', filtre: 'attente', liste: null, idx: 0, ouvert: null, exporter: false }));

  function items(type) {
    if (type === 'lecon') {
      const N = window.MM_NIVEAUX_ARGENT;
      return window.MM_LECONS.map(l => ({ ref: 'lecon:' + l.id, v: l.v, titre: l.emoji + ' ' + l.titre, groupe: N.find(n => l.id.indexOf(n.id + '-') === 0).nom, objet: l }));
    }
    return window.MM_METIERS.map(m => ({ ref: 'metier:' + m.id, v: m.v, titre: m.n + (m.a ? ' ⭐' : ''), groupe: MM.univers(m.u).emoji + ' ' + MM.univers(m.u).nom, objet: m }));
  }
  function statut(it) {
    const d = MM.decisionContenu(it.ref);
    if (!d || d.version !== it.v) return 'attente';
    return d.statut === 'valide' ? 'valide' : 'corriger';
  }
  MM.contenusEnAttente = function () {
    if (!E.migrationAvenir) return 0;
    return items('metier').concat(items('lecon')).filter(it => statut(it) === 'attente').length;
  };

  MM.vues.contenus = function () {
    const c = CT();
    if (c.liste) return vueRelecture();
    let h = '<div class="entete"><div><div class="sous-titre">' + esc(E.profil.prenom) + ' · espace parents</div><h1>Fiches à relire</h1></div>' +
      '<button class="avatar" style="background:var(--orange);color:var(--encre)" data-action="deconnexion" aria-label="Se déconnecter">' + esc(E.profil.prenom.charAt(0)) + '</button></div>';
    if (!E.migrationAvenir) return h + MM.htmlMigrationManquante();

    const resume = (type) => {
      const t = items(type), n = { valide: 0, corriger: 0, attente: 0 };
      t.forEach(it => n[statut(it)]++);
      return n;
    };
    const rm = resume('metier'), rl = resume('lecon');
    h += '<div class="carte-jaune pile" style="gap:4px"><strong>Comment ça marche</strong><span style="font-size:13px;line-height:1.45">Les filles ne voient une fiche ou une leçon qu\'après ta validation. Ouvre une fiche, lis-la comme elles la verront, puis ✅ Valider ou ✏️ À corriger avec ton commentaire. Je corrige ensuite et la fiche revient ici.</span></div>';
    h += '<div class="grille2" style="margin-top:10px">' +
      bilan('Métiers', rm, 200) + bilan('Leçons d\'argent', rl, window.MM_LECONS.length) + '</div>';

    h += '<div class="grille2" style="background:#fff;padding:4px;border-radius:14px;margin-top:12px">' + [['metier', 'Métiers'], ['lecon', 'Leçons']].map(x =>
      '<button class="btn ' + (c.type === x[0] ? 'btn-vert' : '') + '" style="' + (c.type === x[0] ? '' : 'background:transparent;color:var(--gris)') + '" data-action="ct-type" data-t="' + x[0] + '">' + x[1] + '</button>').join('') + '</div>';
    const r = c.type === 'lecon' ? rl : rm;
    h += '<div class="choix" style="margin-top:10px">' + [['attente', 'À relire', r.attente], ['corriger', 'À corriger', r.corriger], ['valide', 'Validées', r.valide]].map(x =>
      '<button class="puce' + (c.filtre === x[0] ? ' active' : '') + '" data-action="ct-filtre" data-f="' + x[0] + '">' + x[1] + ' (' + x[2] + ')</button>').join('') + '</div>';

    if (rm.corriger + rl.corriger) {
      h += '<button class="btn btn-orange btn-plein" style="margin-top:10px" data-action="ct-exporter">📋 Préparer la liste des corrections pour Claude</button>';
      if (c.exporter) h += '<div class="carte pile" style="margin-top:8px"><span class="petit">Copie ce texte et colle-le dans ta conversation avec Claude :</span><textarea id="ct-export" rows="6" readonly>' + esc(texteCorrections()) + '</textarea>' +
        '<button class="btn btn-vert" data-action="ct-copier">Copier</button></div>';
    }

    const liste = items(c.type).filter(it => statut(it) === c.filtre);
    if (!liste.length) return h + '<div class="vide" style="margin-top:12px">' + (c.filtre === 'attente' ? 'Tout est relu ici. Bravo ! 🎉' : 'Rien ici.') + '</div>';
    h += '<button class="btn btn-vert btn-plein" style="margin-top:12px" data-action="ct-relire" data-ref="' + liste[0].ref + '">▶ Relire une par une (' + liste.length + ')</button>';
    const groupes = [];
    liste.forEach(it => { let g = groupes.find(x => x.nom === it.groupe); if (!g) groupes.push(g = { nom: it.groupe, items: [] }); g.items.push(it); });
    h += '<div class="pile" style="margin-top:12px">';
    groupes.forEach(g => {
      const ouvert = c.ouvert === g.nom;
      h += '<div class="carte" style="padding:0;overflow:hidden"><button class="ligne entre univers-tete" data-action="ct-groupe" data-g="' + esc(g.nom) + '"><strong>' + esc(g.nom) + '</strong><span class="petit">' + g.items.length + (ouvert ? ' ▲' : ' ▼') + '</span></button>';
      if (ouvert) {
        h += g.items.map(it => {
          const d = MM.decisionContenu(it.ref);
          return '<button class="ligne-metier" data-action="ct-relire" data-ref="' + it.ref + '"><span style="flex:1;text-align:left">' + esc(it.titre) +
            (c.filtre === 'corriger' && d && d.commentaire ? '<span class="petit" style="display:block;color:#991B1B">✏️ ' + esc(d.commentaire) + '</span>' : '') +
            (c.filtre === 'attente' && d && d.version !== it.v ? '<span class="petit" style="display:block;color:var(--orange-texte)">Corrigée depuis ta dernière lecture</span>' : '') + '</span><span class="petit">›</span></button>';
        }).join('');
        if (c.filtre === 'attente') h += '<div style="padding:10px"><button class="btn btn-contour btn-plein btn-petit" data-action="ct-tout-valider" data-g="' + esc(g.nom) + '">✅ J\'ai tout relu : valider ces ' + g.items.length + '</button></div>';
      }
      h += '</div>';
    });
    return h + '</div>';
  };
  function bilan(nom, n, total) {
    return '<div class="carte pile" style="gap:4px"><strong>' + nom + '</strong><div class="barre claire"><div style="width:' + MM.pct(n.valide, total) + '%"></div></div>' +
      '<span class="petit">✅ ' + n.valide + ' validées · ✏️ ' + n.corriger + ' · ⏳ ' + n.attente + '</span></div>';
  }

  MM.htmlMigrationManquante = function () {
    return '<div class="carte-rouge pile"><strong>Une étape à faire dans Supabase</strong><span style="font-size:14px;line-height:1.45">Pour activer « Mon avenir » et « Mon argent », ouvre Supabase › SQL Editor, colle le contenu du fichier <code>supabase/avenir-argent.sql</code> et clique sur Run. Ensuite, recharge l\'appli.</span></div>';
  };

  /* ----- Relecture une par une ----- */
  function vueRelecture() {
    E.pause = true;
    const c = CT(), ref = c.liste[c.idx], tous = items(c.type), it = tous.find(x => x.ref === ref);
    if (!it) { c.liste = null; return MM.vues.contenus(); }
    const d = MM.decisionContenu(ref), st = statut(it);
    let h = '<div class="ligne entre" style="margin-bottom:10px"><button class="btn btn-contour btn-petit" data-action="ct-fermer">← Liste</button>' +
      '<span class="petit" style="font-weight:700">' + (c.idx + 1) + ' / ' + c.liste.length + '</span>' +
      '<div class="ligne" style="gap:6px"><button class="btn-icone" data-action="ct-nav" data-d="-1" aria-label="Précédente"' + (c.idx === 0 ? ' disabled' : '') + '>‹</button>' +
      '<button class="btn-icone" data-action="ct-nav" data-d="1" aria-label="Suivante"' + (c.idx + 1 >= c.liste.length ? ' disabled' : '') + '>›</button></div></div>';
    h += '<div class="ligne" style="margin-bottom:8px"><span class="pastille ' + (st === 'valide' ? 'ok' : st === 'corriger' ? 'moins' : 'attente') + '">' +
      (st === 'valide' ? '✅ Validée' : st === 'corriger' ? '✏️ À corriger' : '⏳ À relire') + '</span>' +
      (d && d.version !== it.v ? '<span class="petit">Texte corrigé depuis ta dernière lecture</span>' : '') + '</div>';
    if (c.type === 'lecon') {
      const lo = it.objet, cx = lo.perso ? MM.ctxPlan(window.MM_PLAN.exemple) : null, T = (x) => cx ? MM.tpl(x, cx) : x;
      if (cx) h += '<div class="carte-jaune petit" style="margin-bottom:8px;color:var(--encre)">Leçon personnalisée : chaque fille voit ses propres chiffres. Ci-dessous, la version de ' + esc(cx.prenom) + '.</div>';
      h += MM.htmlLecon(lo, cx);
      if (cx) Object.keys(window.MM_PLAN.ages).filter(p => p !== cx.prenom).forEach(p => {
        h += '<details class="carte" style="margin-top:10px"><summary style="font-weight:700;cursor:pointer">Voir la version de ' + esc(p) + '</summary>' + MM.htmlLecon(lo, MM.ctxPlan(p)) + '</details>';
      });
      h += '<h2>Le quiz (bonnes réponses en vert)</h2><div class="pile">' + lo.quiz.map((q, i) =>
        '<div class="carte pile" style="gap:6px"><strong style="font-size:14px">' + (i + 1) + '. ' + esc(T(q.q)) + '</strong>' +
        q.c.map((x, j) => '<span style="font-size:13px;padding:4px 8px;border-radius:8px;' + (j === q.r ? 'background:var(--ok-clair);color:var(--ok);font-weight:700' : '') + '">' + esc(T(x)) + '</span>').join('') +
        '<span class="petit">' + esc(T(q.e)) + '</span></div>').join('') + '</div>';
    } else {
      h += MM.htmlFicheMetier(it.objet, { toutVoir: true });
      const ex = (MM._quizExemple = MM._quizExemple || {});
      if (!ex[it.ref]) ex[it.ref] = MM.quizFiche(it.objet, true);
      h += '<h2>Exemple de quiz (bonnes réponses en vert)</h2>' +
        '<p class="petit" style="margin-top:-4px">Le quiz est fabriqué à partir de la fiche : les questions et les mauvaises réponses changent un peu à chaque fois. Lili a une question sur les spécialités de 1re, Romy une question sur les qualités utiles.</p>' +
        '<div class="pile">' + ex[it.ref].map((q, i) =>
        '<div class="carte pile" style="gap:6px"><strong style="font-size:14px">' + (i + 1) + '. ' + esc(q.q) + '</strong>' +
        q.c.map((x, j) => '<span style="font-size:13px;padding:4px 8px;border-radius:8px;' + (j === q.r ? 'background:var(--ok-clair);color:var(--ok);font-weight:700' : '') + '">' + esc(x) + '</span>').join('') +
        '<span class="petit">' + esc(q.e || '') + '</span></div>').join('') + '</div>';
    }
    h += '<div class="carte pile" style="margin-top:12px;border:2px solid var(--vert)"><label class="champ">Ton commentaire (obligatoire pour « À corriger »)' +
      '<textarea id="ct-commentaire" rows="3" placeholder="Ex. : le salaire de début me paraît trop haut">' + esc(d && d.statut === 'a_corriger' && d.version === it.v ? d.commentaire || '' : '') + '</textarea></label>' +
      '<div class="grille2"><button class="btn btn-contour" data-action="ct-decider" data-ok="0">✏️ À corriger</button>' +
      '<button class="btn btn-vert" data-action="ct-decider" data-ok="1">✅ Valider</button></div></div>';
    return h;
  }

  function texteCorrections() {
    const lignes = [];
    ['metier', 'lecon'].forEach(type => items(type).forEach(it => {
      if (statut(it) !== 'corriger') return;
      const d = MM.decisionContenu(it.ref);
      lignes.push('- ' + (type === 'metier' ? 'Métier' : 'Leçon') + ' « ' + it.titre.replace(' ⭐', '') + ' » (' + it.ref + ') : ' + (d.commentaire || ''));
    }));
    return 'Corrections Mission Maison à faire :\n' + lignes.join('\n');
  }

  async function decider(ref, v, ok, commentaire) {
    const { error } = await MM.sb.rpc('decider_contenu', { p_ref: ref, p_version: v, p_ok: ok, p_commentaire: commentaire || null });
    if (error) { MM.erreur(error); return false; }
    E.contenus = (E.contenus || []).filter(x => x.ref !== ref);
    E.contenus.push({ ref, version: v, statut: ok ? 'valide' : 'a_corriger', commentaire: ok ? null : commentaire, decide_par: E.user.id, decide_at: new Date().toISOString() });
    return true;
  }

  MM.actions['ct-type'] = async (b) => { const c = CT(); c.type = b.dataset.t; c.ouvert = null; MM.afficher(); };
  MM.actions['ct-filtre'] = async (b) => { const c = CT(); c.filtre = b.dataset.f; c.ouvert = null; MM._gardeScroll = true; MM.afficher(); };
  MM.actions['ct-groupe'] = async (b) => { const c = CT(); c.ouvert = c.ouvert === b.dataset.g ? null : b.dataset.g; MM._gardeScroll = true; MM.afficher(); };
  MM.actions['ct-relire'] = async (b) => {
    const c = CT(), liste = items(c.type).filter(it => statut(it) === c.filtre).map(it => it.ref);
    c.liste = liste; c.idx = Math.max(0, liste.indexOf(b.dataset.ref)); c.retourScroll = window.scrollY;
    MM.afficher(); window.scrollTo(0, 0);
  };
  MM.actions['ct-fermer'] = async () => { const c = CT(); c.liste = null; MM.afficher(); window.scrollTo(0, c.retourScroll || 0); };
  MM.actions['ct-nav'] = async (b) => {
    const c = CT(); c.idx = Math.max(0, Math.min(c.liste.length - 1, c.idx + Number(b.dataset.d)));
    MM.afficher(); window.scrollTo(0, 0);
  };
  MM.actions['ct-decider'] = async (b) => {
    const c = CT(), ref = c.liste[c.idx], it = items(c.type).find(x => x.ref === ref), ok = b.dataset.ok === '1';
    const com = (document.getElementById('ct-commentaire') || {}).value || '';
    if (!ok && !com.trim()) { MM.toast('Écris ce qu\'il faut corriger.', true); return; }
    if (!(await decider(ref, it.v, ok, com.trim()))) return;
    MM.toast(ok ? 'Validée : les filles la voient maintenant.' : 'Notée « à corriger ».');
    if (c.idx + 1 < c.liste.length) c.idx++;
    else { c.liste = null; MM.toast('Fin de la liste. Merci pour ta relecture !'); }
    MM.afficher(); window.scrollTo(0, 0);
  };
  MM.actions['ct-tout-valider'] = async (b) => {
    const c = CT(), g = b.dataset.g;
    const liste = items(c.type).filter(it => statut(it) === 'attente' && it.groupe === g);
    if (!confirm('Valider les ' + liste.length + ' fiches de « ' + g + ' » ? Elles deviendront visibles pour les filles.')) return;
    const { error } = await MM.sb.rpc('valider_contenus', { p_items: liste.map(it => ({ ref: it.ref, v: it.v })) });
    if (error) return MM.erreur(error);
    MM.toast(liste.length + ' fiches validées.');
    await MM.charger(); MM._gardeScroll = true; MM.afficher();
  };
  MM.actions['ct-exporter'] = async () => { const c = CT(); c.exporter = !c.exporter; MM._gardeScroll = true; MM.afficher(); };
  MM.actions['ct-copier'] = async () => {
    const t = document.getElementById('ct-export');
    try { await navigator.clipboard.writeText(t.value); MM.toast('Copié ! Colle-le dans ta conversation avec Claude.'); }
    catch (e) { t.select(); document.execCommand('copy'); MM.toast('Copié.'); }
  };
})();
