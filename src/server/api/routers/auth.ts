import { signIn } from "auth";
import { AuthError } from "next-auth";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const authRouter = createTRPCRouter({
  signIn: publicProcedure
    .input(z.instanceof(FormData))
    .output(
      z.object({
        isOK: z.boolean(),
        reason: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        await signIn("credentials", input);
        return { isOK: true }; // Will never reach here
      } catch (error) {
        // On successful auth, redirect error will be thrown, need to catch here
        if (error instanceof AuthError) {
          if (error.type === "CredentialsSignin")
            return { isOK: false, reason: "Invalid credentials." };
          return { isOK: false, reason: "Something went wrong." };
        }
        return { isOK: true }; // Error thrown following successful authentication
      }
    }),
});
