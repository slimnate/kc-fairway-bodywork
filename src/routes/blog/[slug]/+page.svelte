<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { getPost, getComments, addComment } from '$lib/data/blog.js';
	import type { Post, Comment } from '$lib/data/types.js';

	let post: Post | null = null;
	let comments: Comment[] = [];
	let loading = true;
	let error: string | null = null;

	// Comment form
	let authorName = '';
	let authorEmail = '';
	let commentContent = '';
	let submitting = false;
	let commentSubmitted = false;

	onMount(async () => {
		try {
			const slug = $page.params.slug;
			post = await getPost(slug);
			if (post && post.id) {
				comments = await getComments(post.id);
			}
		} catch (err) {
			error = 'Post not found';
			console.error(err);
		} finally {
			loading = false;
		}
	});

	async function submitComment() {
		if (!post || !post.id || !authorName || !authorEmail || !commentContent) return;

		submitting = true;
		try {
			await addComment({
				post_id: post.id,
				author_name: authorName,
				author_email: authorEmail,
				content: commentContent,
				status: 'pending' //SECURITY VULNERABILITY: Client side could submit a comment with a status of 'approved'
			});

			// Reset form
			authorName = '';
			authorEmail = '';
			commentContent = '';
			commentSubmitted = true;

			// Hide success message after 5 seconds
			setTimeout(() => {
				commentSubmitted = false;
			}, 5000);
		} catch (err) {
			error = 'Failed to submit comment';
			console.error(err);
		} finally {
			submitting = false;
		}
	}
</script>

<svelte:head>
	<title>{post?.title || 'Blog Post'} - Spotlite Studios</title>
	<meta name="description" content={post?.excerpt || ''} />
	{#if post?.featured_image}
		<meta property="og:image" content={post.featured_image} />
	{/if}
</svelte:head>

<!-- Loading State -->
{#if loading}
	<section
		class="flex grow flex-col items-center justify-center bg-[linear-gradient(to_bottom,var(--color-base-300),var(--color-base-200))] px-6 py-12 pt-24 text-center"
	>
		<div class="loading loading-spinner loading-lg"></div>
		<p class="text-base-content/70 mt-6 text-lg">Loading post...</p>
	</section>
{:else if error || !post}
	<!-- Error State -->
	<section
		class="flex grow flex-col items-center justify-center bg-[linear-gradient(to_bottom,var(--color-base-300),var(--color-base-200))] px-6 py-12 pt-24 text-center"
	>
		<div class="mx-auto max-w-2xl">
			<div class="alert alert-error mb-8">
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
			<a href="/blog" class="btn btn-primary">
				<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 19l-7-7 7-7"
					/>
				</svg>
				Back to Blog
			</a>
		</div>
	</section>
{:else}
	<div class="w-full">
		<!-- Post Content -->
		<article class="mx-auto">
			<!-- Hero Section -->
			<section class="bg-blur p-6 pt-16">
				<!-- Breadcrumb -->
				<nav class="breadcrumbs p-4 text-sm">
					<ul>
						<li><a href="/" class="hover:text-primary transition-colors">Home</a></li>
						<li><a href="/blog" class="hover:text-primary transition-colors">Blog</a></li>
						<li class="text-primary">{post.title || 'Blog Post'}</li>
					</ul>
				</nav>
				<!-- Post Header -->
				<header class="text-center">
					<h1
						class="text-primary text-shadow-primary-content mb-6 text-4xl font-bold uppercase text-shadow-md md:text-5xl"
					>
						{post.title}
					</h1>
					<div
						class="text-base-content/70 mb-6 flex flex-col items-center justify-center gap-4 sm:flex-row"
					>
						<time
							datetime={post.published_at}
							class="text-shadow-primary-content text-sm text-shadow-md"
						>
							{new Date(post.published_at).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})}
						</time>
						{#if post.tags && post.tags.length > 0}
							<div class="flex flex-wrap gap-2">
								{#each post.tags as tag}
									<span class="badge badge-primary badge-outline badge-sm">{tag}</span>
								{/each}
							</div>
						{/if}
					</div>

					{#if post.featured_image}
						<img
							src={post.featured_image}
							alt={post.title}
							class="mx-auto mb-6 h-64 w-full max-w-4xl rounded-lg object-cover shadow-lg md:h-96"
						/>
					{/if}

					{#if post.excerpt}
						<div
							class="border-primary bg-base-100/50 text-base-content/80 mx-auto max-w-3xl border-l-4 p-4 text-lg italic"
						>
							{post.excerpt}
						</div>
					{/if}
				</header>
			</section>

			<!-- Post Content Section -->
			<section
				class="triangle px-6 py-12 pb-6 text-left"
				style="--triangle-color: var(--color-base-200);"
			>
				<div class="mx-auto max-w-4xl">
					<!-- Post Content -->
					<div class="prose prose-lg text-base-content mx-auto mb-12 max-w-none">
						{@html post.content}
					</div>

					<!-- Share Section -->
					<div class="border-primary border-t">
						<h3 class="text-primary mt-6 mb-4 text-xl font-semibold uppercase">Share this post</h3>
						<div class="flex gap-4">
							<a
								href="https://twitter.com/intent/tweet?text={encodeURIComponent(
									post.title
								)}&url={encodeURIComponent(window.location.href)}"
								target="_blank"
								rel="noopener noreferrer"
								class="btn btn-primary btn-outline"
							>
								<svg class="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
									<path
										d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
									/>
								</svg>
								Twitter
							</a>
							<a
								href="https://www.linkedin.com/sharing/share-offsite/?url={encodeURIComponent(
									window.location.href
								)}"
								target="_blank"
								rel="noopener noreferrer"
								class="btn btn-primary btn-outline"
							>
								<svg class="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
									<path
										d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
									/>
								</svg>
								LinkedIn
							</a>
						</div>
					</div>
				</div>
			</section>

			<!-- Comments Section -->
			<section class="bg-blur px-6 py-12 pt-16">
				<div class="mx-auto max-w-4xl">
					<h2
						class="text-primary text-shadow-primary-content mb-6 text-center text-3xl font-bold uppercase text-shadow-md"
					>
						Comments
					</h2>

					<!-- Comment Form -->
					<div class="card bg-base-100/70 border-primary mb-8 border-2 shadow-lg">
						<div class="card-body">
							<form on:submit|preventDefault={submitComment}>
								{#if commentSubmitted}
									<div class="alert alert-success mb-6">
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
												d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
											/>
										</svg>
										<span
											>Comment submitted successfully! It will be reviewed before appearing.</span
										>
									</div>
								{/if}

								<div class="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
									<input
										type="text"
										placeholder="Your Name"
										bind:value={authorName}
										required
										class="input input-bordered col-span-2 w-full md:col-span-1"
									/>
									<input
										type="email"
										placeholder="Your Email"
										bind:value={authorEmail}
										required
										class="input input-bordered col-span-2 w-full md:col-span-1"
									/>
								</div>
								<textarea
									placeholder="Your Comment"
									bind:value={commentContent}
									required
									class="textarea textarea-bordered h-24 w-full"
								></textarea>
								<button type="submit" disabled={submitting} class="btn btn-primary mt-4">
									{#if submitting}
										<span class="loading loading-spinner loading-sm"></span>
										Submitting...
									{:else}
										Submit Comment
									{/if}
								</button>
							</form>
						</div>
					</div>

					<!-- Comments List -->
					{#if comments.length > 0}
						<div class="space-y-6">
							<h3 class="text-primary text-left text-xl font-semibold uppercase">
								{comments.length} Comment{comments.length === 1 ? '' : 's'}
							</h3>
							{#each comments as comment}
								<div class="card bg-base-100/70 border-primary border-2 shadow-lg">
									<div class="card-body">
										<div class="mb-3 flex items-start justify-between">
											<h4 class="text-primary font-semibold">{comment.author_name}</h4>
											<time class="text-base-content/60 text-sm" datetime={comment.created_at}>
												{new Date(comment.created_at).toLocaleDateString('en-US', {
													year: 'numeric',
													month: 'short',
													day: 'numeric'
												})}
											</time>
										</div>
										<p class="text-base-content/80 text-left">{comment.content}</p>
									</div>
								</div>
							{/each}
						</div>
					{:else}
						<div class="py-12 text-center">
							<div class="icon icon-lg text-primary icon-comment-left-right mx-auto mb-4"></div>
							<h3 class="text-primary mb-2 text-xl font-semibold">No comments yet</h3>
							<p class="text-base-content/70">Be the first to comment!</p>
						</div>
					{/if}
				</div>
			</section>
		</article>
	</div>
{/if}
