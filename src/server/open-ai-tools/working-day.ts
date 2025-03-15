// Documentation: https://platform.openai.com/docs/guides/function-calling
// import { type ChatCompletionTool } from "openai/resources/index.mjs";
import { type z } from "zod";
import { zodFunction } from "openai/helpers/zod.mjs";
import { GetWorkingDaysNumParamsSchema } from "@/lib/schema";

export const workingDayTool = zodFunction({
  name: "get_working_days_num",
  parameters: GetWorkingDaysNumParamsSchema,
  description:
    "Get number of working days (weekdays) until a given end date (inclusive). If start date is not specified explicitly, leave out. If the year is not specified in date, default to 2025.",
});

function calcWorkingDays(data: z.infer<typeof GetWorkingDaysNumParamsSchema>) {
  return 1;
}

// export const workingDayTool: ChatCompletionTool = {
//   type: "function",
//   function: {
//     name: "get_working_days_num",
//     description:
//       "Get number of working days (weekdays) until a given end date (inclusive). If start date is not specified explicitly, leave out. If the year is not specified in date, default to 2025.",
//     strict: true,
//     parameters: {
//       type: "object",
//       properties: {
//         startDate: {
//           type: ["string", "null"], // null means optional
//           description:
//             "ISO string of start date; this day is inclusive in calculation.",
//         },
//         endDate: {
//           type: "string",
//           description:
//             "ISO string of end date; this day is inclusive in calculation.",
//         },
//       },
//       required: ["startDate", "endDate"],
//       additionalProperties: false,
//     },
//   },
// };
