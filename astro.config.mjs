import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://emir12311.dev',
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
});
