import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { SITE } from "../../site.config.ts";
import { getThoughts } from "../lib/content";

export async function GET(context: APIContext) {
  const posts = await getThoughts();
  return rss({
    title: `${SITE.name} — Thoughts`,
    description: SITE.description,
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.summary,
      link: `/thoughts/${p.id}/`,
      categories: p.data.tags,
    })),
  });
}
