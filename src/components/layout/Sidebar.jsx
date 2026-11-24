import { useEffect, useRef } from 'react';
import Icon from '../ui/Icon.jsx';
import ProgressBar from './ProgressBar.jsx';
import { courses } from '../../lib/courses.js';
import { courseHref, exercisesHref, glossaryHref, portalHref, unitHref } from '../../lib/router.js';
import { useCourse } from '../../state/CourseContext.jsx';
import { completedIn, isProjectDone, STATUS_LABELS, unitStatus, useProgress } from '../../state/ProgressContext.jsx';

// Navegació principal. En escriptori és una columna fixa; en mòbil és un
// calaix que s'obre des del botó de menú de la capçalera.
//
// Les unitats es mostren com un recorregut: una línia les uneix i cada pas
// indica si està pendent, començat o completat. A dalt de tot es tria el
// dossier; a la portada general, on encara no n'hi ha cap, només es veu això.
export default function Sidebar({ id, open, onClose, route, onResetRequest }) {
  const { progress } = useProgress();
  const course = useCourse();
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
  const units = course ? course.units : [];

  return (
    <>
      <div className={`backdrop${open ? ' backdrop--visible' : ''}`} onClick={onClose} aria-hidden="true" />

      <aside id={id} ref={panelRef} className={`sidebar${open ? ' sidebar--open' : ''}`} aria-label="Navegació del dossier">
        <div className="sidebar__top">
          <a className="brand" href={course ? courseHref(course.id) : portalHref} onClick={onClose}>
            <span className={`brand__logo${course ? ` brand__logo--${course.id}` : ''}`} aria-hidden="true">
              {course ? course.logo : 'WEB'}
            </span>
            <span className="brand__text">
              <span className="brand__title">{course ? course.title : 'Dossiers interactius'}</span>
              <span className="brand__subtitle">
                {course ? `${course.code} · Dossier interactiu` : 'HTML, CSS i JavaScript'}
              </span>
            </span>
          </a>
          <button ref={closeRef} type="button" className="icon-btn sidebar__close" onClick={onClose}>
            <Icon name="close" />
            <span className="sr-only">Tanca el menú</span>
          </button>
        </div>

        <nav className="sidebar__nav" aria-label={course ? 'Unitats' : 'Dossiers'}>
          <p className="sidebar__heading" id={`${id}-dossiers`}>
            Dossiers
          </p>
          <ul className="course-switch" aria-labelledby={`${id}-dossiers`}>
            {courses.map((item) => (
              <li key={item.id}>
                <a
                  className="course-switch__link"
                  href={courseHref(item.id)}
                  aria-current={course?.id === item.id ? 'true' : undefined}
                  onClick={onClose}
                >
                  <span className="course-switch__code">{item.code}</span>
                  <span className="course-switch__name">{item.shortTitle}</span>
                </a>
              </li>
            ))}
          </ul>

          {course ? (
            <>
              <ul className="nav-list">
                <li>
                  <a
                    className="nav-link nav-link--plain"
                    href={courseHref(course.id)}
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
                href={exercisesHref(course.id)}
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
                href={glossaryHref(course.id)}
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
            </>
          ) : (
            <ul className="nav-list">
              <li>
                <a className="nav-link nav-link--plain" href={portalHref} aria-current="page" onClick={onClose}>
                  <span className="nav-link__icon">
                    <Icon name="home" size={17} />
                  </span>
                  <span className="nav-link__title">Tots els dossiers</span>
                </a>
              </li>
            </ul>
          )}
        </nav>

        <div className="sidebar__footer">
          {course ? <ProgressBar value={completedIn(course, progress)} max={course.units.length} /> : null}
          {course && isProjectDone(course, progress) ? (
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
