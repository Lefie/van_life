import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import FilterBtn from "../ui_components/FilterBtn";

export default function VanDetails(){
    const param = useParams()
    const van_id = param.id
    const [vanDetails, setVanDetails] = useState()
    const location = useLocation()


    function generateName() {
        if(location.state){
            
            if(location.state.search){
                console.log(location.state.search.slice(5))
                return location.state.search.slice(5)
            }else {
                console.log("all")
                return "all"
            }
        }
    }

    function generateBackLink(){
        if ( location.state ) {
            if(location.state.search){
                
                return `?${location.state.search}`
            }else{
                return ""
            }
        }
    }

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
                    <Link className="back" to={`..${generateBackLink()}`} relative="path"><p> Back to {generateName()}  vans</p></Link>
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