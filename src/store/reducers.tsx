import { combineReducers } from "@reduxjs/toolkit";
import slice from "./app/slice";

export const reducer = combineReducers({
 app: slice
});