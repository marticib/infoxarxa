import { forwardRef, useEffect, useRef } from 'react';
import Icon from '../ui/Icon.jsx';
import ProgressBar from './ProgressBar.jsx';
import { usePageFullscreen } from '../ui/PageFullscreenButton.jsx';
import { useCourse } from '../../state/CourseContext.jsx';
import { completedIn, useProgress } from '../../state/ProgressContext.jsx';
import { useTheme } from '../../state/ThemeContext.jsx';

const IS_APPLE = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform ?? '');

// Línia fina sota la capçalera que s'omple a mesura que es llegeix la unitat.
function ReadingProgress() {
  const fillRef = useRef(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      if (fillRef.current) fillRef.current.style.transform = `scaleX(${ratio})`;
    };
    const onScroll = () => {
      if (frame === 0) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="header__reading" aria-hidden="true">
      <span ref={fillRef} className="header__reading-fill" />
    </div>
  );
}

// Capçalera superior: botó del menú (mòbil), on som, cercador, progrés,
// pantalla completa i tema.
const Header = forwardRef(function Header(
  { title, eyebrow, menuOpen, menuId, onMenuToggle, onSearchOpen, showReading },
  menuButtonRef
) {
  const { progress } = useProgress();
  const course = useCourse();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const fullscreen = usePageFullscreen();

  return (
    <header className="header">
      <button
        ref={menuButtonRef}
        type="button"
        className="icon-btn header__menu"
        aria-expanded={menuOpen}
        aria-controls={menuId}
        onClick={onMenuToggle}
      >
        <Icon name="menu" />
        <span className="sr-only">Menú de navegació</span>
      </button>

      <div className="header__where">
        {eyebrow ? <span className="header__eyebrow">{eyebrow}</span> : null}
        <span className="header__title">{title}</span>
      </div>

      <div className="header__tools">
        <button
          type="button"
          className="search-trigger"
          aria-haspopup="dialog"
          aria-keyshortcuts={IS_APPLE ? 'Meta+K' : 'Control+K'}
          onClick={onSearchOpen}
        >
          <Icon name="search" size={17} />
          <span className="search-trigger__label">Cerca al dossier</span>
          <kbd className="search-trigger__kbd" aria-hidden="true">
            {IS_APPLE ? '⌘K' : 'Ctrl K'}
          </kbd>
        </button>

        {course ? <ProgressBar value={completedIn(course, progress)} max={course.units.length} compact /> : null}

        {fullscreen.available ? (
          <button
            type="button"
            className="icon-btn header__fullscreen"
            aria-pressed={fullscreen.active}
            title={fullscreen.active ? 'Surt de la pantalla completa' : 'Pantalla completa'}
            onClick={fullscreen.toggle}
          >
            <Icon name={fullscreen.active ? 'compress' : 'expand'} size={19} />
            <span className="sr-only">Pantalla completa</span>
          </button>
        ) : null}

        <button type="button" className="icon-btn theme-toggle" onClick={toggleTheme} aria-pressed={isDark}>
          <Icon name={isDark ? 'sun' : 'moon'} size={19} />
          <span className="sr-only">Mode fosc</span>
        </button>
      </div>

      {showReading ? <ReadingProgress /> : null}
    </header>
  );
});

export default Header;
