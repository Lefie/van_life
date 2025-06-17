import React from "react";
import { useState } from "react";


export default function Registration(){
    const [formData, setFormData] = useState({
       name: '',
       email:'',
       password:'',
       isHost:false
    })

    async function handleSubmission(){
        console.log("handle submission")
        console.log(formData)
    }

    function handleChange(e){
        const name = e.target.name
        const value = name === "isHost" ? e.target.checked : e.target.value 

        console.log(name, value)
       
        setFormData(prev => ({
            ...prev,
            [name]:value
        }))
    }



    return (
        <>
        <div className="registration-form-container">
            <h1>Welcome! Create a new account</h1>
            <form action={handleSubmission}>
               <input name="name" type="text" value={`${formData.name}`} onChange={handleChange} placeholder="Emily"/>
               <input name="email" type="email" value={`${formData.email}`} onChange={handleChange} placeholder="emily@gmail.com"/>
               <input name="password" type="password" value={`${formData.password}`} onChange={handleChange} placeholder="****"/>
               <div className="isHost_checkbox">
                    <label htmlFor="isHost">isHost</label>
                    <input id="isHost" name="isHost" type="checkbox" value={`${formData.isHost}`} onChange={handleChange}  />
               </div>
                <button type="submit">register</button>
            </form>
        </div>

        </>
    )

}