// Configuration i18n partagée par astro.config.mjs et les pages.

export const DEFAULT_LOCALE = 'fr';
export const LOCALES = ['fr', 'en'];

/**
 * Passe à `true` quand les pages EN sont réellement traduites.
 * Tant que c'est `false`, les pages EN affichent « Translation coming soon »,
 * sont en `noindex` et restent hors du sitemap.
 */
export const EN_READY = false;
