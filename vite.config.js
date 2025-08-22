import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
 
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
// Vite doesn’t recognize the @ alias by default. You need to define it in your vite.config.js or vite.config.ts.
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // This sets "@" to point to "src"
          },
  },
})
