import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {useState} from 'react'
import {updateTask} from '../login/usersSlice'

function EditTask() {

    const dispatch = useDispatch()
    let {id} = useParams()
    id = parseInt(id)
    const tasks  = useSelector((state) => state.users.currentUser.tasks)
    const task = tasks.filter((task) => task.id === id)[0]
    console.log(task)

    const [inputState, setInputState] = useState({
        name: task.name,
        due_date: task.due_date,
        description: task.description,
        id: task.id
    })

    const {
        name,
        due_date,
        description,
    } = inputState

    function onInputChange(e){
        setInputState({
            ...inputState,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(updateTask(inputState))
    }

    return(
        <div>
            {task.name} {task.due_date} {task.description}
            <form onSubmit={handleSubmit}>
            <label>
                Task Name
                <input
                name="name"
                type="text"
                autoComplete="off"
                value={name}
                onChange={onInputChange}
                />
            </label>
            <label>
                Due Date
                <input
                name="due_date"
                type="date"
                autoComplete="off"
                value={due_date}
                onChange={onInputChange}
                />
            </label>
            <label>
                Description
                <input
                name="description"
                type="text"
                autoComplete="off"
                value={description}
                onChange={onInputChange}
                />
            </label>
            <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default EditTask