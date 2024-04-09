import React, {useEffect, useState} from 'react';
import {Navigate, Outlet} from "react-router-dom";
import api from "../api/Api";

interface State {
    user: string
}

class PrivateRoute extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            user: ""
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        try {
            const response = await api.get('/me');
            this.setState({user: await response.data.email});
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    render() {
        const {user} = this.state
        return {user} ? <Outlet/> : <Navigate to="/login"/>;
    }

}

export default PrivateRoute