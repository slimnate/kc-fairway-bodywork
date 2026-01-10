<script lang="ts">
	import { useQuery } from 'convex-svelte';
	import { api } from '../../convex/_generated/api';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	// Read from URL query parameters (automatically updates when URL changes)
	const selectedTag = $derived($page.url.searchParams.get('tag') || null);
	const searchQueryFromUrl = $derived($page.url.searchParams.get('search') || '');

	// Local state for search input (synced with URL)
	let searchQuery = $state(searchQueryFromUrl);
	let currentPage = $state(1);
	const postsPerPage = 10;

	// Sync searchQuery with URL when URL changes (e.g., browser back/forward)
	$effect(() => {
		if (searchQueryFromUrl !== searchQuery) {
			searchQuery = searchQueryFromUrl;
		}
	});

	// Query published posts
	const postsQuery = useQuery(api.blog.getPublishedPosts, () => ({
		tags: selectedTag ? [selectedTag] : undefined,
		search: searchQuery || undefined
	}));
	const allPosts = $derived(postsQuery?.data || []);
	const postsLoading = $derived(postsQuery?.isLoading);

	// Get all unique tags from posts
	const allTags = $derived(
		Array.from(
			new Set(allPosts.flatMap((post) => post.tags).filter((tag) => tag && tag.length > 0))
		).sort()
	);

	// Paginate posts
	const totalPages = $derived(Math.ceil(allPosts.length / postsPerPage));
	const paginatedPosts = $derived(
		allPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)
	);

	function formatDate(timestamp: number | undefined) {
		if (!timestamp) return '';
		return new Date(timestamp).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	function handleTagClick(tag: string) {
		const newTag = selectedTag === tag ? null : tag;
		currentPage = 1; // Reset to first page when filtering

		// Update URL with new tag filter
		const url = new URL($page.url);
		if (newTag) {
			url.searchParams.set('tag', newTag);
		} else {
			url.searchParams.delete('tag');
		}
		// Preserve search query if it exists
		if (searchQuery) {
			url.searchParams.set('search', searchQuery);
		}
		goto(url.pathname + url.search, { noScroll: true });
	}

	function handleSearch() {
		currentPage = 1; // Reset to first page when searching

		// Update URL with search query
		const url = new URL($page.url);
		if (searchQuery) {
			url.searchParams.set('search', searchQuery);
		} else {
			url.searchParams.delete('search');
		}
		// Preserve tag filter if it exists
		if (selectedTag) {
			url.searchParams.set('tag', selectedTag);
		}
		goto(url.pathname + url.search, { noScroll: true });
	}

	function handleClearTag() {
		currentPage = 1; // Reset to first page when clearing filter

		// Update URL to remove tag filter
		const url = new URL($page.url);
		url.searchParams.delete('tag');
		// Preserve search query if it exists
		if (searchQuery) {
			url.searchParams.set('search', searchQuery);
		}
		goto(url.pathname + url.search, { noScroll: true });
	}
</script>

<!-- Hero Section -->
<section class="bg-blur px-6 py-12 pt-24 text-center">
	<div class="mx-auto max-w-4xl">
		<h1
			class="text-primary text-shadow-primary-content mb-4 text-4xl font-bold uppercase text-shadow-md md:text-5xl"
		>
			Blog
		</h1>
		<p class="text-base-content/70 mx-auto max-w-2xl text-lg">
			Latest articles and insights from Spotlite Studios
		</p>
	</div>
</section>

<!-- Filters Section -->
<section
	class="triangle bg-base-300 px-6 py-12 text-center"
	style="--triangle-color: var(--color-base-300); --bg-color: var(--color-base-300);"
>
	<div class="mx-auto max-w-6xl">
		<!-- Search -->
		<div class="mb-6">
			<input
				type="text"
				placeholder="Search posts..."
				class="input input-bordered border-primary/30 focus:border-primary focus:outline-primary mx-auto w-full max-w-md"
				bind:value={searchQuery}
				oninput={handleSearch}
			/>
		</div>

		<!-- Tags Filter -->
		{#if allTags.length > 0}
			<div>
				<p class="text-primary mb-4 text-sm font-semibold uppercase">Filter by Tag:</p>

				<div class="flex flex-wrap justify-center gap-2">
					{#if postsLoading}
						<div class="skeleton h-8 w-28"></div>
					{:else}
						<button
							class="badge badge-lg border-primary/30 hover:border-primary hover:bg-primary/20 cursor-pointer transition-all {selectedTag ===
							null
								? 'bg-primary text-primary-content'
								: 'bg-primary/10 text-primary'}"
							onclick={handleClearTag}
						>
							All Posts
						</button>
						{#each allTags as tag}
							<button
								class="badge badge-lg border-primary/30 hover:border-primary hover:bg-primary/20 cursor-pointer transition-all {selectedTag ===
								tag
									? 'bg-primary text-primary-content'
									: 'bg-primary/10 text-primary'}"
								onclick={() => handleTagClick(tag)}
							>
								{tag}
							</button>
						{/each}
					{/if}
				</div>
			</div>
		{/if}
	</div>
</section>

<!-- Posts Grid Section -->
<section class="bg-blur grow px-6 py-12 pt-24">
	<div class="mx-auto max-w-7xl">
		{#if postsLoading}
			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each Array(3) as _, i}
					<div class="flex justify-center py-12">
						<div class="flex w-full flex-col gap-4">
							<div class="skeleton h-32 w-full"></div>
							<div class="skeleton h-4 w-28"></div>
							<div class="skeleton h-4 w-full"></div>
							<div class="skeleton h-4 w-full"></div>
						</div>
					</div>
				{/each}
			</div>
		{:else if postsQuery && !postsQuery.data}
			<div
				class="card border-error/30 from-base-100 to-base-200 mx-auto max-w-2xl rounded-2xl border-2 bg-linear-to-br shadow-xl"
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
		{:else if paginatedPosts.length === 0}
			<div class="card bg-base-100/70 mx-auto max-w-2xl border-2 shadow-xl">
				<div class="card-body py-12 text-center">
					<p class="text-base-content/60 text-lg">No blog posts found</p>
					{#if searchQuery || selectedTag}
						<p class="text-base-content/50 mt-2 text-sm">
							Try adjusting your search or filter criteria.
						</p>
					{/if}
				</div>
			</div>
		{:else}
			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each paginatedPosts as post}
					<a
						href="/blog/{post.slug}"
						class="card bg-base-100/70 group border-primary/30 hover:border-primary h-full transform border-2 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
					>
						{#if post.featuredImageUrl}
							<figure class="h-48 overflow-hidden">
								<img
									src={post.featuredImageUrl}
									alt={post.title}
									class="h-full w-full object-cover transition-transform group-hover:scale-105"
								/>
							</figure>
						{/if}
						<div class="card-body">
							<h2 class="card-title text-primary group-hover:text-primary/80 transition-colors">
								{post.title}
							</h2>
							{#if post.excerpt}
								<p class="text-base-content/70 line-clamp-3 text-sm">{post.excerpt}</p>
							{/if}
							<div class="card-actions mt-4 flex items-center justify-between">
								<div class="flex flex-wrap gap-1">
									{#each post.tags.slice(0, 3) as tag}
										<span
											class="badge badge-sm border-primary/30 bg-primary/10 text-primary shadow-sm"
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
							</div>
							<div class="text-base-content/60 mt-2 flex items-center justify-between text-xs">
								{#if post.author}
									<span>{post.author.firstName} {post.author.lastName}</span>
								{/if}
								{#if post.publishedAt}
									<span>{formatDate(post.publishedAt)}</span>
								{/if}
							</div>
						</div>
					</a>
				{/each}
			</div>

			<!-- Pagination -->
			{#if totalPages > 1}
				<div class="mt-12 flex justify-center gap-2">
					<button
						class="btn border-primary/30 hover:border-primary hover:bg-primary/10"
						onclick={() => (currentPage = Math.max(1, currentPage - 1))}
						disabled={currentPage === 1}
					>
						Previous
					</button>
					{#each Array(totalPages) as _, i}
						<button
							class="btn {currentPage === i + 1
								? 'btn-primary'
								: 'border-primary/30 hover:border-primary hover:bg-primary/10'}"
							onclick={() => (currentPage = i + 1)}
						>
							{i + 1}
						</button>
					{/each}
					<button
						class="btn border-primary/30 hover:border-primary hover:bg-primary/10"
						onclick={() => (currentPage = Math.min(totalPages, currentPage + 1))}
						disabled={currentPage === totalPages}
					>
						Next
					</button>
				</div>
			{/if}
		{/if}
	</div>
</section>
