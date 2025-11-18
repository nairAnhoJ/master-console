import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
// import axios from "axios";

interface LoginPayload {
    id_number: string;
    password: string;
}

export const loginUser = createAsyncThunk('auth/login', async(data: LoginPayload, thunkAPI) => {
    try {
        return { token: 'kln3456bj2346jk3467jkn;hbk;2346bj', user: 'John Arian Malondras' };
    } catch (error) {
        
    }
})

interface AuthState {
    user: any | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
    loading: false,
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state){

        }
    },
    extraReducers(builder) {builder
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            console.log(action.payload);
            // state.user = action.payload.user;
            // state.token = action.payload.token;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = null;
        })
    },
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;