import {useSelector} from 'react-redux'
import {NavLink} from 'react-router-dom'

function Projects() {

    const currentUser = useSelector((state) => state.users.currentUser)
    const userProjects = currentUser.projects.map((project) => {
        return project
    })
    const projectComps = userProjects.map((project) => {
        return <NavLink to={`/projects/${project.id}`} key={project.id}>{project.name}</NavLink>
    })

    return (
        <div>
            {projectComps}
        </div>
    )
}

export default Projects