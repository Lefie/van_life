import React from "react";
import logo from "../assets/logo.png"
import profile from "../assets/profile.png"
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserLoginContext } from "../context/UserLoginContext";



export default function Nav() {
    const {loginStatus, logout} = useContext(UserLoginContext)
    console.log(loginStatus)


    const styles = {
        fontWeight: "bold",
        textDecoration : "underline",
        color: "#161616"  
    }

    return (
        <>
        <div className="nav-bar">
            <Link to="/"><img className="logo-img" src={logo} /> </Link>
            <div className={`menu_list`}>
                <NavLink style={({isActive}) => isActive ? styles : null} to="host" >Host</NavLink>
                <NavLink style={({isActive}) => isActive ? styles : null} to="about">About</NavLink>
                <NavLink style={({isActive}) => isActive ? styles : null} to="vans">Vans</NavLink>
                {loginStatus === true ? <button className="logout-btn" onClick={logout}>logout</button>: 
                 <NavLink to="login"><img className="profile-icon" src={profile}/></NavLink> }
               
            </div>
        </div>
        </>
    )
}