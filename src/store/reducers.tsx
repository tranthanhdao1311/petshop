import { combineReducers } from "@reduxjs/toolkit";
import slice from "./app/slice";
import auth from "./app/auth";

export const reducer = combineReducers({
    app: slice,
    auth: auth
});