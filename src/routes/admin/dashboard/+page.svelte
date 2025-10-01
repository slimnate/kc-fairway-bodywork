<script lang="ts">
	import { onMount } from 'svelte';
	import { getAllPosts, getAllComments } from '$lib/data/admin-blog.js';
	import type { Post } from '$lib/data/types.js';

	let posts: Post[] = [];
	let comments: any[] = [];
	let loading = true;
	let error: string | null = null;

	onMount(async () => {
		try {
			const [postsData, commentsData] = await Promise.all([getAllPosts(), getAllComments()]);
			posts = postsData;
			comments = commentsData;
		} catch (err) {
			error = 'Failed to load dashboard data';
			console.error(err);
		} finally {
			loading = false;
		}
	});

	$: publishedPosts = posts.filter((p) => p.status === 'published');
	$: draftPosts = posts.filter((p) => p.status === 'draft');
	$: pendingComments = comments.filter((c) => c.status === 'pending');
</script>

<svelte:head>
	<title>Admin Dashboard - Spotlite Studios</title>
</svelte:head>

{#if loading}
	<div class="flex h-64 items-center justify-center">
		<div class="loading loading-spinner loading-lg"></div>
	</div>
{:else if error}
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
{:else}
	<div class="space-y-8">
		<!-- Header -->
		<div class="pl-10 text-left">
			<h1 class="text-primary text-3xl font-bold">Dashboard</h1>
			<p class="text-base-content/70">Welcome to your blog management dashboard</p>
		</div>

		<!-- Stats Cards -->
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
			<div class="card bg-base-100/70 border-primary border-2 shadow-lg">
				<div class="card-body">
					<div class="flex items-center justify-center">
						<div class="text-primary">
							<svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
								/>
							</svg>
						</div>
						<div class="ml-4">
							<p class="text-base-content/70 text-sm">Total Posts</p>
							<p class="text-2xl font-bold">{posts.length}</p>
						</div>
					</div>
				</div>
			</div>

			<div class="card bg-base-100/70 border-primary border-2 shadow-lg">
				<div class="card-body">
					<div class="flex items-center justify-center">
						<div class="text-success">
							<svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M5 13l4 4L19 7"
								/>
							</svg>
						</div>
						<div class="ml-4">
							<p class="text-base-content/70 text-sm">Published</p>
							<p class="text-2xl font-bold">{publishedPosts.length}</p>
						</div>
					</div>
				</div>
			</div>

			<div class="card bg-base-100/70 border-primary border-2 shadow-lg">
				<div class="card-body">
					<div class="flex items-center justify-center">
						<div class="text-warning">
							<svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
						<div class="ml-4">
							<p class="text-base-content/70 text-sm">Drafts</p>
							<p class="text-2xl font-bold">{draftPosts.length}</p>
						</div>
					</div>
				</div>
			</div>

			<div class="card bg-base-100/70 border-primary border-2 shadow-lg">
				<div class="card-body">
					<div class="flex items-center justify-center">
						<div class="text-info">
							<svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
								/>
							</svg>
						</div>
						<div class="ml-4">
							<p class="text-base-content/70 text-sm">Pending Comments</p>
							<p class="text-2xl font-bold">{pendingComments.length}</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Quick Actions -->
		<div class="card bg-base-100/70 border-primary border-2 shadow-lg">
			<div class="card-body">
				<h2 class="card-title text-xl">Quick Actions</h2>
				<div class="mt-4 flex flex-wrap gap-4">
					<a href="/admin/posts/new" class="btn btn-primary">
						<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 4v16m8-8H4"
							/>
						</svg>
						New Post
					</a>
					<a href="/admin/posts" class="btn btn-outline">
						<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
							/>
						</svg>
						Manage Posts
					</a>
					<a href="/admin/comments" class="btn btn-outline">
						<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
							/>
						</svg>
						Review Comments
					</a>
					<a href="/blog" class="btn btn-outline" target="_blank">
						<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
							/>
						</svg>
						View Blog
					</a>
				</div>
			</div>
		</div>

		<!-- Recent Posts -->
		<div class="card bg-base-100/70 border-primary border-2 shadow-lg">
			<div class="card-body">
				<div class="mb-4 flex items-center justify-between">
					<h2 class="card-title text-xl">Recent Posts</h2>
					<a href="/admin/posts" class="btn btn-sm btn-outline">View All</a>
				</div>

				{#if posts.length === 0}
					<p class="text-base-content/70 py-8 text-center">No posts yet. Create your first post!</p>
				{:else}
					<div class="overflow-x-auto">
						<table class="table-zebra table">
							<thead>
								<tr>
									<th>Title</th>
									<th>Status</th>
									<th>Date</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{#each posts.slice(0, 5) as post}
									<tr>
										<td>
											<a href="/blog/{post.slug}" target="_blank" class="link link-primary">
												{post.title}
											</a>
										</td>
										<td>
											<span
												class="badge badge-{post.status === 'published' ? 'success' : 'warning'}"
											>
												{post.status}
											</span>
										</td>
										<td>
											{new Date(post.created_at).toLocaleDateString()}
										</td>
										<td>
											<a href="/admin/posts/{post.id}/edit" class="btn btn-xs btn-outline">
												Edit
											</a>
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				{/if}
			</div>
		</div>

		<!-- Recent Comments -->
		<div class="card bg-base-100/70 border-primary border-2 shadow-lg">
			<div class="card-body">
				<div class="mb-4 flex items-center justify-between">
					<h2 class="card-title text-xl">Recent Comments</h2>
					<a href="/admin/comments" class="btn btn-sm btn-outline">View All</a>
				</div>

				{#if comments.length === 0}
					<p class="text-base-content/70 py-8 text-center">No comments yet.</p>
				{:else}
					<div class="space-y-4">
						{#each comments.slice(0, 3) as comment}
							<div class="border-primary border-l-4 pl-4">
								<div class="flex items-start justify-between">
									<div>
										<p class="font-semibold">{comment.author_name}</p>
										<p class="text-base-content/70 text-sm">{comment.content}</p>
										<p class="text-base-content/60 text-xs">
											On: {comment.post?.title || 'Unknown Post'}
										</p>
									</div>
									<span
										class="badge badge-{comment.status === 'approved'
											? 'success'
											: comment.status === 'pending'
												? 'warning'
												: 'error'}"
									>
										{comment.status}
									</span>
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}
