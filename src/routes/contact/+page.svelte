<script lang="ts">
	import meta, {
		getPageDescription,
		phoneTel,
		mapsEmbedUrl,
		BOOKING_URL
	} from '$lib/data/meta.js';
	import SeoHead from '$lib/components/SeoHead.svelte';
</script>

<SeoHead title="Contact - {meta.title}" description={getPageDescription('/contact')} />

<section class="bg-base-200 px-4 py-12 pt-24">
	<div class="mx-auto max-w-4xl text-center">
		<h1 class="text-secondary mb-6 text-4xl font-bold uppercase md:text-5xl">Contact</h1>
		<p class="text-base-content/85 mx-auto max-w-2xl text-lg">
			Studio sessions in Midtown Kansas City. Mobile bodywork available across the metro. Call, email,
			or book online.
		</p>
	</div>
</section>

<div class="bg-secondary mx-auto h-[2px] w-[80vw]"></div>

<section class="bg-base-200 px-4 py-12">
	<div class="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
		<div class="space-y-6">
			<div class="card bg-base-100 shadow-xl">
				<div class="card-body">
					<h2 class="text-secondary card-title text-2xl">Visit the studio</h2>
					<ul class="space-y-4 text-left">
						<li>
							<span class="text-secondary font-semibold">Address</span>
							<p>
								<a
									href={meta.gbp_url}
									class="hover:text-primary hover:underline"
									target="_blank"
									rel="noopener noreferrer"
								>
									{meta.address}
								</a>
							</p>
						</li>
						<li>
							<span class="text-secondary font-semibold">Phone</span>
							<p>
								<a href="tel:{phoneTel()}" class="hover:text-primary hover:underline">{meta.phone}</a>
							</p>
						</li>
						<li>
							<span class="text-secondary font-semibold">Email</span>
							<p>
								<a href="mailto:{meta.email}" class="hover:text-primary hover:underline"
									>{meta.email}</a
								>
							</p>
						</li>
					</ul>
					<a
						href={meta.gbp_url}
						class="btn btn-outline btn-secondary mt-2"
						target="_blank"
						rel="noopener noreferrer"
					>
						Get directions on Google Maps
					</a>
				</div>
			</div>

			<div class="card bg-base-100 shadow-xl">
				<div class="card-body">
					<h2 class="text-secondary card-title text-2xl">Hours</h2>
					<ul class="space-y-1 text-left opacity-90">
						{#each meta.openingHoursDisplay as hours}
							<li>{hours}</li>
						{/each}
					</ul>
				</div>
			</div>

			<a
				href={BOOKING_URL}
				class="btn btn-secondary btn-lg w-full"
				target="_blank"
				rel="noopener noreferrer"
			>
				Book online (MassageBook)
			</a>
		</div>

		<div class="overflow-hidden rounded-2xl shadow-xl">
			<iframe
				title="KC Fairway Bodywork location on Google Maps"
				src={mapsEmbedUrl()}
				width="600"
				height="450"
				class="h-64 w-full border-0 md:h-full md:min-h-[28rem]"
				loading="lazy"
				referrerpolicy="no-referrer-when-downgrade"
				allowfullscreen
			></iframe>
		</div>
	</div>
</section>
