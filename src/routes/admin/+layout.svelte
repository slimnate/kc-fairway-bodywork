<script lang="ts">
	import { page } from '$app/state';
	import type { PageData } from './$types';
	import Toast from '$lib/components/Toast.svelte';
	import meta from '$lib/data/meta';

	const { data, children }: { data: PageData; children: any } = $props();

	let sidebarOpen = $state(false);

	function toggleSidebar() {
		sidebarOpen = !sidebarOpen;
	}

	function handleLogout() {
		// Navigate to logout endpoint which handles sign out
		window.location.href = '/api/auth/logout';
	}

	// Check if user has admin access (any role: admin, blog, or bookings)
	const hasAdminAccess = $derived(
		(data?.hasAdminRole ?? false) ||
			(data?.hasBlogRole ?? false) ||
			(data?.hasBookingsRole ?? false)
	);

	// Filter navigation items based on user roles
	const navItems = $derived(
		[
			{ href: '/admin', label: 'Dashboard', icon: '📊', role: 'admin' },
			{ href: '/admin/bookings', label: 'Bookings', icon: '📋', role: 'bookings' },
			{ href: '/admin/blog', label: 'Blog', icon: '📝', role: 'blog' }
		].filter((item) => {
			// Show item if user has the required role
			return data?.adminUser?.roles?.includes(item.role) ?? false;
		})
	);
</script>

<div class="min-h-screen">
	<!-- Mobile sidebar backdrop -->
	{#if sidebarOpen}
		<div
			class="fixed inset-0 z-40 bg-black opacity-50 lg:hidden"
			onclick={toggleSidebar}
			role="none"
		></div>
	{/if}

	<!-- Sidebar -->
	<aside
		class="from-base-100 via-base-100 to-base-200 fixed top-0 left-0 z-50 h-full w-64 transform bg-linear-to-b shadow-2xl transition-transform duration-300 ease-in-out lg:translate-x-0 {sidebarOpen
			? 'translate-x-0'
			: '-translate-x-full'}"
	>
		<div class="flex h-full flex-col">
			<!-- Logo/Brand -->
			<div
				class="border-primary/20 from-primary/20 border-b bg-linear-to-r via-transparent to-transparent p-6"
			>
				<div class="flex items-center justify-between">
					<div class="flex-1">
						<h1 class="text-primary text-2xl font-bold">Admin Panel</h1>
						<p class="text-base-content/60 text-sm font-medium">{meta.name}</p>
					</div>
					<button
						onclick={toggleSidebar}
						class="btn btn-ghost btn-sm hover:bg-primary/10 lg:hidden"
						type="button"
						aria-label="Toggle sidebar"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
			</div>

			<!-- Navigation -->
			<nav class="flex-1 p-4">
				<ul class="space-y-2">
					{#each navItems as item}
						<li>
							<a
								href={item.href}
								class="group flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 {page
									.url.pathname === item.href
									? 'text-primary-content shadow-primary/30 bg-primary shadow-md'
									: 'hover:bg-primary/20 hover:text-primary'}"
							>
								<span class="text-xl transition-all"
									>{page.url.pathname === item.href ? item.icon : item.icon}</span
								>
								<span class="font-medium transition-colors"
									>{page.url.pathname === item.href ? item.label : item.label}</span
								>
							</a>
						</li>
					{/each}
				</ul>
			</nav>

			<!-- User Info & Logout -->
			<div class="border-primary/20 bg-base-200/50 border-t p-4">
				<div class="bg-base-200/50 mb-4 rounded-lg p-3">
					<p class="text-base-content text-sm font-semibold">
						{data?.adminUser?.firstName}
						{data?.adminUser?.lastName}
					</p>
					<p class="text-base-content/60 text-xs">{data?.adminUser?.email}</p>
				</div>
				<button
					onclick={handleLogout}
					class="btn btn-outline btn-sm border-primary/30 hover:border-primary hover:bg-primary/10 w-full"
					type="button"
				>
					Logout
				</button>
			</div>
		</div>
	</aside>

	<!-- Mobile hamburger button (floating) -->
	<button
		onclick={toggleSidebar}
		class="btn btn-primary fixed top-4 left-4 z-40 shadow-lg lg:hidden"
		type="button"
		aria-label="Toggle sidebar"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M4 6h16M4 12h16M4 18h16"
			/>
		</svg>
	</button>

	<!-- Main Content -->
	<div class="lg:ml-64">
		<!-- Page Content -->
		<main class="p-6">
			{#if data && !hasAdminAccess}
				<!-- Access Denied Message -->
				<div
					class="card border-error/30 from-base-100 to-base-200 shadow-error/10 mx-auto max-w-2xl border-2 bg-gradient-to-br shadow-2xl"
				>
					<div class="card-body py-12 text-center">
						<div class="mb-4 text-6xl">🔒</div>
						<h2
							class="card-title from-error to-error/70 mb-2 justify-center bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent"
						>
							Access Denied
						</h2>
						<p class="text-base-content/80 mb-4">
							You are logged in as <strong
								>{data.adminUser?.firstName} {data.adminUser?.lastName}</strong
							>
							({data.adminUser?.email}), but you do not have admin panel access.
						</p>
						<p class="text-base-content/60 mb-6 text-sm">
							If you believe you should have access to the admin panel, please contact your
							administrator.
						</p>
						<div class="flex justify-center gap-4">
							<button class="btn btn-primary shadow-lg" onclick={handleLogout}> Logout </button>
							<a
								href="/"
								class="btn btn-outline border-primary/30 hover:border-primary hover:bg-primary/10"
							>
								Go to Home
							</a>
						</div>
					</div>
				</div>
			{:else}
				{@render children()}
			{/if}
		</main>
	</div>
	<Toast />
</div>

<style>
	:global(body) {
		overflow-x: hidden;
	}
</style>
