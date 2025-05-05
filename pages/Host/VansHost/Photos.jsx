import React from "react";
import { useOutletContext } from "react-router-dom";

export default function Photos() {
    const van = useOutletContext()
    
    return (
        <>
         <div className="van-host-details-content">
            <img src={`${van.imageUrl}`} />        
            </div>
        </>
    )
}