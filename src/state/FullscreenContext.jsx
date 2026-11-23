import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

// Pantalla completa. N'hi ha de dos tipus, i poden estar actius alhora:
//
//  - de la pàgina (`page`): s'amaga la barra lateral i el contingut ocupa
//    tota la finestra. Serveix per als apunts i per a les pàgines d'exercicis.
//  - d'un editor (`panel`): un exemple o un exercici s'amplia fins a omplir
//    la finestra, amb el codi i el resultat de costat.
//
// La maquetació la fa sempre el CSS, de manera que funciona a tot arreu. Quan
// el navegador ho permet, a més es demana la pantalla completa de veritat
// (sense pestanyes ni barres del navegador); si no ho permet, com a l'iPhone,
// es queda en «finestra completa».

const FullscreenContext = createContext(null);

const nativeElement = () => document.fullscreenElement ?? document.webkitFullscreenElement ?? null;

const canRequestNative = () => {
  if (typeof document === 'undefined') return false;
  const root = document.documentElement;
  return Boolean(root.requestFullscreen ?? root.webkitRequestFullscreen);
};

// S'ha de cridar directament des del clic: els navegadors només accepten la
// petició si ve d'un gest de la persona.
function requestNative() {
  const root = document.documentElement;
  const request = root.requestFullscreen ?? root.webkitRequestFullscreen;
  if (!request || nativeElement()) return;
  try {
    const result = request.call(root);
    if (result && typeof result.catch === 'function') result.catch(() => {});
  } catch {
    /* el navegador no ho permet: ens quedem amb la finestra completa */
  }
}

function exitNative() {
  if (!nativeElement()) return;
  const exit = document.exitFullscreen ?? document.webkitExitFullscreen;
  try {
    const result = exit.call(document);
    if (result && typeof result.catch === 'function') result.catch(() => {});
  } catch {
    /* ja n'havíem sortit */
  }
}

export function FullscreenProvider({ children }) {
  const [page, setPage] = useState(false);
  const [panel, setPanel] = useState(null); // id de l'editor ampliat, o null
  const stateRef = useRef({ page, panel });
  stateRef.current = { page, panel };

  // Mentre un editor està ampliat surt del flux de la pàgina, que queda més
  // curta i pot perdre la posició. La desem en ampliar i la tornem en tancar.
  const savedScroll = useRef(null);
  const restoreScroll = useRef(true);

  const enterPage = useCallback(() => {
    requestNative();
    setPage(true);
  }, []);

  const exitPage = useCallback(() => {
    setPage(false);
    if (stateRef.current.panel === null) exitNative();
  }, []);

  const openPanel = useCallback((id) => {
    if (stateRef.current.panel === null) savedScroll.current = window.scrollY;
    requestNative();
    setPanel(id);
  }, []);

  // Amb `id`, només tanca si aquell editor és el que està ampliat.
  // `keepPosition: false` és per quan es tanca perquè es canvia de pàgina.
  const closePanel = useCallback((id, { keepPosition = true } = {}) => {
    if (stateRef.current.panel === null) return;
    if (id !== undefined && stateRef.current.panel !== id) return;
    restoreScroll.current = keepPosition;
    setPanel(null);
    if (!stateRef.current.page) exitNative();
  }, []);

  // Si es surt de la pantalla completa del navegador (amb Escape, per
  // exemple), es desfà tot: no ens assabentem de la tecla, només del resultat.
  useEffect(() => {
    const onChange = () => {
      if (nativeElement()) return;
      restoreScroll.current = true;
      setPage(false);
      setPanel(null);
    };
    document.addEventListener('fullscreenchange', onChange);
    document.addEventListener('webkitfullscreenchange', onChange);
    return () => {
      document.removeEventListener('fullscreenchange', onChange);
      document.removeEventListener('webkitfullscreenchange', onChange);
    };
  }, []);

  // Sense pantalla completa del navegador, Escape la tanquem nosaltres:
  // primer l'editor ampliat i, si no n'hi ha cap, la de la pàgina.
  useEffect(() => {
    function onKeyDown(event) {
      if (event.key !== 'Escape' || event.defaultPrevented) return;
      const current = stateRef.current;
      if (!current.page && current.panel === null) return;
      if (nativeElement()) return;
      // Altres coses que també es tanquen amb Escape tenen prioritat.
      if (document.querySelector('dialog[open], .sidebar--open, .toc__toggle[aria-expanded="true"]')) return;
      // Dins de l'editor de codi, Escape serveix per sortir-ne amb el teclat.
      if (event.target instanceof HTMLTextAreaElement) return;

      if (current.panel !== null) closePanel();
      else exitPage();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [closePanel, exitPage]);

  // Mentre hi ha un editor ampliat, la pàgina de sota no s'ha de moure.
  useEffect(() => {
    document.documentElement.classList.toggle('fs-panel', panel !== null);

    // L'editor ja torna a ser al seu lloc: recuperem la posició d'abans.
    if (panel === null && savedScroll.current !== null) {
      if (restoreScroll.current) window.scrollTo({ top: savedScroll.current, left: 0, behavior: 'instant' });
      savedScroll.current = null;
    }

    return () => document.documentElement.classList.remove('fs-panel');
  }, [panel]);

  const value = useMemo(
    () => ({ page, panel, enterPage, exitPage, openPanel, closePanel, canNative: canRequestNative() }),
    [page, panel, enterPage, exitPage, openPanel, closePanel]
  );

  return <FullscreenContext.Provider value={value}>{children}</FullscreenContext.Provider>;
}

export function useFullscreen() {
  const context = useContext(FullscreenContext);
  if (!context) throw new Error('useFullscreen s\'ha de fer servir dins de FullscreenProvider');
  return context;
}
