import {  Route, Routes } from 'react-router-dom';
import LoginPage from '../features/auth/LoginPage';
import ProtectedRoute from './ProtectedRoute';
import MainLayout from '../layouts/MainLayout';

import UsersRoutes from './users.routes';
import DepartmentsRoutes from './departments.routes';
import AreasRoutes from './areas.routes';
import SitesRoutes from './sites.routes';

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<ProtectedRoute />}>
                <Route element={<MainLayout />}>
                    <UsersRoutes />
                    <DepartmentsRoutes />
                    <AreasRoutes />
                    <SitesRoutes />
                </Route>
            </Route>

            <Route path="/login" element={<LoginPage />}/>
        </Routes>
    )
}

export default AppRoutes;