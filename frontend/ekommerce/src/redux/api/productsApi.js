// frontend/src/slices/productApi.js (Final Corrected Version)

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../config/api";

const baseUrl = API_URL;

const baseQueryWithAuth = async (args, api, extraOptions) => {
  const token = localStorage.getItem("token");
  let request = typeof args === "string" ? { url: args } : { ...args };
  request.headers = {
    ...(request.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  const rawBaseQuery = fetchBaseQuery({ baseUrl });
  return rawBaseQuery(request, api, extraOptions);
};

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: baseQueryWithAuth,
    tagTypes: ["Product", "AdminProducts"], // Added 'Product' tag for consistency

    endpoints: (builder) => ({
        getProducts: builder.query({
            // Corrected the query parameter handling for filtering
            query: (params) => ({
                url: "/products",
                params: {
                    page: params.page,
                    keyword: params.keyword,
                    category: params.category,
                    "price[gte]": params.min,
                    "price[lte]": params.max,
                    "ratings[gte]": params.ratings,
                },
            }),
            providesTags: ["Product"],
        }),
        getProductDetails: builder.query({
            query: (id) => `/products/${id}`,
            providesTags: ["Product"],
        }),
        getAdminProducts: builder.query({
            query: () => "/admin/products", // This path is correct for this specific function
            providesTags: ["AdminProducts"],
        }),
        createProduct: builder.mutation({
            query: (body) => ({
                // 👇 THE FIX IS HERE 👇
                url: "/products", // Use the correct RESTful URL
                method: "POST",
                body,
                            }),
            invalidatesTags: ["AdminProducts"],
            }),
        updateProduct: builder.mutation({
            query: ({ id, body }) => ({
                // 👇 THIS LINE IS NOW CORRECT 👇
                url: `/products/${id}`, // Correct path, uses backticks ` and has closing brace }
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Product", "AdminProducts"], // Added AdminProducts tag
        }),
        uploadProductImages: builder.mutation({
            query: ({ id, body }) => ({
                url: `/admin/products/${id}/upload_images`, // Correct path, uses backticks ` and has closing brace }
                method: "POST", // Changed to POST for uploading images
                body,
            }),
            invalidatesTags: ["Product"], 
        }),

        deleteProductImage: builder.mutation({
            query: ({ id, body }) => ({
                url: `/admin/products/${id}/delete_image`, // Correct path, uses backticks ` and has closing brace }
                method: "PUT", // Changed to POST for uploading images
                body,
            }),
            invalidatesTags: ["Product"], 
        }),

        deleteProduct: builder.mutation({
            query(id) {
              return {
                url: `/products/${id}`, // Corrected URL to match the backend route
                method: "DELETE",
              };
            },
            invalidatesTags: ["AdminProducts"],
        }),
    }),
});

export const { 
    useGetProductsQuery, 
    useGetProductDetailsQuery, 
    useGetAdminProductsQuery,
    useDeleteProductMutation,
    useCreateProductMutation,
    useUpdateProductMutation,
    useUploadProductImagesMutation,
    useDeleteProductImageMutation,
} = productApi;