import {useSelector} from 'react-redux'
import { useParams } from 'react-router-dom'

function Task() {
    let {id} = useParams()
    id = parseInt(id)
    const task = useSelector((state) => state.users.currentUser.tasks.find((t) => t.id === id))
    const {
        name,
        description,
        due_date,
        project_name
    } = task
    return (
        <div>
            {name} {due_date} {project_name}
            <br></br>
            {description} 
            <hr></hr>
        </div>
    )
}

export default Task