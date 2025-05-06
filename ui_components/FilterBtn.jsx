import React from "react";

export default function FilterBtn({name}){
    
    let btn_style;
    if(name === "simple") {
        btn_style = "simple-btn"
    }else if(name === "luxury") {
        btn_style = "luxury-btn"
    }else if(name === "rugged") {
        btn_style = "rugged-btn"
    }

    return (<>
     <button  className={`btn ${btn_style} filter-btn `}>{name}</button>
    </>)

}

