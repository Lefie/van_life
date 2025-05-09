import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";


export default function AuthRequired(){

    const authenticated = localStorage.getItem("isLoggedin") === "true"
    const location = useLocation()

    if(authenticated) {
        return <Outlet />
    }else{
        return <Navigate 
        to="/login"
        state={location?.pathname}
         />
    }

}