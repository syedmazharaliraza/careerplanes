import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    const { pathname } = request.nextUrl;

    // Redirect signed-in users from '/' or '/signin' to '/dashboard'
    if (token && (pathname === '/' || pathname === '/signin')) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Redirect logged-out users from '/dashboard' to '/signin'
    if (!token && pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/signin', request.url));
    }

    return NextResponse.next();
}

// Update the matcher configuration
export const config = {
    matcher: ['/', '/signin', '/dashboard/:path*'],
};