import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	const supabase = createClient();
	const { email, password, first_name } = await request.json();

	const { error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
			data: {
				first_name,
			},
		},
	});

	if (error) {
		return NextResponse.json(
			{ message: 'Could not authenticate user. Please try again.' },
			{ status: 400 }
		);
	}

	return NextResponse.json({
		message: 'Check email to continue sign in process.',
	});
}
