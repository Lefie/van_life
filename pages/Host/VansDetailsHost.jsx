import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { NavLink,Link, Outlet } from "react-router-dom";

export default function VansDetailsHost() {
    const {id} = useParams()
    console.log("van id",id)
    const [van, setVan] = useState(null)

    useEffect(()=>{
        fetch(`/api/host/vans/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setVan(data.vans[0])
        })
    },[])
    console.log(van)

    const styles = {
        textDecoration : "underline"
    }

    return (
        <>
        <div className="van-host-container">
            <Link to="/host/vans" className="back-link">back to all vans</Link>
            
              {van && (
                <>  
                <div className="vans-by-host">
                    <img src={van.imageUrl} />
                    <p className="van-name">{van.name}</p>
                    <p>{van.price} / day</p>
                </div>
                <div className="van-host-details-links">
                    <NavLink style={({isActive})=> isActive ? styles : null} to={`/host/vans/${id}`} end>Details</NavLink>
                    <NavLink style={({isActive})=> isActive ? styles : null} to={`/host/vans/${id}/pricing`}>Pricing</NavLink>
                    <NavLink style={({isActive})=> isActive ? styles : null} to={`/host/vans/${id}/photos`}> Photos</NavLink>
                </div>
                <Outlet />
                </>

 
              )}
           
        </div>
       
        </>
    )
}