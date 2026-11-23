import { units } from '../content/index.js';
import { extraExercises } from '../content/exercises/index.js';

// Xifres d'una unitat, calculades a partir del contingut (mai escrites a mà).
export function unitStats(unit) {
  let examples = 0;
  for (const section of unit.sections) {
    for (const block of section.blocks) {
      if (block.type === 'example') examples++;
    }
  }

  return {
    sections: unit.sections.length,
    examples,
    exercises: unit.exercises.length + (unit.finalExercise ? 1 : 0),
    questions: unit.quiz.length,
  };
}

// Xifres de tot el dossier.
export function dossierStats() {
  const totals = { units: units.length, examples: 0, exercises: 0, questions: 0 };
  for (const unit of units) {
    const stats = unitStats(unit);
    totals.examples += stats.examples;
    totals.exercises += stats.exercises + (extraExercises[unit.id]?.length ?? 0);
    totals.questions += stats.questions;
  }
  return totals;
}

// «1 exemple», «12 exemples».
export const plural = (count, singular, pluralForm) => `${count} ${count === 1 ? singular : pluralForm}`;
