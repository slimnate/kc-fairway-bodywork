/**
 * Client testimonials for /testimonials and featured homepage quotes.
 *
 * All entries must be real, published Google reviews, verbatim, never invented.
 * Do not add placeholder or fabricated quotes.
 *
 * @typedef {{
 *   id: string;
 *   author: string;
 *   quote: string;
 *   source?: string;
 *   date?: string;
 *   includeInSchema?: boolean;
 *   datePublished?: string;
 *   ratingValue?: number;
 *   featured?: boolean;
 * }} Testimonial
 */

/** @type {Testimonial[]} */
export const testimonials = [
	{
		id: 'keegan-s',
		author: 'Keegan S.',
		quote:
			"Anthony is incredible at what he does and has helped me relieve pain and increase movement every time I've gone to him! Highly recommend to anyone, whether or not you're a golfer.",
		source: 'Google review',
		ratingValue: 5,
		includeInSchema: false,
		featured: true
	},
	{
		id: 'alexander-h',
		author: 'Alexander H.',
		quote:
			'Asked appropriately investigative questions to understand the sources of any issues he might be addressing... While work was predominantly focused on pressure points in my hip flexor and psoas, and the tightness I felt there, the relief I feel in my lower back the next day is astounding. Very amicable and professional guy.',
		source: 'Google review',
		ratingValue: 5,
		includeInSchema: false,
		featured: true
	},
	{
		id: 'james-m',
		author: 'James M.',
		quote:
			'I visited Anthony for shoulder pain and issues with range of motion due to an injury... During the session he was able to locate and relieve areas that were causing pain. Afterward I noticed range of motion had significantly improved... Highly recommend scheduling an appointment!',
		source: 'Google review',
		ratingValue: 5,
		includeInSchema: false,
		featured: true
	},
	{
		id: 'hannah-g',
		author: 'Hannah G.',
		quote:
			'Anthony has totally helped with my knee pain!!! I am so grateful and look forward to working with him to continue my healing.',
		source: 'Google review',
		ratingValue: 5,
		includeInSchema: false,
		featured: true
	},
	{
		id: 'latonya-s',
		author: 'Latonya S.',
		quote:
			'Anthony was amazing!! He was very professional, extremely attentive and knowledgeable... The ambiance was perfect for mind relaxation. I will be back!!',
		source: 'Google review',
		ratingValue: 5,
		includeInSchema: false,
		featured: true
	}
];
