// Codi del projecte final del RA1: una pàgina tipus YouTube (ClasseTube), feta
// només amb HTML i CSS. Són dues pàgines (index.html i video.html) que
// comparteixen un sol full d'estils (estils.css).
//
// És la mateixa pàgina que després es fa servir al projecte final del RA2,
// on se li afegeix JavaScript: per això els noms de les classes coincideixen.
//
// El CSS està dividit en peces per poder mostrar el projecte fase a fase: cada
// fase és la suma de les peces que ja s'han explicat.

const sheet = (...parts) => parts.join('\n\n');

const VIDEOS = [
  { titol: 'Aprèn CSS Grid en 12 minuts', canal: 'CodiClar', durada: '12:04', dades: '48 k visualitzacions · fa 3 dies', avatar: 2 },
  { titol: 'JavaScript: el teu primer esdeveniment', canal: 'CodiClar', durada: '8:31', dades: '120 k visualitzacions · fa 2 setmanes', avatar: 2 },
  { titol: 'Concert acústic al terrat', canal: 'Les Notes', durada: '34:10', dades: '9,2 k visualitzacions · fa 1 mes', avatar: 3 },
  { titol: 'Truita de patates sense secrets', canal: "Cuina de l'Àvia", durada: '15:47', dades: '310 k visualitzacions · fa 5 mesos', avatar: 4 },
  { titol: 'Resum de la final de bàsquet', canal: 'EsportTotal', durada: '6:02', dades: '1,1 M visualitzacions · fa 1 dia', avatar: 1 },
  { titol: 'Flexbox explicat amb pizzes', canal: 'CodiClar', durada: '10:15', dades: '75 k visualitzacions · fa 1 any', avatar: 2 },
];

// ---------------------------------------------------------------------------
// HTML
// ---------------------------------------------------------------------------

/** La capçalera, igual a les dues pàgines. */
export const HEADER_HTML = `<header class="capcalera">
  <div class="capcalera-esquerra">
    <button class="boto-icona" type="button" aria-label="Menú">☰</button>
    <a class="logo" href="index.html"><span>▶</span> ClasseTube</a>
  </div>

  <form class="cercador">
    <input type="search" placeholder="Cerca" aria-label="Cerca vídeos">
    <button type="submit">Cerca</button>
  </form>

  <div class="capcalera-dreta">
    <button class="boto-icona" type="button" aria-label="Notificacions">🔔</button>
    <img class="avatar" src="imatges/avatar-1.png" alt="El teu perfil">
  </div>
</header>`;

export const MENU_HTML = `<nav class="menu">
  <a class="actiu" href="index.html">Inici</a>
  <a href="#">Subscripcions</a>
  <a href="#">Historial</a>
  <a href="#">Vídeos que m'agraden</a>
</nav>`;

const card = (video, index) => `    <article class="video">
      <a class="miniatura" href="video.html">
        <img src="imatges/miniatura-${index + 1}.jpg" alt="">
        <span class="durada">${video.durada}</span>
      </a>
      <div class="info">
        <img class="avatar" src="imatges/avatar-${video.avatar}.png" alt="">
        <div class="text">
          <h2><a href="video.html">${video.titol}</a></h2>
          <p class="canal">${video.canal}</p>
          <p class="dades">${video.dades}</p>
        </div>
      </div>
    </article>`;

/** Una sola targeta, per explicar-la sense repetir-les totes. */
export const CARD_HTML = card(VIDEOS[0], 0)
  .split('\n')
  .map((line) => line.slice(4))
  .join('\n');

export const CHIPS_HTML = `<div class="xips">
  <button class="xip actiu" type="button">Tot</button>
  <button class="xip" type="button">Programació</button>
  <button class="xip" type="button">Música</button>
  <button class="xip" type="button">Cuina</button>
  <button class="xip" type="button">Esports</button>
</div>`;

const indent = (text, spaces) =>
  text
    .split('\n')
    .map((line) => (line === '' ? line : ' '.repeat(spaces) + line))
    .join('\n');

/** index.html: el que va dins del <body>. */
export const HOME_HTML = `${HEADER_HTML}

${MENU_HTML}

<main class="contingut">
${indent(CHIPS_HTML, 2)}

  <div class="graella">
${VIDEOS.map(card).join('\n\n')}
  </div>
</main>`;

/** Només els quadrats grans de la pàgina inicial, encara buits (fase 1). */
export const HOME_HTML_SKELETON = `<header class="capcalera">
  Capçalera: logo, cercador i perfil
</header>

<nav class="menu">
  Menú lateral
</nav>

<main class="contingut">
  <div class="xips">Xips de categories</div>

  <div class="graella">
    <article class="video">Vídeo 1</article>
    <article class="video">Vídeo 2</article>
    <article class="video">Vídeo 3</article>
    <article class="video">Vídeo 4</article>
    <article class="video">Vídeo 5</article>
    <article class="video">Vídeo 6</article>
  </div>
</main>`;

const recommended = (video, index) => `    <a class="recomanat" href="video.html">
      <div class="miniatura">
        <img src="imatges/miniatura-${index + 2}.jpg" alt="">
        <span class="durada">${video.durada}</span>
      </div>
      <div class="text">
        <h3>${video.titol}</h3>
        <p class="canal">${video.canal}</p>
        <p class="dades">${video.dades}</p>
      </div>
    </a>`;

const comment = (author, avatar, text) => `      <article class="comentari">
        <img class="avatar" src="imatges/avatar-${avatar}.png" alt="">
        <div>
          <p class="autor">${author}</p>
          <p>${text}</p>
        </div>
      </article>`;

/** video.html: el que va dins del <body>. */
export const VIDEO_HTML = `${HEADER_HTML}

<main class="pagina-video">
  <div class="principal">
    <div class="reproductor">
      <img src="imatges/miniatura-1.jpg" alt="Fotograma del vídeo">
      <div class="controls">
        <button type="button" aria-label="Reprodueix">▶</button>
        <span>0:00 / 12:04</span>
        <button class="boto-ampliar" type="button" aria-label="Pantalla completa">⛶</button>
      </div>
    </div>

    <h1>Aprèn CSS Grid en 12 minuts</h1>

    <div class="barra-canal">
      <div class="canal-info">
        <img class="avatar" src="imatges/avatar-2.png" alt="">
        <div>
          <p class="nom-canal">CodiClar</p>
          <p class="dades">15,3 k subscriptors</p>
        </div>
        <button class="boto-subscriu" type="button">Subscriu-te</button>
      </div>

      <div class="valoracio">
        <button type="button">M'agrada · 1.240</button>
        <button type="button">No m'agrada</button>
      </div>
    </div>

    <div class="descripcio">
      <p class="dades">48 k visualitzacions · fa 3 dies</p>
      <p>CSS Grid sembla complicat fins que algú te l'explica amb calma. En aquest vídeo muntem una pàgina sencera, pas a pas: files, columnes, espais i àrees amb nom.</p>
    </div>

    <section class="comentaris">
      <h2>3 comentaris</h2>

${[
  comment('Laia', 3, 'Per fi ho he entès. Gràcies!'),
  comment('Marc', 4, "El truc del minut 7 m'ha salvat el projecte."),
  comment('Nora', 1, 'Faràs un vídeo sobre Flexbox?'),
].join('\n\n')}
    </section>
  </div>

  <aside class="recomanats">
    <h2>A continuació</h2>

${VIDEOS.slice(1, 5).map(recommended).join('\n\n')}
  </aside>
</main>`;

/** Només els quadrats grans de la pàgina del vídeo (fase 6). */
export const VIDEO_HTML_SKELETON = `<header class="capcalera">
  Capçalera: la mateixa de la pàgina inicial
</header>

<main class="pagina-video">
  <div class="principal">
    <div class="reproductor">Reproductor</div>
    <h1>Títol del vídeo</h1>
    <div class="barra-canal">Canal i botons</div>
    <div class="descripcio">Descripció</div>
    <section class="comentaris">Comentaris</section>
  </div>

  <aside class="recomanats">
    <a class="recomanat" href="video.html">Recomanat 1</a>
    <a class="recomanat" href="video.html">Recomanat 2</a>
    <a class="recomanat" href="video.html">Recomanat 3</a>
  </aside>
</main>`;

const document_ = (title, body) => `<!DOCTYPE html>
<html lang="ca">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${title}</title>
    <link rel="stylesheet" href="estils.css">
  </head>
  <body>
${indent(body, 4)}
  </body>
</html>`;

/** Els dos fitxers HTML sencers, per copiar-los a un projecte de veritat. */
export const INDEX_HTML_FILE = document_('ClasseTube', HOME_HTML);
export const VIDEO_HTML_FILE = document_('Aprèn CSS Grid en 12 minuts · ClasseTube', VIDEO_HTML);

// ---------------------------------------------------------------------------
// CSS: un sol full d'estils per a les dues pàgines
// ---------------------------------------------------------------------------

export const CSS_BASE = `/* ---------- Base ---------- */

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  color: #0f0f0f;
  background: #ffffff;
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  display: block;
}

button,
input {
  font-family: inherit;
  font-size: inherit;
}`;

/** Mentre es munta l'esquelet: que cada quadrat es vegi, encara que estigui buit. */
export const CSS_SKELETON = `/* Provisional: per veure els quadrats mentre muntem l'esquelet */
.capcalera,
.menu,
.xips,
.video,
.reproductor,
.barra-canal,
.descripcio,
.comentaris,
.recomanat {
  padding: 16px;
  background: #f0f0f0;
}`;

export const CSS_HEADER = `/* ---------- Capçalera ---------- */

.capcalera {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  height: 56px;
  padding: 0 16px;
  background: #ffffff;
  border-bottom: 1px solid #e5e5e5;
}

.capcalera-esquerra,
.capcalera-dreta {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  font-size: 20px;
  font-weight: bold;
}

.logo span {
  color: #c81e1e;
}

.boto-icona {
  width: 40px;
  height: 40px;
  font-size: 18px;
  background: none;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
}

.boto-icona:hover {
  background: #f0f0f0;
}

.avatar {
  flex: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
}

.cercador {
  display: flex;
  flex: 1;
  max-width: 480px;
}

.cercador input {
  flex: 1;
  min-width: 0;
  padding: 8px 16px;
  border: 1px solid #909090;
  border-right: 0;
  border-radius: 20px 0 0 20px;
}

.cercador button {
  padding: 8px 16px;
  background: #f0f0f0;
  border: 1px solid #909090;
  border-radius: 0 20px 20px 0;
  cursor: pointer;
}`;

export const CSS_MENU = `/* ---------- Menú lateral ---------- */

.menu {
  position: fixed;
  top: 56px;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 200px;
  padding: 12px;
  background: #ffffff;
}

.menu a {
  padding: 10px 12px;
  border-radius: 8px;
}

.menu a:hover,
.menu a.actiu {
  background: #f0f0f0;
}

.menu a.actiu {
  font-weight: bold;
}

/* El contingut deixa lliure el lloc de la capçalera i del menú */
.contingut {
  margin-top: 56px;
  margin-left: 200px;
  padding: 16px 24px;
}`;

export const CSS_GRID = `/* ---------- Xips i graella ---------- */

.xips {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.xip {
  padding: 6px 12px;
  background: #f0f0f0;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
}

.xip.actiu {
  color: #ffffff;
  background: #0f0f0f;
}

.graella {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px 16px;
}`;

export const CSS_CARD = `/* ---------- Targeta d'un vídeo ---------- */

.miniatura {
  position: relative;
  display: block;
}

.miniatura img {
  width: 100%;
  border-radius: 12px;
}

.durada {
  position: absolute;
  right: 8px;
  bottom: 8px;
  padding: 2px 6px;
  font-size: 12px;
  font-weight: bold;
  color: #ffffff;
  background: #0f0f0f;
  border-radius: 4px;
}

.info {
  display: flex;
  gap: 12px;
  margin-top: 12px;
}

.text h2,
.text h3 {
  margin: 0 0 4px;
  font-size: 16px;
  line-height: 1.3;
}

.canal,
.dades {
  margin: 0;
  font-size: 14px;
  color: #606060;
}`;

export const CSS_VIDEO_LAYOUT = `/* ---------- Pàgina del vídeo: dues columnes ---------- */

.pagina-video {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-top: 56px;
  padding: 24px;
}`;

export const CSS_VIDEO_MAIN = `/* ---------- Reproductor i canal ---------- */

.reproductor {
  position: relative;
}

.reproductor img {
  width: 100%;
  border-radius: 12px;
}

.controls {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  color: #ffffff;
  background: #0f0f0f;
  border-radius: 0 0 12px 12px;
}

.controls button {
  color: #ffffff;
  background: none;
  border: 0;
  cursor: pointer;
}

.boto-ampliar {
  margin-left: auto;
}

.principal h1 {
  margin: 16px 0 12px;
  font-size: 22px;
}

.barra-canal {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.canal-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.nom-canal {
  margin: 0;
  font-weight: bold;
}

.boto-subscriu {
  padding: 10px 16px;
  font-weight: bold;
  color: #ffffff;
  background: #0f0f0f;
  border: 0;
  border-radius: 20px;
  cursor: pointer;
}

.valoracio {
  display: flex;
  gap: 8px;
}

.valoracio button {
  padding: 10px 16px;
  background: #f0f0f0;
  border: 0;
  border-radius: 20px;
  cursor: pointer;
}

.descripcio {
  margin-top: 16px;
  padding: 12px;
  background: #f0f0f0;
  border-radius: 12px;
}

.descripcio p {
  margin: 0 0 6px;
  line-height: 1.5;
}`;

export const CSS_VIDEO_SIDE = `/* ---------- Comentaris i recomanats ---------- */

.comentaris h2,
.recomanats h2 {
  margin: 24px 0 16px;
  font-size: 18px;
}

.comentari {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.comentari p {
  margin: 0 0 4px;
}

.autor {
  font-size: 14px;
  font-weight: bold;
}

.recomanats {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.recomanats h2 {
  margin: 0;
}

.recomanat {
  display: flex;
  gap: 8px;
}

.recomanat .miniatura {
  flex: none;
  width: 168px;
}

.recomanat .text h3 {
  font-size: 14px;
}`;

/** estils.css sencer. */
export const PROJECT_CSS = sheet(
  CSS_BASE,
  CSS_HEADER,
  CSS_MENU,
  CSS_GRID,
  CSS_CARD,
  CSS_VIDEO_LAYOUT,
  CSS_VIDEO_MAIN,
  CSS_VIDEO_SIDE
);

/** El full d'estils tal com queda al final de cada fase. */
export const PHASE_CSS = {
  skeleton: sheet(CSS_BASE, CSS_SKELETON),
  header: sheet(CSS_BASE, CSS_SKELETON, CSS_HEADER),
  menu: sheet(CSS_BASE, CSS_SKELETON, CSS_HEADER, CSS_MENU),
  grid: sheet(CSS_BASE, CSS_HEADER, CSS_MENU, CSS_GRID),
  card: sheet(CSS_BASE, CSS_HEADER, CSS_MENU, CSS_GRID, CSS_CARD),
  videoLayout: sheet(CSS_BASE, CSS_SKELETON, CSS_HEADER, CSS_VIDEO_LAYOUT),
  videoMain: sheet(CSS_BASE, CSS_HEADER, CSS_CARD, CSS_VIDEO_LAYOUT, CSS_VIDEO_MAIN),
  videoSide: PROJECT_CSS,
};

// ---------------------------------------------------------------------------
// Les pàgines, fase a fase
// ---------------------------------------------------------------------------

const skeletonMain = HOME_HTML_SKELETON.slice(HOME_HTML_SKELETON.indexOf('<main'));
const skeletonMenu = HOME_HTML_SKELETON.slice(HOME_HTML_SKELETON.indexOf('<nav'), HOME_HTML_SKELETON.indexOf('<main')).trim();
const skeletonGrid = skeletonMain.slice(skeletonMain.indexOf('  <div class="graella">'), skeletonMain.indexOf('</main>')).trimEnd();

/** La pàgina inicial tal com queda al final de cada fase. */
export const HOME_PHASES = {
  skeleton: { html: HOME_HTML_SKELETON, css: PHASE_CSS.skeleton },
  header: { html: `${HEADER_HTML}\n\n${skeletonMenu}\n\n${skeletonMain}`, css: PHASE_CSS.header },
  menu: { html: `${HEADER_HTML}\n\n${MENU_HTML}\n\n${skeletonMain}`, css: PHASE_CSS.menu },
  grid: {
    html: `${HEADER_HTML}\n\n${MENU_HTML}\n\n<main class="contingut">\n${indent(CHIPS_HTML, 2)}\n\n${skeletonGrid}\n</main>`,
    css: sheet(PHASE_CSS.grid, `/* Provisional: les targetes encara són buides */\n.video {\n  padding: 40px 16px;\n  background: #f0f0f0;\n  border-radius: 12px;\n}`),
  },
  card: { html: HOME_HTML, css: PHASE_CSS.card },
};

const videoMainStart = VIDEO_HTML.indexOf('<main');
const videoAsideStart = VIDEO_HTML.indexOf('  <aside');
const skeletonAside = VIDEO_HTML_SKELETON.slice(VIDEO_HTML_SKELETON.indexOf('  <aside'));

/** La pàgina del vídeo tal com queda al final de cada fase. */
export const VIDEO_PHASES = {
  layout: { html: `${HEADER_HTML}\n\n${VIDEO_HTML_SKELETON.slice(VIDEO_HTML_SKELETON.indexOf('<main'))}`, css: PHASE_CSS.videoLayout },
  main: {
    html: `${VIDEO_HTML.slice(0, videoAsideStart)}${skeletonAside}`,
    css: sheet(PHASE_CSS.videoMain, `/* Provisional: els recomanats encara són buits */\n.recomanat {\n  display: block;\n  margin-bottom: 12px;\n  padding: 28px 16px;\n  background: #f0f0f0;\n  border-radius: 12px;\n}`),
  },
  side: { html: VIDEO_HTML, css: PROJECT_CSS },
};

/** Només el <main> de la pàgina del vídeo, per ensenyar-ne l'estructura. */
export const VIDEO_MAIN_HTML = VIDEO_HTML.slice(videoMainStart);

/** La mida de la finestra simulada on es veuen les pàgines senceres. */
export const PAGE_WIDTH = 1100;
export const PAGE_HEIGHT = 620;

/** Les dues pàgines acabades, per a la demostració. */
export const projectPages = {
  home: { html: HOME_HTML, css: PROJECT_CSS },
  video: { html: VIDEO_HTML, css: PROJECT_CSS },
};
