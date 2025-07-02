import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false
}

export const userSlice = createSlice({
    initialState,
    name: "auth", // Changed from 'useSlice' to 'auth'
    reducers:{
        setUser(state, action) {
            state.user = action.payload;
        },
        setIsAuthenticated(state, action) {
            state.isAuthenticated = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
    },
})

export default userSlice.reducer;


export const { setIsAuthenticated, setUser, setLoading } = userSlice.actions