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

    return (
      <div className="flex-container flex-col flex-center height--100svh">
        <h1 className="header">Trakable</h1>

        {showLogin ? (
          <div className="flex-container flex-col flex-center login-form">
            <h2>Welcome to Trakable</h2>
            <p>To begin, please sign in.</p>
            <LoginForm />
            {errors.length > 0 ? errorComps : null}

            <div className="centered-container">
              <p className="login-question">Don't have an account? &nbsp;</p>
              <button
                className="submit-btn"
                onClick={() => setShowLogin(false)}
              >
                Sign Up
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-container flex-col flex-center login-form">
            <SignUpForm />

            <div className="centered-container">
              <p className="login-question">Already have an account? &nbsp;</p>
              <button className="submit-btn" onClick={() => setShowLogin(true)}>
                Log In
              </button>
            </div>
          </div>
        )}
      </div>
    );
}

export default LoginPage