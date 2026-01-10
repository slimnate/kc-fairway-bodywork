import type { Handle } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { configureAuthKit, authKitHandle } from '@workos/authkit-sveltekit';
import { configureServerAuth } from 'workos-convex-sveltekit';
import { api } from './convex/_generated/api';
import { PUBLIC_CONVEX_URL } from '$env/static/public';
import metadata from '$lib/data/meta.js';

configureServerAuth(
	{
		workos: {
			clientId: env.WORKOS_CLIENT_ID as string,
			apiKey: env.WORKOS_API_KEY as string,
			redirectUri: env.WORKOS_REDIRECT_URI as string,
			cookiePassword: env.WORKOS_COOKIE_PASSWORD as string
		},
		convexUrl: PUBLIC_CONVEX_URL as string,
		api: api
	},
	configureAuthKit
);

const replacePlaceholders = (html: string, replacements: Record<string, string>): string => {
	for (const [placeholder, value] of Object.entries(replacements)) {
		html = html.replace(new RegExp(placeholder, 'g'), value);
	}
	return html;
};

const authHandle = authKitHandle();

export const handle: Handle = async ({ event, resolve }) => {
	// First apply auth handling, then apply metadata replacement
	return authHandle({
		event,
		resolve: async (event) => {
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
		}
	});
};
