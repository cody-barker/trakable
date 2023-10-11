import { useDispatch, useSelector } from 'react-redux'
import { createTeam } from './teamsSlice'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function TeamForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const errors = useSelector((state) => state.teams.errors)
    const errorComps = errors.map((userErrors, userIndex) => (
        <ul key={userIndex}>
          {userErrors.errors.map((error, index) => (
            <li className="errors" key={index}>{error}</li>
          ))}
        </ul>
      ));

    const [inputState, setInputState] = useState({
        name: "",
        description: "",
    })

    const {name, description} = inputState

    function onInputChange(e){
        setInputState({
            ...inputState,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(createTeam(inputState))
        .then((response) => {
            if (!response.payload.errors) {
                alert(`Team: ${name} Created`)
                setInputState({
                    name: "",
                    description: "",
                })
                navigate("/")
            }
        })
    }

    return(
            <form className="small-form" onSubmit={handleSubmit}>
                {errorComps}
                <label>
                    Team Name
                    <input
                    name="name"
                    type="text"
                    autoComplete="off"
                    value={name}
                    onChange={onInputChange}
                    />
                </label>
                <label>
                    Description
                    <input
                    name="description"
                    type="text"
                    autoComplete="off"
                    value={description}
                    onChange={onInputChange}
                    />
                </label>
                <button className="btn" type="submit">Submit</button>
            </form>
    )
}

export default TeamForm