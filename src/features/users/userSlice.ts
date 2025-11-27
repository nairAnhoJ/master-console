import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../../config/config";

export interface UserList {
    id: number;
    id_number: string;
    name: string;
    department_name: string;
    site_name: string;
}

interface User {
    id_number: string;
    name: string;
    department_id: number | null;
    site_id: number | null;
    email: string;
    phone: string;
    allowed_app: string[];
    signature: File | null;
}

interface Errors {
    path: string;
    msg: string;
}

interface userState {
    users: UserList[],
    loading: boolean,
    success: string,
    errors: Errors[]
}

const initialState: userState = {
    users: [],
    loading: false,
    success: '',
    errors: []
}


export const fetchUser = createAsyncThunk('users/fetch', async () => {
    try {
        const response = await config.get('/users');
        return response.data;
    } catch (error: any) {
        console.log(error);
    }
})


export const createUser = createAsyncThunk<any, User, { rejectValue: Errors[] }>('users/create', async (user, {rejectWithValue}) => {
    try {
        const data = new FormData();
        data.append('id_number', user.id_number);
        data.append('name', user.name);
        data.append('department_id', String(user.department_id));
        data.append('site_id', String(user.site_id));
        data.append('email', user.email);
        data.append('phone', user.phone);
        data.append('allowed_app', user.allowed_app.join(';'));
        if(user.signature){
            data.append('signature', user.signature)
        }

        const response = await config.post('/users/create', data, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response;
    } catch (error: any) {
        return rejectWithValue(error.response.data.errors);
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

            .addCase(createUser.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                console.log(action.payload);
                state.loading = false;
            })
            .addCase(createUser.rejected, (state, action) => {
                console.log(action.payload);
                state.errors = action.payload ? action.payload : [];
            })
    }
})

export default userSlice.reducer;