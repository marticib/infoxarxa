import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // './' fa que el build funcioni des de qualsevol carpeta o subruta.
  base: './',
  plugins: [react()],
  build: {
    // Tot el temari (11 unitats amb els seus exemples) viatja en un sol fitxer
    // perquè l'aplicació funcioni sense connexió un cop carregada.
    chunkSizeWarningLimit: 900,
  },
});
