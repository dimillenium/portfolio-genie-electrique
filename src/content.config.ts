import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { PLACEHOLDER_SOURCE } from './lib/placeholders.mjs';

const containsPlaceholder = new RegExp(PLACEHOLDER_SOURCE);

/** Un champ pas encore rempli : « [TEXTE] ». */
const placeholder = z
  .string()
  .regex(new RegExp(`^${PLACEHOLDER_SOURCE}$`), 'Placeholder attendu au format [TEXTE]');

/** URL réelle, URL contenant un placeholder (https://github.com/[TON-COMPTE]/…) ou placeholder seul. */
const urlOrPlaceholder = z.union([placeholder, z.url()]);
const emailOrPlaceholder = z.union([placeholder, z.email()]);

export const PROJECT_STATUSES = ['planifie', 'en-cours', 'termine'] as const;
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

/* ------------------------------------------------------------------
   Projets : un fichier Markdown par projet dans src/content/projets/.
   Les fichiers qui commencent par « _ » (ex. _modele.md) sont ignorés.
   ------------------------------------------------------------------ */
const projets = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/projets' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string().min(1),
        summary: z.string().min(1),
        status: z.enum(PROJECT_STATUSES),
        startDate: z.union([placeholder, z.coerce.date()]),
        technologies: z.array(z.string().min(1)).default([]),
        repoUrl: urlOrPlaceholder.optional(),
        demoUrl: urlOrPlaceholder.optional(),
        videoUrl: urlOrPlaceholder.optional(),
        featured: z.boolean().default(false),
        /** Image facultative (photo du montage, schéma), optimisée par <Image>. */
        cover: image().optional(),
        coverAlt: z.string().min(1).optional(),
      })
      .superRefine((projet, ctx) => {
        // Règle : un projet « termine » doit pointer vers un vrai repo public.
        if (projet.status === 'termine') {
          if (!projet.repoUrl) {
            ctx.addIssue({
              code: 'custom',
              path: ['repoUrl'],
              message: 'Un projet « termine » doit avoir un repoUrl (lien vers son repo public).',
            });
          } else if (containsPlaceholder.test(projet.repoUrl)) {
            ctx.addIssue({
              code: 'custom',
              path: ['repoUrl'],
              message: `Un projet « termine » doit avoir un repoUrl réel : « ${projet.repoUrl} » contient encore un placeholder.`,
            });
          }
        }
        if (projet.cover && !projet.coverAlt) {
          ctx.addIssue({
            code: 'custom',
            path: ['coverAlt'],
            message: 'coverAlt (texte alternatif) est obligatoire quand cover est défini.',
          });
        }
      }),
});

/* ------------------------------------------------------------------
   Contenu des pages : un fichier YAML par page dans src/content/site/.
   ------------------------------------------------------------------ */
const single = (name: string) => glob({ pattern: `${name}.yaml`, base: './src/content/site' });

const pageLink = z.enum(['projets', 'parcours', 'competences', 'contact']);

const accueil = defineCollection({
  loader: single('accueil'),
  schema: z.object({
    titre: z.string().min(1),
    sousTitre: z.string().min(1),
    accroche: z.string().min(1),
    preuves: z
      .array(
        z.object({
          titre: z.string().min(1),
          texte: z.string().min(1),
          icone: z.string().regex(/^lucide:[a-z0-9-]+$/, 'Icône Lucide attendue, ex. lucide:workflow'),
          lien: pageLink.optional(),
        }),
      )
      .length(3),
    boutons: z.object({
      projets: z.string().min(1),
      parcours: z.string().min(1),
      contact: z.string().min(1),
    }),
  }),
});

const parcours = defineCollection({
  loader: single('parcours'),
  schema: z.object({
    etapes: z
      .array(
        z.object({
          periode: z.string().min(1),
          titre: z.string().min(1),
          description: z.string().min(1),
          /** Sert uniquement au style du jalon dans la timeline. */
          etat: z.enum(['termine', 'en-cours', 'objectif']),
        }),
      )
      .min(1),
  }),
});

const competences = defineCollection({
  loader: single('competences'),
  schema: z.object({
    groupes: z
      .array(
        z.object({
          id: z.enum(['pratique', 'apprentissage', 'objectifs']),
          titre: z.string().min(1),
          precision: z.string().min(1).optional(),
          items: z.array(z.string().min(1)).min(1),
        }),
      )
      .length(3),
  }),
});

const contact = defineCollection({
  loader: single('contact'),
  schema: z.object({
    courriel: emailOrPlaceholder,
    linkedin: urlOrPlaceholder,
    github: urlOrPlaceholder,
    /** Texte affiché tant que public/cv/cv.pdf est absent. */
    cv: z.string().min(1),
  }),
});

export const collections = { projets, accueil, parcours, competences, contact };
