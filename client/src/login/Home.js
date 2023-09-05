import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { fetchUsers } from './usersSlice'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

function Home() {
    const [showLogin, setShowLogin] = useState(true)

    //user is first reading null
    const users = useSelector((state) => state.users.entities)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    const userComps = users.map((u) => <p key={u.id}>{u.first_name}</p>)

    return(
        <div>
            <div className="large-font">Trakable</div>
            {userComps}

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