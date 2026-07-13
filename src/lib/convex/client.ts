import { browser } from '$app/environment';
import { configureClientAuth } from 'workos-convex-sveltekit';
import { env } from '$env/dynamic/public';
import { setupConvex, useConvexClient } from 'convex-svelte';

/**
 * Wire WorkOS token auth for admin routes only.
 * Public pages should rely on root-layout setupConvex (no auth fetch).
 */
export function configureAdminConvexAuth(): void {
	if (!browser || env.PUBLIC_ADMIN_ENABLED === 'false') return;

	const convexUrl = env.PUBLIC_CONVEX_URL;
	if (!convexUrl) return;

	configureClientAuth(setupConvex, useConvexClient, browser, convexUrl);
}
