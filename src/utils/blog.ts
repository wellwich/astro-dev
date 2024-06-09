import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

export type Collections = CollectionEntry<"posts">[];

export async function getBlogs() {
    const posts = await getCollection("posts");

    return sortByDate(posts);
}

export function sortByDate(collections: Collections) {
    return collections.sort(
        (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
    );
}

export function parseTags(tags: string | string[]) {
    if (typeof tags === 'string') {
        return tags.split(",").map((v) => v.trim());
    } else if (Array.isArray(tags)) {
        return tags.map((v) => v.trim());
    } else {
        throw new Error('Invalid tags input. Expected string or string array.');
    }
}

export function getAllTags(collections: Collections) {
    return [
        ...new Set(
            collections
                .map((post) => parseTags(post.data.tags))
                .flat()
                .sort((a, b) => a.length - b.length),
        ),
    ];
}