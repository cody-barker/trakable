//Render all tasks for a single project
import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import TaskCard from '../tasks/TaskCard'

function Project() {

    //state
    const projects = useSelector((state) => state.projects.entities)
    const currentUser = useSelector((state) => state.users.currentUser)

    //project id
    let {id} = useParams()
    id = parseInt(id)

    const project = projects.find((project) => project.id === id)
    const tasks = project.tasks.filter((task) => task.project_id === id)
    const taskComps = tasks.map((task) => <TaskCard key={task.id} task={task}/>)

    return(
       <div>
        {project.name}
        {project.tasks.empty? null : taskComps}
       </div>
    )
}

export default Project