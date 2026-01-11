<script lang="ts">
	let {
		tags = $bindable([] as string[]),
		placeholder = 'Type a tag and press Enter',
		id = 'tag-input'
	} = $props();

	let inputValue = $state('');
	let inputElement: HTMLInputElement | undefined = undefined;

	function addTag() {
		const trimmed = inputValue.trim();
		if (trimmed && !tags.includes(trimmed)) {
			tags = [...tags, trimmed];
			inputValue = '';
		}
	}

	function removeTag(tagToRemove: string) {
		tags = tags.filter((tag) => tag !== tagToRemove);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			event.preventDefault();
			addTag();
		}
	}

	function handleBlur() {
		// Add tag on blur if there's input
		if (inputValue.trim()) {
			addTag();
		}
	}
</script>

<div
	class="input input-bordered border-primary/30 focus-within:border-primary focus-within:outline-primary flex h-auto min-h-[3rem] w-full flex-wrap content-start items-start gap-2 overflow-visible p-2 py-2"
>
	{#each tags as tag}
		<span class="badge border-primary/30 bg-primary/10 text-primary gap-1 pr-1 shadow-sm">
			{tag}
			<button
				type="button"
				class="btn btn-xs btn-circle btn-ghost hover:bg-error/20 hover:text-error h-4 min-h-0 w-4 p-0"
				onclick={() => removeTag(tag)}
				aria-label="Remove tag {tag}"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-3 w-3"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		</span>
	{/each}
	<input
		bind:this={inputElement}
		{id}
		type="text"
		class="min-w-[120px] flex-1 self-center border-0 bg-transparent focus:outline-none"
		placeholder={tags.length === 0 ? placeholder : ''}
		bind:value={inputValue}
		onkeydown={handleKeydown}
		onblur={handleBlur}
	/>
</div>
