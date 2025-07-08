import React from "react";

export default function StatusBtn({name}){
    
    if (name == "success"){
        return (<>
        <button className="success-btn">booking success</button>
        </>)
    } else {

        return (<>
            <button className="fail-btn">booking fail</button>
        </>)
    }

    

}