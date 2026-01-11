<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Crepe, CrepeFeature } from '@milkdown/crepe';
	import '@milkdown/crepe/theme/common/style.css';
	import '@milkdown/crepe/theme/frame.css';
	import { useConvexClient } from 'convex-svelte';
	import { api } from '../../convex/_generated/api';
	import type { Id } from '../../convex/_generated/dataModel';

	interface Props {
		value: string;
		placeholder?: string;
	}

	let { value = $bindable(), placeholder = 'Write your content here...' }: Props = $props();

	let editorContainer: HTMLDivElement;
	let crepeInstance: Crepe | null = null;
	let isInitialized = $state(false);
	let lastSyncedValue = $state(value);
	const convex = useConvexClient();

	// Map to store URL -> storageId mappings for converting back to convex: references
	const urlToStorageIdMap = $state(new Map<string, string>());

	/**
	* Resolve convex:${storageId} references to actual image URLs
	 */
	async function resolveConvexImages(markdown: string): Promise<string> {
		const convexImageRegex = /!\[([^\]]*)\]\(convex:([^)]+)\)/g;
		const imageMatches = [...markdown.matchAll(convexImageRegex)];

		if (imageMatches.length === 0) {
			return markdown;
		}

		let resolvedMarkdown = markdown;

		// Resolve all image IDs to public URLs
		await Promise.all(
			imageMatches.map(async (match) => {
				const storageId = match[2] as Id<'_storage'>;
				try {
					const { url } = await convex.action(api.uploads.getPublicUrl, { id: storageId });
					if (url) {
						// Store mapping for later conversion back
						urlToStorageIdMap.set(url, storageId);
						// Replace convex: reference with actual URL
						resolvedMarkdown = resolvedMarkdown.replace(
							new RegExp(
								`!\\[([^\\]]*)\\]\\(convex:${storageId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)`,
								'g'
							),
							`![${match[1]}](${url})`
						);
					}
				} catch (err) {
					console.error(`Failed to resolve image URL for ${storageId}:`, err);
				}
			})
		);

		return resolvedMarkdown;
	}

	/**
	* Convert image URLs back to convex:${storageId} references
	 */
	function convertUrlsToConvex(markdown: string): string {
		let convertedMarkdown = markdown;

		// Find all image URLs and convert back to convex: references if we have the mapping
		const imageUrlRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
		const urlMatches = [...markdown.matchAll(imageUrlRegex)];

		for (const match of urlMatches) {
			const url = match[2];
			// Skip if already a convex: reference
			if (url.startsWith('convex:')) {
				continue;
			}
			const storageId = urlToStorageIdMap.get(url);
			if (storageId) {
				// Replace URL with convex: reference
				convertedMarkdown = convertedMarkdown.replace(
					new RegExp(`!\\[([^\\]]*)\\]\\(${url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)`, 'g'),
					`![${match[1]}](convex:${storageId})`
				);
			}
		}

		return convertedMarkdown;
	}

	// Helper function to create editor instance
	async function createEditor(initialValue: string) {
		if (!editorContainer) return;

		// Configure image upload handler for Convex
		const handleImageUpload = async (file: File): Promise<string> => {
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
					console.error('Upload failed', response);
					throw new Error('Upload failed');
				}

				// Convex returns the storage ID in the response body as JSON
				const result = await response.json();
				const storageId = result.storageId || result.id || '';

				if (!storageId) {
					throw new Error('No storage ID returned from upload');
				}

				// Get public URL for immediate display in editor
				const { url } = await convex.action(api.uploads.getPublicUrl, {
					id: storageId as Id<'_storage'>
				});
				if (url) {
					// Store mapping for later conversion back
					urlToStorageIdMap.set(url, storageId);
					// Return markdown image syntax with actual URL for display
					return url;
				}
				// Fallback to convex: reference if URL is not available
				return `convex:${storageId}`;
			} catch (error) {
				console.error('Failed to upload image:', error);
				return '';
			}
		};

		// Resolve convex: IDs to URLs before initializing editor
		const resolvedValue = await resolveConvexImages(initialValue || '');

		// Initialize Crepe editor with features and configurations
		crepeInstance = new Crepe({
			root: editorContainer,
			defaultValue: resolvedValue,
			features: {
				[CrepeFeature.Placeholder]: true,
				[CrepeFeature.ImageBlock]: true
			},
			featureConfigs: {
				[CrepeFeature.Placeholder]: {
					text: placeholder,
					mode: 'block'
				},
				[CrepeFeature.ImageBlock]: {
					onUpload: handleImageUpload
				}
			}
		});

		// Set up listener for markdown updates
		crepeInstance.on((api) => {
			api.markdownUpdated((ctx, markdown, prevMarkdown) => {
				if (markdown !== prevMarkdown && isInitialized) {
					// Convert URLs back to convex: references before saving
					const convertedMarkdown = convertUrlsToConvex(markdown);
					value = convertedMarkdown;
					lastSyncedValue = convertedMarkdown;
				}
			});
		});

		await crepeInstance.create();
		isInitialized = true;
		// Update lastSyncedValue to the raw value (with convex: references) after initialization
		lastSyncedValue = initialValue;
	}

	let isMounting = $state(false);
	let pendingValue: string | null = null;

	onMount(async () => {
		isMounting = true;
		// Store the initial value
		const initialValue = value;
		// Initialize with current value (might be empty initially)
		await createEditor(initialValue);
		isMounting = false;

		// After mount completes, check if value changed during mount
		if (pendingValue !== null && pendingValue !== initialValue) {
			await updateEditorContent();
		} else if (value !== initialValue) {
			await updateEditorContent();
		}
		pendingValue = null;
	});

	// Watch for external value changes and update editor
	$effect(() => {
		// Track value to ensure effect runs when it changes
		const currentValue = value;

		// If still mounting, store the value to check after mount completes
		if (isMounting) {
			pendingValue = currentValue;
			return;
		}

		// Skip if editor not initialized
		if (!crepeInstance || !isInitialized) {
			return;
		}

		// Check if value has changed externally
		if (currentValue !== lastSyncedValue) {
			updateEditorContent();
		}
	});

	async function updateEditorContent() {
		if (!crepeInstance || !isInitialized || isMounting) return;

		// When value changes externally (e.g., loading existing post), update editor
		// Check if the value actually differs from current editor content
		const currentMarkdown = crepeInstance.getMarkdown();
		// Convert current markdown back to compare with raw value
		const currentConverted = convertUrlsToConvex(currentMarkdown);

		// Always recreate if value is non-empty and different from current editor content
		// This handles the case where editor was initialized with empty string and then value is set
		if (value && value !== currentConverted) {
			// Recreate editor with new value
			// This happens when loading existing content, so losing cursor position is acceptable
			isInitialized = false;
			await crepeInstance.destroy();
			crepeInstance = null;
			await createEditor(value);
		} else if (!value && currentConverted) {
			// Value is empty but editor has content - clear it
			isInitialized = false;
			await crepeInstance.destroy();
			crepeInstance = null;
			await createEditor('');
		} else {
			// Value matches current editor content, just update lastSyncedValue
			lastSyncedValue = value;
		}
	}

	onDestroy(async () => {
		if (crepeInstance) {
			await crepeInstance.destroy();
			crepeInstance = null;
		}
	});
</script>

<!-- Editor -->
<div class="flex-1 text-left">
	<div bind:this={editorContainer} class="milkdown-editor"></div>
</div>

<style>
	:global(.milkdown) {
		min-height: 600px;
		z-index: 1000;
	}

	:global(.milkdown-editor) {
		outline: none;
		padding: 1rem;
		min-height: 400px;
	}

	:global(.milkdown-editor .editor) {
		outline: none;
	}
</style>
