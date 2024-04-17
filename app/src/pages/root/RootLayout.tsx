import React from "react";
import NavbarComponent from "./NavbarComponent";
import {Outlet} from "react-router-dom";

function RootLayout() {
    return (
        <>
            <NavbarComponent/>
            <main>
                <Outlet/>
            </main>
        </>
    );
}

export default RootLayout;