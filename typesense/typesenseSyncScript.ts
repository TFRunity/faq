import { Client } from 'pg';
import Typesense from 'typesense';
import {client, setupSchema} from '@/typesense/typesenseSchema'
import {db} from "@/drizzle";
import {answers, questions} from "@/drizzle/schema";
import {eq} from "drizzle-orm";

// 1. Настройка подключения к Postgres
const pgClient = db!

export default async function sync() {
    try {
        await setupSchema()

        const res = await pgClient
            .select({
                id: questions.id,
                question: questions.question,
                answer: answers.answer,
            })
            .from(questions)
            .innerJoin(answers, eq(questions.id, answers.question_id))

        // Преобразование в формат Typesense
        const documents = res.map(row => ({
            id: row.id.toString(),
            question: row.question || "",
            answer: row.answer || "",
        }));

   const a = await client
            .collections('faq_search')
            .documents()
            .import(documents, { action: 'upsert' });
    } catch (err) {
       throw err
    }
}

