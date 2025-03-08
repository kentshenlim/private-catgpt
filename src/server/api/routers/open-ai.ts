import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const openAIRouter = createTRPCRouter({
  prompt: publicProcedure
    .input(z.object({ prompt: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `User requested for prompt: ${input.prompt}`,
      };
    }),
});
