import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Login with Email',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
                AdminPassword: { label: "Admin Password", type: "password" }
            },
            async authorize(credentials, req) {
                const username = credentials?.username
                const password = credentials?.password
                // check if the user and passowrd is correct 
                const user = {
                    name: "adtya",
                    id: "1",
                    username
                }

                if (user) {
                    return user
                }
                else {
                    return null
                }

            }
        })
        , GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ]

})

export { handler as GET, handler as POST }