import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				poppins: ['Poppins', 'sans-serif']
			}
		}
	},
	safelist: ['badge-success', 'badge-warning', 'md:grid-cols-4', 'md:grid-cols-5'],
	plugins: [daisyui]
};
