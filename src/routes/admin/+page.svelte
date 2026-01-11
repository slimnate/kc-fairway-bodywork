<script lang="ts">
	import { useQuery } from 'convex-svelte';
	import { api } from '../../convex/_generated/api';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import meta from '$lib/data/meta';

	const { data }: { data: PageData } = $props();

	// Check if user has blog role
	const hasBlogRole = $derived(data?.hasBlogRole ?? false);

	// Only query blog data if user has blog role
	const blogStatsQueryArgs = $derived(hasBlogRole ? {} : 'skip');
	const recentPostsQueryArgs = $derived(hasBlogRole ? { limit: 5 } : 'skip');

	const blogStatsQuery = useQuery(api.blog.getBlogStats, blogStatsQueryArgs);
	const recentPostsQuery = useQuery(api.blog.getRecentPosts, recentPostsQueryArgs);

	// Extract data from query results
	const blogStats = $derived(blogStatsQuery?.data);
	const recentPosts = $derived(recentPostsQuery?.data);
	const blogStatsLoading = $derived(blogStatsQuery?.isLoading);
	const recentPostsLoading = $derived(recentPostsQuery?.isLoading);
</script>

<svelte:head>
	<title>Dashboard - {meta.name}</title>
</svelte:head>

<div class="space-y-8">
	<!-- Page Header -->
	<div class="flex flex-col items-center px-2 pt-12 md:px-4 lg:items-start">
		<h1 class="text-primary text-3xl font-bold">Dashboard</h1>
		<p class="text-base-content/60">Overview of blog posts</p>
	</div>

	<!-- Blog Posts Section -->
	{#if hasBlogRole}
		<div class="space-y-6">
			<!-- Section Header -->
			<div class="flex items-center gap-3 px-2 md:px-4">
				<h2 class="text-primary text-2xl font-bold">Blog Posts</h2>
				<div class="bg-primary/20 h-px flex-1"></div>
			</div>

			<!-- Blog Statistics Cards -->
			{#if blogStatsLoading}
				<div class="flex justify-center py-12">
					<span class="loading loading-spinner loading-lg text-primary"></span>
				</div>
			{:else if !blogStats}
				<div
					class="card border-error/30 from-base-100 to-base-200 rounded-2xl border-2 bg-linear-to-br shadow-xl"
				>
					<div class="card-body py-12 text-center">
						<h2
							class="card-title from-error to-error/70 justify-center bg-linear-to-r bg-clip-text text-2xl font-bold text-transparent"
						>
							Failed to Load Blog Statistics
						</h2>
						<p class="text-base-content/80 mb-4">
							Unable to load blog statistics. Please try again later.
						</p>
					</div>
				</div>
			{:else if blogStats}
				<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
					<div
						class="group border-info/50 hover:border-info bg-info/20 hover:bg-info/30 relative overflow-hidden rounded-2xl border p-6 text-center transition-all duration-300"
					>
						<div class="relative">
							<div class="text-base-content/70 mb-2 text-sm font-semibold tracking-wide uppercase">
								Total Posts
							</div>
							<div class="text-info text-4xl font-bold">
								{blogStats.total}
							</div>
							<div class="text-base-content/60 mt-2 text-xs">All time</div>
						</div>
					</div>

					<div
						class="group border-warning/50 hover:border-warning bg-warning/20 hover:bg-warning/30 relative overflow-hidden rounded-2xl border p-6 text-center transition-all duration-300"
					>
						<div class="relative">
							<div class="text-base-content/70 mb-2 text-sm font-semibold tracking-wide uppercase">
								Drafts
							</div>
							<div class="text-warning text-4xl font-bold">
								{blogStats.byStatus.draft}
							</div>
							<div class="text-base-content/60 mt-2 text-xs">Unpublished</div>
						</div>
					</div>

					<div
						class="group border-success/50 hover:border-success bg-success/20 hover:bg-success/30 relative overflow-hidden rounded-2xl border p-6 text-center transition-all duration-300"
					>
						<div class="relative">
							<div class="text-base-content/70 mb-2 text-sm font-semibold tracking-wide uppercase">
								Published
							</div>
							<div class="text-success text-4xl font-bold">
								{blogStats.byStatus.published}
							</div>
							<div class="text-base-content/60 mt-2 text-xs">Live posts</div>
						</div>
					</div>

					<div
						class="group border-primary/50 hover:border-primary bg-primary/20 hover:bg-primary/30 relative overflow-hidden rounded-2xl border p-6 text-center transition-all duration-300"
					>
						<div class="relative">
							<div class="text-base-content/70 mb-2 text-sm font-semibold tracking-wide uppercase">
								Recent
							</div>
							<div class="text-primary text-4xl font-bold">
								{blogStats.recentCount}
							</div>
							<div class="text-base-content/60 mt-2 text-xs">Last 7 days</div>
						</div>
					</div>
				</div>
			{/if}

			<!-- Recent Blog Posts -->
			<div
				class="card border-primary/20 from-base-100 via-base-100 to-base-200/50 rounded-2xl border-2 bg-linear-to-br shadow-xl backdrop-blur-sm"
			>
				<div class="card-body">
					<div class="mb-6 flex items-center justify-between">
						<h2
							class="card-title from-primary to-primary/70 bg-linear-to-r bg-clip-text text-2xl font-bold text-transparent"
						>
							Recent Blog Posts
						</h2>
						<button
							class="btn btn-primary btn-sm shadow-lg transition-all hover:shadow-xl"
							onclick={() => goto('/admin/blog')}
						>
							View All
						</button>
					</div>

					{#if recentPostsLoading}
						<div class="flex justify-center py-8">
							<span class="loading loading-spinner loading-md text-primary"></span>
						</div>
					{:else if !recentPosts}
						<div
							class="card border-error/30 from-base-100 to-base-200 rounded-2xl border-2 bg-linear-to-br shadow-xl"
						>
							<div class="card-body py-8 text-center">
								<h2
									class="card-title from-error to-error/70 justify-center bg-linear-to-r bg-clip-text text-xl font-bold text-transparent"
								>
									Failed to Load Recent Posts
								</h2>
								<p class="text-base-content/80">
									Unable to load recent blog posts. Please try again later.
								</p>
							</div>
						</div>
					{:else if recentPosts.length === 0}
						<div class="bg-base-200/50 rounded-xl p-8 text-center">
							<p class="text-base-content/60">No blog posts yet</p>
							<a
								href="/admin/blog/new"
								class="btn btn-primary btn-sm mt-4 shadow-lg transition-all hover:shadow-xl"
							>
								Create First Post
							</a>
						</div>
					{:else}
						<div class="border-primary/10 overflow-x-auto rounded-xl border">
							<table class="table-zebra table">
								<thead>
									<tr class="from-primary/10 bg-linear-to-r to-transparent">
										<th class="text-primary font-bold">Title</th>
										<th class="text-primary font-bold">Author</th>
										<th class="text-primary font-bold">Status</th>
										<th class="text-primary font-bold">Created</th>
										<th class="text-primary font-bold">Actions</th>
									</tr>
								</thead>
								<tbody>
									{#each recentPosts as post}
										<tr class="hover:bg-primary/5 transition-colors">
											<td>
												<div class="font-medium">{post.title}</div>
												{#if post.excerpt}
													<div class="text-base-content/60 mt-1 line-clamp-1 text-sm">
														{post.excerpt}
													</div>
												{/if}
											</td>
											<td>
												{#if post.author}
													<div class="text-base-content/70 text-sm">
														{post.author.firstName}
														{post.author.lastName}
													</div>
												{:else}
													<span class="text-base-content/50 text-sm">Unknown</span>
												{/if}
											</td>
											<td>
												<span
													class="badge shadow-md {post.status === 'published'
														? 'badge-success'
														: 'badge-warning'}"
												>
													{post.status}
												</span>
											</td>
											<td class="text-base-content/70">
												{new Date(post.createdAt).toLocaleDateString()}
											</td>
											<td>
												<button
													class="btn btn-ghost btn-xs hover:bg-primary/10 hover:text-primary transition-all"
													onclick={() => goto(`/admin/blog/${post._id}/edit`)}
												>
													View
												</button>
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
	{/if}

	<!-- No Access Message (if user doesn't have blog role) -->
	{#if !hasBlogRole}
		<div
			class="card border-primary/20 from-base-100 via-base-100 to-base-200/50 rounded-2xl border-2 bg-linear-to-br shadow-xl backdrop-blur-sm"
		>
			<div class="card-body py-12 text-center">
				<div class="mb-4 text-6xl">📊</div>
				<h2
					class="card-title from-primary to-primary/70 mb-2 justify-center bg-linear-to-r bg-clip-text text-2xl font-bold text-transparent"
				>
					Admin Dashboard
				</h2>
				<p class="text-base-content/70 mb-6 text-lg">
					You don't have access to any dashboard sections.
				</p>
				<p class="text-base-content/60 text-sm">Contact your administrator for access.</p>
			</div>
		</div>
	{/if}
</div>
