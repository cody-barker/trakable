import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {createProject} from './projectsSlice'

function ProjectForm({vis, setVis}) {

    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.users.currentUser)
    const errors = useSelector((state) => state.projects.errors)
    const errorComps = errors.map((userErrors, userIndex) => (
        <ul key={userIndex}>
          {userErrors.errors.map((error, index) => (
            <li className="error" key={index}>{error}</li>
          ))}
        </ul>
      ));

    const [inputState, setInputState] = useState({
        name: "",
        description: "",
        creator_id: currentUser.id
    })

    const {
        name,
        description,
        creator_id
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
            description: "",
            creator_id: currentUser.id
        })
        // setVis(!vis)
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                {errorComps}
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
        </div>
    )
}

export default ProjectForm