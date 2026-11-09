import type { APIRoute } from 'astro';
import { withBase } from '../lib/paths';

// Note : les robots ne lisent que /robots.txt à la racine du domaine.
// Sur un site de projet GitHub Pages (compte.github.io/repo/), ce fichier
// devient effectif avec un domaine personnalisé ou un site utilisateur.
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL(withBase('sitemap-index.xml'), site).href;
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
