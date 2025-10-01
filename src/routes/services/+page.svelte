<script>
	import {
		offerings,
		modalities,
		serviceAreas,
		mobileSetupSteps,
		clientPrepTips
	} from '$lib/data/services.js';

	/**
	 * @param {number|string} price
	 * @returns {string}
	 */
	const formatPrice = (price) => {
		if (typeof price !== 'number') return String(price);
		return `$${Number.isInteger(price) ? price : price.toFixed(2)}`;
	};
</script>

<section class="bg-base-200 px-4 py-12 pt-24">
	<h1
		class="text-primary text-shadow-primary-content mb-6 text-center text-4xl font-bold text-balance uppercase text-shadow-lg md:text-5xl"
	>
		Massage Therapy Services
	</h1>
	<p class="mx-auto mb-12 max-w-3xl text-center text-lg md:text-xl">
		Personalized therapeutic massage designed to relieve pain, improve mobility, and support your
		wellness journey. From in-home convenience to specialized modalities, every session is tailored
		to help you move better and feel your best.
	</p>
</section>

<div class="bg-primary mx-auto h-[2px] w-[80vw]"></div>

<!-- Service Offerings -->
<section class="bg-base-200 flex flex-col items-center justify-center py-12 px-4">
	<div class="mx-auto max-w-4xl py-6 text-balance">
		<h2
			class="text-primary text-shadow-primary-content text-center text-3xl font-bold uppercase text-shadow-md md:text-4xl"
		>
			Service Offerings
		</h2>
	</div>
	<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl w-full">
		{#each offerings as offering (offering.id)}
			<div class="card bg-base-100 shadow-lg">
				<div class="card-body">
					<div class="flex items-center gap-3 pb-4">
						<span class="icon icon-md text-primary {offering.icon}"></span>
						<h3 class="card-title text-primary">{offering.serviceName}</h3>
					</div>
					<p class="opacity-80">{offering.description}</p>
					{#if offering.packages && offering.packages.length}
						<ul class="mt-4 mx-auto flex gap-4 flex-col text-center">
							{#if offering.id == 'therapeutic-massage'}
								{#each offering.packages as pkg}
									<li class="pb-1 flex items-center gap-2">
										<span class="icon icon-xs text-primary icon-clock"></span>
										<span class="font-medium text-lg">{pkg.name}</span> – <span
											class="font-bold text-lg">{formatPrice(pkg.price)}</span
										>
									</li>
								{/each}
							{/if}
							{#if offering.id == 'chair-massage'}
								{#each offering.packages as pkg}
									<li class="pb-1 flex flex-col">
										<div class="flex gap-2 items-center">
											<span class="icon icon-xs text-primary icon-clock"></span>
											<span class="font-medium text-lg">{pkg.name}</span> – <span
												class="font-bold text-lg">{formatPrice(pkg.price)}</span
											>
										</div>
										<div class="text-sm opacity-70">{pkg.description}</div>
									</li>
								{/each}
							{/if}
							{#if offering.id == 'packages'}
								{#each offering.packages as pkg}
									<li class="pb-1 flex items-center gap-2">
										<span class="icon icon-xs text-primary icon-clock"></span>
										<span class="font-medium text-lg">{pkg.name}</span> – <span
											class="font-bold text-lg">{formatPrice(pkg.price)}</span
										>
									</li>
								{/each}
							{/if}
						</ul>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</section>

<div class="bg-primary mx-auto h-[2px] w-[80vw]"></div>

<!-- Modalities -->
<section class="bg-base-200 flex flex-col items-center justify-center py-12 px-4">
	<div class="mx-auto max-w-4xl py-6 text-balance">
		<h2
			class="text-primary text-shadow-primary-content text-center text-3xl font-bold uppercase text-shadow-md md:text-4xl"
		>
			Modalities & Techniques
		</h2>
		<p class="text-center mt-4 text-lg opacity-90">
			Every session draws from a range of evidence-based techniques to address your unique needs
		</p>
	</div>
	<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full">
		{#each modalities as modality (modality.id)}
			<div
				class="modality-card bg-base-100 border-primary border-2 rounded-lg p-6 shadow-md hover:shadow-xl transition-all hover:scale-105"
			>
				<div class="flex items-start gap-3">
					<span class="icon icon-sm text-primary icon-check-badge mt-1"></span>
					<div>
						<h3 class="text-primary font-bold text-lg mb-2">{modality.name}</h3>
						<p class="text-sm opacity-80">{modality.description}</p>
					</div>
				</div>
			</div>
		{/each}
	</div>
</section>

<div class="bg-primary mx-auto h-[2px] w-[80vw]"></div>

<!-- How It Works -->
<section class="bg-base-200 flex flex-col items-center justify-center py-12 px-4">
	<div class="mx-auto max-w-4xl py-6 text-balance">
		<h2
			class="text-primary text-shadow-primary-content text-center text-3xl font-bold uppercase text-shadow-md md:text-4xl"
		>
			How It Works
		</h2>
		<p class="text-center mt-4 text-lg opacity-90">
			Bringing professional massage therapy to you—simple, seamless, and stress-free
		</p>
	</div>

	<div class="max-w-5xl w-full grid gap-8 md:grid-cols-2">
		<!-- Mobile Setup -->
		<div class="card bg-base-100 shadow-xl">
			<div class="card-body">
				<div class="flex items-center gap-3 mb-4 justify-center">
					<span class="icon icon-lg text-primary icon-home-modern"></span>
					<h3 class="card-title text-primary text-2xl">Mobile Setup</h3>
				</div>
				<div class="space-y-4">
					{#each mobileSetupSteps as step (step.id)}
						<div>
							<h4 class="font-semibold text-lg">{step.title}</h4>
							<p class="opacity-80">
								{step.description}
							</p>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<!-- Client Prep -->
		<div class="card bg-base-100 shadow-xl">
			<div class="card-body">
				<div class="flex items-center gap-3 mb-4 justify-center">
					<span class="icon icon-lg text-primary icon-light-bulb"></span>
					<h3 class="card-title text-primary text-2xl">Client Prep Tips</h3>
				</div>
				<div class="space-y-4">
					{#each clientPrepTips as tip (tip.id)}
						<div>
							<h4 class="font-semibold text-lg">{tip.title}</h4>
							<p class="opacity-80">
								{tip.description}
							</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<div class="bg-primary mx-auto h-[2px] w-[80vw]"></div>

<!-- Service Areas -->
<section class="bg-base-200 flex flex-col items-center justify-center py-12 px-4">
	<div class="mx-auto max-w-4xl py-6 text-balance">
		<h2
			class="text-primary text-shadow-primary-content text-center text-3xl font-bold uppercase text-shadow-md md:text-4xl"
		>
			Service Areas
		</h2>
		<p class="text-center mt-4 text-lg opacity-90">
			Proudly serving the greater Kansas City metro area
		</p>
	</div>

	<div class="max-w-6xl w-full">
		<div
			class="bg-base-100 rounded-2xl shadow-xl p-8 border-primary border-2 relative overflow-hidden"
		>
			<!-- Decorative map-like background -->
			<div
				class="absolute inset-0 opacity-5 pointer-events-none"
				style="background-image: radial-gradient(circle at 20% 50%, var(--color-primary) 2px, transparent 2px),
              radial-gradient(circle at 80% 50%, var(--color-primary) 2px, transparent 2px),
              radial-gradient(circle at 50% 20%, var(--color-primary) 2px, transparent 2px),
              radial-gradient(circle at 50% 80%, var(--color-primary) 2px, transparent 2px);
              background-size: 100px 100px;"
			></div>

			<div class="relative z-10">
				<div class="text-center mb-8">
					<span class="icon icon-xl text-primary icon-map-pin"></span>
					<p class="mt-4 text-lg opacity-90">
						Mobile massage services available throughout the Kansas City metro. Travel fees may apply
						outside the immediate metro area.
					</p>
				</div>

				<div class="flex flex-wrap gap-3 justify-center">
					{#each serviceAreas as area (area.id)}
						<div
							class="badge-area bg-primary/10 border-primary border-2 rounded-full px-4 py-3 text-center hover:bg-primary hover:text-primary-content transition-all cursor-default transform hover:scale-105 whitespace-nowrap"
						>
							<span class="font-semibold text-sm">{area.name}</span>
						</div>
					{/each}
				</div>

				<div class="mt-8 text-center">
					<p class="text-sm opacity-70">
						Don't see your city? Contuct me at <a
							href="mailto:anthony@sincerelyselfcare.life"
							class="text-primary font-semibold hover:underline">anthony@sincerelyselfcare.life</a
						> to check availability in your area.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.modality-card {
		transition: all 0.3s ease;
	}

	.badge-area {
		transition: all 0.2s ease;
	}
</style>
