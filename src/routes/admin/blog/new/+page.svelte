<script lang="ts">
	import { useConvexClient } from 'convex-svelte';
	import { api } from '../../../../convex/_generated/api';
	import { goto } from '$app/navigation';
	import MarkdownEditor from '$lib/components/MarkdownEditor.svelte';
	import TagInput from '$lib/components/forms/TagInput.svelte';
	import type { Id } from '../../../../convex/_generated/dataModel';
	import { toast } from '$lib/stores/toast';

	// Form state
	let title = $state('');
	let slug = $state('');
	let content = $state('');
	let excerpt = $state('');
	let featuredImageStorageId = $state<Id<'_storage'> | undefined>(undefined);
	let featuredImagePreview = $state<string | undefined>(undefined);
	let tags = $state<string[]>([]);
	let status = $state<'draft' | 'published'>('draft');
	let slugManuallyEdited = $state(false);
	let isSubmitting = $state(false);
	let error = $state<string | null>(null);
	let isUploadingCover = $state(false);
	let isGeneratingExcerpt = $state(false);
	let isGeneratingTags = $state(false);
	let suggestedTags = $state<string[]>([]);

	const convex = useConvexClient();

	// Generate slug from title
	function generateSlug(text: string): string {
		return text
			.toLowerCase()
			.trim()
			.replace(/[^\w\s-]/g, '')
			.replace(/\s+/g, '-')
			.replace(/-+/g, '-');
	}

	// Auto-generate slug from title
	$effect(() => {
		if (title && !slugManuallyEdited) {
			slug = generateSlug(title);
		}
	});

	// Handle cover image upload
	async function handleCoverImageUpload(event: Event) {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];
		if (!file) return;

		if (!file.type.startsWith('image/')) {
			error = 'Please select an image file';
			toast.error('Please select an image file');
			return;
		}

		isUploadingCover = true;
		error = null;

		try {
			// Get upload URL from Convex
			const { url: uploadUrl } = await convex.action(api.uploads.generateUploadUrl, {});

			// Upload file to Convex storage
			const response = await fetch(uploadUrl, {
				method: 'POST',
				headers: { 'Content-Type': file.type },
				body: file
			});

			if (!response.ok) {
				throw new Error('Upload failed');
			}

			// Get storage ID from response
			const result = await response.json();
			const storageId = (result.storageId || result.id) as Id<'_storage'>;

			if (!storageId) {
				throw new Error('No storage ID returned from upload');
			}

			featuredImageStorageId = storageId;

			// Get preview URL
			const { url: previewUrl } = await convex.action(api.uploads.getPublicUrl, {
				id: storageId
			});
			featuredImagePreview = previewUrl ?? undefined;
			toast.success('Cover image uploaded successfully');
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Failed to upload cover image';
			error = errorMessage;
			toast.error(errorMessage);
		} finally {
			isUploadingCover = false;
		}
	}

	async function handleSubmit() {
		error = null;

		// Validate
		if (!title.trim()) {
			error = 'Title is required';
			return;
		}
		if (!slug.trim()) {
			error = 'Slug is required';
			return;
		}
		if (!content.trim()) {
			error = 'Content is required';
			return;
		}

		isSubmitting = true;

		try {
			const postId = await convex.mutation(api.blog.createPost, {
				title: title.trim(),
				slug: slug.trim(),
				content: content.trim(),
				excerpt: excerpt.trim() || undefined,
				featuredImageStorageId,
				tags,
				status
			});

			toast.success(
				status === 'published' ? 'Blog post published successfully' : 'Blog post saved as draft'
			);
			// Navigate to edit page on success
			goto(`/admin/blog/${postId}/edit`);
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Failed to create post';
			error = errorMessage;
			toast.error(errorMessage);
			isSubmitting = false;
		}
	}

	function handleCancel() {
		goto('/admin/blog');
	}

	async function handleGenerateExcerpt() {
		if (!title.trim() || !content.trim()) {
			const errorMessage = 'Title and content are required to generate an excerpt';
			error = errorMessage;
			toast.error(errorMessage);
			return;
		}

		isGeneratingExcerpt = true;
		error = null;

		try {
			const generatedExcerpt = await convex.action(api.blogActions.generateExcerpt, {
				title: title.trim(),
				content: content.trim()
			});
			excerpt = generatedExcerpt;
			toast.success('Excerpt generated successfully');
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Failed to generate excerpt';
			error = errorMessage;
			toast.error(errorMessage);
		} finally {
			isGeneratingExcerpt = false;
		}
	}

	async function handleGenerateTagSuggestions() {
		if (!title.trim() || !content.trim()) {
			const errorMessage = 'Title and content are required to generate tag suggestions';
			error = errorMessage;
			toast.error(errorMessage);
			return;
		}

		isGeneratingTags = true;
		error = null;

		try {
			const generated = await convex.action(api.blogActions.generateTagSuggestions, {
				title: title.trim(),
				content: content.trim()
			});
			// Filter out tags that are already in the current tags list
			suggestedTags = generated.filter((tag) => !tags.includes(tag));
			toast.success(
				suggestedTags.length > 0
					? `Generated ${suggestedTags.length} tag suggestion${suggestedTags.length > 1 ? 's' : ''}`
					: 'Tag suggestions generated (no new suggestions)'
			);
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : 'Failed to generate tag suggestions';
			error = errorMessage;
			toast.error(errorMessage);
		} finally {
			isGeneratingTags = false;
		}
	}

	function addSuggestedTag(tag: string) {
		if (!tags.includes(tag)) {
			tags = [...tags, tag];
		}
		// Remove from suggestions
		suggestedTags = suggestedTags.filter((t) => t !== tag);
	}

	function addAllSuggestedTags() {
		const newTags = suggestedTags.filter((tag) => !tags.includes(tag));
		tags = [...tags, ...newTags];
		suggestedTags = [];
	}

	function dismissSuggestions() {
		suggestedTags = [];
	}
</script>

<div class="space-y-6">
	<!-- Header -->
	<div class="flex items-end justify-between gap-4 px-2 pt-12 text-left md:px-4 md:pt-4">
		<div class="flex flex-col gap-2">
			<h1 class="text-primary text-3xl font-bold">Create New Blog Post</h1>
			<p class="text-base-content/60">Write and publish a new blog post</p>
		</div>
		<div>
			<button
				class="btn border-primary/30 hover:border-primary hover:bg-primary/10"
				onclick={handleCancel}
			>
				Cancel
			</button>
		</div>
	</div>

	<!-- Error Message -->
	{#if error}
		<div class="alert alert-error shadow-lg">
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

	<!-- Form -->
	<div
		class="card border-primary/20 from-base-100 via-base-100 to-base-200/50 rounded-2xl border-2 bg-gradient-to-br shadow-xl backdrop-blur-sm"
	>
		<div class="card-body space-y-6">
			<!-- Title -->
			<div class="flex items-center gap-4">
				<label for="title" class="label w-40 shrink-0">
					<span class="label-text text-primary font-semibold">Title *</span>
				</label>
				<div class="flex-1">
					<input
						id="title"
						type="text"
						placeholder="Enter post title..."
						class="input input-bordered border-primary/30 focus:border-primary focus:outline-primary w-full"
						bind:value={title}
						required
					/>
				</div>
			</div>

			<!-- Slug -->
			<div class="flex items-center gap-4">
				<label for="slug" class="label w-40 shrink-0">
					<span class="label-text text-primary font-semibold">Slug *</span>
					<span class="label-text-alt text-base-content/60 text-xs">URL-friendly</span>
				</label>
				<div class="flex-1">
					<input
						id="slug"
						type="text"
						placeholder="post-slug"
						class="input input-bordered border-primary/30 focus:border-primary focus:outline-primary w-full font-mono"
						bind:value={slug}
						oninput={() => (slugManuallyEdited = true)}
						required
					/>
				</div>
			</div>

			<!-- Content -->
			<div class="flex items-start gap-4">
				<label for="content" class="label w-40 shrink-0 pt-2">
					<span class="label-text text-primary font-semibold">Content *</span>
					<span class="label-text-alt text-base-content/60 text-xs">Markdown</span>
				</label>
				<div class="flex-1">
					<MarkdownEditor bind:value={content} placeholder="Write your blog post content here..." />
				</div>
			</div>

			<!-- Excerpt -->
			<div class="flex items-start gap-4">
				<label for="excerpt" class="label w-40 shrink-0 pt-2">
					<span class="label-text text-primary font-semibold">Excerpt</span>
					<span class="label-text-alt text-base-content/60 text-xs">Optional</span>
				</label>
				<div class="flex-1">
					<div class="mb-2 flex items-center gap-2">
						<div
							class="tooltip tooltip-right"
							data-tip="This feature costs money and should only be used after the post content is finalized."
						>
							<button
								type="button"
								class="btn btn-sm btn-outline btn-primary"
								onclick={handleGenerateExcerpt}
								disabled={isGeneratingExcerpt || !title.trim() || !content.trim()}
							>
								{#if isGeneratingExcerpt}
									<span class="loading loading-spinner loading-xs"></span>
									Generating...
								{:else}
									Generate Excerpt
								{/if}
							</button>
						</div>
					</div>
					<textarea
						id="excerpt"
						placeholder="Brief summary of the post (auto-generated if left empty)..."
						class="textarea textarea-bordered border-primary/30 focus:border-primary focus:outline-primary h-24 w-full"
						bind:value={excerpt}
					></textarea>
				</div>
			</div>

			<!-- Featured Image -->
			<div class="flex items-start gap-4">
				<label for="featuredImage" class="label w-40 shrink-0 pt-2">
					<span class="label-text text-primary font-semibold">Featured Image</span>
					<span class="label-text-alt text-base-content/60 text-xs">Optional</span>
				</label>
				<div class="flex-1">
					<input
						id="featuredImage"
						type="file"
						accept="image/*"
						class="file-input file-input-bordered border-primary/30 focus:border-primary focus:outline-primary w-full"
						onchange={handleCoverImageUpload}
						disabled={isUploadingCover}
					/>
					{#if isUploadingCover}
						<div class="mt-2">
							<span class="loading loading-spinner loading-sm"></span>
							<span class="text-base-content/60 ml-2 text-sm">Uploading...</span>
						</div>
					{/if}
					{#if featuredImagePreview}
						<div class="mt-2">
							<img
								src={featuredImagePreview}
								alt="Featured image preview"
								class="max-h-48 rounded-lg"
							/>
						</div>
					{/if}
				</div>
			</div>

			<!-- Tags -->
			<div class="flex items-start gap-4">
				<label for="tags" class="label w-40 shrink-0 pt-2">
					<span class="label-text text-primary font-semibold">Tags</span>
					<span class="label-text-alt text-base-content/60 text-xs">Press Enter to add</span>
				</label>
				<div class="flex-1">
					<div class="mb-2 flex items-center gap-2">
						<div
							class="tooltip tooltip-right"
							data-tip="This feature costs money and should only be used after the post content is finalized."
						>
							<button
								type="button"
								class="btn btn-sm btn-outline btn-primary"
								onclick={handleGenerateTagSuggestions}
								disabled={isGeneratingTags || !title.trim() || !content.trim()}
							>
								{#if isGeneratingTags}
									<span class="loading loading-spinner loading-xs"></span>
									Generating...
								{:else}
									Generate Tag Suggestions
								{/if}
							</button>
						</div>
					</div>
					<TagInput id="tags" bind:tags placeholder="Type a tag and press Enter" />
					{#if suggestedTags.length > 0}
						<div class="border-primary/20 bg-base-200/50 mt-3 rounded-lg border-2 p-3">
							<div class="mb-2 flex items-center justify-between">
								<span class="text-primary text-sm font-semibold">Suggested Tags</span>
								<div class="flex gap-2">
									{#if suggestedTags.length > 1}
										<button
											type="button"
											class="btn btn-xs btn-ghost text-primary hover:bg-primary/10"
											onclick={addAllSuggestedTags}
										>
											Add All
										</button>
									{/if}
									<button
										type="button"
										class="btn btn-xs btn-ghost text-base-content/60 hover:bg-base-300"
										onclick={dismissSuggestions}
									>
										Dismiss
									</button>
								</div>
							</div>
							<div class="flex flex-wrap gap-2">
								{#each suggestedTags as tag}
									<button
										type="button"
										class="badge badge-lg border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer transition-all hover:shadow-md"
										onclick={() => addSuggestedTag(tag)}
										title="Click to add this tag"
									>
										{tag}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="ml-1 h-3 w-3"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											stroke-width="2"
										>
											<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
										</svg>
									</button>
								{/each}
							</div>
						</div>
					{/if}
				</div>
			</div>

			<!-- Status -->
			<div class="flex items-center gap-4">
				<label class="label w-40 shrink-0">
					<span class="label-text text-primary font-semibold">Status</span>
				</label>
				<div class="flex flex-1 gap-4">
					<label class="label cursor-pointer gap-2">
						<input
							type="radio"
							name="status"
							class="radio radio-primary"
							value="draft"
							bind:group={status}
						/>
						<span class="label-text">Draft</span>
					</label>
					<label class="label cursor-pointer gap-2">
						<input
							type="radio"
							name="status"
							class="radio radio-primary"
							value="published"
							bind:group={status}
						/>
						<span class="label-text">Published</span>
					</label>
				</div>
			</div>

			<!-- Form Actions -->
			<div class="flex justify-end gap-4 pt-4">
				<button
					class="btn border-primary/30 hover:border-primary hover:bg-primary/10"
					onclick={handleCancel}
					disabled={isSubmitting}
				>
					Cancel
				</button>
				{#if status === 'draft'}
					<button
						class="btn btn-primary shadow-lg transition-all hover:shadow-xl"
						onclick={handleSubmit}
						disabled={isSubmitting}
					>
						{#if isSubmitting}
							<span class="loading loading-spinner loading-sm"></span>
							Saving...
						{:else}
							Save Draft
						{/if}
					</button>
				{:else}
					<button
						class="btn btn-primary shadow-lg transition-all hover:shadow-xl"
						onclick={handleSubmit}
						disabled={isSubmitting}
					>
						{#if isSubmitting}
							<span class="loading loading-spinner loading-sm"></span>
							Publishing...
						{:else}
							Publish
						{/if}
					</button>
				{/if}
			</div>
		</div>
	</div>
</div>
