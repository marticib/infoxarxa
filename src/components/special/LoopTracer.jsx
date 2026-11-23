import { useMemo, useState } from 'react';
import Icon from '../ui/Icon.jsx';
import RichText from '../ui/RichText.jsx';

const LIMIT = 3;

// Traça d'un bucle for, pas a pas: quina part s'executa, quant val `i` i què
// hi ha a la consola en cada moment.
function buildSteps(limit) {
  const steps = [
    {
      part: 'init',
      i: 1,
      output: [],
      text: '**Inici.** Es crea la variable `i` amb el valor 1. Aquesta part només s\'executa una vegada.',
    },
  ];
  const output = [];
  let i = 1;

  for (;;) {
    const passes = i <= limit;
    steps.push({
      part: 'cond',
      i,
      output: [...output],
      text: passes
        ? `**Condició.** \`${i} <= ${limit}\` és \`true\`: entrem al cos del bucle.`
        : `**Condició.** \`${i} <= ${limit}\` és \`false\`: el bucle s'acaba i el programa continua amb el que hi hagi després.`,
    });
    if (!passes) break;

    output.push(`Volta ${i}`);
    steps.push({
      part: 'body',
      i,
      output: [...output],
      text: `**Cos.** S'executa \`console.log\` i a la consola apareix «Volta ${i}».`,
    });

    i++;
    steps.push({
      part: 'update',
      i,
      output: [...output],
      text: `**Actualització.** \`i++\` suma 1 al comptador. Ara \`i\` val ${i} i tornem a comprovar la condició.`,
    });
  }

  return steps;
}

const PART_LABELS = {
  init: '1 · inici',
  cond: '2 · condició',
  body: '3 · cos',
  update: '4 · actualització',
};

export default function LoopTracer() {
  const steps = useMemo(() => buildSteps(LIMIT), []);
  const [index, setIndex] = useState(0);
  const step = steps[index];
  const isLast = index === steps.length - 1;

  const part = (name, text) => (
    <span className={`tracer__part${step.part === name ? ' tracer__part--active' : ''}`}>{text}</span>
  );

  return (
    <div className="special tracer">
      <p className="special__title">Pas a pas: què fa exactament un bucle for</p>

      <div className="tracer__grid">
        <div>
          <pre className="tracer__code" tabIndex={0} aria-label="Codi del bucle">
            <code>
              {'for ('}
              {part('init', 'let i = 1')}
              {'; '}
              {part('cond', `i <= ${LIMIT}`)}
              {'; '}
              {part('update', 'i++')}
              {') {\n  '}
              {part('body', 'console.log(`Volta ${i}`);')}
              {'\n}'}
            </code>
          </pre>
          <p className="tracer__now">
            S'està executant: <strong>{PART_LABELS[step.part]}</strong>
          </p>
        </div>

        <div className="tracer__state">
          <div className="tracer__box">
            <p className="tracer__box-title">Variable</p>
            <p className="tracer__value">
              <code>i</code> = <strong>{step.i}</strong>
            </p>
          </div>
          <div className="tracer__box">
            <p className="tracer__box-title">Consola</p>
            {step.output.length === 0 ? (
              <p className="order__empty">(buida)</p>
            ) : (
              <ul className="tracer__output">
                {step.output.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="special__status" aria-live="polite">
        <p className="special__step">
          Pas {index + 1} de {steps.length}
        </p>
        <p>
          <RichText text={step.text} />
        </p>
      </div>

      <div className="special__actions">
        <button
          type="button"
          className="btn btn--secondary"
          onClick={() => setIndex((value) => value - 1)}
          disabled={index === 0}
        >
          <Icon name="chevronLeft" size={18} />
          Pas anterior
        </button>
        {isLast ? (
          <button type="button" className="btn btn--primary" onClick={() => setIndex(0)}>
            <Icon name="reset" size={18} />
            Torna a començar
          </button>
        ) : (
          <button type="button" className="btn btn--primary" onClick={() => setIndex((value) => value + 1)}>
            Pas següent
            <Icon name="chevronRight" size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
