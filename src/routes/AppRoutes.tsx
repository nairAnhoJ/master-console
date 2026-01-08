import {  Route, Routes } from 'react-router-dom';
import LoginPage from '../features/auth/LoginPage'
import ProtectedRoute from './ProtectedRoute';
import MainLayout from '../layouts/MainLayout';

// Users Routes
import UsersIndex from '../features/users/UsersIndex';
import UsersAdd from '../features/users/UsersAdd';
import UsersEdit from '../features/users/UsersEdit';

// Departments Routes
import DepartmentsIndex from '../features/departments/DepartmentsIndex';
import DepartmentsAdd from '../features/departments/DepartmentsAdd';
import DepartmentsEdit from '../features/departments/DepartmentsEdit';

// Areas Routes
import AreaIndex from '../features/areas/AreaIndex';
import AreaAdd from '../features/areas/AreaAdd';
import AreaEdit from '../features/areas/AreaEdit';

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<ProtectedRoute />}>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<UsersIndex />}/>
                    <Route path="/users" element={<UsersIndex />}/>
                    <Route path="/users/add" element={<UsersAdd />}/>
                    <Route path="/users/edit/:id" element={<UsersEdit />}/>

                    <Route path="/departments" element={<DepartmentsIndex />}/>
                    <Route path="/departments/add" element={<DepartmentsAdd />}/>
                    <Route path="/departments/edit/:id" element={<DepartmentsEdit />}/>

                    <Route path="/areas" element={<AreaIndex />}/>
                    <Route path="/areas/add" element={<AreaAdd />}/>
                    <Route path="/areas/edit/:id" element={<AreaEdit />}/>
                </Route>
            </Route>

            <Route path="/login" element={<LoginPage />}/>
        </Routes>
    )
}

export default AppRoutes;