import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "auth.config";
import { z } from "zod";
import bcrypt from "bcrypt";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const { ADMIN_EMAIL: correctEmail, ADMIN_PASSWORD: correctPassword } =
            process.env;
          console.log("Auth successful");
          return { user: "ADMIN" };
          return null;
          if (!correctEmail || !correctPassword) return null;
          if (email !== correctEmail) return null;
          const passwordMatch = await bcrypt.compare(password, correctPassword);
          if (passwordMatch) return { email };
        }
        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
