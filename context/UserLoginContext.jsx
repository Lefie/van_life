import React, { useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const UserLoginContext = createContext(null)

export const UserLoginProvider = ({children}) => {
    const [loginStatus, setLoginStatus] = useState(false)
    const [isHost, setIsHost] = useState(false)
    const [username, setUsername] = useState("")
    const [jwtToken, setJwtToken] = useState(localStorage.getItem("jwt_token"))
    const navigate = useNavigate()


    function isTokenValid(token) {
        if (!token) return false

        try{
            const decodeToken = jwtDecode(token)
            const currentTime = Date.now() / 1000
            const expTime = decodeToken.exp
            if (currentTime >= expTime) {
                return false
            }else {
                return true
            }
        }catch(err){
            console.log(err)
            return false
        }
    }

    
    useEffect(()=>{
        if (!isTokenValid(jwtToken)){
            logout()
            console.log("token removed")
            navigate("/")
        }
    },[jwtToken])

    // restore data from localstorage 
    useEffect(() => {
        
        const token = localStorage.getItem("jwt_token");
        const userInfo = localStorage.getItem("userInfo");
       
        if (token && userInfo && isTokenValid(token)) {
            // Token is valid, restore logged-in state
            const parsedUser = JSON.parse(userInfo);
            console.log("parsed user", parsedUser)
            setLoginStatus(true);
            setIsHost(parsedUser.isHost || false);
            setUsername(parsedUser.name || "")
   
        } else {
            logout(false); // Pass false to prevent navigation on mount
        }
    }, []); 

    function handleLogin(login_info){
        console.log("login info", login_info, typeof login_info)
        let user= {
            "email":login_info.user["email"],
            "isHost":login_info.user["isHost"],
            "name":login_info.user["name"]
        }
        let user_info_str = JSON.stringify(user)
        console.log("login function from context", user_info_str)
        const jwt_token = login_info["token"]
        setLoginStatus(true)
        if (login_info.user["isHost"] === true) {
            setIsHost(true)
        }
        setUsername(login_info.user["name"])
        localStorage.setItem("jwt_token", jwt_token)
        localStorage.setItem("userInfo",user_info_str)
        localStorage.setItem("isLoggedin", "true")
       
    }

    function logout() {
        console.log("logout function ")
        setLoginStatus(false)
        localStorage.removeItem("userInfo")
        localStorage.removeItem("jwt_token")
        localStorage.removeItem("isLoggedin")
        setIsHost(false)
        setUsername("")
        navigate("/")
    }

    function getCurrentUser() {
        if (loginStatus === true){
            const userInfo = localStorage.getItem("userInfo")
            return userInfo ? JSON.parse(userInfo) : null
        }
        return null
    }

    return (
        <UserLoginContext.Provider value={{username,isHost,loginStatus, logout, handleLogin, getCurrentUser}}>
            {children}
        </UserLoginContext.Provider>
    )
}

