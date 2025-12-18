import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../../config/config";

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

const departmentSlice = createSlice({
    name: 'department',
    initialState,
    reducers: {
        clearNotification: (state) => {
            state.notification = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDepartments.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDepartments.fulfilled, (state, action) => {
                state.loading = false;
                state.departments = action.payload
            })
    }
})

export const { clearNotification } = departmentSlice.actions;
export default departmentSlice.reducer;