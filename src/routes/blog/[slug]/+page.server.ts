import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { ConvexHttpClient } from 'convex/browser';
import { PUBLIC_CONVEX_URL } from '$env/static/public';
import { api } from '../../../convex/_generated/api';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import type { Id } from '../../../convex/_generated/dataModel';

export const load: PageServerLoad = async ({ params }) => {
	const client = new ConvexHttpClient(PUBLIC_CONVEX_URL);
	const post = await client.query(api.blog.getPostBySlug, { slug: params.slug || '' });

	if (!post) {
		throw error(404, 'Post not found');
	}

	// Get cover image URL from stored field
	const coverImageUrl = post.featuredImageUrl;

	// Extract all convex:<id> image references from markdown
	const convexImageRegex = /!\[([^\]]*)\]\(convex:([^)]+)\)/g;
	const imageMatches = [...post.content.matchAll(convexImageRegex)];
	const imageIdToUrl = new Map<string, string>();

	// Resolve all image IDs to public URLs
	await Promise.all(
		imageMatches.map(async (match) => {
			const storageId = match[2] as Id<'_storage'>;
			try {
				const { url } = await client.action(api.uploads.getPublicUrl, { id: storageId });
				if (url) {
					imageIdToUrl.set(storageId, url);
				}
			} catch (err) {
				console.error(`Failed to resolve image URL for ${storageId}:`, err);
			}
		})
	);

	// Replace convex:<id> references with actual URLs
	let hydratedMarkdown = post.content;
	for (const [storageId, url] of imageIdToUrl.entries()) {
		hydratedMarkdown = hydratedMarkdown.replace(
			new RegExp(
				`!\\[([^\\]]*)\\]\\(convex:${storageId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)`,
				'g'
			),
			`![$1](${url})`
		);
	}

	// Render markdown to HTML using marked
	let html = '';
	try {
		html = await marked.parse(hydratedMarkdown, {
			breaks: true,
			gfm: true
		});
	} catch (err) {
		console.error('Failed to render markdown:', err);
		// Fallback to plain text if rendering fails
		html = hydratedMarkdown.replace(/\n/g, '<br />');
	}

	// Sanitize HTML to prevent XSS
	const sanitizedHtml = sanitizeHtml(html, {
		allowedTags: [
			'h1',
			'h2',
			'h3',
			'h4',
			'h5',
			'h6',
			'p',
			'br',
			'strong',
			'em',
			'u',
			's',
			'ul',
			'ol',
			'li',
			'blockquote',
			'code',
			'pre',
			'a',
			'img',
			'hr',
			'table',
			'thead',
			'tbody',
			'tr',
			'th',
			'td'
		],
		allowedAttributes: {
			a: ['href', 'title'],
			img: ['src', 'alt', 'title'],
			code: ['class'],
			pre: ['class']
		},
		allowedSchemes: ['http', 'https', 'data']
	});

	return {
		post: {
			...post,
			featuredImageUrl: coverImageUrl
		},
		html: sanitizedHtml,
		coverImageUrl
	};
};
