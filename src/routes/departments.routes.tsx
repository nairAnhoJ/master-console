import DepartmentsIndex from '../features/departments/DepartmentsIndex';
import DepartmentsAdd from '../features/departments/DepartmentsAdd';
import DepartmentsEdit from '../features/departments/DepartmentsEdit';
import { Route } from 'react-router-dom';

export const DepartmentsRoutes = () => (
    <>
        <Route path="/departments" element={<DepartmentsIndex />}/>
        <Route path="/departments/add" element={<DepartmentsAdd />}/>
        <Route path="/departments/edit/:id" element={<DepartmentsEdit />}/>
    </>
)