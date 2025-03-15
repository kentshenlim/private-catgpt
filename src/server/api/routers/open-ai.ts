import { z } from "zod";
import OpenAI from "openai";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { MessageSchema } from "@/lib/schema";
import { workingDayTool } from "@/server/open-ai-tools/working-day";
import { type ChatCompletionMessageParam } from "openai/resources/index.mjs";

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
            const toolCallID = toolCallData[0].id;
            const { name: functionName, arguments: functionArgs } =
              toolCallData[0].function;
            console.log(functionName, functionArgs);
            const toolCallResult = 520;
            const messages: ChatCompletionMessageParam[] = [...input];
            messages.push(choice.message); // Not pushing to state
            messages.push({
              // Not pushing to state
              role: "tool",
              tool_call_id: toolCallID,
              content: toolCallResult.toString(),
            });
            const completionToolCall = await openai.chat.completions.create({
              model: "gpt-4o-mini",
              messages,
              store: true,
              tools: [workingDayTool],
            });
            responseText =
              completionToolCall.choices[0]?.message.content ??
              "CatGPT cannot generate response following tool call. Please try again.";
          }
        } else if (choice.finish_reason === "stop") {
          responseText =
            choice.message.content ?? "CatGPT has nothing to say...";
        }
      }
      return { role: "system", content: responseText };
    }),
});
