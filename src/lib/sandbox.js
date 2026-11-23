import runtimeSource from './sandboxRuntime.js?raw';
import { addLoopGuards } from './loopGuard.js';

// Construeix el document que es carrega dins de l'iframe aïllat.
//
// L'iframe es crea amb sandbox="allow-scripts allow-forms" i SENSE
// allow-same-origin: el codi de l'alumne s'executa en un origen opac, sense
// accés al document, a les cookies ni al localStorage de l'aplicació.

export const SANDBOX_SOURCE = 'ra2js-sandbox';
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

// `data` és un segon fitxer de JavaScript (per exemple, dades.js) que
// s'executa abans que el principal, com faria un altre <script> de la pàgina.
export function buildSrcdoc({
  js = '',
  html = '',
  css = '',
  data = '',
  dataName = 'dades.js',
  runId,
  runAt = 'ready',
  storage = {},
}) {
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
