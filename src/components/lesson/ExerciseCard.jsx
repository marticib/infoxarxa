import { useId } from 'react';
import CodeRunner from '../code/CodeRunner.jsx';
import Icon from '../ui/Icon.jsx';
import RichText, { Paragraphs } from '../ui/RichText.jsx';
import { levelLabel } from '../../lib/exerciseBank.js';
import { useRunnerMode } from '../../state/CourseContext.jsx';
import { exerciseKey, useProgress } from '../../state/ProgressContext.jsx';

const DEFAULT_STARTER = '// Escriu el teu codi aquí\n';

// Exercici amb editor, pista desplegable i solució amagada.
// `variant`: 'exercise' (numerat), 'final' (exercici final) o 'challenge' (petit repte dins la teoria).
//
// Amb `unitId`, l'exercici es pot marcar com a fet. La marca es desa amb el
// progrés i és la mateixa a la unitat i a la secció d'exercicis. `level` i
// `fromUnit` només es fan servir a la secció d'exercicis.
//
// Al dossier d'HTML i CSS (mode 'page') l'exercici no té `starter`: parteix
// dels fitxers `html` i `css`, la solució és { html, css } amb els fitxers que
// canvien, i es dona per fet quan passen les comprovacions (`checks`).
// Quan la solució només ensenya un tros (`partialSolution`), `full` porta els
// fitxers sencers per poder pintar l'objectiu.
//
// `headingLevel`: dins d'una unitat el títol és un h3 (penja de l'h2 de
// l'apartat); a la secció d'exercicis penja directament de l'h1 i és un h2.
export default function ExerciseCard({
  exercise,
  number,
  variant = 'exercise',
  unitId,
  level,
  fromUnit = false,
  anchorId,
  headingLevel = 3,
}) {
  const { progress, setExerciseDone } = useProgress();
  const mode = useRunnerMode();
  const isPage = mode === 'page';
  const labels = {
    exercise: `Exercici ${number}`,
    final: 'Exercici final',
    challenge: 'Petit repte',
  };
  const label = labels[variant];
  const title = exercise.title ?? label;
  const headingId = useId();
  const Title = `h${headingLevel}`;

  const trackable = Boolean(unitId) && variant !== 'challenge';
  const key = trackable ? exerciseKey(unitId, exercise.id) : null;
  const done = trackable && Boolean(progress.exercises[key]);

  // L'enunciat i el resultat esperat. Es mostren a la targeta i, quan
  // l'editor s'amplia a pantalla completa, també dins del panell ampliat.
  const brief = (
    <>
      <Paragraphs text={exercise.statement} />

      {exercise.data ? (
        <div className="exercise__block">
          <p className="exercise__label">Dades de prova</p>
          <ul className="exercise__data">
            {exercise.data.map((item, index) => (
              <li key={index}>
                <code>{item}</code>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {exercise.expectedOutput || exercise.expected ? (
        <div className="exercise__block">
          <p className="exercise__label">Resultat esperat</p>
          {exercise.expectedOutput ? (
            <pre className="exercise__expected" tabIndex={0} aria-label="Sortida esperada a la consola">
              {exercise.expectedOutput.join('\n')}
            </pre>
          ) : null}
          <Paragraphs text={exercise.expected} />
        </div>
      ) : null}
    </>
  );

  return (
    <article
      id={anchorId}
      className={`card card--${variant === 'challenge' ? 'challenge' : 'exercise'}${variant === 'final' ? ' card--final' : ''}${done ? ' card--done' : ''}`}
      aria-labelledby={headingId}
    >
      <header className="card__header">
        <span className="card__icon" aria-hidden="true">
          <Icon name={variant === 'challenge' ? 'flag' : variant === 'final' ? 'star' : 'pencil'} size={16} />
        </span>
        <div className="card__heading" id={headingId}>
          <span className="card__tag">
            {label}
            {level ? <span className={`card__level card__level--${level}`}>{levelLabel(level)}</span> : null}
            {fromUnit ? <span className="card__origin">De la unitat</span> : null}
          </span>
          {exercise.title ? (
            <Title className="card__title">
              <RichText text={exercise.title} />
            </Title>
          ) : null}
        </div>
        {trackable ? (
          <button
            type="button"
            className="card__done"
            aria-pressed={done}
            onClick={() => setExerciseDone(key, !done)}
          >
            <Icon name={done ? 'check' : 'circle'} size={15} />
            {done ? 'Fet' : 'Marca com a fet'}
          </button>
        ) : null}
      </header>

      {brief}

      <CodeRunner
        mode={mode}
        js={isPage ? '' : (exercise.starter ?? DEFAULT_STARTER)}
        html={exercise.html}
        css={exercise.css}
        focus={exercise.focus}
        checks={exercise.checks}
        target={isPage && exercise.solution && exercise.target !== false ? (exercise.full ?? exercise.solution) : undefined}
        boxes={exercise.boxes}
        viewport={exercise.viewport}
        pageWidth={exercise.width}
        data={exercise.dataJs}
        fileNames={exercise.fileNames}
        hint={exercise.hint}
        solution={exercise.solution}
        explanation={exercise.explanation}
        partialSolution={exercise.partialSolution}
        expectedOutput={exercise.expectedOutput}
        frameTitle={`Resultat de: ${title}`}
        title={<RichText text={title} />}
        kicker={label}
        brief={brief}
        onSolved={trackable ? () => setExerciseDone(key, true) : undefined}
      />
    </article>
  );
}
