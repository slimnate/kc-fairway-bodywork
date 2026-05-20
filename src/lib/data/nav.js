/**
 * @typedef {Object} NavItem
 * @property {string} href - The URL or path the navigation item links to.
 * @property {string} text - The display text for the navigation item.
 * @property {boolean} [featured] - Optional flag to indicate if the item is featured.
 */

/** @type {NavItem} */
const bookNowItem = {
	href: 'https://www.massagebook.com/therapists/kc-fairway-bodywork/services?src=external',
	text: 'Book Now',
	featured: true
};

/** Top navbar — primary pages + booking */
/** @type {NavItem[]} */
const navbarItems = [
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
	bookNowItem
];

/** Footer links — includes FAQ and Contact */
/** @type {NavItem[]} */
const footerNavItems = [
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
		href: '/faq',
		text: 'FAQ'
	},
	{
		href: '/contact',
		text: 'Contact'
	},
	bookNowItem
];

/** @deprecated Use navbarItems or footerNavItems */
const navItems = footerNavItems;

export { navbarItems, footerNavItems, navItems };
