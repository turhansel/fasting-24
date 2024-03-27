import * as z from 'zod';

export const SignUpSchema = z.object({
	first_name: z.string().min(1, {
		message: 'Name is required',
	}),
	email: z.string().email({
		message: 'Email is required',
	}),
	password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export const LoginSchema = z.object({
	email: z.string().email('Email is required'),
	password: z.string().min(8, 'Password must be at least 8 characters long'),
});
