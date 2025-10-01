<script lang="ts">
	let formData = {
		name: '',
		email: '',
		phone: ''
	};

	let isSubmitting = false;
	let isSuccess = false;
	let error = '';

	async function handleSubmit(event: Event) {
		event.preventDefault();
		isSubmitting = true;
		error = '';

		try {
			const form = event.target as HTMLFormElement;
			const formDataObj = new FormData(form);

			const response = await fetch('/netlify/form-mailing-list.html', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: new URLSearchParams(formDataObj as any).toString()
			});

			if (response.ok) {
				isSuccess = true;
				formData = { name: '', email: '', phone: '' };
			} else {
				error = 'Something went wrong. Please try again.';
			}
		} catch (err) {
			error = 'Failed to submit. Please check your connection and try again.';
			console.error(err);
		} finally {
			isSubmitting = false;
		}
	}
</script>

<svelte:head>
	<title>Join Our Mailing List - Sincerely, Selfcare</title>
	<meta
		name="description"
		content="Stay updated with wellness tips, massage therapy insights, and exclusive offers from Sincerely, Selfcare"
	/>
</svelte:head>

<section class="bg-base-200 flex flex-col items-center justify-center py-8 pt-12">
	<div class="mx-auto max-w-4xl py-6 text-balance">
		<img src="/img/logo.webp" alt="Sincerely Selfcare Logo" class="max-h-128" />
	</div>
	<div class="mx-auto max-w-4xl text-balance md:py-6">
		<img
			src="/img/snelly.jpg"
			alt="Snelly the Massage Snail"
			class="mt-6 max-h-50 rounded-full opacity-80 md:max-h-64"
		/>
	</div>
	<div class="mx-auto max-w-3xl py-6 text-balance text-center px-4 md:text-lg">
		<h1 class="text-primary text-4xl font-bold uppercase mb-6 md:text-5xl">Join Our Mailing List</h1>
		<p class="mb-8">
			Stay connected with Sincerely, Selfcare! Receive wellness tips, massage therapy insights,
			self-care advice, and exclusive offers delivered straight to your inbox.
		</p>
	</div>
</section>

<div class="bg-primary mx-auto h-[2px] w-[80vw]"></div>

<!-- Form Section -->
<section class="bg-base-200 flex flex-col items-center justify-center py-12 px-4">
	<div class="mx-auto max-w-2xl w-full">
		{#if isSuccess}
			<div class="card bg-base-100 shadow-xl border-primary border-2">
				<div class="card-body text-center">
					<div class="mb-4">
						<span class="icon icon-xl text-primary icon-check-circle mx-auto"></span>
					</div>
					<h2 class="text-primary text-2xl font-bold mb-4">Thank You for Subscribing!</h2>
					<p class="text-lg mb-6">
						You've successfully joined our mailing list. We're excited to share wellness insights
						and updates with you.
					</p>
					<div class="flex flex-col gap-4 sm:flex-row sm:justify-center">
						<a href="/" class="btn btn-primary btn-lg"> Back to Home </a>
						<a href="/services" class="btn btn-outline btn-primary btn-lg"> View Services </a>
					</div>
				</div>
			</div>
		{:else}
			<div class="card bg-base-100 shadow-xl border-primary border-2">
				<div class="card-body">
					<h2 class="card-title text-primary text-2xl justify-center mb-6">Subscribe Now</h2>

					{#if error}
						<div class="alert alert-error mb-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="stroke-current shrink-0 h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<span>{error}</span>
						</div>
					{/if}

					<form
						name="mailing"
						method="POST"
						data-netlify="true"
						data-netlify-honeypot="bot-field"
						onsubmit={handleSubmit}
					>
						<!-- Hidden fields for Netlify -->
						<input type="hidden" name="form-name" value="mailing" />
						<p class="hidden">
							<label>
								Don't fill this out if you're human: <input name="bot-field" />
							</label>
						</p>

						<div class="space-y-6">
							<!-- Name Field -->
							<div class="form-control">
								<label for="name" class="label">
									<span class="label-text text-lg font-semibold">Full Name *</span>
								</label>
								<input
									type="text"
									id="name"
									name="name"
									bind:value={formData.name}
									required
									class="input input-bordered input-primary w-full"
									placeholder="Enter your full name"
								/>
							</div>

							<!-- Email Field -->
							<div class="form-control">
								<label for="email" class="label">
									<span class="label-text text-lg font-semibold">Email Address *</span>
								</label>
								<input
									type="email"
									id="email"
									name="email"
									bind:value={formData.email}
									required
									class="input input-bordered input-primary w-full"
									placeholder="your.email@example.com"
								/>
							</div>

							<!-- Phone Field -->
							<div class="form-control">
								<label for="phone" class="label">
									<span class="label-text text-lg font-semibold">Phone Number *</span>
								</label>
								<input
									type="tel"
									id="phone"
									name="phone"
									bind:value={formData.phone}
									required
									class="input input-bordered input-primary w-full"
									placeholder="(555) 123-4567"
								/>
							</div>

							<!-- Privacy Notice -->
							<div class="text-sm opacity-70 text-center">
								<p>
									By subscribing, you agree to receive emails from Sincerely, Selfcare. You can
									unsubscribe at any time. We respect your privacy and will never share your
									information.
								</p>
							</div>

							<!-- Submit Button -->
							<div class="form-control mt-8">
								<button
									type="submit"
									class="btn btn-primary btn-lg w-full"
									disabled={isSubmitting}
								>
									{#if isSubmitting}
										<span class="loading loading-spinner"></span>
										Subscribing...
									{:else}
										Subscribe to Mailing List
									{/if}
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		{/if}
	</div>
</section>

