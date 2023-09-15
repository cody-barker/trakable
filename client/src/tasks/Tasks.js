import {useSelector} from 'react-redux'
import TaskCard from './TaskCard'
import {useState} from 'react'
import TaskForm from './TaskForm'

function Tasks() {
    const projects = useSelector((state) => state.users.currentUser.projects)
    const tasks = projects.map((project) => project.tasks)
    const flattenedTasks = tasks.flat()
    const taskCardComps = flattenedTasks.map((task) => {
        return <TaskCard key={task.id} task={task}/>
    })

    const [vis, setVis] = useState(false)

    function handleClick() {
        setVis(!vis)
    }

    return (
        <div>
            <button onClick={handleClick}>+ Add task</button>
            {vis ? <TaskForm vis={vis} setVis={setVis}/> : null}
            {taskCardComps}
        </div>
    )
}

export default Tasks