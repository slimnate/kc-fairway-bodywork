<script lang="ts">
	/** @typedef {import('$lib/data/nav').NavItem} NavItem */
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import HamburgerButton from './HamburgerButton.svelte';

	let isScrolled = $state(false);

	onMount(() => {
		// Handle click outside navbar
		document.addEventListener('click', (event: MouseEvent) => {
			// Check if the click is outside the nav items and hamburger button
			if (
				!navItemsElement?.contains(event.target as Node) &&
				!hamburgerButtonElement?.contains(event.target as Node) &&
				isOpen
			) {
				isOpen = false; // Collapse the navbar if clicked outside
			}
		});

		// Handle scroll to show/hide navbar background
		const handleScroll = () => {
			isScrolled = window.scrollY > 50;
		};

		window.addEventListener('scroll', handleScroll);

		// Cleanup
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	/**
	 * Handles navigation item clicks and collapses the navbar.
	 */
	async function closeNavMenu(event: MouseEvent) {
		isOpen = false;
	}

	let isOpen = $state(false);
	let navItemsElement = $state<HTMLElement | null>(null);
	let hamburgerButtonElement = $state<HTMLElement | null>(null);

	// Check if we're on the homepage
	let isHomePage = $derived($page.url.pathname === '/');

	/**
	 * @typedef {Object} Props
	 * @property {NavItem[]} navItems - An array of navigation items.
	 * @property {string} [siteName] - The name of the site.
	 *
	 * @param {Props} props - The props object.
	 */
	/** @type {Props} */
	let { navItems, siteName } = $props();

	// Calculate grid columns based on whether we're on homepage
	let gridColsClass = $derived(
		isHomePage ? `md:grid-cols-${navItems.length}` : `md:grid-cols-${navItems.length + 1}`
	);

	// Calculate the middle index for inserting the home icon
	let middleIndex = $derived(Math.floor(navItems.length / 2));
</script>

<!-- Hamburger button for mobile view -->
<HamburgerButton
	bind:btnElement={hamburgerButtonElement}
	bind:isOpen
	classes="md:hidden icon-custom top-2 left-2 fixed z-9999"
/>

<nav
	class="fixed z-50 flex w-full flex-col md:flex-row md:justify-between transition-all duration-300"
	class:open={isOpen}
	class:scrolled={isScrolled}
>
	<!-- Nav links -->
	<ul
		class="list-style-none mt-16 flex w-full flex-col text-center md:mt-0 md:grid md:items-center md:h-20 md:py-2 md:max-w-6xl md:mx-auto {gridColsClass}"
		bind:this={navItemsElement}
	>
		<!-- Home button - mobile only -->
		<li class="relative shrink-0 md:hidden">
			<a
				href="/"
				class="text-primary peer mx-auto inline-flex justify-start rounded-none border-none bg-transparent p-4 px-5 text-2xl font-semibold uppercase md:text-xl md:font-normal md:py-2"
				onclick={closeNavMenu}
			>
				Home
			</a>
			<!-- Animated underline effect -->
			<span
				class="bg-secondary absolute bottom-[20%] left-1/2 hidden h-[2px] w-0 transition-all duration-300 ease-in-out peer-hover:left-1/8 peer-hover:w-[75%]"
			></span>
		</li>

		<!-- Loop through navItems and create a list item for each -->
		{#each navItems as { href, text, featured }, index}
			<!-- Insert home icon in the middle on desktop -->
			{#if !isHomePage && index === middleIndex}
				<li class="hidden md:flex md:items-center md:justify-center">
					<a href="/" class="home-icon-link">
						<img
							src="/img/logo_256.webp"
							alt="Sincerely Selfcare Home"
							class="h-16 w-16 hover:scale-110 transition-transform duration-200"
						/>
					</a>
				</li>
			{/if}
			<li class:featured class="relative shrink-0 md:mt-0 md:mb-0 md:flex md:items-center">
				<a
					class="text-secondary peer mx-auto inline-flex justify-start rounded-none border-none bg-transparent p-4 px-5 text-2xl font-semibold uppercase md:text-xl md:font-normal md:py-2"
					onclick={closeNavMenu}
					{href}
				>
					{text}
				</a>
				<!-- Animated underline effect -->
				<span
					class="bg-secondary absolute bottom-[10%] left-1/2 hidden h-[2px] w-0 transition-all duration-300 ease-in-out peer-hover:left-[25%] peer-hover:w-[50%] md:absolute md:block"
				></span>
			</li>
		{/each}
	</ul>
</nav>

<style>
	/* .featured {
		background-color: var(--color-primary);
		color: var(--color-primary-content);
		margin-left: calc(var(--spacing) * 2);
	} */

	/*
	* Note: size value hardcoded since you can't use CSS var() in media query parameters.
	* would love to use var(--breakpoint-md) instead when it's supported.
	*/

	/* Gradient background when scrolled */
	nav.scrolled {
		background: linear-gradient(
			to bottom,
			color-mix(in oklab, var(--color-base-100) 95%, transparent),
			color-mix(in oklab, var(--color-base-100) 85%, transparent)
		);
		backdrop-filter: blur(10px);
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	}

	@media screen and (max-width: 767px) {
		nav {
			background-color: color-mix(in oklab, var(--color-base-100) 10%, transparent);
			backdrop-filter: blur(10px);
			height: 100vh;
			transform: translateX(-100%);
			transition:
				transform 0.3s ease-in-out,
				background-color 0.3s ease-in-out;

			&.open {
				transform: translateX(0%);
				transition: transform 0.3s ease-in-out;
				background-color: color-mix(in oklab, var(--color-base-100) 50%, transparent);
			}

			/* li:hover,
			li:active,
			li:focus {
				background-color: var(--color-base-200);
				box-shadow:
					inset 0 0 5px 2px color-mix(in oklab, var(--color-primary) 100%, transparent),
					inset 0 0 0 1px var(--color-primary);
			} */
		}
	}
</style>
