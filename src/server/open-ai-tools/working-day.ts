// Documentation: https://platform.openai.com/docs/guides/function-calling
import { zodFunction } from "openai/helpers/zod.mjs";
import { differenceInBusinessDays, startOfToday, addDays } from "date-fns";

import {
  GetWorkingDaysNumParamsSchema,
  type GetWorkingDaysNumParams,
} from "@/lib/schema";

export const workingDayTool = zodFunction({
  name: "get_working_days_num",
  parameters: GetWorkingDaysNumParamsSchema,
  description:
    "Get number of working days (weekdays) until a given end date (inclusive). If start date is not specified explicitly, leave out. If the year is not specified in date, default to 2025.",
});

export function calcWorkingDays(data: GetWorkingDaysNumParams) {
  const { startDate: startDateString, endDate: endDateString } = data;
  const startDate = startDateString
    ? new Date(startDateString)
    : startOfToday();
  const endDate = addDays(new Date(endDateString), 1); // End day inclusive
  if (isInvalidDateObject(startDate) || isInvalidDateObject(endDate)) return -1;
  return differenceInBusinessDays(endDate, startDate);
}

function isInvalidDateObject(date: Date) {
  return isNaN(date.getTime());
}
