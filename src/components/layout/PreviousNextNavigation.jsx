import Icon from '../ui/Icon.jsx';
import { units } from '../../content/index.js';
import { glossaryHref, homeHref, unitHref } from '../../lib/router.js';

// Enllaços a la unitat anterior i a la següent.
export default function PreviousNextNavigation({ unitId }) {
  const index = units.findIndex((unit) => unit.id === unitId);
  const previous = units[index - 1];
  const next = units[index + 1];

  const previousLink = previous
    ? { href: unitHref(previous.id), label: `Unitat ${previous.number}`, title: previous.title }
    : { href: homeHref, label: 'Portada', title: 'Inici del dossier' };

  const nextLink = next
    ? { href: unitHref(next.id), label: `Unitat ${next.number}`, title: next.title }
    : { href: glossaryHref, label: 'Consulta', title: 'Glossari' };

  return (
    <nav className="prevnext" aria-label="Unitat anterior i següent">
      <a className="prevnext__link prevnext__link--previous" href={previousLink.href}>
        <span className="prevnext__arrow">
          <Icon name="chevronLeft" size={18} />
        </span>
        <span className="prevnext__text">
          <span className="prevnext__label">Anterior · {previousLink.label}</span>
          <span className="prevnext__title">{previousLink.title}</span>
        </span>
      </a>
      <a className="prevnext__link prevnext__link--next" href={nextLink.href}>
        <span className="prevnext__text">
          <span className="prevnext__label">Següent · {nextLink.label}</span>
          <span className="prevnext__title">{nextLink.title}</span>
        </span>
        <span className="prevnext__arrow">
          <Icon name="chevronRight" size={18} />
        </span>
      </a>
    </nav>
  );
}
