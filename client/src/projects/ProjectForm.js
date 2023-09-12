import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {createProject} from '../projects/projectsSlice'

function ProjectForm({vis, setVis}) {

    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.users.currentUser)

    const [inputState, setInputState] = useState({
        name: "",
        description: "",
        creator_id: currentUser.id
    })

    const {
        name,
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
        dispatch(createProject(inputState))
        setInputState({
            name: "",
            description: ""
        })
        setVis(!vis)
    }

    return(
        <form onSubmit={handleSubmit}>
            <label>
                Project Name
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
            <button type="submit">Submit</button>
        </form>
    )
}

export default ProjectForm