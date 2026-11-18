/* Mission Maison — outils communs à « Mon avenir » et « Mon argent » :
   contenus validés, points de la semaine, moteur de quiz, missions « dans la vraie vie » */
(function () {
  const MM = window.MM, esc = MM.esc, E = MM.etat;
  MM.PLAFOND_APPLI = 10;

  /* ---------- Petits outils ---------- */
  MM.melanger = function (t) {
    const a = t.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  };
  MM.tirer = function (t, n) { return MM.melanger(t).slice(0, n); };
  MM.gras = function (s) { return esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'); };

  /* ---------- Contenus validés par les parents ---------- */
  MM.decisionContenu = function (ref) { return (E.contenus || []).find(c => c.ref === ref) || null; };
  MM.contenuValide = function (ref, v) {
    const d = MM.decisionContenu(ref);
    return !!d && d.statut === 'valide' && d.version === (v || 1);
  };
  MM.metiersVisibles = function () { return (window.MM_METIERS || []).filter(m => MM.contenuValide('metier:' + m.id, m.v)); };
  MM.leconsVisibles = function () { return (window.MM_LECONS || []).filter(l => MM.contenuValide('lecon:' + l.id, l.v)); };
  MM.metier = function (id) { return (window.MM_METIERS || []).find(m => m.id === id); };
  MM.univers = function (id) { return (window.MM_UNIVERS || []).find(u => u.id === id) || { nom: id, emoji: '•' }; };

  /* ---------- Suivi de chaque fille ---------- */
  MM.apprentissage = function (ref, enfant) {
    const id = enfant || E.user.id;
    return (E.apprentissages || []).find(a => a.enfant_id === id && a.ref === ref) || null;
  };
  MM.avis = function (metier, enfant) {
    const id = enfant || E.user.id;
    const a = (E.avis || []).find(x => x.enfant_id === id && x.metier === metier);
    return a ? a.avis : null;
  };
  MM.pointsAppliSemaine = function (enfant) {
    const id = enfant || E.user.id, debut = MM.debutPeriode('semaine');
    return (E.apprentissages || []).filter(a => a.enfant_id === id && new Date(a.created_at) >= debut).reduce((s, a) => s + a.points, 0);
  };
  MM.profilResultat = function (enfant) {
    const id = enfant || E.user.id;
    const l = (E.apprentissages || []).filter(a => a.enfant_id === id && a.type === 'profil' && a.reussi && a.details && a.details.top)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return l.length ? l[0].details : null;
  };

  MM.htmlPointsSemaine = function () {
    const max = MM.PLAFOND_APPLI, pts = Math.min(max, MM.pointsAppliSemaine());
    return '<div class="carte pile" style="gap:6px"><div class="ligne entre"><strong>Mes points de la semaine</strong><span class="pastille points">' + pts + ' / ' + max + '</span></div>' +
      '<div class="barre claire"><div style="width:' + MM.pct(pts, max) + '%"></div></div>' +
      '<span class="petit">' + (pts >= max ? 'Plafond atteint : tu peux continuer à apprendre, les points reviennent lundi.' : 'Fiches, leçons et quiz réussis : 10 points maximum par semaine.') + '</span></div>';
  };

  /* ---------- Moteur de quiz (fiches, leçons) ----------
     E.quiz = { titre, questions:[{q,c,r,e}], i, choisi, corrige, score, fin:function(score,total) } */
  MM.lancerQuiz = function (titre, questions, fin) {
    E.quiz = { titre, questions, i: 0, choisi: null, corrige: false, score: 0, fin };
    MM.afficher(); window.scrollTo(0, 0);
  };
  MM.htmlQuiz = function () {
    const z = E.quiz, q = z.questions[z.i];
    E.pause = true;
    let h = '<div class="entete"><div><div class="sous-titre">' + esc(z.titre) + '</div><h1>Question ' + (z.i + 1) + ' / ' + z.questions.length + '</h1></div>' +
      '<button class="btn btn-contour btn-petit" data-action="quiz-quitter">Quitter</button></div>' +
      '<div class="barre claire" style="margin-bottom:12px"><div style="width:' + MM.pct(z.i + (z.corrige ? 1 : 0), z.questions.length) + '%"></div></div>' +
      '<div class="question-carte"><strong style="font-size:17px;line-height:1.35">' + esc(q.q) + '</strong><div class="pile">';
    q.c.forEach((c, i) => {
      let cls = '';
      if (z.corrige) cls = i === q.r ? ' juste' : (i === z.choisi ? ' fausse' : '');
      else if (z.choisi === i) cls = ' choisie';
      h += '<button class="reponse' + cls + '" data-action="quiz-choix" data-i="' + i + '"' + (z.corrige ? ' disabled' : '') + '><span class="lettre">' + 'ABCD'[i] + '</span><span>' + esc(c) + '</span></button>';
    });
    h += '</div>';
    if (z.corrige) {
      const bon = z.choisi === q.r;
      h += '<div class="explication ' + (bon ? 'bon' : 'mauvais') + '"><strong>' + (bon ? 'Bonne réponse !' : 'Pas tout à fait.') + '</strong> ' + esc(q.e || '') + '</div>' +
        '<button class="btn btn-vert btn-plein" data-action="quiz-suivant">' + (z.i + 1 < z.questions.length ? 'Question suivante' : 'Voir mon résultat') + '</button>';
    } else {
      h += '<button class="btn btn-vert btn-plein" data-action="quiz-valider"' + (z.choisi === null ? ' disabled' : '') + '>Valider ma réponse</button>';
    }
    return h + '</div>';
  };
  MM.actions['quiz-choix'] = async (b) => { if (E.quiz && !E.quiz.corrige) { E.quiz.choisi = Number(b.dataset.i); MM.afficher(); } };
  MM.actions['quiz-valider'] = async () => {
    const z = E.quiz; if (!z || z.choisi === null) return;
    z.corrige = true; if (z.choisi === z.questions[z.i].r) z.score++;
    MM._gardeScroll = true; MM.afficher();
  };
  MM.actions['quiz-suivant'] = async () => {
    const z = E.quiz; if (!z) return;
    if (z.i + 1 < z.questions.length) { z.i++; z.choisi = null; z.corrige = false; MM.afficher(); window.scrollTo(0, 0); return; }
    const fin = z.fin, score = z.score, total = z.questions.length;
    E.quiz = null;
    await fin(score, total);
  };
  MM.actions['quiz-quitter'] = async () => {
    if (!confirm('Quitter le quiz ? Il ne sera pas compté.')) return;
    E.quiz = null; MM.afficher();
  };
  // Envoie le résultat à la base et affiche le bon message
  MM.envoyerQuiz = async function (type, ref, score, total, libelle, details) {
    let res;
    try {
      const { data, error } = await MM.sb.rpc('valider_quiz', { p_type: type, p_ref: ref, p_score: score, p_total: total, p_libelle: libelle, p_details: details || null });
      if (error) throw error;
      res = data || {};
    } catch (e) { MM.erreur(e); return null; }
    let msg;
    if (res.deja) msg = res.reussi ? 'Réussi ! (déjà compté avant : pas de nouveaux points)' : 'Pas encore réussi. Relis et réessaie quand tu veux.';
    else if (!res.reussi) msg = 'Score ' + score + '/' + total + ' : il fallait ' + (total - 1) + ' bonnes réponses. Pas de points cette fois.';
    else if (res.points > 0) msg = 'Bravo ! +' + res.points + ' point' + (res.points > 1 ? 's' : '') + (res.plafond ? ' (plafond de la semaine atteint)' : '');
    else msg = 'Réussi ! Le plafond de 10 points est atteint cette semaine : refais-le lundi pour gagner les points.';
    MM.toast(msg, !res.reussi);
    await MM.charger(); MM.afficher();
    return res;
  };

  /* ---------- Missions « dans la vraie vie » (avenir / argent) ---------- */
  MM.htmlMissionsCategorie = function (cat, intro) {
    const moi = E.user.id;
    const liste = E.missions.filter(m => m.actif && m.categorie === cat);
    if (!liste.length) return '';
    let h = '<h2>Dans la vraie vie</h2>' + (intro ? '<p class="petit" style="margin-top:-4px">' + esc(intro) + '</p>' : '') + '<div class="pile">';
    liste.forEach(m => {
      const st = MM.etatMission(m);
      const r = st.mienne;
      let bas = '';
      if (r && r.statut === 'envoyee') {
        bas = '<span class="petit" style="color:#8A4B00">Envoyée · en attente de validation</span>';
      } else if (r) {
        if (r.commentaire) bas += '<span class="petit" style="color:#991B1B">À refaire : ' + esc(r.commentaire) + '</span>';
        if (E.formTexte === r.id) { bas += formTexte(m, r); E.pause = true; } // ne pas effacer la saisie
        else bas += '<div class="ligne" style="flex-wrap:wrap;margin-top:6px">' +
          (m.photo_requise
            ? '<button class="btn btn-vert btn-petit" data-action="photo-mission" data-id="' + r.id + '">' + MM.icone('photo', 20) + 'Photo</button>'
            : '<button class="btn btn-vert btn-petit" data-action="ouvrir-texte" data-id="' + r.id + '">Écrire et envoyer</button>') +
          '<button class="btn btn-contour btn-petit" data-action="annuler" data-id="' + r.id + '">Annuler</button></div>';
      } else if (st.limite) {
        bas = '<span class="petit">Limite atteinte · ' + esc(m.limite_texte) + '</span>';
      } else {
        bas = '<div class="ligne entre" style="margin-top:6px"><span class="petit">' + esc(m.limite_texte) + '</span>' +
          '<button class="btn btn-clair btn-petit" data-action="reserver" data-id="' + m.id + '">Je m\'y lance</button></div>';
      }
      h += '<div class="carte pile" style="gap:6px' + (m.points >= 10 ? ';border:2px solid var(--orange)' : '') + '">' +
        '<div class="ligne entre" style="align-items:flex-start"><strong style="font-size:15px">' + esc(m.titre) + '</strong><span class="pastille points">+' + m.points + '</span></div>' +
        (m.description ? '<span style="font-size:13px;line-height:1.4;color:var(--gris)">' + esc(m.description) + '</span>' : '') + bas + '</div>';
    });
    return h + '</div>';
  };

  function formTexte(m, r) {
    const enquete = /^Enquête/i.test(m.titre);
    let h = '<form class="pile" id="form-texte" data-id="' + r.id + '" data-enquete="' + (enquete ? 1 : 0) + '" style="margin-top:6px">';
    if (enquete) {
      h += '<label class="champ">Qui as-tu interrogé, et quel est son métier ?<input type="text" name="qui" required placeholder="Ex. : Tonton Marc, infirmier"></label>';
      (window.MM_ENQUETE || []).forEach((q, i) => {
        h += '<label class="champ">' + (i + 1) + '. ' + esc(q) + '<textarea name="r' + i + '" rows="2" required></textarea></label>';
      });
    } else {
      const ph = /défi/i.test(m.titre) ? 'Explique ton défi : ce que tu as fait, ce que tu as appris.'
        : /réunion/i.test(m.titre) ? 'Ce que tu as retenu : combien tu as versé, ce que ça vaut aujourd\'hui, ce qui a monté ou baissé…'
          : 'Le métier que tu as raconté, et ce que tu en as dit.';
      h += '<label class="champ">Ton récit<textarea name="texte" rows="4" required placeholder="' + esc(ph) + '"></textarea></label>';
    }
    return h + '<div class="grille2"><button type="button" class="btn btn-contour" data-action="fermer-texte">Plus tard</button><button type="submit" class="btn btn-vert">Envoyer</button></div></form>';
  }
  MM.actions['ouvrir-texte'] = async (b) => { E.formTexte = Number(b.dataset.id); MM._gardeScroll = true; MM.afficher(); };
  MM.actions['fermer-texte'] = async () => { E.formTexte = null; MM._gardeScroll = true; MM.afficher(); };
  document.addEventListener('submit', async (e) => {
    if (e.target.id !== 'form-texte') return;
    e.preventDefault();
    const f = e.target, id = Number(f.dataset.id);
    let texte;
    if (f.dataset.enquete === '1') {
      texte = 'Personne interrogée : ' + f.qui.value.trim() + '\n' + (window.MM_ENQUETE || []).map((q, i) => (i + 1) + '. ' + q + '\n→ ' + f['r' + i].value.trim()).join('\n');
    } else texte = f.texte.value.trim();
    if (!texte) { MM.toast('Écris ton récit avant d\'envoyer.', true); return; }
    const btn = f.querySelector('[type=submit]'); btn.disabled = true;
    try {
      await MM.rpc('envoyer_realisation', { p_id: id, p_photo: null, p_texte: texte }, 'Envoyé ! Papa ou Maman va valider.');
      E.formTexte = null; MM.afficher();
    } catch (err) { btn.disabled = false; }
  });
})();
