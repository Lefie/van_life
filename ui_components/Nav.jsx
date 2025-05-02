import React from "react";
import logo from "../assets/logo.png"
import { Link } from "react-router-dom";


export default function Nav() {

    return (
        <>
        <div className="nav-bar">
            <Link to="/"><img className="logo-img" src={logo} /> </Link>
            <div className={`menu_list`}>
                <Link to="/about">About</Link>
                <Link to="/vans">Vans</Link>
            </div>
        </div>
        </>
    )
}