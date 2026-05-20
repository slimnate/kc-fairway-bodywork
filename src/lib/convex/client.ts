import { browser } from '$app/environment';
import { configureClientAuth } from 'workos-convex-sveltekit';
import { PUBLIC_ADMIN_ENABLED, PUBLIC_CONVEX_URL } from '$env/static/public';
import { setupConvex, useConvexClient } from 'convex-svelte';

let initialized = false;

/** Initialize Convex on routes that need it (blog, admin). No-op on SSR. */
export function ensureConvexClient(): void {
	if (!browser || initialized || !PUBLIC_CONVEX_URL) return;
	initialized = true;

	if (PUBLIC_ADMIN_ENABLED !== 'false') {
		configureClientAuth(setupConvex, useConvexClient, browser, PUBLIC_CONVEX_URL);
	} else {
		setupConvex(PUBLIC_CONVEX_URL);
	}
}
