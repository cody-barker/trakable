import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateTeam } from './teamsSlice'

function InviteForm() {
    let { id } = useParams()
    id = parseInt(id)
    const dispatch = useDispatch()
    const teams = useSelector((state) => state.teams.entities)
    const errors = useSelector((state) => state.teams.errors)
    const users = useSelector((state) => state.users.entities)
    const [email, setEmail] = useState("")
    const [emailNotFoundError, setEmailNotFoundError] = useState(false)

    function handleChange(e) {
        setEmail(e.target.value)
        setEmailNotFoundError(false)
    }

    function handleSubmit(e) {
        e.preventDefault()
        let team = teams.find((t) => t.id === id)
        let user = users.find((u) => u.email === email)
        
        if (user) {
            const updatedTeam = {
                ...team,
                auth_users: [...team.auth_users, user.id]
            }
            dispatch(updateTeam(updatedTeam))
        } else {
            setEmailNotFoundError(true)
        }
    }

    const errorComps = errors.map((teamErrors, teamIndex) => (
        <div key={teamIndex}>
            {teamErrors.errors.map((error, index) => (
                <div className="error" key={index}>{error.slice(11)}</div>
            ))}
        </div>
    ));

    return (
        <form onSubmit={handleSubmit}>
            {errorComps}
            {emailNotFoundError && (
                <div className="error">User with this email not found.</div>
            )}
            <label>User's Email
                <input
                    onChange={handleChange}
                    type="text"
                    name="email"
                    value={email}
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    )
}

export default InviteForm
