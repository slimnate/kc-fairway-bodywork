import type { Handle } from '@sveltejs/kit';
import metadata from '$lib/data/meta.js';

const replacePlaceholders = (html: string, replacements: Record<string, string>): string => {
	for (const [placeholder, value] of Object.entries(replacements)) {
		html = html.replace(new RegExp(placeholder, 'g'), value);
	}
	return html;
};

export const handle: Handle = ({ event, resolve }) => {
	return resolve(event, {
		transformPageChunk: ({ html }) => {
			// Replace placeholders in HTML
			html = replacePlaceholders(html, {
				'%meta.title%': metadata.title,
				'%meta.description%': metadata.description,
				'%meta.keywords%': metadata.keywords.join(', ')
			});
			return html;
		}
	});
};
