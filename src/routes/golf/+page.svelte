<script>
	import meta, { BOOKING_URL, getPageDescription } from '$lib/data/meta';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { staticImages } from '$lib/data/images';
	import SnellyPortrait from '$lib/components/SnellyPortrait.svelte';
	import TestimonialCard from '$lib/components/TestimonialCard.svelte';
	import { offerings } from '$lib/data/services.js';
	import { testimonials } from '$lib/data/testimonials.js';
	import {
		golfHero,
		golfWhy,
		golfFocusAreas,
		golfBeforeAfter,
		golfMetrics,
		golfNotGolfer,
		golfQuestions,
		golfFaqItems,
		golfCta,
		golfReviewId
	} from '$lib/data/golf.js';

	const golfReview = testimonials.find((t) => t.id === golfReviewId);
	const bookingPackages = offerings[0]?.packages ?? [];

	/**
	 * @param {number|string} price
	 * @returns {string}
	 */
	const formatPrice = (price) => {
		if (typeof price !== 'number') return String(price);
		return `$${Number.isInteger(price) ? price : price.toFixed(2)}`;
	};
</script>

<SeoHead title="Golf Bodywork - {meta.title}" description={getPageDescription('/golf')} />

<svelte:head>
	<link rel="preload" as="image" href={staticImages.logo.src} fetchpriority="high" />
</svelte:head>

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
				{golfHero.headline}
			</h1>
			<p class="text-lg text-balance opacity-90 md:text-xl">
				{golfHero.supporting}
			</p>
			<a
				href={BOOKING_URL}
				target="_blank"
				rel="noopener noreferrer"
				class="btn btn-secondary btn-xl w-full rounded-full px-8 py-4 text-xl font-semibold shadow-lg md:w-lg"
			>
				Book Now
			</a>
		</div>
		<div class="flex w-full justify-center md:justify-end">
			<SnellyPortrait priority />
		</div>
	</div>
</section>

<div class="bg-secondary mx-auto h-[2px] w-[80vw]"></div>

<section class="bg-base-200 flex flex-col items-center justify-center px-4 py-12">
	<div class="mx-auto max-w-4xl py-6 text-balance">
		<h2 class="text-secondary text-center text-3xl font-bold uppercase md:text-4xl">
			{golfWhy.heading}
		</h2>
	</div>
	<p class="mx-auto max-w-3xl text-center text-lg leading-relaxed opacity-90 md:text-xl">
		{golfWhy.body}
	</p>
</section>

<div class="bg-secondary mx-auto h-[2px] w-[80vw]"></div>

<section class="bg-base-200 flex flex-col items-center justify-center px-4 py-12">
	<div class="mx-auto max-w-4xl py-6 text-balance">
		<h2 class="text-secondary text-center text-3xl font-bold uppercase md:text-4xl">
			What I work on for golfers
		</h2>
	</div>
	<div class="mx-auto grid w-full max-w-5xl gap-6 md:grid-cols-2">
		{#each golfFocusAreas as area (area.id)}
			<div class="card bg-base-100 shadow">
				<div class="card-body">
					<h3 class="card-title text-secondary">{area.title}</h3>
					<p class="opacity-80 leading-relaxed">{area.description}</p>
				</div>
			</div>
		{/each}
	</div>
</section>

<div class="bg-secondary mx-auto h-[2px] w-[80vw]"></div>

<section class="bg-base-200 flex flex-col items-center justify-center px-4 py-12">
	<div class="mx-auto max-w-4xl py-6 text-balance">
		<h2 class="text-secondary text-center text-3xl font-bold uppercase md:text-4xl">
			{golfBeforeAfter.heading}
		</h2>
	</div>
	<div class="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center">
		<p class="text-lg leading-relaxed opacity-90 md:text-xl">
			{golfBeforeAfter.paragraph1}
		</p>
		<div class="grid w-full max-w-xl grid-cols-3 gap-3 md:gap-5">
			{#each golfMetrics as metric (metric.id)}
				<div class="card bg-base-100 shadow">
					<div class="card-body items-center gap-2 p-3 text-center md:p-4">
						<span class="text-secondary text-3xl font-bold leading-none md:text-4xl" aria-hidden="true"
							>↑</span
						>
						<span class="sr-only">increased</span>
						<span class="text-sm font-medium md:text-base">{metric.label}</span>
					</div>
				</div>
			{/each}
		</div>
		<p class="text-lg leading-relaxed opacity-90 md:text-xl">
			{golfBeforeAfter.paragraph2}
		</p>
	</div>
</section>

<div class="bg-secondary mx-auto h-[2px] w-[80vw]"></div>

{#if golfReview}
	<section class="bg-base-200 flex flex-col items-center justify-center px-4 py-12">
		<div class="mx-auto w-full max-w-3xl">
			<TestimonialCard item={golfReview} large />
		</div>
	</section>

	<div class="bg-secondary mx-auto h-[2px] w-[80vw]"></div>
{/if}

<section class="bg-base-200 flex flex-col items-center justify-center px-4 py-12">
	<p class="mx-auto max-w-3xl text-center text-lg md:text-xl">
		{golfNotGolfer.text}<a
			href={golfNotGolfer.href}
			class="text-secondary font-medium underline underline-offset-4 transition-opacity hover:opacity-80"
			>{golfNotGolfer.linkText}</a
		>
	</p>
</section>

<div class="bg-secondary mx-auto h-[2px] w-[80vw]"></div>

<section class="bg-base-200 flex flex-col items-center justify-center px-4 py-12">
	<div class="mx-auto max-w-4xl py-6 text-balance">
		<h2 class="text-secondary text-center text-3xl font-bold uppercase md:text-4xl">
			{golfQuestions.heading}
		</h2>
	</div>
	<div class="mx-auto flex w-full max-w-3xl flex-col">
		{#each golfFaqItems as item, index (item.id)}
			<div class="py-6 {index < golfFaqItems.length - 1 ? 'border-b border-secondary/40' : ''}">
				<h3 class="text-secondary mb-2 text-xl font-semibold">{item.question}</h3>
				<p class="opacity-90 leading-relaxed">
					{#if item.link}
						Yes. See
						<a
							href={item.link.href}
							class="text-secondary font-medium underline underline-offset-4 transition-opacity hover:opacity-80"
							>{item.link.text}</a
						>
						on the Services page.
					{:else}
						{item.answer}
					{/if}
				</p>
			</div>
		{/each}
	</div>
</section>

<div class="bg-secondary mx-auto h-[2px] w-[80vw]"></div>

<section class="bg-base-300 flex flex-col items-center justify-center px-4 py-12">
	<div class="mx-auto max-w-4xl py-6 text-balance">
		<h2 class="text-secondary text-center text-3xl font-bold uppercase md:text-4xl">
			{golfCta.heading}
		</h2>
	</div>
	<div class="mx-auto flex w-full max-w-3xl flex-col gap-3 md:flex-row md:flex-wrap md:justify-center">
		{#each bookingPackages as pkg (pkg.name)}
			{#if pkg.href}
				<a
					href={pkg.href}
					target="_blank"
					rel="noopener noreferrer"
					class="btn btn-secondary w-full rounded-full md:w-auto"
				>
					{pkg.name} · {formatPrice(pkg.price)}
				</a>
			{/if}
		{/each}
	</div>
</section>
