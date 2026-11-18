/* Mission Maison — sessions de code de la route (40 questions, correction après chaque question) */
(function () {
  const MM = window.MM, esc = MM.esc, E = MM.etat;
  const NB = 40;
  const THEMES = {
    circulation: 'Circulation routière', conducteur: 'Le conducteur', route: 'La route', usagers: 'Les autres usagers',
    divers: 'Notions diverses', secours: 'Premiers secours', vehicule: 'Prendre et quitter son véhicule',
    mecanique: 'Mécanique et équipements', securite: 'Sécurité du passager et du véhicule', environnement: 'Environnement'
  };
  MM.THEMES_CODE = THEMES;
  const cle = () => 'mm-code-' + E.user.id;
  const cleVues = () => 'mm-code-vues-' + E.user.id;

  function sauver() { try { localStorage.setItem(cle(), JSON.stringify(E.code)); } catch (e) { } }
  function charger() {
    if (E.code) return E.code;
    try { E.code = JSON.parse(localStorage.getItem(cle()) || 'null'); } catch (e) { E.code = null; }
    if (!E.code) E.code = { phase: 'accueil' };
    return E.code;
  }
  function melanger(t) { for (let i = t.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [t[i], t[j]] = [t[j], t[i]]; } return t; }

  function tirer() {
    const banque = window.MM_QUESTIONS || [];
    let vues = [];
    try { vues = JSON.parse(localStorage.getItem(cleVues()) || '[]'); } catch (e) { }
    const dejaVu = new Set(vues);
    const parTheme = {};
    banque.forEach((q, i) => { (parTheme[q.t] = parTheme[q.t] || []).push(i); });
    const themes = Object.keys(parTheme);
    const parT = Math.ceil(NB / Math.max(1, themes.length));
    let choix = [];
    themes.forEach(t => {
      // on privilégie les questions pas encore vues
      const l = melanger(parTheme[t].slice()).sort((a, b) => (dejaVu.has(a) ? 1 : 0) - (dejaVu.has(b) ? 1 : 0));
      choix = choix.concat(l.slice(0, parT));
    });
    choix = melanger(choix).slice(0, NB);
    if (choix.length < NB) {
      const reste = melanger(banque.map((_, i) => i).filter(i => !choix.includes(i)));
      choix = choix.concat(reste.slice(0, NB - choix.length));
    }
    // mémoriser les questions vues (on oublie les plus anciennes quand presque tout a été vu)
    let nv = vues.concat(choix);
    if (nv.length > banque.length - NB) nv = nv.slice(nv.length - Math.max(0, banque.length - NB));
    try { localStorage.setItem(cleVues(), JSON.stringify(nv)); } catch (e) { }
    return choix;
  }

  MM.vues.code = function () {
    const c = charger();
    E.pause = c.phase === 'question';
    if (c.phase === 'question') return vueQuestion(c);
    if (c.phase === 'fin') return vueFin(c);
    return vueAccueil(c);
  };
  MM.vues.codeApres = function () {
    const box = document.getElementById('code-adulte-ok');
    if (box) box.onchange = () => { E.code.confirme = box.checked; sauver(); majDemarrer(); };
  };
  function majDemarrer() {
    const b = document.getElementById('code-demarrer');
    if (b) b.disabled = !(E.code.adulte && E.code.confirme);
  }

  function serieEnCours() {
    return E.sessions.filter(s => s.enfant_id === E.user.id && !s.serie_close).sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  }

  function vueAccueil(c) {
    const serie = serieEnCours();
    let h = '<div class="entete"><div><div class="sous-titre">Préparer ton permis</div><h1>Code de la route</h1></div></div>';
    h += '<div class="carte-sombre pile"><strong>Ma série de 3 sessions</strong><div class="serie">' +
      [0, 1, 2].map(i => serie[i] ? '<span class="faite">S' + (i + 1) + ' · ' + serie[i].score + '/40</span>' : '<span>S' + (i + 1) + '</span>').join('') + '</div>' +
      '<span class="petit">Série terminée : +25 pts · Une session à 35/40 ou plus : bonus de 5 €</span></div>';
    h += '<div class="carte pile" style="margin-top:12px"><strong>Avant de commencer</strong>' +
      '<p style="margin:0;font-size:14px">40 questions mélangées sur les 10 thèmes de l\'examen, avec la correction après chaque question. À l\'examen, il faut 35 bonnes réponses sur 40. Une ou plusieurs réponses peuvent être bonnes.</p>' +
      '<span class="champ" style="font-size:13px;font-weight:600;color:var(--gris)">Adulte présent dans la pièce</span><div class="choix">' +
      ['Papa', 'Maman'].map(a => '<button class="puce' + (c.adulte === a ? ' active' : '') + '" data-action="code-adulte" data-a="' + a + '">' + a + '</button>').join('') + '</div>' +
      '<label class="case"><input type="checkbox" id="code-adulte-ok"' + (c.confirme ? ' checked' : '') + '>Je confirme qu\'un adulte reste dans la pièce pendant toute la session</label>' +
      '<button id="code-demarrer" class="btn btn-vert btn-plein" data-action="code-demarrer"' + (c.adulte && c.confirme ? '' : ' disabled') + '>Commencer la session</button>' +
      '<span class="petit">Une session faite sans adulte présent ne compte pas.</span></div>';
    const recentes = E.sessions.filter(s => s.enfant_id === E.user.id).slice(0, 6);
    if (recentes.length) {
      h += '<h2>Mes dernières sessions</h2><div class="pile">' + recentes.map(s =>
        '<div class="mission"><div class="texte"><span class="titre">' + s.score + '/40</span><span class="petit">' + MM.dateCourte(s.created_at) + ' · avec ' + esc(s.adulte) + '</span></div>' +
        '<span class="pastille ' + (s.score >= 35 ? 'ok' : 'neutre') + '">' + (s.score >= 35 ? 'Réussie' : 'À retravailler') + '</span></div>').join('') + '</div>';
    }
    return h;
  }

  function vueQuestion(c) {
    const banque = window.MM_QUESTIONS;
    const q = banque[c.questions[c.i]];
    if (!q) { c.phase = 'accueil'; sauver(); return vueAccueil(c); }
    const sel = c.selection || [];
    const juste = c.valide ? memes(sel, q.r) : null;
    let h = '<div class="ligne entre" style="margin-bottom:8px"><div><div class="sous-titre">' + esc(THEMES[q.t] || '') + '</div>' +
      '<h1 style="font-size:24px">Question ' + (c.i + 1) + '<span class="sous-titre" style="font-size:15px"> / ' + NB + '</span></h1></div>' +
      '<div style="text-align:right"><div class="sous-titre">Bonnes réponses</div><strong style="font-size:20px">' + c.score + '</strong></div></div>' +
      '<div class="barre claire" style="margin-bottom:12px"><div style="width:' + MM.pct(c.i + (c.valide ? 1 : 0), NB) + '%"></div></div>';
    h += '<div class="question-carte">' + (q.p ? '<div class="panneau-zone">' + window.MM_PANNEAU(q.p) + '</div>' : '') +
      '<div style="font-size:17px;font-weight:700;line-height:1.35">' + esc(q.q) + '</div><div class="petit" style="margin:-4px 0 2px">Une ou plusieurs bonnes réponses : coche tout ce qui est juste.</div><div class="pile">' +
      (function () {
        // ordre des réponses tiré au hasard une fois par question (gardé si on recharge la page)
        c.ordres = c.ordres || {};
        if (!c.ordres[c.i] || c.ordres[c.i].length !== q.c.length) { c.ordres[c.i] = melanger(q.c.map((_, k) => k)); sauver(); }
        return c.ordres[c.i];
      })().map((i, pos) => {
        const txt = q.c[i];
        let cls = 'reponse';
        if (c.valide) { if (q.r.includes(i)) cls += ' juste'; else if (sel.includes(i)) cls += ' fausse'; }
        else if (sel.includes(i)) cls += ' choisie';
        return '<button class="' + cls + '" data-action="code-choix" data-i="' + i + '"' + (c.valide ? ' disabled' : '') + ' aria-pressed="' + sel.includes(i) + '">' +
          '<span class="lettre">' + 'ABCD'[pos] + '</span><span>' + esc(txt) + '</span></button>';
      }).join('') + '</div>';
    if (c.valide) {
      h += '<div class="explication ' + (juste ? 'bon' : 'mauvais') + '"><strong>' + (juste ? 'Bonne réponse !' : 'Pas tout à fait.') + '</strong> ' +
        (juste ? '' : 'La bonne réponse : ' + q.r.map(i => 'ABCD'[c.ordres[c.i].indexOf(i)]).sort().join(' et ') + '. ') + esc(q.e) + '</div>' +
        '<button class="btn btn-vert btn-plein" data-action="code-suivante">' + (c.i + 1 < NB ? 'Question suivante' : 'Voir mon résultat') + '</button>';
    } else {
      h += '<button class="btn btn-vert btn-plein" data-action="code-valider"' + (sel.length ? '' : ' disabled') + '>Valider ma réponse</button>';
    }
    h += '</div><div style="margin-top:16px"><button class="btn btn-contour btn-plein" data-action="code-quitter">Arrêter la session</button></div>';
    return h;
  }

  function vueFin(c) {
    const r = c.resultat || {};
    let h = '<div class="entete"><div><div class="sous-titre">Session terminée</div><h1>' + c.score + ' / ' + NB + '</h1></div></div>';
    h += '<div class="' + (c.score >= 35 ? 'carte-verte' : 'carte') + ' pile"><strong style="font-size:18px">' +
      (c.score >= 35 ? 'Bravo, ce serait réussi à l\'examen !' : 'Continue : à l\'examen, il faut 35/40.') + '</strong>' +
      (c.envoiErreur ? '<span>La session n\'a pas pu être enregistrée (connexion ?).</span><button class="btn btn-orange" data-action="code-renvoyer">Réessayer l\'enregistrement</button>' :
        r.serie_terminee ? '<span>Série de 3 sessions terminée : +25 points' + (r.bonus ? ' et un bonus de 5 € grâce à ton ' + r.meilleur + '/40 !' : '.') + '</span>' :
          '<span>Session ' + (r.sessions || '?') + ' sur 3 de ta série.</span>') + '</div>';
    if (c.erreurs && c.erreurs.length) {
      h += '<h2>À revoir</h2><div class="pile">' + c.erreurs.map(i => {
        const q = window.MM_QUESTIONS[i];
        return '<div class="carte pile" style="gap:4px"><span class="petit">' + esc(THEMES[q.t]) + '</span><strong style="font-size:14px">' + esc(q.q) + '</strong>' +
          '<span style="font-size:14px;color:var(--ok)">✓ ' + q.r.map(k => esc(q.c[k])).join(' · ') + '</span><span class="petit">' + esc(q.e) + '</span></div>';
      }).join('') + '</div>';
    }
    return h + '<div style="margin-top:16px"><button class="btn btn-vert btn-plein" data-action="code-retour">Retour</button></div>';
  }

  function memes(a, b) { return a.length === b.length && a.every(x => b.includes(x)); }

  async function enregistrer() {
    const c = E.code;
    try {
      const { data, error } = await MM.sb.rpc('terminer_session_code', { p_score: c.score, p_adulte: c.adulte });
      if (error) throw error;
      c.resultat = data; c.envoiErreur = false; c.enregistre = true;
    } catch (e) { c.envoiErreur = true; MM.erreur(e); }
    sauver();
    E.pause = false;
    try { await MM.charger(); } catch (e) { }
    MM.afficher();
  }

  MM.actions['code-adulte'] = async (b) => { const c = charger(); c.adulte = b.dataset.a; sauver(); document.querySelectorAll('[data-action="code-adulte"]').forEach(x => x.classList.toggle('active', x === b)); majDemarrer(); };
  MM.actions['code-demarrer'] = async () => {
    const c = charger();
    if (!(c.adulte && c.confirme)) return;
    if ((window.MM_QUESTIONS || []).length < NB) { MM.toast('La banque de questions n\'est pas encore complète.', true); return; }
    Object.assign(c, { phase: 'question', questions: tirer(), ordres: {}, i: 0, score: 0, selection: [], valide: false, erreurs: [], resultat: null, enregistre: false, debut: Date.now() });
    sauver(); MM.afficher(); window.scrollTo(0, 0);
  };
  MM.actions['code-choix'] = async (b) => {
    const c = E.code; if (c.valide) return;
    const i = Number(b.dataset.i); c.selection = c.selection || [];
    c.selection = c.selection.includes(i) ? c.selection.filter(x => x !== i) : c.selection.concat(i);
    sauver(); MM._gardeScroll = true; MM.afficher();
  };
  MM.actions['code-valider'] = async () => {
    const c = E.code, q = window.MM_QUESTIONS[c.questions[c.i]];
    if (!c.selection.length) return;
    c.valide = true;
    if (memes(c.selection, q.r)) c.score++; else c.erreurs.push(c.questions[c.i]);
    sauver(); MM._gardeScroll = true; MM.afficher();
  };
  MM.actions['code-suivante'] = async () => {
    const c = E.code;
    if (c.i + 1 < NB) { c.i++; c.selection = []; c.valide = false; sauver(); MM.afficher(); window.scrollTo(0, 0); return; }
    c.phase = 'fin'; sauver(); MM.afficher(); window.scrollTo(0, 0);
    if (!c.enregistre) await enregistrer();
  };
  MM.actions['code-renvoyer'] = async () => { await enregistrer(); };
  MM.actions['code-quitter'] = async () => {
    if (!confirm('Arrêter la session ? Elle ne comptera pas dans ta série.')) return;
    E.code = { phase: 'accueil', adulte: E.code.adulte }; E.pause = false; sauver(); MM.afficher(); window.scrollTo(0, 0);
  };
  MM.actions['code-retour'] = async () => {
    E.code = { phase: 'accueil', adulte: E.code.adulte }; E.pause = false; sauver(); MM.afficher(); window.scrollTo(0, 0);
  };
})();
