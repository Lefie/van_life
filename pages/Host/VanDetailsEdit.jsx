import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getVanById, editVanByHost } from "../../apis"

export default function VanDetailsEdit(){

    const [formData, setFormData] = useState({
        name:"",
        description:"",
        price:0,
        imageUrl:"",
        type:""
    })
    const params = useParams()
    const van_id = params["id"]
    const host_id = JSON.parse(localStorage.getItem("userInfo"))["_id"]
    const[error, setError]= useState()
    const [msg, setMsg] = useState("")

    function handleSubmission(){
       console.log("submit", formData)
       editVanByHost(formData, host_id, van_id)
       .then(data => {
            if (data["data"] === "success"){
                setMsg("success")
            }else{
                setMsg("failure")
            }
       })
       .catch(err=> {
        setError(err)
        setMsg("failure")
    })

    }

    function handleChange(e){
        console.log("handle chnage")
        const name = e.target.name
        const value = e.target.value
        setFormData( prev=>({
            ...prev,
            [name]:value
        }))
    }

    // the useEffect fetches the van data we are currently editing, and set the initial formData to current van data
    useEffect(()=>{
        
        getVanById(van_id)
        .then(data => {
            setFormData(
            {
                name:data["name"],
                description:data["description"],
                price:data["price"],
                imageUrl:data["imageUrl"],
                type:data["type"]
            })
        })
    },[]) 

    function DisplayMsg(){
       
        if (msg !== "" && msg === "success"){
                return (
                <>
                <p>Update Success!</p>
                </>
            )
        }

        if (msg !== "" && msg === "failure"){
                return (
                <>
                <p>Update Failed!</p>
                </>
            )
        }

        setTimeout(()=>{
            setMsg('')
        },8000)
    }

    
    return (
        <>
        <div className="van-edit-form-container">
            <form className="van-edit-form" action={handleSubmission}>
                <label>Enter the name of the van:
                    <input
                    type="text"
                    name="name"
                    value={`${formData.name}`}
                    onChange={handleChange}
                    required
                    />
                </label>
                <label>Enter the description of the van:
                    <input
                    type="text"
                    name="description"
                    value={`${formData.description}`}
                    onChange={handleChange}
                    required
                    />
                </label>
                <label>Enter the price of the van:
                    <input
                    type="number"
                    name="price"
                    value={`${formData.price}`}
                    onChange={handleChange}
                    required
                    />
                </label>
                <label>Enter the image url of the van:
                    <input
                    type="text"
                    name="imageUrl"
                    value={`${formData.imageUrl}`}
                    onChange={handleChange}
                    required
                    />
                </label>
                <label>Select a type for your van:
                    <select required className="select-type" name="type" value={`${formData.type}`} onChange={handleChange}>
                        <option value="">--Please choose an option--</option>
                        <option value="simple">Simple</option>
                        <option value="luxury">Luxury</option>
                        <option value="rugged">Rugged</option>
                    </select>
                </label>

                <button className="add-van-submit-btn">Submit</button>
                {<DisplayMsg />}
            </form>
        </div>
        </>
    )
}