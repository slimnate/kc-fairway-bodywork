import meta from '$lib/data/meta.js';

const MASSAGEBOOK_URL =
	'https://www.massagebook.com/therapists/kc-fairway-bodywork/services?src=external';

/** @param {string} phone */
function toE164(phone: string): string {
	const digits = phone.replace(/\D/g, '');
	if (digits.length === 10) return `+1${digits}`;
	if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
	return `+${digits}`;
}

/** @returns {Record<string, unknown>} */
export function buildLocalBusinessJsonLd() {
	const sameAs = [meta.fb_url, meta.ig_url, meta.gbp_url, MASSAGEBOOK_URL].filter(
		(url): url is string => Boolean(url)
	);

	return {
		'@context': 'https://schema.org',
		'@type': 'HealthAndBeautyBusiness',
		name: meta.name,
		image: `${meta.siteUrl}/img/logo.webp`,
		url: meta.siteUrl,
		telephone: toE164(meta.phone),
		priceRange: '$$',
		openingHours: meta.openingHours,
		address: {
			'@type': 'PostalAddress',
			streetAddress: '406 W 34th St, Suite 511',
			addressLocality: 'Kansas City',
			addressRegion: 'MO',
			postalCode: '64111',
			addressCountry: 'US'
		},
		sameAs
	};
}
