import React, {useEffect, useState} from 'react';
import {Roles} from "../enum/Roles";
import {Navigate, Outlet} from "react-router-dom";
import useLocalStorage from "../hook/useLocalStorage";
import api from "../api/Api";

interface Props {
    allowedRoles: Roles[]
}

function PrivateRoute(props: Props) {
    const [loading, setLoading] = useState(true);
    const {email, roles, setUserData, isLoggedIn} = useLocalStorage();

    useEffect(() => {
        api.get('/me')
            .then(response => {
                setUserData(response.data.email, response.data.roles);
            })
            .catch(error => console.error(error))
    }, []);

    if (isLoggedIn()) {
        if (roles.some(value => props.allowedRoles.includes(value as Roles)
        )) {
            return <Outlet/>
        } else {
            return <div>Unauthorized</div> // TODO redirect to prev route
        }
    } else {
        return <Navigate to='/login' replace/>
    }
}

export default PrivateRoute