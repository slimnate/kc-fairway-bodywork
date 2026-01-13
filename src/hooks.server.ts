import type { Handle, HandleServerError } from '@sveltejs/kit';
import metadata from '$lib/data/meta.js';
import { sequence } from '@sveltejs/kit/hooks';

import { configureAuthKit, authKitHandle } from '@workos/authkit-sveltekit';
import { configureServerAuth } from 'workos-convex-sveltekit';
import { api } from './convex/_generated/api';

import { env } from '$env/dynamic/private';
import { PUBLIC_CONVEX_URL } from '$env/static/public';

// Configure AuthKit with SvelteKit's environment variables
configureServerAuth(
	{
		workos: {
			clientId: env.WORKOS_CLIENT_ID as string,
			apiKey: env.WORKOS_API_KEY as string,
			redirectUri: env.WORKOS_REDIRECT_URI as string,
			cookiePassword: env.WORKOS_COOKIE_PASSWORD as string,
			organizationId: env.WORKOS_ORGANIZATION_ID as string
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

const handleStringReplacement: Handle = ({ event, resolve }) => {
	return resolve(event, {
		transformPageChunk: ({ html }) => {
			// Replace placeholders in HTML
			return replacePlaceholders(html, {
				'%meta.title%': metadata.title,
				'%meta.description%': metadata.description,
				'%meta.keywords%': metadata.keywords.join(', ')
			});
		}
	});
};

export const handle: Handle = sequence(authKitHandle(), handleStringReplacement);

// Handle errors that occur during server-side rendering or in load functions
export const handleError: HandleServerError = ({ error, event, status, message }) => {
	// Log the error for debugging
	console.error('Server error:', {
		error,
		status,
		message,
		url: event.url.pathname,
		timestamp: new Date().toISOString()
	});

	return {
		message: (error as any)?.body?.message || message || 'An error occurred',
		status: ((error as any)?.status as number) || status || 500
	};
};
