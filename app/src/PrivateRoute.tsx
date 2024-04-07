import React from 'react';
import {Navigate, Outlet, useNavigate} from "react-router-dom";

const PrivateRoute = () => {
    const token = localStorage.getItem('token');

    return token ? <Outlet/> : <Navigate to="/login"/>;
}

export default PrivateRoute