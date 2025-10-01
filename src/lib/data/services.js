/**
 * @typedef {Object} Service
 * @property {string} id - Unique identifier for the service
 * @property {string} serviceName - The name/title of the service
 * @property {string} icon - The icon class associated with the service
 * @property {string} description - A brief description of the service
 * @property {Package[]} packages - An array of packages associated with the service
 *
 * @typedef {Object} Package
 * @property {string} name - The name of the package
 * @property {number} price - The price of the package
 * @property {string|null} description - A brief description of the package
 *
 * @typedef {Object} Modality
 * @property {string} id - Unique identifier for the modality
 * @property {string} name - The name of the modality
 * @property {string} description - A brief description of the modality
 *
 * @typedef {Object} ServiceArea
 * @property {string} id - Unique identifier for the location
 * @property {string} name - The name of the location
 *
 * @typedef {Object} ProcessStep
 * @property {string} id - Unique identifier for the step
 * @property {string} title - The title of the step
 * @property {string} description - A detailed description of the step
 */

/** @type {Service[]} */
export const offerings = [
	{
		id: 'therapeutic-massage',
		serviceName: 'Therapeutic Massage',
		icon: 'icon-heart',
		description:
			'Every session is customized to your needs, whether that’s relieving chronic pain, improving posture, enhancing mobility, or supporting recovery after activity. I use a combination of whatever techniques or tools I have—neuromuscular therapy, trigger point work, cupping, heated scraper, and adhesion release—to create lasting results, not just temporary relief.',
		packages: [
			{ name: '30 minutes', price: 65, description: null },
			{ name: '60 minutes', price: 125, description: null },
			{ name: '90 minutes', price: 165, description: null }
		]
	},
	{
		id: 'chair-massage',
		serviceName: 'Chair Massage for Corporate & Events',
		icon: 'icon-chart-bar',
		description:
			'Bring the benefits of massage directly to your workplace or special event. Chair massage reduces stress, improves focus, and supports overall wellness. Ask about special discounted rates for schools and educators.',
		packages: [
			{ name: 'Company-paid (per hour)', price: 100, description: 'Billed to company' },
			{
				name: 'Employee-paid (per min)',
				price: 1.65,
				description: 'Paid individually by each employee'
			}
		]
	},
	{
		id: 'packages',
		serviceName: 'Packages (self-care investment)',
		icon: 'icon-currency-dollar',
		description: 'Invest in your health with discounted session bundles designed for ongoing care:',
		packages: [
			{ name: '4 × 60-minute sessions', price: 450, description: null },
			{ name: '4 × 90-minute sessions', price: 600, description: null }
		]
	},
	{
		id: 'gift-vouchers',
		serviceName: 'Gift Vouchers',
		icon: 'icon-link',
		description:
			'Give the gift of wellness. A Sincerely, Selfcare gift voucher is a thoughtful way to support a friend, loved one, or colleague with the benefits of massage therapy. Vouchers can be purchased for any service or session length and redeemed for both in-home and studio appointments.',
		packages: []
	},
	{
		id: 'mobile-massage',
		serviceName: 'Mobile Massage (In-Home)',
		icon: 'icon-home-modern',
		description:
			'Enjoy professional therapeutic massage in the comfort of your own home. I bring everything needed for a session that fits seamlessly into your routine. Travel fee may apply outside of the Kansas City metro area. Check service area.',
		packages: []
	},
	{
		id: 'studio-sessions',
		serviceName: 'Studio Sessions',
		icon: 'icon-building-storefront',
		description:
			'For those who prefer an appointment outside the home, I also offer sessions at my downtown Kansas City studio. Currently, availability is limited to Mondays, as I rent space at Legacy Massage.',
		packages: []
	}
];

/** @type {Modality[]} */
export const modalities = [
	{
		id: 'neuromuscular-therapy',
		name: 'Neuromuscular Therapy',
		description: 'Targeted relief for chronic pain and muscular dysfunction'
	},
	{
		id: 'deep-tissue-massage',
		name: 'Deep Tissue Massage',
		description: 'Intense pressure for deep muscle tension and stress'
	},
	{
		id: 'sports-massage',
		name: 'Sports Massage',
		description: 'Recovery and performance-focused treatment'
	},
	{
		id: 'swedish-massage',
		name: 'Swedish Massage',
		description: 'Gentle, relaxing full-body massage'
	},
	{
		id: 'structural-integration',
		name: 'Structural Integration (Coming Soon)',
		description: 'Postural alignment and fascia-focused therapy'
	},
	{
		id: 'scar-tissue-therapy',
		name: 'Scar Tissue Therapy (Coming Soon)',
		description: 'Specialized techniques for healing and mobility'
	}
];

/** @type {ServiceArea[]} */
export const serviceAreas = [
	{ id: 'kansas-city-mo-ks', name: 'Kansas City (MO & KS)' },
	{ id: 'overland-park', name: 'Overland Park' },
	{ id: 'olathe', name: 'Olathe' },
	{ id: 'lees-summit', name: "Lee's Summit" },
	{ id: 'independence', name: 'Independence' },
	{ id: 'shawnee', name: 'Shawnee' },
	{ id: 'lenexa', name: 'Lenexa' },
	{ id: 'blue-springs', name: 'Blue Springs' },
	{ id: 'liberty', name: 'Liberty' },
	{ id: 'raytown', name: 'Raytown' },
	{ id: 'grandview', name: 'Grandview' },
	{ id: 'belton', name: 'Belton' },
	{ id: 'leawood', name: 'Leawood' },
	{ id: 'prairie-village', name: 'Prairie Village' },
	{ id: 'gladstone', name: 'Gladstone' },
	{ id: 'parkville', name: 'Parkville' },
	{ id: 'mission', name: 'Mission' },
	{ id: 'grain-valley', name: 'Grain Valley' },
	{ id: 'gardner', name: 'Gardner' },
	{ id: 'lansing', name: 'Lansing' },
	{ id: 'merriam', name: 'Merriam' },
	{ id: 'fairway', name: 'Fairway' },
	{ id: 'riverside', name: 'Riverside' },
	{ id: 'north-kansas-city', name: 'North Kansas City' }
];

/** @type {ProcessStep[]} */
export const mobileSetupSteps = [
	{
		id: 'arrival-setup',
		title: 'Arrival & Setup',
		description:
			'Your therapist arrives at your scheduled time with all necessary equipment, including a professional massage table, fresh linens, therapeutic oils, and relaxing music.'
	},
	{
		id: 'space-requirements',
		title: 'Space Requirements',
		description:
			"You'll need approximately 6x10 feet of clear floor space—about the size of a queen bed. This can be in a bedroom, living room, or any comfortable, private area in your home or office."
	},
	{
		id: 'quick-setup',
		title: 'Quick Setup Time',
		description:
			'Setup takes just 5-10 minutes. Your therapist will transform the space into a peaceful treatment room, complete with ambient lighting and calming music if desired.'
	},
	{
		id: 'no-cleanup',
		title: 'No Cleanup Needed',
		description:
			'After your session, everything is packed up and removed. You can continue relaxing without any cleanup or hassle.'
	}
];

/** @type {ProcessStep[]} */
export const clientPrepTips = [
	{
		id: 'clear-space',
		title: 'Clear the Space',
		description:
			'Move furniture, toys, or other items to create an open area. A tidy space helps create a more relaxing environment and allows for smooth setup.'
	},
	{
		id: 'minimize-distractions',
		title: 'Minimize Distractions',
		description:
			"Silence phones, turn off TVs, and let household members know you'll be unavailable. Creating a quiet environment enhances relaxation and treatment effectiveness."
	},
	{
		id: 'pet-considerations',
		title: 'Pet Considerations',
		description:
			'If you have pets, please secure them in another room during the session. While we love animals, their presence can be distracting and may interfere with treatment.'
	},
	{
		id: 'room-temperature',
		title: 'Room Temperature',
		description:
			"Set your thermostat to a comfortable temperature (72-75°F is ideal). You'll be under blankets during the massage, but the room should be warm enough for comfort."
	},
	{
		id: 'hydration-timing',
		title: 'Hydration & Timing',
		description:
			'Drink water before your session and avoid heavy meals within 2 hours of your appointment. Light snacks are fine, but a full stomach can be uncomfortable.'
	}
];
