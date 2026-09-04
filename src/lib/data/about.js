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
		'Hello! My name is Anthony Snell, LMT, Performance Bodywork Specialist and owner of KC Fairway Bodywork. I specialize in working with golfers, athletes, and active individuals looking to improve mobility and decrease pain. Whether recovering from an injury or aiming to elevate peak performance, my work focuses on improving mobility, relieving chronic tension, and supporting recovery.',
		'KC Fairway Bodywork was built out of a love for golf. I wanted to help golfers swing freely and enjoy the game without pain. Specializing in golfers creates a clear focus: high-quality, results-driven bodywork tailored to the needs of golfers, from weekend players to competitive athletes.',
		'Golfer or not, you will have my full drive and desire to help you achieve your wellness and sports goals.'
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
				'Skilled techniques focused on improving mobility and reducing pain.'
		},
		{
			title: 'Encouragement that Elevates',
			description:
				'Encouraging clients every step of the way to be their best, both on and off the course.'
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
