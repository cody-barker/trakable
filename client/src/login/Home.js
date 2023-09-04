import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { fetchCurrentUser } from './usersSlice'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

function Home() {
    const [showLogin, setShowLogin] = useState(true)

    //currentUser is first reading null
    //const currentUser = useSelector((state) => state.users.entity)
    //const dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch(fetchCurrentUser())
    // } ,[dispatch])

    return(
        <div>
            <div className="large-font">Trakable</div>

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

export default Home