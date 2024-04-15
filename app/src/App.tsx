import React from "react";
import "./core/style/output.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";


import common_hu from "./core/translations/hu/common.json";
import common_en from "./core/translations/en/common.json";
import i18next from "i18next";

// Static load
import RootLayout from "./core/components/RootLayout";
import PrivateRoute from "./core/components/PrivateRoute";
import Logout from "./pages/auth/Logout";
import {I18nextProvider} from "react-i18next";
import {Roles} from "./core/enum/Roles";

// Layz load
const DashboardPage = React.lazy(() => import('./pages/dashboard/DashboardPage'));
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
                <RootLayout>
                    <Routes>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/register" element={<RegisterPage/>}/>
                        <Route path="/logout" element={<Logout/>}/>
                        <Route element={<PrivateRoute allowedRoles={[Roles.User, Roles.Admin]}/>}>
                            <Route path="/" element={<DashboardPage/>}/>;
                        </Route>
                    </Routes>
                </RootLayout>
            </BrowserRouter>
        </I18nextProvider>
    )
        ;
}

export default App;
