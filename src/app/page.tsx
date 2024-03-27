import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function Home() {
	return (
		<div className='flex-1 w-full flex flex-col gap-20 items-center'>
			authenticated user
		</div>
	);
}
