import React from "react";
import { useState, useEffect } from "react";
import { Link, NavLink,useSearchParams } from "react-router-dom";
import FilterBtn from "../ui_components/FilterBtn";
import { getVans } from "../apis";


export default function Vans() {
    const url = `/api/vans`
    const [vans, setVans] = useState([])
    const [selected, setSelected] = useState()
    const [searchParams, setSearchParams] = useSearchParams()
    const filterType = searchParams.get("type")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
   
    if (searchParams) {
       console.log( searchParams.getAll("type"))
        
    }
    
    useEffect(()=>{
       async function loadAllVans() {
            setLoading(true)
            try {
                const res = await getVans()
                setVans(res)
            }catch(err){
    
                setError(err)
            }finally{
                setLoading(false)
            }
       }
       loadAllVans()
    },[])

    const filtered_vans = filterType ? vans.filter((v) => v.type === filterType) : vans


    const displayVan = filtered_vans.map(van => (
        <div className={"van"}>
            <NavLink 
                to={`${van.id}`} 
                state={{
                    search:searchParams.toString()
                    }}>
                <img className="van_img" src={van.imageUrl} alt={`van ${van.id}`} />
                <div className="van-desc">
                    <p className="van-name">{van.name}</p>
                    <p className="van-price">${van.price} <span>/day</span></p>
                </div>
                <FilterBtn name={van.type}  />
            </NavLink>
        </div>
    ))

    function handleClick(label,key, value) {
        console.log(label, key, value)
        if(selected === label ){
            setSelected('')
        }else{
            setSelected(label)
        }

    
        console.log(key, value)
        setSearchParams(prevParams => {
            if (value === null){
                prevParams.delete(key)
            }else {
                prevParams.set(key, value)
            }
            return prevParams
        } )
        
        
    }

    if (loading) {
        return (
            <>
             <div className="vans-main-container">
                <h1>...loading</h1>
             </div>
            </>
        )
    }

    if (error) {
       return(
        <div className="vans-main-container">
                <p>{error.status}</p>
                <p>{error.message}</p>
        </div>
       ) 
    }
    
    return (
        <>
            <div className="vans-main-container">
                <div className="vans-main-container-header">
                    <h1> Explore our van options </h1>
                    <div className="vans-main-container-filter">
                       <button onClick={()=>handleClick("simple-btn","type","simple")} className={`btn btn1 ${selected === "simple-btn" ? selected : ""}`}>Simple</button>
                       <button onClick={()=>handleClick("luxury-btn","type","luxury")} className={`btn btn2 ${selected === "luxury-btn" ? selected : ""}`}>Luxury</button>
                       <button onClick={()=>handleClick("rugged-btn","type","rugged")} className={`btn btn3 ${selected === "rugged-btn" ? selected : ""}`}>Rugged</button>
                      {filterType && 
                         <button onClick={()=>handleClick("clear-filter","type",null)} className={`clear-filter`}> Clear Filters</button>
                      }
                     
                    </div>
                </div>
                
                
                <div className="vans-container">
                    {displayVan}
                </div>
            </div>
           
        </>
    )
}