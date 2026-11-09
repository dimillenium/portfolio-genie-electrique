// Libellés d'interface (navigation, boutons, états). Le contenu éditorial
// vit dans src/content/ : ne pas le dupliquer ici.

export const languages = {
  fr: 'Français',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;

export const htmlLang: Record<Lang, string> = { fr: 'fr-CA', en: 'en-CA' };
export const ogLocale: Record<Lang, string> = { fr: 'fr_CA', en: 'en_CA' };

const fr = {
  'skip': 'Aller au contenu',
  'nav.label': 'Navigation principale',
  'nav.home': 'Accueil',
  'nav.projets': 'Projets',
  'nav.parcours': 'Parcours',
  'nav.competences': 'Compétences',
  'nav.contact': 'Contact',
  'lang.short': 'EN',
  'lang.long': 'English version',
  'status.planifie': 'Planifié',
  'status.en-cours': 'En cours',
  'status.termine': 'Terminé',
  'home.proofs': 'Preuves',
  'home.featured': 'Projets en vedette',
  'projects.filter.legend': 'Filtrer par statut',
  'projects.filter.all': 'Tous',
  'projects.empty': 'Aucun projet avec ce statut pour le moment.',
  'project.status': 'Statut',
  'project.start': 'Début',
  'project.technologies': 'Technologies',
  'project.links': 'Liens du projet',
  'project.toc': 'Sommaire',
  'project.back': 'Tous les projets',
  'project.repo': 'Repo GitHub',
  'project.demo': 'Démo',
  'project.video': 'Vidéo de démonstration',
  'contact.email': 'Courriel',
  'contact.linkedin': 'LinkedIn',
  'contact.github': 'GitHub',
  'contact.cv': 'CV',
  'contact.cv.download': 'Télécharger le CV (PDF)',
  'contact.cv.missing': 'CV non disponible pour le moment',
  'footer.contact': 'Liens de contact',
  'notfound.title': 'Page introuvable',
  'notfound.back': "Retour à l'accueil",
  'soon.title': 'Traduction à venir',
  'soon.body': "Cette page n'est pas encore traduite.",
  'soon.cta': 'Lire la version française',
} as const;

export type UiKey = keyof typeof fr;

const en: Record<UiKey, string> = {
  'skip': 'Skip to content',
  'nav.label': 'Main navigation',
  'nav.home': 'Home',
  'nav.projets': 'Projects',
  'nav.parcours': 'Journey',
  'nav.competences': 'Skills',
  'nav.contact': 'Contact',
  'lang.short': 'FR',
  'lang.long': 'Version française',
  'status.planifie': 'Planned',
  'status.en-cours': 'In progress',
  'status.termine': 'Completed',
  'home.proofs': 'Proof',
  'home.featured': 'Featured projects',
  'projects.filter.legend': 'Filter by status',
  'projects.filter.all': 'All',
  'projects.empty': 'No project with this status yet.',
  'project.status': 'Status',
  'project.start': 'Start',
  'project.technologies': 'Technologies',
  'project.links': 'Project links',
  'project.toc': 'Contents',
  'project.back': 'All projects',
  'project.repo': 'GitHub repo',
  'project.demo': 'Demo',
  'project.video': 'Demo video',
  'contact.email': 'Email',
  'contact.linkedin': 'LinkedIn',
  'contact.github': 'GitHub',
  'contact.cv': 'Resume',
  'contact.cv.download': 'Download resume (PDF)',
  'contact.cv.missing': 'Resume not available yet',
  'footer.contact': 'Contact links',
  'notfound.title': 'Page not found',
  'notfound.back': 'Back to home',
  'soon.title': 'Translation coming soon',
  'soon.body': 'This page has not been translated into English yet.',
  'soon.cta': 'Lire la version française',
};

export const ui: Record<Lang, Record<UiKey, string>> = { fr, en };

export function useTranslations(lang: Lang) {
  return (key: UiKey): string => ui[lang][key] ?? ui.fr[key];
}

export function otherLang(lang: Lang): Lang {
  return lang === 'fr' ? 'en' : 'fr';
}
