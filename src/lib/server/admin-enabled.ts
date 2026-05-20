import { env } from '$env/dynamic/private';
import { PUBLIC_ADMIN_ENABLED } from '$env/static/public';

/** True when WorkOS admin/auth routes should be active (default). */
export function isAdminEnabled(): boolean {
	if (PUBLIC_ADMIN_ENABLED === 'false') return false;
	if (env.DISABLE_ADMIN === '1' || env.DISABLE_ADMIN === 'true') return false;
	return true;
}
