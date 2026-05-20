/**
 * Replace with real Google or MassageBook reviews when available.
 * @typedef {{ id: string; author: string; quote: string; source?: string; date?: string }} Testimonial
 */

/** @type {Testimonial[]} */
export const testimonials = [
	{
		id: '1',
		author: 'Mike R.',
		quote:
			'Anthony helped me unlock rotation I had been fighting for years. My hips feel freer through impact and I am not waking up stiff after 36 holes.',
		source: 'Golf client',
		date: '2025'
	},
	{
		id: '2',
		author: 'Sarah T.',
		quote:
			'Professional, knowledgeable, and focused on results. The structural integration work made a real difference in my posture and how I move day to day.',
		source: 'Studio client',
		date: '2025'
	},
	{
		id: '3',
		author: 'James L.',
		quote:
			'Best bodywork experience I have had in Kansas City. Clear communication, great space in Midtown, and my shoulder pain improved after just a few sessions.',
		source: 'Performance bodywork',
		date: '2024'
	}
];
