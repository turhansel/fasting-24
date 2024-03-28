import { createClient } from '@/lib/supabase/server';
import { FastingStatus } from '@/lib/types';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const supabase = createClient();
	console.log('Im working');
	const { start_date, end_date, duration } = await request.json();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const { error } = await supabase.from('fastings').insert([
		{
			user_id: user?.id,
			start_date,
			end_date,
			duration,
			status: FastingStatus.InProgress,
		},
	]);

	if (error) {
		console.error('Error creating fasting record:', error);

		return NextResponse.json({
			status: 500,
			message: 'Error creating fasting record',
		});
	}

	return NextResponse.json({
		status: 200,
		message: 'Fasting record created successfully',
	});
}
