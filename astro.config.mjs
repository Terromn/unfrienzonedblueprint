import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT ? parseInt(process.env.PORT) : 4321;

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
  server: {
    port: port,
    host: true
  },
  preview: {
    port: port,
    host: true
  },
  vite: {
    server: {
      host: true,
      strictPort: false,
      hmr: {
        port: port,
      }
    },
    preview: {
      host: true,
      strictPort: false,
      // En producción, permite todos los hosts de Railway
      allowedHosts: isProduction ? true : [
        'unfrienzonedblueprint-production.up.railway.app',
        '.railway.app',
        'localhost'
      ]
    }
  }
}); 