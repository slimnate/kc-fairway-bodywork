import { readable } from 'svelte/store';
import { browser } from '$app/environment';

export const isTouchDevice = readable(false, (set) => {
	if (!browser) return;

	// Initial detection
	const touchMediaQuery = window.matchMedia('(hover: none) and (pointer: coarse)');
	set(touchMediaQuery.matches);

	const updateTouchStatus = (e: MediaQueryListEvent) => set(e.matches);
	touchMediaQuery.addEventListener('change', updateTouchStatus);

	return () => {
		touchMediaQuery.removeEventListener('change', updateTouchStatus);
	};
});
