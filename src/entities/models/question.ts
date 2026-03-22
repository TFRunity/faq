import { questions } from "@/drizzle/schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import z from 'zod';

export const selectQuestionSchema = createSelectSchema(questions)
export const insertQuestionSchema = createInsertSchema(questions).pick({ question : true })

export type Question = z.infer<typeof selectQuestionSchema>
export type InsertQuestion = z.infer<typeof insertQuestionSchema>