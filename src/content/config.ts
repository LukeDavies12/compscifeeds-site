import { z, defineCollection } from "astro:content";

const feedSchema = defineCollection({
  schema: z.object({
    title: z.string(),
    author: z.string(),
    htmlLink: z.string(),
    feedLink: z.string(),
    tags: z.array(z.string()),
    id: z.string()
  }),
});

export const collections = {
    feeds: feedSchema,
};