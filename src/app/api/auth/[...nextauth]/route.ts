import NextAuth, { DefaultSession } from "next-auth";
import { authOptions } from '@/lib/auth'; // Make sure to export this function from lib/auth.ts

// Extend the built-in session type
declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
        } & DefaultSession["user"]
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };