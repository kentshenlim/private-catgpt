import { z } from "zod";
import OpenAI from "openai";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { MessageSchema } from "@/lib/schema";
import { workingDayTool } from "@/server/open-ai-tools/working-day";
import { type GetWorkingDaysNumParams } from "@/lib/schema";

const openai = new OpenAI(); // Will read OPENAI_API_KEY automatically

export const openAIRouter = createTRPCRouter({
  chatCompletionPrompt: publicProcedure
    .input(z.array(MessageSchema))
    .output(MessageSchema)
    .mutation(async ({ input }) => {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: input,
        store: true,
        tools: [workingDayTool],
      });
      let responseText = "Snap! CatGPT is offline. Please check back later.";
      if (completion.choices[0]) {
        const choice = completion.choices[0];
        if (choice.finish_reason === "tool_calls") {
          const toolCallData = choice.message.tool_calls;
          if (!toolCallData?.[0]) {
            responseText =
              "CatGPT cannot find the tool required to answer your question. Please try again.";
          } else {
            const toolCallDetails = toolCallData[0].function;
            const functionName = toolCallDetails.name;
            const functionArgs = toolCallDetails.arguments;
            console.log(functionName, functionArgs);
          }
        } else if (choice.finish_reason === "stop") {
          responseText =
            choice.message.content ?? "CatGPT has nothing to say...";
        }
      }
      return { role: "system", content: responseText };
    }),
});
