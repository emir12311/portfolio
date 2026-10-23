# Handoff

## Project

Personal portfolio for **Mehmet Emir Gündağ** (`@emir12311`).

- Location: `/home/emir12311/portfolio`
- Stack: Astro 7.4.2 + TypeScript 6.0.3, static output
- Package manager: npm
- No Git repository initialized
- No framework runtime beyond Astro; all interactivity is small vanilla scripts
- Current date: 2026-10-23

The site is functional and builds successfully. It is **not fully finished**: the README, final accessibility pass, and final content-first presentation still need to be completed.

## User-approved content decisions

Do not replace these with placeholder or invented content.

- Header display: full name **Mehmet Emir Gündağ** + handle **@emir12311**
- Tagline: **Building software, learning C, and directing AI.**
- Bio:
  > I'm a 10th-grade IT student who's been interested in technical things like software development since I was 10. I started actually making software around the start of 9th grade, beginning with Python. Right now I'm working on getting better at C and at directing AI so I can build better software, faster.
- Projects: **croquis**, **lnetx**, **webp-purger**
- Project links: GitHub repository + latest release for each
- Project logos: the logos committed in each repo, used as card visuals
- AI disclosure: a small **AI-directed** tag on the croquis card only
- Public links: GitHub, email, Discord
  - GitHub: `https://github.com/emir12311`
  - Email: `emir12311.dev@gmail.com`
  - Discord profile: `https://discord.com/users/734725759427412038`
- Intentionally omitted: itch.io, resume, blog/writing section, "now" page
- Labels/nav voice: hobbyist and personal
- Theme: auto by default, with Light and Dark overrides
- Visual direction: editorial maximalism inspired by Omarchy, but original
- No rounded corners
- Full-maximalist motion requested, while respecting reduced-motion settings
- No Omarchy code, copy, layout, or assets were copied. Omarchy was only a visual reference.

### Skill groups

- Comfortable: Python, Linux, Git, PyQt
- Learning: C, Clang, Make, AI directing
- Exploring: Godot, Networking / TCP, Rust

## Source of truth

**`src/content/site.ts` is the single content source.**

It contains:

- name, handle, tagline, bio
- page title and meta description
- section order and visibility
- project names, summaries, "why I built it", tech tags, media paths, alt text, and links
- skill groups and items
- contact links and visible values
- every visible UI label, button label, theme label, footer label, and copyright string

Components receive content through props. Do not put user-facing copy back into JSX/templates.

Visible values generated from data or position:

- `@` prefix before the handle
- section numbers (`01`, `02`, ...)
- project numbers
- footer copyright is currently stored as a literal string in `ui.copyright`

### How to edit

- Change the name, handle, tagline, or bio: edit the top-level fields in `src/content/site.ts`
- Add/reorder projects: edit the `projects` array
- Add project images: put files in `public/media/projects/`, then add `src`, `alt`, `width`, `height`, and `tone` to the project's `media`
- Hide or reorder sections: edit the `sections` array; set `visible: false` to hide one
- Change nav labels vs. section headings: `sections[].navLabel` and `sections[].label`
- Change button/link labels: `ui.links`, `ui.projectWhy`, `ui.projectTech`, `ui.aiBadge`, etc.
- Change footer copy: `ui.copyright`
- Change theme labels/modes: `ui.theme`

## Architecture

```
src/
  content/site.ts             all user content + TypeScript types
  layouts/BaseLayout.astro    document head, skip link, theme bootstrap, reveal script
  pages/index.astro           maps visible data sections through SectionRenderer
  components/
    Header.astro              brand, desktop nav, mobile disclosure, theme toggle
    ThemeToggle.astro         auto/light/dark switch + localStorage persistence
    Hero.astro                animated name, tagline, primary links, shapes
    Marquee.astro             aria-hidden skills ticker
    SectionHeading.astro      numbered section headings
    ProjectCard.astro         project spread, logo stage, tech tags, links
    ProjectsSection.astro     projects section wrapper
    AboutSection.astro        bio + tagline aside
    SkillsSection.astro       three confidence groups
    ContactSection.astro      GitHub/email/Discord rows
    Footer.astro              inverted name wordmark + back-to-top
    SectionRenderer.astro     maps section ids to section components
    Icon.astro                inline SVG icons
  styles/
    tokens.css                colors, fonts, type, spacing, motion, layout tokens
    global.css                reset, page grid, focus, reveal, reduced motion
  scripts/reveal.ts           IntersectionObserver reveal logic
public/
  favicon.svg
  media/projects/*.webp       optimized project logos
```

Astro components are the component layer. There is no React/Svelte runtime.

## Design system

Tokens live only in `src/styles/tokens.css`.

- Fonts: self-hosted **Bricolage Grotesque Variable** (including latin-ext for `ğ`) and **IBM Plex Mono**
- Themes: `light-dark()` CSS function plus `data-theme` on `<html>`
- Theme preference stored under `portfolio-theme`
- Auto default resolves from `prefers-color-scheme`
- Accent colors are informed by the project logos: acid green, violet, gold
- Project media stages use fixed tone tokens: gold, violet, green
- No rounded corners are used by the layout
- No scattered hex values in component styles; edit palette values in `tokens.css`
- `favicon.svg` is a static brand asset and contains fixed colors outside the CSS token system

## Motion and interaction

- Hero characters stagger in with CSS
- Decorative hero/about/contact shapes use CSS keyframes
- Section headings and cards reveal on scroll via `IntersectionObserver`
- Skills marquee is pure CSS, duplicated for a seamless loop, and `aria-hidden`
- Hover effects on project cards, skill rows, contact rows, and buttons
- `prefers-reduced-motion: reduce` is handled in global CSS and component CSS
- Theme switching persists and responds to system changes while in Auto
- Mobile menu uses native `<details>`; closes on link click, outside click, and Escape
- No cursor hijacking, scroll hijacking, or animation libraries

## Accessibility notes already implemented

- Skip link
- Semantic header/nav/main/section/footer landmarks
- H1 only in hero; section headings are H2; project names H3
- Project images have data-driven alt text
- Keyboard-operable theme controls and mobile disclosure
- Visible focus outlines
- `aria-pressed` on theme controls
- `aria-hidden` for duplicated marquee content and decorative shapes
- Decorative numbers marked aria-hidden
- External project/contact links are ordinary anchors, no new-tab surprises

## Verification completed

- `npm run check` passes (0 errors, 0 warnings, 0 hints)
- `npm run build` passes and generates `dist/`
- Browser-tested with Chromium + Playwright at:
  - 1440px desktop, light and dark
  - 390px mobile, dark
- No horizontal overflow at those sizes
- All three project images loaded after scrolling
- All expected links were present
- Scroll reveals fired for all sections when scrolling
- Theme toggle switched pages between light and dark
- Note: a raw full-page screenshot can show lower sections hidden until scrolled because reveal elements are intentionally hidden until observed. Scroll through the page before capturing full-page verification images.

Screenshots from this session were written under `/tmp/opencode/` and may be ephemeral.

## Required remaining work

### 1. README

The original request requires a short README explaining:

- how to install and run the project
- exactly where to add a new project
- exactly where to change the bio
- where section order/visibility lives
- where theme tokens live
- where media assets live
- build/preview commands

Do not add content that contradicts `src/content/site.ts`.

### 2. Final accessibility and visual QA

Still worth doing:

- keyboard-only pass: skip link, nav, mobile menu, theme switch, project/contact links, footer
- screen-reader spot check for heading order and link names
- contrast check in both themes
- test at 320px, 360px, 768px, 1024px, 1440px, 1920px
- verify reduced-motion mode disables marquee/shapes/hero animation and still shows all sections
- verify no-JS behavior: content remains visible; theme falls back to system color scheme; toggle is non-functional
- consider adding `aria-current` to active nav items if desired
- consider making `ui.copyright` dynamic, but keep the visible text in data if changed

### 3. Final content-first presentation

The original user asked to see:

1. `src/content/site.ts` first, so they can confirm nothing was invented
2. the components after that

Do not lead with screenshots or component code. The content file must be shown first.

### 4. Deployment

No domain or deployment target was provided. No canonical URL, sitemap, robots file, or OG image was added. If the user provides a domain, add those. Current `dist/` is a static site.

## Known caveats

- `src/content/site.ts` includes an approved tagline and lightly tightened bio/project copy. Do not rewrite them further without user approval.
- Croquis copy has an `AI-directed` tag because the user explicitly requested it.
- `lnetx` and `webp-purger` are text/link cards with logos; no live demo links were provided.
- The site currently supports only four section IDs: `projects`, `about`, `skills`, `contact`. Adding a blog or "now" section later requires a new section component and a branch in `SectionRenderer.astro`.
- The project logo stage colors are fixed tone tokens, not derived automatically from each image.
- The headless Chromium screenshots showed a small floating browser overlay near the center; it is external to the site, not part of the build.
- The site has not been deployed.
- There is no Git history to inspect.

## Commands

From `/home/emir12311/portfolio`:

```bash
npm install
npm run dev
npm run check
npm run build
npm run preview
```

The development server was started during verification on `127.0.0.1:4321`. Stop any lingering dev server before starting a new one.

## Key external data

- GitHub profile: `https://github.com/emir12311`
- Discord profile: `https://discord.com/users/734725759427412038`
- Croquis repo: `https://github.com/emir12311/croquis`
- Croquis releases: `https://github.com/emir12311/croquis/releases/latest`
- lnetx repo: `https://github.com/emir12311/lnetx`
- lnetx releases: `https://github.com/emir12311/lnetx/releases/latest`
- webp-purger repo: `https://github.com/emir12311/webp-purger`
- webp-purger releases: `https://github.com/emir12311/webp-purger/releases/latest`
- Omarchy design reference: `https://omarchy.org/`
- Omarchy source reference: `https://github.com/omacom/omarchy-site`
- No license file was present in the cloned Omarchy source at handoff time. Treat it as reference-only.

## Immediate next action

Write `README.md`, then run `npm run check` and `npm run build`, then present the content file before the components.
