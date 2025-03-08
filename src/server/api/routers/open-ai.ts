import { z } from "zod";
import OpenAI from "openai";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { MessageSchema } from "@/lib/schema";

const openai = new OpenAI(); // Will read OPENAI_API_KEY automatically

export const openAIRouter = createTRPCRouter({
  chatCompletionPrompt: publicProcedure
    .input(z.array(MessageSchema))
    .output(MessageSchema)
    .query(async ({ input }) => {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: input,
        store: false,
      });
      const response =
        completion.choices[0]?.message.content ??
        "CatGPT don't know what to say...";
      return { role: "user", content: response };
    }),
});
