import { defineCollection, reference, z } from "astro:content";

import { file } from "astro/loaders";

const categories = defineCollection({
  loader: file("src/data/categories.json"),
  schema: z.object({
    id: z.number(),
    name: z.string(),
  }),
});

const activities = defineCollection({
  loader: file("src/data/activities.json"),
  schema: z.object({
    id: z.number(),
    title: z.string(),
    category: reference("categories"),
    outdoor: z.boolean(),
    description: z.string(),
    duration: z.string(),
    audience: z.string(),
    number_of_participatns: z.number(),
    picture: z.string().optional(),
  }),
});

export const collections = { categories, activities };
