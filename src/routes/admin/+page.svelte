<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { signIn, getCurrentUser, isAdmin } from '$lib/auth.js';

	let email = '';
	let password = '';
	let loading = false;
	let error: string | null = null;

	onMount(async () => {
		// Check if user is already logged in and is admin
		const user = await getCurrentUser();
		if (user && (await isAdmin())) {
			goto('/admin/dashboard');
		}
	});

	async function handleLogin() {
		if (!email || !password) {
			error = 'Please fill in all fields';
			return;
		}

		loading = true;
		error = null;

		try {
			await signIn(email, password);

			// Check if user is admin
			if (await isAdmin()) {
				goto('/admin/dashboard');
			} else {
				error = 'Access denied. Admin privileges required.';
			}
		} catch (err: any) {
			error = err.message || 'Login failed';
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Admin Login - Spotlite Studios</title>
</svelte:head>

<div class="bg-blur flex min-h-screen items-center justify-center p-4">
	<div class="card bg-base-100/70 border-primary w-full max-w-md border-2 shadow-2xl">
		<div class="card-body">
			<div class="mb-6 text-center">
				<h1 class="text-primary text-2xl font-bold">Admin Login</h1>
				<p class="text-base-content/70">Sign in to manage your blog</p>
			</div>

			{#if error}
				<div class="alert alert-error mb-4">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 shrink-0 stroke-current"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<span>{error}</span>
				</div>
			{/if}

			<form on:submit|preventDefault={handleLogin} class="grid grid-cols-3 items-center gap-4">
				<label class="label justify-end" for="email">
					<span class="label-text">Email</span>
				</label>
				<input
					id="email"
					type="email"
					placeholder="admin@example.com"
					bind:value={email}
					required
					class="input input-bordered col-span-2"
				/>

				<label class="label justify-end" for="password">
					<span class="label-text">Password</span>
				</label>
				<input
					id="password"
					type="password"
					placeholder="••••••••"
					bind:value={password}
					required
					class="input input-bordered col-span-2"
				/>

				<div class="col-span-3">
					<button type="submit" disabled={loading} class="btn btn-primary w-full">
						{#if loading}
							<span class="loading loading-spinner loading-sm"></span>
							Signing in...
						{:else}
							Sign In
						{/if}
					</button>
				</div>
			</form>

			<div class="divider">OR</div>

			<div class="text-center">
				<a href="/" class="link link-primary">Back to Website</a>
			</div>
		</div>
	</div>
</div>
