import React from "react";
import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { getVans, get_all_vans_saved_by_user } from "../../apis";


export default function UserDashboard() {
    const { username } = useParams()
    const [vans, setVans] = useState()
    const [savedVans, setSavedVans] = useState()
    const [error, setError] = useState()


    useEffect(()=>{
        async function getAllVans() {
            try {
                const vans = await getVans()
                const vans_saved = await get_all_vans_saved_by_user()
                console.log("before for loop", vans, vans_saved)
                
                let saved_van_list = []
                
                for (let i = 0; i < vans.length; i ++) {
                    const van_id = vans[i]["_id"]

                    vans_saved.forEach(van => {
                        if (van["van_id"] === van_id){
                            saved_van_list.push(vans[i])
                        }
                    })
                }

                console.log("saved van list",saved_van_list)
                setSavedVans(saved_van_list)
                setVans(vans)

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
                    {savedVans && savedVans.length > 0 ? savedVans.map(van => (
                        <>
                            <article className="saved_vans_details">
                                <NavLink className="non-deco" to={`../vans/${van["_id"]}`}>
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