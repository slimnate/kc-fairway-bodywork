<script>
	import { offerings, fairwayPerformancePlan } from '$lib/data/services.js';
	import { focusAreas } from '$lib/data/focus-areas.js';
	import meta, { getPageDescription } from '$lib/data/meta';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { staticImages } from '$lib/data/images';
	import SnellyPortrait from '$lib/components/SnellyPortrait.svelte';
	import { testimonials } from '$lib/data/testimonials.js';
	import TestimonialCard from '$lib/components/TestimonialCard.svelte';

	const featuredTestimonials = testimonials.filter((t) => t.featured);

	/**
	 * @param {number|string} price
	 * @returns {string}
	 */
	const formatPrice = (price) => {
		if (typeof price !== 'number') return String(price);
		return `$${Number.isInteger(price) ? price : price.toFixed(2)}`;
	};
</script>

<SeoHead
	title={meta.title}
	description={getPageDescription('/')}
	keywords={meta.keywords.join(', ')}
/>

<svelte:head>
	<link rel="preload" as="image" href={staticImages.logo.src} fetchpriority="high" />
</svelte:head>

<div class="md:hidden flex justify-center px-8 py-4">
<a href="https://www.massagebook.com/therapists/kc-fairway-bodywork/services?src=external"
	target="_blank"
	rel="noopener noreferrer"
	class="btn btn-secondary btn-xl rounded-full px-8 py-4 text-xl font-semibold shadow-lg md:w-lg md:hidden">
	Book Now
</a>
</div>

<section class="bg-base-200 flex flex-col items-center justify-center py-8 pt-12">
	<div class="mx-auto grid w-full max-w-6xl items-center gap-8 px-4 md:grid-cols-2">
		<div class="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
			<img
				src={staticImages.logo.src}
				width={staticImages.logo.width}
				height={staticImages.logo.height}
				fetchpriority="high"
				decoding="async"
				class="h-auto w-full max-w-sm"
				alt="KC Fairway Bodywork"
			/>
			<h1 class="text-secondary text-2xl font-bold text-balance md:text-4xl">
				Bodywork for golfers, athletes, and active individuals who want to move better and hurt less.
			</h1>
			<p class="text-lg text-balance opacity-90 md:text-xl">
				I use structural integration and focused bodywork to improve mobility and decrease pain, so
				you can play your best and move the way you want.
			</p>
			<p class="text-sm opacity-80">
				<span class="font-semibold">Anthony Snell, LMT</span>
				<span aria-hidden="true"> · </span>
				Performance Bodywork Specialist
				<span aria-hidden="true"> · </span>
				Midtown Kansas City
			</p>
		</div>
		<div class="flex w-full justify-center md:justify-end">
			<SnellyPortrait priority />
		</div>
	</div>
</section>

<div class="bg-secondary mx-auto h-[2px] w-[80vw]"></div>

<section class="bg-base-200 flex flex-col items-center justify-center py-12">
	<div class="mx-auto max-w-4xl py-6 text-balance">
		<h2
			class="text-secondary text-3xl font-bold uppercase md:text-4xl"
		>
		Elevate Your Performance
		</h2>
	</div>
	<p class="mx-auto max-w-2xl py-4 text-balance text-center text-lg md:text-xl opacity-90">
		Move better. Feel better. Play longer.</p> <p> Whether you’re working through pain, building mobility, or preparing for your next round, game, or workout, performance starts here.
	</p>
	<div class="flex w-full justify-center py-6">
		<a
			href="https://www.massagebook.com/therapists/kc-fairway-bodywork/services?src=external"
			class="btn btn-secondary btn-xl w-full rounded-full px-8 py-4 text-xl font-semibold shadow-lg md:w-lg"
		>
			Book Now
		</a>
	</div>
</section>

<div class="bg-secondary mx-auto h-[2px] w-[80vw]"></div>

<section class="bg-base-200 flex flex-col items-center justify-center py-12">
	<div class="mx-auto max-w-4xl py-6 text-balance">
		<h2 class="text-secondary text-3xl font-bold uppercase md:text-4xl">
			Three Things I Do Best
		</h2>
	</div>
	<div class="grid max-w-7xl w-full gap-6 px-4 lg:grid-cols-3">
		{#each focusAreas as area (area.id)}
			<div class="card bg-base-100 shadow h-full">
				<div class="card-body flex h-full flex-col">
					<div class="flex items-center gap-3 pb-4">
						<span class="icon icon-md icon-custom {area.icon}"></span>
						<h3 class="card-title text-secondary">{area.title}</h3>
					</div>
					<p class="opacity-80 leading-relaxed">{area.description}</p>
				</div>
			</div>
		{/each}
	</div>
</section>

<div class="bg-secondary mx-auto h-[2px] w-[80vw]"></div>

<section class="bg-base-200 flex flex-col items-center justify-center py-12">
	<div class="mx-auto max-w-4xl py-6 text-balance">
		<h2 class="text-secondary text-3xl font-bold uppercase md:text-4xl">What Clients Say</h2>
	</div>
	<div class="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4">
		{#if featuredTestimonials.length > 0}
			<TestimonialCard item={featuredTestimonials[0]} large />
		{/if}
		{#if featuredTestimonials.length > 1}
			<div
				class="flex gap-4 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-2 md:gap-6 md:overflow-visible"
				tabindex="0"
				role="region"
				aria-label="More client reviews"
			>
				{#each featuredTestimonials.slice(1) as item (item.id)}
					<div class="w-[85%] shrink-0 snap-center md:w-auto md:shrink md:snap-align-none">
						<TestimonialCard {item} />
					</div>
				{/each}
			</div>
			<p class="text-center text-sm opacity-70 md:hidden">Swipe for more reviews</p>
		{/if}
		<a
			href={meta.gbp_url}
			class="btn btn-secondary mx-auto rounded-full"
			target="_blank"
			rel="noopener noreferrer"
		>
			Read more reviews on Google
		</a>
	</div>
</section>

<div class="bg-secondary mx-auto h-[2px] w-[80vw]"></div>

<!-- Services -->

<section class="bg-base-200 flex flex-col items-center justify-center py-12">
	<div class="mx-auto max-w-4xl py-6 text-balance">
		<h2
			class="text-secondary text-3xl font-bold uppercase md:text-4xl"
		>
			Services
		</h2>
	</div>
	<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl">
		{#each offerings as offering (offering.id)}
			{#if offering.id === 'packages'}
				<div class="card bg-base-100 shadow">
					<div class="card-body gap-4">
						<div class="flex items-center gap-3 pb-4">
							<span class="icon icon-md icon-custom icon-shield-check"></span>
							<h3 class="card-title text-secondary">{fairwayPerformancePlan.title}</h3>
						</div>
						<p class="text-sm font-bold">{fairwayPerformancePlan.subtitle}</p>
						<p class="opacity-80 leading-relaxed">
							{fairwayPerformancePlan.description}
						</p>
						<p class="text-secondary font-semibold">{fairwayPerformancePlan.pricing}</p>
						<a
							href={fairwayPerformancePlan.packagesLink.href}
							class="text-secondary text-sm font-medium underline underline-offset-4 transition-opacity hover:opacity-80"
						>
							{fairwayPerformancePlan.packagesLink.text}
						</a>
					</div>
				</div>
			{:else}
			<div class="card bg-base-100 shadow">
				<div class="card-body">
					<div class="flex items-center gap-3 pb-4">
						<span class="icon icon-md icon-custom {offering.icon}"></span>
						<h3 class="card-title text-secondary">{offering.serviceName}</h3>
					</div>
					<p class="opacity-80">{offering.description}</p>
					{#if offering.packages && offering.packages.length}
						<ul class="mt-2 mx-auto flex gap-4 flex-col text-center">
							{#if offering.id == 'therapeutic-massage'}
								{#each offering.packages as pkg}
									<li class="pb-1">
										{#if pkg.href}
											<a
												href={pkg.href}
												class="flex items-center gap-2 text-base-content no-underline transition-colors hover:text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base-100 rounded-sm text-lg"
												target="_blank"
												rel="noopener noreferrer"
											>
												<span class="icon icon-xs icon-custom icon-clock shrink-0"></span>
												<span class="font-medium">{pkg.name}</span>
												<span aria-hidden="true">–</span>
												<span class="font-bold">{formatPrice(pkg.price)}</span>
											</a>
										{:else}
											<div class="flex items-center gap-2">
												<span class="icon icon-xs icon-custom icon-clock"></span>
												<span class="font-medium text-lg">{pkg.name}</span> – <span class="font-bold text-lg">{formatPrice(pkg.price)}</span>
											</div>
										{/if}
									</li>
								{/each}
							{/if}
							{#if offering.id == 'chair-massage'}
								{#each offering.packages as pkg}
									<li class="pb-1 flex flex-col">
										<div class="flex gap-2 items-center">
											<span class="icon icon-xs icon-custom icon-clock"></span>
											<span class="font-medium text-lg">{pkg.name}</span> – <span class="font-bold text-lg">{formatPrice(pkg.price)}</span>
										</div>
										<div class="text-sm opacity-70">{pkg.description}</div>
									</li>
								{/each}
							{/if}
						</ul>
					{/if}
					{#if offering.id === 'chair-massage'}
						<a
							href="/golf"
							class="text-secondary mt-4 block w-fit self-center text-sm font-medium underline underline-offset-4 transition-opacity hover:opacity-80"
						>
							Golfer? See how I work with golfers →
						</a>
					{/if}
				</div>
			</div>
			{/if}
		{/each}
	</div>
</section>
