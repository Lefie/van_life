import React from "react";
import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { getVans, get_all_vans_saved_by_user } from "../../apis";


export default function Dashboard() {
    const { username } = useParams()
    const [vans, setVans] = useState()
    const [savedVans, setSavedVans] = useState()
    const [user_id, setUserId] = useState(JSON.parse(localStorage.getItem("userInfo"))["_id"])
    const [error, setError] = useState()

    // TODO: verify the username to be a valid user 
    // Check against the loocalstorage

    useEffect(()=>{
        async function getAllVans() {
            try {
                const vans = await getVans()
                const vans_saved = await get_all_vans_saved_by_user(user_id)
                const saved = vans_saved["saved_vans"]
                let saved_van_list = []
                for (let i = 0 ; i < saved.length; i++) {
                    const van = vans.filter(van => van["id"] === saved[i]["van_id"])[0]
                    saved_van_list.push(van)
                }
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
                                <NavLink className="non-deco" to={`../vans/${van.id}`}>
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