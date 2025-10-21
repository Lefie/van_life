import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import FilterBtn from "../ui_components/FilterBtn";
import { getVanById, book_rental, add_to_saved_vans, remove_from_saved_vans, get_all_vans_saved_by_user } from "../apis";
import StatusBtn from "../ui_components/StatusBtn";
import Message from "../ui_components/Message";
import { useNavigate } from "react-router-dom";

export default function VanDetails(){
    const param = useParams()
    const van_id = param.id
    const [vanDetails, setVanDetails] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const location = useLocation()
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [hidden, setHidden] = useState("hidden")
    const [bookSuccess, setBookSuccess] = useState(false)
    const [bookFail, setBookFail] = useState(false)
    const [msg, setMsg] = useState(null)
    const [active, setIsActive] = useState(false)
    const [user_id, setUserId] = useState(localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo"))["_id"] : "")
    const [savedVans, setSavedVans] = useState()
    const navigate = useNavigate()

    console.log("hello from van details line 29", localStorage.getItem("userInfo") ? "tes":"no", user_id)

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
                const van = await getVanById(id)
                if (user_id !== ""){
                    const vans_saved_by_user = await get_all_vans_saved_by_user(user_id)
                    setSavedVans(vans_saved_by_user)
                }
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

    // heart filled or no fill
    useEffect(()=>{
        if (savedVans) {
            console.log("saved vans from line 84",savedVans)
            savedVans.map(saved_van => {
                if (saved_van["van_id"] === van_id) {
                    setIsActive(true)
                }
            })
        }
    },[savedVans])
    
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

    // if this van is in saved_van db then it should be active - useEffect


    function handleHeart(van_id) {
        if (active === true){
            console.log("active false")
            remove_from_saved_vans(van_id, user_id)
            setIsActive(false)
        }else{
            console.log("active true")
            console.log("Add current van to saved db")
            console.log(van_id, user_id)
            add_to_saved_vans(van_id, {"user_id":user_id})
            setIsActive(true)
        }
    }

    function updateStartDateVal(e){
        console.log("start date",e.target.value)
        setStartDate(e.target.value)
    }

    function updateEndDateVal(e) {
        console.log("end date", e.target.value)
        setEndDate(e.target.value)
    }


    function book(){
        // make sure have both dates
        if (startDate === "" || endDate === ""){
            setMsg("please enter both dates")
            console.log("please enter both dates")
            setTimeout(()=>{
                setMsg(null)
            },2000)
            return
        }else {
            const curDate = new Date()
            const startDateObj = new Date(startDate)
            const endDateObj = new Date(endDate)
            console.log(startDateObj, endDateObj)

            if (startDateObj < curDate){
                console.log("start date must be at least today")
                setMsg("start date must be at least today")
                setTimeout(()=>{
                    setMsg(null)
                },2000)
                return
            }

            if (endDateObj < startDateObj) {
                setMsg("end date must be at least the start date")
                setTimeout(()=>{
                    setMsg(null)
                },2000)
                return
            }

            console.log("valid dates")
            const data_obj = {
                van_id:van_id,
                user_id:user_id,
                startDate:startDate,
                endDate:endDate
            }

            book_rental(data_obj)
            .then((resp)=>{
                console.log("Responseeee")
                if (resp["success"] === "true") {
                    setBookSuccess(true)
                    setTimeout(()=>{
                        setBookSuccess(false)
                        console.log("navigate elsewhere")
                        const userinfo = JSON.parse(localStorage.getItem("userInfo"))
                        const username = userinfo["name"]
                        navigate(`/${username}/upcoming_rental`)
                    },3000)
                }else{
                    setError(resp["error"])
                    setBookFail(true)
                    setTimeout(()=>{
                        setBookFail(false)
                    },3000)
                }
            })
            .catch(err => {
                setError(err)
                setBookFail(true)
                setTimeout(()=>{
                    setBookFail(false)
                },3000)
            })
           
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
                    {user_id !== "" ? (active ? <i className="fa-solid fa-heart heart-icon-style solid-heart" onClick={()=> {handleHeart(van_id)}}></i> :
                    <i className="fa-regular fa-heart heart-icon-style" onClick={()=> {handleHeart(van_id)}}></i>) : <></> }
                    
                    <div className="van-details-content">
                        <FilterBtn  name={`${vanDetails.type}`} />
                        <h2>{vanDetails.name}</h2>
                        <p className="price">${vanDetails.price}<span>/Day</span></p>
                        <p>{vanDetails.description}</p>
                        {user_id !== ""?(<button onClick={handlePopupVisibility} className="main-button"> Rent this Van</button>):(<></>)}
                        
                    </div>
                    <section className={`rental-pop-up ${hidden}`}>
                        {vanDetails && (
                            <>
                                <form action={book} className="rental-pop-up-form">
                                <h3>Book {vanDetails["name"]} now! </h3>
                             
                                <button className="cancel-btn" onClick={()=>{setHidden("hidden")}}>X</button>
                                <article>
                                    <label htmlFor="rental-start-date"> Your desired rental start date</label>
                                    <input
                                        type="date"
                                        id="rental-start-date"
                                        name="rental-start-date"
                                        value={startDate}
                                        onChange={updateStartDateVal}
                                     />
                                </article>
                                <article>
                                    <label htmlFor="rental-end-date"> Your desired rental end date</label>
                                    <input
                                        type="date"
                                        id="rental-end-date"
                                        name="rental-end-date"
                                        value={endDate}
                                        onChange={updateEndDateVal}
                                     />
                                </article>
                                <Message msg={msg} />
                                <button className="book-btn"> Book </button>
                                {bookSuccess && <StatusBtn name="success" /> }
                                {bookFail && <StatusBtn name="fail" /> }
                                </form>
                            
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