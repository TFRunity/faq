import { groups } from "@/drizzle/schema";
import { createSelectSchema } from "drizzle-zod";
import z from "zod";

export const selectGroupSchema = createSelectSchema(groups)

export type Group = z.infer<typeof selectGroupSchema>