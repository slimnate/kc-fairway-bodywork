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
 * @property {string} aboutText - A brief description of the company.
 * @property {string} mission - The company's mission statement.
 * @property {string} vision - The company's vision statement.
 * @property {Value[]} values - A list of the company's core values.
 * @property {TeamMember[]} team - An array of team members.
 */
export const aboutData = {
	title: 'About Sincerely,Selfcare',
	aboutText: 'My name is Anthony Snell, and I created Sincerely, Selfcare with one mission: to help people feel better in their bodies. I specialize in therapeutic massage with a focus on recovery, pain relief, and improving mobility. From athletes to anyone managing tension, injuries, or chronic discomfort, I use techniques like neuromuscular therapy, trigger point work, cupping, heated scraper, and adhesion release to create meaningful, lasting results. Massage isn’t just a service to me—it’s a way to support your health, restore balance, and help you get back to doing what you love.',
	mission:
		'To help people feel better in their bodies through massage that focuses on recovery, mobility, and lasting results.',
	vision:
		'To be a leader in the massage industry by providing exceptional service and results.',
	values: [
		{
			title: 'Client-Centered Care',
			description:
				'Every session is tailored to your unique needs, with the goal of helping you feel real, lasting improvement.'
		},
		{
			title: 'Therapeutic Excellence',
			description:
				'I use advanced techniques—like neuromuscular therapy, trigger point work, cupping, and adhesion release—to create results that go beyond temporary relief.'
		},
		{
			title: 'Integrity & Professionalism',
			description:
				'I value respect, trust, and clear communication, ensuring every client feels safe and supported.'
		},
		{
			title: 'Commitment to Growth',
			description:
				'I continually learn and refine my skills to bring the highest quality of therapeutic massage to my clients.'
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
