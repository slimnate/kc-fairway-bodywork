<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';

	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import StructuredData from '$lib/components/StructuredData.svelte';
	import { navbarItems, footerNavItems } from '$lib/data/nav.js';
	import meta from '$lib/data/meta.js';

	let { children } = $props();

	const isAdminRoute = $derived(page.url.pathname.startsWith('/admin'));
</script>

{#if isAdminRoute}
	{@render children?.()}
{:else}
	<a href="#main-content" class="skip-link">Skip to main content</a>
	<StructuredData />
	<Navbar siteName={meta.name} navItems={navbarItems} />

	<div class="bg-base-200 text-primary flex min-h-screen flex-col justify-between px-12">
		<div class="parallax-bg flex grow flex-col text-center">
			<main id="main-content" class="flex grow flex-col">
				{@render children?.()}
			</main>
		</div>

		<Footer
			footerLinks={footerNavItems}
			email={meta.email}
			address={meta.address}
			phone={meta.phone}
			fb_url={meta.fb_url}
			ig_url={meta.ig_url}
			tw_url={meta.tw_url}
			yt_url={meta.yt_url}
			li_url={meta.li_url}
			tiktok_url={meta.tiktok_url}
			gbp_url={meta.gbp_url}
			cp_url={meta.cp_url}
			cp_holder={meta.cp_holder}
			cp_year={meta.cp_year}
		/>
	</div>
{/if}

<style>
	.parallax-bg {
		background-size: cover;
	}

	/* fixed attachment hurts mobile scroll/LCP; desktop only */
	@media (min-width: 768px) {
		.parallax-bg {
			background-attachment: fixed;
		}
	}
</style>
