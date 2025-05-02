import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FilterBtn from "../ui_components/FilterBtn";


export default function Vans() {
    const url = `/api/vans`
    const [vans, setVans] = useState([])

    useEffect(()=>{
        console.log("use effect")
        fetch("/api/vans")
        .then(res => res.json())
        .then(data => {
            setVans(data.vans)
        })  
    },[])



    const displayVan = vans.map(van => (
        <div className={"van"}>
            <Link to={`/vans/${van.id}`}>
                <img className="van_img" src={van.imageUrl} alt={`van ${van.id}`} />
                <div className="van-desc">
                    <p className="van-name">{van.name}</p>
                    <p className="van-price">${van.price} <span>/day</span></p>
                </div>
                <FilterBtn name={van.type}  />
            </Link>
        </div>
    ))
    
    return (
        <>
            <div className="vans-main-container">
                <div className="vans-main-container-header">
                    <h1> Explore our van options </h1>
                    <div className="vans-main-container-filter">
                        <button>Simple</button>
                        <button>Luxury</button>
                        <button>Rugged</button>
                        <span> Clear Filters</span>
                    </div>
                </div>
                
                
                <div className="vans-container">
                    {displayVan}
                </div>
            </div>
           
        </>
    )
}