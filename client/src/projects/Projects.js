import {useSelector} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {useState} from 'react'
import ProjectForm from './ProjectForm'

function Projects() {

    const [vis, setVis] = useState(false)
    const currentUser = useSelector((state) => state.users.currentUser)
    const allProjects = useSelector((state) => state.projects.entities)
    const createdProjects = allProjects.filter((project) => project.creator_id === currentUser.id)
    const createdProjectComps = createdProjects.map((project) => {
        return <NavLink to={`/projects/${project.id}`} key={project.id}>{project.name}</NavLink>
    })

    function handleClick() {
        setVis(!vis)
    }

    return (
        <div>
            <button onClick={handleClick}>+ Add Project</button>
            {vis ? <ProjectForm vis={vis} setVis={setVis}/> : null}
            {/* <h4>My Projects with Tasks</h4>
            {userProjectComps} */}
            <h4>Projects I've Created</h4>
            {createdProjectComps}
            {/* <h4>All Projects</h4>
            {allProjectComps} */}
        </div>
    )
}

export default Projects