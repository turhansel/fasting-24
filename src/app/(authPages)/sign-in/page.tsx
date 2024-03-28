'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { toast } from 'sonner';
import { useSignInMutation } from '@/lib/redux/features/auth/authApiSlice';
import { LoginSchema } from '@/lib/redux/features/auth/schemas';
import Link from 'next/link';

export default function Login() {
	const router = useRouter();

	const [signIn, { isLoading }] = useSignInMutation();

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
		try {
			const result = await signIn(values).unwrap();

			result?.status === 200 && router.push('/');
			result?.status === 400 && toast.error(result.message);
		} catch (error: any) {
			const message = error?.data?.message;
			toast.error(message ?? 'Please try again');
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='animate-in flex flex-col w-full justify-center gap-2 text-foreground mt-16 sm:mt-32 px-2 sm:px-0'
			>
				<Card className='w-full'>
					<CardHeader>
						<CardTitle className='text-2xl text-center'>
							Login
						</CardTitle>
					</CardHeader>
					<CardContent className='grid gap-4'>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											placeholder='E-mail'
											{...field}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											type='password'
											placeholder='Password'
											{...field}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
					<CardFooter className='flex flex-col gap-4'>
						<Button
							size='lg'
							className='w-full'
							type='submit'
							loading={isLoading}
						>
							Login
						</Button>
						<Link
							href='/sign-up'
							className='text-center text-sm text-primaryBlack underline'
						>
							Back to Register
						</Link>
					</CardFooter>
				</Card>
			</form>
		</Form>
	);
}
