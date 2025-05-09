import React from "react";
import { createContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserLoginContext = createContext(null)

export const UserLoginProvider = ({children}) => {
    console.log("user login provider ",localStorage.getItem("isLoggedin"))
    const [loginStatus, setLoginStatus] = useState(localStorage.getItem("isLoggedin") === "true")
    const navigate = useNavigate()

    function handleLogin(){
        console.log("login function from context")
        setLoginStatus(true)
        localStorage.setItem("isLoggedin","true")
    }

    function logout() {
        console.log("logout function ")
        setLoginStatus(false)
        localStorage.removeItem("isLoggedin")
        navigate("/")
    }

    return (
        <UserLoginContext.Provider value={{loginStatus, logout, handleLogin}}>
            {children}
        </UserLoginContext.Provider>
    )
}

