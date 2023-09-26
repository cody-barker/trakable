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
    const user = users.find((u) => u.id === user_id)
    if (!user) {
        return <tr><td>"Loading..."</td></tr>
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
        <tr className="table-row">
            <td>{user.username}</td>
            <td><NavLink className="task-card" to={`/tasks/${id}`}>{name}</NavLink></td>
            <td>{due_date}</td>
            <td><NavLink className="task-card" to={`/projects/${project.id}`}>{project.name}</NavLink></td>
            <td><NavLink className="task-card" to={`/projects/${team.id}`}>{team.name}</NavLink></td>
            <td>
                {currentUser.id === user_id ? <button className="icon-container" onClick={handleComplete}><img className="checkbox-icon" src="https://cdns.iconmonstr.com/wp-content/releases/preview/2018/240/iconmonstr-check-mark-circle-thin.png"/></button> : null}
                {currentUser.id === user_id ? <button className="icon-container" onClick={handleEdit}><img className="edit-icon" src="https://cdns.iconmonstr.com/wp-content/releases/preview/7.8.0/240/iconmonstr-pencil-text-lined.png"/></button> : null}
            </td>
        </tr>
    )
}

export default TaskCard