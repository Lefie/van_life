import React from "react";
import { getVansHost } from "../../apis";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Dashboard() {
    const [vans, setVans] = useState()
    useEffect(()=>{
        async function getHostVans() {
            const userInfo = JSON.parse(localStorage.getItem("userInfo"))
            if(userInfo) {
                const data = await getVansHost(userInfo["_id"])
                console.log(data)
                setVans(data)
            }
        }
        getHostVans()
    },[])
    
    return (
        <>
        <div className="van-details-container">
           <div className="dashboard-header">
                <h1>Welcome, Lemon!</h1>
                <div className="dashboard-income">
                    <p>Income last 30 days</p>
                    <p>Details</p>
                </div>
                <h1>$2,260</h1>
           </div>
           <div className="dashboard-review-scores">
                <h2>Review score </h2>
                <p>5.0/5</p> 
                <p>Details</p>
           </div>
           <div className="dashboard-list-vans">
                <div className="content">
                    <h3>Your listed vans</h3>
                    <NavLink className={"non-deco"} to={`/host/vans`} ><p>View all</p></NavLink>
                </div>
                
                <div className="vans-list">
                    {vans && vans.map((van) => (<>
                    <NavLink className={"non-deco"} to={`vans/${van["_id"]}`}>
                        <div className="van-details-content-box">
                            <img src={van.imageUrl} width={"50px"} />
                            <div className="details">
                                <p className="name">{van.name}</p>
                                <p className="price">${van.price}/day</p>
                            </div>
                        </div>
                    </NavLink>
                        
                    </>))}
                </div>
           </div>
        </div>
        </>
    )
}