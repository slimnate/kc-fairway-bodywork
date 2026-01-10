/**
 * @typedef {Object} NavItem
 * @property {string} href - The URL or path the navigation item links to.
 * @property {string} text - The display text for the navigation item.
 * @property {boolean} [featured] - Optional flag to indicate if the item is featured.
 */

/** @type {NavItem[]} */
const navItems = [
	{
		href: '/services',
		text: 'Services'
	},
	{
		href: '/about',
		text: 'About'
	},
	{
		href: '/blog',
		text: 'Blog'
	},
	{
		href: 'https://www.massagebook.com/therapists/kc-fairway-bodywork?src=external',
		text: 'Book Now',
		featured: true
	}
];

export { navItems };
