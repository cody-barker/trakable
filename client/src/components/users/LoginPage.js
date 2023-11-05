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
                    
                    <div className="centered-container">
                        <p>
                            Don't have an account? &nbsp;
                        </p>
                        <button className="submit-btn"
                            onClick={() => setShowLogin(false)}>
                            Sign Up
                        </button>
                    </div>
                </div>
            ) : (
                    <div className="login-form-container">
                        <SignUpForm />
                        
                        <div className="centered-container">
                            <p>
                                Already have an account? &nbsp;
                                <button className="submit-btn"
                                onClick={() => setShowLogin(true)}>
                                Log In
                                </button>
                            </p>
                        </div>
                    </div>
            )}
        </div>
    );
}

export default LoginPage