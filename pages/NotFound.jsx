import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {

    return (
        <>
        <div className="not-found-container">
            <h1>Sorry, the page you were looking for was not found.</h1>
            
            <Link className="not-found-link"  to="/"> <button className="redirect-home">Return to Home</button> </Link>
        </div>
        </>
    )
}
