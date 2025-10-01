<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { getPostById, updatePost } from '$lib/data/admin-blog.js';
	import PostEditor from '$lib/components/PostEditor.svelte';
	import type { Post } from '$lib/data/types.js';

	let post: Post | null = null;
	let loading = true;
	let saving = false;
	let error: string | null = null;

	onMount(async () => {
		try {
			const id = $page.params.id;
			if (!id) {
				error = 'Post ID is required';
				return;
			}
			post = await getPostById(id);
		} catch (err: any) {
			error = err.message || 'Failed to load post';
			console.error(err);
		} finally {
			loading = false;
		}
	});

	async function handleSubmit(event: CustomEvent<Post>) {
		const updatedPost = event.detail;
		saving = true;
		error = null;

		try {
			await updatePost(post!.id, updatedPost);
			goto('/admin/posts');
		} catch (err: any) {
			error = err.message || 'Failed to update post';
			console.error(err);
		} finally {
			saving = false;
		}
	}
</script>

<svelte:head>
	<title>Edit Post - Admin - Spotlite Studios</title>
</svelte:head>

{#if loading}
	<div class="flex h-64 items-center justify-center">
		<div class="loading loading-spinner loading-lg"></div>
	</div>
{:else if error || !post}
	<div class="alert alert-error">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6 shrink-0 stroke-current"
			fill="none"
			viewBox="0 0 24 24"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		</svg>
		<span>{error || 'Post not found'}</span>
	</div>
	<div class="mt-4">
		<a href="/admin/posts" class="btn btn-outline">Back to Posts</a>
	</div>
{:else}
	<div class="space-y-6">
		<!-- Header -->
		<div class="flex items-center justify-between">
			<div class="pl-10 text-left">
				<h1 class="text-primary text-3xl font-bold">Edit Post</h1>
				<p class="text-base-content/70">Update your blog post</p>
			</div>
			<a href="/admin/posts" class="btn btn-outline">
				<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 19l-7-7 7-7"
					/>
				</svg>
				Back to Posts
			</a>
		</div>

		<!-- Post Editor -->
		<div class="card bg-base-100/70 border-primary border-2 shadow-lg">
			<div class="card-body">
				<PostEditor {post} loading={saving} {error} editMode={true} on:submit={handleSubmit} />
			</div>
		</div>
	</div>
{/if}
