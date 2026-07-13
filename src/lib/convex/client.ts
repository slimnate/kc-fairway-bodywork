import { browser } from '$app/environment';
import { configureClientAuth } from 'workos-convex-sveltekit';
import { env } from '$env/dynamic/public';
import { setupConvex, useConvexClient } from 'convex-svelte';

let initialized = false;

/**
 * Initialize Convex on routes that need it (blog, admin).
 * Always calls setupConvex so useQuery has context during SSR
 * (convex-svelte disables the client when not in the browser).
 * WorkOS client auth is wired only in the browser when admin is enabled.
 */
export function ensureConvexClient(): void {
	const convexUrl = env.PUBLIC_CONVEX_URL;
	if (!convexUrl) return;
	// Only dedupe on the client; each SSR render must setContext again.
	if (browser && initialized) return;
	if (browser) initialized = true;

	if (browser && env.PUBLIC_ADMIN_ENABLED !== 'false') {
		configureClientAuth(setupConvex, useConvexClient, browser, convexUrl);
	} else {
		setupConvex(convexUrl);
	}
}
