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
    console.log(project)
    const tasks = currentUser.tasks.filter((task) => task.project_id === id)
    console.log(tasks)
    const taskComps = tasks.map((task) => <TaskCard key={task.id} task={task}/>)

    if (!project) {
        return <div>"Loading..."</div>
    }

    //We aren't updating currentUser.projects when we add a project to "/projects"

    return(
       <div>
        {project.name}
        {project.tasks.empty? null : taskComps}
       </div>
    )
}

export default Project