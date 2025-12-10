<script>
	import TeamMembers from '$lib/components/TeamMembers.svelte';
	import { aboutData } from '$lib/data/about.js';
</script>

<svelte:head>
	<title>About - KC Fairway Bodywork</title>
	<meta
		name="description"
		content="Learn more about KC Fairway Bodywork and our mission to help you move better and play your best."
	/>
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
		<h1 class="about-title text-4xl font-bold uppercase mb-6 md:text-5xl">About</h1>
		{#each aboutData.aboutText as paragraph}
			<p class="mb-4">{paragraph}</p>
		{/each}
	</div>
</section>

<div class="section-divider mx-auto h-[2px] w-[80vw]"></div>

<!-- Mission & Vision -->
<section class="bg-base-200 p-12">
		<div class="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
			<!-- Mission Card -->
			<div class="card about-page-box bg-base-100 shadow-xl">
				<div class="card-body">
					<div class="flex items-center gap-3 mb-2">
						<span class="icon icon-md icon-custom icon-light-bulb"></span>
						<h2 class="card-title mission-title">Mission</h2>
					</div>
					<p class="text-lg">{aboutData.mission}</p>
				</div>
			</div>

			<!-- Vision Card -->
			<div class="card about-page-box bg-base-100 shadow-xl">
				<div class="card-body">
					<div class="flex items-center gap-3 mb-2">
						<span class="icon icon-md icon-custom icon-eye"></span>
						<h2 class="card-title vision-title">Vision</h2>
					</div>
					<p class="text-lg">{aboutData.vision}</p>
				</div>
			</div>
	</div>
</section>

<div class="section-divider mx-auto h-[2px] w-[80vw]"></div>

<!-- Values Section -->
<section class="bg-base-200 p-12">
		<div class="mx-auto max-w-6xl">
			<h2 class="values-title text-center text-3xl font-bold uppercase mb-8">Values</h2>
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
				{#each aboutData.values as value}
					<div class="card about-page-box bg-base-100 shadow-xl">
						<div class="card-body">
							<h3 class="card-title value-title text-lg {(value.title === 'Care that Drives Improvement' || value.title === 'Quality You Can Feel' || value.title === 'Encouragement that Elevates') ? 'value-title-custom' : 'text-primary'}">{value.title}</h3>
							<p class="text-sm opacity-80">{value.description}</p>
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

<style>
	.about-title {
		color: oklch(0.63 0.097 91);
	}

	.mission-title {
		color: oklch(0.63 0.097 91);
	}

	.vision-title {
		color: oklch(0.63 0.097 91);
	}

	.values-title {
		color: oklch(0.63 0.097 91);
	}

	.value-title-custom {
		color: oklch(0.63 0.097 91);
	}

	.section-divider {
		background-color: oklch(0.63 0.097 91);
	}

	.about-page-box {
		border: 2px solid oklch(0.63 0.097 91);
	}
</style>
