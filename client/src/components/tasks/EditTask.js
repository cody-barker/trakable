import {useParams, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {useState} from 'react'
import {updateTask} from '../../state/usersSlice'

function EditTask() {

    let {id} = useParams();
    id = parseInt(id);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    const currentUser = useSelector((state) => state.users.currentUser)
    const tasks = currentUser.projects.map((project) => project.tasks)
    const flattenedTasks = tasks.flat()
    const task = flattenedTasks.find((t) => t.id === id)
    const errors = useSelector((state) => state.users.errors)
    const [description, setDescription] = useState(task.description)

    const [inputState, setInputState] = useState({
        name: task.name,
        due_date: task.due_date
    });

    const {
        name,
        due_date
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
        <div className="flex-container">
            <form className="small-form" onSubmit={handleSubmit}>
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
                <textarea
                name="description"
                type="text"
                autoComplete="off"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            <button className="submit-btn" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default EditTask