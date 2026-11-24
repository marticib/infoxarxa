import { p, list, example, concept, warning, challenge, project, table, custom } from '../../blocks.js';

const CSS_BASE = `body {
  font-family: Arial, sans-serif;
}`;

const CSS_PAGINA = `body {
  margin: 0;
  font-family: Arial, sans-serif;
}`;

// La capçalera de la web de rutes amb un cercador entre el logo i el botó.
const HTML_CAPCALERA_SIMPLE = `<header class="capcalera">
  <a class="logo" href="index.html">▲ Camins</a>
  <input class="cercador" type="search" placeholder="Cerca una ruta">
  <button class="boto" type="button">Entra</button>
</header>`;

const CSS_CAPCALERA = `${CSS_PAGINA}

.capcalera {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 24px;
  background: #1f6f54;
}

.logo {
  font-size: 22px;
  font-weight: bold;
  color: #ffffff;
  text-decoration: none;
}

.boto {
  padding: 8px 16px;
  font-size: 16px;
  color: #1f6f54;
  background: #ffffff;
  border: 0;
  border-radius: 20px;
}`;

const OPINIO_LLARGA =
  "Vam fer la ruta un diumenge de maig, sortint ben d'hora per evitar la calor. El camí està ben senyalitzat i hi ha fonts a mig recorregut, però convé portar calçat de muntanya perquè l'últim tram és pedregós i fa força pujada.";

const DESCRIPCIO_LLARGA =
  "El sostre de Catalunya. Una ruta llarga i exigent que surt del refugi de Vallferrera, passa per tres estanys i acaba amb una grimpada fàcil fins al cim. Convé sortir de nit i portar roba d'abric fins i tot a l'estiu.";

// La targeta horitzontal d'una ruta: la foto i, al costat, una columna de text.
const HTML_TARGETA = `<article class="ruta">
  <div class="foto">
    <img src="imatges/ruta-3.jpg" alt="El cim de la Pica d'Estats">
  </div>

  <div class="text">
    <h3>Pica d'Estats</h3>

    <div class="dades">
      <span>18 km</span>
      <span>9 h</span>
      <span>Difícil</span>
    </div>

    <p>${DESCRIPCIO_LLARGA}</p>
  </div>
</article>`;

const CSS_TARGETA_ASPECTE = `.foto img {
  display: block;
  width: 100%;
  border-radius: 8px;
}

.text h3 {
  margin: 0;
  font-size: 22px;
}

.text p {
  margin: 0;
  line-height: 1.5;
  color: #5b6b63;
}

.dades span {
  padding: 4px 10px;
  font-size: 14px;
  background: #e8f3ee;
  border-radius: 12px;
}`;

export const glossary = [
  {
    term: 'flex (propietat)',
    definition:
      "Propietat dels fills d'un contenidor flex que diu com es reparteixen l'espai. `flex: 1` vol dir «queda't l'espai que sobri»; `flex: none`, «no canviïs de mida».",
  },
  {
    term: 'flex-grow',
    definition:
      "Quina part de l'espai que sobra es queda un fill d'un contenidor flex. Amb `0`, el valor per defecte, no creix. És el que hi ha darrere de `flex: 1`.",
  },
  {
    term: 'flex: none',
    definition:
      "Fa que un fill d'un contenidor flex no creixi ni s'encongeixi: es queda amb la mida que li has donat. És per a les peces de mida fixa, com un avatar o una miniatura.",
  },
  {
    term: 'flex-wrap',
    definition:
      "Propietat del contenidor flex que decideix què passa quan els fills no caben en una línia. Amb `wrap`, salten a la línia següent; sense, s'encongeixen o surten del contenidor.",
  },
  {
    term: 'align-self',
    definition:
      "Propietat d'un fill d'un contenidor flex que l'alinea a l'eix transversal d'una manera diferent dels seus germans. Té els mateixos valors que `align-items`.",
  },
  {
    term: 'margin-left: auto',
    definition:
      "Dins d'un contenidor flex, un marge `auto` es queda tot l'espai que sobra. `margin-left: auto` empeny un fill, i tots els que venen darrere, cap a la dreta.",
  },
];

export default {
  id: 'flexbox-2',
  number: 8,
  title: "Flexbox a fons: repartir l'espai i niuar",
  shortTitle: 'Flexbox a fons',
  description:
    "Qui es queda l'espai que sobra, quines peces no han de canviar de mida i com es munta una peça sencera ficant files dins de columnes dins de files.",

  problem: {
    title: 'Les peces ja estan en fila, però cap fa la mida que vull',
    text: [
      "La capçalera de la web de rutes ja és una fila. Ara hi volem un cercador entre el logo i el botó, i no el volem petit: ha d'ocupar tot l'espai que quedi lliure, sigui quina sigui l'amplada de la finestra. Amb `justify-content` podem moure'l, però no fer-lo créixer.",
      "A les targetes de les rutes passa el contrari. La foto ha de fer sempre 220 píxels, i quan la descripció és llarga la foto s'aprima sense que ningú l'hi hagi demanat.",
      "A la unitat anterior vam decidir **on** va cada fill. En aquesta decidirem **quant ocupa** cada un. I, amb això, ja podrem agafar el dibuix d'una peça sencera, amb quadrats dins de quadrats, i convertir-lo en CSS sense deixar res a l'atzar.",
    ],
  },

  goals: [
    "Fer que un fill es quedi l'espai que sobra amb `flex: 1`.",
    "Evitar que una peça de mida fixa s'encongeixi amb `flex: none`.",
    'Deixar que una fila salti de línia amb `flex-wrap`.',
    "Empènyer un fill cap a l'altra punta amb `margin-left: auto` i alinear-ne un de sol amb `align-self`.",
    'Maquetar una peça sencera niuant files i columnes a partir del seu dibuix.',
  ],

  projectPiece:
    "La capçalera guanya un cercador que s'estira entre el logo i els botons, i cada ruta es converteix en una targeta horitzontal: la foto, de mida fixa, i al costat una columna amb el títol, les dades i la descripció.",

  finalProject:
    "El cercador que s'estira al mig de la capçalera, l'avatar rodó que no s'ha d'aixafar mai i la targeta amb l'avatar i el text de costat surten d'aquí.",

  sections: [
    {
      id: 'flex-1',
      title: "Qui es queda l'espai que sobra: flex: 1",
      blocks: [
        p("En una fila, els fills fan l'amplada del seu contingut i gairebé sempre sobra espai. A la unitat anterior aquest espai el repartíem **entre** els fills, amb `justify-content`. Hi ha una altra opció: donar-lo a **un dels fills**, perquè creixi fins a omplir-lo."),
        p("Això es fa amb `flex: 1`, i és la primera propietat de Flexbox que no s'escriu al pare: s'escriu **al fill** que ha de créixer."),
        example({
          title: "Un cercador que s'estira",
          intro: "La capçalera té tres fills. Només un porta `flex: 1`: busca la regla `.cercador`, al final del CSS. Esborra aquesta línia i torna-la a posar, amb els quadrats activats.",
          html: HTML_CAPCALERA_SIMPLE,
          css: `${CSS_CAPCALERA}

.cercador {
  flex: 1;
  padding: 8px 12px;
  font-size: 16px;
  border: 0;
  border-radius: 6px;
}`,
          width: 760,
          boxes: true,
          expected: "El logo a l'esquerra, el botó a la dreta de tot i, entre tots dos, el cercador ocupant tot l'espai. Sense `flex: 1`, el cercador és petit i el botó queda enganxat al seu costat.",
          why: "El logo i el botó fan l'amplada del seu text. Tot el que sobra de la fila se'l queda l'únic fill que té `flex: 1`. Si la finestra es fa més ampla o més estreta, és el cercador qui canvia de mida; els altres dos, no.",
        }),
        p("I si hi ha més d'un fill amb `flex: 1`? Llavors l'espai es reparteix entre ells. El número diu **quantes parts** en toquen a cadascú."),
        custom('CssPlayground', {
          title: 'Prova-ho: flex-grow',
          intro: "Els tres fills creixen (`flex-grow: 1`) i es reparteixen l'espai que sobra a parts iguals. Canvia només el del mig.",
          items: 3,
          base: { display: 'flex', gap: '8px' },
          itemBase: { 'flex-grow': '1' },
          highlight: 2,
          controls: [{ target: 'item', prop: 'flex-grow', options: ['0', '1', '2'], initial: '1' }],
          height: 90,
        }),
        list(
          "Amb `0`, el fill del mig no creix: es queda amb l'amplada del seu contingut. És el valor per defecte.",
          "Amb `1`, creix igual que els seus germans.",
          "Amb `2`, es queda el doble d'espai sobrant que cada un dels altres."
        ),
        concept(
          'flex: 1 vol dir «queda\'t el que sobri»',
          "`flex-grow` és el nom complet del que acabes de provar. A la pràctica s'escriu gairebé sempre la drecera `flex: 1`, que fa créixer el fill i, a més, fa que tots els germans que la porten quedin **exactament igual d'amples**, tinguin el text que tinguin. Si només la porta un fill, s'ho queda tot ell."
        ),
        example({
          title: 'Tres columnes iguals',
          intro: "Els tres textos són de llargades diferents, però les tres caixes fan la mateixa amplada. Treu `flex: 1` i compara.",
          html: `<div class="resum">
  <div class="dada">12 km</div>
  <div class="dada">3 h 30 min</div>
  <div class="dada">640 m de pujada</div>
</div>`,
          css: `${CSS_BASE}

.resum {
  display: flex;
  gap: 12px;
}

.dada {
  flex: 1;
  padding: 12px 8px;
  color: #ffffff;
  text-align: center;
  background: #1f6f54;
  border-radius: 8px;
}`,
          expected: "Tres caixes verdes de la mateixa amplada que, juntes, omplen tota la fila.",
          why: "Tots tres fills tenen `flex: 1`: es reparteixen l'amplada a parts iguals. Sense, cada caixa faria l'amplada del seu text i sobraria espai a la dreta.",
        }),
        table(
          ['Es decideix al pare', 'Es decideix a cada fill'],
          [
            ['`display: flex`', '`flex: 1` (creix)'],
            ['`flex-direction`', '`flex: none` (no canvia de mida)'],
            ['`justify-content`, `align-items`', '`align-self`'],
            ['`gap`, `flex-wrap`', '`margin-left: auto`'],
          ],
          'On s\'escriu cada propietat de Flexbox'
        ),
        challenge({
          title: 'Dos botons, la mateixa amplada',
          statement: "Els dos botons estan en fila, però cada un fa l'amplada del seu text. Fes que tots dos facin la mateixa amplada i que, entre tots dos, omplin la fila sencera.",
          html: `<div class="accions">
  <button type="button">Cancel·la</button>
  <button type="button">Desa la ruta als preferits</button>
</div>`,
          css: `${CSS_BASE}

.accions {
  display: flex;
  gap: 12px;
}

.accions button {
  padding: 10px 16px;
  font-size: 16px;
  color: #1f6f54;
  background: #e8f3ee;
  border: 1px solid #1f6f54;
  border-radius: 8px;
}`,
          hint: "La propietat va als fills, no al pare: afegeix-la a la regla `.accions button`.",
          solution: {
            css: `${CSS_BASE}

.accions {
  display: flex;
  gap: 12px;
}

.accions button {
  flex: 1;
  padding: 10px 16px;
  font-size: 16px;
  color: #1f6f54;
  background: #e8f3ee;
  border: 1px solid #1f6f54;
  border-radius: 8px;
}`,
          },
          explanation: "Com que tots dos botons tenen `flex: 1`, es reparteixen l'amplada a parts iguals, sense que importi que un text sigui molt més llarg que l'altre.",
          checks: [
            { label: 'Els dos botons fan la mateixa amplada', selector: '.accions button', sameSize: 'width' },
            { label: "L'últim botó arriba fins al final de la fila", selector: '.accions button:last-child', offset: { right: 0 } },
            { label: 'Continuen separats 12 píxels', selector: '.accions button', gap: { x: 12 } },
          ],
        }),
      ],
    },

    {
      id: 'flex-none',
      title: 'Peces que no han de canviar de mida: flex: none',
      blocks: [
        p("Els fills d'un contenidor flex no només poden créixer: per defecte, també **es poden encongir**. Quan el contingut no cap a la fila, el navegador aprima els fills per fer-lo cabre. Gairebé sempre va bé, però hi ha peces que no s'haurien d'aprimar mai: un avatar rodó, una miniatura, una icona."),
        example({
          title: "Un avatar que no s'aixafa",
          intro: "L'avatar fa 48 per 48 píxels. Esborra la línia `flex: none;` de `.avatar` i mira què li passa al cercle.",
          html: `<article class="opinio">
  <div class="avatar">LM</div>
  <p>${OPINIO_LLARGA}</p>
</article>`,
          css: `${CSS_BASE}

.opinio {
  display: flex;
  gap: 12px;
  padding: 12px;
  background: #e8f3ee;
  border-radius: 8px;
}

.avatar {
  flex: none;
  width: 48px;
  height: 48px;
  font-weight: bold;
  line-height: 48px;
  color: #ffffff;
  text-align: center;
  background: #1f6f54;
  border-radius: 50%;
}

.opinio p {
  margin: 0;
  line-height: 1.5;
}`,
          boxes: true,
          expected: "Un cercle verd amb les inicials i, al costat, el text de l'opinió. Sense `flex: none`, el cercle es converteix en un oval estret.",
          why: "El paràgraf és molt llarg i, si pogués, s'estiraria en una sola línia. Com que no hi cap, el navegador encongeix **tots dos** fills, i l'avatar perd amplada encara que li haguem escrit `width: 48px`. Amb `flex: none`, l'avatar no es toca i és el text qui s'adapta.",
        }),
        concept(
          'Mida fixa = una amplada i flex: none',
          "`width` diu quina mida vols. `flex: none` diu que aquesta mida **no es negocia**: ni creix ni s'encongeix. Quan una peça d'una fila hagi de fer sempre el mateix, escriu les dues coses juntes."
        ),
        p("El més habitual és combinar les dues idees a la mateixa fila: **una peça de mida fixa i una altra que es queda la resta**."),
        example({
          title: 'Una banda fixa i l\'altra, la resta',
          intro: "La foto fa sempre 120 píxels. El text es queda tot el que sobra. Fes la finestra més estreta o amplia l'exemple a pantalla completa: només canvia el text.",
          html: `<article class="ruta">
  <div class="foto">
    <img src="imatges/ruta-1.jpg" alt="Un camí arran de mar">
  </div>

  <div class="text">
    <h3>Camí de Ronda</h3>
    <p>12 km · 3 h 30 min · Fàcil</p>
  </div>
</article>`,
          css: `${CSS_BASE}

.ruta {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  border: 1px solid #c9d6cf;
  border-radius: 8px;
}

.foto {
  flex: none;
  width: 120px;
}

.foto img {
  display: block;
  width: 100%;
  border-radius: 6px;
}

.text {
  flex: 1;
}

.text h3,
.text p {
  margin: 0 0 4px;
}`,
          boxes: true,
          expected: 'La foto a l\'esquerra, sempre de la mateixa mida, i el quadrat del text ocupant tota la resta de la targeta.',
          why: "`.foto` té una amplada i `flex: none`: no es mou de 120 píxels. `.text` té `flex: 1`: s'estira fins al marge dret. Aquesta parella, fix i flexible, és la base de gairebé totes les peces d'una pàgina.",
        }),
        warning(
          "La imatge va dins d'un quadrat",
          "Fixa't que la mida no l'hem donada a la imatge, sinó al quadrat que la conté (`.foto`), i la imatge l'omple amb `width: 100%`. Així, quan a la unitat de `position` hi vulguem posar una etiqueta a sobre, ja tindrem el quadrat fet."
        ),
      ],
    },

    {
      id: 'flex-wrap',
      title: 'Quan no hi caben: flex-wrap',
      blocks: [
        p("Un contenidor flex té una norma que encara no hem dit: **tots els fills van a la mateixa línia**, hi càpiguen o no. Si en són molts, s'encongeixen tant com poden i, quan ja no poden més, surten del contenidor. Per a una fila de filtres o d'etiquetes, no és el que volem."),
        custom('CssPlayground', {
          title: 'Prova-ho: flex-wrap',
          intro: 'Set filtres en una fila. Mira què passa amb els que no hi caben.',
          items: ['Totes', 'Fàcils', 'Mitjanes', 'Difícils', 'Circulars', 'Amb gos', 'Amb nens'],
          base: { display: 'flex', gap: '8px' },
          controls: [{ prop: 'flex-wrap', options: ['nowrap', 'wrap'] }],
          height: 110,
        }),
        p("Amb `flex-wrap: wrap`, el contenidor deixa de ser una sola línia: quan un fill no hi cap, **salta a la línia següent**, i els que venen darrere el segueixen."),
        example({
          title: 'Els filtres de la llista de rutes',
          intro: "Esborra `flex-wrap: wrap;` i fes l'exemple estret. Després torna'l a posar.",
          html: `<div class="filtres">
  <a class="xip" href="#">Totes les rutes</a>
  <a class="xip" href="#">Fàcils</a>
  <a class="xip" href="#">Dificultat mitjana</a>
  <a class="xip" href="#">Difícils</a>
  <a class="xip" href="#">Circulars</a>
  <a class="xip" href="#">Amb gos</a>
  <a class="xip" href="#">Amb nens</a>
  <a class="xip" href="#">Menys de 3 hores</a>
  <a class="xip" href="#">A prop del mar</a>
</div>`,
          css: `${CSS_BASE}

.filtres {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.xip {
  padding: 6px 12px;
  color: #1f6f54;
  text-decoration: none;
  background: #e8f3ee;
  border-radius: 16px;
}`,
          expected: "Els filtres ocupen dues o tres línies, segons l'amplada, i cada un es llegeix sencer. Sense `flex-wrap`, tots queden en una sola línia, amb el text partit i atapeït.",
          why: "`flex-wrap` s'escriu al pare, com `gap`. I `gap` treballa en els dos sentits: separa els filtres de la mateixa línia i també una línia de la següent.",
        }),
        warning(
          'Cada línia va pel seu compte',
          "Quan una fila salta de línia, cada línia reparteix el seu espai sense mirar les altres: els filtres de la segona línia no queden alineats amb els de la primera. Per a etiquetes i filtres és perfecte. Per a una galeria de targetes, on vols columnes ben alineades, l'eina és una altra: Grid, a la [unitat següent](#/unitat/grid)."
        ),
      ],
    },

    {
      id: 'un-fill-diferent',
      title: 'Un fill diferent dels altres: margin-left: auto i align-self',
      blocks: [
        p("`justify-content` i `align-items` tracten tots els fills igual. De vegades, però, **un sol fill** ha d'anar a un altre lloc. Per a això hi ha dues eines, i totes dues s'escriuen al fill."),
        p("La primera és per a l'eix principal. La capçalera té el logo, el menú i el botó «Entra». Volem el logo i el menú junts, a l'esquerra, i el botó a la dreta de tot. `space-between` no serveix: deixaria el menú al mig."),
        example({
          title: 'El botó, a l\'altra punta',
          intro: 'El botó té `margin-left: auto`. Esborra-ho i mira on queda.',
          html: `<header class="capcalera">
  <a class="logo" href="index.html">▲ Camins</a>

  <nav class="menu">
    <a href="index.html">Rutes</a>
    <a href="mapa.html">Mapa</a>
    <a href="consells.html">Consells</a>
  </nav>

  <button class="boto" type="button">Entra</button>
</header>`,
          css: `${CSS_PAGINA}

.capcalera {
  display: flex;
  align-items: center;
  gap: 32px;
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
  display: flex;
  gap: 20px;
}

.boto {
  margin-left: auto;
  padding: 8px 16px;
  font-size: 16px;
  color: #1f6f54;
  background: #ffffff;
  border: 0;
  border-radius: 20px;
}`,
          width: 760,
          boxes: true,
          expected: "El logo i el menú, junts a l'esquerra. El botó «Entra», tot sol, tocant el marge dret.",
          why: "Un marge `auto` es queda **tot l'espai que sobra** en aquella direcció. El botó té tot l'espai lliure de la fila a la seva esquerra, i això l'empeny fins al final. És la mateixa idea que `margin: 0 auto` per centrar un bloc, de la [unitat 4](#/unitat/model-de-caixa).",
        }),
        p("La segona eina és per a l'eix transversal. `align-self` fa per a **un fill** el mateix que `align-items` fa per a tots, i amb els mateixos valors."),
        example({
          title: 'Una etiqueta que es queda a dalt',
          intro: 'La targeta centra els seus fills verticalment. L\'etiqueta «Fàcil» en fa una excepció.',
          html: `<article class="ruta">
  <img src="imatges/ruta-4.jpg" alt="Un estany envoltat de muntanyes">

  <div class="text">
    <h3>Estany de Sant Maurici</h3>
    <p>7 km · 2 h</p>
  </div>

  <span class="etiqueta">Fàcil</span>
</article>`,
          css: `${CSS_BASE}

.ruta {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid #c9d6cf;
  border-radius: 8px;
}

.ruta img {
  width: 110px;
  border-radius: 6px;
}

.text {
  flex: 1;
}

.text h3,
.text p {
  margin: 0 0 4px;
}

.etiqueta {
  align-self: flex-start;
  padding: 2px 8px;
  font-size: 14px;
  color: #ffffff;
  background: #1f6f54;
  border-radius: 10px;
}`,
          boxes: true,
          expected: "La foto i el text queden centrats verticalment. L'etiqueta, en canvi, queda a dalt a la dreta de la targeta.",
          why: "`align-items: center`, al pare, és la norma per a tots els fills. `align-self: flex-start`, a l'etiqueta, és l'excepció per a ella sola. I és a la dreta perquè el text, amb `flex: 1`, s'ha quedat tot l'espai del mig.",
        }),
        challenge({
          title: 'El preu, a la dreta',
          statement: "A la fila hi ha el nom del refugi, una etiqueta i el preu. Fes que el preu quedi tocant el marge dret de la fila. El nom i l'etiqueta s'han de quedar junts a l'esquerra, com ara.",
          html: `<div class="fila">
  <strong>Refugi de Núria</strong>
  <span class="etiqueta">Obert</span>
  <span class="preu">18 €</span>
</div>`,
          css: `${CSS_BASE}

.fila {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #e8f3ee;
  border-radius: 8px;
}

.etiqueta {
  padding: 2px 8px;
  font-size: 14px;
  color: #ffffff;
  background: #1f6f54;
  border-radius: 10px;
}

.preu {
  font-weight: bold;
}`,
          hint: "Només cal una línia, i va a `.preu`: un marge que es mengi tot l'espai que té a l'esquerra.",
          solution: {
            css: `${CSS_BASE}

.fila {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #e8f3ee;
  border-radius: 8px;
}

.etiqueta {
  padding: 2px 8px;
  font-size: 14px;
  color: #ffffff;
  background: #1f6f54;
  border-radius: 10px;
}

.preu {
  margin-left: auto;
  font-weight: bold;
}`,
          },
          explanation: "`margin-left: auto` es queda tot l'espai lliure de la fila i el posa a l'esquerra del preu. Amb `justify-content: space-between`, l'etiqueta hauria quedat al mig, lluny del nom.",
          checks: [
            { label: 'El preu toca el marge dret de la fila', selector: '.preu', offset: { right: 16 } },
            { label: "L'etiqueta continua a 12 píxels del nom", selector: '.fila strong, .fila .etiqueta', gap: { x: 12 } },
            { label: 'Tot continua a la mateixa fila', selector: '.fila > *', arrange: 'row' },
          ],
        }),
      ],
    },

    {
      id: 'niuar',
      title: 'Niuar: files dins de columnes dins de files',
      blocks: [
        p("Amb el que tens, ja pots maquetar qualsevol peça. El mètode és sempre el mateix i comença amb el dibuix, no amb el CSS:"),
        list(
          "**Dibuixa els quadrats** de la peça, de fora cap a dins, com a la [unitat 5](#/unitat/contenidors).",
          "Per a cada quadrat que tingui quadrats a dins, pregunta't: **fila o columna?** Si és una fila, necessita `display: flex`. Si és una columna i en vols separar o alinear els fills, també.",
          "Per a cada fill, pregunta't: **mida fixa, o es queda el que sobra?** Fixa: una amplada i `flex: none`. El que sobra: `flex: 1`. Si només ha de fer el que ocupa el seu contingut, no cal escriure res."
        ),
        p("Provem-ho amb la capçalera completa de la web de rutes. Primer, el dibuix."),
        custom('BoxSketch', {
          title: 'La capçalera, en quadrats',
          intro: 'Tres peces en fila. La del mig creix; la de la dreta torna a ser una fila.',
          tree: {
            name: 'capçalera',
            tag: 'header.capcalera',
            dir: 'row',
            children: [
              { name: 'logo', tag: 'a.logo', basis: '20%' },
              { name: 'cercador', tag: 'form.cercador', grow: 1 },
              {
                name: 'accions',
                tag: 'div.accions',
                dir: 'row',
                basis: '34%',
                children: [
                  { name: 'Mapa', tag: 'a' },
                  { name: 'Entra', tag: 'button' },
                ],
              },
            ],
          },
          steps: [
            "La capçalera és una **fila** de tres peces. El logo i les accions fan el que ocupa el seu contingut; el cercador es queda la resta: `flex: 1`.",
            "Les accions tornen a ser una **fila**: un enllaç i un botó. Un altre `display: flex`, aquest a `.accions`.",
          ],
        }),
        example({
          title: 'La capçalera, sencera',
          intro: "Busca al CSS els tres `display: flex`: n'hi ha un per a cada quadrat amb fills en fila. El cercador, a més, és un formulari amb un camp i un botó a dins.",
          html: `<header class="capcalera">
  <a class="logo" href="index.html">▲ Camins</a>

  <form class="cercador">
    <input type="search" placeholder="Cerca una ruta">
    <button type="submit">Cerca</button>
  </form>

  <div class="accions">
    <a href="mapa.html">Mapa</a>
    <button class="boto" type="button">Entra</button>
  </div>
</header>`,
          css: `${CSS_PAGINA}

.capcalera {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 12px 24px;
  background: #1f6f54;
}

.logo {
  font-size: 22px;
  font-weight: bold;
  color: #ffffff;
  text-decoration: none;
}

.cercador {
  display: flex;
  flex: 1;
  gap: 8px;
}

.cercador input {
  flex: 1;
  padding: 8px 12px;
  font-size: 16px;
  border: 0;
  border-radius: 6px;
}

.cercador button {
  padding: 8px 12px;
  font-size: 16px;
  color: #ffffff;
  background: #23312b;
  border: 0;
  border-radius: 6px;
}

.accions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.accions a {
  color: #ffffff;
}

.boto {
  padding: 8px 16px;
  font-size: 16px;
  color: #1f6f54;
  background: #ffffff;
  border: 0;
  border-radius: 20px;
}`,
          width: 900,
          boxes: true,
          expected: "El logo a l'esquerra, l'enllaç «Mapa» i el botó «Entra» a la dreta, i el cercador ocupant tot el mig. Dins del cercador, el camp de text s'estira i el botó «Cerca» queda al final.",
          why: "Hi ha `flex: 1` a dos nivells. El formulari el té per créixer dins de la capçalera. I el camp de text el té per créixer dins del formulari. Cada un es queda l'espai que sobra **del seu pare**.",
        }),
        concept(
          'Fill i pare alhora',
          "Mira la regla `.cercador`: té `flex: 1`, que és una propietat de fill, i `display: flex`, que és una propietat de pare. No és cap contradicció. El formulari és fill de la capçalera, que el col·loca, i pare del camp i del botó, que col·loca ell. Niuar és això: cada quadrat obeeix el de fora i mana sobre els de dins."
        ),
        p("Ara una peça amb una columna a dins: la targeta horitzontal d'una ruta. El dibuix té tres nivells."),
        custom('BoxSketch', {
          title: 'La targeta d\'una ruta, en quadrats',
          intro: 'Una fila que conté una columna que conté una fila.',
          tree: {
            name: 'ruta',
            tag: 'article.ruta',
            dir: 'row',
            children: [
              { name: 'foto', tag: 'div.foto', basis: '30%', h: 96 },
              {
                name: 'text',
                tag: 'div.text',
                dir: 'column',
                children: [
                  { name: 'títol', tag: 'h3' },
                  {
                    name: 'dades',
                    tag: 'div.dades',
                    dir: 'row',
                    children: [
                      { name: '18 km', tag: 'span' },
                      { name: '9 h', tag: 'span' },
                      { name: 'Difícil', tag: 'span' },
                    ],
                  },
                  { name: 'descripció', tag: 'p' },
                ],
              },
            ],
          },
          steps: [
            "La targeta és una **fila**: la foto, de mida fixa, i el text, que es queda la resta.",
            "El text és una **columna**: el títol, les dades i la descripció, l'un sota l'altre.",
            "Les dades tornen a ser una **fila** de tres etiquetes.",
          ],
        }),
        example({
          title: 'La targeta d\'una ruta',
          intro: 'Tres quadrats amb fills, tres contenidors flex. Compara cada regla amb el seu nivell del dibuix.',
          html: HTML_TARGETA,
          css: `${CSS_BASE}

/* Nivell 1: la targeta és una fila */
.ruta {
  display: flex;
  gap: 16px;
  padding: 16px;
  border: 1px solid #c9d6cf;
  border-radius: 12px;
}

.foto {
  flex: none;
  width: 220px;
}

/* Nivell 2: el text és una columna */
.text {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 12px;
}

/* Nivell 3: les dades són una fila */
.dades {
  display: flex;
  gap: 8px;
}

${CSS_TARGETA_ASPECTE}`,
          width: 760,
          boxes: true,
          expected: "La foto a l'esquerra i, a la dreta, el títol, les tres dades en fila i la descripció, separats per la mateixa distància.",
          why: "`.text` és una columna flex només per poder separar els seus tres fills amb `gap`, en lloc d'anar posant marges a cada un. I com que té `flex: 1`, la descripció fa servir tota l'amplada que deixa lliure la foto.",
        }),
        warning(
          'Si un text llarg fa més ampla la fila',
          "Un fill amb `flex: 1` no es fa mai més estret que la paraula més llarga (o l'adreça web més llarga) que conté, i pot empènyer els seus germans fora de la fila. Si et passa, afegeix-li `min-width: 0`: li dona permís per encongir-se del tot."
        ),
      ],
    },

    {
      id: 'peces-habituals',
      title: 'Dues peces que trobaràs a tot arreu',
      blocks: [
        p("Hi ha dos dibuixos que es repeteixen a gairebé totes les webs. Val la pena reconèixer-los, perquè un cop els has fet una vegada, ja els saps fer sempre."),
        p("El primer és **una imatge petita i un text al costat**: un comentari, un resultat de cerca, un contacte, un vídeo d'una llista. La imatge té mida fixa i el text es queda la resta."),
        example({
          title: 'Les opinions d\'una ruta',
          intro: 'Cada opinió és una fila: l\'avatar i el text. La llista sencera és una columna d\'opinions.',
          html: `<section class="opinions">
  <article class="opinio">
    <img class="avatar" src="imatges/avatar-1.png" alt="">
    <div class="text">
      <strong>Laia M.</strong>
      <p>Molt ben senyalitzada. La vam fer amb nens i cap problema.</p>
    </div>
  </article>

  <article class="opinio">
    <img class="avatar" src="imatges/avatar-2.png" alt="">
    <div class="text">
      <strong>Marc R.</strong>
      <p>${OPINIO_LLARGA}</p>
    </div>
  </article>

  <article class="opinio">
    <img class="avatar" src="imatges/avatar-3.png" alt="">
    <div class="text">
      <strong>Nora P.</strong>
      <p>A l'estiu, millor a primera hora.</p>
    </div>
  </article>
</section>`,
          css: `${CSS_BASE}

.opinions {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.opinio {
  display: flex;
  gap: 12px;
}

.avatar {
  flex: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.text {
  flex: 1;
}

.text p {
  margin: 4px 0 0;
  line-height: 1.5;
  color: #5b6b63;
}`,
          boxes: true,
          expected: 'Tres opinions, l\'una sota l\'altra. A cada una, l\'avatar rodó a l\'esquerra i, al costat, el nom i el text.',
          why: "Una columna de files. `.opinions` apila les opinions i les separa; cada `.opinio` posa de costat l'avatar, que no canvia de mida, i el text, que es queda la resta. El text llarg de la segona opinió no fa més petit el seu avatar.",
        }),
        p("El segon dibuix és el de la pàgina sencera: **un panell estret al costat del contingut**. És exactament el mateix, a una altra escala."),
        example({
          title: 'Un panell de filtres al costat de les rutes',
          intro: 'El panell fa 200 píxels. El contingut, tota la resta.',
          html: `<div class="cos">
  <aside class="filtres">
    <h2>Dificultat</h2>
    <a href="#">Totes</a>
    <a href="#">Fàcil</a>
    <a href="#">Mitjana</a>
    <a href="#">Difícil</a>
  </aside>

  <main class="contingut">
    <h1>Totes les rutes</h1>
    <p>Sis rutes per descobrir el país a peu, de la costa a l'alta muntanya.</p>
  </main>
</div>`,
          css: `* {
  box-sizing: border-box;
}

${CSS_PAGINA}

.cos {
  display: flex;
  gap: 24px;
  padding: 24px;
}

.filtres {
  display: flex;
  flex: none;
  flex-direction: column;
  gap: 8px;
  width: 200px;
  padding: 16px;
  background: #e8f3ee;
  border-radius: 8px;
}

.filtres h2 {
  margin: 0;
  font-size: 16px;
}

.filtres a {
  color: #1f6f54;
}

.contingut {
  flex: 1;
}

.contingut h1 {
  margin: 0 0 8px;
}`,
          width: 900,
          boxes: true,
          expected: "A l'esquerra, un panell verd clar amb el títol i quatre enllaços en columna. A la dreta, el títol i el text de la pàgina, ocupant la resta de l'amplada.",
          why: "`.cos` és una fila de dues peces. El panell és, alhora, un fill de mida fixa i una columna flex per als seus enllaços. Aquesta estructura també es pot fer amb Grid, que està pensat per a maquetar pàgines: ho veurem a la unitat següent.",
        }),
        project(
          "La web de rutes creix per dos llocs. La capçalera té un cercador que s'estira, i cada ruta és una targeta horitzontal amb la foto de mida fixa. Són les mateixes tres propietats de fill, repetides a cada nivell del dibuix.",
          {
            title: 'El cercador i la targeta de ruta',
            lang: 'css',
            code: `/* La capçalera: el cercador es queda el que sobra */
.cercador {
  display: flex;
  flex: 1;
  gap: 8px;
}

.cercador input {
  flex: 1;
}

/* La targeta: foto fixa, text flexible */
.ruta {
  display: flex;
  gap: 16px;
}

.foto {
  flex: none;
  width: 220px;
}

.text {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 12px;
}

.dades {
  display: flex;
  gap: 8px;
}`,
          }
        ),
      ],
    },
  ],

  commonErrors: [
    {
      title: 'Escriure flex: 1 al pare',
      bad: `.capcalera {
  display: flex;
  flex: 1;
}`,
      badLang: 'css',
      symptom: 'El cercador continua petit, com si no haguessis escrit res.',
      why: "`flex: 1` és una propietat del fill que ha de créixer. Escrita a la capçalera, li diu a la capçalera que creixi dins del **seu** pare, que ni tan sols és un contenidor flex.",
      fix: `.capcalera {
  display: flex;
}

.cercador {
  flex: 1;
}`,
      fixLang: 'css',
    },
    {
      title: 'Posar flex: 1 a tots els fills quan només un havia de créixer',
      bad: `.logo,
.cercador,
.boto {
  flex: 1;
}`,
      badLang: 'css',
      symptom: 'El logo, el cercador i el botó fan tots la mateixa amplada: el botó «Entra» és enorme.',
      why: "Tots els fills amb `flex: 1` es reparteixen l'espai a parts iguals. Si vols que el logo i el botó facin el que ocupa el seu text, no els has de posar res.",
      fix: `.cercador {
  flex: 1;
}`,
      fixLang: 'css',
    },
    {
      title: 'Donar una amplada i confiar que es respectarà',
      bad: `.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}`,
      badLang: 'css',
      symptom: 'Quan el text del costat és llarg, l\'avatar es converteix en un oval més estret que alt.',
      why: "Dins d'una fila flex, `width` és el punt de partida, no una garantia: si falta espai, el navegador pot encongir el fill.",
      fix: `.avatar {
  flex: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
}`,
      fixLang: 'css',
    },
    {
      title: 'Escriure flex-wrap als fills',
      bad: `.xip {
  flex-wrap: wrap;
}`,
      badLang: 'css',
      symptom: 'Els filtres continuen tots a la mateixa línia, atapeïts.',
      why: "Qui decideix si la fila pot saltar de línia és el contenidor, no cada fill. `flex-wrap` va al pare, com `gap`.",
      fix: `.filtres {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}`,
      fixLang: 'css',
    },
    {
      title: 'Fer servir margin-left: auto quan el pare no és flex',
      bad: `.boto {
  margin-left: auto;
}`,
      badLang: 'css',
      symptom: 'El botó no es mou: queda sota el menú, a l\'esquerra.',
      why: "El marge `auto` es queda l'espai que sobra **de la fila**. Si el pare no té `display: flex`, no hi ha cap fila: el botó és a la seva pròpia línia.",
      fix: `.capcalera {
  display: flex;
}

.boto {
  margin-left: auto;
}`,
      fixLang: 'css',
    },
  ],

  exercises: [
    {
      id: 'cercador-de-rutes',
      title: 'Un camp que omple la fila',
      statement: "El formulari de cerca té un camp de text i un botó. Fes que el camp s'estiri fins a ocupar tot l'espai lliure, de manera que el botó quedi tocant el marge dret del formulari.",
      expected: 'Una franja verd clar amb el camp de text ocupant gairebé tota l\'amplada i el botó «Cerca» al final.',
      html: `<form class="cerca">
  <input type="search" placeholder="Nom de la ruta">
  <button type="submit">Cerca</button>
</form>`,
      css: `${CSS_BASE}

.cerca {
  display: flex;
  gap: 8px;
  padding: 12px;
  background: #e8f3ee;
  border-radius: 8px;
}

.cerca input {
  padding: 6px 10px;
  font-size: 14px;
  border: 1px solid #c9d6cf;
  border-radius: 6px;
}

.cerca button {
  padding: 6px 12px;
  font-size: 14px;
  color: #ffffff;
  background: #1f6f54;
  border: 0;
  border-radius: 6px;
}`,
      hint: "El formulari ja és un contenidor flex. Falta dir a un dels seus fills que es quedi l'espai que sobra.",
      solution: {
        css: `${CSS_BASE}

.cerca {
  display: flex;
  gap: 8px;
  padding: 12px;
  background: #e8f3ee;
  border-radius: 8px;
}

.cerca input {
  flex: 1;
  padding: 6px 10px;
  font-size: 14px;
  border: 1px solid #c9d6cf;
  border-radius: 6px;
}

.cerca button {
  padding: 6px 12px;
  font-size: 14px;
  color: #ffffff;
  background: #1f6f54;
  border: 0;
  border-radius: 6px;
}`,
      },
      explanation: "El botó fa l'amplada del seu text. Tota la resta de la fila se la queda el camp, que és l'únic fill amb `flex: 1`.",
      checks: [
        { label: 'El camp i el botó estan a la mateixa fila', selector: '.cerca > *', arrange: 'row' },
        { label: 'El botó toca el marge dret del formulari', selector: '.cerca button', offset: { right: 12 } },
        { label: 'El camp i el botó continuen separats 8 píxels', selector: '.cerca > *', gap: { x: 8 } },
      ],
    },
    {
      id: 'avatar-rodo',
      title: 'Un avatar que torna a ser rodó',
      statement: "L'avatar d'aquesta opinió hauria de ser un cercle de 56 píxels, però surt aixafat. Arregla-ho sense tocar l'amplada ni l'alçada.",
      expected: 'Un cercle verd perfecte amb les inicials «LM» i, al costat, el nom i el text de l\'opinió.',
      html: `<article class="opinio">
  <div class="avatar">LM</div>

  <div class="text">
    <strong>Laia M.</strong>
    <p>${OPINIO_LLARGA}</p>
  </div>
</article>`,
      css: `${CSS_BASE}

.opinio {
  display: flex;
  gap: 12px;
  padding: 12px;
  background: #e8f3ee;
  border-radius: 8px;
}

.avatar {
  width: 56px;
  height: 56px;
  font-weight: bold;
  line-height: 56px;
  color: #ffffff;
  text-align: center;
  background: #1f6f54;
  border-radius: 50%;
}

.text p {
  margin: 4px 0 0;
  line-height: 1.5;
}`,
      hint: "L'avatar ja té la mida que toca. El que li falta és dir que aquesta mida no es pot encongir.",
      solution: {
        css: `${CSS_BASE}

.opinio {
  display: flex;
  gap: 12px;
  padding: 12px;
  background: #e8f3ee;
  border-radius: 8px;
}

.avatar {
  flex: none;
  width: 56px;
  height: 56px;
  font-weight: bold;
  line-height: 56px;
  color: #ffffff;
  text-align: center;
  background: #1f6f54;
  border-radius: 50%;
}

.text p {
  margin: 4px 0 0;
  line-height: 1.5;
}`,
      },
      explanation: "El text és tan llarg que el navegador havia d'encongir algú, i encongia tots dos fills. Amb `flex: none`, l'avatar queda fora del repartiment i és el text qui s'adapta, partint-se en més línies.",
      checks: [
        { label: "L'avatar fa 56 píxels d'ample i 56 d'alt", selector: '.avatar', size: { width: 56, height: 56 } },
        { label: "L'avatar queda a l'esquerra del text", selector: '.avatar', leftOf: '.text' },
      ],
    },
    {
      id: 'filtres-que-salten',
      title: 'Filtres que salten de línia',
      statement: "Hi ha dotze filtres i no caben en una línia: queden atapeïts i amb el text partit. Fes que saltin de línia quan no hi càpiguen, i que quedin separats 8 píxels, tant entre ells com entre una línia i la següent.",
      expected: 'Els filtres repartits en diverses línies, cada un amb el seu text sencer en una sola línia.',
      html: `<div class="filtres">
  <a class="xip" href="#">Totes les rutes</a>
  <a class="xip" href="#">Fàcils</a>
  <a class="xip" href="#">Dificultat mitjana</a>
  <a class="xip" href="#">Difícils</a>
  <a class="xip" href="#">Circulars</a>
  <a class="xip" href="#">Amb gos</a>
  <a class="xip" href="#">Amb nens</a>
  <a class="xip" href="#">Menys de 3 hores</a>
  <a class="xip" href="#">A prop del mar</a>
  <a class="xip" href="#">Amb refugi</a>
  <a class="xip" href="#">Alta muntanya</a>
  <a class="xip" href="#">Amb transport públic</a>
</div>`,
      css: `${CSS_BASE}

.filtres {
  display: flex;
}

.xip {
  padding: 6px 12px;
  color: #1f6f54;
  text-decoration: none;
  background: #e8f3ee;
  border-radius: 16px;
}`,
      hint: 'Són dues propietats i totes dues van al pare, `.filtres`: una dona permís per saltar de línia i l\'altra separa.',
      solution: {
        css: `${CSS_BASE}

.filtres {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.xip {
  padding: 6px 12px;
  color: #1f6f54;
  text-decoration: none;
  background: #e8f3ee;
  border-radius: 16px;
}`,
      },
      explanation: "Sense `flex-wrap`, els dotze filtres havien de cabre en una sola línia i s'encongien fins a partir el text. Amb `wrap`, cada filtre fa la seva amplada natural i, quan no hi cap, baixa. `gap` separa en horitzontal i en vertical alhora.",
      checks: [
        { label: 'La fila de filtres pot saltar de línia', selector: '.filtres', style: { 'flex-wrap': 'wrap' } },
        { label: 'Cap filtre té el text partit en dues línies', selector: '.xip', all: true, size: { maxHeight: 36 } },
        { label: 'Hi ha 8 píxels entre filtres i entre línies', selector: '.xip', gap: 8 },
      ],
    },
    {
      id: 'boto-al-final',
      title: 'El botó, al final de la capçalera',
      statement: "La capçalera té el logo, el menú i l'enllaç «Entra», tots seguits. Envia «Entra» a la dreta de tot. El menú s'ha de quedar on és: al costat del logo, a 32 píxels.",
      expected: 'El logo i el menú junts a l\'esquerra, i «Entra» tocant el marge dret de la capçalera.',
      width: 760,
      html: `<header class="capcalera">
  <a class="logo" href="index.html">▲ Camins</a>

  <nav class="menu">
    <a href="index.html">Rutes</a>
    <a href="mapa.html">Mapa</a>
    <a href="consells.html">Consells</a>
  </nav>

  <a class="entra" href="#">Entra</a>
</header>`,
      css: `${CSS_PAGINA}

.capcalera {
  display: flex;
  align-items: center;
  gap: 32px;
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
  display: flex;
  gap: 20px;
}

.entra {
  padding: 8px 16px;
  border: 1px solid #ffffff;
  border-radius: 20px;
}`,
      hint: "`space-between` mouria també el menú. Necessites una propietat que només afecti «Entra»: un marge que es quedi tot l'espai que té a l'esquerra.",
      solution: {
        css: `${CSS_PAGINA}

.capcalera {
  display: flex;
  align-items: center;
  gap: 32px;
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
  display: flex;
  gap: 20px;
}

.entra {
  margin-left: auto;
  padding: 8px 16px;
  border: 1px solid #ffffff;
  border-radius: 20px;
}`,
      },
      explanation: "`margin-left: auto` posa tot l'espai lliure de la fila a l'esquerra de «Entra». El logo i el menú no se n'assabenten: continuen separats pel `gap` de la capçalera.",
      checks: [
        { label: '«Entra» toca el marge dret de la capçalera', selector: '.entra', offset: { right: 24 } },
        { label: 'El menú continua a 32 píxels del logo', selector: '.capcalera .logo, .capcalera .menu', gap: { x: 32 } },
        { label: 'Tot continua a la mateixa fila', selector: '.capcalera > *', arrange: 'row' },
      ],
    },
  ],

  finalExercise: {
    id: 'targeta-de-ruta',
    title: 'La targeta d\'una ruta, sencera',
    statement: [
      "Maqueta la targeta horitzontal d'una ruta. L'HTML i els colors ja hi són; falta col·locar-ho tot. Abans d'escriure, obre la pestanya «Objectiu» amb els quadrats activats i fes-te el dibuix: quins quadrats tenen fills en fila? Quins en columna?",
      "La foto ha de quedar a l'esquerra, sempre de 220 píxels, a 16 píxels del text. El bloc de text s'ha de quedar la resta de l'amplada i els seus quatre fills han d'anar en columna, separats 12 píxels. Les tres dades van en fila, separades 8 píxels. I el botó «Veure la ruta», a la dreta del bloc de text.",
    ],
    expected: 'La foto a l\'esquerra. A la dreta, de dalt a baix: el títol, les tres dades en fila, la descripció i, tocant el marge dret, el botó.',
    width: 760,
    boxes: true,
    html: `<article class="ruta">
  <div class="foto">
    <img src="imatges/ruta-3.jpg" alt="El cim de la Pica d'Estats">
  </div>

  <div class="text">
    <h3>Pica d'Estats</h3>

    <div class="dades">
      <span>18 km</span>
      <span>9 h</span>
      <span>Difícil</span>
    </div>

    <p>${DESCRIPCIO_LLARGA}</p>

    <a class="boto" href="ruta.html">Veure la ruta</a>
  </div>
</article>`,
    css: `${CSS_BASE}

.ruta {
  padding: 16px;
  border: 1px solid #c9d6cf;
  border-radius: 12px;
}

.foto {
  width: 220px;
}

${CSS_TARGETA_ASPECTE}

.boto {
  padding: 8px 16px;
  color: #ffffff;
  text-decoration: none;
  background: #1f6f54;
  border-radius: 20px;
}`,
    hint: [
      "Hi ha tres quadrats amb fills: `.ruta` (una fila), `.text` (una columna) i `.dades` (una fila). Cada un necessita el seu `display: flex`.",
      "La foto: `flex: none`. El text: `flex: 1`. I el botó és l'únic fill de la columna que no va a l'esquerra: en una columna, l'eix transversal és l'horitzontal, i `align-self` hi treballa.",
    ],
    solution: {
      css: `${CSS_BASE}

.ruta {
  display: flex;
  gap: 16px;
  padding: 16px;
  border: 1px solid #c9d6cf;
  border-radius: 12px;
}

.foto {
  flex: none;
  width: 220px;
}

.text {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 12px;
}

.dades {
  display: flex;
  gap: 8px;
}

${CSS_TARGETA_ASPECTE}

.boto {
  align-self: flex-end;
  padding: 8px 16px;
  color: #ffffff;
  text-decoration: none;
  background: #1f6f54;
  border-radius: 20px;
}`,
    },
    explanation: [
      "Són tres nivells de quadrats i, per tant, tres contenidors flex. La targeta posa de costat la foto, que no canvia de mida, i el text, que es queda la resta. El text apila els seus quatre fills i els separa amb `gap`. Les dades tornen a ser una fila.",
      "El botó és l'excepció de la columna: `align-self: flex-end` l'envia al final de l'eix transversal, que en una columna és la dreta. Fixa't que no has escrit ni un sol marge per separar res.",
    ],
    checks: [
      { label: 'La foto i el text estan de costat', selector: '.ruta > *', arrange: 'row' },
      { label: "La foto fa 220 píxels d'ample", selector: '.foto', size: { width: 220 } },
      { label: 'Hi ha 16 píxels entre la foto i el text', selector: '.ruta > *', gap: { x: 16 } },
      { label: 'El text arriba fins al marge dret de la targeta', selector: '.text', offset: { right: 16 } },
      { label: 'Les tres dades estan en fila, separades 8 píxels', selector: '.dades span', arrange: 'row', gap: 8 },
      { label: 'El títol, les dades, la descripció i el botó estan separats 12 píxels', selector: '.text > *', arrange: 'column', gap: 12 },
      { label: 'El botó queda a la dreta del bloc de text', selector: '.boto', inside: '.text', offset: { right: 0 } },
    ],
  },

  summary: [
    "`flex: 1` s'escriu al **fill**: es queda l'espai que sobra de la fila. Si el porten diversos germans, se'l reparteixen a parts iguals.",
    "`flex: none`, amb una amplada, fa que una peça no canviï de mida. És per als avatars, les miniatures i les icones.",
    "`flex-wrap: wrap`, al pare, deixa que els fills saltin de línia quan no hi caben. `gap` també separa les línies.",
    "`margin-left: auto` empeny un fill cap a la dreta: el marge es queda tot l'espai lliure.",
    "`align-self` alinea un sol fill d'una manera diferent dels seus germans.",
    "Un mateix element pot ser **fill i pare alhora**: obeeix el quadrat de fora i col·loca els de dins.",
    "Per maquetar una peça: dibuixa-la, decideix a cada quadrat si és fila o columna, i a cada fill si té mida fixa o es queda el que sobra.",
  ],

  quiz: [
    {
      question: 'Una capçalera flex té el logo, un cercador i un botó. Vols que el cercador ocupi tot l\'espai que deixen lliure els altres dos. Què escrius?',
      options: [
        { text: '`flex: 1` al cercador', correct: true },
        { text: '`flex: 1` a la capçalera', why: '`flex: 1` és una propietat del fill que ha de créixer, no del contenidor.' },
        { text: '`justify-content: space-between` a la capçalera', why: 'Posaria el cercador al mig, però amb la seva mida petita: reparteix l\'espai entre els fills, no el dona a cap.' },
        { text: '`width: 100%` al cercador', why: 'Demana l\'amplada sencera del pare, i llavors els seus germans s\'han d\'encongir per fer-li lloc. `flex: 1` només li dona el que sobra.' },
      ],
      explanation: '`flex: 1` s\'escriu al fill que ha de créixer: es queda l\'espai que sobra un cop els seus germans han ocupat el que necessiten.',
    },
    {
      question: 'Tres germans tenen `flex: 1`. El primer conté una paraula; el tercer, una frase llarga. Com queden?',
      options: [
        { text: 'Tots tres fan la mateixa amplada', correct: true },
        { text: 'El tercer és el més ample, perquè té més text', why: 'Això passaria sense `flex: 1`. Amb `flex: 1`, l\'amplada es reparteix a parts iguals i el text s\'adapta.' },
        { text: 'Només creix el primer, perquè és el que té més espai lliure', why: 'Creixen tots els que tenen `flex: 1`, no només un.' },
        { text: 'Cap dels tres creix, perquè s\'anul·len entre ells', why: 'No s\'anul·len: es reparteixen l\'espai.' },
      ],
      explanation: 'Quan diversos germans tenen `flex: 1`, l\'amplada de la fila es reparteix entre ells a parts iguals, tinguin el contingut que tinguin.',
    },
    {
      question: 'Un avatar té `width: 48px` dins d\'una fila flex. Quan el text del costat és molt llarg, l\'avatar es veu més estret. Com s\'arregla?',
      options: [
        { text: 'Afegint `flex: none` a l\'avatar', correct: true },
        { text: 'Afegint `flex: 1` a l\'avatar', why: 'Llavors l\'avatar creixeria i s\'encongiria segons l\'espai: just el contrari del que volem.' },
        { text: 'Afegint `flex-wrap: wrap` a la fila', why: 'Faria baixar el text a sota de l\'avatar, en lloc de deixar-lo al costat.' },
        { text: 'Escrivint `width: 48px` dues vegades', why: 'Repetir una declaració no la fa més forta. El problema és que el fill es pot encongir.' },
      ],
      explanation: 'Els fills d\'un contenidor flex es poden encongir quan falta espai. `flex: none` ho impedeix: la peça es queda amb la mida que li has donat.',
    },
    {
      question: 'Una fila té quinze etiquetes i no hi caben: queden atapeïdes. Vols que les que no càpiguen baixin a una segona línia. Què escrius, i on?',
      options: [
        { text: '`flex-wrap: wrap` al contenidor de les etiquetes', correct: true },
        { text: '`flex-wrap: wrap` a cada etiqueta', why: 'Qui decideix si la fila pot tenir més d\'una línia és el contenidor, no els fills.' },
        { text: '`flex-direction: column` al contenidor', why: 'Posaria les quinze etiquetes en una sola columna, una per línia.' },
        { text: '`flex: 1` a cada etiqueta', why: 'Farien totes la mateixa amplada, però continuarien a la mateixa línia.' },
      ],
      explanation: '`flex-wrap` és una propietat del pare. Amb `wrap`, el contenidor pot tenir tantes línies com calgui.',
    },
    {
      question: 'Una capçalera flex té tres fills: el logo, el menú i un botó. El botó té `margin-left: auto`. On queda cada cosa?',
      options: [
        { text: 'El logo i el menú junts a l\'esquerra, i el botó a la dreta de tot', correct: true },
        { text: 'El logo a l\'esquerra, el menú al mig i el botó a la dreta', why: 'Això és el que faria `justify-content: space-between`. El marge automàtic només separa el botó.' },
        { text: 'Tots tres junts a la dreta', why: 'Això ho faria `justify-content: flex-end`. El marge és només del botó.' },
        { text: 'El botó baixa a una segona línia', why: 'El marge no canvia de línia cap fill: l\'empeny dins de la mateixa fila.' },
      ],
      explanation: 'Un marge `auto` es queda tot l\'espai lliure de la fila. A l\'esquerra del botó, l\'empeny fins al final sense moure els seus germans.',
    },
    {
      question: 'Una targeta té la foto a l\'esquerra i un bloc de text a la dreta. Dins del bloc de text hi ha el títol i, a sota, tres dades de costat, cada una en un `<div>`. Quins quadrats necessiten `display: flex`?',
      options: [
        { text: 'La targeta i el grup de dades', correct: true },
        { text: 'Només la targeta', why: 'La targeta posaria de costat la foto i el text, però les tres dades, que són blocs, quedarien apilades.' },
        { text: 'La foto i el títol', why: 'Cap dels dos té fills per col·locar en fila. Flex s\'escriu als quadrats que contenen la fila.' },
        { text: 'Totes les etiquetes de la targeta', why: 'Només cal als quadrats que tenen fills en fila. Posar-lo a tot arreu no col·loca res millor.' },
      ],
      explanation: 'Un `display: flex` per cada quadrat amb fills en fila: la targeta (foto i text) i el grup de dades. El bloc de text apila el títol i les dades sense haver de dir-li res.',
    },
  ],
};
