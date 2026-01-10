<script lang="ts">
	import '../app.css';
	import { browser } from '$app/environment';
	import { page } from '$app/state';

	import { configureClientAuth } from 'workos-convex-sveltekit';
	import { PUBLIC_CONVEX_URL } from '$env/static/public';
	import { setupConvex, useConvexClient } from 'convex-svelte';

	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { navItems } from '$lib/data/nav.js';
	import meta from '$lib/data/meta.js';

	configureClientAuth(setupConvex, useConvexClient, browser, PUBLIC_CONVEX_URL as string);

	let { children } = $props();

	const isAdminRoute = $derived(page.url.pathname.startsWith('/admin'));
</script>

{#if isAdminRoute}
	{@render children?.()}
{:else}
	<Navbar siteName={meta.name} {navItems} />

	<div class="bg-base-200 text-primary flex min-h-screen flex-col justify-between px-12">
		<div class="parallax-bg flex grow flex-col text-center">
			{@render children?.()}
		</div>

		<Footer
			footerLinks={navItems}
			email={meta.email}
			address={meta.address}
			phone={meta.phone}
			fb_url={meta.fb_url}
			ig_url={meta.ig_url}
			tw_url={meta.tw_url}
			yt_url={meta.yt_url}
			li_url={meta.li_url}
			tiktok_url={meta.tiktok_url}
			cp_url={meta.cp_url}
			cp_holder={meta.cp_holder}
			cp_year={meta.cp_year}
		/>
	</div>
{/if}

<style>
	.parallax-bg {
		background-attachment: fixed;
		background-size: cover;
	}
</style>
