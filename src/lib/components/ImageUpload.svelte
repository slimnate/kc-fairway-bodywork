<script lang="ts">
	import { uploadImage, validateImage, generateImagePath } from '$lib/storage.js';

	export let value = '';
	export let onUpload: (url: string) => void = () => {};

	let uploading = false;
	let error: string | null = null;
	let dragOver = false;

	function handleFileSelect(event: Event) {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];

		if (!file) return;

		handleFileUpload(file);
	}

	async function handleFileUpload(file: File) {
		// Validate file
		const validation = validateImage(file);
		if (!validation.valid) {
			error = validation.error || 'Invalid file';
			return;
		}

		uploading = true;
		error = null;

		try {
			const path = generateImagePath(file);
			const result = await uploadImage(file, path);
			value = result.url;
			onUpload(result.url);
		} catch (err: any) {
			error = err.message || 'Upload failed. Please try again.';
		} finally {
			uploading = false;
		}
	}

	function handleDragOver(event: DragEvent) {
		event.preventDefault();
		dragOver = true;
	}

	function handleDragLeave(event: DragEvent) {
		event.preventDefault();
		dragOver = false;
	}

	function handleDrop(event: DragEvent) {
		event.preventDefault();
		dragOver = false;

		const files = event.dataTransfer?.files;
		if (files && files.length > 0) {
			handleFileUpload(files[0]);
		}
	}

	function clearImage() {
		value = '';
		onUpload('');
		error = null;
	}
</script>

<div class="space-y-4">
	<!-- Upload Area -->
	<div
		role="button"
		tabindex="0"
		class="rounded-lg border-2 border-dashed p-6 text-center transition-colors {dragOver
			? 'border-custom bg-primary/5'
			: 'border-base-300'}"
		on:dragover={handleDragOver}
		on:dragleave={handleDragLeave}
		on:drop={handleDrop}
	>
		{#if uploading}
			<div class="flex flex-col items-center gap-2">
				<span class="loading loading-spinner loading-lg text-primary"></span>
				<p class="text-base-content/70 text-sm">Uploading image...</p>
			</div>
		{:else if value}
			<div class="space-y-4">
				<img src={value} alt="Uploaded preview" class="mx-auto max-h-48 rounded-lg shadow-md" />
				<div class="flex justify-center gap-2">
					<button type="button" on:click={clearImage} class="btn btn-outline btn-sm">
						Remove Image
					</button>
				</div>
			</div>
		{:else}
			<div class="space-y-4">
				<svg
					class="text-base-content/30 mx-auto h-12 w-12"
					stroke="currentColor"
					fill="none"
					viewBox="0 0 48 48"
				>
					<path
						d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
				<div>
					<p class="text-base-content/70 text-sm">
						Drag and drop an image here, or
						<label for="image-upload" class="text-primary hover:text-primary-focus cursor-pointer">
							browse files
						</label>
					</p>
					<p class="text-base-content/50 mt-1 text-xs">PNG, JPG, WebP, GIF up to 5MB</p>
				</div>
			</div>
		{/if}
	</div>

	<!-- File Input (hidden) -->
	<input
		id="image-upload"
		type="file"
		accept="image/*"
		on:change={handleFileSelect}
		disabled={uploading}
		class="hidden"
	/>

	<!-- URL Input -->
	<div class="space-y-2">
		<label class="label" for="image-url">
			<span class="label-text font-medium">Or enter image URL:</span>
		</label>
		<input
			id="image-url"
			type="url"
			bind:value
			placeholder="https://example.com/image.jpg"
			class="input input-bordered w-full"
			on:input={() => onUpload(value)}
		/>
	</div>

	<!-- Error Message -->
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
</div>
