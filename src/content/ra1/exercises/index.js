// Exercicis extra del RA1, per temes. Cada tema correspon a una unitat i només
// fa servir el que s'ha explicat fins a aquella unitat.
//
// Per afegir-ne: escriu l'exercici al fitxer del seu tema, amb el mateix
// format que els de les unitats i un `level` (1 bàsic, 2 mitjà, 3 repte).

import topic01 from './01-html-esquelet.js';
import topic02 from './02-html-contingut.js';
import topic03 from './03-css-primers-passos.js';
import topic04 from './04-model-de-caixa.js';
import topic05 from './05-contenidors.js';
import topic06 from './06-display.js';
import topic07 from './07-flexbox.js';
import topic08 from './08-flexbox-2.js';
import topic09 from './09-grid.js';
import topic10 from './10-position.js';

/** { [id de la unitat]: exercicis extra d'aquell tema } */
export const extraExercises = {
  'html-esquelet': topic01,
  'html-contingut': topic02,
  'css-primers-passos': topic03,
  'model-de-caixa': topic04,
  contenidors: topic05,
  display: topic06,
  flexbox: topic07,
  'flexbox-2': topic08,
  grid: topic09,
  position: topic10,
};
