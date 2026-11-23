import { useId } from 'react';
import CodeRunner from './CodeRunner.jsx';
import Icon from '../ui/Icon.jsx';
import RichText, { Paragraphs } from '../ui/RichText.jsx';

// Exemple que l'alumne pot executar i modificar.
export default function RunnableExample({ title, intro, expected, why, js, html, css, dataJs, fileNames, runAt }) {
  const titleId = useId();

  // Les notes de sota de l'exemple, que també es veuen amb l'editor ampliat.
  const notes =
    expected || why ? (
      <>
        {expected ? (
          <div className="card__note">
            <p className="card__note-title">Resultat esperat</p>
            <Paragraphs text={expected} />
          </div>
        ) : null}

        {why ? (
          <div className="card__note">
            <p className="card__note-title">Per què funciona</p>
            <Paragraphs text={why} />
          </div>
        ) : null}
      </>
    ) : null;

  return (
    <article className="card card--example" aria-labelledby={titleId}>
      <header className="card__header">
        <span className="card__icon" aria-hidden="true">
          <Icon name="play" size={15} />
        </span>
        <div className="card__heading">
          <span className="card__tag">Exemple executable</span>
          <h3 id={titleId} className="card__title">
            <RichText text={title} />
          </h3>
        </div>
      </header>

      <Paragraphs text={intro} />

      <CodeRunner
        js={js}
        html={html}
        css={css}
        data={dataJs}
        fileNames={fileNames}
        runAt={runAt}
        frameTitle={`Resultat de l'exemple: ${title}`}
        title={<RichText text={title} />}
        kicker="Exemple executable"
        brief={intro ? <Paragraphs text={intro} /> : null}
        after={notes}
      />

      {notes}
    </article>
  );
}
