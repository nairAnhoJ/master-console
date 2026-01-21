import SiteIndex from '../features/sites/SiteIndex';
import SiteAdd from '../features/sites/SiteAdd';
import SiteEdit from '../features/sites/SiteEdit';
import { Route } from 'react-router-dom';

export const SitesRoutes = () => (
    <>
        <Route path="/sites" element={<SiteIndex />}/>
        <Route path="/sites/add" element={<SiteAdd />}/>
        <Route path="/sites/edit/:id" element={<SiteEdit />}/>
    </>
)