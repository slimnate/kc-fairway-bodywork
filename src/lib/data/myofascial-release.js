/**
 * Copy and structure for the /myofascial-release page.
 *
 * @typedef {Object} FitCard
 * @property {string} id
 * @property {string} title
 * @property {string} description
 *
 * @typedef {Object} SessionStep
 * @property {string} id
 * @property {string} text
 *
 * @typedef {Object} FaqItem
 * @property {string} id
 * @property {string} question
 * @property {string} answer
 */

export const hero = {
	headline: 'Myofascial Release in Kansas City',
	supporting: 'Slow, focused bodywork for the tight, stuck, restricted feeling. Mid-Town KC.'
};

export const whatItIs = {
	heading: 'What it is',
	paragraphs: [
		"Myofascial release is a hands-on technique that uses slow, sustained pressure and stretch to work with the fascia, the connective tissue that wraps around your muscles. It's not a fast, surface-level rubdown. We go slow, we stay with it, and we pay attention to how your body responds.",
		"It's also not a separate add-on for me. I work myofascial release into most of my massages, and fascial work is part of structural integration."
	]
};

/** @type {{ heading: string, cards: FitCard[] }} */
export const fit = {
	heading: "Who it's a good fit for",
	cards: [
		{
			id: 'desk-job',
			title: 'Desk-job tightness',
			description: 'Hips, low back, and shoulders that stay stiff after a long day seated.'
		},
		{
			id: 'golfers',
			title: 'Golfers and active people',
			description: 'Work on hip and upper-back mobility so you can rotate and move more freely.'
		},
		{
			id: 'stuck',
			title: 'Anyone who feels stuck',
			description: "Restricted range of motion that stretching alone isn't touching."
		}
	]
};

/** @type {{ heading: string, steps: SessionStep[], closingBefore: string, closingLinkText: string, closingHref: string }} */
export const session = {
	heading: 'What a session looks like',
	steps: [
		{
			id: 'conversation',
			text: "We start with a conversation. I've already looked over your intake form, so I'll ask a few questions from it. Then I'll ask you, in your own words, how you're feeling and what you're noticing in your body. That tells me where to focus."
		},
		{
			id: 'table',
			text: 'Get comfortable on the table. Adjust to your own comfort level. Some people fully undress and we use proper draping the whole way through. Others keep shorts or underwear on. Either is fine.'
		},
		{
			id: 'hands-on',
			text: 'Hands-on work. Where I work changes every session. It depends on what you need that day.'
		},
		{
			id: 'tools',
			text: "Tools, if they help. Red light, muscle scraping, and cupping are available. I often use red light in a session. If you'd like a specific tool, just ask."
		}
	],
	closingBefore:
		"You don't need to book 'a myofascial session.' It's woven into most massages, so any session type works. If you'd like extra focus on it, say so when you book or at the start of your session. ",
	closingLinkText: 'Sessions are 30, 60, 90, or 120 minutes.',
	closingHref: '/services'
};

export const structuralIntegration = {
	before:
		"Myofascial work runs through most of what I do. In a regular massage it's part of the mix. In ",
	linkText: 'structural integration',
	href: '/services',
	after:
		', slow, gentle fascial work is a core part of how we work on movement and posture over a series of sessions.'
};

/** @type {{ heading: string, items: FaqItem[] }} */
export const faq = {
	heading: 'FAQ',
	items: [
		{
			id: 'hurt',
			question: 'Does it hurt?',
			answer:
				"It shouldn't hurt. Some of the work, especially structural work and sports massage, can feel intense, like a good deep stretch. I like to work right up to your edge, not past it. If you can't breathe through it or you find yourself tensing up, that's too much and we back off. I check in on pressure often, and you can tell me anytime if it's too much or too little."
		},
		{
			id: 'deep-tissue',
			question: 'How is it different from deep tissue massage?',
			answer:
				"They overlap. 'Deep tissue' is a wide umbrella, and myofascial work can fall under it. Myofascial release is slower and focuses on the fascia, often feeling broader and less like pushing into one spot. Deep tissue is usually what people mean when they talk about heavier pressure. In practice the two blend together, and I'll tell you what we're working on as we go."
		},
		{
			id: 'how-many',
			question: 'How many sessions do I need?',
			answer:
				"It depends on you. There's no set number. If you're working on something specific, we might start with a couple of sessions close together and then space them out. Other people come every two weeks, monthly, or even quarterly for maintenance, especially if they already stretch or do yoga. We'll figure out what fits your goals."
		},
		{
			id: 'before-after',
			question: 'What should I do before and after?',
			answer:
				'Before: skip a heavy meal and stay hydrated. After: drink plenty of water and take it easy. Give the work a chance to settle in, and try not to go straight back to whatever put strain on your body in the first place.'
		}
	]
};

export const cta = {
	heading: 'Ready to move a little easier?',
	golfText: 'Golfer? See how I work with golfers.',
	golfHref: '/golf'
};
