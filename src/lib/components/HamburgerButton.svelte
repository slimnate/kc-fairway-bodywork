<script>
	function toggleMenu() {
		isOpen = !isOpen;
	}

	let { isOpen = $bindable(false), size = '50', classes = '', btnElement = $bindable() } = $props();
</script>

<button
	class="hamburger {classes}"
	aria-label="Toggle navigation menu"
	aria-expanded={isOpen}
	aria-haspopup="true"
	aria-controls="primary-navigation"
	onclick={toggleMenu}
	bind:this={btnElement}
>
	<svg viewBox="0 0 100 100" width={size} fill="currentColor">
		<rect class="line top" width="80" height="10" x="10" y="25" rx="5"> </rect>
		<rect class="line middle" width="80" height="10" x="10" y="45" rx="5"> </rect>
		<rect class="line bottom" width="80" height="10" x="10" y="65" rx="5"> </rect>
	</svg>
</button>

<style>
	svg {
		cursor: pointer;
		filter: drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.99));
	}

	.hamburger {
		--button-color: #333;
	}

	.line {
		transition:
			transform 300ms ease-in,
			opacity 300ms ease-in;
		transform-origin: center;
	}

	.hamburger[aria-expanded='true'] .top {
		transform: rotate(45deg) translateY(20%);
		/* y: 45%; */
	}

	.hamburger[aria-expanded='true'] .middle {
		opacity: 0;
	}

	.hamburger[aria-expanded='true'] .bottom {
		transform: rotate(-45deg) translateY(-20%);
		/* y: 45%; */
	}
</style>
