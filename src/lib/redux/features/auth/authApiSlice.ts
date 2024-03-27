import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { z } from 'zod';
import { LoginSchema, SignUpSchema } from './schemas';

export const authApiSlice = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/`,
	}),
	reducerPath: 'authApi',
	tagTypes: ['Auth'],
	endpoints: (build) => ({
		signIn: build.mutation<any, z.infer<typeof LoginSchema>>({
			query: (body) => ({
				url: '/sign-in',
				method: 'POST',
				body,
			}),
		}),
		signUp: build.mutation<
			{ message: string },
			z.infer<typeof SignUpSchema>
		>({
			query: (body) => ({
				url: '/sign-up',
				method: 'POST',
				body,
			}),
		}),
		signOut: build.mutation<{ message: string }, void>({
			query: () => ({
				url: '/sign-out',
				method: 'POST',
			}),
		}),
	}),
});

export const { useSignInMutation, useSignUpMutation, useSignOutMutation } =
	authApiSlice;
