<script>
	import { offerings, fairwayPerformancePlan } from '$lib/data/services.js';
	import meta, { getPageDescription } from '$lib/data/meta';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { staticImages } from '$lib/data/images';
	import SnellyPortrait from '$lib/components/SnellyPortrait.svelte';

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
	<div class="mx-auto max-w-4xl py-6 text-balance">
		<h1 class="sr-only">{meta.name}</h1>
		<img
			src={staticImages.logo.src}
			width={staticImages.logo.width}
			height={staticImages.logo.height}
			fetchpriority="high"
			decoding="async"
			class="h-auto w-full max-w-4xl"
			alt=""
			aria-hidden="true"
		/>
	</div>
	<div class="mx-auto mt-[-50px] w-full max-w-4xl px-4 text-balance">
		<SnellyPortrait class="mt-6" />
	</div>
	<div class="mx-auto max-w-2xl py-6 text-balance md:text-lg">
		<p class="pb-4">
			Welcome to KC Fairway Bodywork — where golfers come to improve mobility, reduce pain, and elevate their performance. I specialize in golf-focused, therapeutic bodywork designed to enhance range of motion, unlock your swing, and support long-term recovery. I help golfers move better both on and off the course.
		</p>
		<p>
			Whether you're dealing with tightness, recovering from pain, or looking to play your best more often, every session is built on care, quality, and improvement. If you’re ready to unlock motion and unlock your game, you’re in the right place.
		</p>
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
		Move better. Swing freer. Play longer.</p> <p> Whether you're working through pain, building rotation, or preparing for your next round, performance starts here..
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
				</div>
			</div>
			{/if}
		{/each}
	</div>
</section>
