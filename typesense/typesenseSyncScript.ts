import { Client } from 'pg';
import Typesense from 'typesense';
import {client} from '@/typesense/typesenseSchema'

// 1. Настройка подключения к Postgres
const pgClient = new Client({
    user: 'postgres',
    host: 'POSTGRES',
    database: 'faq',
    password: 'BSPD3ZRXU985',
    port: 5432,
});

export default async function sync() {
    // если клиент уже подключен
    await pgClient.connect();

    try {
        console.log('начало чтения из пгскл');

        const res = await pgClient.query(`
            SELECT
                q.id as id,
                q.question as question,
                a.answer as answer,
            FROM questions q
            INNER JOIN answers a ON a.id = q.answer_id 
        `);

        // Преобразование в формат Typesense
        const documents = res.rows.map(row => ({
            id: row.id.toString(),
            question: row.question || "",
            answer: row.answer || "",
        }));

        if (documents.length === 0) {
           return;
        }

        const importResults = await client
            .collections('faq_search')
            .documents()
            .import(documents, { action: 'upsert' });


    } catch (err) {
       throw err
    } finally {
        await pgClient.end();
    }
}
