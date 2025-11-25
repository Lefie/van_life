import React from "react";
import { useState, useEffect } from "react";
import {NavLink } from "react-router-dom";
import { getVansOwnedByEachHost,get_user_info, get_list_of_hosts_names } from "../apis";

export default function VansHostNameList() {

    const [hostsList, setHostsList] = useState()

    

    useEffect(()=>{
        

        async function getHostNameList(){
            const data = await get_list_of_hosts_names()
            console.log("get name list", data)
            setHostsList(data)
        }

        getHostNameList()
    
      
    },[])
    console.log("host list host list", hostsList)
   

    return(
        <>
        <div className="vans-host-list">
            {hostsList && (hostsList.map(host => (
                <>
                <NavLink 
                to={`${host["name"].toLowerCase()}`}
                state={{name:host["name"]}}
                >
                 <p>{host["name"]}</p>
                </NavLink>
                </>
            )))}
        </div>
        </>
    )
}

