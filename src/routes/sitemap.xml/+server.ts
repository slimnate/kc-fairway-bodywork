import type { RequestHandler } from './$types';
import { ConvexHttpClient } from 'convex/browser';
import { PUBLIC_CONVEX_URL } from '$env/static/public';
import { api } from '../../convex/_generated/api';
import meta from '$lib/data/meta.js';

const STATIC_PATHS = [
	'/',
	'/about',
	'/services',
	'/blog',
	'/contact',
	'/faq',
	'/testimonials',
	'/mailing-list'
];

function escapeXml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

function locForPath(path: string): string {
	if (path === '/') return `${meta.siteUrl}/`;
	return `${meta.siteUrl}${path}`;
}

function buildUrlEntry(loc: string, lastmod?: number): string {
	const lastmodTag =
		lastmod != null
			? `\n    <lastmod>${new Date(lastmod).toISOString().split('T')[0]}</lastmod>`
			: '';
	return `  <url>\n    <loc>${escapeXml(loc)}</loc>${lastmodTag}\n  </url>`;
}

export const GET: RequestHandler = async () => {
	const client = new ConvexHttpClient(PUBLIC_CONVEX_URL);
	const posts = await client.query(api.blog.getPublishedPosts, {});

	const staticEntries = STATIC_PATHS.map((path) => buildUrlEntry(locForPath(path)));
	const blogEntries = posts.map((post) =>
		buildUrlEntry(`${meta.siteUrl}/blog/${post.slug}`, post.updatedAt ?? post.publishedAt)
	);

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticEntries, ...blogEntries].join('\n')}
</urlset>`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
