import { useEffect, useRef } from 'react';
import Icon from '../ui/Icon.jsx';
import ProgressBar from './ProgressBar.jsx';
import { units } from '../../content/index.js';
import { exercisesHref, glossaryHref, homeHref, unitHref } from '../../lib/router.js';
import { STATUS_LABELS, unitStatus, useProgress } from '../../state/ProgressContext.jsx';

// Navegació principal. En escriptori és una columna fixa; en mòbil és un
// calaix que s'obre des del botó de menú de la capçalera.
//
// Les unitats es mostren com un recorregut: una línia les uneix i cada pas
// indica si està pendent, començat o completat.
export default function Sidebar({ id, open, onClose, route, onResetRequest }) {
  const { progress, completedCount, totalUnits } = useProgress();
  const panelRef = useRef(null);
  const closeRef = useRef(null);

  // Mentre el calaix és obert: Escape el tanca i el focus no en surt.
  useEffect(() => {
    if (!open) return undefined;
    closeRef.current?.focus();

    function onKeyDown(event) {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll('a[href], button:not([disabled])');
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  const isHome = route.page === 'home';
  const isGlossary = route.page === 'glossary';
  const isExercises = route.page === 'exercises';

  return (
    <>
      <div className={`backdrop${open ? ' backdrop--visible' : ''}`} onClick={onClose} aria-hidden="true" />

      <aside id={id} ref={panelRef} className={`sidebar${open ? ' sidebar--open' : ''}`} aria-label="Navegació del dossier">
        <div className="sidebar__top">
          <a className="brand" href={homeHref} onClick={onClose}>
            <span className="brand__logo" aria-hidden="true">
              JS
            </span>
            <span className="brand__text">
              <span className="brand__title">JavaScript des de zero</span>
              <span className="brand__subtitle">RA2 · Dossier interactiu</span>
            </span>
          </a>
          <button ref={closeRef} type="button" className="icon-btn sidebar__close" onClick={onClose}>
            <Icon name="close" />
            <span className="sr-only">Tanca el menú</span>
          </button>
        </div>

        <nav className="sidebar__nav" aria-label="Unitats">
          <ul className="nav-list">
            <li>
              <a
                className="nav-link nav-link--plain"
                href={homeHref}
                aria-current={isHome ? 'page' : undefined}
                onClick={onClose}
              >
                <span className="nav-link__icon">
                  <Icon name="home" size={17} />
                </span>
                <span className="nav-link__title">Inici</span>
              </a>
            </li>
          </ul>

          <p className="sidebar__heading" id={`${id}-unitats`}>
            Unitats
          </p>
          <ol className="nav-list nav-list--steps" aria-labelledby={`${id}-unitats`}>
            {units.map((unit) => {
              const status = unitStatus(progress, unit.id);
              const active = route.page === 'unit' && route.unitId === unit.id;
              return (
                <li key={unit.id} className={`nav-step nav-step--${status}`}>
                  <a
                    className={`nav-link nav-link--${status}`}
                    href={unitHref(unit.id)}
                    aria-current={active ? 'page' : undefined}
                    onClick={onClose}
                  >
                    <span className="nav-link__number" aria-hidden="true">
                      {unit.number}
                    </span>
                    <span className="nav-link__title">
                      <span className="sr-only">Unitat {unit.number}: </span>
                      {unit.shortTitle ?? unit.title}
                    </span>
                    <span className="nav-link__status" title={STATUS_LABELS[status]}>
                      {status === 'completed' ? <Icon name="check" size={15} /> : null}
                      <span className="sr-only">({STATUS_LABELS[status]})</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>

          <ul className="nav-list nav-list--extra">
            <li>
              <a
                className="nav-link nav-link--plain"
                href={exercisesHref()}
                aria-current={isExercises ? 'page' : undefined}
                onClick={onClose}
              >
                <span className="nav-link__icon">
                  <Icon name="pencil" size={17} />
                </span>
                <span className="nav-link__title">Exercicis</span>
              </a>
            </li>
            <li>
              <a
                className="nav-link nav-link--plain"
                href={glossaryHref}
                aria-current={isGlossary ? 'page' : undefined}
                onClick={onClose}
              >
                <span className="nav-link__icon">
                  <Icon name="list" size={17} />
                </span>
                <span className="nav-link__title">Glossari</span>
              </a>
            </li>
          </ul>
        </nav>

        <div className="sidebar__footer">
          <ProgressBar value={completedCount} max={totalUnits} />
          {progress.projectDone ? (
            <p className="sidebar__badge">
              <Icon name="trophy" size={16} />
              Projecte final completat
            </p>
          ) : null}
          <button type="button" className="sidebar__reset" onClick={onResetRequest}>
            <Icon name="reset" size={14} />
            Reinicia el progrés
          </button>
        </div>
      </aside>
    </>
  );
}
