<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { getCurrentUser, isAdmin, signOut } from '$lib/auth.js';

	let user: any = null;
	let loading = true;

	onMount(async () => {
		// Skip auth check for login page
		if ($page.url.pathname === '/admin') {
			loading = false;
			return;
		}

		try {
			user = await getCurrentUser();
			if (!user || !(await isAdmin())) {
				goto('/admin');
				return;
			}
		} catch (error) {
			goto('/admin');
			return;
		} finally {
			loading = false;
		}
	});

	async function handleSignOut() {
		try {
			await signOut();
			goto('/admin');
		} catch (error) {
			console.error('Sign out error:', error);
		}
	}
</script>

{#if loading}
	<div class="flex min-h-screen items-center justify-center">
		<div class="loading loading-spinner loading-lg"></div>
	</div>
{:else if $page.url.pathname === '/admin'}
	<slot />
{:else}
	<div class="bg-base-200/70 mt-14 min-h-screen">
		<!-- Navigation -->
		<nav class="bg-base-200 shadow-lg">
			<div class="mx-auto px-4 sm:px-6 lg:px-8">
				<div class="flex h-16 justify-between">
					<div class="flex items-center">
						<h1 class="text-primary text-xl font-bold">Admin Panel</h1>
					</div>

					<div class="flex items-center space-x-4">
						<span class="text-base-content/70 text-sm">
							Welcome, {user?.email}
						</span>
						<button on:click={handleSignOut} class="btn btn-outline btn-sm"> Sign Out </button>
					</div>
				</div>
			</div>
		</nav>

		<!-- Sidebar and Content -->
		<div class="flex">
			<!-- Sidebar -->
			<aside class="bg-base-200 min-h-screen w-64 shadow-lg">
				<nav class="p-4 pt-0">
					<ul class="space-y-2">
						<li>
							<a
								href="/admin/dashboard"
								class="text-base-content hover:bg-base-300 flex items-center rounded-lg px-4 py-2 transition-colors {$page
									.url.pathname === '/admin/dashboard'
									? 'bg-primary text-primary-content'
									: ''}"
							>
								<svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
									/>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
									/>
								</svg>
								Dashboard
							</a>
						</li>
						<li>
							<a
								href="/admin/posts"
								class="text-base-content hover:bg-base-300 flex items-center rounded-lg px-4 py-2 transition-colors {$page.url.pathname.startsWith(
									'/admin/posts'
								)
									? 'bg-primary text-primary-content'
									: ''}"
							>
								<svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
									/>
								</svg>
								Posts
							</a>
						</li>
						<li>
							<a
								href="/admin/comments"
								class="text-base-content hover:bg-base-300 flex items-center rounded-lg px-4 py-2 transition-colors {$page
									.url.pathname === '/admin/comments'
									? 'bg-primary text-primary-content'
									: ''}"
							>
								<svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
									/>
								</svg>
								Comments
							</a>
						</li>
					</ul>
				</nav>
			</aside>

			<!-- Main Content -->
			<main class="flex-1 p-8">
				<slot />
			</main>
		</div>
	</div>
{/if}
