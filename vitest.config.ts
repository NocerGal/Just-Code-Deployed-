import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'), // Assurez-vous que ce chemin est correct
    },
  },
  plugins: [react()],
  test: {
    environment: 'jsdom',
  },
});
