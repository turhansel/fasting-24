import { createClient } from '@/lib/supabase/server';
import { FastingStatus } from '@/lib/types';
import { NextRequest, NextResponse } from 'next/server';

const updateResponse = {
	status: 200,
	message: 'Fasting record successfully updated.',
};

export async function DELETE(
	request: NextRequest,
	{ params: { fastingId } }: { params: { fastingId: string } }
) {
	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const { error } = await supabase
		.from('fastings')
		.update({ status: FastingStatus.Deteled })
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

export async function PATCH(request: NextRequest) {
	const { endFasting, fastingId, duration, end_date } = await request.json();

	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (endFasting) {
		await supabase
			.from('fastings')
			.update({ status: FastingStatus.PreCompleted, end_date, duration })
			.eq('user_id', user?.id)
			.eq('id', fastingId);

		return NextResponse.json(updateResponse);
	}

	await supabase
		.from('fastings')
		.update({ status: FastingStatus.Completed })
		.eq('user_id', user?.id)
		.eq('id', fastingId);

	return NextResponse.json(updateResponse);
}
