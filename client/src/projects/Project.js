//Render all tasks for a single project
import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import TaskCard from '../tasks/TaskCard'
import { fetchProjects } from './projectsSlice'

function Project() {

    const dispatch = useDispatch()
    let {id} = useParams()
    id = parseInt(id)
    const projects = useSelector((state) => state.users.currentUser.projects)
    const project = projects.find((p) => p.id === id)
    const tasks = project ? project.tasks.map((t) => t) : []
    const taskComps = tasks.map((task) => <TaskCard key={task.id} task={task}/>)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        dispatch(fetchProjects())
        .then(() => {
            setLoading(false)
        })
    }, [dispatch, id])

    if (loading) {
        return <div>"Loading..."</div>
    }

    if (!project) {
        return <div>Please add your first task to this project.</div>
    }

    return(
       <div>
        <h4>{project.name}</h4>
        {taskComps.length === 0 ? null : taskComps}
       </div>
    )
}

export default Project