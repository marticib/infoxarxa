import Icon from '../components/ui/Icon.jsx';
import { deNumber } from '../lib/catalan.js';
import { courses } from '../lib/courses.js';
import { courseHref, unitHref } from '../lib/router.js';
import { dossierStats, plural } from '../lib/unitStats.js';
import { completedIn, exercisesDoneIn, isProjectDone, useProgress } from '../state/ProgressContext.jsx';

// Portada general: els dossiers del curs i com s'enllacen entre ells.
export default function PortalPage() {
  const { progress } = useProgress();

  return (
    <div className="home portal">
      <header className="portal__header">
        <p className="hero__eyebrow eyebrow">Dossiers interactius</p>
        <h1 className="hero__title" tabIndex={-1} data-page-title>
          Aprèn a fer webs <span className="hero__mark">fent-ne una</span>
        </h1>
        <p className="hero__lead">
          Dos dossiers, un sol projecte. Al primer construeixes una pàgina tipus YouTube amb HTML i CSS; al segon li
          afegeixes JavaScript perquè faci coses. Tot el codi es pot provar aquí mateix.
        </p>
      </header>

      <ol className="portal__list">
        {courses.map((course, index) => {
          const totals = dossierStats(course);
          const completed = completedIn(course, progress);
          const lastUnit = course.units.find((unit) => unit.id === progress.lastUnits[course.id]);
          const exercisesDone = exercisesDoneIn(course, progress);
          const started = Boolean(lastUnit) || completed > 0 || exercisesDone > 0;
          const projectDone = isProjectDone(course, progress);
          const titleId = `portal-${course.id}`;

          return (
            <li key={course.id} className="portal__item">
              <article className="portal-card" aria-labelledby={titleId}>
                <div className="portal-card__top">
                  <span className={`brand__logo brand__logo--${course.id} portal-card__logo`} aria-hidden="true">
                    {course.logo}
                  </span>
                  <div>
                    <p className="portal-card__code eyebrow">
                      {course.code} · {course.subject}
                    </p>
                    <h2 id={titleId} className="portal-card__title">
                      {course.title}
                    </h2>
                  </div>
                </div>

                <p className="portal-card__summary">{course.summary}</p>

                <ul className="portal-card__stats">
                  <li>{plural(totals.units, 'unitat', 'unitats')}</li>
                  <li>{plural(totals.examples, 'exemple', 'exemples')}</li>
                  <li>{plural(totals.exercises, 'exercici', 'exercicis')}</li>
                </ul>

                <p className="portal-card__project">
                  <span className="goals__check" aria-hidden="true">
                    <Icon name={projectDone ? 'check' : 'star'} size={13} />
                  </span>
                  <span>
                    <strong>Projecte final:</strong> {course.projectSummary}
                  </span>
                </p>

                <div className="portal-card__bar" aria-hidden="true">
                  <span style={{ width: `${Math.round((completed / course.units.length) * 100)}%` }} />
                </div>
                <p className="portal-card__progress">
                  {completed} {deNumber(course.units.length)} unitats completades
                  {exercisesDone > 0 ? ` · ${plural(exercisesDone, 'exercici fet', 'exercicis fets')}` : ''}
                </p>

                <div className="portal-card__actions">
                  <a className="btn btn--primary" href={courseHref(course.id)}>
                    {started ? 'Entra al dossier' : 'Comença el dossier'}
                    <Icon name="arrowRight" size={17} />
                  </a>
                  {lastUnit ? (
                    <a className="btn btn--secondary" href={unitHref(lastUnit.id)}>
                      Continua: unitat {lastUnit.number}
                    </a>
                  ) : null}
                </div>
              </article>
              {index < courses.length - 1 ? (
                <p className="portal__link" aria-hidden="true">
                  <Icon name="arrowRight" size={18} />
                </p>
              ) : null}
            </li>
          );
        })}
      </ol>

      <p className="home__tip">
        <span className="home__tip-icon" aria-hidden="true">
          <Icon name="bulb" size={18} />
        </span>
        <span>
          Convé fer-los en ordre: el dossier de JavaScript dona per fet que saps HTML i CSS, i el seu projecte final
          parteix de la pàgina que hauràs maquetat al primer.
        </span>
      </p>
    </div>
  );
}
