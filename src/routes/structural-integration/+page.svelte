<script>
	import meta, { BOOKING_URL, getPageDescription, phoneTel } from '$lib/data/meta';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { staticImages } from '$lib/data/images';
	import SnellyPortrait from '$lib/components/SnellyPortrait.svelte';
	import {
		hero,
		whatItIs,
		different,
		fit,
		workAndRelaxation,
		about,
		faq,
		cta
	} from '$lib/data/structural-integration.js';
</script>

<SeoHead
	title="Structural Integration in Kansas City | KC Fairway Bodywork"
	description={getPageDescription('/structural-integration')}
/>

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
				{hero.headline}
			</h1>
			<p class="text-lg text-balance opacity-90 md:text-xl">
				{hero.supporting}
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
			{whatItIs.heading}
		</h2>
	</div>
	<div class="mx-auto flex w-full max-w-3xl flex-col gap-6">
		{#each whatItIs.paragraphs as paragraph, index (index)}
			<p class="text-center text-lg leading-relaxed opacity-90 md:text-xl">{paragraph}</p>
		{/each}
		<p class="text-center text-lg leading-relaxed opacity-90 md:text-xl">
			{whatItIs.sessionsBefore}<a
				href={whatItIs.sessionsHref}
				class="text-secondary font-medium underline underline-offset-4 transition-opacity hover:opacity-80"
				>{whatItIs.sessionsLink}</a
			>{whatItIs.sessionsAfter}
		</p>
	</div>
</section>

<div class="bg-secondary mx-auto h-[2px] w-[80vw]"></div>

<section class="bg-base-200 flex flex-col items-center justify-center px-4 py-12">
	<div class="mx-auto max-w-4xl py-6 text-balance">
		<h2 class="text-secondary text-center text-3xl font-bold uppercase md:text-4xl">
			{different.heading}
		</h2>
	</div>
	<p class="mx-auto max-w-3xl text-center text-lg leading-relaxed opacity-90 md:text-xl">
		{different.body}
	</p>
</section>

<div class="bg-secondary mx-auto h-[2px] w-[80vw]"></div>

<section class="bg-base-200 flex flex-col items-center justify-center px-4 py-12">
	<div class="mx-auto max-w-4xl py-6 text-balance">
		<h2 class="text-secondary text-center text-3xl font-bold uppercase md:text-4xl">
			{fit.heading}
		</h2>
	</div>
	<div class="mx-auto grid w-full max-w-5xl gap-6 md:grid-cols-3">
		{#each fit.cards as card (card.id)}
			<div class="card bg-base-100 shadow">
				<div class="card-body">
					<h3 class="card-title text-secondary">{card.title}</h3>
					<p class="leading-relaxed opacity-80">{card.description}</p>
				</div>
			</div>
		{/each}
	</div>
</section>

<div class="bg-secondary mx-auto h-[2px] w-[80vw]"></div>

<section class="bg-base-200 flex flex-col items-center justify-center px-4 py-12">
	<div class="mx-auto max-w-4xl py-6 text-balance">
		<h2 class="text-secondary text-center text-3xl font-bold uppercase md:text-4xl">
			{workAndRelaxation.heading}
		</h2>
	</div>
	<p class="mx-auto max-w-3xl text-center text-lg leading-relaxed opacity-90 md:text-xl">
		{workAndRelaxation.body}
	</p>
</section>

<div class="bg-secondary mx-auto h-[2px] w-[80vw]"></div>

<section class="bg-base-200 flex flex-col items-center justify-center px-4 py-12">
	<div class="mx-auto max-w-4xl py-6 text-balance">
		<h2 class="text-secondary text-center text-3xl font-bold uppercase md:text-4xl">
			{about.heading}
		</h2>
	</div>
	<p class="mx-auto max-w-3xl text-center text-lg leading-relaxed opacity-90 md:text-xl">
		{about.body}
	</p>
</section>

<div class="bg-secondary mx-auto h-[2px] w-[80vw]"></div>

<section class="bg-base-200 flex flex-col items-center justify-center px-4 py-12">
	<div class="mx-auto max-w-4xl py-6 text-balance">
		<h2 class="text-secondary text-center text-3xl font-bold uppercase md:text-4xl">
			{faq.heading}
		</h2>
	</div>
	<div class="mx-auto w-full max-w-3xl space-y-3 text-left">
		{#each faq.items as item (item.id)}
			<div class="collapse collapse-arrow bg-base-100 shadow-md">
				<input type="radio" name="structural-integration-faq" aria-label={item.question} />
				<div class="collapse-title text-secondary text-lg font-semibold">
					{item.question}
				</div>
				<div class="collapse-content opacity-90">
					<p class="pt-2">{item.answer}</p>
				</div>
			</div>
		{/each}
	</div>
</section>

<div class="bg-secondary mx-auto h-[2px] w-[80vw]"></div>

<section class="bg-base-300 flex flex-col items-center justify-center gap-6 px-4 py-12">
	<h2 class="text-secondary text-center text-3xl font-bold uppercase text-balance md:text-4xl">
		{cta.heading}
	</h2>
	<a
		href={BOOKING_URL}
		target="_blank"
		rel="noopener noreferrer"
		class="btn btn-secondary btn-xl w-full rounded-full px-8 py-4 text-xl font-semibold shadow-lg md:w-lg"
	>
		Book Now
	</a>
	<a href="tel:{phoneTel()}" class="hover:text-primary text-lg hover:underline">{meta.phone}</a>
	<div class="flex flex-col items-center gap-2 text-center">
		{#each cta.links as link (link.href)}
			<a
				href={link.href}
				class="text-secondary text-sm font-medium underline underline-offset-4 transition-opacity hover:opacity-80"
				>{link.text}</a
			>
		{/each}
	</div>
</section>
