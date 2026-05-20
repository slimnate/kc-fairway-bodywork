<script lang="ts">
	import { buildFaqPageJsonLd } from '$lib/seo/faq-schema';

	const jsonLd = JSON.stringify(buildFaqPageJsonLd());
</script>

<svelte:head>
	<script type="application/ld+json">
		{jsonLd}
	</script>
</svelte:head>
