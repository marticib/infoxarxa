import { p, list, steps, html, example, concept, warning, challenge, project, table, compare, custom } from '../../blocks.js';

const CSS_BASE = `body {
  font-family: Arial, sans-serif;
}`;

// Una targeta de ruta amb la foto, el quadrat de text i l'enllaç.
const CSS_TARGETA = `${CSS_BASE}

.ruta {
  padding: 12px;
  border: 2px solid #c9d6cf;
  border-radius: 8px;
}

.foto {
  width: 160px;
  border-radius: 6px;
}

.text {
  margin: 8px 0;
  padding: 8px;
  background: #e8f3ee;
}

.text h2,
.dades {
  margin: 0;
}`;

// La pàgina amb el quadrat «cos», que agrupa els filtres i les rutes.
const CSS_COS = `${CSS_BASE}

.capcalera,
.peu {
  padding: 12px;
  color: #ffffff;
  background: #1f6f54;
}

.cos {
  padding: 12px;
  background: #e8f3ee;
}

.filtres,
.rutes {
  margin-bottom: 8px;
  padding: 8px;
  background: #ffffff;
  border: 2px solid #c9d6cf;
}`;

// Tres targetes iguals: un sol nom, una sola regla.
const CSS_RUTES = `${CSS_BASE}

.ruta {
  margin-bottom: 12px;
  padding: 12px;
  border: 2px solid #c9d6cf;
  border-radius: 8px;
}

.ruta h2 {
  margin: 0 0 4px;
  color: #1f6f54;
}

.dades {
  margin: 0;
  color: #5b6b63;
}`;

// La pàgina d'inici sencera, amb un estil per a cada quadrat.
const CSS_PAGINA = `${CSS_BASE}

.capcalera,
.peu {
  padding: 12px;
  color: #ffffff;
  background: #1f6f54;
}

.capcalera a {
  color: #ffffff;
}

.menu {
  margin-top: 8px;
  padding: 8px;
  background: #23312b;
}

.rutes {
  padding: 12px;
  background: #e8f3ee;
}

.ruta {
  margin-bottom: 12px;
  padding: 12px;
  background: #ffffff;
  border: 2px solid #c9d6cf;
  border-radius: 8px;
}

.foto {
  width: 160px;
  border-radius: 6px;
}

.text {
  margin-top: 8px;
  padding: 8px;
  border: 2px dashed #c9d6cf;
}

.text h2,
.dades,
.peu p {
  margin: 0;
}`;

export const glossary = [
  {
    term: 'Contenidor',
    definition:
      'Element que no aporta contingut propi: serveix per agrupar altres elements i tractar-los com un de sol. És cada un dels quadrats del dibuix d\'una pàgina.',
  },
  {
    term: 'div',
    definition:
      'El contenidor genèric d\'HTML. `<div>` no té cap significat ni cap estil: és una caixa de bloc per agrupar el que va junt.',
  },
  {
    term: 'Etiqueta semàntica',
    definition:
      'Etiqueta que, a més d\'agrupar, diu què és el que conté: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>` i `<footer>`. Per maquetar es comporten com un `<div>`.',
  },
  {
    term: 'Pare i fill',
    definition:
      'Un element és el pare dels que conté directament, i aquests són els seus fills. El CSS de maquetació s\'escriu gairebé sempre al pare.',
  },
  {
    term: 'Germans',
    definition: 'Els elements que tenen el mateix pare. Un contenidor col·loca els seus fills, que són germans entre ells.',
  },
  {
    term: 'Embolcall',
    definition:
      'Contenidor que no es veu al disseny i que només existeix per agrupar: per exemple, el quadrat que conté dues coses que van de costat dins d\'una pàgina que és una columna.',
  },
  {
    term: 'span',
    definition:
      'El contenidor genèric en línia. `<span>` marca un tros de text dins d\'una línia per poder-li donar estil, sense trencar la línia.',
  },
];

export default {
  id: 'contenidors',
  number: 5,
  title: 'Pensar en quadrats: els contenidors',
  shortTitle: 'Pensar en quadrats',
  description:
    "Abans d'escriure, es dibuixa: tota pàgina és un conjunt de quadrats ficats dins de quadrats. Aprendràs a veure'ls, a posar-los nom i a convertir-los en contenidors d'HTML.",

  problem: {
    title: 'Sé fer caixes, però davant d\'una pàgina sencera no sé per on començar',
    text: [
      "A la unitat anterior vam veure que cada element és una caixa, amb el seu farciment, la seva vora i el seu marge. Ja sabem donar forma a una targeta o a un botó. Però la web de rutes ha de tenir una capçalera amb el logo i el menú, una llista de rutes amb foto i dades, i un peu. Quan mires el disseny sencer, què escrius primer?",
      "La resposta de qui s'hi dedica és sempre la mateixa: **encara no escrius res. Dibuixes.** Agafes el disseny i hi marques quadrats, un per a cada part de la pàgina. Després obres cada quadrat i hi marques els quadrats de dins. Quan acabes tens un mapa de la pàgina, i passar-lo a HTML és gairebé copiar-lo.",
      "Aquests quadrats tenen nom a HTML: són els **contenidors**. Un contenidor no mostra res per si mateix; serveix per agrupar el que va junt. En aquesta unitat aprendràs a veure'ls, a dibuixar-los i a escriure'ls. I a partir de la següent, tot el CSS de maquetació consistirà en una sola cosa: dir a cada quadrat com ha de col·locar els quadrats que té a dins.",
    ],
  },

  goals: [
    'Explicar què és un contenidor i per a què serveix un `<div>`.',
    'Triar el contenidor semàntic adequat: `header`, `nav`, `main`, `section`, `article`, `aside` o `footer`.',
    'Descompondre un disseny en quadrats, de fora cap a dins, i dir de cada un si és una fila o una columna.',
    'Posar nom a cada quadrat amb una classe.',
    "Escriure l'HTML d'un dibuix de quadrats, amb el niuament correcte.",
    'Decidir quan cal un quadrat de més per agrupar i quan en sobra un.',
  ],

  projectPiece:
    "La pàgina d'inici queda dibuixada en quadrats i escrita amb contenidors: una capçalera amb el logo i el menú, un bloc principal amb una targeta per a cada ruta i un peu.",

  finalProject:
    'Abans d\'escriure la teva pàgina tipus YouTube la dibuixaràs en quadrats: la capçalera, el menú lateral, la graella i, dins de cada targeta, la miniatura i el text.',

  sections: [
    {
      id: 'el-div',
      title: 'Un quadrat per agrupar: el div',
      blocks: [
        p("Fins ara, cada etiqueta que has escrit volia dir alguna cosa: un títol, un paràgraf, un enllaç, una imatge. L'etiqueta `<div>` és diferent: **no vol dir res**. És una caixa buida i genèrica, i serveix per a una sola cosa: ficar-hi altres elements a dins i poder-los tractar com un de sol."),
        example({
          title: 'Tres elements solts i els mateixos tres, agrupats',
          intro: 'A dalt hi ha un títol, un paràgraf i un enllaç sense res que els uneixi. A baix, tres elements iguals són dins d\'un `<div class="ruta">`. El CSS només parla de `.ruta`.',
          html: `<h2>Camí de Ronda</h2>
<p>12 km · 3 h 30 min · Fàcil</p>
<a href="ruta.html">Veure la ruta</a>

<div class="ruta">
  <h2>Vall de Núria</h2>
  <p>9 km · 3 h · Mitjana</p>
  <a href="ruta.html">Veure la ruta</a>
</div>`,
          css: `${CSS_BASE}

.ruta {
  margin-top: 24px;
  padding: 16px;
  background: #e8f3ee;
  border: 2px solid #1f6f54;
  border-radius: 8px;
}`,
          focus: 'html',
          boxes: true,
          expected: 'La primera ruta són tres línies soltes. La segona és dins d\'una caixa verd clar amb vora: el fons, la vora i el farciment són del `<div>`, i els tres elements hi viuen a dins.',
          why: "Un fons o una vora s'han de posar a alguna caixa. A la primera ruta no n'hi ha cap que contingui les tres coses alhora; a la segona, sí. El `<div>` no ha canviat ni el títol ni el paràgraf: només els ha donat un quadrat comú.",
        }),
        p("D'un `<div>` com aquest en diem **contenidor**: un element que no aporta contingut propi, sinó que en conté d'altres. I és aquí on la idea de la unitat anterior, que cada element és una caixa, es fa gran. Si les caixes es poden ficar dins d'altres caixes, **una pàgina sencera no és res més que quadrats dins de quadrats**."),
        concept(
          'Un contenidor és un quadrat del dibuix',
          "Cada vegada que en un disseny puguis encerclar unes quantes coses i dir «això va junt», has trobat un contenidor. A l'HTML serà una etiqueta que s'obre abans de la primera cosa i es tanca després de l'última."
        ),
        p('Per parlar dels quadrats fan falta tres paraules, que farem servir durant tot el dossier:'),
        table(
          ['Paraula', 'Què vol dir', "A l'exemple"],
          [
            ['**Pare**', "L'element que en conté un altre directament", 'El `<div>` és el pare del títol, del paràgraf i de l\'enllaç'],
            ['**Fill**', "Un element que és directament dins d'un altre", "L'`<h2>` és fill del `<div>`"],
            ['**Germans**', 'Els elements que tenen el mateix pare', "L'`<h2>`, el `<p>` i l'`<a>` són germans"],
          ],
          'El vocabulari dels quadrats'
        ),
        warning(
          'Un div, per si sol, no es veu',
          "Un `<div>` sense estils no canvia res del que hi ha a la pantalla: ni fons, ni vora, ni espai. Per això costa saber si l'has escrit bé. El botó **«Quadrats»** de la previsualització dibuixa el contorn de totes les caixes, també de les que no tenen cap estil, i hi escriu el nom dels contenidors. En aquesta unitat, tingues-lo sempre activat."
        ),
      ],
    },

    {
      id: 'contenidors-amb-nom',
      title: 'Contenidors amb nom: header, nav, main, footer…',
      blocks: [
        p("Una pàgina feta tota amb `<div>` funciona. Però HTML té uns quants contenidors que, a més d'agrupar, **diuen què són**. Pel que fa a la maquetació es comporten exactament igual que un `<div>`: són caixes buides, sense cap estil. El que canvia és el significat."),
        table(
          ['Etiqueta', 'Què conté', 'A la web de rutes'],
          [
            ['`<header>`', "La capçalera: el que hi ha a dalt de la pàgina o d'una part", 'El logo i el menú'],
            ['`<nav>`', 'Un grup d\'enllaços per moure\'s pel lloc web', 'El menú: Rutes, Mapa, Consells'],
            ['`<main>`', 'El contingut principal de la pàgina. Només n\'hi ha un.', 'La llista de rutes'],
            ['`<section>`', 'Una part de la pàgina amb un tema i un títol propis', '«Abans de sortir», «A la motxilla»'],
            ['`<article>`', 'Una peça que s\'entendria tota sola, fora de la pàgina', 'La targeta de cada ruta'],
            ['`<aside>`', 'Contingut que acompanya el principal', 'Els filtres, les rutes relacionades'],
            ['`<footer>`', "El peu: el que hi ha a baix de la pàgina o d'una part", 'El copyright i el contacte'],
          ],
          'Els contenidors semàntics'
        ),
        example({
          title: 'Cada quadrat, pel seu nom',
          intro: "Activa i desactiva els quadrats i llegeix-ne els noms. Després canvia el `<header>` per un `<div>` (a l'obertura i al tancament): a la pàgina no es mourà res.",
          html: `<header class="capcalera">
  <a class="logo" href="index.html">▲ Camins</a>

  <nav class="menu">
    <a href="index.html">Rutes</a>
    <a href="mapa.html">Mapa</a>
    <a href="consells.html">Consells</a>
  </nav>
</header>

<main class="rutes">
  <h1>Rutes de muntanya</h1>
  <p>Tria una ruta i calça't les botes.</p>
</main>

<footer class="peu">
  <p>© 2025 Camins</p>
</footer>`,
          css: `${CSS_BASE}

.capcalera,
.rutes,
.peu {
  margin-bottom: 12px;
  padding: 12px;
  border: 2px solid #c9d6cf;
  border-radius: 8px;
}

.menu {
  margin-top: 8px;
  padding: 8px;
  background: #e8f3ee;
}`,
          focus: 'html',
          boxes: true,
          expected: 'Tres caixes amb vora, apilades: la capçalera, les rutes i el peu. Dins de la capçalera, una caixa verd clar amb els tres enllaços del menú.',
          why: "`<header>`, `<nav>`, `<main>` i `<footer>` són contenidors com el `<div>`: no porten cap estil propi i s'apilen igual. Tot el que es veu ho ha posat el CSS, a través de les classes.",
        }),
        concept(
          'Iguals per maquetar, diferents per entendre',
          "A la pantalla, un `<header>` i un `<div>` són idèntics. La diferència la noten els qui no miren la pantalla: un lector de pantalla pot saltar directament al `<main>` o al `<nav>`, un cercador sap quina part és el contingut i, sobretot, **tu mateix** quan tornis a llegir el codi d'aquí a un mes. `</footer>` diu què es tanca; `</div>`, no."
        ),
        compare(
          {
            title: 'Tot amb div',
            tone: 'bad',
            lang: 'html',
            code: `<div class="capcalera">…</div>
<div class="rutes">…</div>
<div class="peu">…</div>`,
            text: 'Funciona i es veu igual, però tots els tancaments són `</div>` i cap diu què tanca.',
          },
          {
            title: 'Amb contenidors semàntics',
            tone: 'good',
            lang: 'html',
            code: `<header class="capcalera">…</header>
<main class="rutes">…</main>
<footer class="peu">…</footer>`,
            text: 'El mateix dibuix, i el codi es llegeix com un índex de la pàgina.',
          }
        ),
        p("La norma pràctica és senzilla: si hi ha una etiqueta que descriu el que és el quadrat, fes-la servir. Si el quadrat només existeix per agrupar i no és cap d'aquestes coses, és un `<div>`. I en tots dos casos, posa-li una **classe**: és el nom amb què el trobarà el CSS."),
        warning(
          'header no és head',
          "`<head>` és la part del document que no es veu: el títol de la pestanya, l'enllaç al full d'estils. `<header>` és un contenidor que va dins del `<body>`: la capçalera que sí que es veu. S'assemblen de nom i no tenen res a veure."
        ),
      ],
    },

    {
      id: 'el-metode',
      title: 'El mètode: dibuixar abans d\'escriure',
      blocks: [
        p("Ara ve la part més important de la unitat, i potser de tot el dossier. Davant d'un disseny, sigui una captura, un esbós o una pàgina que vols imitar, no comencis per l'HTML. Agafa paper i llapis i segueix sempre els mateixos cinc passos:"),
        steps(
          '**Dibuixa els quadrats grans.** Mira el disseny de lluny, mig aclucant els ulls: quines parts s\'hi distingeixen? Encercla-les.',
          "**Fila o columna?** Per a cada quadrat, mira com estan col·locats els quadrats que té a dins: de costat (és una fila) o l'un sota l'altre (és una columna). Apunta-ho al dibuix.",
          '**Obre cada quadrat i repeteix.** Dins de cada part, torna a buscar quadrats, fins que només quedin textos, imatges i botons.',
          '**Posa nom a cada quadrat.** Una paraula que digui què és: `capcalera`, `menu`, `ruta`. Serà la seva classe.',
          "**Escriu l'HTML de fora cap a dins.** Primer els quadrats grans; després, el que tenen a dins."
        ),
        p("Vegem-ho amb la pàgina d'inici de la web de rutes. A cada pas el dibuix s'obre un nivell i, al costat, hi tens l'HTML que li correspon."),
        custom('BoxSketch', {
          title: "La pàgina d'inici, en quadrats",
          intro: 'Comença pel nivell 1, mirant la pàgina de lluny, i ves obrint quadrats.',
          tree: {
            name: 'pàgina',
            tag: 'body',
            dir: 'column',
            children: [
              {
                name: 'capçalera',
                tag: 'header.capcalera',
                dir: 'row',
                children: [
                  { name: 'logo', tag: 'a.logo', basis: '30%' },
                  {
                    name: 'menú',
                    tag: 'nav.menu',
                    dir: 'row',
                    children: [{ name: 'Rutes', tag: 'a' }, { name: 'Mapa', tag: 'a' }, { name: 'Consells', tag: 'a' }],
                  },
                ],
              },
              {
                name: 'rutes',
                tag: 'main.rutes',
                dir: 'column',
                h: 96,
                children: [
                  { name: 'ruta', tag: 'article.ruta', h: 40 },
                  { name: 'ruta', tag: 'article.ruta', h: 40 },
                  { name: 'ruta', tag: 'article.ruta', h: 40 },
                ],
              },
              { name: 'peu', tag: 'footer.peu' },
            ],
          },
          steps: [
            'De lluny, la pàgina són tres quadrats apilats: la **capçalera**, les **rutes** i el **peu**. És una columna.',
            "Obrim la capçalera: el **logo** i el **menú**, de costat. És una fila. I obrim les rutes: una **targeta** per a cada ruta, l'una sota l'altra.",
            'El menú també té coses a dins: tres enllaços, en fila. Ja no queda cap quadrat per obrir.',
          ],
        }),
        p("Fixa't en la columna de la dreta: l'HTML **és** el dibuix. Cada quadrat és una etiqueta que s'obre i es tanca, i el que hi ha dins del quadrat és el que hi ha entre l'obertura i el tancament. El sagnat fa de mapa: cada nivell de quadrats, dos espais més endins."),
        concept(
          'El que es mou junt va al mateix quadrat',
          "Com saps on acaba un quadrat? Imagina que arrossegues una part de la pàgina a un altre lloc. Tot el que s'hi hauria d'endur va al mateix quadrat. El logo i el menú se'n van amb la capçalera; el nom i les dades d'una ruta se'n van amb la seva targeta."
        ),
        example({
          title: 'El dibuix, escrit',
          intro: "És l'HTML del nivell 3 del dibuix, amb el contingut de veritat. Recorre'l amb els quadrats activats i busca-hi cada quadrat.",
          html: `<header class="capcalera">
  <a class="logo" href="index.html">▲ Camins</a>

  <nav class="menu">
    <a href="index.html">Rutes</a>
    <a href="mapa.html">Mapa</a>
    <a href="consells.html">Consells</a>
  </nav>
</header>

<main class="rutes">
  <article class="ruta">
    <h2>Camí de Ronda</h2>
    <p class="dades">12 km · 3 h 30 min · Fàcil</p>
  </article>

  <article class="ruta">
    <h2>Vall de Núria</h2>
    <p class="dades">9 km · 3 h · Mitjana</p>
  </article>

  <article class="ruta">
    <h2>Pica d'Estats</h2>
    <p class="dades">18 km · 9 h · Difícil</p>
  </article>
</main>

<footer class="peu">
  <p>© 2025 Camins</p>
</footer>`,
          css: `${CSS_BASE}

.capcalera,
.peu {
  padding: 12px;
  color: #ffffff;
  background: #1f6f54;
}

.capcalera a {
  color: #ffffff;
}

.rutes {
  padding: 12px;
}

.ruta {
  margin-bottom: 12px;
  padding: 12px;
  border: 2px solid #c9d6cf;
  border-radius: 8px;
}

.ruta h2,
.dades,
.peu p {
  margin: 0;
}`,
          focus: 'html',
          boxes: true,
          expected: 'Una franja verda amb el logo i, a sota, el menú; tres targetes de ruta apilades, i el peu. Els quadrats hi són tots, però la capçalera no és una fila: el menú ha caigut a sota del logo.',
          why: "El niuament de l'HTML és el niuament dels quadrats del dibuix: la capçalera té dos fills, el menú en té tres i el bloc de rutes en té tres més. La posició encara no coincideix amb el dibuix, i això no té res a veure amb l'HTML.",
        }),
        warning(
          'De moment, els quadrats s\'apilen',
          "Al dibuix, el logo i el menú estan de costat. A la previsualització, l'un sota l'altre. No has fet res malament: els contenidors, si no se'ls diu res, queden l'un sota l'altre. Posar-los de costat és feina del CSS, i és el que aprendràs a les unitats que venen, sobretot amb [Flexbox](#/unitat/flexbox). En aquesta ens ocupem de la meitat que va abans: **que els quadrats hi siguin, i que siguin els correctes**. Si l'estructura està malament, cap CSS l'arreglarà."
        ),
      ],
    },

    {
      id: 'obrir-un-quadrat',
      title: 'Obrir un quadrat: la targeta d\'una ruta',
      blocks: [
        p("El mètode funciona igual a qualsevol mida. Una pàgina es descompon en parts, i cada part, en peces. Agafem una sola targeta de ruta i tractem-la com si fos tota la pàgina. Al disseny té la foto a l'esquerra, el nom i les dades al mig i un enllaç a la dreta."),
        custom('BoxSketch', {
          title: 'Una targeta, en quadrats',
          intro: 'Quants quadrats hi veus, de lluny? Compta\'ls abans d\'obrir el dibuix.',
          showCode: false,
          tree: {
            name: 'ruta',
            tag: 'article.ruta',
            dir: 'row',
            children: [
              { name: 'foto', basis: '30%', h: 88 },
              {
                name: 'text',
                tag: 'div.text',
                dir: 'column',
                h: 88,
                children: [{ name: 'nom', tag: 'h2' }, { name: 'dades', tag: 'p.dades' }],
              },
              { name: 'enllaç', tag: 'a.boto', basis: '24%', h: 88 },
            ],
          },
          steps: [
            "De lluny, la targeta és una **fila** de tres quadrats: la foto, el text i l'enllaç.",
            'El text no és una sola cosa: són el nom i les dades, **apilats**. Una columna dins d\'una fila.',
          ],
        }),
        p('Compta els fills de la targeta: en són **tres**, no quatre. El nom i les dades es mouen junts (si la foto creix, tots dos es desplacen alhora), i per això comparteixen un quadrat, `text`. Aquest quadrat no és cap cosa amb nom propi: no és una capçalera ni un article. És un simple `<div>`.'),
        example({
          title: 'La targeta, escrita',
          intro: 'Tres fills directes dins de l\'`<article>`: la imatge, el `<div class="text">` i l\'enllaç. Amb els quadrats activats, compta\'ls.',
          html: `<article class="ruta">
  <img class="foto" src="imatges/ruta-1.jpg" alt="Muntanyes sota un cel blau">

  <div class="text">
    <h2>Camí de Ronda</h2>
    <p class="dades">12 km · 3 h 30 min · Fàcil</p>
  </div>

  <a class="boto" href="ruta.html">Veure la ruta</a>
</article>`,
          css: CSS_TARGETA,
          focus: 'html',
          boxes: true,
          expected: 'Una caixa amb vora que conté la foto, una caixa verd clar amb el nom i les dades, i l\'enllaç. Tot apilat.',
          why: 'L\'`<article>` té tres fills. El títol i el paràgraf no són fills seus, sinó del `<div class="text">`. Quan arribi el moment de posar la targeta en fila, es col·locaran tres coses, i el nom i les dades aniran sempre junts.',
        }),
        challenge({
          title: 'Agrupa el que va junt',
          statement: 'Aquesta targeta té quatre fills directes: la foto, el nom, les dades i l\'enllaç. Al dibuix n\'hi ha tres. Afegeix el quadrat que falta: un `<div class="text">` que contingui el nom i les dades.',
          html: `<article class="ruta">
  <img class="foto" src="imatges/ruta-2.jpg" alt="Muntanyes al capvespre">
  <h2>Vall de Núria</h2>
  <p class="dades">9 km · 3 h · Mitjana</p>
  <a class="boto" href="ruta.html">Veure la ruta</a>
</article>`,
          css: CSS_TARGETA,
          focus: 'html',
          boxes: true,
          hint: 'El `<div class="text">` s\'obre just abans de l\'`<h2>` i es tanca just després del paràgraf. Recorda sagnar el que queda a dins.',
          solution: {
            html: `<article class="ruta">
  <img class="foto" src="imatges/ruta-2.jpg" alt="Muntanyes al capvespre">

  <div class="text">
    <h2>Vall de Núria</h2>
    <p class="dades">9 km · 3 h · Mitjana</p>
  </div>

  <a class="boto" href="ruta.html">Veure la ruta</a>
</article>`,
          },
          explanation: 'Ara la targeta té tres fills, com al dibuix. La caixa verd clar que ha aparegut al voltant del nom i les dades és el quadrat nou: el CSS ja tenia una regla esperant un element amb la classe `text`.',
          checks: [
            { label: 'Hi ha un quadrat amb la classe `text` dins de la targeta', selector: '.ruta > .text' },
            { label: 'El nom és dins del quadrat de text', selector: '.ruta > .text > h2' },
            { label: 'Les dades són dins del quadrat de text', selector: '.ruta > .text > .dades' },
            { label: "La targeta té tres fills: la foto, el text i l'enllaç", selector: '.ruta > *', count: 3 },
          ],
        }),
        concept(
          'Compta els fills',
          "Quan acabis d'escriure un quadrat, compta'n els fills directes i compara'ls amb el dibuix. Si al dibuix hi ha tres quadrats i a l'HTML hi ha quatre fills, t'has deixat una agrupació. És la comprovació més ràpida que hi ha, i amb els quadrats de la previsualització es fa a simple vista."
        ),
      ],
    },

    {
      id: 'un-quadrat-de-mes',
      title: 'Quan cal un quadrat de més, i quan sobra',
      blocks: [
        p("De vegades el disseny no ensenya cap vora, cap fons ni cap separació, i tot i així hi cal un quadrat. Passa sempre pel mateix motiu. Imagina que la pàgina de rutes té, sota de la capçalera, una columna de filtres a l'esquerra i la llista de rutes a la dreta."),
        p("Si mires la pàgina de lluny, és una columna: la capçalera a dalt i el peu a baix. Però al mig hi ha dues coses **de costat**. Una columna no pot tenir dues coses de costat. La solució és dibuixar un quadrat nou que les contingui totes dues:"),
        custom('BoxSketch', {
          title: 'Un quadrat que no es veu al disseny',
          intro: 'El quadrat del mig l\'hem afegit nosaltres. Obre\'l.',
          tree: {
            name: 'pàgina',
            tag: 'body',
            dir: 'column',
            children: [
              { name: 'capçalera', tag: 'header.capcalera', h: 30 },
              {
                name: 'cos',
                tag: 'div.cos',
                dir: 'row',
                h: 96,
                children: [
                  { name: 'filtres', tag: 'aside.filtres', basis: '30%', h: 80 },
                  { name: 'rutes', tag: 'main.rutes', h: 80 },
                ],
              },
              { name: 'peu', tag: 'footer.peu', h: 30 },
            ],
          },
          steps: [
            'La pàgina és una **columna** de tres quadrats. El del mig, `cos`, no té cap vora al disseny: l\'hem dibuixat perquè contingui el que va de costat.',
            'Dins del cos, els filtres i les rutes formen una **fila**. I la pàgina continua sent una columna neta.',
          ],
        }),
        concept(
          'Un quadrat, una sola direcció',
          "Cada quadrat col·loca els seus fills d'una sola manera: **tots en fila o tots en columna**. Mai les dues coses alhora. Quan en un quadrat et trobis coses de costat barrejades amb coses apilades, és que hi falta un quadrat que agrupi les que van en la mateixa direcció."
        ),
        example({
          title: 'El quadrat del cos',
          intro: 'El `<div class="cos">` no vol dir res: només hi és per agrupar. Li hem posat un fons verd clar perquè el vegis.',
          html: `<header class="capcalera">▲ Camins</header>

<div class="cos">
  <aside class="filtres">
    <h2>Filtres</h2>
    <p>Fàcil · Mitjana · Difícil</p>
  </aside>

  <main class="rutes">
    <h1>Rutes de muntanya</h1>
    <p>Sis rutes per triar.</p>
  </main>
</div>

<footer class="peu">© 2025 Camins</footer>`,
          css: CSS_COS,
          focus: 'html',
          boxes: true,
          expected: 'La capçalera i el peu de color verd fosc i, entremig, una franja verd clar amb dues caixes blanques a dins: els filtres i les rutes.',
          why: 'El `<body>` té tres fills: la capçalera, el cos i el peu. Els filtres i les rutes són fills del cos. Quan sàpigues posar quadrats en fila, n\'hi haurà prou de dir-ho al cos: la capçalera i el peu ni se n\'assabentaran.',
        }),
        p("Passa el mateix dins d'una capçalera quan el logo i el menú han d'anar junts a l'esquerra i un botó, sol, a la dreta: la capçalera té **dos** fills, un grup i un botó, i el logo i el menú viuen dins del grup. Sempre que dues coses hagin d'anar juntes respecte d'una tercera, necessiten un quadrat."),
        p("L'error contrari també existeix: embolicar-ho tot. Cada element d'HTML **ja és una caixa**. A un `<h2>` se li pot posar fons, vora, farciment i marge sense ficar-lo dins de res."),
        compare(
          {
            title: 'Un quadrat que sobra',
            tone: 'bad',
            lang: 'html',
            code: `<div class="nom-ruta">
  <h2>Camí de Ronda</h2>
</div>`,
            text: 'El `<div>` només conté una cosa. Tot el que se li vulgui fer es pot fer directament a l\'`<h2>`.',
          },
          {
            title: 'La caixa ja hi era',
            tone: 'good',
            lang: 'html',
            code: `<h2 class="nom-ruta">Camí de Ronda</h2>`,
            text: 'Una etiqueta menys per obrir, tancar i sagnar.',
          }
        ),
        warning(
          'Un quadrat amb un sol fill gairebé sempre sobra',
          "Un contenidor serveix per agrupar **més d'una** cosa. Abans d'escriure un `<div>`, pregunta't què agrupa. Si la resposta és «només això», no el necessites."
        ),
        p("El `<div>` té un germà petit: el `<span>`. Tampoc vol dir res, però no serveix per agrupar caixes sinó per marcar **un tros de text dins d'una línia**, per exemple una paraula a la qual vols donar un altre color."),
        example({
          title: "Un span dins d'una línia",
          intro: 'Activa els quadrats: el contorn del `<span>` és de punts i només envolta una paraula.',
          html: `<p class="dades">12 km · 3 h 30 min · <span class="dificultat">Fàcil</span></p>`,
          css: `${CSS_BASE}

.dificultat {
  font-weight: bold;
  color: #1f6f54;
}`,
          focus: 'html',
          boxes: true,
          expected: 'La línia de dades, amb la paraula «Fàcil» en verd i en negreta.',
          why: "El `<p>` és una caixa que ocupa tota l'amplada. El `<span>` és una caixa que es queda dins de la línia, enganxada al text. Aquesta diferència entre caixes de bloc i caixes en línia és el tema de [la unitat següent](#/unitat/display).",
        }),
      ],
    },

    {
      id: 'posar-nom',
      title: 'Posar nom als quadrats: les classes',
      blocks: [
        p("El quart pas del mètode sembla el més fàcil, i és on es decideix si el teu CSS serà còmode o un embolic. El nom que poses a cada quadrat del dibuix es converteix en la seva **classe**, i és amb aquest nom que el CSS el trobarà."),
        table(
          ['En lloc de…', 'Millor…', 'Per què'],
          [
            ['`caixa1`, `div2`', '`capcalera`, `peu`', 'Un número no diu què hi ha a dins'],
            ['`verd`, `gran`', '`ruta`, `avis`', "L'aspecte pot canviar; el que és, no"],
            ['`Menu Principal`', '`menu-principal`', 'Sense espais, accents ni majúscules; les paraules, unides amb un guió'],
            ['`ruta1`, `ruta2`, `ruta3`', '`ruta`, a totes tres', 'Les caixes del mateix tipus comparteixen classe i estils'],
          ],
          "Com triar el nom d'un quadrat"
        ),
        p("L'última fila és la més important. Tres targetes de ruta no són tres quadrats diferents: són **tres vegades el mateix quadrat**. Comparteixen classe i, per tant, una sola regla de CSS les pinta totes."),
        example({
          title: 'Un nom, tres caixes',
          intro: 'Canvia el color de la vora de `.ruta`, o el seu `padding`: les tres targetes canvien alhora.',
          html: `<main class="rutes">
  <article class="ruta">
    <h2>Camí de Ronda</h2>
    <p class="dades">12 km · 3 h 30 min · Fàcil</p>
  </article>

  <article class="ruta">
    <h2>Vall de Núria</h2>
    <p class="dades">9 km · 3 h · Mitjana</p>
  </article>

  <article class="ruta">
    <h2>Pica d'Estats</h2>
    <p class="dades">18 km · 9 h · Difícil</p>
  </article>
</main>`,
          css: CSS_RUTES,
          expected: 'Tres targetes iguals, amb vora grisa, el nom en verd i les dades en gris.',
          why: 'Les tres targetes tenen la classe `ruta`, i la regla `.ruta` s\'aplica a tots els elements que la porten. Fixa\'t també en `.ruta h2`: no ha calgut posar cap classe als títols, perquè el selector ja diu «els `<h2>` que hi ha dins d\'una ruta».',
        }),
        concept(
          'El nom és el pont',
          'El mateix nom apareix a tres llocs: al dibuix (el quadrat «ruta»), a l\'HTML (`class="ruta"`) i al CSS (`.ruta`). Si el tries bé, podràs anar d\'un lloc a l\'altre sense perdre\'t.'
        ),
        p('Alguns quadrats només existeixen per agrupar i no són «res» en concret, com el `cos` d\'abans. Per a aquests, un nom que digui què agrupen o on són ja va bé: `cos`, `text`, `capcalera-esquerra`.'),
      ],
    },

    {
      id: 'de-fora-cap-a-dins',
      title: 'Del dibuix a l\'HTML, de fora cap a dins',
      blocks: [
        p("Queda l'últim pas: escriure. I la manera d'escriure també té mètode. No es comença per la primera línia i s'acaba per l'última. Es comença pel quadrat de fora, **obrint-lo i tancant-lo de seguida**, i després s'omple."),
        html(
          `<header class="capcalera">
</header>

<main class="rutes">
</main>

<footer class="peu">
</footer>`,
          { title: '1. Els quadrats grans, oberts i tancats' }
        ),
        html(
          `<header class="capcalera">
  <a class="logo" href="index.html">▲ Camins</a>

  <nav class="menu">
  </nav>
</header>`,
          { title: '2. S\'obre la capçalera: el logo i el menú' }
        ),
        html(
          `<header class="capcalera">
  <a class="logo" href="index.html">▲ Camins</a>

  <nav class="menu">
    <a href="index.html">Rutes</a>
    <a href="mapa.html">Mapa</a>
    <a href="consells.html">Consells</a>
  </nav>
</header>`,
          { title: '3. S\'obre el menú: els tres enllaços' }
        ),
        p("Escrivint així, cada etiqueta té el seu tancament des del primer moment, i el sagnat et diu en tot moment dins de quin quadrat ets. Dues regles que t'estalviaran molts disgustos:"),
        list(
          "El **tancament** s'alinea amb la seva obertura: comencen a la mateixa columna.",
          'El que hi ha **a dins** d\'un quadrat va dos espais més endins que el seu pare.'
        ),
        example({
          title: 'Un tancament que falta',
          intro: 'A la primera targeta li falta el `</article>`. Mira on ha anat a parar la segona, i després escriu el tancament que falta.',
          html: `<main class="rutes">
  <article class="ruta">
    <h2>Camí de Ronda</h2>
    <p class="dades">12 km · 3 h 30 min · Fàcil</p>

  <article class="ruta">
    <h2>Vall de Núria</h2>
    <p class="dades">9 km · 3 h · Mitjana</p>
  </article>
</main>`,
          css: CSS_RUTES,
          focus: 'html',
          boxes: true,
          expected: 'La segona targeta apareix **dins** de la primera: una caixa amb vora ficada dins d\'una altra. Quan hi afegeixes el `</article>`, queden l\'una sota l\'altra.',
          why: "El navegador no avisa dels tancaments que falten: fa el que pot. Com que el primer `<article>` no s'ha tancat, tot el que ve després es considera fill seu. És un error que costa de veure al codi i que amb els quadrats salta a la vista.",
        }),
        project(
          "La web de rutes ja té estructura. Aquests són els seus quadrats, amb el nom de cada un. Encara s'apilen tots, però l'HTML ja és gairebé el definitiu: a partir d'ara, cada unitat ensenyarà una manera nova de col·locar-los, i gairebé tot es farà des del CSS.",
          {
            title: "L'esquelet de la pàgina d'inici",
            lang: 'html',
            code: `<header class="capcalera">
  <a class="logo" href="index.html">▲ Camins</a>
  <nav class="menu">…</nav>
</header>

<main class="rutes">
  <article class="ruta">
    <img class="foto" src="imatges/ruta-1.jpg" alt="…">
    <div class="text">…</div>
  </article>
  <!-- …i una targeta per a cada ruta -->
</main>

<footer class="peu">…</footer>`,
          }
        ),
      ],
    },
  ],

  commonErrors: [
    {
      title: 'Deixar de fills directes coses que haurien d\'anar agrupades',
      bad: `<article class="ruta">
  <img class="foto" src="imatges/ruta-1.jpg" alt="…">
  <h2>Camí de Ronda</h2>
  <p class="dades">12 km · 3 h 30 min</p>
</article>`,
      badLang: 'html',
      symptom: 'Ara no es nota res. El dia que vulguis posar la foto a un costat i el text a l\'altre, el nom i les dades se separaran: cadascun anirà pel seu compte.',
      why: 'La targeta té tres fills, i al dibuix només n\'hi ha dos: la foto i el text. El nom i les dades van junts, i el que va junt necessita un quadrat.',
      fix: `<article class="ruta">
  <img class="foto" src="imatges/ruta-1.jpg" alt="…">

  <div class="text">
    <h2>Camí de Ronda</h2>
    <p class="dades">12 km · 3 h 30 min</p>
  </div>
</article>`,
      fixLang: 'html',
    },
    {
      title: 'Oblidar-se de tancar un contenidor',
      bad: `<article class="ruta">
  <h2>Camí de Ronda</h2>

<article class="ruta">
  <h2>Vall de Núria</h2>
</article>`,
      badLang: 'html',
      symptom: 'La segona targeta surt ficada dins de la primera, i tot el que ve després també.',
      why: 'El navegador no dona cap error: considera que el primer `<article>` continua obert i que tot el que segueix és fill seu. Escrivint cada quadrat obert i tancat des del principi, això no passa.',
      fix: `<article class="ruta">
  <h2>Camí de Ronda</h2>
</article>

<article class="ruta">
  <h2>Vall de Núria</h2>
</article>`,
      fixLang: 'html',
    },
    {
      title: 'Embolicar cada element amb un div',
      bad: `<div class="caixa-nom">
  <h2>Camí de Ronda</h2>
</div>
<div class="caixa-dades">
  <p>12 km · 3 h 30 min</p>
</div>`,
      badLang: 'html',
      symptom: 'La pàgina es veu igual, però l\'HTML fa el doble de línies i costa de llegir. Amb els quadrats activats, cada element surt envoltat de dues caixes.',
      why: "Cada element ja és una caixa i accepta fons, vores i marges. Un contenidor que només té un fill no agrupa res.",
      fix: `<h2 class="nom">Camí de Ronda</h2>
<p class="dades">12 km · 3 h 30 min</p>`,
      fixLang: 'html',
    },
    {
      title: 'Fer servir un div on hi ha una etiqueta amb nom',
      bad: `<div class="capcalera">…</div>
<div class="menu">…</div>
<div class="peu">…</div>`,
      badLang: 'html',
      symptom: 'A la pantalla no es veu cap diferència.',
      why: 'Funciona, però es perd informació: ni un lector de pantalla ni un cercador saben quina part és la capçalera o el menú, i tots els tancaments són `</div>`. Si hi ha una etiqueta que diu què és el quadrat, fes-la servir.',
      fix: `<header class="capcalera">…</header>
<nav class="menu">…</nav>
<footer class="peu">…</footer>`,
      fixLang: 'html',
    },
    {
      title: 'Posar noms que descriuen l\'aspecte o l\'ordre',
      bad: `<div class="caixa-verda">…</div>
<div class="caixa2">…</div>`,
      badLang: 'html',
      symptom: 'Funciona. Però el dia que la caixa passi a ser blava, o que la segona passi a ser la tercera, el nom dirà una mentida.',
      why: "El nom d'un quadrat ha de dir què és, perquè això no canvia encara que en canviïs els colors o la posició. I és el que et permetrà trobar-lo quan el busquis al CSS.",
      fix: `<article class="ruta">…</article>
<aside class="filtres">…</aside>`,
      fixLang: 'html',
    },
  ],

  exercises: [
    {
      id: 'etiquetes-amb-nom',
      title: 'Cada quadrat, pel seu nom',
      statement: 'Aquesta pàgina està feta tota amb `<div>`. Canvia cada `<div>` pel contenidor semàntic que li correspon: la capçalera, el menú, el contingut principal i el peu. No canviïs les classes ni el contingut.',
      expected: 'La pàgina es veu exactament igual que abans. El que canvia són els noms dels quadrats: activa\'ls i llegeix-los.',
      focus: 'html',
      boxes: true,
      html: `<div class="capcalera">
  <a class="logo" href="index.html">▲ Camins</a>

  <div class="menu">
    <a href="index.html">Rutes</a>
    <a href="mapa.html">Mapa</a>
  </div>
</div>

<div class="rutes">
  <h1>Rutes de muntanya</h1>
  <p>Tria una ruta i calça't les botes.</p>
</div>

<div class="peu">
  <p>© 2025 Camins</p>
</div>`,
      css: `${CSS_BASE}

.capcalera,
.rutes,
.peu {
  margin-bottom: 12px;
  padding: 12px;
  border: 2px solid #c9d6cf;
  border-radius: 8px;
}

.menu {
  margin-top: 8px;
  padding: 8px;
  background: #e8f3ee;
}`,
      hint: 'Hi ha quatre `<div>` i quatre etiquetes per triar: `<header>`, `<nav>`, `<main>` i `<footer>`. Cada canvi es fa a dos llocs: a l\'obertura i al tancament.',
      solution: {
        html: `<header class="capcalera">
  <a class="logo" href="index.html">▲ Camins</a>

  <nav class="menu">
    <a href="index.html">Rutes</a>
    <a href="mapa.html">Mapa</a>
  </nav>
</header>

<main class="rutes">
  <h1>Rutes de muntanya</h1>
  <p>Tria una ruta i calça't les botes.</p>
</main>

<footer class="peu">
  <p>© 2025 Camins</p>
</footer>`,
      },
      explanation: 'Les classes s\'han quedat on eren, i per això el CSS continua funcionant sense tocar-lo: els estils van lligats al nom del quadrat, no a l\'etiqueta. El que ha millorat és el codi: ara cada tancament diu què tanca.',
      checks: [
        { label: 'La capçalera és un `<header>`', selector: '.capcalera', tag: 'header' },
        { label: 'El menú és un `<nav>` i continua dins de la capçalera', selector: '.capcalera > .menu', tag: 'nav' },
        { label: 'El contingut principal és un `<main>`', selector: '.rutes', tag: 'main' },
        { label: 'El peu és un `<footer>`', selector: '.peu', tag: 'footer' },
        { label: 'No queda cap `<div>`', selector: 'div', exists: false },
        { label: 'La capçalera, el contingut i el peu continuen sent tres quadrats germans', selector: 'body > *', count: 3 },
      ],
    },
    {
      id: 'una-caixa-per-ruta',
      title: 'Una caixa per a cada ruta',
      statement: 'Dins del `<main>` hi ha dues rutes, però els noms i les dades estan solts: quatre germans seguits. Fica cada ruta dins del seu propi `<article class="ruta">`.',
      expected: 'Dues targetes amb vora, cadascuna amb el seu nom i les seves dades.',
      focus: 'html',
      boxes: true,
      html: `<main class="rutes">
  <h2>Estany de Sant Maurici</h2>
  <p class="dades">7 km · 2 h · Fàcil</p>

  <h2>Puigmal</h2>
  <p class="dades">14 km · 6 h · Difícil</p>
</main>`,
      css: CSS_RUTES,
      hint: 'Cada `<article class="ruta">` s\'obre abans d\'un `<h2>` i es tanca després del paràgraf que el segueix. En necessites dos.',
      solution: {
        html: `<main class="rutes">
  <article class="ruta">
    <h2>Estany de Sant Maurici</h2>
    <p class="dades">7 km · 2 h · Fàcil</p>
  </article>

  <article class="ruta">
    <h2>Puigmal</h2>
    <p class="dades">14 km · 6 h · Difícil</p>
  </article>
</main>`,
      },
      explanation: 'El CSS ja tenia una regla per a `.ruta`, però no hi havia cap element amb aquesta classe. En crear els dos contenidors, cada ruta té una caixa on posar la vora i el farciment. El `<main>` ha passat de tenir quatre fills a tenir-ne dos.',
      checks: [
        { label: 'Hi ha dues caixes amb la classe `ruta` dins del `<main>`', selector: 'main > .ruta', count: 2 },
        { label: 'Les dues caixes són `<article>`', selector: '.ruta', all: true, tag: 'article' },
        { label: 'La primera conté «Estany de Sant Maurici» i les seves dades', selector: 'main > .ruta:first-child', text: ['Sant Maurici', '7 km'] },
        { label: 'La segona conté «Puigmal» i les seves dades', selector: 'main > .ruta:last-child', text: ['Puigmal', '14 km'] },
        { label: 'Dins del `<main>` no queda cap nom ni cap dada solts', selector: 'main > h2, main > p', exists: false },
      ],
    },
    {
      id: 'falta-un-quadrat',
      title: 'Falta un quadrat',
      statement: [
        "Al disseny, els filtres i la llista de rutes van **de costat**, entre la capçalera i el peu. A l'HTML, en canvi, la capçalera, els filtres, les rutes i el peu són quatre germans seguits.",
        'Afegeix el quadrat que falta: un `<div class="cos">` que contingui els filtres i les rutes, i res més.',
      ],
      expected: 'Entre la capçalera i el peu apareix una franja verd clar que conté les dues caixes blanques.',
      focus: 'html',
      boxes: true,
      html: `<header class="capcalera">▲ Camins</header>

<aside class="filtres">
  <h2>Filtres</h2>
  <p>Fàcil · Mitjana · Difícil</p>
</aside>

<main class="rutes">
  <h1>Rutes de muntanya</h1>
  <p>Sis rutes per triar.</p>
</main>

<footer class="peu">© 2025 Camins</footer>`,
      css: CSS_COS,
      hint: [
        'La pàgina, de lluny, és una columna de tres quadrats: la capçalera, el cos i el peu.',
        'El `<div class="cos">` s\'obre abans de l\'`<aside>` i es tanca després del `</main>`.',
      ],
      solution: {
        html: `<header class="capcalera">▲ Camins</header>

<div class="cos">
  <aside class="filtres">
    <h2>Filtres</h2>
    <p>Fàcil · Mitjana · Difícil</p>
  </aside>

  <main class="rutes">
    <h1>Rutes de muntanya</h1>
    <p>Sis rutes per triar.</p>
  </main>
</div>

<footer class="peu">© 2025 Camins</footer>`,
      },
      explanation: 'La pàgina és una columna i a dins hi havia dues coses que han d\'anar de costat: hi faltava un quadrat. Ara el `<body>` té tres fills, i el dia que el cos es converteixi en una fila, la capçalera i el peu continuaran al seu lloc.',
      checks: [
        { label: 'Hi ha un quadrat `cos` entre la capçalera i el peu', selector: 'body > .cos' },
        { label: 'Els filtres són dins del cos', selector: '.cos > .filtres' },
        { label: 'Les rutes són dins del cos', selector: '.cos > .rutes' },
        { label: 'El cos només conté aquestes dues coses', selector: '.cos > *', count: 2 },
        { label: 'La pàgina té tres quadrats grans: la capçalera, el cos i el peu', selector: 'body > *', count: 3 },
      ],
    },
    {
      id: 'fitxa-des-de-zero',
      title: 'Del dibuix a l\'HTML: una fitxa',
      statement: [
        'Aquesta vegada no hi ha res escrit. Passa aquest dibuix a HTML, de fora cap a dins.',
        'El quadrat de fora és un `<article class="fitxa">` i té dos fills. El primer és un `<header class="fitxa-cap">`, i conté un `<h2>` amb el text «Puigmal» i un `<p class="lloc">` amb «Ripollès». El segon és un `<div class="fitxa-dades">`, i conté tres `<p class="dada">`: «14 km», «6 h» i «Difícil».',
        'A la pestanya «Objectiu» tens el dibuix acabat: activa-hi els quadrats.',
      ],
      expected: 'Una fitxa amb vora verda: a dalt, una franja verd fosc amb el nom i el lloc; a sota, una caixa verd clar amb les tres dades.',
      focus: 'html',
      boxes: true,
      html: `<!-- Escriu aquí la fitxa, començant pel quadrat de fora -->`,
      css: `${CSS_BASE}

.fitxa {
  padding: 12px;
  border: 2px solid #1f6f54;
  border-radius: 8px;
}

.fitxa-cap {
  padding: 8px;
  color: #ffffff;
  background: #1f6f54;
}

.fitxa-cap h2,
.lloc {
  margin: 0;
}

.fitxa-dades {
  margin-top: 8px;
  padding: 8px;
  background: #e8f3ee;
}

.dada {
  margin: 0 0 4px;
}`,
      hint: [
        'Comença escrivint `<article class="fitxa">` i `</article>`. Després, a dins, els dos fills, oberts i tancats. Només quan hi siguin tots dos, omple\'ls.',
        'Si un quadrat no agafa el seu color, mira que la classe estigui escrita igual que al CSS.',
      ],
      solution: {
        html: `<article class="fitxa">
  <header class="fitxa-cap">
    <h2>Puigmal</h2>
    <p class="lloc">Ripollès</p>
  </header>

  <div class="fitxa-dades">
    <p class="dada">14 km</p>
    <p class="dada">6 h</p>
    <p class="dada">Difícil</p>
  </div>
</article>`,
      },
      explanation: 'Tres nivells de quadrats, tres nivells de sagnat. Escrivint primer el quadrat de fora i després els seus dos fills, cada etiqueta té el seu tancament des del principi i no cal anar-los comptant al final.',
      checks: [
        { label: 'El quadrat de fora és un `<article class="fitxa">`', selector: 'article.fitxa' },
        { label: 'La fitxa té dos fills', selector: '.fitxa > *', count: 2 },
        { label: 'El primer fill és un `<header class="fitxa-cap">`', selector: '.fitxa > header.fitxa-cap:first-child' },
        { label: 'La capçalera de la fitxa conté un `<h2>` amb «Puigmal»', selector: '.fitxa-cap > h2', text: 'Puigmal' },
        { label: 'I un `<p class="lloc">` amb «Ripollès»', selector: '.fitxa-cap > p.lloc', text: 'Ripollès' },
        { label: 'El segon fill és un `<div class="fitxa-dades">`', selector: '.fitxa > div.fitxa-dades:last-child' },
        { label: 'Les dades són tres `<p class="dada">`', selector: '.fitxa-dades > p.dada', count: 3 },
      ],
    },
  ],

  finalExercise: {
    id: 'pagina-d-inici',
    title: "La pàgina d'inici, del dibuix a l'HTML",
    statement: [
      "Tens tot el contingut de la pàgina d'inici de la web de rutes, però sense cap quadrat: tot són germans dins del `<body>`. Construeix-ne l'estructura sencera, de fora cap a dins.",
      'La pàgina té tres quadrats grans: `<header class="capcalera">`, `<main class="rutes">` i `<footer class="peu">`. Dins de la capçalera hi ha el logo i un `<nav class="menu">` amb els tres enllaços. Dins del `<main>`, el títol i un `<article class="ruta">` per a cada ruta; i dins de cada ruta, la foto i un `<div class="text">` amb el nom i les dades. El paràgraf del copyright va al peu.',
      'No has d\'escriure cap text nou: només contenidors. Tens el dibuix a la pestanya «Objectiu», amb els quadrats activats.',
    ],
    expected: 'Una capçalera verda amb el logo i, a sota, el menú en una caixa fosca; una zona verd clar amb el títol i dues targetes blanques, cadascuna amb la foto i una caixa de ratlles amb el nom i les dades; i el peu, verd.',
    focus: 'html',
    boxes: true,
    html: `<a class="logo" href="index.html">▲ Camins</a>
<a href="index.html">Rutes</a>
<a href="mapa.html">Mapa</a>
<a href="consells.html">Consells</a>

<h1>Rutes de muntanya</h1>

<img class="foto" src="imatges/ruta-1.jpg" alt="Muntanyes sota un cel blau">
<h2>Camí de Ronda</h2>
<p class="dades">12 km · 3 h 30 min · Fàcil</p>

<img class="foto" src="imatges/ruta-2.jpg" alt="Muntanyes al capvespre">
<h2>Vall de Núria</h2>
<p class="dades">9 km · 3 h · Mitjana</p>

<p>© 2025 Camins</p>`,
    css: CSS_PAGINA,
    hint: [
      'Escriu primer els tres quadrats grans, buits, i ves-hi movent el contingut a dins.',
      'La capçalera té dos fills (el logo i el `<nav>`), i els tres enllaços són fills del `<nav>`. Cada ruta també en té dos: la foto i el `<div class="text">`.',
    ],
    solution: {
      html: `<header class="capcalera">
  <a class="logo" href="index.html">▲ Camins</a>

  <nav class="menu">
    <a href="index.html">Rutes</a>
    <a href="mapa.html">Mapa</a>
    <a href="consells.html">Consells</a>
  </nav>
</header>

<main class="rutes">
  <h1>Rutes de muntanya</h1>

  <article class="ruta">
    <img class="foto" src="imatges/ruta-1.jpg" alt="Muntanyes sota un cel blau">

    <div class="text">
      <h2>Camí de Ronda</h2>
      <p class="dades">12 km · 3 h 30 min · Fàcil</p>
    </div>
  </article>

  <article class="ruta">
    <img class="foto" src="imatges/ruta-2.jpg" alt="Muntanyes al capvespre">

    <div class="text">
      <h2>Vall de Núria</h2>
      <p class="dades">9 km · 3 h · Mitjana</p>
    </div>
  </article>
</main>

<footer class="peu">
  <p>© 2025 Camins</p>
</footer>`,
    },
    explanation: [
      "L'estructura té quatre nivells: la pàgina, les seves tres parts, el que hi ha dins de cada part i, a les rutes, el quadrat de text. Cap d'aquests contenidors aporta contingut: tots hi són per agrupar el que va junt.",
      "Aquest HTML ja no canviarà gaire. A les unitats següents hi afegirem CSS per posar el menú al costat del logo, la foto al costat del text i les rutes en una graella, i ho podrem fer precisament perquè cada cosa té el seu quadrat.",
    ],
    checks: [
      { label: 'La pàgina té tres quadrats grans', selector: 'body > *', count: 3 },
      { label: 'El primer és un `<header class="capcalera">`', selector: 'body > header.capcalera' },
      { label: 'La capçalera té dos fills: el logo i el menú', selector: '.capcalera > a.logo + nav.menu' },
      { label: 'El menú és un `<nav class="menu">` amb els tres enllaços', selector: '.capcalera > nav.menu > a', count: 3 },
      { label: 'El contingut és un `<main class="rutes">`, amb el títol a dins', selector: 'body > main.rutes > h1' },
      { label: 'Hi ha un `<article class="ruta">` per a cada ruta', selector: 'main.rutes > article.ruta', count: 2 },
      { label: 'Cada ruta té dos fills: la foto i el quadrat de text', selector: '.ruta > *', count: 4 },
      { label: 'A cada ruta, la foto va davant del `<div class="text">`', selector: '.ruta > img.foto + div.text', count: 2 },
      { label: 'El nom i les dades són dins del quadrat de text', selector: '.ruta > .text > h2 + .dades', count: 2 },
      { label: 'El copyright és dins d\'un `<footer class="peu">`', selector: 'body > footer.peu > p' },
    ],
  },

  summary: [
    'Un **contenidor** és un element que no aporta contingut: agrupa el que va junt. El contenidor genèric és el `<div>`.',
    '`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>` i `<footer>` es comporten com un `<div>`, però diuen què és el quadrat.',
    "Abans d'escriure es dibuixa: els quadrats grans, **fila o columna** per a cada un, s'obre cada quadrat i es repeteix.",
    'El que es mou junt va al mateix quadrat. I un quadrat només té una direcció: si dins d\'una columna hi ha coses de costat, hi falta un quadrat.',
    'Cada element ja és una caixa: un contenidor amb un sol fill gairebé sempre sobra.',
    'El nom de cada quadrat és la seva **classe**: diu què és, no com es veu, i els quadrats del mateix tipus la comparteixen.',
    "L'HTML s'escriu de fora cap a dins, obrint i tancant cada quadrat, i el sagnat reflecteix el niuament.",
  ],

  quiz: [
    {
      question: 'Què canvia a la pantalla quan envoltes tres paràgrafs amb un `<div>` sense cap estil?',
      options: [
        { text: 'Res: el `<div>` només els agrupa', correct: true },
        { text: 'Els paràgrafs es posen de costat', why: 'Un `<div>` no col·loca res en fila. Sense CSS, el que conté continua apilat.' },
        { text: 'Apareix una vora al voltant dels tres', why: 'El `<div>` no porta cap estil propi. La vora l\'hauria de posar el CSS.' },
        { text: 'Els paràgrafs se separen més entre ells', why: 'El `<div>` no afegeix marges ni farciment.' },
      ],
      explanation: 'Un contenidor no es veu: agrupa. El que es vegi (fons, vora, espai) depèn dels estils que li posis.',
    },
    {
      question: 'Al disseny d\'una pàgina hi ha la capçalera a dalt, el peu a baix i, entremig, un menú lateral al costat del contingut. Quants fills directes ha de tenir el `<body>`?',
      options: [
        { text: 'Tres: la capçalera, un quadrat que agrupa el menú i el contingut, i el peu', correct: true },
        { text: 'Quatre: la capçalera, el menú, el contingut i el peu', why: 'El menú i el contingut van de costat, i la pàgina és una columna. Les dues coses que van de costat necessiten un quadrat propi.' },
        { text: 'Dos: la capçalera i tota la resta', why: 'El peu és un altre quadrat gran, apilat sota de la zona del mig.' },
        { text: 'Un: un `<div>` que ho contingui tot', why: 'Embolicar-ho tot en un sol quadrat no resol res: a dins hi tornaria a haver el mateix problema.' },
      ],
      explanation: 'Un quadrat col·loca els seus fills en una sola direcció. La pàgina és una columna de tres quadrats, i el del mig és una fila amb el menú i el contingut.',
    },
    {
      question: 'Una llista mostra deu rutes, cadascuna amb la seva foto, el nom i les dades. Quina etiqueta és la més adequada per al quadrat de cada ruta?',
      options: [
        { text: '`<article>`', correct: true },
        { text: '`<nav>`', why: '`<nav>` és per a grups d\'enllaços de navegació, com un menú.' },
        { text: '`<main>`', why: '`<main>` és el contingut principal de la pàgina, i només n\'hi pot haver un.' },
        { text: '`<footer>`', why: '`<footer>` és el peu de la pàgina o d\'una part.' },
      ],
      explanation: '`<article>` és per a peces que s\'entenen totes soles: una ruta, una notícia, un comentari o la targeta d\'un vídeo.',
    },
    {
      question: 'Al disseny, una targeta té la foto a l\'esquerra i, a la dreta, el nom i les dades l\'un sota l\'altre. Quants fills directes ha de tenir la targeta?',
      options: [
        { text: 'Dos: la foto i un quadrat amb el nom i les dades', correct: true },
        { text: 'Tres: la foto, el nom i les dades', why: 'Així la targeta hauria de col·locar tres coses, i el nom i les dades no anirien junts. Com que van apilats al costat de la foto, necessiten un quadrat.' },
        { text: 'Un: un `<div>` amb tot a dins', why: 'Un quadrat amb un sol fill no agrupa res: sobra.' },
        { text: 'Quatre, perquè cada text necessita el seu `<div>`', why: 'Un títol o un paràgraf ja són caixes. No cal embolicar-los un per un.' },
      ],
      explanation: 'La targeta és una fila de dues coses, i la segona és una columna amb el nom i les dades. Una fila i una columna no poden ser el mateix quadrat.',
    },
    {
      question: 'Quin és el millor nom de classe per al quadrat d\'una ruta?',
      options: [
        { text: '`ruta`', correct: true },
        { text: '`caixa2`', why: 'Un número no diu què hi ha a dins, i si canvia l\'ordre el nom queda malament.' },
        { text: '`verd-amb-vora`', why: 'Descriu l\'aspecte, que pot canviar. El dia que la vora sigui blava, el nom dirà una mentida.' },
        { text: '`Ruta De Muntanya`', why: 'Els espais separen classes: l\'element en tindria tres de diferents. I convé no fer servir majúscules.' },
      ],
      explanation: 'Un bon nom diu què és el quadrat, en minúscules i sense espais. I totes les rutes comparteixen la mateixa classe.',
    },
    {
      question: 'Ja has dibuixat els quadrats d\'una pàgina. Com convé escriure\'n l\'HTML?',
      options: [
        { text: 'De fora cap a dins: primer els quadrats grans, oberts i tancats, i després el que tenen a dins', correct: true },
        { text: 'De dalt a baix, línia a línia, i tancant totes les etiquetes al final', why: 'És la manera més fàcil de deixar-se un tancament o de posar-lo al lloc equivocat.' },
        { text: 'De dins cap a fora: primer els textos i després els contenidors que els envolten', why: 'Es pot fer, però obliga a anar embolicant i tornant a sagnar el que ja estava escrit.' },
        { text: 'Tant és, mentre el resultat es vegi bé', why: 'Amb contenidors sense estil, un HTML mal niuat es pot veure igual que un de correcte. El problema apareix quan hi poses CSS.' },
      ],
      explanation: 'Escrivint de fora cap a dins, cada etiqueta té el seu tancament des del primer moment i el sagnat reflecteix el dibuix.',
    },
  ],
};
