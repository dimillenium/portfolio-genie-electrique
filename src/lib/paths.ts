/** Préfixe un chemin avec `base` (ex. « og.png » → « /portfolio-genie-electrique/og.png »). */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}
