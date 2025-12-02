import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import reducer from "../auth/authSlice";

interface Notification {
    feature: 'users' | null;
    type: "success" | "error" | "warning" | null;
    msg: string | null;
}

const initialState: Notification = {
    feature: null,
    type: null,
    msg: null
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addNotif: (state, action) => {
            state.feature = action.payload.feature;
            state.type = action.payload.type;
            state.msg = action.payload.msg;
        },
        clearNotif: (state) => {
            state.feature = null
        }
    }
})

export const { addNotif, clearNotif } = notificationSlice.actions;
export default notificationSlice.reducer;