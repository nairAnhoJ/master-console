import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../../config/config";

export interface Area {
    name: string;
}

export interface AreaList {
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

interface InitialState {
    loading: boolean;
    areas: AreaList[];
    selectedArea: AreaList,
    notification: Notification | null,
    errors: Errors[], 
}

const initialState: InitialState = {
    areas: [],
    loading: false,
    selectedArea: { id: 0, name: ''},
    notification: null,
    errors: [],
}

export const fetchAreas = createAsyncThunk('areas/fetch', async (search: string = "") => {
    try {
        const res = await config.get(`/areas?search=${search}`);
        return res.data;
    } catch (error) {
        console.log(error)
    }
});

export const fetchAreaById = createAsyncThunk('areas/fetchById', async(id: number) => {
    try {
        const res = await config.get(`/areas/${id}`);
        return res.data;
    } catch (error) {
        console.log(error)
    }
})

export const createArea = createAsyncThunk<any, Area, { rejectValue: any }>('areas/create', async(area, {rejectWithValue}) => {
    try {
        const data = {
            name: (area.name).toUpperCase()
        }
        const res = await config.post('/areas/store', data);
        return res.data;
    } catch (error: any) {
        console.log(error.response.data);
        return rejectWithValue(error.response.data);
    }
})

export const updateArea = createAsyncThunk<any, AreaList, { rejectValue: any }>('areas/update', async(area, {rejectWithValue}) => {
    try {
        const data = {
            name: (area.name).toUpperCase()
        }
        const res = await config.put(`/areas/update/${area.id}`, data);
        return res.data;
    } catch (error: any) {
        console.log(error.response.data);
        return rejectWithValue(error.response.data);
    }
}) 

export const deleteArea = createAsyncThunk<any, number, {rejectValue: any}>('areas/delete', async(id, {rejectWithValue}) => {
    try {
        const res = await config.patch(`/areas/delete/${id}`);
        return res.data;
    } catch (error: any) {
        console.log(error.response.data);
        return rejectWithValue(error.response.data);
    }
})

const areaSlice = createSlice({
    name: 'area',
    initialState,
    reducers: {
        clearNotification: (state) => {
            state.notification = null;
        },
        clearErrors: (state) => {
            state.errors = []
        }
    },
    extraReducers: (builder => {
        builder
            // Fetch
            .addCase(fetchAreas.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAreas.fulfilled, (state, action) => {
                state.loading = false;
                state.areas = action.payload
            })
    
            // Fetch by id
            .addCase(fetchAreaById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAreaById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedArea.id = action.payload.id
                state.selectedArea.name = action.payload.name
            })
    
            
            // Create
            .addCase(createArea.pending, (state) => {
                state.errors = [];
                state.loading = true;
            })
            .addCase(createArea.fulfilled, (state) => {
                state.loading = false;
                state.notification = {
                    type: "success", 
                    msg: "Area has been successfully created."
                }
            })
            .addCase(createArea.rejected, (state, action) => {
                state.errors = action.payload ? action.payload : [];
            })
    
            
            // Update
            .addCase(updateArea.pending, (state) => {
                state.errors = [];
                state.loading = true;
            })
            .addCase(updateArea.fulfilled, (state) => {
                state.loading = false;
                state.notification = {
                    type: "success", 
                    msg: "Area has been successfully updated."
                }
            })
            .addCase(updateArea.rejected, (state, action) => {
                state.errors = action.payload ? action.payload : [];
            })
            

            // Delete
            .addCase(deleteArea.pending, (state) => {
                state.errors = [];
                state.loading = true;
            })
            .addCase(deleteArea.fulfilled, (state) => {
                state.loading = false;
                state.notification = {
                    type: "success", 
                    msg: "Area has been successfully deleted."
                }
            })
            .addCase(deleteArea.rejected, (state, action) => {
                state.errors = action.payload ? action.payload : [];
            })
    })
})

export const { clearErrors, clearNotification } = areaSlice.actions;
export default areaSlice.reducer;