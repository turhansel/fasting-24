'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { useSignOutMutation } from '@/lib/redux/features/auth/authApiSlice';
import { LogOutIcon } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const getUserIsUserAuthenticated = async () => {
	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	return user ? true : false;
};

export default function Header() {
	const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

	useEffect(() => {
		getUserIsUserAuthenticated().then((isAuthenticated) => {
			setIsUserAuthenticated(isAuthenticated);
		});
	}, []);

	const [signOut] = useSignOutMutation();

	const handleSignOut = async () => {
		try {
			await signOut();
			window.location.reload();
		} catch (error: any) {
			const message = error?.data?.message;
			message && toast.error(message as string);
		}
	};

	return (
		<header className='bg-white flex items-center w-full relative'>
			<Link
				className='mx-auto flex items-center gap-2 p-4 sm:p-8'
				href='/'
			>
				<svg width='50' height='50' viewBox='0 0 50 50'>
					<path
						d='M24.7 0C11.1 0 0 11.1 0 24.7C0 38.3 11.1 49.4 24.7 49.4C38.3 49.4 49.4 38.3 49.4 24.7C49.4 11.1 38.3 0 24.7 0ZM6.9 24.7C6.9 19.6 9.1 14.9 12.6 11.7C14 10.4 16.4 10.8 17.4 12.5L23.6 23.2C24.2 24.2 24.2 25.4 23.6 26.4L17.4 37.1C16.4 38.9 14 39.2 12.5 37.8C9.1 34.4 6.9 29.8 6.9 24.7ZM32 36.9L25.8 26.2C25.2 25.2 25.2 24 25.8 23L32 12.3C33 10.6 35.3 10.2 36.8 11.5C40.3 14.7 42.5 19.4 42.5 24.5C42.5 29.6 40.3 34.3 36.8 37.5C35.3 39.1 33 38.7 32 36.9Z'
						fill='#002548'
					/>
				</svg>

				<h1 className='text-[28px] font-normal text-oxfordBlue font-sen'>
					Fasting <span className='font-extrabold'>24</span>
				</h1>
			</Link>

			{isUserAuthenticated && (
				<Button
					onClick={handleSignOut}
					variant={'secondary'}
					className='p-[10px] rounded-full bg-[#D6D6D6] text-black absolute right-2 md:right-32'
				>
					<LogOutIcon size={16} />
				</Button>
			)}
		</header>
	);
}
