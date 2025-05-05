import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import FilterBtn from "../ui_components/FilterBtn";

export default function VanDetails(){
    const param = useParams()
    const van_id = param.id
    const [vanDetails, setVanDetails] = useState()

    useEffect(()=>{
        fetch(`/api/vans/${van_id}`)
        .then(res => res.json())
        .then(data => setVanDetails(data.vans) )
    },[param.id])

    if(vanDetails) {
        console.log("van details",vanDetails)
    }

  

    return(
        <>
        <div className="vans-details-container">
            {vanDetails ? 
            (
                <>
                <div className="van-details">
                    <Link className="back" to=".." relative="path"><p> Back to all vans</p></Link>
                    <img className="van-img-details" src={vanDetails.imageUrl} />
                    <div className="van-details-content">
                        <FilterBtn  name={`${vanDetails.type}`} />
                        <h2>{vanDetails.name}</h2>
                        <p className="price">${vanDetails.price}<span>/Day</span></p>
                        <p>{vanDetails.description}</p>
                        <button className="main-button"> Rent this Van</button>
                    </div>
                </div>
               
                </>
            
            ):
            <h1> Loading ... </h1>}
        </div>
        </>
    )
}