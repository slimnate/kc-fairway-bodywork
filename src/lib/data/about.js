/**
 * @typedef {Object} TeamMember
 * @property {string} name - The name of the team member.
 * @property {string} role - The role of the team member.
 * @property {string} image - The URL of the team member's image.
 *
 * @typedef {Object} Value
 * @property {string} title - The title of the value.
 * @property {string} description - A description of the value.
 *
 * @typedef {Object} AboutData
 * @property {string} title - The title of the about page.
 * @property {string[]} aboutText - A brief description of the company (can be a string or array of paragraphs).
 * @property {string} mission - The company's mission statement.
 * @property {string} vision - The company's vision statement.
 * @property {Value[]} values - A list of the company's core values.
 * @property {TeamMember[]} team - An array of team members.
 */
export const aboutData = {
	title: 'About KC Fairway Bodywork',
	aboutText: [
		'I\'m Anthony Snell, a performance bodywork specialist dedicated to helping golfers move better and play their best. KC Fairway Bodywork was built with a clear focus: delivering high-quality, results-driven bodywork tailored to the needs of golfers—from weekend players to competitive athletes.',
		'My work focuses on improving mobility, relieving chronic tension, and supporting recovery so golfers can swing freely and enjoy the game without pain. Using techniques like Neuromuscular Therapy, Structural Integration, trigger point work, and targeted adhesion release, I tailor every session to your movement patterns, your goals, and the demands of the sport.'
	],
	mission:
		'To provide quality bodywork that creates real improvement, encouraging you to be your best.',
	vision:
		'A community where golfers are inspired, supported, and equipped to move freely and play their best through high-quality, performance-focused bodywork.',
	values: [
		{
			title: 'Care that Drives Improvement',
			description:
				'Providing focused, intentional bodywork that creates real change.'
		},
		{
			title: 'Quality You Can Feel',
			description:
				'Delivering the level of care and precision golfers deserve.'
		},
		{
			title: 'Encouragement that Elevates',
			description:
				'Building confidence through every step of recovery both on and off the course.'
		},
		{
			title: 'The best web guy ever',
			description:
				'Fricken Slim Nate. GANG GANG.     Sorry though buddy, you will have to delete this box'
		}
	],
	team: [
		{
			name: 'John Doe',
			role: 'CEO',
			image: '/img/avatar-placeholder.webp'
		},
		{
			name: 'Jane Smith',
			role: 'CTO',
			image: '/img/avatar-placeholder.webp'
		},
		{
			name: 'Alice Johnson',
			role: 'COO',
			image: '/img/avatar-placeholder.webp'
		}
	]
};
