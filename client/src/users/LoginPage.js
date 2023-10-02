import { useState } from 'react'
import { useSelector } from "react-redux"

import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

function LoginPage() {
    const errors = useSelector((state) => state.users.errors)
    const [showLogin, setShowLogin] = useState(true)
    
    const errorComps = errors.map((e, index) => (
        <div key={index} className="error-container">
            {e.errors.map((errorMessage, i) => (
                <p key={i} className="errors">
                    {errorMessage}
                </p>
            ))}
        </div>
    ));

    return(
        <div className="parent">
            <h1 className="header">Trakable</h1>
           
            {showLogin ? (
                <div className="login-form-container">
                    <h2>Welcome to Trakable</h2>
                    <p>To begin, please sign in.</p>
                    <LoginForm />
                    {errors.length > 0 ? errorComps : null}
                    <hr></hr>
                    <p>
                        Don't have an account? &nbsp;
                        <button className="login-btn"
                         onClick={() => setShowLogin(false)}>
                         Sign Up
                        </button>
                    </p>
                </div>
            ) : (
                    <div className="login-form-container">
                        <SignUpForm />
                        <hr></hr>
                        <p>
                            Already have an account? &nbsp;
                            <button className="login-btn"
                            onClick={() => setShowLogin(true)}>
                            Log In
                            </button>
                        </p>
                    </div>
            )}
        </div>
    );
}

export default LoginPage