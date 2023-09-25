import adapter from '@sveltejs/adapter-node';
import {vitePreprocess} from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			$styles: 'src/styles',
			$components: 'src/components',
		}
	},
	preprocess: vitePreprocess()
};

export default config;
