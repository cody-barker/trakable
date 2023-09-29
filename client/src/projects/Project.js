import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import ProjectTaskCard from '../tasks/ProjectTaskCard'

function Project() {

    let {id} = useParams()
    id = parseInt(id)
    
    const projects = useSelector((state) => state.users.currentUser.projects)
    const currentUser = useSelector((state) => state.users.currentUser)
    const project = projects.find((p) => p.id === id)
    const tasks = project ? project.tasks.map((t) => t) : []
    const taskComps = tasks.map((task) => <ProjectTaskCard key={task.id} task={task}/>)
   
    if (!project) {
        return <div>Please add a task to this project.</div>
    }

    const sortedTaskComps = [...taskComps].sort((a, b) => {
        const dateA = new Date(a.props.task.due_date);
        const dateB = new Date(b.props.task.due_date);
        return dateA - dateB;
      });

    const table = <table>
                    <thead>
                        <tr className="table-row">
                            <th></th>
                            <th>Task</th>
                            <th>Due Date</th>
                            <th>Team</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedTaskComps ? sortedTaskComps : null}
                    </tbody>
                  </table>

    return(
       <div>
        <h4 className="title">Project: {project.name}</h4>
        <p className="title">Description: {project.description}</p>
        {sortedTaskComps.length > 0 ? table : null}
       </div>
    )
}

export default Project