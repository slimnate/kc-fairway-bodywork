<script>
	import metaData from '$lib/data/meta.js';

	import PricingCard from '$lib/components/PricingCard.svelte';
	import ReviewCarousel from '$lib/components/ReviewCarousel.svelte';
	import HomePageHero from '$lib/components/HomePageHero.svelte';

	import { developmentPricing, hostingPricing } from '$lib/data/pricing.js';
	import { reviews } from '$lib/data/reviews.js';
	import { industries } from '$lib/data/industries';
	import { offerings } from '$lib/data/services.js';
	import { differentiators } from '$lib/data/differentiators';

	/**
	 * @param {number|string} price
	 * @returns {string}
	 */
	const formatPrice = (price) => {
		if (typeof price !== 'number') return String(price);
		return `$${Number.isInteger(price) ? price : price.toFixed(2)}`;
	};
</script>

<section class="bg-base-200 flex flex-col items-center justify-center py-8 pt-12">
	<div class="mx-auto max-w-4xl py-6 text-balance">
		<img src="/img/logo.webp" alt="Sincerely Selfcare Logo" class="max-h-128" />
	</div>
	<div class="mx-auto max-w-4xl text-balance md:py-6">
		<img
			src="/img/snelly.jpg"
			alt="Snelly the Massage Snail"
			class="mt-6 max-h-50 rounded-full opacity-80 md:max-h-64"
		/>
	</div>
	<div class="mx-auto max-w-2xl py-6 text-balance md:text-lg">
		<p>
			Welcome to Sincerely, Selfcare. I specialize in therapeutic massage designed to support
			recovery, improve mobility, and relieve muscle tension. My focus is on helping clients with
			postural correction, injury prevention, and pain management through targeted techniques such
			as neuromuscular therapy, trigger point work, and adhesion release.
		</p>
		<p>
			Whether you’re an athlete, managing chronic discomfort, or simply looking to move and feel
			better, I offer both in-home sessions and studio appointments in downtown Kansas City.
		</p>
	</div>
</section>

<div class="bg-primary mx-auto h-[2px] w-[80vw]"></div>

<section class="bg-base-200 flex flex-col items-center justify-center py-8">
	<div class="mx-auto max-w-4xl text-balance">
		<ul class="list-inside list-disc py-6 text-left md:text-xl [&>li]:pb-2">
			<li>Mobile massage therapy—no travel required</li>
			<li>All equipment provided: massage table, linens, oils, music</li>
			<li>Specializing in deep tissue, neuromuscular, sports, and Swedish massage</li>
			<li>Easy online booking</li>
			<li>Serving Kansas City, Overland Park, Olathe, Lee’s Summit, and beyond</li>
		</ul>
	</div>
</section>

<div class="bg-primary mx-auto h-[2px] w-[80vw]"></div>

<section class="bg-base-200 flex flex-col items-center justify-center py-12">
	<div class="mx-auto max-w-4xl py-6 text-balance">
		<h2
			class="text-primary text-shadow-primary-content text-3xl font-bold uppercase text-shadow-md md:text-4xl"
		>
			Ready to feel better?
		</h2>
	</div>
	<p class="mx-auto max-w-2xl py-4 text-balance text-center text-lg md:text-xl opacity-90">
		Imagine waking up tomorrow with less pain, more energy, and a renewed sense of well-being. Whether you need relief from chronic tension, want to recover faster, or simply crave a moment of deep relaxation, your path to feeling your best starts here. Take the first step—your body will thank you.
	</p>
	<div class="flex w-full justify-center py-6">
		<a
			href="https://selfcare.noterro.com/"
			class="btn btn-secondary btn-xl w-full rounded-full px-8 py-4 text-xl font-semibold shadow-lg md:w-lg"
		>
			Book Now
		</a>
	</div>
</section>

<div class="bg-primary mx-auto h-[2px] w-[80vw]"></div>

<!-- Services -->

<section class="bg-base-200 flex flex-col items-center justify-center py-12">
	<div class="mx-auto max-w-4xl py-6 text-balance">
		<h2
			class="text-primary text-shadow-primary-content text-3xl font-bold uppercase text-shadow-md md:text-4xl"
		>
			Services
		</h2>
	</div>
	<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl">
		{#each offerings as offering (offering.id)}
			<div class="card bg-base-100 shadow">
				<div class="card-body">
					<div class="flex items-center gap-3 pb-4">
						<span class="icon icon-md text-primary {offering.icon}"></span>
						<h3 class="card-title">{offering.serviceName}</h3>
					</div>
					<p class="opacity-80">{offering.description}</p>
					{#if offering.packages && offering.packages.length}
						<ul class="mt-2 mx-auto flex gap-4 flex-col text-center">
							{#if offering.id == 'therapeutic-massage'}
								{#each offering.packages as pkg}
									<li class="pb-1 flex items-center gap-2">
										<span class="icon icon-xs text-primary icon-clock"></span>
										<span class="font-medium text-lg">{pkg.name}</span> – <span class="font-bold text-lg">{formatPrice(pkg.price)}</span>
									</li>
								{/each}
							{/if}
							{#if offering.id == 'chair-massage'}
								{#each offering.packages as pkg}
									<li class="pb-1 flex flex-col">
										<div class="flex gap-2 items-center">
											<span class="icon icon-xs text-primary icon-clock"></span>
											<span class="font-medium text-lg">{pkg.name}</span> – <span class="font-bold text-lg">{formatPrice(pkg.price)}</span>
										</div>
										<div class="text-sm opacity-70">{pkg.description}</div>
									</li>
								{/each}
							{/if}
							{#if offering.id == 'packages'}
								{#each offering.packages as pkg}
									<li class="pb-1 flex items-center gap-2">
										<span class="icon icon-xs text-primary icon-clock"></span>
										<span class="font-medium text-lg">{pkg.name}</span> – <span class="font-bold text-lg">{formatPrice(pkg.price)}</span>
									</li>
								{/each}
							{/if}
						</ul>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</section>

<!-- Blog Posts-->

<!-- Reviews -->

<style>
</style>
