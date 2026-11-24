import Icon from '../components/ui/Icon.jsx';
import PageFullscreenButton from '../components/ui/PageFullscreenButton.jsx';
import { deNumber } from '../lib/catalan.js';
import { doneInTopic, LEVELS } from '../lib/exerciseBank.js';
import { topicHref, unitHref } from '../lib/router.js';
import { plural } from '../lib/unitStats.js';
import { useCourse } from '../state/CourseContext.jsx';
import { useProgress } from '../state/ProgressContext.jsx';

const statusOf = (done, total) => (done === 0 ? 'pending' : done === total ? 'completed' : 'visited');
const STATUS_ICONS = { completed: 'check', visited: 'half', pending: 'circle' };

// Índex de la secció d'exercicis: un tema per unitat.
export default function ExercisesPage() {
  const { progress } = useProgress();
  const course = useCourse();
  const { topics, bankTotal, projectUnit } = course;
  const doneTotal = topics.reduce((sum, topic) => sum + doneInTopic(topic, progress.exercises), 0);
  const extraTotal = topics.reduce((sum, topic) => sum + topic.extraCount, 0);

  return (
    <article className="page page--wide">
      <header className="lesson__header">
        <p className="lesson__eyebrow eyebrow">{course.code} · Pràctica</p>
        <h1 className="lesson__title" tabIndex={-1} data-page-title>
          Exercicis
        </h1>
        <p className="lesson__lead">
          Només exercicis, sense teoria, agrupats per temes. N'hi ha {bankTotal}: els que ja tens al final de cada
          unitat i {extraTotal} de nous. Tots porten editor, pista i solució.
        </p>
        <div className="lesson__meta">
          <p className={`chip chip--${statusOf(doneTotal, bankTotal)}`}>
            <Icon name={STATUS_ICONS[statusOf(doneTotal, bankTotal)]} size={15} />
            {doneTotal} {deNumber(bankTotal)} exercicis fets
          </p>
          <PageFullscreenButton />
        </div>
      </header>

      <ul className="levels" aria-label="Nivells de dificultat">
        {LEVELS.map((level) => (
          <li key={level.id} className="levels__item">
            <span className={`card__level card__level--${level.id}`}>{level.label}</span>
            <span>{level.description}</span>
          </li>
        ))}
      </ul>

      <ol className="route topics">
        {topics.map((topic) => {
          const total = topic.items.length;
          const done = doneInTopic(topic, progress.exercises);
          const status = statusOf(done, total);
          return (
            <li key={topic.id}>
              <a className={`route__card route__card--${status}`} href={topicHref(topic.id)}>
                <span className="route__number" aria-hidden="true">
                  {String(topic.number).padStart(2, '0')}
                </span>
                <span className="route__body">
                  <span className="route__title">
                    <span className="sr-only">Tema {topic.number}: </span>
                    {topic.title}
                  </span>
                  <span className="route__meta">
                    <span>{plural(total, 'exercici', 'exercicis')}</span>
                    <span>{plural(topic.extraCount, 'de nou', 'de nous')}</span>
                    <span className={`route__status route__status--${status}`}>
                      <Icon name={STATUS_ICONS[status]} size={14} />
                      {done} {deNumber(total)} fets
                    </span>
                  </span>
                  <span className="topics__bar" aria-hidden="true">
                    <span className="topics__fill" style={{ width: `${Math.round((done / total) * 100)}%` }} />
                  </span>
                </span>
                <Icon name="arrowRight" size={18} className="route__arrow" />
              </a>
            </li>
          );
        })}
      </ol>

      <p className="home__tip">
        <span className="home__tip-icon" aria-hidden="true">
          <Icon name="bulb" size={18} />
        </span>
        <span>
          {course.runner === 'page'
            ? 'Un exercici queda marcat com a fet quan el teu resultat supera totes les comprovacions, o quan el marques tu.'
            : 'Un exercici queda marcat com a fet quan la sortida coincideix amb la que es demana, o quan el marques tu.'}{' '}
          {projectUnit ? (
            <>
              Les ampliacions del projecte final no són aquí: les trobaràs a la{' '}
              <a href={unitHref(projectUnit.id, 'exercicis')}>unitat {projectUnit.number}</a>.
            </>
          ) : null}
        </span>
      </p>
    </article>
  );
}
