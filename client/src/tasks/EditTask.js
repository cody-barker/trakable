import {useParams, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {useState} from 'react'
import {updateTask} from '../users/usersSlice'

function EditTask() {

    let {id} = useParams();
    id = parseInt(id);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    const currentUser = useSelector((state) => state.users.currentUser)
    const projects = useSelector((state) => state.users.currentUser.projects)
    const tasks = projects.map((project) => project.tasks)
    const flattenedTasks = tasks.flat()
    const task = flattenedTasks.find((t) => t.id === id)
    const errors = useSelector((state) => state.users.errors)

    const [inputState, setInputState] = useState({
        name: task.name,
        due_date: task.due_date,
        description: task.description,
    });

    const {
        name,
        due_date,
        description,
    } = inputState;


    function onInputChange(e){
        setInputState({
            ...inputState,
            [e.target.name]: e.target.value
        });
    };

    let formData = {
        id: task.id,
        name,
        due_date,
        description,
        user_id: currentUser.id,
        project_id: task.project_id,
        team_id: task.team_id
    }

    const errorComps = errors.map((userErrors, userIndex) => (
        <ul key={userIndex}>
          {userErrors.errors.map((error, index) => (
            <li className="errors" key={index}>{error}</li>
          ))}
        </ul>
      ));

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(updateTask(formData))
        .then((result) => {
            if (!result.payload.errors) {
                navigate(-1)
            }
        })
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                {errorComps}
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
            <button className="add-btn" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default EditTask