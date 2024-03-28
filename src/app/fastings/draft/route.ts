import { createClient } from '@/lib/supabase/server';
import { FastingStatus } from '@/lib/types';
import { NextResponse } from 'next/server';

export async function GET() {
	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const { data: inProgressFasting } = await supabase
		.from('fastings')
		.select('*')
		.eq('user_id', user?.id)
		.eq('status', FastingStatus.InProgress)
		.single();

	const { data: preCompletedFasting } = await supabase
		.from('fastings')
		.select('*')
		.eq('user_id', user?.id)
		.eq('status', FastingStatus.PreCompleted)
		.single();

	return NextResponse.json({
		status: 200,
		inProgressFasting: inProgressFasting ?? null,
		preCompletedFasting: preCompletedFasting ?? null,
	});
}
