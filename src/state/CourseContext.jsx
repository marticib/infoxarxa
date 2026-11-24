import { createContext, useContext } from 'react';

// El dossier que s'està mirant (RA1, RA2…), segons l'adreça. A la portada
// general, on es tria dossier, no n'hi ha cap i el valor és `null`.
const CourseContext = createContext(null);

export const CourseProvider = CourseContext.Provider;

export function useCourse() {
  return useContext(CourseContext);
}

/** Com funcionen els editors del dossier: 'code' (consola) o 'page' (HTML i CSS en viu). */
export function useRunnerMode() {
  return useContext(CourseContext)?.runner ?? 'code';
}
