// import { Client } from 'pg';
// import Typesense from 'typesense';
//
// // 1. Настройка подключения к Postgres
// const pgClient = new Client({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'faq',
//     password: 'BSPD3ZRXU985',
//     port: 5432,
// });
//
// // 2. Настройка клиента Typesense (ваш Docker)
// const typesense = new Typesense.Client({
//     nodes: [{
//         host: 'localhost',
//         port: 8108 ,
//         protocol: 'http'
//     }],
//     apiKey: 'xyz123',
//     connectionTimeoutSeconds: 10
// });
//
// export default async function sync() {
//     // если клиент уже подключен
//     try {
//         await pgClient.connect();
//     } catch (e) {
//         // Игнорируем, если уже в процессе
//     }
//
//     try {
//         console.log('начало чтения из пгскл');
//
//         const res = await pgClient.query(`
//             SELECT
//                 q.id as id,
//                 q.title as question_text,
//                 a.content as answer_text,
//                 c.name as category_name
//             FROM questions q
//             LEFT JOIN answers a ON q.id = a.question_id
//             LEFT JOIN categories c ON q.category_id = c.id
//         `);
//
//         // Преобразование в формат Typesense
//         const documents = res.rows.map(row => ({
//             id: row.id.toString(),
//             question: row.question_text || "",
//             answer: row.answer_text || "",
//             category: row.category_name || "Без категории"
//         }));
//
//         if (documents.length === 0) {
//             console.log('В базе данных PostgreSQL нет записей для синхронизации.');
//             return;
//         }
//
//         console.log(`Синхронизация ${documents.length} записей в Typesense...`);
//
//         const importResults = await typesense
//             .collections('faq_search')
//             .documents()
//             .import(documents, { action: 'upsert' });
//
//         // Проверка на ошибки в результатах импорта
//         const failedItems = importResults.filter((item: any) => item.success === false);
//         if (failedItems.length > 0) {
//             console.error('Часть записей не импортирована:', failedItems);
//         } else {
//             console.log('Синхронизация завершена успешно');
//         }
//
//     } catch (err) {
//         console.error('Ошибка синхронизации:', err);
//     } finally {
//         await pgClient.end();
//     }
// }
//
// // Позволяет запустить скрипт напрямую командой: npx ts-node typesenseSyncScript.ts
// if (require.main === module) {
//     sync();
// }
//
