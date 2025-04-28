import React from "react";
import logo from "../assets/logo.png"

export default function Nav() {
    
    console.log(logo, "from Nav.jsx")

    return (
        <>
        <div className="nav-bar">
            <img className="logo-img" src={logo} />
            <div className="menu_list">
                <p>About</p>
                <p>Vans</p>
            </div>
        </div>
        </>
    )
}