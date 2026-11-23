import { useEffect, useState } from 'react';

// Rutes basades en el hash (#/unitat/variables) perquè l'aplicació funcioni
// des de qualsevol carpeta i sense configurar cap servidor.

export function parseHash(hash) {
  const parts = hash
    .replace(/^#\/?/, '')
    .split('/')
    .filter(Boolean)
    .map((part) => {
      try {
        return decodeURIComponent(part);
      } catch {
        return part;
      }
    });

  if (parts.length === 0) return { page: 'home', unitId: null, anchor: null };
  if (parts[0] === 'unitat' && parts[1]) {
    return { page: 'unit', unitId: parts[1], anchor: parts[2] || null };
  }
  // #/exercicis és l'índex; #/exercicis/bucles, un tema; i amb un tercer
  // tros (#/exercicis/bucles/fizz-buzz) s'hi arriba directament a un exercici.
  if (parts[0] === 'exercicis') {
    return { page: 'exercises', unitId: parts[1] || null, anchor: parts[2] || null };
  }
  // #/glossari/array obre el glossari amb «array» ja cercat.
  if (parts[0] === 'glossari') return { page: 'glossary', unitId: null, anchor: parts[1] || null };
  return { page: 'notfound', unitId: null, anchor: null };
}

export function useHashRoute() {
  const [route, setRoute] = useState(() => parseHash(window.location.hash));

  useEffect(() => {
    const onHashChange = () => setRoute(parseHash(window.location.hash));
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return route;
}

export const homeHref = '#/';
export const glossaryHref = '#/glossari';
export const exercisesHref = (topicId, exerciseId) =>
  `#/exercicis${topicId ? `/${topicId}` : ''}${topicId && exerciseId ? `/${exerciseId}` : ''}`;
export const unitHref = (unitId, anchor) => `#/unitat/${unitId}${anchor ? `/${anchor}` : ''}`;
