/* Mission Maison — Mon argent : niveaux, leçons, quiz, défis du mois
   Leçon : id ('n1-1'…), v (version), titre, emoji, texte (paragraphes), astuce, quiz (5 questions)
   Question : q, c (choix), r (index de la bonne réponse), e (explication) */
(function () {
  window.MM_NIVEAUX_ARGENT = [
    { id: 'n1', nom: 'Tirelire', emoji: '🐷', avance: false, texte: 'Comprendre la valeur de l\'argent et faire son budget.' },
    { id: 'n2', nom: 'Épargnante', emoji: '🌱', avance: false, texte: 'Mettre de côté, faire grandir son argent, battre l\'inflation.' },
    { id: 'n3', nom: 'Investisseuse', emoji: '📈', avance: true, texte: 'Comprendre la bourse, le risque et le long terme.' },
    { id: 'n4', nom: 'Experte', emoji: '🏆', avance: true, texte: 'Frais, enveloppes, arnaques, crédit et impôts.' }
  ];

  window.MM_LECONS = [
    /* ============ NIVEAU 1 : TIRELIRE ============ */
    { id: 'n1-1', v: 1, emoji: '🤔', titre: 'Besoin ou envie ?',
      texte: [
        'Un **besoin**, c\'est ce dont on ne peut pas se passer : manger, se loger, se soigner, s\'habiller, aller à l\'école.',
        'Une **envie**, c\'est ce qui fait plaisir mais dont on peut se passer : un nouveau jeu, une 3e paire de baskets, un bubble tea.',
        'Les envies ne sont pas interdites ! Le secret, c\'est de **choisir** ses envies au lieu de les subir. Avant un achat, pose-toi la question : « Est-ce que j\'en ai besoin, ou est-ce que j\'en ai envie ? Et est-ce que j\'en aurai encore envie dans une semaine ? »'
      ],
      astuce: 'La règle des 48 heures : pour un achat plaisir, attends 2 jours. Si tu en as encore vraiment envie, achète-le. Souvent, l\'envie est passée.',
      quiz: [
        { q: 'Lequel est un besoin ?', c: ['Une coque de téléphone à paillettes', 'Une paire de chaussures quand les tiennes sont trouées', 'Un deuxième sweat de la même couleur', 'Un abonnement à une appli de jeux'], r: 1, e: 'Des chaussures en bon état sont nécessaires. Les autres achats font plaisir mais on peut s\'en passer.' },
        { q: 'Les envies sont-elles interdites ?', c: ['Oui, il ne faut jamais se faire plaisir', 'Non, mais il vaut mieux les choisir au lieu de les subir', 'Oui, sauf à Noël', 'Non, il faut toutes les satisfaire tout de suite'], r: 1, e: 'Se faire plaisir est normal. L\'important est de décider en connaissance de cause.' },
        { q: 'Que dit la règle des 48 heures ?', c: ['Il faut dépenser son argent en 48 heures', 'Il faut attendre 2 jours avant un achat plaisir', 'Un magasin doit rembourser sous 48 heures', 'Il faut épargner pendant 48 jours'], r: 1, e: 'Attendre un peu permet de vérifier si l\'envie est vraie ou juste un coup de tête.' },
        { q: 'Se loger, c\'est…', c: ['Une envie', 'Un besoin', 'Un luxe', 'Un placement'], r: 1, e: 'Avoir un toit fait partie des besoins essentiels.' },
        { q: 'Quelle question se poser avant un achat ?', c: ['« Est-ce que mes amis l\'ont ? »', '« Est-ce qu\'il est en promo ? »', '« En ai-je besoin, ou envie ? En aurai-je encore envie dans une semaine ? »', '« Est-ce que la vendeuse est sympa ? »'], r: 2, e: 'Cette question aide à faire des choix réfléchis.' }
      ] },
    { id: 'n1-2', v: 1, emoji: '💼', titre: 'D\'où vient l\'argent ?',
      texte: [
        'L\'argent ne pousse pas dans le distributeur de billets ! Le distributeur donne seulement l\'argent qui a été **gagné** et déposé sur un compte.',
        'Pour la plupart des adultes, l\'argent vient du **travail** : un salaire versé chaque mois en échange d\'heures de travail et de compétences. Plus un métier demande de compétences rares, plus il est en général payé.',
        'D\'autres revenus existent : les aides de l\'État, la retraite, les revenus d\'une entreprise, ou ceux d\'un **placement** (intérêts, loyers, dividendes). Investir, c\'est faire travailler son argent en plus de soi.'
      ],
      astuce: 'Calcule combien d\'heures de travail représente un achat. Un objet à 60 €, c\'est environ 6 heures payées au SMIC net : est-ce qu\'il vaut ces 6 heures ?',
      quiz: [
        { q: 'D\'où vient l\'argent qui sort du distributeur ?', c: ['La banque l\'imprime pour toi', 'C\'est de l\'argent gagné puis déposé sur un compte', 'C\'est un cadeau de la banque', 'Il apparaît chaque mois tout seul'], r: 1, e: 'Le distributeur ne fait que rendre l\'argent déjà présent sur le compte.' },
        { q: 'Pour la plupart des adultes, la principale source d\'argent est…', c: ['Le loto', 'Le travail (le salaire)', 'Les cadeaux d\'anniversaire', 'Le distributeur'], r: 1, e: 'Le salaire, payé en échange du travail, est la première source de revenus.' },
        { q: 'En général, un métier est mieux payé quand…', c: ['Il demande des compétences rares', 'Il est facile', 'Il commence tard le matin', 'Il se fait en équipe'], r: 0, e: 'Les compétences recherchées et rares sont souvent mieux rémunérées.' },
        { q: 'Que veut dire « faire travailler son argent » ?', c: ['Le cacher sous son matelas', 'Le placer pour qu\'il rapporte des intérêts ou des dividendes', 'Le dépenser vite', 'Le prêter sans rien demander'], r: 1, e: 'Un placement peut rapporter de l\'argent en plus de ton travail.' },
        { q: 'Un objet à 60 € représente environ combien d\'heures payées au SMIC net ?', c: ['1 heure', '6 heures', '20 heures', '60 heures'], r: 1, e: 'Le SMIC net tourne autour de 9 à 10 € de l\'heure : 60 € ≈ 6 heures de travail.' }
      ] },
    { id: 'n1-3', v: 1, emoji: '📊', titre: 'Faire son budget',
      texte: [
        'Faire un budget, c\'est **prévoir** ce qu\'on va faire de son argent **avant** de le dépenser. C\'est comme un plan de route.',
        'Une méthode simple : quand tu reçois de l\'argent, partage-le en trois. Une part pour les **dépenses prévues** (ce que tu dois payer), une part pour les **plaisirs**, et une part pour l\'**épargne**.',
        'Les adultes utilisent souvent la règle **50/30/20** : 50 % pour les besoins, 30 % pour les envies, 20 % pour l\'épargne. À ton âge, tu peux essayer par exemple 50 % plaisirs, 50 % épargne… ou ce que tu veux, du moment que tu le décides à l\'avance !'
      ],
      astuce: 'Note tes dépenses pendant un mois, même les petites. Tu seras sûrement surprise de voir où part ton argent.',
      quiz: [
        { q: 'Faire un budget, c\'est…', c: ['Dépenser puis regarder ce qui reste', 'Prévoir ce qu\'on va faire de son argent avant de le dépenser', 'Ne jamais rien acheter', 'Demander de l\'argent à ses parents'], r: 1, e: 'Un budget se prépare à l\'avance, comme un plan.' },
        { q: 'Dans la règle 50/30/20 des adultes, les 20 % servent à…', c: ['Les vacances', 'L\'épargne', 'Le loyer', 'Les cadeaux'], r: 1, e: '50 % pour les besoins, 30 % pour les envies, 20 % pour l\'épargne.' },
        { q: 'Tu reçois 20 € et tu décides d\'en épargner la moitié. Combien mets-tu de côté ?', c: ['5 €', '10 €', '15 €', '20 €'], r: 1, e: 'La moitié de 20 €, c\'est 10 €.' },
        { q: 'Pourquoi noter ses dépenses pendant un mois ?', c: ['Pour savoir où part vraiment son argent', 'Pour faire plaisir à ses parents', 'Ça ne sert à rien', 'Pour payer moins d\'impôts'], r: 0, e: 'Les petites dépenses s\'additionnent vite : les noter permet de les voir.' },
        { q: 'Quel est le bon moment pour décider de la part à épargner ?', c: ['À la fin du mois, s\'il reste quelque chose', 'Dès qu\'on reçoit l\'argent', 'Jamais', 'Quand on a 18 ans'], r: 1, e: 'Mettre de côté dès le début évite de tout dépenser sans s\'en rendre compte.' }
      ] },
    { id: 'n1-4', v: 1, emoji: '📱', titre: 'Les pièges qui font dépenser',
      texte: [
        'Les marques dépensent des fortunes pour te donner envie d\'acheter. Publicités, influenceurs, « offre limitée », « plus que 2 en stock », compte à rebours : tout est fait pour te faire décider **vite**, sans réfléchir.',
        'Les influenceurs sont souvent **payés** pour montrer un produit. La loi les oblige à l\'indiquer (« collaboration commerciale », « publicité »). Repère-le !',
        'Autre piège : les **petites dépenses répétées**. 4 € par semaine pour une boisson, ça fait plus de 200 € par an. Ce n\'est pas interdit, mais il vaut mieux le savoir.'
      ],
      astuce: 'Quand une offre te presse (« plus que 2 heures ! »), c\'est justement le moment de ralentir.',
      quiz: [
        { q: '« Plus que 2 en stock ! » sert surtout à…', c: ['T\'informer gentiment', 'Te pousser à acheter vite sans réfléchir', 'Aider le magasin à compter', 'Rien du tout'], r: 1, e: 'L\'urgence est une technique de vente pour éviter qu\'on prenne le temps de réfléchir.' },
        { q: 'Un influenceur payé par une marque doit…', c: ['Ne rien dire', 'Indiquer qu\'il s\'agit d\'une publicité ou d\'une collaboration', 'Offrir le produit à ses abonnés', 'Arrêter de publier'], r: 1, e: 'En France, la loi impose d\'indiquer clairement les contenus sponsorisés.' },
        { q: '4 € par semaine pendant un an (52 semaines), cela fait environ…', c: ['48 €', '100 €', '208 €', '400 €'], r: 2, e: '4 × 52 = 208 €. Les petites dépenses s\'additionnent vite.' },
        { q: 'Face à une offre qui te presse, le mieux est de…', c: ['Acheter tout de suite', 'Ralentir et prendre le temps de réfléchir', 'Acheter deux fois', 'Emprunter de l\'argent'], r: 1, e: 'La pression est un signal pour ralentir.' },
        { q: 'Pourquoi les marques payent-elles des influenceurs ?', c: ['Pour leur faire plaisir', 'Parce que leurs abonnés leur font confiance et achètent plus', 'Parce que c\'est obligatoire', 'Pour baisser les prix'], r: 1, e: 'La confiance des abonnés envers l\'influenceur est utilisée pour vendre.' }
      ] },
    { id: 'n1-5', v: 1, emoji: '💳', titre: 'Payer en toute sécurité',
      texte: [
        'On peut payer en **espèces** (pièces et billets), par **carte bancaire**, par **virement** ou avec son **téléphone**. Avec la carte, on ne « voit » pas l\'argent partir : il est plus facile de trop dépenser.',
        'Le **code secret** de ta carte ne se donne **jamais** à personne, même pas à un ami, et jamais par téléphone, SMS ou mail. Une vraie banque ne te le demandera jamais.',
        'Méfie-toi des messages qui te demandent de cliquer sur un lien pour « débloquer un colis » ou « gagner un cadeau » : c\'est souvent une arnaque (on appelle ça du **hameçonnage**).'
      ],
      astuce: 'Un doute sur un message ? Ne clique pas, et demande à Papa ou Maman.',
      quiz: [
        { q: 'À qui peux-tu donner le code secret de ta carte ?', c: ['À ta meilleure amie', 'À un conseiller qui t\'appelle', 'À personne', 'À quelqu\'un qui t\'envoie un SMS'], r: 2, e: 'Le code secret est personnel. Une banque ne le demande jamais.' },
        { q: 'Pourquoi dépense-t-on souvent plus avec une carte qu\'en espèces ?', c: ['Parce que la carte coûte plus cher', 'Parce qu\'on ne voit pas l\'argent partir', 'Parce que les magasins l\'exigent', 'C\'est faux'], r: 1, e: 'Payer par carte est indolore : on ne sent pas son porte-monnaie se vider.' },
        { q: 'Un SMS dit : « Votre colis est bloqué, cliquez ici et payez 2 € ». Que faire ?', c: ['Payer vite pour recevoir le colis', 'Ne pas cliquer et en parler à un adulte', 'Envoyer son code de carte', 'Transférer le SMS à ses amis'], r: 1, e: 'C\'est une arnaque classique pour voler des informations bancaires.' },
        { q: 'Comment appelle-t-on ces faux messages qui cherchent à voler tes informations ?', c: ['Le hameçonnage', 'Le budget', 'Le virement', 'L\'épargne'], r: 0, e: 'On parle de hameçonnage (ou « phishing » en anglais).' },
        { q: 'Lequel n\'est PAS un moyen de paiement ?', c: ['Les espèces', 'La carte bancaire', 'Le virement', 'Le code secret'], r: 3, e: 'Le code secret protège la carte : ce n\'est pas un moyen de paiement.' }
      ] },

    /* ============ NIVEAU 2 : ÉPARGNANTE ============ */
    { id: 'n2-1', v: 1, emoji: '🛟', titre: 'Pourquoi épargner ?',
      texte: [
        'Épargner, c\'est **mettre de côté une partie de son argent** au lieu de tout dépenser. Ça sert à trois choses.',
        '**1. Faire face aux imprévus** : un téléphone cassé, une réparation. **2. Réaliser un projet** : un voyage, le permis, des études. **3. Préparer l\'avenir** : avoir plus de liberté plus tard.',
        'Le meilleur conseil des spécialistes : **se payer en premier**. Dès qu\'on reçoit de l\'argent, on met d\'abord sa part d\'épargne de côté, et on dépense ensuite le reste. C\'est exactement ce que tu fais quand tu choisis l\'épargne dans Mission Maison !'
      ],
      astuce: 'Les adultes gardent souvent une « épargne de précaution » de 3 à 6 mois de dépenses pour les coups durs.',
      quiz: [
        { q: 'Épargner, c\'est…', c: ['Dépenser tout son argent', 'Mettre une partie de son argent de côté', 'Emprunter de l\'argent', 'Jouer au loto'], r: 1, e: 'Épargner, c\'est garder une partie de ses revenus pour plus tard.' },
        { q: 'Que veut dire « se payer en premier » ?', c: ['S\'acheter un cadeau dès qu\'on reçoit de l\'argent', 'Mettre d\'abord sa part d\'épargne de côté, puis dépenser le reste', 'Payer ses dettes en dernier', 'Demander son salaire en avance'], r: 1, e: 'On épargne au début, pas avec ce qui reste à la fin (il ne reste souvent rien).' },
        { q: 'Laquelle n\'est PAS une bonne raison d\'épargner ?', c: ['Faire face à un imprévu', 'Financer un projet', 'Préparer l\'avenir', 'Pouvoir dire qu\'on n\'a jamais d\'argent'], r: 3, e: 'Les trois premières sont les grandes raisons d\'épargner.' },
        { q: 'L\'épargne de précaution des adultes représente souvent…', c: ['1 jour de dépenses', '3 à 6 mois de dépenses', '10 ans de salaire', 'Rien du tout'], r: 1, e: 'Elle permet de tenir quelques mois en cas de coup dur.' },
        { q: 'Dans Mission Maison, l\'option épargne complète te donne…', c: ['20 € en poche', '30 € épargnés (20 € + 10 € des parents)', '200 € épargnés', 'Une sortie'], r: 1, e: 'Papa et Maman ajoutent 50 % quand tu épargnes : 20 € deviennent 30 €.' }
      ] },
    { id: 'n2-2', v: 1, emoji: '🎯', titre: 'Se fixer un objectif',
      texte: [
        'Il est beaucoup plus facile d\'épargner quand on sait **pour quoi**. Un bon objectif est **précis** : quoi, combien, et pour quand.',
        'Exemple : « Je veux un casque à 60 € dans 6 mois. » Il suffit de diviser : 60 € ÷ 6 mois = **10 € par mois** à mettre de côté.',
        'Découper un gros objectif en petites étapes le rend atteignable. Et voir sa jauge monter, c\'est très motivant ! Tu peux créer ton objectif dans l\'onglet « Mon argent ».'
      ],
      astuce: 'Prends une photo de ton objectif et garde-la comme fond d\'écran : ça aide à résister aux petites dépenses.',
      quiz: [
        { q: 'Un bon objectif d\'épargne est…', c: ['Vague, comme « avoir des sous »', 'Précis : quoi, combien et pour quand', 'Toujours très cher', 'Secret, même pour soi'], r: 1, e: 'Plus il est précis, plus il est facile à atteindre.' },
        { q: 'Tu veux 90 € dans 3 mois. Combien épargner par mois ?', c: ['10 €', '30 €', '45 €', '90 €'], r: 1, e: '90 € ÷ 3 = 30 € par mois.' },
        { q: 'Tu épargnes 15 € par mois. Combien auras-tu après 8 mois ?', c: ['80 €', '100 €', '120 €', '150 €'], r: 2, e: '15 × 8 = 120 €.' },
        { q: 'Pourquoi découper un gros objectif en étapes ?', c: ['Pour qu\'il paraisse plus atteignable', 'Pour qu\'il coûte moins cher', 'C\'est obligatoire à la banque', 'Pour l\'oublier'], r: 0, e: 'Des petites étapes régulières sont plus faciles à tenir.' },
        { q: 'Un objet coûte 48 €. Tu peux épargner 8 € par mois. Il te faudra…', c: ['4 mois', '6 mois', '8 mois', '12 mois'], r: 1, e: '48 ÷ 8 = 6 mois.' }
      ] },
    { id: 'n2-3', v: 1, emoji: '🏦', titre: 'Les intérêts et les livrets',
      texte: [
        'Quand tu places de l\'argent sur un **livret d\'épargne**, la banque te verse des **intérêts** : un petit pourcentage de ton argent chaque année. Exemple : 100 € placés à 3 % rapportent 3 € en un an.',
        'En France, le **Livret A** est le plus connu : sans risque, l\'argent est disponible à tout moment, et son taux est fixé par l\'État (il change de temps en temps). Le **Livret jeune**, réservé aux 12-25 ans, rapporte souvent un peu plus mais il est plafonné à 1 600 €.',
        'Les livrets sont parfaits pour l\'épargne de précaution et les projets proches. Mais leurs intérêts sont faibles : sur le long terme, ils suivent à peine l\'augmentation des prix.'
      ],
      astuce: 'Un livret est sans risque : tu ne peux pas perdre l\'argent que tu as versé.',
      quiz: [
        { q: '200 € placés à 2 % pendant un an rapportent…', c: ['2 €', '4 €', '20 €', '40 €'], r: 1, e: '2 % de 200 €, c\'est 200 × 2 ÷ 100 = 4 €.' },
        { q: 'Qui fixe le taux du Livret A ?', c: ['Chaque client', 'L\'État', 'Les influenceurs', 'Le magasin'], r: 1, e: 'Le taux du Livret A est réglementé par l\'État.' },
        { q: 'Le Livret jeune est réservé aux…', c: ['Moins de 10 ans', '12-25 ans', 'Plus de 60 ans', 'Entreprises'], r: 1, e: 'Le Livret jeune est ouvert aux jeunes de 12 à 25 ans.' },
        { q: 'Sur un livret réglementé, peut-on perdre l\'argent versé ?', c: ['Oui, souvent', 'Non, il est sans risque', 'Oui, si la bourse baisse', 'Seulement le dimanche'], r: 1, e: 'Les livrets réglementés sont sans risque de perte en capital.' },
        { q: 'Le principal défaut des livrets sur le long terme est…', c: ['Ils sont dangereux', 'Leurs intérêts sont faibles', 'On ne peut jamais récupérer son argent', 'Ils sont interdits aux jeunes'], r: 1, e: 'Ils sont sûrs mais rapportent peu : parfait pour le court terme.' }
      ] },
    { id: 'n2-4', v: 1, emoji: '⛄', titre: 'L\'effet boule de neige',
      texte: [
        'Les **intérêts composés**, c\'est quand les intérêts gagnés rapportent à leur tour des intérêts. Comme une boule de neige qui grossit en roulant.',
        'Exemple à 5 % par an : 100 € deviennent 105 € après un an. L\'année suivante, les 5 % s\'appliquent sur 105 € : tu as 110,25 €. Puis 115,76 €… Après 30 ans, les 100 € sont devenus environ **430 €**, sans rien ajouter !',
        'L\'ingrédient magique, c\'est le **temps**. Plus on commence tôt, plus la boule de neige a le temps de grossir. C\'est pour ça qu\'épargner à ton âge, même un peu, est une super idée.'
      ],
      astuce: 'La règle de 72 : divise 72 par le taux pour savoir en combien d\'années ton argent double. À 6 % par an : 72 ÷ 6 = 12 ans.',
      quiz: [
        { q: 'Les intérêts composés, c\'est…', c: ['Des intérêts qui rapportent eux-mêmes des intérêts', 'Des intérêts qu\'on paie à la banque', 'Des intérêts interdits', 'Des intérêts versés une seule fois'], r: 0, e: 'Les gains s\'ajoutent au capital et produisent à leur tour des gains.' },
        { q: '100 € à 10 % par an, intérêts composés : combien après 2 ans ?', c: ['110 €', '120 €', '121 €', '200 €'], r: 2, e: '100 → 110 la 1re année, puis 110 + 11 = 121 € la 2e année.' },
        { q: 'Quel est l\'ingrédient le plus important de l\'effet boule de neige ?', c: ['La chance', 'Le temps', 'Le nombre de comptes', 'La couleur de la carte'], r: 1, e: 'Plus le temps est long, plus l\'effet est puissant.' },
        { q: 'Avec la règle de 72, à 8 % par an, ton argent double en environ…', c: ['4 ans', '9 ans', '18 ans', '72 ans'], r: 1, e: '72 ÷ 8 = 9 ans.' },
        { q: 'Qui profite le plus des intérêts composés ?', c: ['Celui qui commence tard avec beaucoup', 'Celui qui commence tôt, même avec peu', 'Celui qui retire son argent chaque année', 'Personne'], r: 1, e: 'Commencer tôt laisse plus d\'années à la boule de neige.' }
      ] },
    { id: 'n2-5', v: 1, emoji: '🎈', titre: 'L\'inflation, voleuse discrète',
      texte: [
        'L\'**inflation**, c\'est la hausse générale des prix. Quand elle est de 2 % par an, ce qui coûtait 100 € coûte 102 € l\'année suivante.',
        'Conséquence : un billet de 20 € caché dans un tiroir permet d\'acheter **un peu moins** chaque année. Il garde le même chiffre, mais il **perd du pouvoir d\'achat**.',
        'La Banque centrale européenne essaie de garder l\'inflation autour de 2 % par an. Mais certaines années, elle grimpe beaucoup : en 2022, les prix ont augmenté de plus de 5 % en France. Pour que ton épargne garde sa valeur, il faut qu\'elle rapporte au moins autant que l\'inflation.'
      ],
      astuce: 'Demande à Papa ou Maman combien coûtait une baguette quand ils avaient ton âge : c\'est l\'inflation en vrai !',
      quiz: [
        { q: 'L\'inflation, c\'est…', c: ['La baisse des prix', 'La hausse générale des prix', 'Un type de compte', 'Un impôt'], r: 1, e: 'L\'inflation désigne l\'augmentation générale des prix.' },
        { q: 'Avec 3 % d\'inflation, un panier à 100 € coûte l\'année suivante…', c: ['97 €', '100 €', '103 €', '130 €'], r: 2, e: '100 € + 3 % = 103 €.' },
        { q: 'Un billet caché dans un tiroir pendant 10 ans…', c: ['Prend de la valeur', 'Garde exactement le même pouvoir d\'achat', 'Perd du pouvoir d\'achat', 'Rapporte des intérêts'], r: 2, e: 'Les prix montent, mais le billet reste à 20 € : il achète moins.' },
        { q: 'Quel niveau d\'inflation vise la Banque centrale européenne ?', c: ['Environ 0 %', 'Environ 2 %', 'Environ 10 %', 'Environ 50 %'], r: 1, e: 'L\'objectif est une inflation proche de 2 % par an.' },
        { q: 'Ton livret rapporte 2 % et l\'inflation est de 4 %. Ton épargne…', c: ['Gagne du pouvoir d\'achat', 'Perd du pouvoir d\'achat', 'Ne change pas', 'Double'], r: 1, e: 'Les prix montent plus vite que ton épargne : tu peux acheter un peu moins.' }
      ] },

    /* ============ NIVEAU 3 : INVESTISSEUSE ============ */
    { id: 'n3-1', v: 1, emoji: '🏭', titre: 'C\'est quoi, une action ?',
      texte: [
        'Une **action**, c\'est un petit morceau d\'une entreprise. Acheter une action d\'une marque que tu connais, c\'est devenir **copropriétaire** de cette entreprise, pour une toute petite part.',
        'Si l\'entreprise réussit et gagne plus d\'argent, son action prend en général de la valeur. Elle peut aussi te verser une partie de ses bénéfices : un **dividende**. Si elle va mal, l\'action peut baisser, parfois beaucoup.',
        'Les actions s\'achètent et se vendent en **bourse**, un grand marché où le prix change chaque seconde selon l\'offre et la demande.'
      ],
      astuce: 'Regarde autour de toi : ton téléphone, tes baskets, ton shampoing… Presque tout est fabriqué par des entreprises dont on peut acheter des actions.',
      quiz: [
        { q: 'Une action, c\'est…', c: ['Un prêt à la banque', 'Un petit morceau d\'une entreprise', 'Un billet de loterie', 'Un livret d\'épargne'], r: 1, e: 'Posséder une action, c\'est posséder une petite part de l\'entreprise.' },
        { q: 'Un dividende, c\'est…', c: ['Une partie des bénéfices versée aux actionnaires', 'Une amende', 'Le prix d\'une action', 'Un impôt'], r: 0, e: 'L\'entreprise partage une partie de ses bénéfices avec ses actionnaires.' },
        { q: 'Où achète-t-on des actions ?', c: ['Au supermarché', 'En bourse', 'À la poste', 'Chez le notaire'], r: 1, e: 'Les actions s\'échangent sur les marchés financiers : la bourse.' },
        { q: 'Si l\'entreprise va mal, son action…', c: ['Monte forcément', 'Peut baisser, parfois beaucoup', 'Reste toujours au même prix', 'Disparaît le lendemain'], r: 1, e: 'Le prix reflète la santé et les perspectives de l\'entreprise.' },
        { q: 'Le prix d\'une action en bourse dépend surtout…', c: ['De l\'offre et de la demande', 'De la météo uniquement', 'Du gouvernement', 'Il ne change jamais'], r: 0, e: 'Plus il y a d\'acheteurs que de vendeurs, plus le prix monte, et inversement.' }
      ] },
    { id: 'n3-2', v: 1, emoji: '🎢', titre: 'Risque et rendement',
      texte: [
        'Règle d\'or : **pas de rendement sans risque**. Un livret ne peut pas baisser mais rapporte peu. Les actions peuvent rapporter beaucoup plus sur le long terme, mais leur valeur monte et descend.',
        'Sur de très longues périodes, les actions mondiales ont rapporté en moyenne environ **6 à 8 % par an**. Mais cette moyenne cache des années à −30 % et d\'autres à +30 % ! En 2008 ou en mars 2020, la bourse a fortement chuté… avant de remonter.',
        'C\'est pour ça qu\'on n\'investit en actions que l\'argent dont on n\'aura **pas besoin avant longtemps** (8 à 10 ans ou plus). Ton épargne Mission Maison, placée jusqu\'à tes 18 ans au moins, est dans ce cas.'
      ],
      astuce: 'Quelqu\'un te promet un gros gain sans aucun risque ? C\'est forcément faux.',
      quiz: [
        { q: 'Quelle phrase est vraie ?', c: ['On peut avoir un gros rendement sans aucun risque', 'Plus le rendement espéré est élevé, plus le risque est grand', 'Les actions ne baissent jamais', 'Les livrets sont très risqués'], r: 1, e: 'Risque et rendement vont ensemble.' },
        { q: 'Sur très longue période, les actions mondiales ont rapporté en moyenne environ…', c: ['0,5 % par an', '6 à 8 % par an', '30 % par an', '100 % par an'], r: 1, e: 'C\'est une moyenne historique, avec de fortes variations selon les années.' },
        { q: 'Que s\'est-il passé en bourse en mars 2020 ?', c: ['Une forte chute, puis une remontée', 'Rien du tout', 'La bourse a fermé pour toujours', 'Toutes les actions ont doublé'], r: 0, e: 'Le Covid a fait chuter les marchés, qui se sont redressés dans les mois suivants.' },
        { q: 'Pour quel argent les actions sont-elles adaptées ?', c: ['L\'argent du loyer du mois prochain', 'L\'argent dont on n\'a pas besoin avant longtemps', 'L\'argent d\'un achat la semaine prochaine', 'L\'argent emprunté'], r: 1, e: 'Il faut du temps pour traverser les baisses.' },
        { q: 'Une promesse de « gros gains garantis sans risque » est…', c: ['Une bonne affaire', 'Forcément suspecte', 'Normale en bourse', 'Réservée aux experts'], r: 1, e: 'Le rendement élevé sans risque n\'existe pas : c\'est un signe d\'arnaque.' }
      ] },
    { id: 'n3-3', v: 1, emoji: '🧺', titre: 'Ne pas mettre tous ses œufs dans le même panier',
      texte: [
        'Si tu mets tout ton argent sur **une seule** entreprise et qu\'elle fait faillite, tu perds tout. Si tu le répartis sur **des centaines** d\'entreprises, la chute de l\'une est compensée par la réussite des autres.',
        'C\'est la **diversification** : répartir son argent entre beaucoup d\'entreprises, de secteurs (santé, technologie, énergie, alimentation…) et de pays.',
        'La diversification ne supprime pas le risque que toute la bourse baisse un moment, mais elle évite le risque de **tout perdre** à cause d\'une seule mauvaise surprise.'
      ],
      astuce: 'Même les grandes entreprises peuvent disparaître : beaucoup de géants d\'il y a 30 ans n\'existent plus aujourd\'hui.',
      quiz: [
        { q: 'Diversifier, c\'est…', c: ['Tout mettre sur une seule entreprise', 'Répartir son argent entre beaucoup d\'entreprises, de secteurs et de pays', 'Changer de banque chaque mois', 'Garder son argent en espèces'], r: 1, e: 'La diversification répartit le risque.' },
        { q: 'Tu possèdes une seule action et l\'entreprise fait faillite. Tu…', c: ['Ne perds rien', 'Perds tout ce que tu avais investi', 'Gagnes de l\'argent', 'Es remboursée par l\'État'], r: 1, e: 'Sans diversification, une seule faillite peut tout emporter.' },
        { q: 'La diversification permet surtout d\'éviter…', c: ['Que la bourse baisse un jour', 'De tout perdre à cause d\'une seule entreprise', 'De payer des impôts', 'D\'avoir des dividendes'], r: 1, e: 'Elle ne protège pas d\'une baisse générale, mais d\'une catastrophe isolée.' },
        { q: 'Lequel est le portefeuille le plus diversifié ?', c: ['1 entreprise française', '3 entreprises de jeux vidéo', 'Des centaines d\'entreprises de nombreux pays et secteurs', '10 actions de la même entreprise'], r: 2, e: 'Plus il y a d\'entreprises, de secteurs et de pays différents, mieux c\'est.' },
        { q: 'Une très grande entreprise peut-elle disparaître ?', c: ['Non, jamais', 'Oui, cela arrive', 'Seulement en France', 'Seulement si elle est petite'], r: 1, e: 'Même les géants peuvent décliner ou disparaître : d\'où l\'intérêt de diversifier.' }
      ] },
    { id: 'n3-4', v: 1, emoji: '🌍', titre: 'Les ETF : le monde dans un panier',
      texte: [
        'Un **ETF** (ou « tracker », ou fonds indiciel) est un panier tout prêt qui contient **des centaines d\'entreprises** d\'un coup. En achetant une seule part, tu possèdes un petit morceau de chacune.',
        'Par exemple, un ETF « MSCI World » suit environ **1 400 grandes entreprises** de 23 pays développés. Un ETF « S&P 500 » suit les 500 plus grandes entreprises américaines.',
        'Les ETF ont deux gros avantages : une **diversification** immédiate et des **frais très faibles**. C\'est pour ça que de nombreux spécialistes de l\'épargne recommandent, pour les particuliers, d\'investir régulièrement sur le long terme dans des ETF larges plutôt que d\'essayer de choisir les « meilleures » actions.'
      ],
      astuce: 'Personne, même les professionnels, ne sait quelles actions monteront le plus. Un ETF large évite d\'avoir à deviner.',
      quiz: [
        { q: 'Un ETF, c\'est…', c: ['Une seule action', 'Un panier qui contient de nombreuses entreprises', 'Un livret garanti', 'Une cryptomonnaie'], r: 1, e: 'Un ETF réplique un indice qui regroupe beaucoup d\'entreprises.' },
        { q: 'Un ETF MSCI World contient environ…', c: ['10 entreprises', '100 entreprises', '1 400 entreprises', '1 million d\'entreprises'], r: 2, e: 'Il couvre environ 1 400 grandes entreprises de pays développés.' },
        { q: 'Quels sont les deux grands avantages des ETF ?', c: ['Garantie et taux fixe', 'Diversification et frais faibles', 'Gains rapides et sans risque', 'Secret et exclusivité'], r: 1, e: 'Ils sont diversifiés et peu coûteux.' },
        { q: 'Un ETF peut-il baisser ?', c: ['Non, jamais', 'Oui, quand les entreprises qu\'il contient baissent', 'Seulement le week-end', 'Seulement s\'il est américain'], r: 1, e: 'Il suit la bourse : il monte et baisse avec elle.' },
        { q: 'Pourquoi un ETF large évite-t-il d\'avoir à « deviner » ?', c: ['Parce qu\'il contient déjà presque toutes les grandes entreprises', 'Parce qu\'il est garanti', 'Parce qu\'il choisit au hasard', 'Parce qu\'il ne contient qu\'une entreprise'], r: 0, e: 'On possède tout le marché au lieu de parier sur quelques gagnants.' }
      ] },
    { id: 'n3-5', v: 1, emoji: '🐢', titre: 'La patience de la tortue',
      texte: [
        'En bourse, l\'erreur la plus fréquente est de **paniquer** quand ça baisse et de tout vendre… juste avant que ça remonte. On transforme alors une baisse temporaire en perte réelle.',
        'Les investisseurs qui réussissent le mieux font souvent quelque chose de très simple : ils investissent **régulièrement** (par exemple chaque mois), sur des placements diversifiés, et ils **gardent** pendant des années, sans regarder tous les jours.',
        'Investir chaque mois la même somme permet aussi d\'acheter plus de parts quand c\'est moins cher. Personne ne sait prévoir le bon moment : la régularité est plus efficace que la devinette.'
      ],
      astuce: 'Le jeu « Tempête en bourse » de l\'onglet « Mon argent » te fait vivre 20 ans de bourse en 2 minutes. Essaie de ne pas paniquer !',
      quiz: [
        { q: 'Quelle est l\'erreur la plus fréquente en bourse ?', c: ['Investir régulièrement', 'Vendre en panique pendant une baisse', 'Diversifier', 'Attendre longtemps'], r: 1, e: 'Vendre dans la panique transforme une baisse passagère en vraie perte.' },
        { q: 'Investir la même somme chaque mois permet…', c: ['D\'acheter plus de parts quand les prix sont bas', 'De ne jamais perdre', 'De deviner le bon moment', 'De payer moins d\'impôts'], r: 0, e: 'À somme égale, on achète plus de parts quand c\'est moins cher.' },
        { q: 'Que fait souvent un bon investisseur à long terme ?', c: ['Il regarde la bourse toutes les heures', 'Il investit régulièrement et garde longtemps', 'Il change tout chaque semaine', 'Il suit les conseils de n\'importe quel influenceur'], r: 1, e: 'Régularité et patience sont ses meilleurs alliés.' },
        { q: 'Quelqu\'un peut-il prévoir à coup sûr quand la bourse va monter ?', c: ['Oui, les experts', 'Oui, les influenceurs', 'Non, personne', 'Oui, la banque'], r: 2, e: 'Personne ne peut prévoir à coup sûr les mouvements du marché.' },
        { q: 'Pendant une forte baisse, si tu n\'as pas besoin de l\'argent, le plus sage est souvent de…', c: ['Tout vendre immédiatement', 'Rester calme et garder ses placements', 'Emprunter pour acheter plus', 'Supprimer son compte'], r: 1, e: 'Historiquement, les marchés ont fini par se redresser après les crises.' }
      ] },

    /* ============ NIVEAU 4 : EXPERTE ============ */
    { id: 'n4-1', v: 1, emoji: '🐜', titre: 'Les frais, ces petites fourmis',
      texte: [
        'Chaque placement a des **frais** : frais de gestion chaque année, frais à chaque achat ou vente. Ils ont l\'air petits (1 %, 2 %…) mais ils sont prélevés **chaque année**, sur **toute** la somme.',
        'Sur 30 ans, la différence entre un placement à 0,2 % de frais et un autre à 2 % peut représenter **des dizaines de pourcents** du résultat final : l\'effet boule de neige marche aussi pour les frais, mais à l\'envers !',
        'Avant de placer de l\'argent, il faut toujours demander : « Combien ça coûte, au total, chaque année ? ». Les ETF sont réputés pour leurs frais très bas.'
      ],
      astuce: 'Un placement présenté comme « gratuit » se rémunère souvent ailleurs : regarde toujours le détail des frais.',
      quiz: [
        { q: 'Pourquoi des frais de 2 % par an sont-ils importants ?', c: ['Ils ne comptent qu\'une fois', 'Ils sont prélevés chaque année et s\'accumulent', 'Ils sont toujours remboursés', 'Ils font gagner plus'], r: 1, e: 'Prélevés chaque année, ils réduisent fortement le résultat sur le long terme.' },
        { q: 'Les intérêts composés jouent aussi avec les frais…', c: ['Dans le bon sens', 'À l\'envers : ils grignotent de plus en plus', 'Pas du tout', 'Seulement pour les livrets'], r: 1, e: 'L\'argent prélevé en frais ne travaille plus pour toi.' },
        { q: 'Quelle question poser avant de placer de l\'argent ?', c: ['« Quelle est la couleur du logo ? »', '« Combien ça coûte, au total, chaque année ? »', '« Est-ce que mes amis l\'ont ? »', '« Est-ce que c\'est à la mode ? »'], r: 1, e: 'Connaître les frais totaux est indispensable.' },
        { q: 'Les ETF sont réputés pour…', c: ['Leurs frais très élevés', 'Leurs frais très bas', 'Leur garantie totale', 'Leur interdiction en France'], r: 1, e: 'Ils sont gérés de façon automatique, donc peu coûteuse.' },
        { q: 'Un produit « gratuit »…', c: ['Ne coûte jamais rien', 'Peut se rémunérer autrement : il faut vérifier', 'Est toujours une arnaque', 'Est réservé aux enfants'], r: 1, e: 'Il faut regarder où se cachent les frais.' }
      ] },
    { id: 'n4-2', v: 1, emoji: '📦', titre: 'Les enveloppes : PEA, assurance-vie, compte-titres',
      texte: [
        'Pour investir, on utilise une **enveloppe** : un type de compte avec ses propres règles, surtout pour les **impôts**. On peut y mettre différents placements.',
        'Le **PEA** (plan d\'épargne en actions) s\'ouvre à partir de 18 ans. Après 5 ans, les gains ne sont plus soumis à l\'impôt sur le revenu (il reste les prélèvements sociaux). L\'**assurance-vie** devient intéressante fiscalement après 8 ans et peut être ouverte pour un enfant. Le **compte-titres** n\'a pas de limite ni d\'avantage fiscal.',
        'Ouvrir un PEA tôt (à 18 ans) permet de « prendre date » : le compteur des 5 ans démarre. Avant 18 ans, ce sont tes parents qui gèrent ton épargne pour toi.'
      ],
      astuce: 'Les règles fiscales changent parfois : avant d\'ouvrir une enveloppe, on vérifie toujours les règles du moment.',
      quiz: [
        { q: 'Une enveloppe, en épargne, c\'est…', c: ['Un type de compte avec ses propres règles fiscales', 'Une lettre de la banque', 'Une action', 'Une cryptomonnaie'], r: 0, e: 'L\'enveloppe définit surtout les règles d\'impôts.' },
        { q: 'À partir de quel âge peut-on ouvrir un PEA ?', c: ['10 ans', '14 ans', '18 ans', '30 ans'], r: 2, e: 'Le PEA est réservé aux majeurs.' },
        { q: 'Après combien d\'années un PEA devient-il intéressant fiscalement ?', c: ['1 an', '5 ans', '20 ans', '50 ans'], r: 1, e: 'Après 5 ans, les gains ne sont plus soumis à l\'impôt sur le revenu.' },
        { q: 'L\'assurance-vie devient fiscalement intéressante après…', c: ['8 ans', '1 mois', '2 ans', '40 ans'], r: 0, e: 'Les avantages fiscaux de l\'assurance-vie apparaissent après 8 ans.' },
        { q: 'Pourquoi ouvrir un PEA dès 18 ans, même avec peu d\'argent ?', c: ['Pour que le compteur des 5 ans démarre tôt', 'Parce qu\'il est fermé après 20 ans', 'Pour éviter de payer la cantine', 'Ce n\'est pas utile'], r: 0, e: 'On « prend date » : les années comptent dès l\'ouverture.' }
      ] },
    { id: 'n4-3', v: 1, emoji: '🚨', titre: 'Repérer les arnaques',
      texte: [
        'Les arnaques financières sont partout, surtout sur les réseaux sociaux : « Double ton argent en une semaine », faux traders qui montrent des voitures de luxe, cryptomonnaies « miracles », « formations » hors de prix.',
        'Les signaux d\'alerte : **gain élevé et rapide promis**, **pas de risque** annoncé, **urgence** (« il ne reste que quelques places »), **pression** pour payer vite, contact par message privé, demande de paiement en crypto ou par carte cadeau.',
        'En France, l\'**AMF** (Autorité des marchés financiers) publie des **listes noires** de sites non autorisés. Les **cryptomonnaies** sont très risquées : leur prix peut s\'effondrer, et beaucoup de projets sont des arnaques.'
      ],
      astuce: 'Si c\'est trop beau pour être vrai, c\'est que ce n\'est pas vrai.',
      quiz: [
        { q: 'Lequel est un signal d\'arnaque ?', c: ['Un gain élevé et rapide promis sans risque', 'Des frais clairement affichés', 'Un placement régulier sur le long terme', 'Une banque connue avec un vrai conseiller'], r: 0, e: 'Gros gain + rapide + sans risque = arnaque presque certaine.' },
        { q: 'Que publie l\'AMF ?', c: ['Des listes noires de sites non autorisés', 'Les résultats du loto', 'Des recettes de cuisine', 'Des codes promo'], r: 0, e: 'L\'AMF met en garde contre les acteurs non autorisés.' },
        { q: 'Un inconnu te contacte en message privé pour « t\'apprendre à devenir riche » contre 500 €. Tu…', c: ['Paies vite avant que l\'offre disparaisse', 'Refuses et en parles à un adulte', 'Donnes tes codes bancaires', 'Empruntes l\'argent à ta sœur'], r: 1, e: 'Contact non sollicité + paiement + promesse de richesse : danger.' },
        { q: 'Les cryptomonnaies sont…', c: ['Sans risque et garanties', 'Très risquées et pleines d\'arnaques', 'Des livrets réglementés', 'Fixées par l\'État'], r: 1, e: 'Leur prix est très instable et les fraudes sont nombreuses.' },
        { q: 'Une demande de paiement par carte cadeau ou en crypto est…', c: ['Normale', 'Un signal d\'alerte', 'Obligatoire', 'Une preuve de sérieux'], r: 1, e: 'Les escrocs utilisent ces moyens car ils sont difficiles à tracer.' }
      ] },
    { id: 'n4-4', v: 1, emoji: '🧾', titre: 'Le crédit : emprunter coûte cher',
      texte: [
        'Un **crédit**, c\'est de l\'argent prêté qu\'il faut **rembourser avec des intérêts**. Exemple simplifié : emprunter 1 000 € et rembourser 1 100 €. Les 100 € de plus, c\'est le prix de l\'emprunt.',
        'Certains crédits sont utiles : acheter une maison, financer des études, une voiture pour aller travailler. D\'autres sont des pièges : le **crédit renouvelable** et le « **achetez maintenant, payez plus tard** » en plusieurs fois, très faciles à obtenir, poussent à acheter des envies qu\'on ne peut pas se payer.',
        'Règle de bon sens : ne jamais emprunter pour une envie, et ne pas consacrer plus d\'environ un tiers de ses revenus aux remboursements. Comme le dit la loi : « Un crédit vous engage et doit être remboursé. »'
      ],
      astuce: 'Avant d\'emprunter, calcule toujours le coût total : ce que tu rembourses au total moins ce que tu as reçu.',
      quiz: [
        { q: 'Tu empruntes 500 € et tu rembourses 560 €. Le coût du crédit est de…', c: ['0 €', '60 €', '500 €', '560 €'], r: 1, e: '560 − 500 = 60 € d\'intérêts et de frais.' },
        { q: 'Lequel est un crédit plutôt utile ?', c: ['Un crédit pour s\'acheter une maison', 'Un crédit pour des baskets de marque', 'Un paiement en 4 fois pour un jeu vidéo', 'Un crédit pour partir en week-end'], r: 0, e: 'Emprunter pour un bien durable et nécessaire peut avoir du sens.' },
        { q: 'Le « achetez maintenant, payez plus tard » est risqué car…', c: ['Il est interdit', 'Il pousse à acheter des envies qu\'on ne peut pas se payer', 'Il fait gagner de l\'argent', 'Il n\'existe pas'], r: 1, e: 'La facilité du paiement fractionné peut mener au surendettement.' },
        { q: 'Les adultes évitent souvent de consacrer aux remboursements plus d\'environ…', c: ['5 % de leurs revenus', 'un tiers de leurs revenus', 'la totalité de leurs revenus', 'deux fois leurs revenus'], r: 1, e: 'Au-delà, le budget devient vite trop serré.' },
        { q: 'Que dit la mention légale sur les publicités de crédit ?', c: ['« Un crédit est gratuit »', '« Un crédit vous engage et doit être remboursé »', '« Un crédit rapporte de l\'argent »', '« Un crédit est réservé aux riches »'], r: 1, e: 'Cette phrase est obligatoire en France sur les publicités de crédit.' }
      ] },
    { id: 'n4-5', v: 1, emoji: '🧮', titre: 'Brut, net et impôts',
      texte: [
        'Sur une fiche de paie, il y a deux salaires. Le **brut**, c\'est le salaire avant les cotisations. Le **net**, c\'est ce qui arrive vraiment sur le compte. Pour un salarié du privé, le net représente en général environ **75 à 80 %** du brut.',
        'Les **cotisations** ne disparaissent pas : elles financent la **santé** (remboursements de médecin), la **retraite**, le **chômage**. Ensuite, l\'**impôt sur le revenu** est prélevé selon ce qu\'on gagne et la situation de la famille ; il finance les écoles, les routes, la police, les hôpitaux…',
        'Quand on compare des offres d\'emploi ou des métiers, il faut toujours vérifier : brut ou net ? par mois ou par an ? Les fiches métiers de « Mon avenir » donnent des salaires de début en **net par mois**, à titre indicatif.'
      ],
      astuce: 'Une annonce dit « 30 000 € brut par an » ? Divise par 12 puis multiplie par environ 0,78 : ça fait environ 1 950 € net par mois.',
      quiz: [
        { q: 'Le salaire net, c\'est…', c: ['Le salaire avant les cotisations', 'Ce qui arrive vraiment sur le compte', 'Le salaire de l\'année', 'Le salaire du patron'], r: 1, e: 'Le net est le montant versé au salarié.' },
        { q: 'Pour un salarié du privé, le net représente environ…', c: ['10 % du brut', '50 % du brut', '75 à 80 % du brut', '150 % du brut'], r: 2, e: 'Les cotisations salariales représentent environ 20 à 25 % du brut.' },
        { q: 'À quoi servent les cotisations ?', c: ['À rien', 'À financer la santé, la retraite et le chômage', 'À payer les vacances du patron', 'À acheter des actions'], r: 1, e: 'Elles financent la protection sociale.' },
        { q: '24 000 € brut par an, c\'est environ combien net par mois ?', c: ['Environ 500 €', 'Environ 1 560 €', 'Environ 2 000 €', 'Environ 24 000 €'], r: 1, e: '24 000 ÷ 12 = 2 000 € brut par mois, × 0,78 ≈ 1 560 € net.' },
        { q: 'L\'impôt sur le revenu sert notamment à financer…', c: ['Les écoles, les routes, les hôpitaux', 'Les comptes des influenceurs', 'Les magasins', 'Rien du tout'], r: 0, e: 'Il finance les services publics.' }
      ] }
  ];

  // Un défi par mois (index 0 = janvier)
  window.MM_DEFIS = [
    { titre: 'Le carnet de dépenses', texte: 'Note toutes tes dépenses pendant tout le mois, même les plus petites. À la fin, fais le total par catégorie.' },
    { titre: 'Le détective des prix', texte: 'Choisis un produit que la famille achète souvent et compare son prix dans 3 magasins ou sites. Calcule l\'économie possible.' },
    { titre: 'La règle des 48 heures', texte: 'Pour chaque achat plaisir du mois, attends 48 heures avant de décider. Note combien d\'achats tu as finalement abandonnés.' },
    { titre: 'Prix au kilo', texte: 'Aux courses, compare le prix au kilo de 3 produits en grand et en petit format. Lequel est vraiment le moins cher ?' },
    { titre: 'Mon objectif', texte: 'Crée ton objectif d\'achat dans l\'appli et mets de côté au moins une fois ce mois-ci.' },
    { titre: 'La pub démasquée', texte: 'Repère 5 publicités ou contenus sponsorisés sur les réseaux sociaux et explique la technique utilisée pour donner envie.' },
    { titre: 'Zéro dépense pendant une semaine', texte: 'Tiens une semaine complète sans aucun achat plaisir. Raconte ce qui a été facile ou difficile.' },
    { titre: 'Le budget vacances', texte: 'Aide à estimer le budget d\'une journée de vacances ou d\'une sortie en famille : transport, repas, activités.' },
    { titre: 'Le budget de la rentrée', texte: 'Fais la liste des fournitures, compare 2 magasins ou sites et calcule le total le moins cher.' },
    { titre: 'Vendre plutôt que jeter', texte: 'Trouve un objet que tu n\'utilises plus et cherche combien il pourrait se revendre (avec l\'accord de Papa ou Maman).' },
    { titre: 'L\'inflation en vrai', texte: 'Demande à un adulte le prix de 3 produits quand il avait ton âge et compare avec aujourd\'hui.' },
    { titre: 'Le budget cadeaux', texte: 'Prépare ta liste de cadeaux de fin d\'année avec un budget maximum, et respecte-le.' }
  ];

  // Les 5 questions de l'enquête métier
  window.MM_ENQUETE = [
    'En quoi consiste ton métier, en quelques phrases ?',
    'À quoi ressemble une journée type ?',
    'Quelles études ou quel parcours as-tu suivi ?',
    'Qu\'est-ce que tu aimes le plus, et le moins, dans ton travail ?',
    'Quel conseil donnerais-tu à quelqu\'un de mon âge ?'
  ];

  // Quiz « Mon profil » : 24 affirmations, 4 par profil
  window.MM_QUIZ_PROFIL = [
    { t: 'Réparer un objet cassé ou monter un meuble', p: 'R' },
    { t: 'Comprendre comment fonctionne le corps humain', p: 'I' },
    { t: 'Dessiner, peindre ou décorer', p: 'A' },
    { t: 'Aider quelqu\'un qui a un problème', p: 'S' },
    { t: 'Organiser une fête ou un événement', p: 'E' },
    { t: 'Ranger, classer et trier des affaires', p: 'C' },
    { t: 'Travailler dehors, dans la nature', p: 'R' },
    { t: 'Faire des expériences scientifiques', p: 'I' },
    { t: 'Inventer une histoire ou écrire', p: 'A' },
    { t: 'Expliquer quelque chose à un plus jeune', p: 'S' },
    { t: 'Convaincre les autres de suivre mon idée', p: 'E' },
    { t: 'Faire des calculs et vérifier qu\'ils sont justes', p: 'C' },
    { t: 'Utiliser des outils ou des machines', p: 'R' },
    { t: 'Résoudre des énigmes et des casse-têtes', p: 'I' },
    { t: 'Faire de la musique, du théâtre ou de la danse', p: 'A' },
    { t: 'Prendre soin des autres ou des animaux', p: 'S' },
    { t: 'Vendre quelque chose ou négocier un prix', p: 'E' },
    { t: 'Préparer un planning bien précis', p: 'C' },
    { t: 'Faire du sport ou bouger toute la journée', p: 'R' },
    { t: 'Chercher des informations pour tout comprendre', p: 'I' },
    { t: 'Créer des vidéos ou des photos', p: 'A' },
    { t: 'Travailler en équipe et écouter chacun', p: 'S' },
    { t: 'Diriger un groupe ou un projet', p: 'E' },
    { t: 'Suivre des règles et des procédures', p: 'C' }
  ];
})();
