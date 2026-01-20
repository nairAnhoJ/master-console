import DepartmentsIndex from '../features/departments/DepartmentsIndex';
import DepartmentsAdd from '../features/departments/DepartmentsAdd';
import DepartmentsEdit from '../features/departments/DepartmentsEdit';
import { Route } from 'react-router-dom';

const DepartmentsRoutes = () => {
    return (
        <>
            <Route path="/departments" element={<DepartmentsIndex />}/>
            <Route path="/departments/add" element={<DepartmentsAdd />}/>
            <Route path="/departments/edit/:id" element={<DepartmentsEdit />}/>
        </>
    )
}

export default DepartmentsRoutes