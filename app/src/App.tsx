import React from "react";
import "./core/style/output.css";
import {BrowserRouter, createBrowserRouter, Route, Routes} from "react-router-dom";
import {I18nextProvider} from "react-i18next";
import {Roles} from "./core/enum/Roles";


import common_hu from "./core/translations/hu/common.json";
import common_en from "./core/translations/en/common.json";
import i18next from "i18next";

// Static load
import PrivateRoute from "./core/components/PrivateRoute";
import Logout from "./pages/auth/Logout";
import RootLayout from "./pages/root/RootLayout";

// Layz load
const DashboardPage = React.lazy(() => import('./pages/dashboard/DashboardPage'));
const ExamplePage = React.lazy(() => import('./pages/example/ExamplePage'));
const LoginPage = React.lazy(() => import('./pages/auth/login/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/auth/register/RegisterPage'));

i18next.init({
    interpolation: {escapeValue: false},  // React already does escaping
    lng: 'hu',
    resources: {
        hu: {
            common: common_hu
        },
        en: {
            common: common_en
        },
    },
});

function App() {

    return (
        <I18nextProvider i18n={i18next}>
            <BrowserRouter>
                <Routes>

                    {/* PUBLIC ROUTES */}
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/logout" element={<Logout/>}/>

                    {/* PRIVATE ROUTES */}
                    <Route element={<RootLayout/>}>
                        <Route element={<PrivateRoute allowedRoles={[Roles.ROLE_USER, Roles.ROLE_ADMIN]}/>}>
                            <Route path="/" element={<DashboardPage/>}/>;
                        </Route>

                        <Route element={<PrivateRoute allowedRoles={[Roles.ROLE_ADMIN]}/>}>
                            <Route path="/test" element={<ExamplePage/>}/>;
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </I18nextProvider>
    )
        ;
}

export default App;
