<script lang="ts">
	import { ensureConvexClient } from '$lib/convex/client';

	ensureConvexClient();

	let { children } = $props();
</script>

{@render children?.()}
