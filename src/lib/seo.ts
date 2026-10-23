import type { SectionId } from '../content/site';
import { site } from '../content/site';

const SITE_URL = 'https://emir12311.dev/';

/** Directory-style absolute URL, matching the canonicals and the sitemap. */
export const absoluteUrl = (path: string): string =>
  path === '/' ? SITE_URL : new URL(`${path}/`, SITE_URL).href;

const githubUrl =
  site.contact.find((item) => item.kind === 'github')?.href ?? 'https://github.com/emir12311';

const firstSentence = (text: string): string => {
  const match = text.match(/^[^.!?]+[.!?]/);
  return (match ? match[0] : text).trim();
};

/** Descriptive text only, derived from data already in site.ts — nothing authored here. */
export const pageDescription = (id: SectionId | '/'): string => {
  if (id === '/') return site.meta.description;

  if (id === 'projects') {
    const names = site.projects.map((project) => project.name).join(', ');
    return `${site.projects.length} projects — ${names}. ${site.tagline}`;
  }

  if (id === 'about') return firstSentence(site.bio);

  if (id === 'skills') {
    const groups = site.skills.map((group) => `${group.label}: ${group.items.join(', ')}`);
    return `Tools I use — ${groups.join('. ')}.`;
  }

  return `Get in touch with ${site.name} — ${site.contact.map((item) => item.label).join(', ')}.`;
};

export type PageKind = 'WebPage' | 'ProfilePage' | 'CollectionPage' | 'ContactPage';

/** Only real programming languages, so `programmingLanguage` isn't padded with frameworks. */
const LANGUAGE_NAMES = ['c', 'rust', 'typescript', 'javascript', 'python'];

const personNode = () => ({
  '@type': 'Person',
  '@id': `${SITE_URL}#person`,
  name: site.name,
  alternateName: site.handle,
  url: SITE_URL,
  description: site.bio,
  knowsAbout: site.skills.flatMap((group) => group.items),
  sameAs: [githubUrl],
});

const websiteNode = () => ({
  '@type': 'WebSite',
  '@id': `${SITE_URL}#website`,
  url: SITE_URL,
  name: site.name,
  description: site.meta.description,
  inLanguage: 'en',
  publisher: { '@id': `${SITE_URL}#person` },
});

interface WebPageInput {
  path: string;
  name: string;
  description: string;
  kind: PageKind;
}

const webPageNode = ({ path, name, description, kind }: WebPageInput) => ({
  '@type': kind,
  '@id': `${absoluteUrl(path)}#webpage`,
  url: absoluteUrl(path),
  name,
  description,
  inLanguage: 'en',
  isPartOf: { '@id': `${SITE_URL}#website` },
  about: { '@id': `${SITE_URL}#person` },
});

const breadcrumbNode = (path: string, name: string) => ({
  '@type': 'BreadcrumbList',
  '@id': `${absoluteUrl(path)}#breadcrumb`,
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name, item: absoluteUrl(path) },
  ],
});

const projectNode = (projectId: string) => {
  const project = site.projects.find((item) => item.id === projectId);
  if (!project) return null;

  const source = project.links.find((link) => link.kind === 'source')?.href;
  const languages = project.tech.filter((tech) =>
    LANGUAGE_NAMES.includes(tech.toLowerCase()),
  );
  const license = project.detail.facts.find((fact) => fact.label === 'License')?.value;

  return {
    '@type': 'SoftwareSourceCode',
    '@id': `${absoluteUrl('/projects')}#detail-${project.id}`,
    name: project.name,
    description: project.summary,
    abstract: project.detail.what,
    url: `${absoluteUrl('/projects')}#detail-${project.id}`,
    ...(source ? { codeRepository: source } : {}),
    ...(languages.length > 0 ? { programmingLanguage: languages } : {}),
    ...(license ? { license } : {}),
    keywords: project.tech.join(', '),
    author: { '@id': `${SITE_URL}#person` },
    isPartOf: { '@id': `${absoluteUrl('/projects')}#webpage` },
  };
};

export interface PageSchemaInput extends WebPageInput {}

export const buildGraph = (input: PageSchemaInput) => {
  const graph: Record<string, unknown>[] = [
    personNode(),
    websiteNode(),
    webPageNode(input),
  ];

  if (input.path !== '/') graph.push(breadcrumbNode(input.path, input.name));

  if (input.path === '/projects') {
    for (const project of site.projects) {
      const node = projectNode(project.id);
      if (node) graph.push(node);
    }
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
};
