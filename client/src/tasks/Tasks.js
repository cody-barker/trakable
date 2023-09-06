import {useSelector} from 'react-redux'
import TaskCard from './TaskCard'

function Tasks() {
    const tasks = useSelector((state) => state.users.currentUser.tasks)
    const taskCardComps = tasks.map((task) => {
        return <TaskCard key={task.id} task={task}/>
    })

    return (
        <div>
            {taskCardComps}
        </div>
    )
}

export default Tasks