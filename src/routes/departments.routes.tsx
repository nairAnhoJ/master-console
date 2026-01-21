import DepartmentsIndex from '../features/departments/DepartmentsIndex';
import DepartmentsAdd from '../features/departments/DepartmentsAdd';
import DepartmentsEdit from '../features/departments/DepartmentsEdit';
import { Route } from 'react-router-dom';
import React from 'react';

const DepartmentsRoutes = () => {
    return (
        <React.Fragment>
            <Route path="/departments" element={<DepartmentsIndex />}/>
            <Route path="/departments/add" element={<DepartmentsAdd />}/>
            <Route path="/departments/edit/:id" element={<DepartmentsEdit />}/>
        </React.Fragment>
    )
}

export default DepartmentsRoutes