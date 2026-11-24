import { p, list, example, concept, warning, challenge, project, table, compare, custom } from '../../blocks.js';

const CSS_BASE = `body {
  font-family: Arial, sans-serif;
}`;

const CSS_PAGINA = `body {
  margin: 0;
  font-family: Arial, sans-serif;
}`;

// Sis caixes numerades dins d'un contenidor: la base dels primers exemples.
const HTML_SIS = `<div class="graella">
  <div class="caixa">1</div>
  <div class="caixa">2</div>
  <div class="caixa">3</div>
  <div class="caixa">4</div>
  <div class="caixa">5</div>
  <div class="caixa">6</div>
</div>`;

const CSS_CAIXA = `.caixa {
  padding: 16px 8px;
  color: #ffffff;
  text-align: center;
  background: #1f6f54;
  border-radius: 6px;
}`;

// Les rutes de la web, per muntar galeries de targetes.
const RUTES = [
  { nom: 'Camí de Ronda', alt: 'Un camí arran de mar', dades: '12 km · Fàcil', nivell: 'Fàcil' },
  { nom: 'Vall de Núria', alt: 'El camí vell de Núria', dades: '9 km · Mitjana', nivell: 'Mitjana' },
  { nom: "Pica d'Estats", alt: "El cim de la Pica d'Estats", dades: '18 km · Difícil', nivell: 'Difícil' },
  { nom: 'Estany de Sant Maurici', alt: 'Un estany envoltat de muntanyes', dades: '7 km · Fàcil', nivell: 'Fàcil' },
  { nom: 'Puigmal', alt: 'La carena del Puigmal', dades: '14 km · Difícil', nivell: 'Difícil' },
  { nom: 'Sant Jeroni', alt: 'Les agulles de Montserrat', dades: '11 km · Mitjana', nivell: 'Mitjana' },
];

const targeta = (ruta, index, classe = 'ruta') => `  <article class="${classe}">
    <img src="imatges/ruta-${index + 1}.jpg" alt="${ruta.alt}">
    <h3>${ruta.nom}</h3>
    <p>${ruta.dades}</p>
  </article>`;

// `quantes` targetes; si `destacada`, la primera porta també aquesta classe.
const targetes = (quantes = 6, destacada = false) =>
  RUTES.slice(0, quantes)
    .map((ruta, index) => targeta(ruta, index, destacada && index === 0 ? 'ruta destacada' : 'ruta'))
    .join('\n\n');

const galeria = (quantes = 6, destacada = false, etiqueta = 'div') => `<${etiqueta} class="galeria">
${targetes(quantes, destacada)}
</${etiqueta}>`;

const sagnat = (text, espais) =>
  text
    .split('\n')
    .map((linia) => (linia === '' ? linia : ' '.repeat(espais) + linia))
    .join('\n');

const CSS_RUTA = `.ruta img {
  display: block;
  width: 100%;
  border-radius: 8px;
}

.ruta h3 {
  margin: 8px 0 2px;
  font-size: 16px;
}

.ruta p {
  margin: 0;
  font-size: 14px;
  color: #5b6b63;
}`;

const HTML_CAPCALERA = `<header class="capcalera">
  <a class="logo" href="index.html">▲ Camins</a>

  <nav class="menu">
    <a href="index.html">Rutes</a>
    <a href="mapa.html">Mapa</a>
    <a href="consells.html">Consells</a>
  </nav>
</header>`;

const CSS_CAPCALERA = `.capcalera {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  gap: 24px;
}`;

const HTML_FILTRES = `<aside class="filtres">
  <h2>Dificultat</h2>
  <a href="#">Totes</a>
  <a href="#">Fàcil</a>
  <a href="#">Mitjana</a>
  <a href="#">Difícil</a>
</aside>`;

// La pàgina de rutes sencera: capçalera, panell de filtres i galeria.
const paginaDeRutes = (quantes, destacada) => `${HTML_CAPCALERA}

<div class="cos">
${sagnat(HTML_FILTRES, 2)}

${sagnat(galeria(quantes, destacada, 'main'), 2)}
</div>`;

const CSS_FILTRES_ASPECTE = `.filtres {
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
}`;

export const glossary = [
  {
    term: 'Grid',
    definition:
      'Sistema de maquetació de CSS que col·loca els fills d\'un contenidor en files i columnes alhora, com una quadrícula. S\'activa amb `display: grid` al contenidor.',
  },
  {
    term: 'Contenidor grid',
    definition:
      'L\'element que té `display: grid`. És el pare: ell dibuixa les columnes, i els seus fills directes van omplint les cel·les per ordre.',
  },
  {
    term: 'grid-template-columns',
    definition:
      'Propietat del contenidor grid que diu quantes columnes hi ha i quant fa cada una: una mida per columna, separades per espais.',
  },
  {
    term: 'fr',
    definition:
      'Unitat de Grid: una fracció de l\'espai que queda lliure. Amb `1fr 2fr`, la segona columna fa el doble que la primera.',
  },
  {
    term: 'repeat()',
    definition: 'Manera curta d\'escriure columnes repetides: `repeat(3, 1fr)` és el mateix que `1fr 1fr 1fr`.',
  },
  {
    term: 'grid-column',
    definition:
      'Propietat d\'un fill d\'un contenidor grid que diu quantes columnes ocupa. Amb `grid-column: span 2`, n\'ocupa dues.',
  },
  {
    term: 'Cel·la',
    definition: 'Cada un dels forats d\'una graella, on es creuen una fila i una columna. Per defecte, cada fill n\'ocupa una.',
  },
];

export default {
  id: 'grid',
  number: 9,
  title: 'Grid: files i columnes alhora',
  shortTitle: 'Grid: files i columnes',
  description:
    'Com dibuixar una quadrícula: un contenidor amb `display: grid` defineix les columnes i els seus fills van omplint les cel·les, fila rere fila.',

  problem: {
    title: 'Vull tres rutes per fila, i que totes facin el mateix',
    text: [
      "La web de rutes ja té sis rutes i les volem ensenyar en una galeria: tres per fila, totes de la mateixa amplada i ben alineades, com les miniatures de qualsevol web de vídeos.",
      "Amb Flexbox ens hi podem acostar. Una fila amb `flex-wrap` fa saltar les targetes de línia, però cada línia va pel seu compte: s'ha de calcular l'amplada de cada targeta a mà, i si a l'última fila n'hi ha menys, deixen d'estar alineades amb les de dalt.",
      "El problema és que Flexbox pensa en **una sola direcció**: una fila, o una columna. Una galeria té files **i** columnes alhora. Per a això hi ha una altra eina, que es pensa igual que es dibuixa: una quadrícula. Tu dius quantes columnes vols, i el navegador hi va posant els quadrats.",
    ],
  },

  goals: [
    'Convertir un contenidor en una graella amb `display: grid`.',
    'Definir les columnes amb `grid-template-columns`, en píxels i en fraccions (`fr`).',
    'Escriure columnes repetides amb `repeat()` i separar files i columnes amb `gap`.',
    "Fer que un element ocupi més d'una columna amb `grid-column: span`.",
    'Maquetar una pàgina amb un panell lateral i una galeria.',
    'Decidir quan convé Flexbox i quan Grid, i combinar-los.',
  ],

  projectPiece:
    "Les targetes de les rutes formen una galeria de tres columnes, i la pàgina guanya un panell de filtres al costat del contingut: una columna fixa i una altra que es queda la resta.",

  finalProject:
    'La graella de vídeos de la pàgina inicial i les dues columnes de la pàgina del vídeo (el reproductor i la llista de recomanats) es fan amb Grid.',

  sections: [
    {
      id: 'display-grid',
      title: 'display: grid: el pare dibuixa una quadrícula',
      blocks: [
        p("Grid comença igual que Flexbox: no toquem els fills, anem **al pare**. Però en lloc de dir-li «posa'ls en fila», li dibuixem les columnes. Calen dues línies: `display: grid`, que converteix el pare en un **contenidor grid**, i `grid-template-columns`, que diu quantes columnes hi ha i quant fa cada una."),
        example({
          title: 'Sis caixes, tres columnes',
          intro: "A `grid-template-columns` hi ha tres mides: són tres columnes de 90 píxels. Esborra'n una i mira com es recol·loquen les caixes. Després afegeix-ne una de nova.",
          html: HTML_SIS,
          css: `${CSS_BASE}

.graella {
  display: grid;
  grid-template-columns: 90px 90px 90px;
}

${CSS_CAIXA}`,
          boxes: true,
          expected: 'Sis caixes verdes en dues files de tres. Amb dues mides, queden tres files de dues; amb quatre, una fila de quatre i una de dues.',
          why: "Cada mida que escrius és una columna. Els fills van omplint les **cel·les** per ordre, d'esquerra a dreta, i quan una fila és plena en comença una altra. No has dit enlloc quantes files hi ha: surten soles.",
        }),
        concept(
          'Tu dius les columnes; les files surten soles',
          "A Flexbox, cada fill decideix la seva amplada. A Grid és a l'inrevés: **el pare dibuixa les columnes** i els fills s'hi adapten. Per això en una graella tot queda alineat: tots els fills d'una columna fan exactament la mateixa amplada."
        ),
        warning(
          'display: grid tot sol no es nota',
          "Una graella sense `grid-template-columns` té una sola columna, i els fills queden l'un sota l'altre, igual que abans. Si has escrit `display: grid` i no ha canviat res, és que falten les columnes."
        ),
      ],
    },

    {
      id: 'fr',
      title: "Columnes que es reparteixen l'espai: la unitat fr",
      blocks: [
        p("Les columnes en píxels fan sempre el mateix, tant si la pàgina és ampla com si és estreta. Gairebé sempre volem una altra cosa: que les columnes **es reparteixin l'amplada que hi hagi**. Per a això Grid té una unitat pròpia, `fr`, que vol dir «una fracció de l'espai que queda»."),
        custom('CssPlayground', {
          title: 'Prova-ho: grid-template-columns',
          intro: 'Sis caixes i cinc maneres de dibuixar les columnes. Mira quantes n\'hi ha i quant fa cada una.',
          items: 6,
          base: { display: 'grid' },
          controls: [
            { prop: 'grid-template-columns', options: ['1fr 1fr', '1fr 1fr 1fr', '1fr 2fr', '120px 1fr', '1fr 2fr 1fr'] },
            { prop: 'gap', min: 0, max: 32, step: 4, unit: 'px', initial: 8 },
          ],
          height: 150,
        }),
        table(
          ['Columnes', 'Què vol dir'],
          [
            ['`1fr 1fr 1fr`', 'Tres columnes iguals: cada una, un terç de l\'amplada'],
            ['`1fr 2fr`', 'Dues columnes: la segona fa el doble que la primera'],
            ['`120px 1fr`', 'La primera fa sempre 120 píxels; la segona es queda la resta'],
            ['`200px 200px`', 'Dues columnes de 200 píxels, sobri o falti espai'],
          ],
          'Mides fixes, fraccions i barreges'
        ),
        example({
          title: 'Tres columnes iguals',
          intro: "Les mateixes sis caixes, ara amb fraccions. Amplia l'exemple a pantalla completa: les columnes creixen amb la pàgina.",
          html: HTML_SIS,
          css: `${CSS_BASE}

.graella {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
}

${CSS_CAIXA}`,
          expected: 'Dues files de tres caixes que ocupen tota l\'amplada, separades 8 píxels.',
          why: "`1fr 1fr 1fr` reparteix l'amplada en tres parts iguals, i `gap` funciona igual que a Flexbox: és la separació entre cel·les, i s'escriu al pare. El navegador ja descompta el `gap` abans de repartir.",
        }),
        p("La barreja d'una mida fixa i una fracció és la més útil de totes: **una columna que no canvia i una altra que es queda el que sobra**."),
        example({
          title: 'Una columna fixa i una que s\'adapta',
          intro: 'La fitxa d\'una ruta: els noms de les dades fan sempre 110 píxels; els valors, la resta.',
          html: `<div class="fitxa">
  <div class="nom">Distància</div>
  <div class="valor">12 km</div>

  <div class="nom">Temps</div>
  <div class="valor">3 h 30 min, sense comptar les parades</div>

  <div class="nom">Dificultat</div>
  <div class="valor">Fàcil</div>
</div>`,
          css: `${CSS_BASE}

.fitxa {
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 8px;
  padding: 16px;
  background: #e8f3ee;
  border-radius: 8px;
}

.nom {
  font-weight: bold;
  color: #5b6b63;
}`,
          boxes: true,
          expected: 'Tres files. A cada una, el nom de la dada a l\'esquerra i el valor a la dreta, tots començant a la mateixa alçada i a la mateixa columna.',
          why: "Hi ha sis fills i dues columnes: van caient de dos en dos. Com que les columnes són del pare, tots els valors comencen exactament al mateix punt, encara que els noms siguin de llargades diferents.",
        }),
        concept(
          'fr és el flex: 1 de les columnes',
          "`1fr` fa per a una columna el que `flex: 1` feia per a un fill: es queda l'espai que sobra un cop reservades les mides fixes i els `gap`. Si hi ha diverses columnes amb `fr`, se'l reparteixen segons el número."
        ),
      ],
    },

    {
      id: 'repeat-i-gap',
      title: 'Menys escriure i més aire: repeat() i gap',
      blocks: [
        p("Quan totes les columnes són iguals, escriure `1fr 1fr 1fr 1fr` és pesat i fàcil d'equivocar. `repeat()` ho resumeix: el primer número diu quantes vegades, i després ve la mida. `repeat(4, 1fr)` són quatre columnes iguals."),
        custom('CssPlayground', {
          title: 'Prova-ho: repeat() i gap',
          intro: 'Vuit caixes. Canvia el nombre de columnes i la separació.',
          items: 8,
          base: { display: 'grid' },
          controls: [
            { prop: 'grid-template-columns', options: ['repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)'], initial: 'repeat(3, 1fr)' },
            { prop: 'gap', min: 0, max: 32, step: 4, unit: 'px', initial: 12 },
          ],
          height: 150,
        }),
        p("En una graella hi ha separació en dos sentits: entre columnes i entre files. Amb un sol valor, `gap` posa la mateixa a tot arreu. Amb dos, **el primer és entre files i el segon, entre columnes**."),
        example({
          title: 'La galeria de rutes',
          intro: 'Sis targetes, tres columnes. Entre files hi ha 24 píxels; entre columnes, 16.',
          html: galeria(6),
          css: `${CSS_BASE}

.galeria {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px 16px;
}

${CSS_RUTA}`,
          width: 760,
          boxes: true,
          expected: 'Dues files de tres rutes. Totes les fotos fan la mateixa amplada i queden alineades en columnes.',
          why: "A les targetes no els hem donat cap amplada: la decideix la graella. La imatge, amb `width: 100%`, omple la cel·la que li ha tocat. Si demà hi ha una setena ruta, obrirà una tercera fila sense tocar el CSS.",
        }),
        challenge({
          title: 'Dues columnes i més aire',
          statement: "Canvia la galeria perquè tingui **dues** columnes iguals en lloc de tres, amb 32 píxels entre files i 12 entre columnes.",
          html: galeria(6),
          css: `${CSS_BASE}

.galeria {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

${CSS_RUTA}`,
          hint: 'Has de tocar dues línies de `.galeria`. A `gap`, amb dos valors, el primer és la separació entre files.',
          solution: {
            css: `${CSS_BASE}

.galeria {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px 12px;
}

${CSS_RUTA}`,
          },
          explanation: "`repeat(2, 1fr)` dibuixa dues columnes iguals, i les sis rutes es reparteixen en tres files. A `gap: 32px 12px`, el primer valor separa les files i el segon, les columnes.",
          checks: [
            { label: 'La galeria té dues columnes', selector: '.ruta', columns: 2 },
            { label: 'Les sis rutes ocupen tres files', selector: '.ruta', rows: 3 },
            { label: 'Hi ha 32 píxels entre files i 12 entre columnes', selector: '.ruta', gap: { x: 12, y: 32 } },
          ],
        }),
      ],
    },

    {
      id: 'files-automatiques',
      title: 'Les files es creen soles',
      blocks: [
        p("Fins ara només hem parlat de columnes. Les files les crea el navegador a mesura que arriben fills, i cada fila fa **l'alçada del seu fill més alt**. Tots els fills de la fila s'estiren fins a aquesta alçada."),
        example({
          title: 'Textos desiguals, targetes iguals',
          intro: 'Cinc consells de llargades molt diferents, en dues columnes. Activa els quadrats i compara les alçades de cada fila.',
          html: `<div class="consells">
  <div class="consell"><strong>Aigua.</strong> Un litre i mig per persona, com a mínim.</div>
  <div class="consell"><strong>Calçat.</strong> Botes que ja hagis fet servir. Estrenar-ne el dia d'una ruta llarga és buscar-se una butllofa, i a mig camí ja no té remei.</div>
  <div class="consell"><strong>Previsió.</strong> Mira el temps la nit abans i també al matí: a muntanya canvia de pressa.</div>
  <div class="consell"><strong>Hora.</strong> Surt d'hora.</div>
  <div class="consell"><strong>Avís.</strong> Digues a algú quina ruta faràs i a quina hora penses tornar.</div>
</div>`,
          css: `${CSS_BASE}

.consells {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.consell {
  padding: 12px;
  line-height: 1.4;
  background: #e8f3ee;
  border-radius: 8px;
}`,
          boxes: true,
          expected: 'Tres files. A cada fila, les dues targetes fan la mateixa alçada, encara que una tingui molt més text. L\'última fila només té una targeta, a la primera columna.',
          why: "Cada fila fa l'alçada del seu fill més alt, i l'altre s'hi estira. La cinquena targeta obre una fila nova i es queda a la seva cel·la: no s'eixampla per omplir el forat, i per això la quadrícula no es desfà.",
        }),
        p("Si mai necessites files d'una alçada concreta, existeix `grid-template-rows`, que s'escriu igual que la de les columnes. Es fa servir poc: gairebé sempre va bé que cada fila faci el que necessita el seu contingut."),
        compare(
          {
            title: 'Una galeria amb Flexbox',
            tone: 'bad',
            lang: 'css',
            code: `.galeria {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.ruta {
  width: 230px;
}`,
            text: "Les targetes salten de línia, però l'amplada l'has hagut de calcular tu. Si la pàgina fa una mica més o una mica menys, sobra un tros a la dreta o en cap una menys.",
          },
          {
            title: 'Una galeria amb Grid',
            tone: 'good',
            lang: 'css',
            code: `.galeria {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}`,
            text: 'Tres columnes que es reparteixen l\'amplada que hi hagi. Les targetes no necessiten cap regla.',
          }
        ),
      ],
    },

    {
      id: 'span',
      title: 'Un element que ocupa més: grid-column: span 2',
      blocks: [
        p("Per defecte, cada fill ocupa una cel·la. Si en vols destacar un, li pots dir que n'ocupi més. Aquesta és l'única propietat de la unitat que s'escriu **al fill**: `grid-column: span 2` vol dir «ocupa dues columnes»."),
        example({
          title: 'Una ruta destacada',
          intro: 'La primera ruta porta també la classe `destacada`. Canvia el 2 per un 3 i mira què fa.',
          html: galeria(5, true),
          css: `${CSS_BASE}

.galeria {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.destacada {
  grid-column: span 2;
}

${CSS_RUTA}`,
          width: 760,
          boxes: true,
          expected: 'La primera ruta ocupa dues columnes i té la foto molt més gran. La segona queda al seu costat, a la tercera columna, i les altres tres, a la fila de sota.',
          why: "La destacada es queda dues cel·les de la primera fila, i a la resta de fills només els en queda una: la segona ruta l'ocupa i les altres baixen. Amb `span 3`, la destacada ompliria tota la fila.",
        }),
        concept(
          'La graella no es trenca',
          "Encara que un fill ocupi més cel·les, les columnes continuen sent les mateixes per a tothom. La ruta destacada fa exactament l'amplada de dues columnes més el `gap` que hi ha entre elles, i tot continua alineat. Per ocupar més d'una fila hi ha la propietat germana, `grid-row: span 2`."
        ),
      ],
    },

    {
      id: 'maquetar-la-pagina',
      title: 'Maquetar la pàgina: un panell al costat del contingut',
      blocks: [
        p("Grid no només serveix per a galeries. La mateixa idea, a una altra escala, maqueta la pàgina sencera. Com sempre, primer el dibuix."),
        custom('BoxSketch', {
          title: 'La pàgina de rutes, en quadrats',
          intro: 'Tres nivells: la pàgina, el cos i la galeria.',
          tree: {
            name: 'pàgina',
            tag: 'body',
            dir: 'column',
            children: [
              { name: 'capçalera', tag: 'header.capcalera' },
              {
                name: 'cos',
                tag: 'div.cos',
                dir: 'row',
                children: [
                  { name: 'filtres', tag: 'aside.filtres', basis: '26%' },
                  {
                    name: 'galeria',
                    tag: 'main.galeria',
                    dir: 'grid',
                    cols: 3,
                    children: [
                      { name: 'ruta', tag: 'article.ruta' },
                      { name: 'ruta', tag: 'article.ruta' },
                      { name: 'ruta', tag: 'article.ruta' },
                      { name: 'ruta', tag: 'article.ruta' },
                      { name: 'ruta', tag: 'article.ruta' },
                      { name: 'ruta', tag: 'article.ruta' },
                    ],
                  },
                ],
              },
            ],
          },
          steps: [
            "La pàgina té dues peces, l'una sota l'altra: la capçalera i el cos. Són blocs i s'apilen sols.",
            "El cos té dues peces **de costat**: un panell estret, que fa sempre el mateix, i la galeria, que es queda la resta. Són dues columnes: `grid-template-columns: 220px 1fr`.",
            "La galeria és una **graella** de tres columnes iguals: `repeat(3, 1fr)`. Les files surten soles.",
          ],
        }),
        example({
          title: 'La pàgina de rutes',
          intro: 'Hi ha dues graelles, una dins de l\'altra. Busca al CSS les regles `.cos` i `.galeria`.',
          html: paginaDeRutes(6, false),
          css: `${CSS_PAGINA}

${CSS_CAPCALERA}

/* El cos: un panell fix i la resta */
.cos {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 24px;
  padding: 24px;
}

.filtres {
  display: flex;
  flex-direction: column;
  gap: 8px;
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

/* La galeria: tres columnes iguals */
.galeria {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px 16px;
}

${CSS_RUTA}`,
          width: 900,
          boxes: true,
          expected: "La capçalera a dalt. A sota, el panell de filtres a l'esquerra i, al costat, la galeria amb dues files de tres rutes.",
          why: "`.cos` és una graella de dues columnes: 220 píxels per al panell i `1fr` per a la galeria. La galeria és filla de `.cos` i, alhora, una graella per a les seves targetes. Com a Flexbox, un mateix element pot ser fill i pare.",
        }),
        warning(
          'Les columnes només manen sobre els fills directes',
          "Igual que Flexbox, Grid col·loca els fills directes del contenidor i prou. Les targetes són filles de `.galeria`, no de `.cos`: per això cada graella necessita el seu propi `display: grid`."
        ),
      ],
    },

    {
      id: 'flex-o-grid',
      title: 'Flexbox o Grid?',
      blocks: [
        p("Tens dues eines per posar quadrats de costat, i és normal dubtar. La pregunta que ho resol és: **quantes direccions hi ha?**"),
        table(
          ['Què es compara', 'Flexbox', 'Grid'],
          [
            ['Direccions', 'Una: una fila o una columna', 'Dues alhora: files i columnes'],
            ['Qui decideix les mides', 'Cada fill, segons el seu contingut', 'El pare, que dibuixa les columnes'],
            ['Va bé per a', 'Capçaleres, menús, botons, una foto i un text', 'Galeries, fitxes de dades, la pàgina sencera'],
          ],
          'Quan convé cada un'
        ),
        list(
          "Si les peces són **de mides diferents** i les vols repartir en una línia (un logo, un cercador, un botó): Flexbox.",
          "Si vols **cel·les iguals i alineades** en files i columnes: Grid.",
          "Si dubtes, torna al dibuix. Una sola fila o una sola columna és Flexbox. Una quadrícula és Grid."
        ),
        p("No s'ha de triar un dels dos per a tota la pàgina. El més habitual és **combinar-los**: Grid per a la quadrícula i Flexbox per a l'interior de cada peça."),
        example({
          title: 'Una graella de targetes amb una fila a dins',
          intro: 'La galeria és Grid. El peu de cada targeta, amb el nom a una punta i l\'etiqueta a l\'altra, és Flexbox.',
          html: `<div class="galeria">
${RUTES.slice(0, 3)
  .map(
    (ruta, index) => `  <article class="ruta">
    <img src="imatges/ruta-${index + 1}.jpg" alt="${ruta.alt}">
    <div class="peu">
      <h3>${ruta.nom}</h3>
      <span class="etiqueta">${ruta.nivell}</span>
    </div>
  </article>`
  )
  .join('\n\n')}
</div>`,
          css: `${CSS_BASE}

/* Grid: la quadrícula */
.galeria {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.ruta {
  border: 1px solid #c9d6cf;
  border-radius: 8px;
}

.ruta img {
  display: block;
  width: 100%;
  border-radius: 8px 8px 0 0;
}

/* Flexbox: l'interior de cada targeta */
.peu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 12px;
}

.peu h3 {
  margin: 0;
  font-size: 16px;
}

.etiqueta {
  padding: 2px 8px;
  font-size: 13px;
  background: #e8f3ee;
  border-radius: 10px;
}`,
          width: 760,
          boxes: true,
          expected: 'Tres targetes iguals en fila. A cada una, la foto a dalt i, a sota, el nom de la ruta a l\'esquerra i la dificultat a la dreta.',
          why: "La galeria necessita columnes iguals i alineades: Grid. El peu és una sola fila amb dues peces de mides diferents, una a cada punta: Flexbox, amb `space-between`.",
        }),
      ],
    },

    {
      id: 'per-anar-mes-lluny',
      title: 'Per anar més lluny: una graella que s\'adapta sola',
      blocks: [
        p("Tres columnes queden bé en una pantalla ampla, però en una d'estreta les targetes es fan minúscules. Hi ha una manera de dir-li a la graella que **triï ella quantes columnes hi caben**. És una sola línia, i val la pena conèixer-la encara que al principi costi de llegir:"),
        example({
          title: 'Tantes columnes com hi càpiguen',
          intro: "Amplia l'exemple a pantalla completa i torna. El nombre de columnes canvia sol, sense tocar el CSS.",
          html: galeria(6),
          css: `${CSS_BASE}

.galeria {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 16px;
}

${CSS_RUTA}`,
          expected: 'Una galeria amb dues columnes si l\'espai és estret, i quatre, cinc o sis quan és ample. Les targetes sempre omplen tota l\'amplada.',
          why: "Es llegeix de dins cap a fora. `minmax(140px, 1fr)` vol dir «cada columna fa com a mínim 140 píxels i, si sobra espai, se'l reparteixen». I `auto-fill`, al lloc del número de `repeat()`, vol dir «tantes columnes com hi càpiguen».",
        }),
        concept(
          'No cal entendre-la del tot per fer-la servir',
          "Aquesta línia és una recepta: el que hi canviaràs és el número de píxels, que és l'amplada mínima que vols per a cada targeta. Per al projecte final n'hi ha prou amb `repeat(3, 1fr)`; aquesta és per quan vulguis que la galeria es vegi bé a qualsevol pantalla."
        ),
        project(
          "La web de rutes ja té la seva pàgina principal maquetada: un panell de filtres al costat i una galeria de tres columnes. Són dues graelles, una dins de l'altra, i no hi ha ni una sola amplada escrita a les targetes.",
          {
            title: 'El panell i la galeria',
            lang: 'css',
            code: `/* El cos: un panell fix i la resta */
.cos {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 24px;
  padding: 24px;
}

/* La galeria: tres columnes iguals */
.galeria {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px 16px;
}

.ruta img {
  display: block;
  width: 100%;
}`,
          }
        ),
      ],
    },
  ],

  commonErrors: [
    {
      title: 'Escriure display: grid i oblidar les columnes',
      bad: `.galeria {
  display: grid;
  gap: 16px;
}`,
      badLang: 'css',
      symptom: 'Les targetes continuen l\'una sota l\'altra. L\'única cosa que canvia és que ara estan separades.',
      why: "Una graella sense `grid-template-columns` té una sola columna. `display: grid` activa la graella, però no la dibuixa.",
      fix: `.galeria {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}`,
      fixLang: 'css',
    },
    {
      title: 'Escriure les columnes als fills',
      bad: `.ruta {
  grid-template-columns: repeat(3, 1fr);
}`,
      badLang: 'css',
      symptom: 'No canvia res: les targetes queden apilades.',
      why: "Les columnes les dibuixa el pare. Escrita a cada targeta, la propietat parla dels fills de la targeta, i a més la targeta no és cap graella.",
      fix: `.galeria {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}`,
      fixLang: 'css',
    },
    {
      title: 'Escriure «1 fr» amb un espai',
      bad: `.galeria {
  display: grid;
  grid-template-columns: 1 fr 1 fr 1 fr;
}`,
      badLang: 'css',
      symptom: 'La graella no es forma: tot queda en una sola columna.',
      why: "El número i la unitat van enganxats, com a `16px`. Amb l'espai, el navegador no entén la línia i la descarta sencera, sense avisar. Si mires l'element amb l'inspector, la veuràs ratllada.",
      fix: `.galeria {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}`,
      fixLang: 'css',
    },
    {
      title: 'Fer les columnes amb percentatges i afegir-hi gap',
      bad: `.galeria {
  display: grid;
  grid-template-columns: 50% 50%;
  gap: 16px;
}`,
      badLang: 'css',
      symptom: 'La galeria surt per la dreta de la pàgina i apareix una barra de desplaçament horitzontal.',
      why: "Les dues columnes ja sumen el 100 % de l'amplada, i el `gap` s'hi afegeix: en total, 16 píxels més del que hi cap. Amb `fr`, el navegador descompta primer el `gap` i reparteix el que queda.",
      fix: `.galeria {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}`,
      fixLang: 'css',
    },
    {
      title: 'Voler que un fill ocupi dues columnes donant-li una amplada',
      bad: `.destacada {
  width: 200%;
}`,
      badLang: 'css',
      symptom: 'La targeta destacada es fa el doble d\'ampla, però surt de la seva cel·la i tapa la targeta del costat.',
      why: "Amb `width` la targeta creix, però continua ocupant una sola cel·la: la graella no sap que n'hi cal una altra i hi posa el fill següent.",
      fix: `.destacada {
  grid-column: span 2;
}`,
      fixLang: 'css',
    },
  ],

  exercises: [
    {
      id: 'tres-columnes',
      title: 'Sis serveis, tres columnes',
      statement: "Els sis serveis d'aquesta ruta estan apilats. Col·loca'ls en una graella de tres columnes iguals, amb 12 píxels de separació en tots dos sentits.",
      expected: 'Dues files de tres caixes de la mateixa amplada, que ocupen tota la pàgina.',
      html: `<div class="serveis">
  <div class="servei">Aparcament</div>
  <div class="servei">Font</div>
  <div class="servei">Refugi</div>
  <div class="servei">Mirador</div>
  <div class="servei">Pícnic</div>
  <div class="servei">Bus</div>
</div>`,
      css: `${CSS_BASE}

.servei {
  padding: 12px 4px;
  font-size: 14px;
  text-align: center;
  background: #e8f3ee;
  border-radius: 8px;
}

.serveis {
  /* Escriu aquí */
}`,
      hint: 'Són tres propietats, i totes van al pare: la que activa la graella, la que dibuixa les columnes i la que les separa.',
      solution: {
        css: `${CSS_BASE}

.servei {
  padding: 12px 4px;
  font-size: 14px;
  text-align: center;
  background: #e8f3ee;
  border-radius: 8px;
}

.serveis {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}`,
      },
      explanation: "`repeat(3, 1fr)` (o `1fr 1fr 1fr`, que és el mateix) dibuixa tres columnes iguals. Els sis fills les omplen per ordre i formen dues files. Als serveis no els hem hagut de tocar res.",
      checks: [
        { label: 'Hi ha tres columnes', selector: '.servei', columns: 3 },
        { label: 'Els sis serveis ocupen dues files', selector: '.servei', rows: 2 },
        { label: 'Totes les columnes fan la mateixa amplada', selector: '.servei', sameSize: 'width' },
        { label: 'Hi ha 12 píxels entre columnes i entre files', selector: '.servei', gap: 12 },
      ],
    },
    {
      id: 'panell-i-contingut',
      title: 'Un panell i el contingut',
      statement: "La pàgina té un panell de filtres i el contingut, l'un sota l'altre. Posa'ls de costat: el panell ha de fer sempre 200 píxels d'ample i el contingut s'ha de quedar la resta. Entre tots dos hi ha d'haver 24 píxels.",
      expected: 'El panell verd clar a l\'esquerra i, al costat, el títol i el text de la pàgina fins al marge dret.',
      width: 760,
      html: `<div class="pagina">
  <aside class="filtres">
    <h2>Filtres</h2>
    <p>Dificultat, durada i comarca.</p>
  </aside>

  <main class="contingut">
    <h1>Totes les rutes</h1>
    <p>Sis rutes per descobrir el país a peu, de la costa a l'alta muntanya.</p>
  </main>
</div>`,
      css: `${CSS_PAGINA}

.pagina {
  padding: 24px;
}

.filtres {
  padding: 16px;
  background: #e8f3ee;
  border-radius: 8px;
}

.filtres h2 {
  margin: 0 0 8px;
  font-size: 18px;
}

.filtres p {
  margin: 0;
}

.contingut h1 {
  margin: 0 0 8px;
}`,
      hint: 'La graella és `.pagina` i té dues columnes: una amb una mida fixa i una altra amb una fracció.',
      solution: {
        css: `${CSS_PAGINA}

.pagina {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 24px;
  padding: 24px;
}

.filtres {
  padding: 16px;
  background: #e8f3ee;
  border-radius: 8px;
}

.filtres h2 {
  margin: 0 0 8px;
  font-size: 18px;
}

.filtres p {
  margin: 0;
}

.contingut h1 {
  margin: 0 0 8px;
}`,
      },
      explanation: "`200px 1fr` són dues columnes: la primera no canvia mai i la segona es queda tot el que sobra. Fixa't que el panell fa 200 píxels comptant-hi el seu `padding`: en una graella, el fill omple la cel·la, i la mida de la cel·la la decideix el pare.",
      checks: [
        { label: 'El panell i el contingut estan de costat', selector: '.pagina > *', arrange: 'row' },
        { label: "El panell fa 200 píxels d'ample", selector: '.filtres', size: { width: 200 } },
        { label: 'Hi ha 24 píxels entre el panell i el contingut', selector: '.pagina > *', gap: { x: 24 } },
        { label: 'El contingut arriba fins al marge dret', selector: '.contingut', offset: { right: 24 } },
      ],
    },
    {
      id: 'galeria-de-rutes',
      title: 'La galeria de rutes',
      statement: "Les sis rutes surten l'una sota l'altra, amb unes fotos enormes. Converteix-les en una galeria de tres columnes iguals, amb 24 píxels entre files i 16 entre columnes.",
      expected: 'Dues files de tres rutes, amb les fotos alineades i de la mateixa mida.',
      width: 760,
      html: galeria(6),
      css: `${CSS_BASE}

${CSS_RUTA}`,
      hint: [
        'Tot el que has d\'escriure va en una regla nova per a `.galeria`. A les targetes no cal tocar-hi res.',
        'A `gap`, quan hi ha dos valors, el primer separa les files i el segon, les columnes.',
      ],
      solution: {
        css: `${CSS_BASE}

.galeria {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px 16px;
}

${CSS_RUTA}`,
      },
      explanation: "Les fotos eren enormes perquè tenen `width: 100%` i el seu contenidor ocupava tota la pàgina. Dins d'una graella, el 100 % és l'amplada de la cel·la: la foto es fa petita sola.",
      checks: [
        { label: 'Hi ha tres columnes', selector: '.ruta', columns: 3 },
        { label: 'Les sis rutes ocupen dues files', selector: '.ruta', rows: 2 },
        { label: 'Totes les rutes fan la mateixa amplada', selector: '.ruta', sameSize: 'width' },
        { label: 'Hi ha 24 píxels entre files i 16 entre columnes', selector: '.ruta', gap: { x: 16, y: 24 } },
      ],
    },
    {
      id: 'ruta-destacada',
      title: 'La ruta de la setmana',
      statement: "La galeria ja és una graella de tres columnes. Fes que la primera ruta, que porta la classe `destacada`, ocupi **dues** columnes. La resta s'han de recol·locar soles.",
      expected: 'La primera ruta, amb la foto gran, ocupa dues columnes. La segona queda al seu costat i les altres tres, a la fila de sota.',
      width: 760,
      html: galeria(5, true),
      css: `${CSS_BASE}

.galeria {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

${CSS_RUTA}`,
      hint: 'Aquesta vegada la propietat no va al pare: és la ruta destacada qui diu quantes columnes vol. Una sola línia en una regla nova per a `.destacada`.',
      solution: {
        css: `${CSS_BASE}

.galeria {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.destacada {
  grid-column: span 2;
}

${CSS_RUTA}`,
      },
      explanation: "`grid-column: span 2` fa que la destacada es quedi dues cel·les de la primera fila. Només en queda una de lliure, per a la segona ruta, i les altres tres passen a la fila següent. No has hagut de moure cap altra targeta.",
      checks: [
        { label: 'La ruta destacada comença a la primera columna', selector: '.destacada', offset: { left: 0 } },
        { label: 'La segona ruta queda al seu costat, a l\'última columna', selector: '.ruta:nth-child(2)', sameRow: '.destacada', offset: { right: 0 } },
        { label: 'La tercera ruta baixa a la fila de sota', selector: '.ruta:nth-child(3)', below: '.destacada', offset: { left: 0 } },
        { label: 'La galeria continua tenint tres columnes', selector: '.ruta:not(.destacada)', columns: 3 },
      ],
    },
  ],

  finalExercise: {
    id: 'pagina-de-rutes',
    title: 'La pàgina de rutes, sencera',
    statement: [
      "Maqueta la pàgina principal de la web de rutes. La capçalera ja està feta. Abans d'escriure, obre l'«Objectiu» amb els quadrats activats i compta les graelles: n'hi ha una dins d'una altra.",
      "El cos té dues columnes: el panell de filtres, de 200 píxels, i la galeria, que es queda la resta, a 24 píxels. Dins del panell, el títol i els enllaços van en columna, separats 8 píxels. La galeria té tres columnes iguals i 16 píxels de separació en tots dos sentits. I la primera ruta, la destacada, ocupa dues columnes.",
    ],
    expected: 'A l\'esquerra, el panell amb els quatre filtres en columna. A la dreta, la galeria: a la primera fila, la ruta destacada (el doble d\'ampla) i una altra; a la segona, tres rutes.',
    width: 1000,
    boxes: true,
    html: paginaDeRutes(5, true),
    css: `${CSS_PAGINA}

${CSS_CAPCALERA}

.cos {
  padding: 24px;
}

${CSS_FILTRES_ASPECTE}

${CSS_RUTA}`,
    hint: [
      'Necessites quatre coses: una graella a `.cos`, una columna a `.filtres`, una graella a `.galeria` i una línia a `.destacada`.',
      'Per a `.cos`, una columna fixa i una fracció. Per a `.filtres` pots fer servir Flexbox en columna, com a la unitat 7, amb el seu `gap`.',
    ],
    solution: {
      css: `${CSS_PAGINA}

${CSS_CAPCALERA}

.cos {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 24px;
  padding: 24px;
}

.filtres {
  display: flex;
  flex-direction: column;
  gap: 8px;
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

.galeria {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.destacada {
  grid-column: span 2;
}

${CSS_RUTA}`,
    },
    explanation: [
      "Hi ha dues graelles. La de `.cos` reparteix la pàgina en una columna fixa i una de flexible. La de `.galeria`, que és filla de la primera, dibuixa les tres columnes de les rutes. Cada una mana només sobre els seus fills directes.",
      "El panell de filtres és una sola columna de peces petites: aquí Flexbox és suficient. I la capçalera, que ja venia feta, també és Flexbox. En una pàgina real les dues eines conviuen: Grid per a les quadrícules i Flexbox per a les files i columnes soltes.",
    ],
    checks: [
      { label: "El panell de filtres fa 200 píxels i queda a l'esquerra de la galeria", selector: '.filtres', size: { width: 200 }, leftOf: '.galeria', sameRow: '.galeria' },
      { label: 'Hi ha 24 píxels entre el panell i la galeria', selector: '.cos > *', gap: { x: 24 } },
      { label: 'La galeria arriba fins al marge dret', selector: '.galeria', offset: { right: 24 } },
      { label: 'El títol i els filtres estan en columna, separats 8 píxels', selector: '.filtres > *', arrange: 'column', gap: 8 },
      { label: 'La galeria té tres columnes', selector: '.ruta:not(.destacada)', columns: 3 },
      { label: 'Les rutes estan separades 16 píxels', selector: '.ruta', gap: 16 },
      { label: 'La ruta destacada ocupa dues columnes', selector: '.ruta:nth-child(2)', sameRow: '.destacada', offset: { right: 0 } },
    ],
  },

  summary: [
    "`display: grid` s'escriu al **pare** i el converteix en una graella. Sense columnes, no es nota.",
    "`grid-template-columns` dibuixa les columnes: una mida per columna. Les files es creen soles a mesura que arriben fills.",
    "`fr` és una fracció de l'espai lliure. `1fr 1fr 1fr` són tres columnes iguals; `220px 1fr`, una de fixa i una altra amb la resta.",
    "`repeat(3, 1fr)` estalvia repetir. `gap`, amb dos valors, separa primer les files i després les columnes.",
    "Tots els fills d'una columna fan la mateixa amplada, i tots els d'una fila, la mateixa alçada: per això tot queda alineat.",
    "`grid-column: span 2` s'escriu al **fill** i fa que ocupi dues columnes.",
    "Una direcció, Flexbox. Files i columnes alhora, Grid. I es combinen: una graella de targetes que per dins són flex.",
  ],

  quiz: [
    {
      question: 'Vols que sis targetes quedin en tres columnes. A quin element escrius `display: grid` i `grid-template-columns`?',
      options: [
        { text: 'Al contenidor de les targetes', correct: true },
        { text: 'A cada targeta', why: 'Les columnes les dibuixa el pare. Escrites a la targeta, parlarien dels fills de la targeta.' },
        { text: 'Al `<body>`, perquè afecti tota la pàgina', why: 'Una graella només col·loca els seus fills directes, i les targetes no ho són del `<body>`.' },
        { text: '`display: grid` al contenidor i les columnes a cada targeta', why: 'Totes dues propietats són del contenidor: una activa la graella i l\'altra la dibuixa.' },
      ],
      explanation: 'Com a Flexbox, s\'escriu al pare. El contenidor dibuixa les columnes i les targetes van omplint les cel·les.',
    },
    {
      question: 'Un contenidor fa 600 píxels d\'ample i té `grid-template-columns: 1fr 2fr`, sense `gap`. Quant fa cada columna?',
      options: [
        { text: '200 i 400 píxels', correct: true },
        { text: '300 i 300 píxels', why: 'Això seria `1fr 1fr`. Amb `1fr 2fr`, la segona fa el doble que la primera.' },
        { text: '100 i 200 píxels', why: '`fr` no són píxels: són parts de l\'espai disponible, i es reparteix tot.' },
        { text: '1 i 2 píxels', why: '`fr` vol dir «fracció»: l\'amplada es divideix en tres parts i se\'n donen una i dues.' },
      ],
      explanation: 'L\'amplada es divideix en tres parts de 200 píxels (1 + 2): la primera columna se\'n queda una i la segona, dues.',
    },
    {
      question: 'Una graella té `grid-template-columns: repeat(3, 1fr)` i set fills. Quantes files es formen?',
      options: [
        { text: 'Tres: dues de plenes i una amb un sol fill', correct: true },
        { text: 'Dues, i el setè fill no es veu', why: 'Cap fill desapareix: quan una fila és plena, el navegador en crea una altra.' },
        { text: 'Dues, i la segona té quatre fills', why: 'Cada fila té tantes cel·les com columnes: tres. El setè fill no hi cap.' },
        { text: 'Set, una per a cada fill', why: 'Això passaria amb una sola columna. Aquí n\'hi ha tres per fila.' },
      ],
      explanation: 'Les files es creen soles. Amb tres columnes, els set fills n\'omplen dues i el setè n\'obre una tercera, on es queda a la primera cel·la.',
    },
    {
      question: 'Què vol dir `gap: 24px 16px` en una graella?',
      options: [
        { text: '24 píxels entre files i 16 entre columnes', correct: true },
        { text: '24 píxels entre columnes i 16 entre files', why: 'És a l\'inrevés: el primer valor és el de les files.' },
        { text: '24 píxels a dalt i a baix de la graella, i 16 als costats', why: '`gap` només separa les cel·les entre elles. L\'espai amb les vores és el `padding`.' },
        { text: 'És un error: `gap` només admet un valor', why: 'Admet un valor (igual en els dos sentits) o dos (files i columnes).' },
      ],
      explanation: 'Amb dos valors, el primer separa les files i el segon, les columnes. Amb un de sol, és el mateix per a totes dues.',
    },
    {
      question: 'En una graella de tres columnes, vols que la primera targeta ocupi dues columnes. Què escrius?',
      options: [
        { text: '`grid-column: span 2` a aquella targeta', correct: true },
        { text: '`grid-column: span 2` al contenidor', why: 'És una propietat del fill: és la targeta qui diu quantes columnes vol ocupar.' },
        { text: '`width: 200%` a aquella targeta', why: 'La targeta es faria més ampla, però continuaria ocupant una cel·la i taparia la del costat.' },
        { text: '`grid-template-columns: 2fr 1fr` al contenidor', why: 'Això canviaria les columnes de tota la graella, no només la primera targeta.' },
      ],
      explanation: '`grid-column: span 2` és de les poques propietats de Grid que s\'escriuen al fill. La graella continua igual, i la resta de targetes es recol·loquen.',
    },
    {
      question: 'Quin d\'aquests casos demana Grid més que no pas Flexbox?',
      options: [
        { text: 'Una galeria de fotos en files i columnes, totes de la mateixa mida', correct: true },
        { text: 'Una capçalera amb el logo a l\'esquerra i el menú a la dreta', why: 'És una sola fila amb dues peces de mides diferents: és un cas de Flexbox, amb `space-between`.' },
        { text: 'Un avatar amb un text al costat', why: 'És una fila de dues peces, una de fixa i una que es queda la resta: Flexbox.' },
        { text: 'Una fila de filtres que salta de línia quan no hi caben', why: 'Són peces de mides diferents que no cal alinear en columnes: Flexbox amb `flex-wrap`.' },
      ],
      explanation: 'Quan hi ha files i columnes alhora i tot ha de quedar alineat, Grid. Quan és una sola fila o columna de peces de mides diferents, Flexbox.',
    },
  ],
};
