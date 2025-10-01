<script>
	let { name, role, image } = $props();
</script>

<div>
	<div class="avatar">
		<div class="ring-secondary ring-offset-base-100 w-32 rounded-full ring-2 ring-offset-2">
			<img src={image} alt={name} />
		</div>
	</div>
	<p class="mt-2 text-center">{name}</p>
	<p class="text-center text-sm text-gray-500">{role}</p>
</div>
