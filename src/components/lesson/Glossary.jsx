import RichText from '../ui/RichText.jsx';
import { unitHref } from '../../lib/router.js';
import { units } from '../../content/index.js';

// Llista de definicions. Es fa servir al glossari general i al resum de cada unitat.
export default function Glossary({ terms, showUnit = false }) {
  if (terms.length === 0) return null;

  return (
    <dl className="glossary">
      {terms.map((item) => {
        const unit = showUnit ? units.find((candidate) => candidate.id === item.unit) : null;
        return (
          <div key={item.term} className="glossary__item">
            <dt className="glossary__term">{item.term}</dt>
            <dd className="glossary__definition">
              <RichText text={item.definition} />
              {unit ? (
                <a className="glossary__link" href={unitHref(unit.id)}>
                  Unitat {unit.number}: {unit.title}
                </a>
              ) : null}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
