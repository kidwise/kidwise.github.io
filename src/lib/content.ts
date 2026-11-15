import { getCollection, type CollectionEntry } from "astro:content";

export type Thought = CollectionEntry<"thoughts">;
export type Project = CollectionEntry<"projects">;

export async function getThoughts(): Promise<Thought[]> {
  const all = await getCollection("thoughts", ({ data }) => import.meta.env.DEV || !data.draft);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getProjects(): Promise<Project[]> {
  const all = await getCollection("projects");
  return all.sort((a, b) => a.data.order - b.data.order || b.data.year - a.data.year);
}

export function readingTime(body = ""): string {
  const latin = body.split(/\s+/).filter(Boolean).length;
  const cjk = (body.match(/[㐀-鿿]/g) ?? []).length;
  const minutes = Math.max(1, Math.round(latin / 220 + cjk / 400));
  return `${minutes} min read`;
}

export function formatDate(d: Date, style: "long" | "short" = "long"): string {
  return d.toLocaleDateString("en-US", style === "long"
    ? { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }
    : { month: "short", day: "numeric", timeZone: "UTC" });
}

export function tagSlug(tag: string): string {
  return tag.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "");
}
