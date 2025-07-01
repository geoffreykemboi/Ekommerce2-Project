import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser, setIsAuthenticated } from "../../redux/features/userSlice";
import { toast } from "react-hot-toast";
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

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["User", "AdminUser"],
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => `/me`,
      transformResponse: (result) => result.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
          dispatch(setIsAuthenticated(true));
        } catch (error) {
          // Handle JWT token errors by clearing auth data
          const status = error?.error?.status;
          const message = error?.error?.data?.message || error?.data?.message;
          
          if (status === 401 || message?.includes("JSON Web Token")) {
            // Clear invalid tokens from localStorage
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            
            // Clear Redux state
            dispatch(setUser(null));
            dispatch(setIsAuthenticated(false));
            
            // Only show error if it's not just "not logged in"
            if (message && !message.includes("Login first")) {
              toast.error(`Authentication error: ${message}`);
            }
          } else if (status !== 401 && status !== "FETCH_ERROR") {
            // Show other non-auth errors
            toast.error(`Failed to fetch user data: ${message || "Unknown error"}`);
          }
          
          // eslint-disable-next-line no-console
          console.error("/me error:", error);
        }
      },
      providesTags: ["User"],
    }),

    updateProfile: builder.mutation({
      query(body) {
        return {
          url: "/me/update",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["User"],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data.user));
        } catch (error) {
          console.error("Update profile failed:", error);
        }
      },
    }),

    getAdminUsers: builder.query({
      query: () => `/admin/users`,
      providesTags: ["AdminUser"],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/admin/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdminUser"],
    }),
  }),
});

export const {
  useGetMeQuery,
  useUpdateProfileMutation,
  useGetAdminUsersQuery,
  useDeleteUserMutation,
} = userApi;
