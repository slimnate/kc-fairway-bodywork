<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	const BOOK_URL =
		'https://www.massagebook.com/therapists/kc-fairway-bodywork/services?src=external';

	const errorStatus = $derived(page.error?.status ?? page.status ?? 500);
	const errorMessage = $derived(page.error?.message);
	const is404 = $derived(errorStatus === 404);
	const is403 = $derived(errorStatus === 403);
</script>

<section class="flex grow flex-col items-center justify-center px-6 py-16 text-center">
	{#if is404}
		<h1 class="text-secondary mb-4 text-4xl font-bold uppercase md:text-5xl">Page not found</h1>
		<p class="text-base-content mb-8 max-w-lg text-lg">
			We couldn't find that page. Try one of the links below or return home.
		</p>
		<nav class="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
			<a href="/" class="btn btn-primary">Home</a>
			<a href="/services" class="btn btn-outline">Services</a>
			<a href="/blog" class="btn btn-outline">Blog</a>
			<a href={BOOK_URL} class="btn btn-secondary" target="_blank" rel="noopener noreferrer">
				Book Now
			</a>
		</nav>
	{:else}
		<h1 class="text-secondary mb-4 text-3xl font-bold uppercase md:text-4xl">
			{is403 ? 'Access denied' : `Error ${errorStatus}`}
		</h1>
		<p class="text-base-content mb-8 max-w-lg">
			{errorMessage || 'Something went wrong. Please try again.'}
		</p>
		<div class="flex flex-wrap justify-center gap-3">
			{#if is403}
				<button type="button" onclick={() => goto('/api/auth/logout')} class="btn btn-primary">
					Log out
				</button>
			{:else}
				<button type="button" onclick={() => goto('/')} class="btn btn-primary">Go home</button>
			{/if}
			<button type="button" onclick={() => window.history.back()} class="btn btn-outline">
				Go back
			</button>
		</div>
	{/if}
</section>
