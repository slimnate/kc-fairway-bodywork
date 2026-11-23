/**
 * Copy and structure for the /structural-integration page.
 *
 * @typedef {Object} FitCard
 * @property {string} id
 * @property {string} title
 * @property {string} description
 *
 * @typedef {Object} FaqItem
 * @property {string} id
 * @property {string} question
 * @property {string} answer
 *
 * @typedef {Object} CtaLink
 * @property {string} href
 * @property {string} text
 */

export const hero = {
	headline: 'Structural Integration in Kansas City',
	supporting:
		'Hands-on bodywork plus guided movement, focused on how you move and hold yourself. Mid-Town KC.'
};

export const whatItIs = {
	heading: 'What it is',
	paragraphs: [
		'Structural integration is hands-on bodywork that looks at your whole body and how it moves together. It combines slow, focused work on the muscles and fascia with movement you do on the table, so we can work on mobility and posture.'
	],
	sessionsBefore: "It's not a separate service for me. Structural integration is part of my ",
	sessionsLink: 'regular sessions',
	sessionsHref: '/services',
	sessionsAfter: ", so you don't need to book anything special."
};

export const different = {
	heading: "How it's different from a regular massage",
	body: "In a regular massage, you mostly lie still. In structural integration, you take part. You'll do slow, guided movements on the table, which helps me get a deeper stretch into the muscles and tissue. It makes good use of our time together."
};

/** @type {{ heading: string, cards: FitCard[] }} */
export const fit = {
	heading: "Who it's a good fit for",
	cards: [
		{
			id: 'golfers',
			title: 'Golfers and active people',
			description: 'Work on hip and upper-back mobility so you can rotate and move more freely.'
		},
		{
			id: 'wide-range',
			title: 'A wide range of people',
			description: "If you'd like to move more easily, it's a good place to start."
		},
		{
			id: 'desk-job',
			title: 'Desk-job tightness',
			description: 'Hips, low back, and shoulders that stay stiff after long days seated.'
		}
	]
};

export const workAndRelaxation = {
	heading: 'Want work and relaxation?',
	body: "You don't have to choose. In a 60 or 90 minute session, we can spend the first 30 to 45 minutes on structural work and finish with relaxing massage. Or I can blend the two so it never feels like too much, while we still get work done. Tell me what you want when you book or at the start of your session."
};

export const about = {
	heading: 'About Anthony',
	body: "I'm Anthony Snell, a licensed massage therapist in Mid-Town Kansas City. I've completed over 100 hours of structural integration training and about 8 months of school."
};

/** @type {{ heading: string, items: FaqItem[] }} */
export const faq = {
	heading: 'FAQ',
	items: [
		{
			id: 'book-separately',
			question: 'Do I need to book it separately?',
			answer:
				"No. It's part of my regular sessions. Book any session length, and let me know how much structural work you'd like."
		},
		{
			id: 'different-from-massage',
			question: 'How is it different from massage?',
			answer:
				'In a regular massage, you mostly lie still. In structural integration, you take part, doing slow, guided movements on the table that help me get a deeper stretch into the muscles and tissue.'
		},
		{
			id: 'hurt',
			question: 'Does it hurt?',
			answer:
				"It shouldn't hurt. Some of the work can feel intense, like a good deep stretch. I work right up to your edge, not past it. If you can't breathe through it or you find yourself tensing up, that's too much and we back off."
		}
	]
};

/** @type {{ heading: string, links: CtaLink[] }} */
export const cta = {
	heading: 'Ready to move a little easier?',
	links: [
		{
			href: '/myofascial-release',
			text: 'See also: Myofascial Release'
		},
		{
			href: '/golf',
			text: 'Golfer? See how I work with golfers.'
		}
	]
};
