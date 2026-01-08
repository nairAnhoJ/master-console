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
    selectedDepartment: DepartmentList,
    notification: Notification | null,
    errors: Errors[], 
}

const initialState: DepartmentState = {
    departments: [],
    selectedDepartment: { id: 0, name: ''},
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

export const fetchDepartmentById = createAsyncThunk('departments/fetchById', async(id: number) => {
    try {
        const res = await config.get(`/departments/${id}`);
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

export const updateDepartment = createAsyncThunk<any, DepartmentList, { rejectValue: any }>('department/update', async(department, {rejectWithValue}) => {
    try {
        const data = {
            name: department.name
        }
        const res = await config.put(`/departments/update/${department.id}`, data);
        return res.data;
    } catch (error: any) {
        console.log(error.response.data);
        return rejectWithValue(error.response.data);
    }
})

export const deleteDepartment = createAsyncThunk<any, number, {rejectValue: any}>('department/delete', async(id, {rejectWithValue}) => {
    try {
        const res = await config.patch(`/departments/delete/${id}`);
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

        // Fetch by id
        .addCase(fetchDepartmentById.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchDepartmentById.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedDepartment.id = action.payload.id
            state.selectedDepartment.name = action.payload.name
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

        
        // Update
        .addCase(updateDepartment.pending, (state) => {
            state.errors = [];
            state.loading = true;
        })
        .addCase(updateDepartment.fulfilled, (state) => {
            state.loading = false;
            state.notification = {
                type: "success", 
                msg: "Department has been successfully updated."
            }
        })
        .addCase(updateDepartment.rejected, (state, action) => {
            state.errors = action.payload ? action.payload : [];
        })

        
        // Update
        .addCase(deleteDepartment.pending, (state) => {
            state.errors = [];
            state.loading = true;
        })
        .addCase(deleteDepartment.fulfilled, (state) => {
            state.loading = false;
            state.notification = {
                type: "success", 
                msg: "Department has been successfully deleted."
            }
        })
        .addCase(deleteDepartment.rejected, (state, action) => {
            state.errors = action.payload ? action.payload : [];
        })
    }
})

export const { clearNotification, clearErrors } = departmentSlice.actions;
export default departmentSlice.reducer;








 