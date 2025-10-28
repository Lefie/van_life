import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { UserLoginContext } from "../context/UserLoginContext";
import { useContext } from "react";
import { isNullOrUndef } from "chart.js/helpers";

export default function AuthRequired(){
    const isLoggedin = JSON.parse(localStorage.getItem("isLoggedin"))
    console.log(isLoggedin,"is logged in ?", typeof isLoggedin)
    const location = useLocation()

    if(isLoggedin) {
        return <Outlet />
    }else{
        return <Navigate 
        to="/login"
        state={location?.pathname}
         />
    }

}