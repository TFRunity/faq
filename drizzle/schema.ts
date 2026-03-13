import {pgTable, text, bigint, varchar} from 'drizzle-orm/pg-core'

export const faqs = pgTable('faq',{
    id: bigint({mode: 'bigint'}).primaryKey().generatedAlwaysAsIdentity(),
    question: varchar({length:300}),
    answer: varchar({length:300})
})