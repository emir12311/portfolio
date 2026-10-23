import type { APIRoute } from 'astro';
import { site } from '../content/site';

export const prerender = true;

export const GET: APIRoute = ({ site: siteUrl }) => {
  const base = siteUrl ?? new URL('https://emir12311.dev');
  const paths = ['/', ...site.sections.filter((section) => section.visible).map((section) => section.path)];

  // No <lastmod>: there is no reliable per-page modification signal here (no dates in
  // the content, and a build timestamp would claim every page changed on every deploy).
  // A wrong lastmod is worse than a missing one, so it is omitted on purpose.
  const entries = paths
    .map((path) => {
      // Astro emits directory-style URLs, so the canonical form is `/projects/`.
      const href = path === '/' ? new URL('/', base).href : new URL(`${path}/`, base).href;

      return `  <url>\n    <loc>${href}</loc>\n  </url>`;
    })
    .join('\n');

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    entries,
    '</urlset>',
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
