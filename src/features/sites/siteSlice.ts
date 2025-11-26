import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../../config/config";

export interface SiteList {
    id: number;
    name: string;
}

interface SiteState {
    sites: SiteList[];
}

const initialState: SiteState = {
    sites: []
}

export const fetchSites = createAsyncThunk('sites/fetch', async() => {
    try {
        const res = await config.get('/sites');
        return res.data;
    } catch (error) {
        console.log(error)
    }
})

const siteSlice = createSlice({
    name: 'sites',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSites.fulfilled, (state, action) => {
                state.sites = action.payload;
            })
    }
})

export default siteSlice.reducer;