import React from "react";
import bg2 from "../assets/bg2.png"
import { Link } from "react-router-dom";

export default function Main({cur}) {
    console.log("Main rendered")

    if(cur === "home") {
        return (
            <>
            <div className="main-content home-content">
                <h1> You got the travel plans, we got the travel vans. </h1>
                <p>Add adventure to your life by joining the #vanlife movement. Rent the perfect van to make your perfect road trip.</p>
                <Link to="vans" className="main-button" > Find your van</Link>
            </div>
    
            </>
        )
    }

    if(cur === "about") {
        return (
            <>
             <div className="main-content about-content">
                <img className="about-img" src={bg2} alt="van life" />
                <div className="about-content-container">
                    <h2>Don’t squeeze in a sedan when you could relax in a van.</h2>
                    <p>Our mission is to enliven your road trip with the perfect travel van rental. Our vans are recertified before each trip to ensure your travel plans can go off without a hitch.
                    (Hitch costs extra 😉)</p>
                    <p>Our team is full of vanlife enthusiasts who know firsthand the magic of touring the world on 4 wheels.</p>
                </div>
                <div className="explore">
                    <h2> Your destination is waiting.
                    Your van is ready.</h2>
                    <Link className="about-content-link" to="../vans"> Explore our vans </Link>
                </div>
            </div>
            </>
        )
    }

   
   
}