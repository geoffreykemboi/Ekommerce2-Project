import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => "/products", // Fixed incorrect key 'url' to 'query'
        }),
    }),
});

export const { useGetProductsQuery } = productApi;


