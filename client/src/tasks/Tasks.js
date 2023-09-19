import {useSelector} from 'react-redux'
import TaskCard from './TaskCard'
import {useState} from 'react'
import TaskForm from './TaskForm'

function Tasks() {
    const projects = useSelector((state) => state.users.currentUser.projects)
    console.log(projects)
    const tasks = projects.map((project) => project.tasks)
    console.log(tasks)
    const flattenedTasks = tasks.flat()
    console.log(flattenedTasks)
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
            <br></br>
            {taskCardComps ? taskCardComps : null}
        </div>
    )
}

export default Tasks