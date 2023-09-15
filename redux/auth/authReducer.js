import { createSlice } from "@reduxjs/toolkit";

const state = {
    userId: null,
    displayName: null,
    email: null,
    isAuth: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: state,
    reducers: {
        updateProfileUser: (state, {payload}) => ({
            ...state,
            userId: payload.userId,
            displayName: payload.displayName,
            email: payload.email,
        }),
        authStateChangeUser: (state, {payload}) => ({
            ...state,
            isAuth: payload.isAuth,
        }),
        authSignOutUser: () => state,
    }
})