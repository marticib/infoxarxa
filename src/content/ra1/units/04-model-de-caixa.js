import { p, list, example, concept, warning, challenge, project, table, compare, custom } from '../../blocks.js';

const CSS_BASE = `body {
  font-family: Arial, sans-serif;
  color: #23312b;
}`;

// Una ruta dins d'una caixa: la peça amb què treballa mitja unitat.
const HTML_TARGETA = `<div class="targeta">
  <h2>Camí de Ronda</h2>
  <p>12 km · 3 h 30 min · Fàcil</p>
</div>`;

const HTML_TRES_RUTES = `<div class="targeta">Camí de Ronda · 12 km</div>
<div class="targeta">Vall de Núria · 9 km</div>
<div class="targeta">Puigmal · 14 km</div>`;

// La targeta i, a sota, un «regle» de la mida que hauria de tenir.
const HTML_TARGETA_REGLE = `<div class="targeta">
  <h2>Camí de Ronda</h2>
  <p>12 km · 3 h 30 min</p>
</div>

<p class="regle">220 píxels</p>`;

const CSS_REGLE = `.regle {
  width: 220px;
  margin: 4px 0 0;
  font-size: 13px;
  text-align: center;
  color: #ffffff;
  background-color: #23312b;
}`;

export const glossary = [
  {
    term: 'Model de caixa',
    definition:
      "La manera com el navegador veu cada element: una caixa rectangular formada, de dins cap a fora, pel contingut, el `padding`, la vora i el marge.",
  },
  {
    term: 'padding',
    definition:
      "L'espai entre el contingut d'una caixa i la seva vora. És dins de la caixa: el color de fons també l'omple.",
  },
  {
    term: 'border',
    definition: "La vora d'una caixa. Té tres parts: gruix, estil i color, com a `border: 1px solid #c9d6cf`. Sense estil, no es veu.",
  },
  {
    term: 'margin',
    definition: "L'espai per fora de la vora, que separa una caixa de les veïnes. És transparent: el fons no hi arriba.",
  },
  {
    term: 'border-radius',
    definition: "Propietat que arrodoneix les cantonades d'una caixa. Amb `50%`, una caixa quadrada es converteix en un cercle.",
  },
  {
    term: 'box-sizing',
    definition:
      "Decideix què mesura `width`. Amb `content-box`, el valor per defecte, només el contingut. Amb `border-box`, tota la caixa, amb el `padding` i la vora inclosos.",
  },
  {
    term: 'Col·lapse de marges',
    definition:
      "Quan dues caixes apilades tenen marges que es toquen (el de baix de l'una i el de dalt de l'altra), no se sumen: la separació és el més gran dels dos.",
  },
];

export default {
  id: 'model-de-caixa',
  number: 4,
  title: 'El model de caixa: tot és un quadrat',
  shortTitle: 'El model de caixa',
  description:
    "Per al navegador, cada element és una caixa rectangular. Com es dona aire per dins, com se separa de les altres, com se li posa vora i quant ocupa de veritat.",

  problem: {
    title: 'Tot queda enganxat, i hi ha espais que no sé d\'on surten',
    text: [
      "La web de rutes ja té els seus colors i la seva lletra. Però quan poses un color de fons a una ruta, el text queda enganxat a la vora del color. Les rutes es toquen les unes amb les altres. I a dalt de la pàgina hi ha un espai en blanc que ningú ha demanat.",
      "Tot això té la mateixa explicació, i és la idea més important d'aquest dossier: per al navegador, **cada element de la pàgina és una caixa rectangular**. Un títol és una caixa. Un paràgraf és una caixa. Una imatge, un enllaç, una llista i cada punt de la llista: caixes. No n'hi ha cap que no ho sigui.",
      "Maquetar una pàgina és decidir com és cada caixa i on va. En aquesta unitat aprendràs com és una caixa per dins. A partir de la següent, aprendràs a col·locar-les.",
    ],
  },

  goals: [
    "Explicar les quatre parts d'una caixa: contingut, `padding`, vora i marge.",
    'Donar aire per dins amb `padding` i separar per fora amb `margin`.',
    'Dibuixar vores i arrodonir cantonades amb `border` i `border-radius`.',
    "Fixar l'amplada d'una caixa i calcular quant ocupa en total.",
    'Fer servir `box-sizing: border-box` perquè les mides siguin les que escrius.',
    "Centrar una caixa amb `margin: 0 auto`.",
  ],

  projectPiece:
    "Cada ruta es converteix en una targeta, amb aire per dins, vora i cantonades arrodonides, i tota la pàgina queda en una columna centrada.",

  finalProject:
    'Cada targeta de vídeo, cada botó i cada xip de la teva pàgina tipus YouTube és una caixa amb `padding`, vora i radi.',

  sections: [
    {
      id: 'tot-es-una-caixa',
      title: 'Tot és una caixa',
      blocks: [
        p("Normalment les caixes no es veuen. Un paràgraf sense color de fons ni vora sembla només text, però la seva caixa hi és: ocupa un lloc i empeny les altres. Per aprendre a maquetar, el primer que cal és **veure-les**."),
        p("Per això, a sobre de la pàgina de cada exemple i de cada exercici d'aquest dossier hi ha el botó **«Quadrats»**. Dibuixa el contorn de totes les caixes de la pàgina. És el mateix que fa qui maqueta quan una cosa no queda al seu lloc: mirar on comença i on acaba cada caixa."),
        example({
          title: 'Cada element, una caixa',
          intro: "Aquest exemple ja té els quadrats activats. Desactiva'ls i torna'ls a activar amb el botó: la pàgina és la mateixa, però ara en veus l'esquelet.",
          html: `<h1>Camins</h1>
<p>Rutes de muntanya per fer <strong>a peu</strong>, explicades pas a pas.</p>

<ul>
  <li>Camí de Ronda</li>
  <li>Vall de Núria</li>
</ul>

<p><a href="mapa.html">Mira el mapa</a></p>`,
          css: CSS_BASE,
          boxes: true,
          expected: "Un rectangle al voltant de cada element. El títol, els paràgrafs i la llista fan tota l'amplada de la pàgina. La paraula en negreta i l'enllaç tenen un rectangle petit, just de la mida del seu text.",
          why: "Cada rectangle és la caixa d'un element. Fixa't que el títol és molt més ample que la paraula «Camins», i que les caixes de dins de la llista són dins de la caixa de la llista: les caixes es fiquen les unes dins de les altres.",
        }),
        list(
          "Les caixes amb **línia discontínua** ocupen tota l'amplada i s'apilen: títols, paràgrafs, llistes.",
          "Les de **línia de punts** són trossos de text dins d'una línia: negretes, enllaços. Per què n'hi ha de dues menes ho veurem a la [unitat 6](#/unitat/display).",
          'Cada **color** és un nivell: les caixes de dins tenen un color diferent de la caixa que les conté.',
          'Les caixes que en contenen d\'altres, i les que tenen classe, porten el **nom** escrit en una cantonada.'
        ),
        concept(
          'Tot és un quadrat',
          "Quan miris una pàgina, acostuma't a veure-hi rectangles. Cada cosa que hi ha és una caixa, i cada caixa és dins d'una altra, fins a arribar al `<body>`, que és la caixa que les conté totes."
        ),
      ],
    },

    {
      id: 'les-quatre-parts',
      title: "Les quatre parts d'una caixa",
      blocks: [
        p("Totes les caixes estan fetes igual. Tenen quatre parts, l'una al voltant de l'altra, com les capes d'una ceba. De dins cap a fora:"),
        table(
          ['Part', 'Què és', 'Propietat'],
          [
            ['Contingut', 'El text o la imatge de l\'element', '`width` i `height`'],
            ['Padding', "L'aire entre el contingut i la vora. El color de fons també l'omple.", '`padding`'],
            ['Vora', 'La línia que envolta la caixa', '`border`'],
            ['Marge', "L'espai per fora de la vora, que separa la caixa de les veïnes. És transparent.", '`margin`'],
          ],
          'Les quatre parts, de dins cap a fora'
        ),
        example({
          title: 'Les quatre parts, a la vista',
          intro: "Cada caixa té un fons de color, una vora gruixuda, 16 píxels de `padding` i 24 de marge. Canvia els tres números, d'un en un, i mira quina part es mou.",
          html: `<p class="caixa">Camí de Ronda</p>
<p class="caixa">Vall de Núria</p>`,
          css: `${CSS_BASE}

.caixa {
  padding: 16px;
  border: 4px solid #1f6f54;
  margin: 24px;
  background-color: #e8f3ee;
}`,
          expected: 'Dues caixes de fons verd clar amb una vora verda gruixuda. El text queda separat de la vora, i les caixes queden separades de les vores de la pàgina i entre elles.',
          why: "El `padding` és de la caixa: es pinta amb el seu color de fons. El marge és de fora: sempre és transparent i s'hi veu el que hi ha al darrere. Entre les dues caixes hi ha 24 píxels i no 48: és una particularitat dels marges que veurem d'aquí a un moment.",
        }),
        custom('CssPlayground', {
          title: "Prova-ho: les parts d'una caixa",
          intro: "Mou els tres controls. Fixa't què creix cap endins, què creix cap enfora i què empeny la línia discontínua, que és la caixa de fora.",
          items: ['Camí de Ronda'],
          selector: '.pagina',
          highlight: 1,
          highlightSelector: '.targeta',
          highlightBase: { 'border-style': 'solid' },
          controls: [
            { target: 'item', prop: 'padding', min: 0, max: 40, step: 4, unit: 'px', initial: 12 },
            { target: 'item', prop: 'border-width', min: 0, max: 12, step: 1, unit: 'px', initial: 2 },
            { target: 'item', prop: 'margin', min: 0, max: 40, step: 4, unit: 'px', initial: 0 },
          ],
          height: 150,
        }),
        concept(
          'Per dins o per fora',
          "Abans d'escriure un espai, pregunta't a quin costat de la vora ha d'anar. Si és aire **dins** de la caixa, entre el text i la vora, és `padding`. Si és distància **entre** aquesta caixa i una altra, és `margin`."
        ),
      ],
    },

    {
      id: 'padding',
      title: 'Aire per dins: padding',
      blocks: [
        p("El primer problema de la web de rutes era el text enganxat a la vora del color de fons. Ara ja saps per què: la caixa fa exactament la mida del seu contingut. El `padding` la fa créixer cap enfora i deixa el contingut on era."),
        example({
          title: 'El text ja no toca la vora',
          intro: 'Esborra la línia del `padding` i torna-la a escriure.',
          html: `<p class="avis">A l'hivern, aquesta ruta només es pot fer amb material de neu.</p>`,
          css: `${CSS_BASE}

.avis {
  padding: 16px;
  background-color: #e8f3ee;
}`,
          expected: "Amb `padding`, el text té 16 píxels d'aire per tots quatre costats. Sense, les lletres toquen la vora del fons.",
          why: "El fons d'una caixa cobreix el contingut i el `padding`. Per això, en afegir `padding`, la zona de color creix i el text queda separat de la vora.",
        }),
        p("Amb un sol valor, el `padding` és igual als quatre costats. Però gairebé sempre en vols de diferents, i hi ha una manera curta d'escriure-ho: fins a quatre valors a la mateixa propietat."),
        table(
          ["Com s'escriu", 'Què vol dir'],
          [
            ['`padding: 16px;`', 'Els quatre costats, 16'],
            ['`padding: 8px 24px;`', 'A dalt i a baix, 8. A esquerra i dreta, 24.'],
            ['`padding: 4px 8px 12px 16px;`', 'A dalt, a la dreta, a baix i a l\'esquerra: com les agulles del rellotge'],
            ['`padding-left: 24px;`', 'Un sol costat. També hi ha `-top`, `-right` i `-bottom`.'],
          ],
          "Les quatre maneres d'escriure un padding. Amb margin funciona igual."
        ),
        example({
          title: 'Dos valors: vertical i horitzontal',
          intro: 'El títol té poc aire a dalt i a baix, i força als costats. Prova `padding: 8px 24px 8px 60px;` i, després, afegeix una línia nova amb `padding-left: 0;`.',
          html: `<h2>Rutes destacades</h2>
<p>Les tres rutes més visitades d'aquest mes.</p>`,
          css: `${CSS_BASE}

h2 {
  padding: 8px 24px;
  color: #ffffff;
  background-color: #1f6f54;
}`,
          expected: 'Una franja verda amb el títol en blanc, separat 24 píxels de la vora esquerra i 8 de dalt i de baix.',
          why: "Amb dos valors, el primer és per a dalt i a baix i el segon, per als costats. La forma de dos valors és la que escriuràs més sovint: botons, xips i etiquetes acostumen a tenir més aire als costats que a dalt.",
        }),
      ],
    },

    {
      id: 'border',
      title: 'La vora: border i border-radius',
      blocks: [
        p("La vora és la línia que dibuixa el límit de la caixa. S'escriu amb tres valors seguits: el **gruix**, l'**estil** i el **color**. L'estil més habitual és `solid`, una línia contínua; també hi ha `dashed` (discontínua) i `dotted` (de punts)."),
        p("Per tenir una caixa que agrupi el títol i les dades d'una ruta fem servir un `<div>`: una caixa sense cap significat propi, que només serveix per contenir-ne d'altres. La veurem amb calma a la [unitat següent](#/unitat/contenidors)."),
        example({
          title: 'Una targeta amb vora',
          intro: 'Canvia `solid` per `dashed`, puja el gruix a 6 píxels i posa el radi a 0.',
          html: HTML_TARGETA,
          css: `${CSS_BASE}

.targeta {
  padding: 16px;
  border: 2px solid #c9d6cf;
  border-radius: 12px;
}`,
          expected: 'El títol i les dades de la ruta dins d\'un rectangle de vora grisa i cantonades arrodonides.',
          why: "`border` dibuixa la línia als quatre costats, i `border-radius` diu quant s'arrodoneix cada cantonada. El `padding` separa el text de la vora: sense ell, les lletres la tocarien.",
        }),
        p("Igual que amb el `padding`, es pot posar vora a un sol costat: `border-top`, `border-right`, `border-bottom` i `border-left`. Una vora només a baix és una bona manera de subratllar un títol o de separar els elements d'una llista."),
        example({
          title: 'Cantonades arrodonides: del quadrat al cercle',
          intro: 'La foto de perfil és quadrada. Canvia `50%` per `12px` i, després, per `0`.',
          html: `<img class="avatar" src="imatges/avatar-1.png" alt="Foto de perfil de la Laia">
<p>Laia · 24 rutes fetes</p>`,
          css: `${CSS_BASE}

.avatar {
  width: 96px;
  border: 3px solid #1f6f54;
  border-radius: 50%;
}`,
          expected: 'La foto de perfil es veu rodona, amb una vora verda al voltant.',
          why: "Un radi del 50% arrodoneix cada cantonada fins a la meitat del costat: si la caixa és quadrada, queda un cercle. La caixa continua sent un rectangle (activa els quadrats i ho veuràs), però el que se'n pinta, no.",
        }),
        challenge({
          title: 'Una línia sota el títol',
          statement: "Subratlla el títol amb una vora: una línia contínua de 3 píxels, de color `#1f6f54`, **només a sota**. Entre el text i la línia hi ha d'haver 8 píxels d'aire.",
          html: `<h2>Rutes destacades</h2>
<p>Les tres rutes més visitades d'aquest mes.</p>`,
          css: `${CSS_BASE}

h2 {
  color: #1f6f54;
}`,
          hint: "Són dues declaracions, i totes dues parlen només del costat de baix: una vora (`border-bottom`) i un `padding` (`padding-bottom`).",
          solution: {
            css: `${CSS_BASE}

h2 {
  padding-bottom: 8px;
  color: #1f6f54;
  border-bottom: 3px solid #1f6f54;
}`,
          },
          explanation: "La línia va d'una banda a l'altra de la pàgina, no només sota les lletres: és la vora de la caixa del títol, i la caixa fa tota l'amplada. El `padding-bottom` és el que separa el text de la línia.",
          checks: [
            { label: 'El títol té una vora de 3 píxels a sota', selector: 'h2', style: { 'border-bottom': '3px solid #1f6f54' } },
            { label: 'No té vora ni a dalt ni als costats', selector: 'h2', style: { 'border-top-style': 'none', 'border-left-style': 'none', 'border-right-style': 'none' } },
            { label: 'Hi ha 8 píxels entre el text i la línia', selector: 'h2', style: { 'padding-bottom': '8px' } },
          ],
        }),
      ],
    },

    {
      id: 'margin',
      title: 'Espai per fora: margin',
      blocks: [
        p("El marge és l'espai que una caixa demana al seu voltant. No es pinta mai: és transparent. Serveix per separar una caixa de les que té al costat, i s'escriu amb les mateixes formes que el `padding`: un valor, dos, quatre o un sol costat."),
        example({
          title: 'Separar una targeta de la següent',
          intro: 'Esborra la línia `margin-bottom` i mira com queden les tres targetes. Activa els quadrats per veure on acaba cada una.',
          html: HTML_TRES_RUTES,
          css: `${CSS_BASE}

.targeta {
  margin-bottom: 16px;
  padding: 12px 16px;
  border: 1px solid #c9d6cf;
  border-radius: 8px;
}`,
          expected: 'Tres targetes apilades amb 16 píxels de separació. Sense el marge, queden enganxades i les vores es toquen.',
          why: "Cada targeta demana 16 píxels lliures a sota seu, i la següent ha de començar més avall. El `padding` no hauria servit: hauria fet cada targeta més alta, però haurien continuat tocant-se.",
        }),
        compare(
          {
            title: 'padding',
            lang: 'css',
            code: `.targeta {
  padding: 16px;
}`,
            text: 'Aire **dins** de la caixa. La caixa es fa més gran i el fons omple aquest espai.',
          },
          {
            title: 'margin',
            lang: 'css',
            code: `.targeta {
  margin: 16px;
}`,
            text: 'Distància **fora** de la caixa. La caixa fa el mateix, però les veïnes s\'allunyen.',
          }
        ),
        p("I l'espai en blanc de dalt de la pàgina, d'on surt? De marges que no has escrit tu. El navegador en posa pel seu compte: 8 píxels al voltant del `<body>`, i a dalt i a baix de cada títol, paràgraf i llista."),
        example({
          title: 'Els marges que no has escrit',
          intro: 'La franja verda toca les vores de la pàgina perquè hem posat els marges a zero. Esborra les dues línies `margin: 0;`, d\'una en una.',
          html: `<h1>Camins</h1>
<p>Rutes de muntanya per fer a peu.</p>`,
          css: `body {
  margin: 0;
  font-family: Arial, sans-serif;
}

h1 {
  margin: 0;
  color: #ffffff;
  background-color: #1f6f54;
}`,
          boxes: true,
          expected: "Amb els dos marges a zero, la franja verda toca la vora de dalt i els costats de la pàgina. Sense el del `<body>`, apareix una franja blanca de 8 píxels tot al voltant. Sense el del títol, apareix un espai a dalt i a baix de la franja.",
          why: "Aquests marges formen part dels estils del navegador, els mateixos que posen la lletra amb serifa i els enllaços en blau. Com qualsevol altre estil, una regla teva els substitueix. Gairebé tots els fulls d'estils comencen amb `body { margin: 0; }`.",
        }),
        warning(
          'Els marges verticals no se sumen',
          "Quan dues caixes apilades tenen marges que es toquen, el de baix de la primera i el de dalt de la segona, la separació no és la suma: és **el més gran dels dos**. Si una caixa demana 24 píxels a sota i la següent en demana 16 a sobre, entre elles n'hi ha 24, no 40. Es diu col·lapse de marges, i només passa en vertical. Per no haver-hi de pensar, molta gent posa els marges sempre al mateix costat, per exemple a baix."
        ),
      ],
    },

    {
      id: 'amplada',
      title: 'Amplada, alçada i box-sizing',
      blocks: [
        p("Una caixa com un títol o un `<div>` ocupa, si no li dius res, tota l'amplada que li deixa la caixa on és, i l'alçada justa del seu contingut. L'amplada es pot fixar amb `width`. Però `width` té una trampa que fa perdre moltes hores."),
        example({
          title: 'Una amplada que no és la que sembla',
          intro: "La targeta diu `width: 220px`. A sota hi ha un regle que fa exactament 220 píxels. Compara'ls.",
          html: HTML_TARGETA_REGLE,
          css: `${CSS_BASE}

.targeta {
  width: 220px;
  padding: 20px;
  border: 2px solid #1f6f54;
}

${CSS_REGLE}`,
          expected: 'La targeta és clarament més ampla que el regle: sobresurt 44 píxels.',
          why: "Per defecte, `width` mesura només el **contingut**. El `padding` i la vora s'hi afegeixen: 220 de contingut, més 20 i 20 de `padding`, més 2 i 2 de vora, fan 264 píxels. Cada cop que canvies el `padding`, la caixa canvia de mida.",
        }),
        p("Aquest comportament es pot canviar amb la propietat `box-sizing`. El valor per defecte és `content-box`: l'amplada és la del contingut. Amb `border-box`, l'amplada és la de **tota la caixa**, de vora a vora, i el `padding` creix cap endins."),
        custom('CssPlayground', {
          title: 'Prova-ho: box-sizing',
          intro: 'La targeta té `width: 200px`. Mou el `padding` amb cada valor de `box-sizing` i mira si la caixa es fa més ampla.',
          items: ['200 píxels?'],
          selector: '.pagina',
          highlight: 1,
          highlightSelector: '.targeta',
          highlightBase: { width: '200px', border: '2px solid' },
          controls: [
            { target: 'item', prop: 'box-sizing', options: ['content-box', 'border-box'] },
            { target: 'item', prop: 'padding', min: 0, max: 40, step: 4, unit: 'px', initial: 20 },
          ],
          height: 130,
        }),
        example({
          title: 'Amb border-box, la mida és la que escrius',
          intro: "És l'exemple d'abans amb una sola regla nova, la primera. Esborra-la i torna-la a escriure.",
          html: HTML_TARGETA_REGLE,
          css: `* {
  box-sizing: border-box;
}

${CSS_BASE}

.targeta {
  width: 220px;
  padding: 20px;
  border: 2px solid #1f6f54;
}

${CSS_REGLE}`,
          expected: 'La targeta fa exactament la mateixa amplada que el regle: 220 píxels de vora a vora.',
          why: "L'asterisc és un selector que tria **tots** els elements de la pàgina. Amb `border-box`, quan escrius 220 píxels la caixa en fa 220, tingui el `padding` que tingui.",
        }),
        concept(
          'La primera regla de tots els teus fulls d\'estils',
          "Comença sempre `estils.css` amb `* { box-sizing: border-box; }`. No té cap inconvenient i t'estalvia fer sumes cada vegada que toques un `padding`. Ho fa pràcticament tothom."
        ),
        list(
          "`max-width` posa un límit en lloc d'una mida fixa: la caixa fa l'amplada que pot, **com a màxim** la que dius. En una pantalla estreta s'encongeix sola, i per això sovint és millor que `width`.",
          "`height` fixa l'alçada, i gairebé mai convé. Si el text ocupa més línies de les previstes, sobresurt de la caixa. Deixa que l'alçada la decideixi el contingut i dona l'aire amb `padding`."
        ),
      ],
    },

    {
      id: 'centrar',
      title: 'Centrar una caixa: margin auto',
      blocks: [
        p("Ens queda l'última peça: que el contingut no vagi de punta a punta de la pantalla, sinó en una columna al mig. Per centrar una caixa d'esquerra a dreta, el valor del marge és `auto`: el navegador reparteix l'espai que sobra a parts iguals entre els dos costats."),
        example({
          title: 'La pàgina, en una columna centrada',
          intro: "Tot el contingut és dins d'una caixa amb la classe `pagina`. Canvia el `max-width` i esborra `margin: 0 auto;` per veure què fa cada línia.",
          html: `<div class="pagina">
  <h1>Camins</h1>

  <div class="targeta">
    <h2>Camí de Ronda</h2>
    <p>12 km · 3 h 30 min · Fàcil</p>
  </div>

  <div class="targeta">
    <h2>Vall de Núria</h2>
    <p>9 km · 3 h · Mitjana</p>
  </div>
</div>`,
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
  max-width: 420px;
  margin: 0 auto;
  padding: 16px;
}

h1 {
  color: #1f6f54;
}

.targeta {
  margin-bottom: 16px;
  padding: 16px;
  background-color: #ffffff;
  border: 1px solid #c9d6cf;
  border-radius: 12px;
}

.targeta h2 {
  margin: 0 0 4px;
  font-size: 20px;
}

.targeta p {
  margin: 0;
  color: #5b6b63;
}`,
          expected: 'Sobre un fons verd clar, una columna de 420 píxels al mig de la pàgina amb el títol i dues targetes blanques.',
          why: "`margin: 0 auto` vol dir: zero a dalt i a baix, automàtic als costats. Com que la caixa `.pagina` fa 420 píxels i la pàgina és més ampla, sobra espai, i `auto` el reparteix meitat a cada banda.",
        }),
        warning(
          'Sense amplada no hi ha res a centrar',
          "Una caixa sense `width` ni `max-width` ja ocupa tota l'amplada: no sobra espai i `auto` no té res a repartir. I `auto` només centra d'esquerra a dreta. Per centrar de dalt a baix caldran les eines de la [unitat 7](#/unitat/flexbox)."
        ),
        challenge({
          title: 'Centra la targeta',
          statement: "La targeta fa 240 píxels d'ample i queda enganxada a l'esquerra. Centra-la a la pàgina sense canviar-li la mida.",
          html: HTML_TARGETA,
          css: `* {
  box-sizing: border-box;
}

${CSS_BASE}

.targeta {
  width: 240px;
  padding: 16px;
  border: 1px solid #c9d6cf;
  border-radius: 12px;
}`,
          hint: 'És una sola declaració a `.targeta`. La caixa ja té amplada: només falta dir-li què ha de fer amb l\'espai que sobra als costats.',
          solution: {
            css: `* {
  box-sizing: border-box;
}

${CSS_BASE}

.targeta {
  width: 240px;
  margin: 0 auto;
  padding: 16px;
  border: 1px solid #c9d6cf;
  border-radius: 12px;
}`,
          },
          explanation: "Amb els marges dels costats en `auto`, el navegador mesura l'espai que queda lliure i en posa la meitat a cada banda. Si la pàgina es fa més ampla o més estreta, ho torna a calcular.",
          checks: [
            { label: 'La targeta està centrada a la pàgina', selector: '.targeta', centered: 'x' },
            { label: "Continua fent 240 píxels d'ample", selector: '.targeta', size: { width: 240 } },
          ],
        }),
        p("Quan una caixa no faci la mida que esperes, el navegador te la pot ensenyar desmuntada. Fes clic amb el botó dret sobre l'element, tria «Inspecciona» i busca el dibuix del model de caixa: quatre rectangles, l'un dins de l'altre, amb els píxels de contingut, `padding`, vora i marge. És el mateix que el botó «Quadrats», amb números."),
        project(
          "Amb el model de caixa, la web de rutes deixa de ser una llista de text. Cada ruta és una targeta i tot el contingut va en una columna centrada. Aquest és el full d'estils que s'afegeix al de la unitat anterior.",
          {
            title: 'Les caixes de la web de rutes',
            lang: 'css',
            code: `* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background-color: #e8f3ee;
}

.pagina {
  max-width: 720px;
  margin: 0 auto;
  padding: 24px 16px;
}

.targeta {
  margin-bottom: 16px;
  padding: 16px;
  background-color: #ffffff;
  border: 1px solid #c9d6cf;
  border-radius: 12px;
}`,
          }
        ),
      ],
    },
  ],

  commonErrors: [
    {
      title: 'Posar margin quan el que calia era padding',
      bad: `.avis {
  margin: 16px;
  background-color: #e8f3ee;
}`,
      badLang: 'css',
      symptom: "El text continua enganxat a la vora del fons de color. A més, la caixa s'ha fet més estreta i s'ha separat del que té al voltant.",
      why: "El marge és espai per fora de la caixa, i el fons no hi arriba. L'aire entre el text i la vora del color és dins de la caixa: és `padding`.",
      fix: `.avis {
  padding: 16px;
  background-color: #e8f3ee;
}`,
      fixLang: 'css',
    },
    {
      title: "Una vora sense estil",
      bad: `.targeta {
  border: 2px #c9d6cf;
}`,
      badLang: 'css',
      symptom: 'No es veu cap vora, encara que el gruix i el color estiguin ben escrits.',
      why: "L'estil d'una vora, si no es diu, és `none`: cap línia. De les tres parts de `border`, l'estil és l'única que no es pot ometre.",
      fix: `.targeta {
  border: 2px solid #c9d6cf;
}`,
      fixLang: 'css',
    },
    {
      title: 'Donar una amplada i oblidar que el padding s\'hi suma',
      bad: `.targeta {
  width: 300px;
  padding: 20px;
  border: 2px solid #c9d6cf;
}`,
      badLang: 'css',
      symptom: 'La targeta fa 344 píxels en lloc de 300 i no cap al lloc on havia d\'anar.',
      why: "Sense `box-sizing: border-box`, `width` és només l'amplada del contingut. El `padding` i la vora s'hi afegeixen pels dos costats: 300 + 40 + 4.",
      fix: `* {
  box-sizing: border-box;
}

.targeta {
  width: 300px;
  padding: 20px;
  border: 2px solid #c9d6cf;
}`,
      fixLang: 'css',
    },
    {
      title: 'margin: 0 auto en una caixa sense amplada',
      bad: `.pagina {
  margin: 0 auto;
}`,
      badLang: 'css',
      symptom: "No canvia res: el contingut continua anant d'una banda a l'altra de la pantalla.",
      why: "La caixa ja ocupa tota l'amplada disponible. No sobra espai als costats i `auto` no té res a repartir.",
      fix: `.pagina {
  max-width: 720px;
  margin: 0 auto;
}`,
      fixLang: 'css',
    },
    {
      title: "Fixar l'alçada d'una caixa amb text",
      bad: `.targeta {
  height: 60px;
  padding: 16px;
  border: 1px solid #c9d6cf;
}`,
      badLang: 'css',
      symptom: 'Quan el text ocupa més d\'una línia, surt per sota de la vora i trepitja el que ve després.',
      why: "La caixa fa l'alçada que li has dit, però el text necessita la que necessita, i en una pantalla estreta fa més línies. El contingut que no hi cap sobresurt.",
      fix: `.targeta {
  padding: 16px;
  border: 1px solid #c9d6cf;
}`,
      fixLang: 'css',
    },
  ],

  exercises: [
    {
      id: 'aire-per-dins',
      title: 'Aire per dins',
      statement: "El text de l'avís toca les vores del fons de color. Dona-li 16 píxels d'aire per dins, a tots quatre costats. El fons ha de continuar anant d'una banda a l'altra.",
      expected: 'L\'avís, amb el text separat 16 píxels de les vores del fons verd clar.',
      html: `<p class="avis">A l'hivern, aquesta ruta només es pot fer amb grampons i piolet.</p>`,
      css: `${CSS_BASE}

.avis {
  background-color: #e8f3ee;
}`,
      hint: "L'aire ha de quedar dins de la caixa, pintat amb el color de fons. Quina de les dues propietats és: la de dins o la de fora?",
      solution: {
        css: `${CSS_BASE}

.avis {
  padding: 16px;
  background-color: #e8f3ee;
}`,
      },
      explanation: "El `padding` fa créixer la caixa al voltant del text, i el fons omple aquest espai nou. Amb `margin`, el fons no s'hauria mogut i la caixa s'hauria fet més estreta.",
      checks: [
        {
          label: "L'avís té 16 píxels de padding a cada costat",
          selector: '.avis',
          style: { 'padding-top': '16px', 'padding-right': '16px', 'padding-bottom': '16px', 'padding-left': '16px' },
        },
        { label: "El fons continua anant d'una banda a l'altra", selector: '.avis', fills: 'x' },
      ],
    },
    {
      id: 'vora-i-cantonades',
      title: 'Vora i cantonades',
      statement: "Converteix aquesta ruta en una targeta. Posa-li una vora contínua d'1 píxel, de color `#c9d6cf`, als quatre costats, i arrodoneix les cantonades 12 píxels.",
      expected: 'El títol i les dades dins d\'un rectangle de vora fina i grisa, amb les cantonades arrodonides.',
      html: HTML_TARGETA,
      css: `${CSS_BASE}

.targeta {
  padding: 16px;
}`,
      hint: 'La vora s\'escriu amb tres valors seguits: gruix, estil i color. Les cantonades són una altra propietat.',
      solution: {
        css: `${CSS_BASE}

.targeta {
  padding: 16px;
  border: 1px solid #c9d6cf;
  border-radius: 12px;
}`,
      },
      explanation: "`border` posa la mateixa línia als quatre costats. L'estil (`solid`) és imprescindible: sense ell no es dibuixa res. `border-radius` arrodoneix les quatre cantonades alhora.",
      checks: [
        { label: "La targeta té una vora contínua d'1 píxel, de color #c9d6cf", selector: '.targeta', style: { border: '1px solid #c9d6cf' } },
        { label: 'Les cantonades estan arrodonides 12 píxels', selector: '.targeta', style: { 'border-radius': '12px' } },
      ],
    },
    {
      id: 'targetes-separades',
      title: 'Tres rutes ben separades',
      statement: [
        "Les tres rutes tenen fons de color, però el text toca les vores i les caixes estan enganxades.",
        "Dona a cada ruta 12 píxels d'aire a dalt i a baix i 20 als costats. I separa-les de manera que entre una ruta i la següent hi hagi 16 píxels.",
      ],
      expected: 'Tres franges de color verd clar, amb el text ben separat de les vores i un espai blanc de 16 píxels entre franja i franja.',
      html: `<p class="ruta">Camí de Ronda · 12 km</p>
<p class="ruta">Vall de Núria · 9 km</p>
<p class="ruta">Puigmal · 14 km</p>`,
      css: `${CSS_BASE}

.ruta {
  margin: 0;
  background-color: #e8f3ee;
  border-radius: 8px;
}`,
      hint: [
        "L'aire de dins és `padding`, i amb dos valors pots dir alhora el de dalt i baix i el dels costats.",
        'La separació entre caixes és `margin`. Ara val 0 a tot arreu: canvia-la perquè cada ruta demani 16 píxels a sota.',
      ],
      solution: {
        css: `${CSS_BASE}

.ruta {
  margin: 0 0 16px;
  padding: 12px 20px;
  background-color: #e8f3ee;
  border-radius: 8px;
}`,
      },
      explanation: "Són els dos espais de la unitat, cadascun amb la seva propietat. El `padding` de dos valors dona l'aire de dins. El marge de baix empeny la ruta següent 16 píxels més avall. Amb `margin: 16px 0` també hi hauria 16 píxels entre elles, i no 32: els marges verticals que es toquen no se sumen.",
      checks: [
        {
          label: 'Cada ruta té 12 píxels de padding a dalt i a baix',
          selector: '.ruta',
          all: true,
          style: { 'padding-top': '12px', 'padding-bottom': '12px' },
        },
        {
          label: 'Cada ruta té 20 píxels de padding als costats',
          selector: '.ruta',
          all: true,
          style: { 'padding-left': '20px', 'padding-right': '20px' },
        },
        { label: 'Hi ha 16 píxels entre ruta i ruta', selector: '.ruta', arrange: 'column', gap: 16 },
      ],
    },
    {
      id: 'la-mida-exacta',
      title: 'La mida exacta',
      statement: "La targeta hauria de fer 260 píxels d'ample en total, com el regle de sota, però en fa 304. Fes que mesuri exactament 260 píxels de vora a vora, **sense treure-li ni el padding ni la vora**.",
      expected: 'La targeta i el regle fosc de sota fan exactament la mateixa amplada.',
      html: `<div class="targeta">
  <h2>Vall de Núria</h2>
  <p>9 km · 3 h · Mitjana</p>
</div>

<p class="regle">260 píxels</p>`,
      css: `${CSS_BASE}

.targeta {
  width: 260px;
  padding: 20px;
  border: 2px solid #1f6f54;
}

.regle {
  width: 260px;
  margin: 4px 0 0;
  font-size: 13px;
  text-align: center;
  color: #ffffff;
  background-color: #23312b;
}`,
      hint: "D'on surten els 44 píxels de més? Hi ha una propietat que fa que `width` compti tota la caixa i no només el contingut.",
      solution: {
        css: `${CSS_BASE}

.targeta {
  box-sizing: border-box;
  width: 260px;
  padding: 20px;
  border: 2px solid #1f6f54;
}

.regle {
  width: 260px;
  margin: 4px 0 0;
  font-size: 13px;
  text-align: center;
  color: #ffffff;
  background-color: #23312b;
}`,
      },
      explanation: "Amb `content-box`, els 260 píxels eren només el contingut, i el `padding` (20 + 20) i la vora (2 + 2) s'hi sumaven. Amb `border-box`, els 260 són tota la caixa. També funcionaria restar a mà i escriure `width: 216px`, però hauries de refer el compte cada vegada que toquessis el `padding`.",
      checks: [
        { label: 'La targeta fa 260 píxels de vora a vora', selector: '.targeta', size: { width: 260 } },
        { label: 'Conserva els 20 píxels de padding', selector: '.targeta', style: { 'padding-left': '20px', 'padding-right': '20px' } },
        { label: 'Conserva la vora de 2 píxels', selector: '.targeta', style: { 'border-left': '2px solid #1f6f54' } },
      ],
    },
  ],

  finalExercise: {
    id: 'targeta-de-ruta',
    title: "La targeta d'una ruta",
    statement: [
      "Munta la targeta completa d'una ruta. L'HTML ja està escrit i els colors i les lletres també: et falten les caixes. Activa els quadrats a la pestanya «Objectiu» i fixa't on comença i on acaba cada una.",
      "La targeta ha de fer 280 píxels d'ample en total i quedar centrada a la pàgina. Té 16 píxels de `padding`, una vora contínua d'1 píxel de color `#c9d6cf` i les cantonades arrodonides 12 píxels.",
      "La foto fa 640 píxels i se surt de la targeta: ha d'ocupar el 100% de l'amplada que li deixa la targeta i tenir les cantonades arrodonides 8 píxels. L'etiqueta de la dificultat ha de fer 80 píxels d'ample, amb 4 píxels de `padding` a dalt i a baix i les cantonades arrodonides 12 píxels.",
    ],
    expected: 'Una targeta blanca i estreta al mig de la pàgina, amb la foto a dalt de vora a vora del contingut, el títol, les dades i una etiqueta verda arrodonida que diu «Fàcil».',
    boxes: true,
    html: `<div class="targeta">
  <img src="imatges/ruta-1.jpg" alt="Un camí arran de mar">
  <h2>Camí de Ronda</h2>
  <p class="dades">12 km · 3 h 30 min</p>
  <p class="dificultat">Fàcil</p>
</div>`,
    css: `* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 16px;
  font-family: Arial, sans-serif;
  color: #23312b;
  background-color: #e8f3ee;
}

.targeta {
  background-color: #ffffff;
}

.targeta img {
  /* La foto ha d'omplir l'amplada de la targeta */
}

.targeta h2 {
  margin: 12px 0 4px;
  font-size: 20px;
}

.dades {
  margin: 0 0 12px;
  font-size: 14px;
  color: #5b6b63;
}

.dificultat {
  margin: 0;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  color: #ffffff;
  background-color: #1f6f54;
}`,
    hint: [
      'Comença per `.targeta`: una amplada, un marge que la centri, `padding`, vora i radi. Són cinc declaracions.',
      "Per a la foto, `width: 100%` vol dir «tota l'amplada del contingut de la caixa on soc». L'etiqueta és un paràgraf: sense `width` ocuparia tota la targeta.",
    ],
    solution: {
      css: `* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 16px;
  font-family: Arial, sans-serif;
  color: #23312b;
  background-color: #e8f3ee;
}

.targeta {
  width: 280px;
  margin: 0 auto;
  padding: 16px;
  background-color: #ffffff;
  border: 1px solid #c9d6cf;
  border-radius: 12px;
}

.targeta img {
  width: 100%;
  border-radius: 8px;
}

.targeta h2 {
  margin: 12px 0 4px;
  font-size: 20px;
}

.dades {
  margin: 0 0 12px;
  font-size: 14px;
  color: #5b6b63;
}

.dificultat {
  width: 80px;
  margin: 0;
  padding: 4px 0;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  color: #ffffff;
  background-color: #1f6f54;
  border-radius: 12px;
}`,
    },
    explanation: [
      "La targeta és una caixa amb les quatre parts: una amplada, `padding`, vora i un marge `auto` que la centra. Gràcies a `border-box`, els 280 píxels són de vora a vora.",
      "La foto i l'etiqueta són caixes de dins de la targeta. La foto pren l'amplada del contingut de la targeta (280 menys el `padding` i la vora), i per això no cal saber quants píxels fa. L'etiqueta és un paràgraf amb amplada pròpia i les cantonades tan arrodonides que sembla una píndola.",
    ],
    checks: [
      { label: 'La targeta fa 280 píxels de vora a vora', selector: '.targeta', size: { width: 280 } },
      { label: 'La targeta està centrada a la pàgina', selector: '.targeta', centered: 'x' },
      { label: 'Té 16 píxels de padding', selector: '.targeta', style: { 'padding-top': '16px', 'padding-left': '16px', 'padding-right': '16px', 'padding-bottom': '16px' } },
      { label: "Té una vora contínua d'1 píxel, de color #c9d6cf, i les cantonades de 12 píxels", selector: '.targeta', style: { border: '1px solid #c9d6cf', 'border-radius': '12px' } },
      { label: "La foto omple l'amplada de la targeta, sense sortir-ne", selector: '.targeta img', fills: 'x' },
      { label: 'La foto té les cantonades arrodonides 8 píxels', selector: '.targeta img', style: { 'border-radius': '8px' } },
      { label: "L'etiqueta fa 80 píxels d'ample", selector: '.dificultat', size: { width: 80 } },
      { label: "L'etiqueta té 4 píxels de padding a dalt i a baix i les cantonades de 12 píxels", selector: '.dificultat', style: { 'padding-top': '4px', 'padding-bottom': '4px', 'border-radius': '12px' } },
    ],
  },

  summary: [
    'Per al navegador, **cada element és una caixa rectangular**. El botó «Quadrats» les dibuixa totes.',
    "Una caixa té quatre parts, de dins cap a fora: contingut, `padding`, vora i marge.",
    "`padding` és l'aire de **dins** de la caixa, i el fons també l'omple. `margin` és l'espai de **fora**, sempre transparent.",
    "Tots dos s'escriuen amb un valor (els quatre costats), dos (vertical i horitzontal), quatre (com el rellotge) o un sol costat (`padding-left`).",
    "`border` necessita gruix, estil i color. `border-radius` arrodoneix les cantonades; amb `50%`, un quadrat es fa cercle.",
    "Amb `* { box-sizing: border-box; }`, `width` és l'amplada de tota la caixa, i el `padding` ja no la fa créixer.",
    "Una caixa amb amplada (`width` o `max-width`) es centra amb `margin: 0 auto`. Els marges verticals que es toquen no se sumen: es queda el més gran.",
  ],

  quiz: [
    {
      question: 'Quin és l\'ordre de les parts d\'una caixa, de dins cap a fora?',
      options: [
        { text: 'Contingut, padding, vora, marge', correct: true },
        { text: 'Contingut, marge, vora, padding', why: 'El marge és la part de més enfora: és l\'espai que separa la caixa de les altres.' },
        { text: 'Padding, contingut, marge, vora', why: 'El contingut és al centre de tot, i el padding l\'envolta.' },
        { text: 'Contingut, vora, padding, marge', why: 'El padding queda entre el contingut i la vora, no a fora de la vora.' },
      ],
      explanation: 'El contingut és al mig. El padding l\'envolta, la vora envolta el padding i el marge queda per fora de tot.',
    },
    {
      question: 'Una caixa té color de fons i el text toca la vora del color. Quina propietat hi posa aire?',
      options: [
        { text: '`padding`', correct: true },
        { text: '`margin`', why: 'El marge és per fora de la caixa: el fons no hi arriba i el text continuaria enganxat a la vora.' },
        { text: '`border-radius`', why: 'Arrodoneix les cantonades, però no separa el text de la vora.' },
        { text: '`width`', why: 'Faria la caixa més ampla, però el text continuaria començant arran de la vora esquerra.' },
      ],
      explanation: 'L\'aire entre el contingut i la vora de la caixa és el padding, i es pinta amb el color de fons.',
    },
    {
      question: 'Què vol dir `padding: 8px 24px;`?',
      options: [
        { text: '8 píxels a dalt i a baix, 24 a esquerra i dreta', correct: true },
        { text: '8 píxels a l\'esquerra i 24 a la dreta', why: 'Amb dos valors, el primer és el vertical (dalt i baix) i el segon, l\'horitzontal.' },
        { text: '8 píxels a dalt i 24 a baix', why: 'El primer valor serveix alhora per a dalt i per a baix; el segon, per als dos costats.' },
        { text: '8 píxels als costats, 24 a dalt i a baix', why: 'És a l\'inrevés: primer el vertical, després l\'horitzontal.' },
      ],
      explanation: 'Amb dos valors: primer dalt i baix, després esquerra i dreta. Amb quatre, es comença per dalt i es gira com les agulles del rellotge.',
    },
    {
      question: 'Una caixa té `width: 200px`, `padding: 20px` i `border: 5px solid`. No hi ha cap regla de `box-sizing`. Quant fa d\'ample en total?',
      options: [
        { text: '250 píxels', correct: true },
        { text: '200 píxels', why: 'Això passaria amb `border-box`. Per defecte, `width` només compta el contingut.' },
        { text: '225 píxels', why: 'El padding i la vora hi són als dos costats: cal sumar-los dues vegades.' },
        { text: '240 píxels', why: 'Falta la vora: 5 píxels a cada costat.' },
      ],
      explanation: '200 de contingut, més 20 + 20 de padding, més 5 + 5 de vora: 250. Amb `box-sizing: border-box` en faria 200.',
    },
    {
      question: 'Dues caixes estan apilades. La de dalt té `margin-bottom: 24px` i la de baix, `margin-top: 16px`. Quants píxels les separen?',
      options: [
        { text: '24, perquè els marges verticals que es toquen no se sumen: es queda el més gran', correct: true },
        { text: '40, la suma dels dos marges', why: 'Seria així en horitzontal. En vertical, els marges que es toquen es fonen en un de sol.' },
        { text: '16, perquè guanya el marge més petit', why: 'Es queda el més gran dels dos, no el més petit.' },
        { text: '8, la diferència entre els dos', why: 'Els marges no es resten: es conserva el més gran.' },
      ],
      explanation: 'És el col·lapse de marges: entre dues caixes apilades, la separació és el més gran dels dos marges que es toquen.',
    },
    {
      question: 'Has escrit `.pagina { margin: 0 auto; }` i la caixa no es centra. Què hi falta?',
      options: [
        { text: 'Una amplada (`width` o `max-width`): sense ella, la caixa ja ocupa tot l\'espai', correct: true },
        { text: '`text-align: center`', why: 'Centra el text de dins de la caixa, no la caixa.' },
        { text: '`padding: auto`', why: 'El padding no admet `auto`, i en tot cas és aire per dins: no mou la caixa.' },
        { text: 'Escriure `margin: auto 0`', why: 'Això posaria `auto` a dalt i a baix i zero als costats: just a l\'inrevés del que cal.' },
      ],
      explanation: '`auto` reparteix l\'espai que sobra als costats. Una caixa sense amplada ocupa tota la línia i no en sobra gens.',
    },
  ],
};
