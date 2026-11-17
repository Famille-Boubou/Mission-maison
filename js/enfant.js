/* Mission Maison — écrans de Lili et Romy */
(function () {
  const MM = window.MM, esc = MM.esc, E = MM.etat;

  MM.MATIERES = ['Maths', 'Français', 'Anglais', 'Histoire-Géo', 'SVT', 'Physique-Chimie', 'Espagnol', 'Allemand',
    'SES', 'SNT', 'Technologie', 'EPS', 'Arts plastiques', 'Musique', 'Philosophie', 'Autre'];

  MM.bareme = function (n20, profil) {
    if (n20 >= 20) return { points: 7, bonus: 5 };
    if (n20 >= 18) return { points: 5, bonus: profil && profil.bonus_note_18 ? 5 : 0 };
    if (n20 >= 16) return { points: 3, bonus: 0 };
    return { points: 0, bonus: 0 };
  };

  MM.vues.enfantOnglets = function () {
    const moi = E.user.id, p = E.profil;
    const aRefaire = E.realisations.filter(r => r.enfant_id === moi && r.statut === 'reservee' && r.commentaire).length;
    const bonusDispo = E.bonus.filter(b => b.enfant_id === moi && b.statut === 'disponible').length;
    const recompense = MM.solde(moi) >= MM.TRANCHE ? 1 : 0;
    const o = [{ id: 'missions', nom: 'Missions', icone: 'maison', rendu: vueMissions, bulle: aRefaire || null }];
    o.push({ id: 'notes', nom: 'Notes', icone: 'livre', rendu: vueNotes, apres: brancherNotes });
    if (p.code_actif && MM.vues.code) o.push({ id: 'code', nom: 'Code', icone: 'voiture', rendu: MM.vues.code, apres: MM.vues.codeApres });
    o.push({ id: 'recompenses', nom: 'Récompenses', icone: 'cadeau', rendu: vueRecompenses, bulle: (bonusDispo + recompense) || null });
    return o;
  };

  function entete(titre) {
    const p = E.profil;
    const jour = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
    return '<div class="entete"><div><div class="sous-titre">' + esc(jour.charAt(0).toUpperCase() + jour.slice(1)) + '</div>' +
      '<h1>' + esc(titre || ('Salut ' + p.prenom + ' !')) + '</h1></div>' +
      '<button class="avatar" data-action="deconnexion" aria-label="Se déconnecter">' + esc(p.prenom.charAt(0)) + '</button></div>';
  }

  /* ================= MISSIONS ================= */
  function vueMissions() {
    const moi = E.user.id, solde = MM.solde(moi), T = MM.TRANCHE;
    let h = entete();

    if (E.alertes.some(a => a.type === 'linge' && a.active)) {
      h += '<div class="carte-jaune ligne" style="margin-bottom:12px">' + MM.icone('linge') +
        '<div style="flex:1"><strong>Machine terminée</strong><div class="petit" style="color:#4A3B00">Le linge est à étendre</div></div>' +
        '<span class="pastille" style="background:var(--orange)">+4</span></div>';
    }

    const reste = T - solde;
    h += '<div class="carte-verte pile">' +
      '<span class="petit">Mes points</span>' +
      '<div class="ligne" style="align-items:baseline;gap:8px"><span class="gros-chiffre">' + solde + '</span><span class="sous-titre">/ ' + T + '</span></div>' +
      '<div class="barre"><div style="width:' + MM.pct(solde, T) + '%"></div></div>' +
      '<span style="font-size:13px">' + (solde >= T ? '🎁 Tu as débloqué une récompense ! Va dans « Récompenses ».' : 'Encore ' + reste + ' points avant ta prochaine récompense') + '</span></div>';

    // Mes missions en cours
    const miennes = E.realisations.filter(r => r.enfant_id === moi && (r.statut === 'reservee' || r.statut === 'envoyee'));
    if (miennes.length) {
      h += '<h2>Mes missions en cours</h2><div class="pile">';
      miennes.forEach(r => {
        const m = E.missions.find(x => x.id === r.mission_id) || { titre: 'Mission' };
        if (r.statut === 'envoyee') {
          h += '<div class="mission"><div class="texte"><span class="titre">' + esc(m.titre) + '</span>' +
            '<span class="petit" style="color:#8A4B00">Photo envoyée · en attente de validation</span></div>' +
            '<span class="pastille attente">+' + r.points + '</span></div>';
        } else {
          h += '<div class="mission' + (r.commentaire ? ' grosse' : '') + '"><div class="texte"><span class="titre">' + esc(m.titre) + '</span>' +
            (r.commentaire ? '<span class="petit" style="color:#991B1B">À refaire : ' + esc(r.commentaire) + '</span>'
              : '<span class="petit">Réservée · fais-la puis prends la photo</span>') +
            '<button class="btn btn-contour btn-petit" style="align-self:flex-start;margin-top:4px;min-height:36px" data-action="annuler" data-id="' + r.id + '">Annuler</button></div>' +
            '<button class="btn btn-vert btn-petit" data-action="photo-mission" data-id="' + r.id + '">' + MM.icone('photo', 20) + 'Photo</button></div>';
        }
      });
      h += '</div>';
    }

    // Missions disponibles
    h += '<h2>Missions disponibles</h2><div class="pile">';
    const dispo = E.missions.filter(m => m.actif);
    if (!dispo.length) h += '<div class="vide">Aucune mission pour l\'instant.</div>';
    dispo.forEach(m => {
      const st = MM.etatMission(m);
      if (st.mienne) return;
      let droite, info = esc(m.limite_texte), bloquee = false;
      if (st.autre) { droite = '<span class="pastille neutre">Prise</span>'; info = 'Réservée par ' + esc(MM.profilDe(st.autre.enfant_id).prenom); bloquee = true; }
      else if (st.limite) { droite = '<span class="pastille neutre">Fait</span>'; info = 'Limite atteinte · ' + esc(m.limite_texte); bloquee = true; }
      else droite = '<button class="btn btn-clair btn-petit" data-action="reserver" data-id="' + m.id + '">Réserver</button>';
      h += '<div class="mission' + (m.points >= 10 && !bloquee ? ' grosse' : '') + (bloquee ? ' bloquee' : '') + '">' +
        '<div class="texte">' + (m.points >= 10 ? '<span class="petit" style="color:var(--orange-texte);font-weight:700;letter-spacing:.04em">GROSSE MISSION</span>' : '') +
        '<span class="titre">' + esc(m.titre) + '</span><span class="petit">' + info + '</span></div>' +
        '<span class="pastille points">+' + m.points + '</span>' + droite + '</div>';
    });
    h += '</div>';

    const c = MM.communs();
    h += '<h2>Objectif du mois à deux</h2><div class="carte pile" style="gap:6px"><div class="ligne entre"><strong>Soirée pizza ou Uber Eats + film</strong><span class="petit">' + c.mois + ' / ' + MM.PALIERS.mois + '</span></div>' +
      '<div class="barre claire"><div style="width:' + MM.pct(c.mois, MM.PALIERS.mois) + '%"></div></div></div>';
    return h;
  }

  MM.actions.reserver = async (b) => {
    await MM.rpc('reserver_mission', { p_mission: Number(b.dataset.id) }, 'Mission réservée : à toi de jouer !');
  };
  MM.actions.annuler = async (b) => {
    if (!confirm('Annuler cette réservation ? La mission redevient disponible pour ta sœur.')) return;
    await MM.rpc('annuler_reservation', { p_id: Number(b.dataset.id) }, 'Réservation annulée.');
  };
  MM.actions['photo-mission'] = async (b) => {
    const id = Number(b.dataset.id);
    MM.prendrePhoto(async (f) => {
      try {
        MM.toast('Envoi de la photo…');
        const chemin = await MM.envoyerPhoto(f, 'mission');
        await MM.rpc('envoyer_realisation', { p_id: id, p_photo: chemin }, 'Photo envoyée ! Papa ou Maman va valider.');
      } catch (e) { MM.erreur(e); }
    });
  };

  /* ================= NOTES ================= */
  function vueNotes() {
    const p = E.profil, moi = E.user.id;
    let h = entete('Mes notes');
    if (!p.notes_actives) {
      return h + '<div class="carte pile"><strong>Bientôt pour toi !</strong><p style="margin:0">Les bonnes notes rapporteront des points à partir de ton entrée au collège. Papa ou Maman activera cette page à ce moment-là.</p></div>';
    }
    const f = E.formNote || (E.formNote = { matiere: 'Maths', note: '', sur: '20' });
    h += '<div class="carte-jaune grille3" style="text-align:center">' +
      '<div><div class="petit" style="color:var(--encre);font-weight:700">16 à 17,5</div><strong>+3 pts</strong></div>' +
      '<div><div class="petit" style="color:var(--encre);font-weight:700">18 à 19,5</div><strong>+5 pts' + (p.bonus_note_18 ? ' + 5 €' : '') + '</strong></div>' +
      '<div style="background:var(--vert);color:#fff;border-radius:10px;padding:4px"><div class="petit" style="color:#fff;font-weight:700">20/20</div><strong>+7 pts + 5 €</strong></div></div>';

    h += '<form id="form-note" class="carte pile" style="margin-top:12px"><strong>Envoyer une nouvelle note</strong>' +
      '<label class="champ">Matière<select name="matiere">' + MM.MATIERES.map(m => '<option' + (m === f.matiere ? ' selected' : '') + '>' + m + '</option>').join('') + '</select></label>' +
      '<div class="grille2"><label class="champ">Note<input type="number" name="note" inputmode="decimal" step="0.25" min="0" value="' + esc(f.note) + '" required></label>' +
      '<label class="champ">Sur<input type="number" name="sur" inputmode="decimal" step="1" min="1" value="' + esc(f.sur) + '" required></label></div>' +
      '<div id="note-apercu"></div>' +
      '<div id="note-photo"></div>' +
      '<div class="grille2"><button type="button" class="btn btn-contour" data-action="note-photo">' + MM.icone('photo', 20) + 'Photo copie</button>' +
      '<button type="submit" class="btn btn-vert">Envoyer</button></div>' +
      '<span class="petit">Photo de ta copie ou de ta note sur Pronote. Les notes sont ramenées sur 20.</span></form>';

    const mesNotes = E.notes.filter(n => n.enfant_id === moi).slice(0, 15);
    h += '<h2>Mes dernières notes</h2><div class="pile">';
    if (!mesNotes.length) h += '<div class="vide">Pas encore de note envoyée.</div>';
    mesNotes.forEach(n => {
      const st = n.statut === 'validee' ? '<span class="petit" style="color:var(--ok)">Validée</span>' :
        n.statut === 'refusee' ? '<span class="petit" style="color:#991B1B">Refusée' + (n.commentaire ? ' : ' + esc(n.commentaire) : '') + '</span>' :
          '<span class="petit" style="color:#8A4B00">En attente de validation</span>';
      h += '<div class="mission"><div class="texte"><span class="titre">' + esc(n.matiere) + ' · ' + fmt(n.note) + '/' + fmt(n.sur) +
        (Number(n.sur) !== 20 ? ' (' + fmt(n.note20) + '/20)' : '') + '</span>' + st + '</div>' +
        '<span class="pastille ' + (n.statut === 'validee' ? 'ok' : n.statut === 'refusee' ? 'neutre' : 'attente') + '">+' + n.points + (Number(n.bonus) ? ' · ' + MM.euros(n.bonus) : '') + '</span></div>';
    });
    return h + '</div>';
  }
  function fmt(n) { return String(Number(n)).replace('.', ','); }

  function majApercuNote() {
    const f = E.formNote, z = document.getElementById('note-apercu');
    if (!z) return;
    const note = parseFloat(String(f.note).replace(',', '.')), sur = parseFloat(String(f.sur).replace(',', '.'));
    if (isNaN(note) || isNaN(sur) || sur <= 0) { z.innerHTML = ''; return; }
    const n20 = Math.round(note * 20 / sur * 100) / 100;
    const b = MM.bareme(n20, E.profil);
    z.innerHTML = '<div class="ligne entre" style="padding:10px 12px;border-radius:12px;font-weight:600;font-size:14px;background:' +
      (b.points ? 'var(--vert-clair);color:var(--vert-fonce)' : 'var(--bord)') + '"><span>Soit ' + fmt(n20) + '/20</span><span>' +
      (b.points ? '+' + b.points + ' pts' + (b.bonus ? ' + ' + MM.euros(b.bonus) : '') : 'Les points commencent à 16/20') + '</span></div>';
  }
  function majPhotoNote() {
    const z = document.getElementById('note-photo');
    if (!z) return;
    z.innerHTML = E.noteFichier ? '<img class="photo-apercu" alt="Photo de la copie" src="' + E.noteFichierUrl + '">' : '';
  }
  function brancherNotes() {
    const form = document.getElementById('form-note');
    if (!form) return;
    form.addEventListener('input', () => {
      E.formNote = { matiere: form.matiere.value, note: form.note.value, sur: form.sur.value };
      majApercuNote();
    });
    majApercuNote(); majPhotoNote();
    form.onsubmit = async (e) => {
      e.preventDefault();
      if (!E.noteFichier) { MM.toast('Ajoute la photo de ta copie ou de Pronote.', true); return; }
      const btn = form.querySelector('[type=submit]'); btn.disabled = true; btn.textContent = 'Envoi…';
      try {
        const chemin = await MM.envoyerPhoto(E.noteFichier, 'note');
        const f = E.formNote;
        await MM.rpc('envoyer_note', {
          p_matiere: f.matiere, p_note: parseFloat(String(f.note).replace(',', '.')),
          p_sur: parseFloat(String(f.sur).replace(',', '.')), p_photo: chemin
        }, 'Note envoyée ! Papa ou Maman va valider.');
        E.formNote = null; E.noteFichier = null; MM.afficher();
      } catch (err) { if (err && !err.code) MM.erreur(err); btn.disabled = false; btn.textContent = 'Envoyer'; }
    };
  }
  MM.actions['note-photo'] = async () => {
    MM.prendrePhoto((f) => { E.noteFichier = f; E.noteFichierUrl = URL.createObjectURL(f); majPhotoNote(); });
  };

  /* ================= RÉCOMPENSES ================= */
  function vueRecompenses() {
    const moi = E.user.id, solde = MM.solde(moi), T = MM.TRANCHE;
    let h = entete('Récompenses');

    h += '<div class="carte pile"><div class="ligne entre"><strong>À ' + T + ' points, tu choisis :</strong><span class="petit">' + solde + ' / ' + T + '</span></div>' +
      '<div class="barre claire"><div style="width:' + MM.pct(solde, T) + '%"></div></div>';
    if (solde >= T) {
      const so = E.sorties.filter(s => s.actif);
      h += '<div class="grille2">' +
        '<button class="btn btn-vert" style="min-height:64px;flex-direction:column;gap:0" data-action="recompense" data-type="argent"><span style="font-size:20px">20 €</span><span style="font-size:12px;font-weight:500">argent de poche</span></button>' +
        '<button class="btn btn-orange" style="min-height:64px;flex-direction:column;gap:0" data-action="recompense" data-type="sortie">' + MM.icone('etoile', 20) + '<span style="font-size:12px;font-weight:600">une sortie</span></button>' +
        '<button class="btn btn-clair" style="min-height:64px;flex-direction:column;gap:0" data-action="recompense" data-type="epargne"><span style="font-size:20px">30 €</span><span style="font-size:12px;font-weight:500">épargnés (+50 %)</span></button>' +
        '<button class="btn btn-contour" style="min-height:64px;flex-direction:column;gap:0" data-action="recompense" data-type="moitie"><span style="font-size:15px">10 € + 15 €</span><span style="font-size:12px;font-weight:500">poche + épargne</span></button></div>' +
        '<label class="champ">Si tu choisis une sortie<select id="choix-sortie">' + so.map(s => '<option>' + esc(s.nom) + '</option>').join('') + '</select></label>';
    } else {
      h += '<span class="petit">Encore ' + (T - solde) + ' points. Au choix : 20 €, une sortie avec Papa ou Maman, l\'épargne complète (30 €) ou moitié-moitié (10 € en poche + 15 € épargnés).</span>';
    }
    h += '</div>';

    const enCours = E.recompenses.filter(r => r.enfant_id === moi && !r.remise);
    if (enCours.length) {
      h += '<h2>En attente de Papa ou Maman</h2><div class="pile">' + enCours.map(r =>
        '<div class="mission"><div class="texte"><span class="titre">' + esc(libelleRecompense(r)) + '</span><span class="petit">Demandée ' + MM.depuis(r.created_at) + '</span></div><span class="pastille attente">En cours</span></div>').join('') + '</div>';
    }

    // Bonus
    const mesBonus = E.bonus.filter(b => b.enfant_id === moi);
    h += '<h2>Mes bonus</h2><div class="pile">';
    if (!mesBonus.length) h += '<div class="vide">Pas encore de bonus. Un 20/20' + (E.profil.code_actif ? ' ou une session de code à 35/40' : '') + ' en rapporte un !</div>';
    mesBonus.slice(0, 10).forEach(b => {
      if (b.statut === 'disponible') {
        h += '<div class="carte pile"><div class="ligne entre"><div><strong>' + esc(b.motif) + '</strong><div class="petit">Bonus à choisir</div></div>' +
          '<span class="gros-chiffre" style="font-size:24px;color:var(--orange-texte)">' + MM.euros(b.montant) + '</span></div>' +
          '<div class="grille2"><button class="btn btn-contour" data-action="bonus" data-id="' + b.id + '" data-choix="encaisse">Encaisser ' + MM.euros(b.montant) + '</button>' +
          '<button class="btn btn-vert" data-action="bonus" data-id="' + b.id + '" data-choix="epargne">Épargner ' + MM.euros(b.montant * 1.5) + '</button></div></div>';
      } else {
        h += '<div class="mission"><div class="texte"><span class="titre">' + esc(b.motif) + '</span><span class="petit">' +
          (b.statut === 'epargne' ? 'Épargné : ' + MM.euros(Number(b.montant) + Number(b.abondement)) : 'Encaissé : ' + MM.euros(b.montant)) +
          (b.remis ? '' : ' · en attente') + '</span></div><span class="pastille ' + (b.remis ? 'ok' : 'attente') + '">' + (b.remis ? 'Reçu' : 'En cours') + '</span></div>';
      }
    });
    h += '</div>';

    // Épargne
    const ep = epargne(moi);
    h += '<h2>Mon épargne</h2><div class="carte-verte pile"><span class="petit">Total mis de côté</span><span class="gros-chiffre" style="font-size:42px">' + MM.euros(ep.total) + '</span>' +
      '<div class="grille2"><div style="background:var(--vert-fonce);border-radius:12px;padding:10px"><div class="petit">Ma part</div><strong>' + MM.euros(ep.part) + '</strong></div>' +
      '<div style="background:var(--jaune);color:var(--encre);border-radius:12px;padding:10px"><div style="font-size:12px">Ajouté par Papa et Maman</div><strong>+' + MM.euros(ep.abond) + '</strong></div></div>' +
      (ep.attente ? '<span class="petit">Dont ' + MM.euros(ep.attente) + ' en attente de versement.</span>' : '') +
      '<span class="petit">Placé au moins jusqu\'à tes 18 ans. La valeur réelle se consulte dans Trade Republic : elle peut monter ou baisser.</span></div>';

    h += '<h2>Objectifs à deux</h2>' + MM.htmlObjectifs();

    // Idées
    const ti = E.typeIdee || 'mission';
    h += '<h2>Proposer une idée</h2><form id="form-idee" class="carte pile"><div class="choix">' +
      '<button type="button" class="puce' + (ti === 'mission' ? ' active' : '') + '" data-action="type-idee" data-type="mission">Mission</button>' +
      '<button type="button" class="puce' + (ti === 'sortie' ? ' active' : '') + '" data-action="type-idee" data-type="sortie">Sortie</button></div>' +
      '<label class="champ">Ton idée<textarea id="texte-idee" rows="3" placeholder="Ex. : ranger le meuble à chaussures de l\'entrée"></textarea></label>' +
      '<button type="submit" class="btn btn-orange">Envoyer mon idée</button></form>';
    const mesIdees = E.idees.filter(i => i.enfant_id === moi).slice(0, 8);
    if (mesIdees.length) {
      h += '<div class="pile" style="margin-top:10px">' + mesIdees.map(i =>
        '<div class="mission"><div class="texte"><span class="titre">' + (i.type === 'mission' ? 'Mission' : 'Sortie') + ' · ' + esc(i.texte) + '</span><span class="petit">' +
        (i.statut === 'en_attente' ? 'En attente de réponse' : i.statut === 'acceptee' ? 'Acceptée' : 'Refusée') + (i.reponse ? ' · « ' + esc(i.reponse) + ' »' : '') + '</span></div>' +
        '<span class="pastille ' + (i.statut === 'acceptee' ? 'ok' : i.statut === 'refusee' ? 'neutre' : 'attente') + '">' + (i.statut === 'acceptee' ? 'Oui' : i.statut === 'refusee' ? 'Non' : '…') + '</span></div>').join('') + '</div>';
    }

    // Historique
    const mv = E.mouvements.filter(m => m.enfant_id === moi).slice(0, 20);
    h += '<h2>Historique de mes points</h2><div class="pile">';
    if (!mv.length) h += '<div class="vide">Rien pour l\'instant.</div>';
    mv.forEach(m => {
      const neg = m.points_enfant < 0 || m.points_commun < 0;
      h += '<div class="mission"><div class="texte"><span class="titre">' + esc(m.libelle) + '</span><span class="petit">' + MM.dateCourte(m.created_at) +
        (m.type === 'retrait' && m.points_commun !== m.points_enfant ? ' · objectif commun ' + m.points_commun : '') + '</span></div>' +
        '<span class="pastille ' + (neg ? 'moins' : 'ok') + '">' + (m.points_enfant > 0 ? '+' : '') + m.points_enfant + '</span></div>';
    });
    h += '</div><div style="margin-top:24px"><button class="btn btn-contour btn-plein" data-action="deconnexion">Se déconnecter</button></div>';
    return h;
  }

  function libelleRecompense(r) {
    switch (r.type) {
      case 'argent': return '20 € d\'argent de poche';
      case 'sortie': return 'Sortie : ' + (r.sortie || '');
      case 'epargne': return 'Épargne : 20 € + 10 € des parents';
      default: return 'Moitié-moitié : 10 € en poche + 15 € épargnés';
    }
  }
  MM.libelleRecompense = libelleRecompense;

  function epargne(id) {
    let part = 0, abond = 0, attente = 0;
    E.recompenses.filter(r => r.enfant_id === id && Number(r.epargne) > 0).forEach(r => {
      part += Number(r.epargne); abond += Number(r.abondement);
      if (!r.remise) attente += Number(r.epargne) + Number(r.abondement);
    });
    E.bonus.filter(b => b.enfant_id === id && b.statut === 'epargne').forEach(b => {
      part += Number(b.montant); abond += Number(b.abondement);
      if (!b.remis) attente += Number(b.montant) + Number(b.abondement);
    });
    return { part, abond, total: part + abond, attente };
  }
  MM.epargne = epargne;

  MM.actions.recompense = async (b) => {
    const type = b.dataset.type;
    let sortie = null, texte;
    if (type === 'sortie') { sortie = (document.getElementById('choix-sortie') || {}).value; texte = 'la sortie « ' + sortie + ' »'; }
    else texte = { argent: '20 € d\'argent de poche', epargne: 'l\'épargne complète (30 € mis de côté)', moitie: 'moitié-moitié (10 € en poche + 15 € épargnés)' }[type];
    if (!confirm('Utiliser 200 points pour ' + texte + ' ?')) return;
    await MM.rpc('demander_recompense', { p_type: type, p_sortie: sortie }, 'Bravo ! Papa ou Maman va s\'en occuper.');
  };
  MM.actions.bonus = async (b) => {
    const choix = b.dataset.choix;
    if (!confirm(choix === 'epargne' ? 'Épargner ce bonus ? Papa et Maman ajoutent 50 %.' : 'Encaisser ce bonus en argent de poche ?')) return;
    await MM.rpc('choisir_bonus', { p_id: Number(b.dataset.id), p_choix: choix }, choix === 'epargne' ? 'Bonus épargné !' : 'Bonus encaissé !');
  };
  MM.actions['type-idee'] = async (b) => {
    E.typeIdee = b.dataset.type;
    document.querySelectorAll('[data-action="type-idee"]').forEach(x => x.classList.toggle('active', x === b));
  };
  document.addEventListener('submit', async (e) => {
    if (e.target.id !== 'form-idee') return;
    e.preventDefault();
    const t = document.getElementById('texte-idee').value.trim();
    if (!t) { MM.toast('Écris ton idée.', true); return; }
    try { await MM.rpc('proposer_idee', { p_type: E.typeIdee || 'mission', p_texte: t }, 'Idée envoyée !'); } catch (err) { }
  });
})();
