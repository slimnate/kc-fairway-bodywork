<svelte:head>
	<title>Blog - Sincerely, Selfcare</title>
	<meta
		name="description"
		content="Wellness tips, massage therapy insights, and self-care advice from Sincerely, Selfcare"
	/>
</svelte:head>

<!-- Hero Section -->
<section class="bg-base-200 px-6 py-12 pt-24 text-center">
	<h1
		class="blog-header mb-6 text-4xl font-bold uppercase md:text-5xl"
	>
		Wellness Blog
	</h1>
	<p class="text-base-content/80 mx-auto mb-8 max-w-3xl text-lg">
		Explore insights on massage therapy, wellness practices, pain management, and self-care tips to
		help you move better and feel your best.
	</p>
</section>

<div class="section-divider mx-auto h-[2px] w-[80vw]"></div>

<!-- Coming Soon Section -->
<section class="bg-base-200 flex flex-col items-center justify-center px-6 py-24 min-h-[60vh]">
	<div class="mx-auto max-w-2xl text-center">
		<div class="mb-8">
			<span class="icon icon-xl icon-custom icon-document-text mx-auto"></span>
		</div>
		<h2 class="blog-header mb-6 text-3xl font-bold uppercase md:text-4xl">Coming Soon</h2>
		<p class="text-base-content/80 mb-8 text-lg">
			We're working on creating valuable content about massage therapy, wellness, pain management,
			and self-care practices. Check back soon for expert insights and practical tips to support
			your health journey.
		</p>
		<div class="flex flex-col gap-4 sm:flex-row sm:justify-center">
			<a href="/" class="btn btn-primary btn-lg">
				Back to Home
			</a>
			<a href="https://selfcare.noterro.com/" class="btn btn-outline btn-primary btn-lg">
				Book a Session
			</a>
		</div>
	</div>
</section>

<style>
	.blog-header {
		color: oklch(0.63 0.097 91);
	}

	.section-divider {
		background-color: oklch(0.63 0.097 91);
	}
</style>
