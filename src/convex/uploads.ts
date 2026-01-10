import { action } from './_generated/server';
import { v } from 'convex/values';

/**
	* Generate an upload URL for file uploads
 */
export const generateUploadUrl = action({
	args: {},
	handler: async (ctx) => {
		const url = await ctx.storage.generateUploadUrl();
		return { url };
	}
});

/**
	* Get the public URL for a stored file
 */
export const getPublicUrl = action({
	args: {
		id: v.id('_storage')
	},
	handler: async (ctx, args) => {
		const url = await ctx.storage.getUrl(args.id);
		return { url };
	}
});
