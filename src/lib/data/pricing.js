/**
 * @typedef {Object} Package
 * @property {string} name - The name of the package.
 * @property {string} description - Short description of the package.
 * @property {string} target - The target audience for this package.
 * @property {number} priceMin - The minimum price of the package.
 * @property {number|null} priceMax - The maximum price of the package (or null if open-ended).
 * @property {string[]} includedFeatures - An array of IDs representing the features included in the package.
 * @property {boolean} featured - Whether the package is featured or not.
 * @property {string} tagline - A short tagline describing the package.
 * @property {string} icon - Icon class to use for this package.
 */

/**
 * @typedef {Object} Feature
 * @property {string} id - Unique identifier for the feature.
 * @property {string} title - The title of the feature.
 * @property {string} description - Detailed description of the feature.
 */

/**
 * @typedef {Object} PricingData
 * @property {Feature[]} features - An array of feature objects.
 * @property {Package[]} packages - An array of package objects.
 */

/**
 * @typedef {Object} DevelopmentPricingData
 * @property {Feature[]} features - An array of development feature objects.
 * @property {Package[]} packages - An array of development package objects.
 */

/**
 * @typedef {Object} HostingPricingData
 * @property {Feature[]} features - An array of hosting feature objects.
 * @property {Package[]} packages - An array of hosting package objects.
 */

/** @type {DevelopmentPricingData} */
export const developmentPricing = {
	features: [
		// Starter Package Features
		{
			id: 'basic-design',
			title: 'Basic Design (2-3 Pages)',
			description: 'Clean layout for core pages like Home, About, and Contact.'
		},
		{
			id: 'responsive-layout',
			title: 'Fully Responsive Layout',
			description: 'Optimized for desktop, tablet, and mobile viewing.'
		},
		{
			id: 'basic-seo',
			title: 'Basic SEO Setup',
			description: 'Site title, meta tags, keyword focus, and sitemap submission.'
		},
		{
			id: 'standard-contact',
			title: 'Standard Contact Form',
			description: 'Simple form (name, email, message) with email notification setup.'
		},
		{
			id: 'social-links',
			title: 'Social Media Links',
			description: 'Connected icons for key platforms (Facebook, Instagram, etc.)'
		},
		{
			id: 'basic-analytics',
			title: 'Analytics Integration (Basic)',
			description: 'Google Analytics setup for visitor tracking.'
		},

		// Growth Package Features
		{
			id: 'custom-design',
			title: 'Custom Design',
			description:
				'Visual branding tailored to your business identity, with added design flourishes and page structure flexibility.'
		},
		{
			id: 'advanced-seo',
			title: 'Advanced SEO Optimization',
			description:
				'Content-level optimization, schema markup, image alt-text strategies, plus keyword-targeted blog or landing page support.'
		},
		{
			id: 'enhanced-contact',
			title: 'Enhanced Contact Form',
			description:
				'Custom fields, dropdowns, service selectors, and spam protection; optionally connects to a CRM.'
		},
		{
			id: 'third-party',
			title: '3rd-Party Integrations',
			description:
				'Booking tools, payment systems (Stripe/PayPal), mailing list signups, and scheduling systems.'
		},
		{
			id: 'blog-setup',
			title: 'Blog Setup or News Section',
			description: 'Built-in CMS for posting updates and improving SEO.'
		},
		{
			id: 'advanced-analytics',
			title: 'Analytics + Heatmap Tools',
			description: 'Insights into user behavior and engagement zones.'
		},

		// Elite Package Features
		{
			id: 'full-stack',
			title: 'Full-Stack Development',
			description:
				'Custom front-end and back-end coded to spec, allowing maximum control and scalability.'
		},
		{
			id: 'ai-features',
			title: 'AI-Powered Features',
			description:
				'Smart search, chatbots, personalized content recommendations, or product filters.'
		},
		{
			id: 'automated-leads',
			title: 'Automated Contact & Lead Systems',
			description:
				'Multi-step forms with conditional logic, automatic follow-up emails, calendar sync, and database storage.'
		},
		{
			id: 'dynamic-content',
			title: 'Dynamic Content Capabilities',
			description: 'User dashboards, interactive maps, login portals, or role-based content.'
		},
		{
			id: 'business-automation',
			title: 'Internal Business Automations',
			description:
				'Workflow automations for tasks like appointment reminders, service requests, inventory updates.'
		},
		{
			id: 'accessibility',
			title: 'Accessibility Features',
			description:
				'ADA-compliant design with keyboard navigation, alt-text support, and readable UI.'
		},
		{
			id: 'custom-admin',
			title: 'Custom Admin Panel',
			description: 'Tailored content management system for easy updates.'
		}
	],
	packages: [
		{
			name: 'Starter',
			description:
				'An affordable, professional web presence with essential functionality and clean design.',
			target: 'Early-stage entrepreneurs or local businesses needing a solid online foundation.',
			priceMin: 1000,
			priceMax: 2000,
			includedFeatures: [
				'basic-design',
				'responsive-layout',
				'basic-seo',
				'standard-contact',
				'social-links',
				'basic-analytics'
			],
			featured: false,
			tagline: 'Perfect starter site with solid design and basic lead capture.',
			icon: 'icon-light-bulb'
		},
		{
			name: 'Growth',
			description:
				'Enhanced visibility, user engagement, and functionality for businesses ready to expand their digital presence.',
			target:
				'Growing businesses looking to increase leads and improve customer engagement online.',
			priceMin: 2000,
			priceMax: 5000,
			includedFeatures: [
				'basic-design',
				'responsive-layout',
				'basic-seo',
				'standard-contact',
				'social-links',
				'basic-analytics',
				'custom-design',
				'advanced-seo',
				'enhanced-contact',
				'third-party',
				'blog-setup',
				'advanced-analytics'
			],
			featured: true,
			tagline: 'Solid choice for growth-focused brands adding function and flare.',
			icon: 'icon-chart-bar'
		},
		{
			name: 'Elite',
			description:
				'Comprehensive digital solution with intelligent features, deep customization, and automation for high-performance businesses.',
			target:
				'High-volume businesses or those needing maximum control, scalability, and innovation.',
			priceMin: 5000,
			priceMax: null,
			includedFeatures: [
				'basic-design',
				'responsive-layout',
				'basic-seo',
				'standard-contact',
				'social-links',
				'basic-analytics',
				'custom-design',
				'advanced-seo',
				'enhanced-contact',
				'third-party',
				'blog-setup',
				'advanced-analytics',
				'full-stack',
				// 'ai-features',
				'automated-leads',
				'dynamic-content',
				'business-automation',
				'accessibility',
				'custom-admin'
			],
			featured: false,
			tagline: 'Your digital HQ—custom-built to support growth, automation, and innovation.',
			icon: 'icon-bolt'
		}
	]
};

/** @type {HostingPricingData} */
export const hostingPricing = {
	features: [
		// Essential Hosting Features
		{
			id: 'secure-hosting-ssl',
			title: 'Secure Hosting with SSL Certificate',
			description: 'Reliable hosting with SSL certificate for secure data transmission.'
		},
		{
			id: 'uptime-monitoring',
			title: 'Monthly Uptime Monitoring',
			description: 'Continuous monitoring to ensure your site stays online and accessible.'
		},
		{
			id: 'basic-backups',
			title: 'Basic Site Backups (Monthly)',
			description: 'Monthly backups to protect your site data and content.'
		},
		{
			id: 'email-support-72h',
			title: 'Email Support (72-hour response)',
			description: 'Email support with response within 72 hours for non-urgent issues.'
		},
		{
			id: 'quarterly-updates',
			title: 'Plugin/Theme Updates (Quarterly)',
			description: 'Regular updates to keep your site secure and up-to-date.'
		},
		{
			id: 'quarterly-security',
			title: 'Security Scans (Quarterly)',
			description: 'Regular security scans to identify and address potential vulnerabilities.'
		},

		// Professional Hosting Features
		{
			id: 'priority-support-24h',
			title: 'Priority Email Support (24-48 hours)',
			description: 'Faster support response time for more urgent issues and questions.'
		},
		{
			id: 'monthly-updates',
			title: 'Plugin/Theme Updates (Monthly)',
			description: 'More frequent updates to ensure optimal performance and security.'
		},
		{
			id: 'content-updates',
			title: 'Content Updates (up to 2 per month)',
			description: 'Regular content updates to keep your site fresh and relevant.'
		},
		{
			id: 'performance-optimization',
			title: 'Performance Optimization (Monthly)',
			description: 'Monthly speed checks and optimization to maintain fast loading times.'
		},
		{
			id: 'monthly-security',
			title: 'Security Scans (Monthly)',
			description: 'More frequent security monitoring for enhanced protection.'
		},
		{
			id: 'basic-analytics-reporting',
			title: 'Analytics Reporting (Basic Monthly)',
			description: 'Monthly summary of site performance and visitor analytics.'
		},

		// Premium Hosting Features
		{
			id: 'unlimited-content-updates',
			title: 'Unlimited Content Updates',
			description: 'No limits on content updates to keep your site always current.'
		},
		{
			id: 'emergency-support-6h',
			title: 'Emergency Support (6-12 hours)',
			description: 'Urgent support response for critical issues affecting your business.'
		},
		{
			id: 'custom-analytics-dashboard',
			title: 'Custom Analytics Dashboard',
			description: 'Tailored analytics dashboard with insights specific to your business goals.'
		},
		{
			id: 'ab-testing',
			title: 'A/B Testing Setup and Monitoring',
			description: 'Set up and monitor A/B tests to optimize conversion rates.'
		},
		{
			id: 'seo-performance-tracking',
			title: 'SEO Performance Tracking',
			description: 'Comprehensive SEO monitoring and performance tracking.'
		},
		{
			id: 'monthly-strategy-call',
			title: 'Monthly Strategy Call or Report Review',
			description: 'Regular strategy sessions to review performance and plan improvements.'
		},
		{
			id: 'advanced-security-monitoring',
			title: 'Advanced Security Monitoring',
			description: 'Firewall protection, malware removal, and comprehensive security monitoring.'
		}
	],
	packages: [
		{
			name: 'Essential Hosting',
			description:
				'Reliable hosting with minimal ongoing changes for clients who want a set-it-and-forget-it solution.',
			target: 'Clients who want reliable hosting with minimal ongoing changes.',
			priceMin: 50,
			priceMax: 100,
			includedFeatures: [
				'secure-hosting-ssl',
				'uptime-monitoring',
				'basic-backups',
				'email-support-72h',
				'quarterly-updates',
				'quarterly-security'
			],
			featured: false,
			tagline: 'Set it and forget it—ideal for static sites or low-maintenance businesses.',
			icon: 'icon-server-stack'
		},
		{
			name: 'Professional Hosting',
			description:
				'Enhanced hosting for businesses that need regular updates and faster support turnaround.',
			target: 'Businesses that need regular updates and faster support turnaround.',
			priceMin: 100,
			priceMax: 250,
			includedFeatures: [
				'secure-hosting-ssl',
				'uptime-monitoring',
				'basic-backups',
				'email-support-72h',
				'quarterly-updates',
				'quarterly-security',
				'priority-support-24h',
				'monthly-updates',
				'content-updates',
				'performance-optimization',
				'monthly-security',
				'basic-analytics-reporting'
			],
			featured: true,
			tagline: 'Keeps your site fresh, secure, and running smoothly.',
			icon: 'icon-cog-6-tooth'
		},
		{
			name: 'Premium Hosting',
			description:
				'Comprehensive hosting solution for high-traffic sites or businesses that rely heavily on their website for leads and conversions.',
			target:
				'High-traffic sites or businesses that rely heavily on their website for leads and conversions.',
			priceMin: 250,
			priceMax: 500,
			includedFeatures: [
				'secure-hosting-ssl',
				'uptime-monitoring',
				'basic-backups',
				'email-support-72h',
				'quarterly-updates',
				'quarterly-security',
				'priority-support-24h',
				'monthly-updates',
				'content-updates',
				'performance-optimization',
				'monthly-security',
				'basic-analytics-reporting',
				'unlimited-content-updates',
				'emergency-support-6h',
				'custom-analytics-dashboard',
				'ab-testing',
				'seo-performance-tracking',
				'monthly-strategy-call',
				'advanced-security-monitoring'
			],
			featured: false,
			tagline: "Your website's personal concierge—proactive, responsive, and data-driven.",
			icon: 'icon-trophy'
		}
	]
};

// Legacy export for backward compatibility
/** @type {PricingData} */
export const pricing = {
	features: [...developmentPricing.features, ...hostingPricing.features],
	packages: [...developmentPricing.packages, ...hostingPricing.packages]
};
