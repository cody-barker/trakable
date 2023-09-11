import {NavLink, useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {deleteTask} from '../login/usersSlice'

function TaskCard({task}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {
        name,
        due_date,
        id,
        project_name
    } = task

    function handleComplete() {
        dispatch(deleteTask(id))
    }

    function handleEdit() {
        navigate(`/tasks/${id}/edit`)
    }

    return(
        <div>
            <NavLink to={`/tasks/${id}`}>
            {name} {due_date} {project_name}
            </NavLink>
            <button onClick={handleComplete}>✔</button>
            <button onClick={handleEdit}>edit</button>
        </div>
    )
}

export default TaskCard