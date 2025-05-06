import React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function VansHost() {
    const url = `/api/host/vans`
    const [vans, setVans] = useState(null)

    useEffect(()=>{
        fetch(url)
        .then(res => res.json())
        .then(data => {
            setVans(data.vans)
            console.log(data.vans)
        })
    },[])


    return (
        <>
        <div className="van-host-container">
            <h1> Your listed vans </h1>
            <div className="vans-by-host">
                { vans && vans.map((van)=>(
                    <>
                    <NavLink className="van-link"  to={`${van.id}`}>
                        <div className="single-van">
                            <img src={van.imageUrl} />
                            <div className="single-van-desc">
                                <p className="van-name">{van.name}</p> 
                                <p>${van.price} / Day</p>
                            </div>
                        </div>
                    </NavLink>
                    </>
                ))
                }
            </div>
        </div>
        </>
    )
}