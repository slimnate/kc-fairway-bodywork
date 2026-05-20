// This file contains the site metadata for the example business site.
// It includes the business name, description, address, phone number,
// email, and social media URLs.
// This data is used in the footer and other parts of the site.

/**
 * @typedef {Object} MetaData
 * @property {string} name - The name of the business.
 * @property {string} tagline - A short tagline or slogan for the business.
 * @property {string} description - A brief description of the business.
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
 * @property {string[]} keywords - An array of keywords for SEO purposes.
 */

/** @type {MetaData} */
const metadata = {
	// Contact information
	name: 'KC Fairway Bodywork',
	tagline: 'Unlock Motion - Unlock Game',
	description: 'Golf-focused performance bodywork for Kansas City golfers.',
	address: '406 W 34th St, Suite 511, Kansas City, MO 64111',
	phone: '913-280-6028',
	email: 'anthony@kcfairway.com',

	siteUrl: 'https://kcfairway.com',
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

	// The following URLs are placeholders and should be replaced with actual URLs
	// for your business's social media profiles.
	// Set values to null and they will not be rendered in the footer.
	// For example, if you don't have a Facebook page, set fb_url to null.
	fb_url: 'https://www.facebook.com/profile.php?id=61586290216445',
	ig_url: 'https://www.instagram.com/kcfairwaybodywork/',
	tw_url: null,
	yt_url: null,
	li_url: null,
	tiktok_url: null,

	// Copyright information
	cp_year: `${new Date().getFullYear()}`,
	cp_holder: 'Spotlite Studios',
	cp_url: 'https://spotlitestudios.com/',

	// Page metadata
	title: 'KC Fairway Bodywork - Sports Massage Therapy',

	// SEO Keywords
	keywords: [
		// TODO: Add keywords
	]
};

/** @type {string} Full URL for Open Graph / Twitter Card image */
export const ogImageUrl = `${metadata.siteUrl}${metadata.ogImage}`;

export default metadata;
