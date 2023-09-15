//Render all tasks for a single project
import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import TaskCard from '../tasks/TaskCard'

function Project() {

    let {id} = useParams()
    id = parseInt(id)
    const projects = useSelector((state) => state.users.currentUser.projects)
    console.log(projects)
    const project = projects.find((p) => p.id === id)
    console.log(project)
    const tasks = project.tasks.map((t) => t)

    const taskComps = tasks.map((task) => <TaskCard key={task.id} task={task}/>)

    if (!project) {
        return <div>"Loading..."</div>
    }

    return(
       <div>
        <h4>{project.name}</h4>
        {project.tasks.empty ? null : taskComps}
       </div>
    )
}

export default Project