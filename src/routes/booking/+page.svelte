<script lang="ts">
	import TitleHero from '$lib/components/TitleHero.svelte';
	import MultiStepForm from '$lib/components/MultiStepForm.svelte';
</script>

<div class="bg-blur grow p-2 pt-24" style="--blur-radius: 10px;">
	<div class="mx-auto max-w-4xl">
		<h1
			class="text-primary text-shadow-primary-content text-4xl font-bold uppercase text-shadow-lg"
		>
			Book a Consultation
		</h1>
		<p class="text-base-content text-shadow-primary-content mt-6 text-shadow-md">
			Please fill out the form below to book a consultation with us. We will get back to you as soon
			as possible.
		</p>
		<MultiStepForm />
	</div>
</div>
