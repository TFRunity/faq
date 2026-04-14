import Typesense from "typesense";

export const client = new Typesense.Client({
    nodes: [{
        host: 'localhost',
        port: 8108,
        protocol: 'http'
    }],
    apiKey: process.env.NEXT_PUBLIC_TYPESENSE_SEARCH_ONLY_API_KEY!, // ключ из настроек Docker
});

const schema :any = {
    'name': 'faq_search',
    'fields': [
        { name: 'id', type: 'string', locale: "ru" },
        { name: 'question', type: 'string', locale: "ru" },
        { name: 'answer', type: 'string', locale: "ru" },
    ],
};

// @ts-ignore
export async function setupSchema() {
    try {
        await client.collections('faq_search').delete();
    } catch (e) {

    }
    await client.collections().create(schema);
}
