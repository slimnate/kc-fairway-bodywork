import type { Handle, HandleServerError } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { isAdminEnabled } from '$lib/server/admin-enabled.js';

import { configureAuthKit, authKitHandle } from '@workos/authkit-sveltekit';
import { configureServerAuth } from 'workos-convex-sveltekit';
import { api } from './convex/_generated/api';

import { env } from '$env/dynamic/private';
import { PUBLIC_CONVEX_URL } from '$env/static/public';

const adminEnabled = isAdminEnabled();

if (adminEnabled) {
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
}

const blockAdminRoutes: Handle = async ({ event, resolve }) => {
	if (
		!adminEnabled &&
		(event.url.pathname.startsWith('/admin') || event.url.pathname.startsWith('/api/auth'))
	) {
		return new Response('Not Found', { status: 404 });
	}
	return resolve(event);
};

export const handle: Handle = adminEnabled
	? sequence(authKitHandle())
	: sequence(blockAdminRoutes);

// Handle errors that occur during server-side rendering or in load functions
export const handleError: HandleServerError = ({ error, event, status, message }) => {
	console.error('Server error:', {
		error,
		status,
		message,
		url: event.url.pathname,
		timestamp: new Date().toISOString()
	});

	return {
		message: (error as { body?: { message?: string } })?.body?.message || message || 'An error occurred',
		status: ((error as { status?: number })?.status as number) || status || 500
	};
};
