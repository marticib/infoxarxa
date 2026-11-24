import { useEffect, useState } from 'react';
import { courseById, courseOfUnit, DEFAULT_COURSE_ID } from './courses.js';

// Rutes basades en el hash (#/ra2/unitat/variables) perquè l'aplicació
// funcioni des de qualsevol carpeta i sense configurar cap servidor.
//
//   #/                              portada: tots els dossiers
//   #/ra1                           portada d'un dossier
//   #/ra1/unitat/flexbox            una unitat
//   #/ra1/unitat/flexbox/gap        un apartat d'una unitat
//   #/ra1/exercicis                 índex dels exercicis
//   #/ra1/exercicis/flexbox         un tema
//   #/ra1/exercicis/flexbox/menu    un exercici d'un tema
//   #/ra1/glossari/flex             el glossari, amb «flex» ja cercat
//
// El prefix del dossier es pot ometre: #/unitat/flexbox es troba pel nom de
// la unitat, i #/exercicis o #/glossari porten al dossier de JavaScript, que
// és on portaven abans que n'hi hagués dos.

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

  if (parts.length === 0) return { page: 'portal', courseId: null, unitId: null, anchor: null };

  let courseId = null;
  if (courseById(parts[0])) courseId = parts.shift();
  if (parts.length === 0) return { page: 'home', courseId, unitId: null, anchor: null };

  const [section, id, anchor] = parts;
  const owner = id ? courseOfUnit(id) : null;
  // Una unitat d'un altre dossier (#/ra1/unitat/variables) no existeix aquí.
  const mismatch = Boolean(owner && courseId && owner.id !== courseId);

  if (section === 'unitat' && id) {
    return {
      page: 'unit',
      courseId: courseId ?? owner?.id ?? null,
      unitId: mismatch ? null : id,
      anchor: anchor || null,
    };
  }
  if (section === 'exercicis') {
    return {
      page: mismatch ? 'notfound' : 'exercises',
      courseId: courseId ?? owner?.id ?? DEFAULT_COURSE_ID,
      unitId: id || null,
      anchor: anchor || null,
    };
  }
  if (section === 'glossari') {
    return { page: 'glossary', courseId: courseId ?? DEFAULT_COURSE_ID, unitId: null, anchor: id || null };
  }
  return { page: 'notfound', courseId, unitId: null, anchor: null };
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

/** La portada amb tots els dossiers. */
export const portalHref = '#/';

/** La portada d'un dossier. */
export const courseHref = (courseId) => `#/${courseId}`;

/** Una unitat (i, si es vol, un dels seus apartats). El dossier es dedueix de la unitat. */
export const unitHref = (unitId, anchor) =>
  `#/${courseOfUnit(unitId)?.id ?? DEFAULT_COURSE_ID}/unitat/${unitId}${anchor ? `/${anchor}` : ''}`;

/** L'índex dels exercicis d'un dossier. */
export const exercisesHref = (courseId) => `#/${courseId}/exercicis`;

/** Un tema d'exercicis (i, si es vol, un exercici concret). */
export const topicHref = (topicId, exerciseId) =>
  `#/${courseOfUnit(topicId)?.id ?? DEFAULT_COURSE_ID}/exercicis/${topicId}${exerciseId ? `/${exerciseId}` : ''}`;

/** El glossari d'un dossier (i, si es vol, amb un terme ja cercat). */
export const glossaryHref = (courseId, term) =>
  `#/${courseId}/glossari${term ? `/${encodeURIComponent(term)}` : ''}`;
