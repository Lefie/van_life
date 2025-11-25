import { useState, useEffect } from "react";
import { NavLink, useParams, useLocation } from "react-router-dom";
import { getVansOwnedByEachHost,get_user_info, get_list_of_hosts_names } from "../apis";
import FilterBtn from "../ui_components/FilterBtn";
import Nav from "../ui_components/Nav";


export default function HostProfile() {
    const [vanData, setVanData] = useState()
    const [hostInfo, setHostInfo] = useState({name:""})
    const [hostVans, setHostVans] = useState([])
    const param = useParams()
    const location = useLocation()
    


    useEffect(()=>{
        async function getVanDataByEachHost(){
            const data = await getVansOwnedByEachHost()     
            console.log(data)
            setVanData(data)
        }

        getVanDataByEachHost()
        
    },[])

    useEffect(()=>{
        if (location){
            console.log("in location", location)
            if (location.state) {
                const {name} = location.state
                console.log( name)
                setHostInfo((prev)=>({
                    ...prev,
                    name:name,
                }))
            }
        }
    },[])

    useEffect(() => {

        async function findHostVans(hostInfo, vanData){
            console.log(vanData)
            const {name} = hostInfo
            console.log(name)
            const dataPromises = vanData.map(async(van)=>{
                const hostId = van["_id"]
                const hostInfo = await get_user_info(hostId)
                return {
                    ...van,
                    host_name:hostInfo["name"]
                }
            })
            const data = await Promise.all( dataPromises)
            const res = data.filter(d => d.host_name === name)
            console.log(res)
            setHostVans(res[0]["vans"])
        
        }

        if(hostInfo && vanData){
            findHostVans(hostInfo, vanData)
        }
        
    },[hostInfo, vanData])

    return( 
        <>
        <div className="vans-host-profile">
            <h1> Host Profile </h1>
            <h2>{hostInfo["name"]}</h2>
            <div className="host-vans">
                {hostVans && hostVans.map(van => (
                    <div className={"van"}>
                        <NavLink to={`../vans/${van._id}`}>
                            <img className="van_img" src={van.imageUrl} alt={`van ${van._id}`} />
                            <div className="van-desc">
                                <p className="van-name">{van.name}</p>
                                <p className="van-price">${van.price} <span>/day</span></p>
                            </div>
                             <FilterBtn name={van.type}  />
                        </NavLink>
                    </div>
                ))}

                {
                    hostVans && hostVans.length === 0 && (
                        <div>
                            <h2>{hostInfo["name"]} does not have any vans yet ! check back in later!</h2>
                        </div>
                    )
                }
             
            </div>
            
        </div>
        </>
    )
}

/*
const displayVan = filtered_vans.map(van => (
        <div className={"van"}>
            <NavLink 
                to={`${van._id}`} 
                state={{
                    search:searchParams.toString()
                    }}>
                <img className="van_img" src={van.imageUrl} alt={`van ${van._id}`} />
                <div className="van-desc">
                    <p className="van-name">{van.name}</p>
                    <p className="van-price">${van.price} <span>/day</span></p>
                </div>
                <FilterBtn name={van.type}  />
            </NavLink>
        </div>
    ))

*/