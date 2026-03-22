import { categories } from "@/drizzle/schema";
import { createSelectSchema, createInsertSchema } from 'drizzle-zod'
import z from "zod"

export const selectCategorySchema = createSelectSchema(categories)
export const insertCategorySchema = createInsertSchema(categories).pick({ title : true })

export type Category = z.infer<typeof selectCategorySchema>
export type InsertCategory = z.infer<typeof insertCategorySchema>


