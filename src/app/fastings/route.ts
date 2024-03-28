import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const { data, error } = await supabase
		.from('fastings')
		.select('*')
		.eq('user_id', user?.id)
		.eq('status', 'Completed')
		.order('end_date', { ascending: false });

	if (error) {
		console.error('Error fetching fasting records:', error);

		return NextResponse.json({
			status: 200,
			completedFastings: [],
		});
	}

	return NextResponse.json({
		status: 200,
		completedFastings: data,
	});
}
