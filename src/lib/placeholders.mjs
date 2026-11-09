// Placeholders : tout texte entre crochets, ex. [PRÉNOM NOM] ou [URL].
// Ils restent visibles sur le site tant qu'ils ne sont pas remplis.
// Module .mjs pour être partagé par astro.config.mjs, le schéma et les scripts.

/** Source de l'expression régulière d'un placeholder (sans retour à la ligne ni crochet imbriqué). */
export const PLACEHOLDER_SOURCE = String.raw`\[[^\[\]\n]+\]`;

/** @param {unknown} value */
export function hasPlaceholder(value) {
  return typeof value === 'string' && new RegExp(PLACEHOLDER_SOURCE).test(value);
}

/** @param {string} value */
export function isOnlyPlaceholder(value) {
  return new RegExp(`^${PLACEHOLDER_SOURCE}$`).test(value.trim());
}

/**
 * Découpe un texte en segments normaux et segments placeholder.
 * @param {string} text
 * @returns {{ text: string, placeholder: boolean }[]}
 */
export function splitPlaceholders(text) {
  const parts = [];
  const re = new RegExp(PLACEHOLDER_SOURCE, 'g');
  let last = 0;
  for (const match of text.matchAll(re)) {
    const index = match.index ?? 0;
    if (index > last) parts.push({ text: text.slice(last, index), placeholder: false });
    parts.push({ text: match[0], placeholder: true });
    last = index + match[0].length;
  }
  if (last < text.length) parts.push({ text: text.slice(last), placeholder: false });
  return parts;
}
