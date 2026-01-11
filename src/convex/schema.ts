import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';
import { defaultUsers } from 'workos-convex-sveltekit/schema';

export default defineSchema({
	users: defaultUsers(v),

	blogPosts: defineTable({
		title: v.string(),
		slug: v.string(),
		content: v.string(), // Markdown or HTML
		excerpt: v.optional(v.string()),
		featuredImageStorageId: v.optional(v.id('_storage')),
		featuredImageUrl: v.optional(v.string()),
		authorId: v.id('users'),
		status: v.union(v.literal('draft'), v.literal('published')),
		tags: v.array(v.string()),
		publishedAt: v.optional(v.number()),
		createdAt: v.number(),
		updatedAt: v.number()
	})
		.index('by_slug', ['slug'])
		.index('by_status', ['status'])
		.index('by_author', ['authorId'])
		.index('by_published_at', ['publishedAt'])
		.index('by_created_at', ['createdAt'])
});
