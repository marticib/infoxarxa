import { useState } from 'react';

const INITIAL = ['Anna', 'Marc', 'Júlia'];
const NEW_NAMES = ['Pau', 'Laia', 'Nil', 'Ona', 'Jan', 'Mar', 'Biel', 'Aina'];
const MAX_ITEMS = 7;

// Visualitza un array com una fila de caselles numerades i mostra l'efecte de
// push, pop, unshift i shift.
export default function ArrayVisualizer() {
  const [items, setItems] = useState(INITIAL);
  const [nextName, setNextName] = useState(0);
  const [last, setLast] = useState(null);

  const newName = NEW_NAMES[nextName % NEW_NAMES.length];
  const isFull = items.length >= MAX_ITEMS;
  const isEmpty = items.length === 0;

  function add(method) {
    const updated = method === 'push' ? [...items, newName] : [newName, ...items];
    setItems(updated);
    setNextName((value) => value + 1);
    setLast({
      code: `alumnes.${method}("${newName}");`,
      returned: String(updated.length),
      text:
        method === 'push'
          ? `Afegeix «${newName}» al final. Retorna la nova longitud.`
          : `Afegeix «${newName}» al principi: tots els altres es desplacen una posició. Retorna la nova longitud.`,
    });
  }

  function remove(method) {
    const removed = method === 'pop' ? items[items.length - 1] : items[0];
    setItems(method === 'pop' ? items.slice(0, -1) : items.slice(1));
    setLast({
      code: `alumnes.${method}();`,
      returned: `"${removed}"`,
      text:
        method === 'pop'
          ? `Treu l'últim element i el retorna.`
          : `Treu el primer element i el retorna: tots els altres es desplacen una posició.`,
    });
  }

  function reset() {
    setItems(INITIAL);
    setNextName(0);
    setLast(null);
  }

  return (
    <div className="special arrayviz">
      <p className="special__title">Prova-ho: afegeix i treu elements d'un array</p>

      <div className="arrayviz__row" role="group" aria-label={`Array alumnes amb ${items.length} elements`}>
        <code className="arrayviz__name">alumnes</code>
        {isEmpty ? (
          <p className="order__empty">[ ] (array buit)</p>
        ) : (
          <ol className="arrayviz__cells">
            {items.map((item, index) => (
              <li key={`${item}-${index}`} className="arrayviz__cell">
                <span className="arrayviz__value">"{item}"</span>
                <span className="arrayviz__index">
                  <span className="sr-only">índex </span>
                  {index}
                </span>
              </li>
            ))}
          </ol>
        )}
      </div>

      <p className="arrayviz__length">
        <code>alumnes.length</code> → <strong>{items.length}</strong>
      </p>

      <div className="special__actions special__actions--wrap">
        <button type="button" className="btn btn--secondary" onClick={() => add('unshift')} disabled={isFull}>
          <code>unshift("{newName}")</code>
        </button>
        <button type="button" className="btn btn--secondary" onClick={() => remove('shift')} disabled={isEmpty}>
          <code>shift()</code>
        </button>
        <button type="button" className="btn btn--secondary" onClick={() => add('push')} disabled={isFull}>
          <code>push("{newName}")</code>
        </button>
        <button type="button" className="btn btn--secondary" onClick={() => remove('pop')} disabled={isEmpty}>
          <code>pop()</code>
        </button>
        <button type="button" className="btn btn--ghost" onClick={reset}>
          Torna a començar
        </button>
      </div>

      <div className="special__status" aria-live="polite">
        {last ? (
          <>
            <p>
              <code>{last.code}</code> → retorna <code>{last.returned}</code>
            </p>
            <p>{last.text}</p>
          </>
        ) : (
          <p>
            Els botons de l'esquerra treballen amb el <strong>principi</strong> de l'array; els de la dreta, amb el{' '}
            <strong>final</strong>. Fixa't en els índexs de sota de cada casella.
          </p>
        )}
      </div>
    </div>
  );
}
