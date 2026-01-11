import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { requireBlog } from './helpers';
import type { QueryCtx, MutationCtx } from './_generated/server';
import type { Id } from './_generated/dataModel';

/**
	* Generate slug from title
 */
function generateSlug(title: string): string {
	return title
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '') // Remove special characters
		.replace(/\s+/g, '-') // Replace spaces with hyphens
		.replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
}

/**
	* Check if slug is unique
 */
async function isSlugUnique(
	ctx: QueryCtx,
	slug: string,
	excludeId?: Id<'blogPosts'>
): Promise<boolean> {
	const existing = await ctx.db
		.query('blogPosts')
		.withIndex('by_slug', (q) => q.eq('slug', slug))
		.first();

	if (!existing) return true;
	if (excludeId && existing._id === excludeId) return true;
	return false;
}

/**
	* Generate excerpt from content if not provided
 */
function generateExcerpt(content: string, maxLength: number = 160): string {
	// Remove markdown formatting
	const plainText = content.replace(/[#*`_~\[\]()]/g, '').trim();
	if (plainText.length <= maxLength) return plainText;
	return plainText.substring(0, maxLength).trim() + '...';
}

/**
	* Resolve featured image URL from storage ID
 */
async function resolveFeaturedImageUrl(
	ctx: MutationCtx,
	storageId: Id<'_storage'> | undefined
): Promise<string | undefined> {
	if (!storageId) return undefined;
	try {
		const url = await ctx.storage.getUrl(storageId);
		return url ?? undefined;
	} catch (err) {
		console.error(`Failed to resolve image URL for ${storageId}:`, err);
		return undefined;
	}
}

// Create post
export const createPost = mutation({
	args: {
		title: v.string(),
		slug: v.optional(v.string()),
		content: v.string(),
		excerpt: v.optional(v.string()),
		featuredImageStorageId: v.optional(v.id('_storage')),
		featuredImageUrl: v.optional(v.string()),
		tags: v.array(v.string()),
		status: v.union(v.literal('draft'), v.literal('published'))
	},
	handler: async (ctx, args) => {
		const user = await requireBlog(ctx);

		// Generate slug from title if not provided
		let slug = args.slug || generateSlug(args.title);

		// Ensure slug is unique
		if (!(await isSlugUnique(ctx, slug))) {
			// Append number if slug exists
			let counter = 1;
			let uniqueSlug = `${slug}-${counter}`;
			while (!(await isSlugUnique(ctx, uniqueSlug))) {
				counter++;
				uniqueSlug = `${slug}-${counter}`;
			}
			slug = uniqueSlug;
		}

		// Generate excerpt if not provided
		const excerpt = args.excerpt || generateExcerpt(args.content);

		// Resolve featured image URL if storage ID provided but URL not provided
		let featuredImageUrl = args.featuredImageUrl;
		if (!featuredImageUrl && args.featuredImageStorageId) {
			featuredImageUrl = await resolveFeaturedImageUrl(ctx, args.featuredImageStorageId);
		}

		const now = Date.now();
		const publishedAt = args.status === 'published' ? now : undefined;

		const postId = await ctx.db.insert('blogPosts', {
			title: args.title,
			slug,
			content: args.content,
			excerpt,
			featuredImageStorageId: args.featuredImageStorageId,
			featuredImageUrl,
			authorId: user._id,
			status: args.status,
			tags: args.tags,
			publishedAt,
			createdAt: now,
			updatedAt: now
		});

		return postId;
	}
});

// Update post
export const updatePost = mutation({
	args: {
		id: v.id('blogPosts'),
		title: v.optional(v.string()),
		slug: v.optional(v.string()),
		content: v.optional(v.string()),
		excerpt: v.optional(v.string()),
		featuredImageStorageId: v.optional(v.id('_storage')),
		featuredImageUrl: v.optional(v.string()),
		tags: v.optional(v.array(v.string())),
		status: v.optional(v.union(v.literal('draft'), v.literal('published')))
	},
	handler: async (ctx, args) => {
		const user = await requireBlog(ctx);

		// Verify post exists
		const post = await ctx.db.get(args.id);
		if (!post) {
			throw new Error('Post not found');
		}

		const updates: any = {
			updatedAt: Date.now()
		};

		// Handle slug uniqueness if slug changed
		if (args.slug !== undefined && args.slug !== post.slug) {
			if (!(await isSlugUnique(ctx, args.slug, args.id))) {
				throw new Error('Slug already exists');
			}
			updates.slug = args.slug;
		}

		// Update publishedAt if status changes to 'published'
		if (args.status !== undefined) {
			updates.status = args.status;
			if (args.status === 'published' && !post.publishedAt) {
				updates.publishedAt = Date.now();
			}
		}

		// Update other fields
		if (args.title !== undefined) updates.title = args.title;
		if (args.content !== undefined) {
			updates.content = args.content;
			// Regenerate excerpt if content changed and excerpt not provided
			if (args.excerpt === undefined) {
				updates.excerpt = generateExcerpt(args.content);
			}
		}
		if (args.excerpt !== undefined) updates.excerpt = args.excerpt;

		// Handle featured image updates
		if (args.featuredImageStorageId !== undefined) {
			updates.featuredImageStorageId = args.featuredImageStorageId;
			// Resolve URL if storage ID changed but URL not explicitly provided
			if (args.featuredImageUrl === undefined) {
				updates.featuredImageUrl = await resolveFeaturedImageUrl(ctx, args.featuredImageStorageId);
			} else {
				updates.featuredImageUrl = args.featuredImageUrl;
			}
		} else if (args.featuredImageUrl !== undefined) {
			// URL explicitly provided without storage ID change
			updates.featuredImageUrl = args.featuredImageUrl;
		}

		if (args.tags !== undefined) updates.tags = args.tags;

		await ctx.db.patch(args.id, updates);

		return args.id;
	}
});

// Delete post
export const deletePost = mutation({
	args: {
		id: v.id('blogPosts')
	},
	handler: async (ctx, args) => {
		await requireBlog(ctx);

		// Verify post exists
		const post = await ctx.db.get(args.id);
		if (!post) {
			throw new Error('Post not found');
		}

		// Hard delete
		await ctx.db.delete(args.id);

		return args.id;
	}
});

// Get post by slug (public for published, blog role for drafts)
export const getPostBySlug = query({
	args: {
		slug: v.string()
	},
	handler: async (ctx, args) => {
		const post = await ctx.db
			.query('blogPosts')
			.withIndex('by_slug', (q) => q.eq('slug', args.slug))
			.first();

		if (!post) {
			return null;
		}

		// If published, allow public access
		if (post.status === 'published') {
			// Get author information
			const author = await ctx.db.get(post.authorId);
			return {
				...post,
				author: author
					? {
							_id: author._id,
							name: author.name,
							firstName: author.firstName,
							lastName: author.lastName,
							email: author.email,
							profilePictureUrl: author.profilePictureUrl
						}
					: null
			};
		}

		// If draft, require blog role authentication
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			return null; // Don't reveal that post exists
		}

		const user = await ctx.db
			.query('users')
			.withIndex('by_workos_user_id', (q) => q.eq('workosUserId', identity.subject))
			.unique();

		if (!user || !user.roles?.includes('blog')) {
			return null; // Don't reveal that post exists
		}

		// Get author information
		const author = await ctx.db.get(post.authorId);
		return {
			...post,
			author: author
				? {
						_id: author._id,
						name: author.name,
						firstName: author.firstName,
						lastName: author.lastName,
						email: author.email,
						profilePictureUrl: author.profilePictureUrl
					}
				: null
		};
	}
});

// Get post by ID (blog role only)
export const getPostById = query({
	args: {
		id: v.id('blogPosts')
	},
	handler: async (ctx, args) => {
		await requireBlog(ctx);

		const post = await ctx.db.get(args.id);
		if (!post) {
			return null;
		}

		// Get author information
		const author = await ctx.db.get(post.authorId);
		return {
			...post,
			author: author
				? {
						_id: author._id,
						name: author.name,
						firstName: author.firstName,
						lastName: author.lastName,
						email: author.email,
						profilePictureUrl: author.profilePictureUrl
					}
				: null
		};
	}
});

// Get all posts (blog role only)
export const getAllPosts = query({
	args: {
		status: v.optional(v.union(v.literal('draft'), v.literal('published'))),
		authorId: v.optional(v.id('users')),
		limit: v.optional(v.number()),
		orderBy: v.optional(
			v.union(v.literal('createdAt'), v.literal('updatedAt'), v.literal('publishedAt'))
		),
		order: v.optional(v.union(v.literal('asc'), v.literal('desc')))
	},
	handler: async (ctx, args) => {
		await requireBlog(ctx);

		// Apply ordering
		const orderBy = args.orderBy || 'createdAt';
		const order = args.order || 'desc';

		let posts;

		// Apply filters and ordering
		if (args.status) {
			const status = args.status; // Narrow the type
			posts = await ctx.db
				.query('blogPosts')
				.withIndex('by_status', (q) => q.eq('status', status))
				.collect();
		} else if (args.authorId) {
			const authorId = args.authorId; // Narrow the type
			posts = await ctx.db
				.query('blogPosts')
				.withIndex('by_author', (q) => q.eq('authorId', authorId))
				.collect();
		} else if (orderBy === 'publishedAt') {
			posts = await ctx.db.query('blogPosts').withIndex('by_published_at').order(order).collect();
		} else if (orderBy === 'createdAt') {
			posts = await ctx.db.query('blogPosts').withIndex('by_created_at').order(order).collect();
		} else {
			posts = await ctx.db.query('blogPosts').collect();
		}

		// Sort by updatedAt manually if needed
		if (orderBy === 'updatedAt') {
			posts.sort((a, b) => {
				if (order === 'desc') {
					return b.updatedAt - a.updatedAt;
				}
				return a.updatedAt - b.updatedAt;
			});
		}

		// Apply limit
		if (args.limit) {
			posts = posts.slice(0, args.limit);
		}

		// Get author information for each post
		const postsWithAuthors = await Promise.all(
			posts.map(async (post) => {
				const author = await ctx.db.get(post.authorId);
				return {
					...post,
					author: author
						? {
								_id: author._id,
								name: author.name,
								firstName: author.firstName,
								lastName: author.lastName,
								email: author.email,
								profilePictureUrl: author.profilePictureUrl
							}
						: null
				};
			})
		);

		return postsWithAuthors;
	}
});

// Get blog statistics (blog role only)
export const getBlogStats = query({
	args: {},
	handler: async (ctx) => {
		await requireBlog(ctx);

		const allPosts = await ctx.db.query('blogPosts').collect();

		const stats = {
			total: allPosts.length,
			byStatus: {
				draft: 0,
				published: 0
			},
			recentCount: 0
		};

		const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

		for (const post of allPosts) {
			// Count by status
			if (post.status === 'draft') stats.byStatus.draft++;
			else if (post.status === 'published') stats.byStatus.published++;

			// Count recent (last 7 days)
			if (post.createdAt >= sevenDaysAgo) {
				stats.recentCount++;
			}
		}

		return stats;
	}
});

// Get recent blog posts (blog role only)
export const getRecentPosts = query({
	args: {
		limit: v.optional(v.number())
	},
	handler: async (ctx, args) => {
		await requireBlog(ctx);
		const limit = args.limit ?? 10;
		const posts = await ctx.db
			.query('blogPosts')
			.withIndex('by_created_at')
			.order('desc')
			.take(limit);

		// Get author information for each post
		const postsWithAuthors = await Promise.all(
			posts.map(async (post) => {
				const author = await ctx.db.get(post.authorId);
				return {
					...post,
					author: author
						? {
								_id: author._id,
								name: author.name,
								firstName: author.firstName,
								lastName: author.lastName,
								email: author.email,
								profilePictureUrl: author.profilePictureUrl
							}
						: null
				};
			})
		);

		return postsWithAuthors;
	}
});

// Get published posts (public)
export const getPublishedPosts = query({
	args: {
		limit: v.optional(v.number()),
		tags: v.optional(v.array(v.string())),
		search: v.optional(v.string())
	},
	handler: async (ctx, args) => {
		// Get all published posts
		const posts = await ctx.db
			.query('blogPosts')
			.withIndex('by_status', (q) => q.eq('status', 'published'))
			.collect();

		// Filter by tags if provided
		let filteredPosts = posts;
		if (args.tags && args.tags.length > 0) {
			filteredPosts = posts.filter((post) => {
				return args.tags!.some((tag) => post.tags.includes(tag));
			});
		}

		// Filter by search query if provided
		if (args.search) {
			const searchLower = args.search.toLowerCase();
			filteredPosts = filteredPosts.filter((post) => {
				return (
					post.title.toLowerCase().includes(searchLower) ||
					post.content.toLowerCase().includes(searchLower) ||
					post.excerpt?.toLowerCase().includes(searchLower)
				);
			});
		}

		// Sort by publishedAt descending (newest first)
		filteredPosts.sort((a, b) => {
			const aDate = a.publishedAt || 0;
			const bDate = b.publishedAt || 0;
			return bDate - aDate;
		});

		// Apply limit
		if (args.limit) {
			filteredPosts = filteredPosts.slice(0, args.limit);
		}

		// Get author information for each post
		const postsWithAuthors = await Promise.all(
			filteredPosts.map(async (post) => {
				const author = await ctx.db.get(post.authorId);
				return {
					...post,
					author: author
						? {
								_id: author._id,
								name: author.name,
								firstName: author.firstName,
								lastName: author.lastName,
								email: author.email,
								profilePictureUrl: author.profilePictureUrl
							}
						: null
				};
			})
		);

		return postsWithAuthors;
	}
});

// Search posts (blog role only)
export const searchPosts = query({
	args: {
		query: v.string(),
		status: v.optional(v.union(v.literal('draft'), v.literal('published')))
	},
	handler: async (ctx, args) => {
		await requireBlog(ctx);

		let posts;
		if (args.status) {
			const status = args.status; // Narrow the type
			posts = await ctx.db
				.query('blogPosts')
				.withIndex('by_status', (q) => q.eq('status', status))
				.collect();
		} else {
			posts = await ctx.db.query('blogPosts').collect();
		}

		const searchLower = args.query.toLowerCase();
		const filteredPosts = posts.filter((post) => {
			return (
				post.title.toLowerCase().includes(searchLower) ||
				post.content.toLowerCase().includes(searchLower) ||
				post.excerpt?.toLowerCase().includes(searchLower) ||
				post.tags.some((tag) => tag.toLowerCase().includes(searchLower))
			);
		});

		// Sort by relevance (simple: by date for now)
		filteredPosts.sort((a, b) => {
			return b.updatedAt - a.updatedAt;
		});

		// Get author information for each post
		const postsWithAuthors = await Promise.all(
			filteredPosts.map(async (post) => {
				const author = await ctx.db.get(post.authorId);
				return {
					...post,
					author: author
						? {
								_id: author._id,
								name: author.name,
								firstName: author.firstName,
								lastName: author.lastName,
								email: author.email,
								profilePictureUrl: author.profilePictureUrl
							}
						: null
				};
			})
		);

		return postsWithAuthors;
	}
});
