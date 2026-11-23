import { useEffect, useId, useMemo, useState } from 'react';
import Glossary from '../components/lesson/Glossary.jsx';
import Icon from '../components/ui/Icon.jsx';
import { glossary } from '../content/glossary.js';
import { normalize } from '../lib/text.js';

const letterOf = (term) => normalize(term).replace(/[^a-z0-9]/g, '').charAt(0).toUpperCase() || '#';

// Glossari general: cercador, índex alfabètic i termes agrupats per lletra.
// `initialQuery` arriba de l'adreça (#/glossari/array) quan es ve del cercador.
export default function GlossaryPage({ initialQuery }) {
  const [query, setQuery] = useState(initialQuery ?? '');
  const inputId = useId();

  useEffect(() => {
    if (initialQuery) setQuery(initialQuery);
  }, [initialQuery]);

  const sorted = useMemo(() => [...glossary].sort((a, b) => a.term.localeCompare(b.term, 'ca')), []);
  const needle = normalize(query.trim());
  const results = needle
    ? sorted.filter((item) => normalize(item.term).includes(needle) || normalize(item.definition).includes(needle))
    : sorted;

  const groups = useMemo(() => {
    const byLetter = new Map();
    for (const item of results) {
      const letter = letterOf(item.term);
      if (!byLetter.has(letter)) byLetter.set(letter, []);
      byLetter.get(letter).push(item);
    }
    return [...byLetter.entries()].map(([letter, terms]) => ({ letter, terms }));
  }, [results]);

  return (
    <article className="page page--wide">
      <header className="lesson__header">
        <p className="lesson__eyebrow eyebrow">Consulta</p>
        <h1 className="lesson__title" tabIndex={-1} data-page-title>
          Glossari
        </h1>
        <p className="lesson__lead">
          Les paraules clau del dossier, explicades en una frase. Cada terme enllaça amb la unitat on apareix per
          primera vegada.
        </p>
      </header>

      <div className="glossary-tools">
        <div className="search">
          <label className="search__label" htmlFor={inputId}>
            Cerca un terme
          </label>
          <div className="search__field">
            <Icon name="search" size={18} />
            <input
              id={inputId}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Per exemple: array, const…"
              autoComplete="off"
            />
          </div>
          <p className="search__count" role="status">
            {results.length === 1 ? '1 terme' : `${results.length} termes`}
            {needle ? ` per a «${query.trim()}»` : ''}
          </p>
        </div>

        {groups.length > 1 ? (
          <nav className="letters" aria-label="Índex alfabètic">
            {groups.map((group) => (
              <button
                key={group.letter}
                type="button"
                className="letters__btn"
                onClick={() => document.getElementById(`lletra-${group.letter}`)?.scrollIntoView()}
              >
                <span className="sr-only">Ves a la lletra </span>
                {group.letter}
              </button>
            ))}
          </nav>
        ) : null}
      </div>

      {results.length > 0 ? (
        <div className="glossary-groups">
          {groups.map((group) => (
            <section key={group.letter} className="glossary-group" aria-labelledby={`lletra-${group.letter}`}>
              <h2 id={`lletra-${group.letter}`} className="glossary-group__letter">
                {group.letter}
              </h2>
              <Glossary terms={group.terms} showUnit />
            </section>
          ))}
        </div>
      ) : (
        <p className="empty-state">No hi ha cap terme que coincideixi. Prova amb una altra paraula.</p>
      )}
    </article>
  );
}
