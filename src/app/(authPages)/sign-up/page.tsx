'use client';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SignUpSchema } from '@/lib/redux/features/auth/schemas';
import { useSignUpMutation } from '@/lib/redux/features/auth/authApiSlice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignUp() {
	const router = useRouter();

	const form = useForm<z.infer<typeof SignUpSchema>>({
		resolver: zodResolver(SignUpSchema),
		defaultValues: {
			first_name: '',
			email: '',
			password: '',
		},
	});

	const [signUp, { isLoading }] = useSignUpMutation();

	const onSubmit = async (values: z.infer<typeof SignUpSchema>) => {
		try {
			const result = await signUp(values).unwrap();
			toast.success(result.message);
			router.push('/sign-in');
		} catch (error: any) {
			const message = error?.data?.message;
			toast.error(message ?? 'Unknown error');
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='animate-in flex flex-col w-full justify-center gap-2 text-foreground mt-32'
			>
				<Card className='w-full '>
					<CardHeader>
						<CardTitle className='text-2xl text-center'>
							Create New Profile
						</CardTitle>
						<CardDescription className='text-center'>
							Start Your Fasting Journey
						</CardDescription>
					</CardHeader>
					<CardContent className='grid gap-4'>
						<FormField
							control={form.control}
							name='first_name'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											placeholder='John Doe'
											{...field}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											placeholder='turti@example.com'
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
											placeholder='••••••••'
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
							className='w-full'
							type='submit'
							loading={isLoading}
						>
							Register
						</Button>

						<Link
							href='/sign-in'
							className='text-center text-sm text-black'
						>
							Already have an account? Sign in
						</Link>
					</CardFooter>
				</Card>
			</form>
		</Form>
	);
}
