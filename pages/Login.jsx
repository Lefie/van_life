import React from "react";
import { useState } from "react";
import { login } from "../apis";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserLoginContext } from "../context/UserLoginContext";
import { Link, NavLink } from "react-router-dom";

export default function Login(){
    const [loginData, setLoginData] = useState({
        email:"",
        password:""
    })

    const [error, setError] = useState()
    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    console.log("log in page location state",location.state)
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
            console.log("logging in",data)
            const name = data["user"]["name"]
            const isHost = data["user"]["isHost"]
           
            handleLogin(data)
            // if the user is a host
            if (!isHost){
                navigate(`../${name}`)
            }else {
                navigate("/host")
            }

        })
        .catch(err => {
            console.log("here is the loggin error", err)
            setError(err)
        })
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
                <p>Don’t have an account? <Link className="link-to-register" to="../register"><span className="login-create-msg">Create one now</span></Link></p>
            </div>
        </div>
        </>
    )
}