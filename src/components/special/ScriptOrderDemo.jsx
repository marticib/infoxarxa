import { useState } from 'react';
import CodeBlock from '../code/CodeBlock.jsx';
import Icon from '../ui/Icon.jsx';
import RichText from '../ui/RichText.jsx';

// Simulació pas a pas de com el navegador llegeix una pàgina amb un <script>
// al <head>, amb defer i sense. No executa res: és una explicació guiada.

const htmlFor = (defer) =>
  [
    '<!DOCTYPE html>',
    '<html lang="ca">',
    '  <head>',
    '    <title>Tasques</title>',
    `    <script src="app.js"${defer ? ' defer' : ''}></script>`,
    '  </head>',
    '  <body>',
    '    <h1 id="titol">Carregant…</h1>',
    '  </body>',
    '</html>',
  ].join('\n');

const APP_JS = 'document.querySelector("#titol")\n  .textContent = "Les meves tasques";';

const ERROR_TEXT = "TypeError: Cannot set properties of null (setting 'textContent')";

const SCENARIOS = {
  sense: {
    label: 'Sense defer',
    defer: false,
    steps: [
      {
        html: [1, 2, 3, 4],
        text: 'El navegador llegeix l\'HTML de dalt a baix i va construint la pàgina, etiqueta a etiqueta.',
      },
      {
        html: [5],
        text: 'Troba un `<script>`. **S\'atura**: deixa de llegir HTML, descarrega `app.js` i l\'executa ara mateix.',
      },
      {
        html: [5],
        js: [1, 2],
        text: '`app.js` busca l\'element `#titol`… però el navegador encara no ha arribat a la línia 8. L\'element no existeix i `querySelector` retorna `null`.',
      },
      {
        html: [5],
        js: [1, 2],
        error: true,
        text: 'Intentar canviar el text de `null` provoca un error. L\'script s\'acaba aquí.',
      },
      {
        html: [6, 7, 8, 9, 10],
        error: true,
        page: 'Carregant…',
        text: 'El navegador continua llegint i ara sí que crea l\'`<h1>`. Massa tard: l\'script ja ha fallat i el títol es queda dient «Carregant…».',
      },
    ],
  },
  amb: {
    label: 'Amb defer',
    defer: true,
    steps: [
      {
        html: [1, 2, 3, 4],
        text: 'El navegador llegeix l\'HTML de dalt a baix i va construint la pàgina, etiqueta a etiqueta.',
      },
      {
        html: [5],
        text: 'Troba `<script defer>`. Comença a descarregar `app.js` **en paral·lel**, però no s\'atura. `defer` vol dir: «executa\'l quan hagis acabat de llegir l\'HTML».',
      },
      {
        html: [6, 7, 8, 9, 10],
        page: 'Carregant…',
        text: 'Continua llegint: crea el `<body>` i l\'`<h1 id="titol">`. La pàgina ja està completa.',
      },
      {
        html: [10],
        js: [1, 2],
        page: 'Carregant…',
        text: 'Ara que tot l\'HTML s\'ha llegit, executa `app.js`. Aquesta vegada `querySelector` sí que troba l\'`<h1>`.',
      },
      {
        html: [10],
        js: [1, 2],
        page: 'Les meves tasques',
        text: 'L\'script canvia el text i la pàgina mostra el títol nou. Tot ha funcionat.',
      },
    ],
  },
};

export default function ScriptOrderDemo() {
  const [scenarioId, setScenarioId] = useState('sense');
  const [stepIndex, setStepIndex] = useState(0);

  const scenario = SCENARIOS[scenarioId];
  const step = scenario.steps[stepIndex];
  const isLast = stepIndex === scenario.steps.length - 1;

  function choose(id) {
    setScenarioId(id);
    setStepIndex(0);
  }

  return (
    <div className="special order">
      <p className="special__title">Pas a pas: què fa el navegador amb un script al &lt;head&gt;</p>

      <div className="special__toggle" role="group" aria-label="Versió de l'exemple">
        {Object.entries(SCENARIOS).map(([id, item]) => (
          <button
            key={id}
            type="button"
            className="special__toggle-btn"
            aria-pressed={id === scenarioId}
            onClick={() => choose(id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="order__grid">
        <CodeBlock code={htmlFor(scenario.defer)} lang="html" title="index.html" highlightLines={step.html ?? []} />
        <div className="order__side">
          <CodeBlock code={APP_JS} lang="js" title="app.js" highlightLines={step.js ?? []} />

          <div className="order__panel">
            <p className="order__panel-title">Què es veu a la pàgina</p>
            <p className="order__page">{step.page ?? <span className="order__empty">(encara res)</span>}</p>
          </div>

          <div className="order__panel">
            <p className="order__panel-title">Consola</p>
            {step.error ? (
              <p className="order__error">
                <Icon name="error" size={16} />
                <span>
                  <span className="sr-only">Error: </span>
                  {ERROR_TEXT}
                </span>
              </p>
            ) : (
              <p className="order__empty">(sense missatges)</p>
            )}
          </div>
        </div>
      </div>

      <div className="special__status" aria-live="polite">
        <p className="special__step">
          Pas {stepIndex + 1} de {scenario.steps.length}
        </p>
        <p>
          <RichText text={step.text} />
        </p>
      </div>

      <div className="special__actions">
        <button
          type="button"
          className="btn btn--secondary"
          onClick={() => setStepIndex((value) => value - 1)}
          disabled={stepIndex === 0}
        >
          <Icon name="chevronLeft" size={18} />
          Pas anterior
        </button>
        {isLast ? (
          <button type="button" className="btn btn--primary" onClick={() => setStepIndex(0)}>
            <Icon name="reset" size={18} />
            Torna a començar
          </button>
        ) : (
          <button type="button" className="btn btn--primary" onClick={() => setStepIndex((value) => value + 1)}>
            Pas següent
            <Icon name="chevronRight" size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
