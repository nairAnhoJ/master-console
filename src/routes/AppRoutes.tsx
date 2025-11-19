import React from 'react';
import {  Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from '../features/auth/LoginPage'
import UsersIndex from '../features/users/UsersIndex';
import ProtectedRoute from './ProtectedRoute';
import MainLayout from '../layouts/MainLayout';

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<ProtectedRoute />}>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<UsersIndex />}/>
                    <Route path="/users" element={<UsersIndex />}/>
                </Route>
            </Route>

            <Route path="/login" element={<LoginPage />}/>
        </Routes>
    )
}

export default AppRoutes;