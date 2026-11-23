import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { writeString } from '../lib/storage.js';

const ThemeContext = createContext(null);

// El tema inicial ja l'ha aplicat l'script d'index.html (preferència desada o
// la del sistema). Només el desem quan l'alumne el canvia expressament.
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    // Color de la barra del navegador en mòbil (el mateix que --bg a tokens.css).
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#0c0e13' : '#ffffff');
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    writeString('theme', next);
  }, [theme]);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme s\'ha de fer servir dins de ThemeProvider');
  return context;
}
