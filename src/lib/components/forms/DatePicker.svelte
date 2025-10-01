<script>
	import { DateInput } from 'date-picker-svelte';

	export let date = new Date();
</script>

<DateInput bind:value={date} placeholder="Select a date" />

<style>
	.date-time-field > input {
		padding: 0px !important;
	}
</style>
