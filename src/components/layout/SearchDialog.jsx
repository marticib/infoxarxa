import { useEffect, useId, useMemo, useRef, useState } from 'react';
import Icon from '../ui/Icon.jsx';
import { groupResults, KINDS, search, suggestions } from '../../lib/searchIndex.js';

// Cercador de tot el dossier (Ctrl/⌘ + K). Fa servir un <dialog> natiu, com
// el diàleg de confirmació, i el patró «combobox + listbox»: el focus es queda
// al camp de text i les fletxes mouen l'opció activa.
export default function SearchDialog({ open, onClose }) {
  const dialogRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const baseId = useId();
  const listId = `${baseId}-resultats`;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      setQuery('');
      setActiveIndex(0);
      dialog.showModal();
      inputRef.current?.focus();
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const trimmed = query.trim();
  const groups = useMemo(() => groupResults(trimmed ? search(trimmed) : suggestions()), [trimmed]);
  const flat = useMemo(() => groups.flatMap((group) => group.items), [groups]);
  const active = flat[Math.min(activeIndex, flat.length - 1)];
  const optionId = (entry) => `${baseId}-${entry.id}`;

  // L'opció activa ha de ser sempre visible dins de la llista.
  useEffect(() => {
    if (!open || !active) return;
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [open, active]);

  function go(entry) {
    onClose();
    if (window.location.hash === entry.href) {
      // Ja som en aquesta adreça: el navegador no es mouria.
      if (entry.anchor) document.getElementById(entry.anchor)?.scrollIntoView();
      else window.scrollTo({ top: 0 });
      return;
    }
    window.location.hash = entry.href;
  }

  function onKeyDown(event) {
    if (flat.length === 0) return;
    const last = flat.length - 1;
    const current = Math.min(activeIndex, last);

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex(current === last ? 0 : current + 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex(current === 0 ? last : current - 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      setActiveIndex(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      setActiveIndex(last);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      go(flat[current]);
    }
  }

  let position = -1;

  return (
    <dialog
      ref={dialogRef}
      className="search-dialog"
      aria-label="Cerca al dossier"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
    >
      <div className="search-dialog__box">
        <div className="search-dialog__field">
          <Icon name="search" size={19} />
          <input
            ref={inputRef}
            type="text"
            className="search-dialog__input"
            role="combobox"
            aria-label="Cerca al dossier"
            aria-expanded={flat.length > 0}
            aria-controls={listId}
            aria-activedescendant={active ? optionId(active) : undefined}
            aria-autocomplete="list"
            placeholder="Cerca unitats, apartats, exemples, termes…"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={onKeyDown}
          />
          <button type="button" className="search-dialog__close" onClick={onClose}>
            <span className="sr-only">Tanca el cercador</span>
            <kbd aria-hidden="true">Esc</kbd>
          </button>
        </div>

        {flat.length > 0 ? (
          <div
            id={listId}
            ref={listRef}
            className="search-dialog__results"
            role="listbox"
            aria-label={trimmed ? 'Resultats de la cerca' : 'Accessos directes'}
          >
            {groups.map((group) => {
              const groupId = `${baseId}-grup-${group.kind}`;
              return (
                <div key={group.kind} className="search-dialog__group" role="group" aria-labelledby={groupId}>
                  <div id={groupId} className="search-dialog__group-title eyebrow" role="presentation">
                    {group.label}
                  </div>
                  {group.items.map((entry) => {
                    position += 1;
                    const index = position;
                    const isActive = entry === active;
                    return (
                      <div
                        key={entry.id}
                        id={optionId(entry)}
                        className={`search-option search-option--${entry.kind}`}
                        role="option"
                        aria-selected={isActive}
                        onClick={() => go(entry)}
                        onMouseMove={() => {
                          if (!isActive) setActiveIndex(index);
                        }}
                      >
                        <span className="search-option__icon">
                          <Icon name={KINDS[entry.kind].icon} size={16} />
                        </span>
                        <span className="search-option__text">
                          <span className="search-option__title">{entry.title}</span>
                          {entry.context ? <span className="search-option__context">{entry.context}</span> : null}
                        </span>
                        <Icon name="enter" size={16} className="search-option__enter" />
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="search-dialog__empty">
            Cap resultat per a «{trimmed}». Prova amb una altra paraula o amb menys lletres.
          </p>
        )}

        <p className="sr-only" role="status">
          {trimmed ? (flat.length === 1 ? '1 resultat' : `${flat.length} resultats`) : ''}
        </p>

        <p className="search-dialog__hints" aria-hidden="true">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> per moure't
          </span>
          <span>
            <kbd>↵</kbd> per obrir
          </span>
          <span>
            <kbd>Esc</kbd> per tancar
          </span>
        </p>
      </div>
    </dialog>
  );
}
