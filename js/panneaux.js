/* Mission Maison — panneaux et schémas dessinés pour le code de la route.
   Dessins simplifiés inspirés de la signalisation française (pas des reproductions officielles). */
(function () {
  const R = '#C8102E', B = '#0B4EA2', J = '#FFC20E', N = '#1B1B2F', W = '#FFFFFF';
  const svg = (inner, vb, label) => '<svg viewBox="' + (vb || '0 0 200 200') + '" width="160" height="160" role="img" aria-label="' + (label || 'Panneau') + '">' + inner + '</svg>';

  // Formes de base
  const triangle = (c, lab) => svg('<path d="M100 14 L190 172 L10 172 Z" fill="' + W + '" stroke="' + R + '" stroke-width="16" stroke-linejoin="round"/>' + (c || ''), null, lab);
  const triangleInverse = (c, lab) => svg('<path d="M10 28 L190 28 L100 186 Z" fill="' + W + '" stroke="' + R + '" stroke-width="16" stroke-linejoin="round"/>' + (c || ''), null, lab);
  const rondRouge = (c, lab) => svg('<circle cx="100" cy="100" r="84" fill="' + W + '" stroke="' + R + '" stroke-width="18"/>' + (c || ''), null, lab);
  const rondBleu = (c, lab) => svg('<circle cx="100" cy="100" r="90" fill="' + B + '" stroke="' + W + '" stroke-width="4"/>' + (c || ''), null, lab);
  const carreBleu = (c, lab) => svg('<rect x="14" y="14" width="172" height="172" rx="14" fill="' + B + '" stroke="' + W + '" stroke-width="6"/>' + (c || ''), null, lab);
  const fin = (c, lab) => svg('<circle cx="100" cy="100" r="88" fill="' + W + '" stroke="#9A9A9A" stroke-width="4"/>' + (c || '') +
    '<g stroke="' + N + '" stroke-width="5"><line x1="48" y1="152" x2="152" y2="48"/><line x1="40" y1="140" x2="140" y2="40"/><line x1="60" y1="160" x2="160" y2="60"/></g>', null, lab);
  const txt = (t, x, y, s, col, w) => '<text x="' + x + '" y="' + y + '" font-family="Arial, Helvetica, sans-serif" font-weight="' + (w || 700) + '" font-size="' + s + '" fill="' + (col || N) + '" text-anchor="middle">' + t + '</text>';
  const voiture = (x, y, col, s) => '<g transform="translate(' + x + ' ' + y + ') scale(' + (s || 1) + ')"><rect x="-16" y="-30" width="32" height="60" rx="9" fill="' + col + '"/><rect x="-11" y="-18" width="22" height="13" rx="3" fill="#cfe3ff"/></g>';
  const pieton = (x, y, s) => '<g transform="translate(' + x + ' ' + y + ') scale(' + (s || 1) + ')" fill="' + N + '"><circle cx="0" cy="-34" r="9"/><path d="M-6 -22 L8 -22 L14 4 L6 4 L6 40 L-2 40 L-2 12 L-8 40 L-16 40 L-8 4 L-14 -6 Z"/></g>';

  const P = {
    // --- Danger ---
    'danger': () => triangle(txt('!', 100, 150, 96), 'Autres dangers'),
    'virage-droite': () => triangle('<path d="M84 150 L84 104 Q84 76 112 76" fill="none" stroke="' + N + '" stroke-width="14"/><path d="M106 60 L132 76 L106 92 Z" fill="' + N + '"/>', 'Virage à droite'),
    'virage-gauche': () => triangle('<path d="M116 150 L116 104 Q116 76 88 76" fill="none" stroke="' + N + '" stroke-width="14"/><path d="M94 60 L68 76 L94 92 Z" fill="' + N + '"/>', 'Virage à gauche'),
    'double-virage': () => triangle('<path d="M90 152 L90 128 Q90 112 104 106 Q118 100 118 86 L118 70" fill="none" stroke="' + N + '" stroke-width="12"/><path d="M106 72 L118 50 L130 72 Z" fill="' + N + '"/>', 'Succession de virages'),
    'chaussee-glissante': () => triangle('<rect x="82" y="92" width="36" height="22" rx="6" fill="' + N + '"/><path d="M70 150 Q80 132 90 150 M100 150 Q110 132 120 150" fill="none" stroke="' + N + '" stroke-width="5"/>', 'Chaussée glissante'),
    'pietons': () => triangle('<rect x="64" y="146" width="72" height="8" fill="' + N + '"/>' + pieton(100, 108, 0.95), 'Passage pour piétons'),
    'enfants': () => triangle(pieton(86, 112, 0.8) + pieton(116, 120, 0.6), 'Endroit fréquenté par les enfants'),
    'travaux': () => triangle('<circle cx="92" cy="86" r="8" fill="' + N + '"/><path d="M84 98 L104 98 L118 128 L106 128 L96 112 L90 150 L78 150 Z" fill="' + N + '"/><path d="M114 124 L140 150 L108 150 Z" fill="' + N + '"/>', 'Travaux'),
    'feux': () => triangle('<rect x="84" y="62" width="32" height="92" rx="8" fill="' + N + '"/><circle cx="100" cy="80" r="9" fill="' + R + '"/><circle cx="100" cy="108" r="9" fill="' + J + '"/><circle cx="100" cy="136" r="9" fill="#1FA64A"/>', 'Feux tricolores'),
    'rond-point': () => triangle('<g fill="none" stroke="' + N + '" stroke-width="9"><path d="M100 82 A30 30 0 0 1 128 112"/><path d="M122 132 A30 30 0 0 1 82 136"/><path d="M72 116 A30 30 0 0 1 90 84"/></g><g fill="' + N + '"><path d="M120 106 L136 106 L128 122 Z"/><path d="M90 128 L84 144 L74 132 Z"/><path d="M84 76 L100 86 L84 96 Z"/></g>', 'Carrefour à sens giratoire'),
    'priorite-droite': () => triangle('<g stroke="' + N + '" stroke-width="14" stroke-linecap="round"><line x1="74" y1="80" x2="126" y2="150"/><line x1="126" y1="80" x2="74" y2="150"/></g>', 'Intersection avec priorité à droite'),
    'intersection-prioritaire': () => triangle('<rect x="92" y="62" width="16" height="96" fill="' + N + '"/><rect x="68" y="112" width="64" height="8" fill="' + N + '"/>', 'Intersection où vous êtes prioritaire'),
    'animaux': () => triangle('<path d="M66 128 L72 104 Q76 92 92 92 L124 92 Q134 86 136 76 L146 80 L142 96 L134 102 L134 148 L124 148 L124 118 L94 118 L90 148 L80 148 L80 120 Z" fill="' + N + '"/>', 'Passage d\'animaux'),
    'chute-pierres': () => triangle('<path d="M64 156 L64 70 L84 70 Z" fill="' + N + '"/><circle cx="104" cy="104" r="9" fill="' + N + '"/><circle cx="122" cy="132" r="7" fill="' + N + '"/><circle cx="96" cy="140" r="6" fill="' + N + '"/>', 'Chute de pierres'),
    'cassis': () => triangle('<path d="M56 140 L84 140 Q100 112 116 140 L144 140" fill="none" stroke="' + N + '" stroke-width="12"/>', 'Cassis ou dos-d\'âne'),
    'retrecissement': () => triangle('<g stroke="' + N + '" stroke-width="10" fill="none"><path d="M76 156 L76 120 L88 104 L88 72"/><path d="M124 156 L124 120 L112 104 L112 72"/></g>', 'Chaussée rétrécie'),
    'passage-niveau': () => triangle('<g stroke="' + N + '" stroke-width="6"><rect x="64" y="112" width="72" height="16" fill="' + W + '"/><line x1="72" y1="112" x2="84" y2="128"/><line x1="90" y1="112" x2="102" y2="128"/><line x1="108" y1="112" x2="120" y2="128"/><line x1="70" y1="128" x2="70" y2="156"/><line x1="130" y1="128" x2="130" y2="156"/></g>', 'Passage à niveau avec barrières'),
    'cyclistes': () => triangle('<g fill="none" stroke="' + N + '" stroke-width="6"><circle cx="76" cy="138" r="16"/><circle cx="124" cy="138" r="16"/><path d="M76 138 L96 108 L116 108 L124 138 M96 108 L104 138"/></g><circle cx="104" cy="88" r="7" fill="' + N + '"/>', 'Débouché de cyclistes'),

    // --- Intersection / priorité ---
    'cedez': () => triangleInverse('', 'Cédez le passage'),
    'stop': () => svg('<path d="M60 10 L140 10 L190 60 L190 140 L140 190 L60 190 L10 140 L10 60 Z" fill="' + R + '" stroke="' + W + '" stroke-width="6"/>' + txt('STOP', 100, 118, 52, W, 800), null, 'Stop'),
    'route-prioritaire': () => svg('<rect x="40" y="40" width="120" height="120" transform="rotate(45 100 100)" fill="' + W + '" stroke="#9A9A9A" stroke-width="3"/><rect x="58" y="58" width="84" height="84" transform="rotate(45 100 100)" fill="' + J + '"/>', null, 'Route prioritaire'),
    'fin-route-prioritaire': () => svg('<rect x="40" y="40" width="120" height="120" transform="rotate(45 100 100)" fill="' + W + '" stroke="#9A9A9A" stroke-width="3"/><rect x="58" y="58" width="84" height="84" transform="rotate(45 100 100)" fill="' + J + '"/><g stroke="' + N + '" stroke-width="7"><line x1="52" y1="148" x2="148" y2="52"/><line x1="64" y1="160" x2="160" y2="64"/><line x1="40" y1="136" x2="136" y2="40"/></g>', null, 'Fin de route prioritaire'),

    // --- Interdiction ---
    'sens-interdit': () => svg('<circle cx="100" cy="100" r="90" fill="' + R + '"/><rect x="36" y="84" width="128" height="32" fill="' + W + '"/>', null, 'Sens interdit'),
    'acces-interdit': () => rondRouge('', 'Circulation interdite à tout véhicule'),
    'vitesse': (n) => rondRouge(txt(n || 50, 100, 126, (String(n || 50).length > 2 ? 64 : 76), N, 800), 'Vitesse limitée à ' + (n || 50) + ' km/h'),
    'depassement-interdit': () => rondRouge(voiture(78, 100, R, 0.9) + voiture(122, 100, N, 0.9), 'Interdiction de dépasser'),
    'stationnement-interdit': () => svg('<circle cx="100" cy="100" r="84" fill="' + B + '" stroke="' + R + '" stroke-width="18"/><line x1="44" y1="44" x2="156" y2="156" stroke="' + R + '" stroke-width="18"/>', null, 'Stationnement interdit'),
    'arret-interdit': () => svg('<circle cx="100" cy="100" r="84" fill="' + B + '" stroke="' + R + '" stroke-width="18"/><line x1="44" y1="44" x2="156" y2="156" stroke="' + R + '" stroke-width="18"/><line x1="156" y1="44" x2="44" y2="156" stroke="' + R + '" stroke-width="18"/>', null, 'Arrêt et stationnement interdits'),
    'tourner-gauche-interdit': () => rondRouge('<path d="M118 150 L118 100 Q118 82 100 82 L78 82" fill="none" stroke="' + N + '" stroke-width="16"/><path d="M84 62 L56 82 L84 102 Z" fill="' + N + '"/><line x1="52" y1="52" x2="148" y2="148" stroke="' + R + '" stroke-width="14"/>', 'Interdiction de tourner à gauche'),
    'demi-tour-interdit': () => rondRouge('<path d="M120 150 L120 92 Q120 62 96 62 Q72 62 72 92 L72 116" fill="none" stroke="' + N + '" stroke-width="14"/><path d="M54 110 L72 140 L90 110 Z" fill="' + N + '"/><line x1="52" y1="52" x2="148" y2="148" stroke="' + R + '" stroke-width="14"/>', 'Interdiction de faire demi-tour'),
    'klaxon-interdit': () => rondRouge('<path d="M64 88 L84 88 L116 66 L116 134 L84 112 L64 112 Z" fill="' + N + '"/><line x1="52" y1="52" x2="148" y2="148" stroke="' + R + '" stroke-width="14"/>', 'Signaux sonores interdits'),
    'pietons-interdits': () => rondRouge(pieton(100, 104, 1) + '<line x1="52" y1="52" x2="148" y2="148" stroke="' + R + '" stroke-width="12"/>', 'Accès interdit aux piétons'),

    // --- Fin d'interdiction ---
    'fin-vitesse': (n) => fin(txt(n || 50, 100, 126, 70, '#9A9A9A', 800), 'Fin de limitation à ' + (n || 50) + ' km/h'),
    'fin-interdictions': () => fin('', 'Fin de toutes les interdictions'),
    'fin-depassement': () => fin(voiture(78, 100, '#9A9A9A', 0.9) + voiture(122, 100, '#9A9A9A', 0.9), 'Fin d\'interdiction de dépasser'),

    // --- Obligation ---
    'obligation-droite': () => rondBleu('<path d="M60 130 L60 100 Q60 86 76 86 L116 86" fill="none" stroke="' + W + '" stroke-width="16"/><path d="M110 60 L148 86 L110 112 Z" fill="' + W + '"/>', 'Obligation de tourner à droite'),
    'obligation-tout-droit': () => rondBleu('<rect x="91" y="80" width="18" height="76" fill="' + W + '"/><path d="M68 86 L100 44 L132 86 Z" fill="' + W + '"/>', 'Direction obligatoire : tout droit'),
    'giratoire': () => rondBleu('<g fill="none" stroke="' + W + '" stroke-width="12"><path d="M74 78 A40 40 0 0 1 130 76"/><path d="M140 104 A40 40 0 0 1 108 140"/><path d="M80 136 A40 40 0 0 1 62 100"/></g><g fill="' + W + '"><path d="M126 60 L146 84 L118 88 Z"/><path d="M122 146 L94 150 L106 126 Z"/><path d="M48 104 L60 76 L76 100 Z"/></g>', 'Sens giratoire obligatoire'),
    'piste-cyclable': () => rondBleu('<g fill="none" stroke="' + W + '" stroke-width="7"><circle cx="70" cy="122" r="22"/><circle cx="130" cy="122" r="22"/><path d="M70 122 L94 86 L122 86 L130 122 M94 86 L104 122"/></g><circle cx="104" cy="66" r="8" fill="' + W + '"/>', 'Piste ou bande cyclable obligatoire'),
    'vitesse-minimale': (n) => rondBleu(txt(n || 30, 100, 124, 72, W, 800), 'Vitesse minimale obligatoire'),

    // --- Indication ---
    'parking': () => carreBleu(txt('P', 100, 146, 140, W, 800), 'Parking'),
    'sens-unique': () => carreBleu('<rect x="40" y="88" width="90" height="24" fill="' + W + '"/><path d="M124 64 L166 100 L124 136 Z" fill="' + W + '"/>', 'Sens unique'),
    'passage-pietons-indication': () => carreBleu('<path d="M100 34 L168 158 L32 158 Z" fill="' + W + '"/>' + pieton(100, 118, 0.85) + '<g fill="' + N + '"><rect x="60" y="150" width="12" height="6"/><rect x="80" y="150" width="12" height="6"/><rect x="100" y="150" width="12" height="6"/><rect x="120" y="150" width="12" height="6"/></g>', 'Passage pour piétons'),
    'autoroute': () => carreBleu('<path d="M60 168 L88 50 L112 50 L140 168 Z" fill="' + W + '"/><rect x="96" y="60" width="8" height="100" fill="' + B + '"/><rect x="30" y="74" width="140" height="16" fill="' + W + '"/><rect x="38" y="90" width="12" height="20" fill="' + W + '"/><rect x="150" y="90" width="12" height="20" fill="' + W + '"/>', 'Début d\'autoroute'),
    'fin-autoroute': () => carreBleu('<path d="M60 168 L88 50 L112 50 L140 168 Z" fill="' + W + '"/><rect x="96" y="60" width="8" height="100" fill="' + B + '"/><rect x="30" y="74" width="140" height="16" fill="' + W + '"/><line x1="30" y1="170" x2="170" y2="30" stroke="' + R + '" stroke-width="14"/>', 'Fin d\'autoroute'),
    'impasse': () => carreBleu('<rect x="88" y="78" width="24" height="96" fill="' + W + '"/><rect x="60" y="50" width="80" height="30" fill="' + R + '"/>', 'Impasse'),
    'vitesse-conseillee': (n) => carreBleu(txt(n || 70, 100, 128, 80, W, 800), 'Vitesse conseillée'),
    'zone-30': () => svg('<rect x="10" y="30" width="180" height="140" rx="10" fill="' + W + '" stroke="#9A9A9A" stroke-width="3"/><circle cx="100" cy="86" r="42" fill="' + W + '" stroke="' + R + '" stroke-width="10"/>' + txt('30', 100, 104, 46, N, 800) + txt('ZONE', 100, 158, 30, N, 800), null, 'Zone 30'),
    'agglomeration': () => svg('<rect x="8" y="50" width="184" height="100" rx="8" fill="' + W + '" stroke="' + R + '" stroke-width="12"/>' + txt('VILLEBOURG', 100, 112, 30, N, 800), null, 'Entrée d\'agglomération'),
    'fin-agglomeration': () => svg('<rect x="8" y="50" width="184" height="100" rx="8" fill="' + W + '" stroke="' + R + '" stroke-width="12"/>' + txt('VILLEBOURG', 100, 112, 30, N, 800) + '<line x1="20" y1="140" x2="180" y2="60" stroke="' + R + '" stroke-width="12"/>', null, 'Sortie d\'agglomération'),
    'voie-verte': () => svg('<rect x="14" y="14" width="172" height="172" rx="14" fill="#1B8A3A" stroke="' + W + '" stroke-width="6"/>' + pieton(70, 104, 0.8) + '<g fill="none" stroke="' + W + '" stroke-width="5"><circle cx="112" cy="130" r="14"/><circle cx="150" cy="130" r="14"/><path d="M112 130 L126 106 L144 106 L150 130"/></g>', null, 'Voie verte'),

    // --- Feux ---
    'feu-rouge': () => feu('rouge'), 'feu-orange': () => feu('orange'), 'feu-vert': () => feu('vert'),
    'feu-orange-clignotant': () => feu('orange', true),

    // --- Schémas ---
    'ligne-continue': () => route('<rect x="96" y="0" width="8" height="200" fill="' + W + '"/>', 'Route avec ligne continue'),
    'ligne-discontinue': () => route(tirets(), 'Route avec ligne discontinue'),
    'ligne-mixte': () => route('<rect x="88" y="0" width="7" height="200" fill="' + W + '"/>' + tirets(106), 'Ligne mixte : continue à gauche, discontinue à droite'),
    'triangle-pre-signalisation': () => triangle('<path d="M100 54 L150 146 L50 146 Z" fill="none" stroke="' + R + '" stroke-width="10" stroke-linejoin="round"/>', 'Triangle de pré-signalisation')
  };

  function feu(etat, clignotant) {
    const on = { rouge: R, orange: '#FF9800', vert: '#1FA64A' }, off = '#3A3A3A';
    return svg('<rect x="66" y="10" width="68" height="180" rx="16" fill="' + N + '"/>' +
      '<circle cx="100" cy="46" r="22" fill="' + (etat === 'rouge' ? on.rouge : off) + '"/>' +
      '<circle cx="100" cy="100" r="22" fill="' + (etat === 'orange' ? on.orange : off) + '"/>' +
      '<circle cx="100" cy="154" r="22" fill="' + (etat === 'vert' ? on.vert : off) + '"/>' +
      (clignotant ? '<g stroke="#FF9800" stroke-width="5"><line x1="134" y1="100" x2="160" y2="100"/><line x1="40" y1="100" x2="66" y2="100"/><line x1="128" y1="78" x2="150" y2="66"/><line x1="72" y1="78" x2="50" y2="66"/></g>' : ''),
      null, clignotant ? 'Feu orange clignotant' : 'Feu ' + etat);
  }
  function route(inner, lab) { return svg('<rect x="0" y="0" width="200" height="200" fill="#6B7280"/><rect x="18" y="0" width="5" height="200" fill="' + W + '"/><rect x="177" y="0" width="5" height="200" fill="' + W + '"/>' + inner + voiture(140, 140, '#1FA64A', 0.9) + voiture(60, 60, R, 0.9), null, lab); }
  function tirets(x) { let s = ''; for (let y = 4; y < 200; y += 40) s += '<rect x="' + (x || 96) + '" y="' + y + '" width="7" height="24" fill="' + W + '"/>'; return s; }

  window.MM_PANNEAU = function (code) {
    if (!code) return '';
    const [nom, arg] = String(code).split(':');
    const f = P[nom];
    return f ? f(arg) : '';
  };
  window.MM_PANNEAUX_LISTE = Object.keys(P);
})();
