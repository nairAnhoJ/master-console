import { configureStore } from "@reduxjs/toolkit";

import authReducer from './features/auth/authSlice'
import userReducer from './features/users/userSlice'
import departmentReducer from './features/departments/departmentSlice'
import siteReducer from './features/sites/siteSlice'
import areaReducer from './features/areas/areaSlice'
import notificationReducer from './features/notification/notificationSlice'

export const store = configureStore({
    reducer:{
        auth: authReducer,
        users: userReducer,
        departments: departmentReducer,
        sites: siteReducer,
        areas: areaReducer,
        notification: notificationReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;