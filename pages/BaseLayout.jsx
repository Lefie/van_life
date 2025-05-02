import React from "react";
import Nav from "../ui_components/Nav";
import Footer from "../ui_components/Footer"
import { Outlet } from "react-router-dom";

export default function BaseLayout() {
    return (
        <>
        <Nav />
        <Outlet />
        <Footer />
        </>
    )
}