import { useId, useState } from 'react';
import CodeBlock from '../code/CodeBlock.jsx';
import Icon from '../ui/Icon.jsx';
import RichText from '../ui/RichText.jsx';

// Banc de proves de CSS: uns quants controls que canvien propietats d'un
// contenidor (o d'un dels seus fills) i el resultat a l'instant, amb el CSS
// que s'hauria d'escriure per aconseguir-lo.
//
//   custom('CssPlayground', {
//     title: 'Prova-ho: justify-content',
//     items: 4,                              // quants fills, o els seus textos
//     base: { display: 'flex' },             // declaracions fixes del contenidor
//     itemBase: { width: '64px' },           // declaracions fixes de tots els fills
//     highlight: 2,                          // el fill destacat (comença per 1)
//     highlightBase: { position: 'absolute' },
//     controls: [
//       { prop: 'justify-content', options: ['flex-start', 'center', 'flex-end'] },
//       { prop: 'gap', min: 0, max: 40, step: 4, unit: 'px', initial: 8 },
//       { target: 'item', prop: 'flex-grow', options: ['0', '1', '2'] },   // actua sobre el fill destacat
//     ],
//     height: 200,                           // alçada mínima de la zona de proves
//   })
//
// Els valors surten sempre de llistes i rangs tancats: no s'hi escriu CSS lliure.

const camel = (property) => property.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());

const toStyle = (declarations) =>
  Object.fromEntries(Object.entries(declarations).map(([property, value]) => [camel(property), value]));

const toRule = (selector, declarations) => {
  const lines = Object.entries(declarations).map(([property, value]) => `  ${property}: ${value};`);
  return lines.length > 0 ? `${selector} {\n${lines.join('\n')}\n}` : null;
};

const initialOf = (control) => control.initial ?? (control.options ? control.options[0] : control.min);
const valueOf = (control, raw) => (control.options ? raw : `${raw}${control.unit ?? ''}`);

export default function CssPlayground({
  title = 'Prova-ho',
  intro,
  items = 3,
  selector = '.contenidor',
  itemSelector = '.fill',
  highlightSelector,
  base = {},
  itemBase = {},
  highlight,
  highlightBase = {},
  controls,
  height = 160,
}) {
  const baseId = useId();
  const [values, setValues] = useState(() => controls.map(initialOf));
  const labels = Array.isArray(items) ? items : Array.from({ length: items }, (_, index) => String(index + 1));
  const highlightName = highlightSelector ?? `${itemSelector}-${highlight}`;

  const containerRules = { ...base };
  const highlightRules = { ...highlightBase };
  controls.forEach((control, index) => {
    const target = control.target === 'item' ? highlightRules : containerRules;
    target[control.prop] = valueOf(control, values[index]);
  });

  const css = [
    toRule(selector, containerRules),
    toRule(itemSelector, itemBase),
    highlight ? toRule(highlightName, highlightRules) : null,
  ]
    .filter(Boolean)
    .join('\n\n');

  const changed = values.some((value, index) => value !== initialOf(controls[index]));

  return (
    <div className="special playground">
      <p className="special__title">{title}</p>
      {intro ? (
        <p>
          <RichText text={intro} />
        </p>
      ) : null}

      <div className="playground__layout">
        <div className="playground__controls">
          {controls.map((control, index) => {
            const id = `${baseId}-${index}`;
            const who = control.target === 'item' ? highlightName : selector;
            return (
              <div key={index} className="playground__control">
                <label htmlFor={id}>
                  <code>{control.prop}</code>
                  <span className="playground__who">{who}</span>
                </label>
                {control.options ? (
                  <select
                    id={id}
                    value={values[index]}
                    onChange={(event) =>
                      setValues((previous) => previous.map((value, i) => (i === index ? event.target.value : value)))
                    }
                  >
                    {control.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span className="playground__range">
                    <input
                      id={id}
                      type="range"
                      min={control.min}
                      max={control.max}
                      step={control.step ?? 1}
                      value={values[index]}
                      onChange={(event) =>
                        setValues((previous) => previous.map((value, i) => (i === index ? Number(event.target.value) : value)))
                      }
                    />
                    <output htmlFor={id}>{valueOf(control, values[index])}</output>
                  </span>
                )}
              </div>
            );
          })}
          <button
            type="button"
            className="btn btn--secondary btn--small playground__reset"
            disabled={!changed}
            onClick={() => setValues(controls.map(initialOf))}
          >
            <Icon name="reset" size={15} />
            Valors inicials
          </button>
        </div>

        {/* La zona de proves és visual; el CSS de sota diu el mateix amb text. */}
        <div className="playground__page" aria-hidden="true">
          <span className="playground__tag">{selector}</span>
          <div className="playground__container" style={{ minHeight: height, ...toStyle(containerRules) }}>
            {labels.map((label, index) => {
              const isHighlight = highlight === index + 1;
              return (
                <div
                  key={index}
                  className={`playground__item${isHighlight ? ' playground__item--highlight' : ''}`}
                  style={{ ...toStyle(itemBase), ...(isHighlight ? toStyle(highlightRules) : null) }}
                >
                  {label}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <CodeBlock code={css} lang="css" title="El CSS que ho fa" />
    </div>
  );
}
