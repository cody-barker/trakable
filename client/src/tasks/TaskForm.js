import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {createTask} from '../users/usersSlice'
import { updateTeamTask } from '../teams/teamsSlice'

//need to decide how to route around in order to create new tasks and projects that are appropriately associated

function TaskForm({vis, setVis}) {

    const dispatch = useDispatch()

    const currentUser = useSelector((state) => state.users.currentUser)
    const allProjects = useSelector((state) => state.projects.entities)
    const allTeams = useSelector((state) => state.teams.entities)
    const userProjects = allProjects.filter((project) => project.creator_id === currentUser.id)
    const projectOptions = userProjects.map((project) => {
        return <option key={project.id} value={project.id}>{project.name}</option>
    })
    const userTeams = allTeams.filter((team) => team.creator_id === currentUser.id)
    const teamOptions = userTeams.map((team) => {
        return <option key={team.id} value={team.id} name={team.name}>{team.name}</option>
    })

    const [inputState, setInputState] = useState({
        name: "",
        due_date: "",
        description: "",
    })

    const {
        name,
        due_date,
        description,
    } = inputState

    function onInputChange(e){
        setInputState({
            ...inputState,
            [e.target.name]: e.target.value
        })
    }

    const [projectID, setProjectID] = useState("")
    const [teamID, setTeamID] = useState("")

    function onProjectChange(e) {
        setProjectID(e.target.value)
    }

    function onTeamChange(e) {
        setTeamID(e.target.value)
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
        // setVis(!vis)
    }

    const formData = {
        name,
        due_date,
        description,
        project_id: projectID,
        team_id: teamID,
    }

    return(
        <form onSubmit={handleSubmit}>
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
                    <option name="" value="">---Select a Team---</option>
                    {teamOptions}
                </select>
            </label>
            <label>
                Project
                <select onChange={onProjectChange} value={projectID}>
                    <option name="" value="">---Select a Project---</option>
                    {projectOptions}
                </select>
            </label>
            <button type="submit">Submit</button>
        </form>
    )
}

export default TaskForm