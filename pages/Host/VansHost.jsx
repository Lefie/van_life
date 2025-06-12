import React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getVansHost } from "../../apis";

export default function VansHost() {
    const [vans, setVans] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()

    useEffect(()=>{
       async function getHostVans(){
            setLoading(true)
            try {
                const userInfo = JSON.parse(localStorage.getItem("userInfo"))
                const data = await getVansHost(userInfo["_id"])
                setVans(data)
            }catch(err) {
                setError(err)
            }finally{
                setLoading(false)
            }
       }
       getHostVans()

    },[])
    
    if (loading){
        return (
            <>
             <div className="van-host-container">
                loading...
             </div>
            </>
        )
    }

    if (error){
        return (
            <>
             <div className="van-host-container">
                <p> {error.message}</p>
                <p> {error.status}</p>
             </div>
            </>
        )
    }



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