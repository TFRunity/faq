import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";

export const typesenseAdapter = new TypesenseInstantSearchAdapter({
    server:{
        apiKey: process.env.NEXT_PUBLIC_TYPESENSE_SEARCH_ONLY_API_KEY!,
        nodes: [{
            host: "localhost",
            port: 8108,
            protocol: "http"
        }],
    },
    additionalSearchParameters: { query_by: "question,answer" }
})

export const searchClient = typesenseAdapter.searchClient;