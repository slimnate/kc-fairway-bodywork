<script lang="ts">
	import meta, { getPageDescription, BOOKING_URL } from '$lib/data/meta.js';
	import { testimonials } from '$lib/data/testimonials.js';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import TestimonialsSchema from '$lib/components/TestimonialsSchema.svelte';
</script>

<TestimonialsSchema />
<SeoHead title="Testimonials - {meta.title}" description={getPageDescription('/testimonials')} />

<section class="bg-base-200 px-4 py-12 pt-24">
	<div class="mx-auto max-w-3xl text-center">
		<h1 class="text-secondary mb-6 text-4xl font-bold uppercase md:text-5xl">Testimonials</h1>
		<p class="text-base-content/85 text-lg">
			What clients say about golf-focused bodywork and performance sessions at KC Fairway Bodywork in
			Midtown Kansas City.
		</p>
	</div>
</section>

<div class="bg-secondary mx-auto h-[2px] w-[80vw]"></div>

<section class="bg-base-200 px-4 py-12">
	<div class="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each testimonials as item (item.id)}
			<figure class="card bg-base-100 shadow-xl">
				<blockquote class="card-body pb-2">
					{#if item.ratingValue}
						<p class="text-secondary mb-2 text-sm tracking-widest" aria-label="{item.ratingValue} out of 5 stars">
							{'★'.repeat(item.ratingValue)}{'☆'.repeat(5 - item.ratingValue)}
						</p>
					{/if}
					<p class="text-lg opacity-90">"{item.quote}"</p>
				</blockquote>
				<figcaption class="card-body pt-0">
					<p class="text-secondary font-semibold">— {item.author}</p>
					{#if item.source}
						<p class="text-base-content/75 text-sm">
							{item.source}{item.date ? ` · ${item.date}` : ''}
						</p>
					{/if}
				</figcaption>
			</figure>
		{/each}
	</div>
</section>

<section class="bg-base-200 px-4 pb-16 text-center">
	<p class="text-base-content/85 mb-6 max-w-xl mx-auto text-lg">
		Had a great experience? We would appreciate your feedback on Google.
	</p>
	<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
		<a
			href={meta.gbp_url}
			class="btn btn-secondary btn-lg"
			target="_blank"
			rel="noopener noreferrer"
		>
			Leave a review on Google
		</a>
		<a href={BOOKING_URL} class="btn btn-primary btn-lg" target="_blank" rel="noopener noreferrer">
			Book a session
		</a>
	</div>
</section>
