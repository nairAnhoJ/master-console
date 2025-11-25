import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../../config/config";

const token = localStorage.getItem("token");


export interface UserList {
    id: number;
    id_number: string;
    name: string;
    department_name: string;
    site_name: string;
}

interface userState {
    users: UserList[],
    loading: boolean
}

const initialState: userState = {
    users: [],
    loading: false
}


export const fetchUser = createAsyncThunk('users/fetch', async () => {
    try {
        const response = await config.get('/users');
        return response.data;
    } catch (error: any) {
        console.log(error);
    }
})


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.users = action.payload;
                state.loading = false;
            })
    }
})

export default userSlice.reducer;