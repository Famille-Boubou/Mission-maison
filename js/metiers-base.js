/* Mission Maison — Mon avenir : univers, spécialités et format des fiches métiers
   Chaque fiche : id, u (univers), n (nom), v (version du texte), a (1 = métier d'avenir),
   r (résumé), t (3 tâches), e (études), niv (niveau le plus courant), s (salaire de début indicatif),
   q (3 qualités), sp (spécialités de 1re conseillées), p (profils dominants). */
(function () {
  window.MM_UNIVERS = [
    { id: 'sante', nom: 'Santé & soins', emoji: '🩺' },
    { id: 'social', nom: 'Social & aide aux personnes', emoji: '🤝' },
    { id: 'enseignement', nom: 'Enseignement & éducation', emoji: '📚' },
    { id: 'numerique', nom: 'Numérique & informatique', emoji: '💻' },
    { id: 'industrie', nom: 'Ingénierie & industrie', emoji: '⚙️' },
    { id: 'environnement', nom: 'Environnement & énergie', emoji: '🌱' },
    { id: 'batiment', nom: 'Bâtiment, bois & artisanat', emoji: '🔨' },
    { id: 'art', nom: 'Art, design & mode', emoji: '🎨' },
    { id: 'medias', nom: 'Communication, médias & culture', emoji: '🎬' },
    { id: 'commerce', nom: 'Commerce, vente & achats', emoji: '🛍️' },
    { id: 'finance', nom: 'Gestion, finance & entreprise', emoji: '💶' },
    { id: 'droit', nom: 'Droit & justice', emoji: '⚖️' },
    { id: 'securite', nom: 'Sécurité, défense & secours', emoji: '🚒' },
    { id: 'transport', nom: 'Transport, logistique & aéronautique', emoji: '✈️' },
    { id: 'hotellerie', nom: 'Hôtellerie, restauration & tourisme', emoji: '🍽️' },
    { id: 'sport', nom: 'Sport & animation', emoji: '⚽' },
    { id: 'nature', nom: 'Animaux, nature & agriculture', emoji: '🐴' },
    { id: 'sciences', nom: 'Sciences & recherche', emoji: '🔬' },
    { id: 'beaute', nom: 'Beauté & bien-être', emoji: '💇' },
    { id: 'public', nom: 'Services publics & administration', emoji: '🏛️' }
  ];

  // Spécialités de 1re générale
  window.MM_SPECIALITES = {
    M: 'Mathématiques', PC: 'Physique-chimie', SVT: 'Sciences de la vie et de la Terre', SES: 'Sciences économiques et sociales',
    HGGSP: 'Histoire-géo, géopolitique et sciences politiques', HLP: 'Humanités, littérature et philosophie',
    LLCER: 'Langues, littératures et cultures étrangères', ARTS: 'Arts', NSI: 'Numérique et sciences informatiques',
    SI: 'Sciences de l\'ingénieur', EPPCS: 'Éducation physique, pratiques et culture sportives', LLCA: 'Langues et cultures de l\'Antiquité',
    BE: 'Biologie-écologie (lycée agricole)'
  };

  // Les six profils du quiz « Mon profil »
  window.MM_PROFILS = {
    R: { nom: 'Bâtisseuse', emoji: '🛠️', texte: 'Tu aimes le concret : fabriquer, réparer, bouger, travailler dehors ou avec des machines.' },
    I: { nom: 'Chercheuse', emoji: '🔎', texte: 'Tu aimes comprendre comment les choses marchent, observer, analyser et résoudre des énigmes.' },
    A: { nom: 'Créative', emoji: '🎨', texte: 'Tu aimes imaginer, dessiner, écrire, jouer, inventer des choses qui n\'existent pas encore.' },
    S: { nom: 'Aidante', emoji: '💛', texte: 'Tu aimes aider, écouter, expliquer, prendre soin des autres et travailler en équipe.' },
    E: { nom: 'Leader', emoji: '🚀', texte: 'Tu aimes convaincre, organiser, prendre des initiatives, lancer des projets et diriger.' },
    C: { nom: 'Organisée', emoji: '🗂️', texte: 'Tu aimes l\'ordre, les chiffres, les plans bien rangés, vérifier que tout est juste.' }
  };

  window.MM_NIVEAUX = ['CAP', 'Bac pro', 'Bac+2', 'Bac+3', 'Bac+5', 'Bac+8 et plus'];

  window.MM_METIERS = window.MM_METIERS || [];
  window.MM_AJOUT_METIERS = function (univers, liste) {
    liste.forEach(f => { f.u = univers; if (!f.v) f.v = 1; window.MM_METIERS.push(f); });
  };
})();
