import {createAsyncThunk, createReducer} from "@reduxjs/toolkit";
import {Roles} from "../../enum/Roles";
import api from "../../api/Api";

export interface UserData {
    email: string;
    roles: Roles[];
}

export interface UserState {
    data: UserData;
    loading: boolean;
}

const initialState: UserState = {
    data: {
        email: '',
        roles: []
    },
    loading: false
}

export const fetchUserData = createAsyncThunk(
    'user/fetchUserData',
    async () => {
        const response = await api.get('/me');
        return response.data;
    }
);

const userReducer = createReducer(initialState, (builder) => {

    builder
        .addCase(fetchUserData.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchUserData.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
    // .addCase(setLoggedInUser, (state, action) => {
    //     state.data = action.payload;
    // })
    // .addCase(logout, (state, action) => {
    //     state.data = {
    //         email: '',
    //         roles: []
    //     };
    // })
})
export default userReducer;