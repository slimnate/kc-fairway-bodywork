/**
 * Copy and structure for the /golf page.
 *
 * @typedef {Object} GolfFocusArea
 * @property {string} id
 * @property {string} title
 * @property {string} description
 *
 * @typedef {Object} GolfMetric
 * @property {string} id
 * @property {string} label
 *
 * @typedef {Object} GolfFaqItem
 * @property {string} id
 * @property {string} question
 * @property {string} answer
 * @property {{ text: string; href: string } | null} [link]
 */

export const golfHero = {
	headline: 'Bodywork for golfers who want to rotate better, hurt less, and play longer.',
	supporting:
		'I use structural integration and focused bodywork to improve mobility and decrease pain, so you can get more out of your swing.'
};

export const golfWhy = {
	heading: 'Why golf',
	body: "I love the game of golf. I'm not the best, but I love always working toward getting better. Because I play, I know what a swing asks of your body, from how your hips load to how your upper back turns, and that helps me understand what you need. I like helping people with their pain and improving their mobility, and I'm thrilled to tailor that work to the golf game, whether you're a weekend player or chasing a lower handicap."
};

/** @type {GolfFocusArea[]} */
export const golfFocusAreas = [
	{
		id: 'thoracic-rotation',
		title: 'Thoracic rotation',
		description:
			'Your swing depends on how well your upper back and ribcage turn. I work on rotation so you can turn more freely.'
	},
	{
		id: 'hip-mobility',
		title: 'Hip mobility',
		description:
			'Your hips help you load and unload through the swing. Tight hips can limit how far you turn.'
	},
	{
		id: 'low-back',
		title: 'Low back',
		description:
			'A stiff or achy low back can follow you around 18 holes. I use focused bodywork to ease tension and decrease pain.'
	},
	{
		id: 'shoulders',
		title: 'Shoulders',
		description: 'More range of motion for a smoother backswing and finish.'
	}
];

export const golfBeforeAfter = {
	heading: 'A real before and after',
	paragraph1:
		'I wanted to see what better rotation could do, so I tested it. A golf client hit 20 drives on a simulator after a standard warm-up. We did a bodywork session, then we went back the next day and repeated the exact same warm-up and hit 20 more. Comparing the top 5 drives from each round, his total distance, carry, and ball speed all went up, and I saw more rotation in his swing.',
	paragraph2:
		"It took a few swings to get used to the extra motion, so his accuracy and spread were a little wider at first. That's one client in one session, not a promise, but it's the kind of change I'm working toward."
};

/** @type {GolfMetric[]} */
export const golfMetrics = [
	{ id: 'total-distance', label: 'Total distance' },
	{ id: 'carry', label: 'Carry' },
	{ id: 'ball-speed', label: 'Ball speed' }
];

export const golfNotGolfer = {
	text: "Not a golfer? You're welcome here too. ",
	linkText: 'See how I work with active people \u2192',
	href: '/'
};

export const golfQuestions = {
	heading: 'Questions'
};

/** @type {GolfFaqItem[]} */
export const golfFaqItems = [
	{
		id: 'need-golfer',
		question: 'Do I need to be a golfer?',
		answer: 'No. I work with golfers, athletes, and active people.',
		link: null
	},
	{
		id: 'tournament',
		question: 'Can you come to my tournament or league night?',
		answer: 'Yes. See On-Course Tournament Bodywork on the Services page.',
		link: { text: 'On-Course Tournament Bodywork', href: '/services' }
	},
	{
		id: 'book',
		question: 'How do I book?',
		answer: 'Pick a session length and book online. Studio sessions are in Midtown Kansas City.',
		link: null
	}
];

export const golfCta = {
	heading: 'Ready to move better?'
};

export const golfReviewId = 'levi-a';
