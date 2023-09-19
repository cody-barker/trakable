import {NavLink, useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {deleteTask} from '../users/usersSlice'
import { useSelector } from 'react-redux'

function TaskCard({task}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {
        name,
        due_date,
        id,
        project_id,
        team_id
    } = task

    const currentUser = useSelector((state) => state.users.currentUser)
    const project = currentUser.projects.find((p) => p.id === project_id)
    const team = currentUser.teams.find((t) => t.id === team_id)

    function handleComplete() {
        dispatch(deleteTask(id))
    }

    function handleEdit() {
        navigate(`/tasks/${id}/edit`)
    }

    return(
        <div>
            <NavLink to={`/tasks/${id}`}>
            {name} {due_date} {project.name} {team.name}
            </NavLink>
            <button onClick={handleComplete}>✔</button>
            <button onClick={handleEdit}>edit</button>
        </div>
    )
}

export default TaskCard