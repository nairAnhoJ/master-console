import {  Route, Routes } from 'react-router-dom';
import LoginPage from '../features/auth/LoginPage'
import UsersIndex from '../features/users/UsersIndex';
import ProtectedRoute from './ProtectedRoute';
import MainLayout from '../layouts/MainLayout';
import UsersAdd from '../features/users/UsersAdd';

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<ProtectedRoute />}>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<UsersIndex />}/>
                    <Route path="/users" element={<UsersIndex />}/>
                    <Route path="/users/add" element={<UsersAdd />}/>
                </Route>
            </Route>

            <Route path="/login" element={<LoginPage />}/>
        </Routes>
    )
}

export default AppRoutes;