import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";

export const typesenseAdapter = new TypesenseInstantSearchAdapter({
    server:{
        apiKey: "BSPD3ZRXU985",
        nodes: [{
            host: "localhost",
            port: 8108,
            protocol: "http"
        }],
    },
    additionalSearchParameters: { query_by: "question,answer" }
})

export const searchClient = typesenseAdapter.searchClient;