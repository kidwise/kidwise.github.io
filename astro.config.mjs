// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SITE, SITE_URL } from "./site.config.ts";

/** Writes CNAME from site.config.ts and guards paths owned by other repos. */
function domainGuard() {
  return {
    name: "domain-guard",
    hooks: {
      "astro:build:done": ({ dir }) => {
        const out = fileURLToPath(dir);
        for (const p of SITE.reservedPaths) {
          if (fs.existsSync(path.join(out, p))) {
            throw new Error(
              `/${p}/ is served by a separate GitHub Pages repo; this site must not generate it.`,
            );
          }
        }
        fs.writeFileSync(path.join(out, "CNAME"), SITE.domain + "\n");
      },
    },
  };
}

export default defineConfig({
  site: SITE_URL,
  trailingSlash: "ignore",
  integrations: [mdx(), sitemap(), domainGuard()],
  markdown: {
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark-dimmed" },
    },
  },
});
