<script lang="ts">
	import { developmentPricing, hostingPricing } from '$lib/data/pricing.js';

	let {
		featured,
		name,
		priceMin,
		priceMax,
		includedFeatures,
		tagline,
		icon,
		description,
		tier = 0,
		pricingData = null
	} = $props();

	// Use provided pricingData or fall back to development pricing
	const pricing = pricingData || developmentPricing;

	// Format price as a range or open-ended
	let priceDisplay = priceMax
		? `$${priceMin.toLocaleString()}–$${priceMax.toLocaleString()}`
		: `$${priceMin.toLocaleString()}+`;

	// Create a map of features by ID for easy lookup
	const featuresById = Object.fromEntries(
		pricing.features.map((feature: any) => [feature.id, feature])
	);

	// Get all package tiers up to the current one
	const packages = pricing.packages.slice(0, tier);

	// Get features from previous tiers (for filtering out duplicates)
	const previousTierFeatures = packages.flatMap((pkg: any) => pkg.includedFeatures);

	// Get unique features for this tier (not in previous tiers)
	const uniqueFeatureIds = includedFeatures.filter(
		(id: string) => !previousTierFeatures.includes(id)
	);

	// Get both title and description for unique features
	const uniqueFeaturesDetails = uniqueFeatureIds.map((id: string) => ({
		title: featuresById[id].title,
		description: featuresById[id].description
	}));
</script>

<div class="card bg-base-100/70 border-custom border-2 shadow-lg">
	<div class="relative flex h-full flex-col px-4 py-8">
		{#if featured}
			<div class="badge badge-warning badge-xl badge-dash absolute top-3 left-3">Most Popular</div>
		{/if}

		<!-- Icon and package name -->
		<div class=" flex flex-col items-center gap-3 text-left">
			<div class="icon md:icon-lg icon-md icon-custom {icon}"></div>
			<h2 class="text-2xl font-bold md:text-3xl">{name}</h2>
		</div>

		<!-- Tagline -->
		<p class="text-base-content/70 mb-2 text-xs text-balance italic md:text-sm">{tagline}</p>

		<!-- Price range -->
		<span class="text-primary mb-2 text-2xl font-semibold text-shadow-lg md:text-3xl"
			>{priceDisplay}</span
		>

		<!-- Package description -->
		<p class="text-base-content/70 text-sm text-balance md:text-base">
			{description}
		</p>

		<!-- Features introduction text -->
		<div class="text-base-content/70 mt-4 mb-2 text-lg md:text-xl">
			{#if tier === 0}
				Features:
			{:else}
				<p>
					<span class="text-base-content text-xl md:text-2xl"
						>{pricing.packages[tier - 1].name}</span
					>
					features plus:
				</p>
			{/if}
		</div>

		<ul class="flex flex-col gap-2 text-xs lg:gap-4">
			<!-- Only show unique features for this tier -->
			{#each uniqueFeaturesDetails as feature}
				<li>
					<div class="flex items-center gap-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="text-success me-1 mt-0.5 size-8 shrink-0"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 13l4 4L19 7"
							/>
						</svg>
						<div class="text-left">
							<p class="text-primary text-base font-semibold md:text-lg">
								{feature.title}
							</p>
							<p class="text-base-content/70 text-xs opacity-80 md:text-sm">
								{feature.description}
							</p>
						</div>
					</div>
				</li>
			{/each}
		</ul>

		<div class="mt-auto pt-4">
			<button class="btn btn-primary btn-block btn-grow-hover text-lg">
				<a href="/booking">Get Started</a>
			</button>
		</div>
	</div>
</div>
