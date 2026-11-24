import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { readJSON, writeJSON } from '../lib/storage.js';
import { courseOfUnit } from '../lib/courses.js';

export { exerciseKey } from '../lib/keys.js';

const STORAGE_KEY = 'progress:v1';

// Percentatge d'encerts necessari perquè un qüestionari completi la unitat.
export const PASS_RATIO = 0.7;
export const passMark = (total) => Math.ceil(total * PASS_RATIO);

const emptyProgress = {
  visited: {}, //        { [unitId]: true }
  completed: {}, //      { [unitId]: true }
  quiz: {}, //           { [unitId]: { best, last, total, attempts } }
  lastUnits: {}, //      { [dossier]: unitId } última unitat oberta de cada dossier
  projectChecks: {}, //  { [itemId]: true } funcionalitats dels projectes finals
  exercises: {}, //      { ['unitat/exercici']: true } exercicis marcats com a fets
};

// Les unitats, els exercicis i les funcionalitats dels projectes tenen ids que
// no es repeteixen entre dossiers: per això es poden desar tots junts.

function loadProgress() {
  const saved = readJSON(STORAGE_KEY, null);
  if (!saved || typeof saved !== 'object') return emptyProgress;
  const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
  const lastUnits = isObject(saved.lastUnits) ? { ...saved.lastUnits } : {};
  // Abans només hi havia un dossier i es desava una sola unitat.
  if (typeof saved.lastUnit === 'string') {
    const owner = courseOfUnit(saved.lastUnit);
    if (owner && !lastUnits[owner.id]) lastUnits[owner.id] = saved.lastUnit;
  }
  return {
    visited: isObject(saved.visited) ? saved.visited : {},
    completed: isObject(saved.completed) ? saved.completed : {},
    quiz: isObject(saved.quiz) ? saved.quiz : {},
    lastUnits,
    projectChecks: isObject(saved.projectChecks) ? saved.projectChecks : {},
    exercises: isObject(saved.exercises) ? saved.exercises : {},
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'visit': {
      const courseId = courseOfUnit(action.unitId)?.id;
      if (!courseId) return state;
      if (state.visited[action.unitId] && state.lastUnits[courseId] === action.unitId) return state;
      return {
        ...state,
        visited: { ...state.visited, [action.unitId]: true },
        lastUnits: { ...state.lastUnits, [courseId]: action.unitId },
      };
    }

    case 'quiz': {
      const previous = state.quiz[action.unitId];
      const result = {
        best: Math.max(previous?.best ?? 0, action.score),
        last: action.score,
        total: action.total,
        attempts: (previous?.attempts ?? 0) + 1,
      };
      const passed = action.score >= passMark(action.total);
      return {
        ...state,
        quiz: { ...state.quiz, [action.unitId]: result },
        completed: passed ? { ...state.completed, [action.unitId]: true } : state.completed,
      };
    }

    case 'projectCheck': {
      return { ...state, projectChecks: { ...state.projectChecks, [action.itemId]: action.checked } };
    }

    case 'exercise': {
      if (Boolean(state.exercises[action.key]) === action.done) return state;
      const exercises = { ...state.exercises };
      if (action.done) exercises[action.key] = true;
      else delete exercises[action.key];
      return { ...state, exercises };
    }

    case 'reset':
      return emptyProgress;

    default:
      return state;
  }
}

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const [progress, dispatch] = useReducer(reducer, undefined, loadProgress);

  useEffect(() => {
    writeJSON(STORAGE_KEY, progress);
  }, [progress]);

  const value = useMemo(() => {
    return {
      progress,
      markVisited: (unitId) => dispatch({ type: 'visit', unitId }),
      saveQuizResult: (unitId, score, total) => dispatch({ type: 'quiz', unitId, score, total }),
      setProjectCheck: (itemId, checked) => dispatch({ type: 'projectCheck', itemId, checked }),
      setExerciseDone: (key, done) => dispatch({ type: 'exercise', key, done }),
      resetProgress: () => dispatch({ type: 'reset' }),
    };
  }, [progress]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress s\'ha de fer servir dins de ProgressProvider');
  return context;
}

// Estat d'una unitat per mostrar-lo a la navegació.
export function unitStatus(progress, unitId) {
  if (progress.completed[unitId]) return 'completed';
  if (progress.visited[unitId]) return 'visited';
  return 'pending';
}

// Quantes unitats d'un dossier estan completades.
export const completedIn = (course, progress) => course.units.filter((unit) => progress.completed[unit.id]).length;

// El projecte final d'un dossier està fet quan totes les funcionalitats
// obligatòries estan marcades. Es calcula cada vegada: la llista pot canviar.
export const isProjectDone = (course, progress) =>
  course.requiredItems.length > 0 && course.requiredItems.every((item) => progress.projectChecks[item.id]);

// Quants exercicis d'un dossier estan marcats com a fets.
export const exercisesDoneIn = (course, progress) =>
  course.topics.reduce((sum, topic) => sum + topic.items.filter((item) => progress.exercises[item.key]).length, 0);

export const STATUS_LABELS = {
  completed: 'Completada',
  visited: 'Començada',
  pending: 'Pendent',
};
