import React from "react";
import "./style/output.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";

// Static load
import RootLayout from "./components/RootLayout";
import PrivateRoute from "./components/PrivateRoute";
import Logout from "./pages/auth/Logout";

// Layz load
const DashboardPage = React.lazy(() => import('./pages/dashboard/DashboardPage'));
const LoginPage = React.lazy(() => import('./pages/auth/login/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/auth/register/RegisterPage'));

function App() {
    return (
        <BrowserRouter>
            <RootLayout>
                <Routes>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/logout" element={<Logout/>}/>
                    <Route element={<PrivateRoute/>}>
                        <Route path="/" element={<DashboardPage/>}></Route>
                    </Route>
                </Routes>
            </RootLayout>
        </BrowserRouter>
    );
}

export default App;
