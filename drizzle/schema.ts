import {pgTable, text, bigint, serial, varchar} from 'drizzle-orm/pg-core'
import {InferInsertModel, InferSelectModel, relations} from "drizzle-orm";

export const categories = pgTable('categories',{
    id: serial().primaryKey(),
    title : varchar({length:300}),
    group_id : bigint({mode: 'number'})
})

//Ссылаемся на много questions
// export const categoriesRelations = relations(categories, ({ many }) => ({
//     questions : many(questions)
// }))

export const questions = pgTable('questions',{
    id: serial().primaryKey(),
    question : text(),
    category_id : bigint({mode: 'number'}),
    answer_id : bigint({mode: "number"})
})

// //Ссылаемся на 1 categories, много answers
// export const questionsRelations = relations(questions, ({ one, many }) => ({
//     categories : one(categories, {
//         fields : [questions.category_id],
//         references : [categories.id]
//     }),
//     answers : many(answers)
// }))

export const answers = pgTable('answers',{
    id: serial().primaryKey(),
    answer : text(),
    question_id : bigint({mode: 'number'}).notNull()
})

//Ссылаемся на id у questions
// export const answersRelations = relations(answers,({ one }) => ({
//     questions : one(questions, {
//         fields : [answers.question_id],
//         references : [questions.id]
//     }),
// }))

export const groups = pgTable('groups',{
    id: serial().primaryKey(),
    image_src: text(),
    title: text()
})

export type SelectCategory = InferSelectModel<typeof categories>

export type SelectQuestion = InferSelectModel<typeof questions>

export type SelectAnswer = InferSelectModel<typeof answers>

export type SelectGroup = InferSelectModel<typeof groups>