import { z } from "zod";
import { requiredNumber, requiredString } from "../util/util";

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
