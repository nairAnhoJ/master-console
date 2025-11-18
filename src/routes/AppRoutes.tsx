import React from 'react';
import {  Route, Routes, Navigate } from 'react-router-dom';
import RedirectRoute from './RedirectRoute';
import LoginPage from '../features/auth/LoginPage'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<RedirectRoute />}/>
            <Route path="/login" element={<LoginPage />}/>
        </Routes>
    )
}

export default AppRoutes;