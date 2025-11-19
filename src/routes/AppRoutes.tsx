import React from 'react';
import {  Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from '../features/auth/LoginPage'
import UsersIndex from '../features/users/UsersIndex';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<UsersIndex />}/>
            </Route>

            <Route path="/login" element={<LoginPage />}/>
        </Routes>
    )
}

export default AppRoutes;