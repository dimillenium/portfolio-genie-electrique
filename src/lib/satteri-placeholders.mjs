// Plugin HAST pour Sätteri (moteur Markdown d'Astro 7) :
// entoure chaque [PLACEHOLDER] du Markdown d'un <mark class="ph"> visible.
import { hasPlaceholder, splitPlaceholders } from './placeholders.mjs';

const SKIP = new Set(['code', 'pre', 'kbd', 'samp', 'script', 'style', 'mark']);

/** @type {import('satteri').HastPluginDefinition} */
export const placeholderHighlight = {
  name: 'placeholder-highlight',
  text(node, ctx) {
    if (!hasPlaceholder(node.value)) return;

    // Ne touche pas au code ni à un placeholder déjà balisé
    /** @type {any} */
    let ancestor = ctx.parent(node);
    while (ancestor) {
      if (ancestor.type === 'element' && SKIP.has(ancestor.tagName)) return;
      ancestor = ctx.parent(ancestor);
    }

    ctx.replaceNode(
      node,
      splitPlaceholders(node.value).map((part) =>
        part.placeholder
          ? {
              type: 'element',
              tagName: 'mark',
              properties: { className: ['ph'] },
              children: [{ type: 'text', value: part.text }],
            }
          : { type: 'text', value: part.text },
      ),
    );
  },
};
