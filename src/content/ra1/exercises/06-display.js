// Exercicis extra del tema 6: display (block, inline, inline-block i none).
// Només fan servir el que s'ha explicat fins a la unitat 6: encara no hi ha Flexbox.

const BASE = `body {
  font-family: Arial, sans-serif;
}`;

export default [
  {
    id: 'dades-en-columna',
    level: 1,
    title: 'Una dada per línia',
    statement: 'Les tres dades d\'aquesta ruta són `<span>` i surten seguides, a la mateixa línia. Fes que cada una ocupi la seva pròpia línia, de banda a banda de la fitxa.',
    expected: 'El nom de la ruta i, a sota, les tres dades, l\'una sota l\'altra.',
    html: `<div class="fitxa">
  <h2>Sant Jeroni</h2>
  <span class="dada">11 km</span>
  <span class="dada">4 h 30 min</span>
  <span class="dada">Dificultat mitjana</span>
</div>`,
    css: `${BASE}

.fitxa {
  padding: 12px;
  background: #e8f3ee;
  border-radius: 8px;
}

.fitxa h2 {
  margin: 0 0 8px;
}

.dada {
  padding: 4px 0;
  color: #5b6b63;
}`,
    hint: 'Un `<span>` és un element en línia. Quin valor de `display` el fa comportar-se com un paràgraf?',
    solution: {
      css: `${BASE}

.fitxa {
  padding: 12px;
  background: #e8f3ee;
  border-radius: 8px;
}

.fitxa h2 {
  margin: 0 0 8px;
}

.dada {
  display: block;
  padding: 4px 0;
  color: #5b6b63;
}`,
    },
    explanation: "Amb `display: block`, cada `<span>` comença en una línia nova i ocupa tota l'amplada. L'etiqueta continua sent la mateixa: només n'ha canviat el comportament.",
    checks: [
      { label: "Les tres dades estan l'una sota l'altra", selector: '.dada', arrange: 'column' },
      { label: "Cada dada ocupa tota l'amplada de la fitxa", selector: '.dada', all: true, fills: 'x' },
    ],
  },
  {
    id: 'llista-en-una-linia',
    level: 1,
    title: 'Una llista en una línia',
    statement: "Aquesta llista d'etiquetes ha de quedar en una sola línia, com si fossin paraules seguides. No toquis l'HTML: canvia el comportament dels `<li>`.",
    expected: 'Les quatre etiquetes, de costat, cadascuna de la mida del seu text i sense el punt de la llista.',
    html: `<ul class="etiquetes">
  <li>Bosc</li>
  <li>Riu</li>
  <li>Cim</li>
  <li>Refugi</li>
</ul>`,
    css: `${BASE}

.etiquetes {
  padding: 0;
}

.etiquetes li {
  margin-right: 8px;
  padding: 2px 10px;
  background: #e8f3ee;
  border-radius: 12px;
}`,
    hint: 'Els `<li>` es comporten com a blocs. Has d\'afegir una propietat a la regla `.etiquetes li` perquè es comportin com a paraules.',
    solution: {
      css: `${BASE}

.etiquetes {
  padding: 0;
}

.etiquetes li {
  display: inline;
  margin-right: 8px;
  padding: 2px 10px;
  background: #e8f3ee;
  border-radius: 12px;
}`,
    },
    explanation: "Amb `display: inline`, cada element de la llista es posa a continuació de l'anterior i fa només l'amplada del seu text. El punt desapareix, perquè només el dibuixen els elements que es comporten com a elements de llista. Amb `inline-block` també quedarien de costat.",
    checks: [
      { label: 'Les quatre etiquetes estan de costat', selector: '.etiquetes li', arrange: 'row' },
      { label: "Cada etiqueta fa només l'amplada del seu text", selector: '.etiquetes li', all: true, size: { maxWidth: 120 } },
    ],
  },
  {
    id: 'numeros-de-pagina',
    level: 2,
    title: 'Números de pàgina quadrats',
    statement: 'Sota de la llista de rutes hi ha els números de pàgina. Cada número ha de ser un quadrat de 40 per 40 píxels (la vora inclosa: el `box-sizing` ja hi és), i han de quedar tots de costat. El CSS ja centra el número; hi falten les mides i el que fa que s\'apliquin.',
    expected: 'Quatre quadrats iguals amb vora verda, de costat, cadascun amb el seu número al mig.',
    html: `<nav class="pagines">
  <a href="#">1</a>
  <a href="#">2</a>
  <a href="#">3</a>
  <a href="#">4</a>
</nav>`,
    css: `${BASE}

.pagines a {
  box-sizing: border-box;
  line-height: 36px;
  color: #1f6f54;
  text-align: center;
  text-decoration: none;
  border: 2px solid #1f6f54;
  border-radius: 6px;
}`,
    hint: [
      'Són tres propietats: `width`, `height` i un `display`.',
      'Un `<a>` no fa cas de les mides mentre sigui un element en línia. I si el fas de bloc, els números s\'apilaran.',
    ],
    solution: {
      css: `${BASE}

.pagines a {
  box-sizing: border-box;
  display: inline-block;
  width: 40px;
  height: 40px;
  line-height: 36px;
  color: #1f6f54;
  text-align: center;
  text-decoration: none;
  border: 2px solid #1f6f54;
  border-radius: 6px;
}`,
    },
    explanation: "Les mides no serveixen de res sense el `display`: un enllaç en línia les ignora. Amb `inline-block`, cada número és una caixa de 40 per 40 que es col·loca al costat de l'anterior. El `line-height` de 36 píxels (els 40 menys les dues vores) centra el número de dalt a baix.",
    checks: [
      { label: 'Els quatre números estan de costat', selector: '.pagines a', arrange: 'row' },
      { label: "Cada número fa 40 píxels d'amplada", selector: '.pagines a', all: true, size: { width: 40 } },
      { label: "Cada número fa 40 píxels d'alçada", selector: '.pagines a', all: true, size: { height: 40 } },
    ],
  },
  {
    id: 'galeria-enganxada',
    level: 2,
    title: 'Una galeria sense franges',
    statement: [
      "Les tres fotos d'aquesta galeria haurien de quedar enganxades l'una sota l'altra, però entre foto i foto es veu una franja del color de fons.",
      'Treu les franges. A més, el peu de la galeria és un `<span>` i ha d\'ocupar tota l\'amplada, amb el text centrat (el `text-align` ja hi és).',
    ],
    expected: 'Tres fotos apilades sense cap separació i, a sota, el peu centrat sobre el fons fosc.',
    html: `<div class="galeria">
  <img src="imatges/ruta-1.jpg" alt="Muntanyes sota un cel blau">
  <img src="imatges/ruta-4.jpg" alt="Muntanyes verdes">
  <img src="imatges/ruta-6.jpg" alt="Muntanyes grises amb boira">
  <span class="peu-galeria">Tres moments del camí</span>
</div>`,
    css: `${BASE}

.galeria {
  width: 240px;
  background: #23312b;
}

.galeria img {
  width: 100%;
}

.peu-galeria {
  padding: 8px 0;
  color: #ffffff;
  text-align: center;
}`,
    hint: [
      'Les franges surten perquè les imatges són elements en línia: cada una deixa un espai a sota.',
      'El peu no es pot centrar perquè la seva caixa fa just l\'amplada del text. Si ocupés tota la línia, el `text-align` es notaria.',
    ],
    solution: {
      css: `${BASE}

.galeria {
  width: 240px;
  background: #23312b;
}

.galeria img {
  display: block;
  width: 100%;
}

.peu-galeria {
  display: block;
  padding: 8px 0;
  color: #ffffff;
  text-align: center;
}`,
    },
    explanation: "El mateix canvi resol dos problemes diferents. A les imatges, `display: block` les treu de la línia de text i s'emporta la franja de sota. Al peu, li dona tota l'amplada de la galeria, i és dins d'aquesta amplada on `text-align: center` pot centrar el text.",
    checks: [
      { label: 'Les fotos estan enganxades, sense cap franja entre elles', selector: '.galeria img', arrange: 'column', gap: 0 },
      { label: "El peu ocupa tota l'amplada de la galeria, sota de l'última foto", selector: '.peu-galeria', below: '.galeria img:nth-of-type(3)', inside: '.galeria', fills: 'x' },
    ],
  },
  {
    id: 'targeta-acabada',
    level: 3,
    title: 'Una targeta de ruta, peça a peça',
    statement: [
      'Aquesta targeta té quatre problemes, i tots quatre se solucionen amb `display`. Troba\'ls i arregla\'ls.',
      'Sota de la foto hi ha una franja fosca. Les dues etiquetes han de fer 80 per 26 píxels i no en fan cas. L\'enllaç «Veure la ruta» ha de ser un botó que ocupi tota l\'amplada de la targeta. I la nota interna («Revisar la foto») no l\'ha de veure ningú.',
    ],
    expected: 'Una targeta amb la foto sense franja, el nom, dues píndoles verd clar iguals i un botó verd de banda a banda. La nota interna no hi surt.',
    html: `<article class="ruta">
  <div class="marc">
    <img src="imatges/ruta-6.jpg" alt="Muntanyes grises amb boira">
  </div>
  <h2>Estany de Sant Maurici</h2>
  <p class="etiquetes">
    <span class="etiqueta">Fàcil</span>
    <span class="etiqueta">7 km</span>
  </p>
  <p class="nota-interna">Revisar la foto</p>
  <a class="boto" href="ruta.html">Veure la ruta</a>
</article>`,
    css: `${BASE}

.ruta {
  width: 260px;
  padding: 12px;
  border: 2px solid #c9d6cf;
  border-radius: 8px;
}

.marc {
  background: #23312b;
}

.marc img {
  width: 100%;
}

.ruta h2 {
  margin: 12px 0 8px;
  font-size: 20px;
}

.etiquetes {
  margin: 0 0 12px;
}

.etiqueta {
  width: 80px;
  height: 26px;
  font-size: 14px;
  line-height: 26px;
  color: #1f6f54;
  text-align: center;
  background: #e8f3ee;
  border-radius: 13px;
}

.boto {
  padding: 10px 0;
  color: #ffffff;
  text-align: center;
  text-decoration: none;
  background: #1f6f54;
  border-radius: 6px;
}`,
    hint: [
      'Són quatre elements i tres valors diferents: dos han de ser `block`, un `inline-block` i un `none`.',
      'La imatge i el botó han de comportar-se com a blocs. Les etiquetes han d\'acceptar mides sense deixar d\'anar de costat. I per a la nota cal una regla nova, `.nota-interna`.',
    ],
    solution: {
      css: `${BASE}

.ruta {
  width: 260px;
  padding: 12px;
  border: 2px solid #c9d6cf;
  border-radius: 8px;
}

.marc {
  background: #23312b;
}

.marc img {
  display: block;
  width: 100%;
}

.ruta h2 {
  margin: 12px 0 8px;
  font-size: 20px;
}

.etiquetes {
  margin: 0 0 12px;
}

.etiqueta {
  display: inline-block;
  width: 80px;
  height: 26px;
  font-size: 14px;
  line-height: 26px;
  color: #1f6f54;
  text-align: center;
  background: #e8f3ee;
  border-radius: 13px;
}

.nota-interna {
  display: none;
}

.boto {
  display: block;
  padding: 10px 0;
  color: #ffffff;
  text-align: center;
  text-decoration: none;
  background: #1f6f54;
  border-radius: 6px;
}`,
    },
    explanation: [
      "Cada peça necessitava un comportament diferent del que porta de sèrie. La imatge i l'enllaç, que són en línia, havien de ser blocs: la primera per perdre la franja, el segon per ocupar tota l'amplada i acceptar el farciment. Les etiquetes havien de continuar a la línia però amb mides: `inline-block`. I la nota no havia de generar cap caixa: `none`.",
      'Fixa\'t que no has tocat cap mida ni cap color: tot ja era al CSS. Moltes vegades, quan una propietat «no funciona», el que falla és el `display`.',
    ],
    checks: [
      { label: 'No hi ha cap franja sota de la foto', selector: '.marc img', inside: '.marc', offset: { bottom: 0 } },
      { label: 'Les etiquetes fan 80 per 26 píxels', selector: '.etiqueta', all: true, size: { width: 80, height: 26 } },
      { label: 'Les etiquetes continuen de costat', selector: '.etiqueta', arrange: 'row' },
      { label: "El botó ocupa tota l'amplada de la targeta", selector: '.boto', inside: '.ruta', fills: 'x' },
      { label: 'La nota interna no es veu', selector: '.nota-interna', style: { display: 'none' } },
    ],
  },
];
