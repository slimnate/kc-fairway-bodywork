import { env } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';

/** True when WorkOS admin/auth routes should be active (default). */
export function isAdminEnabled(): boolean {
	if (publicEnv.PUBLIC_ADMIN_ENABLED === 'false') return false;
	if (env.DISABLE_ADMIN === '1' || env.DISABLE_ADMIN === 'true') return false;
	return true;
}
