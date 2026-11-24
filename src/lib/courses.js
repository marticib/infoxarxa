import ra1 from '../content/ra1/index.js';
import ra2 from '../content/ra2/index.js';
import { exerciseKey } from './keys.js';

// Els dossiers de l'aplicació. Cada un és un «curs» amb les seves unitats,
// exercicis, glossari i projecte final (vegeu content/ra1 i content/ra2).
//
// Els identificadors de les unitats no es repeteixen entre dossiers: així una
// unitat es pot trobar només amb el seu id, i el progrés desat no es barreja.

// Els exercicis de les unitats no porten nivell. Estan ordenats de menys a
// més dificultat: els dos primers són bàsics, els dos següents mitjans i
// l'exercici final és un repte. Un exercici pot dir el seu amb `level`.
const levelInUnit = (index) => (index < 2 ? 1 : 2);

// Un tema de la secció d'exercicis: els exercicis de la unitat més els extra.
function buildTopic(course, unit) {
  const fromUnit = [
    ...unit.exercises.map((exercise, index) => ({
      exercise,
      level: exercise.level ?? levelInUnit(index),
      source: 'unit',
    })),
    { exercise: unit.finalExercise, level: unit.finalExercise.level ?? 3, source: 'unit' },
  ];
  const extra = course.extraExercises[unit.id].map((exercise) => ({ exercise, level: exercise.level, source: 'extra' }));

  // Ordenats per nivell; dins de cada nivell, primer els de la unitat.
  const items = [...fromUnit, ...extra]
    .sort((a, b) => a.level - b.level)
    .map((item, index) => ({ ...item, number: index + 1, key: exerciseKey(unit.id, item.exercise.id) }));

  return {
    id: unit.id,
    courseId: course.id,
    unit,
    number: unit.number,
    title: unit.shortTitle ?? unit.title,
    items,
    extraCount: extra.length,
  };
}

function build(course) {
  const topics = course.units.filter((unit) => course.extraExercises[unit.id]).map((unit) => buildTopic(course, unit));
  return {
    ...course,
    topics,
    bankTotal: topics.reduce((sum, topic) => sum + topic.items.length, 0),
    projectUnit: course.units.find((unit) => unit.id === course.projectUnitId) ?? null,
    // Les funcionalitats obligatòries del projecte final, en una sola llista.
    requiredItems: course.checklist.filter((group) => group.required).flatMap((group) => group.items),
  };
}

/** Tots els dossiers, en l'ordre del curs. */
export const courses = [ra1, ra2].map(build);

/** El dossier al qual porten les adreces antigues, sense prefix (#/glossari). */
export const DEFAULT_COURSE_ID = 'ra2';

export const courseById = (id) => courses.find((course) => course.id === id) ?? null;

const ownerOfUnit = new Map();
for (const course of courses) {
  for (const unit of course.units) {
    if (ownerOfUnit.has(unit.id)) throw new Error(`Hi ha dues unitats amb l'id «${unit.id}»`);
    ownerOfUnit.set(unit.id, course);
  }
}

/** El dossier d'una unitat (o d'un tema d'exercicis, que té el mateix id). */
export const courseOfUnit = (unitId) => ownerOfUnit.get(unitId) ?? null;

export const unitById = (unitId) => courseOfUnit(unitId)?.units.find((unit) => unit.id === unitId) ?? null;

export const topicById = (topicId) => courseOfUnit(topicId)?.topics.find((topic) => topic.id === topicId) ?? null;
