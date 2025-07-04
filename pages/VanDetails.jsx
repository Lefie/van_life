import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import FilterBtn from "../ui_components/FilterBtn";
import { getVanById } from "../apis";

export default function VanDetails(){
    const param = useParams()
    console.log("param",param)
    const van_id = param.id
    console.log("van id",van_id)
    const [vanDetails, setVanDetails] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const location = useLocation()
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [hidden, setHidden] = useState("hidden")


    function generateName() {
        if(location.state){
            
            if(location.state.search){
                console.log(location.state.search.slice(5))
                return location.state.search.slice(5)
            }else {
                console.log("all")
                return "all"
            }
        }
    }

    function generateBackLink(){
        console.log(location)
        if ( location.state ) {
            if(location.state.search){
                
                return `?${location.state.search}`
            }else{
                return ""
            }
        }
        return ""
    }

    useEffect(()=>{
        async function getVan(id){
            setLoading(true)
            try {
                console.log("hello")
                const van = await getVanById(id)
                setVanDetails(van)

            }catch(error){
                console.log("error")
                setError(error)
            }finally{
                setLoading(false)
            }
        }

        getVan(van_id)
    },[param.id])

    if(vanDetails) {
        console.log("van details",vanDetails)
    }

    if(loading) {
        return <>
         <div className="vans-details-container">
            <h1> Loading ... </h1>
         </div>
        </>
    }

    if(error){
        return <>
         <div className="vans-details-container">
           <p>{error.message}</p>
           <p>{error.status}</p>
         </div>
        </>
    }

    function handlePopupVisibility() {
        if (hidden === "hidden") {
            console.log("flip to non hidden")
            setHidden("")
        }
    }

  

    return(
        <>
        <div className="vans-details-container">
            {vanDetails &&
            (
                <>
                <div className="van-details">
                    <Link className="back" to={`..${generateBackLink()}`} relative="path"><p> Back to {generateName()}  vans</p></Link>
                    <img className="van-img-details" src={vanDetails.imageUrl} />
                    <div className="van-details-content">
                        <FilterBtn  name={`${vanDetails.type}`} />
                        <h2>{vanDetails.name}</h2>
                        <p className="price">${vanDetails.price}<span>/Day</span></p>
                        <p>{vanDetails.description}</p>
                        <button onClick={handlePopupVisibility} className="main-button"> Rent this Van</button>
                    </div>
                    <section className={`rental-pop-up ${hidden} show`}>
                        {vanDetails && (
                            <>
                                <p>book {vanDetails["name"]} now! </p>
                                <button onClick={()=>{setHidden("hidden")}}>X</button>
                                <article>
                                    <label htmlFor="rental-start-date"> Your desired rental start date</label>
                                    <input
                                        type="date"
                                        id="rental-start-date"
                                        name="rental-start-date"

                                     />
                                </article>

                                <article>
                                    <label htmlFor="rental-end-date"> Your desired rental start date</label>
                                    <input
                                        type="date"
                                        id="rental-end-date"
                                        name="rental-end-date"
                                     />
                                </article>

                                <button> Book </button>
                            </>
                        )}
                    </section>
                </div>
                </>
            
            )}
        </div>
        </>
    )
}