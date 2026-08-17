import type { NextAuthConfig } from "next-auth";
import type { SessionUser } from "./types/next-auth";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-account",
  },

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.data = user as SessionUser;
      }
      return token;
    },

    session({ session, token }) {
      session.user = token.data;
      return session;
    },

    authorized({ request, auth }) {
      const isLoggedIn = !!auth?.user;
      const isOnCheckout = request.nextUrl.pathname.startsWith("/checkout");

      if (isOnCheckout && !isLoggedIn) return false;

      return true;
    },
  },

  providers: [],
};
