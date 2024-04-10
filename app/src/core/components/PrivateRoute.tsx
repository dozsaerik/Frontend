import React, {useEffect, useState} from 'react';
import {Navigate, Outlet} from "react-router-dom";
import api from "../api/Api";
import {AxiosResponse} from "axios";
import {types} from "sass";
import Error = types.Error;

type State = {
    email: string
}

class PrivateRoute extends React.Component<{}, State> {

    constructor(props: {}) {
        super(props);
        this.state = {
            email: ''
        }
    }

    async componentDidMount() {
        try {
            const response: AxiosResponse = await api.get('/me');
            const result = await response.data;
            this.setState({email: result.email});
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    render() {
        return this.state.email.length > 0 ? <Outlet/> : <Navigate to="/login"/>;
    }

}

export default PrivateRoute