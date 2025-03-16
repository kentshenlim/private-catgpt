import { z } from "zod";

export const MessageSchema = z.object({
  role: z.enum(["user", "system"]),
  content: z.string(),
});

export type Message = z.infer<typeof MessageSchema>;

export const GetWorkingDaysNumParamsSchema = z.object({
  startDate: z
    .string()
    .nullable() // Means optional as understood by OpenAI tool_call
    .describe(
      "ISO string of start date; this day is inclusive in calculation.",
    ),
  endDate: z
    .string()
    .describe("ISO string of end date; this day is inclusive in calculation."),
});

export type GetWorkingDaysNumParams = z.infer<
  typeof GetWorkingDaysNumParamsSchema
>;
