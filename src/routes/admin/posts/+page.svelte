<script lang="ts">
	import { onMount } from 'svelte';
	import { getAllPosts, deletePost, publishPost, unpublishPost } from '$lib/data/admin-blog.js';
	import type { Post } from '$lib/data/types.js';

	let posts: Post[] = [];
	let loading = true;
	let error: string | null = null;
	let deletingId: string | null = null;

	onMount(async () => {
		await loadPosts();
	});

	async function loadPosts() {
		try {
			posts = await getAllPosts();
		} catch (err) {
			error = 'Failed to load posts';
			console.error(err);
		} finally {
			loading = false;
		}
	}

	async function handlePublish(id: string) {
		try {
			let post = await publishPost(id);
			posts = posts.map((p) => (p.id === id ? post : p));
		} catch (err) {
			error = 'Failed to publish post';
			console.error(err);
		}
	}

	async function handleUnpublish(id: string) {
		try {
			await unpublishPost(id);
			posts = posts.map((p) => (p.id === id ? { ...p, status: 'draft' } : p));
		} catch (err) {
			error = 'Failed to unpublish post';
			console.error(err);
		}
	}

	async function handleDelete(id: string) {
		if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
			return;
		}

		deletingId = id;
		try {
			await deletePost(id);
			posts = posts.filter((p) => p.id !== id);
		} catch (err) {
			error = 'Failed to delete post';
			console.error(err);
		} finally {
			deletingId = null;
		}
	}
</script>

<svelte:head>
	<title>Manage Posts - Admin - Spotlite Studios</title>
</svelte:head>

<div class="space-y-6">
	<!-- Header -->
	<div class="flex justify-between pl-10 text-left">
		<div>
			<h1 class="text-primary text-3xl font-bold">Manage Posts</h1>
			<p class="text-base-content/70">Create, edit, and manage your blog posts</p>
		</div>
		<a href="/admin/posts/new" class="btn btn-primary">
			<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
			</svg>
			New Post
		</a>
	</div>

	{#if error}
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
			<span>{error}</span>
		</div>
	{/if}

	{#if loading}
		<div class="flex h-64 items-center justify-center">
			<div class="loading loading-spinner loading-lg"></div>
		</div>
	{:else if posts.length === 0}
		<div class="card bg-base-100/70 border-primary border-2 shadow-lg">
			<div class="card-body text-center">
				<svg
					class="text-base-content/30 mx-auto mb-4 h-16 w-16"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
					/>
				</svg>
				<h3 class="mb-2 text-xl font-semibold">No posts yet</h3>
				<p class="text-base-content/70 mb-4">Create your first blog post to get started</p>
				<a href="/admin/posts/new" class="btn btn-primary">Create First Post</a>
			</div>
		</div>
	{:else}
		<div class="card bg-base-100/70 border-primary border-2 shadow-lg">
			<div class="card-body">
				<div class="overflow-x-auto">
					<table class="table-zebra table w-full">
						<thead>
							<tr class="text-primary">
								<th>Title</th>
								<th>Status</th>
								<th>Published</th>
								<th>Created</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{#each posts as post}
								<tr>
									<td>
										<div>
											<a
												href="/blog/{post.slug}"
												target="_blank"
												class="link link-primary font-medium"
											>
												{post.title}
											</a>
											{#if post.excerpt}
												<p class="text-base-content/70 mt-1 line-clamp-2 text-sm">
													{post.excerpt}
												</p>
											{/if}
										</div>
									</td>
									<td>
										<span class="badge badge-{post.status === 'published' ? 'success' : 'warning'}">
											{post.status}
										</span>
									</td>
									<td>
										{#if post.published_at}
											{new Date(post.published_at).toLocaleDateString()}
										{:else}
											<span class="text-base-content/50">-</span>
										{/if}
									</td>
									<td>
										{new Date(post.created_at).toLocaleDateString()}
									</td>
									<td>
										<div class="flex gap-2">
											<a href="/admin/posts/{post.id}/edit" class="btn btn-xs btn-outline">
												Edit
											</a>
											{#if post.status === 'draft'}
												<button
													on:click={() => handlePublish(post.id)}
													class="btn btn-xs btn-success btn-outline"
												>
													Publish
												</button>
											{/if}
											{#if post.status === 'published'}
												<button
													on:click={() => handleUnpublish(post.id)}
													class="btn btn-xs btn-warning btn-outline"
												>
													Unpublish
												</button>
											{/if}
											<button
												on:click={() => handleDelete(post.id)}
												disabled={deletingId === post.id}
												class="btn btn-xs btn-error btn-outline"
											>
												{#if deletingId === post.id}
													<span class="loading loading-spinner loading-xs"></span>
												{:else}
													Delete
												{/if}
											</button>
										</div>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
