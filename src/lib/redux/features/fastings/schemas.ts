import * as z from 'zod';

export const FastingFormSchema = z.object({
	start_date: z.string().min(1, {
		message: 'Start date is required',
	}),
	end_date: z.string().min(1, {
		message: 'End date is required',
	}),
});
