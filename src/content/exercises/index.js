// Exercicis extra, per temes. Cada tema correspon a una unitat del dossier i
// només fa servir el que s'ha explicat fins a aquella unitat.
//
// Per afegir-ne: escriu l'exercici al fitxer del seu tema, amb el mateix
// format que els de les unitats i un `level` (1 bàsic, 2 mitjà, 3 repte).

import topic01 from './01-javascript-a-la-pagina.js';
import topic02 from './02-variables.js';
import topic03 from './03-condicionals.js';
import topic04 from './04-bucles.js';
import topic05 from './05-funcions.js';
import topic06 from './06-arrays-i-objectes.js';
import topic07 from './07-dom.js';
import topic08 from './08-esdeveniments.js';
import topic09 from './09-formularis.js';
import topic10 from './10-depuracio.js';

/** { [id de la unitat]: exercicis extra d'aquell tema } */
export const extraExercises = {
  'javascript-a-la-pagina': topic01,
  variables: topic02,
  condicionals: topic03,
  bucles: topic04,
  funcions: topic05,
  'arrays-i-objectes': topic06,
  dom: topic07,
  esdeveniments: topic08,
  formularis: topic09,
  depuracio: topic10,
};
