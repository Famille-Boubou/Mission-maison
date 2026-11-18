/* Mission Maison — niveau « Le temps, mon super-pouvoir » (leçons d'argent)
   Les textes marqués perso:true contiennent des {repères} remplacés par les chiffres
   de la fille connectée (voir MM.ctxPlan dans monargent.js). */
(function () {
  // Plan simulé : 30 € en décembre 2026, puis 10 € par mois. Âges au 31 décembre 2026.
  window.MM_PLAN = { exemple: 'Romy', ages: { Romy: 10, Lili: 14 }, ageParent: 40, initial: 30, mensuel: 10, jalons: [18, 20, 25, 30, 40, 50, 60] };

  const niveaux = window.MM_NIVEAUX_ARGENT, pos = niveaux.findIndex(n => n.id === 'ni');
  niveaux.splice(pos + 1, 0, { id: 'nt', nom: 'Le temps, mon super-pouvoir', emoji: '⏳', avance: false,
    texte: "La boule de neige des intérêts, mon plan jusqu'à 60 ans, et pourquoi commencer tôt change tout." });

  window.MM_LECONS.push(
    { id: 'nt-1', v: 1, emoji: '❄️', titre: 'La boule de neige des intérêts composés',
      texte: [
        "Quand ton argent est placé, il rapporte des **gains**. L'année suivante, ces gains rapportent eux aussi des gains. C'est ce qu'on appelle les **intérêts composés** : l'argent fait des petits, et les petits font des petits.",
        "C'est comme une **boule de neige** qui roule : au début elle grossit lentement, puis de plus en plus vite, parce qu'elle est plus grosse à chaque tour.",
        "Exemple avec **100 €** placés une seule fois, qui rapportent **7 % par an** en moyenne : 197 € au bout de 10 ans, 387 € au bout de 20 ans, 761 € au bout de 30 ans… et **2 946 € au bout de 50 ans**, sans rien ajouter !",
        "Regarde bien : entre 0 et 10 ans, la boule gagne 97 €. Entre 40 et 50 ans, elle gagne **1 449 €**. C'est la fin de la course qui rapporte le plus. Voilà pourquoi il faut **lui laisser le temps** de rouler.",
        "La **règle de 72** pour calculer de tête : divise 72 par le rendement, tu obtiens le nombre d'années pour que ton argent double. À 7 % par an : 72 ÷ 7 ≈ **10 ans**. À 1,7 % (le Livret A aujourd'hui) : environ **42 ans**."
      ],
      illus: [
        { type: 'escalier', titre: '100 € placés une seule fois, à 7 % par an', unite: '€',
          points: [['Départ', 100], ['10 ans', 197], ['20 ans', 387], ['30 ans', 761], ['40 ans', 1497], ['50 ans', 2946]],
          note: "Calcul avec un rendement régulier de 7 % par an. En vrai, la bourse monte et descend chaque année (leçon « Les montagnes russes de la bourse »)." }
      ],
      astuce: "Le carburant de la boule de neige, c'est le temps : plus tu commences tôt, plus elle a de tours pour grossir.",
      quiz: [
        { q: 'Que sont les intérêts composés ?', c: ['Des gains qui rapportent eux-mêmes des gains', 'Des frais prélevés par la banque', "Un impôt sur l'épargne", 'Une réduction en magasin'], r: 0, e: "Les gains s'ajoutent à ton argent, et l'année suivante ils rapportent eux aussi : c'est l'effet boule de neige." },
        { q: '100 € placés une seule fois à 7 % par an deviennent environ combien en 50 ans ?', c: ['150 €', '450 €', 'Près de 3 000 €', '1 million d\'euros'], r: 2, e: 'Environ 2 946 €, sans rien ajouter : la boule de neige a eu 50 ans pour rouler.' },
        { q: 'Question piège : avec la boule de neige, quand gagne-t-on le plus d\'euros ?', c: ['Les premières années', 'Les dernières années', 'Toutes les années pareil', 'Jamais'], r: 1, e: 'Entre 0 et 10 ans, 100 € gagnent 97 €. Entre 40 et 50 ans, ils gagnent 1 449 € : plus la boule est grosse, plus elle grossit vite.' },
        { q: 'Selon la règle de 72, à 7 % par an, ton argent double en environ…', c: ['2 ans', '10 ans', '30 ans', '72 ans'], r: 1, e: '72 ÷ 7 ≈ 10 ans.' },
        { q: 'Selon la règle de 72, en combien de temps l\'argent double-t-il à 1,7 % par an ?', c: ['Environ 4 ans', 'Environ 10 ans', 'Environ 42 ans', 'Il ne double jamais'], r: 2, e: '72 ÷ 1,7 ≈ 42 ans. Le livret est sûr, mais sa boule de neige roule beaucoup plus lentement.' }
      ] },

    { id: 'nt-2', v: 1, emoji: '🗓️', titre: 'Mon plan : 30 € puis 10 € par mois', perso: true,
      texte: [
        "Imagine ce plan : en **décembre 2026**, tu places **30 €** sur ton compte d'épargne géré avec Papa et Maman, investi dans un **ETF Monde (MSCI World)**. Ensuite, tu ajoutes **10 € chaque mois**. C'est tout.",
        "En décembre 2026, tu as **{age} ans**. À 60 ans, tu auras versé **{verse60}** en tout. Mais grâce à la boule de neige, ton compte pourrait valoir environ **{v60_7}** avec un rendement de 7 % par an.",
        "Comme personne ne connaît l'avenir, on regarde **trois scénarios** : prudent (5 % par an), central (7 %) et favorable (9 %). Ils s'appuient sur l'histoire : sur toutes les périodes de 30 ans depuis 1969, un placement chaque mois dans le MSCI World a rapporté entre **6,2 % et 10,1 % par an**, 7,9 % en moyenne (avant frais et impôts).",
        "Regarde la courbe : pendant des années, elle monte doucement. Puis, vers la fin, elle **décolle**. Ce n'est pas toi qui verses plus : c'est ton argent qui travaille de plus en plus.",
        "Attention : ce sont des **simulations**, pas des promesses. Le vrai montant dépendra de la bourse, des frais et des impôts. Mais une chose est sûre : sans commencer, la courbe reste à zéro."
      ],
      illus: [
        { type: 'plan-courbe', titre: 'Mon plan, année après année' },
        { type: 'plan-tableau', titre: "Combien j'aurai à chaque âge ?",
          note: "Simulation : 30 € en décembre 2026, puis 10 € par mois, avec un rendement régulier de 5, 7 ou 9 % par an, avant frais et impôts. Repères historiques : Deutsches Aktieninstitut, MSCI World de 1969 à 2025." }
      ],
      astuce: "10 € par mois, c'est environ 2,50 € par semaine. Mis de côté pendant des années, ça pourrait devenir {v60_7} à 60 ans (scénario central).",
      quiz: [
        { q: 'Dans ton plan, combien places-tu au départ, en décembre 2026 ?', c: ['10 €', '30 €', '100 €', 'Rien du tout'], r: 1, e: '30 € au départ, puis 10 € chaque mois.' },
        { q: 'Combien ajoutes-tu ensuite chaque mois ?', c: ['1 €', '10 €', '30 €', '100 €'], r: 1, e: '10 € par mois, soit 120 € par an.' },
        { q: 'À 60 ans, combien auras-tu versé en tout ?', c: ['{verse60}', '{v60_7}', '{v60_9}', '{v20_7}'], r: 0, e: 'Tu verses 30 €, puis 10 € par mois pendant {ans60} ans : {verse60}. Tout le reste, ce sont les gains de la boule de neige.' },
        { q: 'Dans le scénario central (7 % par an), combien pourrait valoir ton compte à 60 ans ?', c: ['{verse60}', '{v60_7}', '{v20_7}', '{v30_5}'], r: 1, e: 'Environ {v60_7}, alors que tu n\'auras versé que {verse60}.' },
        { q: 'Question piège : ces montants sont…', c: ['Garantis par la banque', 'Des simulations qui dépendent de la bourse', 'Impossibles à atteindre', "Versés par l'État"], r: 1, e: 'Ce sont des calculs basés sur l\'histoire de la bourse. Le vrai résultat peut être plus haut ou plus bas.' }
      ] },

    { id: 'nt-3', v: 1, emoji: '🦸‍♀️', titre: 'Mon super-pouvoir : des années d\'avance sur mes parents', perso: true,
      texte: [
        "Papa ou Maman ont **{agep} ans**. Toi, tu en as **{age}**. Ça fait **{ecart} ans** d'écart… et en investissement, ces années valent de l'or.",
        "Si Papa ou Maman commençaient aujourd'hui exactement le même plan que toi (30 €, puis 10 € par mois), ils auraient environ **{parentV60}** à 60 ans (scénario 7 %). Toi, au même âge, tu pourrais avoir **{v60_7}**.",
        "Pour arriver au même montant que toi à 60 ans, Papa ou Maman devraient verser environ **{parentMois} par mois**, soit **{parentFois} fois plus** que toi. Ils n'ont pas moins d'argent que toi : ils ont **moins de temps**.",
        "Le temps, c'est la seule chose qu'on ne peut pas acheter. Les adultes peuvent verser plus d'argent, mais personne ne peut remonter le temps. C'est **ton super-pouvoir**, et il n'est jamais aussi fort que maintenant."
      ],
      illus: [{ type: 'plan-parent', titre: 'Même plan, mais pas le même âge pour commencer' }],
      astuce: "Beaucoup d'adultes disent « si j'avais su, j'aurais commencé plus tôt ». Toi, tu sais : profites-en !",
      quiz: [
        { q: 'Quel est ton plus grand avantage pour investir, par rapport à tes parents ?', c: ["Tu as plus d'argent", 'Tu as plus de temps devant toi', 'Tu connais mieux la bourse', 'Tu paies moins de frais'], r: 1, e: 'Tu as {ecart} ans d\'avance : ta boule de neige a beaucoup plus longtemps pour rouler.' },
        { q: 'Combien d\'années d\'avance as-tu sur un parent de {agep} ans ?', c: ['5 ans', '{ecart} ans', '50 ans', 'Aucune'], r: 1, e: '{agep} − {age} = {ecart} ans.' },
        { q: 'Pour avoir autant que toi à 60 ans, combien un parent qui commence à {agep} ans devrait-il verser par mois ?', c: ['10 €, comme toi', '{parentMois}', '5 €', 'Impossible à calculer'], r: 1, e: 'Environ {parentMois} par mois, {parentFois} fois plus que toi, parce qu\'il n\'a que 20 ans devant lui jusqu\'à 60 ans.' },
        { q: 'Avec le même plan que toi (10 € par mois), un parent qui commence à {agep} ans aurait à 60 ans environ…', c: ['{parentV60}', '{v60_7}', 'Le double de toi', 'Exactement comme toi'], r: 0, e: 'Environ {parentV60}, contre {v60_7} pour toi : même effort, mais pas le même temps.' },
        { q: 'Question piège : qu\'est-ce qu\'on ne peut jamais racheter plus tard ?', c: ['Une action', 'Une console', 'Le temps perdu', 'Un ETF'], r: 2, e: 'On peut toujours acheter des actions ou des ETF, mais pas les années qui sont passées.' }
      ] },

    { id: 'nt-4', v: 1, emoji: '🎢', titre: 'Les montagnes russes de la bourse',
      texte: [
        "Les 7 % par an des simulations sont une **moyenne**. En vrai, la bourse ne monte pas tranquillement : certaines années elle grimpe beaucoup, d'autres elle chute fort.",
        "Tu te souviens du **Covid** ? Au printemps 2020, la bourse mondiale a perdu environ **un tiers** de sa valeur en 4 semaines (du 19 février au 23 mars). Puis elle est remontée, et dès l'été 2020 elle avait retrouvé son niveau d'avant la crise.",
        "En **2008**, c'était pire : entre fin 2007 et mars 2009, l'indice MSCI World a perdu jusqu'à **57 %**. Pourtant, quelqu'un qui a investi chaque mois dans le MSCI World de fin 2005 à fin 2025, en traversant cette crise, a obtenu en moyenne **11,7 % par an**.",
        "Le secret, c'est la **durée**. Sur 1 an, un placement mensuel dans le MSCI World a déjà fait −42 %… ou +52 %. Sur 20 ans, le pire résultat reste positif (+2,2 % par an). Sur 30 ans, le pire est encore d'environ **+6 % par an**.",
        "C'est pour ça qu'on place en bourse seulement l'argent dont on n'aura **pas besoin avant longtemps**. Et quand ça chute, la pire erreur est de **paniquer et tout vendre** : on transforme une baisse passagère en vraie perte."
      ],
      illus: [
        { type: 'fourchette', titre: 'Ce que rapporte par an un placement chaque mois dans le MSCI World, selon la durée',
          lignes: [
            { nom: '1 an', min: -42.2, moy: 10.5, max: 51.7 },
            { nom: '5 ans', min: -13.0, moy: 9.9, max: 29.9 },
            { nom: '10 ans', min: -6.2, moy: 9.7, max: 20.3 },
            { nom: '15 ans', min: -0.7, moy: 8.9, max: 15.5 },
            { nom: '20 ans', min: 2.2, moy: 8.6, max: 15.4 },
            { nom: '30 ans', min: 6.2, moy: 7.9, max: 10.1 }
          ],
          note: "Pire, moyenne et meilleur résultat par an sur toutes les périodes depuis 1969, en euros, avant frais et impôts. Source : Deutsches Aktieninstitut, fin 2025. Plus la durée est longue, plus la fourchette se resserre." }
      ],
      astuce: "Quand la bourse chute et que tu continues à verser tes 10 € par mois, tu achètes des parts moins cher. Les soldes, ça existe aussi en bourse !",
      quiz: [
        { q: 'Au printemps 2020, pendant le Covid, la bourse mondiale a…', c: ['Monté sans arrêt', "Chuté d'environ un tiers, puis est remontée", 'Fermé pour toujours', 'Pas bougé'], r: 1, e: 'Environ −1/3 en 4 semaines, puis un retour au niveau d\'avant la crise dès l\'été 2020.' },
        { q: 'Sur 30 ans, quel a été le pire rendement d\'un placement mensuel dans le MSCI World depuis 1969 ?', c: ['−42 % par an', '0 % par an', 'Environ +6 % par an', '+20 % par an'], r: 2, e: 'Même dans le pire cas, environ +6 % par an sur 30 ans : le temps a lissé les chutes.' },
        { q: 'Question piège : la bourse chute de 30 %. Que faut-il éviter ?', c: ['Continuer ses versements', 'Paniquer et tout vendre', 'Attendre calmement', 'En parler avec ses parents'], r: 1, e: 'Vendre pendant la chute transforme une baisse passagère en vraie perte.' },
        { q: 'Quel argent peut-on placer en bourse ?', c: ['L\'argent du goûter de demain', 'L\'argent de la sortie de samedi', "L'argent dont on n'aura pas besoin avant longtemps", 'Tout son argent, sans exception'], r: 2, e: 'La bourse peut chuter sur quelques mois ou quelques années : on y place seulement l\'argent du long terme.' },
        { q: 'Si tu continues à verser 10 € par mois pendant une chute…', c: ['Tu perds tout', 'Tu achètes des parts moins cher', "C'est interdit", 'Ça ne change rien'], r: 1, e: 'Avec les mêmes 10 €, tu achètes plus de parts : elles profiteront de la remontée.' }
      ] },

    { id: 'nt-5', v: 1, emoji: '🐢', titre: 'Commencer tôt ou verser plus ?',
      texte: [
        "Voici l'histoire de deux amies. **Jade** place 10 € par mois de **10 à 20 ans**, puis elle arrête complètement. Elle a versé **1 200 €** en tout, et elle laisse son argent placé.",
        "**Inès** ne commence qu'à **20 ans**, mais elle verse 10 € par mois **jusqu'à 60 ans**, sans jamais s'arrêter. Elle a versé **4 800 €**, quatre fois plus que Jade.",
        "À 60 ans, avec 7 % par an, qui a le plus ? **Jade : environ 25 610 €. Inès : environ 24 720 €.** Jade a versé quatre fois moins… et elle a plus ! Ses 10 premières années ont eu 40 ans de plus pour faire boule de neige.",
        "Autre façon de voir : avec le plan « 30 € puis 10 € par mois », commencer à 10 ans plutôt qu'à 20 ans ne demande que **1 200 €** de versements en plus. Mais à 60 ans, ça donne environ **51 210 €** au lieu de **25 160 €** (scénario 7 %). Attendre 10 ans peut **diviser le résultat par deux**.",
        "Moralité : **le meilleur moment pour commencer, c'est le plus tôt possible**. Et le deuxième meilleur moment, c'est maintenant."
      ],
      illus: [
        { type: 'parts', titre: 'Jade contre Inès (7 % par an)', unite: ' €',
          lignes: [
            { nom: 'Jade a versé (de 10 à 20 ans)', val: 1200 },
            { nom: 'Inès a versé (de 20 à 60 ans)', val: 4800 },
            { nom: 'Jade a à 60 ans', val: 25610 },
            { nom: 'Inès a à 60 ans', val: 24720 }
          ],
          note: 'Simulation avec un rendement régulier de 7 % par an, avant frais et impôts.' },
        { type: 'barres', titre: 'Commencer à 10 ans ou à 20 ans ?', hausseBonne: true, legende: ['20 ans', '10 ans'],
          lignes: [{ nom: 'Montant à 60 ans (30 € puis 10 € par mois, 7 %)', a: 25160, al: 'Début à 20 ans', b: 51210, bl: 'Début à 10 ans' }],
          note: 'Seulement 1 200 € versés en plus, mais deux fois plus à l\'arrivée.' }
      ],
      astuce: "Pas besoin de verser beaucoup : ce qui compte le plus, c'est de commencer tôt et de ne pas s'arrêter.",
      quiz: [
        { q: 'Jade verse de 10 à 20 ans, Inès de 20 à 60 ans. À 60 ans (7 % par an), qui a le plus ?', c: ['Jade', 'Inès', 'Exactement pareil', 'Aucune des deux'], r: 0, e: 'Jade, avec environ 25 610 € contre 24 720 €, alors qu\'elle a versé quatre fois moins.' },
        { q: 'Combien Jade a-t-elle versé en tout ?', c: ['1 200 €', '4 800 €', '25 610 €', '120 €'], r: 0, e: '10 € × 12 mois × 10 ans = 1 200 €.' },
        { q: 'Pourquoi Jade gagne-t-elle en versant moins ?', c: ['Elle a eu de la chance', 'Son argent a eu beaucoup plus de temps pour faire boule de neige', 'Sa banque lui a fait un cadeau', 'Elle a acheté une seule action'], r: 1, e: 'Ses premiers euros ont roulé pendant 40 à 50 ans : c\'est le temps qui fait la différence.' },
        { q: 'Avec 30 € puis 10 € par mois à 7 %, commencer à 20 ans au lieu de 10 ans fait passer le montant à 60 ans d\'environ 51 210 € à…', c: ['50 000 €', '40 000 €', '25 160 €', '10 000 €'], r: 2, e: 'Environ 25 160 € : 10 ans d\'attente divisent presque le résultat par deux.' },
        { q: 'Quel est le meilleur moment pour commencer à investir ?', c: ['Quand on sera riche', 'À la retraite', 'Le plus tôt possible', 'Jamais'], r: 2, e: 'Le plus tôt possible… et le deuxième meilleur moment, c\'est maintenant.' }
      ] }
  );
})();
