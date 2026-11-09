import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import type { ProjectStatus } from '../content.config';
import type { Lang } from '../i18n/ui';
import { isOnlyPlaceholder } from './placeholders.mjs';

type SingleCollection = 'accueil' | 'parcours' | 'competences' | 'contact';

/** Lit le fichier YAML d'une page (src/content/site/<nom>.yaml). */
export async function getSingle<C extends SingleCollection>(name: C) {
  const entry = await getEntry(name, name);
  if (!entry) throw new Error(`Contenu manquant : src/content/site/${name}.yaml`);
  return entry.data as CollectionEntry<C>['data'];
}

export type Projet = CollectionEntry<'projets'>;

const STATUS_ORDER: Record<ProjectStatus, number> = { 'en-cours': 0, termine: 1, planifie: 2 };

function dateValue(d: Projet['data']['startDate']): number {
  return d instanceof Date ? d.getTime() : Number.POSITIVE_INFINITY;
}

/** Projets triés : en cours, terminés, planifiés ; puis du plus récent au plus ancien. */
export async function getProjets(): Promise<Projet[]> {
  const all = await getCollection('projets');
  return all.sort(
    (a, b) =>
      STATUS_ORDER[a.data.status] - STATUS_ORDER[b.data.status] ||
      dateValue(b.data.startDate) - dateValue(a.data.startDate) ||
      a.id.localeCompare(b.id),
  );
}

const dateFormats: Record<Lang, Intl.DateTimeFormat> = {
  fr: new Intl.DateTimeFormat('fr-CA', { year: 'numeric', month: 'long', timeZone: 'UTC' }),
  en: new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: 'long', timeZone: 'UTC' }),
};

/** Date lisible (« mars 2026 ») ou le placeholder tel quel. */
export function formatDate(value: Date | string, lang: Lang): string {
  return value instanceof Date ? dateFormats[lang].format(value) : value;
}

/** Une valeur est-elle exploitable comme lien (pas de placeholder) ? */
export function isUsableUrl(value: string | undefined): value is string {
  return !!value && !/\[[^\]]*\]/.test(value) && !isOnlyPlaceholder(value);
}
