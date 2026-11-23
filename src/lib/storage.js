// Accés segur a localStorage: si no està disponible (mode privat, permisos...)
// l'aplicació continua funcionant, simplement sense recordar res.

const PREFIX = 'ra2js:';

export function readJSON(key, fallback) {
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeJSON(key, value) {
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    /* sense espai o sense permís: ho ignorem */
  }
}

export function writeString(key, value) {
  try {
    window.localStorage.setItem(PREFIX + key, value);
  } catch {
    /* ignorat */
  }
}
