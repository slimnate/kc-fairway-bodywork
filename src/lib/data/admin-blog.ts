import { supabase } from '../supabase.js';
import type { Post, Comment } from './types.js';

// Get all posts (published and drafts) - admin only
export async function getAllPosts(): Promise<Post[]> {
	const { data, error } = await supabase
		.from('posts')
		.select('*')
		.order('created_at', { ascending: false });

	if (error) {
		console.error('Error fetching posts:', error);
		throw new Error('Failed to fetch posts');
	}

	return data || [];
}

// Create a new post
export async function createPost(
	post: Omit<Post, 'id' | 'created_at' | 'updated_at'>
): Promise<Post> {
	const { data, error } = await supabase.from('posts').insert([post]).select().single();

	if (error) {
		console.error('Error creating post:', error);
		throw new Error('Failed to create post');
	}

	return data;
}

// Update an existing post
export async function updatePost(id: string, updates: Partial<Post>): Promise<Post> {
	const { data, error } = await supabase
		.from('posts')
		.update({ ...updates, updated_at: new Date().toISOString() })
		.eq('id', id)
		.select()
		.single();

	if (error) {
		console.error('Error updating post:', error);
		throw new Error('Failed to update post');
	}

	return data;
}

// Delete a post
export async function deletePost(id: string): Promise<void> {
	const { error } = await supabase.from('posts').delete().eq('id', id);

	if (error) {
		console.error('Error deleting post:', error);
		throw new Error('Failed to delete post');
	}
}

// Get a single post by ID
export async function getPostById(id: string): Promise<Post> {
	const { data, error } = await supabase.from('posts').select('*').eq('id', id).single();

	if (error) {
		console.error('Error fetching post:', error);
		throw new Error('Failed to fetch post');
	}

	return data;
}

// Get all comments - admin only
export async function getAllComments(): Promise<Comment[]> {
	const { data, error } = await supabase
		.from('comments')
		.select('*, post:posts(title, id, slug)')
		.order('created_at', { ascending: false });

	if (error) {
		console.error('Error fetching comments:', error);
		throw new Error('Failed to fetch comments');
	}

	return data || [];
}

// Update comment status (approve, mark as spam, etc.)
export async function updateCommentStatus(
	id: string,
	status: 'pending' | 'approved' | 'spam'
): Promise<Comment> {
	const { data, error } = await supabase
		.from('comments')
		.update({ status })
		.eq('id', id)
		.select()
		.single();

	if (error) {
		console.error('Error updating comment:', error);
		throw new Error('Failed to update comment');
	}

	return data;
}

// Delete a comment
export async function deleteComment(id: string): Promise<void> {
	const { error } = await supabase.from('comments').delete().eq('id', id);

	if (error) {
		console.error('Error deleting comment:', error);
		throw new Error('Failed to delete comment');
	}
}

// Check if a slug already exists
export async function checkSlugExists(slug: string, excludeId?: string): Promise<boolean> {
	let query = supabase.from('posts').select('id').eq('slug', slug);

	if (excludeId) {
		query = query.neq('id', excludeId);
	}

	const { data, error } = await query;

	if (error) {
		console.error('Error checking slug:', error);
		throw new Error('Failed to check slug');
	}

	return (data?.length || 0) > 0;
}

export async function publishPost(id: string): Promise<Post> {
	const { error, data } = await supabase
		.from('posts')
		.update({ status: 'published', published_at: new Date().toISOString() })
		.eq('id', id)
		.select()
		.single();

	if (error) {
		console.error('Error publishing post:', error);
		throw new Error('Failed to publish post');
	}

	return data;
}

export async function unpublishPost(id: string): Promise<void> {
	const { error } = await supabase.from('posts').update({ status: 'draft' }).eq('id', id);

	if (error) {
		console.error('Error unpublishing post:', error);
		throw new Error('Failed to unpublish post');
	}
}

// Generate a unique slug by adding timestamp if needed
export async function generateUniqueSlug(baseSlug: string, excludeId?: string): Promise<string> {
	let slug = baseSlug;
	let counter = 1;

	// First try the base slug
	if (!(await checkSlugExists(slug, excludeId))) {
		return slug;
	}

	// Try adding timestamp
	const timestamp = Date.now();
	slug = `${baseSlug}-${timestamp}`;

	if (!(await checkSlugExists(slug, excludeId))) {
		return slug;
	}

	// If timestamp also exists, try with counter
	while (counter < 100) {
		// Prevent infinite loop
		slug = `${baseSlug}-${timestamp}-${counter}`;
		if (!(await checkSlugExists(slug, excludeId))) {
			return slug;
		}
		counter++;
	}

	// Fallback: use timestamp + random number
	const random = Math.floor(Math.random() * 1000);
	return `${baseSlug}-${timestamp}-${random}`;
}
