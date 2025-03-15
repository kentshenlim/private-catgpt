import OpenAI from "openai";
import { type ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { z } from "zod";

import {
  type GetWorkingDaysNumParams,
  type Message,
  MessageSchema,
} from "@/lib/schema";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
  workingDayTool,
  calcWorkingDays,
} from "@/server/open-ai-tools/working-day";

const openai = new OpenAI(); // Will read OPENAI_API_KEY automatically

export const openAIRouter = createTRPCRouter({
  chatCompletionPrompt: publicProcedure
    .input(z.array(MessageSchema))
    .output(MessageSchema)
    .mutation(async ({ input }) => {
      const responseText = await getChatCompletionResponseText(input);
      return {
        role: "system",
        content: responseText,
      };
    }),
});

async function getChatCompletionResponseText(input: Message[]) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: input,
    store: true,
    tools: [workingDayTool],
  });

  if (!completion.choices[0]) {
    return "Snap! CatGPT is offline. Please check back later.";
  }

  const choice = completion.choices[0];

  // If first choice is to invoke tool calls
  if (choice.finish_reason === "tool_calls") {
    const toolCallData = choice.message.tool_calls;
    if (!toolCallData?.[0]) {
      return "CatGPT cannot find the tool required to answer your question. Please try again.";
    }
    // 1. Get tool call result
    // 2. Format messages for chat completion
    // 3. Get chat completion response
    const toolCallID = toolCallData[0].id;
    const { name: functionName, arguments: functionArgs } =
      toolCallData[0].function;
    const toolCallResult = calcWorkingDays(
      JSON.parse(functionArgs) as GetWorkingDaysNumParams,
    );
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
    return (
      completionToolCall.choices[0]?.message.content ??
      "CatGPT cannot generate response following tool call. Please try again."
    );
  }

  // If first choice is ordinary chat completion response
  if (choice.finish_reason === "stop") {
    return choice.message.content ?? "CatGPT has nothing to say...";
  }

  // If first choice has unsupported finish_reason
  return "CatGPT encountered unsupported finish_reason. Please try again.";
}
