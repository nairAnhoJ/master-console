import React from "react";
import { Navigate } from "react-router-dom";

const RedirectRoute = () => {
    return <Navigate to="/login" replace></Navigate>
}

export default RedirectRoute