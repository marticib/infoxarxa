// Exercicis extra del tema 5: pensar en quadrats (els contenidors).
// Només fan servir el que s'ha explicat fins a la unitat 5: tots els quadrats
// queden apilats, i el que es treballa és l'estructura de l'HTML.

const BASE = `body {
  font-family: Arial, sans-serif;
}`;

export default [
  {
    id: 'un-nav-per-al-menu',
    level: 1,
    title: 'Un quadrat per al menú',
    statement: 'A la capçalera hi ha el logo i tres enllaços, tots germans. Agrupa els tres enllaços del menú dins d\'un `<nav class="menu">`. El logo s\'ha de quedar fora.',
    expected: 'Dins de la capçalera verda, el logo i, a sota, una caixa fosca amb els tres enllaços del menú.',
    focus: 'html',
    boxes: true,
    html: `<header class="capcalera">
  <a class="logo" href="index.html">▲ Camins</a>
  <a href="index.html">Rutes</a>
  <a href="mapa.html">Mapa</a>
  <a href="consells.html">Consells</a>
</header>`,
    css: `${BASE}

.capcalera {
  padding: 12px;
  background: #1f6f54;
}

.capcalera a {
  color: #ffffff;
}

.menu {
  margin-top: 8px;
  padding: 8px;
  background: #23312b;
}`,
    hint: 'El `<nav class="menu">` s\'obre després del logo i es tanca després de l\'últim enllaç, abans del `</header>`.',
    solution: {
      html: `<header class="capcalera">
  <a class="logo" href="index.html">▲ Camins</a>

  <nav class="menu">
    <a href="index.html">Rutes</a>
    <a href="mapa.html">Mapa</a>
    <a href="consells.html">Consells</a>
  </nav>
</header>`,
    },
    explanation: 'La capçalera tenia quatre fills i ara en té dos: el logo i el menú. Els tres enllaços van junts, i el que va junt necessita un quadrat. Com que és un grup d\'enllaços per navegar, el quadrat és un `<nav>`.',
    checks: [
      { label: 'Hi ha un `<nav class="menu">` dins de la capçalera', selector: '.capcalera > nav.menu' },
      { label: 'Els tres enllaços del menú són dins del `<nav>`', selector: '.menu > a', count: 3 },
      { label: 'El logo continua sent fill directe de la capçalera', selector: '.capcalera > a.logo' },
      { label: 'La capçalera té dos fills', selector: '.capcalera > *', count: 2 },
    ],
  },
  {
    id: 'una-seccio-per-tema',
    level: 1,
    title: 'Una secció per a cada tema',
    statement: 'La pàgina de consells té dos temes, cadascun amb el seu títol i els seus paràgrafs. Fica cada tema dins d\'un `<section class="tema">`. El títol de la pàgina, l\'`<h1>`, s\'ha de quedar fora.',
    expected: 'El títol de la pàgina i, a sota, dues caixes verd clar: una per a «Abans de sortir» i una altra per a «A la motxilla».',
    focus: 'html',
    boxes: true,
    html: `<main class="consells">
  <h1>Consells</h1>

  <h2>Abans de sortir</h2>
  <p>Mira la previsió del temps.</p>
  <p>Digues a algú on vas.</p>

  <h2>A la motxilla</h2>
  <p>Aigua, menjar i una capa de roba de més.</p>
</main>`,
    css: `${BASE}

.tema {
  margin-bottom: 12px;
  padding: 12px;
  background: #e8f3ee;
  border-radius: 8px;
}

.tema h2 {
  margin: 0 0 8px;
  color: #1f6f54;
}

.tema p {
  margin: 0 0 4px;
}`,
    hint: 'Cada secció comença amb el seu `<h2>` i acaba després de l\'últim paràgraf d\'aquell tema, just abans de l\'`<h2>` següent.',
    solution: {
      html: `<main class="consells">
  <h1>Consells</h1>

  <section class="tema">
    <h2>Abans de sortir</h2>
    <p>Mira la previsió del temps.</p>
    <p>Digues a algú on vas.</p>
  </section>

  <section class="tema">
    <h2>A la motxilla</h2>
    <p>Aigua, menjar i una capa de roba de més.</p>
  </section>
</main>`,
    },
    explanation: 'Un títol i els paràgrafs que el segueixen formen un tema: es mourien junts. `<section>` és el contenidor per a una part de la pàgina amb títol propi. L\'`<h1>` és el títol de tota la pàgina i no pertany a cap dels dos temes.',
    checks: [
      { label: 'Hi ha dues seccions amb la classe `tema`', selector: 'main > section.tema', count: 2 },
      { label: 'La primera té el títol «Abans de sortir» i els seus dos paràgrafs', selector: 'section.tema:nth-of-type(1)', text: ['Abans de sortir', 'previsió', 'on vas'] },
      { label: 'La segona té el títol «A la motxilla» i el seu paràgraf', selector: 'section.tema:nth-of-type(2)', text: ['A la motxilla', 'Aigua'] },
      { label: 'El títol de la pàgina queda fora de les seccions', selector: 'main > h1' },
      { label: 'No queda cap `<h2>` ni cap paràgraf solt', selector: 'main > h2, main > p', exists: false },
    ],
  },
  {
    id: 'sobren-quadrats',
    level: 2,
    title: 'Sobren quadrats',
    statement: 'Algú ha embolicat cada element d\'aquesta targeta amb un `<div>`, i fins i tot amb dos. Cap d\'ells agrupa res: tots tenen un sol fill. Treu-los tots i deixa la targeta amb tres fills directes: el nom, les dades i l\'enllaç.',
    expected: 'La targeta es veu igual que abans. Amb els quadrats activats, però, ja no hi ha caixes buides al voltant de cada element.',
    focus: 'html',
    boxes: true,
    html: `<article class="ruta">
  <div class="caixa-nom">
    <h2>Sant Jeroni</h2>
  </div>

  <div class="caixa-dades">
    <div>
      <p class="dades">11 km · 4 h 30 min · Mitjana</p>
    </div>
  </div>

  <div class="caixa-enllac">
    <a href="ruta.html">Veure la ruta</a>
  </div>
</article>`,
    css: `${BASE}

.ruta {
  padding: 12px;
  border: 2px solid #c9d6cf;
  border-radius: 8px;
}

.ruta h2 {
  margin: 0 0 4px;
  color: #1f6f54;
}

.dades {
  margin: 0 0 8px;
  color: #5b6b63;
}`,
    hint: 'Per treure un `<div>` has d\'esborrar dues línies: la de l\'obertura i la del tancament. El que hi havia a dins es queda, un nivell de sagnat més enfora.',
    solution: {
      html: `<article class="ruta">
  <h2>Sant Jeroni</h2>
  <p class="dades">11 km · 4 h 30 min · Mitjana</p>
  <a href="ruta.html">Veure la ruta</a>
</article>`,
    },
    explanation: 'Un `<h2>`, un `<p>` i un `<a>` ja són caixes: no en necessiten cap al voltant. Un contenidor es justifica quan agrupa més d\'una cosa. La targeta ha passat de deu línies a cinc i es veu exactament igual.',
    checks: [
      { label: 'No queda cap `<div>` dins de la targeta', selector: '.ruta div', exists: false },
      { label: 'El nom és fill directe de la targeta', selector: '.ruta > h2' },
      { label: 'Les dades són filles directes de la targeta', selector: '.ruta > .dades' },
      { label: "L'enllaç és fill directe de la targeta", selector: '.ruta > a' },
      { label: 'La targeta té tres fills', selector: '.ruta > *', count: 3 },
    ],
  },
  {
    id: 'dos-grups-a-la-barra',
    level: 2,
    title: 'Dos grups en una barra',
    statement: [
      "A la barra de la pàgina d'una ruta hi ha quatre coses: l'enllaç per tornar, el nom de la ruta i dos botons. Al disseny, l'enllaç i el nom van junts a l'esquerra, i els dos botons, junts a la dreta.",
      'La barra ha de tenir, doncs, **dos** fills. Crea\'ls: un `<div class="barra-inici">` amb l\'enllaç i el nom, i un `<div class="barra-accions">` amb els dos botons.',
    ],
    expected: 'Dins de la barra verd clar, dues caixes blanques: la primera amb l\'enllaç i el nom de la ruta, i la segona amb els dos botons.',
    focus: 'html',
    boxes: true,
    html: `<div class="barra">
  <a href="index.html">← Totes les rutes</a>
  <h1>Pica d'Estats</h1>
  <button type="button">Desa</button>
  <button type="button">Comparteix</button>
</div>`,
    css: `${BASE}

.barra {
  padding: 12px;
  background: #e8f3ee;
  border-radius: 8px;
}

.barra h1 {
  margin: 4px 0 0;
  font-size: 24px;
}

.barra-inici,
.barra-accions {
  margin-bottom: 8px;
  padding: 8px;
  background: #ffffff;
  border: 2px solid #c9d6cf;
}`,
    hint: [
      'Pregunta\'t què es mouria junt: si la barra s\'eixamplés, l\'enllaç i el nom es quedarien a l\'esquerra, i els dos botons se n\'anirien a la dreta.',
      'Són dos `<div>`: el primer s\'obre abans de l\'enllaç i es tanca després de l\'`<h1>`; el segon envolta els dos botons.',
    ],
    solution: {
      html: `<div class="barra">
  <div class="barra-inici">
    <a href="index.html">← Totes les rutes</a>
    <h1>Pica d'Estats</h1>
  </div>

  <div class="barra-accions">
    <button type="button">Desa</button>
    <button type="button">Comparteix</button>
  </div>
</div>`,
    },
    explanation: 'Cap dels dos grups es veu al disseny: no tenen vora ni fons propis. Però sense ells la barra tindria quatre fills i no hi hauria manera de dir «aquests dos a l\'esquerra i aquests dos a la dreta». Amb dos fills, la barra només ha de col·locar dues coses.',
    checks: [
      { label: 'La barra té dos fills', selector: '.barra > *', count: 2 },
      { label: 'El primer és `barra-inici` i conté l\'enllaç per tornar', selector: '.barra > .barra-inici:first-child > a' },
      { label: 'El nom de la ruta també és dins de `barra-inici`', selector: '.barra > .barra-inici > h1' },
      { label: 'El segon és `barra-accions` i conté els dos botons', selector: '.barra > .barra-accions:last-child > button', count: 2 },
    ],
  },
  {
    id: 'pagina-d-una-ruta',
    level: 3,
    title: "La pàgina d'una ruta",
    statement: [
      "Aquesta és la pàgina d'una ruta (`ruta.html`), amb tot el contingut i cap quadrat. Decideix-ne l'estructura i escriu-la.",
      "El disseny és aquest: a dalt, la capçalera, amb el logo i l'enllaç «Totes les rutes»; a baix, el peu, amb el copyright. Entremig hi ha dues coses **de costat**: a l'esquerra, la ruta (el nom, la foto i la descripció) i, a la dreta, una columna amb el títol «Altres rutes» i dues rutes recomanades.",
      'Els noms dels quadrats: `<header class="capcalera">`, `<main class="detall">` per a la ruta, `<aside class="altres">` per a la columna de la dreta i `<footer class="peu">`. Dins de l\'`<aside>`, cada ruta recomanada va en un `<article class="ruta">`. I pensa si en falta algun: una columna no pot tenir dues coses de costat. Si n\'hi cal un de nou, que es digui `cos`.',
    ],
    expected: 'La capçalera i el peu de color verd fosc. Entremig, una franja verd clar amb dues caixes blanques: la de la ruta i la de les altres rutes, que conté dues caixes de ratlles.',
    focus: 'html',
    boxes: true,
    html: `<a class="logo" href="index.html">▲ Camins</a>
<a href="index.html">Totes les rutes</a>

<h1>Pica d'Estats</h1>
<img class="foto" src="imatges/ruta-3.jpg" alt="Cims de color lila">
<p>18 km · 9 h · Difícil. El sostre de Catalunya, per a gent amb experiència.</p>

<h2>Altres rutes</h2>
<h3>Puigmal</h3>
<p class="dades">14 km · 6 h · Difícil</p>
<h3>Sant Jeroni</h3>
<p class="dades">11 km · 4 h 30 min · Mitjana</p>

<p>© 2025 Camins</p>`,
    css: `${BASE}

.capcalera,
.peu {
  padding: 12px;
  color: #ffffff;
  background: #1f6f54;
}

.capcalera a {
  color: #ffffff;
}

.peu p {
  margin: 0;
}

.cos {
  padding: 12px;
  background: #e8f3ee;
}

.detall,
.altres {
  margin-bottom: 8px;
  padding: 12px;
  background: #ffffff;
  border: 2px solid #c9d6cf;
}

.detall h1,
.altres h2 {
  margin: 0 0 8px;
}

.foto {
  width: 200px;
  border-radius: 6px;
}

.ruta {
  margin-top: 8px;
  padding: 8px;
  border: 2px dashed #c9d6cf;
}

.ruta h3,
.dades {
  margin: 0;
}`,
    hint: [
      'Comença pels quadrats grans. La pàgina, de lluny, és una columna de tres: la capçalera, la zona del mig i el peu. La zona del mig és el quadrat que falta.',
      'Dins del `<div class="cos">` hi van el `<main class="detall">` i l\'`<aside class="altres">`. I dins de l\'`<aside>`, el títol i dos `<article class="ruta">`, cadascun amb un `<h3>` i el seu paràgraf.',
    ],
    solution: {
      html: `<header class="capcalera">
  <a class="logo" href="index.html">▲ Camins</a>
  <a href="index.html">Totes les rutes</a>
</header>

<div class="cos">
  <main class="detall">
    <h1>Pica d'Estats</h1>
    <img class="foto" src="imatges/ruta-3.jpg" alt="Cims de color lila">
    <p>18 km · 9 h · Difícil. El sostre de Catalunya, per a gent amb experiència.</p>
  </main>

  <aside class="altres">
    <h2>Altres rutes</h2>

    <article class="ruta">
      <h3>Puigmal</h3>
      <p class="dades">14 km · 6 h · Difícil</p>
    </article>

    <article class="ruta">
      <h3>Sant Jeroni</h3>
      <p class="dades">11 km · 4 h 30 min · Mitjana</p>
    </article>
  </aside>
</div>

<footer class="peu">
  <p>© 2025 Camins</p>
</footer>`,
    },
    explanation: [
      "El quadrat `cos` no surt al disseny: surt del mètode. La pàgina és una columna (capçalera, zona del mig, peu) i la zona del mig és una fila (la ruta i les altres rutes). Dues direccions, dos quadrats.",
      'Aquesta és, peça per peça, l\'estructura de la pàgina d\'un vídeo: un contingut principal i, al costat, una columna de recomanats. Quan arribis al projecte final, el dibuix ja el tindràs fet.',
    ],
    checks: [
      { label: 'La pàgina té tres quadrats grans: la capçalera, el cos i el peu', selector: 'body > *', count: 3 },
      { label: 'La capçalera és un `<header class="capcalera">` amb els dos enllaços', selector: 'body > header.capcalera > a', count: 2 },
      { label: 'Hi ha un quadrat `cos` amb dos fills', selector: 'body > .cos > *', count: 2 },
      { label: 'La ruta és dins d\'un `<main class="detall">`, amb el nom, la foto i la descripció', selector: '.cos > main.detall > h1, .cos > main.detall > img.foto, .cos > main.detall > p', count: 3 },
      { label: 'La columna de la dreta és un `<aside class="altres">`, amb el seu títol', selector: '.cos > aside.altres > h2' },
      { label: 'Cada ruta recomanada és un `<article class="ruta">` amb el nom i les dades', selector: '.altres > article.ruta > h3 + .dades', count: 2 },
      { label: 'El copyright és dins d\'un `<footer class="peu">`', selector: 'body > footer.peu > p' },
    ],
  },
];
