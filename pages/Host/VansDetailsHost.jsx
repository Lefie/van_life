import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { NavLink,Link, Outlet } from "react-router-dom";
import FilterBtn from "../../ui_components/FilterBtn";

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
    

    const styles = {
        textDecoration : "underline",
        color: "black",
        fontWeight: "bold"

    }

    return (
        <>
        <div className="van-host-container">
            <Link to=".." relative="path" className="back-link">back to all vans</Link>
            
              {van && (
                <>  
                <div className="van-host-details-container">
                    <div className="van-details-by-host">
                        <img src={van.imageUrl} />
                        <div className="van-profile">
                            <FilterBtn  name={`${van.type}`}/>
                            <p className="van-name">{van.name}</p>
                            <p>${van.price} / day</p>
                        </div>
                    </div>
                    <div className="van-host-details-links">
                        <NavLink style={({isActive})=> isActive ? styles : null} to="." end>Details</NavLink>
                        <NavLink style={({isActive})=> isActive ? styles : null} to={`pricing`}>Pricing</NavLink>
                        <NavLink style={({isActive})=> isActive ? styles : null} to={`photos`}> Photos</NavLink>
                    </div>
                    <Outlet />
                </div>
                </>
              )}
           
        </div>
       
        </>
    )
}