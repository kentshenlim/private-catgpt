import { type NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAtProtected = nextUrl.pathname === "/"; // Home = chat app is protected
      if (isAtProtected)
        return isLoggedIn; // At protected route must log in
      else if (isLoggedIn) return Response.redirect(new URL("/", nextUrl)); // Not at protected path but log in, redirect to chat page
      return true; // No need authentication for unprotected routes
    },
  },
  providers: [],
} satisfies NextAuthConfig;
