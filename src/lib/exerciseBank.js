import { courseOfUnit } from './courses.js';

// Secció d'exercicis: tots els exercicis d'un dossier, agrupats per temes.
// Cada tema és una unitat, i reuneix els exercicis que ja té la unitat amb
// els exercicis extra. Els temes els construeix lib/courses.js (course.topics).

export const LEVELS = [
  { id: 1, label: 'Bàsic', description: 'Per assegurar el concepte' },
  { id: 2, label: 'Mitjà', description: 'Combinen més d\'una idea' },
  { id: 3, label: 'Repte', description: 'Demanen pensar abans d\'escriure' },
];

export const levelLabel = (level) => LEVELS.find((item) => item.id === level)?.label ?? '';

/** Quants exercicis extra té una unitat (0 si no en té). */
export const extraCount = (unitId) => courseOfUnit(unitId)?.extraExercises[unitId]?.length ?? 0;

/** Quants exercicis d'un tema estan marcats com a fets. */
export const doneInTopic = (topic, exercisesDone) => topic.items.filter((item) => exercisesDone[item.key]).length;
