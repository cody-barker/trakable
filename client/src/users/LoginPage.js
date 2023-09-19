import { useState } from 'react'
import { useSelector } from "react-redux"

import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

function LoginPage() {

    const currentUser = useSelector((state) => state.users.currentUser)
    const errors = useSelector((state) => state.users.errors)

    const [showLogin, setShowLogin] = useState(true)
    
    const errorComps = errors.map((e, index) => (
        <ul key={index}>
            {e.errors.map((errorMessage, i) => (
                <li key={i} className="error">{errorMessage}</li>
            ))}
        </ul>
    ));

    return(
        <div>
            <div className="large-font">Trakable</div>

            {currentUser? <p>{currentUser.first_name}</p> : null}
          
            {errors.length > 0 ? errorComps : null}
           
            {showLogin ? (
                <>
                    <LoginForm />
                    <hr></hr>
                    <p>
                        Don't have an account? &nbsp;
                        <button className="login-btn"
                         onClick={() => setShowLogin(false)}>
                         Sign Up
                        </button>
                    </p>
                </>
            ) : (
                <>
                    <SignUpForm />
                    <hr></hr>
                    <p>
                        Already have an account? &nbsp;
                        <button className="login-btn"
                         onClick={() => setShowLogin(true)}>
                         Log In
                        </button>
                    </p>
                </>
            )}
        </div>
    )
}

export default LoginPage