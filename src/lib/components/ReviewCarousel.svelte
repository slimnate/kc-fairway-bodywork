<script>
	/** @typedef {import('$lib/data/reviews').Review} Review */

	import IconArrowLeft from '$lib/components/icons/IconArrowLeft.svelte';
	import IconArrowRight from '$lib/components/icons/IconArrowRight.svelte';
	import { onMount } from 'svelte';

	let activeIndex = $state(0);

	function prevSlide() {
		activeIndex = (activeIndex - 1 + reviews.length) % reviews.length;
	}

	function nextSlide() {
		activeIndex = (activeIndex + 1) % reviews.length;
	}

	/**
	 * @typedef {Object} Props
	 * @property {Review[]} reviews - An array of customer reviews.
	 * @property {string | null} [title] - The title of the review carousel.
	 *
	 * @param {Props} props - The props object.
	 */
	let { reviews } = $props();

	// Automatically cycle through reviews every 5 seconds
	onMount(() => {
		const interval = setInterval(() => {
			nextSlide();
		}, 5000);

		// Clear interval when the component is destroyed
		return () => clearInterval(interval);
	});
</script>

<section class="px-6 py-12 text-center">
	<div class="mx-auto flex w-full flex-col items-center">
		<div class="max-w-[80vw] space-y-6 md:max-w-lg">
			<!-- Carousel items -->
			<div class=" flex items-center">
				<button class="btn btn-circle mr-2" onclick={prevSlide}><IconArrowLeft /></button>
				{#each reviews as review, index}
					<div
						class="card bg-base-200 flex w-full flex-col items-center p-6 {activeIndex === index
							? ''
							: 'hidden'}"
						id={`slide-${index}`}
					>
						<img src={review.profileImage} alt={review.name} class="mb-4 h-24 w-24 rounded-full" />
						<h3 class="text-xl font-semibold">{review.name}</h3>
						<p class="text-yellow-500">
							{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
						</p>
						<p class="max-w-2xl">{review.review}</p>
					</div>
				{/each}
				<button class="btn btn-circle ml-2" onclick={nextSlide}><IconArrowRight /></button>
			</div>

			<!-- Carousel indicators -->
			<div class="mt-6 flex justify-center space-x-2">
				{#each reviews as _, index}
					<button
						type="button"
						class={activeIndex === index
							? 'btn btn-primary btn-xs btn-circle'
							: 'btn btn-xs btn-circle'}
						aria-label={`Go to slide ${index + 1}`}
						onclick={() => (activeIndex = index)}
					></button>
				{/each}
			</div>
		</div>
	</div>
</section>
