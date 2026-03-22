import {pgTable, text, bigint, serial, varchar} from 'drizzle-orm/pg-core'
import {InferInsertModel, InferSelectModel, relations} from "drizzle-orm";

export const categories = pgTable('category',{
    id: serial().primaryKey(),
    title : varchar({length:300})
})

//Ссылаемся на много questions
export const categoriesRelations = relations(categories, ({ many }) => ({
    questions : many(questions)
}))

export const questions = pgTable('question',{
    id: serial().primaryKey(),
    question : varchar({length:300}),
    category_id : bigint({mode: 'number'}).references( () => categories.id, { onDelete : 'set null'}),
    answer_id : bigint({mode: "number"})
})

//Ссылаемся на 1 categories, много answers
export const questionsRelations = relations(questions, ({ one, many }) => ({
    categories : one(categories, {
        fields : [questions.category_id],
        references : [categories.id]
    }),
    answers : many(answers)
}))

export const answers = pgTable('answer',{
    id: serial().primaryKey(),
    answer : varchar({length:300}),
    question_id : bigint({mode: 'number'}).notNull()
})

//Ссылаемся на id у questions
export const answersRelations = relations(answers,({ one }) => ({
    questions : one(questions, {
        fields : [answers.question_id],
        references : [questions.id]
    }),
}))

export type SelectCategory = InferSelectModel<typeof categories>
export type InsertCategory = InferInsertModel<typeof categories>

export type SelectQuestion = InferSelectModel<typeof questions>
export type InsertQuestion = InferInsertModel<typeof questions>

export type SelectAnswer = InferSelectModel<typeof answers>
export type InsertAnswer = InferInsertModel<typeof answers>
