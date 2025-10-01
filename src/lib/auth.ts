import { supabase } from './supabase.js';
import type { User } from '@supabase/supabase-js';

export interface AuthUser {
	id: string;
	email: string;
	role?: string;
}

// Get current user
export async function getCurrentUser(): Promise<AuthUser | null> {
	const {
		data: { user },
		error
	} = await supabase.auth.getUser();

	if (error || !user) {
		return null;
	}

	console.log(user);

	return {
		id: user.id,
		email: user.email || '',
		role: user.app_metadata?.role || 'user'
	};
}

// Sign in with email and password
export async function signIn(email: string, password: string) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password
	});

	if (error) {
		throw error;
	}

	return data;
}

// Sign out
export async function signOut() {
	const { error } = await supabase.auth.signOut();

	if (error) {
		throw error;
	}
}

// Check if user is admin
export async function isAdmin(): Promise<boolean> {
	const user = await getCurrentUser();
	return user?.role === 'admin';
}

// Subscribe to auth changes
export function onAuthStateChange(callback: (user: User | null) => void) {
	return supabase.auth.onAuthStateChange((event, session) => {
		callback(session?.user || null);
	});
}
