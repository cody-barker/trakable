import {useSelector} from 'react-redux'
import { useParams } from 'react-router-dom'

function Task() {
    
    let {id} = useParams()
    id = parseInt(id)

    const users = useSelector((state) => state.users.entities)
    const currentUser = useSelector((state) => state.users.currentUser)
    const user = users.find((u) => u.id === currentUser.id)
    // const projects = useSelector((state) => state.users.currentUser.projects)
    const teams = user.teams
    const tasks = teams.map((team) => team.tasks)
    const flattenedTasks = tasks.flat()
    const task = flattenedTasks.find((t) => t.id === id)
    console.log(flattenedTasks)
    console.log(task)

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