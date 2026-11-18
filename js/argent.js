/* Mission Maison — Mon argent : niveaux, leçons, quiz, défis du mois
   Leçon : id ('n1-1'…), v (version), titre, emoji, texte (paragraphes), astuce, quiz (5 questions)
   Question : q, c (choix), r (index de la bonne réponse), e (explication) */
(function () {
  window.MM_NIVEAUX_ARGENT = [
    { id: 'n1', nom: 'Tirelire', emoji: '🐷', avance: false, texte: 'Comprendre la valeur de l\'argent et faire son budget.' },
    { id: 'n2', nom: 'Épargnante', emoji: '🌱', avance: false, texte: 'Mettre de côté, faire grandir son argent, battre l\'inflation.' },
    { id: 'ni', nom: 'Chasseuse d\'inflation', emoji: '🎈', avance: false, texte: 'Pourquoi tout augmente depuis le Covid, et comment s\'en protéger.' },
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

    /* ============ NIVEAU « CHASSEUSE D'INFLATION » ============ */
    { id: 'ni-1', v: 1, emoji: '😷', titre: '100 € avant le Covid, 100 € aujourd\'hui',
      texte: [
        'Souviens-toi du **confinement de 2020** : l\'école à la maison, les attestations pour sortir… À ce moment-là, les prix bougeaient très peu.',
        'Puis tout s\'est accéléré : la reprise après le Covid, puis la **guerre en Ukraine en 2022** ont fait flamber l\'énergie et l\'alimentation. En France, les prix ont augmenté de **5,2 % en 2022** et de **4,9 % en 2023**, les plus fortes hausses depuis plus de 30 ans.',
        'Résultat : un panier de courses qui coûtait **100 € en 2019** coûte environ **116 € en 2025**. Autrement dit, avec le même billet de 100 €, tu repars avec moins de choses dans ton sac.',
        'Et l\'alimentation a grimpé encore plus vite que la moyenne : **+6,8 % en 2022 et +11,8 % en 2023**.'
      ],
      illus: [
        { type: 'escalier', titre: 'Ce que coûte un même panier de 100 € (2019) au fil des années', unite: '€',
          base: 90, points: [['2019', 100], ['2020', 100.5], ['2021', 102.1], ['2022', 107.4], ['2023', 112.7], ['2024', 114.9], ['2025', 116]],
          note: 'Calcul à partir de l\'inflation annuelle mesurée par l\'Insee.' },
        { type: 'barres', titre: 'Avant le Covid… et maintenant', legende: ['Avant', 'Après'],
          lignes: [
            { nom: 'Baguette en boulangerie', a: 0.88, al: '2019', b: 1.09, bl: '2025' },
            { nom: 'Netflix Premium (par mois)', a: 15.99, al: '2019', b: 21.99, bl: '2025' },
            { nom: 'PlayStation 5 (avec lecteur)', a: 499.99, al: 'sortie 2020', b: 649.99, bl: '2026' },
            { nom: 'Place de cinéma (prix moyen)', a: 6.79, al: '2019', b: 7.42, bl: '2024' }
          ],
          note: 'Sources : Insee, UFC-Que Choisir, CNC, prix officiels Netflix et Sony.' }
      ],
      astuce: 'Pour savoir si un prix a « vraiment » augmenté, compare sa hausse à l\'inflation : le panier moyen a pris environ +16 % entre 2019 et 2025.',
      quiz: [
        { q: 'Un panier qui coûtait 100 € en 2019 coûte environ combien en 2025 ?', c: ['100 €', '105 €', '116 €', '200 €'], r: 2, e: 'Avec l\'inflation de 2020 à 2025, il faut environ 116 € pour acheter la même chose.' },
        { q: 'Quelles années ont connu la plus forte inflation récente en France ?', c: ['2019 et 2020', '2022 et 2023', '2024 et 2025', 'Il n\'y a jamais eu d\'inflation'], r: 1, e: '+5,2 % en 2022 et +4,9 % en 2023, après la reprise post-Covid et la guerre en Ukraine.' },
        { q: 'La baguette est passée d\'environ 0,88 € à 1,09 €. Elle a augmenté d\'environ…', c: ['5 %', '24 %', '50 %', '100 %'], r: 1, e: '1,09 − 0,88 = 0,21 € de plus, soit environ +24 %, plus que l\'inflation moyenne.' },
        { q: 'Question piège : la place de cinéma moyenne est passée de 6,79 € à 7,42 €. Par rapport à l\'inflation, elle a augmenté…', c: ['Beaucoup plus vite', 'Moins vite', 'Exactement pareil', 'Elle a baissé'], r: 1, e: 'Environ +9 %, alors que les prix ont pris environ +15 % de 2019 à 2024 : le cinéma a augmenté moins vite que la moyenne.' },
        { q: 'Avec le même billet de 100 €, qu\'achètes-tu en 2025 par rapport à 2019 ?', c: ['Plus de choses', 'Autant de choses', 'Moins de choses', 'Ça dépend de la couleur du billet'], r: 2, e: 'Les prix ont monté, donc le même billet achète moins : c\'est la perte de pouvoir d\'achat.' }
      ] },
    { id: 'ni-2', v: 1, emoji: '🎮', titre: 'Les prix qui s\'envolent, ceux qui résistent',
      texte: [
        'L\'inflation est une **moyenne**. Certains prix montent beaucoup plus vite, d\'autres moins vite, et quelques-uns baissent.',
        'Exemple surprenant : la **PlayStation 5**. D\'habitude, une console devient moins chère avec les années. La PS5, elle, est sortie à 499,99 € en 2020, est passée à 549,99 € en 2022, puis à **649,99 € en 2026**. Soit **+30 %** !',
        'Les **abonnements** aussi grimpent vite : Netflix Premium est passé de 15,99 € par mois en 2019 à 21,99 € en 2025 (**+38 %**), bien plus que l\'inflation.',
        'Retiens : quand on dit « l\'inflation est de 2 % », cela ne veut pas dire que chaque prix a augmenté de 2 %. Ton inflation à toi dépend de ce que **tu** achètes.'
      ],
      illus: [
        { type: 'barres', titre: 'Hausse de prix comparée à l\'inflation', legende: ['Avant', 'Après'],
          lignes: [
            { nom: 'Inflation moyenne (100 € de 2019)', a: 100, al: '2019', b: 116, bl: '2025' },
            { nom: 'PS5 avec lecteur', a: 499.99, al: '2020', b: 649.99, bl: '2026' },
            { nom: 'Netflix Standard (par mois)', a: 11.99, al: '2019', b: 14.99, bl: '2025' },
            { nom: 'Netflix Premium (par mois)', a: 15.99, al: '2019', b: 21.99, bl: '2025' }
          ],
          note: 'Prix officiels publiés par Sony et Netflix ; inflation : Insee.' }
      ],
      astuce: 'Les abonnements (streaming, musique, jeux) augmentent souvent par petites marches. Fais le total de ce que tu paies chaque mois : c\'est souvent une surprise.',
      quiz: [
        { q: 'Si l\'inflation est de 2 %, cela veut dire que…', c: ['Chaque prix a augmenté de exactement 2 %', 'Les prix ont augmenté de 2 % en moyenne', 'Les salaires ont baissé de 2 %', 'Les prix vont baisser de 2 %'], r: 1, e: 'C\'est une moyenne : certains prix montent plus, d\'autres moins.' },
        { q: 'Question piège : avec le temps, une console de jeux…', c: ['Baisse toujours de prix', 'Peut augmenter, comme la PS5', 'Ne change jamais de prix', 'Devient gratuite'], r: 1, e: 'La PS5 est passée de 499,99 € à 649,99 € : les règles habituelles ne marchent pas toujours.' },
        { q: 'Netflix Premium est passé de 15,99 € à 21,99 € par mois. La hausse est de…', c: ['6 €', '2 €', '15,99 €', '21,99 €'], r: 0, e: '21,99 − 15,99 = 6 € de plus par mois, soit 72 € de plus par an.' },
        { q: 'Sur un an, 6 € de plus par mois, cela représente…', c: ['6 €', '12 €', '72 €', '600 €'], r: 2, e: '6 × 12 = 72 € par an.' },
        { q: '« Ton inflation à toi » dépend surtout…', c: ['De ce que tu achètes', 'De ton âge', 'Du temps qu\'il fait', 'De ton prénom'], r: 0, e: 'Si tu achètes surtout ce qui augmente vite, tu ressens plus l\'inflation.' }
      ] },
    { id: 'ni-3', v: 1, emoji: '🍫', titre: 'La réduflation : l\'inflation cachée',
      texte: [
        'Parfois, le prix ne bouge pas… mais le paquet **rétrécit** ! C\'est la **réduflation** (ou « shrinkflation ») : moins de produit pour le même prix. C\'est une hausse de prix déguisée.',
        'Exemple : un paquet de biscuits passe de **200 g à 180 g** et reste à **2 €**. Avant, 1 kilo coûtait 10 €. Maintenant, il coûte **11,11 €**. C\'est une hausse de **+11 %**, alors que l\'étiquette n\'a pas changé !',
        'Pour la repérer, regarde le **prix au kilo** (ou au litre) sur l\'étiquette du rayon : il est obligatoire. Et depuis le **1er juillet 2024**, les supermarchés de plus de 400 m² doivent signaler les produits dont la quantité a diminué sans que le prix baisse.'
      ],
      illus: [
        { type: 'paquets', nom: 'Paquet de biscuits', avant: { poids: 200, prix: 2 }, apres: { poids: 180, prix: 2 } }
      ],
      astuce: 'Au supermarché, compare toujours le prix au kilo, pas le prix du paquet : c\'est lui qui dit la vérité.',
      quiz: [
        { q: 'La réduflation, c\'est…', c: ['Une baisse des prix', 'Moins de produit pour le même prix', 'Une promotion', 'Un produit plus gros'], r: 1, e: 'Le paquet rétrécit mais le prix reste le même : c\'est une hausse cachée.' },
        { q: 'Quel chiffre permet de démasquer la réduflation ?', c: ['Le prix du paquet', 'Le prix au kilo ou au litre', 'La couleur de l\'emballage', 'Le nombre de pubs'], r: 1, e: 'Le prix au kilo montre combien tu paies vraiment pour la même quantité.' },
        { q: 'Un paquet passe de 500 g à 400 g, toujours à 4 €. Le prix au kilo passe de 8 € à…', c: ['8 €', '9 €', '10 €', '12 €'], r: 2, e: '4 € pour 0,4 kg = 10 € le kilo. Hausse cachée de +25 %.' },
        { q: 'Question piège : un paquet de 300 g à 3 € ou un paquet de 250 g à 2,60 €. Lequel est le moins cher au kilo ?', c: ['Le paquet de 300 g', 'Le paquet de 250 g', 'C\'est pareil', 'On ne peut pas savoir'], r: 0, e: '300 g à 3 € = 10 €/kg ; 250 g à 2,60 € = 10,40 €/kg. Le plus petit prix n\'est pas le moins cher !' },
        { q: 'Depuis juillet 2024, les grands supermarchés doivent…', c: ['Interdire les petits paquets', 'Signaler les produits dont la quantité a baissé sans baisse de prix', 'Baisser tous leurs prix', 'Fermer le dimanche'], r: 1, e: 'Une affichette doit prévenir les clients des cas de réduflation.' }
      ] },
    { id: 'ni-4', v: 1, emoji: '🐌', titre: 'Ralentir, ce n\'est pas baisser',
      texte: [
        'En 2025, l\'inflation est tombée à **0,9 %**. Est-ce que les prix sont redescendus ? **Non !** Ils ont continué à monter… simplement moins vite. Les hausses de 2022 et 2023 sont restées.',
        'C\'est comme un ascenseur : quand il ralentit, il continue de monter. Il ne redescend pas tout seul. Et en 2026, l\'inflation est même repartie à la hausse, autour de **+3 % sur un an en septembre**, à cause de l\'énergie.',
        'Conséquence pour ton épargne : il faut regarder le **taux réel** = taux de ton placement − inflation. Par exemple, le Livret A rapportait **1,5 %** début 2026, alors que l\'inflation tournait autour de **2,4 %** au printemps : le taux réel était **négatif**. Ton argent grossissait… mais achetait un peu moins.'
      ],
      illus: [
        { type: 'escalier', titre: 'L\'inflation chaque année (en %)', unite: '%',
          points: [['2019', 1.1], ['2020', 0.5], ['2021', 1.6], ['2022', 5.2], ['2023', 4.9], ['2024', 2.0], ['2025', 0.9]],
          note: 'Source : Insee. Aucune barre sous zéro : chaque année, les prix ont monté.' }
      ],
      astuce: 'Taux réel = taux du placement − inflation. S\'il est négatif, ton épargne perd du pouvoir d\'achat, même si son montant augmente.',
      quiz: [
        { q: 'Question piège : en 2025, l\'inflation est tombée à 0,9 %. Les prix ont donc…', c: ['Baissé de 0,9 %', 'Continué à monter, mais moins vite', 'Retrouvé leur niveau de 2019', 'Été divisés par deux'], r: 1, e: 'Une inflation plus faible veut dire que les prix montent moins vite, pas qu\'ils baissent.' },
        { q: 'Après la forte inflation de 2022-2023, les prix sont-ils revenus en arrière ?', c: ['Oui, tout seuls', 'Non, les hausses sont restées', 'Oui, grâce à l\'État', 'Seulement le dimanche'], r: 1, e: 'Les prix ne redescendent quasiment jamais d\'eux-mêmes : les hausses restent.' },
        { q: 'Ton livret rapporte 1,5 % et l\'inflation est de 2,4 %. Ton taux réel est de…', c: ['+3,9 %', '+0,9 %', '−0,9 %', '0 %'], r: 2, e: '1,5 − 2,4 = −0,9 % : ton épargne perd un peu de pouvoir d\'achat.' },
        { q: 'Ton placement rapporte 5 % et l\'inflation est de 2 %. Ton taux réel est de…', c: ['+7 %', '+3 %', '−3 %', '+2 %'], r: 1, e: '5 − 2 = +3 % : là, tu bats l\'inflation.' },
        { q: 'L\'inflation ressemble à…', c: ['Un ascenseur qui monte plus ou moins vite', 'Un yoyo qui monte et descend sans arrêt', 'Une porte fermée', 'Un toboggan'], r: 0, e: 'Les prix montent presque toujours ; seule la vitesse change.' }
      ] },
    { id: 'ni-5', v: 1, emoji: '🛡️', titre: 'Quatre armes pour battre l\'inflation',
      texte: [
        '**1. Acheter malin.** Comparer les prix au kilo, attendre les soldes, choisir l\'occasion ou la seconde main, éviter les abonnements oubliés.',
        '**2. Ne pas laisser dormir son argent.** Un billet dans un tiroir perd de la valeur chaque année. Les livrets protègent un peu, sans risque, mais rapportent souvent à peine autant que l\'inflation.',
        '**3. Investir sur le long terme.** Sur de longues périodes, les actions diversifiées ont en général rapporté **plus que l\'inflation**, mais avec des années de baisse. C\'est pour ça que ton épargne Mission Maison est placée jusqu\'à tes 18 ans au moins.',
        '**4. Investir en soi.** Apprendre, se former, développer des compétences recherchées : c\'est ce qui permet plus tard de gagner un salaire qui augmente. C\'est aussi pour ça qu\'il y a l\'onglet « Mon avenir » !'
      ],
      illus: [
        { type: 'barres', hausseBonne: true, titre: '100 € pendant 10 ans avec 2 % d\'inflation par an (simulation)', legende: ['Départ', 'Après 10 ans'],
          lignes: [
            { nom: 'Billet dans un tiroir (pouvoir d\'achat)', a: 100, al: 'départ', b: 82, bl: '10 ans' },
            { nom: 'Livret à 2 % (pouvoir d\'achat)', a: 100, al: 'départ', b: 100, bl: '10 ans' },
            { nom: 'Placement à 6 % par an (pouvoir d\'achat)', a: 100, al: 'départ', b: 147, bl: '10 ans' }
          ],
          note: 'Exemple simplifié avec des rendements réguliers. En vrai, un placement en actions monte et baisse d\'une année à l\'autre, et rien n\'est garanti.' }
      ],
      astuce: 'Avant d\'acheter, demande-toi : « Est-ce que je peux le trouver moins cher, d\'occasion, ou plus tard ? » Avant d\'épargner : « Est-ce que mon argent bat l\'inflation ? »',
      quiz: [
        { q: 'Lequel n\'est PAS une arme contre l\'inflation ?', c: ['Comparer les prix au kilo', 'Garder tout son argent en billets dans un tiroir', 'Investir sur le long terme', 'Apprendre un métier recherché'], r: 1, e: 'Les billets dans un tiroir perdent de la valeur chaque année.' },
        { q: 'Sur de longues périodes, les actions diversifiées ont en général…', c: ['Rapporté plus que l\'inflation, avec des années de baisse', 'Toujours perdu de l\'argent', 'Rapporté exactement l\'inflation', 'Été garanties par l\'État'], r: 0, e: 'Elles ont souvent battu l\'inflation sur le long terme, mais sans garantie et avec des baisses.' },
        { q: 'Avec 2 % d\'inflation par an, 100 € gardés dans un tiroir pendant 10 ans achètent environ…', c: ['82 € d\'aujourd\'hui', '100 € d\'aujourd\'hui', '120 € d\'aujourd\'hui', '200 € d\'aujourd\'hui'], r: 0, e: 'Le billet reste à 100 €, mais les prix ont pris environ 22 % : il achète comme 82 € d\'aujourd\'hui.' },
        { q: '« Investir en soi », c\'est…', c: ['Acheter beaucoup de vêtements', 'Apprendre et développer ses compétences', 'Ne jamais rien dépenser', 'Emprunter de l\'argent'], r: 1, e: 'Les compétences permettent plus tard de gagner un meilleur salaire.' },
        { q: 'Pourquoi ton épargne Mission Maison est-elle placée longtemps ?', c: ['Pour avoir le temps de traverser les baisses et battre l\'inflation', 'Parce que c\'est interdit d\'y toucher pour toujours', 'Pour payer moins de points', 'Pour faire plaisir à la banque'], r: 0, e: 'Le temps permet aux placements de dépasser les mauvaises années.' }
      ] },

    /* ============ NIVEAU 3 : INVESTISSEUSE ============ */
    { id: 'n3-1', v: 2, emoji: '🏭', titre: 'C\'est quoi, une action ?',
      texte: [
        'Une **action**, c\'est un tout petit morceau d\'une entreprise. Acheter une action **Apple**, c\'est devenir **copropriétaire** d\'Apple, pour une part minuscule. Tu ne reçois pas d\'iPhone gratuit, mais tu possèdes un bout de l\'entreprise qui les fabrique !',
        'Beaucoup de marques que tu connais appartiennent à des entreprises **cotées en bourse**, c\'est-à-dire dont n\'importe qui peut acheter des actions : **Coca-Cola** (qui fabrique aussi Fanta et Sprite), **Samsung** (à la bourse de Séoul), **Nintendo** et **Sony** (PlayStation) au Japon, **Microsoft** (Xbox et Minecraft), **Alphabet** (Google et YouTube), **Nike**, **McDonald\'s**, ou en France **L\'Oréal** et **LVMH** (Sephora, Louis Vuitton).',
        'Si l\'entreprise réussit et gagne plus d\'argent, son action prend en général de la valeur. Elle peut aussi te verser une partie de ses bénéfices : un **dividende**. Si elle va mal, l\'action peut baisser, parfois beaucoup.',
        'Les actions s\'achètent et se vendent en **bourse**, un grand marché où le prix change à chaque seconde selon l\'offre et la demande.'
      ],
      illus: [
        { type: 'marques', titre: 'Qui se cache derrière tes marques ?',
          lignes: [
            { entreprise: 'Coca-Cola', marques: 'Coca-Cola, Fanta, Sprite', bourse: 'New York' },
            { entreprise: 'Apple', marques: 'iPhone, AirPods, Mac', bourse: 'New York' },
            { entreprise: 'Samsung Electronics', marques: 'Smartphones Galaxy, télés', bourse: 'Séoul' },
            { entreprise: 'Microsoft', marques: 'Xbox, Minecraft, Windows', bourse: 'New York' },
            { entreprise: 'Sony', marques: 'PlayStation', bourse: 'Tokyo' },
            { entreprise: 'Nintendo', marques: 'Switch, Mario, Pokémon (en partie)', bourse: 'Tokyo' },
            { entreprise: 'Alphabet', marques: 'Google, YouTube', bourse: 'New York' },
            { entreprise: 'LVMH', marques: 'Sephora, Louis Vuitton, Dior', bourse: 'Paris' },
            { entreprise: 'L\'Oréal', marques: 'Maybelline, Garnier', bourse: 'Paris' }
          ],
          note: 'Ces exemples servent à comprendre : ce ne sont pas des conseils pour acheter telle ou telle action.' }
      ],
      astuce: 'Regarde autour de toi : ton téléphone, tes baskets, ton shampoing… Presque tout est fabriqué par des entreprises, et beaucoup sont cotées en bourse.',
      quiz: [
        { q: 'Une action, c\'est…', c: ['Un prêt à la banque', 'Un petit morceau d\'une entreprise', 'Un billet de loterie', 'Un livret d\'épargne'], r: 1, e: 'Posséder une action, c\'est posséder une petite part de l\'entreprise.' },
        { q: 'Question piège : avoir une action Apple, ça donne droit…', c: ['À un iPhone gratuit', 'À une petite part de l\'entreprise Apple', 'À travailler chez Apple', 'À des réductions garanties'], r: 1, e: 'On devient copropriétaire, pas client privilégié.' },
        { q: 'Fanta et Sprite appartiennent à…', c: ['Nike', 'Coca-Cola', 'Samsung', 'Nintendo'], r: 1, e: 'Le groupe Coca-Cola possède aussi Fanta et Sprite.' },
        { q: 'Un dividende, c\'est…', c: ['Une partie des bénéfices versée aux actionnaires', 'Une amende', 'Le prix d\'une action', 'Un impôt'], r: 0, e: 'L\'entreprise partage une partie de ses bénéfices avec ses actionnaires.' },
        { q: 'Si l\'entreprise va mal, son action…', c: ['Monte forcément', 'Peut baisser, parfois beaucoup', 'Reste toujours au même prix', 'Est remboursée par l\'État'], r: 1, e: 'Le prix reflète la santé et les perspectives de l\'entreprise.' }
      ] },
    { id: 'n3-6', v: 1, emoji: '🕵️', titre: 'Coté ou pas coté ? Le quiz des marques',
      texte: [
        'Attention, piège : toutes les entreprises ne sont **pas** en bourse ! Une entreprise **cotée** vend ses actions au public. Une entreprise **non cotée** appartient à une famille, à ses fondateurs ou à quelques investisseurs : tu ne peux pas acheter ses actions.',
        'Exemples d\'entreprises **non cotées** : **Ferrero** (Nutella, Kinder), **Haribo**, **Lego** et **Decathlon** appartiennent à des familles. **Epic Games** (Fortnite) et **ByteDance** (TikTok) ne sont pas en bourse non plus.',
        'Autre piège : une même entreprise possède souvent **plusieurs marques**. Instagram et WhatsApp appartiennent à **Meta** (l\'entreprise de Facebook). Minecraft appartient à **Microsoft**. YouTube appartient à **Alphabet**, la maison mère de Google.',
        'Enfin, le nom en bourse n\'est pas toujours celui de la marque : on n\'achète pas d\'actions « YouTube » mais des actions **Alphabet**.'
      ],
      illus: [
        { type: 'marques', titre: 'Coté ou pas coté ?',
          lignes: [
            { entreprise: 'Meta', marques: 'Instagram, WhatsApp, Facebook', bourse: 'Cotée (New York)' },
            { entreprise: 'Inditex', marques: 'Zara', bourse: 'Cotée (Madrid)' },
            { entreprise: 'Disney', marques: 'Marvel, Pixar, Star Wars', bourse: 'Cotée (New York)' },
            { entreprise: 'Ferrero', marques: 'Nutella, Kinder', bourse: 'Non cotée (familiale)' },
            { entreprise: 'Lego', marques: 'Lego', bourse: 'Non cotée (familiale)' },
            { entreprise: 'Decathlon', marques: 'Decathlon', bourse: 'Non cotée (familiale)' },
            { entreprise: 'Epic Games', marques: 'Fortnite', bourse: 'Non cotée' }
          ],
          note: 'Situation connue fin 2026 : une entreprise peut entrer en bourse ou en sortir.' }
      ],
      astuce: 'Avant de dire « j\'aimerais une action de… », vérifie d\'abord si l\'entreprise est cotée et sous quel nom.',
      quiz: [
        { q: 'Question piège : peut-on acheter des actions Nutella en bourse ?', c: ['Oui, facilement', 'Non, Ferrero est une entreprise familiale non cotée', 'Oui, mais seulement en Italie', 'Oui, au supermarché'], r: 1, e: 'Ferrero, qui fabrique Nutella, n\'est pas en bourse.' },
        { q: 'Instagram appartient à…', c: ['Apple', 'Meta', 'Samsung', 'Sony'], r: 1, e: 'Instagram et WhatsApp appartiennent à Meta, l\'entreprise de Facebook.' },
        { q: 'Minecraft appartient à…', c: ['Nintendo', 'Microsoft', 'Lego', 'Epic Games'], r: 1, e: 'Microsoft a racheté Mojang, le créateur de Minecraft.' },
        { q: 'Pour posséder un morceau de YouTube, il faudrait acheter des actions…', c: ['YouTube', 'Alphabet', 'Netflix', 'Meta'], r: 1, e: 'YouTube appartient à Alphabet, la maison mère de Google.' },
        { q: 'Une entreprise « non cotée »…', c: ['Ne vend pas ses actions au public en bourse', 'Est forcément petite', 'Ne gagne pas d\'argent', 'Est interdite'], r: 0, e: 'Lego ou Decathlon sont très grandes, mais appartiennent à des familles.' }
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
    { id: 'n3-4', v: 2, emoji: '🧺', titre: 'Les ETF : un panier d\'actions tout prêt',
      texte: [
        'Choisir une seule entreprise, c\'est risqué : et si elle se trompait ? Un **ETF** (on dit aussi « tracker » ou fonds indiciel) règle le problème : c\'est un **panier tout prêt** qui contient des centaines, parfois des milliers d\'actions.',
        'Imagine un **paquet de bonbons assortis** : au lieu d\'acheter un seul parfum, tu prends un sachet avec un peu de tout. Si un parfum est raté, les autres compensent. Avec un ETF, en achetant **une seule part**, tu possèdes un petit morceau de chaque entreprise du panier.',
        'Un ETF ne choisit pas les entreprises au hasard : il **copie un indice**, c\'est-à-dire une liste officielle. Par exemple, le **CAC 40** regroupe 40 grandes entreprises françaises (L\'Oréal, LVMH, TotalEnergies…), le **S&P 500** les 500 plus grandes entreprises américaines, et le **MSCI World** environ 1 300 grandes entreprises de 23 pays développés.',
        'Ses deux super-pouvoirs : une **diversification immédiate** et des **frais très faibles**, car il n\'y a pas de gérant qui choisit les actions à la main. C\'est pour ça que de nombreux spécialistes de l\'épargne recommandent aux particuliers d\'investir régulièrement, sur le long terme, dans des ETF larges.'
      ],
      illus: [
        { type: 'parts', titre: 'Trois paniers célèbres', unite: ' entreprises',
          lignes: [{ nom: 'CAC 40 (France)', val: 40 }, { nom: 'S&P 500 (États-Unis)', val: 500 }, { nom: 'MSCI World (23 pays)', val: 1300 }],
          note: 'Nombre approximatif d\'entreprises dans chaque indice.' }
      ],
      astuce: 'Personne, même les professionnels, ne sait quelles actions monteront le plus. Un ETF large évite d\'avoir à deviner.',
      quiz: [
        { q: 'Un ETF, c\'est…', c: ['Une seule action', 'Un panier tout prêt qui contient de nombreuses actions', 'Un livret garanti', 'Une cryptomonnaie'], r: 1, e: 'Un ETF copie un indice qui regroupe beaucoup d\'entreprises.' },
        { q: 'Un ETF « copie un indice ». Un indice, c\'est…', c: ['Une liste officielle d\'entreprises', 'Un indice de jeu vidéo', 'Le prix d\'une seule action', 'Un type de compte en banque'], r: 0, e: 'Le CAC 40, le S&P 500 ou le MSCI World sont des indices.' },
        { q: 'Combien d\'entreprises contient le CAC 40 ?', c: ['4', '40', '400', '4 000'], r: 1, e: 'Comme son nom l\'indique : 40 grandes entreprises françaises.' },
        { q: 'Pourquoi un ETF a-t-il des frais faibles ?', c: ['Parce qu\'il copie automatiquement un indice, sans gérant qui choisit', 'Parce qu\'il est subventionné', 'Parce qu\'il ne contient rien', 'Parce qu\'il est interdit'], r: 0, e: 'La gestion est automatique, donc peu coûteuse.' },
        { q: 'Question piège : un ETF peut-il baisser ?', c: ['Non, jamais', 'Oui, quand les entreprises qu\'il contient baissent', 'Seulement le week-end', 'Seulement s\'il est français'], r: 1, e: 'Il suit la bourse : il monte et baisse avec elle.' }
      ] },
    { id: 'n3-7', v: 1, emoji: '🌍', titre: 'Qu\'y a-t-il dans un ETF Monde ?',
      texte: [
        'Ouvrons le panier **MSCI World**, l\'un des plus utilisés pour investir sur le long terme. Il contient environ **1 300 entreprises** de **23 pays développés**.',
        'Mais toutes ne pèsent pas pareil : plus une entreprise vaut cher en bourse, plus elle prend de place dans le panier. Les plus grosses sont des géants américains de la tech : **Nvidia** (les puces des jeux vidéo et de l\'IA), **Apple**, **Microsoft**, **Amazon** et **Alphabet** (Google, YouTube). Chacune pèse quelques pourcents.',
        'Résultat : les **États-Unis** représentent environ **72 %** du panier. Le Japon, le Royaume-Uni, le Canada, la France, l\'Allemagne et les autres se partagent le reste.',
        'C\'est à la fois une force (ce sont des entreprises très rentables) et un point de vigilance : quand la tech américaine baisse, tout le panier le sent. Diversifier, ce n\'est jamais supprimer le risque, c\'est le répartir.'
      ],
      illus: [
        { type: 'parts', titre: 'Le poids des pays dans le MSCI World (environ)', unite: ' %',
          lignes: [{ nom: 'États-Unis', val: 72 }, { nom: 'Tous les autres pays (22)', val: 28 }],
          note: 'Ordre de grandeur début 2026. La répartition change avec la bourse.' },
        { type: 'parts', titre: 'Les plus grosses entreprises du panier (environ)', unite: ' %',
          lignes: [{ nom: 'Nvidia', val: 5.5 }, { nom: 'Apple', val: 5 }, { nom: 'Microsoft', val: 3.5 }, { nom: 'Amazon', val: 3 }, { nom: 'Alphabet (Google)', val: 3.5 }],
          note: 'Poids approximatifs en 2025-2026 ; ils bougent tous les jours.' }
      ],
      astuce: 'Demande à Papa ou Maman ce qu\'il y a exactement dans ton épargne Trade Republic : c\'est le sujet idéal pour ta « Réunion investisseur ».',
      quiz: [
        { q: 'Combien d\'entreprises contient environ le MSCI World ?', c: ['40', '500', '1 300', '1 million'], r: 2, e: 'Environ 1 300 grandes entreprises de 23 pays développés.' },
        { q: 'Quel pays pèse le plus dans le MSCI World ?', c: ['La France', 'Le Japon', 'Les États-Unis', 'Le Brésil'], r: 2, e: 'Les États-Unis représentent environ 72 % du panier.' },
        { q: 'Pourquoi Nvidia ou Apple pèsent-elles plus que les autres ?', c: ['Parce qu\'elles valent plus cher en bourse', 'Parce qu\'elles sont plus anciennes', 'Par tirage au sort', 'Parce qu\'elles sont françaises'], r: 0, e: 'Le poids dépend de la valeur en bourse de l\'entreprise.' },
        { q: 'Question piège : avec un ETF Monde, tu possèdes…', c: ['Une seule grosse entreprise', 'Un tout petit morceau de chacune des 1 300 entreprises', 'Uniquement des entreprises françaises', 'De l\'or'], r: 1, e: 'Une part d\'ETF = une miette de chaque entreprise du panier.' },
        { q: 'Diversifier avec un ETF Monde permet…', c: ['De supprimer tout risque', 'De répartir le risque sur beaucoup d\'entreprises', 'D\'être sûr de gagner', 'D\'éviter toute baisse'], r: 1, e: 'Le risque est réparti, pas supprimé : le panier peut baisser.' }
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
