import { answers } from "@/drizzle/schema";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";
import z from "zod";

export const selectAnswerSchema = createSelectSchema(answers)
export const insertAnswerSchema = createInsertSchema(answers).pick({ answer : true, question_id : true })

export type Answer = z.infer<typeof selectAnswerSchema>
export type InsertAnswer = z.infer<typeof insertAnswerSchema>