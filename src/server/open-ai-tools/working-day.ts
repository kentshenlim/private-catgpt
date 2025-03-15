// Documentation: https://platform.openai.com/docs/guides/function-calling
import { addDays, differenceInBusinessDays, startOfToday } from "date-fns";
import { zodFunction } from "openai/helpers/zod.mjs";

import {
  type GetWorkingDaysNumParams,
  GetWorkingDaysNumParamsSchema,
} from "@/lib/schema";

export const workingDayTool = zodFunction({
  name: "get_working_days_num",
  parameters: GetWorkingDaysNumParamsSchema,
  description:
    "Get the number of working days until the specified end date (inclusive). If the start date is omitted or vaguely stated (e.g., 'today' or 'tomorrow'), set as null. If no year is provided, default to 2025.",
});

export function calcWorkingDays(data: GetWorkingDaysNumParams) {
  const { startDate: startDateString, endDate: endDateString } = data;
  const startDate = startDateString
    ? new Date(startDateString)
    : startOfToday();
  const endDate = addDays(new Date(endDateString), 1); // End day inclusive
  if (isInvalidDateObject(startDate) || isInvalidDateObject(endDate))
    return "CatGPT might have misinterpreted start and end dates. Please enter them explicitly for better accuracy.";
  return `
  The start date is ${startDate.toString()}.
  The end date is ${endDate.toString()}.
  The number of working days is ${differenceInBusinessDays(endDate, startDate)}.
  Please specify clearly the start date used, the end date, the number of working days, and that the tool named \`get_working_days_num\` has been used to calculate the value.
  `;
}

function isInvalidDateObject(date: Date) {
  return isNaN(date.getTime());
}
