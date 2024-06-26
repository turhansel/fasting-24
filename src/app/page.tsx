import { createClient } from '@/lib/supabase/server';

import FastingStatistics from '@/components/Fasting/FastingStatistics';
import FastingList from '@/components/Fasting/FastingList';
import FastingForm from '@/components/Fasting/FastingForm';
import { FastingStatus } from '@/lib/types';

export default async function Home() {
	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	// This Supabase query updates the status of fasting records to 'Completed' for a specific user. It targets records where the 'status' is 'InProgress', the 'user_id' matches the current user's ID, and the 'end_date' is in the past relative to the current time.
	await supabase
		.from('fastings')
		.update({ status: FastingStatus.PreCompleted })
		.match({ status: FastingStatus.InProgress })
		.eq('user_id', user?.id)
		.lte('end_date', new Date().toISOString());

	return (
		<>
			<h2 className='mt-8 sm:mt-[50px] mb-4 sm:mb-[36px] font-bold text-primaryBlack'>
				<span className='font-normal'>Hello</span>{' '}
				{user?.user_metadata?.first_name}
			</h2>

			<FastingForm />

			<FastingStatistics />

			<FastingList />
		</>
	);
}
