import { withAuth } from "next-auth/middleware"
import { NextResponse } from 'next/server';

function isAllowedEmail(email: string | null | undefined): boolean {
    return process.env.ALLOWED_EMAILS!.split(',').includes(email!);
}

export default withAuth(
    function middleware(req) {
        const { pathname } = req.nextUrl;

        // Redirect non-allowed emails to signin with error
        if (req.nextauth.token && !isAllowedEmail(req.nextauth.token.email)) {
            // Create a new response object
            const response = NextResponse.redirect(
                new URL("/signin?error=AccessDenied", req.url)
            );

            // Clear the session cookie
            response.cookies.delete("next-auth.session-token");

            // If you're using secure cookies in production, also clear the secure cookie
            if (process.env.NODE_ENV === "production") {
                response.cookies.delete("__Secure-next-auth.session-token");
            }

            return response;
        }

        // Redirect authenticated users away from auth pages
        if (
            req.nextauth.token &&
            (pathname === "/signin" || pathname === "/signup")
        ) {
            return NextResponse.redirect(new URL("/", req.url));
        }
    },
    {
        callbacks: {
            authorized: ({ req, token }) => {
                const { pathname } = req.nextUrl;
                const protectedRoutes = ['/dashboard', '/profile', '/settings'];

                // Allow access to non-protected routes
                if (!protectedRoutes.some(route => pathname.startsWith(route))) {
                    return true;
                }

                // Require authentication for protected routes
                return !!token;
            },
        },
    }
)

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};