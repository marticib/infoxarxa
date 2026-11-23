import Icon from './Icon.jsx';
import { useMediaQuery } from '../../lib/useMediaQuery.js';
import { useFullscreen } from '../../state/FullscreenContext.jsx';

// Mida a partir de la qual la barra lateral és una columna fixa (vegeu layout.css).
export const DESKTOP_QUERY = '(min-width: 64rem)';

// La pantalla completa de la pàgina fa dues coses: demana la del navegador i
// amaga la barra lateral. Si no pot fer ni l'una ni l'altra (un iPhone: no hi
// ha pantalla completa i la barra lateral ja és un calaix), no s'ofereix.
export function usePageFullscreen() {
  const { page, enterPage, exitPage, canNative } = useFullscreen();
  const wide = useMediaQuery(DESKTOP_QUERY);
  return {
    active: page,
    available: canNative || wide || page,
    toggle: () => (page ? exitPage() : enterPage()),
  };
}

// Botó amb text, per a la capçalera de les unitats i dels temes d'exercicis.
export default function PageFullscreenButton() {
  const { active, available, toggle } = usePageFullscreen();
  if (!available) return null;

  return (
    <button type="button" className="btn btn--secondary btn--small page-fs" aria-pressed={active} onClick={toggle}>
      <Icon name={active ? 'compress' : 'expand'} size={15} />
      Pantalla completa
    </button>
  );
}
