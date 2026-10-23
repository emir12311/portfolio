# Portfolio

Personal portfolio for Mehmet Emir Gündağ (`@emir12311`).

Astro 7 + TypeScript, static output, no client framework. All interactivity is small vanilla
scripts (theme toggle, scroll reveals, mobile menu).

## Getting started

Requires Node.js 22 or newer.

```bash
npm install
npm run dev        # dev server on http://127.0.0.1:4321
```

| Command           | What it does                                        |
| ----------------- | --------------------------------------------------- |
| `npm run dev`     | Start the dev server with hot reload                |
| `npm run check`   | Type-check and lint the Astro project               |
| `npm run build`   | Run `check`, then build the static site into `dist/` |
| `npm run preview` | Serve the built `dist/` locally                     |

`npm run build` is the gate that matters: it fails on type errors before producing output.

## Where content lives

**`src/content/site.ts` is the single source of truth for everything visible on the page.**
Name, handle, tagline, bio, meta tags, section order, projects, skills, contact links, and every
UI label (buttons, nav, theme names, footer, copyright) all come from this one file.

Components receive content as props. There is no user-facing copy in the `.astro` templates — if
you want to change wording, change it in `src/content/site.ts`, not in a component.

### Change the bio

Edit the `bio` field near the top of `src/content/site.ts`:

```ts
export const site: SiteContent = {
  name: 'Mehmet Emir Gündağ',
  handle: 'emir12311',
  tagline: '...',
  bio: "I'm a 10th-grade IT student ...",  // <-- here
```

The `name`, `handle`, `tagline`, and `meta` fields (page title + description) sit right beside it.

### Add a project

Two steps, both required for the card to show up:

1. **Add the image** to `public/media/projects/` (any webp/png you like — the existing ones are
   optimized WebP logos).
2. **Append an entry** to the `projects` array in `src/content/site.ts`:

```ts
{
  id: 'my-project',              // stable slug, used for heading/aria anchor ids
  name: 'my-project',
  summary: 'One or two sentences on what it does.',
  why: 'Why you built it.',
  tech: ['C', 'Make'],
  aiDirected: true,              // optional — adds the "AI-directed" badge
  media: {
    src: '/media/projects/my-project-logo.webp',   // path is relative to public/
    alt: 'my-project logo',
    width: 900,                  // intrinsic pixel size, prevents layout shift
    height: 900,
    tone: 'violet',              // 'gold' | 'violet' | 'green' — card stage color
  },
  links: [
    { kind: 'source',  href: 'https://github.com/emir12311/my-project' },
    { kind: 'release', href: 'https://github.com/emir12311/my-project/releases/latest' },
  ],
}
```

`kind: 'source'` renders with the `ui.links.source` label ("Repository"), `kind: 'release'` with
`ui.links.release` ("Latest release"). Reorder cards by reordering the array.

### Section order and visibility

The `sections` array in `src/content/site.ts` controls the home page and the nav. Order in the
array is order on the page; set `visible: false` to hide a section entirely (it also disappears
from the nav and gets no page):

```ts
{
  id: 'projects',            // 'projects' | 'about' | 'skills' | 'contact'
  label: "Things I've built", // big heading and the topic page's h1
  navLabel: 'Built',          // short label in the header nav
  path: '/projects',          // its own route
  visible: true,
},
```

Only those four section IDs are supported. A new kind of section needs a component, a branch in
`src/components/SectionRenderer.astro`, and a page file under `src/pages/`.

## Pages and routes

The home page stays a full overview: hero, marquee, then every visible section. The nav does not
scroll down the page — each nav item goes to a dedicated page that expands that one topic:

| Route        | Nav label | Page heading      | Contents                                  |
| ------------ | --------- | ----------------- | ----------------------------------------- |
| `/`          | —         | (hero)            | hero + marquee + all four sections        |
| `/projects`  | Built     | Things I've built | the `projects` array, full page           |
| `/about`     | About     | About             | `bio` + `tagline` aside                   |
| `/tools`     | Tools     | Tools I use       | the `skills` groups                       |
| `/contact`   | Say hi    | Say hi            | the `contact` links                       |

Each topic page reuses the same section component with `showHeading={false}`, so there is exactly
one copy of every string — the pages render the same data at full-page scale rather than
duplicating content. `PageIntro` supplies the page's `h1` and the `#top` anchor.

The header highlights the current route with `aria-current="page"`; `PageLayout` passes the
matching section id as `current`.

## Where design tokens live

`src/styles/tokens.css` — colors, fonts, type scale, spacing, motion, and layout widths. This is
the only place palette values are defined; component styles reference tokens rather than raw hex.

- There is no theme switch: the site follows the device. `color-scheme: light dark` is set on
  `:root` (and in a `<meta>`), and every colour goes through the CSS `light-dark()` function, so
  the OS preference picks the palette. Nothing is stored in localStorage.
- Project card "stage" colors are the `--tone-gold-*`, `--tone-violet-*`, and `--tone-green-*`
  tokens; they are fixed per tone, not sampled from the image.
- Fonts are self-hosted via `@fontsource` packages and declared with `@font-face` at the top of
  `tokens.css`.

Global reset, page grid, focus styles, reveal animation, and reduced-motion handling live in
`src/styles/global.css`.

## Media assets

- `public/media/projects/` — project card images
- `public/favicon.svg` — favicon (static file, colors are baked in, not tokenized)

Anything in `public/` is served from the site root, so `public/media/projects/x.webp` is referenced
as `/media/projects/x.webp`.

## Project structure

```
src/
  content/site.ts          all content + types  (edit content here)
  layouts/BaseLayout.astro  head, skip link, theme bootstrap
  layouts/PageLayout.astro  header + main + footer shell used by every route
  pages/index.astro         home: hero + marquee + every visible section
  pages/projects.astro      /projects
  pages/about.astro         /about
  pages/tools.astro         /tools
  pages/contact.astro       /contact
  components/               Header, Hero, Marquee, PageIntro, ProjectCard, sections, Footer, Icon
  styles/tokens.css         design tokens  (edit theme here)
  styles/global.css         reset, grid, focus, reveal, reduced motion
  scripts/reveal.ts         IntersectionObserver scroll reveals
public/
  favicon.svg
  media/projects/*.webp
```

## Accessibility and motion

- Skip link, semantic landmarks, one `h1` (hero), `h2` per section, `h3` per project
- Data-driven alt text on project images; decorative shapes and the duplicated marquee are
  `aria-hidden`
- Theme controls and the mobile disclosure are keyboard operable with visible focus and
  `aria-pressed` state
- All motion — the hero character cascade, masked tagline, section wipes, project cascades,
  marquee and hover choreography — is disabled under `prefers-reduced-motion: reduce`
- Scroll-linked effects (`animation-timeline: scroll()`, used for the shape parallax and the
  header progress bar) are progressive enhancement behind `@supports`, so browsers without
  support simply get the static layout
- With JavaScript off, all content still renders and the theme falls back to the system color
  scheme; only the theme toggle and scroll reveals stop working

## Deployment

The build output in `dist/` is plain static files and can be hosted anywhere. Production target is
**Cloudflare Workers** (Static Assets) at <https://emir12311.dev>, built from this GitHub repo.

`astro.config.mjs` sets `site: 'https://emir12311.dev'`, which drives the canonical link and
`og:url` in every page. `public/robots.txt` and `src/pages/sitemap.xml.ts` are generated from the
same `sections` data, so new sections appear in the sitemap automatically. `og:image` points at
`public/og.png` (1200×630).

`wrangler.toml` serves the build as Worker assets — no `main` entrypoint, so it deploys an
assets-only Worker:

```toml
name = "portfolio"
compatibility_date = "2026-10-23"

[assets]
directory = "./dist"
```

Cloudflare build settings (Workers Builds):

| Setting         | Value                                              |
| --------------- | -------------------------------------------------- |
| Build command   | `npm run build`                                    |
| Deploy command  | `npx wrangler deploy`                              |
| Node version    | pinned to 22 by `.node-version`                    |

Local check before pushing: `npx wrangler deploy --dry-run` reports the asset file count without
touching production.

Cloudflare **Pages** also works if preferred — same repo, build command `npm run build`, output
directory `dist`, or direct upload with `npx wrangler pages deploy dist --project-name=portfolio`.
