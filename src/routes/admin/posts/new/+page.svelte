<script lang="ts">
	import { goto } from '$app/navigation';
	import { createPost } from '$lib/data/admin-blog.js';
	import PostEditor from '$lib/components/PostEditor.svelte';
	import type { Post } from '$lib/data/types.js';

	let loading = false;
	let error: string | null = null;

	async function handleSubmit(event: CustomEvent<Post>) {
		const post = event.detail;
		loading = true;
		error = null;

		try {
			await createPost(post);
			goto('/admin/posts');
		} catch (err: any) {
			error = err.message || 'Failed to create post';
			console.error(err);
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>New Post - Admin - Spotlite Studios</title>
</svelte:head>

<div class="space-y-6">
	<!-- Header -->
	<div class="flex items-center justify-between">
		<div class="pl-10 text-left">
			<h1 class="text-primary text-3xl font-bold">Create New Post</h1>
			<p class="text-base-content/70">Write and publish a new blog post</p>
		</div>
		<a href="/admin/posts" class="btn btn-outline">
			<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
			</svg>
			Back to Posts
		</a>
	</div>

	<!-- Post Editor -->
	<div class="card bg-base-100/70 border-primary border-2 shadow-lg">
		<div class="card-body">
			<PostEditor {loading} {error} editMode={false} on:submit={handleSubmit} />
		</div>
	</div>
</div>
