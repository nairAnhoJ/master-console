import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../../config/config";

export interface AreaList {
    id: number;
    name: string;
}

interface InitialState {
    areas: AreaList[];
    loading: boolean;
}

const initialState: InitialState = {
    areas: [],
    loading: false
}

export const fetchAreas = createAsyncThunk('areas/fetch', async () => {
    try {
        const res = await config.get('/areas');
        return res.data;
    } catch (error) {
        console.log(error)
    }
});

const areaSlice = createSlice({
    name: 'area',
    initialState,
    reducers: {},
    extraReducers: (builder => {
        builder
            .addCase(fetchAreas.fulfilled, (state, action) => {
                state.areas = action.payload;
            })
    })
})

export default areaSlice.reducer;