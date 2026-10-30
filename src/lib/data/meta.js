// This file contains the site metadata for the example business site.
// It includes the business name, description, address, phone number,
// email, and social media URLs.
// This data is used in the footer and other parts of the site.

/**
 * @typedef {Object} MetaData
 * @property {string} name - The name of the business.
 * @property {string} tagline - A short tagline or slogan for the business.
 * @property {string} description - Default meta description (homepage and fallback).
 * @property {Record<string, string>} pageDescriptions - Per-route meta descriptions.
 * @property {string} address - The physical address of the business.
 * @property {string} phone - The phone number of the business.
 * @property {string} email - The email address for contact.
 * @property {string} siteUrl - Canonical site origin (no trailing slash).
 * @property {string} gbp_url - Google Maps / Business Profile link.
 * @property {string} ogImage - Path to Open Graph preview image (under static/).
 * @property {string[]} openingHoursDisplay - Human-readable hours per day.
 * @property {string[]} openingHours - Schema.org openingHours strings.
 * @property {string|null} fb_url - The Facebook page URL (set to `null` if not available).
 * @property {string|null} ig_url - The Instagram profile URL (set to `null` if not available).
 * @property {string|null} tw_url - The Twitter profile URL (set to `null` if not available).
 * @property {string|null} yt_url - The YouTube channel URL (set to `null` if not available).
 * @property {string|null} li_url - The LinkedIn profile URL (set to `null` if not available).
 * @property {string|null} tiktok_url - The TikTok profile URL (set to `null` if not available).
 * @property {string} cp_year - The copyright year.
 * @property {string} cp_holder - The copyright holder's name.
 * @property {string} cp_url - The copyright holder's website URL.
 * @property {string} title - The page title for the site.
 * @property {string[]} keywords - Homepage SEO keywords (optional meta tag).
 */

/** @type {MetaData} */
const metadata = {
	// Contact information
	name: 'KC Fairway Bodywork',
	tagline: 'Unlock Motion - Unlock Game',
	description:
		'Performance bodywork and sports massage in Midtown Kansas City for golfers, athletes, and active people. Improve mobility and decrease pain. Book online.',
	pageDescriptions: {
		'/': 'Performance bodywork and sports massage in Midtown Kansas City for golfers, athletes, and active people. Improve mobility and decrease pain. Book online.',
		'/services':
			'Sports massage and structural integration sessions from 30 to 120 minutes, plus on-course tournament bodywork and the Fairway Performance Plan membership in Midtown KC.',
		'/testimonials':
			'Real Google reviews from clients at KC Fairway Bodywork in Midtown Kansas City.',
		'/about':
			'Meet Anthony Snell, LMT, a performance bodywork specialist in Midtown Kansas City helping golfers, athletes, and active people improve mobility and decrease pain.',
		'/blog':
			'Mobility, movement, and bodywork tips for golfers, athletes, and active people from KC Fairway Bodywork in Midtown Kansas City.',
		'/mailing-list':
			'Join the KC Fairway Bodywork email list for openings, events, and mobility tips from Midtown Kansas City.',
		'/contact':
			'Contact KC Fairway Bodywork in Midtown Kansas City. 406 W 34th St, Suite 511. Call 913-280-6028 or book online.',
		'/faq': 'Answers to common questions about booking and sessions at KC Fairway Bodywork in Midtown Kansas City.',
		'/golf':
			'Bodywork for golfers in Midtown Kansas City. Improve thoracic rotation and hip mobility, decrease low back tension, and get more out of your swing.'
	},
	address: '406 W 34th St, Suite 511, Kansas City, MO 64111',
	phone: '913-280-6028',
	email: 'anthony@kcfairway.com',

	siteUrl: 'https://kcfairwaybodywork.com',
	gbp_url: 'https://maps.app.goo.gl/mJfcy9fLrpFssiYRA',
	ogImage: '/img/og-preview.jpg',

	openingHoursDisplay: [
		'Monday: 10:00 AM – 7:30 PM',
		'Tuesday: 10:00 AM – 7:30 PM',
		'Wednesday: 10:00 AM – 7:30 PM',
		'Thursday: 10:00 AM – 7:30 PM',
		'Friday: 10:00 AM – 7:00 PM',
		'Saturday: 10:00 AM – 4:00 PM',
		'Sunday: Closed'
	],
	openingHours: [
		'Mo 10:00-19:30',
		'Tu 10:00-19:30',
		'We 10:00-19:30',
		'Th 10:00-19:30',
		'Fr 10:00-19:00',
		'Sa 10:00-16:00'
	],

	fb_url: 'https://www.facebook.com/profile.php?id=61586290216445',
	ig_url: 'https://www.instagram.com/kcfairwaybodywork/',
	tw_url: null,
	yt_url: null,
	li_url: null,
	tiktok_url: null,

	cp_year: `${new Date().getFullYear()}`,
	cp_holder: 'Spotlite Studios',
	cp_url: 'https://spotlitestudios.com/',

	title: 'KC Fairway Bodywork - Sports Massage in Midtown KC',

	keywords: [
		'sports massage Kansas City',
		'massage therapy Midtown Kansas City',
		'structural integration Kansas City',
		'performance bodywork',
		'golf massage Kansas City',
		'athlete massage KC',
		'low back and hip mobility massage',
		'shoulder mobility massage'
	]
};

/** @type {string} Full URL for Open Graph / Twitter Card image */
export const ogImageUrl = `${metadata.siteUrl}${metadata.ogImage}`;

/**
 * @param {string} pathname
 * @returns {string}
 */
export function getPageDescription(pathname) {
	const path = pathname.replace(/\/$/, '') || '/';
	return metadata.pageDescriptions[path] ?? metadata.description;
}

/**
 * @param {string} pathname
 * @returns {string}
 */
export function getCanonicalUrl(pathname) {
	const path = pathname === '/' ? '/' : pathname.replace(/\/$/, '');
	return path === '/' ? `${metadata.siteUrl}/` : `${metadata.siteUrl}${path}`;
}

/** @returns {string} */
export function phoneTel() {
	const digits = metadata.phone.replace(/\D/g, '');
	return digits.length === 10 ? `+1${digits}` : `+${digits}`;
}

/** @returns {string} */
export function mapsEmbedUrl() {
	return `https://www.google.com/maps?q=${encodeURIComponent(metadata.address)}&output=embed`;
}

export const BOOKING_URL =
	'https://www.massagebook.com/therapists/kc-fairway-bodywork/services?src=external';

export default metadata;
