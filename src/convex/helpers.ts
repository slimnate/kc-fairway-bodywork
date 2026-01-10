import type { QueryCtx, MutationCtx } from './_generated/server';
import type { Doc } from './_generated/dataModel';

/**
	* Check if user has a specific role
 */
function hasRole(user: Doc<'users'>, role: string): boolean {
	return user.roles?.includes(role) ?? false;
}

/**
	* Require a specific role - throws error if user is not authenticated or doesn't have the role
 */
export async function requireRole(
	ctx: QueryCtx | MutationCtx,
	role: string
): Promise<Doc<'users'>> {
	const identity = await ctx.auth.getUserIdentity();
	if (!identity) {
		throw new Error('Not authenticated');
	}

	const user = await ctx.db
		.query('users')
		.withIndex('by_workos_user_id', (q) => q.eq('workosUserId', identity.subject))
		.unique();

	if (!user) {
		throw new Error('User not found');
	}

	if (!hasRole(user, role)) {
		throw new Error(`${role} role required`);
	}

	return user;
}

/**
	* Require admin role (convenience function)
 */
export async function requireAdmin(ctx: QueryCtx | MutationCtx): Promise<Doc<'users'>> {
	return requireRole(ctx, 'admin');
}

/**
	* Require blog role (convenience function)
 */
export async function requireBlog(ctx: QueryCtx | MutationCtx): Promise<Doc<'users'>> {
	return requireRole(ctx, 'blog');
}
