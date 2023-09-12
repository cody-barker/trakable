import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {createTask} from '../users/usersSlice'

//need to decide how to route around in order to create new tasks and projects that are appropriately associated

function TaskForm({vis, setVis}) {

    const dispatch = useDispatch()

    const allProjects = useSelector((state) => state.projects.entities)
    const currentUser = useSelector((state) => state.users.currentUser)
    const allWorkspaces = useSelector((state) => state.workspaces.entities)
    const userProjects = allProjects.filter((project) => project.creator_id === currentUser.id)
    const projectOptions = userProjects.map((project) => {
        return <option key={project.id} value={project.id} name={project.name}>{project.name}</option>
    })
    const userWorkspaces = allWorkspaces.filter((workspace) => workspace.creator_id === currentUser.id)
    const workspaceOptions = userWorkspaces.map((workspace) => {
        return <option key={workspace.id} value={workspace.id} name={workspace.name}>{workspace.name}</option>
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
    const [workspaceID, setWorkspaceID] = useState("")

    function onProjectChange(e) {
        setProjectID(e.target.value)
    }

    function onWorkspaceChange(e) {
        setWorkspaceID(e.target.value)
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
        setVis(!vis)
    }

    const formData = {
        name,
        due_date,
        description,
        project_id: projectID,
        workspace_id: workspaceID,
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
                Workspace
                <select onChange={onWorkspaceChange} value={workspaceID}>
                    <option name="" value="">---Select a Workspace---</option>
                    {workspaceOptions}
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