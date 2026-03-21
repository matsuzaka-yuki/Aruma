import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "zod";

const post = defineCollection({
	// Load Markdown and MDX files in the `src/content/post/` directory.
	loader: glob({ base: "./src/content/post", pattern: "**/*.{md,mdx}" }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			tags: z.array(z.string()).optional(),
			category: z.string().optional(),
			pinned: z.boolean().optional().default(false),
			priority: z.number().optional(),
		}),
});

const spec = defineCollection({
	// Load Markdown and MDX files in the `src/content/spec/` directory.
	loader: glob({ base: "./src/content/spec", pattern: "**/*.{md,mdx}" }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			heroImage: image().optional(),
		}),
});

export const collections = { post, spec };
