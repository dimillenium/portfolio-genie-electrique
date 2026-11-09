// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages : site de projet servi sous https://<compte>.github.io/<repo>/
const SITE = 'https://dimillenium.github.io';
const BASE = '/portfolio-genie-electrique';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'always',
  integrations: [icon()],
  vite: {
    plugins: [tailwindcss()],
  },
});
