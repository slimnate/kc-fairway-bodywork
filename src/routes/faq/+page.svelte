<script lang="ts">
	import meta, { getPageDescription, BOOKING_URL } from '$lib/data/meta.js';
	import { faqItems } from '$lib/data/faq.js';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import FaqSchema from '$lib/components/FaqSchema.svelte';
</script>

<FaqSchema />
<SeoHead title="FAQ - {meta.title}" description={getPageDescription('/faq')} />

<section class="bg-base-200 px-4 py-12 pt-24">
	<div class="mx-auto max-w-3xl text-center">
		<h1 class="text-secondary mb-6 text-4xl font-bold uppercase md:text-5xl">
			Frequently Asked Questions
		</h1>
		<p class="text-base-content/85 text-lg">
			Common questions about golf bodywork, booking, and what to expect at KC Fairway Bodywork in
			Midtown Kansas City.
		</p>
	</div>
</section>

<div class="bg-secondary mx-auto h-[2px] w-[80vw]"></div>

<section class="bg-base-200 px-4 py-12">
	<div class="mx-auto max-w-3xl space-y-3">
		{#each faqItems as item (item.id)}
			<div class="collapse collapse-arrow bg-base-100 shadow-md">
				<input type="radio" name="faq-accordion" aria-label={item.question} />
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

<section class="bg-base-200 px-4 pb-16 text-center">
	<p class="text-base-content/85 mb-6 text-lg">Still have questions?</p>
	<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
		<a href="/contact" class="btn btn-primary">Contact us</a>
		<a href={BOOKING_URL} class="btn btn-secondary" target="_blank" rel="noopener noreferrer">
			Book a session
		</a>
	</div>
</section>
