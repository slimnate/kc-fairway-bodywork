import { faqItems } from '$lib/data/faq.js';

/** @returns {Record<string, unknown>} */
export function buildFaqPageJsonLd() {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqItems.map((item) => ({
			'@type': 'Question',
			name: item.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: item.answer
			}
		}))
	};
}
