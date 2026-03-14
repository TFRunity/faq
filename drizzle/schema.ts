import {pgTable, text, bigint, serial, varchar} from 'drizzle-orm/pg-core'
import {InferInsertModel, InferSelectModel} from "drizzle-orm";

export const faqs = pgTable('faq',{
    id: serial().primaryKey(),
    question: varchar({length:300}),
    answer: varchar({length:300})
})

export type dbFaq = InferSelectModel<typeof faqs>
export type dbFaqToInsert = InferInsertModel<typeof faqs>