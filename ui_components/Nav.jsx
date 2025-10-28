import React from "react";
import logo from "../assets/logo.png"
import profile from "../assets/profile.png"
import { Link, NavLink } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { UserLoginContext } from "../context/UserLoginContext";




export default function Nav() {
    const {isHost, loginStatus, logout,getCurrentUser} = useContext(UserLoginContext)
    console.log(loginStatus, "from nav")
  
    const current_user = getCurrentUser()
    console.log(current_user, "from nav")
    const [dash, setDash] = useState("")

    const styles = {
        fontWeight: "bold",
        textDecoration : "underline",
        color: "#161616"  
    }

    useEffect(()=>{
        function getDash(){
            if(current_user) {
                console.log("get DASH CALLED HERE")
                if (current_user["isHost"]){
                    setDash("/host")
                }else {
                    console.log(current_user["name"])
                    const name = current_user["name"]
                    setDash(`/${name}`)
                }
            }
        }
        getDash()
    },[current_user])

   

    return (
        <>
        <div className="nav-bar">
            <Link to="/"><img className="logo-img" src={logo} /> </Link>
            <div className={`menu_list`}>
                {current_user &&  <NavLink style={({isActive}) => isActive ? styles : null} to={dash} >Dash</NavLink> }
                <NavLink style={({isActive}) => isActive ? styles : null} to="about">About</NavLink>
                <NavLink style={({isActive}) => isActive ? styles : null} to="vans">Vans</NavLink>
                {loginStatus === true ? <button className="logout-btn" onClick={logout}>logout</button>: 
                 <NavLink to="login"><img className="profile-icon" src={profile}/></NavLink> }
               
            </div>
        </div>
        </>
    )
}