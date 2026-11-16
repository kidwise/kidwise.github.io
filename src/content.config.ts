import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const thoughts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/thoughts" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string(),
    /** Optional cover image in public/, e.g. "/projects/west-lake-dreams.jpg" */
    cover: z.string().optional(),
    /** Built-in illustrated card art, used when there is no cover */
    art: z.enum(["west-lake", "los-gatos"]).optional(),
    url: z.string(),
    repo: z.string().optional(),
    year: z.number(),
    status: z.enum(["active", "shipped", "archived"]).default("active"),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(100),
  }),
});

export const collections = { thoughts, projects };
