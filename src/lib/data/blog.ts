import { supabase } from '../supabase.js';
import type { Post, Comment } from './types.js';

export async function getPosts(limit?: number) {
	let query = supabase
		.from('posts')
		.select('*')
		.eq('status', 'published')
		.order('published_at', { ascending: false });

	if (limit) {
		query = query.limit(limit);
	}

	const { data, error } = await query;

	if (error) {
		console.error('Error fetching posts:', error);
		throw error;
	}

	return data || [];
}

export async function getPost(slug: string) {
	const { data, error } = await supabase
		.from('posts')
		.select('*')
		.eq('slug', slug)
		.eq('status', 'published')
		.single();

	if (error) {
		console.error('Error fetching post:', error);
		throw error;
	}

	return data;
}

export async function getComments(postId: string) {
	const { data, error } = await supabase
		.from('comments')
		.select('*')
		.eq('post_id', postId)
		.eq('status', 'approved')
		.order('created_at', { ascending: true });

	if (error) {
		console.error('Error fetching comments:', error);
		throw error;
	}

	return data || [];
}

export async function addComment(comment: Omit<Comment, 'id' | 'created_at'>) {
	const { data, error } = await supabase.from('comments').insert(comment).select().single();

	if (error) {
		console.error('Error adding comment:', error);
		throw error;
	}

	return data;
}

export async function getPostsByTag(tag: string) {
	const { data, error } = await supabase
		.from('posts')
		.select('*')
		.eq('status', 'published')
		.contains('tags', [tag])
		.order('published_at', { ascending: false });

	if (error) {
		console.error('Error fetching posts by tag:', error);
		throw error;
	}

	return data || [];
}

export async function searchPosts(query: string) {
	const { data, error } = await supabase
		.from('posts')
		.select('*')
		.eq('status', 'published')
		.or(`title.ilike.%${query}%,content.ilike.%${query}%`)
		.order('published_at', { ascending: false });

	if (error) {
		console.error('Error searching posts:', error);
		throw error;
	}

	return data || [];
}
