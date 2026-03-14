import {z} from "zod"

export const faqSchema = z.object({
    id : z.number(),
    question : z.string().nullable(),
    answer : z.string().nullable(),
})

export type Faq = z.infer<typeof faqSchema>

export const insertFaqSchema = faqSchema.pick({
    question : true,
    answer : true,
})

export type FaqInsert = z.infer<typeof insertFaqSchema>