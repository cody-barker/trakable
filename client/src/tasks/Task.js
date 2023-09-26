import {useSelector} from 'react-redux'
import { useParams, NavLink } from 'react-router-dom'

function Task() {
    
    let {id} = useParams()
    id = parseInt(id)

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
    const {
        name,
        description,
        due_date,
        project_id,
        team_id
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
    console.log(due_date)
    console.log(today)
    console.log(formattedToday)
   

    return (
        <div className="task-container">
            <div className="task-attr">{name}</div> 
            <div className="task-attr">Due: {formattedToday == due_date ? "Today" : due_date}</div>
            <div className="task-attr">Project: <NavLink className="task-card" to={`/projects/${project.id}`}>{project.name}</NavLink></div>
            <div className="task-attr">Team: <NavLink className="task-card" to={`/projects/${team.id}`}>{team.name}</NavLink></div>
            <div className="task-attr">Description: {description} </div>
        </div>
    )
}

export default Task