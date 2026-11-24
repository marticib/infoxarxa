import { useEffect, useMemo, useRef } from 'react';
import Section from './Section.jsx';
import ExerciseCard from './ExerciseCard.jsx';
import QuizCard from './QuizCard.jsx';
import Glossary from './Glossary.jsx';
import { CommonError, ProjectStep } from './Callouts.jsx';
import TableOfContents, { useActiveSection } from '../layout/TableOfContents.jsx';
import PreviousNextNavigation from '../layout/PreviousNextNavigation.jsx';
import Icon from '../ui/Icon.jsx';
import PageFullscreenButton from '../ui/PageFullscreenButton.jsx';
import RichText, { Paragraphs } from '../ui/RichText.jsx';
import { deNumber } from '../../lib/catalan.js';
import { extraCount } from '../../lib/exerciseBank.js';
import { topicHref, unitHref } from '../../lib/router.js';
import { plural, unitStats } from '../../lib/unitStats.js';
import { useCourse } from '../../state/CourseContext.jsx';
import { passMark, STATUS_LABELS, unitStatus, useProgress } from '../../state/ProgressContext.jsx';

// Apartats fixos que tenen totes les unitats, a més dels propis.
const FIXED_BEFORE = [{ id: 'punt-de-partida', title: 'El punt de partida' }];
const FIXED_AFTER = [
  { id: 'errors-habituals', title: 'Errors habituals' },
  { id: 'exercicis', title: 'Exercicis' },
  { id: 'resum', title: 'Resum' },
  { id: 'questionari', title: 'Qüestionari' },
];

// Pàgina d'una unitat: la mateixa estructura per a totes, a partir de les dades.
export default function LessonPage({ unit, anchor }) {
  const { progress, markVisited } = useProgress();
  const course = useCourse();
  const units = course.units;
  const glossary = course.glossary;

  const tocItems = useMemo(
    () => [...FIXED_BEFORE, ...unit.sections.map((section) => ({ id: section.id, title: section.title })), ...FIXED_AFTER],
    [unit]
  );
  const tocIds = useMemo(() => tocItems.map((item) => item.id), [tocItems]);
  const activeId = useActiveSection(tocIds);

  useEffect(() => {
    markVisited(unit.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit.id]);

  // Enllaços directes a un apartat: #/unitat/variables/const-i-let
  // En arribar a la unitat saltem a l'apartat de cop; dins de la mateixa
  // unitat (clics a l'índex) es respecta el desplaçament suau del CSS.
  const arriving = useRef(true);
  useEffect(() => {
    if (anchor) {
      document.getElementById(anchor)?.scrollIntoView({ behavior: arriving.current ? 'instant' : 'auto' });
    }
    arriving.current = false;
  }, [unit.id, anchor]);

  const status = unitStatus(progress, unit.id);
  const quizResult = progress.quiz[unit.id];
  const unitTerms = glossary.filter((item) => item.unit === unit.id);
  const stats = useMemo(() => unitStats(unit), [unit]);
  const moreExercises = extraCount(unit.id);

  return (
    <div className="lesson-layout">
      <article className="lesson">
        <header className="lesson__header">
          <p className="lesson__eyebrow eyebrow">
            Unitat {unit.number} {deNumber(units.length)}
          </p>
          <h1 className="lesson__title" tabIndex={-1} data-page-title>
            {unit.title}
          </h1>
          <p className="lesson__lead">
            <RichText text={unit.description} />
          </p>
          <div className="lesson__meta">
            <p className={`chip chip--${status}`}>
              <Icon name={status === 'completed' ? 'check' : status === 'visited' ? 'half' : 'circle'} size={15} />
              {STATUS_LABELS[status]}
              {quizResult ? ` · Qüestionari: ${quizResult.best}/${quizResult.total}` : ''}
            </p>
            <ul className="lesson__stats">
              <li>
                <Icon name="play" size={14} />
                {plural(stats.examples, 'exemple', 'exemples')}
              </li>
              <li>
                <Icon name="pencil" size={14} />
                {plural(stats.exercises, 'exercici', 'exercicis')}
              </li>
              <li>
                <Icon name="quiz" size={14} />
                {plural(stats.questions, 'pregunta', 'preguntes')}
              </li>
            </ul>
            <PageFullscreenButton />
          </div>
        </header>

        <TableOfContents unitId={unit.id} items={tocItems} activeId={activeId} variant="inline" />

        <section id="punt-de-partida" className="section starting-point" aria-labelledby="punt-de-partida-titol">
          <p className="section__label eyebrow">El punt de partida</p>
          <h2 id="punt-de-partida-titol" className="starting-point__title">
            «<RichText text={unit.problem.title} />»
          </h2>
          <Paragraphs text={unit.problem.text} />

          <div className="goals">
            <p className="goals__title">En acabar aquesta unitat sabràs…</p>
            <ul className="goals__list">
              {unit.goals.map((goal, index) => (
                <li key={index}>
                  <span className="goals__check" aria-hidden="true">
                    <Icon name="check" size={13} />
                  </span>
                  <span>
                    <RichText text={goal} />
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {unit.projectPiece ? <ProjectStep title={course.guide.pieceTitle} text={unit.projectPiece} /> : null}

          {unit.finalProject ? (
            <p className="project-link">
              <span className="project-link__icon" aria-hidden="true">
                <Icon name="play" size={13} />
              </span>
              <span>
                <strong>Per al projecte final:</strong> <RichText text={unit.finalProject} />{' '}
                <a href={unitHref(course.projectUnitId)}>Veure el projecte</a>
              </span>
            </p>
          ) : null}
        </section>

        {unit.sections.map((section) => (
          <Section
            key={section.id}
            id={section.id}
            unitId={unit.id}
            title={section.title}
            label={section.label}
            blocks={section.blocks}
          />
        ))}

        <Section
          id="errors-habituals"
          unitId={unit.id}
          title="Errors habituals"
          intro="Aquests són els errors que es repeteixen més en aquest tema. Reconèixer-los et farà guanyar molt de temps quan et passin a tu."
        >
          {unit.commonErrors.map((error, index) => (
            <CommonError key={index} {...error} />
          ))}
        </Section>

        <Section
          id="exercicis"
          unitId={unit.id}
          title="Exercicis"
          intro="Intenta resoldre'ls sense mirar la solució. Si t'encalles, obre primer la pista. La solució hi és per comparar-la amb la teva, no per copiar-la."
        >
          {unit.exercises.map((exercise, index) => (
            <ExerciseCard key={exercise.id} exercise={exercise} number={index + 1} unitId={unit.id} />
          ))}
          <ExerciseCard exercise={unit.finalExercise} variant="final" unitId={unit.id} />

          {moreExercises > 0 ? (
            <a className="more-exercises" href={topicHref(unit.id)}>
              <span className="more-exercises__icon" aria-hidden="true">
                <Icon name="pencil" size={17} />
              </span>
              <span className="more-exercises__text">
                <strong>Vols practicar més?</strong>
                <span>
                  A la secció d'exercicis hi ha {plural(moreExercises, 'exercici més', 'exercicis més')} d'aquest tema,
                  ordenats per dificultat.
                </span>
              </span>
              <Icon name="arrowRight" size={18} />
            </a>
          ) : null}
        </Section>

        <Section id="resum" unitId={unit.id} title="Resum">
          <ul className="summary">
            {unit.summary.map((item, index) => (
              <li key={index}>
                <RichText text={item} />
              </li>
            ))}
          </ul>
          {unitTerms.length > 0 ? (
            <>
              <h3 className="lesson-subtitle">Vocabulari de la unitat</h3>
              <Glossary terms={unitTerms} />
            </>
          ) : null}
        </Section>

        <Section
          id="questionari"
          unitId={unit.id}
          title="Qüestionari"
          intro={`Comprova què has entès. Amb ${passMark(unit.quiz.length)} encerts de ${unit.quiz.length} la unitat queda marcada com a completada. El pots repetir tantes vegades com vulguis.`}
        >
          <QuizCard key={unit.id} unitId={unit.id} questions={unit.quiz} />
        </Section>

        <PreviousNextNavigation unitId={unit.id} />
      </article>

      <aside className="lesson-layout__aside">
        <TableOfContents unitId={unit.id} items={tocItems} activeId={activeId} />
      </aside>
    </div>
  );
}
