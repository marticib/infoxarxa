import { p, list, css, subtitle, example, concept, warning, challenge, project, table, custom } from '../../blocks.js';

const CSS_BASE = `body {
  font-family: Arial, sans-serif;
}`;

// El menú de la web de rutes: tres enllaços dins d'un <nav>.
const HTML_MENU = `<nav class="menu">
  <a href="index.html">Rutes</a>
  <a href="mapa.html">Mapa</a>
  <a href="consells.html">Consells</a>
</nav>`;

// La capçalera, tal com va quedar a la unitat anterior.
const HTML_CAPCALERA = `<header class="capcalera">
  <a class="logo" href="index.html">▲ Camins</a>

  <nav class="menu">
    <a href="index.html">Rutes</a>
    <a href="mapa.html">Mapa</a>
    <a href="consells.html">Consells</a>
  </nav>
</header>`;

const CSS_CAPCALERA = `body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.capcalera {
  padding: 12px 16px;
  background: #1f6f54;
}

.capcalera a {
  color: #ffffff;
  text-decoration: none;
}

.logo {
  font-size: 22px;
  font-weight: bold;
}`;

export const glossary = [
  {
    term: 'Flux normal',
    definition:
      'La manera com el navegador col·loca les caixes quan no se li diu res: en l\'ordre de l\'HTML, els blocs l\'un sota l\'altre i els elements en línia l\'un al costat de l\'altre.',
  },
  {
    term: 'Element de bloc',
    definition:
      'Element que comença en una línia nova i ocupa tota l\'amplada disponible, com `<div>`, `<p>` o `<h1>`. Accepta `width`, `height` i marges a tots quatre costats.',
  },
  {
    term: 'Element en línia',
    definition:
      'Element que es queda dins de la línia de text i fa la mida del seu contingut, com `<a>`, `<span>` o `<strong>`. No fa cas de `width` ni de `height`.',
  },
  {
    term: 'display',
    definition:
      'Propietat de CSS que decideix com es comporta la caixa d\'un element: `block`, `inline`, `inline-block`, `none` i, més endavant, `flex` i `grid`.',
  },
  {
    term: 'inline-block',
    definition:
      'Valor de `display` que col·loca l\'element a la línia, com un element en línia, però li deixa tenir amplada, alçada i marges, com un bloc.',
  },
  {
    term: 'display: none',
    definition:
      'Fa que l\'element no generi cap caixa: no es veu ni ocupa lloc, tot i que continua escrit a l\'HTML.',
  },
];

export default {
  id: 'display',
  number: 6,
  title: 'display: block, inline i inline-block',
  shortTitle: 'display: block i inline',
  description:
    "Per què uns elements ocupen tota la línia i d'altres es queden dins del text, i com canviar-ho: el flux normal de la pàgina i la propietat `display`.",

  problem: {
    title: 'Li he posat amplada i alçada a un enllaç i no ha passat res',
    text: [
      "La pàgina de la web de rutes ja està dibuixada en quadrats i escrita amb contenidors, i tot queda apilat de dalt a baix. Tot? No ben bé: els tres enllaços del menú surten l'un al costat de l'altre sense que els haguem dit res. En canvi, els paràgrafs i les targetes sempre baixen de línia.",
      "Hi ha més coses estranyes. Vols que els enllaços del menú siguin botons grossos i els poses `width` i `height`: el navegador no en fa cas. Poses una foto dins d'una targeta i a sota li queda una franja buida que no saps d'on surt.",
      "Res d'això és un error. Cada element té una manera de comportar-se dins de la pàgina, i n'hi ha dues de bàsiques: **de bloc** i **en línia**. La propietat que ho decideix es diu `display`, i és la més important de tot el CSS de maquetació: Flexbox i Grid, que venen després, són en el fons dos valors més d'aquesta mateixa propietat.",
    ],
  },

  goals: [
    'Explicar què és el flux normal i com s\'hi col·loquen els elements de bloc i els elements en línia.',
    'Reconèixer quines etiquetes són de bloc i quines en línia.',
    "Canviar el comportament d'un element amb `display`.",
    'Fer servir `inline-block` per tenir elements de costat que accepten mides.',
    'Amagar un element amb `display: none`.',
    'Treure la franja de sota de les imatges i fer que un enllaç es pugui clicar sencer.',
  ],

  projectPiece:
    'Els enllaços del menú es converteixen en botons amb farciment que es posen en una línia, i les fotos de les rutes perden la franja buida de sota.',

  finalProject:
    'Les miniatures dels vídeos portaran `display: block` per no deixar cap franja a sota, i entendràs per què els xips i els botons es posen de costat tots sols.',

  sections: [
    {
      id: 'flux-normal',
      title: 'El flux normal: com es col·loquen les caixes soles',
      blocks: [
        p("Quan el navegador rep un HTML sense cap CSS de maquetació, no col·loca les caixes a l'atzar. Segueix unes regles fixes que es coneixen com a **flux normal**: les caixes es van posant l'una darrere l'altra, en l'ordre en què estan escrites. I en aquest flux hi ha dues menes de caixa, que es comporten de manera molt diferent."),
        example({
          title: 'Dues menes de caixa',
          intro: 'Els quadrats estan activats. N\'hi ha de ratlles i de punts: mira quina forma té cada un.',
          html: `<h2>Camí de Ronda</h2>
<p>Una ruta <strong>fàcil</strong> arran de mar. Pots mirar-ne el <a href="mapa.html">mapa</a> abans de sortir.</p>
<p>12 km · 3 h 30 min</p>`,
          css: CSS_BASE,
          focus: 'html',
          boxes: true,
          expected: 'El títol i els dos paràgrafs tenen un contorn de ratlles que va de banda a banda. La paraula «fàcil» i l\'enllaç «mapa» tenen un contorn de punts que només envolta el seu text.',
          why: "L'`<h2>` i els `<p>` són elements **de bloc**: cadascun ocupa tota l'amplada i el següent comença a sota. L'`<strong>` i l'`<a>` són elements **en línia**: viuen dins del text, sense trencar la línia, i només ocupen el que ocupa el seu contingut.",
        }),
        concept(
          'Com un paràgraf o com una paraula',
          "Un element **de bloc** es comporta com un paràgraf: comença en una línia nova i s'estira de banda a banda. Un element **en línia** es comporta com una paraula: es posa a continuació del que té al davant i, si no hi cap, salta a la línia següent com ho faria el text."
        ),
        table(
          ['Comportament', 'Etiquetes', 'Pensa en…'],
          [
            [
              'De bloc',
              '`<div>`, `<p>`, `<h1>` a `<h6>`, `<ul>`, `<ol>`, `<li>`, `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`',
              "Paràgrafs: l'un sota l'altre",
            ],
            ['En línia', '`<a>`, `<span>`, `<strong>`, `<em>`', "Paraules: l'una al costat de l'altra"],
            ['En línia, però amb mides', '`<img>`, `<button>`, `<input>`', 'Paraules que accepten amplada i alçada'],
          ],
          'Com es comporta cada etiqueta si no se li diu res'
        ),
        p("Això explica el que vas veure a [la unitat anterior](#/unitat/contenidors): tots els contenidors són de bloc, i per això s'apilaven. I també per què els enllaços del menú es posaven de costat sense demanar-ho: són elements en línia."),
      ],
    },

    {
      id: 'elements-de-bloc',
      title: 'Elements de bloc',
      blocks: [
        p('Un element de bloc segueix quatre regles:'),
        list(
          '**Comença en una línia nova**, i el que ve després, també.',
          "**Ocupa tota l'amplada** que li deixa el seu pare, encara que el contingut sigui curt.",
          "**Fa l'alçada del seu contingut**, si no se li diu res.",
          '**Accepta `width`, `height`, `padding` i `margin`** a tots quatre costats.'
        ),
        example({
          title: 'Un bloc estret continua sent un bloc',
          intro: 'La caixa del mig fa 120 píxels d\'amplada, i a la seva dreta hi ha lloc de sobres. Hi puja, la tercera?',
          html: `<div class="caixa">Rutes</div>
<div class="caixa estreta">Mapa</div>
<div class="caixa">Consells</div>`,
          css: `${CSS_BASE}

.caixa {
  margin-bottom: 8px;
  padding: 12px;
  color: #ffffff;
  background: #1f6f54;
}

.estreta {
  width: 120px;
}`,
          boxes: true,
          expected: 'Tres caixes verdes apilades. La del mig és estreta, i la tercera queda a sota, no al seu costat.',
          why: "`width` canvia l'amplada de la caixa, però no el seu comportament: un bloc es reserva sempre tota la línia. L'espai de la dreta queda buit i el bloc següent comença a sota.",
        }),
        concept(
          'Per això els quadrats s\'apilen',
          "Cap bloc es posa al costat d'un altre bloc per iniciativa pròpia, per molt lloc que hi hagi. Si vols quadrats de costat, tens dues opcions: canviar-los el comportament (ho farem en aquesta unitat) o dir al seu pare que els col·loqui d'una altra manera (ho farem a la següent)."
        ),
      ],
    },

    {
      id: 'elements-en-linia',
      title: 'Elements en línia',
      blocks: [
        p('Un element en línia fa gairebé tot el contrari:'),
        list(
          '**Es queda a la línia**, a continuació del que té al davant.',
          "**Fa l'amplada del seu contingut**, ni un píxel més.",
          '**No fa cas de `width` ni de `height`.**',
          "**Els marges de dalt i de baix no fan res.** Els de l'esquerra i la dreta, sí."
        ),
        example({
          title: 'Un enllaç que no fa cas de les mides',
          intro: 'Els enllaços tenen `width`, `height` i `margin-top`. Canvia els números tant com vulguis.',
          html: HTML_MENU,
          css: `${CSS_BASE}

.menu a {
  width: 120px;
  height: 60px;
  margin-top: 40px;
  color: #ffffff;
  background: #1f6f54;
}`,
          boxes: true,
          expected: 'Tres enllaços amb fons verd, de costat, de la mida justa del seu text i enganxats a dalt. Cap de les tres propietats es nota.',
          why: "Un element en línia fa la mida del seu contingut i prou. El navegador llegeix `width`, `height` i `margin-top` i no els aplica: no són cap error, simplement no tenen efecte en aquesta mena de caixa.",
        }),
        warning(
          'El padding de dalt i de baix enganya',
          "A un element en línia sí que se li pot posar `padding`, i es veu: el fons creix. Però el de dalt i el de baix **no fan lloc**: el fons es pinta per sobre del que hi hagi a la línia de dalt i a la de baix. Si el farciment d'un enllaç trepitja altres coses, el problema no és el `padding`: és que l'element és en línia."
        ),
        p("I quan un element en línia no cap a la línia, es parteix com el text: una part es queda a dalt i la resta baixa. Per això, amb els quadrats activats, un enllaç llarg pot sortir dibuixat en dos trossos."),
      ],
    },

    {
      id: 'la-propietat-display',
      title: 'Canviar el comportament: la propietat display',
      blocks: [
        p("Que un `<a>` sigui en línia i un `<div>` sigui de bloc no és cap llei: és només el valor **per defecte** d'una propietat de CSS que es diu `display`. I, com totes les propietats, es pot canviar."),
        css(
          `a {
  display: block;
}

li {
  display: inline;
}`,
          { title: 'Un enllaç que es comporta com un bloc, i a l\'inrevés' }
        ),
        example({
          title: 'Una llista en una sola línia',
          intro: 'Els `<li>` són de bloc: cada un va en una línia, amb el seu punt. Esborra la línia `display: inline;` per veure\'ls com són normalment.',
          html: `<ul class="etiquetes">
  <li>Bosc</li>
  <li>Riu</li>
  <li>Cim</li>
  <li>Refugi</li>
</ul>`,
          css: `${CSS_BASE}

.etiquetes {
  padding: 0;
}

.etiquetes li {
  display: inline;
  margin-right: 8px;
  padding: 2px 8px;
  background: #e8f3ee;
}`,
          boxes: true,
          expected: 'Les quatre paraules en una sola línia, amb fons verd clar i sense punts de llista. Sense `display: inline`, tornen a ser quatre línies amb el seu punt.',
          why: "Amb `display: inline`, cada `<li>` es comporta com una paraula i es posa al costat de l'anterior. El punt desapareix perquè només el dibuixen els elements que es comporten com a elements de llista.",
        }),
        example({
          title: "Les dades d'una ruta, una per línia",
          intro: 'Aquí passa el contrari: tres `<span>`, que són en línia, es comporten com a blocs.',
          html: `<p class="dades">
  <span>12 km</span>
  <span>3 h 30 min</span>
  <span>Fàcil</span>
</p>`,
          css: `${CSS_BASE}

.dades span {
  display: block;
  margin-bottom: 4px;
  padding: 4px 8px;
  background: #e8f3ee;
}`,
          boxes: true,
          expected: "Les tres dades, l'una sota l'altra, cadascuna en una franja verd clar que va de banda a banda.",
          why: "`display: block` dona al `<span>` les quatre regles dels blocs: línia nova, tota l'amplada i marges de dalt i de baix que ara sí que funcionen. L'etiqueta continua sent un `<span>`; només n'ha canviat el comportament.",
        }),
        concept(
          "L'etiqueta diu què és; display, com es comporta",
          "L'HTML diu **què és** cada cosa: un enllaç, un element d'una llista, un paràgraf. El `display` diu **com es comporta** a la pàgina. No canviïs mai d'etiqueta per aconseguir un comportament: un enllaç ha de continuar sent un `<a>`, encara que el vulguis de bloc."
        ),
      ],
    },

    {
      id: 'inline-block',
      title: 'El millor dels dos: inline-block',
      blocks: [
        p("Hi ha situacions en què cap dels dos comportaments serveix. Vols tres botons **de costat**, com els elements en línia, però que facin tots **la mateixa amplada**, i això només ho accepten els blocs. Per a aquests casos hi ha un tercer valor que barreja els altres dos: `inline-block`."),
        example({
          title: 'Tres botons iguals, de costat',
          intro: 'Canvia `inline-block` per `inline` i després per `block`, i compara els tres resultats.',
          html: HTML_MENU,
          css: `${CSS_BASE}

.menu a {
  display: inline-block;
  width: 96px;
  padding: 10px 0;
  color: #ffffff;
  text-align: center;
  text-decoration: none;
  background: #1f6f54;
  border-radius: 6px;
}`,
          boxes: true,
          expected: 'Tres botons verds de la mateixa amplada, de costat. Amb `inline` perden l\'amplada; amb `block` la conserven, però s\'apilen.',
          why: "Un element `inline-block` es col·loca com un element en línia, a continuació de l'anterior, però per dins és un bloc: accepta `width`, `height` i marges i farciment a tots quatre costats.",
        }),
        table(
          ['Pregunta', '`block`', '`inline`', '`inline-block`'],
          [
            ['Comença en una línia nova?', 'Sí', 'No', 'No'],
            ['Quina amplada fa, si no se li diu res?', 'Tota la disponible', 'La del contingut', 'La del contingut'],
            ['Fa cas de `width` i `height`?', 'Sí', 'No', 'Sí'],
            ['Li funcionen els marges de dalt i de baix?', 'Sí', 'No', 'Sí'],
          ],
          'Els tres comportaments, de costat'
        ),
        p("Les imatges, els botons i els camps de formulari ja es comporten així de sèrie: es posen a la línia, però accepten mides. Per això a una `<img>` li pots posar `width` sense tocar-li el `display`."),
        challenge({
          title: 'Tres xifres de costat',
          statement: "Les tres xifres d'aquesta ruta són `<div>`, i per això s'apilen. Fes que quedin de costat sense que perdin la seva amplada de 96 píxels.",
          html: `<div class="xifres">
  <div class="xifra">12 km</div>
  <div class="xifra">640 m</div>
  <div class="xifra">3 h 30</div>
</div>`,
          css: `${CSS_BASE}

.xifra {
  width: 96px;
  padding: 12px 0;
  color: #ffffff;
  text-align: center;
  background: #1f6f54;
  border-radius: 6px;
}`,
          hint: 'Necessites un valor de `display` que posi les caixes a la línia però els deixi conservar el `width`.',
          solution: {
            css: `${CSS_BASE}

.xifra {
  display: inline-block;
  width: 96px;
  padding: 12px 0;
  color: #ffffff;
  text-align: center;
  background: #1f6f54;
  border-radius: 6px;
}`,
          },
          explanation: "Amb `inline` haurien quedat de costat, però haurien perdut l'amplada. Amb `inline-block` conserven la mida i es col·loquen l'una al costat de l'altra, separades per un petit espai que no has demanat. D'on surt, ho veurem al final de la unitat.",
          checks: [
            { label: 'Les tres xifres estan de costat', selector: '.xifra', arrange: 'row' },
            { label: "Totes fan 96 píxels d'amplada", selector: '.xifra', all: true, size: { width: 96 } },
          ],
        }),
      ],
    },

    {
      id: 'display-none',
      title: 'Fer desaparèixer un element: display: none',
      blocks: [
        p("L'últim valor d'aquesta unitat és el més dràstic. `display: none` fa que l'element **no generi cap caixa**: no es veu, no ocupa lloc i els elements del voltant es col·loquen com si no existís."),
        example({
          title: 'Una ruta tancada que desapareix',
          intro: "A l'HTML hi ha tres rutes. Compta les que es veuen. Després esborra la regla `.tancada` del CSS.",
          html: `<h2>Rutes d'alta muntanya</h2>
<p class="ruta">Puigmal · 14 km</p>
<p class="ruta tancada">Pica d'Estats · 18 km · Tancada per neu</p>
<p class="ruta">Sant Jeroni · 11 km</p>`,
          css: `${CSS_BASE}

.ruta {
  margin: 0 0 8px;
  padding: 8px 12px;
  background: #e8f3ee;
}

.tancada {
  display: none;
}`,
          boxes: true,
          expected: "Només es veuen dues rutes, el Puigmal i Sant Jeroni, l'una just a sota de l'altra. En esborrar la regla, apareix la Pica d'Estats entre totes dues.",
          why: "L'element amb `display: none` continua escrit a l'HTML, però el navegador no li fa cap caixa. No hi queda cap forat: la tercera ruta puja a ocupar el lloc.",
        }),
        warning(
          'Amagat no vol dir esborrat',
          "Un element amb `display: none` no es veu a la pàgina, però continua al codi i qualsevol el pot llegir: no el facis servir per guardar res que no s'hagi de saber. Per a què serveix, doncs? Per tenir preparades coses que s'han de mostrar més tard: un menú que s'obre, un avís, un missatge d'error. Al dossier de JavaScript faràs aparèixer i desaparèixer elements posant-los i traient-los una classe com aquesta."
        ),
        p('Ara que coneixes els quatre valors, posa\'ls l\'un al costat de l\'altre:'),
        custom('CssPlayground', {
          title: 'Prova-ho: els quatre valors de display',
          intro: 'Les tres caixes tenen les mateixes mides escrites al CSS. Canvia el `display` de la del mig i mira què li passa a la seva mida i què fan les seves veïnes. Després mou l\'amplada amb cada valor.',
          items: ['Rutes', 'Mapa', 'Consells'],
          base: { padding: '16px' },
          itemBase: { display: 'inline-block', width: '90px', height: '48px' },
          highlight: 2,
          controls: [
            { target: 'item', prop: 'display', options: ['block', 'inline', 'inline-block', 'none'], initial: 'inline-block' },
            { target: 'item', prop: 'width', min: 60, max: 180, step: 10, unit: 'px', initial: 90 },
          ],
          height: 150,
        }),
      ],
    },

    {
      id: 'imatges-i-enllacos',
      title: 'Dos casos de cada dia: les imatges i els enllaços',
      blocks: [
        p("Hi ha dos llocs on el `display` et farà falta gairebé a cada pàgina. Tots dos tenen la mateixa causa: un element que és en línia i que voldries que fos un bloc."),
        subtitle('La franja de sota de les imatges'),
        p("Una `<img>` es col·loca a la línia com si fos una lletra molt gran. I les lletres no toquen el terra de la línia: a sota s'hi deixa un espai per a les que baixen, com la g o la p. La imatge hereta aquest espai i, quan és dins d'una caixa amb fons, es veu."),
        example({
          title: 'Una franja que no hi hauria de ser',
          intro: 'Mira la vora de sota de la foto: hi ha una franja fosca. Afegeix `display: block;` a la regla `.marc img`.',
          html: `<div class="marc">
  <img src="imatges/ruta-4.jpg" alt="Muntanyes verdes amb el sol al fons">
</div>`,
          css: `.marc {
  background: #23312b;
}

.marc img {
  width: 100%;
}`,
          expected: 'Sota de la foto es veu una franja fosca d\'uns quants píxels: és el fons del `<div>`. Amb `display: block` a la imatge, desapareix.',
          why: "Com a element en línia, la imatge s'assenta sobre la línia de base del text i deixa lloc a sota per a les lletres que baixen. Un bloc no viu dins de cap línia de text i, per tant, no té aquest espai.",
        }),
        concept(
          'Les imatges, gairebé sempre display: block',
          "Una imatge que fa de foto d'una targeta, de miniatura o de capçalera no és una paraula dins d'un text. Dona-li `display: block` i t'estalviaràs la franja. Molts fulls d'estils ho fan per a totes les imatges alhora, amb una regla `img { display: block; }` al principi."
        ),
        subtitle('Enllaços que es poden clicar sencers'),
        p("Un enllaç en línia només es pot clicar sobre les seves lletres. En un menú lateral, això obliga a apuntar al text. Convertit en bloc, l'enllaç ocupa tota la fila i accepta `padding`: tota la franja passa a ser enllaç."),
        example({
          title: 'Un menú lateral còmode',
          intro: 'Passa el ratolí per sobre de cada opció, també per l\'espai buit de la dreta. Després treu la línia `display: block;`.',
          html: `<nav class="lateral">
  <a href="index.html">Totes les rutes</a>
  <a href="#">Rutes fàcils</a>
  <a href="#">Alta muntanya</a>
  <a href="mapa.html">Mapa</a>
</nav>`,
          css: `${CSS_BASE}

.lateral {
  width: 220px;
  padding: 8px;
  background: #e8f3ee;
  border-radius: 8px;
}

.lateral a {
  display: block;
  padding: 10px 12px;
  color: #23312b;
  text-decoration: none;
  border-radius: 6px;
}

.lateral a:hover {
  color: #ffffff;
  background: #1f6f54;
}`,
          expected: 'Quatre opcions apilades. En passar-hi el ratolí, tota la franja es pinta de verd, no només el text. Sense `display: block`, els enllaços es posen de costat i el seu farciment se superposa.',
          why: "La zona on es pot clicar un enllaç és la seva caixa. En línia, la caixa és el text. De bloc, la caixa ocupa tota l'amplada del menú i creix amb el `padding`, i l'efecte de `:hover` ho deixa veure.",
        }),
      ],
    },

    {
      id: 'menu-en-linia',
      title: 'Un menú en línia, i fins on arriba inline-block',
      blocks: [
        p("Amb el que saps, ja pots posar en una línia el menú de la web de rutes i fer-ne botons: n'hi ha prou de fer `inline-block` els enllaços per poder-los donar farciment."),
        example({
          title: 'El menú de la capçalera',
          intro: 'Els enllaços del menú ja són botons amb farciment. Amb els quadrats activats, fixa\'t en dues coses: on és el menú respecte del logo i què hi ha entre botó i botó.',
          html: HTML_CAPCALERA,
          css: `${CSS_CAPCALERA}

.menu a {
  display: inline-block;
  padding: 8px 12px;
  background: #23312b;
  border-radius: 6px;
}`,
          boxes: true,
          expected: 'El logo a dalt i, a sota, els tres botons del menú en una línia, separats per un petit espai.',
          why: "Els enllaços es posen de costat perquè són `inline-block`. Però el `<nav>` que els conté és un bloc, i per això tot el menú baixa a sota del logo. I entre botó i botó hi ha un espai que no surt de cap marge.",
        }),
        p("Fins aquí arriba `inline-block`. Si intentes acabar la capçalera amb ell, ensopegaràs amb tres problemes. Convé que els coneguis, perquè són justament els que resol la unitat següent:"),
        list(
          "**Els espais fantasma.** Entre dos elements `inline-block` hi ha un espai, igual que entre dues paraules: és el salt de línia que hi ha a l'HTML entre una etiqueta i la següent. No es pot ajustar amb cap propietat.",
          '**L\'alineació vertical.** Si poses el menú al costat del logo, que té la lletra més gran, tots dos s\'alineen per la base del text, no pel centre.',
          "**Enviar una cosa a l'altra punta.** No hi ha cap manera neta de dir «el logo a l'esquerra i el menú a la dreta». Caldria calcular marges a mà."
        ),
        example({
          title: 'El menú al costat del logo, a mitges',
          intro: 'Ara el `<nav>` també és `inline-block` i puja al costat del logo. Prova d\'enviar-lo a la dreta de tot canviant el `margin-left`. Després posa\'t a pantalla completa i mira si el número que has trobat encara serveix.',
          html: HTML_CAPCALERA,
          css: `${CSS_CAPCALERA}

.menu {
  display: inline-block;
  margin-left: 24px;
}

.menu a {
  display: inline-block;
  padding: 8px 12px;
  background: #23312b;
  border-radius: 6px;
}`,
          boxes: true,
          expected: 'Si hi caben, el logo i el menú queden a la mateixa línia, junts a l\'esquerra, i els botons una mica més avall que el centre del logo. Si no hi caben, el menú sencer baixa a la línia de sota.',
          why: "Amb un marge fix pots acostar el menú a la dreta per a una amplada concreta, però quan l'amplada canvia, el marge ja no serveix. I l'alineació depèn de la mida de cada lletra. `inline-block` va bé per a peces petites; per repartir una fila sencera fa falta una altra eina.",
        }),
        concept(
          'Cada eina, per a la seva feina',
          "`block`, `inline` i `inline-block` decideixen com es comporta **un** element. Però maquetar és col·locar uns quants elements **els uns respecte dels altres**: repartir-los, alinear-los, separar-los. Això no ho pot decidir cap dels fills: ho ha de decidir el pare. I per a això hi ha un altre valor de `display`, que es posa al contenidor: `flex`. És [la unitat següent](#/unitat/flexbox)."
        ),
        project(
          "La web de rutes fa dos passos petits. Els enllaços del menú ja són botons amb farciment que es posen en una línia, i les fotos de les targetes ja no deixen cap franja a sota. La capçalera, amb el logo a una punta i el menú a l'altra, haurà d'esperar a la unitat següent.",
          {
            title: 'El menú en línia i les fotos sense franja',
            lang: 'css',
            code: `.menu a {
  display: inline-block;
  padding: 8px 12px;
}

.ruta img {
  display: block;
}`,
          }
        ),
      ],
    },
  ],

  commonErrors: [
    {
      title: 'Posar width i height a un element en línia',
      bad: `.menu a {
  width: 120px;
  height: 40px;
}`,
      badLang: 'css',
      symptom: 'Els enllaços continuen fent la mida justa del seu text, com si les dues línies no hi fossin.',
      why: "Un `<a>` és un element en línia, i els elements en línia no fan cas de `width` ni de `height`. Les regles estan ben escrites; el que no les accepta és la mena de caixa.",
      fix: `.menu a {
  display: inline-block;
  width: 120px;
  height: 40px;
}`,
      fixLang: 'css',
    },
    {
      title: 'Esperar que dos blocs es posin de costat perquè hi caben',
      bad: `.caixa {
  width: 150px;
}`,
      badLang: 'css',
      symptom: 'Les dues caixes fan 150 píxels d\'amplada, però continuen l\'una sota l\'altra, amb tot l\'espai de la dreta buit.',
      why: "Un bloc es reserva tota la línia, faci l'amplada que faci. Fer-lo més estret no convida el següent a pujar.",
      fix: `.caixa {
  display: inline-block;
  width: 150px;
}`,
      fixLang: 'css',
    },
    {
      title: 'Deixar la franja de sota de les imatges',
      bad: `.marc img {
  width: 100%;
}`,
      badLang: 'css',
      symptom: 'Entre la foto i la vora de sota del seu contenidor queda una franja d\'uns quants píxels, del color de fons.',
      why: "La imatge és un element en línia: s'assenta sobre la línia de base del text i deixa lloc a sota per a les lletres que baixen. No és cap marge, i per això `margin: 0` no la treu.",
      fix: `.marc img {
  display: block;
  width: 100%;
}`,
      fixLang: 'css',
    },
    {
      title: 'Buscar el marge que separa dos elements inline-block',
      bad: `<a class="boto" href="index.html">Rutes</a>
<a class="boto" href="mapa.html">Mapa</a>`,
      badLang: 'html',
      symptom: 'Entre els dos botons hi ha una separació d\'uns quatre píxels, i no surt de cap `margin` ni de cap `padding`.',
      why: "El salt de línia que hi ha a l'HTML entre una etiqueta i la següent compta com un espai, igual que entre dues paraules. L'única manera de treure'l amb `inline-block` és enganxar les etiquetes, i el codi queda il·legible. A la unitat següent, amb Flexbox, la separació la decidiràs tu.",
      fix: `<a class="boto" href="index.html">Rutes</a><a class="boto" href="mapa.html">Mapa</a>`,
      fixLang: 'html',
    },
    {
      title: 'Posar salts de línia a l\'HTML per apilar elements en línia',
      bad: `<a href="index.html">Rutes</a><br>
<a href="mapa.html">Mapa</a><br>
<a href="consells.html">Consells</a>`,
      badLang: 'html',
      symptom: 'Els enllaços queden l\'un sota l\'altre, però no accepten amplada ni farciment de dalt i de baix, i cada opció nova demana un `<br>` més.',
      why: "Els enllaços continuen sent en línia: només els has posat en línies diferents. Com es col·loquen les coses és feina del CSS, no de l'HTML.",
      fix: `.menu a {
  display: block;
}`,
      fixLang: 'css',
    },
  ],

  exercises: [
    {
      id: 'menu-lateral',
      title: 'Un menú, una opció per línia',
      statement: 'Els quatre enllaços d\'aquest menú lateral són elements en línia: es posen de costat, salten de línia on poden i el seu farciment es trepitja. Fes que cadascun ocupi una línia sencera, de banda a banda del menú. No toquis l\'HTML.',
      expected: 'Quatre franges apilades dins del menú, separades per una ratlla. Cada franja arriba fins a la vora dreta.',
      html: `<nav class="lateral">
  <a href="#">Rutes fàcils</a>
  <a href="#">Alta muntanya</a>
  <a href="#">Amb nens</a>
  <a href="mapa.html">Mapa</a>
</nav>`,
      css: `${CSS_BASE}

.lateral {
  width: 220px;
  background: #e8f3ee;
}

.lateral a {
  padding: 10px 12px;
  color: #23312b;
  border-bottom: 1px solid #c9d6cf;
}`,
      hint: 'Només has d\'afegir una propietat a la regla `.lateral a`: la que fa que un enllaç es comporti com un paràgraf.',
      solution: {
        css: `${CSS_BASE}

.lateral {
  width: 220px;
  background: #e8f3ee;
}

.lateral a {
  display: block;
  padding: 10px 12px;
  color: #23312b;
  border-bottom: 1px solid #c9d6cf;
}`,
      },
      explanation: "Amb `display: block`, cada enllaç comença en una línia nova i s'estira fins a ocupar tota l'amplada del menú. El `padding` de dalt i de baix, que abans es trepitjava, ara fa lloc de veritat.",
      checks: [
        { label: "Les opcions estan l'una sota l'altra", selector: '.lateral a', arrange: 'column' },
        { label: "Cada opció ocupa tota l'amplada del menú", selector: '.lateral a', all: true, fills: 'x' },
      ],
    },
    {
      id: 'foto-sense-franja',
      title: 'La foto, sense franja',
      statement: 'Sota de la foto d\'aquesta targeta es veu una franja fosca: és el fons del marc, que sobresurt. Fes que desaparegui sense treure el fons ni canviar l\'HTML.',
      expected: 'La foto arriba exactament fins a la vora de sota del marc. A sota hi ha el nom de la ruta.',
      html: `<article class="ruta">
  <div class="marc">
    <img src="imatges/ruta-5.jpg" alt="Muntanyes de color rosat">
  </div>
  <h2>Puigmal</h2>
</article>`,
      css: `${CSS_BASE}

.ruta {
  width: 260px;
}

.marc {
  background: #23312b;
}

.marc img {
  width: 100%;
}

.ruta h2 {
  margin: 8px 0 0;
  font-size: 20px;
}`,
      hint: 'La franja surt perquè la imatge és un element en línia. Quin valor de `display` la treu de la línia de text?',
      solution: {
        css: `${CSS_BASE}

.ruta {
  width: 260px;
}

.marc {
  background: #23312b;
}

.marc img {
  display: block;
  width: 100%;
}

.ruta h2 {
  margin: 8px 0 0;
  font-size: 20px;
}`,
      },
      explanation: "La imatge, en línia, s'assentava sobre la línia de base i deixava lloc a sota per a les lletres que baixen. Convertida en bloc, ja no forma part de cap línia de text i el marc fa exactament la seva alçada.",
      checks: [
        { label: 'No hi ha cap espai entre la foto i la vora de sota del marc', selector: '.marc img', inside: '.marc', offset: { bottom: 0 } },
        { label: "La foto continua ocupant tota l'amplada del marc", selector: '.marc img', inside: '.marc', fills: 'x' },
      ],
    },
    {
      id: 'etiquetes-amb-mida',
      title: 'Etiquetes de la mateixa mida',
      statement: "Cada ruta porta tres etiquetes. Han de quedar de costat i fer totes 84 píxels d'amplada i 28 d'alçada, perquè el text hi quedi centrat. Les mides ja són al CSS, però no s'apliquen. Arregla-ho.",
      expected: 'Tres píndoles verdes iguals, de costat, amb el text centrat.',
      html: `<p class="etiquetes">
  <span class="etiqueta">Fàcil</span>
  <span class="etiqueta">Circular</span>
  <span class="etiqueta">Amb gos</span>
</p>`,
      css: `${CSS_BASE}

.etiqueta {
  width: 84px;
  height: 28px;
  font-size: 14px;
  line-height: 28px;
  color: #ffffff;
  text-align: center;
  background: #1f6f54;
  border-radius: 14px;
}`,
      hint: [
        'Un `<span>` és un element en línia, i per això no fa cas de `width` ni de `height`.',
        'Amb `block` acceptarien les mides, però s\'apilarien. Hi ha un valor que fa les dues coses.',
      ],
      solution: {
        css: `${CSS_BASE}

.etiqueta {
  display: inline-block;
  width: 84px;
  height: 28px;
  font-size: 14px;
  line-height: 28px;
  color: #ffffff;
  text-align: center;
  background: #1f6f54;
  border-radius: 14px;
}`,
      },
      explanation: "`inline-block` deixa les etiquetes a la línia, l'una al costat de l'altra, i alhora els fa acceptar l'amplada i l'alçada. El `text-align: center`, que abans no es notava perquè la caixa era de la mida del text, ara centra cada paraula.",
      checks: [
        { label: 'Les tres etiquetes estan de costat', selector: '.etiqueta', arrange: 'row' },
        { label: "Totes fan 84 píxels d'amplada", selector: '.etiqueta', all: true, size: { width: 84 } },
        { label: "Totes fan 28 píxels d'alçada", selector: '.etiqueta', all: true, size: { height: 28 } },
      ],
    },
    {
      id: 'rutes-tancades',
      title: 'Amaga les rutes tancades',
      statement: [
        "A l'hivern, algunes rutes es tanquen. A l'HTML porten la classe `tancada`. Fes que no es vegin ni ocupin lloc.",
        "A més, l'avís del final és un `<span>` i el seu fons groc només cobreix el text. Fes que ocupi tota l'amplada, com una franja.",
      ],
      expected: 'Dues rutes, el Camí de Ronda i l\'Estany de Sant Maurici, l\'una just a sota de l\'altra, i una franja groga de banda a banda amb l\'avís.',
      html: `<h2>Rutes d'hivern</h2>
<p class="ruta">Camí de Ronda · 12 km</p>
<p class="ruta tancada">Pica d'Estats · 18 km</p>
<p class="ruta">Estany de Sant Maurici · 7 km</p>
<p class="ruta tancada">Puigmal · 14 km</p>
<span class="avis">Hi ha rutes tancades per neu.</span>`,
      css: `${CSS_BASE}

.ruta {
  margin: 0 0 8px;
  padding: 8px 12px;
  background: #e8f3ee;
}

.avis {
  padding: 8px 12px;
  background: #ffe9a8;
}`,
      hint: [
        'Per a les rutes tancades cal una regla nova, amb el selector `.tancada`.',
        'A l\'avís li falta comportar-se com un bloc: és un canvi de `display` a la regla `.avis`.',
      ],
      solution: {
        css: `${CSS_BASE}

.ruta {
  margin: 0 0 8px;
  padding: 8px 12px;
  background: #e8f3ee;
}

.tancada {
  display: none;
}

.avis {
  display: block;
  padding: 8px 12px;
  background: #ffe9a8;
}`,
      },
      explanation: "Dos canvis de `display` en sentits contraris. `none` treu de la pàgina les rutes tancades sense deixar-hi cap forat: les altres pugen. I `block` converteix l'avís, que era una paraula més dins d'una línia, en una caixa que ocupa tota l'amplada.",
      checks: [
        { label: 'Les rutes tancades no es veuen', selector: '.tancada', all: true, style: { display: 'none' } },
        { label: "Les dues rutes obertes queden l'una just a sota de l'altra", selector: '.ruta:not(.tancada)', arrange: 'column', gap: 8 },
        { label: "L'avís ocupa tota l'amplada", selector: '.avis', fills: 'x' },
      ],
    },
  ],

  finalExercise: {
    id: 'capcalera-en-linia',
    title: 'La capçalera, fins on arriba inline-block',
    statement: [
      'Deixa la capçalera de la web de rutes tan acabada com es pot amb el que saps. Hi ha tres coses a fer, i totes tres són un canvi de `display`.',
      "El menú ha de pujar **al costat del logo**, a la mateixa línia. Els tres enllaços del menú han de ser botons de 96 píxels d'amplada i 36 d'alçada (les mides ja són al CSS). I el botó «☰», que només té sentit al mòbil, no s'ha de veure.",
      "No intentis enviar el menú a la dreta de tot: amb `inline-block` no es pot fer bé. Ho resoldrem a la unitat següent.",
    ],
    expected: 'Una franja verda amb el logo a l\'esquerra i, al seu costat, tres botons foscos de la mateixa mida. El botó «☰» no hi és.',
    width: 720,
    boxes: true,
    html: `<header class="capcalera">
  <button class="boto-menu" type="button">☰</button>
  <a class="logo" href="index.html">▲ Camins</a>

  <nav class="menu">
    <a href="index.html">Rutes</a>
    <a href="mapa.html">Mapa</a>
    <a href="consells.html">Consells</a>
  </nav>
</header>`,
    css: `body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.capcalera {
  padding: 12px 24px;
  background: #1f6f54;
}

.capcalera a {
  color: #ffffff;
  text-decoration: none;
}

.logo {
  font-size: 22px;
  font-weight: bold;
}

.menu {
  margin-left: 24px;
}

.menu a {
  width: 96px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  background: #23312b;
  border-radius: 6px;
}`,
    hint: [
      "Compta els elements que han de canviar de comportament: el botó (ha de desaparèixer), el `<nav>` (ha de deixar de ser un bloc) i els enllaços (han d'acceptar mides).",
      'El `<nav>` és un bloc i per això baixa de línia. Amb quin valor es posaria a continuació del logo, com una paraula més?',
    ],
    solution: {
      css: `body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.capcalera {
  padding: 12px 24px;
  background: #1f6f54;
}

.capcalera a {
  color: #ffffff;
  text-decoration: none;
}

.boto-menu {
  display: none;
}

.logo {
  font-size: 22px;
  font-weight: bold;
}

.menu {
  display: inline-block;
  margin-left: 24px;
}

.menu a {
  display: inline-block;
  width: 96px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  background: #23312b;
  border-radius: 6px;
}`,
    },
    explanation: [
      "Tres elements, tres valors de `display`. El botó desapareix amb `none`. El `<nav>`, amb `inline-block`, es comporta com una paraula i puja al costat del logo. I els enllaços, també amb `inline-block`, accepten l'amplada i l'alçada que ja tenien escrites.",
      "Mira el resultat amb els quadrats activats: els botons no estan centrats respecte del logo, entre ells hi ha un espai que no has demanat i el menú no es pot enviar a la dreta. Són els tres límits d'`inline-block`. A la unitat següent, amb `display: flex` a la capçalera, desapareixeran tots tres.",
    ],
    checks: [
      { label: 'El botó «☰» no es veu', selector: '.boto-menu', style: { display: 'none' } },
      { label: 'El menú és a la mateixa línia que el logo, a la seva dreta', selector: '.menu', rightOf: '.logo', sameRow: '.logo' },
      { label: 'Els tres enllaços del menú estan de costat', selector: '.menu a', arrange: 'row' },
      { label: "Cada enllaç fa 96 píxels d'amplada i 36 d'alçada", selector: '.menu a', all: true, size: { width: 96, height: 36 } },
    ],
  },

  summary: [
    "En el **flux normal**, els elements de bloc s'apilen i ocupen tota l'amplada; els elements en línia es posen de costat i fan la mida del seu contingut.",
    'Un element en línia no fa cas de `width`, de `height` ni dels marges de dalt i de baix.',
    "`display` canvia el comportament d'un element sense canviar-ne l'etiqueta: `block`, `inline` o `inline-block`.",
    '`inline-block` es col·loca a la línia però accepta mides: va bé per a botons i etiquetes.',
    "`display: none` fa que l'element no generi cap caixa: no es veu ni ocupa lloc, però continua al codi.",
    'Les imatges són en línia i deixen una franja a sota: `display: block` la treu. I un enllaç de bloc es pot clicar sencer.',
    "`inline-block` té límits (espais entre elements, alineació, repartiment): per col·locar els fills d'un contenidor cal Flexbox.",
  ],

  quiz: [
    {
      question: 'Hi ha tres `<p>` seguits, sense cap CSS. Com queden?',
      options: [
        { text: "L'un sota l'altre, cadascun ocupant tota l'amplada", correct: true },
        { text: 'De costat, si hi caben', why: 'Això ho fan els elements en línia. Un paràgraf és un bloc: es reserva tota la línia.' },
        { text: "L'un sota l'altre, cadascun de l'amplada del seu text", why: "Un bloc ocupa tota l'amplada disponible, encara que el text sigui curt. Activa els quadrats i ho veuràs." },
        { text: 'Sobreposats, al mateix lloc', why: 'En el flux normal, cap caixa en trepitja una altra.' },
      ],
      explanation: "Un `<p>` és un element de bloc: comença en una línia nova i s'estira de banda a banda.",
    },
    {
      question: 'Has escrit `a { width: 200px; height: 50px; }` i els enllaços no canvien de mida. Per què?',
      options: [
        { text: 'Perquè `<a>` és un element en línia, i els elements en línia no fan cas de `width` ni de `height`', correct: true },
        { text: 'Perquè els enllaços no poden tenir mides', why: "Sí que en poden tenir: n'hi ha prou de canviar-los el `display`." },
        { text: "Perquè les mides s'han d'escriure a l'HTML", why: 'Les mides són cosa del CSS. El que falla és la mena de caixa.' },
        { text: 'Perquè el pare dels enllaços és massa estret', why: "L'amplada del pare no hi té res a veure: un element en línia fa sempre la mida del seu contingut." },
      ],
      explanation: 'Les regles estan ben escrites, però no tenen efecte en una caixa en línia. Amb `display: inline-block` o `display: block`, s\'aplicarien.',
    },
    {
      question: 'Quina diferència hi ha entre `inline` i `inline-block`?',
      options: [
        { text: 'Tots dos es queden a la línia, però només `inline-block` fa cas de `width`, de `height` i dels marges de dalt i de baix', correct: true },
        { text: '`inline-block` comença sempre en una línia nova', why: "Això és el que fa `block`. Un element `inline-block` es col·loca a continuació de l'anterior." },
        { text: '`inline` accepta mides i `inline-block` no', why: "És a l'inrevés." },
        { text: 'Cap: són dos noms per al mateix', why: 'Es col·loquen igual, però per dins un `inline-block` és un bloc.' },
      ],
      explanation: '`inline-block` es col·loca com un element en línia i, per dins, es comporta com un bloc.',
    },
    {
      question: 'Un `<div>` té `width: 100px`. A continuació hi ha un altre `<div>`. On es col·loca el segon?',
      options: [
        { text: 'A sota del primer, encara que al costat hi hagi lloc', correct: true },
        { text: 'Al costat del primer, perquè hi cap', why: "Un bloc es reserva tota la línia, faci l'amplada que faci." },
        { text: 'Al costat, però només si també té `width`', why: 'Tenir amplada no canvia el comportament: continuen sent dos blocs.' },
        { text: 'A sobre del primer, tapant-lo', why: 'En el flux normal les caixes no se sobreposen.' },
      ],
      explanation: "`width` canvia la mida d'un bloc, no la manera com es col·loca. Per posar-los de costat cal canviar el `display` o, com veurem, dir-ho al pare.",
    },
    {
      question: 'Què passa amb el lloc que ocupava un element quan li poses `display: none`?',
      options: [
        { text: 'Desapareix: els elements següents pugen a ocupar-lo', correct: true },
        { text: 'Hi queda un forat de la mateixa mida', why: "L'element no genera cap caixa i, per tant, no reserva cap espai." },
        { text: "L'element es fa transparent, però continua allà", why: 'No és que no es vegi: és que no hi ha caixa.' },
        { text: "L'element s'esborra de l'HTML", why: 'El codi no canvia: l\'element continua escrit i es pot tornar a mostrar.' },
      ],
      explanation: "Amb `display: none`, el navegador col·loca la resta de la pàgina com si l'element no existís.",
    },
    {
      question: 'Dins d\'una targeta, sota de la foto, queda una franja buida d\'uns quants píxels. Com es treu?',
      options: [
        { text: 'Posant `display: block` a la imatge', correct: true },
        { text: 'Posant `margin: 0` a la imatge', why: 'La franja no és cap marge: és el lloc que la línia de text reserva a sota per a les lletres que baixen.' },
        { text: 'Posant `display: inline` a la imatge', why: 'La imatge ja es comporta com un element en línia: és justament la causa.' },
        { text: 'Fent la targeta més baixa amb `height`', why: 'Tallaries la targeta, però la causa continuaria allà.' },
      ],
      explanation: 'Una imatge de bloc no viu dins de cap línia de text i, per tant, no deixa l\'espai de sota.',
    },
  ],
};
