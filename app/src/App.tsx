import React from "react";
import "./style/output.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";

// Static load
import RootLayout from "./pages/RootLayout";
import PrivateRoute from "./PrivateRoute";

// Layz load
const DashboardPage = React.lazy(() => import('./pages/dashboard/DashboardPage'));
const LoginPage = React.lazy(() => import('./pages/auth/login/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/auth/register/RegisterPage'));

function App() {
    return (
        <BrowserRouter>
            <RootLayout>
                <Routes>
                    <Route element={<PrivateRoute/>}>
                        <Route path="/" element={<DashboardPage/>}></Route>
                    </Route>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                </Routes>
            </RootLayout>
        </BrowserRouter>
    );
}

export default App;
