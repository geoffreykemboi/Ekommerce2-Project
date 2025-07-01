import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser, setIsAuthenticated } from "../features/userSlice";

const baseUrl = process.env.REACT_APP_API_URL || "/api/v1";


export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({    
        register: builder.mutation({
            query(body) {
                return{
                    url: "/register",
                    method: "POST",
                    body,
                };
            },
            async onQueryStarted(args, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data.token) {
                        localStorage.setItem("token", data.token);
                        localStorage.setItem("user", JSON.stringify(data.user));
                    }
                } catch (error) {
                    // eslint-disable-next-line no-console
                    console.error("Register error:", error);
                }
            }
        }),
        login: builder.mutation({
            query(body) {
                return{
                    url: "/login",
                    method: "POST",
                    body,
                };
            },
            async onQueryStarted(args, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data.token) {
                        localStorage.setItem("token", data.token);
                        localStorage.setItem("user", JSON.stringify(data.user));
                    }
                } catch (error) {
                    // eslint-disable-next-line no-console
                    console.error("Login error:", error);
                }
            }
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "GET",
            }),
            async onQueryStarted(args, { dispatch }) {
                // Remove JWT and user from localStorage
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                // Reset Redux state
                dispatch(setUser(null));
                dispatch(setIsAuthenticated(false));
            }
        })
    }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApi;