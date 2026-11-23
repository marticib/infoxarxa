import { useId, useState } from 'react';
import CodeRunner from '../code/CodeRunner.jsx';
import { projectDemo } from '../../content/projectCode.js';

const PAGES = [
  { id: 'home', label: 'Pàgina inicial', fileNames: { js: 'inici.js', html: 'index.html', css: 'estils.css' } },
  { id: 'video', label: 'Pàgina del vídeo', fileNames: { js: 'video.js', html: 'video.html', css: 'estils.css' } },
];

// El projecte final en funcionament. Són dues pàgines: es tria quina es veu.
// `version`: 'base' (funcionalitats mínimes) o 'full' (amb les ampliacions).
// `showCode`: mostra també l'editor amb tots els fitxers.
export default function ProjectDemo({ version = 'base', showCode = false, framed = true }) {
  const [page, setPage] = useState('home');
  const labelId = useId();
  const current = PAGES.find((item) => item.id === page);
  const source = projectDemo[version][page];

  const content = (
    <>
      <span id={labelId} className="sr-only">
        Quina pàgina del projecte vols veure
      </span>
      <div className="special__toggle" role="group" aria-labelledby={labelId}>
        {PAGES.map((item) => (
          <button
            key={item.id}
            type="button"
            className="special__toggle-btn"
            aria-pressed={item.id === page}
            onClick={() => setPage(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <CodeRunner
        key={`${version}-${page}`}
        js={source.js}
        html={source.html}
        css={source.css}
        data={source.data}
        fileNames={current.fileNames}
        frameTitle={`Projecte final: ${current.label.toLowerCase()}`}
        title={`ClasseTube · ${current.label}`}
        kicker="Projecte final"
        showEditor={showCode}
        autoRun
      />
    </>
  );

  if (!framed) return <div className="project-demo">{content}</div>;

  return (
    <div className="special project-demo">
      <p className="special__title">El projecte, en funcionament</p>
      {content}
    </div>
  );
}
