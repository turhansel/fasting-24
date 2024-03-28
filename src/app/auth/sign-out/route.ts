import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST() {
	const supabase = createClient();

	const { error } = await supabase.auth.signOut();
	if (error) {
		return NextResponse.json(
			{ message: 'Could not sign out user. Please try again.' },
			{ status: 400 }
		);
	}

	return NextResponse.json({
		status: 200,
	});
}
