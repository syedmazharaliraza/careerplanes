import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { getServerSession } from "next-auth/next";
import { cookies } from "next/headers";


export const authOptions: NextAuthOptions =
{
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    // Add the following options
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.sub!;
            }
            return session;
        },
        async signIn({ user }) {
            return isAllowedEmail(user.email);
        },
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        },
        async jwt({ token, user }) {
            return token;
        },
    },
    pages: {
        signIn: '/signin',
        error: '/signin',
    },
}

export async function getSession() {
    return await getServerSession(authOptions);
}

export async function getCurrentUser() {
    const session = await getSession();
    return session?.user;
}

export async function getUserFromSession() {
    const session = await getSession();

    if (session && session.user) {
        return {
            id: session.user.id || '',
            name: session.user.name || '',
            email: session.user.email || '',
            image: session.user.image || '',
            // Add any other user properties you need
        };
    }

    return null;
}

export async function logout() {
    // NextAuth.js handles logout differently, typically through a signOut function
    // This function is mainly used on the client-side
    // For server-side logout, you might want to invalidate the session
    cookies().set("next-auth.session-token", "", { maxAge: 0 });
}

export function isAllowedEmail(email: string | null | undefined): boolean {
    const allowedEmails = process.env.ALLOWED_EMAILS;
    if (!allowedEmails) {
        console.error("ALLOWED_EMAILS environment variable is not set");
        return false;
    }
    if (!email) {
        console.error("Email is null or undefined");
        return false;
    }
    return allowedEmails.split(',').includes(email);
}