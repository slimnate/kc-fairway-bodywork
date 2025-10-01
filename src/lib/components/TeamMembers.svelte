<script>
	import TeamMemberAvatar from './TeamMemberAvatar.svelte';

	let { team } = $props();
</script>

<div class="mx-auto max-w-4xl">
	<h2 class="mb-4 text-3xl font-bold">Meet Our Team</h2>
	<p class="mb-8">
		Our team is composed of passionate professionals who are dedicated to making a difference.
		Together, we strive to create a positive impact for our customers and the community.
	</p>
	<div class="my-12 flex flex-wrap justify-center gap-6">
		{#each team as member}
			<TeamMemberAvatar name={member.name} role={member.role} image={member.image} />
		{/each}
	</div>
</div>
