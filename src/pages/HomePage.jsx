import { useMemo } from 'react';
import Icon from '../components/ui/Icon.jsx';
import RichText from '../components/ui/RichText.jsx';
import { deNumber } from '../lib/catalan.js';
import { doneInTopic } from '../lib/exerciseBank.js';
import { exercisesHref, topicHref, unitHref } from '../lib/router.js';
import { dossierStats, plural, unitStats } from '../lib/unitStats.js';
import { useCourse } from '../state/CourseContext.jsx';
import { completedIn, isProjectDone, STATUS_LABELS, unitStatus, useProgress } from '../state/ProgressContext.jsx';
import { HOME_PARTS } from './homeParts.jsx';

const STATUS_ICONS = { completed: 'check', visited: 'half', pending: 'circle' };

// Portada d'un dossier: què és, què es construeix i per on continuar.
// Els textos són a `course.home`; la il·lustració i la demostració, a homeParts.
export default function HomePage() {
  const { progress } = useProgress();
  const course = useCourse();
  const { units, topics, bankTotal, home } = course;
  const { Figure, Demo } = HOME_PARTS[course.id];

  const completedCount = completedIn(course, progress);
  const totalUnits = units.length;
  const lastUnit = units.find((unit) => unit.id === progress.lastUnits[course.id]);
  const nextPending = units.find((unit) => !progress.completed[unit.id]);
  const resumeUnit = lastUnit ?? units[0];
  const hasStarted = Boolean(lastUnit);
  const totals = useMemo(() => dossierStats(course), [course]);

  const stats = [
    { value: totals.units, label: 'unitats, de zero al projecte' },
    { value: totals.examples, label: course.runner === 'page' ? 'exemples que pots modificar' : 'exemples que pots executar' },
    { value: totals.exercises, label: 'exercicis amb pista i solució' },
    { value: totals.questions, label: 'preguntes per comprovar-te' },
  ];

  return (
    <div className="home">
      <header className="hero">
        <div className="hero__text">
          <p className="hero__eyebrow eyebrow">{home.eyebrow}</p>
          <h1 className="hero__title" tabIndex={-1} data-page-title>
            {course.titleParts[0]} <span className="hero__mark">{course.titleParts[1]}</span>
          </h1>
          {home.lead.map((text, index) => (
            <p key={index} className="hero__lead">
              <RichText text={text} />
            </p>
          ))}
          <div className="hero__actions">
            <a className="btn btn--primary btn--large" href={unitHref(resumeUnit.id)}>
              {hasStarted ? `Continua: unitat ${resumeUnit.number}` : 'Comença per la unitat 1'}
              <Icon name="arrowRight" size={18} />
            </a>
            {hasStarted && nextPending && nextPending.id !== resumeUnit.id ? (
              <a className="btn btn--secondary btn--large" href={unitHref(nextPending.id)}>
                Primera unitat pendent: {nextPending.number}
              </a>
            ) : null}
          </div>
          <p className="hero__progress">
            {completedCount === 0
              ? `${totalUnits} unitats, ${home.tagline}.`
              : `Has completat ${completedCount} ${deNumber(totalUnits)} unitats.`}
            {isProjectDone(course, progress) ? ` ${home.projectDone}` : ''}
          </p>
        </div>

        <Figure />
      </header>

      <ul className="stats" aria-label="El dossier en xifres">
        {stats.map((item) => (
          <li key={item.label} className="stats__item">
            <span className="stats__value">{item.value}</span>
            <span className="stats__label">{item.label}</span>
          </li>
        ))}
      </ul>

      <section className="home__section home__project" aria-labelledby="home-projecte">
        <div className="home__project-text">
          <p className="home__kicker eyebrow">El projecte final</p>
          <h2 id="home-projecte">El que construiràs</h2>
          <p>
            <RichText text={home.project.text} />
          </p>
          <ul className="home__features">
            {home.project.features.map((feature) => (
              <li key={feature}>
                <span className="goals__check" aria-hidden="true">
                  <Icon name="check" size={13} />
                </span>
                <span>
                  <RichText text={feature} />
                </span>
              </li>
            ))}
          </ul>
          <p className="home__note">
            <RichText text={home.project.note} />
          </p>
          <p>
            <a className="btn btn--secondary" href={unitHref(course.projectUnitId)}>
              Veure el projecte final
              <Icon name="arrowRight" size={17} />
            </a>
          </p>
        </div>
        <div className="home__project-demo">
          <Demo />
        </div>
      </section>

      <section className="home__section" aria-labelledby="home-recorregut">
        <div className="home__intro">
          <p className="home__kicker eyebrow">Pas a pas</p>
          <h2 id="home-recorregut">El recorregut</h2>
          <p>
            <RichText text={home.route} />
          </p>
        </div>
        <ol className="route">
          {units.map((unit) => {
            const status = unitStatus(progress, unit.id);
            const numbers = unitStats(unit);
            return (
              <li key={unit.id}>
                <a className={`route__card route__card--${status}`} href={unitHref(unit.id)}>
                  <span className="route__number" aria-hidden="true">
                    {String(unit.number).padStart(2, '0')}
                  </span>
                  <span className="route__body">
                    <span className="route__title">
                      <span className="sr-only">Unitat {unit.number}: </span>
                      {unit.title}
                    </span>
                    <span className="route__problem">
                      «<RichText text={unit.problem.title} />»
                    </span>
                    <span className="route__meta">
                      <span>{plural(numbers.examples, 'exemple', 'exemples')}</span>
                      <span>{plural(numbers.exercises, 'exercici', 'exercicis')}</span>
                      <span className={`route__status route__status--${status}`}>
                        <Icon name={STATUS_ICONS[status]} size={14} />
                        {STATUS_LABELS[status]}
                      </span>
                    </span>
                  </span>
                  <Icon name="arrowRight" size={18} className="route__arrow" />
                </a>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="home__section" aria-labelledby="home-exercicis">
        <div className="home__intro">
          <p className="home__kicker eyebrow">Només pràctica</p>
          <h2 id="home-exercicis">Exercicis per temes</h2>
          <p>
            Si el que vols és practicar, a la secció d'exercicis hi ha {bankTotal} exercicis sense teoria, agrupats en{' '}
            {topics.length} temes i ordenats de menys a més dificultat. Hi són els de cada unitat i molts de nous.
          </p>
        </div>
        <ul className="practice">
          {topics.map((topic) => {
            const done = doneInTopic(topic, progress.exercises);
            return (
              <li key={topic.id}>
                <a className="practice__link" href={topicHref(topic.id)}>
                  <span className="practice__number" aria-hidden="true">
                    {String(topic.number).padStart(2, '0')}
                  </span>
                  <span className="practice__title">{topic.title}</span>
                  <span className="practice__count">
                    {done}/{topic.items.length}
                    <span className="sr-only"> exercicis fets</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
        <p>
          <a className="btn btn--primary" href={exercisesHref(course.id)}>
            Ves als exercicis
            <Icon name="arrowRight" size={17} />
          </a>
        </p>
      </section>

      <section className="home__section" aria-labelledby="home-funcionament">
        <div className="home__intro">
          <p className="home__kicker eyebrow">Abans de començar</p>
          <h2 id="home-funcionament">Com llegir aquest dossier</h2>
          <p>
            Cada tipus de caixa té un color, una icona i una etiqueta. Quan n'hagis vist un parell ja les reconeixeràs
            d'un cop d'ull:
          </p>
        </div>
        <ul className="legend">
          {home.legend.map((item) => (
            <li key={item.name} className={`legend__item legend__item--${item.tone}`}>
              <span className="legend__icon">
                <Icon name={item.icon} size={17} />
              </span>
              <span className="legend__text">
                <strong>{item.name}.</strong> {item.text}
              </span>
            </li>
          ))}
        </ul>
        <p className="home__tip">
          <span className="home__tip-icon" aria-hidden="true">
            <Icon name="bulb" size={18} />
          </span>
          <span>
            <RichText text={home.tip} />
          </span>
        </p>
      </section>
    </div>
  );
}
