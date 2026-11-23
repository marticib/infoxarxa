import { useRef, useState } from 'react';
import Icon from '../ui/Icon.jsx';

const MAX_ROWS = 6;

// Registre en directe d'esdeveniments: l'alumne interactua amb tres controls
// i veu quin esdeveniment es dispara i quina informació porta.
export default function EventInspector() {
  const [rows, setRows] = useState([]);
  const counter = useRef(0);

  function record(type, target, detail) {
    counter.current += 1;
    const row = { id: counter.current, type, target, detail };
    setRows((previous) => [row, ...previous].slice(0, MAX_ROWS));
  }

  return (
    <div className="special inspector">
      <p className="special__title">Prova-ho: provoca esdeveniments i mira què arriba</p>

      <ol className="inspector__flow" aria-label="Com funciona un esdeveniment">
        <li>
          <strong>1. Acció</strong>
          <span>La persona fa alguna cosa: un clic, una tecla…</span>
        </li>
        <li aria-hidden="true" className="inspector__arrow">
          <Icon name="arrowRight" size={18} />
        </li>
        <li>
          <strong>2. Esdeveniment</strong>
          <span>El navegador avisa: «ha passat un click en aquest botó».</span>
        </li>
        <li aria-hidden="true" className="inspector__arrow">
          <Icon name="arrowRight" size={18} />
        </li>
        <li>
          <strong>3. Funció</strong>
          <span>S'executa la funció que havíem deixat escoltant.</span>
        </li>
      </ol>

      <div className="inspector__controls">
        <button
          type="button"
          className="btn btn--secondary"
          onClick={(event) => record(event.type, 'button', 'Cap dada extra: n\'hi ha prou de saber que s\'ha clicat.')}
        >
          Fes-me clic
        </button>

        <label className="inspector__field">
          <span>Escriu alguna cosa</span>
          <input
            type="text"
            autoComplete="off"
            onKeyDown={(event) => record(event.type, 'input', `event.key → "${event.key}"`)}
            onInput={(event) => record(event.type, 'input', `event.target.value → "${event.target.value}"`)}
          />
        </label>

        <label className="inspector__check">
          <input
            type="checkbox"
            onChange={(event) => record(event.type, 'input (checkbox)', `event.target.checked → ${event.target.checked}`)}
          />
          <span>Marca'm</span>
        </label>
      </div>

      <div className="table-wrap" tabIndex={0} role="group" aria-label="Últims esdeveniments">
        <table className="table inspector__table">
          <caption>Últims esdeveniments (el més recent, a dalt)</caption>
          <thead>
            <tr>
              <th scope="col">event.type</th>
              <th scope="col">Element</th>
              <th scope="col">Informació que porta</th>
            </tr>
          </thead>
          <tbody aria-live="polite">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={3} className="order__empty">
                  Encara no ha passat res. Interactua amb els controls de sobre.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id}>
                  <td>
                    <code>{row.type}</code>
                  </td>
                  <td>
                    <code>{row.target}</code>
                  </td>
                  <td>{row.detail}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
