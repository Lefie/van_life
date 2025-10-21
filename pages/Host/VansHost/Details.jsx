import React from "react";
import { useOutletContext } from "react-router-dom";

export default function Details() {
    const van = useOutletContext()
    console.log(van)

    return (
        <>
        <div className="van-host-details-content">
           <p className="details"> Name: <span>{van.name}</span>  </p>
           <p className="details"> Category: <span>{van.type}</span></p>
           <p className="details"> Description: <span>{van.description}</span></p>
           <p className="details"> Visibility: <span>public</span></p>
        </div>
        </>
    )
}