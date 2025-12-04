import {  Route, Routes } from 'react-router-dom';
import LoginPage from '../features/auth/LoginPage'
import UsersIndex from '../features/users/UsersIndex';
import ProtectedRoute from './ProtectedRoute';
import MainLayout from '../layouts/MainLayout';
import UsersAdd from '../features/users/UsersAdd';
import UsersEdit from '../features/users/UsersEdit';

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<ProtectedRoute />}>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<UsersIndex />}/>
                    <Route path="/users" element={<UsersIndex />}/>
                    <Route path="/users/add" element={<UsersAdd />}/>
                    <Route path="/users/edit/:id" element={<UsersEdit />}/>
                </Route>
            </Route>

            <Route path="/login" element={<LoginPage />}/>
        </Routes>
    )
}

export default AppRoutes;