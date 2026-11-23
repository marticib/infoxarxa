import { useEffect, useRef, useState } from 'react';
import Highlighted from './Highlighted.jsx';
import Icon from '../ui/Icon.jsx';
import { LANGUAGE_LABELS } from '../../lib/highlight.js';

// Bloc de codi de només lectura, amb etiqueta del llenguatge i botó de copiar.
export default function CodeBlock({ code, lang = 'js', title, tone, highlightLines }) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);
  const source = code.replace(/\n+$/, '');
  const label = title || LANGUAGE_LABELS[lang] || lang;

  useEffect(() => () => clearTimeout(timerRef.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(source);
      setCopied(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  const lines = highlightLines ? source.split('\n') : null;

  return (
    <figure className={`codeblock${tone ? ` codeblock--${tone}` : ''}`}>
      <figcaption className="codeblock__bar">
        <span className="codeblock__label">{label}</span>
        <button type="button" className="codeblock__copy" onClick={copy}>
          <Icon name={copied ? 'check' : 'copy'} size={16} />
          <span aria-live="polite">{copied ? 'Copiat' : 'Copia'}</span>
        </button>
      </figcaption>
      <pre className="codeblock__pre" tabIndex={0} aria-label={`Codi ${label}`}>
        <code>
          {lines
            ? lines.map((line, index) => (
                <span
                  key={index}
                  className={`codeblock__line${highlightLines.includes(index + 1) ? ' codeblock__line--active' : ''}`}
                >
                  <Highlighted code={line} lang={lang} />
                  {'\n'}
                </span>
              ))
            : <Highlighted code={source} lang={lang} />}
        </code>
      </pre>
    </figure>
  );
}
