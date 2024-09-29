import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { getServerSession } from "next-auth/next";
import { cookies } from "next/headers";


export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async jwt({ token, user, account, profile, isNewUser }) {
            return token
        },
        async session({ session, token, user }) {
            return session
        },
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
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