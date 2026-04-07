import Typesense from "typesense";

export const client = new Typesense.Client({
    nodes: [{
        host: 'TYPESENSE',
        port: 8108,
        protocol: 'http'
    }],
    apiKey: 'BSPD3ZRXU985', // ключ из настроек Docker
});


const schema :any = {
    'name': 'faq_search', // Это имя вы укажете в React в параметре indexName
    'fields': [
        { name: 'id', type: 'string' },
        { name: 'question', type: 'string' },
        { name: 'answer', type: 'string' },
    ],
    'default_sorting_field': 'id'
};

export async function setupSchema() {
    try {

        // // Пытаемся удалить, если уже существует
        // try {
        //     await client.collections('faq_search').delete();
        //     console.log('Старая коллекция удалена.');
        // } catch (e) {
        //     console.log('Коллекция не существовала, создаем новую.');
        // }

        await client.collections().create(schema);

    } catch (error) {
        throw error
    }
}
