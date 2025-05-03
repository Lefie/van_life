import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

export default function HostLayout() {

    const styles = {
        fontWeight: "bold",
        textDecoration : "underline",
        color: "#161616"  
    }

    return (
        <>
        <div className="host-links">
            <NavLink end style={({isActive}) => isActive ? styles : null} to="." >Dashboard</NavLink>
            <NavLink style={({isActive}) => isActive ? styles : null} to="income">Income</NavLink>
            <NavLink style={({isActive}) => isActive ? styles : null} to="vans">Vans</NavLink>
            <NavLink style={({isActive}) => isActive ? styles : null} to="reviews">Reviews</NavLink>
        </div>
        <Outlet />
        </>
    )

}