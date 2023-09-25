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
        team_id,
        user_id
    } = task

    // const currentUser = useSelector((state) => state.users.currentUser)
    // const project = currentUser.projects.find((p) => p.id === project_id)
    // const team = currentUser.teams.find((t) => t.id === team_id)
    
    const users = useSelector((state) => state.users.entities)
    const currentUser = useSelector((state) => state.users.currentUser)
    // console.log(users)
    const user = users.find((u) => u.id === user_id)
    if (!user) {
        return <div>"Loading..."</div>
    }
    const project = user.projects.find((p) => p.id === project_id)
    const team = user.teams.find((t) => t.id === team_id)
    function handleComplete() {
        dispatch(deleteTask(id))
    }

    function handleEdit() {
        navigate(`/tasks/${id}/edit`)
    }

    return(
        <div>
            <NavLink to={`/tasks/${id}`}>
            {user.username} {name} {due_date} {project.name} {team.name}
            
            </NavLink>
            {currentUser.id === user_id ? <button onClick={handleComplete}>✔</button> : null}
            {currentUser.id === user_id ? <button onClick={handleEdit}>edit</button> : null}
        </div>
    )
}

export default TaskCard