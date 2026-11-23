import { useEffect, useId, useRef, useState } from 'react';
import CodeBlock from '../code/CodeBlock.jsx';
import Icon from '../ui/Icon.jsx';
import RichText from '../ui/RichText.jsx';
import { passMark, useProgress } from '../../state/ProgressContext.jsx';

// Qüestionari de resposta múltiple: una pregunta cada vegada, correcció
// immediata amb explicació i sense avançar automàticament.

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Barreja l'ordre de les opcions a cada intent, perquè no es memoritzi la posició.
const prepare = (questions) => questions.map((question) => ({ ...question, options: shuffle(question.options) }));

// Un segment per pregunta: encertada, fallada, actual o pendent. És un reforç
// visual; el text «Pregunta 2 de 4» ja diu el mateix.
function Steps({ total, index, results }) {
  return (
    <ol className="quiz__steps" aria-hidden="true">
      {Array.from({ length: total }, (_, position) => {
        let state = 'pending';
        if (position < results.length) state = results[position] ? 'correct' : 'wrong';
        else if (position === index) state = 'current';
        return <li key={position} className={`quiz__step quiz__step--${state}`} />;
      })}
    </ol>
  );
}

export default function QuizCard({ unitId, questions }) {
  const { progress, saveQuizResult } = useProgress();
  const [items, setItems] = useState(() => prepare(questions));
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);
  const [results, setResults] = useState([]); // true/false per cada pregunta corregida
  const [finished, setFinished] = useState(false);

  const groupName = useId();
  const feedbackRef = useRef(null);
  const questionRef = useRef(null);
  const summaryRef = useRef(null);
  const moveFocusTo = useRef(null);

  const total = items.length;
  const required = passMark(total);
  const saved = progress.quiz[unitId];
  const score = results.filter(Boolean).length;

  // Després de cada pas, portem el focus on hi ha la informació nova.
  useEffect(() => {
    const target = { feedback: feedbackRef, question: questionRef, summary: summaryRef }[moveFocusTo.current];
    moveFocusTo.current = null;
    target?.current?.focus();
  });

  function check() {
    if (selected === null) return;
    setResults((previous) => [...previous, Boolean(items[index].options[selected].correct)]);
    setChecked(true);
    moveFocusTo.current = 'feedback';
  }

  function next() {
    if (index + 1 < total) {
      setIndex(index + 1);
      setSelected(null);
      setChecked(false);
      moveFocusTo.current = 'question';
      return;
    }
    setFinished(true);
    saveQuizResult(unitId, score, total);
    moveFocusTo.current = 'summary';
  }

  function restart() {
    setItems(prepare(questions));
    setIndex(0);
    setSelected(null);
    setChecked(false);
    setResults([]);
    setFinished(false);
    moveFocusTo.current = 'question';
  }

  if (finished) {
    const passed = score >= required;
    const percent = total === 0 ? 0 : Math.round((score / total) * 100);
    return (
      <div className="quiz">
        <Steps total={total} index={total} results={results} />
        <div
          className={`quiz__summary ${passed ? 'quiz__summary--passed' : 'quiz__summary--failed'}`}
          ref={summaryRef}
          tabIndex={-1}
        >
          <div className="quiz__ring" aria-hidden="true">
            <svg viewBox="0 0 36 36" focusable="false">
              <circle className="quiz__ring-track" cx="18" cy="18" r="15.9155" />
              {percent > 0 ? (
                <circle className="quiz__ring-fill" cx="18" cy="18" r="15.9155" strokeDasharray={`${percent} 100`} />
              ) : null}
            </svg>
            <span className="quiz__ring-value">
              {score}/{total}
            </span>
          </div>
          <div className="quiz__summary-text">
            <p className="quiz__score">
              Has encertat <strong>{score}</strong> de <strong>{total}</strong> preguntes.
            </p>
            {passed ? (
              <p className="quiz__verdict">
                <Icon name="check" size={18} />
                Unitat completada. El teu progrés s'ha desat.
              </p>
            ) : (
              <p className="quiz__verdict">
                <Icon name="info" size={18} />
                Per completar la unitat calen {required} encerts. Repassa els apartats on has dubtat i torna-ho a
                provar.
              </p>
            )}
            <button type="button" className="btn btn--secondary" onClick={restart}>
              <Icon name="reset" size={16} />
              Repeteix el qüestionari
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = items[index];
  const chosen = selected !== null ? question.options[selected] : null;
  const correctOption = question.options.find((option) => option.correct);
  const isLast = index + 1 === total;

  return (
    <div className="quiz">
      <div className="quiz__top">
        <div className="quiz__meta">
          <p className="quiz__count">
            Pregunta {index + 1} de {total}
          </p>
          {saved ? (
            <p className="quiz__best">
              Millor resultat: {saved.best}/{saved.total}
            </p>
          ) : null}
        </div>
        <Steps total={total} index={index} results={results} />
      </div>

      <fieldset className="quiz__fieldset">
        <legend className="quiz__question" ref={questionRef} tabIndex={-1}>
          <RichText text={question.question} />
        </legend>

        {question.code ? <CodeBlock code={question.code} lang={question.lang ?? 'js'} /> : null}

        <div className="quiz__options">
          {question.options.map((option, optionIndex) => {
            const isSelected = selected === optionIndex;
            let state = '';
            if (checked && option.correct) state = 'quiz__option--correct';
            else if (checked && isSelected) state = 'quiz__option--wrong';
            else if (checked) state = 'quiz__option--dimmed';

            return (
              <label
                key={option.text}
                className={`quiz__option ${isSelected ? 'quiz__option--selected' : ''} ${state}`.trim()}
              >
                <input
                  type="radio"
                  className="quiz__input"
                  name={groupName}
                  checked={isSelected}
                  disabled={checked}
                  onChange={() => setSelected(optionIndex)}
                />
                <span className="quiz__letter" aria-hidden="true">
                  {LETTERS[optionIndex] ?? optionIndex + 1}
                </span>
                <span className="quiz__option-text">
                  <RichText text={option.text} />
                </span>
                {checked && option.correct ? (
                  <span className="quiz__mark">
                    <Icon name="check" size={16} />
                    Correcta
                  </span>
                ) : null}
                {checked && isSelected && !option.correct ? (
                  <span className="quiz__mark">
                    <Icon name="close" size={16} />
                    La teva resposta
                  </span>
                ) : null}
              </label>
            );
          })}
        </div>
      </fieldset>

      {checked ? (
        <div
          className={`quiz__feedback ${chosen.correct ? 'quiz__feedback--correct' : 'quiz__feedback--wrong'}`}
          ref={feedbackRef}
          tabIndex={-1}
          role="status"
        >
          <p className="quiz__feedback-title">
            <Icon name={chosen.correct ? 'check' : 'close'} size={18} />
            {chosen.correct ? 'Correcte!' : 'No és correcte.'}
          </p>
          {!chosen.correct && chosen.why ? (
            <p>
              <strong>On és l'error:</strong> <RichText text={chosen.why} />
            </p>
          ) : null}
          {!chosen.correct ? (
            <p>
              <strong>La resposta correcta:</strong> <RichText text={correctOption.text} />
            </p>
          ) : null}
          <p>
            <strong>Per què:</strong> <RichText text={question.explanation} />
          </p>
        </div>
      ) : null}

      <div className="quiz__actions">
        {checked ? (
          <button type="button" className="btn btn--primary" onClick={next}>
            {isLast ? 'Veure el resultat' : 'Següent pregunta'}
            <Icon name="arrowRight" size={17} />
          </button>
        ) : (
          <button type="button" className="btn btn--primary" onClick={check} disabled={selected === null}>
            Comprova la resposta
          </button>
        )}
      </div>
    </div>
  );
}
