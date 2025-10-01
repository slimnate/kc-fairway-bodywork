/**
 * @typedef {Object} Review
 * @property {string} name - The name of the reviewer.
 * @property {number} rating - The star rating given by the reviewer (1-5).
 * @property {string} review - The review text provided by the reviewer.
 * @property {string} profileImage - The URL of the reviewer's profile image.
 */

/** @type {Review[]} */
export const reviews = [
	{
		name: 'John Doe',
		rating: 5,
		review:
			'Absolutely fantastic service! Highly recommend to anyone looking for quality and professionalism.',
		profileImage: '/img/avatar-placeholder.webp'
	},
	{
		name: 'Jane Smith',
		rating: 4,
		review: 'Great experience overall. The team was very helpful and attentive to my needs.',
		profileImage: '/img/avatar-placeholder.webp'
	},
	{
		name: 'Alice Johnson',
		rating: 3,
		review: 'The service was decent, but there’s room for improvement in communication.',
		profileImage: '/img/avatar-placeholder.webp'
	},
	{
		name: 'Bob Brown',
		rating: 5,
		review: 'Exceeded my expectations! Will definitely use their services again in the future.',
		profileImage: '/img/avatar-placeholder.webp'
	},
	{
		name: 'Emily Davis',
		rating: 4,
		review: 'Very satisfied with the results. The team was friendly and professional.',
		profileImage: '/img/avatar-placeholder.webp'
	}
];
