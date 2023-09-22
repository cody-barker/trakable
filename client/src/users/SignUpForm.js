import { useState } from 'react'
import { signupUser } from './usersSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from "react-redux"

function SignUp() {

    const dispatch = useDispatch()

    const [isLoading, setisLoading] = useState(false);
    const errors = useSelector((state) => state.users.errors)
    const errorComps = errors.map((e, index) => (
        <div key={index} className="error-container">
            {e.errors.map((errorMessage, i) => (
                <p key={i} className="errors">{errorMessage}</p>
            ))}
        </div>
    ));

    const [inputState, setInputState] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        title: "",
    })

    const {
        first_name ,
        last_name,
        email,
        password,
        password_confirmation,
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
        setisLoading(true)
        dispatch(signupUser(inputState))
        .then(() => {
            setisLoading(false)
        })
    }

    return(
        <form className="login-form" onSubmit={handleSubmit}>
            <label>
                First Name
                <input
                name="first_name"
                type="text"
                autoComplete="off"
                value={first_name}
                onChange={onInputChange}
                ></input>
            </label>
            <label>
                Last Name
                <input
                name="last_name"
                type="text"
                autoComplete="off"
                value={last_name}
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
                name="password_confirmation"
                type="password"
                autoComplete="off"
                value={password_confirmation}
                onChange={onInputChange}
                ></input>
            </label>
            <button className="login-btn" type="submit">{isLoading? "Loading..." : "Sign Up"}</button>
            {errors.length > 0 ? errorComps : null}
        </form>
    )
}

export default SignUp