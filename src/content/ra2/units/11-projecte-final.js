import { p, list, steps, code, example, concept, warning, table, custom } from '../../blocks.js';
import {
  DATA_JS,
  DATA_JS_SAMPLE,
  HOME_HTML,
  HOME_HTML_STATIC,
  HOME_HTML_EXCERPT,
  HOME_HTML_FULL,
  VIDEO_HTML,
  VIDEO_HTML_FULL,
  HEAD_INDEX,
  HEAD_VIDEO,
  PROJECT_CSS,
  PROJECT_CSS_FULL,
  HOME_PHASE_JS,
  HOME_JS,
  HOME_STATE_SEARCH,
  HOME_ELEMENTS_MENU,
  HOME_ELEMENTS_SEARCH,
  HOME_ELEMENTS_CHIPS,
  FN_MATCH,
  FN_CATEGORY,
  FN_VISIBLE_V1,
  FN_VISIBLE_V2,
  FN_CARD,
  HOME_RENDER_V1,
  HOME_RENDER_V2,
  EVENT_MENU,
  EVENT_SEARCH,
  EVENT_CHIPS,
  START,
  VIDEO_PHASE_JS,
  VIDEO_JS,
  VIDEO_JS_SAVE,
  VIDEO_STATE_RATING,
  VIDEO_STATE_SUBSCRIBE,
  VIDEO_STATE_COMMENTS,
  VIDEO_ELEMENTS_COMMENTS,
  FN_RATING,
  FN_SUBSCRIBERS,
  FN_VALIDATE,
  FN_ADD_COMMENT,
  FN_REMOVE_COMMENT,
  FN_RELATED,
  RENDER_RATING,
  RENDER_SUBSCRIBE,
  RENDER_DESCRIPTION,
  FN_COMMENT_ELEMENT,
  RENDER_COMMENTS,
  FN_RELATED_ELEMENT,
  RENDER_RELATED,
  EVENT_RATING,
  EVENT_SUBSCRIBE,
  FN_CLEAR_FORM,
  EVENT_COMMENTS,
  DELETE_BUTTON,
  LINK_CARD,
  LINK_READ,
  LINK_RENDER,
  SAVE_FUNCTIONS,
  LOAD_FUNCTIONS,
} from '../projectCode.js';

// Els noms dels fitxers que es veuen a les pestanyes de cada editor.
const HOME_FILES = { js: 'inici.js', data: 'dades.js', html: 'index.html', css: 'estils.css' };
const VIDEO_FILES = { js: 'video.js', data: 'dades.js', html: 'video.html', css: 'estils.css' };

const HOME_HEADER_HTML = HOME_HTML.slice(0, HOME_HTML.indexOf('</header>') + '</header>'.length);

const RATING_HTML = `<div class="valoracio">
  <button type="button" id="boto-agrada" aria-pressed="false">M'agrada · <span id="total-agrada">1240</span></button>
  <button type="button" id="boto-no-agrada" aria-pressed="false">No m'agrada</button>
</div>`;

const COMMENTS_HTML = `<section class="comentaris" aria-labelledby="titol-comentaris">
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
</section>`;

export default {
  id: 'projecte-final',
  number: 11,
  title: 'Projecte final: el teu YouTube, amb JavaScript',
  shortTitle: 'Projecte final',
  description:
    "Agafa les dues pàgines que vas maquetar al RA1, la inicial i la del vídeo, i afegeix-hi les interaccions principals. Ho faràs per fases, i cada fase acaba amb alguna cosa que funciona.",

  problem: {
    title: 'La pàgina del RA1 sembla YouTube, però no fa res',
    text: [
      "Al RA1 vas maquetar amb HTML i CSS dues pàgines d'una plataforma de vídeos: la pàgina inicial, amb la graella, i la pàgina d'un vídeo, amb els botons, la descripció i els comentaris. Es veuen com les de veritat. Però prova de fer-hi alguna cosa: el menú no s'obre, el cercador no cerca, el botó de «m'agrada» no compta i el formulari de comentaris recarrega la pàgina.",
      "Al llarg de deu unitats has après tot el que cal per arreglar-ho, treballant amb un gestor de tasques d'exemple. Ara toca fer el que es fa a la feina de veritat: **aplicar el mateix a un projecte diferent**, que a més és teu. No hi ha cap concepte nou important. La dificultat és reconèixer, a cada interacció, quina de les eines que ja tens hi encaixa, i per això ho farem fase a fase, comprovant cada pas abans de fer el següent.",
    ],
  },

  goals: [
    "Preparar un HTML estàtic perquè JavaScript el pugui fer funcionar.",
    "Separar les dades de la pàgina i pintar-la a partir d'un array d'objectes.",
    "Programar un menú desplegable, un cercador, filtres, botons amb estat i un formulari de comentaris.",
    "Organitzar el codi de dues pàgines en fitxers que comparteixen les dades.",
    "Guardar i recuperar dades amb `localStorage` com a ampliació.",
  ],

  sections: [
    {
      id: 'el-pla',
      title: 'Abans de començar: el pla',
      blocks: [
        p("Aquest és el resultat que busquem. Prova'l abans de continuar, canviant de pàgina amb els dos botons de dalt: obre el menú, cerca «grid», filtra per categoria, fes «m'agrada», subscriu-te i escriu un comentari."),
        custom('ProjectDemo'),
        p("La pàgina de mostra es diu ClasseTube i és més senzilla que la teva, però té les mateixes peces. Aquestes són les interaccions que hi afegiràs, i totes es fan amb eines que ja coneixes:"),
        table(
          ['Pàgina', 'Interacció', 'Amb què es fa'],
          [
            ['Inicial', 'Obrir i tancar el menú lateral', '`classList.toggle` (unitats 7 i 8)'],
            ['Inicial', 'Pintar la graella a partir de dades', "Array d'objectes i `createElement` (6 i 7)"],
            ['Inicial', 'Cercar vídeos pel títol', 'Esdeveniments `input` i `submit` (8 i 9)'],
            ['Inicial', 'Filtrar per categoria', 'Condicions amb `&&` i `querySelectorAll` (3 i 7)'],
            ['Vídeo', '«M\'agrada» i «No m\'agrada»', 'Booleans i l\'operador `!` (2 i 3)'],
            ['Vídeo', 'Subscriure\'s i desplegar la descripció', 'El mateix patró, i `classList` (7)'],
            ['Vídeo', 'Escriure comentaris', 'Formularis i validació (9)'],
            ['Vídeo', 'Mostrar vídeos recomanats', 'Un bucle amb una condició (4 i 6)'],
          ],
          'Les interaccions del projecte'
        ),
        p("El projecte tindrà **tres fitxers de JavaScript**. Fins ara sempre n'havies tingut un de sol, `app.js`, perquè només hi havia una pàgina. Ara n'hi ha dues:"),
        table(
          ['Fitxer', 'Què hi ha', 'Quina pàgina el carrega'],
          [
            ['`dades.js`', "L'array amb tots els vídeos", 'Totes dues'],
            ['`inici.js`', 'El comportament de la pàgina inicial', '`index.html`'],
            ['`video.js`', 'El comportament de la pàgina del vídeo', '`video.html`'],
          ],
          'Els fitxers de JavaScript'
        ),
        concept(
          'Un fitxer de comportament per a cada pàgina',
          "Cada pàgina carrega només el codi que necessita. Si ho posessis tot en un sol fitxer, a la pàgina inicial es buscarien botons que només existeixen a la pàgina del vídeo: `querySelector` retornaria `null` i el programa s'aturaria amb un error abans d'arribar a fer res."
        ),
        p("Dins de cada fitxer, el codi s'organitza sempre en el mateix ordre. És l'estructura que evita que cent línies es converteixin en un embolic:"),
        table(
          ['Zona', 'Què hi ha', 'Exemples'],
          [
            ['**1. Estat**', 'Les dades que poden canviar', '`textCerca`, `categoriaActual`, `agrada`, `comentaris`'],
            ['**2. Elements**', 'Les referències als elements de la pàgina', '`graella`, `inputCerca`, `botoAgrada`'],
            ['**3. Funcions de dades**', "Llegeixen o modifiquen l'estat. No toquen la pàgina.", '`obtenirVideosVisibles`, `validarComentari`'],
            ['**4. Funcions de pàgina**', "Pinten la pàgina a partir de l'estat.", '`crearTargetaVideo`, `renderitzar`'],
            ['**5. Esdeveniments**', 'Connecten les accions de la persona amb les funcions.', 'Els `addEventListener`'],
          ],
          "L'estructura d'inici.js i de video.js"
        ),
        concept(
          'Una sola direcció',
          "Els esdeveniments canvien l'estat. Després es crida una funció que pinta la pàgina a partir de l'estat. Mai al revés: cap funció llegeix la pàgina per saber si has fet «m'agrada» o quina categoria hi ha triada. Les dades són a les variables, i la pàgina només n'és el reflex."
        ),
        warning(
          "El teu HTML no és el d'aquests apunts",
          "Els `id` i les classes de la teva pàgina seran diferents dels de ClasseTube. No copiïs l'HTML de mostra: **adapta els selectors** al teu i afegeix-hi els `id` que facin falta. El que has de conservar és l'estructura del JavaScript."
        ),
        p("Com has de treballar:"),
        steps(
          "Fes una **còpia** de la carpeta del projecte del RA1 i treballa sempre sobre la còpia. Si alguna cosa es trenca, tindràs l'original.",
          "A cada fase, **escriu el codi al teu projecte**, a mà. No el copiïs: escriure'l és el que fa que l'entenguis.",
          "Obre la pàgina al navegador, amb la consola oberta, i comprova que fa el que diu la fase.",
          "No passis a la fase següent fins que l'actual funcioni. Si alguna cosa falla, aplica el mètode de la unitat anterior."
        ),
        p("A cada fase trobaràs un exemple executable amb la pàgina de mostra tal com ha de quedar en aquell punt. Les pestanyes de l'editor són els fitxers del projecte. Fes-lo servir per comparar-lo amb el teu, no com a punt de partida."),
      ],
    },

    {
      id: 'fase-1',
      label: 'Pàgina inicial · Fase 1',
      title: "Preparar l'HTML i connectar els fitxers",
      blocks: [
        p("JavaScript ha de poder trobar els elements que farà funcionar. Abans d'escriure cap línia de codi, repassa l'HTML de la teva pàgina inicial i prepara'l:"),
        list(
          "Posa un **`id`** a cada element que JavaScript hagi de trobar: el botó del menú, el formulari de cerca, el camp de text i el contenidor de la graella.",
          "Assegura't que el menú, el cercador i els filtres són **elements interactius de veritat**: `<button>`, `<form>` i `<input>`. Un `<div>` amb aspecte de botó no es pot fer servir amb el teclat.",
          "Si el camp de cerca i el seu botó no són dins d'un **`<form>`**, posa-los-hi. Així la cerca també funcionarà prement Retorn.",
          "Als botons que tenen dos estats, afegeix-hi l'atribut que el descriu: **`aria-expanded`** al botó del menú i **`aria-pressed`** a cada filtre de categoria.",
          "Afegeix dos elements que segurament no tens: un paràgraf buit per dir quants vídeos es mostren (`#resum`) i un missatge per quan la cerca no trobi res (`#sense-resultats`), amagat amb **`hidden`**."
        ),
        p("A la pàgina de mostra, la capçalera queda així:"),
        code(HOME_HEADER_HTML, { lang: 'html', title: 'index.html (la capçalera)' }),
        p("Després, connecta els fitxers. Crea `dades.js` i `inici.js` a la carpeta del projecte i enllaça'ls al `<head>` d'`index.html`:"),
        code(HEAD_INDEX, { lang: 'html', title: 'index.html (el head)' }),
        concept(
          "L'ordre de les etiquetes script importa",
          "Amb `defer`, els fitxers s'executen en l'ordre en què estan escrits. `inici.js` farà servir l'array que es declara a `dades.js`, i per això `dades.js` ha d'anar primer."
        ),
        example({
          title: 'Fase 1: els fitxers estan connectats',
          intro: "La pàgina encara és la del RA1: les targetes estan escrites a mà a l'HTML, com pots veure a la pestanya `index.html`. JavaScript només escriu a la consola.",
          html: HOME_HTML_STATIC,
          css: PROJECT_CSS,
          dataJs: `console.log("dades.js connectat");`,
          js: `console.log("inici.js connectat");`,
          fileNames: HOME_FILES,
          expected: "A la consola, `dades.js connectat` i després `inici.js connectat`. La pàgina es veu com sempre i cap botó fa res.",
          why: "Cada fitxer deixa un missatge quan s'executa, i l'ordre dels missatges és l'ordre de les etiquetes `<script>`. No continuïs fins que vegis tots dos missatges al teu projecte: si en falta un, el nom del fitxer o la carpeta no coincideixen amb el que hi ha a l'atribut `src`.",
        }),
      ],
    },

    {
      id: 'fase-2',
      label: 'Pàgina inicial · Fase 2',
      title: 'El menú lateral',
      blocks: [
        p("Comencem per la interacció més senzilla, que a més no necessita dades: el botó de les tres ratlles. El CSS ja sap com es veu el menú obert i com es veu tancat. A la pàgina de mostra està amagat, i es mostra quan el `<body>` té la classe `menu-obert`:"),
        code(`.menu {
  display: none;
}

body.menu-obert .menu {
  display: flex;
}`, { lang: 'css', title: 'estils.css' }),
        p("JavaScript, doncs, no ha de tocar cap estil: només ha de posar i treure aquesta classe. És el patró de la unitat 7. Aquestes són les primeres línies d'`inici.js`:"),
        code(`${HOME_ELEMENTS_MENU}\n\n// ---------- 5. Esdeveniments ----------\n${EVENT_MENU}`, { title: 'inici.js' }),
        list(
          "`classList.toggle` posa la classe si no hi és i la treu si hi és: un sol listener serveix per obrir i per tancar.",
          "`classList.contains` ens diu com ha quedat, amb un booleà.",
          "`aria-expanded` ha de ser el text `\"true\"` o `\"false\"`, i `String()` hi converteix el booleà. Sense això, qui navega amb un lector de pantalla no sap si el menú és obert."
        ),
        example({
          title: 'Fase 2: el menú s\'obre i es tanca',
          intro: "Prem el botó de les tres ratlles unes quantes vegades.",
          html: HOME_HTML_STATIC,
          css: PROJECT_CSS,
          js: HOME_PHASE_JS.menu,
          fileNames: HOME_FILES,
          expected: "El menú apareix amb el primer clic i desapareix amb el segon. La resta de la pàgina continua sense fer res.",
          why: "Tot el canvi d'aspecte el fa el CSS, amb la regla `body.menu-obert .menu`. JavaScript només decideix si la classe hi és o no. Si demà canvies el disseny del menú, no hauràs de tocar ni una línia de JavaScript.",
        }),
        warning(
          "Si al teu disseny el menú es veu d'entrada",
          "Fes-ho al revés: una classe `menu-tancat` que l'amagui. El JavaScript és idèntic; només canvien el nom de la classe i el valor inicial d'`aria-expanded` a l'HTML, que haurà de ser `\"true\"`."
        ),
      ],
    },

    {
      id: 'fase-3',
      label: 'Pàgina inicial · Fase 3',
      title: 'Les dades i la graella de vídeos',
      blocks: [
        p("Ara mateix, cada vídeo de la teva pàgina és un bloc d'HTML escrit a mà:"),
        code(HOME_HTML_EXCERPT, { lang: 'html', title: 'index.html (ara)' }),
        p("Això té un problema que ja coneixes de la unitat 6: les dades estan barrejades amb la presentació. Per cercar o filtrar vídeos, JavaScript ha de poder preguntar «quin títol té?» o «de quina categoria és?», i això no es pot fer còmodament amb un tros d'HTML. La solució és la mateixa que amb les tasques: **un array d'objectes**."),
        p("Obre `dades.js` i escriu-hi un objecte per a cada vídeo de la teva pàgina, amb les dades que ara tens repartides per l'HTML:"),
        code(DATA_JS_SAMPLE, { title: 'dades.js' }),
        list(
          "`id` és un nombre diferent per a cada vídeo. Serveix per saber quin vídeo és quin, encara que dos tinguin el mateix títol.",
          "`categoria` no es veu a la targeta, però la necessitarem per filtrar.",
          "`color` és el nom d'una classe de CSS. A la pàgina de mostra, les miniatures són blocs de color per no dependre de fitxers d'imatge."
        ),
        concept(
          'Al teu projecte, les miniatures són imatges',
          "En lloc de `color`, guarda el camí de la imatge, per exemple `miniatura: \"img/css-grid.jpg\"`. A la funció que crea la targeta, crea un element `img` i posa-li els atributs `src` i `alt` amb `setAttribute`, com vas fer a la unitat 7."
        ),
        p("Quan tinguis les dades, **esborra les targetes de l'HTML** i deixa el contenidor buit. A partir d'ara les crearà JavaScript:"),
        code(`<div id="graella" class="graella"></div>`, { lang: 'html', title: 'index.html (després)' }),
        p("A `inici.js`, una funció rep **un** vídeo i retorna la targeta que el representa. Ha de construir exactament la mateixa estructura que tenies escrita a mà:"),
        code(FN_CARD),
        p("Compara-la amb l'HTML d'abans: cada etiqueta s'ha convertit en un `createElement`, cada classe en un `classList.add` i cada text en un `textContent`. Els `append` reprodueixen quin element va dins de quin."),
        p("Una segona funció pinta **tota** la graella: la buida i hi afegeix una targeta per a cada vídeo. I al final del fitxer, la crida que ho posa en marxa:"),
        code(`const graella = document.querySelector("#graella");\n\n${HOME_RENDER_V1}\n\n${START}`),
        example({
          title: 'Fase 3: la graella surt de les dades',
          intro: "La graella de l'HTML és buida: mira la pestanya `index.html`. Els vuit vídeos surten de `dades.js`.",
          html: HOME_HTML,
          css: PROJECT_CSS,
          dataJs: DATA_JS,
          js: HOME_PHASE_JS.render,
          fileNames: HOME_FILES,
          expected: "Vuit targetes, iguals que les que abans estaven escrites a mà. El menú continua funcionant.",
          why: "Les targetes ja no són a l'HTML: es creen a partir de l'array. Prova-ho: obre la pestanya `dades.js`, canvia un títol o esborra un vídeo sencer i torna a executar. La pàgina canvia sense haver tocat l'HTML.",
        }),
        warning(
          'Comprova la fase abans de continuar',
          "La pàgina s'ha de veure **exactament igual** que abans d'esborrar les targetes. Si la graella surt buida, mira la consola: «videos is not defined» vol dir que `dades.js` no està enllaçat o va després d'`inici.js`; «Cannot read properties of null» vol dir que un `id` de l'HTML no coincideix amb el del `querySelector`."
        ),
      ],
    },

    {
      id: 'fase-4',
      label: 'Pàgina inicial · Fase 4',
      title: 'El cercador',
      blocks: [
        p("Ara que els vídeos són dades, cercar és fer una pregunta a cada vídeo: «el teu títol conté aquest text?». Els strings tenen un mètode per respondre-la, `includes`, que ja vas fer servir per comprovar si un correu tenia arrova."),
        p("Hi ha un detall: `includes` distingeix majúscules de minúscules. Per a ell, «Grid» i «grid» són textos diferents. La solució és passar-ho tot a minúscules abans de comparar, amb un mètode nou, `toLowerCase()`:"),
        example({
          title: 'includes i toLowerCase',
          intro: "Abans d'executar-lo, intenta endevinar què mostrarà cada línia.",
          js: `const titol = "Aprèn CSS Grid en 12 minuts";

console.log(titol.includes("Grid"));
console.log(titol.includes("grid"));

console.log(titol.toLowerCase());
console.log(titol.toLowerCase().includes("grid"));

// Qualsevol text «conté» el text buit
console.log(titol.includes(""));`,
          expected: "`true`, `false`, el títol en minúscules, `true` i `true`.",
          why: "`toLowerCase()` no modifica el text original: en retorna una còpia en minúscules. I fixa't en l'última línia: qualsevol text conté el text buit. Ens anirà molt bé, perquè quan el cercador estigui buit tots els vídeos coincidiran sense haver d'escriure cap cas especial.",
        }),
        p("El text que la persona ha escrit és una dada de la pàgina, i per tant va a l'estat. És la primera zona d'`inici.js`:"),
        code(HOME_STATE_SEARCH),
        p("Les referències als elements nous:"),
        code(HOME_ELEMENTS_SEARCH),
        p("Dues funcions de dades. La primera respon la pregunta per a un vídeo. La segona recorre tots els vídeos i es queda amb els que coincideixen:"),
        code(`${FN_MATCH}\n\n${FN_VISIBLE_V1}`),
        concept(
          'Cercar no esborra res',
          "L'array `videos` continua tenint tots els vídeos. El que fem és calcular, cada vegada que pintem, quins s'han de *veure*. És la mateixa idea que filtrar les tasques pendents: la llista de visibles es calcula, es pinta i es llença."
        ),
        p("`renderitzar` passa a pintar només els vídeos visibles, i de passada actualitza el resum i el missatge de «cap resultat»:"),
        code(HOME_RENDER_V2),
        p("Finalment, els esdeveniments. N'escoltem dos: `submit`, per a quan es prem Retorn o el botó «Cerca», i `input`, perquè la graella es filtri mentre s'escriu. Tots dos fan el mateix, de manera que la feina va en una funció:"),
        code(EVENT_SEARCH),
        list(
          "`preventDefault()` evita que el formulari recarregui la pàgina.",
          "`trim()` treu els espais del principi i del final: cercar « grid » ha de trobar el mateix que cercar «grid».",
          "El listener no amaga ni mostra cap targeta. Canvia `textCerca` i torna a pintar."
        ),
        example({
          title: 'Fase 4: el cercador funciona',
          intro: "Escriu «grid», després «GRID», després «zzz». Esborra el text per tornar a veure-ho tot.",
          html: HOME_HTML,
          css: PROJECT_CSS,
          dataJs: DATA_JS,
          js: HOME_PHASE_JS.search,
          fileNames: HOME_FILES,
          expected: "Amb «grid» o «GRID» queda un sol vídeo i el resum diu «1 vídeo». Amb «zzz» no en queda cap i apareix «No hem trobat cap vídeo.». Amb el camp buit tornen tots vuit.",
          why: "L'estat buit funciona sense cap codi especial: `renderitzar` mira quants vídeos visibles hi ha i decideix si el missatge s'ha de veure. I com que tot text conté el text buit, esborrar la cerca torna a mostrar-ho tot.",
        }),
      ],
    },

    {
      id: 'fase-5',
      label: 'Pàgina inicial · Fase 5',
      title: 'Els filtres per categoria',
      blocks: [
        p("Els botons de sota la capçalera filtren per categoria. La categoria triada és una altra dada de la pàgina, i va a l'estat al costat de la cerca:"),
        code(`let categoriaActual = "Tot";`),
        p("Hi ha cinc botons i tots fan el mateix, de manera que els seleccionem de cop:"),
        code(HOME_ELEMENTS_CHIPS),
        p("Una funció de dades nova respon si un vídeo és de la categoria triada. Amb «Tot», tots ho són:"),
        code(FN_CATEGORY),
        p("I `obtenirVideosVisibles` passa a fer **les dues preguntes**. Un vídeo es veu si coincideix amb la cerca **i** és de la categoria:"),
        code(FN_VISIBLE_V2),
        p("A `renderitzar` hi afegim, al final, un bucle que marca quin botó està actiu:"),
        code(`  for (const xip of xips) {
    xip.setAttribute("aria-pressed", String(xip.textContent === categoriaActual));
  }`),
        p("Per als esdeveniments, un altre bucle posa un listener a cada botó. El text del mateix botó és el nom de la categoria:"),
        code(EVENT_CHIPS),
        warning(
          'El text del botó i la categoria han de ser idèntics',
          "Com que comparem `xip.textContent` amb `video.categoria`, han de coincidir lletra per lletra, accents inclosos. Si el botó diu «Música» i a `dades.js` hi posa «Musica», el filtre no trobarà res i no hi haurà cap missatge d'error que t'avisi."
        ),
        example({
          title: 'Fase 5: la pàgina inicial, completa',
          intro: "Tria «Programació» i, sense treure el filtre, escriu «flex» al cercador. Després prova «Cuina» amb el text «grid».",
          html: HOME_HTML,
          css: PROJECT_CSS,
          dataJs: DATA_JS,
          js: HOME_JS,
          fileNames: HOME_FILES,
          expected: "«Programació» mostra tres vídeos i el botó queda marcat. Amb «flex» en queda un. «Cuina» amb «grid» no en mostra cap.",
          why: "Els dos filtres es combinen sense haver escrit cap codi per combinar-los: tots dos són dades de l'estat, i `obtenirVideosVisibles` els mira alhora cada vegada que es pinta. Aquest és tot `inici.js`: unes 120 línies, organitzades en les cinc zones.",
        }),
        concept(
          'Dos filtres, una sola funció que decideix',
          "Cada listener canvia **una** dada i torna a pintar. Cap dels dos sap que l'altre existeix. Si demà afegeixes un tercer filtre, per exemple «només vídeos curts», serà una variable més a l'estat, una pregunta més a `obtenirVideosVisibles` i un listener més."
        ),
      ],
    },

    {
      id: 'fase-6',
      label: 'Pàgina del vídeo · Fase 6',
      title: "«M'agrada» i «No m'agrada»",
      blocks: [
        p("Passem a la segona pàgina. Prepara'n l'HTML com a la fase 1: un `id` a cada element que hagi de canviar, botons de veritat i `aria-pressed` als que tenen dos estats. I connecta-hi els fitxers:"),
        code(HEAD_VIDEO, { lang: 'html', title: 'video.html (el head)' }),
        p("Aquesta pàgina carrega `dades.js`, que necessitarem per als vídeos recomanats, i el seu propi fitxer, `video.js`. **No** carrega `inici.js`."),
        p("Els dos botons de valoració, a la pàgina de mostra:"),
        code(RATING_HTML, { lang: 'html', title: 'video.html' }),
        p("Quina és la dada, aquí? No és el número. La dada és **si aquesta persona ha fet «m'agrada» o no**: un booleà. El número que es veu es calcula a partir d'ell."),
        code(VIDEO_STATE_RATING, { title: 'video.js' }),
        p("Les funcions de dades inverteixen el booleà amb `!`. I com que no es poden tenir les dues valoracions alhora, activar-ne una desactiva l'altra:"),
        code(FN_RATING),
        concept(
          'El comptador es calcula, no es guarda',
          "Si a cada clic fessis `total++`, el número pujaria sense parar: 1241, 1242, 1243… I en desfer el «m'agrada» hauries de recordar-te de restar. Calculant-lo a partir del booleà, el número no pot ser mai incorrecte: és 1240, o 1241 si has fet «m'agrada»."
        ),
        p("Una funció de pàgina trasllada l'estat als botons, i dos listeners la criden després de canviar les dades:"),
        code(`${RENDER_RATING}\n\n${EVENT_RATING}\n\n// ---------- Arrencada ----------\nrenderitzarValoracio();`),
        example({
          title: 'Fase 6: els botons de valoració',
          intro: "Fes «m'agrada», desfés-lo, i després prova de prémer «No m'agrada» mentre «M'agrada» està actiu.",
          html: VIDEO_HTML,
          css: PROJECT_CSS,
          js: VIDEO_PHASE_JS.rating,
          fileNames: VIDEO_FILES,
          expected: "El primer clic a «M'agrada» marca el botó i el comptador passa a 1241. El segon el desmarca i torna a 1240. En prémer «No m'agrada» amb «M'agrada» actiu, s'intercanvien i el comptador baixa.",
          why: "Cap listener toca el número. Canvien els booleans i criden `renderitzarValoracio`, que ho pinta tot de nou: els dos `aria-pressed` i el comptador. Per això els dos botons no es poden descoordinar.",
        }),
      ],
    },

    {
      id: 'fase-7',
      label: 'Pàgina del vídeo · Fase 7',
      title: "Subscriure's i desplegar la descripció",
      blocks: [
        p("Les dues interaccions següents segueixen exactament el mateix patró: un booleà a l'estat, un listener que l'inverteix i una funció que pinta segons el seu valor. Afegeix a l'estat:"),
        code(VIDEO_STATE_SUBSCRIBE),
        p("El nombre de subscriptors es calcula igual que el de «m'agrada»:"),
        code(FN_SUBSCRIBERS),
        p("Les dues funcions de pàgina. La de la subscripció canvia el text del botó; la de la descripció posa o treu una classe:"),
        code(`${RENDER_SUBSCRIBE}\n\n${RENDER_DESCRIPTION}`),
        p("La classe `retallat` és al CSS, i limita l'alçada del paràgraf a dues línies. Com amb el menú, JavaScript no sap res d'alçades: només posa i treu la classe."),
        code(`.text-descripcio.retallat {
  max-height: 3em;
  overflow: hidden;
}`, { lang: 'css', title: 'estils.css' }),
        p("I els dos listeners, que són gairebé idèntics:"),
        code(EVENT_SUBSCRIBE),
        example({
          title: 'Fase 7: subscripció i descripció',
          intro: "Subscriu-te i fixa't en el botó i en el nombre de subscriptors. Després desplega la descripció.",
          html: VIDEO_HTML,
          css: PROJECT_CSS,
          js: VIDEO_PHASE_JS.subscribe,
          fileNames: VIDEO_FILES,
          expected: "El botó passa de «Subscriu-te» a «Subscrit» i el comptador, de 15300 a 15301. «Mostra'n més» ensenya tot el text i el botó passa a dir «Mostra'n menys».",
          why: "Recorda cridar les funcions de pàgina també a l'arrencada. Així, el que es veu en obrir la pàgina surt de l'estat i no del que hi hagi escrit a l'HTML: si l'estat inicial canvia, la pàgina hi estarà d'acord.",
        }),
        concept(
          'El mateix patró, tres vegades',
          "«M'agrada», la subscripció i la descripció són el mateix: **un booleà, invertir-lo, pintar**. Quan vulguis afegir un botó de «desa per veure més tard» o una campaneta de notificacions, ja saps com es fa."
        ),
      ],
    },

    {
      id: 'fase-8',
      label: 'Pàgina del vídeo · Fase 8',
      title: 'Els comentaris',
      blocks: [
        p("Els comentaris són el gestor de tasques amb un altre nom: una llista que creix, un formulari per afegir-hi elements i una validació que filtra el que entra. Tot el que vas fer a les unitats 8 i 9 serveix aquí."),
        code(COMMENTS_HTML, { lang: 'html', title: 'video.html' }),
        list(
          "El formulari té **`novalidate`**, perquè la validació la farem nosaltres.",
          "El paràgraf d'error ja existeix, buit, amb **`role=\"alert\"`** i enllaçat al camp amb **`aria-describedby`**.",
          "El botó «Comenta» comença **`disabled`**: no té sentit enviar un comentari buit.",
          "La **llista és buida**. Els comentaris, com els vídeos, sortiran de les dades."
        ),
        p("L'estat: els comentaris que ja té el vídeo i l'identificador que rebrà el pròxim."),
        code(VIDEO_STATE_COMMENTS),
        p("Les referències als elements:"),
        code(VIDEO_ELEMENTS_COMMENTS),
        p("Les funcions de dades. La validació rep un text i retorna un missatge d'error, o un text buit si és correcte. `unshift` afegeix al principi de l'array, perquè el comentari més recent surti a dalt de tot:"),
        code(`${FN_VALIDATE}\n\n${FN_ADD_COMMENT}`),
        p("Les funcions de pàgina: una crea l'element d'un comentari i l'altra pinta la llista sencera i actualitza el títol amb el recompte."),
        code(`${FN_COMMENT_ELEMENT}\n\n${RENDER_COMMENTS}`),
        warning(
          "El text d'un comentari, sempre amb textContent",
          "Un comentari l'escriu una persona que no coneixes. Si el posessis a la pàgina amb `innerHTML`, qualsevol podria escriure etiquetes HTML dins d'un comentari i el navegador les interpretaria. Amb `textContent`, el text sempre es mostra com a text."
        ),
        p("I tres listeners: un activa el botó quan hi ha alguna cosa escrita, un altre rep el formulari i el tercer cancel·la."),
        code(`${FN_CLEAR_FORM}\n\n${EVENT_COMMENTS}`),
        list(
          "L'esdeveniment `input` es produeix a cada tecla: el botó «Comenta» s'activa i es desactiva segons si el camp, sense espais, és buit.",
          "El `submit` segueix la recepta de la unitat 9: evitar la recàrrega, llegir, validar, mostrar l'error o bé afegir, netejar i tornar a pintar.",
          "«Cancel·la» fa servir la mateixa funció `netejarFormulari` que es crida després d'enviar un comentari."
        ),
        example({
          title: 'Fase 8: es poden escriure comentaris',
          intro: "Escriu un comentari i envia'l amb Retorn. Prova també d'escriure només espais, i el botó «Cancel·la».",
          html: VIDEO_HTML,
          css: PROJECT_CSS,
          js: VIDEO_PHASE_JS.comments,
          fileNames: VIDEO_FILES,
          expected: "El comentari nou apareix a dalt de la llista, signat per «Tu», i el títol passa de «2 comentaris» a «3 comentaris». Amb el camp buit o només amb espais, el botó «Comenta» està desactivat.",
          why: "El listener no crea cap element: crida `afegirComentari`, que modifica l'array, i `renderitzarComentaris`, que ho pinta tot de nou. El recompte del títol surt de `comentaris.length`, de manera que no pot quedar desfasat.",
        }),
      ],
    },

    {
      id: 'fase-9',
      label: 'Pàgina del vídeo · Fase 9',
      title: 'Els vídeos recomanats i la revisió final',
      blocks: [
        p("Queda la columna dels vídeos recomanats. Aquí es veu per què vam posar les dades en un fitxer a part: aquesta pàgina fa servir **el mateix `dades.js`** que la pàgina inicial, sense copiar res. Si demà afegeixes un vídeo a l'array, apareixerà a les dues pàgines."),
        p("La pàgina ha de saber quin vídeo està mostrant per no recomanar-lo. És la primera línia de l'estat:"),
        code(`const ID_VIDEO = 1;`),
        p("La funció de dades recorre tots els vídeos i es queda amb els que no són l'actual:"),
        code(FN_RELATED),
        p("I les dues funcions de pàgina, amb la mateixa forma de sempre: una crea un element i l'altra pinta la llista."),
        code(`${FN_RELATED_ELEMENT}\n\n${RENDER_RELATED}`),
        example({
          title: 'Fase 9: la pàgina del vídeo, completa',
          intro: "Les pestanyes mostren els quatre fitxers de la pàgina. Prova totes les interaccions, una darrere l'altra.",
          html: VIDEO_HTML,
          css: PROJECT_CSS,
          dataJs: DATA_JS,
          js: VIDEO_JS,
          fileNames: VIDEO_FILES,
          expected: "Sota els comentaris (o al costat, si la pantalla és ampla) apareixen set vídeos recomanats: tots els de `dades.js` menys el que s'està veient.",
          why: "Aquest és tot `video.js`: unes 240 línies. Sembla molt, però cada funció fa una sola cosa i totes segueixen un dels dos patrons que has vist: **booleà, invertir, pintar** o bé **array, modificar, pintar**.",
        }),
        p("Abans de donar el projecte per acabat, repassa el teu codi amb la llista de la unitat 10:"),
        list(
          "Els **noms** de variables i funcions expliquen què són i què fan?",
          "Cada **funció** fa una sola cosa? Les de dades no toquen la pàgina?",
          "Hi ha **codi duplicat** que es pugui convertir en una funció?",
          "Tot el text que ve d'una persona es posa amb **`textContent`**?",
          "Has tret els **`console.log`** de prova?",
          "Es pot fer servir tot **sense ratolí**, i el focus es veu sempre?"
        ),
        custom('ProjectChecklist'),
      ],
    },

    {
      id: 'enllacar-pagines',
      label: 'Ampliació',
      title: "Obrir el vídeo que s'ha clicat",
      blocks: [
        p("Ara mateix, cliquis el vídeo que cliquis a la pàgina inicial, s'obre sempre la mateixa pàgina amb el mateix vídeo. Per arreglar-ho, la pàgina inicial ha de **dir quin vídeo vol** i la pàgina del vídeo ha de **llegir-ho**."),
        p("El missatge viatja dins de l'adreça. Tot el que hi ha després d'un interrogant són *paràmetres*: a `video.html?id=4`, el paràmetre `id` val 4. A `inici.js`, fes que l'enllaç de cada targeta porti l'`id` del seu vídeo:"),
        code(LINK_CARD, { title: 'inici.js (dins de crearTargetaVideo)' }),
        p("A l'altra banda, l'objecte `URLSearchParams` sap llegir els paràmetres d'una adreça:"),
        example({
          title: "Llegir un paràmetre de l'adreça",
          intro: "Al teu projecte, el text dels paràmetres és a `window.location.search`. Aquí l'escrivim a mà per poder-lo provar.",
          js: `const adreca = "?id=4";

const parametres = new URLSearchParams(adreca);
const id = Number(parametres.get("id"));

console.log(parametres.get("id"));
console.log(typeof parametres.get("id"));
console.log(id + 1);

// Un paràmetre que no hi és
console.log(parametres.get("canal"));`,
          expected: "`4`, `string`, `5` i `null`.",
          why: "`get` retorna sempre un text, o `null` si el paràmetre no existeix. Per això el convertim amb `Number` abans de comparar-lo amb els `id` de l'array, que són nombres: amb `===`, el text `\"4\"` i el nombre `4` no són iguals.",
        }),
        p("Amb l'`id` a la mà, es busca el vídeo a l'array. Si l'adreça no porta cap `id` vàlid, es mostra el primer:"),
        code(LINK_READ, { title: 'video.js' }),
        p("I una funció de pàgina nova omple el títol, el canal i les dades amb el vídeo trobat. Cal seleccionar abans aquests tres elements, i cridar-la a l'arrencada amb la resta:"),
        code(LINK_RENDER),
        warning(
          'Aquesta ampliació només es pot provar al teu projecte',
          "Els exemples d'aquest dossier tenen una sola pàgina: si hi cliques un enllaç, la consola t'explica on portaria. Per veure com una pàgina obre l'altra necessites els dos fitxers HTML de veritat."
        ),
        p("Si vols que cada vídeo tingui també la seva descripció o el seu nombre de «m'agrada», afegeix aquestes propietats als objectes de `dades.js` i pinta-les a `renderitzarVideo`."),
      ],
    },

    {
      id: 'localstorage',
      label: 'Ampliació',
      title: 'Guardar dades al navegador: localStorage',
      blocks: [
        p("El projecte té una limitació evident: quan recarregues la pàgina, el «m'agrada» desapareix i els comentaris que has escrit es perden. És normal, perquè les variables de JavaScript només viuen mentre la pàgina està oberta."),
        p("Els navegadors ofereixen un petit magatzem on una pàgina pot guardar dades que **sobreviuen a la recàrrega**: `localStorage`. Funciona amb parells de clau i valor, i té tres operacions:"),
        table(
          ['Operació', 'Què fa'],
          [
            ['`localStorage.setItem("clau", valor)`', 'Guarda un valor sota una clau'],
            ['`localStorage.getItem("clau")`', 'Recupera el valor, o `null` si la clau no existeix'],
            ['`localStorage.removeItem("clau")`', 'Esborra la clau'],
          ],
          'Les operacions de localStorage'
        ),
        p("Hi ha una restricció important: **només pot guardar text**. Per guardar un array d'objectes l'hem de convertir a text, i per recuperar-lo, tornar-lo a convertir. D'això se n'encarreguen dues funcions:"),
        list(
          "`JSON.stringify(valor)` converteix un array o un objecte en un text.",
          "`JSON.parse(text)` fa el camí invers: a partir del text, reconstrueix l'array o l'objecte."
        ),
        example({
          title: 'Guardar i recuperar un array',
          intro: "Executa'l i fixa't en el tipus del valor a cada pas.",
          js: `const comentaris = [
  { id: 1, autor: "Laia", text: "Molt ben explicat!" }
];

// Guardar: de l'array a un text
const text = JSON.stringify(comentaris);
console.log(text);
console.log(typeof text);

localStorage.setItem("comentaris", text);

// Recuperar: del text a un array
const recuperat = localStorage.getItem("comentaris");
const copia = JSON.parse(recuperat);

console.log(copia[0].autor);
console.log(localStorage.getItem("una-clau-que-no-existeix"));`,
          expected: "El text amb format JSON, `string`, `Laia` i `null`.",
          why: "El text que produeix `JSON.stringify` s'assembla molt a com escrivim els objectes a JavaScript, amb els noms de les propietats entre cometes. `JSON.parse` el torna a convertir en un array de veritat, amb el qual es pot treballar.",
        }),
        warning(
          'Sense JSON.stringify, es guarda «[object Object]»',
          "Si passes un array d'objectes directament a `setItem`, el navegador el converteix a text pel seu compte, i el resultat és `\"[object Object]\"`. No hi ha cap error, però les dades s'han perdut."
        ),
        p("A la pàgina del vídeo hi ha quatre dades que val la pena conservar: els dos booleans de la valoració, el de la subscripció i l'array de comentaris. El més còmode és agrupar-les en un sol objecte i guardar-lo sota una sola clau:"),
        code(SAVE_FUNCTIONS),
        p("En aquest dossier, cada exemple té el seu propi `localStorage` de prova, que es conserva entre execucions fins que prems «Reiniciar». Al teu projecte, les dades es guarden de veritat al navegador i les pots veure a les eines de desenvolupament, a la pestanya **Application** (o **Emmagatzematge**, a Firefox)."),
        concept(
          'Un magatzem del navegador, no un servidor',
          "El que guardes a `localStorage` no surt d'aquell ordinador ni d'aquell navegador: ningú més veurà els teus comentaris, i la persona els pot esborrar quan vulgui. A una plataforma de veritat, els comentaris s'envien a un servidor. Això ja és matèria d'un altre mòdul."
        ),
      ],
    },

    {
      id: 'versio-completa',
      label: 'Ampliació',
      title: 'La versió completa, amb totes les ampliacions',
      blocks: [
        p("Als exercicis d'aquesta unitat hi trobaràs cinc ampliacions per fer sobre el projecte base: un botó per treure els filtres, mode clar i fosc, eliminar els teus comentaris, guardar a `localStorage` i recuperar en recarregar. **Intenta-les primer pel teu compte.**"),
        p("Quan les tinguis, o si t'encalles en alguna, aquí tens les dues pàgines amb totes les ampliacions integrades i el codi a la vista. Per comprovar la persistència, escriu un comentari a la pàgina del vídeo i torna a prémer «Executar», que equival a recarregar la pàgina: el comentari ha de continuar allà."),
        custom('ProjectDemo', { version: 'full', showCode: true }),
        p("A partir d'aquí, el projecte és teu. Algunes idees per continuar: ordenar els vídeos, un botó de «desa per veure més tard», una pàgina amb els vídeos que t'han agradat, respondre a un comentari o un comptador de caràcters al formulari. Per a cadascuna, fes-te les tres preguntes de sempre: quina dada nova necessito a l'estat? Quina funció de dades la modifica? Què ha de canviar a la pintada?"),
      ],
    },
  ],

  commonErrors: [
    {
      title: 'Carregar el fitxer de dades després del que les fa servir',
      bad: `<script src="inici.js" defer></script>
<script src="dades.js" defer></script>`,
      badLang: 'html',
      message: 'Uncaught ReferenceError: videos is not defined',
      why: "Els fitxers amb `defer` s'executen en l'ordre en què estan escrits. Quan `inici.js` intenta recórrer `videos`, `dades.js` encara no s'ha executat i l'array no existeix.",
      fix: `<script src="dades.js" defer></script>
<script src="inici.js" defer></script>`,
      fixLang: 'html',
    },
    {
      title: 'Fer servir el mateix fitxer de JavaScript a les dues pàgines',
      bad: `// app.js, enllaçat a index.html i a video.html
const botoMenu = document.querySelector("#boto-menu");
const botoAgrada = document.querySelector("#boto-agrada");

botoAgrada.addEventListener("click", () => {
  canviarAgrada();
});`,
      message: "Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')",
      why: "A la pàgina inicial no hi ha cap element amb `id=\"boto-agrada\"`: `querySelector` retorna `null`, i en intentar posar-hi un listener el programa s'atura. Tot el que hi hagi a sota, com la crida a `renderitzar`, ja no s'executa, i la pàgina es queda en blanc.",
      fix: `// inici.js, enllaçat només a index.html
const botoMenu = document.querySelector("#boto-menu");

// video.js, enllaçat només a video.html
const botoAgrada = document.querySelector("#boto-agrada");`,
    },
    {
      title: "Sumar un «m'agrada» a cada clic",
      bad: `let total = 1240;

botoAgrada.addEventListener("click", () => {
  total++;
  totalAgrada.textContent = total;
});`,
      why: "Cada clic suma un «m'agrada» més: amb deu clics, la mateixa persona n'ha fet deu. I no hi ha manera de desfer-lo. El que s'ha de guardar no és el número, sinó si aquesta persona ha fet «m'agrada» o no.",
      fix: `let agrada = false;

botoAgrada.addEventListener("click", () => {
  agrada = !agrada;
  renderitzarValoracio();
});`,
    },
    {
      title: 'Comparar textos sense passar-los a minúscules',
      bad: `function coincideixAmbCerca(video) {
  return video.titol.includes(textCerca);
}`,
      why: "`includes` distingeix majúscules de minúscules. Qui escrigui «grid» no trobarà «Aprèn CSS Grid en 12 minuts», i pensarà que el vídeo no existeix. No hi ha cap missatge d'error: el cercador, senzillament, troba menys del que hauria.",
      fix: `function coincideixAmbCerca(video) {
  const titol = video.titol.toLowerCase();
  const text = textCerca.toLowerCase();
  return titol.includes(text);
}`,
    },
    {
      title: 'Combinar dos filtres amb || en lloc de &&',
      bad: `if (coincideixAmbCerca(video) || esDeLaCategoria(video)) {
  visibles.push(video);
}`,
      why: "Amb `||` n'hi ha prou que es compleixi una de les dues condicions. Amb el cercador buit, tots els vídeos coincideixen amb la cerca, de manera que es veuen tots i els filtres de categoria semblen espatllats.",
      fix: `if (coincideixAmbCerca(video) && esDeLaCategoria(video)) {
  visibles.push(video);
}`,
    },
    {
      title: "Posar el text d'un comentari amb innerHTML",
      bad: `const text = document.createElement("p");
text.innerHTML = comentari.text;`,
      why: "El navegador interpreta el comentari com a HTML. Si algú escriu `<h1>HOLA</h1>`, apareixerà un títol gegant enmig dels comentaris; i hi ha etiquetes molt més perilloses que un títol. El text que ve d'una persona s'ha de tractar sempre com a text.",
      fix: `const text = document.createElement("p");
text.textContent = comentari.text;`,
    },
    {
      title: 'Guardar un objecte sense convertir-lo a text',
      bad: `localStorage.setItem("video-1", estat);`,
      why: "`localStorage` només guarda text. L'objecte es converteix automàticament en `\"[object Object]\"`, i les dades es perden sense cap avís. En recuperar-les, `JSON.parse` fallarà.",
      fix: `localStorage.setItem("video-1", JSON.stringify(estat));`,
    },
    {
      title: 'Recuperar de localStorage sense comprovar si hi ha res',
      bad: `const estat = JSON.parse(localStorage.getItem("video-1"));
comentaris = estat.comentaris;`,
      message: "Uncaught TypeError: Cannot read properties of null (reading 'comentaris')",
      why: "La primera vegada que s'obre la pàgina no hi ha res guardat: `getItem` retorna `null`, i `JSON.parse(null)` també dona `null`. En demanar-li una propietat, el programa s'atura.",
      fix: `const text = localStorage.getItem("video-1");

if (text !== null) {
  const estat = JSON.parse(text);
  comentaris = estat.comentaris;
}`,
    },
  ],

  exercises: [
    {
      id: 'treu-filtres',
      title: 'Ampliació 1: un botó per treure els filtres',
      statement: [
        "Quan la cerca no troba res, el missatge «No hem trobat cap vídeo» ara porta un botó, «Treu els filtres» (`#treu-filtres`), que encara no fa res. Fes que esborri el text de la cerca, torni a la categoria «Tot» i torni a pintar la graella.",
        "Per veure el botó, executa el codi i escriu al cercador un text que no trobi res, com «zzz». A l'editor tens tot `inici.js`: hi has d'afegir tres coses, cadascuna a la seva zona.",
      ],
      expected: "En prémer el botó, el camp de cerca es buida, el filtre «Tot» queda marcat i tornen a aparèixer els vuit vídeos.",
      html: HOME_HTML_FULL,
      css: PROJECT_CSS_FULL,
      dataJs: DATA_JS,
      fileNames: HOME_FILES,
      starter: HOME_JS,
      partialSolution: true,
      hint: "La funció de dades només ha de tornar les dues variables de l'estat al seu valor inicial. Però compte: el camp de text no és part de l'estat, i també l'has de buidar perquè digui el mateix que `textCerca`.",
      solution: `// Zona 2 · Elements de la pàgina
const botoTreuFiltres = document.querySelector("#treu-filtres");

// Zona 3 · Funcions que treballen amb les dades
function treureFiltres() {
  textCerca = "";
  categoriaActual = "Tot";
}

// Zona 5 · Esdeveniments
botoTreuFiltres.addEventListener("click", () => {
  treureFiltres();
  inputCerca.value = "";
  renderitzar();
  inputCerca.focus();
});`,
      explanation: "Una funcionalitat nova ha demanat una peça a cada zona, i cap canvi a `renderitzar`: com que pinta a partir de l'estat, s'adapta sola. L'última línia és un detall d'accessibilitat: en tornar a pintar, el missatge i el seu botó desapareixen, i el focus s'hauria perdut. El portem al cercador, que és on la persona voldrà continuar.",
    },
    {
      id: 'mode-fosc',
      title: 'Ampliació 2: mode clar i mode fosc',
      statement: [
        "El botó «Mode fosc» (`#boto-tema`) ha d'alternar la classe `fosc` del `<body>`. El CSS ja té tots els estils del mode fosc preparats: mira el final de la pestanya `estils.css`.",
        "El botó també ha d'indicar el seu estat amb `aria-pressed`: `\"true\"` quan el mode fosc està actiu i `\"false\"` quan no.",
      ],
      expected: "Cada clic canvia entre fons clar i fons fosc, i el botó queda destacat quan el mode fosc està actiu.",
      html: HOME_HTML_FULL,
      css: PROJECT_CSS_FULL,
      dataJs: DATA_JS,
      fileNames: HOME_FILES,
      starter: HOME_JS,
      partialSolution: true,
      hint: "Escriu una funció `aplicarTema(esFosc)` que rebi un booleà, posi o tregui la classe i actualitzi `aria-pressed`. Al listener, calcula el nou estat amb `!document.body.classList.contains(\"fosc\")`.",
      solution: `// Zona 2 · Elements de la pàgina
const botoTema = document.querySelector("#boto-tema");

// Zona 4 · Funcions que pinten la pàgina
function aplicarTema(esFosc) {
  if (esFosc) {
    document.body.classList.add("fosc");
  } else {
    document.body.classList.remove("fosc");
  }
  botoTema.setAttribute("aria-pressed", String(esFosc));
}

// Zona 5 · Esdeveniments
botoTema.addEventListener("click", () => {
  const esFosc = !document.body.classList.contains("fosc");
  aplicarTema(esFosc);
});`,
      explanation: "JavaScript no toca cap color: només posa i treu una classe, igual que amb el menú. Separar `aplicarTema` del listener sembla innecessari ara, però quan vulguis recordar el tema amb `localStorage` podràs cridar la mateixa funció en arrencar, amb el valor guardat. I com que el botó és a les dues pàgines, la mateixa funció et servirà a `video.js`.",
    },
    {
      id: 'eliminar-comentari',
      title: 'Ampliació 3: eliminar els teus comentaris',
      statement: [
        "Afegeix un botó «Elimina» als comentaris que has escrit tu (els que tenen `autor: \"Tu\"`). Els comentaris de la Laia i d'en Pol no n'han de tenir.",
        "A l'editor tens tot `video.js`. Necessites una funció de dades nova i uns quants canvis a `crearElementComentari`.",
      ],
      expected: "Els comentaris que escrius porten un botó «Elimina»; en prémer-lo, el comentari desapareix i el títol torna a comptar. Els dos comentaris inicials no tenen botó.",
      html: VIDEO_HTML_FULL,
      css: PROJECT_CSS_FULL,
      dataJs: DATA_JS,
      fileNames: VIDEO_FILES,
      starter: VIDEO_JS,
      partialSolution: true,
      hint: [
        "La funció de dades ja la coneixes de la unitat 6: construeix un array nou amb tots els comentaris menys el que té l'`id` indicat, i substitueix l'antic. Per això `comentaris` està declarat amb `let`.",
        "A `crearElementComentari`, crea el botó dins d'un `if` que comprovi l'autor, i afegeix-lo a l'element just abans del `return`.",
      ],
      solution: `// Zona 3 · Funcions que treballen amb les dades
${FN_REMOVE_COMMENT}

// Zona 4 · A crearElementComentari, just abans del return:
${DELETE_BUTTON}`,
      explanation: [
        "El listener no fa `element.remove()`: elimina el comentari de l'array i torna a pintar. Si només tragués l'element de la pàgina, el comentari continuaria a les dades, reapareixeria a la pròxima pintada i el títol no hauria baixat mai.",
        "L'`aria-label` dona a cada botó un nom propi. Sense ell, un lector de pantalla diria «Elimina, botó» per a tots, sense indicar quin comentari esborra. I com que el botó premut desapareix, portem el focus al camp de text.",
      ],
    },
    {
      id: 'guardar',
      title: "Ampliació 4: guardar l'estat de la pàgina",
      statement: [
        "Fes que cada vegada que canviï la valoració, la subscripció o la llista de comentaris, l'estat es guardi a `localStorage` sota la clau `\"video-1\"`.",
        "Per comprovar-ho, afegeix temporalment `console.log(localStorage.getItem(\"video-1\"));` després de guardar: has de veure el text JSON amb les quatre dades.",
      ],
      expected: "Després de fer «m'agrada», subscriure't o escriure un comentari, a `localStorage` hi ha un text JSON amb l'estat actual de la pàgina.",
      html: VIDEO_HTML,
      css: PROJECT_CSS,
      dataJs: DATA_JS,
      fileNames: VIDEO_FILES,
      starter: VIDEO_JS,
      partialSolution: true,
      hint: [
        "Escriu una funció `guardarEstat()` que agrupi `agrada`, `noAgrada`, `subscrit` i `comentaris` en un objecte i el guardi amb `JSON.stringify`.",
        "Hi ha quatre llocs on canvien aquestes dades. En lloc de cridar `guardarEstat()` a tots quatre, crea una funció `actualitzar()` que guardi i torni a pintar, i fes-la servir als listeners.",
      ],
      solution: `${SAVE_FUNCTIONS}

// Als quatre llocs on canvien les dades, crida actualitzar()
// en lloc de la funció de pintar:
//   - al listener «click» de «M'agrada»
//   - al listener «click» de «No m'agrada»
//   - al listener «click» de «Subscriu-te»
//   - al final del listener «submit» del formulari`,
      explanation: [
        "Guardar i pintar són dues conseqüències de la mateixa cosa: que les dades han canviat. Agrupar-les a `actualitzar` evita oblidar-se'n una, i si demà cal fer una tercera cosa només s'haurà d'afegir aquí.",
        "El botó de la descripció continua cridant `renderitzarDescripcio` directament: si la descripció està desplegada o no és una dada de la visita, i no val la pena recordar-la.",
      ],
    },
  ],

  finalExercise: {
    id: 'recuperar',
    title: "Ampliació 5: recuperar l'estat en recarregar",
    statement: [
      "El programa de l'editor ja guarda l'estat cada vegada que canvia, però quan es torna a carregar comença de nou: sense «m'agrada» i amb els dos comentaris de mostra. Escriu una funció `carregarEstat` i crida-la en arrencar, abans de pintar.",
      "**Atenció a dos detalls:** la primera vegada no hi haurà res guardat, i `seguentId` s'ha de recalcular perquè els comentaris nous no repeteixin cap identificador.",
      "Per provar-ho, fes «m'agrada», escriu un parell de comentaris i torna a prémer «Executar», que equival a recarregar la pàgina.",
    ],
    expected: "La valoració, la subscripció i els comentaris es conserven en tornar a executar. Un comentari nou rep un `id` que no coincideix amb cap dels existents.",
    html: VIDEO_HTML,
    css: PROJECT_CSS,
    dataJs: DATA_JS,
    fileNames: VIDEO_FILES,
    starter: VIDEO_JS_SAVE,
    partialSolution: true,
    hint: [
      "`localStorage.getItem` retorna `null` si no hi ha res guardat. En aquest cas, la funció ha d'acabar sense tocar res: un `return` al principi és la manera més neta.",
      "Per recalcular `seguentId`, recorre els comentaris carregats i queda't amb l'`id` més gran que trobis; el següent serà aquest més 1.",
    ],
    solution: `// Al costat de guardarEstat
${LOAD_FUNCTIONS}

// ---------- Arrencada ----------
carregarEstat();
renderitzarValoracio();
renderitzarSubscripcio();
renderitzarDescripcio();
renderitzarComentaris();
renderitzarRecomanats();`,
    explanation: [
      "Si no hi ha res guardat, la funció no fa res i la pàgina arrenca amb l'estat inicial. Si n'hi ha, `JSON.parse` reconstrueix l'objecte i cada variable de l'estat rep el seu valor. Com que totes les funcions de pàgina pinten a partir de l'estat, n'hi ha prou de carregar **abans** de pintar: no cal cap codi més perquè el botó surti marcat o el comptador digui 1241.",
      "El recàlcul de `seguentId` és el detall que es descuida més sovint. Sense ell, el comptador tornaria a començar a 3 a cada recàrrega i de seguida hi hauria dos comentaris amb el mateix `id`: en eliminar-ne un, desapareixerien tots dos. És un error que no dona cap missatge i que només apareix després d'uns quants usos.",
    ],
  },

  summary: [
    "Abans de programar, es prepara l'HTML: un `id` a cada element que ha de canviar, elements interactius de veritat i contenidors buits per al que pintarà JavaScript.",
    "Les dades surten de l'HTML i passen a un **array d'objectes**. La pàgina es pinta a partir d'elles.",
    "Un fitxer de dades compartit (`dades.js`) i un fitxer de comportament per a cada pàgina. L'ordre de les etiquetes `<script>` importa.",
    "El flux sempre va en una direcció: esdeveniment → canvi a l'estat → pintar.",
    "Un botó amb dos estats és **un booleà**: s'inverteix amb `!` i es pinta. Els comptadors es calculen a partir d'ell.",
    "Cercar i filtrar no esborra res: es calcula quins elements s'han de veure, cada vegada que es pinta.",
    "`toLowerCase()` i `includes()` permeten cercar text sense distingir majúscules de minúscules.",
    "`localStorage` guarda text entre visites: `JSON.stringify` per guardar i `JSON.parse` per recuperar.",
  ],

  quiz: [
    {
      question: "A `video.html`, les etiquetes estan escrites en aquest ordre. Què passarà en obrir la pàgina?",
      code: `<script src="video.js" defer></script>
<script src="dades.js" defer></script>`,
      options: [
        { text: 'Un error: `videos is not defined`, quan `video.js` intenti fer servir l\'array.', correct: true },
        { text: "Res: amb `defer`, l'ordre dels fitxers no té importància.", why: "`defer` endarrereix l'execució fins que s'ha llegit l'HTML, però manté l'ordre en què estan escrits els fitxers." },
        { text: 'Els vídeos recomanats sortiran en ordre invers.', why: "L'ordre dels scripts no canvia l'ordre de l'array: decideix si l'array existeix quan es fa servir." },
        { text: 'El navegador carregarà `dades.js` dues vegades.', why: "Cada etiqueta carrega el seu fitxer una sola vegada." },
      ],
      explanation: "`video.js` s'executa primer i, quan arriba a pintar els recomanats, l'array `videos` encara no s'ha declarat. El fitxer de dades ha d'anar sempre abans del que les fa servir.",
    },
    {
      question: "Per què el nombre de «m'agrada» es calcula a partir d'un booleà, en lloc de sumar 1 a cada clic?",
      options: [
        { text: "Perquè així la mateixa persona no pot sumar-ne més d'un, i es pot desfer.", correct: true },
        { text: 'Perquè els booleans ocupen menys memòria que els nombres.', why: "La diferència de memòria és irrellevant. El motiu és que el resultat sigui sempre correcte." },
        { text: 'Perquè `textContent` no accepta nombres.', why: "`textContent` accepta un nombre sense problemes: el converteix a text." },
        { text: 'Perquè amb `total++` el comptador no es veuria a la pàgina.', why: "Es veuria, però pujaria a cada clic i no es podria desfer." },
      ],
      explanation: "La dada real és si aquesta persona ha fet «m'agrada» o no. El número que es veu se'n deriva: el total inicial, o el total més 1.",
    },
    {
      question: "Algú escriu «GRID» al cercador i no surt cap vídeo, tot i que n'hi ha un que es diu «Aprèn CSS Grid en 12 minuts». Què falta?",
      options: [
        { text: 'Passar a minúscules el títol i el text cercat abans de comparar-los.', correct: true },
        { text: 'Cridar `event.preventDefault()` al listener de `submit`.', why: "Això evita que la pàgina es recarregui, però no canvia el resultat de la comparació." },
        { text: 'Fer servir `===` en lloc d\'`includes`.', why: "Amb `===` només es trobarien els vídeos amb el títol exactament igual al text escrit." },
        { text: 'Treure els espais amb `trim()`.', why: "`trim()` treu espais del principi i del final, però «GRID» i «Grid» continuen sent diferents." },
      ],
      explanation: "`includes` distingeix majúscules de minúscules. Amb `toLowerCase()` a les dues bandes, «GRID», «grid» i «Grid» es converteixen en el mateix text.",
    },
    {
      question: "Amb el filtre «Cuina» actiu, la persona escriu «pa» al cercador. Quins vídeos es veuen?",
      options: [
        { text: 'Els de la categoria Cuina que tenen «pa» al títol.', correct: true },
        { text: 'Tots els de Cuina, més tots els que tenen «pa» al títol.', why: "Això passaria si les dues condicions s'unissin amb `||`. Al projecte s'uneixen amb `&&`." },
        { text: 'Tots els que tenen «pa» al títol, de qualsevol categoria.', why: "Escriure al cercador no treu el filtre de categoria: són dues dades independents de l'estat." },
        { text: 'Cap, perquè no es poden fer servir dos filtres alhora.', why: "Sí que es pot: `obtenirVideosVisibles` fa les dues preguntes a cada vídeo." },
      ],
      explanation: "Un vídeo es veu si compleix les dues condicions alhora. A la pàgina de mostra serien «Truita de patates sense secrets» i «Pa de pessic de llimona».",
    },
    {
      question: "Per què cada pàgina té el seu propi fitxer de comportament (`inici.js` i `video.js`)?",
      options: [
        { text: "Perquè cada fitxer busca elements que només existeixen a la seva pàgina; a l'altra, `querySelector` retornaria `null`.", correct: true },
        { text: 'Perquè un fitxer de JavaScript no pot tenir més de 200 línies.', why: "No hi ha cap límit de línies. És una qüestió d'organització." },
        { text: 'Perquè el navegador no permet enllaçar el mateix fitxer des de dues pàgines.', why: "Sí que ho permet: `dades.js` i `estils.css` s'enllacen des de totes dues." },
        { text: 'Perquè així les pàgines es carreguen en ordre.', why: "L'ordre de càrrega dins d'una pàgina el decideixen les etiquetes `<script>`, no el nombre de fitxers." },
      ],
      explanation: "Les dades es comparteixen, però el comportament és de cada pàgina. Un sol fitxer intentaria posar listeners a botons que no hi són, i s'aturaria amb un error.",
    },
  ],
};
