// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';
import { DEFAULT_LOCALE, LOCALES } from './src/i18n/config.mjs';

// GitHub Pages : site de projet servi sous https://<compte>.github.io/<repo>/
const SITE = 'https://dimillenium.github.io';
const BASE = '/portfolio-genie-electrique';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'always',
  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    locales: LOCALES,
    routing: {
      // FR à la racine (/projets/), EN préfixé (/en/projects/)
      prefixDefaultLocale: false,
    },
  },
  integrations: [icon()],
  vite: {
    plugins: [tailwindcss()],
  },
});
