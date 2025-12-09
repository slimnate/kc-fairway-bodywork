<script>
	let { subtitle, cta_text = null, cta_link = null, classes = '' } = $props();
</script>

<div class="hero relative min-h-120 bg-cover bg-fixed {classes}">
	<!-- Backdrop -->
	<div class="overlay"></div>

	<!--	Content -->
	<div class="hero-content mx-8 flex h-full flex-col gap-0 p-0 md:mt-16 md:flex-row">
		<div class=""></div>
		<div class="basis-2/3">
			<img
				src="/img/logo.webp"
				alt="Spotlite Studios Logo"
				class="mx-auto my-8 max-w-60 lg:max-w-80"
			/>
		</div>
		<div class="flex h-full flex-col items-center justify-center gap-12 text-center">
			<div class="flex basis-3/4 items-end self-center text-balance">
				<span
					class="text-3xl font-semibold tracking-wide sm:text-4xl md:text-5xl"
				>
					{subtitle}</span
				>
			</div>
			<div class="mb-12 md:mb-24">
				<button class="btn btn-primary btn-xl btn-grow-hover shadow-primary-content shadow-xl"
					><a href={cta_link}>{cta_text}</a></button
				>
			</div>
		</div>
	</div>
</div>

<style>
	.overlay {
		height: 100%;
		width: 100%;
		background-color: color-mix(in oklab, var(--color-secondary) 10%, transparent);
		backdrop-filter: blur(5px);
	}

	.skewed {
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		width: 100%;
		height: 120%;
		z-index: 0;
		transform: skewY(10deg);
		transform-origin: top right;
	}

	.hero {
		box-shadow:
			var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow),
			var(--tw-ring-shadow), var(--tw-shadow);
	}
</style>
