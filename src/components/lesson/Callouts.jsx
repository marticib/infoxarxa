import { useId } from 'react';
import CodeBlock from '../code/CodeBlock.jsx';
import Icon from '../ui/Icon.jsx';
import RichText, { Paragraphs } from '../ui/RichText.jsx';

// Caixes destacades dels apunts. Cada tipus té color, icona i etiqueta de
// text, de manera que no es distingeixen només pel color.

function Callout({ tone, icon, tag, title, children }) {
  return (
    <div className={`callout callout--${tone}`} role="note" aria-label={title ? `${tag}: ${title}` : tag}>
      <p className="callout__tag">
        <span className="callout__icon" aria-hidden="true">
          <Icon name={icon} size={15} />
        </span>
        {tag}
      </p>
      {title ? (
        <p className="callout__title">
          <RichText text={title} />
        </p>
      ) : null}
      <div className="callout__body">{children}</div>
    </div>
  );
}

// Idea clau d'un apartat.
export function ConceptCard({ title, text }) {
  return (
    <Callout tone="theory" icon="book" tag="Idea clau" title={title}>
      <Paragraphs text={text} />
    </Callout>
  );
}

// Avís: una cosa que convé no passar per alt.
export function WarningBox({ title, text }) {
  return (
    <Callout tone="warning" icon="warning" tag="Atenció" title={title}>
      <Paragraphs text={text} />
    </Callout>
  );
}

// El fil conductor de les unitats: l'exemple guia (el gestor de tasques), que
// creix una mica a cada unitat. El projecte final és un altre (unitat 11).
export function ProjectStep({ title, text, code, lang = 'js' }) {
  return (
    <Callout tone="project" icon="layers" tag="Exemple guia" title={title}>
      <Paragraphs text={text} />
      {code ? <CodeBlock code={code} lang={lang} /> : null}
    </Callout>
  );
}

// Error habitual: codi incorrecte, missatge de la consola, explicació i correcció.
export function CommonError({ title, bad, badLang = 'js', message, why, fix, fixLang = 'js' }) {
  const headingId = useId();

  return (
    <article className="card card--error" aria-labelledby={headingId}>
      <header className="card__header" id={headingId}>
        <span className="card__icon" aria-hidden="true">
          <Icon name="error" size={16} />
        </span>
        <div className="card__heading">
          <span className="card__tag">Error habitual</span>
          <h3 className="card__title">
            <RichText text={title} />
          </h3>
        </div>
      </header>

      {bad ? <CodeBlock code={bad} lang={badLang} title="Codi amb l'error" tone="bad" /> : null}

      {message ? (
        <p className="error-message">
          <span className="error-message__label">
            <Icon name="terminal" size={15} />
            Missatge a la consola
          </span>
          <code>{message}</code>
        </p>
      ) : null}

      <div className="card__note">
        <p className="card__note-title">Què passa</p>
        <Paragraphs text={why} />
      </div>

      {fix ? <CodeBlock code={fix} lang={fixLang} title="Codi corregit" tone="good" /> : null}
    </article>
  );
}

// Dues o més versions una al costat de l'altra.
export function CompareBlock({ items }) {
  return (
    <div className="compare">
      {items.map((item, index) => (
        <div key={index} className={`compare__item compare__item--${item.tone ?? 'neutral'}`}>
          <p className="compare__title">
            {item.tone === 'good' ? <Icon name="check" size={16} /> : null}
            {item.tone === 'bad' ? <Icon name="close" size={16} /> : null}
            <RichText text={item.title} />
          </p>
          {item.code ? <CodeBlock code={item.code} lang={item.lang ?? 'js'} title={item.codeTitle} /> : null}
          <Paragraphs text={item.text} />
        </div>
      ))}
    </div>
  );
}

export function DataTable({ headers, rows, caption }) {
  return (
    <div className="table-wrap" tabIndex={0} role="group" aria-label={caption ?? 'Taula'}>
      <table className="table">
        {caption ? <caption>{caption}</caption> : null}
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} scope="col">
                <RichText text={header} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>
                  <RichText text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
