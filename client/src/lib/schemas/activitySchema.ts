import { z } from "zod";

const preprocessString = (val: unknown) =>
    val === undefined || val === null ? "" : val;

const preprocessNumber = (val: unknown) =>
    val === "" || val === undefined || val === null ? NaN : val;

const requiredString = (fieldName: string, isRequired = true) =>
    z.preprocess(
        preprocessString,
        isRequired
            ? z.string().min(1, { message: `${fieldName} is required` })
            : z.string().optional()
    );

const requiredNumber = (fieldName: string) =>
    z.preprocess(
        preprocessNumber,
        z.number().refine((val) => !isNaN(val), {
            message: `${fieldName} is required`,
        })
    );

export const activitySchema = z.object({
    title: requiredString("Title"),
    description: requiredString("Description"),
    category: requiredString("Category"),
    date: z.coerce.date({ message: "Date is required" }),
    location: z.object({
        venue: requiredString("Venue"),
        city: requiredString("City", false),
        latitude: requiredNumber("Latitude"),
        longitude: requiredNumber("Longitude"),
    }),
});

export type ActivitySchema = z.infer<typeof activitySchema>;
