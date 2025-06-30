import React from "react";
import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { getVans } from "../../apis";


export default function RentalHisotry(){
    const [vans, setVans] = useState()
    const [error, setError] = useState()
    const { username } = useParams()

    useEffect(()=>{
            async function getAllVans() {
                const all_vans = await getVans()
                const rented_vans = all_vans.slice(2,4)   // we are just faking data atm
    
                try {
                    setVans(rented_vans)
    
                }catch(err){
                    setError(err)
                }
            }
            getAllVans()
    
    },[])
    
    return (
        <>
        <section className="rental-history-container">
            <h1>Welcome {username}!</h1>
            <section className="rental-history">
                <h2>Rental History</h2>
                <article className="rented_vans_history_container">
                    {vans ? vans.map(van => (
                        <>
                            <article className="rented_vans_details">
                                <NavLink className="non-deco" to={`../../vans/${van.id}`}>
                                    <img src={`${van.imageUrl}`} alt="van-detail" />
                                    <p className="rented_van_name">{van.name}</p>
                                </NavLink>
                            </article>
                        
                        </>
                    )): <>
                    <p className="no-retented-vans">You haven't rented a van yet! What are you waiting for??</p>
                  </>}
                </article>
            </section>
        </section>
        </>
    )
}