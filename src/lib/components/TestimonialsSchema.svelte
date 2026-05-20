<script lang="ts">
	import { buildTestimonialsJsonLd } from '$lib/seo/testimonials-schema';

	const jsonLd = buildTestimonialsJsonLd();
</script>

<svelte:head>
	{#if jsonLd}
		<script type="application/ld+json">
			{JSON.stringify(jsonLd)}
		</script>
	{/if}
</svelte:head>
