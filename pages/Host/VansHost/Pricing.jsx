import React from "react";
import { useOutletContext } from "react-router-dom";

export default function Pricing() {
    const van = useOutletContext()
    
    return (
        <>
        <h1> pricing section </h1>
        </>
    )
}