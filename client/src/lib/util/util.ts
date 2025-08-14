import { format, type DateArg } from "date-fns";
import z from "zod";

export function formatDate(date: DateArg<Date>) {
    return format(date, "dd MMM yyyy h:mm a");
}

export const preprocessString = (val: unknown) =>
    val === undefined || val === null ? "" : val;

export const preprocessNumber = (val: unknown) =>
    val === "" || val === undefined || val === null ? NaN : val;

export const requiredString = (fieldName: string, isRequired = true) =>
    z.preprocess(
        preprocessString,
        isRequired
            ? z.string().min(1, { message: `${fieldName} is required` })
            : z.string().optional()
    );

export const requiredNumber = (fieldName: string) =>
    z.preprocess(
        preprocessNumber,
        z.coerce.number().refine((val) => !isNaN(val), {
            message: `${fieldName} is required`,
        })
    );
