import NextAuth, { NextAuthOptions, RequestInternal } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { poster } from "@/lib/utils";
import { Props } from "@/lib/types";
import { DefaultSession } from "next-auth";

// nextauth.d.ts
declare module "next-auth" {
  interface User {
    email: string;
    newPassword: string;
    confirmPassword: string;
    userName: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phoneNumber: string;
    id: string | undefined | null;
  }

  interface Session extends DefaultSession {
    email: string;
    newPassword: string;
    confirmPassword: string;
    userName: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phoneNumber: string;
    id: string | undefined | null;
  }
}

// nextauth.d.ts
declare module "next-auth/jwt" {
  interface JWT {
    email: string;
    newPassword: string;
    confirmPassword: string;
    userName: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phoneNumber: string;
    id: string | undefined | null;
  }
}

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
    async jwt({ token }) {
      return { ...token };
    },

    async session({ session, token }) {
      return { ...session, ...token };
    },
  },
};

export default NextAuth(authOptions);
