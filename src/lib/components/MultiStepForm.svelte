<script lang="ts">
	import { developmentPricing, hostingPricing } from '$lib/data/pricing.js';

	// Example test data (comment out when not testing)
	const testData = {
		// Step 1: Contact Info
		fullName: 'John Smith',
		email: 'john.smith@example.com',
		phone: '(555) 123-4567',

		// Step 2: Business Basics
		businessName: "Smith's Artisan Bakery",
		industry: 'Other',
		industryOther: 'Artisanal Baking & Catering',
		currentWebsite: 'https://smithsbakery.example.com',
		noWebsite: false,

		// Step 3: Project Scope
		projectGoals:
			'Looking to modernize our website with online ordering capabilities.\nKey goals:\n- Mobile-friendly design\n- Integration with our POS system\n- Custom cake design configurator\n- Event calendar for classes and workshops',
		timeline: '3-6 months',
		budgetRange: '$5,000-$10,000',

		// Step 4: Services & Packages
		servicesRequested: {
			websiteDevelopment: true,
			hostingMaintenance: true,
			brandingDesign: true,
			seoMarketing: false
		},
		preferredDevelopmentPackage: 'Growth',
		preferredHostingPackage: 'Professional',

		// Step 5: Final Touch
		hearAboutUs: 'Other',
		hearAboutUsOther: 'Local Business Network Meetup',
		additionalNotes:
			"We'd like to discuss integration options with our existing Square POS system.\nAlso interested in learning more about your experience with food service websites."
	};

	// Form data structure
	let formData = {
		// Step 1: Contact Info
		fullName: '',
		email: '',
		phone: '',

		// Step 2: Business Basics
		businessName: '',
		industry: '',
		industryOther: '',
		currentWebsite: '',
		noWebsite: false,

		// Step 3: Project Scope
		projectGoals: '',
		timeline: '',
		budgetRange: '',

		// Step 4: Services & Packages
		servicesRequested: {
			websiteDevelopment: false,
			hostingMaintenance: false,
			brandingDesign: false,
			seoMarketing: false
		},
		preferredDevelopmentPackage: '',
		preferredHostingPackage: '',

		// Step 5: Final Touch
		hearAboutUs: '',
		hearAboutUsOther: '',
		additionalNotes: ''
	};

	// Uncomment the following line to use test data
	// formData = testData;

	let currentStep = 1;
	const totalSteps = 6;

	// Reference to the steps container for scrolling
	let stepsContainer: HTMLElement;

	// Validation state
	let errors: Record<string, string> = {};

	// Auto-scroll to current step when it changes
	$: if (stepsContainer && currentStep) {
		// Use setTimeout to ensure DOM is updated
		setTimeout(() => {
			const currentStepElement = stepsContainer.querySelector(`li:nth-child(${currentStep})`);
			if (currentStepElement) {
				currentStepElement.scrollIntoView({
					behavior: 'smooth',
					block: 'nearest',
					inline: 'center'
				});
			}
		}, 0);
	}

	// Step validation functions
	function validateStep1(): boolean {
		errors = {};
		if (!formData.fullName.trim()) errors.fullName = 'Name is required';
		if (!formData.email.trim()) errors.email = 'Email is required';
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			errors.email = 'Please enter a valid email address';
		}
		return Object.keys(errors).length === 0;
	}

	function validateStep2(): boolean {
		errors = {};
		if (!formData.businessName.trim()) errors.businessName = 'Business name is required';
		if (!formData.industry) {
			errors.industry = 'Industry is required';
		} else if (formData.industry === 'Other' && !formData.industryOther.trim()) {
			errors.industryOther = 'Please specify your industry';
		}
		if (!formData.noWebsite) {
			if (!formData.currentWebsite.trim()) {
				errors.currentWebsite = 'Current website URL is required';
			} else {
				// URL validation regex - accepts domain names with or without protocol
				const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;
				if (!urlRegex.test(formData.currentWebsite)) {
					errors.currentWebsite =
						'Please enter a valid URL (e.g., yourwebsite.com or https://yourwebsite.com)';
				}
			}
		}
		return Object.keys(errors).length === 0;
	}

	function validateStep3(): boolean {
		errors = {};
		if (!formData.projectGoals.trim()) errors.projectGoals = 'Project goals are required';
		if (!formData.timeline) errors.timeline = 'Timeline is required';
		return Object.keys(errors).length === 0;
	}

	function validateStep4(): boolean {
		errors = {};
		const hasServices = Object.values(formData.servicesRequested).some((service) => service);
		if (!hasServices) errors.services = 'Please select at least one service';

		// Validate development package if website development is selected
		if (
			formData.servicesRequested.websiteDevelopment &&
			!formData.preferredDevelopmentPackage.trim()
		) {
			errors.preferredDevelopmentPackage = 'Please select a development package';
		}

		// Validate hosting package if hosting maintenance is selected
		if (formData.servicesRequested.hostingMaintenance && !formData.preferredHostingPackage.trim()) {
			errors.preferredHostingPackage = 'Please select a hosting package';
		}

		return Object.keys(errors).length === 0;
	}

	function validateStep5(): boolean {
		errors = {};
		if (formData.hearAboutUs === 'Other' && !formData.hearAboutUsOther.trim()) {
			errors.hearAboutUsOther = 'Please specify how you heard about us';
		}
		return Object.keys(errors).length === 0;
	}

	function nextStep() {
		let isValid = false;

		switch (currentStep) {
			case 1:
				isValid = validateStep1();
				break;
			case 2:
				isValid = validateStep2();
				break;
			case 3:
				isValid = validateStep3();
				break;
			case 4:
				isValid = validateStep4();
				break;
			case 5:
				isValid = validateStep5();
				break;
			default:
				isValid = true;
		}

		if (isValid && currentStep < totalSteps) {
			currentStep++;
		}
	}

	function prevStep() {
		if (currentStep > 1) {
			currentStep--;
		}
	}

	function submitForm() {
		// Final validation
		if (!validateStep1() || !validateStep2() || !validateStep3() || !validateStep4()) {
			return;
		}

		// Update hidden form fields with current data
		const formDataObj = new FormData();

		formDataObj.set('form-name', 'booking');

		// Set all the form fields
		formDataObj.set('fullName', formData.fullName);
		formDataObj.set('email', formData.email);
		formDataObj.set('phone', formData.phone);
		formDataObj.set('businessName', formData.businessName);
		formDataObj.set(
			'industry',
			formData.industry === 'Other' ? formData.industryOther : formData.industry
		);
		formDataObj.set('industryOther', formData.industryOther);
		formDataObj.set('currentWebsite', formData.noWebsite ? 'none' : formData.currentWebsite);
		formDataObj.set('projectGoals', formData.projectGoals);
		formDataObj.set('timeline', formData.timeline);
		formDataObj.set('budgetRange', formData.budgetRange);
		formDataObj.set(
			'websiteDevelopment',
			formData.servicesRequested.websiteDevelopment ? 'on' : ''
		);
		formDataObj.set(
			'hostingMaintenance',
			formData.servicesRequested.hostingMaintenance ? 'on' : ''
		);
		formDataObj.set('brandingDesign', formData.servicesRequested.brandingDesign ? 'on' : '');
		formDataObj.set('seoMarketing', formData.servicesRequested.seoMarketing ? 'on' : '');
		formDataObj.set('preferredDevelopmentPackage', formData.preferredDevelopmentPackage);
		formDataObj.set('preferredHostingPackage', formData.preferredHostingPackage);
		formDataObj.set(
			'hearAboutUs',
			formData.hearAboutUs === 'Other' ? formData.hearAboutUsOther : formData.hearAboutUs
		);
		formDataObj.set('hearAboutUsOther', formData.hearAboutUsOther);
		formDataObj.set('additionalNotes', formData.additionalNotes);

		// Submit the form using Netlify's form handling
		fetch('/netlify/form-booking.html', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams(formDataObj as any).toString()
		})
			.then((response) => {
				// Redirect to success page
				if (response.ok) {
					window.location.href = '/booking/success';
				} else {
					alert('There was an error submitting your form. Please try again.');
				}
			})
			.catch((error) => {
				console.error('Error submitting form:', error);
				alert('There was an error submitting your form. Please try again.');
			});
	}

	// Industry options
	const industries = [
		'Retail',
		'Food & Beverage',
		'Health & Wellness',
		'Professional Services',
		'Technology',
		'Education',
		'Non-profit',
		'Real Estate',
		'Manufacturing',
		'Other'
	];

	// Timeline options
	const timelines = ['ASAP', '1-2 months', '3-6 months', 'Flexible'];

	// Budget options
	const budgetRanges = ['<$2,000', '$2,000-$5,000', '$5,000-$10,000', '$10,000+'];

	// Referral sources
	const referralSources = ['Referral', 'Social Media', 'Google Search', 'Other'];
</script>

<div class="mx-auto max-w-4xl p-6">
	<!-- Steps Progress -->
	<ul class="steps steps-horizontal mb-8 w-full" bind:this={stepsContainer}>
		<li class="step {currentStep >= 1 ? 'step-primary' : ''}">
			<span class="text-shadow-primary-content tracking-wide text-shadow-md">Contact Info</span>
		</li>
		<li class="step {currentStep >= 2 ? 'step-primary' : ''}">
			<span class="text-shadow-primary-content tracking-wide text-shadow-md">Business Info</span>
		</li>
		<li class="step {currentStep >= 3 ? 'step-primary' : ''}">
			<span class="text-shadow-primary-content tracking-wide text-shadow-md">Project Scope</span>
		</li>
		<li class="step {currentStep >= 4 ? 'step-primary' : ''}">
			<span class="text-shadow-primary-content tracking-wide text-shadow-md"
				>Services & Packages</span
			>
		</li>
		<li class="step {currentStep >= 5 ? 'step-primary' : ''}">
			<span class="text-shadow-primary-content tracking-wide text-shadow-md">Final Steps</span>
		</li>
		<li class="step {currentStep >= 6 ? 'step-primary' : ''}">
			<span class="text-shadow-primary-content tracking-wide text-shadow-md">Review</span>
		</li>
	</ul>

	<!-- Form Container -->
	<form
		name="booking"
		method="POST"
		data-netlify="true"
		class="card bg-base-100/70 shadow-primary-content/20 border-primary min-h-[40vh] border-2 shadow-xl"
	>
		<div class="card-body flex flex-col justify-between">
			<!-- Step 1: Contact Info -->
			{#if currentStep === 1}
				<div class="space-y-6">
					<h2 class="text-primary text-2xl font-bold">Contact Information</h2>
					<p class="text-base-content/70">Let's start with your basic contact details.</p>

					<div class="grid grid-cols-1 gap-4 md:grid-cols-3 md:items-center">
						<!-- Full Name -->
						<label for="fullName" class="text-left md:row-start-1 md:text-right">
							<span class="relative font-medium">
								Name
								<span class="text-error absolute -right-2.5">*</span>
							</span>
						</label>
						<div class="md:col-span-2 md:row-start-1">
							<input
								id="fullName"
								type="text"
								class="input input-bordered w-full {errors.fullName ? 'input-error' : ''}"
								bind:value={formData.fullName}
								placeholder="Enter your full name"
							/>
							{#if errors.fullName}
								<div class="text-error mt-1 pl-3.5 text-left text-sm">{errors.fullName}</div>
							{/if}
						</div>

						<!-- Email -->
						<label for="email" class="text-left md:row-start-2 md:text-right">
							<span class="relative font-medium">
								Email Address
								<span class="text-error absolute -right-2.5">*</span>
							</span>
						</label>
						<div class="md:col-span-2 md:row-start-2">
							<input
								id="email"
								type="email"
								name="email"
								class="input input-bordered w-full {errors.email ? 'input-error' : ''}"
								bind:value={formData.email}
								placeholder="Enter your email address"
							/>
							{#if errors.email}
								<div class="text-error mt-1 pl-3.5 text-left text-sm">{errors.email}</div>
							{/if}
						</div>

						<!-- Phone -->
						<label for="phone" class="text-left md:row-start-3 md:text-right">
							<span class="font-medium">Phone Number</span>
						</label>
						<div class="md:col-span-2 md:row-start-3">
							<input
								id="phone"
								type="tel"
								class="input input-bordered w-full"
								bind:value={formData.phone}
								placeholder="Enter your phone number"
							/>
						</div>

						<div class="text-base-content/70 -mt-2 text-left text-sm md:col-span-2 md:col-start-2">
							Only used for scheduling or urgent follow-up
						</div>
					</div>
				</div>
			{/if}

			<!-- Step 2: Business Basics -->
			{#if currentStep === 2}
				<div class="space-y-6">
					<h2 class="text-primary text-2xl font-bold">Business Basics</h2>
					<p class="text-base-content/70">Tell us about your business and current situation.</p>

					<div class="grid grid-cols-1 gap-4 md:grid-cols-3 md:items-center">
						<!-- Business Name -->
						<label for="businessName" class="text-left md:row-start-1 md:text-right">
							<span class="relative font-medium">
								Business Name
								<span class="text-error absolute -right-2.5">*</span>
							</span>
						</label>
						<div class="md:col-span-2 md:row-start-1">
							<input
								id="businessName"
								type="text"
								class="input input-bordered w-full {errors.businessName ? 'input-error' : ''}"
								bind:value={formData.businessName}
								placeholder="Enter your business name"
							/>
							{#if errors.businessName}
								<div class="text-error mt-1 pl-3.5 text-left text-sm">{errors.businessName}</div>
							{/if}
						</div>

						<!-- Industry -->
						<label for="industry" class="text-left md:row-start-2 md:text-right">
							<span class="relative font-medium">
								Industry
								<span class="text-error absolute -right-2.5">*</span>
							</span>
						</label>
						<div class="md:col-span-2 md:row-start-2">
							<select
								id="industry"
								class="select select-bordered w-full {errors.industry ? 'select-error' : ''}"
								bind:value={formData.industry}
							>
								<option value="">Select your industry</option>
								{#each industries as industry}
									<option value={industry}>{industry}</option>
								{/each}
							</select>
							{#if errors.industry}
								<div class="text-error mt-1 pl-3.5 text-left text-sm">{errors.industry}</div>
							{/if}
							{#if formData.industry === 'Other'}
								<input
									id="industryOther"
									type="text"
									class="input input-bordered mt-2 w-full {errors.industryOther
										? 'input-error'
										: ''}"
									bind:value={formData.industryOther}
									placeholder="Please specify your industry"
								/>
								{#if errors.industryOther}
									<div class="text-error mt-1 pl-3.5 text-left text-sm">{errors.industryOther}</div>
								{/if}
							{/if}
						</div>

						<!-- Current Website -->
						<label for="currentWebsite" class="text-left md:row-start-3 md:text-right">
							<span class="relative font-medium">
								Current Website URL
								<span class="text-error absolute -right-2.5">*</span>
							</span>
						</label>
						<div class="md:col-span-2 md:row-start-3">
							<input
								id="currentWebsite"
								type="url"
								class="input input-bordered w-full {errors.currentWebsite ? 'input-error' : ''}"
								bind:value={formData.currentWebsite}
								placeholder="https://yourwebsite.com"
								disabled={formData.noWebsite}
							/>
							{#if errors.currentWebsite}
								<div class="text-error mt-1 pl-3.5 text-left text-sm">{errors.currentWebsite}</div>
							{/if}
						</div>

						<!-- No Website Checkbox -->

						<div class="md:col-span-2 md:col-start-2 md:row-start-4">
							<label for="noWebsite" class="label w-full cursor-pointer justify-start text-left">
								<input
									id="noWebsite"
									type="checkbox"
									class="checkbox checkbox-primary mr-2"
									bind:checked={formData.noWebsite}
								/>
								<span class="label-text">We don't have a website yet</span>
							</label>
						</div>
					</div>
				</div>
			{/if}

			<!-- Step 3: Project Scope -->
			{#if currentStep === 3}
				<div class="space-y-6">
					<h2 class="text-primary text-2xl font-bold">Project Scope</h2>
					<p class="text-base-content/70">Help us understand your project goals and timeline.</p>

					<div class="grid grid-cols-1 gap-4 md:grid-cols-3 md:items-center">
						<!-- Project Goals -->
						<label for="projectGoals" class="text-left md:row-start-1 md:pt-2 md:text-right">
							<span class="relative font-medium">
								Project Goals
								<span class="text-error absolute -right-2.5">*</span>
							</span>
						</label>
						<div class="md:col-span-2 md:row-start-1">
							<textarea
								id="projectGoals"
								class="textarea textarea-bordered w-full {errors.projectGoals
									? 'textarea-error'
									: ''}"
								bind:value={formData.projectGoals}
								placeholder="Describe your project goals (e.g., launch a new site, redesign existing site, improve SEO, add new features)"
								rows="4"
							></textarea>
							{#if errors.projectGoals}
								<div class="text-error mt-1 pl-3.5 text-left text-sm">{errors.projectGoals}</div>
							{/if}
						</div>

						<!-- Timeline -->
						<label for="timeline" class="text-left md:row-start-2 md:text-right">
							<span class="relative font-medium">
								Desired Timeline
								<span class="text-error absolute -right-2.5">*</span>
							</span>
						</label>
						<div class="md:col-span-2 md:row-start-2">
							<select
								id="timeline"
								class="select select-bordered w-full {errors.timeline ? 'select-error' : ''}"
								bind:value={formData.timeline}
							>
								<option value="">Select timeline</option>
								{#each timelines as timeline}
									<option value={timeline}>{timeline}</option>
								{/each}
							</select>
							{#if errors.timeline}
								<div class="text-error mt-1 pl-3.5 text-left text-sm">{errors.timeline}</div>
							{/if}
						</div>

						<!-- Budget Range -->
						<label for="budgetRange" class="text-left md:row-start-3 md:text-right">
							<span class="font-medium">Budget Range</span>
						</label>
						<div class="md:col-span-2 md:row-start-3">
							<select
								id="budgetRange"
								class="select select-bordered w-full"
								bind:value={formData.budgetRange}
							>
								<option value="">Select budget range</option>
								{#each budgetRanges as budget}
									<option value={budget}>{budget}</option>
								{/each}
							</select>
						</div>
					</div>
				</div>
			{/if}

			<!-- Step 4: Services & Packages -->
			{#if currentStep === 4}
				<div class="space-y-6">
					<h2 class="text-primary text-2xl font-bold">Services & Packages</h2>
					<p class="text-base-content/70">
						Select the services you need and your preferred packages.
					</p>

					<div class="grid grid-cols-1 gap-4 md:grid-cols-3 md:items-center">
						<!-- Services Requested -->
						<div class="text-left md:row-start-1 md:pt-2 md:text-right">
							<span class="relative font-medium">
								Services Requested
								<span class="text-error absolute -right-2.5">*</span>
							</span>
						</div>
						<div class="md:col-span-2 md:row-start-1">
							<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
								<label for="websiteDevelopment" class="label cursor-pointer justify-start">
									<input
										id="websiteDevelopment"
										type="checkbox"
										class="checkbox checkbox-primary mr-2"
										bind:checked={formData.servicesRequested.websiteDevelopment}
									/>
									<span class="label-text">Website Development</span>
								</label>
								<label for="hostingMaintenance" class="label cursor-pointer justify-start">
									<input
										id="hostingMaintenance"
										type="checkbox"
										class="checkbox checkbox-primary mr-2"
										bind:checked={formData.servicesRequested.hostingMaintenance}
									/>
									<span class="label-text">Hosting & Maintenance</span>
								</label>
								<label for="brandingDesign" class="label cursor-pointer justify-start">
									<input
										id="brandingDesign"
										type="checkbox"
										class="checkbox checkbox-primary mr-2"
										bind:checked={formData.servicesRequested.brandingDesign}
									/>
									<span class="label-text">Branding & Design</span>
								</label>
								<label for="seoMarketing" class="label cursor-pointer justify-start">
									<input
										id="seoMarketing"
										type="checkbox"
										class="checkbox checkbox-primary mr-2"
										bind:checked={formData.servicesRequested.seoMarketing}
									/>
									<span class="label-text">SEO & Marketing</span>
								</label>
							</div>
							{#if errors.services}
								<div class="text-error mt-1 pl-3.5 text-left text-sm">{errors.services}</div>
							{/if}
						</div>

						<!-- Development Package -->
						{#if formData.servicesRequested.websiteDevelopment}
							<label
								for="preferredDevelopmentPackage"
								class="text-left md:row-start-2 md:text-right"
							>
								<span class="relative font-medium">
									Preferred Development Package
									<span class="text-error absolute -right-2.5">*</span>
								</span>
							</label>
							<div class="md:col-span-2 md:row-start-2">
								<select
									id="preferredDevelopmentPackage"
									class="select select-bordered w-full {errors.preferredDevelopmentPackage
										? 'select-error'
										: ''}"
									bind:value={formData.preferredDevelopmentPackage}
								>
									<option value="">Select development package</option>
									{#each developmentPricing.packages as pkg}
										<option value={pkg.name}>{pkg.name} - ${pkg.priceMin}-${pkg.priceMax}</option>
									{/each}
									<option value="Not sure yet">Not sure yet</option>
								</select>
								{#if errors.preferredDevelopmentPackage}
									<div class="text-error mt-1 pl-3.5 text-left text-sm">
										{errors.preferredDevelopmentPackage}
									</div>
								{/if}
							</div>
						{/if}

						<!-- Hosting Package -->
						{#if formData.servicesRequested.hostingMaintenance}
							<label for="preferredHostingPackage" class="text-left md:row-start-3 md:text-right">
								<span class="relative font-medium">
									Preferred Hosting Package
									<span class="text-error absolute -right-2.5">*</span>
								</span>
							</label>
							<div class="md:col-span-2 md:row-start-3">
								<select
									id="preferredHostingPackage"
									class="select select-bordered w-full {errors.preferredHostingPackage
										? 'select-error'
										: ''}"
									bind:value={formData.preferredHostingPackage}
								>
									<option value="">Select hosting package</option>
									{#each hostingPricing.packages as pkg}
										<option value={pkg.name}>{pkg.name} - ${pkg.priceMin}-${pkg.priceMax}</option>
									{/each}
									<option value="Not sure yet">Not sure yet</option>
								</select>
								{#if errors.preferredHostingPackage}
									<div class="text-error mt-1 pl-3.5 text-left text-sm">
										{errors.preferredHostingPackage}
									</div>
								{/if}
							</div>
						{/if}
					</div>
				</div>
			{/if}

			<!-- Step 5: Final Touch -->
			{#if currentStep === 5}
				<div class="space-y-6">
					<h2 class="text-primary text-2xl font-bold">Final Touch</h2>
					<p class="text-base-content/70">
						Help us personalize your experience and share any additional details.
					</p>

					<div class="grid grid-cols-1 gap-4 md:grid-cols-3 md:items-center">
						<!-- How did you hear about us -->
						<label for="hearAboutUs" class="text-left md:row-start-1 md:text-right">
							<span class="font-medium">How did you hear about us?</span>
						</label>
						<div class="md:col-span-2 md:row-start-1">
							<select
								id="hearAboutUs"
								class="select select-bordered w-full"
								bind:value={formData.hearAboutUs}
							>
								<option value="">Select option</option>
								{#each referralSources as source}
									<option value={source}>{source}</option>
								{/each}
							</select>
							{#if formData.hearAboutUs === 'Other'}
								<input
									id="hearAboutUsOther"
									type="text"
									class="input input-bordered mt-2 w-full {errors.hearAboutUsOther
										? 'input-error'
										: ''}"
									bind:value={formData.hearAboutUsOther}
									placeholder="Please specify how you heard about us"
								/>
								{#if errors.hearAboutUsOther}
									<div class="text-error mt-1 pl-3.5 text-left text-sm">
										{errors.hearAboutUsOther}
									</div>
								{/if}
							{/if}
						</div>

						<!-- Additional Notes -->
						<label for="additionalNotes" class="text-left md:row-start-2 md:pt-2 md:text-right">
							<span class="font-medium">Additional Notes or Questions</span>
						</label>
						<div class="md:col-span-2 md:row-start-2">
							<textarea
								id="additionalNotes"
								class="textarea textarea-bordered w-full"
								bind:value={formData.additionalNotes}
								placeholder="Share anything unique about your project or any questions you have"
								rows="4"
							></textarea>
						</div>
					</div>
				</div>
			{/if}

			<!-- Step 6: Review -->
			{#if currentStep === 6}
				<div class="space-y-6">
					<h2 class="text-primary text-2xl font-bold">Review Your Information</h2>
					<p class="text-base-content/70 -mt-4">Please review all the details before submitting.</p>

					<div class=" space-y-8">
						<!-- Contact Information -->
						<div class="bg-base-200/80 space-y-2 rounded-lg p-4">
							<div class="mb-2 flex items-center justify-between">
								<h3 class="text-primary text-lg font-semibold tracking-wide">
									Contact Information
								</h3>
								<button class="btn btn-sm btn-outline btn-info" on:click={() => (currentStep = 1)}>
									<span>Edit</span>
								</button>
							</div>
							<div class="">
								<div class="grid grid-cols-1 gap-4 md:grid-cols-3 md:items-center">
									<div class="text-left font-bold md:text-right">
										<span class="md:font-medium">Full Name</span>
									</div>
									<div class="text-base-content/70 text-left md:col-span-2">
										{formData.fullName}
									</div>

									<div class="text-left font-bold md:text-right">
										<span class="md:font-medium">Email</span>
									</div>
									<div class="text-base-content/70 text-left md:col-span-2">
										{formData.email}
									</div>

									{#if formData.phone}
										<div class="text-left font-bold md:text-right">
											<span class="md:font-medium">Phone</span>
										</div>
										<div class="text-base-content/70 text-left md:col-span-2">
											{formData.phone}
										</div>
									{/if}
								</div>
							</div>
						</div>

						<!-- Business Information -->
						<div class="bg-base-200/80 space-y-2 rounded-lg p-4">
							<div class="mb-2 flex items-center justify-between">
								<h3 class="text-primary text-lg font-semibold tracking-wide">
									Business Information
								</h3>
								<button class="btn btn-sm btn-outline btn-info" on:click={() => (currentStep = 2)}>
									<span>Edit</span>
								</button>
							</div>
							<div class="">
								<div class="grid grid-cols-1 gap-4 md:grid-cols-3 md:items-center">
									<div class="text-left font-bold md:text-right">
										<span class="md:font-medium">Business Name</span>
									</div>
									<div class="text-base-content/70 text-left md:col-span-2">
										{formData.businessName}
									</div>

									{#if formData.industry}
										<div class="text-left font-bold md:text-right">
											<span class="md:font-medium">Industry</span>
										</div>
										<div class="text-base-content/70 text-left md:col-span-2">
											{formData.industry === 'Other' ? formData.industryOther : formData.industry}
										</div>
									{/if}

									{#if formData.currentWebsite && !formData.noWebsite}
										<div class="text-left font-bold md:text-right">
											<span class="md:font-medium">Current Website</span>
										</div>
										<div class="text-base-content/70 text-left md:col-span-2">
											{formData.currentWebsite}
										</div>
									{/if}

									{#if formData.noWebsite}
										<div class="text-left font-bold md:text-right">
											<span class="md:font-medium">Website Status</span>
										</div>
										<div class="text-base-content/70 text-left md:col-span-2">No website yet</div>
									{/if}
								</div>
							</div>
						</div>

						<!-- Project Scope -->
						<div class="bg-base-200/80 space-y-2 rounded-lg p-4">
							<div class="mb-2 flex items-center justify-between">
								<h3 class="text-primary text-lg font-semibold tracking-wide">Project Scope</h3>
								<button class="btn btn-sm btn-outline btn-info" on:click={() => (currentStep = 3)}>
									<span>Edit</span>
								</button>
							</div>
							<div class="">
								<div class="grid grid-cols-1 gap-4 md:grid-cols-3 md:items-start">
									<div class="text-left font-bold md:pt-2 md:text-right">
										<span class="md:font-medium">Project Goals</span>
									</div>
									<div class="text-base-content/70 text-left md:col-span-2">
										<p class="whitespace-pre-wrap">{formData.projectGoals}</p>
									</div>

									<div class="text-left font-bold md:text-right">
										<span class="md:font-medium">Timeline</span>
									</div>
									<div class="text-base-content/70 text-left md:col-span-2">
										{formData.timeline}
									</div>

									{#if formData.budgetRange}
										<div class="text-left font-bold md:text-right">
											<span class="md:font-medium">Budget Range</span>
										</div>
										<div class="text-base-content/70 text-left md:col-span-2">
											{formData.budgetRange}
										</div>
									{/if}
								</div>
							</div>
						</div>

						<!-- Services & Packages -->
						<div class="bg-base-200/80 space-y-2 rounded-lg p-4">
							<div class="mb-2 flex items-center justify-between">
								<h3 class="text-primary text-lg font-semibold tracking-wide">
									Services & Packages
								</h3>
								<button class="btn btn-sm btn-outline btn-info" on:click={() => (currentStep = 4)}>
									<span>Edit</span>
								</button>
							</div>
							<div class="">
								<div class="grid grid-cols-1 gap-4 md:grid-cols-3 md:items-start">
									<div class="text-left font-bold md:pt-2 md:text-right">
										<span class="md:font-medium">Services Requested</span>
									</div>
									<div class="text-base-content/70 text-left md:col-span-2">
										<ul class="list-inside list-disc">
											{#if formData.servicesRequested.websiteDevelopment}
												<li>Website Development</li>
											{/if}
											{#if formData.servicesRequested.hostingMaintenance}
												<li>Hosting & Maintenance</li>
											{/if}
											{#if formData.servicesRequested.brandingDesign}
												<li>Branding & Design</li>
											{/if}
											{#if formData.servicesRequested.seoMarketing}
												<li>SEO & Marketing</li>
											{/if}
										</ul>
									</div>

									{#if formData.servicesRequested.websiteDevelopment && formData.preferredDevelopmentPackage}
										<div class="text-left font-bold md:text-right">
											<span class="md:font-medium">Development Package</span>
										</div>
										<div class="text-base-content/70 text-left md:col-span-2">
											{formData.preferredDevelopmentPackage}
										</div>
									{/if}

									{#if formData.servicesRequested.hostingMaintenance && formData.preferredHostingPackage}
										<div class="text-left font-bold md:text-right">
											<span class="md:font-medium">Hosting Package</span>
										</div>
										<div class="text-base-content/70 text-left md:col-span-2">
											{formData.preferredHostingPackage}
										</div>
									{/if}
								</div>
							</div>
						</div>

						<!-- Additional Information -->
						<div class="bg-base-200/80 space-y-2 rounded-lg p-4">
							<div class="mb-2 flex items-center justify-between">
								<h3 class="text-primary text-lg font-semibold tracking-wide">
									Additional Information
								</h3>
								<button class="btn btn-sm btn-outline btn-info" on:click={() => (currentStep = 5)}>
									<span>Edit</span>
								</button>
							</div>
							<div class="">
								<div class="grid grid-cols-1 gap-4 md:grid-cols-3 md:items-start">
									{#if formData.hearAboutUs}
										<div class="text-left font-bold md:text-right">
											<span class="md:font-medium">How did you hear about us?</span>
										</div>
										<div class="text-base-content/70 text-left md:col-span-2">
											{formData.hearAboutUs === 'Other'
												? formData.hearAboutUsOther
												: formData.hearAboutUs}
										</div>
									{/if}

									{#if formData.additionalNotes}
										<div class="text-left font-bold md:pt-2 md:text-right">
											<span class="md:font-medium">Additional Notes</span>
										</div>
										<div class="text-base-content/70 text-left md:col-span-2">
											<p class="whitespace-pre-wrap">{formData.additionalNotes}</p>
										</div>
									{/if}
								</div>
							</div>
						</div>
					</div>
				</div>
			{/if}

			<!-- Navigation Buttons -->
			<div class="mt-8 flex justify-between">
				<button
					type="button"
					class="btn btn-outline {currentStep === 1 ? 'btn-disabled' : ''}"
					on:click={prevStep}
					disabled={currentStep === 1}
				>
					Previous
				</button>

				{#if currentStep < totalSteps}
					<button type="button" class="btn btn-primary" on:click={nextStep}> Next </button>
				{:else}
					<button type="button" class="btn btn-primary" on:click|preventDefault={submitForm}>
						Submit Form
					</button>
				{/if}
			</div>
		</div>
	</form>
</div>

<style>
	.step {
		min-width: 6rem;
	}
</style>
