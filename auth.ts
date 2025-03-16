import { authConfig } from "auth.config";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

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
