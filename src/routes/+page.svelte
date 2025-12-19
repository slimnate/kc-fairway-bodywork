<script>
	import { offerings } from '$lib/data/services.js';

	/**
	 * @param {number|string} price
	 * @returns {string}
	 */
	const formatPrice = (price) => {
		if (typeof price !== 'number') return String(price);
		return `$${Number.isInteger(price) ? price : price.toFixed(2)}`;
	};
</script>

<section class="bg-base-200 flex flex-col items-center justify-center py-8 pt-12">
	<div class="mx-auto max-w-4xl py-6 text-balance">
		<img src="/img/logo.webp" alt="KC Fairway Bodywork Logo" class="max-h-176" />
	</div>
	<div class="mx-auto max-w-4xl text-balance md:py-6 mt-[-210px]">
		<img
			src="/img/snelly.jpg"
			alt="Snelly the Massage Snail"
			class="mt-6 max-h-50 rounded-full opacity-80 md:max-h-64"
		/>
	</div>
	<div class="mx-auto max-w-2xl py-6 text-balance md:text-lg">
		<p class="pb-4">
			Welcome to KC Fairway Bodywork — where golfers come to improve mobility, reduce pain, and elevate their performance. I specialize in golf-focused, therapeutic bodywork designed to enhance range of motion, unlock your swing, and support long-term recovery. Using targeted techniques such as Deep Tissue, Neuromuscular therapy, Structural Integration, and mobility-based muscle work, I help golfers move better both on and off the course.
		</p>
		<p>
			Whether you're dealing with tightness, recovering from pain, or looking to play your best more often, every session is built on care, quality, and improvement. If you’re ready to unlock motion and unlock your game, you’re in the right place.
		</p>
	</div>
</section>
<div class="bg-primary mx-auto h-[2px] w-[80vw]"></div>

<section class="bg-base-200 flex flex-col items-center justify-center py-12">
	<div class="mx-auto max-w-4xl py-6 text-balance">
		<h2
			class="home-page-header text-3xl font-bold uppercase md:text-4xl"
		>
		Elevate Your Performance
		</h2>
	</div>
	<p class="mx-auto max-w-2xl py-4 text-balance text-center text-lg md:text-xl opacity-90">
		Imagine stepping onto the course with more mobility, less pain, and a swing that feels smooth and free. Whether you’re recovering, improving, or preparing for your next round, your path to better golf starts here.
	</p>
	<div class="flex w-full justify-center py-6">
		<a
			href="https://selfcare.noterro.com/"
			class="btn btn-secondary btn-xl w-full rounded-full px-8 py-4 text-xl font-semibold shadow-lg md:w-lg"
		>
			Book Now
		</a>
	</div>
</section>

<div class="section-divider mx-auto h-[2px] w-[80vw]"></div>

<!-- Services -->

<section class="bg-base-200 flex flex-col items-center justify-center py-12">
	<div class="mx-auto max-w-4xl py-6 text-balance">
		<h2
			class="home-page-header text-3xl font-bold uppercase md:text-4xl"
		>
			Services
		</h2>
	</div>
	<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl">
		{#each offerings as offering (offering.id)}
			<div class="card bg-base-100 shadow">
				<div class="card-body">
					<div class="flex items-center gap-3 pb-4">
						<span class="icon icon-md icon-custom {offering.icon}"></span>
						<h3 class="card-title text-secondary">{offering.serviceName}</h3>
					</div>
					<p class="opacity-80">{offering.description}</p>
					{#if offering.packages && offering.packages.length}
						<ul class="mt-2 mx-auto flex gap-4 flex-col text-center">
							{#if offering.id == 'therapeutic-massage'}
								{#each offering.packages as pkg}
									<li class="pb-1 flex items-center gap-2">
										<span class="icon icon-xs icon-custom icon-clock"></span>
										<span class="font-medium text-lg">{pkg.name}</span> – <span class="font-bold text-lg">{formatPrice(pkg.price)}</span>
									</li>
								{/each}
							{/if}
							{#if offering.id == 'chair-massage'}
								{#each offering.packages as pkg}
									<li class="pb-1 flex flex-col">
										<div class="flex gap-2 items-center">
											<span class="icon icon-xs icon-custom icon-clock"></span>
											<span class="font-medium text-lg">{pkg.name}</span> – <span class="font-bold text-lg">{formatPrice(pkg.price)}</span>
										</div>
										<div class="text-sm opacity-70">{pkg.description}</div>
									</li>
								{/each}
							{/if}
							{#if offering.id == 'packages'}
								{#each offering.packages as pkg}
									<li class="pb-1 flex items-center gap-2">
										<span class="icon icon-xs icon-custom icon-clock"></span>
										<span class="font-medium text-lg">{pkg.name}</span> – <span class="font-bold text-lg">{formatPrice(pkg.price)}</span>
									</li>
								{/each}
							{/if}
							{#if offering.id == 'mobile-massage'}
								{#each offering.packages as pkg}
									<li class="pb-1 flex items-center gap-2">
										<span class="icon icon-xs icon-custom icon-clock"></span>
										<span class="font-medium text-lg">{pkg.name}</span> – <span class="font-bold text-lg">{formatPrice(pkg.price)}</span>
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
