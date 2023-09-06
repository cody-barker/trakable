import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { fetchCurrentUser } from './usersSlice'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

function Home() {
    const [showLogin, setShowLogin] = useState(true)
    const currentUser = useSelector((state) => state.users.currentUser)
    const loginErrors = useSelector((state) => state.users.errors)
    const dispatch = useDispatch()
    const errorComps = loginErrors.map((e) => {
      return <p>{e.error}</p>
    })

    console.log(loginErrors)

    useEffect(() => {
        dispatch(fetchCurrentUser())
    }, [dispatch])

    return(
        <div>
            <div className="large-font">Trakable</div>

            {currentUser? <p>{currentUser.first_name}</p> : null}
          
            {loginErrors.length > 0 ? errorComps : null}
           

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