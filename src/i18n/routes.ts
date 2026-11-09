import { getRelativeLocaleUrl } from 'astro:i18n';
import type { Lang } from './ui';

/** Segments d'URL localisés : /projets ↔ /en/projects, etc. */
export const routes = {
  home: { fr: '', en: '' },
  projets: { fr: 'projets', en: 'projects' },
  parcours: { fr: 'parcours', en: 'journey' },
  competences: { fr: 'competences', en: 'skills' },
  contact: { fr: 'contact', en: 'contact' },
  notfound: { fr: '404', en: '404' },
} as const satisfies Record<string, Record<Lang, string>>;

export type RouteKey = keyof typeof routes;

/** Chemin relatif (avec `base` et barre oblique finale) d'une page dans une langue. */
export function localePath(lang: Lang, route: RouteKey, slug?: string): string {
  const segment = routes[route][lang];
  const path = [segment, slug].filter(Boolean).join('/');
  return getRelativeLocaleUrl(lang, path);
}
