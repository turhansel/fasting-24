import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	const supabase = createClient();
	const { email, password } = await request.json();
	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		return NextResponse.error();
	}

	return NextResponse.json({
		status: 200,
	});
}
