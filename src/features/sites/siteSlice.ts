import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../../config/config";

export interface Site {
    name: string
}

export interface SiteList {
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

interface SiteState {
    loading: boolean;
    sites: SiteList[];
    selectedSite: SiteList,
    notification: Notification | null,
    errors: Errors[], 
}

const initialState: SiteState = {
    loading: false,
    sites: [],
    selectedSite: { id: 0, name: ''},
    notification: null,
    errors: [],
}

export const fetchSites = createAsyncThunk('sites/fetch', async(search: string = '') => {
    try {
        const res = await config.get(`/sites?search=${search}`);
        return res.data;
    } catch (error) {
        console.log(error)
    }
})

export const fetchSiteById = createAsyncThunk('sites/fetchById', async(id: number) => {
    try {
        const res = await config.get(`/sites/${id}`);
        return res.data;
    } catch (error) {
        console.log(error)
    }
})

export const createSite = createAsyncThunk<any, Site, { rejectValue: any }>('sites/create', async(site, {rejectWithValue}) => {
    try {
        const data = {
            name: (site.name).toUpperCase()
        }
        const res = await config.post('/sites/store', data);
        return res.data;
    } catch (error: any) {
        console.log(error.response.data);
        return rejectWithValue(error.response.data);
    }
})

export const updateSite = createAsyncThunk<any, SiteList, { rejectValue: any }>('sites/update', async(site, {rejectWithValue}) => {
    try {
        const data = {
            name: (site.name).toUpperCase()
        }
        const res = await config.put(`/sites/update/${site.id}`, data);
        return res.data;
    } catch (error: any) {
        console.log(error.response.data);
        return rejectWithValue(error.response.data);
    }
}) 

export const deleteSite = createAsyncThunk<any, number, {rejectValue: any}>('sites/delete', async(id, {rejectWithValue}) => {
    try {
        const res = await config.patch(`/sites/delete/${id}`);
        return res.data;
    } catch (error: any) {
        console.log(error.response.data);
        return rejectWithValue(error.response.data);
    }
})

const siteSlice = createSlice({
    name: 'sites',
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
            .addCase(fetchSites.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSites.fulfilled, (state, action) => {
                state.loading = false;
                state.sites = action.payload
            })
    
            // Fetch by id
            .addCase(fetchSiteById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSiteById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedSite.id = action.payload.id
                state.selectedSite.name = action.payload.name
            })
    
            
            // Create
            .addCase(createSite.pending, (state) => {
                state.errors = [];
                state.loading = true;
            })
            .addCase(createSite.fulfilled, (state) => {
                state.loading = false;
                state.notification = {
                    type: "success", 
                    msg: "Site has been successfully created."
                }
            })
            .addCase(createSite.rejected, (state, action) => {
                state.errors = action.payload ? action.payload : [];
            })
    
            
            // Update
            .addCase(updateSite.pending, (state) => {
                state.errors = [];
                state.loading = true;
            })
            .addCase(updateSite.fulfilled, (state) => {
                state.loading = false;
                state.notification = {
                    type: "success", 
                    msg: "Site has been successfully updated."
                }
            })
            .addCase(updateSite.rejected, (state, action) => {
                state.errors = action.payload ? action.payload : [];
            })
            

            // Delete
            .addCase(deleteSite.pending, (state) => {
                state.errors = [];
                state.loading = true;
            })
            .addCase(deleteSite.fulfilled, (state) => {
                state.loading = false;
                state.notification = {
                    type: "success", 
                    msg: "Site has been successfully deleted."
                }
            })
            .addCase(deleteSite.rejected, (state, action) => {
                state.errors = action.payload ? action.payload : [];
            })
    }
})

export const { clearErrors, clearNotification } = siteSlice.actions
export default siteSlice.reducer;