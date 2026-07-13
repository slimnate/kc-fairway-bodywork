/**
 * @typedef {Object} Service
 * @property {string} id - Unique identifier for the service
 * @property {string} serviceName - The name/title of the service
 * @property {string} icon - The icon class associated with the service
 * @property {string} description - A brief description of the service
 * @property {Package[]} packages - An array of packages associated with the service
 * @property {boolean} [isPlaceholder] - When true, renders an empty card placeholder on the services page
 * @property {boolean} [isFairwayPlan] - When true, renders the Fairway performance plan card on the services page
 *
 * @typedef {Object} Package
 * @property {string} name - The name of the package
 * @property {number} price - The price of the package
 * @property {string|null} description - A brief description of the package
 * @property {string} [href] - Optional booking URL for the package
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
		serviceName: 'Performance Bodywork',
		icon: 'icon-heart',
		description:
			'Bodywork designed to improve how you move both on and off the course. Using advanced techniques such as Structural Integration, Neuromuscular Therapy, and adhesion release, this treatment reduces tension and supports long-term mobility.',
		packages: [
			{
				name: '30 minutes',
				price: 90,
				description: null,
				href: 'https://www.massagebook.com/business/36453921/booking/select-time?src=external&service_id=1923747&ncf_source=friendly_url'
			},
			{
				name: '60 minutes',
				price: 175,
				description: null,
				href: 'https://www.massagebook.com/business/36453921/booking/select-time?src=external&service_id=1923748&ncf_source=friendly_url'
			},
			{
				name: '90 minutes',
				price: 225,
				description: null,
				href: 'https://www.massagebook.com/business/36453921/booking/select-time?src=external&service_id=1923749&ncf_source=friendly_url'
			},
			{
				name: '120 minutes',
				price: 275,
				description: null,
				href: 'https://www.massagebook.com/business/36453921/booking/select-time?src=external&service_id=1923750&ncf_source=friendly_url'
			}
		]
	},
	{
		id: 'chair-massage',
		serviceName: 'On-Course Tournament Bodywork',
		icon: 'icon-trophy',
		description:
			'Support golfers during tournaments, league nights, or special events with targeted bodywork and stretching designed to improve mobility, reduce tension, and enhance performance. Whether hired by a golf course, a tournament organizer, or individual players, I provide on-site stretch and recovery work to help golfers feel their best before, during, and after play.',
		packages: []
	},
	{
		id: 'packages',
		serviceName: 'Packages (self-care investment)',
		icon: 'icon-currency-dollar',
		description: 'Invest in your health with discounted session bundles designed for ongoing care:',
		packages: [
			{
				name: '4 × 30-minute sessions',
				price: 340,
				description: null,
				href: 'https://www.massagebook.com/business/36453921/booking/select-time?src=external&service_id=1923782&ncf_source=friendly_url'
			},
			{
				name: '4 × 60-minute sessions',
				price: 660,
				description: null,
				href: 'https://www.massagebook.com/business/36453921/booking/select-time?src=external&service_id=1923774&ncf_source=friendly_url'
			},
			{
				name: '4 × 90-minute sessions',
				price: 860,
				description: null,
				href: 'https://www.massagebook.com/business/36453921/booking/?src=external&service_id=1923783&ncf_source=friendly_url'
			}
		]
	}
];

/** @type {{ title: string; tagline: string; introBefore: string; introHighlight: string; introAfter: string; benefits: string[]; pricing: string; subtitle: string; description: string; packagesLink: { text: string; href: string } }} */
export const fairwayPerformancePlan = {
	title: 'Fairway performance plan',
	tagline: 'Move better. Recover faster. Play longer.',
	introBefore: 'A ',
	introHighlight: 'monthly membership',
	introAfter: ' for ongoing care:',
	benefits: [
		'1 bodywork session per month',
		'Discounted member rates on extra sessions',
		'Priority booking access',
		'Automatic birthday and holiday perks',
		'Session rollover, up to 3 months',
		'Share or gift sessions',
		'Pause anytime, no long-term contract'
	],
	pricing: 'Starting at $80/month',
	subtitle: 'Monthly membership',
	description:
		'A monthly membership built to keep you on top of your health and performance. Enjoy preferred rates, priority booking, and automatic birthday and holiday perks. Pause anytime — there\u2019s no long-term contract.',
	packagesLink: {
		text: 'Discounted packages also available \u2192',
		href: '/services'
	}
};

/** @type {Service[]} */
export const servicePageOfferings = [
	offerings[0],
	offerings[1],
	{
		id: 'fairway-performance-plan',
		serviceName: 'Fairway performance plan',
		icon: 'icon-shield-check',
		description: '',
		packages: [],
		isFairwayPlan: true
	},
	{
		id: 'structural-integration',
		serviceName: 'Structural Integration',
		icon: 'icon-building-storefront',
		description:
			'Structural Integration is a bodywork method that realigns the body for better posture, easier movement, and less pain. It works with the fascia--the conective tissue around your muscles--to release tension, improve mobility, and rebalance your whole system.',
		packages: []
	},
	{
		id: 'mobility-assisted-stretch',
		serviceName: 'Mobility and Assisted Stretch',
		icon: 'icon-link',
		description:
			'Improve flexibility, unlock your rotation, and reduce tension with a focused stretch session designed for golfers. This service targets hips, thoracic spine, shoulders, and core rotation to support a smoother, more powerful swing.',
		packages: []
	},
	offerings[2]
];

/** @type {Service} */
export const mobileMassageOffering = {
	id: 'mobile-massage',
	serviceName: 'Mobile Massage (In-Home)',
	icon: 'icon-home-modern',
	description:
		'Enjoy professional therapeutic bodywork in the comfort of your own home. I bring everything needed for a session that fits seamlessly into your routine.',
	packages: [
		{ name: '60 minutes', price: 185, description: null },
		{ name: '90 minutes', price: 235, description: null }
	]
};

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
		description: 'More precise, targeted pressure to release deep muscle tension and improve movement.'
	},
	{
		id: 'sports-massage',
		name: 'Sports Massage',
		description: 'Recovery and performance-focused treatment'
	},
	{
		id: 'swedish-massage',
		name: 'Instrument Assisted Soft Tissue Mobilization',
		description: 'A heated tool helps soften fascia, reduce adhesions, and allow deeper, more effective muscle work.'
	},
	{
		id: 'structural-integration',
		name: 'Structural Integration',
		description: 'Structural Integration realigns your body by working with the fascia to reduce pain, improve mobility, and help you move with ease'
	},
	{
		id: 'scar-tissue-therapy',
		name: 'Scar Tissue Therapy',
		description: 'Specialized technique for decreasing pain and improving scar tissue mobility'
	}
];

/** @type {ServiceArea[]} */
export const serviceAreas = [
	{ id: 'midtown-kc', name: 'Midtown KC' },
	{ id: 'westport', name: 'Westport' },
	{ id: 'country-club-plaza', name: 'Country Club Plaza' },
	{ id: 'brookside', name: 'Brookside' },
	{ id: 'waldo', name: 'Waldo' },
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
			'Your therapist will arrive about 20 minutes prior to your scheduled time with all necessary equipment, including a professional massage table, fresh linens, therapeutic oils, and relaxing music.'
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
			'Setup takes just about 10 - 15 minutes. Your therapist will transform the space into a peaceful treatment room, complete with calming music if desired.'
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
		id: 'hydration-timing',
		title: 'Hydration & Timing',
		description:
			'Drink water before your session and avoid heavy meals within 2 hours of your appointment. Light snacks are fine, but a full stomach can be uncomfortable.'
	}
];
