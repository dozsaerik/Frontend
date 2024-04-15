import React, {useEffect, useState} from 'react';
import {Navigate, Outlet, Route} from "react-router-dom";
import api from "../api/Api";
import {Roles} from "../enum/Roles";

interface Props {
    allowedRoles: Roles[]
}

function PrivateRoute(props: Props) {
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

    if (loading) {
        return <Outlet/>;
    } else {
        return email.length > 0 ? <Outlet/> : <Navigate to="/login" replace/>;
    }

}

export default PrivateRoute