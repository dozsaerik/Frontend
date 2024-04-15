import React, {useEffect, useState} from 'react';
import {Navigate, Outlet} from "react-router-dom";
import api from "../api/Api";

function PrivateRoute() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        api.get('/me')
            .then(response => {
                setEmail(response.data.email);
            })
            .catch(error => console.error(error))
            .finally(() => setLoading(false))

    }, [email]);

    if(loading) {
        return <Outlet/>
    } else {
        return email.length > 0 ? <Outlet/> : <Navigate to="/login" replace/>;
    }

}

export default PrivateRoute