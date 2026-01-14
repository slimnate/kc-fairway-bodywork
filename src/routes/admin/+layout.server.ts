import type { LayoutServerLoad } from './$types';
import { authenticatedRequest } from 'workos-convex-sveltekit';
import { authKit } from '@workos/authkit-sveltekit';
import { api } from '../../convex/_generated/api';
import { ConvexHttpClient } from 'convex/browser';
import { PUBLIC_CONVEX_URL } from '$env/static/public';

export const load: LayoutServerLoad = authenticatedRequest(
	authKit,
	async ({ auth, url, locals }) => {
		const user = auth.user;

		// Check user roles via Convex
		// Use ConvexHttpClient for server-side queries
		const convex = new ConvexHttpClient(PUBLIC_CONVEX_URL);
		if (auth.accessToken) {
			convex.setAuth(auth.accessToken);
		}

		let currentUser = null;
		try {
			currentUser = await convex.query(api.users.getCurrentUser, {});
		} catch (error) {
			console.error('Error fetching current user:', error);
			// Continue without user data if query fails
		}

		// Check if user has specific roles
		const hasBlogRole = currentUser?.roles?.includes('blog') ?? false;
		const hasAdminRole = currentUser?.roles?.includes('admin') ?? false;

		return {
			user: user,
			adminUser: currentUser,
			hasBlogRole: hasBlogRole,
			hasAdminRole: hasAdminRole
		};
	}
);
