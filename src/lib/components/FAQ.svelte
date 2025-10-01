<script>
	/**
	 * @typedef {import('$lib/data/faq.js').FAQItem} FAQItem
	 */

	/**
	 * @type {FAQItem[]}
	 * @description An array of frequently asked questions and their answers.
	 */
	export let faqs = [];
</script>

<div class="flex flex-col items-center py-12 text-left">
	<div class="w-full max-w-3xl space-y-2">
		{#each faqs as faq, index}
			<div class="bg-base-100 border-base-300 collapse-arrow collapse border">
				<input type="radio" name="faq-accordion" checked={index === 0} />
				<div class="collapse-title font-semibold">{faq.question}</div>
				<div class="collapse-content text-sm">
					{@html faq.answer}
				</div>
			</div>
		{/each}
	</div>
</div>
