import { Outlet } from "react-router-dom"
import Navigation from "../Components/Navigation/Navigation"


const MainLayout = () => {
    return (
        <>
            <Navigation />

            <Outlet />
        </>
    )
}  

export default MainLayout