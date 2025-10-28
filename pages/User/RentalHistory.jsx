import React from "react";
import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { getVans, get_rental_history } from "../../apis";


export default function RentalHisotry(){
    const [vans, setVans] = useState()
    const [error, setError] = useState()
    const { username } = useParams()

    useEffect(()=>{
            async function getAllVans() {
                const all_vans = await getVans()
                console.log("get vanssss", all_vans)
                const rental_history = await get_rental_history()

                console.log(rental_history,"rental history")
                let rental_history_list = []
                
                for (let i = 0; i < rental_history.length; i++) {
                    const van_id = rental_history[i]["van_id"]
                    const van = all_vans.filter((van)=> van._id == van_id )
                    console.log(van[0].imageUrl, van[0]["name"],(rental_history[i]["start_date"]),rental_history[i]["end_date"])
                    console.log(van,"from rental list")
                    const start_date = new Date(rental_history[i]["start_date"])
                    const end_date = new Date(rental_history[i]["end_date"])
                    const start_date_str = `${start_date.getFullYear()}-${start_date.getMonth()+1}-${start_date.getDate()+1}`
                    const end_date_str = `${end_date.getFullYear()}-${end_date.getMonth()+1}-${end_date.getDate()+1}`
    
                    const data_obj = {
                        imageUrl:van[0].imageUrl,
                        name:van[0]["name"],
                        rental_start_date:start_date_str,
                        rental_end_date:end_date_str,
                        id:van[0]["_id"]
                    }
                    rental_history_list.push(data_obj)
                }

                try {
                    setVans(rental_history_list)
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
                    {vans && vans.length > 0 ? vans.map(van => (
                        <>
                            <article className="rented_vans_details">
                                <NavLink className="non-deco" to={`../../vans/${van["id"]}`}>
                                    <img src={`${van.imageUrl}`} alt="van-detail" />
                                    <p className="rented_van_name">{van.name}</p>
                                    <p className="van_dates">{van.rental_start_date} ~ {van.rental_end_date}</p>
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