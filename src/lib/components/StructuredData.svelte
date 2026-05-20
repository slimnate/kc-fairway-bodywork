<script lang="ts">
	import { buildLocalBusinessJsonLd } from '$lib/seo/structured-data';

	const jsonLd = JSON.stringify(buildLocalBusinessJsonLd());
</script>

<svelte:head>
	<script type="application/ld+json">
		{jsonLd}
	</script>
</svelte:head>
