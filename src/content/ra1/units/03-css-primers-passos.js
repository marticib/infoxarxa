import { p, list, html, css, example, concept, warning, challenge, project, table, compare } from '../../blocks.js';

// La pàgina de rutes amb què treballen gairebé tots els exemples de la unitat.
const HTML_RUTES = `<h1>Camins</h1>
<p>Rutes de muntanya per fer a peu, explicades pas a pas.</p>

<h2>Camí de Ronda</h2>
<p>12 km · 3 h 30 min · Fàcil</p>

<h2>Pica d'Estats</h2>
<p>18 km · 9 h · Difícil</p>`;

// La mateixa pàgina, amb una classe als paràgrafs de dades.
const HTML_RUTES_CLASSES = `<h1>Camins</h1>
<p>Rutes de muntanya per fer a peu, explicades pas a pas.</p>

<h2>Camí de Ronda</h2>
<p class="dades">12 km · 3 h 30 min · Fàcil</p>

<h2>Pica d'Estats</h2>
<p class="dades">18 km · 9 h · Difícil</p>`;

const HTML_MENU = `<ul class="menu">
  <li><a href="index.html">Rutes</a></li>
  <li><a href="mapa.html">Mapa</a></li>
  <li><a href="consells.html">Consells</a></li>
</ul>

<p>Abans de sortir, llegeix <a href="consells.html">els consells de seguretat</a>.</p>`;

// La pàgina sencera de l'exercici final.
const HTML_PAGINA = `<h1>Camins</h1>
<p class="subtitol">Rutes de muntanya per fer a peu</p>

<ul class="menu">
  <li><a href="index.html">Rutes</a></li>
  <li><a href="mapa.html">Mapa</a></li>
  <li><a href="consells.html">Consells</a></li>
</ul>

<h2>Rutes destacades</h2>

<h3>Camí de Ronda</h3>
<p class="dades">12 km · 3 h 30 min · Fàcil</p>

<h3>Vall de Núria</h3>
<p class="dades">9 km · 3 h · Mitjana</p>

<p>Tens dubtes? Llegeix <a href="consells.html">els consells</a> abans de sortir.</p>`;

export const glossary = [
  {
    term: "Full d'estils",
    definition:
      "Fitxer amb les regles de CSS d'una web, normalment `estils.css`. Es connecta a cada pàgina amb `<link rel=\"stylesheet\">` dins del `<head>`.",
  },
  {
    term: 'Regla',
    definition:
      "La unitat bàsica del CSS: un selector i, entre claus, les declaracions que s'apliquen als elements que tria. `h1 { color: green; }` és una regla.",
  },
  {
    term: 'Selector',
    definition:
      "La part d'una regla que diu a quins elements s'aplica: una etiqueta (`p`), una classe (`.dades`), un id (`#avis`) o una combinació (`.menu a`).",
  },
  {
    term: 'Declaració',
    definition: "Una parella de propietat i valor, acabada en punt i coma: `color: #1f6f54;`. Diu què canvia i com queda.",
  },
  {
    term: 'Classe',
    definition:
      "Nom que es posa a un element amb l'atribut `class` per poder-lo triar des del CSS amb un punt al davant. La mateixa classe pot ser a molts elements, i un element pot tenir diverses classes.",
  },
  {
    term: 'Cascada',
    definition:
      'La manera com el navegador decideix quina regla guanya quan dues donen valors diferents a la mateixa propietat: primer la més específica i, si empaten, la que està escrita més avall.',
  },
  {
    term: 'Especificitat',
    definition: "La força d'un selector. Una classe pesa més que una etiqueta, i un id pesa més que una classe.",
  },
  {
    term: 'Herència',
    definition:
      "Algunes propietats, sobretot les del text (`color`, `font-family`, `font-size`), passen d'un element a tot el que té a dins. Per això es poden escriure una sola vegada al `<body>`.",
  },
];

export default {
  id: 'css-primers-passos',
  number: 3,
  title: 'CSS: donar estil a la pàgina',
  shortTitle: 'CSS: donar estil',
  description:
    "Com es decideix l'aspecte d'una pàgina: on s'escriu el CSS, com és una regla, com es trien els elements i com es canvien els colors i la lletra.",

  problem: {
    title: 'La pàgina ho té tot, però sembla un document de fa trenta anys',
    text: [
      "La web de rutes ja té títols, paràgrafs, enllaços, imatges i llistes. Tot hi és i tot està ben etiquetat. Però es veu amb una lletra de diari antic, negre sobre blanc, i amb els enllaços blaus i subratllats. Qualsevol pàgina del món, sense res més, es veu així.",
      "No és que l'hàgim escrit malament. L'HTML diu **què és** cada cosa: això és un títol, això és una llista. No diu **com s'ha de veure**. El que estem veient són els estils que el navegador posa pel seu compte quan ningú li diu res.",
      "Dir-li com volem la pàgina és feina d'un altre llenguatge, el CSS. Funciona amb una idea molt simple que repetirem milers de vegades: **tria uns elements i digues com els vols**.",
    ],
  },

  goals: [
    "Connectar un full d'estils a una pàgina amb `<link>`.",
    'Llegir i escriure una regla de CSS: selector, propietat i valor.',
    "Triar elements amb selectors d'etiqueta, de classe i de descendent.",
    "Canviar els colors, la lletra i l'alineació del text.",
    'Explicar quina regla guanya quan dues es contradiuen.',
    "Canviar l'aspecte d'un element quan hi passa el ratolí amb `:hover`.",
  ],

  projectPiece:
    "La web de rutes deixa de veure's amb els estils del navegador: té els seus colors i la seva lletra, escrits en un sol fitxer `estils.css` i aplicats amb classes.",

  finalProject:
    "Tot l'aspecte de la teva pàgina tipus YouTube sortirà d'un sol `estils.css`, amb una classe per a cada peça.",

  sections: [
    {
      id: 'on-s-escriu',
      title: "On s'escriu el CSS",
      blocks: [
        p("El CSS es pot escriure en tres llocs. Tots tres funcionen, però només un serveix per fer una web de veritat. Comencem pel més directe: l'atribut `style`, que es posa a l'etiqueta que es vol canviar."),
        example({
          title: 'El color, escrit a cada etiqueta',
          intro: "Els tres títols són verds perquè cadascun porta el color a l'atribut `style`. Ara imagina que et demanen canviar el verd per un vermell, `#b3261e`. Fes-ho.",
          html: `<h1 style="color: #1f6f54;">Camins</h1>
<p>Rutes de muntanya per fer a peu.</p>

<h2 style="color: #1f6f54;">Camí de Ronda</h2>
<p>12 km · 3 h 30 min · Fàcil</p>

<h2 style="color: #1f6f54;">Pica d'Estats</h2>
<p>18 km · 9 h · Difícil</p>`,
          expected: "Tres títols verds. Per canviar-los de color has hagut de tocar tres línies, una per una.",
          why: "L'atribut `style` només afecta l'etiqueta on està escrit. Amb tres títols és pesat; amb una web de vint pàgines i cent títols, és impossible de mantenir.",
        }),
        p("Les altres dues maneres treuen el CSS de les etiquetes i el posen a part, i així una sola instrucció pot servir per a molts elements alhora."),
        compare(
          {
            title: "A l'atribut style",
            tone: 'bad',
            lang: 'html',
            code: `<h1 style="color: #1f6f54;">Camins</h1>`,
            text: "Barreja el contingut amb l'aspecte i s'ha de repetir a cada etiqueta.",
          },
          {
            title: 'En un bloc <style>',
            lang: 'html',
            code: `<head>
  <style>
    h1 {
      color: #1f6f54;
    }
  </style>
</head>`,
            text: "Serveix per a tota la pàgina, però només per a aquella. Cada pàgina de la web hauria de repetir-lo.",
          },
          {
            title: 'En un fitxer a part',
            tone: 'good',
            lang: 'html',
            code: `<head>
  <link rel="stylesheet" href="estils.css">
</head>`,
            text: 'Un sol fitxer per a totes les pàgines. És la que farem servir sempre.',
          }
        ),
        p("La tercera és la bona. El CSS viu en un fitxer propi, que per costum es diu `estils.css`, i cada pàgina el demana amb una etiqueta `<link>` dins del `<head>`. L'atribut `rel=\"stylesheet\"` diu que és un full d'estils, i `href`, on és el fitxer: funciona igual que l'`href` d'un enllaç."),
        example({
          title: 'Un fitxer a part: estils.css',
          intro: "Aquest exemple és un document sencer. La pestanya `estils.css` és el fitxer que demana el `<link>`. Esborra la línia del `<link>` i mira què passa. Després torna-la a escriure.",
          fileNames: { html: 'index.html', css: 'estils.css' },
          focus: 'html',
          html: `<!DOCTYPE html>
<html lang="ca">
  <head>
    <meta charset="UTF-8">
    <title>Camins</title>
    <link rel="stylesheet" href="estils.css">
  </head>
  <body>
    <h1>Camins</h1>
    <p>Rutes de muntanya per fer a peu.</p>

    <h2>Camí de Ronda</h2>
    <p>12 km · 3 h 30 min · Fàcil</p>
  </body>
</html>`,
          css: `h1 {
  color: #1f6f54;
}

h2 {
  color: #1f6f54;
}`,
          expected: "Amb el `<link>`, els dos títols són verds. Sense, la pàgina torna a veure's amb els estils del navegador, encara que `estils.css` continuï ple de regles.",
          why: "Un full d'estils que cap pàgina demana no fa res. El `<link>` és el que connecta els dos fitxers. Fixa't també que cap etiqueta del `<body>` parla de colors: l'HTML ha quedat net.",
        }),
        warning(
          'El nom ha de ser exactament el del fitxer',
          "Si al `<link>` escrius `estil.css` i el fitxer es diu `estils.css`, el navegador no el troba i no diu res: la pàgina simplement surt sense estils. Prova-ho a l'exemple de dalt: aquí el dossier t'avisa, però en un projecte de veritat no t'avisarà ningú. Quan una pàgina surti sense cap estil, el primer que has de mirar és aquesta línia."
        ),
        concept(
          "Un sol full d'estils per a tota la web",
          "Totes les pàgines d'una web demanen el mateix `estils.css`. Així comparteixen l'aspecte, i canviar un color en un sol fitxer el canvia a tot arreu."
        ),
        p("A partir d'ara, als exemples només escriurem el que va dins del `<body>`, com fins ara. La resta del document i el `<link>` els hi posa el dossier: la pestanya CSS és sempre l'`estils.css` de la pàgina."),
      ],
    },

    {
      id: 'la-regla',
      title: "Anatomia d'una regla",
      blocks: [
        p("Un full d'estils és una llista de **regles**. Totes tenen la mateixa forma: primer es diu a qui va dirigida i després, entre claus, què se li canvia."),
        css(`h1 {
  color: #1f6f54;
  font-size: 40px;
}`),
        list(
          "`h1` és el **selector**: tria els elements als quals s'aplica la regla. Aquí, tots els `<h1>`.",
          'Les **claus** `{ }` marquen on comença i on acaba la regla.',
          "A dins hi ha les **declaracions**, una per línia. Cada declaració és una **propietat** (`color`), dos punts, un **valor** (`#1f6f54`) i un punt i coma."
        ),
        example({
          title: 'Dues regles, tres declaracions',
          intro: "Canvia els valors: prova un altre color, una lletra de 60 píxels. Després afegeix una declaració nova al paràgraf, per exemple `font-size: 20px;`.",
          html: `<h1>Camins</h1>
<p>Rutes de muntanya per fer a peu, explicades pas a pas.</p>`,
          css: `/* El títol de la web */
h1 {
  color: #1f6f54;
  font-size: 40px;
}

p {
  color: #5b6b63;
}`,
          expected: 'Un títol gros i verd i, a sota, un paràgraf de color gris.',
          why: "Cada regla tria uns elements i els canvia el que diuen les seves declaracions. El que no es menciona es queda com estava: el paràgraf continua tenint la mida que li posa el navegador. El text entre `/*` i `*/` és un comentari: el navegador se'l salta.",
        }),
        warning(
          "El CSS no dona errors: ignora el que no entén",
          "Si t'equivoques en una paraula (`colour`, `font-sice`) o et deixes el punt i coma, el navegador no mostra cap missatge. Salta aquella declaració i continua amb la següent. Quan un estil no s'apliqui, repassa primer l'ortografia i la puntuació d'aquella línia."
        ),
      ],
    },

    {
      id: 'selectors',
      title: 'Triar elements: etiqueta, classe i id',
      blocks: [
        p("El selector més senzill és el nom d'una etiqueta. És còmode, però tria **tots** els elements d'aquell tipus, i sovint això és massa."),
        example({
          title: "Un selector d'etiqueta els tria tots",
          intro: 'Volem que les dades de cada ruta (distància, temps, dificultat) es vegin petites i grises. Mira què li passa al primer paràgraf.',
          html: HTML_RUTES,
          css: `p {
  font-size: 14px;
  color: #5b6b63;
}`,
          expected: "Les dades de les rutes queden petites i grises. Però la frase de presentació, que també és un paràgraf, s'ha fet petita igualment.",
          why: 'El selector `p` no sap res de rutes ni de presentacions: tria tots els `<p>` de la pàgina. Necessitem una manera de dir «aquests paràgrafs sí, aquell no».',
        }),
        p("Aquesta manera són les **classes**. A l'HTML, poses un nom als elements que t'interessen amb l'atribut `class`. Al CSS, els tries escrivint aquell nom amb un **punt** al davant."),
        example({
          title: 'Una classe per a les dades de cada ruta',
          intro: "Els dos paràgrafs de dades porten `class=\"dades\"` (mira la pestanya HTML). La regla comença amb `.dades`, amb el punt.",
          html: HTML_RUTES_CLASSES,
          css: `.dades {
  font-size: 14px;
  color: #5b6b63;
}`,
          expected: 'Només les dues línies de dades són petites i grises. La presentació torna a tenir la mida normal.',
          why: "La classe la tries tu: el nom i a quins elements la poses. La mateixa classe pot ser a tants elements com vulguis, i no cal que siguin de la mateixa etiqueta.",
        }),
        table(
          ['Selector', "Com s'escriu", 'Què tria'],
          [
            ["D'etiqueta", '`p`', 'Tots els elements `<p>`'],
            ['De classe', '`.dades`', 'Tots els elements amb `class="dades"`'],
            ["D'id", '`#avis`', "L'únic element amb `id=\"avis\"`"],
          ],
          'Els tres selectors bàsics'
        ),
        p("L'`id` és un nom que només pot tenir **un** element a tota la pàgina, i al CSS es tria amb un coixinet. Per donar estil gairebé no el farem servir: una classe fa la mateixa feina i es pot reutilitzar. Els `id` serveixen per a altres coses, com enllaçar amb un punt concret de la pàgina."),
        concept(
          'Les classes són el teu vocabulari',
          "Posa noms que diguin **què és** l'element, no com es veu: `dades`, `menu`, `avis`. Si en dius `gris-petit` i demà decideixes que ha de ser verd i gros, el nom mentirà. Un element pot tenir més d'una classe, separades per un espai: `class=\"dades dificil\"`."
        ),
        warning(
          "El punt va al CSS, no a l'HTML",
          "A l'HTML s'escriu `class=\"dades\"`. Al CSS, `.dades`. Si escrius `class=\".dades\"`, la classe es diu literalment «.dades», amb el punt inclòs, i la regla no la troba."
        ),
        challenge({
          title: 'Marca la ruta difícil',
          statement: "La Pica d'Estats és una ruta difícil i s'ha de notar. Afegeix la classe `dificil` al seu paràgraf de dades, **sense treure-li la classe `dades`**, i escriu una regla que posi els elements d'aquesta classe en negreta i amb el fons de color `#f6d9d6`.",
          html: HTML_RUTES_CLASSES,
          css: `.dades {
  font-size: 14px;
  color: #5b6b63;
}`,
          focus: 'html',
          hint: [
            "Un element pot tenir dues classes: s'escriuen dins del mateix atribut, separades per un espai.",
            'Al CSS cal una regla nova amb el selector `.dificil` i dues declaracions: `font-weight` i `background-color`.',
          ],
          solution: {
            html: `<h1>Camins</h1>
<p>Rutes de muntanya per fer a peu, explicades pas a pas.</p>

<h2>Camí de Ronda</h2>
<p class="dades">12 km · 3 h 30 min · Fàcil</p>

<h2>Pica d'Estats</h2>
<p class="dades dificil">18 km · 9 h · Difícil</p>`,
            css: `.dades {
  font-size: 14px;
  color: #5b6b63;
}

.dificil {
  font-weight: bold;
  background-color: #f6d9d6;
}`,
          },
          explanation: "El paràgraf de la Pica d'Estats rep les dues regles: de `.dades` en treu la mida i el color, i de `.dificil`, la negreta i el fons. Les regles se sumen. L'altra ruta només té la classe `dades` i no canvia.",
          checks: [
            { label: 'Hi ha un sol element amb la classe dificil', selector: '.dificil', count: 1 },
            { label: "És el paràgraf de la Pica d'Estats, i conserva la classe dades", selector: '.dades.dificil', text: 'Difícil' },
            { label: 'Es veu en negreta', selector: '.dificil', style: { 'font-weight': '700' } },
            { label: 'Té el fons de color #f6d9d6', selector: '.dificil', style: { 'background-color': '#f6d9d6' } },
            { label: "L'altra ruta no ha canviat", selector: '.dades:not(.dificil)', all: true, style: { 'font-weight': '400' } },
          ],
        }),
      ],
    },

    {
      id: 'combinar-selectors',
      title: 'Combinar selectors: «dins de» i «també»',
      blocks: [
        p("Els selectors es poden combinar. Les dues combinacions que faràs servir cada dia són un **espai** i una **coma**, i volen dir coses ben diferents."),
        p("Un espai entre dos selectors es llegeix «dins de». `.menu a` tria els enllaços que hi ha **dins** d'un element amb la classe `menu`, i cap altre."),
        example({
          title: 'Només els enllaços del menú',
          intro: "A la pàgina hi ha quatre enllaços: tres al menú i un al paràgraf de sota. Mira quins canvien.",
          html: HTML_MENU,
          css: `.menu a {
  font-weight: bold;
  color: #1f6f54;
}`,
          expected: "Els tres enllaços del menú són verds i en negreta. L'enllaç del paràgraf continua blau, com el posa el navegador.",
          why: "L'enllaç del paràgraf és un `<a>`, però no és dins de `.menu`: la regla no el tria. Fixa't que no hem hagut de posar cap classe als enllaços. N'hi ha prou de posar-ne una al seu contenidor.",
        }),
        p("Una coma es llegeix «i també». Serveix per aplicar les mateixes declaracions a diversos selectors sense haver d'escriure-les dues vegades."),
        example({
          title: 'Una sola regla per a tots els títols',
          intro: 'Els `<h1>` i els `<h2>` comparteixen color i tipus de lletra. Afegeix `, p` al selector i mira què passa.',
          html: HTML_RUTES,
          css: `h1,
h2 {
  font-family: Georgia, serif;
  color: #1f6f54;
}`,
          expected: 'El títol principal i els dos títols de ruta són verds i amb la mateixa lletra. Els paràgrafs no canvien.',
          why: 'És el mateix que escriure dues regles iguals, una per a `h1` i una altra per a `h2`. Si un dia canvies el verd, només el canvies en un lloc.',
        }),
        warning(
          "Una coma o un espai: no és el mateix",
          "`.menu a` tria els enllaços de dins del menú. `.menu, a` tria el menú **i també** tots els enllaços de la pàgina. Un sol caràcter canvia del tot el que fa la regla."
        ),
      ],
    },

    {
      id: 'colors-i-text',
      title: 'Colors i text',
      blocks: [
        p("Ja saps escriure regles i triar elements. Ara cal vocabulari: les propietats. Les primeres que s'aprenen són les del color i les del text, perquè són les que més canvien l'aspecte d'una pàgina."),
        p("Un color es pot escriure pel seu **nom** en anglès (`white`, `black`, `green`, `tomato`…) o amb un **codi hexadecimal**: un coixinet i sis xifres, com `#1f6f54`. Les dues primeres xifres diuen quant vermell hi ha, les dues següents quant verd i les dues últimes quant blau. No cal saber-los llegir: els editors de codi i les eines de disseny te'ls donen. També veuràs colors escrits com `rgb(31, 111, 84)`: és el mateix, amb números decimals."),
        example({
          title: 'Color del text i color de fons',
          intro: "`color` és el color de la lletra, i `background-color`, el del fons de l'element. Canvia'ls.",
          html: HTML_RUTES_CLASSES,
          css: `body {
  background-color: #e8f3ee;
}

h1 {
  color: #ffffff;
  background-color: #1f6f54;
}

.dades {
  color: #5b6b63;
}`,
          expected: 'La pàgina té un fons verd molt clar. El títol és blanc sobre una franja verda que va de banda a banda, i les dades són grises.',
          why: "El fons del títol ocupa tota l'amplada de la pàgina, molt més que la paraula «Camins». El títol és més gran que el seu text: és una caixa. A la unitat següent veurem aquesta caixa amb calma.",
        }),
        table(
          ['Propietat', 'Què canvia', 'Valors habituals'],
          [
            ['`color`', 'El color del text', '`#1f6f54`, `white`'],
            ['`background-color`', 'El color del fons', '`#e8f3ee`'],
            ['`font-family`', 'El tipus de lletra', '`Arial, sans-serif`'],
            ['`font-size`', 'La mida de la lletra', '`16px`, `24px`'],
            ['`font-weight`', 'El gruix', '`normal`, `bold`'],
            ['`font-style`', 'La cursiva', '`normal`, `italic`'],
            ['`text-align`', "L'alineació del text", '`left`, `center`, `right`'],
            ['`text-decoration`', 'El subratllat', '`none`, `underline`'],
            ['`line-height`', "L'alçada de cada línia", '`1.5`'],
          ],
          'Les propietats de text que farem servir més'
        ),
        example({
          title: 'La lletra: tipus, mida i gruix',
          intro: "Esborra `Arial, ` i deixa només `sans-serif`. Després prova `Georgia, serif`.",
          html: HTML_RUTES_CLASSES,
          css: `body {
  font-family: Arial, sans-serif;
  line-height: 1.5;
}

h1 {
  font-size: 36px;
}

.dades {
  font-size: 14px;
  font-style: italic;
  font-weight: bold;
}`,
          expected: 'Tota la pàgina passa a una lletra sense serifa. El títol fa 36 píxels i les dades, 14, en cursiva i negreta.',
          why: "`font-family` és una llista per ordre de preferència: si l'ordinador no té Arial, el navegador prova la següent. L'última sempre és una família genèrica (`sans-serif`, sense remats, o `serif`, amb remats), que no falla mai. `line-height: 1.5` vol dir que cada línia fa una vegada i mitja l'alçada de la lletra.",
        }),
        p("Les mides les escriurem en **píxels** (`px`), que és la unitat més fàcil d'entendre: `16px` és la mida normal del text en un navegador. N'hi ha d'altres, com `rem` o `%`, que són relatives a una altra mida; les trobaràs en molts fulls d'estils, però de moment no ens calen. El número i la unitat van enganxats: `16px`, no `16 px`."),
        example({
          title: 'Alinear i treure subratllats',
          intro: 'El títol i el subtítol queden centrats, i els enllaços del menú perden el subratllat.',
          html: `<h1>Camins</h1>
<p class="subtitol">Rutes de muntanya per fer a peu</p>

<ul class="menu">
  <li><a href="index.html">Rutes</a></li>
  <li><a href="mapa.html">Mapa</a></li>
  <li><a href="consells.html">Consells</a></li>
</ul>`,
          css: `h1,
.subtitol {
  text-align: center;
}

.subtitol {
  font-style: italic;
  color: #5b6b63;
}

.menu a {
  color: #1f6f54;
  text-decoration: none;
}`,
          expected: 'El títol i el subtítol, centrats. El subtítol, gris i en cursiva. Els tres enllaços del menú, verds i sense subratllar.',
          why: "`text-align` alinea el text dins del seu element. El subtítol rep dues regles: la que comparteix amb el títol i la seva. Com que parlen de propietats diferents, se sumen sense problemes.",
        }),
        warning(
          'Que es pugui llegir',
          "Un gris clar sobre blanc o un verd sobre un altre verd queden elegants a la teva pantalla i il·legibles a la d'algú altre. Entre el color del text i el del fons hi ha d'haver un contrast clar."
        ),
      ],
    },

    {
      id: 'cascada',
      title: 'Quan dues regles es contradiuen: la cascada',
      blocks: [
        p("Un mateix element pot rebre moltes regles. Si parlen de propietats diferents, se sumen. Però què passa si dues regles li donen valors diferents a **la mateixa** propietat? El navegador no dubta: té unes normes fixes per decidir qui guanya. El conjunt d'aquestes normes es diu la **cascada**."),
        p("La primera norma és la més fàcil: entre dues regles amb el mateix selector, guanya **la que està escrita més avall**."),
        example({
          title: "L'última guanya",
          intro: 'Les dues regles trien el mateix títol i li donen colors diferents. Mira de quin color és i després canvia les regles de lloc.',
          html: `<h1>Camins</h1>
<p>Rutes de muntanya per fer a peu.</p>`,
          css: `h1 {
  color: #b3261e;
  font-size: 40px;
}

h1 {
  color: #1f6f54;
}`,
          expected: 'El títol és verd i fa 40 píxels. Si poses la regla del verd a dalt, passa a ser vermell.',
          why: "El navegador llegeix el full de dalt a baix, i cada valor nou substitueix l'anterior. Només se substitueix la propietat repetida: la mida, que només apareix a la primera regla, es conserva.",
        }),
        p("La segona norma passa per davant de la primera: no tots els selectors tenen la mateixa força. Un selector més precís guanya un de més general, **estigui on estigui**. Aquesta força es diu **especificitat**."),
        table(
          ['Selector', 'Exemple', 'Força'],
          [
            ["D'etiqueta", '`p`', 'La més baixa'],
            ['De classe', '`.dades`', "Guanya qualsevol selector d'etiqueta"],
            ["D'id", '`#avis`', 'Guanya qualsevol selector de classe'],
          ],
          'La força dels selectors'
        ),
        example({
          title: "La classe guanya l'etiqueta, vagi on vagi",
          intro: "La regla de `p` està escrita més avall que la de `.dades`. Segons la primera norma hauria de guanyar. Mira de quin color són les dades.",
          html: HTML_RUTES_CLASSES,
          css: `.dades {
  color: #1f6f54;
}

p {
  color: #5b6b63;
}`,
          expected: 'La presentació és grisa, però les dues línies de dades són verdes.',
          why: "Els paràgrafs de dades reben les dues regles. Com que `.dades` és un selector de classe i `p` és d'etiqueta, guanya `.dades`, encara que estigui a dalt. La norma de «l'última guanya» només desempata entre selectors de la mateixa força.",
        }),
        concept(
          'Dues preguntes per saber qui guanya',
          "Quan un estil no s'apliqui i estiguis segur que la regla està ben escrita, hi ha una altra regla que la tapa. Per trobar-la, fes-te dues preguntes, en aquest ordre. Primera: **quin selector és més específic?** Segona, només si empaten: **quina està escrita més avall?**"
        ),
        challenge({
          title: 'Per què no és verd?',
          statement: "El títol hauria de ser verd, `#1f6f54`, i es veu gris. Troba la regla que ho impedeix i arregla-ho **canviant una sola línia del CSS**, sense tocar l'HTML. El títol ha de continuar fent 36 píxels.",
          html: `<h1 class="titol">Camins</h1>
<p>Rutes de muntanya per fer a peu.</p>`,
          css: `.titol {
  color: #5b6b63;
}

h1 {
  font-size: 36px;
  color: #1f6f54;
}`,
          hint: "El títol rep dues regles que parlen del color. La que va més avall és la de `h1`, però no és la que guanya. Per què? Mira la taula de la força dels selectors.",
          solution: {
            css: `.titol {
  color: #1f6f54;
}

h1 {
  font-size: 36px;
  color: #1f6f54;
}`,
          },
          explanation: "El títol té la classe `titol`, i un selector de classe guanya el selector `h1` encara que estigui escrit abans. Mentre `.titol` digui gris, el títol serà gris. Canviar el valor d'aquella regla (o esborrar-ne la declaració del color) ho resol.",
          checks: [
            { label: 'El títol és verd (#1f6f54)', selector: 'h1', style: { color: '#1f6f54' } },
            { label: 'El títol continua fent 36 píxels', selector: 'h1', style: { 'font-size': '36px' } },
          ],
        }),
      ],
    },

    {
      id: 'herencia',
      title: 'Herència: escriure-ho una sola vegada',
      blocks: [
        p("Si vols tota la pàgina amb la mateixa lletra, no cal escriure `font-family` a cada títol, paràgraf i llista. Les propietats del text **s'hereten**: si les poses a un element, les rep tot el que té a dins. I l'element que ho conté tot és el `<body>`."),
        example({
          title: 'Tot el text, des del body',
          intro: 'Una sola regla canvia la lletra i el color de tota la pàgina. Fixa\'t en l\'únic text que no fa cas del color.',
          html: `<h1>Camins</h1>
<p>Rutes de muntanya per fer a peu, explicades pas a pas.</p>

<ul>
  <li>Camí de Ronda</li>
  <li>Vall de Núria</li>
</ul>

<p>Abans de sortir, llegeix <a href="consells.html">els consells</a>.</p>`,
          css: `body {
  font-family: Arial, sans-serif;
  color: #23312b;
}

a {
  color: #1f6f54;
}`,
          expected: "El títol, els paràgrafs i la llista fan servir Arial i són de color gris fosc. L'enllaç és verd.",
          why: "Cap regla parla dels `<h1>`, dels `<p>` ni dels `<li>`: hereten la lletra i el color del `<body>`. L'enllaç és l'excepció: el navegador té una regla pròpia que posa els enllaços en blau, i una regla escrita per a un element sempre guanya el que heretaria. Per això li hem de dir el color expressament. Esborra la regla de `a` i ho veuràs.",
        }),
        list(
          "**S'hereten** les propietats del text: `color`, `font-family`, `font-size`, `font-weight`, `font-style`, `line-height` i `text-align`.",
          "**No s'hereten** les altres. `background-color`, per exemple, no passa als fills: si sembla que sí, és perquè el fons dels fills és transparent i es veu el del pare."
        ),
        concept(
          'El que és de tota la pàgina, al body',
          "La lletra, el color del text i l'alçada de línia de tota la web s'escriuen una sola vegada, a la regla del `body`. La resta de regles només diuen en què és diferent cada peça."
        ),
      ],
    },

    {
      id: 'hover',
      title: 'Reaccionar al ratolí: :hover',
      blocks: [
        p("Fins ara, cada regla descriu com és un element sempre. Però hi ha estils que només tenen sentit en un moment concret: per exemple, mentre el ratolí és a sobre d'un enllaç. Això s'escriu afegint `:hover` al selector, enganxat, sense cap espai."),
        example({
          title: 'Un menú que respon',
          intro: 'Passa el ratolí per sobre dels enllaços del menú.',
          html: `<ul class="menu">
  <li><a href="index.html">Rutes</a></li>
  <li><a href="mapa.html">Mapa</a></li>
  <li><a href="consells.html">Consells</a></li>
</ul>`,
          css: `.menu a {
  font-weight: bold;
  color: #1f6f54;
  text-decoration: none;
}

.menu a:hover {
  color: #ffffff;
  background-color: #1f6f54;
}`,
          expected: "Els enllaços són verds i sense subratllar. Quan hi passes el ratolí per sobre, l'enllaç es torna blanc sobre fons verd, i torna a ser com abans quan en surts.",
          why: "`.menu a:hover` es llegeix «un enllaç de dins del menú, mentre té el ratolí a sobre». Només cal escriure-hi el que canvia: la negreta i la falta de subratllat venen de la regla normal, que es continua aplicant.",
        }),
        p("Aquesta mena de resposta és important: diu a qui mira la pàgina que allò es pot clicar. En una pantalla tàctil no hi ha ratolí, i per això `:hover` ha de ser un detall afegit, mai l'única manera de veure una informació."),
        project(
          "Amb el que hem vist, la web de rutes ja té aspecte propi. Tot surt d'un sol fitxer, i cada peça es tria amb una classe o amb el seu contenidor.",
          {
            title: 'El primer estils.css de la web de rutes',
            lang: 'css',
            code: `body {
  font-family: Arial, sans-serif;
  line-height: 1.5;
  color: #23312b;
}

h1,
h2 {
  color: #1f6f54;
}

h1 {
  font-size: 36px;
  text-align: center;
}

.subtitol {
  font-style: italic;
  text-align: center;
  color: #5b6b63;
}

.menu a {
  font-weight: bold;
  color: #1f6f54;
  text-decoration: none;
}

.menu a:hover {
  text-decoration: underline;
}

.dades {
  font-size: 14px;
  color: #5b6b63;
}`,
          }
        ),
      ],
    },
  ],

  commonErrors: [
    {
      title: 'Oblidar el punt del selector de classe',
      bad: `dades {
  color: #5b6b63;
}`,
      badLang: 'css',
      symptom: "Els paràgrafs amb `class=\"dades\"` continuen negres, com si la regla no existís.",
      why: "Sense el punt, `dades` és un selector d'etiqueta: busca elements `<dades>`, que no existeixen. El navegador no avisa de res.",
      fix: `.dades {
  color: #5b6b63;
}`,
      fixLang: 'css',
    },
    {
      title: "Escriure el punt dins de l'atribut class",
      bad: `<p class=".dades">12 km · 3 h 30 min</p>`,
      badLang: 'html',
      symptom: 'La regla `.dades` del CSS és correcta, però el paràgraf no canvia.',
      why: "El punt forma part del selector, no del nom. Amb `class=\".dades\"`, la classe es diu «.dades», punt inclòs, i el selector `.dades` busca una classe que es digui «dades».",
      fix: `<p class="dades">12 km · 3 h 30 min</p>`,
      fixLang: 'html',
    },
    {
      title: 'Deixar-se un punt i coma',
      bad: `.dades {
  font-size: 14px
  color: #5b6b63;
}`,
      badLang: 'css',
      symptom: 'Les dades no són ni petites ni grises: cap de les dues declaracions fa efecte.',
      why: "Sense el punt i coma, el navegador llegeix les dues línies com una sola declaració, `font-size: 14px color: #5b6b63`, que no té sentit, i la descarta sencera.",
      fix: `.dades {
  font-size: 14px;
  color: #5b6b63;
}`,
      fixLang: 'css',
    },
    {
      title: 'Un <link> amb el nom del fitxer equivocat',
      bad: `<link rel="stylesheet" href="estil.css">`,
      badLang: 'html',
      symptom: 'La pàgina es veu sense cap estil, amb la lletra i els colors del navegador.',
      why: "El fitxer es diu `estils.css`, amb essa. El navegador demana `estil.css`, no el troba i continua sense dir res. Passa el mateix si el fitxer és en una altra carpeta i l'`href` no ho diu.",
      fix: `<link rel="stylesheet" href="estils.css">`,
      fixLang: 'html',
    },
    {
      title: 'Separar el número de la unitat, o oblidar la unitat',
      bad: `h1 {
  font-size: 36 px;
}`,
      badLang: 'css',
      symptom: 'El títol es queda amb la mida que li posa el navegador.',
      why: "`36 px`, amb un espai, són dos valors que no volen dir res junts, i `36` sol tampoc és una mida: el navegador no sap si són píxels o una altra cosa. En tots dos casos ignora la declaració.",
      fix: `h1 {
  font-size: 36px;
}`,
      fixLang: 'css',
    },
  ],

  exercises: [
    {
      id: 'titol-de-la-web',
      title: 'El títol de la web',
      statement: "Completa la regla perquè el títol sigui de color verd `#1f6f54`, faci 40 píxels i quedi centrat. El paràgraf no ha de canviar.",
      expected: 'El títol «Camins», gros, verd i centrat. A sota, el paràgraf tal com estava.',
      html: `<h1>Camins</h1>
<p>Rutes de muntanya per fer a peu, explicades pas a pas.</p>`,
      css: `h1 {
  /* Escriu aquí les tres declaracions */
}`,
      hint: 'Són tres declaracions, una per línia: `color`, `font-size` i `text-align`. Cada una acaba amb un punt i coma.',
      solution: {
        css: `h1 {
  color: #1f6f54;
  font-size: 40px;
  text-align: center;
}`,
      },
      explanation: "El selector `h1` tria el títol, i cada declaració en canvia una cosa. El paràgraf no es veu afectat perquè cap regla el tria, i `text-align` del títol només alinea el text de dins del títol.",
      checks: [
        { label: 'El títol és verd (#1f6f54)', selector: 'h1', style: { color: '#1f6f54' } },
        { label: 'El títol fa 40 píxels', selector: 'h1', style: { 'font-size': '40px' } },
        { label: 'El títol està centrat', selector: 'h1', style: { 'text-align': 'center' } },
        { label: 'El paràgraf continua alineat a l\'esquerra', selector: 'p', style: { 'text-align': ['start', 'left'] } },
      ],
    },
    {
      id: 'nomes-l-avis',
      title: "Només l'avís",
      statement: "Dels tres paràgrafs, només el de l'avís s'ha de veure en negreta i de color vermell fosc, `#b3261e`. Ja té la classe `avis`: escriu la regla. Els altres dos paràgrafs no han de canviar.",
      expected: "El paràgraf del mig, en negreta i vermell. El primer i l'últim, com abans.",
      html: `<h2>Pica d'Estats</h2>
<p>La ruta surt del refugi de Vallferrera i puja fins al cim més alt de Catalunya.</p>
<p class="avis">Atenció: a l'hivern cal portar grampons i piolet.</p>
<p>Calcula unes nou hores entre l'anada i la tornada.</p>`,
      css: `/* Escriu aquí la regla */
`,
      hint: "El selector `p` els triaria tots tres. Per triar només els elements d'una classe, el selector comença amb un punt.",
      solution: {
        css: `.avis {
  font-weight: bold;
  color: #b3261e;
}`,
      },
      explanation: "`.avis` tria només els elements que tenen aquesta classe. Els altres dos paràgrafs són `<p>` igualment, però no la tenen i la regla no els toca.",
      checks: [
        { label: "L'avís és de color #b3261e", selector: '.avis', style: { color: '#b3261e' } },
        { label: "L'avís es veu en negreta", selector: '.avis', style: { 'font-weight': '700' } },
        { label: 'Els altres paràgrafs no estan en negreta', selector: 'p:not(.avis)', all: true, style: { 'font-weight': '400' } },
      ],
    },
    {
      id: 'enllacos-del-menu',
      title: 'Els enllaços del menú',
      statement: "Els tres enllaços del menú han de ser verds (`#1f6f54`), en negreta i sense subratllat. L'enllaç del paràgraf de sota ha de continuar com està: subratllat. No pots afegir cap classe a l'HTML.",
      expected: "Tres enllaços verds, en negreta i sense subratllar dins de la llista. A sota, l'enllaç del paràgraf, blau i subratllat.",
      html: HTML_MENU,
      css: `/* Escriu aquí la regla */
`,
      hint: [
        'El selector `a` els triaria tots quatre. Necessites dir «els enllaços que hi ha dins del menú».',
        "Dos selectors separats per un espai: primer el contenidor, després el que hi busques. I la propietat que treu el subratllat és `text-decoration`.",
      ],
      solution: {
        css: `.menu a {
  font-weight: bold;
  color: #1f6f54;
  text-decoration: none;
}`,
      },
      explanation: "`.menu a` es llegeix «un `<a>` dins d'un element amb la classe `menu`». L'enllaç del paràgraf no és dins de la llista, i per això es queda amb els estils del navegador.",
      checks: [
        { label: 'Els enllaços del menú són verds', selector: '.menu a', all: true, style: { color: '#1f6f54' } },
        { label: 'Estan en negreta', selector: '.menu a', all: true, style: { 'font-weight': '700' } },
        { label: 'No estan subratllats', selector: '.menu a', all: true, style: { 'text-decoration-line': 'none' } },
        { label: "L'enllaç del paràgraf continua subratllat", selector: 'p a', style: { 'text-decoration-line': 'underline' } },
      ],
    },
    {
      id: 'ordre-de-les-regles',
      title: "Qüestió d'ordre",
      statement: "La Vall de Núria és la ruta destacada i hauria de ser verda, però es veu grisa com les altres. Les dues regles estan ben escrites: el problema és una altra cosa. Arregla-ho **sense esborrar ni canviar cap declaració** i sense tocar l'HTML.",
      expected: 'La ruta del mig, verda. Les altres dues, grises. Totes tres de la mateixa mida.',
      html: `<h2 class="ruta">Camí de Ronda</h2>
<h2 class="ruta destacada">Vall de Núria</h2>
<h2 class="ruta">Puigmal</h2>`,
      css: `.destacada {
  color: #1f6f54;
}

.ruta {
  font-size: 22px;
  color: #5b6b63;
}`,
      hint: "La Vall de Núria té les dues classes i rep les dues regles. Totes dues són selectors de classe: tenen la mateixa força. Qui guanya, quan empaten?",
      solution: {
        css: `.ruta {
  font-size: 22px;
  color: #5b6b63;
}

.destacada {
  color: #1f6f54;
}`,
      },
      explanation: "Quan dos selectors tenen la mateixa força, guanya la regla que està escrita més avall. Amb `.ruta` a baix, el seu gris tapava el verd. Per això en un full d'estils les regles generals van a dalt i les excepcions, a sota.",
      checks: [
        { label: 'La ruta destacada és verda (#1f6f54)', selector: '.destacada', style: { color: '#1f6f54' } },
        { label: 'Les altres rutes són grises (#5b6b63)', selector: '.ruta:not(.destacada)', all: true, style: { color: '#5b6b63' } },
        { label: 'Totes tres fan 22 píxels', selector: '.ruta', all: true, style: { 'font-size': '22px' } },
      ],
    },
  ],

  finalExercise: {
    id: 'vesteix-la-pagina',
    title: 'Vesteix la pàgina de rutes',
    statement: [
      "La pàgina té tot el contingut i les classes posades, però el full d'estils està buit. Escriu-lo sencer, sense tocar l'HTML. Compara el teu resultat amb la pestanya «Objectiu» mentre avances.",
      "Tota la pàgina ha de fer servir la lletra `Arial, sans-serif` i el color de text `#23312b`, escrits una sola vegada. El títol principal, verd `#1f6f54` i centrat. El subtítol, centrat, en cursiva i gris `#5b6b63`.",
      "Els enllaços del menú, en negreta i sense subratllat; l'enllaç de l'última frase ha de continuar subratllat. Els títols `<h2>` i `<h3>`, verds `#1f6f54` amb una sola regla. I les dades de cada ruta, de 14 píxels i grises `#5b6b63`.",
    ],
    expected: 'La pàgina amb lletra Arial, el títol i el subtítol centrats, el menú en negreta sense subratllar, els títols verds i les dades petites i grises.',
    html: HTML_PAGINA,
    css: `/* Tota la pàgina */


/* El títol i el subtítol */


/* El menú */


/* Els títols de les rutes i les seves dades */

`,
    hint: [
      "El que és de tota la pàgina va a la regla del `body`: la lletra i el color s'hereten.",
      'Per als `<h2>` i els `<h3>` alhora, dos selectors separats per una coma. Per als enllaços del menú, dos selectors separats per un espai.',
    ],
    solution: {
      css: `/* Tota la pàgina */
body {
  font-family: Arial, sans-serif;
  color: #23312b;
}

/* El títol i el subtítol */
h1 {
  text-align: center;
  color: #1f6f54;
}

.subtitol {
  font-style: italic;
  text-align: center;
  color: #5b6b63;
}

/* El menú */
.menu a {
  font-weight: bold;
  text-decoration: none;
}

/* Els títols de les rutes i les seves dades */
h2,
h3 {
  color: #1f6f54;
}

.dades {
  font-size: 14px;
  color: #5b6b63;
}`,
    },
    explanation: [
      "Són sis regles, i cada una fa servir una eina de la unitat. El `body` reparteix la lletra i el color per herència. `h1` és un selector d'etiqueta, `.subtitol` i `.dades` són classes, `.menu a` tria per contenidor i `h2, h3` agrupa.",
      "El color del `body` arriba a tot arreu, però els títols i les dades acaben d'un altre color: una regla escrita per a un element sempre guanya el que heretaria.",
    ],
    checks: [
      { label: 'Tota la pàgina fa servir Arial', selector: 'body', style: { 'font-family': ['Arial, sans-serif', 'Arial, Helvetica, sans-serif', 'Arial'] } },
      { label: 'El text normal és de color #23312b', selector: 'p:not(.subtitol):not(.dades)', style: { color: '#23312b' } },
      { label: 'El títol principal és verd i està centrat', selector: 'h1', style: { color: '#1f6f54', 'text-align': 'center' } },
      { label: 'El subtítol està centrat, en cursiva i és gris', selector: '.subtitol', style: { 'text-align': 'center', 'font-style': 'italic', color: '#5b6b63' } },
      { label: 'Els enllaços del menú estan en negreta i sense subratllat', selector: '.menu a', all: true, style: { 'font-weight': '700', 'text-decoration-line': 'none' } },
      { label: "L'enllaç de l'última frase continua subratllat", selector: 'p a', style: { 'text-decoration-line': 'underline' } },
      { label: 'Els títols h2 i h3 són verds', selector: 'h2, h3', all: true, style: { color: '#1f6f54' } },
      { label: 'Les dades fan 14 píxels i són grises', selector: '.dades', all: true, style: { 'font-size': '14px', color: '#5b6b63' } },
    ],
  },

  summary: [
    "El CSS s'escriu en un fitxer a part, `estils.css`, que cada pàgina demana amb `<link rel=\"stylesheet\" href=\"estils.css\">` dins del `<head>`.",
    'Una **regla** és un selector i, entre claus, les seves declaracions: `propietat: valor;`.',
    "Un selector d'etiqueta (`p`) tria tots els elements d'aquell tipus. Un de classe (`.dades`) tria els que tenen `class=\"dades\"`. Les classes són la manera habitual de triar.",
    "Un espai vol dir «dins de» (`.menu a`) i una coma, «i també» (`h1, h2`).",
    'El text es canvia amb `color`, `font-family`, `font-size`, `font-weight`, `font-style`, `text-align`, `text-decoration` i `line-height`.',
    'Quan dues regles es contradiuen, guanya el selector més específic (id, després classe, després etiqueta) i, si empaten, la que està més avall.',
    "Les propietats del text s'hereten: el que és de tota la pàgina s'escriu una vegada al `body`. `:hover` canvia un element mentre té el ratolí a sobre.",
  ],

  quiz: [
    {
      question: 'Quin selector tria tots els elements que tenen `class="dades"`?',
      options: [
        { text: '`.dades`', correct: true },
        { text: '`dades`', why: 'Sense punt és un selector d\'etiqueta: buscaria elements `<dades>`, que no existeixen.' },
        { text: '`#dades`', why: 'El coixinet tria per `id`, no per classe.' },
        { text: '`class.dades`', why: 'Al CSS no s\'escriu la paraula `class`: el punt ja vol dir «classe».' },
      ],
      explanation: 'Un selector de classe és el nom de la classe amb un punt al davant.',
    },
    {
      question: 'Una web té deu pàgines i totes han de tenir el mateix aspecte. On convé escriure el CSS?',
      options: [
        { text: 'En un fitxer `estils.css` que totes les pàgines demanen amb `<link>`', correct: true },
        { text: 'A l\'atribut `style` de cada etiqueta', why: 'S\'hauria de repetir a cada etiqueta de cada pàgina, i canviar un color voldria dir tocar-les totes.' },
        { text: 'En un bloc `<style>` a cada pàgina', why: 'Funcionaria, però hi hauria deu còpies del mateix CSS i caldria mantenir-les iguals a mà.' },
        { text: 'Dins del `<body>`, abans del contingut', why: 'El CSS no s\'escriu solt dins del `<body>`: el navegador el mostraria com a text.' },
      ],
      explanation: 'Un full d\'estils extern s\'escriu una vegada i el comparteixen totes les pàgines. Un canvi al fitxer es veu a tota la web.',
    },
    {
      question: 'Què tria el selector `.menu a`?',
      options: [
        { text: 'Els enllaços que hi ha dins d\'un element amb la classe `menu`', correct: true },
        { text: 'Els enllaços que tenen la classe `menu`', why: 'Això s\'escriuria `a.menu`, enganxat. L\'espai vol dir «dins de».' },
        { text: 'L\'element amb la classe `menu` i també tots els enllaços', why: 'Això seria `.menu, a`, amb una coma.' },
        { text: 'Només el primer enllaç del menú', why: 'Tria tots els que compleixen la condició, no només el primer.' },
      ],
      explanation: 'Dos selectors separats per un espai es llegeixen de dreta a esquerra: un `<a>` que és dins d\'un `.menu`.',
    },
    {
      question: 'El full d\'estils té, en aquest ordre, `h1 { color: red; }` i més avall `h1 { color: green; }`. De quin color és el títol?',
      options: [
        { text: 'Verd, perquè entre dues regles amb el mateix selector guanya la que va més avall', correct: true },
        { text: 'Vermell, perquè la primera regla que es llegeix és la que val', why: 'És a l\'inrevés: cada valor nou substitueix l\'anterior.' },
        { text: 'Negre, perquè les dues regles s\'anul·len', why: 'Les regles no s\'anul·len: sempre en guanya una.' },
        { text: 'El navegador mostra un error', why: 'El CSS no dona errors, i dues regles amb el mateix selector són perfectament vàlides.' },
      ],
      explanation: 'Amb la mateixa força, l\'última guanya. És el desempat de la cascada.',
    },
    {
      question: 'Un paràgraf és `<p class="avis">`. El CSS diu `.avis { color: red; }` i, **més avall**, `p { color: black; }`. De quin color és?',
      options: [
        { text: 'Vermell, perquè un selector de classe té més força que un d\'etiqueta', correct: true },
        { text: 'Negre, perquè la regla de `p` està escrita més avall', why: 'L\'ordre només desempata entre selectors de la mateixa força, i aquí no hi ha empat.' },
        { text: 'Negre, perquè `p` tria més elements', why: 'Triar més elements no dona força. De fet, com més general és un selector, menys força té.' },
        { text: 'Una barreja dels dos colors', why: 'Una propietat només pot tenir un valor: guanya una de les dues regles.' },
      ],
      explanation: 'Primer es mira l\'especificitat, i una classe guanya una etiqueta. La posició al fitxer només compta quan els selectors empaten.',
    },
    {
      question: 'L\'única regla del full és `body { font-family: Arial, sans-serif; }`. Per què els paràgrafs també es veuen amb Arial?',
      options: [
        { text: 'Perquè les propietats del text s\'hereten del `<body>` a tot el que té a dins', correct: true },
        { text: 'Perquè `body` és un selector que tria tots els elements', why: '`body` només tria l\'element `<body>`. Són els fills els qui n\'hereten el valor.' },
        { text: 'Perquè Arial és la lletra per defecte dels navegadors', why: 'La lletra per defecte acostuma a ser una amb serifa. Si es veu Arial és per la regla.' },
        { text: 'Perquè el navegador copia la regla a cada etiqueta', why: 'No es copia cap regla: cada element pren el valor del seu pare quan no en té un de propi.' },
      ],
      explanation: 'L\'herència fa que la lletra i el color del text passin de pares a fills. Per això n\'hi ha prou d\'escriure\'ls al `<body>`.',
    },
  ],
};
