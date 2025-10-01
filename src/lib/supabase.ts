import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

if (!PUBLIC_SUPABASE_URL || !PUBLIC_SUPABASE_ANON_KEY) {
	throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

// Optional: Create a server-side client for admin operations
// Note: This function should only be used in server-side code (API routes, load functions, etc.)
export const createServerClient = () => {
	// For server-side usage, import this in the specific server file where needed
	// import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';
	throw new Error(
		'createServerClient should be used in server-side code with proper private env import'
	);
};
