import React from "react";
import { useOutletContext } from "react-router-dom";

export default function Photos() {
    const van = useOutletContext()
    
    return (
        <>
        <h1> photo section </h1>
        </>
    )
}