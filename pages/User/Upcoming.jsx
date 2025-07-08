import React from "react";
import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { getVans, get_upcoming_rentals } from "../../apis";


export default function Upcoming() {
    const [vans, setVans] = useState()
    const [error, setError] = useState()
    const { username } = useParams()

    useEffect(()=>{
            async function getAllVans() {
                const userinfo = JSON.parse(localStorage.getItem("userInfo"))
                const user_id = userinfo["_id"]
                const upcoming_rentals = await get_upcoming_rentals({"user_id":user_id})
                const all_vans = await getVans()
                let upcoming_list = []
                for(let i = 0; i < upcoming_rentals.length; i++){
                    const van_id = upcoming_rentals[i]["van_id"]
                    const van = all_vans.filter((van)=> van.id == van_id )
                    console.log(van[0].imageUrl, van[0]["name"],(upcoming_rentals[i]["start_date"]),upcoming_rentals[i]["end_date"])
                    
                    const start_date = new Date(upcoming_rentals[i]["start_date"])
                    const end_date = new Date(upcoming_rentals[i]["end_date"])
                    const start_date_str = `${start_date.getFullYear()}-${start_date.getMonth()+1}-${start_date.getDate()+1}`
                    const end_date_str = `${end_date.getFullYear()}-${end_date.getMonth()+1}-${end_date.getDate()+1}`
    
                    const data_obj = {
                        imageUrl:van[0].imageUrl,
                        name:van[0]["name"],
                        rental_start_date:start_date_str,
                        rental_end_date:end_date_str,
                        id:van[0]["id"]
                    }
                    upcoming_list.push(data_obj)
                }
                
                try {
                    setVans(upcoming_list)
    
                }catch(err){
                    setError(err)
                }
            }
            getAllVans()
    
        },[])
        

    return (
        <>
        <section className="upcoming-rental-container">
            <h1>Welcome {username}!</h1>
            <section className="upcoming-rentals">
                <h2>Upcoming Rental</h2>
                <article className="upcoming_vans_history_container">
                    {vans ? vans.map(van => (
                        <>
                            <article className="upcoming_vans_details">
                                <NavLink className="non-deco" to={`../../vans/${van.id}`}>
                                    <img src={`${van.imageUrl}`} alt="van-detail" />
                                    <p className="upcoming_van_name">{van.name}</p>
                                    <p className="upcoming_van_dates">{van.rental_start_date} ~ {van.rental_end_date}</p>
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
