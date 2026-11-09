// Image Open Graph 1200×630 générée au build à partir du contenu de l'accueil.
import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { getSingle } from '../lib/content';

const escapeXml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function wrap(text: string, max: number): string[] {
  const lines: string[] = [];
  let line = '';
  for (const word of text.split(/\s+/)) {
    if (line && (line + ' ' + word).length > max) {
      lines.push(line);
      line = word;
    } else {
      line = line ? `${line} ${word}` : word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

export const GET: APIRoute = async () => {
  const { titre, sousTitre } = await getSingle('accueil');
  const subtitle = wrap(sousTitre, 38)
    .map((l, i) => `<tspan x="96" dy="${i === 0 ? 0 : 58}">${escapeXml(l)}</tspan>`)
    .join('');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="#1a2430" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="#0b0f14"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <path d="M96 150h66l33-110 44 154 33-88h66" fill="none" stroke="#d4956a" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" transform="translate(0 92) scale(1 0.62)"/>
  <text x="96" y="300" font-family="Inter, 'Segoe UI', 'DejaVu Sans', Arial, sans-serif" font-size="76" font-weight="700" fill="#e2e8ef">${escapeXml(titre)}</text>
  <text x="96" y="390" font-family="Inter, 'Segoe UI', 'DejaVu Sans', Arial, sans-serif" font-size="44" font-weight="500" fill="#9fb0bf">${subtitle}</text>
  <rect x="0" y="618" width="1200" height="12" fill="#d4956a"/>
</svg>`;

  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
