import NextAuth, { NextAuthOptions, RequestInternal } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { poster } from "@/lib/utils";
import { Props } from "@/lib/types";
import { DefaultSession } from "next-auth";
import axios, { AxiosError } from "axios";

// nextauth.d.ts
declare module "next-auth" {
  interface User {
    email?: string | string;
    newPassword?: string;
    confirmPassword?: string;
    userName?: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    phoneNumber?: string;
    id?: string | undefined | null;
    token?: string | undefined | null;
    stripeCustomerId?: string | undefined | null;
    stripeAccountId?: string | undefined | null;
    chargesEnabled?: boolean | undefined;
  }

  interface Session extends DefaultSession {
    email?: string | undefined;
    newPassword?: string;
    confirmPassword?: string;
    userName?: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    phoneNumber?: string;
    id?: string | undefined | null;
    token?: string | undefined | null;
    stripeCustomerId?: string | undefined | null;
    stripeAccountId?: string | undefined | null;
    chargesEnabled?: boolean | undefined;
  }
}

// nextauth.d.ts
declare module "next-auth/jwt" {
  interface JWT {
    email?: string;
    newPassword?: string;
    confirmPassword?: string;
    userName?: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    phoneNumber?: string;
    id?: string | undefined | null;
    token?: string | undefined | null;
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
        // check user existance
        if (credentials?.email && credentials?.password) {
          const login = await poster("/user/login", {
            email: credentials.email,
            password: credentials.password,
          });

          if (login._id) {
            return login;
          }

          // if (!login.status) {
          //   throw new Error("server or connection error, please try again!");
          // }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      return { ...session, ...token };
    },
  },
};

export default NextAuth(authOptions);
