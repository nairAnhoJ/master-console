import { useSelector } from "react-redux"
import type { RootState } from "../store"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = () => {
    const token = useSelector((state: RootState) => state.auth.token)
    
    console.log(token);

    if(!token){
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}

export default ProtectedRoute