import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../../config/config";

export interface DepartmentList {
    id: number;
    name: string;
}

interface DepartmentState {
    departments: DepartmentList[]
}

const initialState: DepartmentState = {
    departments: []
}

export const fetchDepartment = createAsyncThunk('departments/fetch', async() => {
    try {
        const res = await config.get('/departments');
        return res.data;
    } catch (error) {
        console.log(error)
    }
})

const departmentSlice = createSlice({
    name: 'department',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDepartment.fulfilled, (state, action) => {
                state.departments = action.payload
            })
    }
})

export default departmentSlice.reducer;