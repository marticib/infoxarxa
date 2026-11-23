import { units } from '../content/index.js';
import { glossary } from '../content/glossary.js';
import { topics } from './exerciseBank.js';
import { exercisesHref, glossaryHref, homeHref, unitHref } from './router.js';
import { normalize, stripMarkup } from './text.js';

// Cercador del dossier. L'índex es construeix una sola vegada a partir del
// mateix contingut que es mostra: unitats, apartats, exemples, exercicis,
// errors habituals i termes del glossari. Tot passa al navegador.

// Qualsevol component pot demanar que s'obri el cercador (l'escolta Layout).
export const SEARCH_EVENT = 'ra2js:obre-cercador';
export const openSearch = () => window.dispatchEvent(new Event(SEARCH_EVENT));

export const KINDS = {
  page: { label: 'Pàgines', icon: 'home', weight: 6 },
  unit: { label: 'Unitats', icon: 'book', weight: 5 },
  topic: { label: "Temes d'exercicis", icon: 'pencil', weight: 4 },
  section: { label: 'Apartats', icon: 'hash', weight: 4 },
  term: { label: 'Glossari', icon: 'list', weight: 3 },
  example: { label: 'Exemples', icon: 'play', weight: 2 },
  exercise: { label: 'Exercicis', icon: 'pencil', weight: 2 },
  error: { label: 'Errors habituals', icon: 'error', weight: 1 },
};

const FIXED_SECTIONS = [
  { id: 'errors-habituals', title: 'Errors habituals' },
  { id: 'exercicis', title: 'Exercicis' },
  { id: 'resum', title: 'Resum' },
  { id: 'questionari', title: 'Qüestionari' },
];

function buildIndex() {
  const entries = [];
  // `matchTitle`: text amb què es compara el títol (per defecte, el mateix títol).
  const add = (kind, title, context, href, { anchor = null, extra = '', matchTitle } = {}) => {
    const cleanTitle = stripMarkup(title);
    const cleanContext = stripMarkup(context);
    entries.push({
      id: `${kind}-${entries.length}`,
      kind,
      title: cleanTitle,
      context: cleanContext,
      href,
      anchor,
      titleNorm: normalize(stripMarkup(matchTitle ?? title)),
      haystack: normalize(`${cleanTitle} ${cleanContext} ${stripMarkup(extra)}`),
    });
  };

  add('page', 'Inici', 'Portada del dossier', homeHref);
  add('page', 'Exercicis', 'Tots els exercicis, per temes i per nivell', exercisesHref(), { extra: 'practicar pràctica temes' });
  add('page', 'Glossari', 'Totes les paraules clau, amb cercador', glossaryHref);

  for (const unit of units) {
    const where = `Unitat ${unit.number} · ${unit.shortTitle ?? unit.title}`;
    add('unit', `${unit.number}. ${unit.title}`, unit.description, unitHref(unit.id), {
      extra: `unitat ${unit.number}`,
      matchTitle: unit.title,
    });

    for (const section of unit.sections) {
      const sectionHref = unitHref(unit.id, section.id);
      add('section', section.title, where, sectionHref, { anchor: section.id });

      for (const block of section.blocks) {
        if (!block.title) continue;
        if (block.type === 'example') {
          add('example', block.title, `${where} · ${section.title}`, sectionHref, { anchor: section.id });
        } else if (block.type === 'challenge') {
          add('exercise', block.title, `Repte · ${where}`, sectionHref, { anchor: section.id, extra: 'repte' });
        } else if (block.type === 'error') {
          add('error', block.title, where, sectionHref, { anchor: section.id, extra: 'error' });
        }
      }
    }

    for (const fixed of FIXED_SECTIONS) {
      add('section', fixed.title, where, unitHref(unit.id, fixed.id), { anchor: fixed.id });
    }

    for (const exercise of [...unit.exercises, unit.finalExercise]) {
      if (!exercise?.title) continue;
      add('exercise', exercise.title, where, unitHref(unit.id, 'exercicis'), { anchor: 'exercicis', extra: 'exercici' });
    }

    for (const error of unit.commonErrors) {
      if (!error.title) continue;
      add('error', error.title, where, unitHref(unit.id, 'errors-habituals'), {
        anchor: 'errors-habituals',
        extra: 'error',
      });
    }
  }

  // Secció d'exercicis: una pàgina per tema i els exercicis que no són a cap unitat.
  for (const topic of topics) {
    add('topic', `Exercicis: ${topic.title}`, `Tema ${topic.number} · ${topic.items.length} exercicis`, exercisesHref(topic.id), {
      extra: 'practicar tema',
      matchTitle: `exercicis ${topic.title}`,
    });
    for (const item of topic.items) {
      if (item.source !== 'extra') continue;
      add('exercise', item.exercise.title, `Exercicis · Tema ${topic.number} · ${topic.title}`, exercisesHref(topic.id, item.exercise.id), {
        anchor: `exercici-${item.exercise.id}`,
        extra: 'exercici extra',
      });
    }
  }

  for (const item of glossary) {
    add('term', item.term, item.definition, glossaryHref + '/' + encodeURIComponent(item.term));
  }

  return entries;
}

let cachedIndex = null;
const getIndex = () => (cachedIndex ??= buildIndex());

// Totes les paraules de la consulta han d'aparèixer a l'entrada. Puntuen més
// les coincidències al títol, i encara més si el títol comença igual.
export function search(query, limit = 40) {
  const words = normalize(query).split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];
  const phrase = words.join(' ');

  const matches = [];
  getIndex().forEach((entry, order) => {
    if (!words.every((word) => entry.haystack.includes(word))) return;

    let score = KINDS[entry.kind].weight;
    if (entry.titleNorm === phrase) score += 100;
    else if (entry.titleNorm.startsWith(phrase)) score += 60;
    else if (entry.titleNorm.includes(phrase)) score += 40;
    else if (words.every((word) => entry.titleNorm.includes(word))) score += 25;
    matches.push({ entry, score, order });
  });

  return matches
    .sort((a, b) => b.score - a.score || a.order - b.order)
    .slice(0, limit)
    .map((match) => match.entry);
}

// El que es mostra abans d'escriure res: accés directe a totes les unitats.
export function suggestions() {
  const index = getIndex();
  return [...index.filter((entry) => entry.kind === 'unit'), ...index.filter((entry) => entry.kind === 'page')];
}

// Agrupa els resultats per tipus, amb un màxim per grup. Les entrades arriben
// ordenades per rellevància: el grup de la millor coincidència va primer.
export function groupResults(entries, perGroup = 6) {
  const groups = new Map();
  for (const entry of entries) {
    if (!groups.has(entry.kind)) groups.set(entry.kind, []);
    const items = groups.get(entry.kind);
    if (items.length < (entry.kind === 'unit' || entry.kind === 'topic' ? 11 : perGroup)) items.push(entry);
  }
  return [...groups.entries()].map(([kind, items]) => ({ kind, label: KINDS[kind].label, items }));
}
