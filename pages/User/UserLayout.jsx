import React from "react"
import { NavLink, Outlet } from "react-router-dom";

export default function UserLayout(){

    const styles = {
        fontWeight: "bold",
        textDecoration : "underline",
        color: "#161616"  
    }

    return (
        <>
            <div className="user-links">
               <NavLink style={({isActive})=> isActive ? styles : null} end to=".">Dashboard</NavLink>
               <NavLink style={({isActive})=> isActive ? styles : null} to="rental_history">Rental History</NavLink>
               <NavLink style={({isActive})=> isActive ? styles : null} to="upcoming_rental">Upcoming</NavLink>
            </div>
            <Outlet />
        </>
    )
}