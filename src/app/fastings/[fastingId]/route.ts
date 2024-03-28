import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
	request: NextRequest,
	{ params: { fastingId } }: { params: { fastingId: string } }
) {
	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const { error } = await supabase
		.from('fastings')
		.update({ status: 'Deleted' })
		.eq('user_id', user?.id)
		.eq('id', fastingId);

	if (error) {
		return NextResponse.error();
	}

	return NextResponse.json({
		status: 200,
		message: 'Fasting record successfully deleted.',
	});
}
