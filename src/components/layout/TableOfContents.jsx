import { useEffect, useId, useRef, useState } from 'react';
import Icon from '../ui/Icon.jsx';
import { unitHref } from '../../lib/router.js';

// Retorna l'id de l'apartat que s'està llegint, segons la posició de l'scroll.
export function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(ids[0]);
  const signature = ids.join('|');

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      let current = ids[0];
      for (const id of ids) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= 160) current = id;
      }
      setActiveId(current);
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
    // `signature` resumeix el contingut de `ids`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature]);

  return activeId;
}

function TocList({ unitId, items, activeId, onNavigate }) {
  return (
    <ol className="toc__list">
      {items.map((item) => (
        <li key={item.id}>
          <a
            className="toc__link"
            href={unitHref(unitId, item.id)}
            aria-current={item.id === activeId ? 'location' : undefined}
            onClick={() => {
              // Si el hash ja és aquest, el navegador no es mouria.
              document.getElementById(item.id)?.scrollIntoView();
              onNavigate?.();
            }}
          >
            {item.title}
          </a>
        </li>
      ))}
    </ol>
  );
}

// Índex de continguts de la unitat.
//  - variant="aside": columna fixa a la dreta (pantalles amples)
//  - variant="inline": barra flotant que acompanya la lectura i diu a quin
//    apartat som; en prémer-la es desplega l'índex (pantalles estretes)
export default function TableOfContents({ unitId, items, activeId, variant = 'aside' }) {
  const [open, setOpen] = useState(false);
  const listId = useId();
  const navRef = useRef(null);
  const toggleRef = useRef(null);

  // Desplegat: Escape o un clic a fora el tanquen.
  useEffect(() => {
    if (!open) return undefined;

    function onKeyDown(event) {
      if (event.key !== 'Escape') return;
      setOpen(false);
      toggleRef.current?.focus();
    }
    function onPointerDown(event) {
      if (!navRef.current?.contains(event.target)) setOpen(false);
    }

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  if (variant === 'inline') {
    const position = Math.max(0, items.findIndex((item) => item.id === activeId));
    const current = items[position];

    return (
      <nav ref={navRef} className={`toc toc--inline${open ? ' toc--open' : ''}`} aria-label="Índex de la unitat">
        <button
          ref={toggleRef}
          type="button"
          className="toc__toggle"
          aria-expanded={open}
          aria-controls={listId}
          onClick={() => setOpen((value) => !value)}
        >
          <Icon name="list" size={17} />
          <span className="sr-only">Índex de la unitat. Apartat actual: </span>
          <span className="toc__current">{current?.title}</span>
          <span className="toc__count" aria-hidden="true">
            {position + 1}/{items.length}
          </span>
          <Icon name="chevronDown" size={17} className={`toc__chevron${open ? ' toc__chevron--open' : ''}`} />
        </button>
        <div id={listId} className="toc__panel" hidden={!open}>
          <TocList unitId={unitId} items={items} activeId={activeId} onNavigate={() => setOpen(false)} />
        </div>
      </nav>
    );
  }

  return (
    <nav className="toc toc--aside" aria-label="Índex de la unitat">
      <p className="toc__title eyebrow">En aquesta unitat</p>
      <TocList unitId={unitId} items={items} activeId={activeId} />
      <button type="button" className="toc__top" onClick={() => window.scrollTo({ top: 0 })}>
        <Icon name="arrowUp" size={15} />
        Torna a dalt
      </button>
    </nav>
  );
}
