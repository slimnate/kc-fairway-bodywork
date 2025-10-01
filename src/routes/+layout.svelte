<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import '../app.css';

	import meta from '$lib/data/meta.js';
	import { navItems } from '$lib/data/nav.js';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<Navbar siteName={meta.name} {navItems} />

<div class="bg-base-200 text-primary flex min-h-screen flex-col justify-between px-12">
	<div class="parallax-bg flex grow flex-col text-center">
		{@render children()}
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

<style>
	.parallax-bg {
		background-image: url('/img/pexels-divinetechygirl-1181354.jpg');
		background-attachment: fixed;
		background-size: cover;
	}
</style>
