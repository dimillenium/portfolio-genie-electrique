// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { satteri } from '@astrojs/markdown-satteri';
import { DEFAULT_LOCALE, EN_READY, LOCALES } from './src/i18n/config.mjs';
import { placeholderHighlight } from './src/lib/satteri-placeholders.mjs';

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
  integrations: [
    icon(),
    sitemap({
      // Exclut la 404 et, tant qu'elles ne sont pas traduites, les pages EN
      filter: (page) => !page.includes('/404') && (EN_READY || !page.startsWith(`${SITE}${BASE}/en/`)),
    }),
  ],
  markdown: {
    processor: satteri({
      // Texte publié tel qu'écrit dans le Markdown (pas de guillemets « intelligents »)
      features: { smartPunctuation: false },
      hastPlugins: [placeholderHighlight],
    }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
