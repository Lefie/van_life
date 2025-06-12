import React, { useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserLoginContext = createContext(null)

export const UserLoginProvider = ({children}) => {
    console.log("user login provider ",localStorage.getItem("isLoggedin"))
    const [loginStatus, setLoginStatus] = useState(localStorage.getItem("isLoggedin") === "true")
    const navigate = useNavigate()

    function handleLogin(login_info){
        let user_info_str = JSON.stringify(login_info.user)
        console.log("login function from context", user_info_str)
        setLoginStatus(true)
        localStorage.setItem("userInfo",user_info_str)
        localStorage.setItem("isLoggedin","true")
    }

    function logout() {
        console.log("logout function ")
        setLoginStatus(false)
        localStorage.removeItem("isLoggedin")
        localStorage.removeItem("userInfo")
        navigate("/")
    }

    return (
        <UserLoginContext.Provider value={{loginStatus, logout, handleLogin}}>
            {children}
        </UserLoginContext.Provider>
    )
}

