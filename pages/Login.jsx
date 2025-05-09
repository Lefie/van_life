import React from "react";
import { useState } from "react";
import { login } from "../apis";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserLoginContext } from "../context/UserLoginContext";

export default function Login(){
    const [loginData, setLoginData] = useState({
        email:"",
        password:""
    })

    const [error, setError] = useState()
    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    console.log(location.state)
    const prevAuthpath = location.state === ""? "/host":location.state
    const {handleLogin} = useContext(UserLoginContext)

    function updateInfo(e){
        const value = e.target.value
        const name = e.target.name
        setLoginData(prev => ({
            ...prev,
            [name] : value
        }))
    }

    function submitForm(formData){
        setSubmitting(true)
        login(loginData)
        .then(data => {
            setError(null)
            console.log(data)
            handleLogin()
            navigate(prevAuthpath || "/host")
        })
        .catch(err => {setError(err)})
        .finally(()=>{
            setSubmitting(false) 
        })

    }

    return (
        <>
        <div className="login-form-container">
            <div className="login-form">
                {location && location.state ? <p className="error-msg"> you have to sign in first </p>:""}
                <h1>Sign in to your account</h1>

                {<p className="error-msg">{error && error.message}</p>}
                
                <form action={submitForm}>
                    <input 
                    className="email-input"
                    onChange={updateInfo}
                    name="email"
                    type="email"
                    value={`${loginData.email}`}
                    placeholder="Email Address"
                        />

                    <input 
                        className="password-input"
                        onChange={updateInfo}
                        name="password"
                        type="password"
                        value={`${loginData.password}`}
                        placeholder="Password"
                    />
                
                    <br/>

                    <button disabled={submitting} type="submit" className="sign-in-btn main-button">
                        {submitting ? "Signing you in":"sign in"}        
                    </button>                    
                </form>
                <p>Don’t have an account? <span className="login-create-msg">Create one now</span></p>
            </div>
        </div>
        </>
    )
}