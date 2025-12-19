<script>
	import IconHouse from './icons/IconHouse.svelte';
	import IconFacebook from './icons/IconFacebook.svelte';
	import IconInstagram from './icons/IconInstagram.svelte';
	import IconMail from './icons/IconMail.svelte';
	import IconPhone from './icons/IconPhone.svelte';

	import { navItems } from '$lib/data/nav';
	import IconTwitter from './icons/IconTwitter.svelte';
	import IconYoutube from './icons/IconYoutube.svelte';
	import IconLinkedIn from './icons/IconLinkedIn.svelte';
	import IconTikTok from './icons/IconTikTok.svelte';

	const {
		footerLinks = navItems,
		email = null,
		address = null,
		phone = null,
		ig_url = null,
		fb_url = null,
		tw_url = null,
		yt_url = null,
		li_url = null,
		tiktok_url = null,
		cp_url = null,
		cp_holder = null,
		cp_year = null
	} = $props();

	const showSocials = fb_url || ig_url || tw_url || yt_url || li_url || tiktok_url;
</script>

<footer class="text-center lg:text-left">
	<div
		class="border-neutral flex items-center justify-center border-b p-4 md:justify-between md:p-6"
	>
		{#if showSocials}
			<!-- Social media links -->
			<div class="mr-12 hidden md:block">
				<span>Get connected on social networks:</span>
			</div>
			<div class="text-secondary flex justify-center">
				{#if fb_url}
					<a href={fb_url} class="mr-6 hover:scale-[1.05]" target="_blank" rel="noreferrer">
						<IconFacebook />
					</a>
				{/if}
				{#if ig_url}
					<a href={ig_url} class="mr-6 hover:scale-[1.05]" target="_blank" rel="noreferrer">
						<IconInstagram />
					</a>
				{/if}
				{#if tw_url}
					<a href={tw_url} class="mr-6 hover:scale-[1.05]" target="_blank" rel="noreferrer">
						<IconTwitter />
					</a>
				{/if}
				{#if yt_url}
					<a href={yt_url} class="mr-6 hover:scale-[1.05]" target="_blank" rel="noreferrer">
						<IconYoutube />
					</a>
				{/if}
				{#if li_url}
					<a href={li_url} class="mr-6 hover:scale-[1.05]" target="_blank" rel="noreferrer">
						<IconLinkedIn />
					</a>
				{/if}
				{#if tiktok_url}
					<a href={tiktok_url} class="mr-6 hover:scale-[1.05]" target="_blank" rel="noreferrer">
						<IconTikTok />
					</a>
				{/if}
			</div>
		{/if}
	</div>

	<!-- Footer links and contact information -->
	<div class="mx-6 py-6 text-center md:text-left">
		<div class="grid-1 grid gap-8 md:grid-cols-3">
			<!-- Footer links -->
			<div class="border-neutral flex flex-col md:col-span-2 md:border-r md:text-center">
				<h6 class="text-secondary mb-4 flex justify-center font-semibold uppercase">Links</h6>
				<div class="grid-1 grid gap-4 sm:grid-cols-2">
					{#each footerLinks as { href, text }}
						<a {href} class="drop-shadow-secondary hover:scale-[1.05] hover:drop-shadow-lg"
							>{text}</a
						>
					{/each}
				</div>
			</div>

			<!-- Contact information -->
			<div>
				<h6 class="text-secondary mb-4 flex justify-center font-semibold uppercase md:justify-start">
					Contact
				</h6>
				{#if address}
					<p class="mb-4 flex items-center justify-center md:justify-start">
						<span class="text-secondary mr-4"><IconHouse /></span>
						{address}
					</p>
				{/if}
				{#if email}
					<p class="mb-4 flex items-center justify-center md:justify-start">
						<span class="text-secondary mr-4"><IconMail /></span>
						{email}
					</p>
				{/if}
				{#if phone}
					<p class="mb-4 flex items-center justify-center md:justify-start">
						<span class="text-secondary mr-4"> <IconPhone /> </span>
						{phone}
					</p>
				{/if}
			</div>
		</div>
	</div>

	<!-- Copyright -->
	<div class="p-4 text-center text-sm">
		<span>© {cp_year} </span>
		<a class="text-secondary font-semibold" href={cp_url}>{cp_holder}</a>
	</div>
</footer>
