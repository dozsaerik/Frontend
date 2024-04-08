import {Navigate, redirect} from "react-router-dom";

const logout = () => {

    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');

    return <Navigate to='/login'/>

}

export default logout;