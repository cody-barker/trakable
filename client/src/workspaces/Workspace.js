import { useParams, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Workspace() {

    let {id} = useParams();
    id = parseInt(id)
    const allWorkspaces = useSelector((state) => state.workspaces.entities)
    const workspace = allWorkspaces.find((workspace) => workspace.id === id)
    const projects = workspace.projects.map((project) => {
        return <NavLink to={`/projects/${project.id}`} key={project.id}>{project.name}</NavLink>
    })

    return(
        <div>
            {workspace.name} Workspace
            <br></br>
            Projects<br></br>
            {projects}
        </div>
    )
}

export default Workspace