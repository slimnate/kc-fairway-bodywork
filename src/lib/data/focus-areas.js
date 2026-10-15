/**
 * @typedef {Object} FocusArea
 * @property {string} id - Unique identifier for the focus area
 * @property {string} title - Short heading for the focus area
 * @property {string} icon - Icon class from src/icons.css (e.g. icon-heart)
 * @property {string} description - Body copy describing the focus area
 */

/** @type {FocusArea[]} */
export const focusAreas = [
	{
		id: 'low-back-hips',
		title: 'Low Back Pain & Tight Hips',
		icon: 'icon-heart',
		description:
			'Stiff hips and an achy low back can follow you through your whole day. I use focused bodywork to ease tension, improve mobility, and decrease pain so you can move comfortably again.'
	},
	{
		id: 'shoulder-rotation',
		title: 'Shoulder Mobility & Thoracic Rotation Improvement',
		icon: 'icon-hand-raised',
		description:
			"Can't reach overhead, lift, or turn like you used to? I work on your shoulders, upper back, and ribcage to improve range of motion and rotation, so you can reach, lift, and swing more freely."
	},
	{
		id: 'knee-pain',
		title: 'Knee Pain',
		icon: 'icon-bolt',
		description:
			"Knee pain isn't always just about the knee. I look at how your hips and ankles are moving too, then work the whole picture to ease pressure and help you move more comfortably."
	}
];
