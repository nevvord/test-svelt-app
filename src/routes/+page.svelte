<script lang="ts">
	import to from 'await-to-js';
	import { onMount } from 'svelte';
	import { generateShortUrl, formDataValidator } from '$lib';
	import axios, { AxiosError } from 'axios';

	$: url = '';
	$: localUrl = '';
	$: customerUrl = '';
	$: generatedShortUrl = '';
	$: shortUrl = url || generatedShortUrl;
	$: loading = false;
	$: errors = {
		url: '',
		shortUrl: ''
	};
	$: apiError = '';

	onMount(() => {
		localUrl = location.origin;
		generatedShortUrl = generateShortUrl();
	});

	function regenerateShortUrl() {
		generatedShortUrl = generateShortUrl();
		url = '';
	}

	async function handleSubmit() {
		try {
			loading = true;
			errors = {
				url: '',
				shortUrl: ''
			};

			const payload = {
				url: customerUrl,
				shortUrl
			};

			const valid = await formDataValidator.safeParseAsync(payload);

			if (!valid.success) {
				valid.error.issues.forEach((issue) => {
					errors[issue.path[0] as keyof typeof errors] = issue.message;
				});

				return;
			}

			const [error, response] = await to(axios.post('/api/url', payload));

			if (error || !response) {
				if (axios.isAxiosError(error) && error.response?.data?.message) {
					apiError = error.response.data.message;
					return;
				}

				apiError = 'An error occurred. Please try again';
				return;
			}

			customerUrl = '';
			url = '';
		} catch (error) {
			console.error(error);
		} finally {
			loading = false;
		}
	}
</script>

<form
	class="mt-4 max-w-96 border p-5 bg-white rounded mx-auto"
	method="POST"
	action="/api/url"
	on:submit|preventDefault={handleSubmit}
>
	<div class="flex flex-col gap-4">
		<div class="flex flex-col">
			<label for="url" class="text-sm">Url</label>
			<input
				id="url"
				class={`border ${errors.url.length ? 'border-red-400 bg-red-50 text-red-900' : 'border-gray-200'} p-2 py-1 rounded-sm outline-none focus:ring-2 focus:ring-blue-300`}
				name="url"
				placeholder="https://your-long-link.best/../../.."
				bind:value={customerUrl}
			/>
			{#if errors.url.length}
				<p class="text-xs text-red-500">{errors.url}</p>
			{/if}
		</div>

		<div class="flex flex-col">
			<label for="short-url" class="text-sm">Short</label>
			<input
				id="short-url"
				class={`border ${errors.shortUrl.length ? 'border-red-400 bg-red-50 text-red-900' : 'border-gray-200'} p-2 py-1 rounded-sm outline-none focus:ring-2 ring-blue-300`}
				name="short-url"
				bind:value={url}
			/>
			{#if errors.url.length}
				<p class="text-xs text-red-500">{errors.shortUrl}</p>
			{/if}
			<div class="text-sm text-gray-600 mt-1 flex gap-6">
				<span>
					{localUrl}/{shortUrl}
				</span>
				<button
					on:click={regenerateShortUrl}
					class="px-1 bg-gray-600 text-white rounded"
					type="button"
				>
					Generate
				</button>
			</div>
		</div>

		<button
			disabled={!customerUrl.length || loading}
			class="bg-blue-500 rounded text-white py-2 disabled:bg-gray-400"
		>
			Create short link
		</button>
	</div>

	{#if apiError.length}
		<p class="text-red-500 text-sm mt-2 p-2 border rounded">{apiError}</p>
	{/if}
</form>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.50);
	}
</style>
