import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2019',
    sourcemap: false,
    rollupOptions: {
      output: {
        // Split the heavy 3D stack into its own chunk so it can be
        // lazy-loaded only when the Hero scene actually mounts.
        manualChunks: {
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          gsap: ['gsap'],
        },
      },
    },
    chunkSizeWarningLimit: 900,
  },
});
