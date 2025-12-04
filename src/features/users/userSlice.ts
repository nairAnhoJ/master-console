import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../../config/config";
import { addNotif } from "../notification/notificationSlice";

export interface UserList {
    id: number;
    id_number: string;
    name: string;
    department_name: string;
    site_name: string;
}

export interface Notification {
    type: "success" | "warning" | "error" | null;
    msg: string | null;
}

interface User {
    id_number: string;
    name: string;
    department_id: number | null;
    site_id: number | null;
    email: string;
    phone: string;
    allowed_app: string[];
    role: string;
    mrf_area_id: number[];
    signature: File | null;
}

interface Errors {
    path: string;
    msg: string;
}

interface userState {
    users: UserList[],
    // user: UserList,
    loading: boolean,
    notification: Notification | null,
    errors: Errors[],
}

const initialState: userState = {
    users: [],
    // user: {
    //     id: 0;
    // },
    loading: false,
    notification: null,
    errors: [],
}


export const fetchUsers = createAsyncThunk('users/fetch', async (search: string = "") => {
    try {
        const response = await config.get(`/users?search=${search}`);
        return response.data;
    } catch (error: any) {
        console.log(error);
    }
})

export const fetchUserById = createAsyncThunk('users/fetch-by-id', async(id: number) => {
    try {
        const response = await config.get(`/users/${id}`)
        return response.data;
    } catch (error: any) {
        console.log(error)
    }
});


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
        data.append('role', user.role);
        data.append('mrf_area_ids', user.mrf_area_id.join(';'));
        if(user.signature){
            data.append('signature', user.signature)
        }

        const response = await config.post('/users/create', data, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.errors);
    }
})


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearNotification: (state) => {
            state.notification = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Users
            .addCase(fetchUsers.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.loading = false;
            })

            // Fetch User By ID
            .addCase(fetchUserById.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                console.log(action.payload);
                // state.user = action.payload;
                state.loading = false;
            })

            // Create User
            .addCase(createUser.pending, (state, action) => {
                state.errors = [];
                state.loading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.notification = {
                    type: "success", 
                    msg: "User has been successfully created."
                }
            })
            .addCase(createUser.rejected, (state, action) => {
                console.log(action.payload);
                state.errors = action.payload ? action.payload : [];
            })
    }
})

export const { clearNotification } = userSlice.actions;
export default userSlice.reducer;