import React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getVansHost, deleteVanByHost } from "../../apis";
import { useNavigate } from "react-router-dom";

export default function VansHost() {
    const [vans, setVans] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [deleteError, setDeleteError] = useState()
    const navigate = useNavigate()

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

    function handleDelete(host_id, van_id){        
        deleteVanByHost(host_id, van_id)
        .then(data=>{
            console.log("this is the data of the van deleted", data)
            setVans(() => vans.filter(van => van._id !== van_id ))
        })
        .catch(err => {
            console.log("an error occured", err)
            setDeleteError(err)
        })
    }



    return (
        <>
        <div className="van-host-container">
            <h1> Your listed vans </h1>
            
            <div className="vans-by-host">
                <button className="add-btn" onClick={(e)=>{
                    e.preventDefault()
                    navigate('van/new')
                    }}>+</button>
                { vans && vans.map((van)=>(
                    <>
                    <NavLink className="van-link"  to={`${van._id}`}>
                        <div className="single-van">
                            <img src={van.imageUrl} />
                            <div className="single-van-desc">
                                <p className="van-name">{van.name}</p> 
                                <p>${van.price} / Day</p>
                            </div>

                            <button className="host-edit-van-btn" 
                                onClick={(e)=>{
                                e.preventDefault();
                                navigate(`${van._id}/setting`);
                            }}>  Edit </button>

                            <button onClick={(e)=>{ 
                                e.preventDefault();
                                const user_info = JSON.parse(localStorage.getItem("userInfo"))
                                const host_id = user_info["_id"]
                                handleDelete(host_id, van._id)
                            }} className="host-delete-van-btn">  Delete </button>
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