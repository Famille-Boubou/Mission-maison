/* Mission Maison — onglet « Mon avenir » (Lili et Romy) */
(function () {
  const MM = window.MM, esc = MM.esc, E = MM.etat;
  const AV = () => (E.av || (E.av = { vue: 'decouvrir', fiche: null, univers: null, filtre: 'tous', carte: null, profilQ: null }));
  const AVIS = [
    { id: 'adore', emoji: '😍', nom: 'J\'adore' },
    { id: 'bof', emoji: '😐', nom: 'Bof' },
    { id: 'non', emoji: '👎', nom: 'Pas pour moi' }
  ];

  /* ---------- Fiche métier (utilisée aussi par l'espace parents) ---------- */
  MM.htmlFicheMetier = function (f, opts) {
    const o = opts || {}, u = MM.univers(f.u), SP = window.MM_SPECIALITES, P = window.MM_PROFILS;
    let h = '<div class="carte-fiche">' +
      '<div class="ligne entre" style="align-items:flex-start"><span class="univers-pastille">' + u.emoji + ' ' + esc(u.nom) + '</span>' +
      (f.a ? '<span class="pastille avenir">⭐ Métier d\'avenir</span>' : '') + '</div>' +
      '<h2 style="margin:10px 0 6px;font-size:23px;line-height:1.2">' + esc(f.n) + '</h2>' +
      '<p style="margin:0 0 4px">' + esc(f.r) + '</p></div>';
    h += '<div class="carte pile" style="gap:8px;margin-top:10px"><strong>🗓️ Une journée type</strong><ul class="liste-puces">' +
      f.t.map(t => '<li>' + esc(t) + '</li>').join('') + '</ul></div>';
    h += '<div class="grille2" style="margin-top:10px"><div class="carte pile" style="gap:4px"><span class="petit">🎓 Niveau le plus courant</span><strong style="font-size:18px">' + esc(f.niv) + '</strong></div>' +
      '<div class="carte pile" style="gap:4px"><span class="petit">💶 Salaire de début</span><strong style="font-size:14px;line-height:1.3">' + esc(f.s) + '</strong></div></div>';
    h += '<div class="carte pile" style="gap:6px;margin-top:10px"><strong>🧭 Les études</strong><span style="font-size:14px;line-height:1.45">' + esc(f.e) + '</span></div>';
    h += '<div class="carte pile" style="gap:8px;margin-top:10px"><strong>💪 Les qualités utiles</strong><div class="choix">' +
      f.q.map(q => '<span class="puce" style="cursor:default">' + esc(q) + '</span>').join('') + '</div></div>';
    if (o.lycee || o.toutVoir) {
      h += '<div class="carte pile" style="gap:8px;margin-top:10px"><strong>📘 Spécialités de 1re conseillées</strong>' +
        (f.sp.length ? '<div class="choix">' + f.sp.map(s => '<span class="puce active" style="cursor:default">' + esc(SP[s] || s) + '</span>').join('') + '</div>'
          : '<span style="font-size:14px">Pas de spécialité imposée : la voie professionnelle ou l\'apprentissage est souvent le chemin le plus direct.</span>') + '</div>';
    }
    h += '<div class="carte pile" style="gap:6px;margin-top:10px"><strong>🧩 Profils qui s\'y plaisent</strong><span style="font-size:14px">' +
      f.p.split('').map(c => P[c].emoji + ' ' + P[c].nom).join(' · ') + '</span></div>';
    h += '<p class="petit" style="margin:10px 2px 0">Salaires : ordres de grandeur indicatifs en début de carrière, qui varient selon la région, l\'employeur et l\'expérience.' +
      (f.a ? ' ⭐ : métier qui devrait beaucoup recruter dans les années à venir (projections France Stratégie / Dares) ou secteur en forte croissance.' : '') + '</p>';
    return h;
  };

  /* ---------- Quiz d'une fiche : 5 questions tirées de la fiche ---------- */
  MM.quizFiche = function (f, lycee) {
    const M = window.MM_METIERS, autres = M.filter(x => x.id !== f.id), loin = autres.filter(x => x.u !== f.u);
    const Q = [];
    const mk = (q, bonne, faux, e) => { const c = MM.melanger([bonne].concat(faux)); return { q, c, r: c.indexOf(bonne), e }; };
    const sansDoublon = (liste, exclus) => Array.from(new Set(liste)).filter(x => !exclus.includes(x));

    Q.push(mk('D\'après la fiche, laquelle de ces tâches fait partie de ce métier ?', MM.tirer(f.t, 1)[0],
      MM.tirer(sansDoublon(loin.flatMap(x => x.t), f.t), 3), 'Une journée type : ' + f.t.join(' ; ') + '.'));
    Q.push(mk('Quel est le niveau d\'études le plus courant pour ce métier ?', f.niv,
      MM.tirer(window.MM_NIVEAUX.filter(n => n !== f.niv), 3), f.e));
    const u = MM.univers(f.u);
    Q.push(mk('Dans quel univers se trouve ce métier ?', u.nom,
      MM.tirer(window.MM_UNIVERS.filter(x => x.id !== f.u).map(x => x.nom), 3), 'Il fait partie de l\'univers « ' + u.nom + ' ».'));
    if (lycee && f.sp.length) {
      const SP = window.MM_SPECIALITES;
      Q.push(mk('D\'après la fiche, quelle spécialité de 1re est conseillée ?', SP[MM.tirer(f.sp, 1)[0]],
        MM.tirer(Object.keys(SP).filter(k => !f.sp.includes(k) && k !== 'BE').map(k => SP[k]), 3), 'Spécialités conseillées : ' + f.sp.map(s => SP[s]).join(', ') + '.'));
    } else {
      Q.push(mk('D\'après la fiche, quelle qualité est utile dans ce métier ?', MM.tirer(f.q, 1)[0],
        MM.tirer(sansDoublon(loin.flatMap(x => x.q), f.q), 3), 'Qualités utiles : ' + f.q.join(', ') + '.'));
    }
    Q.push(mk('Quel salaire de début la fiche indique-t-elle ?', f.s,
      MM.tirer(sansDoublon(autres.map(x => x.s), [f.s]), 3), 'La fiche indique : ' + f.s + '.'));
    return MM.melanger(Q);
  };

  /* ---------- Onglet ---------- */
  MM.vues.avenir = function () {
    if (E.quiz) return MM.htmlQuiz();
    const a = AV();
    if (a.fiche) return vueFiche(MM.metier(a.fiche));
    if (a.profilQ) return vueQuestionProfil();
    const p = E.profil;
    let h = entete('Mon avenir');
    const vues = [['decouvrir', '🃏 Découvrir'], ['album', '📒 Album'], ['profil', '🧩 Mon profil']];
    if (p.lycee) vues.push(['specialites', '📘 Spécialités']);
    vues.push(['missions', '🎯 Missions']);
    h += '<div class="choix defile" style="margin-bottom:12px">' + vues.map(v =>
      '<button class="puce' + (a.vue === v[0] ? ' active' : '') + '" data-action="av-vue" data-vue="' + v[0] + '">' + v[1] + '</button>').join('') + '</div>';
    const visibles = MM.metiersVisibles();
    if (!visibles.length && a.vue !== 'missions' && a.vue !== 'profil') {
      return h + '<div class="carte pile"><strong>Les fiches métiers arrivent bientôt !</strong><p style="margin:0">Papa ou Maman les relit avant de les débloquer. En attendant, tu peux faire le quiz « Mon profil ».</p></div>';
    }
    switch (a.vue) {
      case 'album': h += vueAlbum(visibles); break;
      case 'profil': h += vueProfil(visibles); break;
      case 'specialites': h += vueSpecialites(visibles); break;
      case 'missions': h += MM.htmlPointsSemaine() + MM.htmlMissionsCategorie('avenir', 'Les vraies rencontres comptent plus que les écrans : ces missions rapportent plus de points et sont validées par Papa ou Maman.'); break;
      default: h += vueDecouvrir(visibles);
    }
    return h;
  };

  function entete(titre) {
    const p = E.profil;
    return '<div class="entete"><div><div class="sous-titre">Explore les métiers, trouve ce qui te plaît</div><h1>' + esc(titre) + '</h1></div>' +
      '<button class="avatar" data-action="deconnexion" aria-label="Se déconnecter">' + esc(p.prenom.charAt(0)) + '</button></div>';
  }

  /* ----- Découvrir : une carte à la fois ----- */
  function scoreProfil(f, res) {
    if (!res) return 0;
    return (f.p.includes(res.top[0]) ? 2 : 0) + (f.p.includes(res.top[1]) ? 1 : 0);
  }
  function choisirCarte(visibles) {
    const a = AV();
    const restants = visibles.filter(f => !MM.avis(f.id));
    if (a.carte && restants.find(f => f.id === a.carte)) return MM.metier(a.carte);
    if (!restants.length) return null;
    const res = MM.profilResultat();
    let pool = restants;
    if (res && Math.random() < 0.7) {
      const best = Math.max.apply(null, restants.map(f => scoreProfil(f, res)));
      if (best > 0) pool = restants.filter(f => scoreProfil(f, res) === best);
    }
    const f = MM.tirer(pool, 1)[0];
    a.carte = f.id;
    return f;
  }
  function vueDecouvrir(visibles) {
    const vus = visibles.filter(f => MM.avis(f.id)).length;
    let h = '<div class="ligne entre" style="margin-bottom:8px"><span class="petit">' + vus + ' / ' + visibles.length + ' cartes découvertes</span>' +
      '<span class="petit">' + MM.pointsAppliSemaine() + ' / ' + MM.PLAFOND_APPLI + ' pts cette semaine</span></div>';
    const f = choisirCarte(visibles);
    if (!f) {
      return h + '<div class="carte pile" style="text-align:center"><div style="font-size:40px">🏆</div><strong>Tu as découvert toutes les cartes disponibles !</strong>' +
        '<p style="margin:0" class="petit">Va dans ton album pour relire tes favoris et passer les quiz.</p>' +
        '<button class="btn btn-vert" data-action="av-vue" data-vue="album">Ouvrir mon album</button></div>';
    }
    const u = MM.univers(f.u);
    h += '<div class="carte-swipe">' +
      '<div class="ligne entre" style="align-items:flex-start"><span class="univers-pastille">' + u.emoji + ' ' + esc(u.nom) + '</span>' + (f.a ? '<span class="pastille avenir">⭐ Avenir</span>' : '') + '</div>' +
      '<div style="font-family:var(--titre);font-weight:800;font-size:26px;line-height:1.15;margin:14px 0 8px">' + esc(f.n) + '</div>' +
      '<p style="margin:0 0 10px;font-size:15px;line-height:1.5">' + esc(f.r) + '</p>' +
      '<div class="ligne" style="gap:8px;flex-wrap:wrap"><span class="pastille neutre">🎓 ' + esc(f.niv) + '</span></div>' +
      '<button class="btn btn-contour btn-plein" style="margin-top:14px" data-action="av-fiche" data-id="' + f.id + '">Lire la fiche complète</button></div>';
    h += '<div class="grille3" style="margin-top:12px">' + AVIS.map(x =>
      '<button class="btn-avis avis-' + x.id + '" data-action="av-avis" data-id="' + f.id + '" data-avis="' + x.id + '" data-suite="1"><span style="font-size:28px">' + x.emoji + '</span>' + x.nom + '</button>').join('') + '</div>' +
      '<p class="petit" style="text-align:center">Donne ton avis pour passer à la carte suivante. Tu pourras changer d\'avis dans ton album.</p>';
    return h;
  }

  /* ----- Album ----- */
  function vueAlbum(visibles) {
    const a = AV(), moi = E.user.id;
    const nbFav = visibles.filter(f => MM.avis(f.id) === 'adore').length;
    const nbQuiz = visibles.filter(f => { const x = MM.apprentissage('metier:' + f.id); return x && x.reussi; }).length;
    let h = '<div class="grille3" style="margin-bottom:12px">' +
      stat(visibles.filter(f => MM.avis(f.id)).length + '/' + visibles.length, 'découvertes') + stat(nbFav, 'coups de cœur') + stat(nbQuiz, 'quiz réussis') + '</div>';
    h += '<div class="choix" style="margin-bottom:10px">' + [['tous', 'Toutes'], ['favoris', '😍 Mes favoris'], ['avenir', '⭐ Avenir'], ['avoir', 'Pas encore vues']].map(x =>
      '<button class="puce' + (a.filtre === x[0] ? ' active' : '') + '" data-action="av-filtre" data-f="' + x[0] + '">' + x[1] + '</button>').join('') + '</div>';
    const filtre = (f) => a.filtre === 'favoris' ? MM.avis(f.id) === 'adore' : a.filtre === 'avenir' ? !!f.a : a.filtre === 'avoir' ? !MM.avis(f.id) : true;
    const liste = visibles.filter(filtre);
    if (!liste.length) return h + '<div class="vide">Aucune carte ici pour l\'instant.</div>';
    const parU = {};
    liste.forEach(f => (parU[f.u] = parU[f.u] || []).push(f));
    h += '<div class="pile">';
    window.MM_UNIVERS.forEach(u => {
      const fs = parU[u.id]; if (!fs) return;
      const ouvert = a.univers === u.id || a.filtre !== 'tous';
      const total = visibles.filter(f => f.u === u.id).length, vus = visibles.filter(f => f.u === u.id && MM.avis(f.id)).length;
      h += '<div class="carte" style="padding:0;overflow:hidden"><button class="ligne entre univers-tete" data-action="av-univers" data-id="' + u.id + '">' +
        '<span><span style="font-size:20px;margin-right:6px">' + u.emoji + '</span><strong>' + esc(u.nom) + '</strong></span><span class="petit">' + vus + '/' + total + (ouvert ? ' ▲' : ' ▼') + '</span></button>';
      if (ouvert) {
        h += '<div class="pile" style="gap:0">' + fs.map(f => {
          const av = MM.avis(f.id), q = MM.apprentissage('metier:' + f.id);
          return '<button class="ligne-metier" data-action="av-fiche" data-id="' + f.id + '"><span style="flex:1;text-align:left">' + esc(f.n) + (f.a ? ' ⭐' : '') + '</span>' +
            '<span>' + (q && q.reussi ? '✅' : '') + (av ? AVIS.find(x => x.id === av).emoji : '<span class="petit">nouvelle</span>') + '</span></button>';
        }).join('') + '</div>';
      }
      h += '</div>';
    });
    return h + '</div>';
  }
  function stat(v, t) { return '<div class="carte" style="text-align:center;padding:10px 6px"><div style="font-family:var(--titre);font-weight:800;font-size:22px">' + v + '</div><div class="petit">' + t + '</div></div>'; }

  /* ----- Fiche ----- */
  function vueFiche(f) {
    E.pause = true;
    if (!f) { AV().fiche = null; return MM.vues.avenir(); }
    const av = MM.avis(f.id), q = MM.apprentissage('metier:' + f.id);
    let h = '<div class="ligne" style="margin-bottom:12px"><button class="btn btn-contour btn-petit" data-action="av-retour">← Retour</button></div>';
    h += MM.htmlFicheMetier(f, { lycee: E.profil.lycee });
    h += '<h2>Ton avis</h2><div class="grille3">' + AVIS.map(x =>
      '<button class="btn-avis avis-' + x.id + (av === x.id ? ' choisi' : '') + '" data-action="av-avis" data-id="' + f.id + '" data-avis="' + x.id + '"><span style="font-size:26px">' + x.emoji + '</span>' + x.nom + '</button>').join('') + '</div>';
    h += '<div class="carte pile" style="margin-top:14px">';
    if (q && q.reussi) h += '<strong>✅ Quiz réussi</strong><span class="petit">' + (q.points ? '+' + q.points + ' point gagné' : 'Réussi sans point (déjà tenté ou plafond)') + '</span>';
    else if (q) h += '<strong>Quiz pas encore réussi</strong><span class="petit">Ton premier essai n\'a pas rapporté de point, mais tu peux le réussir pour compléter ton album.</span><button class="btn btn-vert" data-action="av-quiz" data-id="' + f.id + '">Réessayer le quiz</button>';
    else h += '<strong>Quiz de la fiche : +1 point</strong><span class="petit">5 questions sur ce que tu viens de lire. Il faut 4 bonnes réponses, au premier essai, pour gagner le point.</span><button class="btn btn-vert" data-action="av-quiz" data-id="' + f.id + '">Je passe le quiz</button>';
    return h + '</div>';
  }

  /* ----- Mon profil ----- */
  function vueProfil(visibles) {
    const res = AV().profilLocal || MM.profilResultat();
    const P = window.MM_PROFILS;
    if (!res) {
      return '<div class="carte-verte pile"><strong style="font-size:18px">Découvre ton profil</strong>' +
        '<span>24 petites affirmations. Pour chacune, dis si tu adores, si c\'est bof, ou si ce n\'est pas pour toi. Pas de bonne ou de mauvaise réponse !</span>' +
        '<span class="petit">+5 points, une fois par an. Tu pourras le refaire l\'année prochaine pour voir comment tu as changé.</span>' +
        '<button class="btn btn-orange" data-action="av-profil-start">C\'est parti</button></div>';
    }
    let h = '<div class="carte-verte pile"><span class="petit">Ton profil</span><div style="font-family:var(--titre);font-weight:800;font-size:24px">' +
      res.top.map(c => P[c].emoji + ' ' + P[c].nom).join(' + ') + '</div>' +
      res.top.map(c => '<span style="font-size:14px;line-height:1.4">' + esc(P[c].texte) + '</span>').join('') + '</div>';
    h += '<div class="carte pile" style="margin-top:10px;gap:6px"><strong>Tes scores</strong>' + 'RIASEC'.split('').map(c =>
      '<div class="ligne" style="gap:8px"><span style="width:118px;font-size:13px">' + P[c].emoji + ' ' + P[c].nom + '</span><div class="barre claire" style="flex:1"><div style="width:' + MM.pct(res.scores[c] || 0, 8) + '%"></div></div><span class="petit" style="width:28px;text-align:right">' + (res.scores[c] || 0) + '</span></div>').join('') + '</div>';
    const reco = visibles.map(f => ({ f, s: scoreProfil(f, res) })).filter(x => x.s >= 2).sort((a, b) => b.s - a.s || (b.f.a - a.f.a)).slice(0, 10);
    if (reco.length) {
      h += '<h2>Des métiers qui te ressemblent</h2><div class="carte" style="padding:0;overflow:hidden">' + reco.map(x =>
        '<button class="ligne-metier" data-action="av-fiche" data-id="' + x.f.id + '"><span style="flex:1;text-align:left">' + MM.univers(x.f.u).emoji + ' ' + esc(x.f.n) + (x.f.a ? ' ⭐' : '') + '</span><span class="petit">›</span></button>').join('') + '</div>';
    }
    h += '<p class="petit">Ce quiz est un point de départ, pas une étiquette : beaucoup de métiers mélangent plusieurs profils, et tes goûts vont évoluer.</p>' +
      '<button class="btn btn-contour btn-plein" data-action="av-profil-start">Refaire le quiz pour m\'amuser</button>';
    return h;
  }
  function vueQuestionProfil() {
    E.pause = true;
    const z = AV().profilQ, Q = window.MM_QUIZ_PROFIL, it = Q[z.i];
    return '<div class="entete"><div><div class="sous-titre">Quiz « Mon profil »</div><h1>' + (z.i + 1) + ' / ' + Q.length + '</h1></div>' +
      '<button class="btn btn-contour btn-petit" data-action="av-profil-quitter">Quitter</button></div>' +
      '<div class="barre claire" style="margin-bottom:16px"><div style="width:' + MM.pct(z.i, Q.length) + '%"></div></div>' +
      '<div class="carte-swipe" style="text-align:center;min-height:180px;display:flex;flex-direction:column;justify-content:center"><span class="petit">J\'aimerais…</span>' +
      '<div style="font-family:var(--titre);font-weight:700;font-size:23px;line-height:1.25;margin-top:8px">' + esc(it.t) + '</div></div>' +
      '<div class="grille3" style="margin-top:14px">' + AVIS.map((x, i) =>
        '<button class="btn-avis avis-' + x.id + '" data-action="av-profil-rep" data-v="' + (2 - i) + '"><span style="font-size:28px">' + x.emoji + '</span>' + x.nom + '</button>').join('') + '</div>';
  }

  /* ----- Mes spécialités (lycée) ----- */
  function vueSpecialites(visibles) {
    const SP = window.MM_SPECIALITES;
    const fav = visibles.filter(f => MM.avis(f.id) === 'adore');
    let h = '<div class="carte-jaune pile" style="gap:4px"><strong>Choisir ses 3 spécialités de 1re</strong><span style="font-size:13px;line-height:1.4">Les vœux provisoires se font au 2e trimestre de seconde, puis le choix définitif après le conseil de classe de fin d\'année. Parles-en avec Papa, Maman et ton professeur principal.</span></div>';
    if (fav.length < 5) {
      return h + '<div class="carte pile" style="margin-top:10px"><strong>Encore ' + (5 - fav.length) + ' coup' + (5 - fav.length > 1 ? 's' : '') + ' de cœur 😍</strong>' +
        '<span>Mets « J\'adore » à au moins 5 métiers : l\'appli te montrera les spécialités qui reviennent le plus souvent.</span>' +
        '<button class="btn btn-vert" data-action="av-vue" data-vue="decouvrir">Découvrir des métiers</button></div>';
    }
    const cpt = {};
    fav.forEach(f => f.sp.forEach(s => { (cpt[s] = cpt[s] || []).push(f); }));
    const sansSp = fav.filter(f => !f.sp.length);
    const tri = Object.keys(cpt).sort((a, b) => cpt[b].length - cpt[a].length);
    const max = tri.length ? cpt[tri[0]].length : 1;
    h += '<h2>Les spécialités de tes ' + fav.length + ' coups de cœur</h2><div class="pile">';
    tri.forEach((s, i) => {
      h += '<div class="carte pile" style="gap:6px' + (i < 3 ? ';border:2px solid var(--vert)' : '') + '"><div class="ligne entre"><strong>' + (i < 3 ? ['🥇', '🥈', '🥉'][i] + ' ' : '') + esc(SP[s]) + '</strong><span class="petit">' + cpt[s].length + ' métier' + (cpt[s].length > 1 ? 's' : '') + '</span></div>' +
        '<div class="barre claire"><div style="width:' + MM.pct(cpt[s].length, max) + '%"></div></div>' +
        '<span class="petit">' + cpt[s].map(f => esc(f.n)).join(' · ') + '</span></div>';
    });
    h += '</div>';
    if (sansSp.length) h += '<p class="petit">Sans spécialité imposée (voie pro ou apprentissage) : ' + sansSp.map(f => esc(f.n)).join(', ') + '.</p>';
    h += '<p class="petit">C\'est une piste de réflexion, pas une décision : les résultats changent avec tes coups de cœur.</p>';
    return h;
  }

  /* ---------- Actions ---------- */
  MM.actions['av-vue'] = async (b) => { const a = AV(); a.vue = b.dataset.vue; a.fiche = null; MM.afficher(); window.scrollTo(0, 0); };
  MM.actions['av-filtre'] = async (b) => { AV().filtre = b.dataset.f; MM._gardeScroll = true; MM.afficher(); };
  MM.actions['av-univers'] = async (b) => { const a = AV(); a.univers = a.univers === b.dataset.id ? null : b.dataset.id; MM._gardeScroll = true; MM.afficher(); };
  MM.actions['av-fiche'] = async (b) => { const a = AV(); a.retourScroll = window.scrollY; a.fiche = b.dataset.id; MM.afficher(); window.scrollTo(0, 0); };
  MM.actions['av-retour'] = async () => { const a = AV(); a.fiche = null; MM.afficher(); window.scrollTo(0, a.retourScroll || 0); };
  MM.actions['av-avis'] = async (b) => {
    const id = b.dataset.id, avis = b.dataset.avis, a = AV();
    const actuel = MM.avis(id);
    const nouveau = !b.dataset.suite && actuel === avis ? null : avis;
    const { error } = await MM.sb.rpc('donner_avis', { p_metier: id, p_avis: nouveau });
    if (error) return MM.erreur(error);
    // mise à jour immédiate, sans attendre le rechargement
    E.avis = (E.avis || []).filter(x => !(x.enfant_id === E.user.id && x.metier === id));
    if (nouveau) E.avis.push({ enfant_id: E.user.id, metier: id, avis: nouveau, updated_at: new Date().toISOString() });
    if (b.dataset.suite) { a.carte = null; if (nouveau === 'adore') MM.toast('😍 Ajouté à tes favoris !'); }
    MM._gardeScroll = !b.dataset.suite;
    MM.afficher();
  };
  MM.actions['av-quiz'] = async (b) => {
    const f = MM.metier(b.dataset.id);
    MM.lancerQuiz('Quiz · ' + f.n, MM.quizFiche(f, E.profil.lycee), async (score, total) => {
      await MM.envoyerQuiz('fiche', 'metier:' + f.id, score, total, 'Fiche métier : ' + f.n);
    });
  };
  MM.actions['av-profil-start'] = async () => { const a = AV(); a.profilQ = { i: 0, rep: [] }; MM.afficher(); window.scrollTo(0, 0); };
  MM.actions['av-profil-quitter'] = async () => { if (!confirm('Quitter le quiz ? Tes réponses seront perdues.')) return; AV().profilQ = null; MM.afficher(); };
  MM.actions['av-profil-rep'] = async (b) => {
    const a = AV(), z = a.profilQ, Q = window.MM_QUIZ_PROFIL;
    z.rep.push(Number(b.dataset.v));
    if (z.i + 1 < Q.length) { z.i++; MM.afficher(); return; }
    const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    Q.forEach((it, i) => { scores[it.p] += z.rep[i]; });
    const top = 'RIASEC'.split('').sort((x, y) => scores[y] - scores[x]).slice(0, 2);
    const res = { scores, top };
    a.profilQ = null; a.vue = 'profil';
    const annee = new Date().getFullYear();
    if (!MM.apprentissage('profil:' + annee)) {
      a.profilLocal = res; // affiché même si le plafond de la semaine empêche l'enregistrement
      await MM.envoyerQuiz('profil', 'profil:' + annee, Q.length, Q.length, 'Quiz « Mon profil »', res);
    } else {
      a.profilLocal = res; MM.toast('Voici ton nouveau résultat (déjà compté cette année).'); MM.afficher();
    }
    window.scrollTo(0, 0);
  };
})();
