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
			await signIn(values).unwrap();
			router.push('/');
		} catch (error: any) {
			const message = error?.data?.message;
			toast.error(message ?? 'Please try again');
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
					<CardFooter>
						<Button
							className='w-full'
							type='submit'
							loading={isLoading}
						>
							Login
						</Button>
					</CardFooter>
				</Card>
			</form>
		</Form>
	);
}
