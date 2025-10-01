/**
 * @typedef {Object} FAQItem
 * @property {string} question - The question to be displayed.
 * @property {string} answer - The answer to the question.
 */

/**
 * @type {FAQItem[]}
 * @description An array of frequently asked questions and their answers.
 */
export const faqs = [
	{
		question: 'What is your refund policy?',
		answer:
			"We offer a 30-day money-back guarantee on all purchases. If you're not satisfied, contact our support team for a full refund."
	},
	{
		question: 'How can I contact customer support?',
		answer:
			'You can reach our customer support team via email at support@example.com or through our live chat on the website.'
	},
	{
		question: 'Do you offer discounts for bulk purchases?',
		answer:
			'Yes, we offer discounts for bulk purchases. Please contact our sales team for more information.'
	},
	{
		question: 'Is there a free trial available?',
		answer:
			'Yes, we offer a 14-day free trial for all new users. No credit card is required to sign up.'
	},
	{
		question: 'Can I upgrade or downgrade my plan later?',
		answer:
			'Absolutely! You can upgrade or downgrade your plan at any time from your account settings.'
	}
];
