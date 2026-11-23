import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { readJSON, writeJSON } from '../lib/storage.js';
import { units } from '../content/index.js';
import { requiredItems } from '../content/projectChecklist.js';

const STORAGE_KEY = 'progress:v1';

// Percentatge d'encerts necessari perquè un qüestionari completi la unitat.
export const PASS_RATIO = 0.7;
export const passMark = (total) => Math.ceil(total * PASS_RATIO);

const emptyProgress = {
  visited: {}, //        { [unitId]: true }
  completed: {}, //      { [unitId]: true }
  quiz: {}, //           { [unitId]: { best, last, total, attempts } }
  lastUnit: null, //     última unitat oberta
  projectChecks: {}, //  { [itemId]: true } funcionalitats del projecte final
  projectDone: false,
  exercises: {}, //      { ['unitat/exercici']: true } exercicis marcats com a fets
};

function isProjectDone(checks) {
  return requiredItems.every((item) => checks[item.id]);
}

function loadProgress() {
  const saved = readJSON(STORAGE_KEY, null);
  if (!saved || typeof saved !== 'object') return emptyProgress;
  const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
  const projectChecks = isObject(saved.projectChecks) ? saved.projectChecks : {};
  return {
    visited: isObject(saved.visited) ? saved.visited : {},
    completed: isObject(saved.completed) ? saved.completed : {},
    quiz: isObject(saved.quiz) ? saved.quiz : {},
    lastUnit: typeof saved.lastUnit === 'string' ? saved.lastUnit : null,
    projectChecks,
    // Es torna a calcular: la llista de funcionalitats pot haver canviat.
    projectDone: isProjectDone(projectChecks),
    exercises: isObject(saved.exercises) ? saved.exercises : {},
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'visit': {
      if (state.visited[action.unitId] && state.lastUnit === action.unitId) return state;
      return {
        ...state,
        visited: { ...state.visited, [action.unitId]: true },
        lastUnit: action.unitId,
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
      const projectChecks = { ...state.projectChecks, [action.itemId]: action.checked };
      return { ...state, projectChecks, projectDone: isProjectDone(projectChecks) };
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
    const completedCount = units.filter((unit) => progress.completed[unit.id]).length;
    return {
      progress,
      completedCount,
      totalUnits: units.length,
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

// Clau amb què es desa si un exercici està fet.
export const exerciseKey = (unitId, exerciseId) => `${unitId}/${exerciseId}`;

export const STATUS_LABELS = {
  completed: 'Completada',
  visited: 'Començada',
  pending: 'Pendent',
};
