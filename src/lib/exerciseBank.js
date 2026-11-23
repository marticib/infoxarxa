import { units } from '../content/index.js';
import { extraExercises } from '../content/exercises/index.js';
import { exerciseKey } from '../state/ProgressContext.jsx';

// Secció d'exercicis: tots els exercicis del dossier, agrupats per temes.
// Cada tema és una unitat, i reuneix els exercicis que ja té la unitat amb
// els exercicis extra de content/exercises.

export const LEVELS = [
  { id: 1, label: 'Bàsic', description: 'Per assegurar el concepte' },
  { id: 2, label: 'Mitjà', description: 'Combinen més d\'una idea' },
  { id: 3, label: 'Repte', description: 'Demanen pensar abans d\'escriure' },
];

export const levelLabel = (level) => LEVELS.find((item) => item.id === level)?.label ?? '';

// Els exercicis de les unitats no porten nivell. Estan ordenats de menys a
// més dificultat: els dos primers són bàsics, els dos següents mitjans i
// l'exercici final és un repte. Un exercici pot dir el seu amb `level`.
const levelInUnit = (index) => (index < 2 ? 1 : 2);

function buildTopic(unit) {
  const fromUnit = [
    ...unit.exercises.map((exercise, index) => ({
      exercise,
      level: exercise.level ?? levelInUnit(index),
      source: 'unit',
    })),
    { exercise: unit.finalExercise, level: unit.finalExercise.level ?? 3, source: 'unit' },
  ];
  const extra = extraExercises[unit.id].map((exercise) => ({ exercise, level: exercise.level, source: 'extra' }));

  // Ordenats per nivell; dins de cada nivell, primer els de la unitat.
  const items = [...fromUnit, ...extra]
    .sort((a, b) => a.level - b.level)
    .map((item, index) => ({ ...item, number: index + 1, key: exerciseKey(unit.id, item.exercise.id) }));

  return {
    id: unit.id,
    unit,
    number: unit.number,
    title: unit.shortTitle ?? unit.title,
    items,
    extraCount: extra.length,
  };
}

/** Els temes de la secció d'exercicis, en l'ordre de les unitats. */
export const topics = units.filter((unit) => extraExercises[unit.id]).map(buildTopic);

export const topicById = (id) => topics.find((topic) => topic.id === id) ?? null;

/** Quants exercicis extra té una unitat (0 si no en té). */
export const extraCount = (unitId) => extraExercises[unitId]?.length ?? 0;

/** Total d'exercicis de la secció. */
export const bankTotal = topics.reduce((sum, topic) => sum + topic.items.length, 0);

/** Quants exercicis d'un tema estan marcats com a fets. */
export const doneInTopic = (topic, exercisesDone) => topic.items.filter((item) => exercisesDone[item.key]).length;
