import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../../config/config";

export interface UserList {
    id: number;
    id_number: string;
    name: string;
    department_name: string;
    site_name: string;
    is_active: number;
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

interface SelectedUser {
    id: number;
    id_number: string;
    name: string;
    department_id: number;
    site_id: number;
    email: string;
    phone: string;
    allowed_app: string[];
    role: string;
    mrf_area_id: number[];
    signature: File | string | null;
}

interface Errors {
    path: string;
    msg: string;
}

interface userState {
    users: UserList[],
    user: SelectedUser,
    loading: boolean,
    notification: Notification | null,
    errors: Errors[],
}

const initialState: userState = {
    users: [],
    user: {
        id: 0,
        id_number: '',
        name: '',
        department_id: 0,
        site_id: 0,
        email: '',
        phone: '',
        allowed_app: [],
        role: '',
        mrf_area_id: [],
        signature: '',
    },
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
        const response = await config.get(`/users/${id}`);
        const allowed_app = (response.data.allowed_app).split(';')

        let signaturePath = '';
        let userRole = '';
        let areaArray: number[] = [];
        if(allowed_app.includes('mrf')){
            const signature = await config.get(`/user-signature/${id}`);
            signaturePath = signature?.data.path;

            const role = await config.get(`/mrf/user-role/${id}`);
            if(role.data.length > 0){
                userRole = role.data[0].role;
            }
            (role.data as {area_id: number}[]).map((erole) => areaArray.push(erole.area_id))
        }

        const userData: SelectedUser = {
            id: response.data.id,
            id_number: response.data.id_number,
            name: response.data.name,
            department_id: response.data.department_id,
            site_id: response.data.site_id,
            email: response.data.email,
            phone: response.data.phone,
            allowed_app: allowed_app,
            role: userRole,
            mrf_area_id: areaArray,
            signature: signaturePath,
        }

        return userData as SelectedUser;
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

export const updateUser = createAsyncThunk<any, SelectedUser, { rejectValue: Errors[] }>('users/update', async(user, {rejectWithValue}) => {
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
        console.log(data);

        const response = await config.put(`/users/update/${user.id}`, data, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    } catch (error: any) {
        console.log(error);
        return rejectWithValue(error.response.data.errors);
    }
})

export const resetUser = createAsyncThunk<any, number, { rejectValue: Errors[] }>('users/reset', async(id, {rejectWithValue}) => {
    try {
        const response = await config.patch(`/users/reset/${id}`, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    } catch (error: any) {
        console.log(error);
        return rejectWithValue(error.response.data.errors);
    }
})

export const deactivateUser = createAsyncThunk<any, number, { rejectValue: Errors[] }>('users/deactivate', async(id, {rejectWithValue}) => {
    try {
        const response = await config.patch(`/users/deactivate/${id}`, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    } catch (error: any) {
        console.log(error);
        return rejectWithValue(error.response.data.errors);
    }
})

export const reactivateUser = createAsyncThunk<any, number, { rejectValue: Errors[] }>('users/reactivate', async(id, {rejectWithValue}) => {
    try {
        const response = await config.patch(`/users/reactivate/${id}`, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    } catch (error: any) {
        console.log(error);
        return rejectWithValue(error.response.data.errors);
    }
})

export const deleteUser = createAsyncThunk<any, number, { rejectValue: Errors[] }>('users/delete', async(id, {rejectWithValue}) => {
    try {
        const response = await config.patch(`/users/delete/${id}`, {
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
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.loading = false;
            })

            // Fetch User By ID
            .addCase(fetchUserById.pending, (state,) => {
                state.loading = true;
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                if(action.payload){state.user = action.payload};
                state.loading = false;
                console.log(state.user);
            })

            // Create User
            .addCase(createUser.pending, (state) => {
                state.errors = [];
                state.loading = true;
            })
            .addCase(createUser.fulfilled, (state) => {
                state.loading = false;
                state.notification = {
                    type: "success", 
                    msg: "User has been successfully created."
                }
            })
            .addCase(createUser.rejected, (state, action) => {
                state.errors = action.payload ? action.payload : [];
            })

            // Update User
            .addCase(updateUser.pending, (state) => {
                state.errors = [];
                state.loading = true;
            })
            .addCase(updateUser.fulfilled, (state) => {
                state.loading = false;
                state.notification = {
                    type: "success", 
                    msg: "User has been successfully updated."
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.errors = action.payload ? action.payload : [];
            })
            // Update User

            // Reset Password
            .addCase(resetUser.pending, (state) => {
                state.errors = [];
                state.loading = true;
            })
            .addCase(resetUser.fulfilled, (state) => {
                state.loading = false;
                state.notification = {
                    type: "success", 
                    msg: "Password reset complete."
                }
            })
            .addCase(resetUser.rejected, (state, action) => {
                state.errors = action.payload ? action.payload : [];
            })
            // Reset Password

            // Deactivate User
            .addCase(deactivateUser.pending, (state) => {
                state.errors = [];
                state.loading = true;
            })
            .addCase(deactivateUser.fulfilled, (state) => {
                state.loading = false;
                state.notification = {
                    type: "success", 
                    msg: "Account has been deactivated successfully."
                }
            })
            .addCase(deactivateUser.rejected, (state, action) => {
                state.errors = action.payload ? action.payload : [];
            })
            // Deactivate User

            // Reactivate User
            .addCase(reactivateUser.pending, (state) => {
                state.errors = [];
                state.loading = true;
            })
            .addCase(reactivateUser.fulfilled, (state) => {
                state.loading = false;
                state.notification = {
                    type: "success", 
                    msg: "Account has been reactivated successfully."
                }
            })
            .addCase(reactivateUser.rejected, (state, action) => {
                state.errors = action.payload ? action.payload : [];
            })
            // Reactivate User

            // Delete User
            .addCase(deleteUser.pending, (state) => {
                state.errors = [];
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state) => {
                state.loading = false;
                state.notification = {
                    type: "success", 
                    msg: "Account has been deleted successfully."
                }
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.errors = action.payload ? action.payload : [];
            })
            // Delete User
    }
})

export const { clearNotification } = userSlice.actions;
export default userSlice.reducer;