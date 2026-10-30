<script lang="ts">
	type Testimonial = {
		author: string;
		quote: string;
		source?: string;
		date?: string;
		ratingValue?: number;
	};

	let { item, large = false }: { item: Testimonial; large?: boolean } = $props();
</script>

<figure class="card bg-base-100 shadow-xl">
	<blockquote class="card-body pb-2">
		{#if item.ratingValue}
			<p
				class="text-secondary mb-2 text-sm tracking-widest"
				aria-label="{item.ratingValue} out of 5 stars"
			>
				{'★'.repeat(item.ratingValue)}{'☆'.repeat(5 - item.ratingValue)}
			</p>
		{/if}
		<p class="opacity-90 {large ? 'text-xl md:text-2xl' : 'text-lg'}">"{item.quote}"</p>
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
