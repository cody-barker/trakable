import {useSelector} from 'react-redux'
import { useParams, NavLink, useNavigate } from 'react-router-dom'

function Task() {
    
    let {id} = useParams()
    id = parseInt(id)
    const navigate = useNavigate()

    const users = useSelector((state) => state.users.entities)
    const currentUser = useSelector((state) => state.users.currentUser)
    const user = users.find((u) => u.id === currentUser.id)
    if (!user) {
        return <div>"Loading..."</div>
    }
    const teams = user.teams
    const tasks = teams.map((team) => team.tasks)
    const flattenedTasks = tasks.flat()
    const task = flattenedTasks.find((t) => t.id === id)
    if (!task) {
        return <div>You are not authorized to view this task.</div>
    }
    const {
        name,
        description,
        due_date,
        project_id,
        team_id,
        user_id
    } = task
    const project = user.projects.find((p) => p.id === project_id)
    const team = user.teams.find((t) => t.id === team_id)
    const today = new Date()
    const yyyy = today.getFullYear()
    let mm = today.getMonth() + 1
    let dd = today.getDate()
    if (dd < 10) dd = '0' + dd
    if (mm < 10) mm = '0' + mm
    const formattedToday = yyyy + "-" + mm + "-" + dd

    function handleComplete() {
        dispatch(deleteTask(id))
    }

    function handleEdit() {
        navigate(`/tasks/${id}/edit`)
    }
   
    return (
        <div className="task-container">
            <div>
                {currentUser.id === user_id ? <button className="icon-container" onClick={handleComplete}><img className="checkbox-icon" src="https://cdns.iconmonstr.com/wp-content/releases/preview/2018/240/iconmonstr-check-mark-circle-thin.png"/></button> : null}
                {currentUser.id === user_id ? <button className="icon-container" onClick={handleEdit}><img className="edit-icon" src="https://cdns.iconmonstr.com/wp-content/releases/preview/7.8.0/240/iconmonstr-pencil-text-lined.png"/></button> : null}
            </div>
            <div className="task-attr">{name}</div>
            <div className="task-attr">Due: {formattedToday == due_date ? "Today" : due_date}</div>
            <div className="task-attr">Project: <NavLink className="task-card" to={`/projects/${project.id}`}>{project.name}</NavLink></div>
            <div className="task-attr">Team: <NavLink className="task-card" to={`/teams/${team.id}`}>{team.name}</NavLink></div>
            <div className="task-attr">Description: {description} </div>
        </div>
    )
}

export default Task