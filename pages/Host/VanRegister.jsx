import { useState } from "react"
import {createVanByHost} from "../../apis"
import { useNavigate } from "react-router-dom"


export default function VanRegister(){
    const [formData, setFormData] = useState({
        name:"",
        description:"",
        price:0,
        imageUrl:"",
        type:"",
        hostId:JSON.parse(localStorage.getItem("userInfo"))["_id"] || ""

    })
    
    const [error, setError] = useState()
    const [formValid, setFormValid] = useState()
    const navigate = useNavigate()

    function handleChange(e){
       const name = e.target.name
       const value = e.target.value
       setFormData(prev => ({
        ...prev,
        [name]:value
       }))
    }


    function handleSubmission(e){
        console.log("submit", formData, formData.hostId)
       
        createVanByHost(formData,formData.hostId)
        .then(data => {
            console.log(data)
            if (data && data.van){
                navigate("/host/vans")
            }
        })
        .catch(err => setError(err))
        
    }


    return (
        <>
        <div className="van-registration-form-container">
            <form className="van-registration-form" action={handleSubmission}>
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
            </form>
        </div>
        
        </>
    )
}