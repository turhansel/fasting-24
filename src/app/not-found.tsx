'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
	return (
		<div className='min-h-screen flex items-center flex-col justify-center'>
			<h2 className='text-2xl text-black'>Something went wrong!</h2>

			<Link href={'/'}>
				<Button
					className='mt-2 bg-slate-600'
					onClick={() => window.location.reload()}
				>
					Try Again
				</Button>
			</Link>
		</div>
	);
}
