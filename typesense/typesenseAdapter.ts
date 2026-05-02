import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";
import Typesense from "typesense";

export const typesenseAdapter = new TypesenseInstantSearchAdapter({
    server:{
        apiKey: process.env.NEXT_PUBLIC_TYPESENSE_SEARCH_ONLY_API_KEY!,
        nodes: [{
            host: "localhost",
            port: Number(process.env.NEXT_PUBLIC_TYPESENSE_PORT!),
            protocol: process.env.NEXT_PUBLIC_TYPESENSE_PROTOCOL!
        }],
        connectionTimeoutSeconds: 2
    },
    additionalSearchParameters: { query_by: "question,answer" },
})

export const client = new Typesense.Client({
    nodes: [{
        host: process.env.NEXT_PUBLIC_TYPESENSE_HOST!,
        port: Number(process.env.NEXT_PUBLIC_TYPESENSE_PORT!),
        protocol: process.env.NEXT_PUBLIC_TYPESENSE_PROTOCOL!
    }],
    apiKey: process.env.NEXT_PUBLIC_TYPESENSE_SEARCH_ONLY_API_KEY!, // ключ из настроек Docker
    connectionTimeoutSeconds: 2
});

export const searchClient = typesenseAdapter.searchClient;