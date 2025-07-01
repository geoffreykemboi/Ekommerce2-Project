import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser, setIsAuthenticated } from "../features/userSlice";
import { API_URL } from "../../config/api";
import { setAuthData, clearAuthData } from "../../utils/auth";

const baseUrl = API_URL;


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
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data.token && data.user) {
                        setAuthData(data.token, data.user);
                        
                        // Update Redux state
                        dispatch(setUser(data.user));
                        dispatch(setIsAuthenticated(true));
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
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data.token && data.user) {
                        setAuthData(data.token, data.user);
                        
                        // Update Redux state
                        dispatch(setUser(data.user));
                        dispatch(setIsAuthenticated(true));
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
                // Clear authentication data
                clearAuthData();
                
                // Reset Redux state
                dispatch(setUser(null));
                dispatch(setIsAuthenticated(false));
            }
        })
    }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApi;