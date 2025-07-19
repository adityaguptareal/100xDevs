import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
const handler = NextAuth({

    providers: [
       
        CredentialsProvider({
            name: "Email",
            credentials: {
                username: { label: "username", placeholder: "Enter UserName", type: "text" },
                password: { label: "password", placeholder: "Enter Password", type: "Password" }
            },
            async authorize(credentials, req) {
                const username = credentials?.username
                const password = credentials?.password

                const res = await fetch("/your/endpoint", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                const user = await res.json()

                // If no error and we have user data, return it
                if (res.ok && user) {
                    return user
                }
                // Return null if user data could not be retrieved
                return null
                
            },

        }),
         GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
secret
    ]
})

export { handler as GET, handler as POST }