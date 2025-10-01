<script>
	let { heroImage = '', size = 'large', customClass = '', children } = $props();
</script>

<section
	class="hero {size == 'small'
		? 'min-h-40'
		: size == 'medium'
			? 'min-h-72'
			: size == 'large'
				? 'min-h-96'
				: ''} {customClass}"
	style={heroImage ? `background-image: url(${heroImage});` : ''}
>
	<div class="hero-overlay"></div>
	<div class="hero-content w-full text-center">
		{@render children()}
	</div>
</section>
