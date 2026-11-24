import { p, list, example, concept, warning, challenge, project, table, custom } from '../../blocks.js';

const CSS_BASE = `body {
  font-family: Arial, sans-serif;
}`;

// Tres caixes apilades: la del mig és la que mourem.
const HTML_CAIXES = `<div class="caixa">Un</div>
<div class="caixa dos">Dos</div>
<div class="caixa">Tres</div>`;

const CSS_CAIXES = `${CSS_BASE}

.caixa {
  width: 140px;
  margin-bottom: 4px;
  padding: 12px;
  color: #ffffff;
  background: #1f6f54;
}`;

// La targeta d'una ruta, amb l'etiqueta de dificultat sobre la foto.
const HTML_RUTA = `<article class="ruta">
  <div class="foto">
    <img src="imatges/ruta-1.jpg" alt="Un camí arran de mar">
    <span class="dificultat">Fàcil</span>
  </div>

  <h3>Camí de Ronda</h3>
  <p>12 km · 3 h 30 min</p>
</article>`;

const CSS_RUTA = `${CSS_BASE}

.ruta {
  width: 280px;
  padding: 12px;
  border: 1px solid #c9d6cf;
  border-radius: 8px;
}

.foto img {
  display: block;
  width: 100%;
  border-radius: 6px;
}

.ruta h3 {
  margin: 12px 0 4px;
}

.ruta p {
  margin: 0;
  color: #5b6b63;
}`;

const CSS_DIFICULTAT = `.dificultat {
  padding: 4px 10px;
  font-size: 13px;
  font-weight: bold;
  color: #ffffff;
  background: #1f6f54;
  border-radius: 12px;
}`;

// La capçalera de la web de rutes, tal com va quedar a la unitat de Flexbox.
const HTML_CAPCALERA = `<header class="capcalera">
  <a class="logo" href="index.html">▲ Camins</a>

  <nav class="menu">
    <a href="index.html">Rutes</a>
    <a href="mapa.html">Mapa</a>
    <a href="consells.html">Consells</a>
  </nav>
</header>`;

// Text prou llarg perquè la pàgina de l'exemple es pugui desplaçar.
const HTML_CONSELLS = `<h1>Consells per anar a la muntanya</h1>
  <p>Mira la previsió del temps abans de sortir de casa.</p>
  <p>Porta aigua de sobres i alguna cosa per menjar.</p>
  <p>Digues a algú quina ruta faràs i a quina hora penses tornar.</p>
  <p>Calça't bé: no estrenis mai unes botes el dia de la sortida.</p>
  <p>Carrega el mòbil i descarrega't el mapa abans de perdre la cobertura.</p>
  <p>Comença d'hora i calcula quan t'has de girar per tornar amb llum.</p>
  <p>Emporta't totes les deixalles, també les orgàniques.</p>
  <p>Segueix les marques del camí i no facis dreceres.</p>
  <p>Guarda't el telèfon d'emergències: és el 112.</p>
  <p>Si el temps canvia, fer mitja volta també és fer muntanya.</p>`;

const HTML_PAGINA_CONSELLS = `${HTML_CAPCALERA}

<main class="contingut">
  ${HTML_CONSELLS}
</main>`;

// La capçalera sense res de position: és el punt de partida de diversos exemples.
const CSS_CAPCALERA = `body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.capcalera {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  padding: 0 24px;
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
  gap: 24px;
}`;

const CSS_CAPCALERA_FIXA = `body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.capcalera {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  padding: 0 24px;
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
  gap: 24px;
}`;

const targetaRuta = (numero, alt, dificultat, nom, dades) => `    <article class="ruta">
      <div class="foto">
        <img src="imatges/ruta-${numero}.jpg" alt="${alt}">
        <span class="dificultat">${dificultat}</span>
      </div>
      <h2>${nom}</h2>
      <p>${dades}</p>
    </article>`;

// La llista de rutes sencera: capçalera i graella de sis targetes.
const HTML_LLISTA = `${HTML_CAPCALERA}

<main class="contingut">
  <h1>Rutes</h1>

  <div class="rutes">
${[
  targetaRuta(1, 'Un camí arran de mar', 'Fàcil', 'Camí de Ronda', '12 km · 3 h 30 min'),
  targetaRuta(2, 'Una vall entre muntanyes', 'Mitjana', 'Vall de Núria', '9 km · 3 h'),
  targetaRuta(3, 'Un cim molt alt', 'Difícil', "Pica d'Estats", '18 km · 9 h'),
  targetaRuta(4, 'Un estany de muntanya', 'Fàcil', 'Estany de Sant Maurici', '7 km · 2 h'),
  targetaRuta(5, 'Una carena pelada', 'Difícil', 'Puigmal', '14 km · 6 h'),
  targetaRuta(6, 'Agulles de roca', 'Mitjana', 'Sant Jeroni', '11 km · 4 h 30 min'),
].join('\n\n')}
  </div>
</main>`;

const CSS_GRAELLA = `.contingut {
  padding: 16px 24px;
}

.rutes {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.foto img {
  display: block;
  width: 100%;
  border-radius: 8px;
}

.ruta h2 {
  margin: 8px 0 4px;
  font-size: 18px;
}

.ruta p {
  margin: 0;
  color: #5b6b63;
}`;

export const glossary = [
  {
    term: 'position',
    definition:
      'Propietat que decideix si una caixa segueix el flux de la pàgina (`static`, el valor per defecte) o es col·loca amb `top`, `right`, `bottom` i `left` (`relative`, `absolute` i `fixed`).',
  },
  {
    term: 'Caixa posicionada',
    definition:
      'Una caixa amb un `position` diferent de `static`. Només les caixes posicionades fan cas de `top`, `right`, `bottom`, `left` i `z-index`.',
  },
  {
    term: 'position: relative',
    definition:
      'La caixa continua al flux i conserva el seu lloc, però es pot desplaçar respecte d\'on era. Sobretot es fa servir perquè els fills amb `position: absolute` es col·loquin respecte d\'ella.',
  },
  {
    term: 'position: absolute',
    definition:
      'La caixa surt del flux i es col·loca respecte de les vores de l\'avantpassat posicionat més proper o, si no n\'hi ha cap, de la pàgina. Serveix per posar una caixa a sobre d\'una altra.',
  },
  {
    term: 'position: fixed',
    definition:
      'La caixa surt del flux i es col·loca respecte de la finestra del navegador: no es mou quan la pàgina es desplaça. És el que fan les capçaleres i els menús que sempre es veuen.',
  },
  {
    term: 'top, right, bottom i left',
    definition:
      'Les quatre propietats que diuen a quina distància de cada vora es col·loca una caixa posicionada. Amb dues vores oposades alhora (`left` i `right`), la caixa s\'estira.',
  },
  {
    term: 'z-index',
    definition:
      'Número que decideix quina caixa queda a sobre quan dues se solapen: guanya la que el té més alt. Només funciona en caixes posicionades.',
  },
];

export default {
  id: 'position',
  number: 10,
  title: 'position: relative, absolute i fixed',
  shortTitle: 'position: absolute i fixed',
  description:
    'Com posar una caixa a sobre d\'una altra o deixar-la clavada a la finestra: `position` treu els quadrats del flux i els col·loca amb `top`, `right`, `bottom` i `left`.',

  problem: {
    title: 'Vull l\'etiqueta a sobre de la foto, i sempre em queda a sota',
    text: [
      "Amb Flexbox i Grid ja sabem repartir els quadrats com vulguem: en fila, en columna, en graella. Però tots tenen una cosa en comú: cada quadrat va **al costat** o **a sota** d'un altre. Mai n'hi ha dos al mateix lloc.",
      "A la web de rutes ens calen dues coses que no encaixen amb això. La primera: l'etiqueta de dificultat («Fàcil», «Difícil») ha d'anar **a sobre** de la foto de cada ruta, en una cantonada. La segona: la capçalera s'ha de quedar a dalt de la finestra encara que baixem fins a l'última ruta.",
      "Cap de les dues es pot dibuixar amb files i columnes. Al dibuix, l'etiqueta és un quadrat petit pintat **sobre** el quadrat de la foto. Per escriure això hi ha una propietat nova, `position`, que treu un quadrat de la cua i ens deixa dir-li exactament on ha d'anar.",
    ],
  },

  goals: [
    'Explicar què vol dir que una caixa és «al flux» i què passa quan en surt.',
    'Desplaçar una caixa amb `position: relative` i `top`, `right`, `bottom` i `left`.',
    'Posar una caixa a sobre d\'una altra amb `position: absolute`, i triar respecte de qui es col·loca.',
    'Estirar una caixa donant-li dues vores oposades.',
    'Deixar una caixa clavada a la finestra amb `position: fixed`, sense que tapi el contingut.',
    'Decidir quina caixa queda a sobre amb `z-index`.',
  ],

  projectPiece:
    'Cada foto de ruta porta la seva etiqueta de dificultat en una cantonada, i la capçalera es queda fixa a dalt mentre la llista de rutes es desplaça.',

  finalProject:
    'La durada de cada vídeo va a sobre de la seva miniatura, i la capçalera i el menú lateral de la teva pàgina tipus YouTube es queden fixos mentre baixes.',

  sections: [
    {
      id: 'el-flux',
      title: 'El flux: on van les caixes si no dius res',
      blocks: [
        p("Fins ara no hem dit mai a cap caixa **on** ha d'anar. Hem dit com ha de ser (`width`, `padding`) i com s'han de repartir els fills d'un contenidor (`flex`, `grid`), però el lloc exacte de cada caixa el decideix el navegador: cada una va a continuació de l'anterior. Això és el **flux** de la pàgina."),
        p("Al flux, cada caixa ocupa el seu lloc i empeny les que venen després. Si en fas créixer una, les altres s'aparten. Per això mai n'hi ha dues al mateix lloc."),
        p("La propietat que decideix si una caixa segueix aquestes normes és `position`. El seu valor per defecte és `static`, que vol dir «al flux, com sempre». I amb `static` hi ha quatre propietats que no fan res: `top`, `right`, `bottom` i `left`."),
        example({
          title: 'Un top i un left que no fan res',
          intro: 'La caixa taronja té `top` i `left`, però no té `position`. Canvia els números: no es mourà.',
          html: HTML_CAIXES,
          css: `${CSS_CAIXES}

.dos {
  top: 30px;
  left: 60px;
  background: #c2410c;
}`,
          boxes: true,
          expected: 'Tres caixes apilades, la del mig taronja. Totes tres al seu lloc, com si `top` i `left` no hi fossin.',
          why: 'Sense `position`, la caixa és `static`: segueix el flux i el navegador ignora `top`, `right`, `bottom` i `left`. No és cap error, i per això no avisa.',
        }),
        concept(
          'Sense position no hi ha top ni left',
          "`top`, `right`, `bottom` i `left` només funcionen en caixes **posicionades**: les que tenen un `position` diferent de `static`. Si n'escrius una i no passa res, mira primer si la caixa té `position`."
        ),
        table(
          ['Valor', 'Continua al flux?', 'Respecte de què es col·loca'],
          [
            ['`static`', 'Sí. És el valor per defecte.', 'De res: va on li toca'],
            ['`relative`', 'Sí: el seu lloc queda reservat', 'Del lloc on era'],
            ['`absolute`', 'No', "De l'avantpassat posicionat més proper"],
            ['`fixed`', 'No', 'De la finestra del navegador'],
          ],
          'Els quatre valors de position que veurem'
        ),
      ],
    },

    {
      id: 'relative',
      title: 'position: relative: moure\'s sense deixar el lloc',
      blocks: [
        p("`position: relative` és el canvi més petit possible. La caixa continua al flux, al seu lloc, però ara sí que fa cas de `top`, `right`, `bottom` i `left`: es **desplaça** respecte del lloc on era."),
        example({
          title: 'La mateixa caixa, ara posicionada',
          intro: "És l'exemple anterior amb una sola línia més. Activa els «Quadrats» i fixa't en el buit que queda entre la primera caixa i la tercera.",
          html: HTML_CAIXES,
          css: `${CSS_CAIXES}

.dos {
  position: relative;
  top: 30px;
  left: 60px;
  background: #c2410c;
}`,
          boxes: true,
          expected: 'La caixa taronja baixa 30 píxels i es mou 60 cap a la dreta, i trepitja la tercera. On era abans hi queda un buit.',
          why: "La caixa es dibuixa en un altre lloc, però per a les seves germanes continua on era: el seu lloc queda reservat i la tercera caixa no puja a ocupar-lo.",
        }),
        list(
          '**Només es mou ella.** Les germanes no s\'assabenten de res.',
          '**El seu lloc queda buit**, reservat. Ningú l\'ocupa.',
          '**Pot trepitjar les veïnes.** És la primera vegada que veiem dues caixes al mateix lloc.'
        ),
        warning(
          'top no vol dir «cap amunt»',
          "`top: 30px` vol dir «a 30 píxels de la vora de dalt». La caixa s'allunya de dalt, és a dir, **baixa**. De la mateixa manera, `left: 60px` l'allunya de l'esquerra: se'n va cap a la dreta."
        ),
        concept(
          'Per a què serveix de veritat',
          "Moure caixes amb `relative` es fa servir poc: per separar-les ja tens `margin` i `gap`. El que fa `relative` imprescindible és una altra cosa: converteix la caixa en **posicionada** sense treure-la del seu lloc. I això, com veuràs de seguida, la fa servir de referència per als seus fills."
        ),
      ],
    },

    {
      id: 'absolute',
      title: 'position: absolute: sortir del flux',
      blocks: [
        p("Amb `position: absolute`, la caixa **surt del flux**. Per a les seves germanes és com si ja no hi fos: ocupen el lloc que ha deixat. I ella es col·loca on li diguin `top`, `right`, `bottom` i `left`, a sobre del que hi hagi."),
        example({
          title: 'Una caixa que se\'n va de la cua',
          intro: 'La caixa taronja té `top: 0` i `right: 0`. Esborra la línia `position: absolute;` i torna-la a escriure: mira què fan les altres dues.',
          html: HTML_CAIXES,
          css: `${CSS_BASE}

.caixa {
  margin-bottom: 4px;
  padding: 12px;
  color: #ffffff;
  background: #1f6f54;
}

.dos {
  position: absolute;
  top: 0;
  right: 0;
  background: #c2410c;
}`,
          boxes: true,
          expected: 'La caixa taronja, petita, a la cantonada de dalt a la dreta de la pàgina. Les dues verdes, apilades i juntes, sense cap buit entre elles.',
          why: "Li han passat tres coses: ha sortit del flux (la tercera caixa ha pujat), s'ha encongit fins a l'amplada del seu text i s'ha col·locat a zero píxels de la vora de dalt i de la vora dreta de la pàgina.",
        }),
        list(
          "**Surt del flux.** Les germanes tanquen el buit, com si l'haguessis esborrat de l'HTML.",
          "**S'encongeix.** Ja no ocupa tota la línia: només fa l'amplada del seu contingut.",
          '**Es col·loca des de les vores** que li diguis. Aquí, les de la pàgina.'
        ),
        p("«Des de les vores de la pàgina» no acostuma a ser el que volem. Gairebé sempre volem col·locar una caixa respecte d'una altra: l'etiqueta respecte de la foto, el botó de tancar respecte de l'avís. Per això hi ha una norma: una caixa `absolute` es col·loca respecte de **l'avantpassat posicionat més proper**. Puja pels seus pares i avis fins que en troba un que tingui `position` (que no sigui `static`). Si no en troba cap, es queda amb la pàgina."),
        example({
          title: 'El pare fa de referència',
          intro: 'Ara les tres caixes són dins d\'un marc que té `position: relative`. Esborra aquesta línia del marc i mira on va a parar la caixa taronja.',
          html: `<div class="marc">
  <div class="caixa">Un</div>
  <div class="caixa dos">Dos</div>
  <div class="caixa">Tres</div>
</div>`,
          css: `${CSS_BASE}

.marc {
  position: relative;
  margin: 24px;
  padding: 12px;
  border: 3px solid #1f6f54;
}

.caixa {
  margin-bottom: 4px;
  padding: 12px;
  color: #ffffff;
  background: #1f6f54;
}

.dos {
  position: absolute;
  top: 0;
  right: 0;
  background: #c2410c;
}`,
          boxes: true,
          expected: 'La caixa taronja queda a la cantonada de dalt a la dreta **del marc**, tocant la vora per dins. Sense el `position: relative` del marc, se\'n va a la cantonada de la pàgina.',
          why: "El marc és l'avantpassat posicionat més proper, i `top: 0` i `right: 0` es compten des de les seves vores. Fixa't que es compten des de la vora, no des del `padding`: la caixa taronja no respecta els 12 píxels d'aire del marc.",
        }),
        concept(
          'La parella de sempre: relative al pare, absolute al fill',
          "Per posar una caixa a sobre d'una altra calen dues línies en dos llocs diferents. `position: absolute` a la caixa que vols col·locar, i `position: relative` al quadrat que ha de fer de referència. El `relative` del pare no el mou de lloc: només li diu «tu ets el punt de partida»."
        ),
        custom('CssPlayground', {
          title: 'Prova-ho: position',
          intro: "La zona grisa fa de pàgina i el requadre de ratlles és el contenidor. Posa la caixa 2 en `absolute` i mou-la; després canvia el `position` del contenidor i mira com canvia el punt de partida.",
          items: 3,
          selector: '.marc',
          itemSelector: '.caixa',
          highlight: 2,
          controls: [
            { prop: 'position', options: ['static', 'relative'] },
            { target: 'item', prop: 'position', options: ['static', 'relative', 'absolute'] },
            { target: 'item', prop: 'top', min: 0, max: 80, step: 4, unit: 'px', initial: 0 },
            { target: 'item', prop: 'left', min: 0, max: 120, step: 4, unit: 'px', initial: 0 },
          ],
          height: 150,
        }),
      ],
    },

    {
      id: 'etiqueta-sobre-foto',
      title: 'Una etiqueta a sobre d\'una foto',
      blocks: [
        p("Ja tenim tot el que cal per a l'etiqueta de dificultat de la web de rutes. Primer, el dibuix: el quadrat de la foto i, **a sobre**, en una cantonada, el quadrat petit de l'etiqueta. Quan al dibuix un quadrat en trepitja un altre, ja saps que és un cas de `position`."),
        p("A l'HTML necessitem un contenidor que faci exactament la mida de la foto i que tingui a dins les dues coses: la imatge i l'etiqueta. Aquest contenidor serà la referència (`relative`) i l'etiqueta, la caixa que es col·loca (`absolute`)."),
        example({
          title: 'La dificultat, a la cantonada de la foto',
          intro: 'Mira l\'HTML: `.foto` conté la imatge i l\'etiqueta. Després, al CSS, canvia `top` i `left` per moure l\'etiqueta.',
          html: HTML_RUTA,
          css: `${CSS_RUTA}

.foto {
  position: relative;
}

.dificultat {
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 4px 10px;
  font-size: 13px;
  font-weight: bold;
  color: #ffffff;
  background: #1f6f54;
  border-radius: 12px;
}`,
          boxes: true,
          expected: 'La targeta del Camí de Ronda amb l\'etiqueta verda «Fàcil» sobre la foto, a 8 píxels de la vora de dalt i de l\'esquerra.',
          why: "L'etiqueta ha sortit del flux: per això no empeny el títol ni fa lloc sota la imatge. I com que `.foto` té `position: relative`, els 8 píxels es compten des de les vores de la foto i no des de les de la pàgina.",
        }),
        concept(
          'Al dibuix: un quadrat a sobre d\'un altre',
          "Fins ara, tots els quadrats que dibuixaves eren a dins d'un altre i al costat dels seus germans. Una caixa `absolute` continua sent **a dins** del seu contenidor a l'HTML, però es dibuixa **a sobre** del que hi hagi. El quadrat trepitjat (o el que els conté tots dos) porta `relative`; el que trepitja, `absolute`."
        ),
        warning(
          'El contenidor ha de fer la mida de la foto',
          "L'etiqueta es col·loca respecte de les vores del contenidor, no de la imatge. Si posessis el `relative` a tota la targeta, `bottom: 8px` portaria l'etiqueta a baix de tot, sobre el text. Per això la foto té el seu propi quadrat, `.foto`. I la imatge porta `display: block`: sense això, sota la imatge hi queda un petit espai, com vam veure a [la unitat de `display`](#/unitat/display)."
        ),
        challenge({
          title: 'A l\'altra cantonada',
          statement: "Porta l'etiqueta «Fàcil» a la cantonada de **baix a la dreta** de la foto, a 8 píxels de cada vora. L'etiqueta ha de continuar sent petita.",
          html: HTML_RUTA,
          css: `${CSS_RUTA}

.foto {
  position: relative;
}

.dificultat {
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 4px 10px;
  font-size: 13px;
  font-weight: bold;
  color: #ffffff;
  background: #1f6f54;
  border-radius: 12px;
}`,
          hint: "No n'hi ha prou d'afegir `right` i `bottom`: si també hi deixes `top` i `left`, la caixa haurà de tocar les quatre vores i s'estirarà. Substitueix-les.",
          solution: {
            css: `${CSS_RUTA}

.foto {
  position: relative;
}

.dificultat {
  position: absolute;
  right: 8px;
  bottom: 8px;
  padding: 4px 10px;
  font-size: 13px;
  font-weight: bold;
  color: #ffffff;
  background: #1f6f54;
  border-radius: 12px;
}`,
          },
          explanation: "Cada caixa posicionada necessita, com a molt, una vora horitzontal i una de vertical. `right` i `bottom` compten des de la dreta i des de baix de `.foto`, i el `relative` del contenidor no s'ha hagut de tocar.",
          checks: [
            { label: 'L\'etiqueta és a 8 píxels de la vora dreta de la foto', selector: '.dificultat', inside: '.foto', offset: { right: 8 } },
            { label: '…i a 8 píxels de la vora de baix', selector: '.dificultat', inside: '.foto', offset: { bottom: 8 } },
            { label: 'L\'etiqueta continua sent petita: no s\'ha estirat', selector: '.dificultat', size: { maxHeight: 40, maxWidth: 120 } },
          ],
        }),
        p("De vegades, però, estirar-se és justament el que volem. Si una caixa `absolute` té `left: 0` i `right: 0`, ha de tocar les dues vores alhora: **s'estira** d'una banda a l'altra del contenidor."),
        example({
          title: 'Un peu de foto d\'una banda a l\'altra',
          intro: 'El peu té tres vores: esquerra, dreta i baix. Esborra la línia `right: 0;` i mira com s\'encongeix.',
          html: `<div class="foto">
  <img src="imatges/ruta-3.jpg" alt="Un cim molt alt, amb neu">
  <p class="peu">Pica d'Estats · 3.143 m</p>
</div>`,
          css: `${CSS_BASE}

.foto {
  position: relative;
  width: 300px;
}

.foto img {
  display: block;
  width: 100%;
}

.peu {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  padding: 8px 12px;
  color: #ffffff;
  background: #23312b;
}`,
          boxes: true,
          expected: 'Una franja fosca amb el nom del cim, enganxada a baix de la foto i de la mateixa amplada que la foto.',
          why: "Una caixa `absolute` s'encongeix fins al seu contingut, però si li dones les dues vores oposades no pot: ha d'arribar a totes dues. És la manera d'estirar-la sense haver de calcular cap amplada.",
        }),
      ],
    },

    {
      id: 'fixed',
      title: 'position: fixed: clavat a la finestra',
      blocks: [
        p("`position: fixed` s'assembla molt a `absolute`: la caixa surt del flux i es col·loca amb `top`, `right`, `bottom` i `left`. El que canvia és la referència. No és cap avantpassat ni la pàgina: és **la finestra del navegador**. I com que la finestra no es mou quan et desplaces per la pàgina, la caixa tampoc."),
        example({
          title: 'Un botó que no es mou',
          intro: 'La pàgina de l\'exemple és més llarga que la seva finestra. Desplaça-t\'hi cap avall i no perdis de vista el botó.',
          viewport: 280,
          html: `${HTML_CONSELLS.replace(/\n  /g, '\n')}

<a class="amunt" href="#">▲ Amunt</a>`,
          css: `${CSS_BASE}

.amunt {
  position: fixed;
  right: 16px;
  bottom: 16px;
  padding: 10px 16px;
  color: #ffffff;
  text-decoration: none;
  background: #1f6f54;
  border-radius: 20px;
}`,
          expected: 'El text puja i baixa, però el botó «Amunt» es queda sempre a la cantonada de baix a la dreta de la finestra.',
          why: "`right: 16px` i `bottom: 16px` es compten des de les vores de la finestra, no des de les de la pàgina. Per molt que la pàgina es desplaci, la finestra continua al mateix lloc.",
        }),
        challenge({
          title: 'Clavat a l\'altra banda',
          statement: "El botó d'ajuda està col·locat amb `absolute`: quan baixes, se'n va amunt amb el text. Fes que es quedi clavat a la finestra i, de passada, porta'l a la cantonada de baix a **l'esquerra**, a 16 píxels de cada vora.",
          viewport: 280,
          html: `${HTML_CONSELLS.replace(/\n  /g, '\n')}

<button class="ajuda" type="button">Ajuda</button>`,
          css: `${CSS_BASE}

.ajuda {
  position: absolute;
  right: 16px;
  bottom: 16px;
  padding: 10px 16px;
  font-size: 16px;
  color: #ffffff;
  background: #c2410c;
  border: 0;
  border-radius: 20px;
}`,
          hint: 'Són dos canvis: el valor de `position` i la vora horitzontal des d\'on es compta. Recorda que no pot tenir `left` i `right` alhora, o s\'estirarà.',
          solution: {
            css: `${CSS_BASE}

.ajuda {
  position: fixed;
  left: 16px;
  bottom: 16px;
  padding: 10px 16px;
  font-size: 16px;
  color: #ffffff;
  background: #c2410c;
  border: 0;
  border-radius: 20px;
}`,
          },
          explanation: "Amb `absolute` i sense cap avantpassat posicionat, el botó es col·locava respecte de la pàgina: al principi semblava ben posat, però es desplaçava amb ella. Amb `fixed`, la referència és la finestra.",
          checks: [
            { label: 'El botó és fix', selector: '.ajuda', style: { position: 'fixed' } },
            { label: 'És a 16 píxels de la vora esquerra i de la de baix de la finestra', selector: '.ajuda', at: { left: 16, bottom: 16 } },
            { label: 'No s\'ha estirat d\'una banda a l\'altra', selector: '.ajuda', size: { maxWidth: 160 } },
          ],
        }),
        p("L'ús més habitual de `fixed` és la capçalera que no desapareix mai. Té dues trampes, i totes dues venen del mateix: una caixa `fixed` ha sortit del flux."),
        list(
          "**S'encongeix.** Com que ja no és un bloc al flux, només fa l'amplada del seu contingut. Cal estirar-la amb `left: 0` i `right: 0`.",
          "**No ocupa lloc.** El contingut puja a omplir el buit que ha deixat i queda amagat a sota. Cal apartar-lo amb un marge de la mateixa alçada que la capçalera."
        ),
        example({
          title: 'La capçalera, sempre a la vista',
          intro: 'Desplaça\'t dins de l\'exemple. Després esborra la línia `margin-top: 56px;` de `.contingut` i mira què li passa al títol.',
          width: 760,
          viewport: 300,
          html: HTML_PAGINA_CONSELLS,
          css: `${CSS_CAPCALERA_FIXA}

.contingut {
  margin-top: 56px;
  padding: 16px 24px;
}`,
          expected: 'La capçalera verda es queda a dalt mentre el text es desplaça per sota. Sense el `margin-top`, el títol queda amagat darrere de la capçalera.',
          why: "La capçalera fa 56 píxels d'alt i no ocupa lloc al flux. El contingut comença, doncs, a dalt de tot, just a sota d'ella. El marge de 56 píxels el torna a baixar fins on es veu.",
        }),
        concept(
          'El que és fix no ocupa lloc',
          "Cada vegada que fixis una caixa a una vora de la finestra, pregunta't què ha quedat a sota. La solució és sempre la mateixa: donar al contingut un marge **de la mateixa mida** que la caixa fixa, al mateix costat."
        ),
        p("Amb un menú lateral passa el mateix, per l'esquerra. Ha de començar on acaba la capçalera (`top: 56px`) i arribar fins a baix (`bottom: 0`): són dues vores oposades, i el menú s'estira de dalt a baix de la finestra."),
        example({
          title: 'Un menú lateral que tampoc es mou',
          intro: 'Hi ha dues caixes fixes i el contingut té dos marges: un per a cada una. Prova d\'esborrar `margin-left` de `.contingut`.',
          width: 760,
          viewport: 300,
          html: `${HTML_CAPCALERA}

<aside class="lateral">
  <a href="#">Totes les rutes</a>
  <a href="#">Fàcils</a>
  <a href="#">Mitjanes</a>
  <a href="#">Difícils</a>
</aside>

<main class="contingut">
  ${HTML_CONSELLS}
</main>`,
          css: `* {
  box-sizing: border-box;
}

${CSS_CAPCALERA_FIXA}

.lateral {
  position: fixed;
  top: 56px;
  left: 0;
  bottom: 0;
  width: 180px;
  padding: 16px;
  background: #e8f3ee;
}

.lateral a {
  display: block;
  padding: 8px 0;
  color: #23312b;
}

.contingut {
  margin-top: 56px;
  margin-left: 180px;
  padding: 16px 24px;
}`,
          boxes: true,
          expected: 'La capçalera a dalt i el menú de filtres a l\'esquerra, tots dos quiets. Només es desplaça el text de la dreta.',
          why: "El menú no té alçada: té `top` i `bottom`, i s'estira entre totes dues vores. El contingut s'aparta 56 píxels de dalt i 180 de l'esquerra, que és exactament el que ocupen les dues caixes fixes.",
        }),
        p("Hi ha un cinquè valor, `sticky`, que barreja les dues idees: la caixa es comporta com una de normal fins que arriba a dalt de la finestra, i llavors s'hi queda enganxada. No el farem servir en aquest dossier, però val la pena que el busquis quan ja dominis els altres."),
      ],
    },

    {
      id: 'z-index',
      title: 'z-index: qui queda a sobre',
      blocks: [
        p("Des que les caixes poden sortir del flux, n'hi pot haver dues al mateix lloc. Quina es veu? Si no dius res, entre caixes posicionades guanya la que està escrita **més avall a l'HTML**."),
        p("`z-index` canvia aquest ordre. És un número sense unitats: com més alt, més a sobre. No cal que siguin seguits; el que compta és quin és més gran."),
        example({
          title: 'Tres cartes, una sobre l\'altra',
          intro: 'La carta 3 tapa la 2, i la 2 tapa la 1: és l\'ordre de l\'HTML. Canvia el `z-index` de la primera per un `0` i torna a posar-hi un `5`.',
          html: `<div class="taula">
  <div class="carta u">1</div>
  <div class="carta dos">2</div>
  <div class="carta tres">3</div>
</div>`,
          css: `${CSS_BASE}

.taula {
  position: relative;
  height: 170px;
}

.carta {
  position: absolute;
  width: 90px;
  height: 80px;
  padding: 8px;
  font-weight: bold;
  text-align: right;
  color: #ffffff;
  border: 2px solid #ffffff;
  border-radius: 8px;
}

.u {
  top: 10px;
  left: 10px;
  z-index: 5;
  background: #1f6f54;
}

.dos {
  top: 40px;
  left: 70px;
  background: #c2410c;
}

.tres {
  top: 70px;
  left: 130px;
  background: #23312b;
}`,
          expected: 'Amb `z-index: 5`, la carta 1 (verda) queda a sobre de la 2. Amb `0`, torna a quedar a sota de totes.',
          why: "Les cartes 2 i 3 no tenen `z-index` i es pinten en l'ordre de l'HTML. La 1 hauria de quedar a sota de tot, però un `z-index` més alt la fa passar al davant.",
        }),
        warning(
          'z-index només funciona en caixes posicionades',
          "Igual que `top` i `left`, `z-index` no fa res en una caixa `static`. Si li poses un número ben alt i no canvia res, li falta `position`. Quan no la vols moure de lloc, `position: relative` és suficient."
        ),
        p("On es nota de veritat és amb la capçalera fixa. Les fotos de les rutes tenen `position: relative` i estan escrites més avall que la capçalera. Per tant, quan baixes, li passen **per sobre**."),
        example({
          title: 'La capçalera, per sobre de les fotos',
          intro: 'Desplaça\'t i mira com les fotos passen per sota de la capçalera. Ara esborra la línia `z-index: 10;` i torna-ho a provar.',
          width: 760,
          viewport: 300,
          html: `${HTML_CAPCALERA}

<main class="contingut">
  <div class="foto">
    <img src="imatges/ruta-2.jpg" alt="Una vall entre muntanyes">
    <span class="dificultat">Mitjana</span>
  </div>

  <div class="foto">
    <img src="imatges/ruta-5.jpg" alt="Una carena pelada">
    <span class="dificultat">Difícil</span>
  </div>
</main>`,
          css: `${CSS_CAPCALERA_FIXA.replace('  right: 0;', '  right: 0;\n  z-index: 10;')}

.contingut {
  margin-top: 56px;
  padding: 16px 24px;
}

.foto {
  position: relative;
  width: 420px;
  margin-bottom: 16px;
}

.foto img {
  display: block;
  width: 100%;
  border-radius: 8px;
}

.dificultat {
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 4px 10px;
  font-size: 13px;
  font-weight: bold;
  color: #ffffff;
  background: #1f6f54;
  border-radius: 12px;
}`,
          expected: 'Amb `z-index: 10`, les fotos i les etiquetes desapareixen per sota de la capçalera en pujar. Sense, passen per sobre i la tapen.',
          why: "La capçalera i les fotos són caixes posicionades. Sense `z-index`, guanyen les fotos, que venen després a l'HTML. Amb un `z-index` a la capçalera, és ella qui queda al davant de tot el que no en té.",
        }),
      ],
    },

    {
      id: 'quan-cada-un',
      title: 'Quin valor per a cada cas',
      blocks: [
        p("Són tres valors nous i, a la pràctica, tres situacions. Si saps dir quina tens al davant, ja saps quin valor et cal."),
        table(
          ['Vull…', 'Faig servir…'],
          [
            ['Una etiqueta, un número o un botó **a sobre** d\'una foto o d\'una targeta', '`relative` al contenidor i `absolute` al que va a sobre'],
            ['Una franja d\'una banda a l\'altra d\'una foto', '`absolute` amb `left: 0` i `right: 0`'],
            ['Una capçalera, un menú o un botó que **es vegin sempre**', '`fixed`, i un marge al contingut'],
            ['Que una caixa quedi **al davant** d\'una altra', '`z-index`, en una caixa posicionada'],
            ['Posar caixes de costat, en columna o en graella', 'Res d\'això: `flex` o `grid`'],
          ],
          'Quan fer servir cada valor de position'
        ),
        example({
          title: 'La llista de rutes, acabada',
          intro: 'Hi ha de tot: una capçalera fixa amb `z-index`, una graella i, a cada foto, la seva etiqueta. Activa els «Quadrats» i desplaça\'t.',
          width: 900,
          viewport: 320,
          html: HTML_LLISTA,
          css: `${CSS_CAPCALERA_FIXA.replace('  right: 0;', '  right: 0;\n  z-index: 10;')}

${CSS_GRAELLA.replace('.contingut {', '.contingut {\n  margin-top: 56px;')}

.foto {
  position: relative;
}

.dificultat {
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 4px 10px;
  font-size: 13px;
  font-weight: bold;
  color: #ffffff;
  background: #1f6f54;
  border-radius: 12px;
}`,
          expected: 'Sis targetes en tres columnes, cada foto amb la seva dificultat a la cantonada. En baixar, la capçalera es queda a dalt i les fotos li passen per sota.',
          why: "La graella col·loca les targetes (`grid`), la capçalera col·loca el logo i el menú (`flex`), i `position` només s'ocupa del que no és ni al costat ni a sota de res: les etiquetes i la capçalera fixa.",
        }),
        warning(
          'position no és per maquetar',
          "És temptador col·locar-ho tot amb `absolute`, `top` i `left`, com qui enganxa adhesius. No ho facis: les caixes fora del flux no s'aparten les unes de les altres, i quan canvia l'amplada de la finestra o la llargada d'un text, tot es trepitja. La pàgina es munta amb `flex` i `grid`. `position` és per a les excepcions."
        ),
        project(
          "La web de rutes guanya les dues coses que li faltaven. La capçalera es queda fixa a dalt, per sobre de tot, i el contingut baixa per no quedar tapat. I cada foto és la referència de la seva etiqueta de dificultat.",
          {
            title: 'Etiquetes sobre les fotos i capçalera fixa',
            lang: 'css',
            code: `.capcalera {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}

.contingut {
  margin-top: 56px;
}

.foto {
  position: relative;
}

.dificultat {
  position: absolute;
  top: 8px;
  left: 8px;
}`,
          }
        ),
      ],
    },
  ],

  commonErrors: [
    {
      title: 'Oblidar el position: relative del contenidor',
      bad: `.dificultat {
  position: absolute;
  top: 8px;
  left: 8px;
}`,
      badLang: 'css',
      symptom: 'Totes les etiquetes se\'n van a la cantonada de dalt a l\'esquerra de la pàgina, les unes sobre les altres, en lloc de quedar cada una sobre la seva foto.',
      why: "Una caixa `absolute` es col·loca respecte de l'avantpassat posicionat més proper. Com que `.foto` no té `position`, no en troba cap i fa servir la pàgina.",
      fix: `.foto {
  position: relative;
}

.dificultat {
  position: absolute;
  top: 8px;
  left: 8px;
}`,
      fixLang: 'css',
    },
    {
      title: 'Escriure top o left sense position',
      bad: `.etiqueta {
  top: 8px;
  right: 8px;
}`,
      badLang: 'css',
      symptom: 'L\'etiqueta no es mou gens, posis el número que hi posis.',
      why: "Per defecte, les caixes són `static`, i en una caixa `static` el navegador ignora `top`, `right`, `bottom` i `left`.",
      fix: `.etiqueta {
  position: absolute;
  top: 8px;
  right: 8px;
}`,
      fixLang: 'css',
    },
    {
      title: 'Una capçalera fixa que tapa el principi de la pàgina',
      bad: `.capcalera {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
}`,
      badLang: 'css',
      symptom: 'El títol i les primeres línies del contingut no es veuen: han quedat amagats darrere de la capçalera.',
      why: "La capçalera ha sortit del flux i ja no ocupa lloc. El contingut puja a omplir el buit i queda just a sota d'ella.",
      fix: `.capcalera {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
}

.contingut {
  margin-top: 56px;
}`,
      fixLang: 'css',
    },
    {
      title: 'Una capçalera fixa que no arriba d\'una banda a l\'altra',
      bad: `.capcalera {
  position: fixed;
  top: 0;
}`,
      badLang: 'css',
      symptom: 'La capçalera només fa l\'amplada del logo i del menú, i queda arraconada a l\'esquerra.',
      why: "Una caixa fora del flux s'encongeix fins a l'amplada del seu contingut: ja no ocupa tota la línia com feia quan era un bloc.",
      fix: `.capcalera {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}`,
      fixLang: 'css',
    },
    {
      title: 'Posar z-index a una caixa sense position',
      bad: `.avis {
  z-index: 100;
}`,
      badLang: 'css',
      symptom: 'L\'avís continua tapat, per molt alt que sigui el número.',
      why: "`z-index` només funciona en caixes posicionades. En una caixa `static`, el navegador l'ignora.",
      fix: `.avis {
  position: relative;
  z-index: 100;
}`,
      fixLang: 'css',
    },
  ],

  exercises: [
    {
      id: 'etiqueta-nova',
      title: 'Una ruta nova',
      statement: "La ruta de l'estany s'acaba d'afegir a la web. Posa l'etiqueta «Nova» **a sobre** de la foto, a la cantonada de dalt a la dreta, a 8 píxels de cada vora. El contenidor `.foto` ja té `position: relative`.",
      expected: 'L\'etiqueta taronja «Nova» sobre la foto, a dalt a la dreta. Sota la foto no hi queda res.',
      html: `<div class="foto">
  <img src="imatges/ruta-4.jpg" alt="Un estany de muntanya">
  <span class="etiqueta">Nova</span>
</div>`,
      css: `${CSS_BASE}

.foto {
  position: relative;
  width: 280px;
}

.foto img {
  display: block;
  width: 100%;
  border-radius: 8px;
}

.etiqueta {
  padding: 4px 10px;
  font-size: 13px;
  font-weight: bold;
  color: #ffffff;
  background: #c2410c;
  border-radius: 12px;
}`,
      hint: 'Són tres línies, i totes tres van a `.etiqueta`: una la treu del flux i les altres dues diuen a quina distància de cada vora ha de quedar.',
      solution: {
        css: `${CSS_BASE}

.foto {
  position: relative;
  width: 280px;
}

.foto img {
  display: block;
  width: 100%;
  border-radius: 8px;
}

.etiqueta {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 4px 10px;
  font-size: 13px;
  font-weight: bold;
  color: #ffffff;
  background: #c2410c;
  border-radius: 12px;
}`,
      },
      explanation: "Amb `position: absolute`, l'etiqueta deixa d'ocupar lloc sota la imatge i es col·loca des de les vores de `.foto`, que és el seu avantpassat posicionat més proper.",
      checks: [
        { label: 'L\'etiqueta és a 8 píxels de la vora de dalt de la foto', selector: '.etiqueta', inside: '.foto', offset: { top: 8 } },
        { label: '…i a 8 píxels de la vora dreta', selector: '.etiqueta', inside: '.foto', offset: { right: 8 } },
        { label: 'Sota la foto ja no hi queda el lloc de l\'etiqueta', selector: '.foto img', inside: '.foto', offset: { bottom: 0 } },
      ],
    },
    {
      id: 'peu-de-foto',
      title: 'El nom del cim, sobre la foto',
      statement: "El peu de foto queda a sota de la imatge. Posa'l **a sobre**, enganxat a la vora de baix i estirat d'una banda a l'altra de la foto. Estira'l amb `left` i `right`, no amb `width`. Aquesta vegada el contenidor no té res preparat.",
      expected: 'Una franja fosca amb el text «Puigmal · 2.910 m» sobre la part de baix de la foto, de la mateixa amplada que la foto.',
      html: `<div class="foto">
  <img src="imatges/ruta-5.jpg" alt="Una carena pelada, sense arbres">
  <p class="peu">Puigmal · 2.910 m</p>
</div>`,
      css: `${CSS_BASE}

.foto {
  width: 300px;
}

.foto img {
  display: block;
  width: 100%;
}

.peu {
  margin: 0;
  padding: 8px 12px;
  color: #ffffff;
  background: #23312b;
}`,
      hint: [
        'Has de tocar dues regles. El peu surt del flux i es col·loca amb tres vores; i algú ha de fer de referència.',
        'Si el peu se te\'n va a baix de tot de la pàgina, és que `.foto` encara no és una caixa posicionada.',
      ],
      solution: {
        css: `${CSS_BASE}

.foto {
  position: relative;
  width: 300px;
}

.foto img {
  display: block;
  width: 100%;
}

.peu {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  padding: 8px 12px;
  color: #ffffff;
  background: #23312b;
}`,
      },
      explanation: "És la parella de sempre: `relative` al contenidor i `absolute` al que va a sobre. Amb `left: 0` i `right: 0`, el peu ha de tocar les dues vores i s'estira; `bottom: 0` l'enganxa a baix.",
      checks: [
        { label: 'El peu és a sobre de la foto, no a sota', selector: '.foto img', inside: '.foto', offset: { bottom: 0 } },
        { label: 'El peu toca la vora de baix de la foto', selector: '.peu', inside: '.foto', offset: { bottom: 0 } },
        { label: 'El peu va d\'una vora a l\'altra de la foto', selector: '.peu', inside: '.foto', offset: { left: 0, right: 0 } },
      ],
    },
    {
      id: 'boto-flotant',
      title: 'Un botó sempre a mà',
      statement: "El botó «Nova ruta» és al final de la llista, i s'ha de baixar fins a baix per trobar-lo. Fes que es vegi sempre, a la cantonada de baix a la dreta de la finestra, a 16 píxels de cada vora, encara que la llista es desplaci.",
      expected: 'El botó verd, a baix a la dreta de la finestra, quiet mentre la llista de rutes puja i baixa.',
      viewport: 260,
      html: `<h1>Les meves rutes</h1>

<div class="rutes">
  <p>Camí de Ronda · 12 km</p>
  <p>Vall de Núria · 9 km</p>
  <p>Pica d'Estats · 18 km</p>
  <p>Estany de Sant Maurici · 7 km</p>
  <p>Puigmal · 14 km</p>
  <p>Sant Jeroni · 11 km</p>
</div>

<button class="nova" type="button">+ Nova ruta</button>`,
      css: `${CSS_BASE}

.rutes p {
  margin: 0;
  padding: 16px 0;
  border-bottom: 1px solid #c9d6cf;
}

.nova {
  padding: 12px 18px;
  font-size: 16px;
  color: #ffffff;
  background: #1f6f54;
  border: 0;
  border-radius: 24px;
}`,
      hint: 'Quin valor de `position` pren com a referència la finestra, i no la pàgina? Després només cal dir-li a quina distància de la dreta i de baix ha de quedar.',
      solution: {
        css: `${CSS_BASE}

.rutes p {
  margin: 0;
  padding: 16px 0;
  border-bottom: 1px solid #c9d6cf;
}

.nova {
  position: fixed;
  right: 16px;
  bottom: 16px;
  padding: 12px 18px;
  font-size: 16px;
  color: #ffffff;
  background: #1f6f54;
  border: 0;
  border-radius: 24px;
}`,
      },
      explanation: "Amb `fixed`, les distàncies es compten des de les vores de la finestra, que no es mou quan et desplaces. Amb `absolute` hauria semblat que funcionava, però el botó se n'hauria anat amb la pàgina en baixar.",
      checks: [
        { label: 'El botó és fix: no es mou amb la pàgina', selector: '.nova', style: { position: 'fixed' } },
        { label: 'És a 16 píxels de la vora dreta de la finestra', selector: '.nova', at: { right: 16 } },
        { label: '…i a 16 píxels de la vora de baix', selector: '.nova', at: { bottom: 16 } },
      ],
    },
    {
      id: 'capcalera-fixa',
      title: 'Una capçalera que no se\'n va',
      statement: [
        "Fes que la capçalera es quedi a dalt de la finestra quan la pàgina es desplaça. Ha de continuar anant d'una banda a l'altra.",
        "Vigila amb el títol: quan la capçalera sigui fixa, quedarà amagat a sota. La capçalera fa 56 píxels d'alt.",
      ],
      expected: 'La capçalera verda a dalt, d\'una vora a l\'altra, i el títol «Consells per anar a la muntanya» visible a sota. En baixar, la capçalera no es mou.',
      width: 760,
      viewport: 300,
      html: HTML_PAGINA_CONSELLS,
      css: `${CSS_CAPCALERA}

.contingut {
  padding: 16px 24px;
}`,
      hint: [
        'A la capçalera li calen quatre línies: el `position` i tres vores. Una caixa fixa s\'encongeix si no li dius que toqui l\'esquerra i la dreta.',
        'El contingut ha de baixar exactament el que fa la capçalera d\'alt. Fes-ho amb un marge a `.contingut`.',
      ],
      solution: {
        css: `${CSS_CAPCALERA_FIXA}

.contingut {
  margin-top: 56px;
  padding: 16px 24px;
}`,
      },
      explanation: "Una caixa `fixed` surt del flux, i això té dues conseqüències: s'encongeix (per això `left: 0` i `right: 0`) i deixa d'ocupar lloc (per això el `margin-top` del contingut, de la mateixa mida que la capçalera).",
      checks: [
        { label: 'La capçalera és fixa', selector: '.capcalera', style: { position: 'fixed' } },
        { label: 'Toca la vora de dalt i va d\'una banda a l\'altra de la finestra', selector: '.capcalera', at: { top: 0, left: 0, right: 0 } },
        { label: 'Continua fent 56 píxels d\'alt', selector: '.capcalera', size: { height: 56 } },
        { label: 'El títol no queda tapat per la capçalera', selector: '.contingut h1', below: '.capcalera' },
      ],
    },
  ],

  finalExercise: {
    id: 'pagina-de-rutes',
    title: 'La llista de rutes, amb etiquetes i capçalera fixa',
    statement: [
      "La graella de rutes ja està maquetada, però li falten tres coses. Mira l'«Objectiu», desplaça-t'hi i fes que el teu resultat es comporti igual.",
      "**Les etiquetes.** Cada etiqueta de dificultat ha d'anar a sobre de la seva foto, a la cantonada de dalt a l'esquerra, a 8 píxels de cada vora.",
      "**La capçalera.** S'ha de quedar fixa a dalt, d'una banda a l'altra, sense tapar el títol «Rutes». Fa 56 píxels d'alt.",
      "**Qui va a sobre.** Quan baixis, les fotos no han de passar per sobre de la capçalera: dona-li `z-index: 10`.",
    ],
    expected: 'Sis targetes en tres columnes, cada foto amb la seva etiqueta a la cantonada. En baixar, la capçalera es queda a dalt i les fotos li passen per sota.',
    width: 900,
    viewport: 320,
    html: HTML_LLISTA,
    css: `${CSS_CAPCALERA}

${CSS_GRAELLA}

${CSS_DIFICULTAT}`,
    hint: [
      'Per a les etiquetes calen dues regles: `.foto` fa de referència i `.dificultat` surt del flux. Si totes se te\'n van a la mateixa cantonada de la pàgina, falta la primera.',
      'La capçalera és com la de l\'exercici anterior: `fixed`, tres vores i un marge al contingut. El `z-index` va a la mateixa regla.',
    ],
    solution: {
      css: `${CSS_CAPCALERA_FIXA.replace('  right: 0;', '  right: 0;\n  z-index: 10;')}

${CSS_GRAELLA.replace('.contingut {', '.contingut {\n  margin-top: 56px;')}

.foto {
  position: relative;
}

.dificultat {
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 4px 10px;
  font-size: 13px;
  font-weight: bold;
  color: #ffffff;
  background: #1f6f54;
  border-radius: 12px;
}`,
    },
    explanation: [
      "Són els tres usos de `position` en una sola pàgina. La parella `relative` i `absolute` posa cada etiqueta sobre la seva foto; `fixed` deixa la capçalera a la finestra, i el marge del contingut evita que el tapi; i `z-index` decideix que la capçalera va al davant de les fotos, que també són caixes posicionades.",
      "Fixa't que la maquetació no s'ha tocat: la graella continua sent `grid` i la capçalera continua sent `flex`. `position` només s'ha ocupat de les caixes que havien d'anar a sobre d'unes altres.",
    ],
    checks: [
      { label: 'Cada etiqueta és a 8 píxels de la vora de dalt i de l\'esquerra de la seva foto', selector: '.dificultat', all: true, inside: '.foto', offset: { top: 8, left: 8 } },
      { label: 'Sota de cada foto ja no hi queda el lloc de l\'etiqueta', selector: '.foto img', all: true, inside: '.foto', offset: { bottom: 0 } },
      { label: 'La capçalera és fixa', selector: '.capcalera', style: { position: 'fixed' } },
      { label: 'Toca la vora de dalt i va d\'una banda a l\'altra de la finestra', selector: '.capcalera', at: { top: 0, left: 0, right: 0 } },
      { label: 'El títol «Rutes» no queda tapat per la capçalera', selector: '.contingut h1', below: '.capcalera' },
      { label: 'La capçalera té z-index: 10 i queda per sobre de les fotos', selector: '.capcalera', style: { 'z-index': '10' } },
    ],
  },

  summary: [
    "Per defecte, totes les caixes són al **flux** (`position: static`): cada una ocupa el seu lloc, i `top`, `right`, `bottom` i `left` no hi fan res.",
    "`relative` desplaça la caixa respecte del lloc on era, que queda reservat. Sobretot serveix per fer de referència als fills `absolute`.",
    "`absolute` treu la caixa del flux i la col·loca respecte de l'**avantpassat posicionat** més proper; si no n'hi ha cap, respecte de la pàgina.",
    "La parella de sempre: `relative` al contenidor i `absolute` al que va a sobre, com l'etiqueta d'una foto.",
    "Amb dues vores oposades (`left: 0` i `right: 0`), una caixa posicionada s'estira.",
    "`fixed` col·loca la caixa respecte de la **finestra**, i no es mou quan et desplaces. Com que no ocupa lloc, cal apartar el contingut amb un marge de la seva mida.",
    "`z-index` decideix quina caixa queda a sobre, i només funciona en caixes posicionades.",
  ],

  quiz: [
    {
      question: 'Una caixa té `position: relative` i `top: 20px`. Què els passa a les caixes que venen després?',
      options: [
        { text: 'Res: es queden on eren, perquè el lloc de la caixa continua reservat', correct: true },
        { text: 'Baixen 20 píxels, empeses per la caixa', why: 'Això és el que passaria amb `margin-top`. Amb `relative`, la caixa es dibuixa en un altre lloc però al flux continua on era.' },
        { text: 'Pugen a ocupar el lloc que ha deixat', why: 'Això passa amb `absolute` i `fixed`, que treuen la caixa del flux. Amb `relative`, el lloc queda reservat.' },
        { text: 'Es posen al seu costat, en fila', why: '`position` no posa caixes de costat: d\'això se n\'encarrega `flex`.' },
      ],
      explanation: '`relative` només canvia on es dibuixa la caixa. Per a la resta de la pàgina, continua ocupant el seu lloc de sempre.',
    },
    {
      question: 'Respecte de què es col·loca una caixa amb `position: absolute`?',
      options: [
        { text: 'De l\'avantpassat posicionat més proper o, si no n\'hi ha cap, de la pàgina', correct: true },
        { text: 'Sempre del seu pare', why: 'Només si el pare té `position`. Si no en té, la caixa continua pujant fins a trobar un avantpassat que en tingui.' },
        { text: 'Sempre de la finestra del navegador', why: 'Això és el que fa `fixed`.' },
        { text: 'Del lloc on era abans de moure-la', why: 'Això és el que fa `relative`.' },
      ],
      explanation: 'Una caixa `absolute` busca, cap amunt, el primer avantpassat que tingui `position` diferent de `static`. Per això es posa `relative` al contenidor que ha de fer de referència.',
    },
    {
      question: 'Vols posar el preu a la cantonada d\'una foto. L\'HTML és un `<div class="foto">` amb un `<img>` i un `<span class="preu">` a dins. Què has d\'escriure?',
      options: [
        { text: '`position: relative` a `.foto` i `position: absolute` a `.preu`', correct: true },
        { text: '`position: absolute` a `.foto` i `position: relative` a `.preu`', why: 'És a l\'inrevés: el contenidor és la referència (`relative`) i el que va a sobre surt del flux (`absolute`).' },
        { text: 'Només `position: absolute` a `.preu`', why: 'Sense cap avantpassat posicionat, el preu es col·locaria respecte de la pàgina i no de la foto.' },
        { text: '`display: flex` a `.foto`', why: 'Flex posaria el preu al costat de la imatge, no a sobre.' },
      ],
      explanation: 'És la parella de sempre: el quadrat que fa de referència porta `relative` i el quadrat que va a sobre, `absolute`.',
    },
    {
      question: 'Quina diferència hi ha entre `absolute` i `fixed`?',
      options: [
        { text: '`fixed` es col·loca respecte de la finestra i no es mou quan la pàgina es desplaça', correct: true },
        { text: '`fixed` continua al flux i `absolute`, no', why: 'Totes dues surten del flux. El que canvia és respecte de què es col·loquen.' },
        { text: '`absolute` no admet `top` ni `left`', why: 'Totes dues es col·loquen amb `top`, `right`, `bottom` i `left`.' },
        { text: 'No n\'hi ha cap: són dos noms per al mateix', why: 'Una caixa `absolute` es desplaça amb la pàgina; una de `fixed` es queda a la finestra.' },
      ],
      explanation: 'Totes dues treuen la caixa del flux. `absolute` la col·loca dins de la pàgina (i es mou amb ella); `fixed`, dins de la finestra.',
    },
    {
      question: 'Has fixat a dalt una capçalera de 60 píxels d\'alt, i ara el títol de la pàgina no es veu. Com ho arregles?',
      options: [
        { text: 'Donant al contingut un `margin-top` de 60 píxels', correct: true },
        { text: 'Posant `z-index: 10` al títol', why: 'El títol no té `position`, de manera que `z-index` no hi faria res. I el problema no és qui va a sobre: és que tots dos són al mateix lloc.' },
        { text: 'Canviant la capçalera a `position: absolute`', why: 'També sortiria del flux i taparia el títol igualment. A més, deixaria de quedar-se a dalt en baixar.' },
        { text: 'Posant `top: 60px` a la capçalera', why: 'Això baixaria la capçalera 60 píxels, i deixaria un buit a dalt de la finestra.' },
      ],
      explanation: 'Una caixa fixa no ocupa lloc al flux. Cal apartar el contingut amb un marge de la mateixa mida que la caixa.',
    },
    {
      question: 'Has posat `z-index: 50` a una caixa perquè quedi al davant d\'una altra, i no canvia res. Quina és la causa més probable?',
      options: [
        { text: 'La caixa no té `position`, i `z-index` només funciona en caixes posicionades', correct: true },
        { text: 'El número és massa baix: ha de ser més gran que 100', why: 'No hi ha cap mínim. Només compta que sigui més gran que el de l\'altra caixa.' },
        { text: 'Falta la unitat: hauria de ser `50px`', why: '`z-index` és un número sense unitats.' },
        { text: '`z-index` només funciona dins d\'un contenidor flex', why: 'No té res a veure amb flex: depèn de `position`.' },
      ],
      explanation: 'Com `top` i `left`, `z-index` s\'ignora en les caixes `static`. Si no vols moure la caixa, n\'hi ha prou amb `position: relative`.',
    },
  ],
};
