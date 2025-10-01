import { supabase } from './supabase.js';

export interface UploadResult {
	url: string;
	path: string;
}

// Add image resizing function
export async function resizeImage(file: File, maxSizeMB: number = 1): Promise<File> {
	return new Promise((resolve, reject) => {
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		const img = new Image();

		img.onload = () => {
			// Calculate new dimensions while maintaining aspect ratio
			const maxDimension = 1200; // Max width/height
			let { width, height } = img;

			if (width > height && width > maxDimension) {
				height = (height * maxDimension) / width;
				width = maxDimension;
			} else if (height > maxDimension) {
				width = (width * maxDimension) / height;
				height = maxDimension;
			}

			// Set canvas dimensions
			canvas.width = width;
			canvas.height = height;

			// Draw resized image
			ctx?.drawImage(img, 0, 0, width, height);

			// Try different quality levels
			const maxSizeBytes = maxSizeMB * 1024 * 1024;
			const qualityLevels = [0.9, 0.8, 0.7, 0.6, 0.5];

			function tryQuality(qualityIndex: number) {
				if (qualityIndex >= qualityLevels.length) {
					// If all quality levels fail, return original file
					resolve(file);
					return;
				}

				const quality = qualityLevels[qualityIndex];
				canvas.toBlob(
					(blob) => {
						if (!blob) {
							reject(new Error('Failed to resize image'));
							return;
						}

						if (blob.size <= maxSizeBytes) {
							// Success! Create file from blob
							const resizedFile = new File([blob], file.name, {
								type: file.type,
								lastModified: Date.now()
							});
							resolve(resizedFile);
						} else {
							// Try next quality level
							tryQuality(qualityIndex + 1);
						}
					},
					file.type,
					quality
				);
			}

			// Start with first quality level
			tryQuality(0);
		};

		img.onerror = () => reject(new Error('Failed to load image'));
		img.src = URL.createObjectURL(file);
	});
}

export async function uploadImage(file: File, path: string): Promise<UploadResult> {
	// Resize image before upload if it's larger than 1MB
	let processedFile = file;
	if (file.size > 1024 * 1024) {
		try {
			processedFile = await resizeImage(file, 1);
		} catch (error) {
			console.warn('Failed to resize image, uploading original:', error);
		}
	}

	const { data, error } = await supabase.storage.from('blog-images').upload(path, processedFile, {
		cacheControl: '3600',
		upsert: false
	});

	if (error) {
		console.error('Upload error:', error);
		throw new Error(`Upload failed: ${error.message}`);
	}

	// Get public URL
	const {
		data: { publicUrl }
	} = supabase.storage.from('blog-images').getPublicUrl(data.path);

	return {
		url: publicUrl,
		path: data.path
	};
}

export function validateImage(file: File): { valid: boolean; error?: string } {
	const maxSize = 5 * 1024 * 1024; // 5MB (original file size limit)
	const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

	if (file.size > maxSize) {
		return { valid: false, error: 'File too large. Please use an image under 5MB.' };
	}

	if (!allowedTypes.includes(file.type)) {
		return { valid: false, error: 'Invalid file type. Please use JPEG, PNG, WebP, or GIF.' };
	}

	return { valid: true };
}

export function generateImagePath(file: File): string {
	const timestamp = Date.now();
	const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
	return `posts/${timestamp}-${sanitizedName}`;
}

export function getImageUrl(path: string): string {
	const {
		data: { publicUrl }
	} = supabase.storage.from('blog-images').getPublicUrl(path);

	return publicUrl;
}
