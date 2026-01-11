import { action } from './_generated/server';
import { v } from 'convex/values';
import { api } from './_generated/api';
import OpenAI from 'openai';

export const generateExcerpt = action({
	args: {
		title: v.string(),
		content: v.string()
	},
	handler: async (ctx, args) => {
		// Check blog role via query
		const hasBlogRole = await ctx.runQuery(api.users.hasRole, { role: 'blog' });
		if (!hasBlogRole) {
			throw new Error('Blog role required');
		}

		const apiKey = process.env.OPENAI_API_KEY;
		if (!apiKey) {
			throw new Error('OPENAI_API_KEY environment variable is not set');
		}

		const openai = new OpenAI({
			apiKey: apiKey
		});

		const prompt = `Write a brief 1-2 sentence summary of this blog post. Be concise and capture the main point. Do not use any tools or external searches. Do not include any additional text, just give me the description.

Title: ${args.title}

Content: ${args.content}`;

		try {
			const completion = await openai.chat.completions.create({
				model: 'gpt-4o-mini',
				messages: [
					{
						role: 'user',
						content: prompt
					}
				]
			});

			// Log the full response for debugging
			console.log('OpenAI completion response:', JSON.stringify(completion, null, 2));

			// Check if we have choices
			if (!completion.choices || completion.choices.length === 0) {
				console.error('No choices in completion response');
				throw new Error('No response from OpenAI API');
			}

			const firstChoice = completion.choices[0];

			// Check finish reason
			if (firstChoice.finish_reason && firstChoice.finish_reason !== 'stop') {
				console.warn('Finish reason:', firstChoice.finish_reason);
			}

			// Extract content - OpenAI chat completions return content as a string
			const content = firstChoice.message?.content;

			if (!content || typeof content !== 'string') {
				console.error('Invalid or empty content in completion response:', {
					content,
					finish_reason: firstChoice.finish_reason,
					choice: firstChoice
				});
				throw new Error('Empty or invalid response from OpenAI API');
			}

			const excerpt = content.trim();

			if (!excerpt) {
				console.error('Excerpt is empty after trimming');
				throw new Error('Empty response from OpenAI API');
			}

			console.log('Extracted excerpt:', excerpt);
			return excerpt;
		} catch (error) {
			console.error('OpenAI API error:', error);
			if (error instanceof Error) {
				throw new Error(`Failed to generate excerpt: ${error.message}`);
			}
			throw new Error('Failed to generate excerpt. Please try again.');
		}
	}
});

export const generateTagSuggestions = action({
	args: {
		title: v.string(),
		content: v.string()
	},
	handler: async (ctx, args) => {
		// Check blog role via query
		const hasBlogRole = await ctx.runQuery(api.users.hasRole, { role: 'blog' });
		if (!hasBlogRole) {
			throw new Error('Blog role required');
		}

		const apiKey = process.env.OPENAI_API_KEY;
		if (!apiKey) {
			throw new Error('OPENAI_API_KEY environment variable is not set');
		}

		const openai = new OpenAI({
			apiKey: apiKey
		});

		const prompt = `Generate 5-8 relevant tags for this blog post. Return only a comma-separated list of tags, nothing else. Do not use any tools or external searches. Each tag should be a single word or short phrase (2-3 words max). Make tags specific and relevant to the content.

Title: ${args.title}

Content: ${args.content}`;

		try {
			const completion = await openai.chat.completions.create({
				model: 'gpt-4o-mini',
				messages: [
					{
						role: 'user',
						content: prompt
					}
				]
			});

			// Log the full response for debugging
			console.log('OpenAI tag suggestions response:', JSON.stringify(completion, null, 2));

			// Check if we have choices
			if (!completion.choices || completion.choices.length === 0) {
				console.error('No choices in completion response');
				throw new Error('No response from OpenAI API');
			}

			const firstChoice = completion.choices[0];

			// Check finish reason
			if (firstChoice.finish_reason && firstChoice.finish_reason !== 'stop') {
				console.warn('Finish reason:', firstChoice.finish_reason);
			}

			// Extract content - OpenAI chat completions return content as a string
			const content = firstChoice.message?.content;

			if (!content || typeof content !== 'string') {
				console.error('Invalid or empty content in completion response:', {
					content,
					finish_reason: firstChoice.finish_reason,
					choice: firstChoice
				});
				throw new Error('Empty or invalid response from OpenAI API');
			}

			// Parse comma-separated tags
			const tagsString = content.trim();
			if (!tagsString) {
				console.error('Tags string is empty after trimming');
				throw new Error('Empty response from OpenAI API');
			}

			// Split by comma and clean up each tag
			const tags = tagsString
				.split(',')
				.map((tag) => tag.trim())
				.filter((tag) => tag.length > 0);

			if (tags.length === 0) {
				throw new Error('No valid tags found in response');
			}

			console.log('Extracted tags:', tags);
			return tags;
		} catch (error) {
			console.error('OpenAI API error:', error);
			if (error instanceof Error) {
				throw new Error(`Failed to generate tag suggestions: ${error.message}`);
			}
			throw new Error('Failed to generate tag suggestions. Please try again.');
		}
	}
});
