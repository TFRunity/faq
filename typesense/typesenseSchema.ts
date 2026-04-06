// import Typesense from "typesense";
//
// export const client = new Typesense.Client({
//     nodes: [{
//         host: 'TYPESENSE',
//         port: 8108,
//         protocol: 'http'
//     }],
//     apiKey: 'xyz123', // ключ из настроек Docker
// });
//
//
// const schema :any = {
//     'name': 'faq_search', // Это имя вы укажете в React в параметре indexName
//     'fields': [
//         { name: 'id', type: 'string' },
//         { name: 'question', type: 'string' },
//         { name: 'answer', type: 'string' },
//         // Категория (facet: true позволит сделать фильтры/рубрики в React)
//         { name: 'category', type: 'string', facet: true },
//     ],
//     'default_sorting_field': 'id'
// };
//
// export async function setupSchema() {
//     try {
//         console.log('--- Проверка коллекции ---');
//
//         // Пытаемся удалить, если уже существует
//         try {
//             await client.collections('faq_search').delete();
//             console.log('Старая коллекция удалена.');
//         } catch (e) {
//             console.log('Коллекция не существовала, создаем новую.');
//         }
//
//         console.log('Создание схемы faq_search...');
//         await client.collections().create(schema);
//
//         console.log('Схема создана успешно.');
//     } catch (error) {
//         console.error('Ошибка при настройке схемы:', error);
//     }
// }
//
// // Если вы запускаете этот файл напрямую через node/ts-node
// if (require.main === module) {
//     setupSchema();
// }