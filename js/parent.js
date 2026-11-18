/* Mission Maison — espace parents */
(function () {
  const MM = window.MM, esc = MM.esc, E = MM.etat;

  MM.MOTIFS_RETRAIT = [
    { motif: 'Chambre très mal rangée', points: 15 },
    { motif: 'Armoire mal rangée, affaires mal pliées', points: 15 },
    { motif: 'Salle de bain sale', points: 25 },
    { motif: 'Problème de comportement', points: 25 },
    { motif: 'Langage inapproprié', points: 25 },
    { motif: 'Remarque pour devoir non fait (vérifiée sur Pronote)', points: 25 }
  ];
  const PERIODES = [
    ['repas', 'Par repas'], ['jour', 'Par jour'], ['semaine', 'Par semaine'], ['quinzaine', 'Toutes les 2 semaines'],
    ['mois', 'Par mois'], ['trimestre', 'Par trimestre'], ['evenement', 'Sans limite automatique']
  ];

  function texteLimite(periode, max) {
    if (periode === 'evenement') return 'quand c\'est nécessaire';
    const n = (max || 1) + ' fois ';
    return n + ({ repas: 'par repas', jour: 'par jour', semaine: 'par semaine', quinzaine: 'toutes les 2 semaines', mois: 'par mois', trimestre: 'par trimestre' }[periode] || '');
  }
  function aValider() {
    return E.realisations.filter(r => r.statut === 'envoyee').length + E.notes.filter(n => n.statut === 'envoyee').length;
  }
  function aRemettre() {
    return E.recompenses.filter(r => !r.remise).length + E.bonus.filter(b => b.statut !== 'disponible' && !b.remis).length;
  }

  function fichesBulle() {
    const n = MM.contenusEnAttente ? MM.contenusEnAttente() : 0;
    return n ? (n > 99 ? '99+' : n) : null;
  }
  const EMOJI_CAT = { avenir: '🧭 ', argent: '💰 ' };

  MM.vues.parentOnglets = function () {
    const idees = E.idees.filter(i => i.statut === 'en_attente').length;
    return [
      { id: 'valider', nom: 'À valider', icone: 'check', rendu: vueValider, bulle: aValider() || null },
      { id: 'retrait', nom: 'Retraits', icone: 'moins', rendu: vueRetrait, apres: brancherRetrait },
      { id: 'remettre', nom: 'À remettre', icone: 'cadeau', rendu: vueRemettre, bulle: aRemettre() || null },
      { id: 'missions', nom: 'Missions', icone: 'liste', rendu: vueMissions, bulle: idees || null },
      { id: 'contenus', nom: 'Fiches', icone: 'fiche', rendu: MM.vues.contenus, bulle: fichesBulle() },
      { id: 'famille', nom: 'Famille', icone: 'famille', rendu: vueFamille }
    ];
  };

  function entete(titre) {
    return '<div class="entete"><div><div class="sous-titre">' + esc(E.profil.prenom) + ' · espace parents</div><h1>' + esc(titre) + '</h1></div>' +
      '<button class="avatar" style="background:var(--orange);color:var(--encre)" data-action="deconnexion" aria-label="Se déconnecter">' + esc(E.profil.prenom.charAt(0)) + '</button></div>';
  }

  function cartesSoldes() {
    return '<div class="grille2">' + MM.enfants().map((p, i) =>
      '<div class="' + (i === 0 ? 'carte-verte' : 'carte') + '" style="' + (i === 0 ? '' : 'background:var(--orange);color:var(--encre)') + ';padding:12px;border-radius:14px">' +
      '<div style="font-size:12px">' + esc(p.prenom) + '</div><div style="font-family:var(--titre);font-weight:800;font-size:28px">' + MM.solde(p.id) + ' pts</div></div>').join('') + '</div>';
  }

  /* ================= À VALIDER ================= */
  function vueValider() {
    let h = entete('À valider') + cartesSoldes();
    const linge = E.alertes.some(a => a.type === 'linge' && a.active);
    h += '<div style="margin-top:12px">' + (linge
      ? '<button class="btn btn-plein" style="background:var(--jaune);color:var(--encre)" data-action="fermer-linge">' + MM.icone('linge', 20) + 'Alerte linge en cours · la retirer</button>'
      : '<button class="btn btn-plein" style="background:var(--encre);color:#fff" data-action="signaler-linge">' + MM.icone('linge', 20) + 'Machine terminée : prévenir les filles</button>') + '</div>';

    const rs = E.realisations.filter(r => r.statut === 'envoyee').sort((a, b) => new Date(a.envoye_at) - new Date(b.envoye_at));
    const ns = E.notes.filter(n => n.statut === 'envoyee');
    h += '<h2>Missions (' + rs.length + ')</h2><div class="pile">';
    if (!rs.length) h += '<div class="vide">Rien à valider pour l\'instant.</div>';
    rs.forEach(r => {
      const m = E.missions.find(x => x.id === r.mission_id) || { titre: 'Mission' };
      h += carteValidation('mission', r.id, (EMOJI_CAT[m.categorie] || '') + m.titre, MM.profilDe(r.enfant_id).prenom + ' · +' + r.points + ' pts · ' + MM.depuis(r.envoye_at), r.photo_path, r.texte);
    });
    h += '</div><h2>Notes (' + ns.length + ')</h2><div class="pile">';
    if (!ns.length) h += '<div class="vide">Aucune note en attente.</div>';
    ns.forEach(n => {
      const t = n.matiere + ' · ' + String(Number(n.note)).replace('.', ',') + '/' + String(Number(n.sur)).replace('.', ',') +
        (Number(n.sur) !== 20 ? ' (' + String(Number(n.note20)).replace('.', ',') + '/20)' : '');
      h += carteValidation('note', n.id, t, MM.profilDe(n.enfant_id).prenom + ' · +' + n.points + ' pts' + (Number(n.bonus) ? ' + bonus ' + MM.euros(n.bonus) : '') + ' · ' + MM.depuis(n.created_at), n.photo_path);
    });
    return h + '</div>';
  }
  function carteValidation(type, id, titre, info, photo, texte) {
    return '<div class="carte pile"><div><strong>' + esc(titre) + '</strong><div class="petit">' + esc(info) + '</div></div>' +
      (photo ? '<img class="photo-apercu" alt="Photo envoyée" data-photo="' + esc(photo) + '">' : '') +
      (texte ? '<div class="texte-envoye">' + esc(texte) + '</div>' : '') +
      '<label class="champ">Petit mot (facultatif, surtout en cas de refus)<input type="text" id="mot-' + type + '-' + id + '" placeholder="Ex. : il manque les verres"></label>' +
      '<div class="grille2"><button class="btn btn-contour" data-action="decider" data-type="' + type + '" data-id="' + id + '" data-ok="0">' + MM.icone('croix', 18) + (type === 'mission' ? 'À refaire' : 'Refuser') + '</button>' +
      '<button class="btn btn-vert" data-action="decider" data-type="' + type + '" data-id="' + id + '" data-ok="1">' + MM.icone('check', 18) + 'Valider</button></div></div>';
  }
  MM.actions.decider = async (b) => {
    const type = b.dataset.type, id = Number(b.dataset.id), ok = b.dataset.ok === '1';
    const mot = (document.getElementById('mot-' + type + '-' + id) || {}).value || null;
    const ligne = type === 'mission' ? E.realisations.find(r => r.id === id) : E.notes.find(n => n.id === id);
    const photo = ligne && ligne.photo_path;
    await MM.rpc(type === 'mission' ? 'decider_realisation' : 'decider_note', { p_id: id, p_ok: ok, p_commentaire: mot },
      ok ? 'Validé : les points sont arrivés.' : (type === 'mission' ? 'Renvoyé avec ton petit mot.' : 'Note refusée.'));
    MM.supprimerPhoto(photo); // la photo ne sert plus
  };
  MM.actions['signaler-linge'] = async () => { await MM.rpc('signaler_linge', {}, 'Les filles sont prévenues.'); };
  MM.actions['fermer-linge'] = async () => { await MM.rpc('fermer_linge', {}, 'Alerte linge retirée.'); };

  /* ================= RETRAITS ================= */
  function vueRetrait() {
    const f = E.formRetrait || (E.formRetrait = { enfant: (MM.enfants()[0] || {}).id, motif: 0, autre: '', montant: '' });
    let h = entete('Retirer des points');
    h += '<div class="grille2" style="background:#fff;padding:4px;border-radius:14px">' + MM.enfants().map(p =>
      '<button class="btn ' + (f.enfant === p.id ? 'btn-vert' : '') + '" style="' + (f.enfant === p.id ? '' : 'background:transparent;color:var(--gris)') + '" data-action="retrait-enfant" data-id="' + p.id + '">' + esc(p.prenom) + '</button>').join('') + '</div>';
    h += '<h2>Motif</h2><div class="pile">' + MM.MOTIFS_RETRAIT.map((m, i) =>
      '<button class="btn btn-plein" style="justify-content:space-between;text-align:left;background:' + (f.motif === i ? 'var(--rouge-clair);border:2px solid var(--rouge)' : '#fff;border:2px solid var(--bord)') + ';font-weight:600" data-action="retrait-motif" data-i="' + i + '">' +
      esc(m.motif) + '<span style="color:#991B1B;font-weight:800">−' + m.points + '</span></button>').join('') +
      '<button class="btn btn-plein" style="justify-content:space-between;background:' + (f.motif === -1 ? 'var(--rouge-clair);border:2px solid var(--rouge)' : '#fff;border:2px solid var(--bord)') + ';font-weight:600" data-action="retrait-motif" data-i="-1">Autre motif<span style="color:#991B1B;font-weight:800">montant libre</span></button></div>';
    if (f.motif === -1) {
      h += '<div class="carte pile" style="margin-top:10px"><label class="champ">Motif<input type="text" id="retrait-autre" value="' + esc(f.autre) + '"></label>' +
        '<label class="champ">Points à retirer<input type="number" id="retrait-montant" inputmode="numeric" min="1" value="' + esc(f.montant) + '"></label></div>';
    }
    const montant = montantRetrait();
    const solde = MM.solde(f.enfant), c = MM.communs();
    h += '<div style="margin-top:12px"><button class="btn btn-contour btn-plein" data-action="retrait-photo">' + MM.icone('photo', 20) + (E.retraitFichier ? 'Changer la photo' : 'Ajouter une photo (facultatif)') + '</button></div>' +
      (E.retraitFichier ? '<img class="photo-apercu" style="margin-top:10px" alt="Photo jointe" src="' + E.retraitFichierUrl + '">' : '');
    h += '<div class="carte pile" style="margin-top:12px;font-size:14px" id="retrait-impact">' + impact(solde, montant, c) + '</div>' +
      '<button class="btn btn-rouge btn-plein" style="margin-top:12px" data-action="retirer">Retirer ' + (montant || '') + ' points</button>' +
      '<p class="petit">Pas d\'avertissement : le retrait est immédiat. Le compteur de la fille ne descend jamais sous 0, mais l\'objectif commun perd le montant complet.</p>';

    const derniers = E.mouvements.filter(m => m.type === 'retrait').slice(0, 8);
    if (derniers.length) {
      h += '<h2>Derniers retraits</h2><div class="pile">' + derniers.map(m =>
        '<div class="mission"><div class="texte"><span class="titre">' + esc(MM.profilDe(m.enfant_id).prenom) + ' · ' + esc(m.libelle) + '</span><span class="petit">' + MM.dateCourte(m.created_at) + ' · par ' + esc(MM.profilDe(m.created_par).prenom) + '</span></div>' +
        '<span class="pastille moins">' + m.points_commun + '</span></div>').join('') + '</div>';
    }
    return h;
  }
  function impact(solde, montant, c) {
    const nom = esc(MM.profilDe(E.formRetrait.enfant).prenom);
    return '<div class="ligne entre"><span>Points de ' + nom + '</span><strong>' + solde + ' → ' + Math.max(0, solde - montant) + '</strong></div>' +
      '<div class="ligne entre"><span>Objectif du mois</span><strong>' + c.mois + ' → ' + Math.max(0, c.mois - montant) + '</strong></div>';
  }
  function montantRetrait() {
    const f = E.formRetrait;
    if (f.motif >= 0) return MM.MOTIFS_RETRAIT[f.motif].points;
    return parseInt(f.montant, 10) || 0;
  }
  function brancherRetrait() {
    const a = document.getElementById('retrait-autre'), m = document.getElementById('retrait-montant');
    const maj = () => {
      E.formRetrait.autre = a ? a.value : ''; E.formRetrait.montant = m ? m.value : '';
      const z = document.getElementById('retrait-impact');
      if (z) z.innerHTML = impact(MM.solde(E.formRetrait.enfant), montantRetrait(), MM.communs());
      const btn = document.querySelector('[data-action="retirer"]');
      if (btn) btn.textContent = 'Retirer ' + (montantRetrait() || '') + ' points';
    };
    if (a) a.oninput = maj;
    if (m) m.oninput = maj;
  }
  MM.actions['retrait-enfant'] = async (b) => { E.formRetrait.enfant = b.dataset.id; MM.afficher(); };
  MM.actions['retrait-motif'] = async (b) => { E.formRetrait.motif = Number(b.dataset.i); MM._gardeScroll = true; MM.afficher(); };
  MM.actions['retrait-photo'] = async () => {
    MM.prendrePhoto((f) => { E.retraitFichier = f; E.retraitFichierUrl = URL.createObjectURL(f); MM._gardeScroll = true; MM.afficher(); });
  };
  MM.actions.retirer = async () => {
    const f = E.formRetrait, montant = montantRetrait();
    const motif = f.motif >= 0 ? MM.MOTIFS_RETRAIT[f.motif].motif : (f.autre || '').trim();
    if (!motif) { MM.toast('Indique le motif.', true); return; }
    if (!montant || montant < 1) { MM.toast('Indique le nombre de points.', true); return; }
    if (!confirm('Retirer ' + montant + ' points à ' + MM.profilDe(f.enfant).prenom + ' pour « ' + motif + ' » ?')) return;
    let chemin = null;
    if (E.retraitFichier) { MM.toast('Envoi de la photo…'); chemin = await MM.envoyerPhoto(E.retraitFichier, 'retrait'); }
    await MM.rpc('retirer_points', { p_enfant: f.enfant, p_motif: motif, p_montant: montant, p_photo: chemin }, 'Points retirés.');
    E.retraitFichier = null; E.formRetrait = { enfant: f.enfant, motif: 0, autre: '', montant: '' }; MM.afficher();
  };

  /* ================= À REMETTRE ================= */
  function vueRemettre() {
    let h = entete('À remettre');
    const rc = E.recompenses.filter(r => !r.remise);
    const bo = E.bonus.filter(b => b.statut !== 'disponible' && !b.remis);
    h += '<h2>Récompenses (200 points)</h2><div class="pile">';
    if (!rc.length) h += '<div class="vide">Aucune récompense à remettre.</div>';
    rc.forEach(r => {
      const quoi = r.type === 'argent' ? 'Donner 20 € d\'argent de poche'
        : r.type === 'sortie' ? 'Organiser la sortie : ' + r.sortie
          : r.type === 'epargne' ? 'Verser 30 € sur son compte (20 € + vos 10 €)'
            : 'Donner 10 € en poche et verser 15 € sur son compte (10 € + vos 5 €)';
      h += '<div class="carte pile"><div><strong>' + esc(MM.profilDe(r.enfant_id).prenom) + ' · ' + esc(quoi) + '</strong><div class="petit">Demandée ' + MM.depuis(r.created_at) + '</div></div>' +
        '<button class="btn btn-vert" data-action="remettre-recompense" data-id="' + r.id + '">' + MM.icone('check', 18) + 'C\'est fait</button></div>';
    });
    h += '</div><h2>Bonus en euros</h2><div class="pile">';
    if (!bo.length) h += '<div class="vide">Aucun bonus à remettre.</div>';
    bo.forEach(b => {
      const quoi = b.statut === 'encaisse' ? 'Donner ' + MM.euros(b.montant) : 'Verser ' + MM.euros(Number(b.montant) + Number(b.abondement)) + ' sur son compte (' + MM.euros(b.montant) + ' + vos ' + MM.euros(b.abondement) + ')';
      h += '<div class="carte pile"><div><strong>' + esc(MM.profilDe(b.enfant_id).prenom) + ' · ' + esc(quoi) + '</strong><div class="petit">' + esc(b.motif) + '</div></div>' +
        '<button class="btn btn-vert" data-action="remettre-bonus" data-id="' + b.id + '">' + MM.icone('check', 18) + 'C\'est fait</button></div>';
    });
    h += '</div><h2>Bonus pas encore choisis</h2><div class="pile">';
    const dispo = E.bonus.filter(b => b.statut === 'disponible');
    if (!dispo.length) h += '<div class="vide">Aucun.</div>';
    dispo.forEach(b => { h += '<div class="mission"><div class="texte"><span class="titre">' + esc(MM.profilDe(b.enfant_id).prenom) + ' · ' + esc(b.motif) + '</span><span class="petit">Elle doit choisir : encaisser ou épargner</span></div><span class="pastille attente">' + MM.euros(b.montant) + '</span></div>'; });
    return h + '</div>';
  }
  MM.actions['remettre-recompense'] = async (b) => { await MM.rpc('remettre_recompense', { p_id: Number(b.dataset.id) }, 'Noté comme remis.'); };
  MM.actions['remettre-bonus'] = async (b) => { await MM.rpc('remettre_bonus', { p_id: Number(b.dataset.id) }, 'Noté comme remis.'); };

  /* ================= MISSIONS & IDÉES ================= */
  function vueMissions() {
    let h = entete('Missions');
    const idees = E.idees.filter(i => i.statut === 'en_attente');
    if (idees.length) {
      h += '<h2>Idées des filles (' + idees.length + ')</h2><div class="pile">';
      idees.forEach(i => {
        h += '<div class="carte pile"><div><strong>' + esc(MM.profilDe(i.enfant_id).prenom) + ' propose une ' + (i.type === 'mission' ? 'mission' : 'sortie') + '</strong><div>« ' + esc(i.texte) + ' »</div></div>' +
          '<label class="champ">Intitulé<input type="text" id="idee-titre-' + i.id + '" value="' + esc(i.texte) + '"></label>' +
          (i.type === 'mission' ? '<div class="grille2"><label class="champ">Points<input type="number" id="idee-points-' + i.id + '" min="1" value="2"></label>' +
            '<label class="champ">Limite<select id="idee-periode-' + i.id + '">' + PERIODES.map(p => '<option value="' + p[0] + '"' + (p[0] === 'semaine' ? ' selected' : '') + '>' + p[1] + '</option>').join('') + '</select></label></div>' : '') +
          '<label class="champ">Réponse à ' + esc(MM.profilDe(i.enfant_id).prenom) + '<input type="text" id="idee-reponse-' + i.id + '" placeholder="Ex. : bonne idée !"></label>' +
          '<div class="grille2"><button class="btn btn-contour" data-action="idee" data-id="' + i.id + '" data-ok="0">Refuser</button><button class="btn btn-vert" data-action="idee" data-id="' + i.id + '" data-ok="1">Accepter</button></div></div>';
      });
      h += '</div>';
    }
    h += '<h2>Liste des missions</h2><div class="pile">';
    E.missions.forEach(m => {
      if (E.editMission === m.id) { h += formMission(m); return; }
      h += '<div class="mission' + (m.actif ? '' : ' bloquee') + '"><div class="texte"><span class="titre">' + (EMOJI_CAT[m.categorie] || '') + esc(m.titre) + '</span><span class="petit">' + esc(m.limite_texte) + (m.perso ? ' · chacune la sienne' : '') + (m.actif ? '' : ' · désactivée') + '</span></div>' +
        '<span class="pastille points">+' + m.points + '</span><button class="btn btn-clair btn-petit" data-action="edit-mission" data-id="' + m.id + '">Modifier</button></div>';
    });
    h += '</div><div style="margin-top:12px">' + (E.editMission === 'nouvelle' ? formMission({ id: 'nouvelle', titre: '', points: 2, periode: 'semaine', max_par_periode: 1, limite_texte: '', perso: false, actif: true })
      : '<button class="btn btn-orange btn-plein" data-action="edit-mission" data-id="nouvelle">' + MM.icone('plus', 20) + 'Nouvelle mission</button>') + '</div>';

    h += '<h2>Sorties au choix</h2><div class="pile">' + E.sorties.map(s =>
      '<div class="mission' + (s.actif ? '' : ' bloquee') + '"><div class="texte"><span class="titre">' + esc(s.nom) + '</span></div>' +
      '<button class="btn btn-contour btn-petit" data-action="sortie-actif" data-id="' + s.id + '">' + (s.actif ? 'Retirer' : 'Remettre') + '</button></div>').join('') +
      '<form id="form-sortie" class="ligne"><input type="text" id="nouvelle-sortie" placeholder="Nouvelle sortie"><button class="btn btn-vert" type="submit">Ajouter</button></form></div>';
    return h;
  }
  function formMission(m) {
    return '<form class="carte pile" id="form-mission" data-id="' + m.id + '" style="border:2px solid var(--vert)">' +
      '<label class="champ">Intitulé<input type="text" name="titre" value="' + esc(m.titre) + '" required></label>' +
      '<div class="grille2"><label class="champ">Points<input type="number" name="points" min="1" value="' + m.points + '" required></label>' +
      '<label class="champ">Combien de fois<input type="number" name="max" min="1" value="' + m.max_par_periode + '"></label></div>' +
      '<label class="champ">Période de la limite<select name="periode">' + PERIODES.map(p => '<option value="' + p[0] + '"' + (p[0] === m.periode ? ' selected' : '') + '>' + p[1] + '</option>').join('') + '</select></label>' +
      '<label class="champ">Texte de la limite (affiché aux filles)<input type="text" name="limite" value="' + esc(m.limite_texte) + '" placeholder="Ex. : 1 fois par semaine"></label>' +
      '<label class="case"><input type="checkbox" name="perso"' + (m.perso ? ' checked' : '') + '>Chacune la sienne (ex. sa chambre)</label>' +
      '<label class="case"><input type="checkbox" name="actif"' + (m.actif ? ' checked' : '') + '>Mission active</label>' +
      '<div class="grille2"><button type="button" class="btn btn-contour" data-action="annuler-edit">Annuler</button><button type="submit" class="btn btn-vert">Enregistrer</button></div>' +
      '<span class="petit">« Par repas » autorise 2 fois par jour (midi et soir).</span></form>';
  }
  MM.actions['edit-mission'] = async (b) => { E.editMission = b.dataset.id === 'nouvelle' ? 'nouvelle' : Number(b.dataset.id); MM._gardeScroll = true; MM.afficher(); };
  MM.actions['annuler-edit'] = async () => { E.editMission = null; MM._gardeScroll = true; MM.afficher(); };
  MM.actions['sortie-actif'] = async (b) => {
    const s = E.sorties.find(x => x.id === Number(b.dataset.id));
    const { error } = await MM.sb.from('sorties').update({ actif: !s.actif }).eq('id', s.id);
    if (error) return MM.erreur(error);
    await MM.rafraichirForce();
  };
  MM.actions.idee = async (b) => {
    const id = Number(b.dataset.id), ok = b.dataset.ok === '1', v = (k) => (document.getElementById('idee-' + k + '-' + id) || {}).value;
    const periode = v('periode') || 'semaine';
    await MM.rpc('repondre_idee', {
      p_id: id, p_ok: ok, p_reponse: v('reponse') || null, p_titre: v('titre') || null, p_points: parseInt(v('points'), 10) || 2,
      p_periode: periode, p_max: 1, p_limite_texte: texteLimite(periode, 1), p_perso: false
    }, ok ? 'Idée acceptée !' : 'Réponse envoyée.');
  };
  MM.rafraichirForce = async function () { await MM.charger(); MM._gardeScroll = true; MM.afficher(); };

  document.addEventListener('submit', async (e) => {
    if (e.target.id === 'form-mission') {
      e.preventDefault();
      const f = e.target, id = f.dataset.id;
      const periode = f.periode.value, max = parseInt(f.max.value, 10) || 1;
      const ligne = {
        titre: f.titre.value.trim(), points: parseInt(f.points.value, 10), periode, max_par_periode: max,
        limite_texte: f.limite.value.trim() || texteLimite(periode, max),
        perso: f.perso.checked, actif: f.actif.checked
      };
      if (!ligne.titre || !(ligne.points > 0)) { MM.toast('Intitulé et points obligatoires.', true); return; }
      const q = id === 'nouvelle' ? MM.sb.from('missions').insert(Object.assign({ ordre: 100 }, ligne)) : MM.sb.from('missions').update(ligne).eq('id', Number(id));
      const { error } = await q;
      if (error) return MM.erreur(error);
      E.editMission = null; MM.toast('Mission enregistrée.');
      await MM.rafraichirForce();
    }
    if (e.target.id === 'form-sortie') {
      e.preventDefault();
      const nom = document.getElementById('nouvelle-sortie').value.trim();
      if (!nom) return;
      const { error } = await MM.sb.from('sorties').insert({ nom });
      if (error) return MM.erreur(error);
      MM.toast('Sortie ajoutée.'); await MM.rafraichirForce();
    }
  });

  /* ================= FAMILLE ================= */
  function vueFamille() {
    let h = entete('Famille') + cartesSoldes();
    if (!E.migrationAvenir && MM.htmlMigrationManquante) h += '<div style="margin-top:12px">' + MM.htmlMigrationManquante() + '</div>';
    h += '<h2>Objectifs communs</h2>' + MM.htmlObjectifs();
    if (E.migrationAvenir && window.MM_METIERS) h += suiviAvenir();
    h += '<h2>Épargne</h2><div class="pile">' + MM.enfants().map(p => {
      const ep = MM.epargne(p.id);
      return '<div class="mission"><div class="texte"><span class="titre">' + esc(p.prenom) + ' · ' + MM.euros(ep.total) + ' mis de côté</span><span class="petit">Sa part ' + MM.euros(ep.part) + ' · votre ajout ' + MM.euros(ep.abond) + (ep.attente ? ' · ' + MM.euros(ep.attente) + ' à verser' : '') + '</span></div></div>';
    }).join('') + '</div>';

    h += '<h2>Réglages</h2><div class="carte pile">' + MM.enfants().map(p =>
      '<div class="pile" style="gap:2px"><strong>' + esc(p.prenom) + '</strong>' +
      '<label class="case"><input type="checkbox" data-reglage="notes_actives" data-id="' + p.id + '"' + (p.notes_actives ? ' checked' : '') + '>Les notes rapportent des points</label>' +
      '<label class="case"><input type="checkbox" data-reglage="bonus_note_18" data-id="' + p.id + '"' + (p.bonus_note_18 ? ' checked' : '') + '>Bonus de 5 € pour une note de 18 à 19,5</label>' +
      '<label class="case"><input type="checkbox" data-reglage="code_actif" data-id="' + p.id + '"' + (p.code_actif ? ' checked' : '') + '>Sessions de code de la route</label>' +
      (E.migrationAvenir ? '<label class="case"><input type="checkbox" data-reglage="lycee" data-id="' + p.id + '"' + (p.lycee ? ' checked' : '') + '>« Mes spécialités » (lycée)</label>' +
        '<label class="case"><input type="checkbox" data-reglage="argent_avance" data-id="' + p.id + '"' + (p.argent_avance ? ' checked' : '') + '>Niveaux « Investisseuse » et « Experte »</label>' : '') +
      '</div>').join('<hr class="sep">') + '</div>';

    h += '<h2>Dernières activités</h2><div class="pile">' + E.mouvements.slice(0, 25).map(m =>
      '<div class="mission"><div class="texte"><span class="titre">' + esc(MM.profilDe(m.enfant_id).prenom) + ' · ' + esc(m.libelle) + '</span><span class="petit">' + MM.dateCourte(m.created_at) + '</span></div>' +
      '<span class="pastille ' + (m.points_commun < 0 || m.points_enfant < 0 ? 'moins' : 'ok') + '">' + (m.type === 'recompense' ? m.points_enfant : (m.points_commun > 0 ? '+' : '') + m.points_commun) + '</span></div>').join('') +
      (E.mouvements.length ? '' : '<div class="vide">Rien pour l\'instant.</div>') + '</div>';
    h += '<div style="margin-top:24px"><button class="btn btn-contour btn-plein" data-action="deconnexion">Se déconnecter</button></div>';
    return h;
  }
  function suiviAvenir() {
    const P = window.MM_PROFILS;
    return '<h2>Avenir & argent</h2><div class="pile">' + MM.enfants().map(p => {
      const fav = (E.avis || []).filter(a => a.enfant_id === p.id && a.avis === 'adore').map(a => MM.metier(a.metier)).filter(Boolean);
      const vus = (E.avis || []).filter(a => a.enfant_id === p.id).length;
      const fiches = (E.apprentissages || []).filter(a => a.enfant_id === p.id && a.type === 'fiche' && a.reussi).length;
      const res = MM.profilResultat(p.id);
      const nbNiv = MM.niveauxDispo(p).reduce((t, n) => t + MM.leconsNiveau(n.id).length, 0);
      return '<div class="carte pile" style="gap:6px"><div class="ligne entre"><strong>' + esc(p.prenom) + '</strong><span class="petit">' + MM.pointsAppliSemaine(p.id) + ' / ' + MM.PLAFOND_APPLI + ' pts cette semaine</span></div>' +
        '<span style="font-size:13px">🧩 Profil : ' + (res ? res.top.map(c => P[c].emoji + ' ' + P[c].nom).join(' + ') : 'quiz pas encore fait') + '</span>' +
        '<span style="font-size:13px">🃏 ' + vus + ' métiers découverts · ' + fiches + ' quiz réussis · 💰 ' + MM.leconsReussies(p.id) + ' / ' + nbNiv + ' leçons</span>' +
        (fav.length ? '<span style="font-size:13px">😍 Coups de cœur : ' + fav.slice(0, 8).map(f => esc(f.n)).join(', ') + (fav.length > 8 ? '…' : '') + '</span>' : '') + '</div>';
    }).join('') + '</div>';
  }
  document.addEventListener('change', async (e) => {
    const c = e.target.closest('[data-reglage]');
    if (!c) return;
    const champ = {}; champ[c.dataset.reglage] = c.checked;
    const { error } = await MM.sb.from('profiles').update(champ).eq('id', c.dataset.id);
    if (error) { MM.erreur(error); c.checked = !c.checked; return; }
    MM.toast('Réglage enregistré.'); await MM.rafraichirForce();
  });
})();
