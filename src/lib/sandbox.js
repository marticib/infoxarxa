import runtimeSource from './sandboxRuntime.js?raw';
import { addLoopGuards } from './loopGuard.js';
import { withSampleImages } from './sampleImages.js';

// Construeix el document que es carrega dins de l'iframe aïllat.
//
// L'iframe es crea amb sandbox="allow-scripts allow-forms" i SENSE
// allow-same-origin: el codi de l'alumne s'executa en un origen opac, sense
// accés al document, a les cookies ni al localStorage de l'aplicació.

export const SANDBOX_SOURCE = 'ra2js-sandbox';
// Missatges que l'aplicació envia a la previsualització (mostrar els quadrats).
export const HOST_SOURCE = 'ra2js-host';
export const SANDBOX_PERMISSIONS = 'allow-scripts allow-forms';

// Estils mínims perquè les previsualitzacions es vegin endreçades.
// La previsualització és sempre clara: representa «la pàgina de l'alumne».
const BASE_CSS = `
:root { color-scheme: light; }
*, *::before, *::after { box-sizing: border-box; }
html { font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; font-size: 16px; line-height: 1.5; color: #1b2233; background: #ffffff; }
body { margin: 0; padding: 16px; }
button, input, select, textarea { font: inherit; }
:focus-visible { outline: 3px solid #3451d1; outline-offset: 2px; }
`;

let runCounter = 0;

export function createRunId() {
  runCounter += 1;
  return `run-${Date.now().toString(36)}-${runCounter}`;
}

// JSON que es pot incrustar dins d'un <script> sense tancar-lo per accident.
function toScriptJson(value) {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

// ---------------------------------------------------------------------------
// Mode «pàgina» (dossier d'HTML i CSS)
// ---------------------------------------------------------------------------
//
// Aquí no hi ha JavaScript de l'alumne ni estils de base: la pàgina es veu amb
// els estils per defecte del navegador, com un fitxer .html obert de veritat.
//
// L'HTML pot ser un tros (el que aniria dins del <body>) o un document sencer
// (amb <!DOCTYPE>, <html>, <head>…). Si és un tros, el CSS de la pestanya
// s'aplica sempre. Si és un document sencer, només s'aplica quan el <head> té
// un <link rel="stylesheet"> amb el nom del fitxer: igual que a la realitat.

const isFullDocument = (html) => /<html[\s>]|<!doctype/i.test(html);

const attribute = (tag, name) => {
  const match = new RegExp(`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i').exec(tag);
  return match ? (match[1] ?? match[2] ?? match[3] ?? '') : null;
};

function buildPageSrcdoc({ html, css, cssName, config }) {
  const images = withSampleImages(html, css);
  const notes = images.missing.map(
    (name) => `No s'ha trobat la imatge «${name}». Revisa el nom del fitxer i la carpeta.`
  );

  const safeCss = images.css.replace(/<\/style/gi, '<\\/style');
  const styleTag = `<style data-fitxer="${cssName}">${safeCss}</style>`;
  const fullDocument = isFullDocument(images.html);
  let linked = false;

  // Els <link> a fulls d'estil: el que porta al fitxer de la pestanya CSS es
  // converteix en els estils; els altres no existeixen, i se n'avisa.
  const body = images.html.replace(/<link\b[^>]*>/gi, (tag) => {
    if ((attribute(tag, 'rel') ?? '').toLowerCase() !== 'stylesheet') return tag;
    const href = (attribute(tag, 'href') ?? '').trim().replace(/^\.\//, '');
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(href)) return tag;
    if (href === cssName && !linked) {
      linked = true;
      return fullDocument ? styleTag : '';
    }
    if (href !== cssName) notes.push(`No s'ha trobat el full d'estils «${href}». El fitxer es diu «${cssName}».`);
    return '';
  });

  const closeScript = '</' + 'script>';
  const runtime = `<script>${runtimeSource}\n__sandboxRuntime(${toScriptJson({ ...config, notes })});${closeScript}`;

  if (fullDocument) {
    // El nostre codi va just després del <!DOCTYPE>, que ha de continuar sent
    // el primer que troba el navegador.
    const doctype = /^\s*<!doctype[^>]*>/i.exec(body);
    return doctype ? `${doctype[0]}\n${runtime}${body.slice(doctype[0].length)}` : `${runtime}\n${body}`;
  }

  return [
    '<!doctype html>',
    '<html lang="ca">',
    '<head>',
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    styleTag,
    runtime,
    '</head>',
    '<body>',
    body,
    '</body>',
    '</html>',
  ].join('\n');
}

// `data` és un segon fitxer de JavaScript (per exemple, dades.js) que
// s'executa abans que el principal, com faria un altre <script> de la pàgina.
//
// Amb `mode: 'page'` es construeix una pàgina d'HTML i CSS (vegeu més amunt).
// `boxes` hi dibuixa el contorn de cada caixa i `checks` són les comprovacions
// d'un exercici, que s'avaluen dins de la mateixa pàgina.
export function buildSrcdoc({
  js = '',
  html = '',
  css = '',
  data = '',
  dataName = 'dades.js',
  runId,
  runAt = 'ready',
  storage = {},
  mode = 'code',
  cssName = 'estils.css',
  boxes = false,
  checks = null,
}) {
  if (mode === 'page') {
    return buildPageSrcdoc({
      html,
      css,
      cssName,
      config: {
        runId,
        runAt: 'ready',
        mode,
        code: '',
        guarded: '',
        prelude: '',
        storage: {},
        reportHeight: true,
        boxes,
        checks,
      },
    });
  }

  let guarded = js;
  try {
    guarded = addLoopGuards(js);
  } catch {
    guarded = js;
  }

  const config = {
    runId,
    runAt,
    code: js,
    guarded,
    prelude: data,
    preludeName: dataName,
    storage,
    reportHeight: html.trim() !== '',
  };

  const safeCss = css.replace(/<\/style/gi, '<\\/style');
  const closeScript = '</' + 'script>';

  return [
    '<!doctype html>',
    '<html lang="ca">',
    '<head>',
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    `<style>${BASE_CSS}</style>`,
    `<style>${safeCss}</style>`,
    `<script>${runtimeSource}\n__sandboxRuntime(${toScriptJson(config)});${closeScript}`,
    '</head>',
    '<body>',
    html,
    '</body>',
    '</html>',
  ].join('\n');
}
