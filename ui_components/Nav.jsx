import React from "react";
import logo from "../assets/logo.png"
import { Link } from "react-router-dom";


export default function Nav({cur}) {

    return (
        <>
        <div className="nav-bar">
            <img className="logo-img" src={logo} />
            <div className={`menu_list`}>
                <Link to="/about"><p className={`${cur==="about"?"underline":""}`}>About</p></Link>
                <Link to="/vans"><p className={`${cur==="vans"?"underline":""}`}>Vans</p></Link>
            </div>
        </div>
        </>
    )
}