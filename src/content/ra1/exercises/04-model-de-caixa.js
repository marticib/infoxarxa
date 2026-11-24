// Exercicis extra del tema 4: el model de caixa.
// Només fan servir el que s'ha explicat fins a la unitat 4: padding, border,
// border-radius, margin, width, max-width i box-sizing. Encara no hi ha res
// per posar caixes de costat: totes s'apilen.

const BASE = `body {
  font-family: Arial, sans-serif;
  color: #23312b;
}`;

export default [
  {
    id: 'boto-amb-aire',
    level: 1,
    title: 'Un botó amb aire',
    statement: "El botó té el color i la lletra que toquen, però es veu petit i amb la vora grisa que li posa el navegador. Dona-li 10 píxels d'aire a dalt i a baix i 24 als costats, treu-li la vora i arrodoneix les cantonades 20 píxels.",
    expected: 'Un botó verd, sense vora, amb les puntes ben arrodonides i el text amb aire als costats.',
    html: `<button class="boto" type="button">Desa la ruta</button>`,
    css: `.boto {
  font-family: Arial, sans-serif;
  font-size: 16px;
  color: #ffffff;
  background-color: #1f6f54;
}`,
    hint: 'Són tres declaracions: un `padding` de dos valors, `border: 0` i `border-radius`.',
    solution: {
      css: `.boto {
  padding: 10px 24px;
  font-family: Arial, sans-serif;
  font-size: 16px;
  color: #ffffff;
  background-color: #1f6f54;
  border: 0;
  border-radius: 20px;
}`,
    },
    explanation: "Un botó també és una caixa, amb el seu `padding` i la seva vora. El navegador li posa una vora grisa per defecte, i `border: 0` la treu. Amb un radi de 20 píxels, que és la meitat de l'alçada del botó, les puntes queden rodones del tot.",
    checks: [
      { label: 'El botó té 10 píxels de padding a dalt i a baix', selector: '.boto', style: { 'padding-top': '10px', 'padding-bottom': '10px' } },
      { label: 'El botó té 24 píxels de padding als costats', selector: '.boto', style: { 'padding-left': '24px', 'padding-right': '24px' } },
      { label: 'El botó no té vora', selector: '.boto', style: { 'border-top-width': '0px', 'border-left-width': '0px' } },
      { label: 'Les cantonades estan arrodonides 20 píxels', selector: '.boto', style: { 'border-radius': '20px' } },
    ],
  },
  {
    id: 'foto-de-perfil',
    level: 1,
    title: 'Una foto de perfil rodona',
    statement: "La foto de perfil és quadrada i fa 96 píxels. Fes que faci 80 píxels d'ample, que tingui una vora contínua de 3 píxels de color `#1f6f54` i que es vegi rodona del tot.",
    expected: 'La foto, més petita, dins d\'un cercle amb la vora verda.',
    html: `<img class="avatar" src="imatges/avatar-2.png" alt="Foto de perfil d'en Marc">
<p>Marc · 12 rutes fetes</p>`,
    css: `${BASE}

.avatar {
  /* Escriu aquí */
}`,
    hint: 'Per convertir una caixa quadrada en un cercle, el radi de les cantonades ha de ser la meitat del costat. Es pot escriure en percentatge.',
    solution: {
      css: `${BASE}

.avatar {
  width: 80px;
  border: 3px solid #1f6f54;
  border-radius: 50%;
}`,
    },
    explanation: "N'hi ha prou amb l'amplada: la imatge manté la proporció i l'alçada s'ajusta sola. Amb `border-radius: 50%`, cada cantonada s'arrodoneix fins a la meitat del costat i el quadrat es veu com un cercle. La vora segueix la mateixa corba.",
    checks: [
      { label: "La foto fa 80 píxels d'ample", selector: '.avatar', style: { width: '80px' } },
      { label: 'Té una vora contínua de 3 píxels, de color #1f6f54', selector: '.avatar', style: { border: '3px solid #1f6f54' } },
      { label: 'Es veu rodona: el radi és del 50%', selector: '.avatar', style: { 'border-radius': '50%' } },
    ],
  },
  {
    id: 'llista-de-dades',
    level: 2,
    title: 'Una llista sense sagnat',
    statement: [
      "Les dades d'aquesta ruta són una llista. El navegador les sagna cap a la dreta amb un `padding` de 40 píxels a l'esquerra de la llista, i les posa enganxades.",
      "Treu el sagnat de la llista. Després, dona a cada dada 8 píxels d'aire a dalt i a baix i 12 als costats, una vora contínua de 4 píxels de color `#1f6f54` **només a l'esquerra**, i separa-les 8 píxels entre elles.",
    ],
    expected: 'Tres franges de color verd clar, alineades amb el títol, cadascuna amb una línia verda gruixuda a l\'esquerra i separades per un espai blanc.',
    html: `<h2>Camí de Ronda</h2>

<ul class="dades">
  <li>Distància: 12 km</li>
  <li>Temps: 3 h 30 min</li>
  <li>Desnivell: 240 m</li>
</ul>`,
    css: `${BASE}

.dades {
  /* Això treu els punts de la llista */
  list-style: none;
}

.dades li {
  background-color: #e8f3ee;
}`,
    hint: [
      'El sagnat és de la llista, no dels seus elements: va a la regla `.dades`, i és un `padding` d\'un sol costat.',
      "La vora d'un sol costat s'escriu amb `border-left`, amb els mateixos tres valors que `border`.",
    ],
    solution: {
      css: `${BASE}

.dades {
  /* Això treu els punts de la llista */
  list-style: none;
  padding-left: 0;
}

.dades li {
  margin-bottom: 8px;
  padding: 8px 12px;
  background-color: #e8f3ee;
  border-left: 4px solid #1f6f54;
}`,
    },
    explanation: "La llista i cada un dels seus elements són caixes diferents, i cada espai és d'una o de l'altra. El sagnat era el `padding` de la caixa de fora. L'aire, la vora i la separació són de cada caixa de dins. Quan un espai no surti d'on esperes, activa els quadrats i mira de quina caixa és.",
    checks: [
      { label: 'Les dades comencen arran de la llista, sense sagnat', selector: '.dades li', all: true, offset: { left: 0 } },
      {
        label: 'Cada dada té 8 píxels de padding a dalt i a baix i 12 als costats',
        selector: '.dades li',
        all: true,
        style: { 'padding-top': '8px', 'padding-bottom': '8px', 'padding-left': '12px', 'padding-right': '12px' },
      },
      { label: "Cada dada té una vora de 4 píxels a l'esquerra", selector: '.dades li', all: true, style: { 'border-left': '4px solid #1f6f54' } },
      {
        label: 'No hi ha vora als altres costats',
        selector: '.dades li',
        all: true,
        style: { 'border-top-style': 'none', 'border-right-style': 'none', 'border-bottom-style': 'none' },
      },
      { label: 'Hi ha 8 píxels entre dada i dada', selector: '.dades li', arrange: 'column', gap: 8 },
    ],
  },
  {
    id: 'columna-centrada',
    level: 2,
    title: 'Una columna al mig',
    statement: [
      "El text va d'una banda a l'altra de la pantalla i, al voltant, hi ha la franja de 8 píxels que posa el navegador.",
      "Treu el marge del `<body>`. Després, fes que la caixa `.pagina` faci com a màxim 300 píxels d'ample, quedi centrada i tingui 24 píxels de `padding`.",
    ],
    expected: 'Sobre el fons verd clar, una columna blanca de 300 píxels, centrada, amb el text separat de les vores.',
    html: `<div class="pagina">
  <h1>Camins</h1>
  <p>Rutes de muntanya per fer a peu, explicades pas a pas i amb totes les dades que necessites abans de sortir de casa.</p>
</div>`,
    css: `* {
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  color: #23312b;
  background-color: #e8f3ee;
}

.pagina {
  background-color: #ffffff;
}`,
    hint: [
      'El marge de la pàgina es treu a la regla del `body`.',
      'A `.pagina` li calen tres declaracions: `max-width`, un marge amb `auto` als costats i `padding`.',
    ],
    solution: {
      css: `* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  color: #23312b;
  background-color: #e8f3ee;
}

.pagina {
  max-width: 300px;
  margin: 0 auto;
  padding: 24px;
  background-color: #ffffff;
}`,
    },
    explanation: "Amb `max-width`, la columna fa 300 píxels quan hi caben i s'encongeix quan la pantalla és més estreta. Com que té un límit d'amplada, sobra espai als costats, i `margin: 0 auto` el reparteix. Gràcies a `border-box`, els 24 píxels de `padding` queden dins dels 300.",
    checks: [
      { label: 'La pàgina ja no té el marge del navegador', selector: 'body', style: { 'margin-top': '0px', 'margin-left': '0px', 'margin-right': '0px' } },
      { label: "La columna fa 300 píxels d'ample", selector: '.pagina', size: { width: 300 } },
      { label: 'La columna està centrada', selector: '.pagina', centered: 'x' },
      { label: 'Té 24 píxels de padding', selector: '.pagina', style: { 'padding-top': '24px', 'padding-left': '24px', 'padding-right': '24px', 'padding-bottom': '24px' } },
    ],
  },
  {
    id: 'marges-que-es-fonen',
    level: 3,
    title: 'Les mides exactes',
    statement: [
      "T'han passat aquesta llista amb les mides que ha de tenir. El títol ha de tocar el `padding` de dalt de la caixa, sense cap espai de més. Entre el títol i la primera targeta hi ha d'haver 40 píxels. Entre targeta i targeta, 24. I l'última targeta ha de tocar el `padding` de baix de la caixa.",
      "Hi ha una condició: **totes les targetes han de tenir la mateixa regla**. No pots tractar la primera ni l'última d'una manera diferent, ni tocar l'HTML.",
    ],
    expected: 'Una caixa amb vora que conté el títol a dalt de tot, un espai gran, i tres targetes separades per espais més petits. Ni a dalt ni a baix hi ha espai de més.',
    boxes: true,
    html: `<div class="llista">
  <h2>Rutes per començar</h2>
  <div class="targeta">Camí de Ronda · 12 km</div>
  <div class="targeta">Estany de Sant Maurici · 7 km</div>
  <div class="targeta">Vall de Núria · 9 km</div>
</div>`,
    css: `* {
  box-sizing: border-box;
}

${BASE}

.llista {
  padding: 16px;
  border: 2px solid #c9d6cf;
  border-radius: 12px;
}

.llista h2 {
  font-size: 20px;
}

.targeta {
  padding: 12px;
  background-color: #e8f3ee;
  border-radius: 8px;
}`,
    hint: [
      'El títol porta marges del navegador, a dalt i a baix. Comença per decidir quins vols tu.',
      "Si poses el marge de les targetes a baix, l'última en tindrà un de més. Si el poses a dalt, la primera en tindrà un que toca el marge del títol. Recorda què passa quan dos marges verticals es toquen.",
    ],
    solution: {
      css: `* {
  box-sizing: border-box;
}

${BASE}

.llista {
  padding: 16px;
  border: 2px solid #c9d6cf;
  border-radius: 12px;
}

.llista h2 {
  margin: 0 0 40px;
  font-size: 20px;
}

.targeta {
  margin-top: 24px;
  padding: 12px;
  background-color: #e8f3ee;
  border-radius: 8px;
}`,
    },
    explanation: [
      "El títol té marge zero a dalt i 40 píxels a baix. Totes les targetes demanen 24 píxels a sobre. Entre targeta i targeta, per tant, n'hi ha 24, i l'última no deixa res a sota.",
      "La gràcia és la primera targeta: el seu marge de dalt (24) toca el marge de baix del títol (40). No se sumen: es queda el més gran, 40, que és justament el que es demanava. El col·lapse de marges, que tantes vegades sorprèn, aquí fa la feina.",
    ],
    checks: [
      { label: 'El títol toca el padding de dalt de la caixa', selector: '.llista h2', offset: { top: 16 } },
      { label: 'Hi ha 40 píxels entre el títol i la primera targeta', selector: '.llista > h2, .llista > h2 + .targeta', arrange: 'column', gap: 40 },
      { label: 'Hi ha 24 píxels entre targeta i targeta', selector: '.targeta', arrange: 'column', gap: 24 },
      { label: "L'última targeta toca el padding de baix de la caixa", selector: '.targeta:last-child', offset: { bottom: 16 } },
    ],
  },
];
