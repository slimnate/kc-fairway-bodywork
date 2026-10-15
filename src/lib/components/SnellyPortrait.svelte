<script lang="ts">
	import { staticImages } from '$lib/data/images';

	let {
		class: className = '',
		priority = false
	}: { class?: string; priority?: boolean } = $props();
</script>

<div class="snelly-portrait-wrap {className}">
	<img
		src={staticImages.snelly.src}
		width={staticImages.snelly.width}
		height={staticImages.snelly.height}
		loading={priority ? 'eager' : 'lazy'}
		fetchpriority={priority ? 'high' : 'auto'}
		decoding="async"
		alt="Anthony Snell, KC Fairway Bodywork"
		class="snelly-portrait"
	/>
</div>

<style>
	.snelly-portrait-wrap {
		width: min(512px, 100%);
		max-width: 100%;
		margin-inline: auto;
	}

	.snelly-portrait {
		display: block;
		aspect-ratio: 1 / 1;
		width: 100%;
		height: auto;
		object-fit: cover;
		border-radius: 9999px;
		opacity: 0.8;
	}
</style>
