import {NavLink} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {deleteTask} from '../login/usersSlice'

function TaskCard({task}) {

    const dispatch = useDispatch()

    const {
        name,
        due_date,
        id
    } = task

    function handleClick() {
        dispatch(deleteTask(id))
    }

    return(
        <div>
            <NavLink to={`/tasks/${id}`}>
            {name} {due_date}
            </NavLink>
            <button onClick={handleClick}>✔</button>
        </div>
    )
}

export default TaskCard