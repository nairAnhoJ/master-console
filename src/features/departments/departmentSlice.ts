import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../../config/config";

export interface Department {
    name: string
}

export interface DepartmentList {
    id: number;
    name: string;
}

export interface Notification {
    type: "success" | "warning" | "error" | null;
    msg: string | null;
}

interface Errors {
    path: string;
    msg: string;
}

interface DepartmentState {
    loading: boolean;
    departments: DepartmentList[],
    notification: Notification | null,
    errors: Errors[],
}

const initialState: DepartmentState = {
    departments: [],
    loading: false,
    notification: null,
    errors: [],
}

export const fetchDepartments = createAsyncThunk('departments/fetch', async(search: string = "") => {
    try {
        const res = await config.get(`/departments?search=${search}`);
        return res.data;
    } catch (error) {
        console.log(error)
    }
})

export const createDepartment = createAsyncThunk<any, Department, { rejectValue: any }>('department/create', async(department, {rejectWithValue}) => {
    try {
        const data = {
            name: department.name
        }
        const res = await config.post('/departments/store', data);
        return res.data;
    } catch (error: any) {
        console.log(error.response.data);
        return rejectWithValue(error.response.data);
    }
})

const departmentSlice = createSlice({
    name: 'department',
    initialState,
    reducers: {
        clearNotification: (state) => {
            state.notification = null;
        },
        clearErrors: (state) => {
            state.errors = []
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchDepartments.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDepartments.fulfilled, (state, action) => {
                state.loading = false;
                state.departments = action.payload
            })

            
            // Create
            .addCase(createDepartment.pending, (state) => {
                state.errors = [];
                state.loading = true;
            })
            .addCase(createDepartment.fulfilled, (state) => {
                state.loading = false;
                state.notification = {
                    type: "success", 
                    msg: "Department has been successfully created."
                }
            })
            .addCase(createDepartment.rejected, (state, action) => {
                state.errors = action.payload ? action.payload : [];
            })
    }
})

export const { clearNotification, clearErrors } = departmentSlice.actions;
export default departmentSlice.reducer;