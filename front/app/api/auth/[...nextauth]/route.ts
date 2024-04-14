import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET) {
    throw new Error("GITHUB_ID and GITHUB_SECRET must be set")
}

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        // ...add more providers here
    ],
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
