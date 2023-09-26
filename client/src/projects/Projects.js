import {useSelector} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {useState} from 'react'
import ProjectForm from './ProjectForm'

function Projects() {

    const currentUser = useSelector((state) => state.users.currentUser)
    const allProjects = useSelector((state) => state.projects.entities)

    const createdProjects = allProjects.filter((project) => project.creator_id === currentUser.id)
    const createdProjectComps = createdProjects.map((project) => {
        return <NavLink className="nav-links" to={`/projects/${project.id}`} key={project.id}>{project.name}</NavLink>
    })

    const [vis, setVis] = useState(false)
    function handleClick() {
        setVis(!vis)
    }

    return (
        <div>
            <button className="add-btn" onClick={handleClick}>{!vis ? "+ Add Project" : "Cancel"}</button>
            <div className="links-container">
                {vis ? <ProjectForm vis={vis} setVis={setVis}/> : null}
                <h4>My Projects</h4>
                {createdProjectComps}
            </div>
        </div>
    )
}

export default Projects