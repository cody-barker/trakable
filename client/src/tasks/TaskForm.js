import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {createTask} from '../login/usersSlice'

function TaskForm() {

    const dispatch = useDispatch()

    const allProjects = useSelector((state) => state.projects.entities)
    const currentUser = useSelector((state) => state.users.currentUser)
    const userProjects = allProjects.filter((project) => project.creator_id === currentUser.id)
    const projectOptions = userProjects.map((project) => {
        return <option key={project.id} value={project.id}>{project.name}</option>
    })


    const [inputState, setInputState] = useState({
        name: "",
        due_date: "",
        description: ""
    })

    const {
        name,
        due_date,
        description
    } = inputState

    function onInputChange(e){
        setInputState({
            ...inputState,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(createTask(inputState))
        setInputState({
            name: "",
            due_date: "",
            description: ""
        })
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
                Project
                <select>
                    {projectOptions}
                </select>
            </label>
            <button type="submit">Submit</button>
        </form>
    )
}

export default TaskForm