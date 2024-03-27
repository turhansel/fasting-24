import { createClient } from '@/lib/supabase/server';
import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from './lib/supabase/middleware';

const nonProtectedRoutes = ['/sign-up', '/sign-in'];

export async function middleware(req: NextRequest) {
	// First, update the session. This may refresh tokens if necessary.

	// Create a Supabase client
	const supabase = createClient();

	// Get the current user
	const {
		data: { user },
	} = await supabase.auth.getUser();

	// Check if the user is not logged in and trying to access a protected route
	if (!user && !nonProtectedRoutes.includes(req.nextUrl.pathname)) {
		// Redirect to the sign-up page if not logged in and accessing a protected route
		const redirectUrl = req.nextUrl.clone();
		redirectUrl.pathname = '/sign-up';
		return NextResponse.redirect(redirectUrl);
	}

	if (user && nonProtectedRoutes.includes(req.nextUrl.pathname)) {
		const redirectUrl = req.nextUrl.clone();
		redirectUrl.pathname = '/';
		return NextResponse.redirect(redirectUrl);
	}

	// If the user is logged in or accessing a non-protected route, return the updated session response
	return await updateSession(req);
}

export const config = {
	matcher: ['/', '/fasting', '/sign-up', '/sign-in'],
};
