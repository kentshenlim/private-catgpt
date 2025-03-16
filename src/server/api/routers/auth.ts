import { signIn } from "auth";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { LoginSchema } from "@/lib/schema";
import { AuthError } from "next-auth";
import { auth } from "auth";
import { z } from "zod";

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
        await signIn("credentials", input); // Do not redirect as TRPC expects a response
        return { isOK: true };
      } catch (error) {
        if (error instanceof AuthError) {
          if (error.type === "CredentialsSignin")
            return { isOK: false, reason: "Invalid credentials." };
          return { isOK: false, reason: "Something went wrong." };
        }
        return { isOK: true };
      }
      /*
    For server action, if auth successful, by default NEXT_REDIRECT error will
    be thrown, we then need to leave the error uncaught for the server to ask
    client to redirect. 
    */
      /*
    For TRPC, we cannot just redirect; TRPC expects a response. Setting redirect
    to false, on auth success, rather than throwing error, we will get a promise
    resolve to redirect URL. If auth failed, we need to catch it, we will catch
    this at the frontend that calls this TRPC auth endpoint.
    */
    }),
});
