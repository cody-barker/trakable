import {useSelector} from 'react-redux'
import MyTaskCard from './MyTaskCard'
import {useState} from 'react'
import TaskForm from './TaskForm'

function Tasks() {
    
    const projects = useSelector((state) => state.users.currentUser.projects)
    const tasks = projects.map((project) => project.tasks)
    const flattenedTasks = tasks.flat()
    const taskCardComps = flattenedTasks.map((task) => {
        return <MyTaskCard key={task.id} task={task}/>
    })

    const [vis, setVis] = useState(false)
    function handleClick() {
        setVis(!vis)
    }

    const table = <table>
                    <thead>
                        <tr className="table-row">
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

    return (
        <div>
            <button onClick={handleClick} className="add-btn">+ Add task</button>
            {vis ? <TaskForm vis={vis} setVis={setVis}/> : null}
            <br></br>
            {taskCardComps.length > 0 ? table : <div className="note">Please add a task.</div>}
        </div>
    )
}

export default Tasks