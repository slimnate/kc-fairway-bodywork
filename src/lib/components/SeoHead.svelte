<script lang="ts">
	import { page } from '$app/state';
	import meta, { ogImageUrl } from '$lib/data/meta.js';

	let {
		title,
		description = meta.description,
		keywords = '',
		ogImage = ogImageUrl,
		noindex = false
	}: {
		title: string;
		description?: string;
		keywords?: string;
		ogImage?: string;
		noindex?: boolean;
	} = $props();

	const canonical = $derived(`${meta.siteUrl}${page.url.pathname || '/'}`);
	const robots = $derived(noindex ? 'noindex, nofollow' : 'index, follow');
	const trimmedKeywords = $derived(keywords.trim());
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="robots" content={robots} />
	{#if trimmedKeywords}
		<meta name="keywords" content={trimmedKeywords} />
	{/if}
	<link rel="canonical" href={canonical} />

	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:url" content={canonical} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={meta.name} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage} />
</svelte:head>
