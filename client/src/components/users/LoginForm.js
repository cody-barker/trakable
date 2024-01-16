import { useState } from 'react'
import { useDispatch } from "react-redux"
import { loginUser } from "../../state/usersSlice"

function LoginForm () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch()
    
    const formData = {
        email,
        password
    }

    function handleSubmit(e){
        e.preventDefault();
        setIsLoading(true);
        dispatch(loginUser(formData))
        .then(() => {
            setIsLoading(false)
            setEmail("");
            setPassword("");
        })
        .catch((error) => {
            console.log('Login error:', error)
        })
    }

    return(
        <form className="flex-container flex-col flex-center" onSubmit={handleSubmit}>
            <label className="form-label">
                Email address
                <input
                    name="email"
                    type="text"
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
            </label>
            <label className="form-label">
                Password
                <input
                    name="password"
                    type="password"
                    autoComplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
            </label>
            <button className="submit-btn margin-top-20" type="submit">
                {isLoading ? "Loading..." : "Sign In"}
            </button>
        </form>
    )
}

export default LoginForm