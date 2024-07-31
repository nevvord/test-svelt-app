import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
	kit: {
		adapter: adapter({
			// See below for an explanation of these options
			routes: {
				include: ['/*'],
				exclude: ['<all>']
			},
			platformProxy: {
				configPath: 'wrangler.toml',
				environment: {
					MIGHTY_KV: '4287aa742a7a4b7abdf06552bc4f949f'
				},
				experimentalJsonConfig: false,
				persist: false,
				persist: './svelte-path',
			}
		})
	},
	preprocess: vitePreprocess()
};
