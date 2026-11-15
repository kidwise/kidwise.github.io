# kidwise.github.io

Personal site of **kidwise**: thoughts and projects. Built with [Astro](https://astro.build),
deployed to GitHub Pages at the domain in [`site.config.ts`](site.config.ts).

## Everyday use

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # static output in dist/
```

**Write a thought:** add `src/content/thoughts/my-post.md`

```md
---
title: "My post"
date: 2026-11-15
summary: "One line shown in lists and RSS."
tags: ["notes"]
draft: false        # true = only visible in `npm run dev`
---
```

**Add a project:** add `src/content/projects/name.md` (see `west-lake-dreams.md` for the fields).
A project that is its own GitHub Pages repo can use a relative `url` like `/repo-name/`,
which follows the custom domain automatically. Also add it to `reservedPaths` in `site.config.ts`.

Pushing to `main` deploys automatically.

## Where things live

| Path | What |
|---|---|
| `site.config.ts` | Name, tagline, domain, social links. **Single source of truth.** |
| `src/styles/global.css` | Design tokens (colors, fonts, spacing) at the top |
| `src/components/InkHills.astro` | The ink-wash landscape illustration |
| `src/pages/` | Home, Thoughts, Projects, About, RSS, 404 |
| `DOMAIN.md` | How to change domains / DNS (GoDaddy) |
