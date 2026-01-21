import DepartmentsIndex from '../features/departments/DepartmentsIndex';
import DepartmentsAdd from '../features/departments/DepartmentsAdd';
import DepartmentsEdit from '../features/departments/DepartmentsEdit';
import { Route } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

const DepartmentsRoutes = () => {
    return (
        <>
            <Fragment>
                <Route path="/departments" element={<DepartmentsIndex />}/>
                <Route path="/departments/add" element={<DepartmentsAdd />}/>
                <Route path="/departments/edit/:id" element={<DepartmentsEdit />}/>
            </Fragment>
        </>
    )
}

export default DepartmentsRoutes