import NextAuth, { NextAuthOptions, RequestInternal } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { poster } from "@/lib/utils";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      authorize: async function (
        credentials: Record<string, string> | undefined,
        req: Pick<RequestInternal, "headers" | "body" | "query" | "method">,
      ) {
        try {
          // check user existance
          if (credentials?.email && credentials?.password) {
            const login = await poster("user/login", {
              email: credentials.email,
              password: credentials.password,
            });

            if (!login) {
              throw new Error("error occured, please try again.");
            }

            return login;
          }
        } catch (error) {
          throw new Error("error occured, please try again.");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      return { ...token, ...user };
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      return { ...session, ...token };
    },
  },
};

export default NextAuth(authOptions);
