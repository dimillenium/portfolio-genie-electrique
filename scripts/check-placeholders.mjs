#!/usr/bin/env node
// Liste les [PLACEHOLDERS] restant dans le contenu publié (src/content/).
//
//   npm run placeholders            → liste, code de sortie 0
//   npm run placeholders -- --strict → code de sortie 1 s'il en reste (avant publication)
//   node scripts/check-placeholders.mjs --github → annotations GitHub Actions

import { appendFileSync, existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PLACEHOLDER_SOURCE } from '../src/lib/placeholders.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const contentDir = join(root, 'src', 'content');
const args = new Set(process.argv.slice(2));
const strict = args.has('--strict');
const github = args.has('--github');

/** @param {string} dir @returns {string[]} */
function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return walk(full);
    if (name.startsWith('_')) return []; // modèles non publiés
    return /\.(md|ya?ml)$/.test(name) ? [full] : [];
  });
}

// Un placeholder n'est pas un lien Markdown [texte](url) ni une référence [texte][ref]
const placeholderRe = new RegExp(`${PLACEHOLDER_SOURCE}(?![(\\[])`, 'g');

/** @type {{ file: string, line: number, text: string }[]} */
const found = [];

for (const file of walk(contentDir)) {
  const rel = relative(root, file).split(sep).join('/');
  const lines = readFileSync(file, 'utf8').split(/\r?\n/);
  const isYamlFile = /\.ya?ml$/.test(file);
  let inFrontmatter = false;
  let inFence = false;

  lines.forEach((raw, i) => {
    if (!isYamlFile && raw.trim() === '---' && (i === 0 || inFrontmatter)) {
      inFrontmatter = i === 0;
      return;
    }
    if (!isYamlFile && !inFrontmatter && /^\s*(```|~~~)/.test(raw)) {
      inFence = !inFence;
      return;
    }
    if (inFence) return;

    let line = raw;
    if (isYamlFile || inFrontmatter) {
      if (line.trim().startsWith('#')) return; // commentaire YAML
      line = line.replace(/\s+#\s.*$/, '');
    } else {
      line = line.replace(/`[^`]*`/g, ''); // code en ligne
    }

    for (const match of line.matchAll(placeholderRe)) {
      // En YAML, ["a", "b"] est une liste, pas un placeholder
      if ((isYamlFile || inFrontmatter) && /["']\s*,|^\[\s*\]$/.test(match[0])) continue;
      found.push({ file: rel, line: i + 1, text: match[0] });
    }
  });
}

const cvPresent = existsSync(join(root, 'public', 'cv', 'cv.pdf'));

// GitHub Actions : sortie « ready » (aucun placeholder) et résumé du job
if (github && process.env.GITHUB_OUTPUT) {
  appendFileSync(process.env.GITHUB_OUTPUT, `ready=${found.length === 0}\ncount=${found.length}\n`);
}
if (github && process.env.GITHUB_STEP_SUMMARY) {
  const rows = found.map(({ file, line, text }) => `| \`${file}:${line}\` | ${text.replace(/\|/g, '\\|')} |`);
  const summary =
    found.length === 0
      ? '### Placeholders\n\nAucun placeholder restant.\n'
      : `### ${found.length} placeholder(s) à remplir\n\n| Fichier | Placeholder |\n|---|---|\n${rows.join('\n')}\n`;
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary + (cvPresent ? '' : '\n`public/cv/cv.pdf` absent : lien CV désactivé.\n'));
}

if (found.length === 0 && cvPresent) {
  console.log('Aucun placeholder restant. ✔');
  process.exit(0);
}

console.log(`${found.length} placeholder(s) à remplir avant publication :\n`);
let current = '';
for (const { file, line, text } of found) {
  if (file !== current) {
    console.log(`  ${file}`);
    current = file;
  }
  console.log(`    L${String(line).padEnd(4)} ${text}`);
  if (github) console.log(`::warning file=${file},line=${line}::Placeholder à remplir : ${text}`);
}
if (!cvPresent) {
  console.log('\n  public/cv/cv.pdf absent : le lien CV est désactivé sur le site.');
  if (github) console.log('::warning::public/cv/cv.pdf absent : le lien CV est désactivé.');
}

process.exit(strict ? 1 : 0);
