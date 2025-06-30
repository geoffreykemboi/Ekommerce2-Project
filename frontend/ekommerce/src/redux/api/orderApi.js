import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  tagTypes: ["Order", "AdminOrders"], // ✅ add this
  endpoints: (builder) => ({
    createNewOrder: builder.mutation({
      query: (orderData) => ({
        url: "/order/new",
        method: "POST",
        body: orderData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Order"],
    }),

    myOrders: builder.query({
      query: () => `/me/orders`,
    }),

    orderDetails: builder.query({
      query: (id) => `/orders/${id}`,
      providesTags: (result, error, id) => [{ type: "Order", id }], // ✅ provides tag
    }),

    updateOrder: builder.mutation({
      query: ({ id, body }) => {
        return {
          url: `/admin/order/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Order", id }], // ✅ invalidates tag
    }),

    deleteOrder: builder.mutation({
      query: (id) => {
        return {
          url: `/admin/order/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AdminOrders"], // ✅ invalidates tag
    }),

    getDashboardSales: builder.query({
      query: ({ startDate, endDate }) =>
        `/admin/get_sales?startDate=${startDate}&endDate=${endDate}`,
    }),

    getAdminOrders: builder.query({
      query: () => `/admin/orders`,
      providesTags: ['AdminOrders'], // ✅ fixed typo
    }),
  }),
});

export const {
  useCreateNewOrderMutation,
  useMyOrdersQuery,
  useOrderDetailsQuery,
  useUpdateOrderMutation,
  useLazyGetDashboardSalesQuery,
  useGetAdminOrdersQuery,
  useDeleteOrderMutation,
} = orderApi;
