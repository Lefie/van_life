import React from "react";
import { useOutletContext } from "react-router-dom";

export default function Pricing() {
    const van = useOutletContext()
    
    return (
        <>
         <div className="van-host-details-content">
            <p className="pricing">${van.price} <span> / Day </span></p>
         </div>
        </>
    )
}