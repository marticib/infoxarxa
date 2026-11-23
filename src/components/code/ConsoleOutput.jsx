import { explainError } from '../../lib/errorHints.js';

// Mostra el que el codi ha escrit a la consola: missatges, avisos, taules i
// errors. Cada tipus porta una etiqueta de text, no només un color.

function Parts({ parts }) {
  return parts.map((part, index) => (
    <span key={index}>
      {index > 0 ? ' ' : ''}
      <span className={`console__value console__value--${part.kind}`}>{part.text}</span>
    </span>
  ));
}

function ConsoleEntry({ entry }) {
  if (entry.level === 'exception') {
    const hint = explainError(entry.name, entry.message);
    return (
      <div className="console__entry console__entry--error">
        <span className="console__badge">Error</span>
        <div className="console__content">
          <p className="console__message">
            <strong>{entry.name}</strong>: {entry.message}
            {entry.line ? (
              <span className="console__where">
                {' '}
                ({entry.file ? `${entry.file}, ` : ''}línia {entry.line})
              </span>
            ) : null}
          </p>
          {hint ? <p className="console__hint">{hint}</p> : null}
        </div>
      </div>
    );
  }

  if (entry.level === 'table') {
    return (
      <div className="console__entry console__entry--table">
        <div className="console__table-wrap" tabIndex={0} role="group" aria-label="Taula de console.table">
          <table className="console__table">
            <thead>
              <tr>
                {entry.columns.map((column, index) => (
                  <th key={index} scope="col">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {entry.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) =>
                    cellIndex === 0 ? (
                      <th key={cellIndex} scope="row">
                        {cell}
                      </th>
                    ) : (
                      <td key={cellIndex}>{cell}</td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (entry.level === 'system') {
    return (
      <div className="console__entry console__entry--system">
        <span className="console__badge">Nota</span>
        <div className="console__content">{entry.text}</div>
      </div>
    );
  }

  const badges = { warn: 'Avís', error: 'Error', alert: 'alert()', info: 'Info' };
  const badge = badges[entry.level];

  return (
    <div className={`console__entry console__entry--${entry.level}`}>
      {badge ? (
        <span className="console__badge">{badge}</span>
      ) : (
        <span className="console__prompt" aria-hidden="true">
          ›
        </span>
      )}
      <div className="console__content">
        <Parts parts={entry.parts} />
      </div>
    </div>
  );
}

export default function ConsoleOutput({ entries, emptyText }) {
  return (
    <div className="console" role="log" aria-label="Sortida de la consola" tabIndex={0}>
      {entries.length === 0 ? (
        <p className="console__empty">{emptyText}</p>
      ) : (
        entries.map((entry, index) => <ConsoleEntry key={index} entry={entry} />)
      )}
    </div>
  );
}

// Text de la consola, línia a línia, per comparar-lo amb el resultat esperat.
export function consoleLines(entries) {
  return entries
    .filter((entry) => Array.isArray(entry.parts) && entry.level !== 'alert')
    .flatMap((entry) =>
      entry.parts
        .map((part) => part.text)
        .join(' ')
        .split('\n')
    )
    .map((line) => line.trim())
    .filter((line) => line !== '');
}
