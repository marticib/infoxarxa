// Dossier del RA1: HTML i CSS.
//
// Per afegir una unitat: crea el fitxer a ./units seguint l'estructura de les
// altres, importa'l aquí i afegeix-lo a la llista. Cada fitxer exporta la
// unitat (per defecte) i el seu vocabulari (`glossary`).

import unit01, { glossary as terms01 } from './units/01-html-esquelet.js';
import unit02, { glossary as terms02 } from './units/02-html-contingut.js';
import unit03, { glossary as terms03 } from './units/03-css-primers-passos.js';
import unit04, { glossary as terms04 } from './units/04-model-de-caixa.js';
import unit05, { glossary as terms05 } from './units/05-contenidors.js';
import unit06, { glossary as terms06 } from './units/06-display.js';
import unit07, { glossary as terms07 } from './units/07-flexbox.js';
import unit08, { glossary as terms08 } from './units/08-flexbox-2.js';
import unit09, { glossary as terms09 } from './units/09-grid.js';
import unit10, { glossary as terms10 } from './units/10-position.js';
import unit11, { glossary as terms11 } from './units/11-projecte-youtube.js';
import { extraExercises } from './exercises/index.js';
import { projectChecklist } from './projectChecklist.js';

export const units = [unit01, unit02, unit03, unit04, unit05, unit06, unit07, unit08, unit09, unit10, unit11];

// Cada terme pertany a la unitat on apareix per primera vegada: es mostra al
// resum d'aquella unitat i a la pàgina del glossari.
const termsOf = (unit, terms) => terms.map((item) => ({ ...item, unit: unit.id }));

export const glossary = [
  ...termsOf(unit01, terms01),
  ...termsOf(unit02, terms02),
  ...termsOf(unit03, terms03),
  ...termsOf(unit04, terms04),
  ...termsOf(unit05, terms05),
  ...termsOf(unit06, terms06),
  ...termsOf(unit07, terms07),
  ...termsOf(unit08, terms08),
  ...termsOf(unit09, terms09),
  ...termsOf(unit10, terms10),
  ...termsOf(unit11, terms11),
];

export default {
  id: 'ra1',
  code: 'RA1',
  title: 'HTML i CSS des de zero',
  titleParts: ['HTML i CSS', 'des de zero'],
  shortTitle: 'HTML i CSS',
  subject: 'HTML i CSS',
  logo: '</>',
  summary:
    'Construir pàgines: etiquetes, estils, el model de caixa, pensar en quadrats, display (block, flex i grid) i position.',
  units,
  extraExercises,
  glossary,
  checklist: projectChecklist,
  projectUnitId: 'projecte-youtube',
  projectSummary: 'maquetar una pàgina tipus YouTube: la pàgina inicial i la pàgina d\'un vídeo.',
  projectDoneText:
    'Projecte final completat. Enhorabona: has passat d\'un dibuix de quadrats a dues pàgines de veritat.',
  glossaryPlaceholder: 'Per exemple: flex, padding…',
  // L'exemple que creix a cada unitat (no és el projecte final).
  guide: { name: 'web de rutes', pieceTitle: 'Què aporta a la web de rutes' },
  // Textos de la portada del dossier.
  home: {
    eyebrow: 'RA1 · HTML i CSS',
    lead: [
      'Totes les pàgines web, per complicades que semblin, estan fetes de **quadrats ficats dins de quadrats**. Aquí aprendràs a veure\'ls, a escriure\'ls amb HTML i a col·locar-los on vols amb CSS.',
      'No és un llibre per llegir de dalt a baix: gairebé tot el codi que veuràs es pot canviar aquí mateix, i la pàgina es torna a pintar mentre escrius. Toca-ho tot.',
    ],
    tagline: 'de la primera etiqueta fins a una pàgina sencera',
    projectDone: 'El projecte final ja és teu.',
    project: {
      text: "En acabar el dossier hauràs maquetat una **pàgina tipus YouTube**: la pàgina inicial, amb la graella de vídeos, i la pàgina d'un vídeo. Només amb HTML i CSS. Prova la de mostra i activa el botó «Quadrats»: tot el que hi veus són caixes col·locades amb `display` i `position`.",
      features: [
        'Una capçalera fixa amb el logo, el cercador i el perfil',
        'Un menú lateral que no es mou quan baixes',
        'Una graella de vídeos, amb la durada sobre cada miniatura',
        'La pàgina del vídeo, en dues columnes',
      ],
      note: "Pel camí, les unitats treballen amb un exemple més petit que creix a poc a poc, una web de rutes de muntanya. Al projecte final aplicaràs el mateix a la teva pàgina. I al dossier de JavaScript, aquesta mateixa pàgina cobrarà vida.",
    },
    route:
      'Cada unitat comença amb un problema que encara no sabem resoldre i acaba amb una eina nova per al projecte. Convé seguir-les en ordre: cada una fa servir el que has après a les anteriors.',
    legend: [
      { tone: 'theory', icon: 'book', name: 'Idea clau', text: 'El concepte que has de retenir de cada apartat.' },
      { tone: 'example', icon: 'play', name: 'Exemple en viu', text: 'HTML i CSS que pots canviar: la pàgina es torna a pintar mentre escrius.' },
      { tone: 'warning', icon: 'warning', name: 'Atenció', text: 'Detalls que acostumen a passar per alt.' },
      { tone: 'error', icon: 'error', name: 'Error habitual', text: 'Errors típics: què es veu, per què passa i com s\'arregla.' },
      { tone: 'challenge', icon: 'flag', name: 'Repte i exercici', text: 'Pràctica amb objectiu, comprovacions, pista i solució.' },
      { tone: 'project', icon: 'layers', name: 'Exemple guia', text: 'Com creix la web de rutes que ens acompanya a totes les unitats.' },
    ],
    tip: 'Un consell: quan una cosa no es col·loqui on vols, prem **«Quadrats»**. Veure on comença i on acaba cada caixa resol la meitat dels problemes de CSS, i és exactament el que fa qui s\'hi dedica.',
  },
  // Què vol dir «executar» en aquest dossier: 'code' (consola) o 'page' (HTML i CSS en viu).
  runner: 'page',
};
