import type { LayoutServerLoad } from './$types';
import { authenticatedRequest } from 'workos-convex-sveltekit';
import { authKit } from '@workos/authkit-sveltekit';
import { api } from '../../../convex/_generated/api';
import { ConvexHttpClient } from 'convex/browser';
import { PUBLIC_CONVEX_URL } from '$env/static/public';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = authenticatedRequest(authKit, async ({ auth, url }) => {
	const convex = new ConvexHttpClient(PUBLIC_CONVEX_URL);
	if (auth.accessToken) {
		convex.setAuth(auth.accessToken);
	}

	const currentUser = await convex.query(api.users.getCurrentUser, {});
	const hasAdminRole = currentUser?.roles?.includes('admin') ?? false;

	if (!hasAdminRole) {
		throw redirect(302, '/');
	}

	return {
		user: auth.user,
		adminUser: currentUser
	};
});
