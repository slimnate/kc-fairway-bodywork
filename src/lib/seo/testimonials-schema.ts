import meta from '$lib/data/meta.js';
import { testimonials } from '$lib/data/testimonials.js';

const BUSINESS_REVIEWED = {
	'@type': 'HealthAndBeautyBusiness' as const,
	name: meta.name,
	url: meta.siteUrl
};

/** Reviews included in JSON-LD only when marked with real, published Google/MassageBook quotes. */
export function buildTestimonialsJsonLd(): Record<string, unknown> | null {
	const schemaReviews = testimonials.filter(
		(t) => t.includeInSchema && t.datePublished && t.ratingValue
	);

	if (schemaReviews.length === 0) return null;

	return {
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		name: `${meta.name} client reviews`,
		itemListElement: schemaReviews.map((t, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			item: {
				'@type': 'Review',
				author: {
					'@type': 'Person',
					name: t.author
				},
				reviewBody: t.quote,
				datePublished: t.datePublished,
				reviewRating: {
					'@type': 'Rating',
					ratingValue: String(t.ratingValue),
					bestRating: '5'
				},
				itemReviewed: BUSINESS_REVIEWED
			}
		}))
	};
}
