import Blocks from './Blocks.jsx';
import Icon from '../ui/Icon.jsx';
import { Paragraphs } from '../ui/RichText.jsx';
import { unitHref } from '../../lib/router.js';

// Apartat d'una unitat. `id` és l'àncora que fa servir l'índex de continguts;
// amb `unitId` s'hi afegeix un enllaç directe que es pot copiar i compartir.
export default function Section({ id, unitId, title, label, intro, blocks, children }) {
  const titleId = `${id}-titol`;

  return (
    <section id={id} className="section" aria-labelledby={titleId}>
      {label ? <p className="section__label eyebrow">{label}</p> : null}
      <div className="section__head">
        <h2 id={titleId} className="section__title">
          {title}
        </h2>
        {unitId ? (
          <a className="section__anchor" href={unitHref(unitId, id)} title="Enllaç directe a aquest apartat">
            <Icon name="hash" size={17} />
            <span className="sr-only">Enllaç directe a l'apartat «{title}»</span>
          </a>
        ) : null}
      </div>
      <Paragraphs text={intro} />
      {blocks ? <Blocks blocks={blocks} /> : null}
      {children}
    </section>
  );
}
