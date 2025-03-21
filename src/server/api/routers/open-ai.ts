import OpenAI from "openai";
import { type ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { z } from "zod";

import {
  GetWorkingDaysNumParamsSchema,
  type Message,
  MessageSchema,
} from "@/lib/schema";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  calcWorkingDays,
  workingDayTool,
} from "@/server/open-ai-tools/working-day";

const openai = new OpenAI(); // Will read OPENAI_API_KEY automatically

const tools = [workingDayTool];

export const openAIRouter = createTRPCRouter({
  chatCompletionPrompt: protectedProcedure
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
    tools,
  });

  if (!completion.choices[0]) {
    return "Snap! CatGPT is offline. Please check back later.";
  }

  const choice = completion.choices[0];

  // If first choice is to invoke tool calls
  if (choice.finish_reason === "tool_calls") {
    const toolCallData = choice.message.tool_calls;
    if (!toolCallData?.[0]) {
      return "CatGPT cannot find the tool calls data required to answer your question. Please try again.";
    }
    // 1. Get tool call result
    // 2. Check function name and type of params interpreted by OpenAI
    // 3. Format messages for chat completion
    // 4. Get chat completion response
    const toolCallID = toolCallData[0].id;
    const { name: functionName, arguments: functionArgs } =
      toolCallData[0].function;
    if (functionName !== "get_working_days_num")
      return "CatGPT cannot find the tool required to answer your question. Please try again.";
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const functionArgsObj = JSON.parse(functionArgs); // We don't know the parsing result of OpenAI, cannot type here
    const parsedRes = GetWorkingDaysNumParamsSchema.safeParse(functionArgsObj);
    if (!parsedRes.success)
      return "The parameters parsed by CatGPT are inconsistent with the tool being used. Please specify the start and end dates explicitly for more accurate parsing.";
    const toolCallResult = calcWorkingDays(parsedRes.data);
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
      tools,
    });
    return (
      completionToolCall.choices[0]?.message.content ??
      "CatGPT cannot generate response correctly following tool call. Please try again with more specific start and end date."
    );
  }

  // If first choice is ordinary chat completion response
  if (choice.finish_reason === "stop") {
    return choice.message.content ?? "CatGPT has nothing to say...";
  }

  // If first choice has unsupported finish_reason
  return "CatGPT encountered unsupported finish_reason. Please try again.";
}
