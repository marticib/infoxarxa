// Dossier del RA2: introducció a JavaScript.
//
// Per afegir una unitat: crea el fitxer a ./units seguint l'estructura de les
// altres, importa'l aquí i afegeix-lo a la llista.

import unit01 from './units/01-javascript-a-la-pagina.js';
import unit02 from './units/02-variables.js';
import unit03 from './units/03-condicionals.js';
import unit04 from './units/04-bucles.js';
import unit05 from './units/05-funcions.js';
import unit06 from './units/06-arrays-i-objectes.js';
import unit07 from './units/07-dom.js';
import unit08 from './units/08-esdeveniments.js';
import unit09 from './units/09-formularis.js';
import unit10 from './units/10-depuracio.js';
import unit11 from './units/11-projecte-final.js';
import { extraExercises } from './exercises/index.js';
import { glossary } from './glossary.js';
import { projectChecklist } from './projectChecklist.js';

export const units = [unit01, unit02, unit03, unit04, unit05, unit06, unit07, unit08, unit09, unit10, unit11];

export default {
  id: 'ra2',
  code: 'RA2',
  title: 'JavaScript des de zero',
  titleParts: ['JavaScript', 'des de zero'],
  shortTitle: 'JavaScript',
  subject: 'Introducció a JavaScript',
  logo: 'JS',
  summary:
    'Fer que les pàgines facin coses: variables, condicions, bucles, funcions, el DOM, esdeveniments i formularis.',
  units,
  extraExercises,
  glossary,
  checklist: projectChecklist,
  projectUnitId: 'projecte-final',
  projectSummary: 'afegir JavaScript a la pàgina tipus YouTube: menú, cerca, filtres, «m\'agrada» i comentaris.',
  projectDoneText: 'Projecte final completat. Enhorabona: la teva pàgina ja no és una maqueta, és una aplicació.',
  glossaryPlaceholder: 'Per exemple: array, const…',
  // L'exemple que creix a cada unitat (no és el projecte final).
  guide: { name: 'gestor de tasques', pieceTitle: 'Què aporta al gestor de tasques' },
  // Textos de la portada del dossier.
  home: {
    eyebrow: 'RA2 · Introducció a JavaScript',
    lead: [
      'Ja saps fer pàgines amb HTML i CSS. Ara aprendràs a fer que **facin coses**: que responguin als clics, recordin dades, prenguin decisions i canviïn davant dels teus ulls.',
      "No és un llibre per llegir de dalt a baix: gairebé tot el codi que veuràs es pot executar i modificar aquí mateix. Equivoca't sense por, que és com s'aprèn a programar.",
    ],
    tagline: 'de la primera línia de codi fins a una aplicació completa',
    projectDone: 'El projecte final ja és teu.',
    project: {
      text: "Al [RA1](#/ra1) vas maquetar amb HTML i CSS una **pàgina tipus YouTube**: la pàgina inicial i la d'un vídeo. Es veu bé, però cap botó fa res. En acabar aquest dossier hi afegiràs el JavaScript que la converteix en una aplicació. Prova la pàgina de mostra: són dues pàgines, i les canvies amb els botons de dalt.",
      features: [
        'Obrir i tancar el menú lateral',
        'Cercar vídeos i filtrar-los per categoria',
        "Fer «m'agrada» i subscriure's a un canal",
        'Escriure comentaris, amb validació',
      ],
      note: 'Pel camí, les unitats treballen amb un exemple més petit que creix a poc a poc, un gestor de tasques. Al projecte final aplicaràs el mateix a la teva pàgina.',
    },
    route:
      'Cada unitat comença amb un problema que encara no sabem resoldre i acaba amb una eina nova per al projecte. Convé seguir-les en ordre: cada una fa servir el que has après a les anteriors.',
    legend: [
      { tone: 'theory', icon: 'book', name: 'Idea clau', text: 'El concepte que has de retenir de cada apartat.' },
      { tone: 'example', icon: 'play', name: 'Exemple executable', text: 'Codi que pots executar, canviar i tornar a provar.' },
      { tone: 'warning', icon: 'warning', name: 'Atenció', text: 'Detalls que acostumen a passar per alt.' },
      { tone: 'error', icon: 'error', name: 'Error habitual', text: 'Errors típics, amb el missatge de la consola i la correcció.' },
      { tone: 'challenge', icon: 'flag', name: 'Repte i exercici', text: 'Pràctica amb pista i solució amagades.' },
      { tone: 'project', icon: 'layers', name: 'Exemple guia', text: 'Com creix el gestor de tasques que ens acompanya a totes les unitats.' },
    ],
    tip: "Un consell: tingues obert l'editor de codi i el navegador al costat, i **escriu els exemples a mà** al teu propi projecte. Llegir codi i escriure'n són habilitats diferents, i la que t'avaluaran és la segona.",
  },
  // Què vol dir «executar» en aquest dossier: 'code' (consola) o 'page' (HTML i CSS en viu).
  runner: 'code',
};
