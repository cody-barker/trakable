import {NavLink} from 'react-router-dom'

function TaskCard({task}) {

    const {
        name,
        due_date,
        description,
        id
    } = task

    return(
        <div>
            <NavLink to={`/tasks/${id}`}>
            {name} {due_date}
            </NavLink>
        </div>
    )
}

export default TaskCard