/**
 * The single source of truth for site identity.
 *
 * To move the site to a new domain, change `domain` below, then follow
 * DOMAIN.md (DNS at GoDaddy + `npm run set-domain`). Nothing else in the
 * codebase hard-codes the domain: canonical URLs, RSS, sitemap and the
 * generated CNAME file all derive from this value.
 */
export const SITE = {
  /** Custom domain (no protocol). Also applies to every GitHub Pages project
   *  repo on the account, e.g. /west-lake-dreams/. */
  domain: "www.aitolove.com",

  /** GitHub repo that hosts this site (used by `npm run set-domain`). */
  repo: "kidwise/kidwise.github.io",

  name: "kidwise",
  tagline: "Sharing my passion, and the thoughts along the way.",
  description:
    "kidwise's personal site — thoughts, projects, and things made with care.",

  /** Paths served by *other* GitHub Pages repos under this domain.
   *  The build fails if this site ever generates a page at one of them. */
  reservedPaths: ["west-lake-dreams"],

  social: [
    { label: "GitHub", href: "https://github.com/kidwise" },
  ],
} as const;

export const SITE_URL = `https://${SITE.domain}`;
