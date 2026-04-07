import Typesense from "typesense";

export const client = new Typesense.Client({
    nodes: [{
        host: 'localhost',
        port: 8108,
        protocol: 'http'
    }],
    apiKey: 'BSPD3ZRXU985', // ключ из настроек Docker
});

export const check = async()=>{
    return await client.collections('faq_search').retrieve()

}

const schema :any = {
    'name': 'faq_search',
    'fields': [
        { name: 'id', type: 'string' },
        { name: 'question', type: 'string' },
        { name: 'answer', type: 'string' },
    ],
};

// @ts-ignore
export async function setupSchema() {
    try {
        await client.collections('faq_search').delete();
    } catch (e) {
        throw e;
    }
    await client.collections().create(schema);
}
