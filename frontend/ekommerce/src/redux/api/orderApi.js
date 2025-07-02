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

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Order", "AdminOrders"],
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
      providesTags: (result, error, id) => [{ type: "Order", id }],
    }),

    updateOrder: builder.mutation({
      query: ({ id, body }) => {
        return {
          url: `/admin/orders/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Order", id }],
    }),

    deleteOrder: builder.mutation({
      query: (id) => {
        return {
          url: `/admin/orders/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AdminOrders"],
    }),

    getDashboardSales: builder.query({
      query: ({ startDate, endDate }) =>
        `/admin/get_sales?startDate=${startDate}&endDate=${endDate}`,
    }),

    getAdminOrders: builder.query({
      query: () => `/admin/orders`,
      providesTags: ['AdminOrders'],
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
