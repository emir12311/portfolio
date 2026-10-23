import type { APIRoute } from 'astro';
import { site } from '../content/site';

export const prerender = true;

export const GET: APIRoute = ({ site: siteUrl }) => {
  const base = siteUrl ?? new URL('https://emir12311.dev');

  // Directory-style URLs, matching the canonical links and the sitemap.
  const page = (path: string) =>
    path === '/' ? new URL('/', base).href : new URL(`${path}/`, base).href;

  const repo = (id: string) =>
    site.projects
      .find((project) => project.id === id)
      ?.links.find((item) => item.kind === 'source')?.href ?? '';

  const visibleSections = site.sections.filter((section) => section.visible);
  const lines: string[] = [];

  lines.push(`# ${site.name}`, '');
  lines.push(`> ${site.tagline}`, '');
  lines.push(site.bio, '');

  lines.push('## Pages', '');
  lines.push(`- [${site.name}](${page('/')}): home page, every section on one page.`);
  for (const section of visibleSections) {
    if (section.id === 'projects') {
      lines.push(
        `- [${section.label}](${page(section.path)}): ${site.projects.length} projects — ${site.projects
          .map((project) => project.name)
          .join(', ')}.`,
      );
    } else if (section.id === 'skills') {
      lines.push(
        `- [${section.label}](${page(section.path)}): ${site.skills
          .map((group) => group.label)
          .join(', ')}.`,
      );
    } else if (section.id === 'contact') {
      lines.push(
        `- [${section.label}](${page(section.path)}): ${site.contact
          .map((item) => item.label)
          .join(', ')}.`,
      );
    } else {
      lines.push(`- [${section.label}](${page(section.path)}): bio and tagline.`);
    }
  }
  lines.push('');

  lines.push('## Projects', '');
  for (const project of site.projects) {
    lines.push(`- [${project.name}](${page('/projects')}#detail-${project.id}): ${project.summary}`);
    lines.push(`  - Built with: ${project.tech.join(', ')}.`);
    lines.push(`  - Source: ${repo(project.id)}`);
    const release = project.links.find((item) => item.kind === 'release')?.href;
    if (release) {
      lines.push(`  - Latest release: ${release}`);
    }
  }
  lines.push('');

  lines.push('## Contact', '');
  for (const item of site.contact) {
    lines.push(`- ${item.label}: ${item.href}`);
  }
  lines.push('');

  return new Response(`${lines.join('\n')}`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
