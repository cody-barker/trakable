import { useState } from 'react'
// import Error from './Error'
import { useDispatch } from "react-redux"
import { loginUser } from "./usersSlice"

function LoginForm () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch()
    let formData = {
        email,
        password
    }

    function handleSubmit(e){
        e.preventDefault();
        setIsLoading(true);
        dispatch(loginUser(formData))
        .unwrap()
        .then(() => {
            setIsLoading(false)
            setEmail("");
            setPassword("");
        })
        .catch((error) => {
            setIsLoading(false);
            console.error('Login failed:', error);
        })

        // fetch('/login', {
        //     method: "POST",
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ email, password })
        // }).then((r) => {
            // setIsLoading(false)
            // if (r.ok) {
            //     r.json().then((user) => setUser(user))
            // } else {
            //     r.json().then((err) => setErrors(err.errors))
            // }
        // })
    }

    return(
        <form onSubmit={handleSubmit}>
            <label>
                Email
                <input
                name="email"
                type="text"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                ></input>
            </label>
            <label>
                Password
                <input
                name="password"
                type="password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                ></input>
            </label>

            <button className="login-btn" type="submit">{isLoading? "Loading..." : "Login"}</button>

                {/* {errors.map((err) => (
                    <Error key={err}>{err}</Error>
                ))} */}
        </form>
    )
}

export default LoginForm