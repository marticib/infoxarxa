// Constructors dels blocs de contingut.
//
// Les unitats són dades (no components): cada apartat és una llista de blocs
// i `components/lesson/Blocks.jsx` decideix com es pinta cada tipus. Així es
// pot escriure o corregir temari sense tocar cap component de React.
//
// Format del text: vegeu `components/ui/RichText.jsx`
//   `codi`, **negreta**, *cursiva*, [enllaç](#/unitat/id)

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

/** Exemple executable. { title, intro, js, html, css, runAt, expected, why } */
export const example = (options) => ({ type: 'example', ...options });

/** Idea clau. */
export const concept = (title, text) => ({ type: 'concept', title, text });

/** Avís. */
export const warning = (title, text) => ({ type: 'warning', title, text });

/** Error habitual. { title, bad, message, why, fix } */
export const commonError = (options) => ({ type: 'error', ...options });

/** Petit repte amb editor. { title, statement, starter, hint, solution, explanation, expectedOutput, html, css } */
export const challenge = (options) => ({ type: 'challenge', ...options });

/** Connexió amb el projecte final. `options`: { title, code, lang } */
export const project = (text, options = {}) => ({ type: 'project', text, ...options });

/** Taula. */
export const table = (headers, rows, caption) => ({ type: 'table', headers, rows, caption });

/** Comparació de versions. Cada element: { title, tone: 'good' | 'bad', code, lang, text } */
export const compare = (...items) => ({ type: 'compare', items });

/** Component amb maquetació pròpia (vegeu components/special). */
export const custom = (component, props = {}) => ({ type: 'custom', component, props });
