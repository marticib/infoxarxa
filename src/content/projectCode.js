// Codi del projecte final: afegir JavaScript a la pàgina tipus YouTube que es
// va maquetar al RA1 (pàgina inicial + pàgina d'un vídeo).
//
// Les dues pàgines comparteixen un full d'estils (estils.css) i un fitxer de
// dades (dades.js). Cada pàgina té el seu propi JavaScript: inici.js i video.js.
//
// El JavaScript està dividit en peces per poder mostrar el projecte fase a
// fase: cada fase és la suma de les peces que ja s'han explicat. La portada i
// la unitat 11 fan servir aquest mateix codi.

const program = (...parts) => parts.join('\n\n');

// ---------------------------------------------------------------------------
// Les dades: dades.js
// ---------------------------------------------------------------------------

const VIDEOS = [
  { id: 1, titol: 'Aprèn CSS Grid en 12 minuts', canal: 'CodiClar', categoria: 'Programació', durada: '12:04', visualitzacions: '48 k', fa: 'fa 3 dies', color: 'taronja' },
  { id: 2, titol: 'JavaScript: el teu primer esdeveniment', canal: 'CodiClar', categoria: 'Programació', durada: '8:31', visualitzacions: '120 k', fa: 'fa 2 setmanes', color: 'groc' },
  { id: 3, titol: 'Concert acústic al terrat', canal: 'Les Notes', categoria: 'Música', durada: '34:10', visualitzacions: '9,2 k', fa: 'fa 1 mes', color: 'lila' },
  { id: 4, titol: 'Truita de patates sense secrets', canal: "Cuina de l'Àvia", categoria: 'Cuina', durada: '15:47', visualitzacions: '310 k', fa: 'fa 5 mesos', color: 'verd' },
  { id: 5, titol: 'Resum de la final de bàsquet', canal: 'EsportTotal', categoria: 'Esports', durada: '6:02', visualitzacions: '1,1 M', fa: 'fa 1 dia', color: 'blau' },
  { id: 6, titol: 'Flexbox explicat amb pizzes', canal: 'CodiClar', categoria: 'Programació', durada: '10:15', visualitzacions: '75 k', fa: 'fa 1 any', color: 'vermell' },
  { id: 7, titol: 'Pa de pessic de llimona', canal: "Cuina de l'Àvia", categoria: 'Cuina', durada: '9:20', visualitzacions: '64 k', fa: 'fa 3 setmanes', color: 'rosa' },
  { id: 8, titol: 'Piano tranquil per estudiar', canal: 'Les Notes', categoria: 'Música', durada: '1:02:33', visualitzacions: '2,4 M', fa: 'fa 2 anys', color: 'turquesa' },
];

const quote = (text) => JSON.stringify(text);

/** dades.js: l'array de vídeos que comparteixen les dues pàgines. */
export const DATA_JS = `// Els vídeos de la plataforma. Les dues pàgines fan servir aquest fitxer.
const videos = [
${VIDEOS.map(
  (video) =>
    `  { id: ${video.id}, titol: ${quote(video.titol)}, canal: ${quote(video.canal)}, categoria: ${quote(video.categoria)},\n` +
    `    durada: ${quote(video.durada)}, visualitzacions: ${quote(video.visualitzacions)}, fa: ${quote(video.fa)}, color: ${quote(video.color)} }`
).join(',\n')}
];`;

/** Un tros de dades.js, per explicar-ne l'estructura sense repetir-lo sencer. */
export const DATA_JS_SAMPLE = `const videos = [
  {
    id: 1,
    titol: "Aprèn CSS Grid en 12 minuts",
    canal: "CodiClar",
    categoria: "Programació",
    durada: "12:04",
    visualitzacions: "48 k",
    fa: "fa 3 dies",
    color: "taronja"
  },
  {
    id: 2,
    titol: "JavaScript: el teu primer esdeveniment",
    canal: "CodiClar",
    categoria: "Programació",
    durada: "8:31",
    visualitzacions: "120 k",
    fa: "fa 2 setmanes",
    color: "groc"
  }
  // …i així amb tots els vídeos de la teva pàgina
];`;

// ---------------------------------------------------------------------------
// HTML
// ---------------------------------------------------------------------------

const staticCard = (video) => `      <article class="video">
        <a href="video.html">
          <div class="miniatura ${video.color}"><span class="durada">${video.durada}</span></div>
          <h2>${video.titol}</h2>
        </a>
        <p class="canal">${video.canal}</p>
        <p class="dades">${video.visualitzacions} visualitzacions · ${video.fa}</p>
      </article>`;

const homeHtml = (cards, extraHeader = '') => `<header class="capcalera">
  <button type="button" id="boto-menu" class="boto-icona" aria-label="Menú" aria-expanded="false" aria-controls="menu-lateral">☰</button>
  <a class="logo" href="index.html"><span>▶</span> ClasseTube</a>
  <form id="cercador" class="cercador" role="search">
    <input type="search" id="text-cerca" placeholder="Cerca" aria-label="Cerca vídeos" autocomplete="off">
    <button type="submit">Cerca</button>
  </form>${extraHeader}
</header>

<div class="cos">
  <nav id="menu-lateral" class="menu" aria-label="Seccions">
    <a href="index.html" aria-current="page">Inici</a>
    <a href="#">Subscripcions</a>
    <a href="#">Historial</a>
    <a href="#">Vídeos que m'agraden</a>
  </nav>

  <main class="contingut">
    <div class="xips" role="group" aria-label="Filtra per categoria">
      <button type="button" class="xip" aria-pressed="true">Tot</button>
      <button type="button" class="xip" aria-pressed="false">Programació</button>
      <button type="button" class="xip" aria-pressed="false">Música</button>
      <button type="button" class="xip" aria-pressed="false">Cuina</button>
      <button type="button" class="xip" aria-pressed="false">Esports</button>
    </div>

    <p id="resum" class="resum"></p>

    <div id="graella" class="graella">${cards}</div>

    <p id="sense-resultats" class="buit" hidden>No hem trobat cap vídeo.</p>
  </main>
</div>`;

/** La pàgina inicial tal com surt del RA1: les targetes, escrites a mà. */
export const HOME_HTML_STATIC = homeHtml(`\n${VIDEOS.slice(0, 4).map(staticCard).join('\n')}\n    `);

/** La pàgina inicial preparada per a JavaScript: la graella és buida. */
export const HOME_HTML = homeHtml('');

/** Com es veu l'HTML estàtic als apunts (dues targetes n'hi ha prou per entendre'l). */
export const HOME_HTML_EXCERPT = `<div id="graella" class="graella">
  <article class="video">
    <a href="video.html">
      <div class="miniatura taronja"><span class="durada">12:04</span></div>
      <h2>Aprèn CSS Grid en 12 minuts</h2>
    </a>
    <p class="canal">CodiClar</p>
    <p class="dades">48 k visualitzacions · fa 3 dies</p>
  </article>

  <article class="video">
    <a href="video.html">
      <div class="miniatura groc"><span class="durada">8:31</span></div>
      <h2>JavaScript: el teu primer esdeveniment</h2>
    </a>
    <p class="canal">CodiClar</p>
    <p class="dades">120 k visualitzacions · fa 2 setmanes</p>
  </article>

  <!-- …i sis targetes més, totes escrites a mà -->
</div>`;

const videoHtml = (extraHeader = '') => `<header class="capcalera">
  <a class="logo" href="index.html"><span>▶</span> ClasseTube</a>${extraHeader}
</header>

<main class="pagina-video">
  <div class="principal">
    <div id="reproductor" class="reproductor taronja" role="img" aria-label="Reproductor del vídeo"></div>

    <h1 id="titol-video">Aprèn CSS Grid en 12 minuts</h1>

    <div class="barra-canal">
      <div>
        <p id="nom-canal" class="nom-canal">CodiClar</p>
        <p class="dades"><span id="subscriptors">15300</span> subscriptors</p>
      </div>
      <button type="button" id="boto-subscriu" class="boto-subscriu" aria-pressed="false">Subscriu-te</button>
    </div>

    <div class="valoracio">
      <button type="button" id="boto-agrada" aria-pressed="false">M'agrada · <span id="total-agrada">1240</span></button>
      <button type="button" id="boto-no-agrada" aria-pressed="false">No m'agrada</button>
    </div>

    <div class="descripcio">
      <p id="dades-video" class="dades">48 k visualitzacions · fa 3 dies</p>
      <p id="text-descripcio" class="text-descripcio retallat">CSS Grid sembla complicat fins que algú te l'explica amb calma. En aquest vídeo muntem una pàgina sencera, pas a pas: files, columnes, espais i àrees amb nom. Al final trobaràs tres exercicis per practicar pel teu compte i un resum de les propietats que fem servir més sovint.</p>
      <button type="button" id="boto-descripcio" class="boto-text" aria-expanded="false" aria-controls="text-descripcio">Mostra'n més</button>
    </div>

    <section class="comentaris" aria-labelledby="titol-comentaris">
      <h2 id="titol-comentaris">Comentaris</h2>

      <form id="form-comentari" novalidate>
        <label for="text-comentari">Afegeix un comentari</label>
        <input type="text" id="text-comentari" autocomplete="off" aria-describedby="error-comentari">
        <p id="error-comentari" class="error" role="alert"></p>
        <div class="accions">
          <button type="button" id="boto-cancela" class="boto-text">Cancel·la</button>
          <button type="submit" id="boto-comenta" class="boto-principal" disabled>Comenta</button>
        </div>
      </form>

      <ul id="llista-comentaris"></ul>
    </section>
  </div>

  <aside class="recomanats" aria-labelledby="titol-recomanats">
    <h2 id="titol-recomanats">A continuació</h2>
    <div id="llista-recomanats"></div>
  </aside>
</main>`;

/** La pàgina del vídeo, preparada per a JavaScript. */
export const VIDEO_HTML = videoHtml();

const THEME_BUTTON = `\n  <button type="button" id="boto-tema" class="boto-tema" aria-pressed="false">Mode fosc</button>`;

/** Versions amb el botó de mode fosc (ampliacions). */
export const HOME_HTML_FULL = homeHtml('', THEME_BUTTON).replace(
  '<p id="sense-resultats" class="buit" hidden>No hem trobat cap vídeo.</p>',
  `<div id="sense-resultats" class="buit" hidden>
      <p>No hem trobat cap vídeo.</p>
      <button type="button" id="treu-filtres" class="boto-principal">Treu els filtres</button>
    </div>`
);
export const VIDEO_HTML_FULL = videoHtml(THEME_BUTTON);

const indent = (text, spaces) =>
  text
    .split('\n')
    .map((line) => (line === '' ? line : ' '.repeat(spaces) + line))
    .join('\n');

const document_ = (title, scripts, body) => `<!DOCTYPE html>
<html lang="ca">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${title}</title>
    <link rel="stylesheet" href="estils.css">
${scripts.map((file) => `    <script src="${file}" defer></script>`).join('\n')}
  </head>
  <body>
${indent(body, 4)}
  </body>
</html>`;

/** Els dos fitxers HTML sencers, per copiar-los a un projecte de veritat. */
export const INDEX_HTML_FILE = document_('ClasseTube', ['dades.js', 'inici.js'], HOME_HTML);
export const VIDEO_HTML_FILE = document_('Aprèn CSS Grid en 12 minuts · ClasseTube', ['dades.js', 'video.js'], VIDEO_HTML);

/** Només el <head>, per explicar com es connecten els fitxers. */
export const HEAD_INDEX = `<head>
  <meta charset="UTF-8">
  <title>ClasseTube</title>
  <link rel="stylesheet" href="estils.css">
  <script src="dades.js" defer></script>
  <script src="inici.js" defer></script>
</head>`;

export const HEAD_VIDEO = `<head>
  <meta charset="UTF-8">
  <title>Aprèn CSS Grid en 12 minuts · ClasseTube</title>
  <link rel="stylesheet" href="estils.css">
  <script src="dades.js" defer></script>
  <script src="video.js" defer></script>
</head>`;

// ---------------------------------------------------------------------------
// CSS: un sol full d'estils per a les dues pàgines
// ---------------------------------------------------------------------------

export const PROJECT_CSS = `* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: system-ui, sans-serif;
  color: #0f0f0f;
  background: #ffffff;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font: inherit;
  color: inherit;
  cursor: pointer;
}

:focus-visible {
  outline: 3px solid #065fd4;
  outline-offset: 2px;
}

/* ---------- Capçalera ---------- */

.capcalera {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 12px;
  padding: 10px 16px;
  border-bottom: 1px solid #e5e5e5;
}

.logo {
  font-size: 1.1rem;
  font-weight: 700;
  white-space: nowrap;
}

.logo span {
  color: #c81e1e;
}

.boto-icona {
  flex: none;
  width: 40px;
  height: 40px;
  font-size: 1.2rem;
  background: none;
  border: 0;
  border-radius: 50%;
}

.boto-icona:hover {
  background: #f0f0f0;
}

.cercador {
  display: flex;
  flex: 1 1 180px;
  min-width: 0;
  max-width: 420px;
  margin-left: auto;
}

.cercador input {
  flex: 1;
  min-width: 0;
  padding: 8px 14px;
  font: inherit;
  color: inherit;
  background: #ffffff;
  border: 1px solid #909090;
  border-right: 0;
  border-radius: 20px 0 0 20px;
}

.cercador button {
  padding: 8px 14px;
  background: #f0f0f0;
  border: 1px solid #909090;
  border-radius: 0 20px 20px 0;
}

/* ---------- Menú lateral ---------- */

.menu {
  display: none;
  flex-direction: column;
  gap: 4px;
  padding: 12px;
  border-bottom: 1px solid #e5e5e5;
}

/* JavaScript posa i treu aquesta classe del <body> */
body.menu-obert .menu {
  display: flex;
}

.menu a {
  padding: 8px 12px;
  border-radius: 8px;
}

.menu a:hover,
.menu a[aria-current="page"] {
  background: #f0f0f0;
}

.menu a[aria-current="page"] {
  font-weight: 700;
}

@media (min-width: 600px) {
  body.menu-obert .cos {
    display: grid;
    grid-template-columns: 190px 1fr;
  }

  .menu {
    border-bottom: 0;
  }
}

/* ---------- Pàgina inicial ---------- */

.contingut {
  min-width: 0;
  padding: 16px;
}

.xips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.xip {
  padding: 6px 12px;
  background: #f0f0f0;
  border: 0;
  border-radius: 8px;
}

.xip[aria-pressed="true"] {
  color: #ffffff;
  background: #0f0f0f;
}

.resum {
  min-height: 1.5em;
  margin: 12px 0;
  font-size: 0.9rem;
  color: #606060;
}

.graella {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  gap: 20px 14px;
}

.video h2 {
  margin: 8px 0 2px;
  font-size: 1rem;
  line-height: 1.3;
}

.canal,
.dades {
  margin: 0;
  font-size: 0.85rem;
  color: #606060;
}

.miniatura {
  position: relative;
  display: grid;
  place-items: center;
  aspect-ratio: 16 / 9;
  border-radius: 10px;
}

.miniatura::before,
.reproductor::before {
  content: "▶";
  font-size: 1.6rem;
  color: #ffffff;
  opacity: 0.85;
}

.durada {
  position: absolute;
  right: 6px;
  bottom: 6px;
  padding: 1px 5px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #ffffff;
  background: #0f0f0f;
  border-radius: 4px;
}

/* Al teu projecte, les miniatures són imatges. Aquí són blocs de color. */
.taronja { background: #c2410c; }
.groc { background: #a16207; }
.lila { background: #7e22ce; }
.verd { background: #15803d; }
.blau { background: #1d4ed8; }
.vermell { background: #b91c1c; }
.rosa { background: #be185d; }
.turquesa { background: #0f766e; }

.buit {
  margin: 0;
  padding: 32px 0;
  text-align: center;
  color: #606060;
}

/* ---------- Pàgina del vídeo ---------- */

.pagina-video {
  display: grid;
  gap: 24px;
  padding: 16px;
}

@media (min-width: 720px) {
  .pagina-video {
    grid-template-columns: 2fr 1fr;
  }
}

.principal {
  min-width: 0;
}

.reproductor {
  display: grid;
  place-items: center;
  aspect-ratio: 16 / 9;
  border-radius: 12px;
}

.reproductor::before {
  font-size: 3rem;
}

.principal h1 {
  margin: 12px 0 8px;
  font-size: 1.25rem;
  line-height: 1.3;
}

.barra-canal {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.nom-canal {
  margin: 0;
  font-weight: 700;
}

.boto-subscriu {
  padding: 8px 16px;
  font-weight: 600;
  color: #ffffff;
  background: #0f0f0f;
  border: 0;
  border-radius: 20px;
}

.boto-subscriu[aria-pressed="true"] {
  color: #0f0f0f;
  background: #e5e5e5;
}

.valoracio {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 12px 0;
}

.valoracio button {
  padding: 8px 14px;
  background: #f0f0f0;
  border: 0;
  border-radius: 20px;
}

.valoracio button[aria-pressed="true"] {
  color: #ffffff;
  background: #0f0f0f;
}

.descripcio {
  padding: 12px;
  background: #f0f0f0;
  border-radius: 12px;
}

.text-descripcio {
  margin: 6px 0;
  line-height: 1.5;
}

/* JavaScript posa i treu aquesta classe: dues línies i prou */
.text-descripcio.retallat {
  max-height: 3em;
  overflow: hidden;
}

.boto-text {
  padding: 6px 0;
  font-weight: 600;
  background: none;
  border: 0;
}

.boto-principal {
  padding: 8px 16px;
  font-weight: 600;
  color: #ffffff;
  background: #065fd4;
  border: 0;
  border-radius: 20px;
}

.boto-principal:disabled {
  color: #606060;
  background: #e5e5e5;
  cursor: not-allowed;
}

/* ---------- Comentaris ---------- */

.comentaris h2,
.recomanats h2 {
  margin: 20px 0 12px;
  font-size: 1.1rem;
}

.recomanats h2 {
  margin-top: 0;
}

.comentaris label {
  display: block;
  margin-bottom: 4px;
  font-weight: 600;
}

#text-comentari {
  width: 100%;
  padding: 8px 0;
  font: inherit;
  color: inherit;
  background: none;
  border: 0;
  border-bottom: 1px solid #909090;
}

#text-comentari[aria-invalid="true"] {
  border-bottom: 2px solid #b3261e;
}

.error {
  min-height: 1.5em;
  margin: 4px 0;
  font-weight: 600;
  color: #b3261e;
}

.accions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
}

#llista-comentaris {
  margin: 16px 0 0;
  padding: 0;
  list-style: none;
}

.comentari {
  padding: 10px 0;
  border-top: 1px solid #e5e5e5;
}

.comentari .autor {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 700;
}

.comentari .text {
  margin: 2px 0 0;
}

/* ---------- Vídeos recomanats ---------- */

.recomanat {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 10px;
  margin-bottom: 12px;
}

.recomanat h3 {
  margin: 0 0 2px;
  font-size: 0.9rem;
  line-height: 1.3;
}

.recomanat .miniatura::before {
  font-size: 1.1rem;
}`;

/** Estils de les ampliacions: mode fosc, botó d'eliminar un comentari… */
export const PROJECT_CSS_FULL = `${PROJECT_CSS}

/* ---------- Ampliacions ---------- */

.boto-tema {
  flex: none;
  padding: 6px 12px;
  font-size: 0.9rem;
  background: #f0f0f0;
  border: 0;
  border-radius: 20px;
}

.capcalera .logo + .boto-tema {
  margin-left: auto;
}

.boto-tema[aria-pressed="true"] {
  color: #ffffff;
  background: #0f0f0f;
}

.buit p {
  margin: 0 0 12px;
}

.comentari .boto-text {
  padding: 4px 0 0;
  font-size: 0.9rem;
  color: #b3261e;
}

/* Mode fosc: només canviem colors */
body.fosc {
  color: #f1f1f1;
  background: #0f0f0f;
}

body.fosc .capcalera,
body.fosc .menu,
body.fosc .comentari {
  border-color: #3f3f3f;
}

body.fosc .canal,
body.fosc .dades,
body.fosc .resum,
body.fosc .buit {
  color: #aaaaaa;
}

body.fosc .logo span {
  color: #ff6b6b;
}

body.fosc .cercador input {
  background: #121212;
  border-color: #717171;
}

body.fosc .cercador button,
body.fosc .xip,
body.fosc .valoracio button,
body.fosc .descripcio,
body.fosc .boto-tema,
body.fosc .menu a:hover,
body.fosc .menu a[aria-current="page"],
body.fosc .boto-icona:hover {
  background: #272727;
}

body.fosc .cercador button {
  border-color: #717171;
}

body.fosc .xip[aria-pressed="true"],
body.fosc .valoracio button[aria-pressed="true"],
body.fosc .boto-tema[aria-pressed="true"],
body.fosc .boto-subscriu {
  color: #0f0f0f;
  background: #f1f1f1;
}

body.fosc .boto-subscriu[aria-pressed="true"] {
  color: #f1f1f1;
  background: #3f3f3f;
}

body.fosc #text-comentari {
  border-bottom-color: #717171;
}

body.fosc .error,
body.fosc .comentari .boto-text {
  color: #ff9a8f;
}

body.fosc .boto-principal {
  color: #0f0f0f;
  background: #6ea8ff;
}

body.fosc .boto-principal:disabled {
  color: #aaaaaa;
  background: #272727;
}`;

// ---------------------------------------------------------------------------
// Pàgina inicial: peces d'inici.js
// ---------------------------------------------------------------------------

const DATA_HEADER = '// ---------- 3. Funcions que treballen amb les dades ----------';
const PAGE_HEADER = '// ---------- 4. Funcions que pinten la pàgina ----------';
const EVENTS_HEADER = '// ---------- 5. Esdeveniments ----------';
const ELEMENTS_HEADER = '// ---------- 2. Elements de la pàgina ----------';

export const HOME_STATE_SEARCH = `// ---------- 1. Estat: les dades de la pàgina ----------
let textCerca = "";`;

export const HOME_STATE = `${HOME_STATE_SEARCH}
let categoriaActual = "Tot";`;

export const HOME_ELEMENTS_MENU = `${ELEMENTS_HEADER}
const botoMenu = document.querySelector("#boto-menu");`;

export const HOME_ELEMENTS_GRID = `const graella = document.querySelector("#graella");`;

export const HOME_ELEMENTS_SEARCH = `const missatgeBuit = document.querySelector("#sense-resultats");
const resum = document.querySelector("#resum");
const cercador = document.querySelector("#cercador");
const inputCerca = document.querySelector("#text-cerca");`;

export const HOME_ELEMENTS_CHIPS = `const xips = document.querySelectorAll(".xip");`;

export const FN_MATCH = `function coincideixAmbCerca(video) {
  const titol = video.titol.toLowerCase();
  const text = textCerca.toLowerCase();
  return titol.includes(text);
}`;

export const FN_CATEGORY = `function esDeLaCategoria(video) {
  return categoriaActual === "Tot" || video.categoria === categoriaActual;
}`;

// Fase 4: només la cerca.
export const FN_VISIBLE_V1 = `function obtenirVideosVisibles() {
  const visibles = [];
  for (const video of videos) {
    if (coincideixAmbCerca(video)) {
      visibles.push(video);
    }
  }
  return visibles;
}`;

// Fase 5: cerca i categoria alhora.
export const FN_VISIBLE_V2 = `function obtenirVideosVisibles() {
  const visibles = [];
  for (const video of videos) {
    if (coincideixAmbCerca(video) && esDeLaCategoria(video)) {
      visibles.push(video);
    }
  }
  return visibles;
}`;

export const FN_CARD = `function crearTargetaVideo(video) {
  const targeta = document.createElement("article");
  targeta.classList.add("video");

  const enllac = document.createElement("a");
  enllac.setAttribute("href", "video.html");

  const miniatura = document.createElement("div");
  miniatura.classList.add("miniatura");
  miniatura.classList.add(video.color);

  const durada = document.createElement("span");
  durada.classList.add("durada");
  durada.textContent = video.durada;
  miniatura.append(durada);

  const titol = document.createElement("h2");
  titol.textContent = video.titol;

  enllac.append(miniatura, titol);

  const canal = document.createElement("p");
  canal.classList.add("canal");
  canal.textContent = video.canal;

  const dades = document.createElement("p");
  dades.classList.add("dades");
  dades.textContent = \`\${video.visualitzacions} visualitzacions · \${video.fa}\`;

  targeta.append(enllac, canal, dades);
  return targeta;
}`;

// Fase 3: tots els vídeos.
export const HOME_RENDER_V1 = `function renderitzar() {
  graella.innerHTML = "";
  for (const video of videos) {
    graella.append(crearTargetaVideo(video));
  }
}`;

// Fase 4: només els visibles, amb estat buit i resum.
export const HOME_RENDER_V2 = `function renderitzar() {
  const visibles = obtenirVideosVisibles();

  graella.innerHTML = "";
  for (const video of visibles) {
    graella.append(crearTargetaVideo(video));
  }
  missatgeBuit.hidden = visibles.length > 0;

  if (visibles.length === 1) {
    resum.textContent = "1 vídeo";
  } else {
    resum.textContent = \`\${visibles.length} vídeos\`;
  }
}`;

// Fase 5: a més, marca el xip actiu.
export const HOME_RENDER_V3 = HOME_RENDER_V2.replace(
  /\n}$/,
  `

  for (const xip of xips) {
    xip.setAttribute("aria-pressed", String(xip.textContent === categoriaActual));
  }
}`
);

export const EVENT_MENU = `botoMenu.addEventListener("click", () => {
  document.body.classList.toggle("menu-obert");

  const obert = document.body.classList.contains("menu-obert");
  botoMenu.setAttribute("aria-expanded", String(obert));
});`;

export const EVENT_SEARCH = `function aplicarCerca() {
  textCerca = inputCerca.value.trim();
  renderitzar();
}

cercador.addEventListener("submit", (event) => {
  event.preventDefault();
  aplicarCerca();
});

inputCerca.addEventListener("input", aplicarCerca);`;

export const EVENT_CHIPS = `for (const xip of xips) {
  xip.addEventListener("click", () => {
    categoriaActual = xip.textContent;
    renderitzar();
  });
}`;

export const START = `// ---------- Arrencada ----------
renderitzar();`;

/** inici.js a cada fase. */
export const HOME_PHASE_JS = {
  connect: `console.log("inici.js connectat");
console.log(\`Hi ha \${videos.length} vídeos a dades.js\`);`,

  menu: program(HOME_ELEMENTS_MENU, EVENTS_HEADER, EVENT_MENU),

  render: program(
    `${HOME_ELEMENTS_MENU}\n${HOME_ELEMENTS_GRID}`,
    PAGE_HEADER,
    FN_CARD,
    HOME_RENDER_V1,
    EVENTS_HEADER,
    EVENT_MENU,
    START
  ),

  search: program(
    HOME_STATE_SEARCH,
    `${HOME_ELEMENTS_MENU}\n${HOME_ELEMENTS_GRID}\n${HOME_ELEMENTS_SEARCH}`,
    DATA_HEADER,
    FN_MATCH,
    FN_VISIBLE_V1,
    PAGE_HEADER,
    FN_CARD,
    HOME_RENDER_V2,
    EVENTS_HEADER,
    EVENT_MENU,
    EVENT_SEARCH,
    START
  ),

  filter: program(
    HOME_STATE,
    `${HOME_ELEMENTS_MENU}\n${HOME_ELEMENTS_GRID}\n${HOME_ELEMENTS_SEARCH}\n${HOME_ELEMENTS_CHIPS}`,
    DATA_HEADER,
    FN_MATCH,
    FN_CATEGORY,
    FN_VISIBLE_V2,
    PAGE_HEADER,
    FN_CARD,
    HOME_RENDER_V3,
    EVENTS_HEADER,
    EVENT_MENU,
    EVENT_SEARCH,
    EVENT_CHIPS,
    START
  ),
};

/** inici.js complet (totes les funcionalitats mínimes de la pàgina inicial). */
export const HOME_JS = HOME_PHASE_JS.filter;

// ---------------------------------------------------------------------------
// Pàgina del vídeo: peces de video.js
// ---------------------------------------------------------------------------

export const VIDEO_STATE_RATING = `// ---------- 1. Estat: les dades de la pàgina ----------
const AGRADA_INICIALS = 1240;

let agrada = false;
let noAgrada = false;`;

// Fase 9: la pàgina ha de saber quin vídeo mostra, per no recomanar-lo.
export const VIDEO_STATE_RELATED = VIDEO_STATE_RATING.replace(
  'const AGRADA_INICIALS',
  'const ID_VIDEO = 1;\nconst AGRADA_INICIALS'
);

export const VIDEO_STATE_SUBSCRIBE = `const SUBSCRIPTORS_INICIALS = 15300;

let subscrit = false;
let descripcioOberta = false;`;

export const VIDEO_STATE_COMMENTS = `let comentaris = [
  { id: 1, autor: "Laia", text: "Per fi he entès les columnes. Gràcies!" },
  { id: 2, autor: "Pol", text: "El truc del minut 7 val or." }
];
let seguentId = 3;`;

export const VIDEO_ELEMENTS_RATING = `${ELEMENTS_HEADER}
const botoAgrada = document.querySelector("#boto-agrada");
const botoNoAgrada = document.querySelector("#boto-no-agrada");
const totalAgrada = document.querySelector("#total-agrada");`;

export const VIDEO_ELEMENTS_SUBSCRIBE = `const botoSubscriu = document.querySelector("#boto-subscriu");
const subscriptors = document.querySelector("#subscriptors");
const textDescripcio = document.querySelector("#text-descripcio");
const botoDescripcio = document.querySelector("#boto-descripcio");`;

export const VIDEO_ELEMENTS_COMMENTS = `const titolComentaris = document.querySelector("#titol-comentaris");
const formComentari = document.querySelector("#form-comentari");
const inputComentari = document.querySelector("#text-comentari");
const errorComentari = document.querySelector("#error-comentari");
const botoComenta = document.querySelector("#boto-comenta");
const botoCancela = document.querySelector("#boto-cancela");
const llistaComentaris = document.querySelector("#llista-comentaris");`;

export const VIDEO_ELEMENTS_RELATED = `const llistaRecomanats = document.querySelector("#llista-recomanats");`;

export const FN_RATING = `function canviarAgrada() {
  agrada = !agrada;
  if (agrada) {
    noAgrada = false;
  }
}

function canviarNoAgrada() {
  noAgrada = !noAgrada;
  if (noAgrada) {
    agrada = false;
  }
}

function comptarAgrada() {
  if (agrada) {
    return AGRADA_INICIALS + 1;
  }
  return AGRADA_INICIALS;
}`;

export const FN_SUBSCRIBERS = `function comptarSubscriptors() {
  if (subscrit) {
    return SUBSCRIPTORS_INICIALS + 1;
  }
  return SUBSCRIPTORS_INICIALS;
}`;

export const FN_VALIDATE = `function validarComentari(text) {
  if (text === "") {
    return "Escriu un comentari abans d'enviar-lo.";
  }
  if (text.length > 200) {
    return "El comentari és massa llarg (màxim 200 caràcters).";
  }
  return "";
}`;

export const FN_ADD_COMMENT = `function afegirComentari(text) {
  const comentari = { id: seguentId, autor: "Tu", text: text };
  seguentId++;
  comentaris.unshift(comentari);
}`;

export const FN_RELATED = `function obtenirRecomanats() {
  const recomanats = [];
  for (const video of videos) {
    if (video.id !== ID_VIDEO) {
      recomanats.push(video);
    }
  }
  return recomanats;
}`;

export const RENDER_RATING = `function renderitzarValoracio() {
  botoAgrada.setAttribute("aria-pressed", String(agrada));
  botoNoAgrada.setAttribute("aria-pressed", String(noAgrada));
  totalAgrada.textContent = comptarAgrada();
}`;

export const RENDER_SUBSCRIBE = `function renderitzarSubscripcio() {
  if (subscrit) {
    botoSubscriu.textContent = "Subscrit";
  } else {
    botoSubscriu.textContent = "Subscriu-te";
  }
  botoSubscriu.setAttribute("aria-pressed", String(subscrit));
  subscriptors.textContent = comptarSubscriptors();
}`;

export const RENDER_DESCRIPTION = `function renderitzarDescripcio() {
  if (descripcioOberta) {
    textDescripcio.classList.remove("retallat");
    botoDescripcio.textContent = "Mostra'n menys";
  } else {
    textDescripcio.classList.add("retallat");
    botoDescripcio.textContent = "Mostra'n més";
  }
  botoDescripcio.setAttribute("aria-expanded", String(descripcioOberta));
}`;

export const FN_COMMENT_ELEMENT = `function crearElementComentari(comentari) {
  const element = document.createElement("li");
  element.classList.add("comentari");

  const autor = document.createElement("p");
  autor.classList.add("autor");
  autor.textContent = comentari.autor;

  const text = document.createElement("p");
  text.classList.add("text");
  text.textContent = comentari.text;

  element.append(autor, text);
  return element;
}`;

export const RENDER_COMMENTS = `function renderitzarComentaris() {
  llistaComentaris.innerHTML = "";
  for (const comentari of comentaris) {
    llistaComentaris.append(crearElementComentari(comentari));
  }

  if (comentaris.length === 1) {
    titolComentaris.textContent = "1 comentari";
  } else {
    titolComentaris.textContent = \`\${comentaris.length} comentaris\`;
  }
}`;

export const FN_RELATED_ELEMENT = `function crearElementRecomanat(video) {
  const enllac = document.createElement("a");
  enllac.classList.add("recomanat");
  enllac.setAttribute("href", "video.html");

  const miniatura = document.createElement("div");
  miniatura.classList.add("miniatura");
  miniatura.classList.add(video.color);

  const informacio = document.createElement("div");

  const titol = document.createElement("h3");
  titol.textContent = video.titol;

  const canal = document.createElement("p");
  canal.classList.add("canal");
  canal.textContent = video.canal;

  informacio.append(titol, canal);
  enllac.append(miniatura, informacio);
  return enllac;
}`;

export const RENDER_RELATED = `function renderitzarRecomanats() {
  llistaRecomanats.innerHTML = "";
  for (const video of obtenirRecomanats()) {
    llistaRecomanats.append(crearElementRecomanat(video));
  }
}`;

export const EVENT_RATING = `botoAgrada.addEventListener("click", () => {
  canviarAgrada();
  renderitzarValoracio();
});

botoNoAgrada.addEventListener("click", () => {
  canviarNoAgrada();
  renderitzarValoracio();
});`;

export const EVENT_SUBSCRIBE = `botoSubscriu.addEventListener("click", () => {
  subscrit = !subscrit;
  renderitzarSubscripcio();
});

botoDescripcio.addEventListener("click", () => {
  descripcioOberta = !descripcioOberta;
  renderitzarDescripcio();
});`;

export const FN_CLEAR_FORM = `function netejarFormulari() {
  inputComentari.value = "";
  inputComentari.removeAttribute("aria-invalid");
  errorComentari.textContent = "";
  botoComenta.disabled = true;
}`;

export const EVENT_COMMENTS = `inputComentari.addEventListener("input", () => {
  botoComenta.disabled = inputComentari.value.trim() === "";
});

formComentari.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = inputComentari.value.trim();
  const error = validarComentari(text);

  if (error !== "") {
    errorComentari.textContent = error;
    inputComentari.setAttribute("aria-invalid", "true");
    inputComentari.focus();
    return;
  }

  afegirComentari(text);
  netejarFormulari();
  inputComentari.focus();
  renderitzarComentaris();
});

botoCancela.addEventListener("click", netejarFormulari);`;

const START_RATING = `// ---------- Arrencada ----------
renderitzarValoracio();`;

const START_SUBSCRIBE = `${START_RATING}
renderitzarSubscripcio();
renderitzarDescripcio();`;

const START_COMMENTS = `${START_SUBSCRIBE}
renderitzarComentaris();`;

export const VIDEO_START = `${START_COMMENTS}
renderitzarRecomanats();`;

/** video.js a cada fase. */
export const VIDEO_PHASE_JS = {
  rating: program(
    VIDEO_STATE_RATING,
    VIDEO_ELEMENTS_RATING,
    DATA_HEADER,
    FN_RATING,
    PAGE_HEADER,
    RENDER_RATING,
    EVENTS_HEADER,
    EVENT_RATING,
    START_RATING
  ),

  subscribe: program(
    `${VIDEO_STATE_RATING}\n\n${VIDEO_STATE_SUBSCRIBE}`,
    `${VIDEO_ELEMENTS_RATING}\n${VIDEO_ELEMENTS_SUBSCRIBE}`,
    DATA_HEADER,
    FN_RATING,
    FN_SUBSCRIBERS,
    PAGE_HEADER,
    RENDER_RATING,
    RENDER_SUBSCRIBE,
    RENDER_DESCRIPTION,
    EVENTS_HEADER,
    EVENT_RATING,
    EVENT_SUBSCRIBE,
    START_SUBSCRIBE
  ),

  comments: program(
    `${VIDEO_STATE_RATING}\n\n${VIDEO_STATE_SUBSCRIBE}\n\n${VIDEO_STATE_COMMENTS}`,
    `${VIDEO_ELEMENTS_RATING}\n${VIDEO_ELEMENTS_SUBSCRIBE}\n${VIDEO_ELEMENTS_COMMENTS}`,
    DATA_HEADER,
    FN_RATING,
    FN_SUBSCRIBERS,
    FN_VALIDATE,
    FN_ADD_COMMENT,
    PAGE_HEADER,
    RENDER_RATING,
    RENDER_SUBSCRIBE,
    RENDER_DESCRIPTION,
    FN_COMMENT_ELEMENT,
    RENDER_COMMENTS,
    FN_CLEAR_FORM,
    EVENTS_HEADER,
    EVENT_RATING,
    EVENT_SUBSCRIBE,
    EVENT_COMMENTS,
    START_COMMENTS
  ),

  related: program(
    `${VIDEO_STATE_RELATED}\n\n${VIDEO_STATE_SUBSCRIBE}\n\n${VIDEO_STATE_COMMENTS}`,
    `${VIDEO_ELEMENTS_RATING}\n${VIDEO_ELEMENTS_SUBSCRIBE}\n${VIDEO_ELEMENTS_COMMENTS}\n${VIDEO_ELEMENTS_RELATED}`,
    DATA_HEADER,
    FN_RATING,
    FN_SUBSCRIBERS,
    FN_VALIDATE,
    FN_ADD_COMMENT,
    FN_RELATED,
    PAGE_HEADER,
    RENDER_RATING,
    RENDER_SUBSCRIBE,
    RENDER_DESCRIPTION,
    FN_COMMENT_ELEMENT,
    RENDER_COMMENTS,
    FN_RELATED_ELEMENT,
    RENDER_RELATED,
    FN_CLEAR_FORM,
    EVENTS_HEADER,
    EVENT_RATING,
    EVENT_SUBSCRIBE,
    EVENT_COMMENTS,
    VIDEO_START
  ),
};

/** video.js complet (totes les funcionalitats mínimes de la pàgina del vídeo). */
export const VIDEO_JS = VIDEO_PHASE_JS.related;

// ---------------------------------------------------------------------------
// Ampliacions
// ---------------------------------------------------------------------------

/** Enllaçar les dues pàgines: quin vídeo s'ha d'obrir. */
export const LINK_CARD = `  const enllac = document.createElement("a");
  enllac.setAttribute("href", \`video.html?id=\${video.id}\`);`;

export const LINK_READ = `// ---------- 1. Estat ----------
// Quin vídeo s'ha demanat? Ho diu l'adreça: video.html?id=4
const parametres = new URLSearchParams(window.location.search);
const idDemanat = Number(parametres.get("id"));

function buscarVideo(id) {
  for (const video of videos) {
    if (video.id === id) {
      return video;
    }
  }
  // Si l'adreça no porta cap id vàlid, mostrem el primer vídeo.
  return videos[0];
}

const videoActual = buscarVideo(idDemanat);
const ID_VIDEO = videoActual.id;`;

export const LINK_RENDER = `function renderitzarVideo() {
  document.title = \`\${videoActual.titol} · ClasseTube\`;
  titolVideo.textContent = videoActual.titol;
  nomCanal.textContent = videoActual.canal;
  dadesVideo.textContent = \`\${videoActual.visualitzacions} visualitzacions · \${videoActual.fa}\`;
}`;

const THEME_JS = `const CLAU_TEMA = "tema";

function aplicarTema(esFosc) {
  if (esFosc) {
    document.body.classList.add("fosc");
  } else {
    document.body.classList.remove("fosc");
  }
  botoTema.setAttribute("aria-pressed", String(esFosc));
}`;

const THEME_EVENT = `botoTema.addEventListener("click", () => {
  const esFosc = !document.body.classList.contains("fosc");
  aplicarTema(esFosc);
  localStorage.setItem(CLAU_TEMA, String(esFosc));
});`;

/** inici.js amb totes les ampliacions. */
export const HOME_JS_FULL = program(
  HOME_STATE,
  `${HOME_ELEMENTS_MENU}\n${HOME_ELEMENTS_GRID}\n${HOME_ELEMENTS_SEARCH}\n${HOME_ELEMENTS_CHIPS}
const botoTreuFiltres = document.querySelector("#treu-filtres");
const botoTema = document.querySelector("#boto-tema");`,
  DATA_HEADER,
  FN_MATCH,
  FN_CATEGORY,
  FN_VISIBLE_V2,
  `function treureFiltres() {
  textCerca = "";
  categoriaActual = "Tot";
}`,
  PAGE_HEADER,
  FN_CARD.replace('enllac.setAttribute("href", "video.html");', 'enllac.setAttribute("href", `video.html?id=${video.id}`);'),
  HOME_RENDER_V3,
  THEME_JS,
  EVENTS_HEADER,
  EVENT_MENU,
  EVENT_SEARCH,
  EVENT_CHIPS,
  `botoTreuFiltres.addEventListener("click", () => {
  treureFiltres();
  inputCerca.value = "";
  renderitzar();
  inputCerca.focus();
});`,
  THEME_EVENT,
  `// ---------- Arrencada ----------
aplicarTema(localStorage.getItem(CLAU_TEMA) === "true");
renderitzar();`
);

/** El botó d'eliminar, que només tenen els comentaris propis. */
export const DELETE_BUTTON = `  // Només es poden eliminar els comentaris propis.
  if (comentari.autor === "Tu") {
    const botoEliminar = document.createElement("button");
    botoEliminar.type = "button";
    botoEliminar.classList.add("boto-text");
    botoEliminar.textContent = "Elimina";
    botoEliminar.setAttribute("aria-label", \`Elimina el comentari: \${comentari.text}\`);
    botoEliminar.addEventListener("click", () => {
      eliminarComentari(comentari.id);
      renderitzarComentaris();
      inputComentari.focus();
    });
    element.append(botoEliminar);
  }`;

const FN_COMMENT_ELEMENT_DELETE = FN_COMMENT_ELEMENT.replace(
  '  element.append(autor, text);\n  return element;',
  `  element.append(autor, text);\n\n${DELETE_BUTTON.replace('renderitzarComentaris();', 'actualitzar();')}\n\n  return element;`
);

export const FN_REMOVE_COMMENT = `function eliminarComentari(id) {
  const restants = [];
  for (const comentari of comentaris) {
    if (comentari.id !== id) {
      restants.push(comentari);
    }
  }
  comentaris = restants;
}`;

const SAVE_FUNCTIONS_BODY = `function guardarEstat() {
  const estat = {
    agrada: agrada,
    noAgrada: noAgrada,
    subscrit: subscrit,
    comentaris: comentaris
  };
  localStorage.setItem(CLAU_ESTAT, JSON.stringify(estat));
}`;

const LOAD_FUNCTION = `function carregarEstat() {
  const text = localStorage.getItem(CLAU_ESTAT);
  if (text === null) {
    return;
  }

  const estat = JSON.parse(text);
  agrada = estat.agrada;
  noAgrada = estat.noAgrada;
  subscrit = estat.subscrit;
  comentaris = estat.comentaris;

  seguentId = 1;
  for (const comentari of comentaris) {
    if (comentari.id >= seguentId) {
      seguentId = comentari.id + 1;
    }
  }
}`;

const RENDER_ALL = `// Cada cop que les dades canvien: les guardem i tornem a pintar.
function actualitzar() {
  guardarEstat();
  renderitzarValoracio();
  renderitzarSubscripcio();
  renderitzarComentaris();
}`;

const EVENTS_SAVING = `botoAgrada.addEventListener("click", () => {
  canviarAgrada();
  actualitzar();
});

botoNoAgrada.addEventListener("click", () => {
  canviarNoAgrada();
  actualitzar();
});

botoSubscriu.addEventListener("click", () => {
  subscrit = !subscrit;
  actualitzar();
});

botoDescripcio.addEventListener("click", () => {
  descripcioOberta = !descripcioOberta;
  renderitzarDescripcio();
});

${EVENT_COMMENTS.replace('  renderitzarComentaris();\n});', '  actualitzar();\n});')}`;

/** video.js amb totes les ampliacions. */
export const VIDEO_JS_FULL = program(
  `${LINK_READ}
const CLAU_ESTAT = \`video-\${ID_VIDEO}\`;
const AGRADA_INICIALS = 1240;
const SUBSCRIPTORS_INICIALS = 15300;

let agrada = false;
let noAgrada = false;
let subscrit = false;
let descripcioOberta = false;
${VIDEO_STATE_COMMENTS}`,
  `${ELEMENTS_HEADER}
const reproductor = document.querySelector("#reproductor");
const titolVideo = document.querySelector("#titol-video");
const nomCanal = document.querySelector("#nom-canal");
const dadesVideo = document.querySelector("#dades-video");
${VIDEO_ELEMENTS_RATING.replace(`${ELEMENTS_HEADER}\n`, '')}
${VIDEO_ELEMENTS_SUBSCRIBE}
${VIDEO_ELEMENTS_COMMENTS}
${VIDEO_ELEMENTS_RELATED}
const botoTema = document.querySelector("#boto-tema");`,
  DATA_HEADER,
  FN_RATING,
  FN_SUBSCRIBERS,
  FN_VALIDATE,
  FN_ADD_COMMENT,
  FN_REMOVE_COMMENT,
  FN_RELATED,
  `// ---------- 4. Guardar i recuperar (localStorage) ----------\n${SAVE_FUNCTIONS_BODY}`,
  LOAD_FUNCTION,
  '// ---------- 5. Funcions que pinten la pàgina ----------',
  LINK_RENDER.replace(/\n}$/, '\n  reproductor.classList.remove("taronja");\n  reproductor.classList.add(videoActual.color);\n}'),
  RENDER_RATING,
  RENDER_SUBSCRIBE,
  RENDER_DESCRIPTION,
  FN_COMMENT_ELEMENT_DELETE,
  RENDER_COMMENTS,
  FN_RELATED_ELEMENT.replace('enllac.setAttribute("href", "video.html");', 'enllac.setAttribute("href", `video.html?id=${video.id}`);'),
  RENDER_RELATED,
  FN_CLEAR_FORM,
  THEME_JS,
  RENDER_ALL,
  '// ---------- 6. Esdeveniments ----------',
  EVENTS_SAVING,
  THEME_EVENT,
  `// ---------- Arrencada ----------
carregarEstat();
aplicarTema(localStorage.getItem(CLAU_TEMA) === "true");
renderitzarVideo();
renderitzarValoracio();
renderitzarSubscripcio();
renderitzarDescripcio();
renderitzarComentaris();
renderitzarRecomanats();`
);

// ---------------------------------------------------------------------------
// Punts de partida dels exercicis d'ampliació
// ---------------------------------------------------------------------------

/** Peces que es mostren als apunts de localStorage. */
export const SAVE_FUNCTIONS = `// ---------- Guardar (localStorage) ----------
const CLAU_ESTAT = "video-1";

${SAVE_FUNCTIONS_BODY}

${RENDER_ALL}`;

export const LOAD_FUNCTIONS = LOAD_FUNCTION;

/** video.js base que ja guarda l'estat (punt de partida de l'exercici final). */
export const VIDEO_JS_SAVE = VIDEO_JS.replace(`${EVENT_RATING}\n\n${EVENT_SUBSCRIBE}\n\n${EVENT_COMMENTS}`, EVENTS_SAVING)
  .replace(EVENTS_HEADER, `${SAVE_FUNCTIONS}\n\n${EVENTS_HEADER}`)
  .replace(
    VIDEO_START,
    `// ---------- Arrencada ----------
// Falta recuperar l'estat guardat abans de pintar
renderitzarValoracio();
renderitzarSubscripcio();
renderitzarDescripcio();
renderitzarComentaris();
renderitzarRecomanats();`
  );

/** Les dues pàgines del projecte, per a les demostracions. */
export const projectDemo = {
  base: {
    home: { html: HOME_HTML, css: PROJECT_CSS, js: HOME_JS, data: DATA_JS },
    video: { html: VIDEO_HTML, css: PROJECT_CSS, js: VIDEO_JS, data: DATA_JS },
  },
  full: {
    home: { html: HOME_HTML_FULL, css: PROJECT_CSS_FULL, js: HOME_JS_FULL, data: DATA_JS },
    video: { html: VIDEO_HTML_FULL, css: PROJECT_CSS_FULL, js: VIDEO_JS_FULL, data: DATA_JS },
  },
};
