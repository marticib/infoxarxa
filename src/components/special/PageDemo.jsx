import { useId, useState } from 'react';
import CodeRunner from '../code/CodeRunner.jsx';
import { PAGE_HEIGHT, PAGE_WIDTH, projectPages } from '../../content/ra1/projectCode.js';

const PAGES = [
  { id: 'home', label: 'Pàgina inicial', fileNames: { html: 'index.html', css: 'estils.css' } },
  { id: 'video', label: 'Pàgina del vídeo', fileNames: { html: 'video.html', css: 'estils.css' } },
];

// El projecte final del RA1, acabat: les dues pàgines de ClasseTube. Es tria
// quina es veu, i es pinten en una finestra d'escriptori simulada.
// `showCode`: mostra també l'editor amb els dos fitxers.
export default function PageDemo({ showCode = false, framed = true, boxes = false }) {
  const [page, setPage] = useState('home');
  const labelId = useId();
  const current = PAGES.find((item) => item.id === page);
  const source = projectPages[page];

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
        key={page}
        mode="page"
        html={source.html}
        css={source.css}
        fileNames={current.fileNames}
        frameTitle={`Projecte final: ${current.label.toLowerCase()}`}
        title={`ClasseTube · ${current.label}`}
        kicker="Projecte final"
        showEditor={showCode}
        boxes={boxes}
        viewport={PAGE_HEIGHT}
        pageWidth={PAGE_WIDTH}
      />
    </>
  );

  if (!framed) return <div className="project-demo">{content}</div>;

  return (
    <div className="special project-demo">
      <p className="special__title">El projecte, acabat</p>
      {content}
    </div>
  );
}
