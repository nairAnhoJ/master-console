import UsersIndex from '../features/users/UsersIndex';
import UsersAdd from '../features/users/UsersAdd';
import UsersEdit from '../features/users/UsersEdit';
import { Route } from 'react-router-dom';
import React from 'react';

const UsersRoutes = () => {
    return (
        <>
            <React.Fragment>
                <Route path="/" element={<UsersIndex />}/>
                <Route path="/users" element={<UsersIndex />}/>
                <Route path="/users/add" element={<UsersAdd />}/>
                <Route path="/users/edit/:id" element={<UsersEdit />}/>
            </React.Fragment>
        </>
    )
}

export default UsersRoutes