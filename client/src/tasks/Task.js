import {useSelector} from 'react-redux'
import { useParams } from 'react-router-dom'

function Task() {
    
    let {id} = useParams()
    id = parseInt(id)

    const projects = useSelector((state) => state.users.currentUser.projects)
    const tasks = projects.map((project) => project.tasks)
    const flattenedTasks = tasks.flat()
    const task = flattenedTasks.find((t) => t.id === id)

    const {
        name,
        description,
        due_date
    } = task

    return (
        <div>
            {name} {due_date}
            <br></br>
            {description} 
            <hr></hr>
        </div>
    )
}

export default Task