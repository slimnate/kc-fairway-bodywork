<script lang="ts">
	import { useQuery, useConvexClient } from 'convex-svelte';
	import { api } from '../../../convex/_generated/api';
	import { goto } from '$app/navigation';
	import type { Id } from '../../../convex/_generated/dataModel';
	import { toast } from '$lib/stores/toast';
	import meta from '$lib/data/meta';

	let statusFilter = $state<'all' | 'draft' | 'published'>('all');
	let authorFilter = $state<string | null>(null);
	let searchQuery = $state('');
	let showDeleteConfirm = $state(false);
	let postToDelete = $state<Id<'blogPosts'> | null>(null);

	const convex = useConvexClient();

	// Query all posts
	const allPostsQuery = useQuery(api.blog.getAllPosts, () => ({
		status: statusFilter === 'all' ? undefined : statusFilter,
		authorId: authorFilter ? (authorFilter as Id<'users'>) : undefined,
		orderBy: 'createdAt' as const,
		order: 'desc' as const
	}));
	const allPosts = $derived(allPostsQuery?.data);
	const postsLoading = $derived(allPostsQuery?.isLoading);

	// Filter posts by search query
	const filteredPosts = $derived(
		allPosts
			? allPosts.filter((post) => {
					if (searchQuery) {
						const query = searchQuery.toLowerCase();
						return (
							post.title.toLowerCase().includes(query) ||
							post.content.toLowerCase().includes(query) ||
							post.excerpt?.toLowerCase().includes(query) ||
							post.tags.some((tag) => tag.toLowerCase().includes(query))
						);
					}
					return true;
				})
			: []
	);

	// Get unique authors from posts
	const authors = $derived(
		allPosts
			? Array.from(
					new Map(
						allPosts
							.map((post) => post.author)
							.filter((author) => author !== null)
							.map((author) => [author!._id, author!])
					).values()
				)
			: []
	);

	async function handleDelete(id: Id<'blogPosts'>) {
		postToDelete = id;
		showDeleteConfirm = true;
	}

	async function confirmDelete() {
		if (postToDelete) {
			try {
				await convex.mutation(api.blog.deletePost, { id: postToDelete });
				toast.success('Blog post deleted successfully');
				showDeleteConfirm = false;
				postToDelete = null;
			} catch (err) {
				toast.error(err instanceof Error ? err.message : 'Failed to delete post');
			}
		}
	}

	async function handlePublish(id: Id<'blogPosts'>) {
		try {
			await convex.mutation(api.blog.updatePost, { id, status: 'published' });
			toast.success('Blog post published successfully');
		} catch (err) {
			toast.error(err instanceof Error ? err.message : 'Failed to publish post');
		}
	}

	async function handleUnpublish(id: Id<'blogPosts'>) {
		try {
			await convex.mutation(api.blog.updatePost, { id, status: 'draft' });
			toast.success('Blog post unpublished successfully');
		} catch (err) {
			toast.error(err instanceof Error ? err.message : 'Failed to unpublish post');
		}
	}

	function formatDate(timestamp: number | undefined) {
		if (!timestamp) return 'N/A';
		return new Date(timestamp).toLocaleDateString();
	}

	function formatDateTime(timestamp: number) {
		return new Date(timestamp).toLocaleString();
	}

	function getStatusBadgeClass(status: string) {
		switch (status) {
			case 'published':
				return 'badge-success';
			case 'draft':
				return 'badge-warning';
			default:
				return 'badge-ghost';
		}
	}

	async function copySlug(slug: string) {
		try {
			await navigator.clipboard.writeText(slug);
			toast.success('Slug copied to clipboard');
		} catch (err) {
			toast.error('Failed to copy slug to clipboard');
		}
	}
</script>

<svelte:head>
	<title>Blog Posts - {meta.name}</title>
</svelte:head>

<div class="space-y-6">
	<!-- Header with Create Button -->
	<div class="flex items-end justify-between gap-4 px-2 pt-12 text-left md:px-4 md:pt-4">
		<div class="flex flex-col gap-2">
			<h1 class="text-primary text-3xl font-bold">Blog Posts</h1>
			<p class="text-base-content/60">Manage your blog posts and content</p>
		</div>
		<div>
			<a href="/admin/blog/new" class="btn btn-primary shadow-lg transition-all hover:shadow-xl">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="mr-2 h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 4v16m8-8H4"
					/>
				</svg>
				Create New Post
			</a>
		</div>
	</div>

	<!-- Filters -->
	<div
		class="card border-primary/20 from-base-100 via-base-100 to-base-200/50 rounded-2xl border-2 bg-linear-to-br shadow-xl backdrop-blur-sm"
	>
		<div class="card-body">
			<h2
				class="from-primary to-primary/70 mb-4 bg-linear-to-r bg-clip-text text-xl font-bold text-transparent"
			>
				Filters
			</h2>
			<div class="flex flex-col gap-4 md:flex-row md:items-end">
				<!-- Search -->
				<div class="flex-1">
					<input
						id="search-input"
						type="text"
						placeholder="Search by title, content, or tags..."
						class="input input-bordered border-primary/30 focus:border-primary focus:outline-primary w-full"
						bind:value={searchQuery}
					/>
				</div>

				<!-- Status Filter -->
				<div>
					<label for="status-select" class="label">
						<span class="label-text text-primary font-semibold">Status</span>
					</label>
					<select
						id="status-select"
						class="select select-bordered border-primary/30 focus:border-primary focus:outline-primary w-full md:w-48"
						bind:value={statusFilter}
					>
						<option value="all">All Statuses</option>
						<option value="draft">Draft</option>
						<option value="published">Published</option>
					</select>
				</div>

				<!-- Author Filter -->
				{#if authors.length > 0}
					<div>
						<label for="author-select" class="label">
							<span class="label-text text-primary font-semibold">Author</span>
						</label>
						<select
							id="author-select"
							class="select select-bordered border-primary/30 focus:border-primary focus:outline-primary w-full md:w-48"
							bind:value={authorFilter}
						>
							<option value={null}>All Authors</option>
							{#each authors as author}
								<option value={author._id}>
									{author.firstName}
									{author.lastName}
								</option>
							{/each}
						</select>
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- Posts Table -->
	<div
		class="card border-primary/20 from-base-100 via-base-100 to-base-200/50 rounded-2xl border-2 bg-linear-to-br shadow-xl backdrop-blur-sm"
	>
		<div class="card-body">
			{#if postsLoading}
				<div class="flex justify-center py-12">
					<span class="loading loading-spinner loading-lg text-primary"></span>
				</div>
			{:else if !allPosts}
				<div
					class="card border-error/30 from-base-100 to-base-200 rounded-2xl border-2 bg-linear-to-br shadow-xl"
				>
					<div class="card-body py-12 text-center">
						<h2
							class="card-title from-error to-error/70 justify-center bg-linear-to-r bg-clip-text text-2xl font-bold text-transparent"
						>
							Failed to Load Posts
						</h2>
						<p class="text-base-content/80 mb-4">
							Unable to load blog posts. Please try again later.
						</p>
					</div>
				</div>
			{:else if filteredPosts.length === 0}
				<div class="bg-base-200/50 rounded-xl py-12 text-center">
					<p class="text-base-content/60 text-lg">No blog posts found</p>
					{#if searchQuery || statusFilter !== 'all' || authorFilter}
						<p class="text-base-content/50 mt-2 text-sm">
							Try adjusting your filters or create a new post.
						</p>
					{/if}
				</div>
			{:else}
				<div class="border-primary/10 overflow-x-auto rounded-xl border">
					<table class="table-zebra table">
						<thead>
							<tr class="from-primary/10 bg-linear-to-r to-transparent">
								<th class="text-primary font-bold">Title</th>
								<th class="text-primary font-bold">Slug</th>
								<th class="text-primary font-bold">Author</th>
								<th class="text-primary font-bold">Status</th>
								<th class="text-primary font-bold">Published</th>
								<th class="text-primary font-bold">Created</th>
								<th class="text-primary font-bold">Updated</th>
								<th class="text-primary font-bold">Actions</th>
							</tr>
						</thead>
						<tbody>
							{#each filteredPosts as post}
								<tr class="hover:bg-primary/5 transition-colors">
									<td>
										<div class="font-semibold">{post.title}</div>
										{#if post.excerpt}
											<div class="text-base-content/60 mt-1 line-clamp-2 text-sm">
												{post.excerpt}
											</div>
										{/if}
										{#if post.tags.length > 0}
											<div class="mt-2 flex flex-wrap gap-1">
												{#each post.tags.slice(0, 3) as tag}
													<span
														class="badge badge-sm border-primary/30 bg-primary/10 text-primary whitespace-nowrap shadow-sm"
														>{tag}</span
													>
												{/each}
												{#if post.tags.length > 3}
													<span
														class="badge badge-sm border-primary/30 bg-primary/10 text-primary shadow-sm"
														>+{post.tags.length - 3}</span
													>
												{/if}
											</div>
										{/if}
									</td>
									<td>
										<div class="flex items-center gap-2">
											<span class="text-base-content/70 font-mono text-sm">{post.slug}</span>
											<button
												class="btn btn-ghost btn-xs hover:bg-primary/10 hover:text-primary"
												onclick={() => copySlug(post.slug)}
												title="Copy slug"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													class="h-4 w-4"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
													/>
												</svg>
											</button>
										</div>
									</td>
									<td>
										{#if post.author}
											<div class="font-semibold">
												{post.author.firstName}
												{post.author.lastName}
											</div>
											<div class="text-base-content/60 text-sm">{post.author.email}</div>
										{:else}
											<span class="text-base-content/50 text-sm">Unknown</span>
										{/if}
									</td>
									<td>
										<span class="badge {getStatusBadgeClass(post.status)}">{post.status}</span>
									</td>
									<td>
										<div class="text-base-content/70 text-sm">
											{formatDate(post.publishedAt)}
										</div>
									</td>
									<td>
										<div class="text-base-content/70 text-sm">
											{formatDateTime(post.createdAt)}
										</div>
									</td>
									<td>
										<div class="text-base-content/70 text-sm">
											{formatDateTime(post.updatedAt)}
										</div>
									</td>
									<td>
										<div class="flex gap-2">
											<button
												class="btn btn-ghost btn-xs hover:bg-primary/10 hover:text-primary transition-all"
												onclick={() => goto(`/admin/blog/${post._id}/edit`)}
											>
												Edit
											</button>
											{#if post.status === 'draft'}
												<button
													class="btn btn-success btn-xs shadow-md transition-all hover:shadow-lg"
													onclick={() => handlePublish(post._id)}
												>
													Publish
												</button>
											{:else if post.status === 'published'}
												<button
													class="btn btn-warning btn-xs shadow-md transition-all hover:shadow-lg"
													onclick={() => handleUnpublish(post._id)}
												>
													Unpublish
												</button>
												<a
													href="/blog/{post.slug}"
													target="_blank"
													class="btn btn-ghost btn-xs hover:bg-primary/10 hover:text-primary transition-all"
												>
													View
												</a>
											{/if}
											<button
												class="btn btn-error btn-xs shadow-md transition-all hover:shadow-lg"
												onclick={() => handleDelete(post._id)}
											>
												Delete
											</button>
										</div>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/if}
		</div>
	</div>
</div>

<!-- Delete Confirmation Modal -->
{#if showDeleteConfirm}
	<div class="modal modal-open">
		<div
			class="modal-box border-primary/20 from-base-100 to-base-200 rounded-2xl border-2 bg-linear-to-br shadow-2xl"
		>
			<h3
				class="from-error to-error/70 bg-linear-to-r bg-clip-text text-lg font-bold text-transparent"
			>
				Confirm Delete
			</h3>
			<p class="text-base-content/80 py-4">
				Are you sure you want to delete this blog post? This action cannot be undone.
			</p>
			<div class="modal-action">
				<button
					class="btn border-primary/30 hover:border-primary hover:bg-primary/10"
					onclick={() => (showDeleteConfirm = false)}>Cancel</button
				>
				<button
					class="btn btn-error shadow-lg transition-all hover:shadow-xl"
					onclick={confirmDelete}>Delete</button
				>
			</div>
		</div>
	</div>
{/if}
