// Constructors dels blocs de contingut.
//
// Les unitats són dades (no components): cada apartat és una llista de blocs
// i `components/lesson/Blocks.jsx` decideix com es pinta cada tipus. Així es
// pot escriure o corregir temari sense tocar cap component de React.
//
// Format del text: vegeu `components/ui/RichText.jsx`
//   `codi`, **negreta**, *cursiva*, [enllaç](#/unitat/id)
//
// Hi ha dos dossiers i els editors no funcionen igual a tots dos:
//
//  - RA2 (JavaScript): els exemples i exercicis porten `js` i s'executen amb
//    un botó. Un exercici es dona per fet quan la consola coincideix amb
//    `expectedOutput`.
//  - RA1 (HTML i CSS): només porten `html` i `css`, i la pàgina s'actualitza
//    mentre s'escriu. Un exercici es dona per fet quan passa els `checks`.
//    Tot el que és propi d'aquest mode està explicat al final del fitxer.

/** Paràgraf. */
export const p = (text) => ({ type: 'p', text });

/** Subtítol dins d'un apartat. */
export const subtitle = (text) => ({ type: 'subtitle', text });

/** Llista de punts. */
export const list = (...items) => ({ type: 'list', ordered: false, items });

/** Llista numerada (passos). */
export const steps = (...items) => ({ type: 'list', ordered: true, items });

/** Bloc de codi de només lectura. `options`: { lang, title } */
export const code = (source, options = {}) => ({ type: 'code', lang: 'js', code: source, ...options });

/** Bloc d'HTML de només lectura. `options`: { title } */
export const html = (source, options = {}) => code(source, { lang: 'html', ...options });

/** Bloc de CSS de només lectura. `options`: { title } */
export const css = (source, options = {}) => code(source, { lang: 'css', ...options });

/**
 * Exemple executable. { title, intro, js, html, css, runAt, expected, why }
 * Al RA1 (sense `js`): { title, intro, html, css, focus, boxes, viewport, expected, why }
 */
export const example = (options) => ({ type: 'example', ...options });

/** Idea clau. */
export const concept = (title, text) => ({ type: 'concept', title, text });

/** Avís. */
export const warning = (title, text) => ({ type: 'warning', title, text });

/**
 * Error habitual. { title, bad, message, why, fix }
 * Al RA1: { title, bad, badLang, symptom, why, fix, fixLang } (`symptom` és el que es veu a la pàgina).
 */
export const commonError = (options) => ({ type: 'error', ...options });

/**
 * Petit repte amb editor. { title, statement, starter, hint, solution, explanation, expectedOutput, html, css }
 * Al RA1: { title, statement, html, css, focus, hint, solution: { html, css }, explanation, checks, boxes, viewport }
 */
export const challenge = (options) => ({ type: 'challenge', ...options });

/** Connexió amb el projecte final. `options`: { title, code, lang } */
export const project = (text, options = {}) => ({ type: 'project', text, ...options });

/** Taula. */
export const table = (headers, rows, caption) => ({ type: 'table', headers, rows, caption });

/** Comparació de versions. Cada element: { title, tone: 'good' | 'bad', code, lang, text } */
export const compare = (...items) => ({ type: 'compare', items });

/** Component amb maquetació pròpia (vegeu components/special). */
export const custom = (component, props = {}) => ({ type: 'custom', component, props });

// ===========================================================================
// RA1 (HTML i CSS): exemples, exercicis i comprovacions
// ===========================================================================
//
// EXEMPLES I EXERCICIS
//
//   html      El que hi ha a la pestanya HTML. Normalment és només el que
//             aniria dins del <body>. Si és un document sencer (amb <!DOCTYPE>
//             o <html>), el CSS només s'aplica si el <head> té
//             <link rel="stylesheet" href="estils.css">, com a la realitat.
//   css       El que hi ha a la pestanya CSS. Si no es posa, no hi ha pestanya
//             de CSS; amb '' hi ha una pestanya buida per escriure-hi.
//   focus     Quina pestanya s'obre: 'html' o 'css' (per defecte 'css' si n'hi ha).
//   boxes     true: comença amb els «quadrats» dibuixats (el contorn de cada caixa).
//   viewport  Alçada fixa de la previsualització, en píxels. Sense això, la
//             previsualització creix fins a mostrar tota la pàgina i mai hi ha
//             desplaçament: cal posar-ho per ensenyar position: fixed.
//
// No hi ha estils de base: la pàgina es veu amb els del navegador (lletra amb
// serifa, 8px de marge al <body>, box-sizing: content-box).
//
// Imatges que es poden fer servir (no n'hi ha cap més; un altre nom es veu
// com una imatge trencada, amb el seu alt):
//   imatges/foto.jpg (800×600)       imatges/retrat.jpg (600×800)
//   imatges/logo.png (120×120)       imatges/ruta-1.jpg … ruta-6.jpg (640×360)
//   imatges/miniatura-1.jpg … miniatura-8.jpg (640×360)
//   imatges/avatar-1.png … avatar-4.png (96×96)
//
// Un exercici, a més, porta:
//
//   solution  { html, css }: només els fitxers que canvien respecte dels de
//             partida, sencers. Es fan servir per ensenyar la solució i per
//             pintar l'«objectiu» que es pot comparar amb el resultat propi
//             (`target: false` l'amaga).
//   checks    Les comprovacions. Quan passen totes, l'exercici consta com a fet.
//
// COMPROVACIONS
//
// Cada comprovació és { label, selector, …condicions }. S'avalua dins de la
// previsualització i ha de passar amb QUALSEVOL solució correcta i amb
// qualsevol amplada (de 320 a 1200 píxels): val més mirar on queden les caixes
// que no pas quina propietat s'ha fet servir.
//
//   label     El text que llegeix l'alumne («El menú és una fila»).
//   selector  Selector CSS dels elements que es miren.
//   tol       Marge d'error en píxels (per defecte 1.5).
//
// Sense cap condició, n'hi ha prou que hi hagi algun element que coincideixi.
//
// Sobre el primer element que coincideix (o sobre tots, amb `all: true`):
//   exists: false                   no n'hi ha d'haver cap
//   count: 3 | { min, max }         quants n'hi ha
//   tag: 'nav'                      quina etiqueta és
//   text: 'Inici' | ['a', 'b']      el text conté això (sense distingir majúscules)
//   attr: { href: 'ruta.html' }     valor exacte; `true` = hi és i no és buit; `false` = no hi és.
//                                   Amb `src`, el valor és el nom del fitxer que s'ha escrit
//                                   ('imatges/ruta-3.jpg'), no la imatge que s'acaba mostrant.
//   style: { display: 'flex' }      estil calculat; una llista accepta diversos valors:
//                                   { 'justify-content': ['center', 'space-around'] }.
//                                   Els colors i les unitats es normalitzen
//                                   ('#fff' = 'white', '1rem' = '16px'). No
//                                   serveix per a percentatges ni per a
//                                   grid-template-columns: feu servir size o columns.
//                                   Tampoc per a valors que depenen d'altres
//                                   propietats de l'element: text-decoration (porta
//                                   el color; mireu text-decoration-line), les
//                                   border-*-width soles (cal la vora sencera:
//                                   border: '2px solid #000') ni line-height sense unitat.
//   size: { width, height, minWidth, maxWidth, minHeight, maxHeight }
//                                   mida de la caixa en píxels (vora inclosa)
//   at: { top, left, right, bottom }
//                                   distància a les vores de la finestra (position: fixed)
//   offset: { top, left, right, bottom }
//                                   distància a les vores interiors del contenidor
//   centered: 'x' | 'y' | 'both'    centrat dins del contenidor
//   fills: 'x' | 'y' | 'both'       omple el contenidor d'una vora a l'altra
//   inside: '.targeta'              el contenidor d'offset, centered i fills
//                                   (per defecte, el pare)
//   leftOf, rightOf, above, below, sameRow, sameColumn: '.altre'
//                                   posició respecte d'un altre element
//
// Sobre tots els elements que coincideixen alhora:
//   arrange: 'row' | 'column'       de costat (d'esquerra a dreta) o apilats
//   columns: 3, rows: 2             quantes columnes o files formen
//   gap: 16 | { x: 16, y: 24 }      separació entre veïns
//   sameSize: 'width' | 'height' | 'both'
//
// I sobre la pàgina: { label, title: 'text' } comprova el <title>.
//
// COMPONENTS (custom)
//
//   custom('BoxSketch', { title, intro, tree, steps })
//       El dibuix de quadrats d'una pàgina, que es va obrint nivell a nivell,
//       amb l'HTML que li correspon. Vegeu components/special/BoxSketch.jsx.
//   custom('CssPlayground', { title, intro, items, base, itemBase, highlight, highlightBase, controls, height })
//       Banc de proves: controls que canvien propietats i el CSS resultant.
//       Vegeu components/special/CssPlayground.jsx.
//   custom('PageDemo', { showCode })
//       El projecte final en funcionament (les dues pàgines).
