// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// Define a schema for each collection you'd like to validate.
const blogCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        date: z.string(),
        description: z.string(),
        tags: z.array(z.string()),
    })
});
// Export a single `collections` object to register your collection(s)
export const collections = <const>{
    blog: blogCollection,
};