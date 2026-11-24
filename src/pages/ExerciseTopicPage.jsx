import { useEffect, useRef, useState } from 'react';
import ExerciseCard from '../components/lesson/ExerciseCard.jsx';
import Icon from '../components/ui/Icon.jsx';
import PageFullscreenButton from '../components/ui/PageFullscreenButton.jsx';
import { deNumber } from '../lib/catalan.js';
import { doneInTopic, LEVELS } from '../lib/exerciseBank.js';
import { exercisesHref, topicHref, unitHref } from '../lib/router.js';
import { plural } from '../lib/unitStats.js';
import { useCourse } from '../state/CourseContext.jsx';
import { useProgress } from '../state/ProgressContext.jsx';

const ALL = 0;

// Id de l'element d'un exercici, per poder-hi enllaçar directament.
export const exerciseAnchor = (exerciseId) => `exercici-${exerciseId}`;

// Tots els exercicis d'un tema, de menys a més dificultat.
export default function ExerciseTopicPage({ topic, anchor }) {
  const { progress } = useProgress();
  const course = useCourse();
  const topics = course.topics;
  const [level, setLevel] = useState(ALL);

  const total = topic.items.length;
  const done = doneInTopic(topic, progress.exercises);
  const status = done === 0 ? 'pending' : done === total ? 'completed' : 'visited';
  const visible = topic.items.filter((item) => level === ALL || item.level === level);

  // Enllaç directe a un exercici: #/ra2/exercicis/bucles/fizz-buzz
  // Si hi ha un filtre posat, l'exercici pot no ser a la llista: primer es
  // treu el filtre i, quan l'exercici ja s'ha pintat, la pàgina s'hi desplaça.
  const pendingScroll = useRef(null);
  useEffect(() => {
    if (!anchor) return;
    pendingScroll.current = topic.items.some((item) => item.exercise.id === anchor) ? anchor : null;
    setLevel(ALL);
  }, [topic, anchor]);

  // Després de cada pintada, mentre el desplaçament estigui pendent.
  useEffect(() => {
    if (!pendingScroll.current) return undefined;
    const frame = requestAnimationFrame(() => {
      const element = document.getElementById(exerciseAnchor(pendingScroll.current));
      if (!element) return;
      pendingScroll.current = null;
      element.scrollIntoView({ behavior: 'instant' });
    });
    return () => cancelAnimationFrame(frame);
  });

  const index = topics.indexOf(topic);
  const previous = topics[index - 1];
  const next = topics[index + 1];

  const filters = [
    { id: ALL, label: 'Tots', count: total },
    ...LEVELS.map((item) => ({
      id: item.id,
      label: item.label,
      count: topic.items.filter((entry) => entry.level === item.id).length,
    })),
  ];

  return (
    <article className="page">
      <header className="lesson__header">
        <p className="lesson__eyebrow eyebrow">
          {course.code} · Exercicis · Tema {topic.number} {deNumber(topics.length)}
        </p>
        <h1 className="lesson__title" tabIndex={-1} data-page-title>
          {topic.title}
        </h1>
        <p className="lesson__lead">
          {plural(total, 'exercici', 'exercicis')} per practicar aquest tema, de menys a més dificultat. Els que porten
          l'etiqueta «De la unitat» són els mateixos que hi ha al final de la unitat {topic.number}.
        </p>
        <div className="lesson__meta">
          <p className={`chip chip--${status}`}>
            <Icon name={status === 'completed' ? 'check' : status === 'visited' ? 'half' : 'circle'} size={15} />
            {done} {deNumber(total)} fets
          </p>
          <ul className="lesson__stats">
            <li>
              <a href={unitHref(topic.id)}>
                <Icon name="book" size={14} /> Repassa la teoria
              </a>
            </li>
            <li>
              <a href={exercisesHref(course.id)}>
                <Icon name="list" size={14} /> Tots els temes
              </a>
            </li>
          </ul>
          <PageFullscreenButton />
        </div>
      </header>

      <div className="filters" role="group" aria-label="Filtra els exercicis per nivell">
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            className="filters__btn"
            aria-pressed={level === item.id}
            onClick={() => setLevel(item.id)}
          >
            {item.label}
            <span className="filters__count">{item.count}</span>
          </button>
        ))}
      </div>

      <div className="exercise-list">
        {visible.map((item) => (
          <ExerciseCard
            key={item.exercise.id}
            exercise={item.exercise}
            number={item.number}
            unitId={topic.id}
            level={item.level}
            fromUnit={item.source === 'unit'}
            anchorId={exerciseAnchor(item.exercise.id)}
            headingLevel={2}
          />
        ))}
      </div>

      <nav className="prevnext" aria-label="Tema anterior i següent">
        <a
          className="prevnext__link prevnext__link--previous"
          href={previous ? topicHref(previous.id) : exercisesHref(course.id)}
        >
          <span className="prevnext__arrow">
            <Icon name="chevronLeft" size={18} />
          </span>
          <span className="prevnext__text">
            <span className="prevnext__label">{previous ? `Anterior · Tema ${previous.number}` : 'Índex'}</span>
            <span className="prevnext__title">{previous ? previous.title : 'Tots els temes'}</span>
          </span>
        </a>
        <a
          className="prevnext__link prevnext__link--next"
          href={next ? topicHref(next.id) : unitHref(course.projectUnitId)}
        >
          <span className="prevnext__text">
            <span className="prevnext__label">{next ? `Següent · Tema ${next.number}` : 'Per acabar'}</span>
            <span className="prevnext__title">{next ? next.title : 'El projecte final'}</span>
          </span>
          <span className="prevnext__arrow">
            <Icon name="chevronRight" size={18} />
          </span>
        </a>
      </nav>
    </article>
  );
}
