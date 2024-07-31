import { z } from 'zod';

export const formDataValidator = z.object({
	url: z.string().url(),
	shortUrl: z.string().min(3).max(10).optional()
});
