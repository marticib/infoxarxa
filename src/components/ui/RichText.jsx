// Format en línia per al text dels apunts. Permet escriure el contingut com a
// text pla amb una sintaxi mínima, semblant a Markdown:
//
//   `codi`            → codi en línia
//   ``codi amb ` ``   → codi en línia que conté accents greus
//   **important**     → negreta
//   *matís*           → cursiva
//   [text](#/ruta)    → enllaç intern

import { INLINE_PATTERN } from '../../lib/text.js';

function renderInline(text, keyPrefix) {
  const nodes = [];
  const pattern = new RegExp(INLINE_PATTERN.source, 'g');
  let lastIndex = 0;
  let count = 0;
  let match = pattern.exec(text);

  while (match !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    const key = `${keyPrefix}${count}`;
    count++;

    if (match[1] !== undefined || match[2] !== undefined) {
      nodes.push(<code key={key}>{match[1] ?? match[2]}</code>);
    } else if (match[3] !== undefined) {
      nodes.push(<strong key={key}>{renderInline(match[3], `${key}-`)}</strong>);
    } else if (match[4] !== undefined) {
      nodes.push(<em key={key}>{renderInline(match[4], `${key}-`)}</em>);
    } else {
      nodes.push(
        <a key={key} href={match[6]}>
          {renderInline(match[5], `${key}-`)}
        </a>
      );
    }

    lastIndex = pattern.lastIndex;
    match = pattern.exec(text);
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

export default function RichText({ text }) {
  if (!text) return null;
  return <>{renderInline(text, 'r')}</>;
}

// Accepta un string o una llista de strings i en fa paràgrafs.
export function Paragraphs({ text, className }) {
  if (!text) return null;
  const items = Array.isArray(text) ? text : [text];
  return items.map((item, index) => (
    <p key={index} className={className}>
      <RichText text={item} />
    </p>
  ));
}
