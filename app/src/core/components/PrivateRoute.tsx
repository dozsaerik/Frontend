import React, {startTransition, Suspense, useEffect, useState} from 'react';
import {Roles} from "../enum/Roles";
import {fetchUserData, UserState} from "../redux/reducer/UserReducer";
import {useSelector} from "react-redux";
import store, {RootState} from "../redux/Store";
import {Navigate, Outlet} from "react-router-dom";

interface Props {
    allowedRoles: Roles[]
}

function PrivateRoute(props: Props) {
    const [loading, setLoading] = useState(true);
    const user: UserState = useSelector((state: RootState) => state.user);

    useEffect(() => {
        startTransition(() => {
            store.dispatch(fetchUserData())
        })
    }, []);

    if (!user.loading) {
        if (user.data.email && user.data.roles.some(role => props.allowedRoles.includes(role))) {
            return (
                <Suspense>
                    <Outlet/>
                </Suspense>
            )
        } else {
            return <div>Unauthorized</div> // TODO Unauthorized
        }
    } else {
        return <div>Loading</div>
    }
}

export default PrivateRoute