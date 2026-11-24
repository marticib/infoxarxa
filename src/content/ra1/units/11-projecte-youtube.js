import { p, list, steps, html, css, example, concept, warning, table, custom } from '../../blocks.js';
import {
  CARD_HTML,
  CSS_BASE,
  CSS_CARD,
  CSS_GRID,
  CSS_HEADER,
  CSS_MENU,
  CSS_VIDEO_LAYOUT,
  CSS_VIDEO_MAIN,
  CSS_VIDEO_SIDE,
  HEADER_HTML,
  HOME_HTML,
  HOME_PHASES,
  INDEX_HTML_FILE,
  PAGE_HEIGHT,
  PAGE_WIDTH,
  PROJECT_CSS,
  VIDEO_PHASES,
} from '../projectCode.js';

// Les pàgines senceres es veuen en una finestra simulada d'escriptori.
const WINDOW = { width: PAGE_WIDTH, viewport: PAGE_HEIGHT };
const FILES_HOME = { html: 'index.html', css: 'estils.css' };
const FILES_VIDEO = { html: 'video.html', css: 'estils.css' };

// Les ampliacions parteixen del projecte acabat: s'escriu al final del CSS.
const WRITE_HERE = '/* ---------- Ampliació: escriu a partir d\'aquí ---------- */';
const starterCss = `${PROJECT_CSS}\n\n${WRITE_HERE}\n`;
const withRules = (rules) => `${PROJECT_CSS}\n\n${WRITE_HERE}\n\n${rules}`;

const HOME_WITH_BADGE = HOME_HTML.replace(
  '<span class="durada">12:04</span>',
  '<span class="durada">12:04</span>\n        <span class="directe">EN DIRECTE</span>'
);

const FOOTER_HTML = `  <footer class="peu">
    <a href="#">Qui som</a>
    <a href="#">Contacte</a>
    <a href="#">Condicions</a>
  </footer>`;
const HOME_WITH_FOOTER_SLOT = HOME_HTML.replace('</main>', '\n  <!-- Escriu aquí el peu -->\n</main>');
const HOME_WITH_FOOTER = HOME_HTML.replace('</main>', `\n${FOOTER_HTML}\n</main>`);

const HOME_WITH_BUTTON = `${HOME_HTML}\n\n<a class="puja" href="#">↑ Puja</a>`;

const MENU_ICONS = `<nav class="menu">
  <a class="actiu" href="index.html"><span class="icona">⌂</span><span>Inici</span></a>
  <a href="#"><span class="icona">▤</span><span>Subscripcions</span></a>
  <a href="#"><span class="icona">◷</span><span>Historial</span></a>
  <a href="#"><span class="icona">♥</span><span>M'agraden</span></a>
</nav>`;
const HOME_WITH_ICONS = HOME_HTML.replace(/<nav class="menu">[\s\S]*?<\/nav>/, MENU_ICONS);

const RULES_COLUMNS = `.graella {
  grid-template-columns: repeat(4, 1fr);
}`;

const RULES_BADGE = `.directe {
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 2px 6px;
  font-size: 12px;
  font-weight: bold;
  color: #ffffff;
  background: #c81e1e;
  border-radius: 4px;
}`;

const RULES_FOOTER = `.peu {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 32px;
  padding: 16px 0;
  font-size: 14px;
  color: #606060;
  border-top: 1px solid #e5e5e5;
}`;

const RULES_BUTTON = `.puja {
  position: fixed;
  right: 24px;
  bottom: 24px;
  padding: 10px 16px;
  font-weight: bold;
  color: #ffffff;
  background: #0f0f0f;
  border-radius: 20px;
}`;

const RULES_MINI = `.menu {
  width: 88px;
  padding: 8px 4px;
}

.menu a {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px 0;
  font-size: 11px;
}

.icona {
  font-size: 20px;
}

.contingut {
  margin-left: 88px;
}`;

export const glossary = [
  {
    term: 'Maquetar',
    definition: 'Convertir un disseny en una pàgina de veritat: escriure l\'HTML dels contenidors i el CSS que els col·loca i els dona aspecte.',
  },
  {
    term: 'Esquelet (d\'una pàgina)',
    definition: 'L\'HTML dels contenidors principals, encara sense contingut ni estils definitius. És el dibuix de quadrats passat a codi.',
  },
  {
    term: 'Miniatura',
    definition: 'La imatge petita que representa un vídeo en una llista. Sovint porta coses a sobre, com la durada, col·locades amb `position: absolute`.',
  },
  {
    term: 'Full d\'estils compartit',
    definition: 'Un sol fitxer CSS que fan servir diverses pàgines del mateix lloc. Les peces que es repeteixen, com la capçalera, s\'escriuen una sola vegada.',
  },
];

export default {
  id: 'projecte-youtube',
  number: 11,
  title: 'Projecte final: una pàgina tipus YouTube',
  shortTitle: 'Projecte final',
  description:
    'Maquetes, de zero, les dues pàgines d\'una plataforma de vídeos: la pàgina inicial i la pàgina d\'un vídeo. Amb tot el que has après, i començant sempre pel dibuix.',

  problem: {
    title: 'Tinc totes les eines, però davant d\'una pàgina sencera no sé per on començar',
    text: [
      "Saps escriure HTML, donar estil amb CSS, posar caixes en fila i en columna, fer graelles i col·locar una cosa a sobre d'una altra. Cada eina, per separat, ja la domines. El que encara no has fet és una pàgina sencera, d'aquelles que fa impressió mirar.",
      "El secret és no mirar-la sencera. Una pàgina com la de YouTube no és res més que **quadrats ficats dins de quadrats**: tres de grans, i dins de cada un, uns quants de més petits. Si els dibuixes abans d'escriure, cada quadrat es converteix en un problema petit que ja saps resoldre.",
      "En aquesta unitat construïm, fase a fase, una pàgina de mostra que es diu ClasseTube. No la copiïs: fes servir cada fase com a guia per maquetar **la teva**, amb el teu disseny, els teus colors i les teves imatges.",
    ],
  },

  goals: [
    'Descompondre una pàgina sencera en quadrats abans d\'escriure cap línia.',
    'Escriure l\'esquelet d\'HTML a partir del dibuix, de fora cap a dins.',
    'Triar, per a cada quadrat, l\'eina adequada: flex, grid o position.',
    'Fixar una capçalera i un menú lateral sense que tapin el contingut.',
    'Reaprofitar un mateix full d\'estils en dues pàgines.',
    'Enllaçar les pàgines entre elles.',
  ],

  sections: [
    {
      id: 'el-pla',
      title: 'El pla: dues pàgines i un full d\'estils',
      blocks: [
        p("Això és el que tindràs al final. Són dues pàgines: canvia de l'una a l'altra amb els botons de dalt, baixa per dins de cada una i activa el botó **«Quadrats»** per veure de què està feta."),
        custom('PageDemo'),
        p("El projecte té tres fitxers i una carpeta d'imatges. Les dues pàgines comparteixen el full d'estils: la capçalera, per exemple, s'escriu una sola vegada al CSS i serveix per a totes dues."),
        table(
          ['Fitxer', 'Què hi ha'],
          [
            ['`index.html`', 'La pàgina inicial: capçalera, menú lateral i graella de vídeos'],
            ['`video.html`', 'La pàgina d\'un vídeo: reproductor, canal, comentaris i recomanats'],
            ['`estils.css`', 'Tots els estils de les dues pàgines'],
            ['`imatges/`', 'Les miniatures i els avatars'],
          ],
          'Els fitxers del projecte'
        ),
        p("A cada fase farem el mateix, en aquest ordre. És el mètode de la [unitat 5](#/unitat/contenidors), i no ens el saltarem cap vegada:"),
        steps(
          '**Dibuixar** els quadrats de la part que toca.',
          'Decidir, per a cada quadrat amb fills: **fila, columna o graella?**',
          'Escriure l\'**HTML**: un contenidor per quadrat, amb un nom.',
          'Escriure el **CSS** que col·loca els fills de cada contenidor.',
          'Comprovar-ho amb els quadrats activats, i passar a la part següent.'
        ),
        concept(
          'Primer que quedi a lloc, després que quedi bonic',
          "A cada fase, primer aconsegueix que cada quadrat estigui on ha d'estar, encara que sigui gris i lleig. Els colors, les vores arrodonides i els detalls van al final. Si barreges les dues feines, quan alguna cosa es descol·loqui no sabràs per què."
        ),
        warning(
          'La teva pàgina no ha de ser igual que aquesta',
          "ClasseTube és un exemple, amb noms de classe i mides que hem triat nosaltres. Al teu projecte, les classes es diran com tu vulguis i el disseny serà el teu. El que has de reproduir és el camí: dibuix, contenidors, col·locació."
        ),
      ],
    },

    {
      id: 'fase-1',
      label: 'Pàgina inicial · Fase 1',
      title: 'El dibuix i l\'esquelet',
      blocks: [
        p("Mira la pàgina inicial acabada i oblida't de les fotos i dels textos. Quants quadrats grans hi veus? Són tres: una franja a dalt, una columna estreta a l'esquerra i tota la resta."),
        custom('BoxSketch', {
          title: 'La pàgina inicial, en quadrats',
          intro: 'Comença pels tres quadrats grans i ves obrint-los. A cada nivell, mira si els fills van en fila, en columna o en graella.',
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
                  { name: 'esquerra', tag: 'div.capcalera-esquerra', basis: '26%' },
                  { name: 'cercador', tag: 'form.cercador' },
                  { name: 'dreta', tag: 'div.capcalera-dreta', basis: '18%' },
                ],
              },
              {
                name: 'resta de la pàgina',
                virtual: true,
                dir: 'row',
                children: [
                  { name: 'menú', tag: 'nav.menu', basis: '22%', h: 150 },
                  {
                    name: 'contingut',
                    tag: 'main.contingut',
                    dir: 'column',
                    children: [
                      { name: 'xips', tag: 'div.xips', h: 26 },
                      {
                        name: 'graella',
                        tag: 'div.graella',
                        dir: 'grid',
                        cols: 3,
                        children: [
                          { name: 'vídeo', tag: 'article.video', h: 44 },
                          { name: 'vídeo', tag: 'article.video', h: 44 },
                          { name: 'vídeo', tag: 'article.video', h: 44 },
                          { name: 'vídeo', tag: 'article.video', h: 44 },
                          { name: 'vídeo', tag: 'article.video', h: 44 },
                          { name: 'vídeo', tag: 'article.video', h: 44 },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          steps: [
            'Dos pisos: la **capçalera** a dalt i tota la resta a sota.',
            'La capçalera és una **fila** de tres grups. A sota, el **menú** a l\'esquerra i el **contingut** a la dreta.',
            'El contingut és una **columna**: la fila de xips i, a sota, la graella.',
            'La graella són els vídeos, repartits en **tres columnes**.',
          ],
        }),
        p("Al dibuix hi ha un quadrat de línia de punts, «resta de la pàgina», que agrupa el menú i el contingut. Ens ha servit per pensar, però a l'HTML no hi serà: com que el menú estarà fixat a l'esquerra amb `position: fixed`, no cal cap contenidor que el posi al costat del contingut. Un dibuix és una eina per pensar, i no tots els quadrats que hi fas acaben sent un element."),
        p("Ara, l'esquelet: un contenidor per a cada quadrat, de fora cap a dins, i dins de cada un només una paraula que digui què hi anirà."),
        example({
          title: 'L\'esquelet de la pàgina inicial',
          intro: 'Encara no hi ha res col·locat: tots els quadrats s\'apilen. Les regles del final del CSS són provisionals, només perquè es vegin.',
          html: HOME_PHASES.skeleton.html,
          css: HOME_PHASES.skeleton.css,
          fileNames: FILES_HOME,
          focus: 'html',
          boxes: true,
          ...WINDOW,
          expected: 'Una columna de caixes grises: la capçalera, el menú, els xips i sis vídeos, l\'un sota l\'altre.',
          why: "Tots els contenidors són blocs, i els blocs s'apilen. Fixa't en l'estructura, no en l'aspecte: cada quadrat del dibuix té el seu element, i els vídeos són dins de la graella, que és dins del contingut.",
        }),
        concept(
          'Les regles de base',
          "El CSS comença amb quatre regles que posaràs a tots els projectes: `box-sizing: border-box` per a tot, el `<body>` sense marge, els enllaços sense subratllat i les imatges com a blocs. Són a la pestanya del CSS, a dalt de tot."
        ),
      ],
    },

    {
      id: 'fase-2',
      label: 'Pàgina inicial · Fase 2',
      title: 'La capçalera',
      blocks: [
        p("Obrim el primer quadrat. La capçalera té tres grups: a l'esquerra, el botó del menú i el logo; al mig, el cercador; a la dreta, les notificacions i el perfil. Són **tres fills en fila**, amb un a cada punta."),
        custom('BoxSketch', {
          title: 'La capçalera, en quadrats',
          tree: {
            name: 'capçalera',
            tag: 'header.capcalera',
            dir: 'row',
            children: [
              {
                name: 'esquerra',
                tag: 'div.capcalera-esquerra',
                dir: 'row',
                basis: '30%',
                children: [{ name: '☰', tag: 'button.boto-icona', basis: '28%' }, { name: 'logo', tag: 'a.logo' }],
              },
              {
                name: 'cercador',
                tag: 'form.cercador',
                dir: 'row',
                children: [{ name: 'camp de text', tag: 'input' }, { name: 'botó', tag: 'button', basis: '26%' }],
              },
              {
                name: 'dreta',
                tag: 'div.capcalera-dreta',
                dir: 'row',
                basis: '22%',
                children: [{ name: '🔔', tag: 'button.boto-icona' }, { name: 'avatar', tag: 'img.avatar' }],
              },
            ],
          },
          steps: [
            'Tres grups en **fila**. Com que n\'hi ha un a cada punta: `justify-content: space-between`.',
            'Cada grup és, alhora, una altra **fila**. Tres contenidors flex més.',
          ],
          startLevel: 2,
        }),
        html(HEADER_HTML, { title: 'index.html · la capçalera' }),
        p("Per què hem agrupat el botó i el logo en un `<div>`? Perquè han d'anar junts: si fossin fills directes de la capçalera, `space-between` els separaria. **El que es mou junt va dins del mateix quadrat.**"),
        css(CSS_HEADER, { title: 'estils.css · la capçalera' }),
        p("Quatre detalls d'aquest CSS que val la pena mirar:"),
        list(
          "`position: fixed` amb `top`, `left` i `right` a zero enganxa la capçalera a dalt de la finestra i l'estira de banda a banda. Li donem una alçada fixa, `56px`, perquè la resta de la pàgina necessitarà saber quant ocupa.",
          "`z-index: 10` assegura que el contingut que passi per sota quan baixis no la tapi.",
          "El cercador té `flex: 1`: es queda l'espai que sobra entre els dos grups. I `max-width` impedeix que s'estiri massa en pantalles amples.",
          "A dins del cercador, el camp de text també té `flex: 1`, i el botó només ocupa el que necessita."
        ),
        example({
          title: 'La capçalera, a lloc',
          intro: 'Baixa per dins de la pàgina: la capçalera no es mou. Però mira què ha passat amb el menú.',
          html: HOME_PHASES.header.html,
          css: HOME_PHASES.header.css,
          fileNames: FILES_HOME,
          ...WINDOW,
          viewport: 380,
          expected: 'La capçalera queda a dalt, amb el logo a l\'esquerra, el cercador al mig i el perfil a la dreta. La caixa del menú ha desaparegut: és a sota de la capçalera.',
          why: "Un element amb `position: fixed` surt del flux: deixa d'ocupar lloc, i el que venia a continuació puja i queda amagat a sota. No és cap error, és el que fa `fixed`. Ho arreglem a la fase següent, deixant lliure aquest espai.",
        }),
      ],
    },

    {
      id: 'fase-3',
      label: 'Pàgina inicial · Fase 3',
      title: 'El menú lateral',
      blocks: [
        p("El menú és una **columna** d'enllaços que s'ha de quedar a l'esquerra encara que baixis. Una altra vegada `position: fixed`, però ara no va de banda a banda: comença on acaba la capçalera (`top: 56px`), arriba fins a baix (`bottom: 0`) i fa `200px` d'ample."),
        css(CSS_MENU, { title: 'estils.css · el menú i el lloc del contingut' }),
        p("L'última regla és la que arregla el problema de la fase anterior. Com que la capçalera i el menú estan fixats i no ocupen lloc, el contingut començaria a la cantonada de dalt a l'esquerra, a sota de tots dos. Amb dos marges li reservem exactament l'espai que ells tapen: `56px` a dalt i `200px` a l'esquerra."),
        example({
          title: 'El menú fix i el contingut al seu lloc',
          intro: 'Activa els quadrats: el contingut comença just on acaben la capçalera i el menú. Prova de treure-li `margin-left` i mira què passa.',
          html: HOME_PHASES.menu.html,
          css: HOME_PHASES.menu.css,
          fileNames: FILES_HOME,
          ...WINDOW,
          viewport: 420,
          expected: 'La capçalera a dalt, el menú a l\'esquerra amb «Inici» destacat i, a la dreta, les caixes grises del contingut. En baixar, només es mou el contingut.',
          why: "Hi ha tres números que han de coincidir: l'alçada de la capçalera (`56px`), el `top` del menú i el `margin-top` del contingut. I dos més: l'amplada del menú (`200px`) i el `margin-left` del contingut. Si canvies una mida, has de canviar l'altra.",
        }),
        warning(
          'Els elements fixos no empenyen ningú',
          "Amb `fixed` (i amb `absolute`), la resta de la pàgina es comporta com si aquell element no existís. Sempre que fixis alguna cosa, pregunta't què queda a sota i reserva-li l'espai amb un marge o un padding."
        ),
      ],
    },

    {
      id: 'fase-4',
      label: 'Pàgina inicial · Fase 4',
      title: 'Els xips i la graella',
      blocks: [
        p("Dins del contingut hi ha dues coses, l'una sota l'altra, i això ja ho fan soles perquè són blocs. El que hem de col·locar és **el que hi ha dins de cada una**: els xips van en fila i els vídeos, en files i columnes alhora."),
        table(
          ['Quadrat', 'Com van els fills', 'Eina'],
          [
            ['`.xips`', 'En una sola fila', '`display: flex` i `gap`'],
            ['`.graella`', 'En files i columnes', '`display: grid` i `repeat(3, 1fr)`'],
          ],
          'Una fila és flex; files i columnes alhora és grid'
        ),
        css(CSS_GRID, { title: 'estils.css · xips i graella' }),
        example({
          title: 'La graella, encara amb targetes buides',
          intro: 'Canvia el `3` de `repeat(3, 1fr)` per un `4` o per un `2`. I prova què fa cada un dels dos valors de `gap`.',
          html: HOME_PHASES.grid.html,
          css: HOME_PHASES.grid.css,
          fileNames: FILES_HOME,
          boxes: true,
          ...WINDOW,
          expected: 'Una fila de cinc xips i, a sota, sis caixes grises repartides en dues files de tres.',
          why: "`repeat(3, 1fr)` crea tres columnes que es reparteixen l'amplada a parts iguals. No hem dit quantes files hi ha: la graella en va afegint a mesura que arriben vídeos. `gap: 24px 16px` separa les files 24 píxels i les columnes 16.",
        }),
      ],
    },

    {
      id: 'fase-5',
      label: 'Pàgina inicial · Fase 5',
      title: 'La targeta d\'un vídeo',
      blocks: [
        p("Queda el quadrat més petit i el que té més feina: la targeta. Si la saps fer una vegada, la tens feta totes les vegades."),
        custom('BoxSketch', {
          title: 'Una targeta, en quadrats',
          tree: {
            name: 'vídeo',
            tag: 'article.video',
            dir: 'column',
            children: [
              {
                name: 'miniatura (la durada va a sobre)',
                tag: 'a.miniatura',
                dir: 'column',
                children: [{ name: 'imatge', tag: 'img', h: 70 }, { name: 'durada', tag: 'span.durada', h: 20 }],
              },
              {
                name: 'info',
                tag: 'div.info',
                dir: 'row',
                children: [
                  { name: 'avatar', tag: 'img.avatar', basis: '20%' },
                  {
                    name: 'text',
                    tag: 'div.text',
                    dir: 'column',
                    children: [{ name: 'títol', tag: 'h2' }, { name: 'canal', tag: 'p.canal' }, { name: 'dades', tag: 'p.dades' }],
                  },
                ],
              },
            ],
          },
          steps: [
            'Dos pisos: la **miniatura** a dalt i la **informació** a sota. És una columna, i els blocs ja s\'apilen sols.',
            'La informació és una **fila**: l\'avatar i el text. La miniatura conté la imatge i la durada, que no va a sota sinó **a sobre**.',
            'El text és una **columna**: títol, canal i dades.',
          ],
        }),
        html(CARD_HTML, { title: 'index.html · una targeta' }),
        p("Hi ha dues idees noves respecte de la graella. La primera, la fila de sota: l'avatar té una mida fixa i `flex: none`, perquè no s'encongeixi quan el títol sigui llarg."),
        p("La segona és la durada. No va al costat de la imatge ni a sota: va **a sobre**, en una cantonada. Això és feina de `position`, i sempre són dues regles que van juntes:"),
        list(
          "El quadrat de fora, `.miniatura`, té `position: relative`. No es mou de lloc: només passa a ser la referència.",
          "El quadrat de dins, `.durada`, té `position: absolute` amb `right: 8px` i `bottom: 8px`: a 8 píxels de la vora dreta i de la de baix **de la miniatura**."
        ),
        css(CSS_CARD, { title: 'estils.css · la targeta' }),
        example({
          title: 'La pàgina inicial, acabada',
          intro: 'Esborra `position: relative` de `.miniatura` i busca on han anat a parar les durades. Després torna-la a posar.',
          html: HOME_PHASES.card.html,
          css: HOME_PHASES.card.css,
          fileNames: FILES_HOME,
          ...WINDOW,
          expected: 'Sis targetes amb la miniatura, la durada en una cantonada i, a sota, l\'avatar al costat del títol i les dades.',
          why: "Sense `position: relative` a la miniatura, les durades busquen un altre avantpassat posicionat. No en troben cap fins a arribar a la pàgina, i totes sis s'amunteguen a la mateixa cantonada de baix a la dreta.",
        }),
        warning(
          'El text alternatiu de les miniatures',
          "Aquí les miniatures tenen `alt=\"\"`, buit, perquè el títol del vídeo ja és just a sota i repetir-lo no aportaria res. Un `alt` buit vol dir «aquesta imatge és decorativa». No és el mateix que no posar l'atribut: sense `alt`, un lector de pantalla llegiria el nom del fitxer."
        ),
      ],
    },

    {
      id: 'fase-6',
      label: 'Pàgina del vídeo · Fase 6',
      title: 'El dibuix i les dues columnes',
      blocks: [
        p("Segona pàgina, mateix mètode. La capçalera ja la tenim: és la mateixa, amb el mateix HTML i el mateix CSS. No hi ha menú lateral. I a sota, dues columnes: una d'ampla amb el vídeo i tot el que l'acompanya, i una d'estreta amb els recomanats."),
        custom('BoxSketch', {
          title: 'La pàgina del vídeo, en quadrats',
          tree: {
            name: 'pàgina',
            tag: 'body',
            dir: 'column',
            children: [
              { name: 'capçalera (la mateixa)', tag: 'header.capcalera', h: 26 },
              {
                name: 'pàgina del vídeo',
                tag: 'main.pagina-video',
                dir: 'grid',
                cols: 3,
                children: [
                  {
                    name: 'principal (2 parts)',
                    tag: 'div.principal',
                    dir: 'column',
                    children: [
                      { name: 'reproductor', tag: 'div.reproductor', h: 70 },
                      { name: 'títol', tag: 'h1', h: 22 },
                      { name: 'barra del canal', tag: 'div.barra-canal', h: 26 },
                      { name: 'descripció', tag: 'div.descripcio', h: 26 },
                      { name: 'comentaris', tag: 'section.comentaris', h: 44 },
                    ],
                  },
                  {
                    name: 'recomanats (1 part)',
                    tag: 'aside.recomanats',
                    dir: 'column',
                    children: [
                      { name: 'recomanat', tag: 'a.recomanat', h: 34 },
                      { name: 'recomanat', tag: 'a.recomanat', h: 34 },
                      { name: 'recomanat', tag: 'a.recomanat', h: 34 },
                    ],
                  },
                ],
              },
            ],
          },
          steps: [
            'Dos pisos: la capçalera i tota la resta.',
            'La resta són **dues columnes**, una el doble d\'ampla que l\'altra: `grid-template-columns: 2fr 1fr`.',
            'Cada columna és una pila de quadrats: a l\'esquerra, cinc; a la dreta, un per cada vídeo recomanat.',
          ],
          startLevel: 2,
        }),
        css(CSS_VIDEO_LAYOUT, { title: 'estils.css · les dues columnes' }),
        p("Les columnes es podrien fer amb flex, però amb grid és més directe: dius les proporcions al pare, `2fr 1fr`, i no has de tocar cap dels fills. El `margin-top` és el mateix d'abans: l'espai que tapa la capçalera fixa."),
        example({
          title: 'L\'esquelet de la pàgina del vídeo',
          intro: 'La capçalera funciona sense haver escrit ni una línia nova de CSS: és al full d\'estils que comparteixen les dues pàgines.',
          html: VIDEO_PHASES.layout.html,
          css: VIDEO_PHASES.layout.css,
          fileNames: FILES_VIDEO,
          focus: 'html',
          boxes: true,
          ...WINDOW,
          viewport: 480,
          expected: 'A sota de la capçalera, dues columnes: a l\'esquerra, la més ampla, cinc caixes apilades; a la dreta, tres caixes de recomanats.',
          why: "`2fr 1fr` reparteix l'amplada en tres parts i en dona dues a la primera columna. Dins de cada columna, els quadrats s'apilen perquè són blocs.",
        }),
        concept(
          'Un sol full d\'estils',
          "Les dues pàgines enllacen el mateix `estils.css`. Tot el que es repeteix (la capçalera, els avatars, les miniatures, el text gris de les dades) s'escriu una sola vegada. Si un dia canvies el color del logo, canvia a tot arreu."
        ),
      ],
    },

    {
      id: 'fase-7',
      label: 'Pàgina del vídeo · Fase 7',
      title: 'El reproductor i la barra del canal',
      blocks: [
        p("La columna principal és una pila de cinc quadrats, i n'hi ha dos que tenen feina a dins."),
        p("**El reproductor.** A sobre de la imatge hi ha una barra de controls. És el mateix cas que la durada de les miniatures: el quadrat de fora és `relative` i la barra, `absolute`. La diferència és que la barra no va en una cantonada: va de banda a banda. Per això té `left: 0` i `right: 0` alhora, que l'estiren, i `bottom: 0`, que l'enganxa a baix."),
        p("I dins de la barra, els controls van en fila: és un contenidor flex. L'últim botó té `margin-left: auto`, que l'envia a la dreta de tot."),
        p("**La barra del canal.** Dos grups, un a cada punta: `space-between`. A l'esquerra, l'avatar, el nom del canal i el botó de subscriure's, que és una altra fila. A la dreta, els dos botons de valoració, una altra fila. Tres contenidors flex, i cap amplada escrita a mà."),
        css(CSS_VIDEO_MAIN, { title: 'estils.css · reproductor i canal' }),
        example({
          title: 'La columna principal',
          intro: 'Activa els quadrats i compta els contenidors flex que hi ha a la barra del canal. Els comentaris ja hi són, però encara sense col·locar.',
          html: VIDEO_PHASES.main.html,
          css: VIDEO_PHASES.main.css,
          fileNames: FILES_VIDEO,
          ...WINDOW,
          expected: 'El reproductor amb una barra fosca de controls a baix, el títol, el canal a l\'esquerra amb el botó «Subscriu-te» i els botons de valoració a la dreta. A sota, la descripció sobre un fons gris.',
          why: "Cada peça és una eina que ja coneixies: `relative` i `absolute` per posar una cosa a sobre d'una altra, i flex per a cada fila. La pàgina sembla complicada, però no hi ha res de nou.",
        }),
      ],
    },

    {
      id: 'fase-8',
      label: 'Pàgina del vídeo · Fase 8',
      title: 'Els comentaris i els recomanats',
      blocks: [
        p("Les dues peces que queden són la mateixa peça. Un comentari és un avatar amb un bloc de text al costat. Un vídeo recomanat és una miniatura amb un bloc de text al costat. **Una imatge i, al costat, una columna de text**: una fila amb `gap`."),
        p("És el mateix patró de la part de sota de la targeta de la pàgina inicial. L'has fet servir tres vegades en un sol projecte, i el trobaràs a gairebé totes les pàgines que maquetis."),
        css(CSS_VIDEO_SIDE, { title: 'estils.css · comentaris i recomanats' }),
        list(
          "La miniatura dels recomanats reaprofita la classe `.miniatura` de la pàgina inicial, amb la durada inclosa. Només li diem que aquí fa `168px` d'ample i que no s'encongeixi.",
          "La columna de recomanats és un contenidor flex en columna, només per poder separar els vídeos amb `gap`."
        ),
        example({
          title: 'La pàgina del vídeo, acabada',
          intro: 'Compara-la amb el dibuix de la fase 6. Cada quadrat del dibuix és un contenidor de la pàgina.',
          html: VIDEO_PHASES.side.html,
          css: VIDEO_PHASES.side.css,
          fileNames: FILES_VIDEO,
          ...WINDOW,
          expected: 'A l\'esquerra, el vídeo amb tota la seva informació i tres comentaris, cadascun amb l\'avatar al costat. A la dreta, quatre vídeos recomanats amb la miniatura i el títol.',
          why: "No hi ha cap propietat que no hagis vist a les unitats anteriors. El que ha canviat és que ara les has triat tu, quadrat per quadrat, a partir d'un dibuix.",
        }),
      ],
    },

    {
      id: 'enllacar-pagines',
      title: 'Enllaçar les dues pàgines',
      blocks: [
        p("Dues pàgines no fan un lloc web fins que es pot anar de l'una a l'altra. Els enllaços ja són a l'HTML des del principi:"),
        list(
          "A la pàgina inicial, la miniatura i el títol de cada vídeo són enllaços a `video.html`.",
          "A totes dues pàgines, el logo és un enllaç a `index.html`.",
          "A la pàgina del vídeo, cada recomanat és un enllaç a `video.html`."
        ),
        p("Com que els tres fitxers són a la mateixa carpeta, n'hi ha prou amb el nom del fitxer. I cada pàgina ha de carregar el full d'estils al seu `<head>`:"),
        html(INDEX_HTML_FILE.slice(0, INDEX_HTML_FILE.indexOf('<body>') + 6) + '\n    …\n  </body>\n</html>', { title: 'index.html · el document sencer' }),
        warning(
          'Aquí els enllaços no et porten enlloc',
          "La previsualització d'aquest dossier només té una pàgina. Si hi cliques un enllaç, a sota apareix un avís que diu on et portaria. Al teu projecte, amb els fitxers de veritat, el navegador canviarà de pàgina."
        ),
        concept(
          'Totes les targetes porten al mateix vídeo',
          "Sí: cliquis el vídeo que cliquis, s'obre la mateixa `video.html`. Amb HTML i CSS no es pot fer d'una altra manera sense escriure una pàgina per a cada vídeo. Fer que una sola pàgina mostri el vídeo que has triat és feina de JavaScript, i és una de les coses que aprendràs al [dossier següent](#/ra2)."
        ),
      ],
    },

    {
      id: 'projecte-acabat',
      title: 'El projecte acabat i la teva llista',
      blocks: [
        p("Aquí tens les dues pàgines amb tot el codi. Canvia el que vulguis: és la millor manera d'entendre què fa cada línia."),
        custom('PageDemo', { showCode: true }),
        p("I aquesta és la llista per al teu projecte. Marca cada punt quan l'hagis comprovat **a la teva pàgina**, amb el navegador obert."),
        custom('ProjectChecklist'),
        p("Quan ho tinguis tot, la teva pàgina es veurà com una de veritat. Però prova de clicar el botó del menú, d'escriure al cercador o de fer «m'agrada»: no passa res. És una maqueta. Fer que respongui és el que ve ara, al dossier de [JavaScript](#/ra2), i el projecte final d'aquell dossier és aquesta mateixa pàgina."),
      ],
    },
  ],

  commonErrors: [
    {
      title: 'La capçalera fixa tapa el principi de la pàgina',
      bad: `.capcalera {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
}`,
      badLang: 'css',
      symptom: 'El primer tros del contingut no es veu: ha quedat a sota de la capçalera.',
      why: "Un element fix no ocupa lloc. El contingut comença a dalt de tot de la pàgina, com si la capçalera no hi fos.",
      fix: `.contingut {
  margin-top: 56px;
}`,
      fixLang: 'css',
    },
    {
      title: 'Les durades se\'n van totes a la cantonada de la pàgina',
      bad: `.durada {
  position: absolute;
  right: 8px;
  bottom: 8px;
}`,
      badLang: 'css',
      symptom: 'Cap miniatura té la durada a sobre. Estan totes amuntegades a baix a la dreta de la finestra.',
      why: "`absolute` es col·loca respecte de l'avantpassat posicionat més proper. Si la miniatura no té `position`, la referència acaba sent la pàgina sencera.",
      fix: `.miniatura {
  position: relative;
}

.durada {
  position: absolute;
  right: 8px;
  bottom: 8px;
}`,
      fixLang: 'css',
    },
    {
      title: 'Les miniatures surten de la seva columna',
      bad: `.miniatura img {
  border-radius: 12px;
}`,
      badLang: 'css',
      symptom: 'Les imatges són enormes, es trepitgen entre elles i la graella es desmunta.',
      why: "Una imatge es mostra a la seva mida real, que aquí són 640 píxels d'ample, encara que la columna sigui més estreta. Cal dir-li que faci l'amplada del seu contenidor.",
      fix: `.miniatura img {
  width: 100%;
  border-radius: 12px;
}`,
      fixLang: 'css',
    },
    {
      title: 'L\'avatar queda aixafat quan el títol és llarg',
      bad: `.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
}`,
      badLang: 'css',
      symptom: 'En algunes targetes, l\'avatar ja no és rodó: és un oval estret.',
      why: "Dins d'un contenidor flex, quan falta espai els fills s'encongeixen, també els que tenen una amplada escrita. `flex: none` li diu que no canviï de mida.",
      fix: `.avatar {
  flex: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
}`,
      fixLang: 'css',
    },
    {
      title: 'Separar el botó i el logo sense voler',
      bad: `<header class="capcalera">
  <button class="boto-icona" type="button">☰</button>
  <a class="logo" href="index.html">ClasseTube</a>
  <form class="cercador">…</form>
  <div class="capcalera-dreta">…</div>
</header>`,
      badLang: 'html',
      symptom: 'El botó del menú queda a l\'esquerra i el logo se\'n va cap al mig, lluny del botó.',
      why: "La capçalera reparteix els seus fills directes amb `space-between`. Si el botó i el logo són dos fills diferents, els separa com fa amb tots els altres.",
      fix: `<header class="capcalera">
  <div class="capcalera-esquerra">
    <button class="boto-icona" type="button">☰</button>
    <a class="logo" href="index.html">ClasseTube</a>
  </div>
  <form class="cercador">…</form>
  <div class="capcalera-dreta">…</div>
</header>`,
      fixLang: 'html',
    },
  ],

  exercises: [
    {
      id: 'quatre-columnes',
      title: 'Una graella de quatre columnes',
      statement: "Fes que la graella de vídeos de la pàgina inicial tingui quatre columnes en lloc de tres. Escriu la regla al final del CSS, sense tocar les que ja hi ha.",
      expected: 'Quatre vídeos a la primera fila i dos a la segona.',
      html: HOME_HTML,
      css: starterCss,
      fileNames: FILES_HOME,
      ...WINDOW,
      partialSolution: true,
      hint: 'Una regla que ve després guanya la d\'abans. Només has de tornar a escriure la propietat que canvia.',
      solution: { css: RULES_COLUMNS },
      full: { css: withRules(RULES_COLUMNS) },
      explanation: "Com que la regla nova és més avall al fitxer i té el mateix selector, substitueix el valor anterior de `grid-template-columns`. La resta de propietats de `.graella`, com `gap`, continuen valent.",
      checks: [
        { label: 'La graella té quatre columnes', selector: '.graella > .video', columns: 4 },
        { label: 'Les quatre columnes fan la mateixa amplada', selector: '.graella > .video', sameSize: 'width' },
      ],
    },
    {
      id: 'en-directe',
      title: 'Una insígnia «EN DIRECTE»',
      statement: "El primer vídeo s'està emetent ara mateix. A l'HTML ja hi té una insígnia, `<span class=\"directe\">`, però apareix a sota de la miniatura. Col·loca-la a sobre, a la cantonada de **dalt a l'esquerra**, a 8 píxels de les vores.",
      expected: 'El text «EN DIRECTE», en blanc sobre vermell, a la cantonada superior esquerra de la primera miniatura.',
      html: HOME_WITH_BADGE,
      css: `${starterCss}
.directe {
  padding: 2px 6px;
  font-size: 12px;
  font-weight: bold;
  color: #ffffff;
  background: #c81e1e;
  border-radius: 4px;
}`,
      fileNames: FILES_HOME,
      ...WINDOW,
      partialSolution: true,
      hint: 'És el mateix que fa `.durada`, a la cantonada contrària. La miniatura ja és `relative`.',
      solution: { css: RULES_BADGE },
      full: { css: withRules(RULES_BADGE) },
      explanation: "La insígnia és filla de `.miniatura`, que ja té `position: relative`. Amb `absolute`, `top` i `left` es compten des de la cantonada de la miniatura.",
      checks: [
        { label: 'La insígnia és a 8 píxels de la vora de dalt', selector: '.directe', inside: '.miniatura', offset: { top: 8 } },
        { label: 'I a 8 píxels de la vora esquerra', selector: '.directe', inside: '.miniatura', offset: { left: 8 } },
        { label: 'La durada continua al seu lloc', selector: '.video:first-child .durada', inside: '.miniatura', offset: { right: 8, bottom: 8 } },
      ],
    },
    {
      id: 'peu-de-pagina',
      title: 'Un peu de pàgina',
      statement: [
        "Afegeix un peu al final del contingut, dins del `<main>`, després de la graella: un `<footer class=\"peu\">` amb tres enllaços, «Qui som», «Contacte» i «Condicions».",
        "Els enllaços han d'anar en fila, centrats i separats 24 píxels. Has d'escriure l'HTML i el CSS.",
      ],
      expected: 'A sota de l\'última fila de vídeos, tres enllaços grisos centrats sota una línia fina.',
      html: HOME_WITH_FOOTER_SLOT,
      css: starterCss,
      fileNames: FILES_HOME,
      focus: 'html',
      ...WINDOW,
      partialSolution: true,
      hint: [
        'El peu va dins del `<main>` perquè així hereta els seus marges i no queda a sota del menú.',
        'Per al CSS: una fila centrada amb separació. Tot s\'escriu al pare dels enllaços.',
      ],
      solution: { html: FOOTER_HTML, css: RULES_FOOTER },
      full: { html: HOME_WITH_FOOTER, css: withRules(RULES_FOOTER) },
      explanation: "El peu és un quadrat més dins del contingut, a sota de la graella. Els seus tres fills van en fila: `display: flex`, centrats amb `justify-content` i separats amb `gap`.",
      checks: [
        { label: 'Hi ha un peu dins del contingut', selector: 'main.contingut > footer.peu' },
        { label: 'El peu té tres enllaços', selector: '.peu a', count: 3 },
        { label: 'El peu és a sota de la graella', selector: '.peu', below: '.graella' },
        { label: 'Els enllaços estan en fila, separats 24 píxels', selector: '.peu a', arrange: 'row', gap: 24 },
        { label: 'L\'enllaç del mig queda centrat', selector: '.peu a:nth-child(2)', centered: 'x', tol: 12 },
      ],
    },
    {
      id: 'boto-flotant',
      title: 'Un botó que no es mou',
      statement: "Al final de l'HTML hi ha un enllaç, «↑ Puja», que ara surt a sota de tot. Converteix-lo en un botó flotant: sempre visible a la cantonada de baix a la dreta de la finestra, a 24 píxels de les vores, encara que baixis per la pàgina.",
      expected: 'Una píndola negra amb el text «↑ Puja» a baix a la dreta. En baixar per la pàgina, no es mou.',
      html: HOME_WITH_BUTTON,
      css: `${starterCss}
.puja {
  padding: 10px 16px;
  font-weight: bold;
  color: #ffffff;
  background: #0f0f0f;
  border-radius: 20px;
}`,
      fileNames: FILES_HOME,
      ...WINDOW,
      partialSolution: true,
      hint: 'Quin valor de `position` es col·loca respecte de la finestra i no es mou en fer scroll? Després, dues distàncies.',
      solution: { css: RULES_BUTTON },
      full: { css: withRules(RULES_BUTTON) },
      explanation: "`position: fixed` col·loca l'element respecte de la finestra, no de la pàgina: `right` i `bottom` es compten des de les vores de la finestra, i en fer scroll es queda on és. És el mateix que fan la capçalera i el menú.",
      checks: [
        { label: 'El botó és a 24 píxels de la vora dreta de la finestra', selector: '.puja', at: { right: 24 } },
        { label: 'I a 24 píxels de la vora de baix', selector: '.puja', at: { bottom: 24 } },
        { label: 'Està fixat a la finestra', selector: '.puja', style: { position: 'fixed' } },
      ],
    },
  ],

  finalExercise: {
    id: 'menu-mini',
    title: 'El menú lateral, en versió mini',
    statement: [
      "Quan a YouTube plegues el menú, queda una columna estreta on cada opció és una icona amb el nom a sota. Fes aquesta versió: el menú ha de fer **88 píxels** d'ample i, a cada enllaç, la icona ha d'anar **a sobre** del text, tots dos centrats.",
      "A l'HTML, cada enllaç ja té dos `<span>`: la icona i el nom. Recorda que, si el menú canvia d'amplada, hi ha una altra cosa a la pàgina que també ha de canviar.",
    ],
    expected: 'Un menú estret amb quatre opcions: la icona a dalt i el nom a sota, centrats. La graella de vídeos comença just on acaba el menú i és més ampla que abans.',
    html: HOME_WITH_ICONS,
    css: starterCss,
    fileNames: FILES_HOME,
    ...WINDOW,
    boxes: true,
    partialSolution: true,
    hint: [
      'Cada enllaç del menú és un quadrat amb dues coses apilades i centrades: un contenidor flex en columna.',
      'El contingut té un `margin-left` que coincideix amb l\'amplada del menú. Si l\'una canvia, l\'altre també.',
    ],
    solution: { css: RULES_MINI },
    full: { css: withRules(RULES_MINI) },
    explanation: [
      "Hi ha tres decisions. El menú passa a fer 88 píxels. Cada enllaç es converteix en un contenidor flex en columna, que apila la icona i el nom i els centra amb `align-items`. I el contingut redueix el seu marge esquerre fins als mateixos 88 píxels, per continuar començant on acaba el menú.",
      "Aquesta última és la que s'oblida: el menú és fix i no empeny ningú, així que la relació entre les dues mides l'has de mantenir tu.",
    ],
    checks: [
      { label: 'El menú fa 88 píxels d\'ample', selector: '.menu', size: { width: 88 } },
      { label: 'A cada opció, la icona va a sobre del nom', selector: '.menu a:first-child > span', arrange: 'column' },
      { label: 'La icona està centrada dins de l\'opció', selector: '.icona', all: true, centered: 'x' },
      { label: 'El contingut comença on acaba el menú', selector: '.contingut', at: { left: 88 } },
      { label: 'El menú continua fixat a l\'esquerra, sota la capçalera', selector: '.menu', at: { left: 0, top: 56 } },
    ],
  },

  summary: [
    "Una pàgina sencera es maqueta **quadrat a quadrat**: es dibuixa, es converteix en contenidors i es col·loca, de fora cap a dins.",
    "Per a cada quadrat amb fills, una pregunta: **fila, columna o graella?** Una fila o una columna és flex; files i columnes alhora, grid.",
    "El que ha d'anar **a sobre** d'una altra cosa (la durada, els controls) es fa amb `relative` al de fora i `absolute` al de dins.",
    "El que **no s'ha de moure** en fer scroll (la capçalera, el menú) es fa amb `fixed`, i cal reservar el seu espai amb marges.",
    "El que es mou junt va dins del mateix quadrat: un contenidor de més pot ser exactament el que falta.",
    "El patró «imatge i, al costat, una columna de text» surt a tot arreu: targetes, comentaris, llistes.",
    "Un sol full d'estils serveix per a totes les pàgines del lloc.",
  ],

  quiz: [
    {
      question: 'Has de maquetar una pàgina que no has vist mai. Què fas primer?',
      options: [
        { text: 'Dibuixar els quadrats grans i decidir com es col·loquen els fills de cada un', correct: true },
        { text: 'Escriure tot l\'HTML del contingut, de dalt a baix', why: 'Sense saber quins contenidors necessites, hauràs de refer l\'HTML quan vulguis col·locar les coses.' },
        { text: 'Triar els colors i les lletres', why: 'L\'aspecte va al final. Primer cal que cada cosa sigui al seu lloc.' },
        { text: 'Posar `display: flex` al `<body>`', why: 'No se sap encara si el `<body>` ha de col·locar res. Les eines es trien després de dibuixar.' },
      ],
      explanation: 'El dibuix decideix quins contenidors hi haurà i quina eina necessita cada un. Tota la resta en depèn.',
    },
    {
      question: 'La capçalera té `position: fixed` i `height: 56px`. Què cal perquè no tapi el principi del contingut?',
      options: [
        { text: 'Donar al contingut un `margin-top` (o `padding-top`) de 56 píxels', correct: true },
        { text: 'Posar `z-index: 10` a la capçalera', why: '`z-index` decideix qui queda a sobre, i justament fa que la capçalera tapi. No mou el contingut.' },
        { text: 'Res: els elements fixos empenyen el contingut cap avall', why: 'És al revés: un element fix surt del flux i no ocupa lloc.' },
        { text: 'Posar `position: relative` al contingut', why: 'Això no el mou de lloc. Cal reservar l\'espai amb un marge o un padding.' },
      ],
      explanation: 'Un element fix no ocupa lloc. L\'espai que tapa s\'ha de reservar a mà, amb la mateixa mida que fa.',
    },
    {
      question: 'Per què el botó del menú i el logo són dins d\'un `<div>` propi, a la capçalera?',
      options: [
        { text: 'Perquè han d\'anar junts: si fossin fills directes, `space-between` els separaria', correct: true },
        { text: 'Perquè un `<button>` no pot ser fill d\'un `<header>`', why: 'Sí que pot. No és un problema d\'HTML sinó de col·locació.' },
        { text: 'Perquè així el logo es veu més gran', why: 'Un contenidor no canvia la mida del que té a dins.' },
        { text: 'Perquè tots els elements han d\'anar dins d\'un `<div>`', why: 'Al contrari: només s\'afegeix un contenidor quan agrupa coses que s\'han de col·locar juntes.' },
      ],
      explanation: 'Un contenidor flex reparteix els seus fills directes. Per mantenir dues coses juntes, han de ser un sol fill: un quadrat que les agrupi.',
    },
    {
      question: 'La durada ha de sortir a sobre de la miniatura, a baix a la dreta. Quina combinació ho aconsegueix?',
      options: [
        { text: '`position: relative` a la miniatura i `position: absolute` a la durada', correct: true },
        { text: '`position: absolute` a la miniatura i `position: relative` a la durada', why: 'És al revés: el de fora fa de referència (`relative`) i el de dins es col·loca (`absolute`).' },
        { text: '`position: fixed` a la durada', why: 'Es col·locaria respecte de la finestra, no de la miniatura, i no es mouria en fer scroll.' },
        { text: '`display: flex` a la miniatura i `justify-content: flex-end`', why: 'Flex posa les coses de costat, no a sobre. La durada quedaria al costat de la imatge.' },
      ],
      explanation: 'El pare, `relative`, és la referència. El fill, `absolute`, es col·loca des de les seves vores amb `right` i `bottom`.',
    },
    {
      question: 'Per a la graella de vídeos hem fet servir grid, i per a la fila de xips, flex. Per què?',
      options: [
        { text: 'Els xips van en una sola direcció; els vídeos, en files i columnes alhora', correct: true },
        { text: 'Flex només funciona amb botons i grid, amb imatges', why: 'Totes dues eines funcionen amb qualsevol element.' },
        { text: 'Grid és més modern i s\'hauria de fer servir sempre', why: 'Cap de les dues substitueix l\'altra: resolen problemes diferents.' },
        { text: 'Perquè flex no pot separar els fills', why: 'Sí que pot, amb `gap`, igual que grid.' },
      ],
      explanation: 'Flex col·loca en una direcció (una fila o una columna). Grid, en dues alhora: files i columnes alineades.',
    },
    {
      question: 'Les dues pàgines fan servir la mateixa capçalera. Quantes vegades cal escriure\'n el CSS?',
      options: [
        { text: 'Una: les dues pàgines enllacen el mateix `estils.css`', correct: true },
        { text: 'Dues: una a cada fitxer HTML', why: 'El CSS no s\'escriu als fitxers HTML, sinó en un full d\'estils que totes dues enllacen.' },
        { text: 'Dues: cal un full d\'estils per pàgina', why: 'Es pot fer, però llavors cada canvi s\'hauria de repetir. Un sol full és més senzill.' },
        { text: 'Cap: el navegador la copia sol', why: 'El navegador aplica els estils que troba al full enllaçat; no copia res d\'una pàgina a l\'altra.' },
      ],
      explanation: 'L\'HTML de la capçalera sí que es repeteix a cada pàgina, però els seus estils són en un sol fitxer que comparteixen.',
    },
  ],
};
