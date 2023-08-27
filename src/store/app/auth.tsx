import { createSlice } from "@reduxjs/toolkit";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase-config";
interface AppState {
    user: object,
    logout: boolean
}


const initialState: AppState = {
    user: {},
    logout: false
};
const newsSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state: AppState, { payload }) => ({
            ...state,
            user: payload,
        }),
        setLogout: (state: AppState, { payload }) => ({
            ...state,
            logout: payload,
        }),
    },
});
export const {
    setUser,setLogout
} = newsSlice.actions;

export default newsSlice.reducer;
