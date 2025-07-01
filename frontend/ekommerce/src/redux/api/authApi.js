import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser, setIsAuthenticated } from "../features/userSlice";
import { API_URL } from "../../config/api";
import { setAuthData, clearAuthData } from "../../utils/auth";
import { toast } from "react-hot-toast";

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
                        
                        // Success message
                        toast.success(`Welcome ${data.user.name}! Registration successful.`);
                    }
                } catch (error) {
                    // Error message will be handled by the component
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
                        
                        // Success message
                        toast.success(`Welcome back, ${data.user.name}! Login successful.`);
                    }
                } catch (error) {
                    // Error message will be handled by the component
                    console.error("Login error:", error);
                }
            }
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "GET",
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    
                    // Clear authentication data
                    clearAuthData();
                    
                    // Reset Redux state
                    dispatch(setUser(null));
                    dispatch(setIsAuthenticated(false));
                    
                    // Success message
                    toast.success("You have been logged out successfully. See you next time!");
                } catch (error) {
                    // Even if the server request fails, clear local data
                    clearAuthData();
                    dispatch(setUser(null));
                    dispatch(setIsAuthenticated(false));
                    
                    toast.success("You have been logged out successfully.");
                    console.error("Logout error:", error);
                }
            }
        })
    }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApi;