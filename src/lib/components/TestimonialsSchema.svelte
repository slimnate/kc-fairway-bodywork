<script lang="ts">
	import { buildTestimonialsJsonLd } from '$lib/seo/testimonials-schema';

	const jsonLd = buildTestimonialsJsonLd();
</script>

{#if jsonLd}
	<svelte:head>
		<script type="application/ld+json">
			{JSON.stringify(jsonLd)}
		</script>
	</svelte:head>
{/if}
