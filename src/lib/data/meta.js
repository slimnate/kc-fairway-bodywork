// This file contains the site metadata for the example business site.
// It includes the business name, description, address, phone number,
// email, and social media URLs.
// This data is used in the footer and other parts of the site.

/**
 * @typedef {Object} MetaData
 * @property {string} name - The name of the business.
 * @property {string} tagline - A short tagline or slogan for the business.
 * @property {string} description - A brief description of the business.
 * @property {string|null} address - The physical address of the business.
 * @property {string|null} phone - The phone number of the business.
 * @property {string} email - The email address for contact.
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
	name: 'Sincerely, Selfcare',
	tagline: '<tagline>',
	description: 'Sincerely Self Care is a mobile massage serice based in the Kansas City area.',
	address: null,
	phone: null,
	email: 'nathan@spotlitestudios.com',

	// The following URLs are placeholders and should be replaced with actual URLs
	// for your business's social media profiles.
	// Set values to null and they will not be rendered in the footer.
	// For example, if you don't have a Facebook page, set fb_url to null.
	fb_url: 'https://www.facebook.com/examplebusiness',
	ig_url: 'https://www.instagram.com/examplebusiness',
	tw_url: 'https://twitter.com/examplebusiness',
	yt_url: 'https://www.youtube.com/channel/examplebusiness',
	li_url: 'https://www.linkedin.com/company/examplebusiness',
	tiktok_url: 'https://www.tiktok.com/@examplebusiness',

	// Copyright information
	cp_year: `${new Date().getFullYear()}`,
	cp_holder: 'Spotlite Studios',
	cp_url: 'https://spotlitestudios.com/',

	// Page metadata
	title: 'Sincerely, Selfcare – Mobile Massage',

	// SEO Keywords
	keywords: [
		// TODO: Add keywords
	]
};

export default metadata;
