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

<!-- Facebook -->
<span>
	<!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. -->
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 320 512"
		fill={brandColors ? '#1877f2' : 'currentColor'}
		class={sizeClasses[size]}
	>
		<!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. -->

		<path
			d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"
		/>
	</svg>
</span>
