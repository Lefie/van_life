import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { NavLink,Link, Outlet } from "react-router-dom";
import FilterBtn from "../../ui_components/FilterBtn";
import { getVanHostId } from "../../apis";

export default function VansDetailsHost() {
    const {id} = useParams()
    const [van, setVan] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()

    useEffect(()=>{
       async function getHostVansId(van_id) {
        setLoading(true)
        try{
            const userinfo = JSON.parse(localStorage.getItem("userInfo"))
            console.log(userinfo,"from vansdetails host")
            if (userinfo){
                const data = await getVanHostId(userinfo["_id"],van_id)
                setVan(data)
            }
            

        }catch(err){
            console.log(err)
            setError(err)
        }finally{
            setLoading(false)
        }
       }

       getHostVansId(id)
    },[id])

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

    

    const styles = {
        textDecoration : "underline",
        color: "black",
        fontWeight: "bold"

    }

    return (
        <>
        <div className="van-host-container">
            <Link to=".." relative="path" className="back-link">back to all vans</Link>
              {van && (
                <>  
                <div className="van-host-details-container">
                    <div className="van-details-by-host">
                        <img src={van.imageUrl} />
                        <div className="van-profile">
                            <FilterBtn  name={`${van.type}`}/>
                            <p className="van-name">{van.name}</p>
                            <p>${van.price} / day</p>
                        </div>
                </div>
                    <div className="van-host-details-links">
                        <NavLink style={({isActive})=> isActive ? styles : null} to="." end>Details</NavLink>
                        <NavLink style={({isActive})=> isActive ? styles : null} to={`pricing`}>Pricing</NavLink>
                        <NavLink style={({isActive})=> isActive ? styles : null} to={`photos`}> Photos</NavLink>
                    </div>
                    <Outlet context={van} />
                </div>
                </>
              )}

        </div>
       
        </>
    )
}