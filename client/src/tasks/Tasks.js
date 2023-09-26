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
            <button onClick={handleClick} className="add-btn">+ Add task</button>
            {vis ? <TaskForm vis={vis} setVis={setVis}/> : null}
            <br></br>
            <table>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Task</th>
                        <th>Due Date</th>
                        <th>Project</th>
                        <th>Team</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {taskCardComps ? taskCardComps : null}
                </tbody>
            </table>
        </div>
    )
}

export default Tasks