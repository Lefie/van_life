import React from "react";

export default function Login(){

    return (
        <>
        <div className="login-form-container">
            <div className="login-form">
                <h1>Sign in to your account</h1>
                
                <form>
                    <input 
                    className="email-input"
                    name="email"
                    type="email"
                    placeholder="Email Address"
                        />

                    <input 
                        className="password-input"
                        name="password"
                        type="password"
                        placeholder="Password"
                    />
                
                    <br/>

                    <button className="sign-in-btn main-button">sign in</button>
                </form>
                <p>Don’t have an account? <span className="login-create-msg">Create one now</span></p>
            </div>
        </div>
        </>
    )
}