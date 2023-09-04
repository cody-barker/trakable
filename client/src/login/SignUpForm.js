import { useState } from 'react'
import Error from './Error'

function SignUp() {

    const [errors, setErrors] = useState([]);
    const [isLoading, setisLoading] = useState(false);

    const [inputState, setInputState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        title: "",
    })

    const {
        firstName ,
        lastName,
        email,
        password,
        passwordConfirmation,
        title,
    } = inputState

    function onInputChange(e){
        setInputState({
            ...inputState,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        setErrors([])
        setisLoading(true)
        fetch('/signup', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                email,
                password,
                password_confirmation: passwordConfirmation,
                title
            })
        }).then((r) => {
            setisLoading(false)
            // if (r.ok) {
            //     r.json().then((user) => setUser(user))
            // } else {
            //     r.json().then((err) => setErrors(err.errors))
            // }
        })
    }

    return(
        <form onSubmit={handleSubmit}>
            <label>
                First Name
                <input
                name="firstName"
                type="text"
                autoComplete="off"
                value={firstName}
                onChange={onInputChange}
                ></input>
            </label>
            <label>
                Last Name
                <input
                name="lastName"
                type="text"
                autoComplete="off"
                value={lastName}
                onChange={onInputChange}
                ></input>
            </label>
            <label>
                Title
                <input
                name="title"
                type="text"
                autoComplete="off"
                value={title}
                onChange={onInputChange}
                ></input>
            </label>
            <label>
                Email
                <input
                name="email"
                type="text"
                autoComplete="off"
                value={email}
                onChange={onInputChange}
                ></input>
            </label>
            <label>
                Password
                <input
                name="password"
                type="password"
                autoComplete="off"
                value={password}
                onChange={onInputChange}
                ></input>
            </label>
            <label>
                Password Confirmation
                <input
                name="passwordConfirmation"
                type="password"
                autoComplete="off"
                value={passwordConfirmation}
                onChange={onInputChange}
                ></input>
            </label>

            <button className="login-btn" type="submit">{isLoading? "Loading..." : "Sign Up"}</button>
            <div className="errors-div">
                {errors.map((err) => (
                    <Error key={err}>{err}</Error>
                ))}
            </div>
        </form>
    )
}

export default SignUp