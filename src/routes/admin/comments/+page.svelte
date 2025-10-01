<script lang="ts">
	import { onMount } from 'svelte';
	import { getAllComments, updateCommentStatus, deleteComment } from '$lib/data/admin-blog.js';

	let comments: any[] = [];
	let loading = true;
	let error: string | null = null;
	let updatingId: string | null = null;
	let deletingId: string | null = null;

	onMount(async () => {
		await loadComments();
	});

	async function loadComments() {
		try {
			comments = await getAllComments();
		} catch (err) {
			error = 'Failed to load comments';
			console.error(err);
		} finally {
			loading = false;
		}
	}

	async function handleStatusChange(id: string, status: 'pending' | 'approved' | 'spam') {
		updatingId = id;
		try {
			await updateCommentStatus(id, status);
			comments = comments.map((comment) => (comment.id === id ? { ...comment, status } : comment));
		} catch (err) {
			error = 'Failed to update comment status';
			console.error(err);
		} finally {
			updatingId = null;
		}
	}

	async function handleDelete(id: string) {
		if (!confirm('Are you sure you want to delete this comment? This action cannot be undone.')) {
			return;
		}

		deletingId = id;
		try {
			await deleteComment(id);
			comments = comments.filter((c) => c.id !== id);
		} catch (err) {
			error = 'Failed to delete comment';
			console.error(err);
		} finally {
			deletingId = null;
		}
	}

	$: pendingComments = comments.filter((c) => c.status === 'pending');
	$: approvedComments = comments.filter((c) => c.status === 'approved');
	$: spamComments = comments.filter((c) => c.status === 'spam');
</script>

<svelte:head>
	<title>Manage Comments - Admin - Spotlite Studios</title>
</svelte:head>

<div class="space-y-6">
	<!-- Header -->
	<div class="pl-10 text-left">
		<h1 class="text-primary text-3xl font-bold">Manage Comments</h1>
		<p class="text-base-content/70">Review and moderate blog comments</p>
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
	{:else if comments.length === 0}
		<div class="card bg-base-100 shadow-lg">
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
						d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
					/>
				</svg>
				<h3 class="mb-2 text-xl font-semibold">No comments yet</h3>
				<p class="text-base-content/70">
					Comments will appear here once readers start engaging with your posts
				</p>
			</div>
		</div>
	{:else}
		<!-- Stats -->
		<div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
			<div class="card bg-base-100/70 border-primary border-2 shadow-lg">
				<div class="card-body text-center">
					<div class="text-warning text-2xl font-bold">{pendingComments.length}</div>
					<div class="text-base-content/70 text-sm">Pending Review</div>
				</div>
			</div>
			<div class="card bg-base-100/70 border-primary border-2 shadow-lg">
				<div class="card-body text-center">
					<div class="text-success text-2xl font-bold">{approvedComments.length}</div>
					<div class="text-base-content/70 text-sm">Approved</div>
				</div>
			</div>
			<div class="card bg-base-100/70 border-primary border-2 shadow-lg">
				<div class="card-body text-center">
					<div class="text-error text-2xl font-bold">{spamComments.length}</div>
					<div class="text-base-content/70 text-sm">Spam</div>
				</div>
			</div>
		</div>

		<!-- Comments List -->
		<div class="card bg-base-100/70 border-primary border-2 shadow-lg">
			<div class="card-body">
				<div class="overflow-x-auto">
					<table class="table-zebra table w-full">
						<thead>
							<tr class="text-primary">
								<th>Author</th>
								<th>Comment</th>
								<th>Post</th>
								<th>Status</th>
								<th>Date</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{#each comments as comment}
								<tr>
									<td>
										<div>
											<div class="font-medium">{comment.author_name}</div>
											<div class="text-base-content/70 text-sm">{comment.author_email}</div>
										</div>
									</td>
									<td>
										<div class="max-w-xs">
											<p class="line-clamp-3 text-sm">{comment.content}</p>
										</div>
									</td>
									<td>
										<a
											href="/blog/{comment.post?.slug}"
											target="_blank"
											class="link link-primary text-sm"
										>
											{comment.post?.title || 'Unknown Post'}
										</a>
									</td>
									<td>
										<span
											class="badge badge-{comment.status === 'approved'
												? 'success'
												: comment.status === 'pending'
													? 'warning'
													: 'error'}"
										>
											{comment.status}
										</span>
									</td>
									<td>
										<div class="text-sm">
											{new Date(comment.created_at).toLocaleDateString()}
										</div>
									</td>
									<td>
										<div class="flex gap-2">
											{#if comment.status === 'pending'}
												<button
													on:click={() => handleStatusChange(comment.id, 'approved')}
													disabled={updatingId === comment.id}
													class="btn btn-xs btn-success btn-outline"
												>
													{#if updatingId === comment.id}
														<span class="loading loading-spinner loading-xs"></span>
													{:else}
														Approve
													{/if}
												</button>
												<button
													on:click={() => handleStatusChange(comment.id, 'spam')}
													disabled={updatingId === comment.id}
													class="btn btn-xs btn-error btn-outline"
												>
													{#if updatingId === comment.id}
														<span class="loading loading-spinner loading-xs"></span>
													{:else}
														Spam
													{/if}
												</button>
											{:else if comment.status === 'approved'}
												<button
													on:click={() => handleStatusChange(comment.id, 'pending')}
													disabled={updatingId === comment.id}
													class="btn btn-xs btn-warning btn-outline"
												>
													{#if updatingId === comment.id}
														<span class="loading loading-spinner loading-xs"></span>
													{:else}
														Unapprove
													{/if}
												</button>
											{:else}
												<button
													on:click={() => handleStatusChange(comment.id, 'approved')}
													disabled={updatingId === comment.id}
													class="btn btn-xs btn-success btn-outline"
												>
													{#if updatingId === comment.id}
														<span class="loading loading-spinner loading-xs"></span>
													{:else}
														Approve
													{/if}
												</button>
											{/if}
											<button
												on:click={() => handleDelete(comment.id)}
												disabled={deletingId === comment.id}
												class="btn btn-xs btn-error btn-outline"
											>
												{#if deletingId === comment.id}
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
	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
