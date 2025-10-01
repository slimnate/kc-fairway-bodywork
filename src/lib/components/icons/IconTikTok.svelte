<script>
	/**
	 * @typedef {Object} Props
	 * @property {boolean} [brandColors] - Use brand colors for the icon. Default false
	 * @property {"xs" | "sm" | "md" | "lg" | "xl"} [size] - Size of the icon
	 */

	/** @type {Props} */
	let { brandColors = false, size = 'sm' } = $props();

	const sizeClasses = {
		xs: 'h-4 w-4',
		sm: 'h-6 w-6',
		md: 'h-7 w-7',
		lg: 'h-9 w-9',
		xl: 'h-12 w-12'
	};
</script>

<!-- TikTok -->
<span>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 448 512"
		fill={brandColors ? '#6a76ac' : 'currentColor'}
		class={sizeClasses[size]}
	>
		<!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. -->
		<path
			d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z"
		/>
	</svg>
</span>
