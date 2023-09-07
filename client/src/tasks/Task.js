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
    } = task
    return (
        <div>
            {name} {description}
        </div>
    )
}

export default Task