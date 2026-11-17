/* Mission Maison — cœur de l'appli : connexion, données, navigation, outils */
(function () {
  const C = window.MM_CONFIG;
  const sb = window.supabase.createClient(C.url, C.key, {
    auth: { persistSession: true, autoRefreshToken: true, storageKey: 'mm-session' }
  });

  const MM = window.MM = {
    sb,
    etat: {
      user: null, profil: null, profils: [], missions: [], realisations: [], mouvements: [],
      notes: [], sessions: [], bonus: [], recompenses: [], sorties: [], idees: [], alertes: [],
      onglet: null, chargement: false
    },
    vues: {},          // vues enregistrées par enfant.js / parent.js / code.js
    PALIERS: { mois: 500, sortie: 2000, aventure: 5000 },
    TRANCHE: 200
  };

  /* ---------- Outils ---------- */
  MM.esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  };
  MM.euros = function (n) {
    const v = Number(n) || 0;
    return (Number.isInteger(v) ? v.toString() : v.toFixed(2).replace('.', ',')) + ' €';
  };
  MM.dateCourte = function (iso) {
    const d = new Date(iso);
    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) + ' · ' + d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };
  MM.depuis = function (iso) {
    const min = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
    if (min < 1) return "à l'instant";
    if (min < 60) return 'il y a ' + min + ' min';
    const h = Math.round(min / 60);
    if (h < 24) return 'il y a ' + h + ' h';
    return MM.dateCourte(iso);
  };
  MM.toast = function (msg, erreur) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.className = 'visible' + (erreur ? ' erreur' : '');
    clearTimeout(MM._toast);
    MM._toast = setTimeout(() => { t.className = ''; }, erreur ? 5000 : 2600);
  };
  MM.erreur = function (e) {
    const msg = (e && (e.message || e.error_description)) || String(e);
    MM.toast(msg.replace(/^.*?ERROR:\s*/, ''), true);
  };
  MM.pct = function (v, max) { return Math.max(0, Math.min(100, Math.round((v / max) * 100))); };
  MM.profilDe = function (id) { return MM.etat.profils.find(p => p.id === id) || { prenom: '?' }; };
  MM.estParent = function () { return MM.etat.profil && MM.etat.profil.role === 'parent'; };
  MM.enfants = function () { return MM.etat.profils.filter(p => p.role === 'enfant').sort((a, b) => a.prenom.localeCompare(b.prenom)); };

  MM.icone = function (nom, taille) {
    const s = taille || 22;
    const p = {
      maison: '<path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
      photo: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
      voiture: '<path d="M5 17h14v-5l-2-5H7l-2 5v5z"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/>',
      cadeau: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5"/>',
      livre: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
      check: '<polyline points="20 6 9 17 4 12"/>',
      croix: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
      linge: '<path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>',
      moins: '<circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/>',
      liste: '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/>',
      famille: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
      etoile: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
      plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
      sortie: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>'
    }[nom] || '';
    return '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + '</svg>';
  };

  /* ---------- Périodes et limites (même logique que la base) ---------- */
  MM.debutPeriode = function (periode) {
    const d = new Date();
    switch (periode) {
      case 'repas': case 'jour': d.setHours(0, 0, 0, 0); return d;
      case 'semaine': { d.setHours(0, 0, 0, 0); const j = (d.getDay() + 6) % 7; d.setDate(d.getDate() - j); return d; }
      case 'quinzaine': return new Date(Date.now() - 14 * 86400000);
      case 'mois': d.setHours(0, 0, 0, 0); d.setDate(1); return d;
      case 'trimestre': d.setHours(0, 0, 0, 0); d.setDate(1); d.setMonth(Math.floor(d.getMonth() / 3) * 3); return d;
      default: return null;
    }
  };
  MM.etatMission = function (m) {
    const moi = MM.etat.user.id;
    const actives = MM.etat.realisations.filter(r => r.mission_id === m.id && (r.statut === 'reservee' || r.statut === 'envoyee'));
    const mienne = actives.find(r => r.enfant_id === moi);
    const autre = !m.perso && actives.find(r => r.enfant_id !== moi);
    let limite = false;
    if (m.periode !== 'evenement') {
      const debut = MM.debutPeriode(m.periode);
      const max = m.periode === 'repas' ? 2 * m.max_par_periode : m.max_par_periode;
      const nb = MM.etat.realisations.filter(r => r.mission_id === m.id && (!m.perso || r.enfant_id === moi) &&
        ['reservee', 'envoyee', 'validee'].includes(r.statut) && new Date(r.created_at) >= debut).length;
      limite = nb >= max;
    }
    return { mienne, autre, limite };
  };

  /* ---------- Points ---------- */
  MM.solde = function (enfantId) {
    return MM.etat.mouvements.filter(m => m.enfant_id === enfantId).reduce((s, m) => s + m.points_enfant, 0);
  };
  MM.communs = function () {
    const mv = MM.etat.mouvements;
    const total = mv.reduce((s, m) => s + m.points_commun, 0);
    const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(1);
    const mois = mv.filter(m => new Date(m.created_at) >= d).reduce((s, m) => s + m.points_commun, 0);
    const P = MM.PALIERS;
    const t = Math.max(0, total);
    const aventures = Math.floor(t / P.aventure);
    const cycle = t - aventures * P.aventure;
    return { total, mois: Math.max(0, mois), cycle, aventures, sortieOk: cycle >= P.sortie, moisOk: mois >= P.mois };
  };
  MM.htmlObjectifs = function () {
    const c = MM.communs(), P = MM.PALIERS;
    return '<div class="pile">' +
      '<div class="carte pile" style="gap:6px"><div class="ligne entre"><strong>Ce mois-ci · soirée pizza ou Uber Eats + film</strong><span class="petit">' + c.mois + ' / ' + P.mois + '</span></div>' +
      '<div class="barre claire"><div style="width:' + MM.pct(c.mois, P.mois) + '%"></div></div>' +
      '<span class="petit">' + (c.moisOk ? '🎉 Palier du mois atteint !' : 'Repart à zéro le 1er du mois') + '</span></div>' +
      '<div class="carte pile" style="gap:6px"><div class="ligne entre"><strong>Sortie en famille</strong><span class="petit">' + Math.min(c.cycle, P.sortie) + ' / ' + P.sortie + '</span></div>' +
      '<div class="barre orange"><div style="width:' + MM.pct(c.cycle, P.sortie) + '%"></div></div>' +
      '<span class="petit">' + (c.sortieOk ? '🎉 Débloquée ! Bowling, laser game ou cinéma' : 'Bowling, laser game ou cinéma, au choix des filles') + '</span></div>' +
      '<div class="carte-sombre pile" style="gap:6px"><div class="ligne entre"><strong>Grande aventure en famille</strong><span class="petit">' + c.cycle + ' / ' + P.aventure + '</span></div>' +
      '<div class="barre sombre"><div style="width:' + MM.pct(c.cycle, P.aventure) + '%"></div></div>' +
      '<span class="petit">Grand parc d\'attractions ou de loisirs, ou week-end dans une autre ville avec nuit d\'hôtel' +
      (c.aventures ? ' · Déjà ' + c.aventures + ' aventure' + (c.aventures > 1 ? 's' : '') + ' gagnée' + (c.aventures > 1 ? 's' : '') + ' !' : '') + '</span></div>' +
      '</div>';
  };

  /* ---------- Photos ---------- */
  MM.compresser = function (fichier) {
    return new Promise((ok, ko) => {
      const img = new Image();
      const url = URL.createObjectURL(fichier);
      img.onload = () => {
        const max = 1280;
        let w = img.naturalWidth, h = img.naturalHeight;
        if (w > max || h > max) { const r = Math.min(max / w, max / h); w = Math.round(w * r); h = Math.round(h * r); }
        const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
        cv.getContext('2d').drawImage(img, 0, 0, w, h);
        URL.revokeObjectURL(url);
        cv.toBlob(b => b ? ok(b) : ko(new Error('Photo illisible')), 'image/jpeg', 0.72);
      };
      img.onerror = () => { URL.revokeObjectURL(url); ko(new Error('Photo illisible')); };
      img.src = url;
    });
  };
  MM.envoyerPhoto = async function (fichier, dossier) {
    const blob = await MM.compresser(fichier);
    const chemin = MM.etat.user.id + '/' + (dossier || 'mission') + '-' + Date.now() + '.jpg';
    const { error } = await sb.storage.from('photos').upload(chemin, blob, { contentType: 'image/jpeg', upsert: false });
    if (error) throw error;
    return chemin;
  };
  MM.supprimerPhoto = async function (chemin) {
    if (!chemin) return;
    try { await sb.storage.from('photos').remove([chemin]); } catch (e) { /* sans gravité */ }
  };
  // Remplit les <img data-photo="chemin"> avec un lien temporaire sécurisé
  MM.chargerPhotos = async function () {
    const imgs = Array.from(document.querySelectorAll('img[data-photo]'));
    for (const img of imgs) {
      const chemin = img.getAttribute('data-photo');
      if (!chemin) continue;
      MM._urls = MM._urls || {};
      if (!MM._urls[chemin]) {
        const { data } = await sb.storage.from('photos').createSignedUrl(chemin, 3600);
        if (data) MM._urls[chemin] = data.signedUrl;
      }
      if (MM._urls[chemin]) img.src = MM._urls[chemin];
    }
  };

  // Ouvre l'appareil photo puis appelle `suite(fichier)`
  MM.prendrePhoto = function (suite) {
    const inp = document.createElement('input');
    inp.type = 'file'; inp.accept = 'image/*'; inp.setAttribute('capture', 'environment');
    inp.onchange = () => { if (inp.files && inp.files[0]) suite(inp.files[0]); };
    inp.click();
  };

  /* ---------- Données ---------- */
  MM.charger = async function () {
    const depuis = new Date(Date.now() - 100 * 86400000).toISOString();
    const q = (t) => sb.from(t);
    const [pr, mi, re, mv, no, se, bo, rc, so, id, al] = await Promise.all([
      q('profiles').select('*'),
      q('missions').select('*').order('ordre').order('id'),
      q('realisations').select('*').or('statut.in.(reservee,envoyee),created_at.gte.' + depuis).neq('statut', 'annulee').order('created_at', { ascending: false }),
      q('mouvements').select('*').order('created_at', { ascending: false }),
      q('notes').select('*').order('created_at', { ascending: false }).limit(100),
      q('code_sessions').select('*').order('created_at', { ascending: false }).limit(60),
      q('bonus').select('*').order('created_at', { ascending: false }),
      q('recompenses').select('*').order('created_at', { ascending: false }),
      q('sorties').select('*').order('id'),
      q('idees').select('*').order('created_at', { ascending: false }).limit(50),
      q('alertes').select('*').eq('active', true)
    ]);
    const err = [pr, mi, re, mv, no, se, bo, rc, so, id, al].find(r => r.error);
    if (err) throw err.error;
    Object.assign(MM.etat, {
      profils: pr.data, missions: mi.data, realisations: re.data, mouvements: mv.data, notes: no.data,
      sessions: se.data, bonus: bo.data, recompenses: rc.data, sorties: so.data, idees: id.data, alertes: al.data
    });
    MM.etat.profil = MM.etat.profils.find(p => p.id === MM.etat.user.id) || null;
  };

  MM.rafraichir = async function () {
    if (!MM.etat.user || MM.etat.chargement) return;
    if (MM.etat.pause) return; // ex. pendant une session de code
    const ae = document.activeElement;
    if (ae && ['INPUT', 'TEXTAREA', 'SELECT'].includes(ae.tagName)) return; // ne pas effacer une saisie en cours
    MM.etat.chargement = true;
    try { await MM.charger(); MM.afficher(); } catch (e) { /* hors ligne : on réessaiera */ }
    MM.etat.chargement = false;
  };

  // Appel d'une fonction de la base, puis rechargement
  MM.rpc = async function (nom, args, messageOk) {
    const { data, error } = await sb.rpc(nom, args || {});
    if (error) { MM.erreur(error); throw error; }
    if (messageOk) MM.toast(messageOk);
    await MM.charger();
    MM.afficher();
    return data;
  };

  /* ---------- Affichage ---------- */
  MM.ongletsDisponibles = function () {
    const p = MM.etat.profil;
    if (!p) return [];
    if (p.role === 'parent') return MM.vues.parentOnglets ? MM.vues.parentOnglets() : [];
    return MM.vues.enfantOnglets ? MM.vues.enfantOnglets() : [];
  };

  MM.afficher = function () {
    const app = document.getElementById('app');
    if (!MM.etat.user) { app.innerHTML = MM.vueConnexion(); return MM.brancherConnexion(); }
    if (!MM.etat.profil) {
      app.innerHTML = '<div class="connexion"><div class="logo">Mission Maison</div><div class="carte-rouge">Ce compte n\'a pas de profil dans la base. Vérifie que le script SQL a bien été lancé avant de créer les comptes.</div><button class="btn btn-contour" data-action="deconnexion">Se déconnecter</button></div>';
      return;
    }
    const onglets = MM.ongletsDisponibles();
    if (!onglets.find(o => o.id === MM.etat.onglet)) MM.etat.onglet = onglets[0].id;
    const courant = onglets.find(o => o.id === MM.etat.onglet);
    const scroll = window.scrollY;
    MM.etat.pause = false;
    app.innerHTML = courant.rendu() +
      '<nav class="onglets" aria-label="Navigation principale"><div class="dedans">' +
      onglets.map(o => '<button data-onglet="' + o.id + '" class="' + (o.id === MM.etat.onglet ? 'actif' : '') + '"' +
        (o.id === MM.etat.onglet ? ' aria-current="page"' : '') + '>' + MM.icone(o.icone) + o.nom +
        (o.bulle ? '<span class="bulle">' + o.bulle + '</span>' : '') + '</button>').join('') +
      '</div></nav>';
    if (MM._gardeScroll) window.scrollTo(0, scroll);
    MM._gardeScroll = false;
    MM.chargerPhotos();
    if (courant.apres) courant.apres();
  };

  MM.allerA = function (onglet) {
    MM.etat.onglet = onglet;
    MM.afficher();
    window.scrollTo(0, 0);
  };

  /* ---------- Connexion ---------- */
  MM.vueConnexion = function () {
    const choix = MM._choixProfil;
    return '<div class="connexion">' +
      '<div><div class="logo">Mission Maison</div><p class="sous-titre">Qui es-tu ?</p></div>' +
      '<div class="profils">' + ['Lili', 'Romy', 'Papa', 'Maman'].map(n =>
        '<button data-profil="' + n + '" class="' + (choix === n ? 'actif' : '') + '">' + n + '</button>').join('') + '</div>' +
      (choix ? '<form id="form-connexion" class="pile">' +
        '<label class="champ">Mot de passe de ' + MM.esc(choix) + '<input type="password" id="mdp" autocomplete="current-password" required></label>' +
        '<button class="btn btn-vert btn-plein" type="submit">Se connecter</button></form>' : '') +
      '<p class="petit">Tu ne te connectes qu\'une seule fois sur ton téléphone.</p></div>';
  };
  MM.brancherConnexion = function () {
    document.querySelectorAll('[data-profil]').forEach(b => b.onclick = () => {
      MM._choixProfil = b.getAttribute('data-profil'); MM.afficher();
      setTimeout(() => { const i = document.getElementById('mdp'); if (i) i.focus(); }, 50);
    });
    const f = document.getElementById('form-connexion');
    if (f) f.onsubmit = async (e) => {
      e.preventDefault();
      const btn = f.querySelector('button'); btn.disabled = true; btn.textContent = 'Connexion…';
      const email = MM._choixProfil.toLowerCase() + '@' + C.domaine;
      const { error } = await sb.auth.signInWithPassword({ email, password: document.getElementById('mdp').value });
      if (error) {
        MM.toast('Mot de passe incorrect.', true); btn.disabled = false; btn.textContent = 'Se connecter';
      }
    };
  };

  /* ---------- Clics (délégation) ---------- */
  MM.actions = {
    deconnexion: async () => {
      if (!confirm('Se déconnecter de Mission Maison sur ce téléphone ?')) return;
      await sb.auth.signOut();
    }
  };
  document.addEventListener('click', async (e) => {
    const o = e.target.closest('[data-onglet]');
    if (o) { MM.allerA(o.getAttribute('data-onglet')); return; }
    const a = e.target.closest('[data-action]');
    if (!a) return;
    const fn = MM.actions[a.getAttribute('data-action')];
    if (!fn) return;
    e.preventDefault();
    if (a.dataset.occupe) return;
    a.dataset.occupe = '1';
    try { await fn(a, e); } catch (err) { /* déjà signalé */ }
    delete a.dataset.occupe;
  });

  /* ---------- Démarrage ---------- */
  MM.demarrer = async function () {
    sb.auth.onAuthStateChange(async (evt, session) => {
      const avant = MM.etat.user && MM.etat.user.id;
      MM.etat.user = session ? session.user : null;
      if (!session) { MM.etat.profil = null; MM.afficher(); return; }
      if (avant === session.user.id && evt !== 'SIGNED_IN') return;
      try { await MM.charger(); } catch (e) { MM.erreur(e); }
      MM.afficher();
    });
    const { data } = await sb.auth.getSession();
    if (!data.session) { MM.etat.user = null; MM.afficher(); }
    document.addEventListener('visibilitychange', () => { if (!document.hidden) MM.rafraichir(); });
    setInterval(() => { if (!document.hidden) { MM._gardeScroll = true; MM.rafraichir(); } }, 30000);
  };
})();
