import {useSelector} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {useState} from 'react'
import ProjectForm from './ProjectForm'

function Projects() {

    //user projectsd
    const currentUser = useSelector((state) => state.users.currentUser)
    const userProjects = currentUser.projects.map((project) => {
        return project
    })
    const useProjectComps = userProjects.map((project) => {
        return <NavLink to={`/projects/${project.id}`} key={project.id}>{project.name}</NavLink>
    })

    //all projects
    const allProjects = useSelector((state) => state.projects.entities)
    console.log(allProjects)
    const allProjectComps = allProjects.map((project) => {
        return <NavLink to={`/projects/${project.id}`} key={project.id}>{project.name}</NavLink>
    })

    //projects the current user has created
    const createdProjects = allProjects.filter((project) => project.creator_id === currentUser.id)
    const createdProjectComps = createdProjects.map((project) => {
        return <NavLink to={`/projects/${project.id}`} key={project.id}>{project.name}</NavLink>
    })

    const [vis, setVis] = useState(false)

    function handleClick() {
        setVis(!vis)
    }

    return (
        <div>
            <button onClick={handleClick}>+ Add Project</button>
            {vis ? <ProjectForm /> : null}
            <h4>My Projects with Tasks</h4>
            {useProjectComps}
            <h4>Projects I've Created</h4>
            {createdProjectComps}
            <h4>All Projects</h4>
            {allProjectComps}


        </div>
    )
}

export default Projects