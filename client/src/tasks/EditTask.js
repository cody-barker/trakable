import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {useState} from 'react'


function EditTask() {

    let {id} = useParams()
    id = parseInt(id)
    const tasks  = useSelector((state) => state.users.currentUser.tasks)
    const task = tasks.filter((task) => task.id === id)[0]
    console.log(task)
    const {
        name,
        due_date,
        description
    } = task

    const [inputState, setInputState] = useState({
        name: name,
        due_date,
        description
    })

    return(
        <div>
            {name} {due_date} {description}
        </div>
    )
}

export default EditTask