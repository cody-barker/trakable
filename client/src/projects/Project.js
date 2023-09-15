import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import TaskCard from '../tasks/TaskCard'

function Project() {

    let {id} = useParams()
    id = parseInt(id)
    const projects = useSelector((state) => state.users.currentUser.projects)
    const project = projects.find((p) => p.id === id)
    const tasks = project ? project.tasks.map((t) => t) : []
    const taskComps = tasks.map((task) => <TaskCard key={task.id} task={task}/>)
   
    if (!project) {
        return <div>Please add your first task to this project.</div>
    }

    return(
       <div>
        <h4>{project.name}</h4>
        {taskComps.length === 0 ? null : taskComps}
       </div>
    )
}

export default Project