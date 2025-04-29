import React from "react";
import logo from "../assets/logo.png"
import { Link } from "react-router-dom";


export default function Nav() {
    


    return (
        <>
        <div className="nav-bar">
            <img className="logo-img" src={logo} />
            <div className="menu_list">
                <Link to="/about"><p>About</p></Link>
                <Link to="/vans"><p>Vans</p></Link>
            </div>
        </div>
        </>
    )
}