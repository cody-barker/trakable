import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {createTask} from '../users/usersSlice'

function TaskForm() {
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.users.currentUser)
    const allProjects = useSelector((state) => state.projects.entities)
    const allTeams = useSelector((state) => state.teams.entities)
    const errors = useSelector((state) => state.users.errors)

    const userProjects = allProjects.filter((project) => project.creator_id === currentUser.id)
    const projectOptions = userProjects.map((project) => {
        return (
            <option key={project.id} value={project.id}>
                {project.name}
            </option>
    )})

    const userTeams = allTeams.filter((t) => t.auth_users.includes(currentUser.id))
    const teamOptions = userTeams.map((team) => {
        return (
            <option key={team.id} value={team.id} name={team.name}>
                {team.name}
            </option>
    )})

    const [inputState, setInputState] = useState({
        name: "",
        due_date: "",
        description: "",
    })

    const {name, due_date, description} = inputState

    function onInputChange(e){
        setInputState({
            ...inputState,
            [e.target.name]: e.target.value
        })
    }

    const [projectID, setProjectID] = useState("")
    const [teamID, setTeamID] = useState("")

    const formData = {
        name,
        due_date,
        description,
        project_id: projectID,
        team_id: teamID,
        user_id: currentUser.id
    }

    function onProjectChange(e) {
        setProjectID(parseInt(e.target.value, 10))
    }

    function onTeamChange(e) {
        setTeamID(parseInt(e.target.value, 10))
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(createTask(formData))
        setInputState({
            name: "",
            due_date: "",
            description: "",
        })
        setProjectID("")
        setTeamID("")
    }

    const filteredErrors = errors.flatMap((userErrors) =>
        userErrors.errors.filter((error) =>
            ![
            'Team is not a number',
            'Project is not a number',
            'Project must exist',
            'Team must exist',
            ].includes(error)
        )
    );

    return(
        <form onSubmit={handleSubmit}>
            {filteredErrors.length > 0 && (
                <div className="error-messages">
                    <ul>
                        {filteredErrors.map((error, index) => (
                        <li key={index} className="errors">
                            {error}
                        </li>
                        ))}
                    </ul>
                </div>
            )}
            <label>
                Task Name
                <input
                    name="name"
                    type="text"
                    autoComplete="off"
                    value={name}
                    onChange={onInputChange}
                />
            </label>
            <label>
                Due Date
                <input
                    className="date"
                    name="due_date"
                    type="date"
                    autoComplete="off"
                    value={due_date}
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
            <label>
                Team
                <select onChange={onTeamChange} value={teamID}>
                    <option name="" value="">
                        ---Select a Team---
                    </option>
                        {teamOptions}
                </select>
            </label>
            <label>
                Project
                <select onChange={onProjectChange} value={projectID}>
                    <option name="" value="">
                        ---Select a Project---
                    </option>
                        {projectOptions}
                </select>
            </label>
            <button className="add-btn" type="submit">
                Submit task
            </button>
        </form>
    )
}

export default TaskForm