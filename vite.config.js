import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // './' fa que el build funcioni des de qualsevol carpeta o subruta.
  base: './',
  plugins: [react()],
  build: {
    // Tot el temari (els dos dossiers, amb els seus exemples i exercicis)
    // viatja en un sol fitxer perquè l'aplicació funcioni sense connexió un cop
    // carregada. Per això el límit de l'avís és més alt que l'habitual.
    chunkSizeWarningLimit: 2500,
  },
});
