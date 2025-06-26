import React from "react";
import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { getVans } from "../../apis";


export default function Dashboard() {
    const { username } = useParams()
    const [vans, setVans] = useState()
    const [error, setError] = useState()

    // TODO: verify the username to be a valid user 
    // Check against the loocalstorage

    
    useEffect(()=>{
        async function getAllVans() {
            const all_vans = await getVans()
            const saved_vans = all_vans.slice(0,2)   // we are just faking data atm

            try {
                setVans(saved_vans)

            }catch(err){
                setError(err)
            }
        }
        getAllVans()

    },[])
    
   
    return (<>
        <section className="user-dashboard-container">
            <h1>Welcome {username}!</h1>
            <section className="saved">
                <h2>Saved Vans </h2>
                <article className="saved_vans_container">
                    {vans ? vans.map(van => (
                        <>
                            <article className="saved_vans_details">
                                <NavLink to={`../vans/${van.id}`}>
                                    <img src={`${van.imageUrl}`} alt="van-detail" />
                                    <p className="saved_van_name">{van.name}</p>
                                </NavLink>
                            </article>
                        
                        </>
                    )): <>
                    <p className="no-saved-vans">Oops! You don't have anything saved yet!</p>
                    </>}



                </article>
            </section>
        </section>
    </>)
}