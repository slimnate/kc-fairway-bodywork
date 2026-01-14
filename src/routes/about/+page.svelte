<script>
	import { aboutData } from '$lib/data/about.js';
    import meta from '$lib/data/meta';
</script>

<svelte:head>
	<title>About - {meta.title}</title>
	<meta name="description" content="{meta.description}" />
	<meta name="keywords" content={meta.keywords.join(', ')} />
	<meta name="robots" content="index, follow" />
</svelte:head>

<section class="bg-base-200 flex flex-col items-center justify-center py-8 pt-12">
	<div class="mx-auto max-w-4xl text-balance md:py-6">
		<img
			src="/img/snelly.jpg"
			alt="Snelly the Massage Snail"
			class="mt-6 max-h-50 rounded-full opacity-80 md:max-h-64"
		/>
	</div>
	<div class="mx-auto max-w-3xl py-6 text-balance text-center px-4 md:text-lg">
		<h1 class="text-secondary text-4xl font-bold uppercase mb-6 md:text-5xl">About</h1>
		{#each aboutData.aboutText as paragraph}
			<p class="mb-4">{paragraph}</p>
		{/each}
	</div>
</section>

<div class="bg-secondary mx-auto h-[2px] w-[80vw]"></div>

<!-- Mission & Vision -->
<section class="bg-base-200 p-12">
		<div class="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
			<!-- Mission Card -->
			<div class="card bg-base-100 shadow-xl">
				<div class="card-body">
					<div class="flex items-center gap-3 mb-2">
						<span class="icon icon-md icon-custom icon-light-bulb"></span>
						<h2 class="text-secondary text-2xl font-semibold">Mission</h2>
					</div>
					<p class="text-lg">{aboutData.mission}</p>
				</div>
			</div>

			<!-- Vision Card -->
			<div class="card bg-base-100 shadow-xl">
				<div class="card-body">
					<div class="flex items-center gap-3 mb-2">
						<span class="icon icon-md icon-custom icon-eye"></span>
						<h2 class="text-secondary text-2xl font-semibold">Vision</h2>
					</div>
					<p class="text-lg">{aboutData.vision}</p>
				</div>
			</div>
	</div>
</section>

<div class="bg-secondary mx-auto h-[2px] w-[80vw]"></div>

<!-- Values Section -->
<section class="bg-base-200 p-12">
		<div class="mx-auto max-w-6xl">
			<h2 class="text-secondary text-center text-3xl font-bold uppercase mb-8">Values</h2>
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each aboutData.values as value}
					<div class="card about-page-box bg-base-100 shadow-xl">
						<div class="card-body text-center">
							<h3 class="card-title text-secondary text-xl justify-center">{value.title}</h3>
							<p class="text-lg opacity-80">{value.description}</p>
						</div>
					</div>
				{/each}
		</div>
	</div>
</section>

<!-- <div class="section-divider mx-auto h-[2px] w-[80vw]"></div> -->

<!-- Team Section -->
<!-- <section class="bg-base-200 p-12">
	<div class="mx-auto max-w-6xl">
		<h2 class="text-primary text-center text-3xl font-bold uppercase mb-8">Our Team</h2>
		<TeamMembers team={aboutData.team} />
	</div>
</section> -->