import React from "react";
import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { getVans } from "../../apis";


export default function Upcoming() {
    const [vans, setVans] = useState()
    const [error, setError] = useState()

    useEffect(()=>{
            async function getAllVans() {
                const all_vans = await getVans()
                const upcoming_vans = all_vans.slice(5)   // we are just faking data atm
    
                try {
                    setVans(upcoming_vans)
    
                }catch(err){
                    setError(err)
                }
            }
            getAllVans()
    
        },[])
        

    return (
        <>
        <section className="upcoming-rental-container">
            <h2>Upcoming Rental</h2>
            <section className="upcoming-rentals">
                <article className="upcoming_vans_history_container">
                    {vans ? vans.map(van => (
                        <>
                            <article className="upcoming_vans_details">
                                <NavLink className="non-deco" to={`../../vans/${van.id}`}>
                                    <img src={`${van.imageUrl}`} alt="van-detail" />
                                    <p className="upcoming_van_name">{van.name}</p>
                                </NavLink>
                            </article>
                        </>
                    )): <>
                    <p className="no-retented-vans">You don't have any upcoming trip! Book one right now!</p>
                    </>}
                </article>
            </section>
        </section>
        </>
    )
}
