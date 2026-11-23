import { useId, useRef } from 'react';
import Highlighted from './Highlighted.jsx';

// Editor de codi senzill: un <textarea> transparent a sobre del mateix codi
// pintat amb colors. Així conservem el comportament natiu del navegador
// (selecció, desfer, teclat del mòbil, lectors de pantalla) sense llibreries.

function insertText(textarea, text, onChange) {
  // execCommand conserva l'historial de «desfer» del navegador.
  const inserted = document.execCommand && document.execCommand('insertText', false, text);
  if (!inserted) {
    textarea.setRangeText(text, textarea.selectionStart, textarea.selectionEnd, 'end');
    onChange(textarea.value);
  }
}

export default function CodeEditor({ value, onChange, lang = 'js', label, onRun }) {
  const hintId = useId();
  const escapePressed = useRef(false);
  const lineCount = value.split('\n').length;
  const lineNumbers = Array.from({ length: lineCount }, (_, index) => index + 1).join('\n');

  function handleKeyDown(event) {
    const textarea = event.currentTarget;

    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault();
      onRun?.();
      return;
    }

    if (event.key === 'Escape') {
      // Esc + Tab permet sortir de l'editor amb el teclat.
      escapePressed.current = true;
      return;
    }

    if (event.key === 'Tab' && !event.shiftKey && !event.altKey && !event.ctrlKey && !event.metaKey) {
      if (escapePressed.current) {
        escapePressed.current = false;
        return;
      }
      event.preventDefault();
      insertText(textarea, '  ', onChange);
      return;
    }

    if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
      // Manté el sagnat de la línia actual (i l'augmenta després de «{»).
      const before = textarea.value.slice(0, textarea.selectionStart);
      const currentLine = before.slice(before.lastIndexOf('\n') + 1);
      let indent = /^[ \t]*/.exec(currentLine)[0];
      if (/[{([]\s*$/.test(currentLine)) indent += '  ';
      if (indent !== '') {
        event.preventDefault();
        insertText(textarea, `\n${indent}`, onChange);
      }
    }

    if (event.key !== 'Shift') escapePressed.current = false;
  }

  return (
    <div className="editor">
      <div className="editor__scroll">
        <pre className="editor__gutter" aria-hidden="true">
          {lineNumbers}
        </pre>
        <div className="editor__stack">
          <pre className="editor__highlight" aria-hidden="true">
            <code>
              <Highlighted code={value} lang={lang} />
              {'\n'}
            </code>
          </pre>
          <textarea
            className="editor__input"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={handleKeyDown}
            aria-label={label}
            aria-describedby={hintId}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            wrap="off"
            rows={1}
          />
        </div>
      </div>
      <p id={hintId} className="sr-only">
        Editor de codi. La tecla Tab afegeix sagnat; per sortir de l'editor amb el teclat, prem Escape i després
        Tab. Control + Retorn executa el codi.
      </p>
    </div>
  );
}
