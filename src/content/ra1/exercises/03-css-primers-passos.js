// Exercicis extra del tema 3: CSS, els primers passos.
// Només fan servir el que s'ha explicat fins a la unitat 3: regles, selectors
// d'etiqueta, de classe i de descendent, propietats de text i la cascada.

export default [
  {
    id: 'fons-de-pagina',
    level: 1,
    title: 'Un fons per a la pàgina',
    statement: "Posa un fons verd molt clar, `#e8f3ee`, a tota la pàgina. El títol ha de ser blanc sobre un fons verd fosc, `#1f6f54`.",
    expected: 'Tota la pàgina de color verd clar, amb una franja verda fosca a dalt on es llegeix «Camins» en blanc.',
    html: `<h1>Camins</h1>
<p>Rutes de muntanya per fer a peu, explicades pas a pas.</p>`,
    css: `body {

}

h1 {

}`,
    hint: 'El fons es canvia amb `background-color` i el color de la lletra, amb `color`. El títol necessita totes dues.',
    solution: {
      css: `body {
  background-color: #e8f3ee;
}

h1 {
  color: #ffffff;
  background-color: #1f6f54;
}`,
    },
    explanation: "El fons del `<body>` omple tota la pàgina. El del títol només omple el títol, que és una franja tan ampla com la pàgina. `color` i `background-color` van sempre de bracet: si canvies l'un, comprova que l'altre encara deixa llegir el text.",
    checks: [
      { label: 'La pàgina té el fons #e8f3ee', selector: 'body', style: { 'background-color': '#e8f3ee' } },
      { label: 'El títol té el fons #1f6f54', selector: 'h1', style: { 'background-color': '#1f6f54' } },
      { label: 'El text del títol és blanc', selector: 'h1', style: { color: '#ffffff' } },
    ],
  },
  {
    id: 'nota-i-important',
    level: 1,
    title: 'Una nota i un avís important',
    statement: "A la fitxa d'aquesta ruta hi ha un paràgraf amb la classe `nota` i un altre amb la classe `important`. La nota s'ha de veure en cursiva i de color gris `#5b6b63`. L'avís important, en negreta. El primer paràgraf no ha de canviar.",
    expected: 'Tres paràgrafs: el primer normal, el segon gris i en cursiva, i el tercer en negreta.',
    html: `<h2>Estany de Sant Maurici</h2>
<p>Una passejada plana fins a un dels estanys més coneguts del Pirineu.</p>
<p class="nota">La pista d'accés està tancada als cotxes: s'hi puja a peu o amb taxi.</p>
<p class="important">Emporta't aigua: no hi ha cap font pel camí.</p>`,
    css: `/* Escriu aquí les dues regles */
`,
    hint: 'Són dues regles, una per classe. La cursiva és `font-style: italic` i la negreta, `font-weight: bold`.',
    solution: {
      css: `.nota {
  font-style: italic;
  color: #5b6b63;
}

.important {
  font-weight: bold;
}`,
    },
    explanation: 'Cada classe té la seva regla, i cada regla només toca els elements que porten aquella classe. Els noms diuen què és cada paràgraf, no com es veu: si demà les notes han de ser blaves, el nom `nota` continuarà sent bo.',
    checks: [
      { label: 'La nota està en cursiva', selector: '.nota', style: { 'font-style': 'italic' } },
      { label: 'La nota és de color #5b6b63', selector: '.nota', style: { color: '#5b6b63' } },
      { label: "L'avís important està en negreta", selector: '.important', style: { 'font-weight': '700' } },
      { label: 'El primer paràgraf no ha canviat', selector: 'p:not(.nota):not(.important)', style: { 'font-style': 'normal', 'font-weight': '400' } },
    ],
  },
  {
    id: 'colors-de-dificultat',
    level: 2,
    title: 'Un color per a cada dificultat',
    statement: [
      "A la llista, la dificultat de cada ruta està marcada amb `<strong>`. Volem que es distingeixin pel color: verd `#2b8a3e` per a les fàcils, taronja `#b35c00` per a la mitjana i vermell `#b3261e` per a la difícil.",
      "Has de tocar els dos fitxers. A l'HTML, posa a cada `<strong>` la classe que li toca: `facil`, `mitjana` o `dificil`. Al CSS, escriu una regla per a cada classe.",
    ],
    expected: 'La paraula «Fàcil» en verd (dues vegades), «Mitjana» en taronja i «Difícil» en vermell. Els noms de les rutes, en negre.',
    focus: 'html',
    html: `<ul>
  <li>Camí de Ronda: <strong>Fàcil</strong></li>
  <li>Vall de Núria: <strong>Mitjana</strong></li>
  <li>Pica d'Estats: <strong>Difícil</strong></li>
  <li>Estany de Sant Maurici: <strong>Fàcil</strong></li>
</ul>`,
    css: `/* Una regla per a cada dificultat */
`,
    hint: [
      "A l'HTML: `<strong class=\"facil\">`. El nom de la classe va sense punt i sense accent.",
      'Al CSS: tres regles, `.facil`, `.mitjana` i `.dificil`, cadascuna amb el seu `color`.',
    ],
    solution: {
      html: `<ul>
  <li>Camí de Ronda: <strong class="facil">Fàcil</strong></li>
  <li>Vall de Núria: <strong class="mitjana">Mitjana</strong></li>
  <li>Pica d'Estats: <strong class="dificil">Difícil</strong></li>
  <li>Estany de Sant Maurici: <strong class="facil">Fàcil</strong></li>
</ul>`,
      css: `/* Una regla per a cada dificultat */
.facil {
  color: #2b8a3e;
}

.mitjana {
  color: #b35c00;
}

.dificil {
  color: #b3261e;
}`,
    },
    explanation: "La classe `facil` es fa servir dues vegades i la seva regla s'escriu una sola vegada: és per això que triem per classe i no element per element. Si afegeixes una cinquena ruta fàcil, només li has de posar la classe.",
    checks: [
      { label: 'Les dues rutes fàcils tenen la classe facil', selector: 'strong.facil', count: 2, all: true, text: 'Fàcil' },
      { label: 'La ruta mitjana té la classe mitjana', selector: 'strong.mitjana', count: 1, text: 'Mitjana' },
      { label: 'La ruta difícil té la classe dificil', selector: 'strong.dificil', count: 1, text: 'Difícil' },
      { label: '«Fàcil» és de color #2b8a3e', selector: '.facil', all: true, style: { color: '#2b8a3e' } },
      { label: '«Mitjana» és de color #b35c00', selector: '.mitjana', style: { color: '#b35c00' } },
      { label: '«Difícil» és de color #b3261e', selector: '.dificil', style: { color: '#b3261e' } },
    ],
  },
  {
    id: 'enllacos-del-peu',
    level: 2,
    title: 'Els enllaços del peu',
    statement: "El peu de la pàgina té el fons fosc, i els seus dos enllaços, blaus, gairebé no es llegeixen. Fes que els enllaços **del peu** siguin blancs i sense subratllat. A més, el text del peu ha de fer 14 píxels i quedar centrat. L'enllaç del primer paràgraf ha de continuar com està.",
    expected: "A dalt, un paràgraf amb un enllaç blau i subratllat. A sota, una franja fosca amb el text centrat i petit, i els dos enllaços en blanc.",
    html: `<p class="intro">Totes les rutes estan revisades. Si hi trobes cap error, <a href="contacte.html">escriu-nos</a>.</p>

<p class="peu">© 2025 Camins · <a href="contacte.html">Contacte</a> · <a href="legal.html">Avís legal</a></p>`,
    css: `body {
  font-family: Arial, sans-serif;
}

.peu {
  color: #ffffff;
  background-color: #23312b;
}`,
    hint: [
      'La mida i el centrat són del peu sencer: van a la regla `.peu`, que ja existeix.',
      'Els enllaços no hereten el color del text. Cal una regla nova que triï «els enllaços de dins del peu».',
    ],
    solution: {
      css: `body {
  font-family: Arial, sans-serif;
}

.peu {
  font-size: 14px;
  text-align: center;
  color: #ffffff;
  background-color: #23312b;
}

.peu a {
  color: #ffffff;
  text-decoration: none;
}`,
    },
    explanation: "El peu ja deia `color: #ffffff`, però els enllaços no en feien cas: el navegador els posa en blau amb una regla pròpia, i una regla escrita per a l'element guanya el que heretaria. `.peu a` els tria només a ells i deixa en pau l'enllaç de la introducció.",
    checks: [
      { label: 'Els enllaços del peu són blancs', selector: '.peu a', all: true, style: { color: '#ffffff' } },
      { label: 'Els enllaços del peu no estan subratllats', selector: '.peu a', all: true, style: { 'text-decoration-line': 'none' } },
      { label: 'El text del peu fa 14 píxels i està centrat', selector: '.peu', style: { 'font-size': '14px', 'text-align': 'center' } },
      { label: "L'enllaç del primer paràgraf continua subratllat", selector: '.intro a', style: { 'text-decoration-line': 'underline' } },
    ],
  },
  {
    id: 'tres-errors',
    level: 3,
    title: 'Tres errors amagats',
    statement: [
      "Aquest full d'estils té tres errors. El navegador no n'avisa de cap: simplement, la pàgina no es veu com hauria.",
      "Troba'ls i arregla'ls. Quan acabis, el títol ha de ser verd `#1f6f54`. Les dades han de fer 14 píxels i ser grises `#5b6b63`. I l'avís ha de ser vermell `#b3261e`, en negreta i en cursiva. No toquis l'HTML.",
    ],
    expected: 'Un títol verd, una línia de dades petita i grisa, i un avís vermell, en negreta i cursiva.',
    html: `<h1 class="titol">Pica d'Estats</h1>
<p class="dades">18 km · 9 h · Difícil</p>
<p id="avis" class="alerta">A l'hivern, només amb material de neu.</p>`,
    css: `titol {
  color: #1f6f54;
}

.dades {
  font-size: 14px
  color: #5b6b63;
}

.alerta {
  font-weight: bold;
  color: #b3261e;
}

#avis {
  font-style: italic;
  color: #5b6b63;
}`,
    hint: [
      'Dos dels errors són de puntuació: repassa cada selector i el final de cada declaració.',
      "El tercer no és d'escriptura. L'avís rep dues regles que li donen un color diferent: quina de les dues té més força?",
    ],
    solution: {
      css: `.titol {
  color: #1f6f54;
}

.dades {
  font-size: 14px;
  color: #5b6b63;
}

.alerta {
  font-weight: bold;
  color: #b3261e;
}

#avis {
  font-style: italic;
}`,
    },
    explanation: [
      "Primer: a `titol` li faltava el punt, i buscava una etiqueta `<titol>`. Segon: sense el punt i coma després de `14px`, les dues declaracions de `.dades` es llegien com una de sola, sense sentit, i es perdien totes dues.",
      "El tercer és de cascada: el paràgraf rep `.alerta` i `#avis`, i un selector d'id guanya un de classe. Mentre `#avis` digui gris, l'avís serà gris. Cal treure-li aquell color (o canviar-lo pel vermell).",
    ],
    checks: [
      { label: 'El títol és verd (#1f6f54)', selector: '.titol', style: { color: '#1f6f54' } },
      { label: 'Les dades fan 14 píxels', selector: '.dades', style: { 'font-size': '14px' } },
      { label: 'Les dades són grises (#5b6b63)', selector: '.dades', style: { color: '#5b6b63' } },
      { label: "L'avís és vermell (#b3261e)", selector: '.alerta', style: { color: '#b3261e' } },
      { label: "L'avís està en negreta i en cursiva", selector: '.alerta', style: { 'font-weight': '700', 'font-style': 'italic' } },
    ],
  },
];
