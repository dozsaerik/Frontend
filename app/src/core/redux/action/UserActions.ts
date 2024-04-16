import {createAction} from "@reduxjs/toolkit";
import {UserData} from "../reducer/UserReducer";

export const setLoggedInUser = createAction<UserData>('SET_LOGGED_IN_USER');
export const logout = createAction<null>('LOGOUT');