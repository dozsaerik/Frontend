import React from "react";
import "./style/output.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";


import register_hu from "./translations/hu/common.json";
import register_en from "./translations/en/common.json";
import i18next from "i18next";

// Static load
import RootLayout from "./components/RootLayout";
import PrivateRoute from "./components/PrivateRoute";
import Logout from "./pages/auth/Logout";
import {I18nextProvider} from "react-i18next";

// Layz load
const DashboardPage = React.lazy(() => import('./pages/dashboard/DashboardPage'));
const LoginPage = React.lazy(() => import('./pages/auth/login/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/auth/register/RegisterPage'));

i18next.init({
    interpolation: {escapeValue: false},  // React already does escaping
    lng: 'hu',
    resources: {
        hu: {
            common: register_hu
        },
        en: {
            common: register_en
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
                        <Route element={<PrivateRoute/>}>
                            <Route path="/" element={<DashboardPage/>}></Route>
                        </Route>
                    </Routes>
                </RootLayout>
            </BrowserRouter>
        </I18nextProvider>
    );
}

export default App;
