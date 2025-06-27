import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],
  output: 'static',
  build: {
    inlineStylesheets: 'always',
  },
  vite: {
    preview: {
      host: '0.0.0.0',
      port: process.env.PORT || 4321,
      strictPort: false,
      // Permitir todos los hosts en preview
      allowedHosts: 'all'
    }
  }
}); 