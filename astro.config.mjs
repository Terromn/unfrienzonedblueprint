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
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 4321,
    host: true
  },
  preview: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 4321,
    host: true
  }
}); 