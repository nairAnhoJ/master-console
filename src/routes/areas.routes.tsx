import AreaIndex from '../features/areas/AreaIndex';
import AreaAdd from '../features/areas/AreaAdd';
import AreaEdit from '../features/areas/AreaEdit';
import { Route } from 'react-router-dom';
import React from 'react';

const AreasRoutes = () => {
    return (
        <React.Fragment>
            <Route path="/areas" element={<AreaIndex />}/>
            <Route path="/areas/add" element={<AreaAdd />}/>
            <Route path="/areas/edit/:id" element={<AreaEdit />}/>
        </React.Fragment>
    )
}

export default AreasRoutes