<script lang="ts">
	import { page } from '$app/stores';
	import { useQuery } from 'convex-svelte';
	import { api } from '../../../convex/_generated/api';
	import type { PageData } from './$types';
	import meta from '$lib/data/meta';

	const slug = $derived($page.params.slug);

	// Get SSR data from page load
	let { data }: { data: PageData } = $props();

	// Get related posts (posts with similar tags)
	const relatedPostsQuery = useQuery(api.blog.getPublishedPosts, () =>
		data.post && data.post.tags.length > 0
			? {
					tags: data.post.tags,
					limit: 4
				}
			: { limit: 4 }
	);
	const relatedPosts = $derived(
		relatedPostsQuery?.data?.filter((p) => p.slug !== slug).slice(0, 3) || []
	);
	const relatedPostsLoading = $derived(relatedPostsQuery?.isLoading);

	$inspect(relatedPosts);

	function formatDate(timestamp: number | undefined) {
		if (!timestamp) return '';
		return new Date(timestamp).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>{data.post.title} - {meta.name} Blog</title>
</svelte:head>

{#if !data.post}
	<section class="bg-blur px-6 py-12">
		<div class="card bg-base-100/70 mx-auto max-w-2xl border-2 shadow-xl">
			<div class="card-body py-12 text-center">
				<h2
					class="text-primary text-shadow-primary-content mb-4 text-2xl font-bold uppercase text-shadow-md"
				>
					Post Not Found
				</h2>
				<p class="text-base-content/80 mb-4">The blog post you're looking for doesn't exist.</p>
				<a href="/blog" class="btn btn-primary">Back to Blog</a>
			</div>
		</div>
	</section>
{:else}
	<!-- Hero Section -->
	<section class="px-6 pt-32">
		<div class="bg-base-300/50 mx-auto max-w-6xl rounded-md border-1 px-8">
			<!-- Featured Image -->
			{#if data.coverImageUrl}
				<div class="mb-8 overflow-hidden rounded-2xl">
					<img
						src={data.coverImageUrl}
						alt={data.post.title}
						class="h-auto max-h-[400px] w-full max-w-[1200px] object-contain"
					/>
				</div>
			{/if}

			<!-- Post Header -->
			<div class="mb-8 space-y-4">
				<h1
					class="text-primary text-shadow-primary-content text-4xl font-bold uppercase text-shadow-md md:text-5xl"
				>
					{data.post.title}
				</h1>

				{#if data.post.excerpt}
					<p class="text-base-content/70 text-xl">{data.post.excerpt}</p>
				{/if}

				<!-- Meta Information -->
				<div class="flex flex-wrap items-center justify-between gap-4 text-sm">
					{#if data.post.author}
						<div class="flex items-center gap-2">
							{#if data.post.author.profilePictureUrl}
								<img
									src={data.post.author.profilePictureUrl}
									alt="{data.post.author.firstName} {data.post.author.lastName}"
									class="h-10 w-10 rounded-full"
								/>
							{:else}
								<div
									class="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full font-semibold"
								>
									{data.post.author.firstName?.[0] || 'A'}
								</div>
							{/if}
							<span class="text-base-content/80">
								{data.post.author.firstName}
								{data.post.author.lastName}
							</span>
						</div>
					{/if}
					{#if data.post.publishedAt}
						<span class="text-base-content/60">{formatDate(data.post.publishedAt)}</span>
					{/if}
				</div>

				<!-- Tags -->
				{#if data.post.tags.length > 0}
					<div class="flex flex-wrap gap-2">
						{#each data.post.tags as tag}
							<a
								href="/blog?tag={tag}"
								class="badge border-primary/30 bg-primary/10 text-primary hover:border-primary hover:bg-primary/20 shadow-sm transition-all"
							>
								{tag}
							</a>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</section>

	<!-- Post Content Section -->
	<section class="px-6 py-12 text-left">
		<div class="mx-auto max-w-6xl">
			<div class="prose prose-lg text-base-content max-w-none">
				{@html data.html}
			</div>
		</div>
	</section>

	<!-- Related Posts Section -->
	{#if relatedPostsLoading}
		<section class="bg-blur px-6 pt-24 pb-12">
			<div class="mx-auto max-w-7xl">
				<h2
					class="text-primary text-shadow-primary-content mb-6 text-center text-3xl font-bold uppercase text-shadow-md md:text-4xl"
				>
					Related Posts
				</h2>
				<div class="flex justify-center py-12">
					<span class="loading loading-spinner loading-lg text-primary"></span>
				</div>
			</div>
		</section>
	{:else if relatedPostsQuery && !relatedPostsQuery.data}
		<section class="bg-blur px-6 pt-24 pb-12">
			<div class="mx-auto max-w-7xl">
				<h2
					class="text-primary text-shadow-primary-content mb-6 text-center text-3xl font-bold uppercase text-shadow-md md:text-4xl"
				>
					Related Posts
				</h2>
				<div
					class="card border-error/30 from-base-100 to-base-200 mx-auto max-w-2xl rounded-2xl border-2 bg-linear-to-br shadow-xl"
				>
					<div class="card-body py-8 text-center">
						<p class="text-base-content/80">Unable to load related posts.</p>
					</div>
				</div>
			</div>
		</section>
	{:else if relatedPosts.length > 0}
		<section class="bg-blur px-6 pt-24 pb-12">
			<div class="mx-auto max-w-7xl">
				<h2
					class="text-primary text-shadow-primary-content mb-6 text-center text-3xl font-bold uppercase text-shadow-md md:text-4xl"
				>
					Related Posts
				</h2>
				<div class="grid gap-6 md:grid-cols-3">
					{#each relatedPosts as relatedPost}
						<a
							href="/blog/{relatedPost.slug}"
							class="card bg-base-100/70 group border-primary/30 hover:border-primary h-full transform border-2 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
						>
							{#if relatedPost.featuredImageStorageId}
								<!-- Note: Related posts would need their cover images resolved too -->
								<!-- For now, we'll skip the image display in related posts -->
							{/if}
							<div class="card-body p-4">
								<h3
									class="card-title text-primary group-hover:text-primary/80 line-clamp-2 text-sm transition-colors"
								>
									{relatedPost.title}
								</h3>
								{#if relatedPost.excerpt}
									<p class="text-base-content/70 line-clamp-2 text-xs">
										{relatedPost.excerpt}
									</p>
								{/if}
							</div>
						</a>
					{/each}
				</div>
			</div>
			<div class="mx-auto max-w-4xl pt-12 text-center">
				<a href="/blog" class="btn btn-primary shadow-lg transition-all hover:shadow-xl">
					Back to Blog
				</a>
			</div>
		</section>
	{/if}
{/if}

<style>
	:global(.prose img) {
		max-width: 80%;
		max-height: 100%;
		display: block;
		margin: auto;
		object-fit: contain;
	}
</style>
