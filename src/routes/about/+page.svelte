<script>
	import TeamMembers from '$lib/components/TeamMembers.svelte';
	import { aboutData } from '$lib/data/about.js';
</script>

<section class="bg-base-200 flex flex-col items-center justify-center py-8 pt-12">
	<div class="mx-auto max-w-4xl text-balance md:py-6">
		<img
			src="/img/snelly.jpg"
			alt="Snelly the Massage Snail"
			class="mt-6 max-h-50 rounded-full opacity-80 md:max-h-64"
		/>
	</div>
	<div class="mx-auto max-w-3xl py-6 text-balance text-center px-4 md:text-lg">
		<h1 class="text-primary text-4xl font-bold uppercase mb-6 md:text-5xl">About</h1>
		{#if Array.isArray(aboutData.aboutText)}
			{#each aboutData.aboutText as paragraph}
				<p class="mb-4">{paragraph}</p>
			{/each}
		{:else}
			<p>{aboutData.aboutText}</p>
		{/if}
	</div>
</section>

<div class="bg-primary mx-auto h-[2px] w-[80vw]"></div>

<!-- Mission & Vision -->
<section class="bg-base-200 p-12">
		<div class="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
			<!-- Mission Card -->
			<div class="card card-border bg-base-100 shadow-xl">
				<div class="card-body">
					<div class="flex items-center gap-3 mb-2">
						<span class="icon icon-md text-primary icon-light-bulb"></span>
						<h2 class="card-title text-primary">Mission</h2>
					</div>
					<p class="text-lg">{aboutData.mission}</p>
				</div>
			</div>

			<!-- Vision Card -->
			<div class="card card-border bg-base-100 shadow-xl">
				<div class="card-body">
					<div class="flex items-center gap-3 mb-2">
						<span class="icon icon-md text-primary icon-eye"></span>
						<h2 class="card-title text-primary">Vision</h2>
					</div>
					<p class="text-lg">{aboutData.vision}</p>
				</div>
			</div>
	</div>
</section>

<div class="bg-primary mx-auto h-[2px] w-[80vw]"></div>

<!-- Values Section -->
<section class="bg-base-200 p-12">
		<div class="mx-auto max-w-6xl">
			<h2 class="text-primary text-center text-3xl font-bold uppercase mb-8">Values</h2>
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
				{#each aboutData.values as value}
					<div class="card bg-base-100 shadow-xl border-primary border-2">
						<div class="card-body">
							<h3 class="card-title text-primary text-lg">{value.title}</h3>
							<p class="text-sm opacity-80">{value.description}</p>
						</div>
					</div>
				{/each}
		</div>
	</div>
</section>

<!-- <div class="bg-primary mx-auto h-[2px] w-[80vw]"></div> -->

<!-- Team Section -->
<!-- <section class="bg-base-200 p-12">
	<div class="mx-auto max-w-6xl">
		<h2 class="text-primary text-center text-3xl font-bold uppercase mb-8">Our Team</h2>
		<TeamMembers team={aboutData.team} />
	</div>
</section> -->
