//Render all tasks for a single project
import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import TaskCard from '../tasks/TaskCard'

function Project() {

    let {id} = useParams()
    id = parseInt(id)
    const currentUser = useSelector((state) => state.users.currentUser)
    const project = currentUser.projects.find((project) => project.id === id)
    const tasks = currentUser.tasks.filter((task) => task.project_id === id)
    const taskComps = tasks.map((task) => <TaskCard key={task.id} task={task}/>)
    console.log(currentUser)

    return(
       <div>
        {project.name}
        {taskComps}
       </div>
    )
}

export default Project