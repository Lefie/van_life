import React, { use, useEffect } from "react";
import { useState } from "react";
import { registration } from "../apis";
import { useContext } from "react";
import { UserLoginContext } from "../context/UserLoginContext";
import { login } from "../apis";
import { useNavigate } from "react-router-dom";

export default function Registration(){
    const [formData, setFormData] = useState({
       name: '',
       email:'',
       password:'',
       isHost:false
    })
    const [error, setError] =  useState()
    const [successMsg, setSuccessMsg] = useState('')
    const {handleLogin} = useContext(UserLoginContext)
    const navigate = useNavigate()

    async function handleSubmission(){
       
        console.log("handle submission")
        // TODO: handle empty fields in form

        // assuming the form is properly filled
        registration(formData)
        .then(data => {
            console.log(data["msg"])
            setError(null)
            setSuccessMsg(data["msg"])
        })
        .catch(err => {
            console.log(err)
            setError(err)
        })

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

    useEffect(()=>{
        if(successMsg) {
            setTimeout(()=>{
                setSuccessMsg('')
                console.log("user created success ")
                login(formData)
                .then(data => {
                    console.log("logging in",data)
                    handleLogin(data)
                    const name = formData["name"]
                    console.log(name)
                    const isHost = data.user["isHost"]
                    if (isHost) {
                        navigate(`../host/${name}`)
                    }else{
                        navigate(`../${name}`)
                    }
                    
                   
                })
                .catch(err => {setError(err)})
            },3000)
        }
    },[successMsg])



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
            {error && <p className="error-msg">{error["message"]}</p>}
            {successMsg && <p className="success-msg">{successMsg}</p>}
        </div>

        </>
    )

}