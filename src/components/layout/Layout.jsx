import { useCallback, useEffect, useRef, useState } from 'react';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import SearchDialog from './SearchDialog.jsx';
import ConfirmDialog from '../ui/ConfirmDialog.jsx';
import { exercisesHref, glossaryHref, homeHref } from '../../lib/router.js';
import { SEARCH_EVENT } from '../../lib/searchIndex.js';
import { DESKTOP_QUERY } from '../ui/PageFullscreenButton.jsx';
import { useFullscreen } from '../../state/FullscreenContext.jsx';
import { useProgress } from '../../state/ProgressContext.jsx';

const MENU_ID = 'menu-principal';

const isTypingTarget = (element) =>
  element instanceof HTMLElement &&
  (element.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(element.tagName));

// Estructura general: barra lateral + capçalera + zona de contingut.
export default function Layout({ route, title, eyebrow, children }) {
  const { resetProgress } = useProgress();
  const { page: pageFullscreen } = useFullscreen();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const menuButtonRef = useRef(null);
  const mainRef = useRef(null);
  const wasOpen = useRef(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  // En tancar el calaix, el focus torna al botó que l'ha obert.
  useEffect(() => {
    if (wasOpen.current && !menuOpen) menuButtonRef.current?.focus();
    wasOpen.current = menuOpen;
    document.body.classList.toggle('no-scroll', menuOpen);
    return () => document.body.classList.remove('no-scroll');
  }, [menuOpen]);

  // Si la finestra passa a mida d'escriptori, el calaix deixa de tenir sentit.
  useEffect(() => {
    const media = window.matchMedia(DESKTOP_QUERY);
    const onChange = (event) => {
      if (event.matches) setMenuOpen(false);
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  // En sortir de la pantalla completa, la barra lateral torna a ser una
  // columna fixa: si s'havia obert com a calaix, es tanca.
  useEffect(() => {
    if (!pageFullscreen) setMenuOpen(false);
  }, [pageFullscreen]);

  // Dreceres del cercador: Ctrl/⌘ + K des de qualsevol lloc, i «/» quan no
  // s'està escrivint en cap camp.
  useEffect(() => {
    function onKeyDown(event) {
      const isShortcut = (event.ctrlKey || event.metaKey) && !event.altKey && event.key.toLowerCase() === 'k';
      const isSlash = event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey;
      if (!isShortcut && !(isSlash && !isTypingTarget(event.target))) return;
      if (document.querySelector('dialog[open]')) {
        // Ja hi ha un diàleg obert: només evitem que Ctrl+K obri la cerca del navegador.
        if (isShortcut) event.preventDefault();
        return;
      }
      event.preventDefault();
      setMenuOpen(false);
      setSearchOpen(true);
    }

    const onRequest = () => setSearchOpen(true);

    document.addEventListener('keydown', onKeyDown);
    window.addEventListener(SEARCH_EVENT, onRequest);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener(SEARCH_EVENT, onRequest);
    };
  }, []);

  return (
    <div className={`app${pageFullscreen ? ' app--focus' : ''}`}>
      <a
        className="skip-link"
        href="#contingut"
        onClick={(event) => {
          // El hash es fa servir per a les rutes: movem el focus a mà.
          event.preventDefault();
          mainRef.current?.focus();
        }}
      >
        Salta al contingut
      </a>

      <Sidebar
        id={MENU_ID}
        open={menuOpen}
        onClose={closeMenu}
        route={route}
        onResetRequest={() => {
          setMenuOpen(false);
          setConfirmReset(true);
        }}
      />

      <div className="app__column">
        <Header
          ref={menuButtonRef}
          title={title}
          eyebrow={eyebrow}
          menuOpen={menuOpen}
          menuId={MENU_ID}
          onMenuToggle={() => setMenuOpen((open) => !open)}
          onSearchOpen={() => setSearchOpen(true)}
          showReading={route.page === 'unit'}
        />

        <main id="contingut" ref={mainRef} className="main" tabIndex={-1}>
          {children}
        </main>

        <footer className="footer">
          <div className="footer__inner">
            <p>
              Dossier interactiu del RA2 · Introducció a JavaScript. Tot funciona al teu navegador: el progrés es desa
              només en aquest dispositiu.
            </p>
            <nav className="footer__links" aria-label="Peu de pàgina">
              <a href={homeHref}>Inici</a>
              <a href={exercisesHref()}>Exercicis</a>
              <a href={glossaryHref}>Glossari</a>
            </nav>
          </div>
        </footer>
      </div>

      <SearchDialog open={searchOpen} onClose={closeSearch} />

      <ConfirmDialog
        open={confirmReset}
        title="Vols reiniciar tot el progrés?"
        confirmLabel="Sí, reinicia-ho tot"
        onCancel={() => setConfirmReset(false)}
        onConfirm={() => {
          resetProgress();
          setConfirmReset(false);
        }}
      >
        <p>
          S'esborraran les unitats visitades i completades, els resultats dels qüestionaris, els exercicis marcats
          com a fets i la llista de comprovació del projecte final. Aquesta acció no es pot desfer.
        </p>
        <p>La preferència de mode clar o fosc es conserva.</p>
      </ConfirmDialog>
    </div>
  );
}
