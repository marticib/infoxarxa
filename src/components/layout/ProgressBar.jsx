import { deNumber } from '../../lib/catalan.js';

// Indicador de progrés: unitats completades sobre el total.
//  - per defecte: barra amb el text a sota (barra lateral)
//  - compact: anell petit amb «3/11» (capçalera)
export default function ProgressBar({ value, max, label = 'Progrés del dossier', compact = false }) {
  const percent = max === 0 ? 0 : Math.round((value / max) * 100);
  const aria = {
    role: 'progressbar',
    'aria-label': label,
    'aria-valuemin': 0,
    'aria-valuemax': max,
    'aria-valuenow': value,
    'aria-valuetext': `${value} ${deNumber(max)} unitats completades`,
  };

  if (compact) {
    return (
      <div className="progress progress--compact">
        <div className="progress__ring" {...aria}>
          <svg viewBox="0 0 36 36" aria-hidden="true" focusable="false">
            <circle className="progress__ring-track" cx="18" cy="18" r="15.9155" />
            {percent > 0 ? (
              <circle
                className="progress__ring-fill"
                cx="18"
                cy="18"
                r="15.9155"
                strokeDasharray={`${percent} 100`}
              />
            ) : null}
          </svg>
        </div>
        <p className="progress__text">
          <strong>
            {value}/{max}
          </strong>
        </p>
      </div>
    );
  }

  return (
    <div className="progress">
      <p className="progress__text">
        <strong>
          {value}/{max}
        </strong>{' '}
        <span className="progress__unit">unitats completades</span>
      </p>
      <div className="progress__track" {...aria}>
        <div className="progress__fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
