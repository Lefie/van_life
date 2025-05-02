import React from "react";
import logo from "../assets/logo.png"
import { Link, NavLink } from "react-router-dom";


export default function Nav() {
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
                <NavLink style={({isActive}) => isActive ? styles : null} to="/host" >Host</NavLink>
                <NavLink style={({isActive}) => isActive ? styles : null} to="/about">About</NavLink>
                <NavLink style={({isActive}) => isActive ? styles : null} to="/vans">Vans</NavLink>
            </div>
        </div>
        </>
    )
}