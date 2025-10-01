<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { checkSlugExists, generateUniqueSlug } from '$lib/data/admin-blog.js';
	import type { Post } from '$lib/data/types.js';
	import ImageUpload from './ImageUpload.svelte';
	import TipTapEditor from './TipTapEditor.svelte';

	export let post: Partial<Post> = {
		title: '',
		slug: '',
		content: '',
		excerpt: '',
		featured_image: '',
		status: 'draft',
		tags: []
	};

	export let loading = false;
	export let error: string | null = null;
	export let editMode = false; // New prop to determine if we're editing an existing post

	const dispatch = createEventDispatcher();

	let tagInput = '';
	let slugError: string | null = null;
	let slugSuggestion: string | null = null;
	let checkingSlug = false;

	function generateSlug(title: string): string {
		return title
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/(^-|-$)/g, '');
	}

	async function validateSlug(slug: string): Promise<boolean> {
		if (!slug.trim()) {
			slugError = 'Slug is required.';
			return false;
		}

		checkingSlug = true;
		slugError = null;
		slugSuggestion = null;

		try {
			const exists = await checkSlugExists(slug, editMode ? post.id : undefined);

			if (exists) {
				slugError = 'This slug is already in use.';
				slugSuggestion = await generateUniqueSlug(slug, editMode ? post.id : undefined);
				return false;
			}
			return true;
		} catch (err) {
			console.error('Error validating slug:', err);
			slugError = 'Error checking slug availability.';
			return false;
		} finally {
			checkingSlug = false;
		}
	}

	function handleTitleChange() {
		// Only auto-generate slug if we're not in edit mode
		if (!editMode) {
			const newSlug = generateSlug(post.title || '');
			post.slug = newSlug;
			// Clear any previous slug errors when auto-generating
			slugError = null;
			slugSuggestion = null;
		}
	}

	function useSuggestion() {
		if (slugSuggestion) {
			post.slug = slugSuggestion;
			slugError = null;
			slugSuggestion = null;
		}
	}

	function addTag() {
		const tag = tagInput.trim();
		if (tag && !post.tags?.includes(tag)) {
			post.tags = [...(post.tags || []), tag];
			tagInput = '';
		}
	}

	function removeTag(tagToRemove: string) {
		post.tags = post.tags?.filter((tag) => tag !== tagToRemove) || [];
	}

	async function handleSubmit() {
		// Validate slug before submitting
		const slugValid = await validateSlug(post.slug || '');
		if (!slugValid) {
			error = 'Please fix the slug error before submitting.';
			return;
		}
		error = null;
		dispatch('submit', post);
	}

	async function handleSaveDraft() {
		// Validate slug before submitting
		const slugValid = await validateSlug(post.slug || '');
		if (!slugValid) {
			error = 'Please fix the slug error before submitting.';
			return;
		}
		error = null;
		post.status = 'draft';
		dispatch('submit', post);
	}

	async function handlePublish() {
		// Validate slug before submitting
		const slugValid = await validateSlug(post.slug || '');
		if (!slugValid) {
			error = 'Please fix the slug error before submitting.';
			return;
		}
		error = null;
		post.status = 'published';
		if (!post.published_at) {
			post.published_at = new Date().toISOString();
		}
		dispatch('submit', post);
	}

	function handleImageUpload(url: string) {
		post.featured_image = url;
	}
</script>

<div class="mx-auto w-full">
	{#if error}
		<div class="alert alert-error mb-6">
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

	<form on:submit|preventDefault={handleSubmit} class="space-y-6">
		<!-- Title -->
		<div class="grid grid-cols-1 gap-4 lg:grid-cols-5">
			<div class="lg:col-span-1">
				<label class="label" for="title">
					<span class="label-text font-semibold">Title *</span>
				</label>
			</div>
			<div class="lg:col-span-4">
				<input
					id="title"
					type="text"
					bind:value={post.title}
					on:input={handleTitleChange}
					placeholder="Enter post title..."
					required
					class="input input-bordered w-full"
				/>
			</div>
		</div>

		<!-- Slug -->
		<div class="grid grid-cols-1 gap-4 lg:grid-cols-5">
			<div class="lg:col-span-1">
				<label class="label" for="slug">
					<span class="label-text font-semibold">Slug *</span>
				</label>
			</div>
			<div class="lg:col-span-4">
				<div class="relative">
					<input
						id="slug"
						type="text"
						bind:value={post.slug}
						placeholder="post-url-slug"
						required
						class="input input-bordered w-full {slugError ? 'input-error' : ''}"
					/>
					{#if checkingSlug}
						<div class="absolute top-1/2 right-3 -translate-y-1/2">
							<span class="loading loading-spinner loading-xs"></span>
						</div>
					{/if}
				</div>

				<label class="label">
					<span class="label-text-alt">URL: /blog/{post.slug || 'your-slug'}</span>
				</label>

				{#if slugError}
					<div class="alert alert-error mt-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4 shrink-0 stroke-current"
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
						<span class="text-sm">{slugError}</span>
					</div>
				{/if}

				{#if slugSuggestion}
					<div class="alert alert-info mt-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4 shrink-0 stroke-current"
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
						<div class="flex-1">
							<span class="text-sm"
								>Suggested slug: <code class="bg-base-200 text-base-content rounded px-1"
									>{slugSuggestion}</code
								></span
							>
						</div>
						<button type="button" on:click={useSuggestion} class="btn btn-sm btn-primary">
							Use This
						</button>
					</div>
				{/if}
			</div>
		</div>

		<!-- Featured Image -->
		<div class="grid grid-cols-1 gap-4 lg:grid-cols-5">
			<div class="lg:col-span-1">
				<label class="label" for="featured_image">
					<span class="label-text font-semibold">Featured Image</span>
				</label>
			</div>
			<div class="lg:col-span-4">
				<ImageUpload value={post.featured_image || ''} onUpload={handleImageUpload} />
			</div>
		</div>

		<!-- Excerpt -->
		<div class="grid grid-cols-1 gap-4 lg:grid-cols-5">
			<div class="lg:col-span-1">
				<label class="label" for="excerpt">
					<span class="label-text font-semibold">Excerpt</span>
				</label>
			</div>
			<div class="lg:col-span-4">
				<textarea
					id="excerpt"
					bind:value={post.excerpt}
					placeholder="Brief description of the post..."
					rows="3"
					class="textarea textarea-bordered w-full resize-none"
				></textarea>
			</div>
		</div>

		<!-- Tags -->
		<div class="grid grid-cols-1 gap-4 lg:grid-cols-5">
			<div class="lg:col-span-1">
				<label class="label">
					<span class="label-text font-semibold">Tags</span>
				</label>
			</div>
			<div class="lg:col-span-4">
				<div class="mb-2 flex gap-2">
					<input
						type="text"
						bind:value={tagInput}
						placeholder="Add a tag..."
						class="input input-bordered flex-1"
						on:keydown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
					/>
					<button type="button" on:click={addTag} class="btn btn-outline btn-sm"> Add </button>
				</div>
				{#if post.tags && post.tags.length > 0}
					<div class="flex flex-wrap gap-2">
						{#each post.tags as tag}
							<span class="badge badge-primary badge-outline">
								{tag}
								<button
									type="button"
									on:click={() => removeTag(tag)}
									class="hover:bg-primary hover:text-primary-content ml-1 flex h-4 w-4 items-center justify-center rounded-full"
								>
									×
								</button>
							</span>
						{/each}
					</div>
				{/if}
			</div>
		</div>

		<!-- Content -->
		<div class="grid grid-cols-1 gap-4 lg:grid-cols-5">
			<div class="lg:col-span-1">
				<label class="label" for="content">
					<span class="label-text font-semibold">Content *</span>
				</label>
			</div>
			<div class="lg:col-span-4">
				<TipTapEditor bind:content={post.content} />
				<label class="label">
					<span class="label-text-alt">Rich text editor with formatting options</span>
				</label>
			</div>
		</div>

		<!-- Action Buttons -->
		<div class="grid grid-cols-1 gap-4 lg:grid-cols-5">
			<div class="lg:col-span-1">
				<!-- Empty space for alignment -->
			</div>
			<div class="lg:col-span-4">
				<div class="flex gap-4 border-t pt-6">
					<button
						type="button"
						on:click={handleSaveDraft}
						disabled={loading}
						class="btn btn-outline"
					>
						{#if loading}
							<span class="loading loading-spinner loading-sm"></span>
						{/if}
						Save Draft
					</button>
					<button type="button" on:click={handlePublish} disabled={loading} class="btn btn-primary">
						{#if loading}
							<span class="loading loading-spinner loading-sm"></span>
						{/if}
						Publish
					</button>
				</div>
			</div>
		</div>
	</form>
</div>
